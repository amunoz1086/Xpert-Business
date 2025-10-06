'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const queryPlanRemuneracion = async () => {

    const sqlString = `CALL queryPlanRemuneracion()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryPlanRemuneracion', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const insertPlanRemuneracion = async () => {

    const reqData = req.body;
    const { usuario } = req.body;
    delete reqData.usuario;

    let responsServer = {};
    const sqlString = `CALL insertPlanRemuneracion(?, ?)`;

    try {
        let rowsAffect = 0;
        for (let i of Object.values(reqData)) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(reqData).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const deletePlanRemuneracion = async () => {

    const reqData = req.body;
    let responsServer = {};
    const sqlString = `CALL deletePlanRemuneracion(?)`;

    try {
        const [rows] = await pool.query(sqlString, reqData.rowsDelete);
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