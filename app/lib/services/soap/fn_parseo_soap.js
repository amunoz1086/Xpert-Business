const pool_soap = require('./fn_pool_soap');
const xml2js = require('xml2js');

export default async function fn_parseo_soap(req, res) {

    const xml_data = JSON.parse(req);

    let json_data = {
        status: xml_data.status,
        message: xml_data.message,
        codRes: xml_data.codRes,
        cliente: '',
        tipoPersona: '',
        oficina: '',
        coomeva: '',
        vinculado: 0,
        antiguedad_coo: '',
        antiguedad_ban: '',
        estado_coo: '',
        estado_ban: '',
        tipo_contrato: '',
        ingreso: 0,
        ventas_an: 0,
        activos: 0,
        sector: '',
        score: '',
        carteraConsumo: 0,
        carteraComercial: 0,
        carteraHipotecario: 0,
        totalCartera: 0,
        calificacionActual: '',
        cupoConsumo: 0,
        cupoComercial: 0,
        captacionCorriente: 0,
        captacionAhorros: 0,
        captacionCdt: 0,
        totalCaptacion: 0,
        tipoConvenio: '',
    };

    if (xml_data.status === 200) {

        // FUNCION PARA EXTRAER LOS DATOS DE LOS XML EN LA RESPUESTA
        function parseXML(xml) {
            return new Promise((resolve, reject) => {
                const parser = new xml2js.Parser({ explicitArray: false });

                parser.parseString(xml, (err, result) => {
                    if (err) {
                        if (xml === undefined) {
                            reject(new Error('Servicio no alcanzado, No se logró conexión al menos a un servicio'));
                        } else {
                            reject(new Error(err.message));
                        };
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        function calMes(fechResponse) {
            let fullMonth = 0;
            if (parseInt(fechResponse) === 0) {
                return fullMonth;
            } else {
                let parseDate = new Date(`${(fechResponse.toString()).substring(0, 4)}`, `${(fechResponse.toString()).substring(4, 6)}`, `${(fechResponse.toString()).substring(6, 8)}`);
                let fullYear = ((new Date()).getFullYear() - parseInt(parseDate.getFullYear())) * 12;
                fullMonth = (fullYear + ((new Date()).getMonth() + 1)) - parseInt(parseDate.getMonth());

                return fullMonth;
            }
        }

        //PARSEO DE LOS DATOS RECIBIDOS DE LOS SERVICIOS SOAP
        switch (xml_data.tipoPersona) {
            case 'Pn'://PERSONA NATURAL

                // PARSEO CONSULTAR CLIENTE PN
                json_data['cliente'] = (xml_data.consultarClientePn.O_PRMNOM).trim() + ' ' + (xml_data.consultarClientePn.O_SGDNOM).trim() + ' ' + (xml_data.consultarClientePn.O_PRMAPL).trim() + ' ' + (xml_data.consultarClientePn.O_SGDAPL).trim();
                json_data['tipoPersona'] = (xml_data.tipoPersona).toUpperCase();
                json_data['oficina'] = xml_data.consultarClientePn.O_AGCVIN === 0 ? 1 : xml_data.consultarClientePn.O_AGCVIN;

                json_data['coomeva'] = 3; // No asociado
                // Antiguedad Coomeva
                json_data['antiguedad_coo'] = calMes(xml_data.consultarClientePn.O_FECESC);
                // Antiguedad Banco
                json_data['antiguedad_ban'] = calMes(xml_data.consultarClientePn.O_FECDATFIN);
                // Tipo Contrato
                json_data['tipo_contrato'] = xml_data.consultarClientePn.O_TIPCON === 0 ? 3 : xml_data.consultarClientePn.O_TIPCON;
                // Ingreso
                json_data['ingreso'] = xml_data.consultarClientePn.O_TOTING;
                // Ventas
                json_data['ventas_an'] = xml_data.consultarClientePn.O_VENANU;
                json_data['activos'] = xml_data.consultarClientePn.O_TOTACT;
                json_data['sector'] = 99; // Persona Natural

                // PARSEO CONSULTAR PRODUCTOS PN
                parseXML(xml_data['consultarProductosPn'])
                    .then(result => {
                        const cuentas = result['NS1:Envelope']['NS1:Body']['NS2:consultarProductosResponse']['cuentas'];
                        if (Array.isArray(cuentas)) {
                            let captacionAhorros = 0;
                            let captacionCorriente = 0;

                            // Captacion Ahorros
                            for (let cuenta of cuentas) {
                                if (cuenta.tipoCuenta === 'A' && cuenta.estadoCuenta === 'Activa') {
                                    captacionAhorros += parseFloat(cuenta.saldoCuenta);
                                }
                            }
                            json_data['captacionAhorros'] = captacionAhorros;

                            // Captacion Corriente
                            for (let cuenta of cuentas) {
                                if (cuenta.tipoCuenta === 'C' && cuenta.estadoCuenta === 'Activa') {
                                    captacionCorriente += parseFloat(cuenta.saldoCuenta);
                                };
                            };
                            json_data['captacionCorriente'] = captacionCorriente;

                        } else {
                            json_data['captacionAhorros'] = 0;
                            json_data['captacionCorriente'] = 0;
                        };

                        // Captacion CDT
                        const inversiones = result['NS1:Envelope']['NS1:Body']['NS2:consultarProductosResponse']['inversiones'];
                        if (Array.isArray(inversiones)) {
                            let captacionCdt = 0;
                            for (let inversion of inversiones) {
                                if (inversion.estadoCuenta === 'Activa') {
                                    captacionCdt += parseFloat(inversion.saldo);
                                };
                            };
                            json_data['captacionCdt'] = captacionCdt;
                        };

                        // Total Captacion 
                        json_data['totalCaptacion'] = json_data['captacionAhorros'] + json_data['captacionCorriente'] + json_data['captacionCdt'];

                    })
                    .catch(error => {
                        console.error(error);
                    });

                // VARIABLES INTERNAS PN
                parseXML(xml_data['variablesInternas'])
                    .then(result => {
                        let dtJson;
                        let conceptosVal = result['NS1:Envelope']['NS1:Body']['NS2:consultarVariablesInternasResponse'].consultarVariablesInternasRes !== undefined;
                        if (conceptosVal) {
                            const dataJson = result['NS1:Envelope']['NS1:Body']['NS2:consultarVariablesInternasResponse'].consultarVariablesInternasRes.conceptos.concepto;

                            if (!Array.isArray(dataJson)) {
                                dtJson = new Array();
                                dtJson.unshift(dataJson);
                            } else {
                                dtJson = dataJson;
                            };

                            dtJson.forEach(function (concepto) {

                                // Calificacion Actual
                                if (concepto.concepto === 'CALIF_MES') {
                                    let valorSinComas = concepto.valor.replace(/,/g, '');
                                    json_data['calificacionActual'] = valorSinComas.charAt(0);
                                }

                                // Cartera Consumo
                                if (concepto.concepto === 'EXPO_INI_CMO') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['carteraConsumo'] = isNaN(valorSinComas) ? 0 : valorSinComas;
                                }

                                // Cartera Hipotecario
                                if (concepto.concepto === 'EXPO_INI_VIV') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['carteraHipotecario'] = isNaN(valorSinComas) ? 0 : valorSinComas;
                                }

                                // Cartera Comercial
                                if (concepto.concepto === 'EXPO_INI_CIAL') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['carteraComercial'] = isNaN(valorSinComas) ? 0 : valorSinComas;
                                }

                                // Total Cartera
                                json_data['totalCartera'] = json_data['carteraConsumo'] + json_data['carteraHipotecario'] + json_data['carteraComercial'];

                                // Cupos Consumo
                                if (concepto.concepto === 'CUPOS_ACTUALES_CUPO_TOTAL') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['cupoConsumo'] = isNaN(valorSinComas) ? 0 : valorSinComas;
                                }

                                // Estado Banco
                                if (concepto.concepto === 'VECTOR_REEST_VGTE_TITULAR') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['estado_ban'] = valorSinComas;
                                }

                                return json_data;
                            });
                        };
                    })
                    .catch(error => {
                        console.error(error);
                    });
                break;

            case 'Pj': //PERSONA JURIDICA

                // CONSULTAR CLIENTE PJ
                json_data['cliente'] = xml_data.consultarClientePj.substring(36, (36 + 60)).trim();
                json_data['tipoPersona'] = (xml_data.tipoPersona).toUpperCase();
                json_data['oficina'] = parseInt(xml_data.consultarClientePj.substring(210, (210 + 5)).trim());
                json_data['coomeva'] = '';
                // Antiguedad Coomeva
                json_data['antiguedad_coo'] = calMes(xml_data.consultarClientePj.substring(192, (192 + 8)).trim());
                // Antiguedad Banco
                json_data['antiguedad_ban'] = calMes(xml_data.consultarClientePj.substring(3316, (3316 + 8)).trim());
                // Tipo Contrato
                json_data['tipo_contrato'] = 5;
                // Ingreso
                json_data['ingreso'] = xml_data.consultarClientePj.substring(4007, (4007 + 17)).trim();
                // Ventas
                json_data['ventas_an'] = xml_data.consultarClientePj.substring(3261, (3261 + 14)).trim();
                json_data['activos'] = xml_data.consultarClientePj.substring(2069, (2069 + 14)).trim();
                json_data['sector'] = parseInt(xml_data.consultarClientePj.substring(3362, (3362 + 2)).trim()) === 0 ? 4 : parseInt(xml_data.consultarClientePj.substring(3362, (3362 + 2)).trim());
                // Estado Coomeva
                json_data['estado_coo'] = '';
                // Estado Banco
                json_data['estado_ban'] = parseInt(xml_data.consultarClientePj.substring(232, (232 + 2)).trim());

                parseXML(xml_data['usoGeneral'])
                    .then(result => {
                        const dtJson = [result['NS1:Envelope']['NS1:Body']['NS2:usoGeneralResponse']['usoGeneralResponse']['responseProgramas']];

                        for (const element of dtJson[0]) {
                            if (element.codigoPrograma === '5') {
                                json_data['vinculado'] = parseInt(element.texto);
                            };
                        };

                    })
                    .catch(error => {
                        console.error(error);
                    });

                // PRODUCTOS PJ ST
                parseXML(xml_data['consultarProductosPjSt'])
                    .then(result => {
                        const cuentas = result['NS1:Envelope']['NS1:Body']['NS2:consultarProductosEmpOrqResponse']['cuentas'];
                        if (Array.isArray(cuentas)) {
                            let captacionAhorros = 0;
                            let captacionCorriente = 0;

                            // Captacion Ahorros
                            for (let cuenta of cuentas) {
                                if (cuenta.tipoCuenta === 'A' && cuenta.estadoCuenta === 'Activa') {
                                    captacionAhorros += parseFloat(cuenta.saldoCuenta);
                                }
                            }
                            json_data['captacionAhorros'] = captacionAhorros;

                            // Captacion Corriente
                            for (let cuenta of cuentas) {
                                if (cuenta.tipoCuenta === 'C' && cuenta.estadoCuenta === 'Activa') {
                                    captacionCorriente += parseFloat(cuenta.saldoCuenta);
                                };
                            };
                            json_data['captacionCorriente'] = captacionCorriente;

                        } else {
                            json_data['captacionAhorros'] = 0;
                            json_data['captacionCorriente'] = 0;
                        };

                        // Captacion CDT
                        const inversiones = result['NS1:Envelope']['NS1:Body']['NS2:consultarProductosEmpOrqResponse']['inversiones'];
                        if (Array.isArray(inversiones)) {
                            let captacionCdt = 0;
                            inversiones.forEach(function (inversion) {
                                if (inversion.estadoCuenta === 'Activo') {
                                    captacionCdt += parseFloat(inversion.saldo);
                                };

                                if (inversion.estadoCuenta === 'Activa') {
                                    captacionCdt += parseFloat(inversion.saldo);
                                }
                            });
                            json_data['captacionCdt'] = captacionCdt;
                        };

                        // Total Captacion 
                        json_data['totalCaptacion'] = json_data['captacionAhorros'] + json_data['captacionCorriente'] + json_data['captacionCdt'];

                        // Cupo Comercial
                        const cupos = result['NS1:Envelope']['NS1:Body']['NS2:consultarProductosEmpOrqResponse'].cupos;
                        if (Array.isArray(cupos)) {
                            let cupoComercial = 0;
                            cupos.forEach(function (cupo) {
                                if (cupo.estadoCuenta !== 'Inactivo') {
                                    cupoComercial += parseFloat(cupo.saldoDisponible);
                                }
                            });
                            json_data['cupoComercial'] = cupoComercial;
                        };
                    })
                    .catch(error => {
                        console.error(error);
                    });

                // VARIABLES INTERNAS PJ
                parseXML(xml_data['variablesInternas'])
                    .then(result => {
                        let dtJson;
                        let conceptosVal = result['NS1:Envelope']['NS1:Body']['NS2:consultarVariablesInternasResponse'].consultarVariablesInternasRes !== undefined;
                        if (conceptosVal) {
                            const dataJson = result['NS1:Envelope']['NS1:Body']['NS2:consultarVariablesInternasResponse'].consultarVariablesInternasRes.conceptos.concepto;

                            if (!Array.isArray(dataJson)) {
                                dtJson = new Array();
                                dtJson.unshift(dataJson);
                            } else {
                                dtJson = dataJson;
                            };

                            dtJson.forEach(function (concepto) {

                                // Calificacion Actual
                                if (concepto.concepto === 'CALIF_MES') {
                                    let valorSinComas = concepto.valor.replace(/,/g, '');
                                    json_data['calificacionActual'] = valorSinComas.charAt(0);
                                }

                                // Cartera Consumo
                                if (concepto.concepto === 'EXPO_INI_CMO') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['carteraConsumo'] = isNaN(valorSinComas) ? 0 : valorSinComas;
                                }

                                // Cartera Hipotecario
                                if (concepto.concepto === 'EXPO_INI_VIV') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['carteraHipotecario'] = isNaN(valorSinComas) ? 0 : valorSinComas;
                                }

                                // Cartera Comercial
                                if (concepto.concepto === 'EXPO_INI_CIAL') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['carteraComercial'] = isNaN(valorSinComas) ? 0 : valorSinComas;
                                }

                                // Total Cartera
                                json_data['totalCartera'] = json_data['carteraConsumo'] + json_data['carteraHipotecario'] + json_data['carteraComercial'];

                                // Cupos Consumo
                                if (concepto.concepto === 'CUPOS_ACTUALES_CUPO_TOTAL') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['cupoConsumo'] = isNaN(valorSinComas) ? 0 : valorSinComas;
                                }

                                // Estado Banco
                                if (concepto.concepto === 'VECTOR_REEST_VGTE_TITULAR') {
                                    let valorSinComas = parseFloat(concepto.valor);
                                    json_data['estado_ban'] = valorSinComas;
                                }

                                return json_data;
                            });
                        };
                    })
                    .catch(error => {
                        console.error(error);
                    });

                // PARSEO USO GENERAL
                parseXML(xml_data['usoGeneral'])
                    .then(result => {
                        const dtJson = [result['NS1:Envelope']['NS1:Body']['NS2:usoGeneralResponse']['usoGeneralResponse']['responseProgramas']];

                        for (const element of dtJson[0]) {
                            if (element.codigoPrograma === '5') {
                                json_data['vinculado'] = parseInt(element.texto);
                            };
                        };

                    })
                    .catch(error => {
                        console.error(error);
                    });

                break;
            default:
                break;
        };

        return json_data
    }
    else {
        json_data.message = xml_data.message
        json_data.status = xml_data.status
        return json_data
    }
}