'use server';

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const queryUserPerfilCliente = async () => {

    const usuario = (await getSession()).userBACK.user;
    const resUserPerfilCliente = {};
    const sqlString = `CALL queryUserPerfilCliente(?)`;

    try {

        const [rows] = await pool.query(sqlString, [usuario]);
        console.log(rows);
        resUserPerfilCliente.state = 200;
        resUserPerfilCliente.data = rows[0][0];
        return JSON.parse(JSON.stringify(resUserPerfilCliente));

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};