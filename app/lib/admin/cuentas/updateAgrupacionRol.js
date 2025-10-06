'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnUpdateAgrupacionRol = async (req) => {

    const pRol = JSON.parse(req);
    const sqlString = `CALL insertAgrupacionRol(?, ?, ?)`;
    let responsServer = {};

    try {

        let rowsAffect = 0;
        let rowsRecor = 0
        let iMulti = Object.entries(pRol);


        for (let iData of iMulti) {           

            if (iData[1].titular !== "") {
                const [row] = await pool.query(sqlString, [iData[0], 'titular', iData[1].titular]);
                if (row.affectedRows === 1) {
                    rowsAffect++;
                };
            };
            if (iData[1].firmante !== "") {
                const [row] = await pool.query(sqlString, [iData[0], 'firmante', iData[1].firmante]);
                if (row.affectedRows === 1) {
                    rowsAffect++;
                };
            };
            if (iData[1].secundario !== "") {
                const [row] = await pool.query(sqlString, [iData[0], 'secundario', iData[1].secundario]);
                if (row.affectedRows === 1) {
                    rowsAffect++;
                };
            };
            if (iData[1].cotitular !== "") {
                const [row] = await pool.query(sqlString, [iData[0], 'cotitular', iData[1].cotitular]);
                if (row.affectedRows === 1) {
                    rowsAffect++;
                };
            };
            if (iData[1].mensaje !== "") {
                const [row] = await pool.query(sqlString, [iData[0], 'mensaje', iData[1].mensaje]);
                if (row.affectedRows === 1) {
                    rowsAffect++;
                };
            };

            rowsRecor++;
        };

        if (rowsRecor === iMulti.length) {
            responsServer.STATUS = 200;
            responsServer.MESSAGE = `Rol por Agrupación, ${rowsAffect} registro actualizados`;
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