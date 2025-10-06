"use server";

import { pool } from '../../../config/conectPRICINGDB';

export const queryFileUp = async (req) => {

    const { codSolicitud } = JSON.parse(req);
    const sqlStringQuery = 'CALL queryDataFile(?)';
    const response = {};

    try {
        const [row] = await pool.query(sqlStringQuery, [codSolicitud]);
        if (row[0].length === 1) {
            const resp = affectedRowsValues(row[0][0]);
            response.state = 200;
            response.data = row[0][0];
            response.statusFile = resp;
        } else {
            response.state = 204;
            response.message = 'Numero de solicitud no existe';
        };

        return JSON.stringify(response);

    } catch (error) {
        console.log(error);
    };
};

function affectedRowsValues(rowsValues) {
    let objectValue = {};
    let fileStatus = {};

    let fileValues = Object.assign(objectValue, rowsValues);
    delete fileValues.cod_solicitud;

    for (let i = 0; i < Object.values(fileValues).length; i++) {
        fileStatus[Object.keys(fileValues)[i]] = Object.values(fileValues)[i] === null ? false : Object.values(fileValues)[i] === '' ? false : true;
        ;
    };

    return fileStatus;
};