"use server";

/* MP: fn_resKnine, funcion para la integración con knine */

import { fnParserResKnime } from './fnParserResKnime';
import { getSession } from "../../auth/auth";
import { fnFilterDataResKnime } from "./fnFilterDataResKnime";

const https = require('https');
const fs = require('fs');

export const fn_resKnine = async (req) => {

    const usuario = (await getSession()).userBACK.user

    const data = await fnFilterDataResKnime(JSON.parse(req));

    const KNIME_HOST = process.env.URL_HOST_KNIME;
    const KNIME_PORT = process.env.URL_PORT_KNIME;
    const KNIME_PATH = process.env.URL_PATH_KNIME;

    const KNIME_USE_STATUS = await valEncode(process.env.AUT_KNIME_USE);
    const KNIME_PASS_STATUS = await valEncode(process.env.AUT_KNIME_PASS);

    let KNIME_USE;
    let KNIME_PASS;

    if (KNIME_USE_STATUS) {
        KNIME_USE = Buffer.from(process.env.AUT_KNIME_USE, 'base64').toString('utf-8');
    } else {
        KNIME_USE = process.env.AUT_KNIME_USE;
    };

    if (KNIME_PASS_STATUS) {
        KNIME_PASS = Buffer.from(process.env.AUT_KNIME_PASS, 'base64').toString('utf-8');
    } else {
        KNIME_PASS = process.env.AUT_KNIME_PASS;
    };


    const KNIME_AUTH = Buffer.from(`${KNIME_USE}:${KNIME_PASS}`).toString('base64');


    if (data.status === 200) {

        const options = {
            'method': 'POST',
            'hostname': KNIME_HOST,
            'port': KNIME_PORT,
            'path': KNIME_PATH,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${KNIME_AUTH}`
            },
            'maxRedirects': 20
        };

        let json_data = {};
        let response_json_data = {};

        let promise = new Promise(function (resolve, reject) {
            const req = https.request(options, function (res) {
                let chunks = [];
                json_data.status = res.statusCode;

                if (res.statusCode === 200) {
                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
                    res.on("end", function (chunk) {
                        let body = Buffer.concat(chunks);
                        json_data.status = res.statusCode;
                        json_data.rawData = body.toString();
                        resolve(json_data);
                    });
                } else {
                    res.on('data', function (chunk) {
                        json_data.status = res.statusCode;
                        json_data.message = res.statusMessage;
                        reject(json_data);
                    });
                };
            }).on('error', (error) => {
                console.log(error)
                json_data.status = error.errno;
                json_data.code = error.code;
                json_data.message = error.message;
                reject(json_data);
            });

            let postData = JSON.stringify({
                "json-input": {
                    "1_ID": `${data.ID}`,
                    "1_TIPO_CLIENTE": `${data.TIPO_CLIENTE}`,
                    "3_TIPO_SOLICITUD": `${data.TIPO_SOLICITUD}`,
                    "1_TIPO_TASA": `${data.TIPO_TASA}`,
                    "1_COD_SECTOR": `${data.COD_SECTOR}`,
                    "1_ACTIVOS": `${data.ACTIVOS}`,
                    "1_VENTAS": `${data.VENTAS}`,
                    "1_VINCULADO": `${data.VINCULADO}`,
                    "2_AGENCIA": `${data.AGENCIA}`,
                    "1_ANTIGUEDAD_COOMEVA": `${data.ANTIGUEDAD_COOMEVA}`,
                    "1_VALOR_IBR": `${data.VALOR_IBR}`,
                    "3_LIN_NUM": `${data.LIN_NUM}`,
                    "3_COD_PRODUC": `${data.COD_PRODUC}`,
                    "3_CREDITO_NUEVO_SPREAD": `${data.CREDITO_NUEVO_SPREAD}`,
                    "3_CREDITO_NUEVO_MONTO": `${data.CREDITO_NUEVO_MONTO}`,
                    "3_CREDITO_NUEVO_PLAZO": `${data.CREDITO_NUEVO_PLAZO}`,
                    "3_CREDITO_NUEVO_RDTO": `${data.CREDITO_NUEVO_RDTO}`,
                    "3_CREDITO_NUEVO_FNG": `${data.CREDITO_NUEVO_FNG}`,
                    "3_TIPO_RDTO": `${data.CREDITO_NUEVO_TIPO_RDTO}`,
                    "3_VALOR_CAPTACION": `${data.VALOR_CAPTACION}`,
                    "3_VALOR_CAPTACION_TASA_NAMV": `${data.VALOR_CAPTACION_TASA_NAMV}`,
                    "3_ID_USUARIO_RAD": `${usuario}`,
                    "4_INGRESO_PROMEDIO_MES": `${data.INGRESO_PROMEDIO_MES}`,
                    "4_NOMINA_NUM_EMPLEA_BCO": `${data.NOMINA_NUM_EMPLEA_BCO}`,
                    "4_TIPO_FRECUENCIA_PAGO": `${data.TIPO_FRECUENCIA_PAGO}`,
                    "4_NOMINA_RETIRO_OFI_CANT": `${data.NOMINA_RETIRO_OFI_CANT}`,
                    "4_NOMINA_RETIRO_VERDE_CANT": `${data.NOMINA_RETIRO_VERDE_CANT}`,
                    "4_NOMINA_RETIRO_EFECTY_CANT": `${data.NOMINA_RETIRO_EFECTY_CANT}`,
                    "4_NOMINA_RETIRO_SYP_CANT": `${data.NOMINA_RETIRO_SYP_CANT}`,
                    "4_NOMINA_SYP_TRFA": `${data.NOMINA_SYP_TRFA}`,
                    "4_NOMINA_BCO_TRFA": `${data.NOMINA_BCO_TRFA}`,
                    "4_NOMINA_CHIP_TRFA": `${data.NOMINA_CHIP_TRFA}`,
                    "4_NOMINA_TRANS_INTER_ACH_CD": `${data.NOMINA_TRANS_INTER_ACH_CD}`,
                    "4_NOMINA_BCO_CD": `${data.NOMINA_BCO_CD}`,
                    "4_NOMINA_CUOTA_CHIP_CD": `${data.NOMINA_CUOTA_CHIP_CD}`,
                    "4_NOMINA_RETIRO_ATM_PROPIO_CD": `${data.NOMINA_RETIRO_ATM_PROPIO_CD}`,
                    "4_NOMINA_RETIRO_ATM_VERDE_CD": `${data.NOMINA_RETIRO_ATM_VERDE_CD}`,
                    "4_NOMINA_RETIRO_EFECTY_CD": `${data.NOMINA_RETIRO_EFECTY_CD}`,
                    "4_NOMINA_RETIRO_SYP_CD": `${data.NOMINA_RETIRO_SYP_CD}`,
                    "4_NOMINA_TRANS_INTER_TRFA": `${data.NOMINA_TRANS_INTER_TRFA}`,
                    "4_PAGO_TERCEROS_BCO_CANT": `${data.PAGO_TERCEROS_BCO_CANT}`,
                    "4_PAGO_TERCEROS_BCO_TRFA": `${data.PAGO_TERCEROS_BCO_TRFA}`,
                    "4_PAGO_TERCEROS_SEBRA_CANT": `${data.PAGO_TERCEROS_SEBRA_CANT}`,
                    "4_PAGO_TERCEROS_SEBRA_TRFA": `${data.PAGO_TERCEROS_SEBRA_TRFA}`,
                    "4_PAGO_TERCEROS_ACH_CANT": `${data.PAGO_TERCEROS_ACH_CANT}`,
                    "4_PAGO_TERCEROS_ACH_TRFA": `${data.PAGO_TERCEROS_ACH_TRFA}`,
                    "4_PAGO_TERCEROS_BCO_CD": `${data.PAGO_TERCEROS_BCO_CD}`,
                    "4_PAGO_TERCEROS_PAGO_SEBRA_CD": `${data.PAGO_TERCEROS_PAGO_SEBRA_CD}`,
                    "4_PAGO_TERCEROS_PAGO_ACH_Plazo1_CD": `${data.PAGO_TERCEROS_PAGO_ACH_CD}`,
                    "4_RECAUDO_MANUAL_CANT": `${data.RECAUDO_MANUAL_CANT}`,
                    "4_RECAUDO_MANUAL_TRFA": `${data.RECAUDO_MANUAL_TRFA}`,
                    "4_RECAUDO_MANUAL_CD": `${data.RECAUDO_MANUAL_CD}`,
                    "4_RECAUDO_BARRAS_CANT": `${data.RECAUDO_BARRAS_CANT}`,
                    "4_RECAUDO_BARRAS_TRFA": `${data.RECAUDO_BARRAS_TRFA}`,
                    "4_RECAUDO_BARRAS_CD": `${data.RECAUDO_BARRAS_CD}`,
                    "4_RECAUDO_EFECTY_TICKET": `${data.RECAUDO_EFECTY_TICKET}`,
                    "4_RECAUDO_EFECTY_CANT": `${data.RECAUDO_EFECTY_CANT}`,
                    "4_RECAUDO_SYP_CANT": `${data.RECAUDO_SYP_CANT}`,
                    "4_RECAUDO_EFECTY_TRFA": `${data.RECAUDO_EFECTY_TRFA}`,
                    "4_RECAUDO_SYP_TRFA": `${data.RECAUDO_SYP_TRFA}`,
                    "4_RECAUDO_PSE_PAGWEB_CANT": `${data.RECAUDO_PSE_PAGWEB_CANT}`,
                    "4_RECAUDO_PSE_PAGWEB_PROMEDIO": `${data.RECAUDO_PSE_PAGWEB_PROMEDIO}`,
                    "4_RECAUDO_PSE_PAGWEB_CODSER": `${data.RECAUDO_PSE_PAGWEB_CODSER}`,
                    "4_RECAUDO_PSE_PAGWEB_TRFA": `${data.RECAUDO_PSE_PAGWEB_TRFA}`,
                    "4_RECAUDO_PSE_PORTAL_CANT": `${data.RECAUDO_PSE_PORTAL_CANT}`,
                    "4_RECAUDO_PSE_PORTAL_PROMEDIO": `${data.RECAUDO_PSE_PORTAL_PROMEDIO}`,
                    "4_RECAUDO_PSE_PORTAL_CODSER": `${data.RECAUDO_PSE_PORTAL_CODSER}`,
                    "4_RECAUDO_PSE_PORTAL_TRFA": `${data.RECAUDO_PSE_PORTAL_TRFA}`,
                    "4_RECAUDO_PSE_PAGWEB_CD": `${data.RECAUDO_PSE_PAGWEB_CD}`,
                    "4_SERVICIOS_CHEQUEG_TRFA": `${data.SERVICIOS_CHEQUEG_TRFA}`,
                    "4_SERVICIOS_CHEQUEG_CANT": `${data.SERVICIOS_CHEQUEG_CANT}`,
                    "4_SERVICIOS_CHEQUEG_CD": `${data.SERVICIOS_CHEQUEG_CD}`,
                    "4_SERVICIOS_CHEQUE30_TRFA": `${data.SERVICIOS_CHEQUE30_TRFA}`,
                    "4_SERVICIOS_CHEQUE30_CANT": `${data.SERVICIOS_CHEQUE30_CANT}`,
                    "4_SERVICIOS_CHEQUE30_CD": `${data.SERVICIOS_CHEQUE30_CD}`,
                    "4_SERVICIOS_CHEQUE100_TRFA": `${data.SERVICIOS_CHEQUE100_TRFA}`,
                    "4_SERVICIOS_CHEQUE100_CANT": `${data.SERVICIOS_CHEQUE100_CANT}`,
                    "4_SERVICIOS_CHEQUE100_CD": `${data.SERVICIOS_CHEQUE100_CD}`,
                    "4_SERVICIOS_CHEQUECON_TRFA": `${data.SERVICIOS_CHEQUECON_TRFA}`,
                    "4_SERVICIOS_CHEQUECON_CANT": `${data.SERVICIOS_CHEQUECON_CANT}`,
                    "4_SERVICIOS_CHEQUECON_CD": `${data.SERVICIOS_CHEQUECON_CD}`,
                    "4_SERVICIOS_OVPJ_TRFA": `${data.SERVICIOS_OVPJ_TRFA}`,
                    "4_SERVICIOS_OVPJ_CANT": `${data.SERVICIOS_OVPJ_CANT}`,
                    "4_SERVICIOS_OVPJ_CD": `${data.SERVICIOS_OVPJ_CD}`,
                    "4_SERVICIOS_TC_TRFA": `${data.SERVICIOS_TC_TRFA}`,
                    "4_SERVICIOS_TC_CANT": `${data.SERVICIOS_TC_CANT}`,
                    "4_SERVICIOS_TC_CD": `${data.SERVICIOS_TC_CD}`,
                    "4_SERVICIOS_GIRO_TRFA": `${data.SERVICIOS_GIRO_TRFA}`,
                    "4_SERVICIOS_GIRO_CANT": `${data.SERVICIOS_GIRO_CANT}`,
                    "4_SERVICIOS_GIRO_CD": `${data.SERVICIOS_GIRO_CD}`,
                    "4_ADQUI_DVISA_FTRA": `${data.ADQUI_DVISA_FTRA}`,
                    "4_ADQUI_DELECTRON_FTRA": `${data.ADQUI_DELECTRON_FTRA}`,
                    "4_ADQUI_CVISA_FTRA": `${data.ADQUI_CVISA_FTRA}`,
                    "4_ADQUI_DMASTER_FTRA": `${data.ADQUI_DMASTER_FTRA}`,
                    "4_ADQUI_CMASTER_FTRA": `${data.ADQUI_CMASTER_FTRA}`,
                    "4_ADQUI_DVISA_TRFA": `${data.ADQUI_DVISA_TRFA}`,
                    "4_ADQUI_DELECTRON_TRFA": `${data.ADQUI_DELECTRON_TRFA}`,
                    "4_ADQUI_CVISA_TRFA": `${data.ADQUI_CVISA_TRFA}`,
                    "4_ADQUI_DMASTER_TRFA": `${data.ADQUI_DMASTER_TRFA}`,
                    "4_ADQUI_CMASTER_TRFA": `${data.ADQUI_CMASTER_TRFA}`,
                    "4_MCC": `${data.MCC}`,
                    "4_ADQUI_DVISA_MCC": `${data.ADQUI_DVISA_MCC}`,
                    "4_ADQUI_DELECTRON_MCC": `${data.ADQUI_DELECTRON_MCC}`,
                    "4_ADQUI_CVISA_MCC": `${data.ADQUI_CVISA_MCC}`,
                    "4_ADQUI_DMASTER_MCC": `${data.ADQUI_DMASTER_MCC}`,
                    "4_ADQUI_CMASTER_MCC": `${data.ADQUI_CMASTER_MCC}`,
                    "4_ADQUI_DMAESTRO_FTRA": `${data.ADQUI_DMAESTRO_FTRA}`,
                    "4_ADQUI_DMAESTRO_TRFA": `${data.ADQUI_DMAESTRO_TRFA}`,
                    "4_ADQUI_DMAESTRO_MCC": `${data.ADQUI_DMAESTRO_MCC}`,
                    "4_ADQUI_CVISA_TICKET": `${data.ADQUI_CVISA_TICKET}`,
                    "4_ADQUI_DVISA_TICKET": `${data.ADQUI_DVISA_TICKET}`,
                    "4_ADQUI_DELECTRON_TICKET": `${data.ADQUI_DELECTRON_TICKET}`,
                    "4_ADQUI_DMASTER_TICKET": `${data.ADQUI_DMASTER_TICKET}`,
                    "4_ADQUI_CMASTER_TICKET": `${data.ADQUI_CMASTER_TICKET}`,
                    "4_ADQUI_DMAESTRO_TICKET": `${data.ADQUI_DMAESTRO_TICKET}`,
                    "4_ADQUI_CREDIBANCO_VP": `${data.ADQUI_CREDIBANCO_VP}`,
                    "4_ADQUI_REDEBAN_VP": `${data.ADQUI_REDEBAN_VP}`,
                    "4_ADQUI_CREDIBANCO_VNP": `${data.ADQUI_CREDIBANCO_VNP}`,
                    "4_ADQUI_REDEBAN_VNP": `${data.ADQUI_REDEBAN_VNP}`,
                    "4_ADQUI_REDEBAN_MICRO": `${data.ADQUI_REDEBAN_MICRO}`,
                    "4_ADQUI_CREDIBANCO_VENDING": `${data.ADQUI_CREDIBANCO_VENDING}`,
                    "4_ADQUI_CREDIBANCO_TRMASIVO": `${data.ADQUI_CREDIBANCO_TRMASIVO}`,
                    "4_CONVENIOS_GASTOS_CLIENTE": `${data.CONVENIOS_GASTOS_CLIENTE}`,
                    "4_CONVENIOS_MESES_DIFERIR": `${data.CONVENIOS_MESES_DIFERIR}`
                }
            });

            console.log('Request Knine:', (postData));

            req.write(postData);
            req.end();
        });

        await promise
            .finally(() => console.log(`integration knine status: ${json_data.status}`))
            .then(async result => {
                let parseResulRawDataStatus = {};
                let resultRawData = JSON.stringify(result);
                let parseResulRawData = JSON.parse(resultRawData);
                let parseRequest = JSON.parse(parseResulRawData.rawData).inputParameters;
                parseResulRawDataStatus.status = parseResulRawData.status;
                parseResulRawData = JSON.parse(parseResulRawData.rawData).outputValues;
                response_json_data = await parserData(Object.assign(parseResulRawDataStatus, Object.values(parseResulRawData)[0][0], parseRequest));
            })
            .catch(error => {
                console.log('error:', error);
                console.error(error);
                response_json_data = error;
            });

        return JSON.stringify(response_json_data);
    };
};

async function parserData(responseData) {
    try {
        return await fnParserResKnime(responseData);
    } catch (error) {
        console.log(error);
    };
};

async function valEncode(data) {
    try {

        const dCode = atob(data);
        const eCode = Buffer.from(dCode).toString('base64');
        return eCode === data;

    } catch (error) {
        return true;
    };
};