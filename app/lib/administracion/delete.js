'use server'

import { revalidatePath } from 'next/cache'
import { pool } from "@/config/conectPRICINGDB";


export const deleteGastosDirectosOficina = async ({ rowsDelete }) => {

    // const usuario = (await getSession()).userBACK.user

    let responsServer = {};

    const sqlString = `CALL deleteGastosDirectosOficina(?)`;

    try {
        const [rows] = await pool.query(sqlString, rowsDelete);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            revalidatePath('/administracion/convenioRecaudo');
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const deleteGastosDirectosPse = async ({ rowsDelete }) => {

    // const usuario = (await getSession()).userBACK.user

    let responsServer = {};
    const sqlString = `CALL deleteGastosDirectosPse(?)`;


    try {
        const [rows] = await pool.query(sqlString, rowsDelete);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            revalidatePath('/administracion/depositoVista');
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const deleteParametrosEfecty = async ({ rowsDelete }) => {

    // const usuario = (await getSession()).userBACK.user

    let responsServer = {};
    const sqlString = `CALL deleteParametrosEfecty(?)`;

    try {
        const [rows] = await pool.query(sqlString, rowsDelete);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const deleteNegociarNomina = async ({ rowsDelete }) => {


    // const usuario = (await getSession()).userBACK.user


    let responsServer = {};
    const sqlString = `CALL deleteNegociarNomina(?)`;

    try {
        const [rows] = await pool.query(sqlString, rowsDelete);

        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const deletePromedioNomina = async ({ rowsDelete }) => {

    // const usuario = (await getSession()).userBACK.user


    let responsServer = {};

    const sqlString = `CALL deletePromedioNomina(?)`;

    try {
        const [rows] = await pool.query(sqlString, rowsDelete);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const deleteFrecuenciaNomina = async ({ rowsDelete }) => {

    // const usuario = (await getSession()).userBACK.user

    let responsServer = {};

    const sqlString = `CALL deleteFrecuenciaNomina(?)`;

    try {
        const [rows] = await pool.query(sqlString, rowsDelete);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const deletePagoTerseros = async ({ rowsDelete }) => {

    // const usuario = (await getSession()).userBACK.user

    let responsServer = {};

    const sqlString = `CALL deletePagoTerseros(?)`;

    try {
        const [rows] = await pool.query(sqlString, rowsDelete);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

/**
 * deposito vista
 */

export const deletePlanRemuneracion = async (id) => {


    // const usuario = (await getSession()).userBACK.user

    let responsServer = {};
    const sqlString = `CALL deletePlanRemuneracion(?)`;


    try {
        const [rows] = await pool.query(sqlString, id);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            revalidatePath('/administracion/depositoVista')

            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

