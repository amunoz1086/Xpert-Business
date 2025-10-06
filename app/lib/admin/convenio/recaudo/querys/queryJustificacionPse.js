/* MP: función para la consulta */

import { pool } from '../../../../../../config/conectPRICINGDB';

export default async function queryJustificacionPse(req, res,) {

    const sqlString = `CALL queryJustificacionPse()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return res.status(202).json(JSON.stringify(responsServer));

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return res.status(200).json(JSON.stringify(responsServer));
        }

    } catch (error) {
        console.log('queryJustificacionPse', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return res.status(500).json(JSON.stringify(responsServer));
    };
};