"use server";

/* MP: función para consultar los datos del ente Parametrizador */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnParametrizador = async (codParametrizador) => {

    const sqlString = `CALL queryParametrizador(?)`;
    const responseEnte = {};

    try {
        const [rows] = await pool.query(sqlString, [codParametrizador]);
        responseEnte.state = 200;
        responseEnte.parametrizador = rows[0];
        return JSON.stringify(responseEnte);

    } catch (e) {
        console.error(e);
        return JSON.stringify({ e });
    };
};