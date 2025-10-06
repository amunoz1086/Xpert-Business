'use server';

/* MP: función para consultar y listar perfiles */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarPerfil = async (req) => {

    const listadoPerfil = {};
    const sqlString = `CALL listarPerfil()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoPerfil.state = true;
        listadoPerfil.message = `200`;
        listadoPerfil.perfil = rows[0];
        return JSON.parse(JSON.stringify(listadoPerfil));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};