'use server'

import { pool } from "@/config/conectPRICINGDB";


export const queryClientePn = async (CC) => {

    const dataClientePj = {};
    const sqlString = `CALL queryClientePn(?)`;
    const sqlStringProspecto = `CALL queryProspectoPn(?)`;

    try {

        const [rows] = await pool.query(sqlString, [CC]);
        if (rows[0].length > 0) {
            dataClientePj.state = 200;
            dataClientePj.data = rows[0];
        } else {
            dataClientePj.state = 204;
            dataClientePj.message = `El CC o CE ${CC} no esta registrado en la base de clientes ni en la base de prospectos`;
        };

        return JSON.stringify(dataClientePj);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

export const queryResidenciaFiscalPn = async (CC) => {

    const dataClientePj = {};
    const sqlString = `CALL queryResidenciaFiscalPn(?)`;

    try {

        const [rows] = await pool.query(sqlString, [CC]);
        if (rows[0].length > 0) {
            dataClientePj.state = 200;
            dataClientePj.data = rows[0];
        } else {
            dataClientePj.state = 204;
        };

        return JSON.stringify(dataClientePj);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

export const queryActividadEconomicaPn = async (CC) => {

    const dataClientePj = {};
    const sqlString = `CALL queryActividadEconomicaPn(?)`;

    try {

        const [rows] = await pool.query(sqlString, [CC]);
        if (rows[0].length > 0) {
            dataClientePj.state = 200;
            dataClientePj.data = rows[0];
        } else {
            dataClientePj.state = 204;
        };

        return JSON.stringify(dataClientePj);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

export const queryDetalleActividadPn = async (CC) => {

    const dataClientePj = {};
    const sqlString = `CALL queryDetalleActividadPn(?)`;

    try {

        const [rows] = await pool.query(sqlString, [CC]);
        if (rows[0].length > 0) {
            dataClientePj.state = 200;
            dataClientePj.data = rows[0];
        } else {
            dataClientePj.state = 204;
        };

        return JSON.stringify(dataClientePj);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

export const queryReferenciasPn = async (CC) => {

    const dataClientePj = {};
    const sqlString = `CALL queryReferenciasPn(?)`;

    try {

        const [rows] = await pool.query(sqlString, [CC]);
        if (rows[0].length > 0) {
            dataClientePj.state = 200;
            dataClientePj.data = rows[0];
        } else {
            dataClientePj.state = 204;
        };

        return JSON.stringify(dataClientePj);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

