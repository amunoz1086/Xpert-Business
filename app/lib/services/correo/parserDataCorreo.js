"use server";

/* funcion para el paserso de datos para el correo */

import { fnQueryBuscarRegional } from "@/app/lib/menuPrincipal/actions";

export const parserDataCorreo = async (req) => {

    const dataReques = req;
    let regional = JSON.parse(await fnQueryBuscarRegional(parseInt(dataReques.RADICACION.regional)));

    const dataParser = {};
    dataParser.status = 200;
    dataParser.codSolicitud = dataReques.COD_SOLICITUD;
    dataParser.identificacion = dataReques.RADICACION.numDocumento;
    dataParser.cliente = dataReques.RADICACION.cliente;
    dataParser.regional = regional.regional[0].REGIONAL_RAD;
    dataParser.credito = dataReques.SOLICITUD.tipoProducto.credito;
    dataParser.captacion = '';
    dataParser.convenio = dataReques.SOLICITUD.tipoProducto?.convenio;
    dataParser.nuevo = dataReques.SOLICITUD.tipoOperacion?.nuevo;
    dataParser.ajuste = '';

    if (dataReques.CREDITO_NUEVO.length > 0) {
        dataParser.cupoMonto = dataReques.CREDITO_NUEVO[0].monto === "" ? 0 : dataReques.CREDITO_NUEVO[0].monto;
        dataParser.cupoPlazo = dataReques.CREDITO_NUEVO[0].plazo === "" ? 0 : dataReques.CREDITO_NUEVO[0].plazo;
        dataParser.cupoRedescuento = dataReques.CREDITO_NUEVO[0].spreadIbr === "" ? 0 : dataReques.CREDITO_NUEVO[0].spreadIbr;
        dataParser.cupoCobertura = dataReques.CREDITO_NUEVO[0].coberturaFng === "" ? 0 : dataReques.CREDITO_NUEVO[0].coberturaFng;
        dataParser.tesoMonto = dataReques.CREDITO_NUEVO[1].monto === "" ? 0 : dataReques.CREDITO_NUEVO[1].monto;
        dataParser.tesoPlazo = dataReques.CREDITO_NUEVO[1].plazo === "" ? 0 : dataReques.CREDITO_NUEVO[1].plazo;
        dataParser.tesoRedescuento = dataReques.CREDITO_NUEVO[1].spreadIbr === "" ? 0 : dataReques.CREDITO_NUEVO[1].spreadIbr;
        dataParser.tesoCobertura = dataReques.CREDITO_NUEVO[1].coberturaFng === "" ? 0 : dataReques.CREDITO_NUEVO[1].coberturaFng;
    } else {
        dataParser.cupoMonto = 0;
        dataParser.cupoPlazo = 0;
        dataParser.cupoRedescuento = 0;
        dataParser.cupoCobertura = 0;
        dataParser.tesoMonto = 0;
        dataParser.tesoPlazo = 0;
        dataParser.tesoRedescuento = 0;
        dataParser.tesoCobertura = 0;
    };

    if (dataReques.RECIPROCIDAD_RESUMEN.corriente.hasOwnProperty('monto0')) {
        dataParser.ahorroMonto = dataReques.RECIPROCIDAD_RESUMEN.corriente.monto0 === "" ? 0 : dataReques.RECIPROCIDAD_RESUMEN.corriente.monto0;
    } else {
        dataParser.ahorroMonto = 0;
    };

    if (dataReques.RECIPROCIDAD_RESUMEN.corriente.hasOwnProperty('tasa0')) {
        dataParser.ahorroTasa = dataReques.RECIPROCIDAD_RESUMEN.corriente.tasa0 === "" ? 0 : dataReques.RECIPROCIDAD_RESUMEN.corriente.tasa0;
    } else {
        dataParser.ahorroTasa = 0;
    };

    if (dataReques.RECIPROCIDAD_RESUMEN.ahorro.hasOwnProperty('monto1')) {
        dataParser.corrienteMonto = dataReques.RECIPROCIDAD_RESUMEN.ahorro.monto1 === "" ? 0 : dataReques.RECIPROCIDAD_RESUMEN.ahorro.monto1;
    } else {
        dataParser.corrienteMonto = 0;
    };

    if (dataReques.RECIPROCIDAD_RESUMEN.ahorro.hasOwnProperty('tasa1')) {
        dataParser.corrienteTasa = dataReques.RECIPROCIDAD_RESUMEN.ahorro.tasa1 === "" ? 0 : dataReques.RECIPROCIDAD_RESUMEN.ahorro.tasa1;
    } else {
        dataParser.corrienteTasa = 0;
    };

    dataParser.convenioPago = dataReques.SOLICITUD.tipoConvenio?.convenioPago;
    dataParser.convenioNomina = Object.keys(dataReques.CONVENIO_PAGO.convenioPagoNominaTipo).length;
    dataParser.convenioTerceros = dataReques.CONVENIO_PAGO.convenioPagoTerceros.length;
    dataParser.convenioRecaudo = dataReques.SOLICITUD.tipoConvenio?.convenioRecaudo;
    dataParser.recaudoBarras = dataReques.CONVENIO_RECAUDO.recaudoOficina.length;
    dataParser.recaudoReferencia = dataReques.CONVENIO_RECAUDO.recaudoOficina.length;
    dataParser.recaudoPSE = dataReques.CONVENIO_RECAUDO.recaudoPSE.length;
    dataParser.recaudoPortal = dataReques.CONVENIO_RECAUDO.recaudoPSE.length;
    dataParser.recaudoCorresponsal = dataReques.CONVENIO_RECAUDO.recaudoCorresponsales.length;
    dataParser.recaudoAdquirencia = dataReques.CONVENIO_RECAUDO.adquirencia.length;
    dataParser.serviciosFinancieros = dataReques.SOLICITUD.tipoConvenio?.servicioFinanciero;

    //TOTAL_PROMEDIO_COLOCA
    if (dataReques.KNIME.hasOwnProperty('TOTAL_PROMEDIO_COLOCA')) {
        dataParser.totalCartera = dataReques.KNIME.TOTAL_PROMEDIO_COLOCA;
    } else {
        dataParser.totalCartera = 0;
    };

    dataParser.totalCaptacion = dataReques.KNIME.VALOR_CAPTACION_1; // VALOR_CAPTACION_1
    dataParser.antiguedad = dataReques.RADICACION.antiguedad_ban; // antiguedad_ban

    // TOTAL_MARGEN_CARTERA
    if (dataReques.KNIME.hasOwnProperty('TOTAL_MARGEN_CARTERA')) {
        dataParser.margenCartera = dataReques.KNIME.TOTAL_MARGEN_CARTERA;
    } else {
        dataParser.margenCartera = 0;
    };

    dataParser.margenCaptacion = dataReques.KNIME.MARGEN_CAPTACION; // MARGEN_CAPTACION
    dataParser.margenConvenio = dataReques.KNIME.MARGEN_CONVENIOS; // MARGEN_CONVENIOS
    dataParser.utilidad = dataReques.KNIME.UTILIDAD_ANUAL; // UTILIDAD_ANUAL
    dataParser.reciproAdquirencia = dataReques.KNIME.ADQUI_RECIPRO; // ADQUI_RECIPRO

    dataParser.costoIntMax = dataReques.KNIME.POR_COSTO_INTEGRAL_Max; // POR_COSTO_INTEGRAL_Max
    dataParser.costoInt = dataReques.KNIME.PORC_COSTO_INTEGRAL; // PORC_COSTO_INTEGRAL
    dataParser.rentabilidadMin = dataReques.KNIME.PORC_ROA_MINIMO; // PORC_ROA_MINIMO
    dataParser.rentabilidadReal = dataReques.KNIME.PORC_ROA_EA; // PORC_ROA_EA

    dataParser.enteAtribucion = dataReques.KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].tipo_aprobador;
    dataParser.parametrizacion = dataReques.KNIME.DATOS_PARAMETRIZADOR.CARGO;

    return dataParser;
};