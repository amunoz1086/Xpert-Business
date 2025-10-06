"use server";

import { pool } from '../../../config/conectPRICINGDB';


export const queryUpdateSolicitudes = async (req, cod) => {

    const sqlString = 'CALL updateDocument(?, ?, ?)';
    const id = cod;
    const responseEstado = {};

    try {
        let affectedRow = 0
        for (let [key, value] of Object.entries(JSON.parse(req))) {
            const [row] = await pool.query(sqlString, [id, key, JSON.stringify(value)]);
            if (row.affectedRows === 1) {
                affectedRow += 1;
            }
        };

        if (affectedRow === 5) {
            responseEstado.state = 200;
        } else {
            responseEstado.state = 204;
        };

        return JSON.stringify(responseEstado);

    } catch (error) {
        console.log(error);
    };
};