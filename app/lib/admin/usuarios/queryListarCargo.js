'use server';

/* MP: función para consultar y listar cargos */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarCargos = async (req) => {

    const listadoCargos = {};
    const sqlString = `CALL listarCargos()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoCargos.state = true;
        listadoCargos.message = `200`;
        listadoCargos.cargos = rows[0];
        return JSON.parse(JSON.stringify(listadoCargos));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};