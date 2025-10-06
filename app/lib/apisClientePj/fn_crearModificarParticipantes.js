'use server'

import { fn_restCrearParticipantesPj } from "@/app/lib/services/cobis/fn_restCrearParticipantesPj";
import { fn_restConsultarCliente } from "@/app/lib/services/cobis/fn_restConsultas.js";
import { fn_restCrearParticipantesPn } from "@/app/lib/services/cobis/fn_restCrearParticipantesPn";

export const fn_crearModificarParticipantes = async (data) => {

    const dataParticipantes = JSON.parse(data);
    let responsServer = {};
    
    try {

        if (dataParticipantes[0].tipoIdentificacion === 'NIT') {
            dataParticipantes[0].customerType = 'PJ';
            dataParticipantes[0].tipoPersona = dataParticipantes[0].tipoIdentificacion;
            const resCrearParticipantes = await fn_restCrearParticipantesPj(JSON.stringify(dataParticipantes));
            console.log('Participantes Pj:', resCrearParticipantes);

            const parseRes = JSON.parse(resCrearParticipantes);
            if (parseRes.data.status === '200') {
                const resConsult = JSON.parse(await consultarParticipantes(JSON.stringify(dataParticipantes)));
                responsServer.status = 200;
                responsServer.data = resConsult;
                responsServer.message = parseRes.data.operationData
                return JSON.stringify(responsServer);
            };

            responsServer.status = +parseRes.data.status;
            responsServer.message = parseRes.data.message;

            return JSON.stringify(responsServer);

        } else {
            dataParticipantes[0].customerType = 'PN';
            const resCrearParticipantes = await fn_restCrearParticipantesPn(JSON.stringify(dataParticipantes));
            console.log('Participantes Pn:', resCrearParticipantes);

            const parseRes = JSON.parse(resCrearParticipantes);
            if (parseRes.data.status === '200') {
                const resConsult = JSON.parse(await consultarParticipantes(JSON.stringify(dataParticipantes)));
                responsServer.status = 200;
                responsServer.data = resConsult;
                responsServer.message = parseRes.data.operationData
                return JSON.stringify(responsServer);
            };

            responsServer.status = +parseRes.data.status;
            responsServer.message = parseRes.data.message;

            return JSON.stringify(responsServer);
        };

    } catch (error) {
        console.log('fn_crearModificarParticipantes:', error)
        throw (error)
    };
};


export const consultarParticipantes = async (dataPart) => {
    try {
        const dataParticipante = JSON.parse(dataPart);

        let numeroIdentificacion = '';
        let porcentaje = '0.00';

        if (dataParticipante[0].hasOwnProperty('numeroIdentificacion')) {
            numeroIdentificacion = dataParticipante[0].numeroIdentificacion;
        };

        if (dataParticipante[0].hasOwnProperty('porcentajeParticipacion')) {
            porcentaje = dataParticipante[0].porcentajeParticipacion;
        };

        let dataConsulta = {
            "identification": numeroIdentificacion,
            "identificationType": dataParticipante[0].tipoIdentificacion,
            "customerType": dataParticipante[0].customerType
        };


        const resConsultarParticipantes = await fn_restConsultarCliente(JSON.stringify(dataConsulta));
        const parseResConsulta = JSON.parse(resConsultarParticipantes);


        if (parseResConsulta.status === 200) {
            let ParticipantsExt = {
                "RelationShip": {
                    "Code": dataParticipante[0].codParticipante
                },
                "CustomerRightSide": {
                    "Code": dataParticipante[0].customerType === 'PJ' ? parseResConsulta.data.operationData.OrganisationReference.CustomerReference : parseResConsulta.data.operationData.PersonReference.CustomerReference
                },
                "Side": "I",
                "Porcentaje": porcentaje
            };

            return JSON.stringify(ParticipantsExt);
        };


    } catch (error) {
        console.error(error);
    };
};