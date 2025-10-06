"use server";

/* funcion para el parseo de datos llegados desde knime y la consulta de los datos de los entes en la bd */

import { fnAprobador } from './fnAprobador';
import { fnParametrizador } from './fnParametrizador';
import { fnCorreoAprobadores } from './fnCorreoAprobadores';


export const fnParserResKnime = async (req) => {

    const dataReques = req;
    const dataResponseParser = {};

    if (dataReques.hasOwnProperty('4_ENTE_APROBACION')) {
        let valEnte = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_ENTE_APROBACION')];
        if (valEnte === "missing") {
            dataResponseParser.STATUS = 204;
        } else if (valEnte === "99") {
            dataResponseParser.STATUS = 99;
        } else {
            dataResponseParser.STATUS = dataReques.status;
        }
    } else {
        dataResponseParser.STATUS = 204;
    };

    if (dataResponseParser.STATUS === 200 || dataResponseParser.STATUS === 99) {

        dataResponseParser.MARGEN_INGRESO = Object.values(dataReques)[Object.keys(dataReques).indexOf('5_MARGEN_INGRESO')];
        dataResponseParser.MARGEN_NOMINA = Object.values(dataReques)[Object.keys(dataReques).indexOf('5_MARGEN_NOMINA')];
        dataResponseParser.MARGEN_PAGO = Object.values(dataReques)[Object.keys(dataReques).indexOf('5_MARGEN_PAGO')];
        dataResponseParser.MARGEN_RECAUDO = Object.values(dataReques)[Object.keys(dataReques).indexOf('5_MARGEN_RECAUDO')];
        dataResponseParser.MARGEN_SFINANCIEROS = Object.values(dataReques)[Object.keys(dataReques).indexOf('5_MARGEN_SFINANCIEROS')];
        dataResponseParser.MARGEN_ADQUI = Object.values(dataReques)[Object.keys(dataReques).indexOf('5_MARGEN_ADQUI')];
        dataResponseParser.MARGEN_CONVENIOS = Object.values(dataReques)[Object.keys(dataReques).indexOf('5_MARGEN_CONVENIOS')];

        dataResponseParser.CAPTA_NETA = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_CAPTA_NETA')];
        dataResponseParser.MARGEN_CAPTACION = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_MARGEN_CAPTACION')];
        dataResponseParser.ADQUI_RECIPRO = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_ADQUI_RECIPRO')];

        dataResponseParser.MARGEN_ANUAL2 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_MARGEN_ANUAL2')];
        dataResponseParser.MARGEN_ANUAL3 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_MARGEN_ANUAL3')];
        dataResponseParser.POOL_CARTERA_1 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_POOL_CARTERA_1')];
        dataResponseParser.POOL_CARTERA_2 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_POOL_CARTERA_2')];
        dataResponseParser.POOL_CARTERA_3 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_POOL_CARTERA_3')];
        dataResponseParser.TASA_GASTO_1 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TASA_GASTO_1')];
        dataResponseParser.TASA_GASTO_2 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TASA_GASTO_2')];
        dataResponseParser.TASA_GASTO_3 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TASA_GASTO_3')];
        dataResponseParser.TASA_PROVISION_1 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TASA_PROVISION_1')];
        dataResponseParser.TASA_PROVISION_2 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TASA_PROVISION_2')];
        dataResponseParser.TASA_PROVISION_3 = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TASA_PROVISION_3')];

        dataResponseParser.TASA_CONVERSOR_1 = Object.values(dataReques)[Object.keys(dataReques).indexOf('3_TASA_CONVERSOR 1')];
        dataResponseParser.TASA_CONVERSOR_2 = Object.values(dataReques)[Object.keys(dataReques).indexOf('3_TASA_CONVERSOR 2')];
        dataResponseParser.TASA_CONVERSOR_3 = Object.values(dataReques)[Object.keys(dataReques).indexOf('3_TASA_CONVERSOR 3')];

        dataResponseParser.VALOR_CAPTACION_1 = Object.values(dataReques)[Object.keys(dataReques).indexOf('3_VALOR_CAPTACION 1')];
        dataResponseParser.VALOR_CAPTACION_2 = Object.values(dataReques)[Object.keys(dataReques).indexOf('3_VALOR_CAPTACION 2')];
        dataResponseParser.VALOR_CAPTACION_3 = Object.values(dataReques)[Object.keys(dataReques).indexOf('3_VALOR_CAPTACION 3')];

        dataResponseParser.TASA_NAMV_VTasa1 = Object.values(dataReques)[Object.keys(dataReques).indexOf('1_TASA_NAMV_VTasa1')];
        dataResponseParser.TASA_NAMV_VTasa2 = Object.values(dataReques)[Object.keys(dataReques).indexOf('1_TASA_NAMV_VTasa2')];
        dataResponseParser.TASA_NAMV_VTasa3 = Object.values(dataReques)[Object.keys(dataReques).indexOf('1_TASA_NAMV_VTasa3')];

        dataResponseParser.TIPO_TASA_CONVERSOR_1 = Object.values(dataReques)[Object.keys(dataReques).indexOf('1_TIPO_TASA_CONVERSOR 1')];
        dataResponseParser.TIPO_TASA_CONVERSOR_2 = Object.values(dataReques)[Object.keys(dataReques).indexOf('1_TIPO_TASA_CONVERSOR 2')];
        dataResponseParser.TIPO_TASA_CONVERSOR_3 = Object.values(dataReques)[Object.keys(dataReques).indexOf('1_TIPO_TASA_CONVERSOR 3')];

        dataResponseParser.TIPO_EMPRESA = Object.values(dataReques)[Object.keys(dataReques).indexOf('1_TIPO_EMPRESA')];
        dataResponseParser.PARAMETRIZADOR = `${Object.values(dataReques)[Object.keys(dataReques).indexOf('4_PARAMETRIZADOR')]}`;
        dataResponseParser.PORC_ROA_MINIMO = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_PORC_ROA_MINIMO')];
        dataResponseParser.TOTAL_MARGEN_CARTERA = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TOTAL_MARGEN_CARTERA')];
        dataResponseParser.TOTAL_MARGEN_CAPTA = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TOTAL_MARGEN_CAPTA')];
        dataResponseParser.TOTAL_MARGEN = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TOTAL_MARGEN')];
        dataResponseParser.UTILIDAD_ANUAL = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_UTILIDAD_ANUAL')];
        dataResponseParser.PORC_ROA_EA = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_PORC_ROA_EA')];
        dataResponseParser.POR_COSTO_INTEGRAL_Max = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_POR_COSTO_INTEGRAL_Max')];
        dataResponseParser.PORC_COSTO_INTEGRAL = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_PORC_COSTO_INTEGRAL')];
        dataResponseParser.REGIONAL = Object.values(dataReques)[Object.keys(dataReques).indexOf('39_REGIONAL')];
        dataResponseParser.ENTE_APROBACION = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_ENTE_APROBACION')];

        let ENTE_APROBACION = [];
        for (let i of dataResponseParser.ENTE_APROBACION.split(';')) {
            ENTE_APROBACION.push(parseInt(i))
        };

        dataResponseParser.ENTE_ATRIBUCION_FINAL = ENTE_APROBACION;
        dataResponseParser.APROBACIONES_REQUERIDAS = dataResponseParser.ENTE_ATRIBUCION_FINAL.length + 1;

        let responseCorreosAprobadores = await fnCorreoAprobadores(ENTE_APROBACION[0])
        dataResponseParser.CORREOS_TIPO_APROBADOR = JSON.parse(responseCorreosAprobadores).correos;

        let responseAprobador = await fnAprobador(dataResponseParser.ENTE_ATRIBUCION_FINAL);
        dataResponseParser.DATOS_ENTE_ATRIBUCION_FINAL = JSON.parse(responseAprobador).aprobador;

        let enteFinal = [];
        enteFinal.push(ENTE_APROBACION[ENTE_APROBACION.length - 1]);
        let reponseEnteFinal = await fnAprobador(enteFinal);
        dataResponseParser.DATOS_ENTE_FINAL = JSON.parse(reponseEnteFinal).aprobador;

        let responseParametrizador = await fnParametrizador(dataResponseParser.PARAMETRIZADOR);
        dataResponseParser.DATOS_PARAMETRIZADOR = JSON.parse(responseParametrizador).parametrizador[0];

        dataResponseParser.TOTAL_GASTO_CARTERA = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TOTAL_GASTO_CARTERA')];
        dataResponseParser.TOTAL_PROMEDIO_CAPTA = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TOTAL_PROMEDIO_CAPTA')];
        dataResponseParser.FONDEO_TOTAL = Object.values(dataReques)[Object.keys(dataReques).indexOf('5_FONDEO_TOTAL')];
        dataResponseParser.TOTAL_PROMEDIO_COLOCA = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TOTAL_PROMEDIO_COLOCA')];
        dataResponseParser.TOTAL_GCLIENTE = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_TOTAL_GCLIENTE')];

        if (Object.values(dataReques)[Object.keys(dataReques).indexOf('4_RECIPRO_MIN')] === undefined) {
            dataResponseParser.RECIPRO_MIN = 0;
        } else {
            dataResponseParser.RECIPRO_MIN = Object.values(dataReques)[Object.keys(dataReques).indexOf('4_RECIPRO_MIN')];
        };

        dataResponseParser.VERSION = Object.values(dataReques)[Object.keys(dataReques).indexOf('VERSION')];
        dataResponseParser.REQUEST = Object.values(dataReques)[Object.keys(dataReques).indexOf('json-input')];
    };

    return dataResponseParser;
};