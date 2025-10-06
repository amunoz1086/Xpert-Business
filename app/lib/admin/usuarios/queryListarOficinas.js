'use server';

/* MP: función para consultar y listar oficinas */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarOficinas = async (req) => {

    const listadoOficinas = {};
    const sqlString = `CALL listarOficinas()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoOficinas.state = true;
        listadoOficinas.message = `200`;
        listadoOficinas.oficinas = rows[0];
        return JSON.parse(JSON.stringify(listadoOficinas));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};