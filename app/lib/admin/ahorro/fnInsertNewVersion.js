'use server'

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const insertNewVersion = async (req) => {

    const { plan } = req;

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertNewVersion(?, ?)`;

    try {
        const [rows] = await pool.query(sqlString, [plan, usuario]);

        if (rows[0][0].vRowAffec > 0) {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0][0];
        } else {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'No se pudo completar la inserción';
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