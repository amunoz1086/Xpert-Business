'use server'


import { pool } from '../../../../config/conectPRICINGDB';


export const fnInsertAgrupadores = async (req) => {

    const pCompania = JSON.parse(req);
    const sqlString = `CALL insertAgrupadores(?, ?)`;
    const sqlStringTruncate = `CALL truncateAgrupadores()`;
    let responsServer = {};

    try {

        let multiSub = [];

        for (let i of pCompania) {
            if (i.codAgrupador === 'A1') {
                for (let subPro of i.codCompania) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "compania": subPro
                    });
                };
            };
            if (i.codAgrupador === 'A2') {
                for (let subPro of i.codCompania) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "compania": subPro
                    });
                };
            };
            if (i.codAgrupador === 'A3') {
                for (let subPro of i.codCompania) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "compania": subPro
                    });
                };
            };
            if (i.codAgrupador === 'A4') {
                for (let subPro of i.codCompania) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "compania": subPro
                    });
                };
            };
            if (i.codAgrupador === 'A5') {
                for (let subPro of i.codCompania) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "compania": subPro
                    });
                };
            };
        };

        await pool.query(sqlStringTruncate);

        let rowsAffect = 0;
        for (let iData of multiSub) {
            const [rows] = await pool.query(sqlString, [iData.agrupador, iData.compania]);

            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };

        if (rowsAffect === multiSub.length) {
            responsServer.STATUS = 200;
            responsServer.MESSAGE = 'Agrupadores actualizados';
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'No se completó la inserción';
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