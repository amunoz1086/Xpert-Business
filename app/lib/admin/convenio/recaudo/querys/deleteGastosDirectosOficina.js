/* MP: función para eliminar(delete) los registros seleccionados desde el componente GastosDirectosOficina */

import { pool } from '../../../../../../config/conectPRICINGDB';

export default async function deleteGastosDirectosOficina(req, res,) {

    const reqData = req.body;

    let responsServer = {};
    const sqlString = `CALL deleteGastosDirectosOficina(?)`;

    try {
        const [rows] = await pool.query(sqlString, reqData.rowsDelete);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rows.affectedRows;
            return res.status(200).json(JSON.stringify(responsServer));
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rows.affectedRows;
            responsServer.MESSAGE = 'El registro no pudo ser eliminado o no existe';
            return res.status(202).json(JSON.stringify(responsServer));
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return res.status(500).json(JSON.stringify(responsServer));
    };
};