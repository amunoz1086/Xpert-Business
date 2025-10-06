'use server'

import { pool } from "@/config/conectPRICINGDB";
import { getSession } from "@/app/lib/auth/auth";

/**
* Ejecuta el procedimiento almacenado `queryTipoAprobador` en la base de datos.
* Obtiene el usuario desde la sesión y lo pasa como parámetro al query.
*
* @async
* @function fnQueryTipoAprobador
* @returns {Promise<string>} Retorna un string JSON con el estado de la operación:
* - En caso de éxito: `{ state: true, code: "200", data: any }`
* - En caso de error: `{ STATUS: 500, CODE: string, MESSAGE: string }`
*/
export const fnQueryTipoAprobador = async () => {

    const usu = (await getSession()).userBACK.user

    const rawResponse = {};
    const sqlString = `CALL queryTipoAprobador(?)`;

    try {

        const [rows] = await pool.query(sqlString, [usu]);

        rawResponse.state = true;
        rawResponse.code = `200`;
        rawResponse.data = rows[0];
        return JSON.stringify(rawResponse);

    } catch (e) {

        // console.error(e);
        rawResponse.STATUS = 500;
        rawResponse.CODE = e?.code;
        rawResponse.MESSAGE = e?.sqlMessage;
        return JSON.stringify(rawResponse);
    };
};