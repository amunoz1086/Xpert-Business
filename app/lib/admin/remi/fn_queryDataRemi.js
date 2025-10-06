'use server'

/* MP: funcion para guardar la data del archivo remi en la BD */

import { pool } from '../../../../config/conectPRICINGDB';

export const queryDataRemi = async () => {

    let responsServer = {};

    const sqlString = `CALL queryDataRemi()`;

    try {

        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Tarifa de intercambio sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log(error);
        responsServer.status = 500;
        responsServer.code = error.code;
        responsServer.message = error.sqlMessage;

        return JSON.stringify(responsServer);
    };
};