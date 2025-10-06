'use server'

import { pool } from "@/config/conectPRICINGDB";
import { revalidatePath } from 'next/cache';
import { formatearValor } from "../utils";
import { getSession } from "../auth/auth";

export const updateAdquirencia = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateAdquirencia(?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(data).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;

        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
        };

    } catch (error) {
        console.log('updateRecaudoPse', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    revalidatePath('/administracion/convenioRecaudo');
    return JSON.stringify(responsServer);
};

export const updateCorresponsales = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateCorresponsales(?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(data).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;

        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';

        };

    } catch (error) {
        console.log('updateRecaudoPse', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    revalidatePath('/administracion/convenioRecaudo');
    return JSON.stringify(responsServer);
};

export const updateJustificacionOficina = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateJustificacionOficina(?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(data).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            return JSON.stringify(responsServer)
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log('updateJustificacionOficina', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

    /* revalidatePath('/administracion/convenioRecaudo') */
};

export const updateJustificacionPse = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateJustificacionPse(?, ?)`;
    console.log('data:', data)

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(data).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            return JSON.stringify(responsServer)
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log('updateJustificacionPse', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

    /* revalidatePath('/administracion/convenioRecaudo') */
};

export const updateRecaudoOficina = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateRecaudoOficina(?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(data).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
        };

    } catch (error) {
        console.log('updateRecaudoOficina', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    revalidatePath('/administracion/convenioRecaudo');
    return JSON.stringify(responsServer);
};

export const updateRecaudoPse = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateRecaudoPse(?, ?)`;

    try {
        let rowsAffect = 0;
        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(data).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
        };

    } catch (error) {
        console.log(error)
        console.log('updateRecaudoPse', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    revalidatePath('/administracion/convenioRecaudo');
    return JSON.stringify(responsServer);
};

export const updatePagoTerceros = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updatePagoTerceros(?, ?)`;

    console.log(data)

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(data).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
        };

    } catch (error) {
        console.log(error)
        console.log('updatePagoTerceros', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    //revalidatePath('/administracion/convenioRecaudo');
    return JSON.stringify(responsServer);
};

export const updateNegociarNomina = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateNegociarNomina(?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === Object.keys(data).length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
        };

    } catch (error) {

        console.log('updateNegociarNomina', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    //revalidatePath('/administracion/convenioRecaudo');
    return JSON.stringify(responsServer);
};


/**
 * servicios financieros
 */

export const updateServiciosFinancieros = async (formData) => {

    const usuario = (await getSession()).userBACK.user
    let ordenarData = {}

    formData.forEach((value, key) => {

        if (key.includes('modificado')) {
            if (!ordenarData[key]) {
                ordenarData[key] = [];
            }
            ordenarData[key].push(formatearValor({ valor: value }));
        }
    });

    let data = Object.values(ordenarData)
    let responsServer = {};

    if (!data.length) {
        responsServer.STATUS = 200;
        responsServer.ROWSAFFECT = 0;
        responsServer.MESSAGE = 'No hay campos para actualizar'
        return JSON.stringify(responsServer)
    }

    const sqlString = `CALL updateServiciosFinancieros(?, ?)`;

    try {
        let rowsAffect = 0;
        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === data.length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'Actualizacion Exitosa'
            revalidatePath('/administracion/servicioFinanciero')
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log('updateJustificacionOficina', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};

/**
 * servicios Campos Clientes
 */

export const updatedDataCampos = async (formData) => {

    const usuario = (await getSession()).userBACK.user;
    let responsServer = {};
    const sqlString = `CALL updatedDataCampos(?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of formData) {

            console.log(i)
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };

        if (rowsAffect === formData.length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'Cambios guardados de forma exitosa'
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se guardaron todos los cambios, intente nuevamente';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log('updatedDataCampos', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const updateReciprocidadMinima = async (data) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateReciprocidadMinima(?, ?, ?)`;

    try {

        const [rows] = await pool.query(sqlString, [data.idReciprocidadMinima, data.monto, usuario]);
        if (rows.affectedRows === 1) {
            responsServer.STATUS = 200;
            responsServer.MESSAGE = 'Actualizacion Exitosa'
        } else {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'No se completó la Actualización';
        };

    } catch (error) {
        console.log('updateReciprocidadMinima', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    return JSON.stringify(responsServer);
};


export const updatePromedioNomina = async (formData) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    // let ordenarData = {}
    const sqlString = `CALL updatePromedioNomina(?, ?, ?)`;

    // formData.forEach((value, key) => {
    //     if (!ordenarData[key]) {
    //         ordenarData[key] = [];
    //     }
    //     ordenarData[key].push(value);
    // });

    // let data = Object.values(ordenarData)

    try {
        let rowsAffect = 0;

        for (let i of formData) {
            console.log(i)
            const [rows] = await pool.query(sqlString, [i[0], i[1], usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };

        if (rowsAffect === formData.length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'Actualizacion Exitosa'
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log('updatePromedioNomina', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const updateParametrosEfecty = async (data) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL updateParametrosEfecty(?, ?, ?)`;
    

    try {
        let rowsAffect = 0;

        for (let i of data) {
            console.log(i)
            const [rows] = await pool.query(sqlString, [i[0], i[1], usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };

        if (rowsAffect === data.length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'Actualizacion Exitosa'
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la Actualización';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log('updateParametrosEfecty', error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};