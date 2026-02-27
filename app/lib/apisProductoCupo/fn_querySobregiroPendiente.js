'use server'

import { pool } from '@/config/conectPRICINGDB';


export const fn_querySobregiroPendiente = async (req) => {

    const { identification } = JSON.parse(req);

    let responsServer = {};
    const sqlString = `CALL queryCupoSobregiro(?)`;

    try {
        const [rows] = await pool.query(sqlString, [identification]);
        
        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = extracNumeroCuenta(rows[0]);
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


function extracNumeroCuenta(rawSobregirosPendientes) {
    const numero_cuenta = [];
    for (let i of rawSobregirosPendientes) {
        numero_cuenta.push({ numero_cuenta: i.numero_cuenta, acta: i.acta });
    };
    return numero_cuenta;
};