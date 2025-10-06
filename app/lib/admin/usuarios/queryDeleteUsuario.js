'use server';

/* MP: función para la eliminacion de usuarios */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnDeleteUsuarios = async (req) => {

    const sqlString = `CALL deleteUsuario(?)`;
    console.log(req)

    try {
        const [rows] = await pool.query(sqlString, req);
        return JSON.stringify(200)
    } catch (error) {
        console.log(error);
        return JSON.stringify(error);
    }

};