'use server'

import { pool } from '../../../../config/conectPRICINGDB';


export const procesoEliminarPlan = async (req) => {

    const { plan, codPlan, planContingencia } = req;

    console.log({ plan, codPlan, planContingencia })
    let responsServer = {};
    const sqlString = `CALL procesoEliminarPlan(?, ?, ?)`;

    try {
        const [rows] = await pool.query(sqlString, [plan, codPlan, planContingencia]);
    
        if ((rows[0][0].vPlan === 1 || rows[0][0].vVer === 1 || rows[0][0].vRango === 1 || rows[0][0].vInclusion === 1 )) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};