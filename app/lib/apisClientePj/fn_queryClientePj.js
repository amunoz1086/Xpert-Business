'use server'

const restConsultarCliente = require("@/app/lib/services/cobis/fn_restConsultas.js");
import { generarCadenaVerficacion } from '@/app/lib/utils';
import { parserClientePj } from '@/app/lib/apisClientePj/parserClientePj';

export const queryClientePj = async (req) => {
    const { identification } = JSON.parse(req);
    const dataClientePj = {};

    try {
        const digitoVerificacion = generarCadenaVerficacion({ nit: identification });
        const nitDigitoVerificacion = `${identification}-${digitoVerificacion}`;

        // Llamada al servicio, puede devolver string o objeto
        const rawRes = await restConsultarCliente.fn_restConsultarCliente(req);
        const resDataCliente = typeof rawRes === 'string'
            ? JSON.parse(rawRes)
            : rawRes;
        
            // Validar estructura
        const statusCode = resDataCliente?.data?.status;
        if (statusCode === '200' || statusCode === 200) {

            // parserClientePj puede aceptar objeto o string JSON
            const parsed = await parserClientePj(
                typeof resDataCliente === 'string'
                    ? resDataCliente
                    : JSON.stringify(resDataCliente)
            );

            dataClientePj.state = 200;
            dataClientePj.documentoIngresado = { DV: digitoVerificacion, NIT_DV: nitDigitoVerificacion };
            dataClientePj.data = parsed;
        } else if (statusCode === '400' || statusCode === 400) {
            dataClientePj.state = 204;
            dataClientePj.message = `Code: ${statusCode}-. ${resDataCliente.data.message}.`;
        } else {
            dataClientePj.state = parseInt(statusCode, 10) || 500;
            dataClientePj.message = `Code: ${statusCode}-. ${resDataCliente.data.message}`;
        }

        return JSON.stringify(dataClientePj);

    } catch (e) {
        console.error('Error_queryCliente:', e);
        dataClientePj.state = 400;
        dataClientePj.message = e.message;
        return JSON.stringify(dataClientePj);
    }
};
