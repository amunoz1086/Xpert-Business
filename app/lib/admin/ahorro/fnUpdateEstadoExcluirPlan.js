'use server'

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const updateEstadoExcluirPlan = async (req) => {

    const { plan, codPlan, idCliente, EstadoInclusion } = req;

    const usuario = (await getSession()).userBACK.user
    const sqlString = `CALL updateEstadoExcluirPlan(?, ?, ?, ?, ?)`;
    let responseEstado = {};

    try {
        const [rows] = await pool.query(sqlString, [plan, codPlan, idCliente, EstadoInclusion, usuario]);

        if (rows.affectedRows > 0) {
            responseEstado.state = 200;
        } else {
            responseEstado.state = 204;
        };

        return JSON.stringify(responseEstado);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};