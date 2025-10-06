'use server';

/* MP: función para consultar y listar cargos */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarRegional = async (req) => {

    const listadoRegional = {};
    const sqlString = `CALL listarRegional()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoRegional.state = true;
        listadoRegional.message = `200`;
        listadoRegional.regional = rows[0];
        return JSON.parse(JSON.stringify(listadoRegional));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};