'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryListarRolCdtNuevo = async (req) => {

    const { codCDT } = req;
    console.log('rol id')
    console.log(codCDT)
    
    const sqlString = `CALL queryRolCdtNuevo(?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [codCDT]);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Sin rol asignados';
            console.log(responsServer)
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