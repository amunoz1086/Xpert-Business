"use server";

/* funcion para filtrar los datos del requets provenientes del front */

export const fnFilterDataResKnime = async (req) => {

    const dataReques = req;

    const dataFilterData = {};

    try {

        dataFilterData.ID = dataReques.cliente.numDocumento;
        dataFilterData.TIPO_CLIENTE = dataReques.cliente.tipoPersona !== "PJ" ? 1 : 2;

        function fnTipoSolicitud(dataSolicitud) {
            if (dataSolicitud.tipoProducto.hasOwnProperty('credito') && dataSolicitud.tipoProducto.hasOwnProperty('convenio')) {
                return "3";
            } else if (dataSolicitud.tipoProducto.hasOwnProperty('credito')) {
                return "1";
            } else {
                return "2";
            }
        };

        function fnCodProducto(dataSolicitud) {
            if (dataSolicitud.tipoProducto.hasOwnProperty('credito') && dataSolicitud.tipoProducto.hasOwnProperty('convenio')) {
                return `${dataReques.solicitud.tipoProducto.credito}, ${dataReques.solicitud.tipoProducto.convenio}`;
            } else if (dataSolicitud.tipoProducto.hasOwnProperty('credito')) {
                return dataReques.solicitud.tipoProducto.credito;
            } else {
                return dataReques.solicitud.tipoProducto.convenio;
            }
        };

        dataFilterData.TIPO_SOLICITUD = fnTipoSolicitud(dataReques.solicitud);
        dataFilterData.COD_SECTOR = dataReques.cliente.sector;
        dataFilterData.ACTIVOS = dataReques.cliente.activos;
        dataFilterData.VENTAS = dataReques.cliente.ventas_an;
        dataFilterData.VINCULADO = dataReques.cliente.vinculado;
        dataFilterData.AGENCIA = dataReques.cliente.oficina;
        dataFilterData.ANTIGUEDAD_COOMEVA = dataReques.cliente.antiguedad_coo;

        if (dataReques.hasOwnProperty('creditoNuevo')) {

            if (dataReques.creditoNuevo.length > 0) {
                dataFilterData.TIPO_TASA = `${dataReques.creditoNuevo[1].tipoTasa === undefined ? '' : dataReques.creditoNuevo[1].tipoTasa}, ${dataReques.creditoNuevo[0].tipoTasa === undefined ? '' : dataReques.creditoNuevo[0].tipoTasa}`;
                dataFilterData.VALOR_IBR = `${isNaN(parseFloat(dataReques.creditoNuevo[1].modalidadTasa).toFixed(2)) ? '' : parseFloat(dataReques.creditoNuevo[1].modalidadTasa).toFixed(2)}, ${isNaN(parseFloat(dataReques.creditoNuevo[0].modalidadTasa).toFixed(2)) ? '' : parseFloat(dataReques.creditoNuevo[0].modalidadTasa).toFixed(2)}`;
                dataFilterData.LIN_NUM = `${dataReques.creditoNuevo[1].codCupo === undefined ? '' : dataReques.creditoNuevo[1].codCupo}, ${dataReques.creditoNuevo[0].codCupo === undefined ? '' : dataReques.creditoNuevo[0].codCupo}`;
                dataFilterData.COD_PRODUC = fnCodProducto(dataReques.solicitud);
                dataFilterData.CREDITO_NUEVO_SPREAD = `${isNaN(parseFloat(dataReques.creditoNuevo[1].spreadIbr).toFixed(1)) ? '' : parseFloat(dataReques.creditoNuevo[1].spreadIbr).toFixed(1)}, ${isNaN(parseFloat(dataReques.creditoNuevo[0].spreadIbr).toFixed(1)) ? '' : parseFloat(dataReques.creditoNuevo[0].spreadIbr).toFixed(1)}`;
                dataFilterData.CREDITO_NUEVO_MONTO = `${dataReques.creditoNuevo[1].monto === undefined ? '' : dataReques.creditoNuevo[1].monto}, ${dataReques.creditoNuevo[0].monto === undefined ? '' : dataReques.creditoNuevo[0].monto}`;
                dataFilterData.CREDITO_NUEVO_PLAZO = `${dataReques.creditoNuevo[1].plazo === undefined ? '' : dataReques.creditoNuevo[1].plazo}, ${dataReques.creditoNuevo[0].plazo === undefined ? '' : dataReques.creditoNuevo[0].plazo}`;
                dataFilterData.CREDITO_NUEVO_RDTO = `${isNaN(parseFloat(dataReques.creditoNuevo[1].spreadRedescuento).toFixed(1)) ? '' : parseFloat(dataReques.creditoNuevo[1].spreadRedescuento).toFixed(1)}, ${isNaN(parseFloat(dataReques.creditoNuevo[0].spreadRedescuento).toFixed(1)) ? '' : parseFloat(dataReques.creditoNuevo[0].spreadRedescuento).toFixed(1)}`;
                dataFilterData.CREDITO_NUEVO_FNG = `${isNaN(parseFloat(dataReques.creditoNuevo[1].coberturaFng).toFixed(1)) ? '' : parseFloat(dataReques.creditoNuevo[1].coberturaFng).toFixed(1)}, ${isNaN(parseFloat(dataReques.creditoNuevo[0].coberturaFng).toFixed(1)) ? '' : parseFloat(dataReques.creditoNuevo[0].coberturaFng).toFixed(1)}`;
                dataFilterData.CREDITO_NUEVO_TIPO_RDTO = `${dataReques.creditoNuevo[1].Tipo_RDTO === undefined ? '' : dataReques.creditoNuevo[1].Tipo_RDTO}, ${dataReques.creditoNuevo[0].Tipo_RDTO === undefined ? '' : dataReques.creditoNuevo[0].Tipo_RDTO}`;

            } else {
                dataFilterData.TIPO_TASA = "";
                dataFilterData.VALOR_IBR = "";
                dataFilterData.LIN_NUM = "";
                dataFilterData.COD_PRODUC = "";
                dataFilterData.CREDITO_NUEVO_SPREAD = "";
                dataFilterData.CREDITO_NUEVO_MONTO = "";
                dataFilterData.CREDITO_NUEVO_PLAZO = "";
                dataFilterData.CREDITO_NUEVO_RDTO = "";
                dataFilterData.CREDITO_NUEVO_FNG = "";
                dataFilterData.CREDITO_NUEVO_TIPO_RDTO = "";
                //dataFilterData.VALOR_CAPTACION = "";
                //dataFilterData.VALOR_CAPTACION_TASA_NAMV = "";
            };

        } else {
            dataReques.tipoTasa = "";
            dataReques.valorIbr = "";
            dataReques.linNum = "";
            dataReques.nuevoSpread = "";
            dataReques.nuevoMonto = "";
            dataReques.nuevoPlazo = "";
            dataReques.nuevoRdto = "";
            dataReques.nuevoFng = "";
            //dataReques.valorCaptacion = "";
            //dataReques.captacionTasaNamv = "";
        };


        /* reciprocidad */
        let valorAhorro = isNaN(parseInt(dataReques.reciprocidadResumen.corriente.monto0)) ? 0 : parseInt(dataReques.reciprocidadResumen.corriente.monto0);
        let tasaAhorro = isNaN(parseFloat(dataReques.reciprocidadResumen.corriente.tasa0)) ? 0 : parseFloat(dataReques.reciprocidadResumen.corriente.tasa0);
        let valorCorriente = isNaN(parseInt(dataReques.reciprocidadResumen.ahorro.monto1)) ? 0 : parseInt(dataReques.reciprocidadResumen.ahorro.monto1);
        let tasaCorriente = isNaN(parseFloat(dataReques.reciprocidadResumen.ahorro.tasa1)) ? 0 : parseFloat(dataReques.reciprocidadResumen.ahorro.tasa1);

        let valorCaptacion = valorAhorro + valorCorriente;
        let captacionTasaNamv = isNaN(((valorAhorro * tasaAhorro) + (valorCorriente * tasaCorriente)) / (valorAhorro + valorCorriente)) ? 0 : ((valorAhorro * tasaAhorro) + (valorCorriente * tasaCorriente)) / (valorAhorro + valorCorriente);

        dataFilterData.VALOR_CAPTACION = `${valorCaptacion}`;
        dataFilterData.VALOR_CAPTACION_TASA_NAMV = `${parseFloat(captacionTasaNamv).toFixed(2)}`;


        /* convenioPago */
        dataFilterData.INGRESO_PROMEDIO_MES = `${dataReques.convenioPago.convenioPagoNominaTipo.ingresoPromedioMes === undefined ? "" : dataReques.convenioPago.convenioPagoNominaTipo.ingresoPromedioMes}`;
        dataFilterData.NOMINA_NUM_EMPLEA_BCO = `${dataReques.convenioPago.convenioPagoNominaTipo.nEmpleadoCuentBancoomeva === undefined ? "" : dataReques.convenioPago.convenioPagoNominaTipo.nEmpleadoCuentBancoomeva}`;
        dataFilterData.TIPO_FRECUENCIA_PAGO = `${dataReques.convenioPago.convenioPagoNominaTipo.frecuenciaPago === undefined ? "" : dataReques.convenioPago.convenioPagoNominaTipo.frecuenciaPago}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1100)) {
                dataReques.retiroOfiCant = element.cantidad;
                break;
            } else {
                dataReques.retiroOfiCant = "";
            };
        };

        dataFilterData.NOMINA_RETIRO_OFI_CANT = `${dataReques.retiroOfiCant === undefined ? "" : dataReques.retiroOfiCant}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1097)) {
                dataReques.retiroVerdeCant = element.cantidad;
                break;
            } else {
                dataReques.retiroVerdeCant = "";
            };
        };

        dataFilterData.NOMINA_RETIRO_VERDE_CANT = `${dataReques.retiroVerdeCant === undefined ? "" : dataReques.retiroVerdeCant}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1099)) {
                dataReques.retiroEfectyCant = element.cantidad;
                break;
            } else {
                dataReques.retiroEfectyCant = "";
            };
        };

        dataFilterData.NOMINA_RETIRO_EFECTY_CANT = `${dataReques.retiroEfectyCant === undefined ? "" : dataReques.retiroEfectyCant}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1098)) {
                dataReques.retiroSyPCant = element.cantidad;
                break;
            } else {
                dataReques.retiroSyPCant = "";
            };
        };

        dataFilterData.NOMINA_RETIRO_SYP_CANT = `${dataReques.retiroSyPCant === undefined ? "" : dataReques.retiroSyPCant}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1098) && Object.keys(element).includes('tarifaNegociada')) {
                dataReques.nominaSyPTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.nominaSyPTrfa = "";
            };
        };

        dataFilterData.NOMINA_SYP_TRFA = `${dataReques.nominaSyPTrfa === undefined ? "" : dataReques.nominaSyPTrfa}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1102) && Object.keys(element).includes('tarifaNegociada')) {
                dataReques.nominaBcoTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.nominaBcoTrfa = "";
            };
        };

        dataFilterData.NOMINA_BCO_TRFA = `${dataReques.nominaBcoTrfa === undefined ? "" : dataReques.nominaBcoTrfa}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1103) && Object.keys(element).includes('tarifaNegociada')) {
                dataReques.nominaChipTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.nominaChipTrfa = "";
            };
        };

        dataFilterData.NOMINA_CHIP_TRFA = `${dataReques.nominaChipTrfa === undefined ? "" : dataReques.nominaChipTrfa}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1101)) {
                dataReques.nominaTransInterAchCd = element.tarifaCosto;
                break;
            } else {
                dataReques.nominaTransInterAchCd = "";
            };
        };

        dataFilterData.NOMINA_TRANS_INTER_ACH_CD = `${dataReques.nominaTransInterAchCd === undefined ? "" : dataReques.nominaTransInterAchCd}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1102)) {
                dataReques.nominaBcoCd = element.tarifaCosto;
                break;
            } else {
                dataReques.nominaBcoCd = "";
            };
        };

        dataFilterData.NOMINA_BCO_CD = `${dataReques.nominaBcoCd === undefined ? "" : dataReques.nominaBcoCd}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1103)) {
                dataReques.nominaCuotaChipCd = element.tarifaCosto;
                break;
            } else {
                dataReques.nominaCuotaChipCd = "";
            };
        };

        dataFilterData.NOMINA_CUOTA_CHIP_CD = `${dataReques.nominaCuotaChipCd === undefined ? "" : dataReques.nominaCuotaChipCd}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1096)) {
                dataReques.nominaRetiroAtmPropioCd = element.tarifaCosto;
                break;
            } else {
                dataReques.nominaRetiroAtmPropioCd = "";
            };
        };

        dataFilterData.NOMINA_RETIRO_ATM_PROPIO_CD = `${dataReques.nominaRetiroAtmPropioCd === undefined ? "" : dataReques.nominaRetiroAtmPropioCd}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1097)) {
                dataReques.nominaRetiroAtmVerdeCd = element.tarifaCosto;
                break;
            } else {
                dataReques.nominaRetiroAtmVerdeCd = "";
            };
        };

        dataFilterData.NOMINA_RETIRO_ATM_VERDE_CD = `${dataReques.nominaRetiroAtmVerdeCd === undefined ? "" : dataReques.nominaRetiroAtmVerdeCd}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1099)) {
                dataReques.nominaRetiroEfectyCd = element.tarifaCosto;
                break;
            } else {
                dataReques.nominaRetiroEfectyCd = "";
            };
        };

        dataFilterData.NOMINA_RETIRO_EFECTY_CD = `${dataReques.nominaRetiroEfectyCd === undefined ? "" : dataReques.nominaRetiroEfectyCd}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1098)) {
                dataReques.nominaRetiroSyPCd = element.tarifaCosto;
                break;
            } else {
                dataReques.nominaRetiroSyPCd = "";
            };
        };

        dataFilterData.NOMINA_RETIRO_SYP_CD = `${dataReques.nominaRetiroSyPCd === undefined ? "" : dataReques.nominaRetiroSyPCd}`;


        for (const element of dataReques.convenioPago.convenioPagoNominaNegociada) {
            if (Object.values(element).includes(1101)) {
                dataReques.nominaTransfInterTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.nominaTransfInterTrfa = "";
            };
        };

        dataFilterData.NOMINA_TRANS_INTER_TRFA = `${dataReques.nominaTransfInterTrfa === undefined ? "" : dataReques.nominaTransfInterTrfa}`;


        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(472)) {
                dataReques.pagosTercerosBcoCant = element.cantidadNueva;
                break;
            } else {
                dataReques.pagosTercerosBcoCant = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_BCO_CANT = `${dataReques.pagosTercerosBcoCant === undefined ? "" : dataReques.pagosTercerosBcoCant}`;


        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(472)) {
                dataReques.pagosTercerosBcoTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.pagosTercerosBcoTrfa = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_BCO_TRFA = `${dataReques.pagosTercerosBcoTrfa === undefined ? "" : dataReques.pagosTercerosBcoTrfa}`;


        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(472)) {
                dataReques.pagosTercerosBcoCd = element.tarifaCosto;
                break;
            } else {
                dataReques.pagosTercerosBcoCd = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_BCO_CD = `${dataReques.pagosTercerosBcoCd === undefined ? "" : dataReques.pagosTercerosBcoCd}`;;


        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(473)) {
                dataReques.pagosTercerosAchCant = element.cantidadNueva;
                break;
            } else {
                dataReques.pagosTercerosAchCant = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_ACH_CANT = `${dataReques.pagosTercerosAchCant === undefined ? "" : dataReques.pagosTercerosAchCant}`;


        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(473)) {
                dataReques.pagosTercerosAchTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.pagosTercerosAchTrfa = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_ACH_TRFA = `${dataReques.pagosTercerosAchTrfa === undefined ? "" : dataReques.pagosTercerosAchTrfa}`;


        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(473)) {
                dataReques.pagosTercerosAchCd = element.tarifaCosto;
                break;
            } else {
                dataReques.pagosTercerosAchCd = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_PAGO_ACH_CD = `${dataReques.pagosTercerosAchCd === undefined ? "" : dataReques.pagosTercerosAchCd}`;


        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(474)) {
                dataReques.pagosTercerosSebraCant = element.cantidadNueva;
                break;
            } else {
                dataReques.pagosTercerosSebraCant = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_SEBRA_CANT = `${dataReques.pagosTercerosSebraCant === undefined ? "" : dataReques.pagosTercerosSebraCant}`;

        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(474)) {
                dataReques.pagosTercerosSebraTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.pagosTercerosSebraTrfa = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_SEBRA_TRFA = `${dataReques.pagosTercerosSebraTrfa === undefined ? "" : dataReques.pagosTercerosSebraTrfa}`;


        for (const element of dataReques.convenioPago.convenioPagoTerceros) {
            if (Object.values(element).includes(474)) {
                dataReques.pagosTercerosSebraCd = element.tarifaCosto;
                break;
            } else {
                dataReques.pagosTercerosSebraCd = "";
            };
        };

        dataFilterData.PAGO_TERCEROS_PAGO_SEBRA_CD = `${dataReques.pagosTercerosSebraCd === undefined ? "" : dataReques.pagosTercerosSebraCd}`;


        /* convenioRecaudo */
        for (const element of dataReques.convenioRecaudo.recaudoOficina) {
            if (Object.values(element).includes(2)) {
                dataReques.recaudoManualCant = element.cantidad;
                break;
            } else {
                dataReques.recaudoManualCant = "";
            };
        };

        dataFilterData.RECAUDO_MANUAL_CANT = `${dataReques.recaudoManualCant === undefined ? "" : dataReques.recaudoManualCant}`;

        for (const element of dataReques.convenioRecaudo.recaudoOficina) {
            if (Object.values(element).includes(2)) {
                dataReques.recaudoManualTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.recaudoManualTrfa = "";
            };
        };

        dataFilterData.RECAUDO_MANUAL_TRFA = `${dataReques.recaudoManualTrfa === undefined ? "" : dataReques.recaudoManualTrfa}`;

        for (const element of dataReques.convenioRecaudo.recaudoOficina) {
            if (Object.values(element).includes(2)) {
                dataReques.recaudoManualCd = element.tarifaCosto;
                break;
            } else {
                dataReques.recaudoManualCd = "";
            };
        };

        dataFilterData.RECAUDO_MANUAL_CD = `${dataReques.recaudoManualCd === undefined ? "" : dataReques.recaudoManualCd}`;

        for (const element of dataReques.convenioRecaudo.recaudoOficina) {
            if (Object.values(element).includes(1)) {
                dataReques.recaudoBarrasCant = element.cantidad;
                break;
            } else {
                dataReques.recaudoBarrasCant = "";
            };
        };

        dataFilterData.RECAUDO_BARRAS_CANT = `${dataReques.recaudoBarrasCant === undefined ? "" : dataReques.recaudoBarrasCant}`;

        for (const element of dataReques.convenioRecaudo.recaudoOficina) {
            if (Object.values(element).includes(1)) {
                dataReques.recaudoBarrasTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.recaudoBarrasTrfa = "";
            };
        };

        dataFilterData.RECAUDO_BARRAS_TRFA = `${dataReques.recaudoBarrasTrfa === undefined ? "" : dataReques.recaudoBarrasTrfa}`;

        for (const element of dataReques.convenioRecaudo.recaudoOficina) {
            if (Object.values(element).includes(1)) {
                dataReques.recaudoBarrasCd = element.tarifaCosto;
                break;
            } else {
                dataReques.recaudoBarrasCd = "";
            };
        };

        dataFilterData.RECAUDO_BARRAS_CD = `${dataReques.recaudoBarrasCd === undefined ? "" : dataReques.recaudoBarrasCd}`;

        for (const element of dataReques.convenioRecaudo.recaudoCorresponsales) {
            if (Object.values(element).includes(7)) {
                dataReques.recaudoEfectyTicket = element.ticket_promedio;
                break;
            } else {
                dataReques.recaudoEfectyTicket = "";
            };
        };

        dataFilterData.RECAUDO_EFECTY_TICKET = `${dataReques.recaudoEfectyTicket === undefined ? "" : dataReques.recaudoEfectyTicket}`;

        for (const element of dataReques.convenioRecaudo.recaudoCorresponsales) {
            if (Object.values(element).includes(7)) {
                dataReques.recaudoEfectyCant = element.cantidad;
                break;
            } else {
                dataReques.recaudoEfectyCant = "";
            };
        };

        dataFilterData.RECAUDO_EFECTY_CANT = `${dataReques.recaudoEfectyCant === undefined ? "" : dataReques.recaudoEfectyCant}`;

        for (const element of dataReques.convenioRecaudo.recaudoCorresponsales) {
            if (Object.values(element).includes(9)) {
                dataReques.recaudoSyPCant = element.cantidad;
                break;
            } else {
                dataReques.recaudoSyPCant = "";
            };
        };

        dataFilterData.RECAUDO_SYP_CANT = `${dataReques.recaudoSyPCant === undefined ? "" : dataReques.recaudoSyPCant}`;

        for (const element of dataReques.convenioRecaudo.recaudoCorresponsales) {
            if (Object.values(element).includes(7)) {
                dataReques.recaudoEfectyTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.recaudoEfectyTrfa = "";
            };
        };

        dataFilterData.RECAUDO_EFECTY_TRFA = `${dataReques.recaudoEfectyTrfa === undefined ? "" : dataReques.recaudoEfectyTrfa}`;

        for (const element of dataReques.convenioRecaudo.recaudoCorresponsales) {
            if (Object.values(element).includes(9)) {
                dataReques.recaudoSyPTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.recaudoSyPTrfa = "";
            };
        };

        dataFilterData.RECAUDO_SYP_TRFA = `${dataReques.recaudoSyPTrfa === undefined ? "" : dataReques.recaudoSyPTrfa}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(2)) {
                dataReques.recaudoPsePagwebCant = element.cantidad;
                break;
            } else {
                dataReques.recaudoPsePagwebCant = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PAGWEB_CANT = `${dataReques.recaudoPsePagwebCant === undefined ? "" : dataReques.recaudoPsePagwebCant}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(2)) {
                dataReques.recaudoPsePagwebPromedio = element.ticket;
                break;
            } else {
                dataReques.recaudoPsePagwebPromedio = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PAGWEB_PROMEDIO = `${dataReques.recaudoPsePagwebPromedio === undefined ? "" : dataReques.recaudoPsePagwebPromedio}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(2)) {
                dataReques.recaudoPsePagwebCodser = element.idrecaudoPse;
                break;
            } else {
                dataReques.recaudoPsePagwebCodser = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PAGWEB_CODSER = `${dataReques.recaudoPsePagwebCodser === undefined ? "" : dataReques.recaudoPsePagwebCodser}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(2)) {
                dataReques.recaudoPsePagwebTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.recaudoPsePagwebTrfa = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PAGWEB_TRFA = `${dataReques.recaudoPsePagwebTrfa === undefined ? "" : dataReques.recaudoPsePagwebTrfa}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(1)) {
                dataReques.recaudoPsePortalCant = element.cantidad;
                break;
            } else {
                dataReques.recaudoPsePortalCant = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PORTAL_CANT = `${dataReques.recaudoPsePortalCant === undefined ? "" : dataReques.recaudoPsePortalCant}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(1)) {
                dataReques.recaudoPsePortalPromedio = element.ticket;
                break;
            } else {
                dataReques.recaudoPsePortalPromedio = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PORTAL_PROMEDIO = `${dataReques.recaudoPsePortalPromedio === undefined ? "" : dataReques.recaudoPsePortalPromedio}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(1)) {
                dataReques.recaudoPsePortalCodser = element.idrecaudoPse;
                break;
            } else {
                dataReques.recaudoPsePortalCodser = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PORTAL_CODSER = `${dataReques.recaudoPsePortalCodser === undefined ? "" : dataReques.recaudoPsePortalCodser}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(1)) {
                dataReques.recaudoPsePortalTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.recaudoPsePortalTrfa = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PORTAL_TRFA = `${dataReques.recaudoPsePortalTrfa === undefined ? "" : dataReques.recaudoPsePortalTrfa}`;

        for (const element of dataReques.convenioRecaudo.recaudoPSE) {
            if (Object.values(element).includes(2)) {
                dataReques.recaudoPsePaginawebCd = element.tarifaCosto;
                break;
            } else {
                dataReques.recaudoPsePaginawebCd = "";
            };
        };

        dataFilterData.RECAUDO_PSE_PAGWEB_CD = `${dataReques.recaudoPsePaginawebCd === undefined ? "" : dataReques.recaudoPsePaginawebCd}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(8)) {
                dataReques.adquiDvisaFtra = element.facturacion;
                break;
            } else {
                dataReques.adquiDvisaFtra = "";
            };
        };

        dataFilterData.ADQUI_DVISA_FTRA = `${dataReques.adquiDvisaFtra === undefined ? "" : dataReques.adquiDvisaFtra}`;

        /* ADQUI_DVISA_TICKET */
        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(8)) {
                dataReques.adquiDvisaTicket = element.ticket;
                break;
            } else {
                dataReques.adquiDvisaTicket = "";
            };
        };

        dataFilterData.ADQUI_DVISA_TICKET = `${dataReques.adquiDvisaTicket === undefined ? "" : dataReques.adquiDvisaTicket}`;
        /* 000 */

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(9)) {
                dataReques.adquiDelectronFtra = element.facturacion;
                break;
            } else {
                dataReques.adquiDelectronFtra = "";
            };
        };

        dataFilterData.ADQUI_DELECTRON_FTRA = `${dataReques.adquiDelectronFtra === undefined ? "" : dataReques.adquiDelectronFtra}`;

        /* TICKET */
        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(9)) {
                dataReques.adquiDelectronTicket = element.ticket;
                break;
            } else {
                dataReques.adquiDelectronTicket = "";
            };
        };

        dataFilterData.ADQUI_DELECTRON_TICKET = `${dataReques.adquiDelectronTicket === undefined ? "" : dataReques.adquiDelectronTicket}`;
        /* 000 */

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(7)) {
                dataReques.adquiCvisaFtra = element.facturacion;
                break;
            } else {
                dataReques.adquiCvisaFtra = "";
            };
        };

        dataFilterData.ADQUI_CVISA_FTRA = `${dataReques.adquiCvisaFtra === undefined ? "" : dataReques.adquiCvisaFtra}`;

        /* ADQUI_CVISA_TICKET*/
        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(7)) {
                dataReques.adquiCvisaTicket = element.ticket;
                break;
            } else {
                dataReques.adquiCvisaTicket = "";
            };
        };

        dataFilterData.ADQUI_CVISA_TICKET = `${dataReques.adquiCvisaTicket === undefined ? "" : dataReques.adquiCvisaTicket}`;
        /* 000 */

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(10)) {
                dataReques.adquiDmasterFtra = element.facturacion;
                break;
            } else {
                dataReques.adquiDmasterFtra = "";
            };
        };

        dataFilterData.ADQUI_DMASTER_FTRA = `${dataReques.adquiDmasterFtra === undefined ? "" : dataReques.adquiDmasterFtra}`;

        /* ADQUI_DMASTER_TICKET*/
        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(10)) {
                dataReques.adquiDmasterTicket = element.ticket;
                break;
            } else {
                dataReques.adquiDmasterTicket = "";
            };
        };

        dataFilterData.ADQUI_DMASTER_TICKET = `${dataReques.adquiDmasterTicket === undefined ? "" : dataReques.adquiDmasterTicket}`;
        /* 000 */

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(11)) {
                dataReques.adquiCmasterFtra = element.facturacion;
                break;
            } else {
                dataReques.adquiCmasterFtra = "";
            };
        };

        dataFilterData.ADQUI_CMASTER_FTRA = `${dataReques.adquiCmasterFtra === undefined ? "" : dataReques.adquiCmasterFtra}`;

        /* ADQUI_CMASTER_TICKET*/
        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(11)) {
                dataReques.adquiCmasterTicket = element.ticket;
                break;
            } else {
                dataReques.adquiCmasterTicket = "";
            };
        };

        dataFilterData.ADQUI_CMASTER_TICKET = `${dataReques.adquiCmasterTicket === undefined ? "" : dataReques.adquiCmasterTicket}`;
        /* 000 */

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(8)) {
                dataReques.adquiDvisaTrfa = parseFloat(parseFloat(element.tarifaNegociada) / 100).toFixed(4);
                break;
            } else {
                dataReques.adquiDvisaTrfa = "";
            };
        };

        dataFilterData.ADQUI_DVISA_TRFA = `${dataReques.adquiDvisaTrfa === undefined ? "" : Number(dataReques.adquiDvisaTrfa * 100).toFixed(2)}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(9)) {
                dataReques.adquiDelectronTrfa = parseFloat(parseFloat(element.tarifaNegociada) / 100).toFixed(4);
                break;
            } else {
                dataReques.adquiDelectronTrfa = "";
            };
        };

        dataFilterData.ADQUI_DELECTRON_TRFA = `${dataReques.adquiDelectronTrfa === undefined ? "" : Number(dataReques.adquiDelectronTrfa * 100).toFixed(2)}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(7)) {
                dataReques.adquiCvisaTrfa = parseFloat(parseFloat(element.tarifaNegociada) / 100).toFixed(4);
                break;
            } else {
                dataReques.adquiCvisaTrfa = "";
            };
        };

        dataFilterData.ADQUI_CVISA_TRFA = `${dataReques.adquiCvisaTrfa === undefined ? "" : Number(dataReques.adquiCvisaTrfa * 100).toFixed(2)}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(10)) {
                dataReques.adquiDmasterTrfa = parseFloat(parseFloat(element.tarifaNegociada) / 100).toFixed(4);
                break;
            } else {
                dataReques.adquiDmasterTrfa = "";
            };
        };

        dataFilterData.ADQUI_DMASTER_TRFA = `${dataReques.adquiDmasterTrfa === undefined ? "" : Number(dataReques.adquiDmasterTrfa * 100).toFixed(2)}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(11)) {
                dataReques.adquiCmasterTrfa = parseFloat(parseFloat(element.tarifaNegociada) / 100).toFixed(4);
                break;
            } else {
                dataReques.adquiCmasterTrfa = "";
            };
        };

        dataFilterData.ADQUI_CMASTER_TRFA = `${dataReques.adquiCmasterTrfa === undefined ? "" : Number(dataReques.adquiCmasterTrfa * 100).toFixed(2)}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(8)) {
                dataReques.adquiDvisaMcc = parseFloat((element.tarifaRemi.replace('%', '')).trim()).toFixed(2);
                break;
            } else {
                dataReques.adquiDvisaMcc = "";
            };
        };

        dataFilterData.MCC = `${dataReques.remi[0] === undefined ? "" : dataReques.remi[0]}`;
        dataFilterData.ADQUI_DVISA_MCC = `${dataReques.adquiDvisaMcc === undefined ? "" : dataReques.adquiDvisaMcc}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(9)) {
                dataReques.adquiDelectronMcc = parseFloat((element.tarifaRemi.replace('%', '')).trim()).toFixed(2);
                break;
            } else {
                dataReques.adquiDelectronMcc = "";
            };
        };

        dataFilterData.ADQUI_DELECTRON_MCC = `${dataReques.adquiDelectronMcc === undefined ? "" : dataReques.adquiDelectronMcc}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(7)) {
                dataReques.adquiCvisaMcc = parseFloat((element.tarifaRemi.replace('%', '')).trim()).toFixed(2);
                break;
            } else {
                dataReques.adquiCvisaMcc = "";
            };
        };

        dataFilterData.ADQUI_CVISA_MCC = `${dataReques.adquiCvisaMcc === undefined ? "" : dataReques.adquiCvisaMcc}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(10)) {
                dataReques.adquiDmasterMcc = parseFloat((element.tarifaRemi.replace('%', '')).trim()).toFixed(2);
                break;
            } else {
                dataReques.adquiDmasterMcc = "";
            };
        };

        dataFilterData.ADQUI_DMASTER_MCC = `${dataReques.adquiDmasterMcc === undefined ? "" : dataReques.adquiDmasterMcc}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(11)) {
                dataReques.adquiCmasterMcc = parseFloat((element.tarifaRemi.replace('%', '')).trim()).toFixed(2);
                break;
            } else {
                dataReques.adquiCmasterMcc = "";
            };
        };

        dataFilterData.ADQUI_CMASTER_MCC = `${dataReques.adquiCmasterMcc === undefined ? "" : dataReques.adquiCmasterMcc}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(12)) {
                dataReques.adquiDmastroMcc = parseFloat((element.tarifaRemi.replace('%', '')).trim()).toFixed(2);
                break;
            } else {
                dataReques.adquiDmastroMcc = "";
            };
        };

        dataFilterData.ADQUI_DMAESTRO_MCC = `${dataReques.adquiDmastroMcc === undefined ? "" : dataReques.adquiDmastroMcc}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(12)) {
                dataReques.adquiDmastroftra = element.facturacion;
                break;
            } else {
                dataReques.adquiDmastroftra = "";
            };
        };

        dataFilterData.ADQUI_DMAESTRO_FTRA = `${dataReques.adquiDmastroftra === undefined ? "" : dataReques.adquiDmastroftra}`;

        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(12)) {
                dataReques.adquiDmastroTrfa = parseFloat(parseFloat(element.tarifaNegociada) / 100).toFixed(4);
                break;
            } else {
                dataReques.adquiDmastroTrfa = "";
            };
        };

        dataFilterData.ADQUI_DMAESTRO_TRFA = `${dataReques.adquiDmastroTrfa === undefined ? "" : Number(dataReques.adquiDmastroTrfa * 100).toFixed(2)}`;

        /* TICKET */
        for (const element of dataReques.convenioRecaudo.adquirencia) {
            if (Object.values(element).includes(12)) {
                dataReques.adquiDmastroTicket = element.ticket;
                break;
            } else {
                dataReques.adquiDmastroTicket = "";
            };
        };

        dataFilterData.ADQUI_DMAESTRO_TICKET = `${dataReques.adquiDmastroTicket === undefined ? "" : dataReques.adquiDmastroTicket}`;
        /* 000 */

        /* REDES */
        dataFilterData.ADQUI_CREDIBANCO_VP = dataReques.convenioRecaudo.redes.credibanVp;
        dataFilterData.ADQUI_REDEBAN_VP = dataReques.convenioRecaudo.redes.redebanVp;
        dataFilterData.ADQUI_CREDIBANCO_VNP = dataReques.convenioRecaudo.redes.credibancoVnp;
        dataFilterData.ADQUI_REDEBAN_VNP = dataReques.convenioRecaudo.redes.redebanVnp;
        dataFilterData.ADQUI_REDEBAN_MICRO = dataReques.convenioRecaudo.redes.redebanMicropagos;
        dataFilterData.ADQUI_CREDIBANCO_VENDING = dataReques.convenioRecaudo.redes.credibancoVendig;
        dataFilterData.ADQUI_CREDIBANCO_TRMASIVO = dataReques.convenioRecaudo.redes.credibancoTrMasivo;
        /* 000 */

        for (const element of dataReques.convenioRecaudo.gastoasOficina) {
            if (Object.values(element).includes(253)) {
                dataReques.convenioGastoOficina = dataReques.convenioRecaudo.gastoasOficina[0].tarifaPlena;
                break;
            } else {
                dataReques.convenioGastoOficina = "0";
            };
        };

        for (const element of dataReques.convenioRecaudo.gastosPse) {
            if (Object.values(element).includes(31)) {
                dataReques.convenioGastoPse = dataReques.convenioRecaudo.gastosPse[1].tarifaPlena;
                break;
            } else {
                dataReques.convenioGastoPse = "0";
            };
        };

        for (const element of dataReques.convenioRecaudo.gastosPse) {
            if (Object.values(element).includes(30)) {
                dataReques.convenioGastoTrx = dataReques.convenioRecaudo.gastosPse[0].tarifaPlena;
                break;
            } else {
                dataReques.convenioGastoTrx = "0";
            };
        };

        dataReques.convenioGastoCliente = isNaN(parseInt(dataReques.convenioGastoOficina) + parseInt(dataReques.convenioGastoPse) + parseInt(dataReques.convenioGastoTrx)) ? '' : (parseInt(dataReques.convenioGastoOficina) + parseInt(dataReques.convenioGastoPse) + parseInt(dataReques.convenioGastoTrx));
        dataFilterData.CONVENIOS_GASTOS_CLIENTE = `${dataReques.convenioGastoCliente === undefined ? "" : dataReques.convenioGastoCliente}`;

        for (const element of dataReques.convenioRecaudo.gastoasOficina) {
            if (Object.values(element).includes(253)) {
                dataReques.convenioMesDiferirOficina = dataReques.convenioRecaudo.gastoasOficina[0].mesesDiferir;
                break;
            } else {
                dataReques.convenioMesDiferirOficina = "0";
            };
        };

        for (const element of dataReques.convenioRecaudo.gastosPse) {
            if (Object.values(element).includes(31)) {
                dataReques.convenioMesDiferirPse = dataReques.convenioRecaudo.gastosPse[1].mesesDiferir;
                break;
            } else {
                dataReques.convenioMesDiferirPse = "0";
            };
        };

        for (const element of dataReques.convenioRecaudo.gastosPse) {
            if (Object.values(element).includes(30)) {
                dataReques.convenioMesDiferirTrx = dataReques.convenioRecaudo.gastosPse[0].mesesDiferir;
                break;
            } else {
                dataReques.convenioMesDiferirTrx = "0";
            };
        };

        //let recaudoOficina = (parseInt(dataReques.convenioGastoOficina) * parseInt(dataReques.convenioMesDiferirOficina));
        //let recaudoPse = (parseInt(dataReques.convenioGastoPse) * parseInt(dataReques.convenioMesDiferirPse));
        //let recaudoTrx = (parseInt(dataReques.convenioGastoTrx) * parseInt(dataReques.convenioMesDiferirTrx));

        let recaudoOficina = (parseInt(dataReques.convenioMesDiferirOficina));
        let recaudoPse = (parseInt(dataReques.convenioMesDiferirPse));
        let recaudoTrx = (parseInt(dataReques.convenioMesDiferirTrx));

        dataReques.convenioMesDiferir = isNaN((recaudoOficina + recaudoPse + recaudoTrx) / (dataReques.convenioRecaudo.gastosPse.length + dataReques.convenioRecaudo.gastoasOficina.length)) ? '' : ((recaudoOficina + recaudoPse + recaudoTrx) / (dataReques.convenioRecaudo.gastosPse.length + dataReques.convenioRecaudo.gastoasOficina.length));
        dataFilterData.CONVENIOS_MESES_DIFERIR = `${dataReques.convenioMesDiferir === undefined ? "" : dataReques.convenioMesDiferir}`;

        /* servicioFinanciero */
        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(4)) {
                dataReques.serviciosChequegTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.serviciosChequegTrfa = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUEG_TRFA = `${dataReques.serviciosChequegTrfa === undefined ? "" : dataReques.serviciosChequegTrfa}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(4)) {
                dataReques.serviciosChequegCant = element.cantidad;
                break;
            } else {
                dataReques.serviciosChequegCant = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUEG_CANT = `${dataReques.serviciosChequegCant === undefined ? "" : dataReques.serviciosChequegCant}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(4)) {
                dataReques.serviciosChequegCd = element.costo;
                break;
            } else {
                dataReques.serviciosChequegCd = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUEG_CD = `${dataReques.serviciosChequegCd === undefined ? "" : dataReques.serviciosChequegCd}`;

        /* cheques */
        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(2)) {
                dataReques.serviciosCheque30Trfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.serviciosCheque30Trfa = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUE30_TRFA = `${dataReques.serviciosCheque30Trfa === undefined ? "" : dataReques.serviciosCheque30Trfa}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(2)) {
                dataReques.serviciosCheque30Cant = element.cantidad;
                break;
            } else {
                dataReques.serviciosCheque30Cant = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUE30_CANT = `${dataReques.serviciosCheque30Cant === undefined ? "" : dataReques.serviciosCheque30Cant}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(2)) {
                dataReques.serviciosCheque30Cd = element.costo;
                break;
            } else {
                dataReques.serviciosCheque30Cd = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUE30_CD = `${dataReques.serviciosCheque30Cd === undefined ? "" : dataReques.serviciosCheque30Cd}`;
        /* --- */
        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(3)) {
                dataReques.serviciosCheque100Trfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.serviciosCheque100Trfa = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUE100_TRFA = `${dataReques.serviciosCheque100Trfa === undefined ? "" : dataReques.serviciosCheque100Trfa}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(3)) {
                dataReques.serviciosCheque100Cant = element.cantidad;
                break;
            } else {
                dataReques.serviciosCheque100Cant = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUE100_CANT = `${dataReques.serviciosCheque100Cant === undefined ? "" : dataReques.serviciosCheque100Cant}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(3)) {
                dataReques.serviciosCheque100Cd = element.costo;
                break;
            } else {
                dataReques.serviciosCheque100Cd = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUE100_CD = `${dataReques.serviciosCheque100Cd === undefined ? "" : dataReques.serviciosCheque100Cd}`;
        /* --- */

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(5)) {
                dataReques.serviciosChequeConTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.serviciosChequeConTrfa = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUECON_TRFA = `${dataReques.serviciosChequeConTrfa === undefined ? "" : dataReques.serviciosChequeConTrfa}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(5)) {
                dataReques.serviciosChequeConCant = element.cantidad;
                break;
            } else {
                dataReques.serviciosChequeConCant = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUECON_CANT = `${dataReques.serviciosChequeConCant === undefined ? "" : dataReques.serviciosChequeConCant}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(5)) {
                dataReques.serviciosChequeConCd = element.costo;
                break;
            } else {
                dataReques.serviciosChequeConCd = "";
            };
        };

        dataFilterData.SERVICIOS_CHEQUECON_CD = `${dataReques.serviciosChequeConCd === undefined ? "" : dataReques.serviciosChequeConCd}`;
        /* 0000 */

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(1)) {
                dataReques.serviciosOvpjTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.serviciosOvpjTrfa = "";
            };
        };

        dataFilterData.SERVICIOS_OVPJ_TRFA = `${dataReques.serviciosOvpjTrfa === undefined ? "" : dataReques.serviciosOvpjTrfa}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(1)) {
                dataReques.serviciosOvpjCant = element.cantidad;
                break;
            } else {
                dataReques.serviciosOvpjCant = "";
            };
        };

        dataFilterData.SERVICIOS_OVPJ_CANT = `${dataReques.serviciosOvpjCant === undefined ? "" : dataReques.serviciosOvpjCant}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(1)) {
                dataReques.serviciosOvpjCd = element.costo;
                break;
            } else {
                dataReques.serviciosOvpjCd = "";
            };
        };

        dataFilterData.SERVICIOS_OVPJ_CD = `${dataReques.serviciosOvpjCd === undefined ? "" : dataReques.serviciosOvpjCd}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(6) && Object.keys(element).includes('tarifaNegociada')) {
                dataReques.serviciosTcTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.serviciosTcTrfa = "";
            };
        };

        dataFilterData.SERVICIOS_TC_TRFA = `${dataReques.serviciosTcTrfa === undefined ? "" : dataReques.serviciosTcTrfa}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(6) && Object.keys(element).includes('cantidad')) {
                dataReques.serviciosTcCant = element.cantidad;
                break;
            } else {
                dataReques.serviciosTcCant = "";
            };
        };

        dataFilterData.SERVICIOS_TC_CANT = `${dataReques.serviciosTcCant === undefined ? "" : dataReques.serviciosTcCant}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(6)) {
                dataReques.serviciosTcCd = element.costo;
                break;
            } else {
                dataReques.serviciosTcCd = "";
            };
        };

        dataFilterData.SERVICIOS_TC_CD = `${dataReques.serviciosTcCd === undefined ? "" : dataReques.serviciosTcCd}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(7) && Object.keys(element).includes('tarifaNegociada')) {
                dataReques.serviciosGiroTrfa = element.tarifaNegociada;
                break;
            } else {
                dataReques.serviciosGiroTrfa = "";
            };
        };

        dataFilterData.SERVICIOS_GIRO_TRFA = `${dataReques.serviciosGiroTrfa === undefined ? "" : dataReques.serviciosGiroTrfa}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(7) && Object.keys(element).includes('cantidad')) {
                dataReques.serviciosGiroCant = element.cantidad;
                break;
            } else {
                dataReques.serviciosGiroCant = "";
            };
        };

        dataFilterData.SERVICIOS_GIRO_CANT = `${dataReques.serviciosGiroCant === undefined ? "" : dataReques.serviciosGiroCant}`;

        for (const element of dataReques.servicioFinanciero.solicitud) {
            if (Object.values(element).includes(7)) {
                dataReques.serviciosGiroCd = element.costo;
                break;
            } else {
                dataReques.serviciosGiroCd = "";
            };
        };

        dataFilterData.SERVICIOS_GIRO_CD = `${dataReques.serviciosGiroCd === undefined ? "" : dataReques.serviciosGiroCd}`;
        dataFilterData.status = 200;

        return dataFilterData;

    } catch (error) {

        dataFilterData.status = 500;
        console.log(error);
        return dataFilterData;
    };
};