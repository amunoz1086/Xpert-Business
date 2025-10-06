'use server'

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const updateEstadoPlanRango = async (req) => {

    const { plan, codPlan } = req;

    const usuario = (await getSession()).userBACK.user
    const sqlString = `CALL updateEstadoPlanRango(?, ?, ?)`;
    const sqlStringFechaUltimo = `CALL updatePlanFechaUltimo(?, ?)`;
    let responseEstado = {};

    try {
        const [rows] = await pool.query(sqlString, [plan, codPlan, usuario]);
    
        switch (rows[0][0].STATUS) {
            case 204: {
                responseEstado.status = rows[0][0].STATUS;
                responseEstado.menssage = 'No fue posible actualizar los estados del rango'
                break;
            }
            case 200: {
                const [row] = await pool.query(sqlStringFechaUltimo, [plan, usuario]);
                
                switch (row[0][0].STATUS) {
                    case 204: {
                        responseEstado.status = rows[0][0].STATUS;
                        responseEstado.menssage = 'No fue posible actualizar Fecha Ultima Actualizacion'
                        break;
                    }
                    case 200: {
                        responseEstado.status = row[0][0].STATUS;
                        break;
                    }
                    default:
                        break;
                }
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