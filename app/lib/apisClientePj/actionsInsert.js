'use server'

import { pool } from "@/config/conectPRICINGDB";
import { generarCadenaVerficacion } from "../utils";
import { getSession } from "../auth/auth";


export const insertClienteJuridico = async (data,nit,tipopersona) => {

    console.log(tipopersona)

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertClienteJuridico(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let arryData = [];

    try {

        const { NIT_DV, razonSocial, fechaConstitucion, codPaisConstitucion, codCiiu, codSectorEconomico,
            codCategoriaCompañia, codTipoSociedad, numeroSocios, numeroEmpleados, numeroSucursales, codTipoEmpresa, codPrefijoTelefonico, telefonoClienteJuridico,
            paginaWeb, correoElectronico, envioCorrespondencia, envioRACT, fechaCorteEstadoCuenta, grupoCoomeva, antiguedadGrupoCoomeva, GECC, situacionImpositiva,
        } = data
        
        const digitoVerificacion = generarCadenaVerficacion({ nit: nit });
      
        const [rows] = await pool.query(sqlString, [digitoVerificacion, nit, razonSocial, fechaConstitucion, codPaisConstitucion, codCiiu, codSectorEconomico,
            codCategoriaCompañia, codTipoSociedad, numeroSocios, numeroEmpleados, numeroSucursales, codTipoEmpresa, codPrefijoTelefonico, telefonoClienteJuridico,
            paginaWeb, correoElectronico, envioCorrespondencia, envioRACT, fechaCorteEstadoCuenta, grupoCoomeva, antiguedadGrupoCoomeva, GECC, situacionImpositiva,
            tipopersona, usuario]);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        if (error.code === 'ER_DUP_ENTRY') {
            responsServer.STATUS = error.errno;
            responsServer.CODE = error.code;
            responsServer.MESSAGE = `El ${arryData[24] === 10 ? 'cliente' : 'prospecto'} ${arryData[1]}-${arryData[0]} ya se encuentra registrado`;
        } else {
            responsServer.STATUS = 500;
            responsServer.CODE = error.code;
            responsServer.MESSAGE = error.sqlMessage;
        };

    };

    return JSON.stringify(responsServer)
};


export const insertDirecciones = async (data, codEnte) => {

    let responsServer = {};
    const sqlString = `CALL insertDirecciones(?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion } = data;
        const [rows] = await pool.query(sqlString, [codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion]);

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


export const insertDatosImpositivos = async (data, codClienteJuridico, codEnte) => {

    let responsServer = {};
    const sqlString = `CALL insertDatosImpositivos(?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { desempeñaDesempeño, relacionDependencia, rol, fechaIngreso, fechaSalida } = data;
        const [rows] = await pool.query(sqlString, [codClienteJuridico, codEnte, desempeñaDesempeño, relacionDependencia, rol, fechaIngreso, fechaSalida]);

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


export const insertRecidenciaFiscal = async (data) => {

    let responsServer = {};
    const sqlString = `CALL insertRecidenciaFiscal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { codClienteJuridico, personaEEUU, personaEspecíficaEEUU, idTributarioEEUU, opcionesLista, clasificacionFATCA,
            numeroGIIN, tieneRecidenciaFiscal, paisRecidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria } = data;

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


export const insertRepresentanteLegal = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertRepresentanteLegal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        let { cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico,
            telefonoRepresentante, correoElectronico } = data;

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico,
            telefonoRepresentante, correoElectronico]);

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


export const insertContactosAutorizados = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertContactosAutorizados(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico,
            telefonoContacto, correoElectronico } = data;

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


export const insertJuntaDirectivaPj = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertJuntaDirectivaPj(?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoIntegrante } = data;
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


export const insertJuntaDirectivaPn = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertJuntaDirectivaPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion,
            paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoIntegrante } = data;

        const [rows] = await pool.query(sqlString, [codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion,
            paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoIntegrante]);

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


export const insertAccionistasPj = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertAccionistasPj(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoAccionista,
            porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria } = data;

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


export const insertAccionistasPn = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertAccionistasPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoAccionista, porcentajeParticipacion, responsableFiscalEEUU, numeroIdentificacionTributaria } = data;

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


export const insertControlantes = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertControlantes(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, tipoDocumento, numeroIdentificacion, primerApellido, segundoApellido,
            primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria } = data;

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


export const insertBeneficiariosPJ = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertBeneficiariosPJ(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, porcentajeParticipacion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria } = data;

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


export const insertBeneficiariosPn = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertBeneficiariosPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion,
            primerApellido, segundoApellido, primerNombre, segundoNombre, porcentajeBeneficio, responsableFiscalEEUU, numeroIdentificacionTributaria } = data;

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


export const insertInformacionFinanciera = async (data, codClienteJuridico) => {

    let responsServer = {};
    const sqlString = `CALL insertInformacionFinanciera(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { periodo, ventasAnualesMM, gastosAnualesMM, activosMM, pasivosMM,
            capitalSocial, patrimonioMM, ingresosMensualesMM, egresosMensulesMM, ingresosNoOperacionalesMM, ventasAnuales, gastosAnuales,
            ingresosBrutosOrdinarias } = data;

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

