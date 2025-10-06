'use server'

import { pool } from "@/config/conectPRICINGDB";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { formatearValor, transformDataGuardarDBNombre } from "../utils";
import { getSession } from "../auth/auth";


export const insertGastosDirectosOficina = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertGastosDirectosOficina(?, ?)`;

    try {
        let rowsAffect = 0;
        const [rows] = await pool.query(sqlString, [data, usuario]);

        if (rows.affectedRows === 1) {
            rowsAffect++;
        };

        if (rowsAffect === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            revalidatePath('/administracion/convenioRecaudo')
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const insertGastosDirectosPse = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertGastosDirectosPse(?, ?)`;

    try {
        let rowsAffect = 0;
        const [rows] = await pool.query(sqlString, [data, usuario]);

        if (rows.affectedRows === 1) {
            rowsAffect++;
        };

        if (rowsAffect === 1) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            revalidatePath('/administracion/convenioRecaudo')
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const insertJustificacionOficina = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertJustificacionOficina(?, ?, ?, ?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i[0], i[1], i[2], i[3], usuario]);
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
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

    revalidatePath('/administracion/convenioRecaudo')
};

export const insertJustificacionPse = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertJustificacionPse(?, ?, ?, ?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i[0], i[1], i[2], i[3], usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect === data.length) {
            responsServer.STATUS = 200;
            responsServer.ROWSAFFECT = rowsAffect;
            return JSON.stringify(responsServer)
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

    revalidatePath('/administracion/convenioRecaudo')
};

export const insertParametrosEfecty = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertParametrosEfecty(?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of Object.values(data)) {
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
            responsServer.MESSAGE = 'No se completó la inserción';

        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
    };

    revalidatePath('/administracion/convenioPago')
    return JSON.stringify(responsServer);
};

/**
 * Convenio Pago
 */

export const insertPromedioNomina = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertPromedioNomina(?, ?)`;

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
            revalidatePath('/administracion/convenioPago');
            return JSON.stringify(responsServer);
        } else {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const insertFrecuenciaNomina = async ({ data, usuario }) => {

    let responsServer = {};
    const sqlString = `CALL insertFrecuenciaNomina(?, ?)`;

    try {

        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i, usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };

        if (rowsAffect !== Object.keys(data).length) {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer);
        }

        responsServer.STATUS = 200;
        responsServer.ROWSAFFECT = rowsAffect;
        return JSON.stringify(responsServer);

    } catch (error) {

        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);

    };
};

export const insertPagoTerseros = async ({ formData }) => {

    const usuario = (await getSession()).userBACK.user
    let data = transformDataGuardarDBNombre({ formData: formData, campoCondicion: 0 })
    let responsServer = {};
    const sqlString = `CALL insertPagoTerseros(?, ?, ?)`;

    try {
        let rowsAffect = 0;

        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i[0], i[1], usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect !== data.length) {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer)
        }

        responsServer.STATUS = 200;
        responsServer.ROWSAFFECT = rowsAffect;
        return JSON.stringify(responsServer)

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    revalidatePath('/administracion/convenioPago')
    return JSON.stringify(responsServer);
};

export const insertNegociarNomina = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertNegociarNomina(?, ?, ?, ?, ?, ?, ?)`;

    try {
        let rowsAffect = 0;
        for (let i of Object.values(data)) {
            const [rows] = await pool.query(sqlString, [i[0], i[1], i[2], i[3], i[4], i[5], usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect !== Object.keys(data).length) {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            // return responsServer;
        }
        responsServer.STATUS = 200;
        responsServer.ROWSAFFECT = rowsAffect;
        // return responsServer;

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        // return responsServer;
    };

    revalidatePath('/administracion/convenioPago')
    return JSON.stringify(responsServer)
};

/**
 * depositoVista
 */

export const insertPlanRemuneracion = async (formData) => {

    const usuario = (await getSession()).userBACK.user
    let ordenarData = {}
    let iteracion0 = true; // Variable para identificar la primera iteración

    formData.forEach((value, key) => {

        if (key.includes('planRemuneracion')) {

            if (!ordenarData[key]) {
                iteracion0 = true
                ordenarData[key] = [];
            }

            iteracion0 ? ordenarData[key].push(value) : ordenarData[key].push(formatearValor({ valor: value }));
            iteracion0 = false
        }

    });

    let data = Object.values(ordenarData)

    console.log(data)

    let responsServer = {};

    if (!data.length) {
        responsServer.STATUS = 200;
        responsServer.ROWSAFFECT = 0;
        responsServer.MESSAGE = 'No hay campos por actualizar';
        return JSON.stringify(responsServer)
    }

    const sqlString = `CALL insertPlanRemuneracion(?, ?)`;

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
            responsServer.MESSAGE = 'Registro exitoso';
            revalidatePath('/administracion/depositoVista')
            return JSON.stringify(responsServer)

        } else {
            console.log("data no se completo")
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer);
        };

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};

export const insertCorresponsales = async ({ data }) => {

    const usuario = (await getSession()).userBACK.user
    let responsServer = {};
    const sqlString = `CALL insertCorresponsales(?, ?, ?, ?, ?)`;

    try {
        let rowsAffect = 0;
        for (let i of data) {
            const [rows] = await pool.query(sqlString, [i[0], i[1], i[2], i[3], usuario]);
            if (rows.affectedRows === 1) {
                rowsAffect++;
            };
        };
        if (rowsAffect !== data.length) {
            responsServer.STATUS = 202;
            responsServer.ROWSAFFECT = rowsAffect;
            responsServer.MESSAGE = 'No se completó la inserción';
            return JSON.stringify(responsServer)
        }

        responsServer.STATUS = 200;
        responsServer.ROWSAFFECT = rowsAffect;
        return JSON.stringify(responsServer)

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;

    };

    revalidatePath('/administracion/convenioRecaudo');
    return JSON.stringify(responsServer);
};


export const redirecionar = ({ url }) => {

    revalidatePath(url)
    redirect(url)

}