'use server'

import { pool } from '@/config/conectPRICINGDB';

export const fn_queryAsignacionCuenta = async (req) => {

    const { numeroCuenta } = JSON.parse(req);
    console.log('####', numeroCuenta);

    let responsServer = {};
    const sqlString = `CALL queryAsignacionCuenta(?)`;

    try {
        const [rows] = await pool.query(sqlString, [numeroCuenta]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};