'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnCleanListas = async () => {

    const sqlString = `CALL cleanDataListas()`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString);

        if (rows[0][0].status !== 200) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Aún no hay Catalogos registrados en la base de datos';
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = rows[0][0].status;
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};