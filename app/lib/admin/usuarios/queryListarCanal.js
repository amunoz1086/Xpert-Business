'use server';

/* MP: función para consultar y listar canales */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarCanal = async (req) => {

    const listadoCanal = {};
    const sqlString = `CALL listarCanal()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoCanal.state = true;
        listadoCanal.message = `200`;
        listadoCanal.canal = rows[0];
        return JSON.parse(JSON.stringify(listadoCanal));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};