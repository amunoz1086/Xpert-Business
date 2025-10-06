'use server'

import { pool } from "@/config/conectPRICINGDB";

// QUERY CREDITI NUEVO
export const fnQueryIbrs = async (req, res,) => {

    const ibrsListado = {};
    const sqlString = `CALL queryIbrs()`;

    try {
        const [rows] = await pool.query(sqlString);
        ibrsListado.state = true;
        ibrsListado.message = `200`;
        ibrsListado.ibrs = rows[0];
        return JSON.stringify(ibrsListado);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

export const querylistarproducto = async (req, res,) => {

    const sqlString = `CALL queryListarTipoProducto()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryFrecuenciaNomina = async () => {

    const sqlString = `CALL queryFrecuenciaNomina()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryPromedioNomina = async () => {

    const sqlString = `CALL queryPromedioNomina()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryNegociarNomina = async (req, res,) => {

    const sqlString = `CALL queryNegociarNomina()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryPagoTerseros = async () => {

    const sqlString = `CALL queryPagoTerseros()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

// convneio recaudo

export const queryRecaudoOficina = async () => {

    const sqlString = `CALL queryRecaudoOficina()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryRecaudoOficina', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryRecaudoPse = async () => {

    const sqlString = `CALL queryRecaudoPse()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryRecaudoPse', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryCorresponsales = async (req, res,) => {

    const sqlString = `CALL queryCorresponsales()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryCorresponsales', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryParametrosEfecty = async () => {

    const sqlString = `CALL queryParametrosEfecty()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryParametrosEfecty', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryGastosDirectosOficina = async () => {

    const sqlString = `CALL queryGastosDirectosOficina()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryGastosDirectosOficina', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryJustificacionOficina = async () => {

    const sqlString = `CALL queryJustificacionOficina()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryJustificacionOficina', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryGastosDirectosPse = async () => {

    const sqlString = `CALL queryGastosDirectosPse()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryGastosDirectosPse', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryJustificacionPse = async () => {

    const sqlString = `CALL queryJustificacionPse()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryJustificacionPse', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryAdquirencia = async () => {

    const sqlString = `CALL queryAdquirencia()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryAdquirencia', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

// servicios Financieros
import { unstable_noStore as noStore } from 'next/cache';

export const queryServiciosFinancieros = async () => {

    noStore()

    const sqlString = `CALL queryServiciosFinancieros()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('queryServiciosFinancieros', error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListarCoberturaFng = async (req, res,) => {

    const sqlString = `CALL queryListarCoberturaFng()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};