"use server";

import { pool } from '../../../config/conectPRICINGDB';
import { getSession } from "../auth/auth";

export const queryDecisionAprobador = async (req) => {

    const sqlString = `CALL queryAprobarCreditos(?, ?, ?, ?)`;
    const sqlStringEnte = `CALL queryValidarEntes(?)`;
    const { decision, cod_solicitud, observacion } = req;

    let USUARIO = (await getSession()).userBACK.user;
    let responseDecision = {};

    try {
        const [rowsEnte] = await pool.query(sqlStringEnte, [cod_solicitud]);

        if (rowsEnte[0][0].hasOwnProperty('ENTE')) {
            let resValidaEnte = validarEnteOParametrizador(rowsEnte[0][0].ENTE);
            if (resValidaEnte) {
                const [rows] = await pool.query(sqlString, [cod_solicitud, decision, observacion, USUARIO]);
                responseDecision.state = 200;
                responseDecision.data = rows[0];
            } else {
                responseDecision.state = 204;
            };
        } else {
            let resValidaParametrizador = validarEnteOParametrizador(rowsEnte[0][0].PARAMETRIZADOR);
            if (resValidaParametrizador) {
                if (rowsEnte[0][0].RADICADOR !== null) {
                    const [rows] = await pool.query(sqlString, [cod_solicitud, decision, observacion, USUARIO]);
                    responseDecision.state = 200;
                    responseDecision.data = rows[0];
                } else {
                    responseDecision.state = 205;
                };
            } else {
                responseDecision.state = 206;
            };
        };

        return JSON.stringify(responseDecision);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

function validarEnteOParametrizador(enteParam) {
    return enteParam !== null;
};