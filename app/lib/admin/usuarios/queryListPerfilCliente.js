'use server';

/* MP: función para consultar y listar perfiles */

import { pool } from '../../../../config/conectPRICINGDB';

export const queryListPerfilCliente = async (req) => {

    const listadoPerfilCliente = {};
    const sqlString = `CALL queryListPerfilCliente()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoPerfilCliente.state = true;
        listadoPerfilCliente.message = `200`;
        listadoPerfilCliente.perfil = rows[0];
        return JSON.parse(JSON.stringify(listadoPerfilCliente));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};