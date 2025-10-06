"use server";

import { pool } from '../../../config/conectPRICINGDB';

export const queryCorreoRadicador = async (req) => {

    const sqlString = `CALL queryCorreoRadicador(?)`;
    const { cod_solicitud } = req;
    let responseEstado = {};

    try {
        const [rows] = await pool.query(sqlString, [cod_solicitud]);
        if (rows[0].length > 0) {
            responseEstado.state = 200;
            responseEstado.data = rows[0];
        } else {
            responseEstado.state = 205;
        };

        return JSON.stringify(responseEstado);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};