'use server'

import { pool } from "@/config/conectPRICINGDB";


export const queryClientePj = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryClientePj(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
        if (rows[0].length > 0) {
            dataClientePj.state = 200;
            dataClientePj.data = rows[0];
        } else {
            dataClientePj.state = 204;
            dataClientePj.message = `El Nit ${nit} no está registrado en la base de clientes ni en la de prospectos. Puede crear un nuevo cliente o prospecto, o bien iniciar una solicitud para generar una cotización`;
        };

        return JSON.stringify(dataClientePj);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};


export const queryResidenciaFiscalPj = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryResidenciaFiscalPj(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryRepresentanteLegalPj = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryRepresentanteLegalPj(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryContactosAutorizadosPj = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryContactosAutorizadosPj(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryJuntaDirectivaPj = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryJuntaDirectivaPj(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryJuntaDirectivaPn = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryJuntaDirectivaPn(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryAccionistasPj = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryAccionistasPj(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryAccionistasPn = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryAccionistasPn(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryControlantes = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryControlantes(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryBeneficiariosPJ = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryBeneficiariosPJ(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryBeneficiariosPn = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryBeneficiariosPn(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryInformacionFinancieraPj = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryInformacionFinancieraPj(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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

// PRODUCTOS

export const queryCreditoProducto = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryCreditoProducto(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryCuentasProducto = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryCuentasProducto(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const querycdtProcducto = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL querycdtProcducto(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryConvenioActualProducto = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryConvenioActualProducto(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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


export const queryReciprocidadProducto = async (nit) => {

    const dataClientePj = {};
    const sqlString = `CALL queryReciprocidadProducto(?)`;

    try {

        const [rows] = await pool.query(sqlString, [nit]);
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

