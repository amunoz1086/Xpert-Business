"use server";

import { pool } from '../../../config/conectPRICINGDB';
import { notificacion } from '../services/correo/notificacion';
import { queryUpdateCorreoParametrizador } from '../solicitudes/queryUpdateCorreoParametrizador';

export const queryCorreoParametrizador = async (req) => {

    const sqlString = `CALL queryCorreoParametrizador(?)`;
    const { cod_solicitud } = JSON.parse(req);
    let responseEstado = {};

    try {
        const [rows] = await pool.query(sqlString, [cod_solicitud]);
        if (rows[0].length > 0) {
            let statusCorreo = await enviarCorreo(JSON.stringify(rows[0][0]));
            if (JSON.parse(statusCorreo).status === 200) {
                let statusNotificacion = await enviarNotificacion(req)
                responseEstado = statusNotificacion
            } else {
                responseEstado.state = 204;
            };
        } else {
            responseEstado.state = 204;
        };

        return JSON.stringify(responseEstado);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

async function enviarCorreo(data) {
    let tipoEnte = "parametrización";
    try {
        return await notificacion(data, tipoEnte);
    } catch (error) {
        console.log(error);
    };
};

async function enviarNotificacion(cod) {
    try {
        return await queryUpdateCorreoParametrizador(cod);
    } catch (error) {
        console.log(error);
    };
};