'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnUpdateAgrupacionTitularidad = async (req) => {

    const pTitularidad = JSON.parse(req);
    const sqlString = `CALL insertAgrupacionTitularidad(?, ?)`;
    let responsServer = {};

    try {

        let rowsAffect = 0;
        let rowsRecor = 0
        let iMulti = Object.entries(pTitularidad);

        for (let iData of iMulti) {
            if (iData[1] !== "") {
                const [row] = await pool.query(sqlString, [iData[0], iData[1]]);
                if (row.affectedRows === 1) {
                    rowsAffect++;
                };
            };

            rowsRecor++;
        };

        if (rowsRecor === iMulti.length) {
            responsServer.STATUS = 200;
            responsServer.MESSAGE = `Titularidad por Agrupación, ${rowsAffect} registro actualizados`;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'No se completó la actualización';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.error(error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};