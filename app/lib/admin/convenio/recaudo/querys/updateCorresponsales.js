/* MP: función para actualizar los valores */

import { pool } from '../../../../../../config/conectPRICINGDB';

export default async function updateCorresponsales(req, res,) {

    const reqData = req.body;
    const { usuario } = req.body;
    delete reqData.usuario;


    let responsServer = {};
    const sqlString = `CALL updateCorresponsales(?, ?)`;

    try {
        let rowsAffect = 0;
        for (let i of Object.values(reqData)) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(reqData).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            return res.status(200).json(JSON.stringify(responsServer));
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
            return res.status(202).json(JSON.stringify(responsServer));
        };

    } catch (error) {
        console.log('updateRecaudoPse', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return res.status(500).json(JSON.stringify(responsServer));
    };
};