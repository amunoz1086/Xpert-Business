'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnInsertAgrupacionProductos = async (req) => {

    const pSubproducto = JSON.parse(req);
    const sqlString = `CALL insertAgrupacionProducto(?, ?, ?)`;
    const sqlStringTruncate = `CALL truncateAgrupacionProducto()`;
    let responsServer = {};

    try {

        let multiSub = [];

        for (let i of pSubproducto) {
            if (i.codAgrupador === 'A1') {
                for (let subPro of i.SubProducto) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "producto": i.codProducto,
                        "subproducto": subPro
                    });
                };
            };
            if (i.codAgrupador === 'A2') {
                for (let subPro of i.SubProducto) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "producto": i.codProducto,
                        "subproducto": subPro
                    });
                };
            };
            if (i.codAgrupador === 'A3') {
                for (let subPro of i.SubProducto) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "producto": i.codProducto,
                        "subproducto": subPro
                    });
                };
            };
            if (i.codAgrupador === 'A4') {
                for (let subPro of i.SubProducto) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "producto": i.codProducto,
                        "subproducto": subPro
                    });
                };
            };
            if (i.codAgrupador === 'A5') {
                for (let subPro of i.SubProducto) {
                    multiSub.push({
                        "agrupador": i.codAgrupador,
                        "producto": i.codProducto,
                        "subproducto": subPro
                    });
                };
            };
        };

        await pool.query(sqlStringTruncate);

        let rowsAffect = 0;
        for (let iData of multiSub) {
            const [rows] = await pool.query(sqlString, [iData.agrupador, iData.producto, iData.subproducto]);

            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };

        if (rowsAffect === multiSub.length) {
            responsServer.STATUS = 200;
            responsServer.MESSAGE = 'Productos por Agrupación actualizados';
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