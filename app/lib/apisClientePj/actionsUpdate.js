'use server'

import { pool } from "@/config/conectPRICINGDB";
import { getSession } from "../auth/auth";


export const updateClienteJuridico = async (data) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateClienteJuridico(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const nit = arryData[0];
        // const razonSocial = arryData[1];
        // const fechaConstitucion = arryData[2];
        // const codPaisConstitucion = arryData[3];
        // const codCiiu = arryData[4];
        // const codSectorEconomico = arryData[5];
        // const codCategoriaCompañia = arryData[6];
        // const codTipoSociedad = arryData[7];
        // const numeroSocios = arryData[8];
        // const numeroEmpleados = arryData[9];
        // const numeroSucursales = arryData[10];
        // const codTipoEmpresa = arryData[11];
        // const codPrefijoTelefonico = arryData[12];
        // const telefonoClienteJuridico = arryData[13];
        // const paginaWeb = arryData[14];
        // const correoElectronico = arryData[15];
        // const envioCorrespondencia = arryData[16];
        // const envioRACT = arryData[17];
        // const fechaCorteEstadoCuenta = arryData[18];
        // const grupoCoomeva = arryData[19];
        // const antiguedadGrupoCoomeva = arryData[20];
        // const GECC = arryData[21];
        // const situacionImpositiva = arryData[22];

        const {NIT_DV, razonSocial, fechaConstitucion, codPaisConstitucion, codCiiu, codSectorEconomico,
            codCategoriaCompañia, codTipoSociedad, numeroSocios, numeroEmpleados, numeroSucursales, codTipoEmpresa, codPrefijoTelefonico, telefonoClienteJuridico,
            paginaWeb, correoElectronico, envioCorrespondencia, envioRACT, fechaCorteEstadoCuenta, grupoCoomeva, antiguedadGrupoCoomeva, GECC, situacionImpositiva}=data

        const nit =NIT_DV

        const [rows] = await pool.query(sqlString, [
            nit,
             razonSocial,
              fechaConstitucion,
               codPaisConstitucion,
                codCiiu,
                 codSectorEconomico,
            codCategoriaCompañia,
             codTipoSociedad,
              numeroSocios,
               numeroEmpleados,
                numeroSucursales, 
                codTipoEmpresa,
                 codPrefijoTelefonico,
                  telefonoClienteJuridico,
            paginaWeb, correoElectronico, envioCorrespondencia, envioRACT, fechaCorteEstadoCuenta, grupoCoomeva, antiguedadGrupoCoomeva, GECC, situacionImpositiva,
            usuario]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer);
};


