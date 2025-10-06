'use server'

import { pool } from "@/config/conectPRICINGDB";

export const fnQueryActaContratos = async (req) => {

    const { pNombreActa } = JSON.parse(req);

    const sqlString = `CALL queryActasContratos(?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [pNombreActa]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'No hay contratos registrados';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.data = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};