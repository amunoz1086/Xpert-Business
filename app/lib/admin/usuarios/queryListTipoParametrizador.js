'use server';

/* MP: función para consultar y listar perfiles */

import { pool } from '../../../../config/conectPRICINGDB';

export const queryListTipoParametrizador = async (req) => {

    const listadoTipoParametrizador = {};
    const sqlString = `CALL queryListTipoParametrizador()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoTipoParametrizador.state = true;
        listadoTipoParametrizador.message = `200`;
        listadoTipoParametrizador.perfil = rows[0];
        return JSON.parse(JSON.stringify(listadoTipoParametrizador));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};