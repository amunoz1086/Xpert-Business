'use server';

/* MP: función para la consulta de usuarios */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryUsuarios = async (req) => {
    
    const { id } = req;
    let array = [];
    let USUARIO = {};
    let perfil = 'Aprobación';

    const sqlString = `CALL queryUsuario(?)`;
    const sqlStringEnte = `CALL queryEnte(?, ?)`;

    try {
        const [rows] = await pool.query(sqlString, id);

        if (rows[0].length === 0) {
            USUARIO.STATUS = false;
            USUARIO.MESSAGE = 'Usuario no existe';
            return JSON.stringify(USUARIO);

        } else if (rows[0].length === 1) {
            const [rEnte] = await pool.query(sqlStringEnte, [perfil, id]);

            array = [rows[0][0]['COD_PERFIL']];

            USUARIO.STATUS = true;
            USUARIO.ID_USUARIO = rows[0][0]['USUARIO'];
            USUARIO.NOMBRE = rows[0][0]['NOMBRE'];
            USUARIO.CORREO = rows[0][0]['CORREO'];
            USUARIO.COD_CARGO = rows[0][0]['COD_CARGO'];
            USUARIO.COD_OFICINA = rows[0][0]['COD_OFICINA'];
            USUARIO.COD_REGIONAL = rows[0][0]['COD_REGIONAL'];
            USUARIO.COD_CANAL = rows[0][0]['COD_CANAL'];
            USUARIO.PERFIL = array;
            USUARIO.ENTE = rEnte[0].length === 1 ? rEnte[0][0]['COD_APROBADOR'] : 0;
            return JSON.stringify(USUARIO);

        } else if (rows[0].length === 2) {
            const [rEnte] = await pool.query(sqlStringEnte, [perfil, id]);

            const perfil1 = rows[0][0]['COD_PERFIL'];
            const perfil2 = rows[0][1]['COD_PERFIL'];
            array = [perfil1, perfil2];

            USUARIO.STATUS = true;
            USUARIO.ID_USUARIO = rows[0][0]['USUARIO'];
            USUARIO.NOMBRE = rows[0][0]['NOMBRE'];
            USUARIO.CORREO = rows[0][0]['CORREO'];
            USUARIO.COD_CARGO = rows[0][0]['COD_CARGO'];
            USUARIO.COD_OFICINA = rows[0][0]['COD_OFICINA'];
            USUARIO.COD_REGIONAL = rows[0][0]['COD_REGIONAL'];
            USUARIO.COD_CANAL = rows[0][0]['COD_CANAL'];
            USUARIO.PERFIL = array;
            USUARIO.ENTE = rEnte[0].length === 1 ? rEnte[0][0]['COD_APROBADOR'] : 0;

            return JSON.stringify(USUARIO);
        }
    } catch (error) {
        console.log(error);
        return JSON.stringify(error);
    }
};