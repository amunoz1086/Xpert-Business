"use server";

/* MP: función para listar correos de los entes de aprobacion*/

import { pool } from '../../../../config/conectPRICINGDB';

export const fnCorreoAprobadores = async (codAprobador) => {

    const sqlString = `CALL queryCorreoAprobadores(?)`;
    const responseEnte = {};

    try {
        const [rows] = await pool.query(sqlString, [codAprobador]);
        responseEnte.state = 200;
        responseEnte.correos = rows[0][0].CORREOS;
        return JSON.stringify(responseEnte);

    } catch (e) {
        console.error(e);
        return JSON.stringify({ e });
    };
};