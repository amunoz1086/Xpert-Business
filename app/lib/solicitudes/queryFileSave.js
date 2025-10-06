"use server";

import { pool } from '../../../config/conectPRICINGDB';
import { getSession } from "../auth/auth";


export const queryFileSave = async (req) => {

    const { codSolicitud, cedula, rut, certificado, formato, contrato, Buzon6, Buzon7, Buzon8, Buzon9, Buzon10, Buzon11, Buzon12, Buzon13, Buzon14, Buzon15, Buzon16, Buzon17, Buzon18, Buzon19, Buzon20, Buzon21, Buzon22, Buzon23 } = JSON.parse(req);
    const USUARIO = (await getSession()).userBACK.user;

    const sqlStringUpdate = 'CALL updatedDataFile(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const sqlStringInsert = 'CALL insertDataFile(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const sqlStringQuery = 'CALL queryDataFile(?)';

    const response = {};

    try {
        const [row] = await pool.query(sqlStringQuery, [codSolicitud]);
        if (row[0].length === 1) {
            const [rowUpdate] = await pool.query(sqlStringUpdate, [codSolicitud, cedula, rut, certificado, formato, contrato, Buzon6, Buzon7, Buzon8, Buzon9, Buzon10, Buzon11, Buzon12, Buzon13, Buzon14, Buzon15, Buzon16, Buzon17, Buzon18, Buzon19, Buzon20, Buzon21, Buzon22, Buzon23, USUARIO]);
            const resp = affectedRowsValues(rowUpdate.affectedRows);
            response.state = resp;
        } else {
            const [rowInsert] = await pool.query(sqlStringInsert, [codSolicitud, cedula, rut, certificado, formato, contrato, Buzon6, Buzon7, Buzon8, Buzon9, Buzon10, Buzon11, Buzon12, Buzon13, Buzon14, Buzon15, Buzon16, Buzon17, Buzon18, Buzon19, Buzon20, Buzon21, Buzon22, Buzon23, USUARIO]);
            const resp = affectedRowsValues(rowInsert.affectedRows);
            response.state = resp;
        };

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
}