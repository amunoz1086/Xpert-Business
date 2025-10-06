'use server'

/* MP: función para actualizar los estados de las listas Modalidad:IBR*/

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "../../auth/auth";

export const updateTipoCredIbrState = async (req) => {

    let sesionUser = (await getSession()).userBACK.user;
    const reqData = req;
    const usuario = sesionUser;

    let responsServer = {};
    const sqlString = `CALL updateTipoCredIbrState(?, ?, ?, ?)`;

    try {
        let rowsAffect = 0;
        for (let i of Object.values(reqData)) {
            const [rows] = await pool.query(sqlString, [i.tipoCred, i.id, i.state, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(reqData).length) {
            responsServer.STATUS = 200;
            responsServer.MESSAGE = `Registros actualizados con exito`;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log('updateTipoCredIbrState', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};