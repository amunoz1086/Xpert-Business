'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarPlanes = async () => {

    const sqlString = `CALL queryListarPlanes()`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString);

        console.log(rows)

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Aún no hay planes registrados en la base de datos';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};