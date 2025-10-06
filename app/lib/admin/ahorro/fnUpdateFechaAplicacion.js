'use server'

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const updateFechaAplicacion = async (req) => {

    const { plan, codPlan, fechaAplicacion } = req;

    const usuario = (await getSession()).userBACK.user
    const sqlString = `CALL updateFechaAplicacion(?, ?, ?, ?)`;
    let responseEstado = {};

    try {
        const [rows] = await pool.query(sqlString, [plan, codPlan, fechaAplicacion, usuario]);
        console.log(rows)
        switch (rows[0][0].STATUS) {
            case 204: {
                responseEstado.status = rows[0][0].STATUS;
                responseEstado.menssage = 'No fue posible actualizar la Fecha de Aplicacion en los rangos'
                break;
            }
            case 200: {
                responseEstado.status = rows[0][0].STATUS;
                break;
            }
            default:
                break;
        };

        return JSON.stringify(responseEstado);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};