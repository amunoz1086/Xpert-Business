'use server'

import { pool } from "@/config/conectPRICINGDB";
import { getSession } from "../auth/auth";


export const insertClientePn = async (data, tipopersona) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertClientePn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { tipoDocumento, numeroIdentificacion, fechaExpedicion, lugarExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento,
            departamentoNacimiento, ciudadNacimiento, fechaNacimiento, codPrefijoTelefonico, telefono, correoElectronico, sexo, nacionalidad1,
            nacionalidad2, edoCivil, tieneDiscapacidad, tipoDiscapacidad, oficina, oficialOficina, situacionImpositiva, desempeñoCargoPEP, tipoPEP,
            perteneceGrupoEtnico } = data

        const [rows] = await pool.query(sqlString, [tipoDocumento, numeroIdentificacion, fechaExpedicion, lugarExpedicion, paisExpedicion,
            departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento,
            departamentoNacimiento, ciudadNacimiento, fechaNacimiento, codPrefijoTelefonico, telefono, correoElectronico, sexo, nacionalidad1,
            nacionalidad2, edoCivil, tieneDiscapacidad, tipoDiscapacidad, oficina, oficialOficina, situacionImpositiva, desempeñoCargoPEP, tipoPEP,
            perteneceGrupoEtnico, tipopersona, usuario]);


        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
        };

    } catch (error) {
        console.log(error);

        if (error.code === 'ER_DUP_ENTRY') {
            responsServer.STATUS = error.errno;
            responsServer.CODE = error.code;
            responsServer.MESSAGE = `El cliente o prospecto ${numeroIdentificacion}-${tipoDocumento} ya se encuentra registrado`;
        } else {
            responsServer.STATUS = 500;
            responsServer.CODE = error.code;
            responsServer.MESSAGE = error.sqlMessage;
        };

    };

    return JSON.stringify(responsServer)
};


export const insertRecidenciaFiscalPn = async (data, codClienteNatural) => {

    let responsServer = {};
    const sqlString = `CALL insertRecidenciaFiscalPn(?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { residenciaFiscalColombia, residenciaFiscalEEUU, residenciFiscalOtroPais,
            paisResidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria } = data


        const [rows] = await pool.query(sqlString, [codClienteNatural, residenciaFiscalColombia, residenciaFiscalEEUU, residenciFiscalOtroPais,
            paisResidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria]);

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


export const insertActividadEconomicaPn = async (data, codClienteNatural) => {

    let responsServer = {};
    const sqlString = `CALL insertActividadEconomicaPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { profesion, ocupacion, nombreEstablecimiento, departamentoEstablecimiento,
            ciudadEstablecimiento, codPrefijoTelefonico, telefono, CIIU, inicioActividadAño, inicioActividadMes, cargoActual, fuentePrincipalIngreso } = data

        const [rows] = await pool.query(sqlString, [codClienteNatural, profesion, ocupacion, nombreEstablecimiento, departamentoEstablecimiento,
            ciudadEstablecimiento, codPrefijoTelefonico, telefono, CIIU, inicioActividadAño, inicioActividadMes, cargoActual, fuentePrincipalIngreso]);

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


export const insertDireccionActividad = async (data, codEnte) => {

    let responsServer = {};
    const sqlString = `CALL insertDireccionActividad(?, ?, ?, ?, ?, ?, ?, ?)`;

    try {


        const { codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria,
            numeroInmueble, referenciaUbicacion } = data

        const [rows] = await pool.query(sqlString, [codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria,
            numeroInmueble, referenciaUbicacion]);

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


export const insertDetalleActivEcoPn = async (data, codClienteNatural) => {

    let responsServer = {};
    const sqlString = `CALL insertDetalleActivEcoPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


    try {

        const { claseBalance, tipoBalance, FechaCorte, ventasBrutas, ingresoAnual,
            ingresoPGJ, egresoPGJ, activosBGJ, activos, pasivosBGJ, PatrimonioBGJ } = data

        const [rows] = await pool.query(sqlString, [codClienteNatural, claseBalance, tipoBalance, FechaCorte, ventasBrutas, ingresoAnual,
            ingresoPGJ, egresoPGJ, activosBGJ, activos, pasivosBGJ, PatrimonioBGJ]);

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


export const insertReferenciasPn = async (data, codClienteNatural) => {

    let responsServer = {};
    const sqlString = `CALL insertReferenciasPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        const { cantidad, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento,
            fechaNacimiento, tipoDocumento, numeroIdentificacion, fechaExpedicion, lugarExpedicion, codPrefijoTelefonico, telefono, correoElectronico } = data


        const [rows] = await pool.query(sqlString, [codClienteNatural, cantidad, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento,
            fechaNacimiento, tipoDocumento, numeroIdentificacion, fechaExpedicion, lugarExpedicion, codPrefijoTelefonico, telefono, correoElectronico]);

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