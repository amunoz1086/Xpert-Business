'use server'

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const insertNewRango = async (req) => {

    const data = req;

    console.log(data)

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertNewRango(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        let rowsAffect = 0;
        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect !== data.length) {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer)
        }

        responsServer.STATUS = 200;
        responsServer.ROWSAFFECT = rowsAffect;
        return JSON.stringify(responsServer)

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    return JSON.stringify(responsServer);
};