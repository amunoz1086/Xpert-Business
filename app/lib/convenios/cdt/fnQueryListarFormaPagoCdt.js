'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarFormaPagoCdt = async (req) => {

    const { codCDT } = JSON.parse(req);

    const sqlString = `CALL queryFormaPagoCdt(?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [codCDT]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Otra forma de pago sin Datos';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.otraFormaPago = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};