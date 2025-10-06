"use server";

import { pool } from '../../../config/conectPRICINGDB';
import { getSession } from "../auth/auth";

export const queryDecisionParametrizador = async (req) => {

    const sqlString = `CALL queryParametrizarCreditos(?, ?, ?)`;
    const { decision, cod_solicitud } = req;
    let USUARIO = (await getSession()).userBACK.user;
    let responseDecision = {};

    try {
        const [rows] = await pool.query(sqlString, [cod_solicitud, decision, USUARIO]);
        if (rows.affectedRows === 1) {
            responseDecision.state = 200;
            return JSON.stringify(responseDecision);
        };
    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };

};