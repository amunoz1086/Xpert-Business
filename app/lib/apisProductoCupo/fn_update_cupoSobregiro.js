'use server'

import { pool } from '@/config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const fn_update_cupoSobregiro = async (req) => {

    const { numeroCuenta, numeroActa, EdoSolicitud, observacion } = JSON.parse(req);
    const usuario = (await getSession()).userBACK.user;

    let responsServer = {};
    const sqlString = `CALL updateCupoSobregiro(?, ?, ?, ?, ?)`;

    try {
        const [rows] = await pool.query(sqlString, [usuario, EdoSolicitud, numeroCuenta, numeroActa, observacion]);

        if (rows.affectedRows > 0) {
            responsServer.STATUS = 200;
        } else {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'No se pudo completar la actualización';
            return JSON.stringify(responsServer)
        };

        return JSON.stringify(responsServer);

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    return JSON.stringify(responsServer);
};