"use server";

import { pool } from '../../../config/conectPRICINGDB';
import { getSession } from "../auth/auth";
import { obtenerCookiePerfil } from "@/app/lib/auth/auth";
import { queryValidarProducto } from "@/app/lib/solicitudes/queryValidarProducto";


export const queryListarSolicitudes = async () => {

    const PERFILACTIVO = await obtenerCookiePerfil();
    const USUARIO = (await getSession()).userBACK.user;


    if (parseInt(PERFILACTIVO.value) === 3) {
        const sqlStringAprobador = `CALL querySolicitudesPorAprobacion(?)`;
        let response = await request(sqlStringAprobador, USUARIO, parseInt(PERFILACTIVO.value));
        return JSON.stringify(response);
    };


    if (parseInt(PERFILACTIVO.value) === 4) {
        const sqlStringParametrizador = `CALL querySolicitudesPorParametrizar(?)`;
        let response = await request(sqlStringParametrizador, USUARIO, parseInt(PERFILACTIVO.value));
        return JSON.stringify(response);
    };


    if (parseInt(PERFILACTIVO.value) === 5) {
        const sqlStringConsulta = `CALL queryListarSolicitudes()`;
        let response = await request(sqlStringConsulta, USUARIO, parseInt(PERFILACTIVO.value));
        return JSON.stringify(response)
    };


    if (parseInt(PERFILACTIVO.value) === 2) {
        const sqlStringConsulta = `CALL queryListarSolicitudes()`;
        let response = await request(sqlStringConsulta, USUARIO, parseInt(PERFILACTIVO.value));
        return JSON.stringify(response)
    };

};


async function request(sqlString, USU, codPerfil) {

    let resDataSolicitud = {};

    try {
        const [rows] = await pool.query(sqlString, [USU]);

        if (rows[0].length > 0) {
            const resProcesar = await procesarProducto(rows);
            resDataSolicitud.STATUS = true;
            resDataSolicitud.MESSAGE = 'Listado generado';
            resDataSolicitud.DATA = JSON.stringify(resProcesar);
            return (resDataSolicitud);

        } else {
            resDataSolicitud.STATUS = false;
            if (codPerfil === 5 || codPerfil === 2) {
                resDataSolicitud.MESSAGE = '¡Sin solicitudes para Mostrar!';
            } else {
                resDataSolicitud.MESSAGE = '¡Sin solicitudes por Aprobar!';
            }

            return (resDataSolicitud);
        };

    } catch (error) {
        console.log(error);
        resDataSolicitud.STATUS = false;
        resDataSolicitud.MESSAGE = `No fue posible generar el listado de solicitudes: ${error.code}`;
        resDataSolicitud.ERROR = error;
        return (resDataSolicitud);
    };
};


async function procesarProducto(data) {
    const incluirProducto = new Array();
    for (let i of data[0]) {
        const codProductos = i.PRODUCTO.split(",");
        const valProductos = await validarProductos(codProductos);
        i.NOMBRE_PRODUCTO = valProductos;
        incluirProducto.push(i);
    };

    return incluirProducto;
};


async function validarProductos(dataProductos) {
    const nomProducto = new Array();

    for (let i of dataProductos) {
        const codProducto = i.trim()
        const resValidarProducto = JSON.parse(await queryValidarProducto(codProducto));
        nomProducto.push(resValidarProducto.data[0].NOMBRE);
    };

    return nomProducto.toString();
}