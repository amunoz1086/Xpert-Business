'use server';

import { pool } from "@/config/conectPRICINGDB";

export const minimosMaximos = async (pProducto) => {
    const vProducto = JSON.parse(pProducto);
    const sqlString = `CALL queryMinimoMaximos(?)`;
    const dataDepositoPlazo = {};

    try {
        const [rows] = await pool.query(sqlString, [vProducto]);
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


export const rangosFrecuencias = async (req) => {
    const dataDepositoPlazo = {};
    try {
        const rango = JSON.parse(await fnRangosFrecuencias(req));

        if (rango.state !== 204) {
            dataDepositoPlazo.dentroRango = true;
            dataDepositoPlazo.frecuencia = rango.data;
            return JSON.stringify(dataDepositoPlazo);
        };

        dataDepositoPlazo.dentroRango = false;
        return JSON.stringify(dataDepositoPlazo);

    } catch (e) {
        console.error('❌ Error_rangosFrecuencias:', e);
        dataDepositoPlazo.state = 400;
        dataDepositoPlazo.message = e.message;
        return JSON.stringify(dataDepositoPlazo);
    };
};


async function fnRangosFrecuencias(pReq) {
    const { producto, plazo } = JSON.parse(pReq);
    const sqlString = `CALL queryPlazosFrecuencias(?, ?)`;
    const resRangosFrecuencias = {};

    try {
        const [rows] = await pool.query(sqlString, [producto, plazo]);

        if (producto === 'CDTV' || producto === 'FDLV') {
            if (rows[0][0] !== undefined) {
                resRangosFrecuencias.state = 200;
                resRangosFrecuencias.data = rows[0][0].frecuencia;
                return JSON.stringify(resRangosFrecuencias);
            } else {
                resRangosFrecuencias.state = 204;
                return JSON.stringify(resRangosFrecuencias);
            };
        };

        if (rows[0].length > 0) {
            const frecuencias = Object.values(rows[0][0]);
            resRangosFrecuencias.state = 200;
            resRangosFrecuencias.data = frecuencias;
            return JSON.stringify(resRangosFrecuencias);
        } else {
            resRangosFrecuencias.state = 204;
            return JSON.stringify(resRangosFrecuencias);
        };

    } catch (e) {
        console.error('❌ Error_queryPlazosFrecuencias:', e);
        resRangosFrecuencias.state = 400;
        resRangosFrecuencias.message = e.message;
        return JSON.stringify(resRangosFrecuencias);
    };
};


//Dia habil cercano
export const diaHabil = async (pFecha) => {
    const { fecha } = JSON.parse(pFecha);
    const sqlString = `CALL queryFechaHabil(?)`;
    const dataDepositoPlazo = {};

    try {
        const [rows] = await pool.query(sqlString, [fecha]);
    
        dataDepositoPlazo.state = 200;
        dataDepositoPlazo.data = rows[0][0].diaHabil;
        return JSON.stringify(dataDepositoPlazo);

    } catch (e) {
        console.error('❌ Error_diaHabil:', e);
        dataDepositoPlazo.state = 400;
        dataDepositoPlazo.message = e.message;
        return JSON.stringify(dataDepositoPlazo);
    };
};