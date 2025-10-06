"use server";

import { pool } from '../../../config/conectPRICINGDB';
import { getSession } from "../auth/auth";


export const queryInsertBuzo = async (req) => {

    const { name, file, idSolicitud } = JSON.parse(req);
    const USUARIO = (await getSession()).userBACK.user;

    const sqlStringInsert = 'CALL insertDataBuzon(?, ?, ?, ?)';
    const response = {};

    try {

        const [rowInsert] = await pool.query(sqlStringInsert, [idSolicitud, name, file, USUARIO]);
        const resp = affectedRowsValues(rowInsert.affectedRows);
        response.state = resp;

        return JSON.stringify(response);

    } catch (error) {
        console.log(error);
    };
};


function affectedRowsValues(rowsValues) {
    if (rowsValues === 1) {
        return 200;
    } else {
        return 204;
    };
};