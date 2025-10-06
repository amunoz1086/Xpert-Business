'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryRangoPlan = async (PLAN, CODPLAN) => {

    const sqlString = `CALL queryRangoPlan(?, ?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [PLAN, CODPLAN]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = `Aún no hay rangos registrados en el plan: ${PLAN}`;
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};