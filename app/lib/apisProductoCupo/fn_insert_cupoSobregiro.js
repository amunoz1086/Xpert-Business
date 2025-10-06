'use server'

import { pool } from '@/config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const fn_insert_cupoSobregiro = async (req) => {

    const { clientID, numeroCuenta, tipoSobregiro, vigencia, monto, fechaAprobacion, fechaVencimiento, numeroActa, EdoSolicitud } = JSON.parse(req);

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertAsignacionSobregiro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        const [rows] = await pool.query(sqlString, [clientID, numeroCuenta, tipoSobregiro, vigencia, monto, fechaAprobacion, convertirFecha(fechaVencimiento), numeroActa, usuario, EdoSolicitud]);

        if (rows.affectedRows > 0) {
            responsServer.STATUS = 200;
        } else {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'No se pudo completar la inserción';
            return JSON.stringify(responsServer)
        };

        return JSON.stringify(responsServer);

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    return JSON.stringify(responsServer);
};


const convertirFecha = (fechaDDMMYYYY) => {
    const [dia, mes, anio] = fechaDDMMYYYY.split("-");
    return `${anio}-${mes}-${dia}`;
};