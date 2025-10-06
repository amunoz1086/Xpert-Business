"use server";

/* MP: funcion pool para el control de la cola de consultas a la api fn_xmlRpc_soap */

import fn_parseo_soap from './fn_parseo_soap';
import { fn_parserResPn } from './fn_parserResPn';

const xmlRpc = require('./fn_xmlRpc_soap');
const variablesInternas = require('./fn_xmlPath_variablesInternas');
const consultarProductosPn = require('./fn_xmlPath_consultarProductosPn');
const consultarProductosPjSt = require('./fn_xmlPath_consultarProductosPj_sinTarjeta');
const consultarProductosPjCt = require('./fn_xmlPath_consultarProductosPj_conTarjeta');
const resconsultarClientePj = require('../rest/fn_restConsultarClientePj');
const consultarClientePn = require('../rest/fn_restConsultarClientePn');
const usoGeneral = require('./fn_xmlPath_usoGeneral');

export const fn_pool_soap = async (req) => {

    const dataReques = req;
    let json_data = {};

    if (parseInt(dataReques.tipoDocumento) === 3) { /* ---> consultar PJ */
        json_data.tipoPersona = 'Pj'

        /* Consultar Cliente PJ */
        const dtConsultarClientePj = JSON.parse(await resconsultarClientePj.fn_restConsultarClientePj(dataReques));
        let rawData = JSON.parse(dtConsultarClientePj?.rawData);

        if (rawData.O_MSJRESPUESTA === 'Cédula NO Existe como Asociado' || rawData.O_MSJRESPUESTA === 'Tipo de Asociado NO es una Persona Juridica') {
            json_data.status = 202;
            json_data.codRes = rawData.O_CODRESPUESTA;
            json_data.message = `${rawData.O_MSJRESPUESTA}`;
        } else {
            json_data.status = 200;
            json_data.codRes = rawData.O_CODRESPUESTA;
            json_data.message = 'Transacción exitosa';
            json_data.consultarClientePj = rawData.O_DETALLECLIENTE;

            /* Consultar Productos_pj sin tarjetas */
            const dtConsultarProductosPjSt = await consultarProductosPjSt.fn_xmlPath_consultarProductosPj_sinTarjeta(dataReques);
            const dtxmlRpc_consultarProductosPjSt = await xmlRpc.fn_xmlRpc_soap(JSON.parse(dtConsultarProductosPjSt));
            json_data.consultarProductosPjSt = JSON.parse(dtxmlRpc_consultarProductosPjSt).xmlData;

            /* Consultar Productos_pj con tarjetas */
            const dtConsultarProductosPjCt = await consultarProductosPjCt.fn_xmlPath_consultarProductosPj_conTarjeta(dataReques);
            const dtxmlRpc_consultarProductosPjCt = await xmlRpc.fn_xmlRpc_soap(JSON.parse(dtConsultarProductosPjCt));
            json_data.consultarProductosPjCt = JSON.parse(dtxmlRpc_consultarProductosPjCt).xmlData;

            /* Variables Internas */
            const dtVariablesInternas = await variablesInternas.fn_soap_variablesInternas(dataReques);
            const dtxmlRpc_variablesInternas = await xmlRpc.fn_xmlRpc_soap(JSON.parse(dtVariablesInternas));
            json_data.variablesInternas = JSON.parse(dtxmlRpc_variablesInternas).xmlData;

            /* usuGeneral */
            const dtUsoGeneral = await usoGeneral.fn_soap_usoGeneral(dataReques);
            const dtxmlRpc_usoGeneral = await xmlRpc.fn_xmlRpc_soap(JSON.parse(dtUsoGeneral));
            json_data.usoGeneral = JSON.parse(dtxmlRpc_usoGeneral).xmlData;

        };

    } else { /* ---> consultar PN */
        json_data.tipoPersona = 'Pn'

        /* Consultar Cliente PN V3 */
        const dtConsultarClientePn = JSON.parse(await consultarClientePn.fn_restVinculaClientePn(dataReques));
        let rawData = JSON.parse(await fn_parserResPn(JSON.parse(dtConsultarClientePn?.rawData)));

        if (rawData.O_CODRES === 91 || rawData.O_CODRES === 9) {
            json_data.status = 202;
            json_data.codRes = rawData.O_CODRES;
            json_data.message = `${rawData.O_MENRES}`;
        } else {
            json_data.status = 200;
            json_data.codRes = rawData.O_CODRES;
            json_data.message = 'Transacción exitosa';
            json_data.consultarClientePn = rawData;

            /* Consultar Productos_pn */
            const dtConsultarProductosPn = await consultarProductosPn.fn_xmlPath_consultarProductosPn(dataReques);
            const dtxmlRpc_consultarProductosPn = await xmlRpc.fn_xmlRpc_soap(JSON.parse(dtConsultarProductosPn));
            json_data.consultarProductosPn = JSON.parse(dtxmlRpc_consultarProductosPn).xmlData;

            /* Variables Internas */
            const dtVariablesInternas = await variablesInternas.fn_soap_variablesInternas(dataReques);
            const dtxmlRpc_variablesInternas = await xmlRpc.fn_xmlRpc_soap(JSON.parse(dtVariablesInternas));
            json_data.variablesInternas = JSON.parse(dtxmlRpc_variablesInternas).xmlData;

            /* usuGeneral */
            const dtUsoGeneral = await usoGeneral.fn_soap_usoGeneral(dataReques);
            const dtxmlRpc_usoGeneral = await xmlRpc.fn_xmlRpc_soap(JSON.parse(dtUsoGeneral));
            json_data.usoGeneral = JSON.parse(dtxmlRpc_usoGeneral).xmlData;
        };
    };

    //INTERACCION CON RESULTADOS DEL SCRIPT fn_parseo_soap
    const dataCliente = await fn_parseo_soap(JSON.stringify(json_data))
        .then((data) => {
            return JSON.stringify(data);
        })
        .catch((error) => {
            console.error(error);
        });

    return dataCliente;
};