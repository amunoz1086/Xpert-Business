'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarCDTsNuevos = async (req) => {

    const { idCliente } = JSON.parse(req);
    console.log(idCliente)

    const sqlString = `CALL queryCdtNuevos(?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [idCliente]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'El cliente aún no tiene CDTs nuevos';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.cdtNuevos = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};