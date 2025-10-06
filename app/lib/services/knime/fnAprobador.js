"use server";

/* MP: función para consultar los datos del ente Aprobador */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnAprobador = async (codAprobador) => {

    const sqlString = `CALL queryAprobador(?)`;
    const responseEnte = {};

    try {
        const [rows] = await pool.query(sqlString, [codAprobador[0]]);
        responseEnte.state = 200;
        responseEnte.aprobador = rows[0];
        return JSON.stringify(responseEnte);

    } catch (e) {
        console.error(e);
        return JSON.stringify({ e });
    };
};