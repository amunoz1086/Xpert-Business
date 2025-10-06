"use server";

import { pool } from '../../../config/conectPRICINGDB';
import { getSession } from "../auth/auth";

export const queryInsertSolicitud = async (req) => {

    const { PRODUCTO, RADICACION, CREDITO_NUEVO, CONVENIO_RECAUDO, CONVENIO_PAGO, CONVENIO_SERVICIO, DOCUMENTO,
        REMI, DEPOSITO_VISTA, RECIPROCIDAD_RESUMEN, CONFIGURACION, TECNICO_OPERADOR, CLIENTE_MODAL, CAMPO_ADCIONALES_MODAL,
        CLIENTE_FIDUCIA, EDITAR, ESTADO_SOLICITUD, SOLICITUD, KNIME } = JSON.parse(req);

    const sqlStringSolicitud = `CALL queryInsertSolicitud(?, ?, ?, ?)`;
    const sqlStringAsignacion = `CALL queryInsertAsignacion(?,?,?)`

    let USUARIO = (await getSession()).userBACK.user;
    let resDataSolicitud = {};

    try {

        const [rowSolicitud] = await pool.query(sqlStringSolicitud, [RADICACION.numDocumento, JSON.stringify({
            PRODUCTO, RADICACION, CREDITO_NUEVO, CONVENIO_RECAUDO, CONVENIO_PAGO, CONVENIO_SERVICIO, DOCUMENTO,
            REMI, DEPOSITO_VISTA, RECIPROCIDAD_RESUMEN, CONFIGURACION, TECNICO_OPERADOR, CLIENTE_MODAL, CAMPO_ADCIONALES_MODAL,
            CLIENTE_FIDUCIA, EDITAR, ESTADO_SOLICITUD, SOLICITUD, KNIME
        }), USUARIO, KNIME.APROBACIONES_REQUERIDAS]);


        const [rowAsignacion] = await pool.query(sqlStringAsignacion, [rowSolicitud[0][0].SOLICITUD, KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].USUARIO, KNIME.ENTE_ATRIBUCION_FINAL[0]]);

        if (rowAsignacion.affectedRows > 0) {
            resDataSolicitud.status = 200;
            resDataSolicitud.message = `Solicitud guardada y asignada`;
            resDataSolicitud.numSolicitud = rowSolicitud[0][0].SOLICITUD;
            resDataSolicitud.insert = true;
            return JSON.stringify(resDataSolicitud);

        } else {
            resDataSolicitud.status = 204;
            resDataSolicitud.message = 'No se inserto ningun registro';
            resDataSolicitud.insert = false;
            return JSON.stringify(resDataSolicitud);
        };

    } catch (error) {
        console.error('Error en queryInsertSolicitud:', error);
    };
};