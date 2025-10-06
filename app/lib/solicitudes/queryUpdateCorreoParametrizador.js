"use server";

import { pool } from '../../../config/conectPRICINGDB';

export const queryUpdateCorreoParametrizador = async (req) => {

    const sqlString = `CALL updateCorreoParametrizador(?, ?)`;
    const { cod_solicitud } = JSON.parse(req);
    let responseEstado = {};

    try {
        const [rows] = await pool.query(sqlString, [cod_solicitud, 1]);

        if (rows.affectedRows > 0) {
            responseEstado.state = 200;
        } else {
            responseEstado.state = 204;
        };

        return responseEstado;

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};