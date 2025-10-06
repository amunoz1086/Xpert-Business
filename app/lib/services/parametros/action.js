'use server';

import { pool } from "@/config/conectPRICINGDB";

export const titulosSubtitulosMensajes = async (pCode) => {
    const vCode = JSON.parse(pCode);
    const sqlString = `CALL queryTitulosSubtiMensajes(?)`;
    const dataDepositoPlazo = {};

    try {
        const [rows] = await pool.query(sqlString, [vCode]);
        dataDepositoPlazo.state = 200;
        dataDepositoPlazo.data = rows[0];
        return JSON.stringify(dataDepositoPlazo);

    } catch (e) {
        console.error('❌ Error_minimosMaximos:', e);
        dataDepositoPlazo.state = 400;
        dataDepositoPlazo.message = e.message;
        return JSON.stringify(dataDepositoPlazo);
    };
};