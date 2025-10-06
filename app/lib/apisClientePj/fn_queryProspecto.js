'use server'

const restConsultarCliente = require("@/app/lib/services/cobis/fn_restConsultas.js");
//import { fn_restConsultarParticipantes } from '@/app/lib/services/cobis/fn_restConsultas.js';
import { parsedParticipantePn, parsedParticipantePj } from '@/app/lib/apisClientePj/parsedParticipantes.js';


export const fn_queryProspecto = async (req) => {
    const validDataParticipante = {};
    const dataParticipante = [];

    try {

        const rawRes = await restConsultarCliente.fn_restConsultarCliente(req);
        const resDataCliente = typeof rawRes === 'string'
            ? JSON.parse(rawRes)
            : rawRes;

        const statusCode = resDataCliente?.data?.status;
        if (statusCode === '200' || statusCode === 200) {

            const rawReferece = JSON.parse(req);

            if (rawReferece.customerType === 'PN') {
                
                //rawReferece.customerReference = `${resDataCliente?.data?.operationData?.PersonReference?.CustomerReference}`;
                const cleanParsedParticipante = await parsedParticipantePn(resDataCliente);

                if (cleanParsedParticipante.status === 200) {
                    dataParticipante.push(cleanParsedParticipante);
                };

            } else if (rawReferece.customerType === 'PJ') {

                //rawReferece.customerReference = `${resDataCliente?.data?.operationData?.OrganisationReference?.CustomerReference}`;
                const cleanParsedParticipante = await parsedParticipantePj(resDataCliente);

                if (cleanParsedParticipante.status === 200) {
                    dataParticipante.push(cleanParsedParticipante);
                };
            }

            validDataParticipante.state = 200;
            validDataParticipante.data = dataParticipante;

        } else if (statusCode === '400' || statusCode === 400) {
            validDataParticipante.state = 204;
            validDataParticipante.message = `Code: ${statusCode}-. ${resDataCliente.data.message}.`;
        } else {
            validDataParticipante.state = parseInt(statusCode, 10) || 500;
            validDataParticipante.message = `Code: ${statusCode}-. ${resDataCliente.data.message}`;
        }

        return JSON.stringify(validDataParticipante);

    } catch (e) {
        console.error('Error_queryParticipantes:', e);
        validDataParticipante.state = 400;
        validDataParticipante.message = e.message;
        return JSON.stringify(validDataParticipante);
    }
};
