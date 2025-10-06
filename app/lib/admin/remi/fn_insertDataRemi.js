'use server'

/* MP: funcion para guardar la data del archivo remi en la BD */

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "../../auth/auth";

export const insertDataRemi = async (dataRemi) => {

    let responsServer = {};
    const userSesion = (await getSession()).userBACK.user

    const sqlString = `CALL insertDataRemi(?, ?)`;

    try {

        const [rows] = await pool.query(sqlString, [dataRemi, userSesion]);
        responsServer.status = 200;

        return JSON.stringify(responsServer)

    } catch (error) {
        console.log(error);
        responsServer.status = 500;
        responsServer.code = error.code;
        responsServer.message = error.sqlMessage;

        return JSON.stringify(responsServer);
    };
};