export const updateDirecciones = async (data,codEnte) => {

    let responsServer = {};
    const sqlString = `CALL updateDirecciones(?, ?, ?, ?, ?, ?, ?, ?)`;


    try {

        const { codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble,
            referenciaUbicacion} =data


        const [rows] = await pool.query(sqlString, [codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble,
            referenciaUbicacion]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateDatosImpositivos = async (data,codClienteJuridico,codEnte) => {

    let responsServer = {};
    const sqlString = `CALL updateDatosImpositivos(?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const codEnte = arryData[1];
        // const desempeñaDesempeño = arryData[2];
        // const relacionDependencia = arryData[3];
        // const rol = arryData[4];
        // const fechaIngreso = arryData[5];
        // const fechaSalida = arryData[6];

        const { desempeñaDesempeño, relacionDependencia, rol, fechaIngreso, fechaSalida}=data

        console.log(codClienteJuridico)

        console.log(codEnte)

        console.log(data)

        const [rows] = await pool.query(sqlString, [codClienteJuridico, codEnte, desempeñaDesempeño, relacionDependencia, rol, fechaIngreso, fechaSalida]);

        console.log(rows)
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateRecidenciaFiscal = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateRecidenciaFiscal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    // console.log(data)

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const personaEEUU = arryData[1];
        // const personaEspecíficaEEUU = arryData[2];
        // const IdTributarioEEUU = arryData[3];
        // const OpcionesLista = arryData[4];
        // const clasificacionFATCA = arryData[5];
        // const numeroGIIN = arryData[6];
        // const tieneRecidenciaFiscal = arryData[7];
        // const paisRecidenciaFiscal = arryData[8];
        // const tipoIdentificacionTributaria = arryData[9];
        // const numeroIdentificacionTributaria = arryData[10];

        const { personaEEUU, personaEspecíficaEEUU, idTributarioEEUU, opcionesLista, clasificacionFATCA,
            numeroGIIN, tieneRecidenciaFiscal, paisRecidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria} = data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, personaEEUU, personaEspecíficaEEUU, idTributarioEEUU, opcionesLista, clasificacionFATCA,
            numeroGIIN, tieneRecidenciaFiscal, paisRecidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateRepresentanteLegal = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateRepresentanteLegal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const fechaExpedicion = arryData[4];
        // const paisExpedicion = arryData[5];
        // const departamentoExpedicion = arryData[6];
        // const ciudadExpedicion = arryData[7];
        // const primerApellido = arryData[8];
        // const segundoApellido = arryData[9];
        // const primerNombre = arryData[10];
        // const segundoNombre = arryData[11];
        // const codPrefijoTelefonico = arryData[12];
        // const telefonoRepresentante = arryData[13];
        // const correoElectronico = arryData[14];

        const {cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico,
            telefonoRepresentante, correoElectronico} = data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico,
            telefonoRepresentante, correoElectronico]);


            console.log(codClienteJuridico)

            console.log(data)
            console.log(rows)

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateContactosAutorizados = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateContactosAutorizados(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const fechaExpedicion = arryData[4];
        // const paisExpedicion = arryData[5];
        // const departamentoExpedicion = arryData[6];
        // const ciudadExpedicion = arryData[7];
        // const primerApellido = arryData[8];
        // const segundoApellido = arryData[9];
        // const primerNombre = arryData[10];
        // const segundoNombre = arryData[11];
        // const codPrefijoTelefonico = arryData[12];
        // const telefonoContacto = arryData[13];
        // const correoElectronico = arryData[14];

        const {cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico,
            telefonoContacto, correoElectronico} = data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico,
            telefonoContacto, correoElectronico]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateJuntaDirectivaPj = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateJuntaDirectivaPj(?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const nombreRazonSocial = arryData[4];
        // const codTipoIntegrante = arryData[5];

        const { cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoIntegrante} = data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoIntegrante]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateJuntaDirectivaPn = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateJuntaDirectivaPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const nombreRazonSocial = arryData[4];
        // const fechaExpedicion = arryData[5];
        // const paisExpedicion = arryData[6];
        // const segundoApellido = arryData[7];
        // const primerNombre = arryData[8];
        // const segundoNombre = arryData[9];
        // const codTipoIntegrante = arryData[10];

      

        const {cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion,
            paisExpedicion, primerApellido,segundoApellido, primerNombre, segundoNombre, codTipoIntegrante}= data


            // quite razon social
        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion,
            paisExpedicion,primerApellido,segundoApellido, primerNombre, segundoNombre, codTipoIntegrante]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateAccionistasPj = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateAccionistasPj(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const nombreRazonSocial = arryData[4];
        // const codTipoAccionista = arryData[5];
        // const porcentajeParticipacion = arryData[6];
        // const primerApellido = arryData[7];
        // const segundoApellido = arryData[8];
        // const primerNombre = arryData[9];
        // const segundoNombre = arryData[10];
        // const responsableFiscalEEUU = arryData[11];
        // const numeroIdentificacionTributaria = arryData[12];

        const {cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoAccionista,
            porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria}=data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoAccionista,
            porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateAccionistasPn = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateAccionistasPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const fechaExpedicion = arryData[4];
        // const paisExpedicion = arryData[5];
        // const primerApellido = arryData[6];
        // const segundoApellido = arryData[7];
        // const primerNombre = arryData[8];
        // const segundoNombre = arryData[9];
        // const codTipoAccionista = arryData[10];
        // const porcentajeParticipacion = arryData[11];
        // const responsableFiscalEEUU = arryData[12];
        // const numeroIdentificacionTributaria = arryData[13];

        const { cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoAccionista, porcentajeParticipacion, responsableFiscalEEUU, numeroIdentificacionTributaria} = data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoAccionista, porcentajeParticipacion, responsableFiscalEEUU, numeroIdentificacionTributaria]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateControlantes = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateControlantes(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];
    
    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const primerApellido = arryData[4];
        // const segundoApellido = arryData[5];
        // const primerNombre = arryData[6];
        // const segundoNombre = arryData[7];
        // const responsableFiscalEEUU = arryData[8];
        // const numeroIdentificacionTributaria = arryData[9];

        const {cantidad, tipoDocumento, numeroIdentificacion, primerApellido, segundoApellido,
            primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria}= data 

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, primerApellido, segundoApellido,
            primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateBeneficiariosPJ = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateBeneficiariosPJ(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const nombreRazonSocial = arryData[4];
        // const porcentajeParticipacion = arryData[5]
        // const primerApellido = arryData[6];
        // const segundoApellido = arryData[7];
        // const primerNombre = arryData[8];
        // const segundoNombre = arryData[9];
        // const responsableFiscalEEUU = arryData[10];
        // const numeroIdentificacionTributaria = arryData[11];

        const {cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, porcentajeParticipacion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria} = data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, porcentajeParticipacion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateBeneficiariosPn = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateBeneficiariosPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const cantidad = arryData[1];
        // const tipoDocumento = arryData[2];
        // const numeroIdentificacion = arryData[3];
        // const fechaExpedicion = arryData[4];
        // const paisExpedicion = arryData[5];
        // const primerApellido = arryData[6];
        // const segundoApellido = arryData[7];
        // const primerNombre = arryData[8];
        // const segundoNombre = arryData[9];
        // const porcentajeBeneficio = arryData[10];
        // const responsableFiscalEEUU = arryData[11];
        // const numeroIdentificacionTributaria = arryData[12];

        const {cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, porcentajeBeneficio, responsableFiscalEEUU, numeroIdentificacionTributaria} = data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, porcentajeBeneficio, responsableFiscalEEUU, numeroIdentificacionTributaria]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};


export const updateInformacionFinanciera = async (data,codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL updateInformacionFinanciera(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // let arryData = [];

    try {

        // for (let i of data.entries()) {
        //     arryData.push(data.get(i[0]));
        // };

        // const codClienteJuridico = arryData[0];
        // const periodo = arryData[1];
        // const ventasAnualesMM = arryData[2];
        // const gastosAnualesMM = arryData[3];    
        // const activosMM = arryData[4];
        // const pasivosMM = arryData[5];
        // const capitalSocial = arryData[6];
        // const patrimonioMM = arryData[7];
        // const ingresosMensualesMM = arryData[8];
        // const egresosMensulesMM = arryData[9];
        // const ingresosNoOperacionalesMM = arryData[10];
        // const ventasAnuales = arryData[11];
        // const gastosAnuales = arryData[12];
        // const ingresosBrutosOrdinarias = arryData[13];

        const {periodo, ventasAnualesMM, gastosAnualesMM, activosMM, pasivosMM,
            capitalSocial, patrimonioMM, ingresosMensualesMM, egresosMensulesMM, ingresosNoOperacionalesMM, ventasAnuales, gastosAnuales,
            ingresosBrutosOrdinarias} = data

        const [rows] = await pool.query(sqlString, [codClienteJuridico, periodo, ventasAnualesMM, gastosAnualesMM, activosMM, pasivosMM,
            capitalSocial, patrimonioMM, ingresosMensualesMM, egresosMensulesMM, ingresosNoOperacionalesMM, ventasAnuales, gastosAnuales,
            ingresosBrutosOrdinarias]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer)
};