'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryAgrupacionRolFiltro = async (req) => {

    const { pGrupo } = JSON.parse(req);

    const sqlString = `CALL agrupacionRolFiltro(?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [pGrupo]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Aún no hay Datos registrados en la base de datos';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.error(error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};