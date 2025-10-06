'use server'

/* MP: función para consultar y listar fechas IBR */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnListarFechasIbr = async () => {

    let listarIbr = {};

    const sqlString = `CALL queryListarUltimaFecha()`

    try {
        const [rows] = await pool.query(sqlString);
        if (rows.length > 0) {
            listarIbr.STATUS = true;
            listarIbr.MESSAGE = 'Listado de fechas generada';
            listarIbr.DATA = JSON.stringify(rows[0]);
            return JSON.stringify(listarIbr);

        } else {
            listarIbr.STATUS = false;
            listarIbr.MESSAGE = 'Lo sentimos ¡no hay IBRs registradas!';
            return JSON.stringify(listarIbr);
        };

    } catch (error) {
        console.log(error);
        return JSON.stringify(error);
    };
};
