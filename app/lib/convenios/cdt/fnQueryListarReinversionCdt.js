'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryReinversionCdt = async (req) => {

    const { codCDT } =req;
    
    const sqlString = `CALL queryReinversionCdt(?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [codCDT]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Reinversión sin Datos';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.reinversion = rows[0];
            console.log(responsServer)
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};