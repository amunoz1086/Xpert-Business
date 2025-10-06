'use server'


const restConsultarDepositoPlazo = require("@/app/lib/services/cobis/fn_restConsultas.js");
const restConsultarCliente = require("@/app/lib/services/cobis/fn_restConsultas");
import { fnInspektor } from "@/app/lib/inspektor/fn_inspektor";


export const queryDepositoPlazo = async (req) => {

    const dataDepositoPlazo = {};

    try {

        //Consultar si el cliente existe en el BUC
        const isCliente = await fnIsCliente(req);
        if (isCliente.authorized && isCliente.customerStatus === 'A') {
            const customerData = {
                "customerName": isCliente.customer,
                "customerReference": isCliente.customerReference,
                "customerType": 'PJ',
                "partyIdentification": isCliente.partyIdentification,
                "partyIdentificationType": isCliente.partyIdentificationType,
                "profileType": isCliente.profileType,
                "rol": isCliente.rol,
            }

            const isReportado = await fnIsReportado(req);

            if (isReportado.authorized) {
                const consultarCdt = await fnConsultarCdt(req);
                dataDepositoPlazo.state = 200;
                dataDepositoPlazo.customer = customerData;
                dataDepositoPlazo.data = consultarCdt;

                return JSON.stringify(dataDepositoPlazo);
            };

            return JSON.stringify(isReportado);

        } else {
            dataDepositoPlazo.message = `El cliente ${isCliente.customer}, debe estar activo para poder continuar`;
            throw dataDepositoPlazo;
        };

    } catch (e) {
        console.error('❌ Error_queryDepositoPlazo:', e);
        dataDepositoPlazo.state = 400;
        dataDepositoPlazo.message = e.message;
        return JSON.stringify(dataDepositoPlazo);
    };
};


/**
 * Valida si los datos recibidos son de tipo cadena y si la cadena no esta vacia y luego aplica `JSON.parse`. 
 * 
 * @function parsed
 * @param {string} pPasedSubproducto - Datos en estado bruto.  
 * @returns {Object} Retorna un objeto con los datos del cliente si datos brutos complen con la validaciones, sino retorna null. 
 */
function parsed(pPasedSubproducto) {
    if (typeof (pPasedSubproducto) === 'string' && pPasedSubproducto.length > 0) {
        return JSON.parse(pPasedSubproducto)
    };
    return [null];
};


/**
 * Verifica si un cliente existe, consultando el servicio `fn_restConsultarCliente`.
 *
 * @async
 * @function fnIsCliente
 * @param {string} pDataCliente - Cadena JSON con la información del cliente.
 * @returns {Promise<boolean>} Retorna `true` si el cliente existe y la respuesta es válida.
 * @throws {Object} Lanza un objeto con la propiedad `message` en caso de error o en caso de que el cliente no exista.
 */
async function fnIsCliente(pDataCliente) {
    const dataCliente = JSON.parse(pDataCliente);
    dataCliente.customerType = 'PJ';

    try {
        const rawCliente = await restConsultarCliente.fn_restConsultarCliente(JSON.stringify(dataCliente));
        const parsedRawCliente = parsed(rawCliente);

        if (+parsedRawCliente.data.status !== 200) {
            throw parsedRawCliente.data.message;
        };

        const clienteAutorizacion = {
            "customer": parsedRawCliente.data.operationData.OrganisationReference.OrganizationProfile.OrganizationName?.LegalName,
            "customerStatus": parsedRawCliente.data.operationData.OrganisationReference.CustomerStatus?.Code,
            "customerReference": parsedRawCliente.data.operationData.OrganisationReference?.CustomerReference,
            "partyIdentification": parsedRawCliente.data.operationData.PartyIdentification.PartyIdentification?.Identification,
            "partyIdentificationType": parsedRawCliente.data.operationData.PartyIdentification.PartyIdentification.PartyIdentificationType?.Code,
            "profileType": parsedRawCliente.data.operationData.OrganisationReference.ProfileType?.Code,
            "rol": 'T',
            "authorized": true
        };

        return clienteAutorizacion;

    } catch (error) {
        const isError = {
            "message": error
        };
        throw isError;
    };
};


/**
 * Valida si el cliente esta reportado en listas, utilizando el sercicio `fnInspektor`
 * 
 * @async
 * @function fnIsReportado
 * @param {string} pDataCliente 
 * @returns {Promise<boolean>} Retorna `true` si el cliente no esta reportado.
 * @throws {Object} Lanza un objeto con los datos del error o los datos del reporte en listas restriptivas.
 */
async function fnIsReportado(pDataCliente) {
    const dataCliente = JSON.parse(pDataCliente);
    dataCliente.documentType = dataCliente.identificationType;
    dataCliente.documentNumber = dataCliente.identification;

    delete dataCliente.identificationType;
    delete dataCliente.identification;

    try {
        const rawReportado = await fnInspektor(JSON.stringify(dataCliente));
        const parsedReportado = parsed(rawReportado);

        if (+parsedReportado.state === 200 || +parsedReportado.state === 204) {
            return parsedReportado;
        };

        throw parsedReportado.message;

    } catch (error) {
        const isError = {
            "message": error
        };
        throw isError;
    };
};


/**
 * Valida en el servicio `queryInvestments` si el cliente tiene Depositos a Plazo.
 * 
 * @async
 * @param {string} pDataCliente 
 * @returns
 * @throws
 */
async function fnConsultarCdt(pDataCliente) {
    const dataCliente = JSON.parse(pDataCliente);

    dataCliente.PartyIdentificationType = dataCliente.identificationType;
    dataCliente.Identificacion = dataCliente.identification;
    dataCliente.ProductType = 'CDT';
    dataCliente.PageNumber = 1;
    dataCliente.Size = 10;

    delete dataCliente.identification;
    delete dataCliente.identificationType;

    try {
        const rawRes = await restConsultarDepositoPlazo.fn_restConsultarDepositoPlazo(JSON.stringify(dataCliente));
        const parsedResDepositoPlazo = parsed(rawRes);

        if ((+parsedResDepositoPlazo.data.status !== 200) && (parsedResDepositoPlazo.data.status !== 400)) {
            throw parsedResDepositoPlazo.data.message;
        };

        return parsedResDepositoPlazo;

    } catch (error) {
        const isError = {
            "message": error
        };
        throw isError;
    };
};