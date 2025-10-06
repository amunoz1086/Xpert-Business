"use server";

import { pool } from '../../../config/conectPRICINGDB';

export const queryDataBuzon = async (idSolicitud) => {

    const sqlStringConsulta = `CALL queryDataBuzon(?)`;
    let resDataSolicitud = {};

    try {
        const [rows] = await pool.query(sqlStringConsulta, [idSolicitud]);

        if (rows[0].length > 0) {
            resDataSolicitud.STATUS = 200;
            resDataSolicitud.DATA = JSON.stringify(rows[0]);
            return (resDataSolicitud);

        } else {
            resDataSolicitud.STATUS = 204;
            resDataSolicitud.MESSAGE = '¡No hay documentos en el Buzon!';
            return (resDataSolicitud);
        };

    } catch (error) {
        console.log(error);
        resDataSolicitud.STATUS = false;
        resDataSolicitud.MESSAGE = `No fue posible mostrar los datos de Buzon: ${error.code}`;
        resDataSolicitud.ERROR = error;
        return (resDataSolicitud);
    };

};