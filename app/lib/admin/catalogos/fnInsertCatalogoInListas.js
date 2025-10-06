'use server'

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "@/app/lib/auth/auth";

export const insertCatalogoInListas = async (req) => {

    const { data, catalogo, idCatalogo } = JSON.parse(req);
    const usuario = (await getSession()).userBACK.user;

    let responsServer = {};
    const sqlString = `CALL updateCatalogos(?, ?, ?)`;


    try {

        if (data.length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = `No hay datos en: ${catalogo} para insertar`;
            return JSON.stringify(responsServer);
        };

        const [rows] = await pool.query(sqlString, [JSON.stringify(data), idCatalogo, usuario]);
        
        if (rows[0][0]?.STATUS !== 200) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = `No se completó la actualizacion del catalogo ${catalogo}`;
            console.log(`${catalogo}:`, responsServer.STATUS);
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 200;
            console.log(`${catalogo}:`, responsServer.STATUS);
            return JSON.stringify(responsServer);
        };


    } catch (error) {
        console.error("Error en la inserción:", error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code || 'UNKNOWN_ERROR';
        responsServer.MESSAGE = error.sqlMessage || 'Error desconocido en la base de datos';
        return JSON.stringify(responsServer);
    };
};