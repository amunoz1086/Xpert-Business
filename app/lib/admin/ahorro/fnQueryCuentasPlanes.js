'use server'

import { pool } from '../../../../config/conectPRICINGDB';

export const queryCuentasPlanes = async (plan, codPlan) => {

   console.log(plan)
   console.log(codPlan)

    const sqlString = `CALL queryCuentasPlanes(?, ?)`;
    let responsServer = {};

    try {

        const [rows] = await pool.query(sqlString, [plan, codPlan]);

        console.log(rows)

        switch (rows[0][0].STATUS) {
            case 204: {
                responsServer.STATUS = rows[0][0].STATUS;
                responsServer.MESSAGE = `El plan ${plan} no es individual o no esta registrado en la base de datos`;
                break;
            }
            case 200: {
                const data = rows[0].map(({ STATUS, ...dRest }) => dRest);
                console.log(data);
                responsServer.STATUS = 200;
                responsServer.DATA = data;
                break;
            }
            default:
                break;
        };

        return JSON.stringify(responsServer);

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};