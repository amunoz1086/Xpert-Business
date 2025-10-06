'use server';

/* MP: función para consultar y listar perfiles */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarTipoAprobador = async (req) => {

    const listadoTipoAprobador = {};
    const sqlString = `CALL listarTipoAprobador()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoTipoAprobador.state = true;
        listadoTipoAprobador.message = `200`;
        listadoTipoAprobador.aprobador = rows[0];
        return JSON.parse(JSON.stringify(listadoTipoAprobador));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};