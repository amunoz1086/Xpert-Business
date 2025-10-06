"use server";

import { pool } from '../../../config/conectPRICINGDB';

export const queryDetalleSolicitud = async (req) => {

    const sqlString = `CALL queryDetalleSolicitud(?)`;
    let resDataSolicitud = {};

    try {
        const [rows] = await pool.query(sqlString, [req]);

        if (rows[0].length > 0) {

            if (typeof (rows[0][0].DOCUMENTO) !== 'object') {
                rows[0][0].DOCUMENTO = JSON.parse(rows[0][0].DOCUMENTO);
            };

            if (typeof (rows[0][0].CLIENTE_MODAL) !== 'object') {
                rows[0][0].CLIENTE_MODAL = JSON.parse(rows[0][0].CLIENTE_MODAL);
            };

            if (typeof (rows[0][0].CLIENTE_FIDUCIA) !== 'object') {
                rows[0][0].CLIENTE_FIDUCIA = JSON.parse(rows[0][0].CLIENTE_FIDUCIA);
            };

            let estatusParametrizador = await envioParametrizador(req);

            resDataSolicitud.STATUS = true;
            resDataSolicitud = estatusParametrizador;
            resDataSolicitud.DATA = JSON.stringify(rows[0]);

            return (resDataSolicitud);

        } else {
            resDataSolicitud.STATUS = false;
            resDataSolicitud.MESSAGE = `La solicitud n* ${req} no existe`;
            return JSON.stringify(resDataSolicitud);
        };

    } catch (error) {
        console.log(error);
        return JSON.stringify(error);
    };

};

async function envioParametrizador(COD) {
    const sqlString = 'CALL queryEstadoEnvioParametrizador(?)';
    const estatusEnvio = {};
    try {
        const [row] = await pool.query(sqlString, [COD]);
        if (row[0][0] !== undefined) {
            estatusEnvio.statusCorreo = row[0][0].statusCorreo;
        } else {
            estatusEnvio.statusCorreo = 0;
        };

        return estatusEnvio;

    } catch (error) {
        console.log(error);
    };
};