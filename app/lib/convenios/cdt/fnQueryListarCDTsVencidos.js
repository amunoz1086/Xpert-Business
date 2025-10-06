'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarCDTsVencidos = async (req) => {

    const { idCliente } = JSON.parse(req);

    const sqlString = `CALL queryCdtVencidos(?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [idCliente]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'El cliente aún no tiene CDTs vencidos';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.cdtVencidos = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};