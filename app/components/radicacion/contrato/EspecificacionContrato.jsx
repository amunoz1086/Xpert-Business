'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import TecnicoOperativo from './TecnicoOperativo';
import InformacionCliente from './InformacionCliente';
import { conversionPesos, sumarDiasFechaIncial } from '@/app/lib/utils';
import { Firmas } from './Firmas';

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        margin: "0px 15px 0px 15px",
        alignItems: "center",
        fontSize: 8,
        gap: 25
    },

    section1: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },

    flexSpace2: {
        display: "flex",
        flexDirection: "row",
        gap: 2
    },
    flexSpace4: {
        display: "flex",
        flexDirection: "row",
        gap: 4
    },
    border2rem: {
        textAlign: "center",
        borderColor: "#0000",
        borderBottom: "0.5px",
        width: "20rem"
    },
    section1Titulo: {
        color: "black",
        fontWeight: "bold",
        fontSize: 9,
        textAlign: "center"
    },
    fechasd: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },

    // 1. Información de las partes del Acuerdo Técnico Operativo - Banco
    titleBanc: {
        backgroundColor: "#c00000"
    }

    // informacion Tecnico operador


});

const diaLetras = {
    "1": "uno",
    "2": "dos",
    "3": "tres",
    "4": "cuatro",
    "5": "cinco",
    "6": "seis",
    "7": "siete",
    "8": "ocho",
    "9": "nueve",
    "10": "diez",
    "11": "once",
    "12": "doce",
    "13": "trece",
    "14": "catorce",
    "15": "quince",
    "16": "dieciséis",
    "17": "diecisiete",
    "18": "dieciocho",
    "19": "diecinueve",
    "20": "veinte",
    "21": "veintiuno",
    "22": "veintidós",
    "23": "veintitrés",
    "24": "veinticuatro",
    "25": "veinticinco",
    "26": "veintiséis",
    "27": "veintisiete",
    "28": "veintiocho",
    "29": "veintinueve",
    "30": "treinta",
    "31": "treinta y uno"
}


export default function EspecificacionContrato({ dataContext, listNegociarNomina }) {


    const {
        cliente,
        solicitud,
        convenioPago,
        convenioRecaudo,
        remi,
        servicioFinanciero,
        configuracion,
        tecnioOperador,
        clientModal,
        campoAdicionalesModal,
        clienteFiducia,
        reciprocidadResumen,
    } = dataContext


    const soloConvenioFinanciero = (solicitud?.tipoConvenio?.convenioPago === undefined &&
        solicitud?.tipoConvenio?.convenioRecaudo === undefined) || solicitud?.tipoProducto.credito === '01' && solicitud?.tipoProducto.convenio === undefined
    /**
  * --------------- nueva validacion para mostrar contenido --------
  */

    const { infoTriburaria, infoComercio, tipoVenta, tipoCuenta1 } = configuracion.adquirencia

    const { cuentaRecaudadora1, cuentaRecaudadora2 } = configuracion.convenioPago

    const { tipoRecuado, BaseWebTicket, recuadoManual, cuentaRecaudadoraEan } = configuracion.corresponsales

    const { recaudoFormato, recaudoManuales1, recaudoSiNo, cuentaRecaudodora, modeloPago, recuadoClasePago, recaudoRespaldo } = configuracion.convenioRecaudo

    const validacionesFormulario = {

        'adquirencia': () => {

            const validarAdquirencia = infoTriburaria.filter((e, i) => ((e?.list && e?.list && e?.nResolucion && e?.fechaResolucion) && e.list !== '' && e.list !== 'default' && e.nResolucion !== '' && e.fechaResolucion !== '') || ((e.list !== '' && e.list !== 'default') && i === 0) || ((e.list !== '' && e.list !== 'default') && i === 1))
            const validInfoComercio = (Object.values(infoComercio)).filter(e => e !== '' && e !== undefined)
            const validTipoVenta = (Object.values(tipoVenta).some(e => e === true))
            const validTipoCuenta1 = Array.isArray(tipoCuenta1) ? (tipoCuenta1?.some(e => e.cuenta !== 'default' && e.cuenta !== '' && e.numCuenta !== '' && e.porcentaje !== '')) : false
            const validacionCamposRequeridos = ((validarAdquirencia.length > 0) || ((validInfoComercio.length > 0)) || (validTipoVenta) || validTipoCuenta1)
            return validacionCamposRequeridos
        },

        'convenioRecaudo': () => {

            const convenioRecaudoFormato = (recaudoFormato?.formatoBanCoomeva === true) || (recaudoFormato?.formatoEntidad === true)

            const validarRecaudoManuales = (recaudoManuales1.filter(e => e.nombreCampo !== '' && e.tipoCampo !== '').length > 0)

            const convenioRecaudoSiNo = (recaudoSiNo !== '' && recaudoSiNo !== 'default')

            const cuentaRecaudodaraValidacion = (cuentaRecaudodora.filter(e => e.numeroCuenta !== '' && e.tipoCuenta !== '')).length > 0

            const modeloPagoValiacion = (modeloPago?.idrem || (modeloPago?.completo || modeloPago?.parcial) && modeloPago?.idrem !== 'default' || (modeloPago?.completo === true || modeloPago?.parcial === true))

            const validarClasePago = ((recuadoClasePago?.cheque || recuadoClasePago?.Gerencia || recuadoClasePago?.Efectivo || recuadoClasePago?.Personal) && (recuadoClasePago?.cheque === true || recuadoClasePago?.Gerencia === true || recuadoClasePago?.Efectivo === true || recuadoClasePago?.Personal === true))

            const validarConvenioRespoaldo = ((recaudoRespaldo?.nameGirador || recaudoRespaldo?.telefono || recaudoRespaldo?.numeroDocumentoPago || recaudoRespaldo?.otra) && (recaudoRespaldo?.nameGirador === true || recaudoRespaldo?.telefono === true || recaudoRespaldo?.numeroDocumentoPago === true || recaudoRespaldo?.otra === true))

            const validarRecaudo = (convenioRecaudoFormato || validarRecaudoManuales || convenioRecaudoSiNo || cuentaRecaudodaraValidacion || modeloPagoValiacion || validarClasePago || validarConvenioRespoaldo)

            return validarRecaudo

        },

        'corresponsal': () => {

            const tipoRecaudoCorr = ((tipoRecuado?.manual || tipoRecuado?.codigoBarra) && (tipoRecuado?.manual === true || tipoRecuado?.codigoBarra === true))

            const baseTicket = (((BaseWebTicket?.codListaselect1 && BaseWebTicket?.codListaselect1 !== 'Seleccionar') || (BaseWebTicket?.codListaselect2 && BaseWebTicket?.codListaselect2 !== 'Seleccionar') || (BaseWebTicket?.codListaselect3 && BaseWebTicket?.codListaselect3 !== 'Seleccionar')))


            // const validTipoCuenta = (tipoCuenta.filter(e => e.tipoCuenta !== 'default' && e.tipoCuenta !== '' && e.numCuenta !== '' && e.porcentaje !== '')).length > 0


            const validarRecaudoManuales = (recuadoManual.filter(e => e.nombreCampo !== '' && e.tipoCampo !== '')).length > 0

            const validacionCuentaEan = (cuentaRecaudadoraEan.filter(e => e.nCuenta !== '' && e.ean !== '' && (e.tipoCuentas !== '' && e.tipoCuentas !== 'default'))).length > 0

            const modeloPagoVal = ((configuracion.corresponsales.modeloPago?.idrem && configuracion.corresponsales.modeloPago?.idrem !== 'default') || ((configuracion.corresponsales.modeloPago?.completo && configuracion.corresponsales.modeloPago?.completo === true) || (configuracion.corresponsales.modeloPago?.parcial && configuracion.corresponsales.modeloPago?.parcial === true)))

            const validacionCorresponsal = (tipoRecaudoCorr || baseTicket || validarRecaudoManuales || validacionCuentaEan || modeloPagoVal)

            return validacionCorresponsal

        },
        'convenioPago': () => {



            const cuentaPagadoraNomina = cuentaRecaudadora1?.some(e => (e.numeroCuenta !== '' && e.numeroCuenta !== undefined) && (e.tipoCuenta !== undefined && e.tipoCuenta !== 'default' && e.tipoCuenta !== ''))


            const cuentaPagadoraTerceros = cuentaRecaudadora2?.some(e => (e.numeroCuenta !== '' && e.numeroCuenta !== undefined) && (e.tipoCuenta !== undefined && e.tipoCuenta !== 'default' && e.tipoCuenta !== ''))


            return (cuentaPagadoraNomina || cuentaPagadoraTerceros)
        }
    }

    const activarSeccionConvenioRecaudo = solicitud?.tipoConvenio?.convenioRecaudo !== undefined && solicitud?.tipoConvenio?.convenioRecaudo !== ''
    const activarSeccionConvenioPago = solicitud?.tipoConvenio?.convenioPago !== undefined && solicitud?.tipoConvenio?.convenioPago !== ''


    const validAdqurencia = activarSeccionConvenioRecaudo ? validacionesFormulario.adquirencia() : undefined

    const validRecuado = activarSeccionConvenioRecaudo ? validacionesFormulario.convenioRecaudo() : undefined

    const validCorres = activarSeccionConvenioRecaudo ? validacionesFormulario.corresponsal() : undefined

    const validConvenioPago = activarSeccionConvenioPago ? validacionesFormulario.convenioPago() : undefined



    /**
*  */


    /**
         * VALIDACIONES GENERALES PARA MOSTRAR OCULATA CONTENIDO 
         */

    const filterAdquirencia = (convenioRecaudo.adquirencia.filter(e => (e.tarifaRemi !== '' && e.punosNegociados !== '' && e.tarifaNegociada !== '') && (e?.tarifaRemi && e?.punosNegociados && e?.tarifaNegociada))).length > 0

    // recaudo
    const codigoBarras = convenioRecaudo.recaudoOficina[0]?.cantidad && convenioRecaudo.recaudoOficina[0]?.cantidad !== '' && convenioRecaudo.recaudoOficina[0]?.ticket && convenioRecaudo.recaudoOficina[0]?.ticket !== ''

    const manualReferencia = convenioRecaudo.recaudoOficina[1]?.cantidad && convenioRecaudo.recaudoOficina[1]?.cantidad !== '' && convenioRecaudo.recaudoOficina[1]?.ticket && convenioRecaudo.recaudoOficina[1]?.ticket !== ''

    // const portalPago = (convenioRecaudo.recaudoPSE[0]?.cantidad && convenioRecaudo.recaudoPSE[0]?.cantidad !== '') && (convenioRecaudo.recaudoPSE[0]?.ticket && convenioRecaudo.recaudoPSE[0]?.ticket !== '')

    // const pseRecaudo = (convenioRecaudo.recaudoPSE[1]?.cantidad && convenioRecaudo.recaudoPSE[1]?.cantidad !== '') && (convenioRecaudo.recaudoPSE[1]?.ticket && convenioRecaudo.recaudoPSE[1]?.ticket !== '')

    const pseRecaudo = (convenioRecaudo.recaudoPSE[1]?.cantidad && convenioRecaudo.recaudoPSE[1]?.cantidad !== '' && convenioRecaudo.recaudoPSE[1]?.cantidad > 0)

    const portalPago = (convenioRecaudo.recaudoPSE[0]?.cantidad && convenioRecaudo.recaudoPSE[0]?.cantidad !== '' && convenioRecaudo.recaudoPSE[0]?.cantidad > 0)



    //  corresponsal

    const corresponsal = (convenioRecaudo.recaudoCorresponsales.filter(e => (e.cantidad !== '' && e.ticket_promedio !== '' && e.tarifaNegociada !== '') && (e?.cantidad && e?.ticket_promedio && e?.tarifaNegociada))).length > 0

    // convenio pago

    const { convenioPagoNominaTipo, convenioPagoTerceros, convenioPagoNominaNegociada } = convenioPago




    const pagoTercero = (convenioPagoTerceros.filter(e => (e?.cantidadNueva && e?.tarifaNegociada) && (e?.cantidadNueva !== '' && e?.tarifaNegociada !== ''))).length > 0

    const convenioPagoActive = pagoTercero || Object.values(convenioPagoNominaTipo).length > 0

    const pagoNomina = Object.values(convenioPagoNominaTipo).length > 0

    /**
     * adquirencia
     * VISA
     * MASTER
     * 
     */

    //VISA
    const adquirenciaVisa = (convenioRecaudo.adquirencia[0]?.facturacion && convenioRecaudo.adquirencia[0]?.facturacion !== '') || (convenioRecaudo.adquirencia[0]?.punosNegociados && convenioRecaudo.adquirencia[0]?.punosNegociados !== '') || (convenioRecaudo.adquirencia[0]?.tarifaNegociada && convenioRecaudo.adquirencia[0]?.tarifaNegociada !== '')
    const electron = (convenioRecaudo.adquirencia[0]?.facturacion && convenioRecaudo.adquirencia[0]?.facturacion !== '') || (convenioRecaudo.adquirencia[1]?.punosNegociados && convenioRecaudo.adquirencia[1]?.punosNegociados !== '') || (convenioRecaudo.adquirencia[1]?.tarifaNegociada && convenioRecaudo.adquirencia[1]?.tarifaNegociada !== '')
    const visaCredito = (convenioRecaudo.adquirencia[0]?.facturacion && convenioRecaudo.adquirencia[0]?.facturacion !== '') || (convenioRecaudo.adquirencia[2]?.punosNegociados) && (convenioRecaudo.adquirencia[2]?.punosNegociados && convenioRecaudo.adquirencia[2]?.punosNegociados !== '') || (convenioRecaudo.adquirencia[2]?.tarifaNegociada && convenioRecaudo.adquirencia[2]?.tarifaNegociada !== '')


    const creditoMaster = (convenioRecaudo.adquirencia[3]?.facturacion && convenioRecaudo.adquirencia[3]?.facturacion !== '') || (convenioRecaudo.adquirencia[3]?.punosNegociados && convenioRecaudo.adquirencia[0]?.punosNegociados !== '') || (convenioRecaudo.adquirencia[1]?.tarifaNegociada && convenioRecaudo.adquirencia[3]?.tarifaNegociada !== '')
    const debitoMater = (convenioRecaudo.adquirencia[4]?.facturacion && convenioRecaudo.adquirencia[4]?.facturacion !== '') || (convenioRecaudo.adquirencia[4]?.punosNegociados && convenioRecaudo.adquirencia[1]?.punosNegociados !== '') || (convenioRecaudo.adquirencia[4]?.tarifaNegociada && convenioRecaudo.adquirencia[4]?.tarifaNegociada !== '')
    const debitoMaestro = (convenioRecaudo.adquirencia[5]?.facturacion && convenioRecaudo.adquirencia[5]?.facturacion !== '') || (convenioRecaudo.adquirencia[5]?.punosNegociados) && (convenioRecaudo.adquirencia[2]?.punosNegociados && convenioRecaudo.adquirencia[5]?.punosNegociados !== '') || (convenioRecaudo.adquirencia[5]?.tarifaNegociada && convenioRecaudo.adquirencia[2]?.tarifaNegociada !== '')

    // const creditoMaster = convenioRecaudo.adquirencia[3]?.punosNegociados !== '' || convenioRecaudo.adquirencia[3]?.tarifaNegociada !== ''
    // const debitoMater = convenioRecaudo.adquirencia[4]?.punosNegociados !== '' || convenioRecaudo.adquirencia[4]?.tarifaNegociada !== ''
    // const debitoMaestro = convenioRecaudo.adquirencia[5]?.punosNegociados !== '' || convenioRecaudo.adquirencia[5]?.tarifaNegociada !== ''

    const tarifaNegociadaCreditoVisa = convenioRecaudo.adquirencia[0]?.tarifaNegociada
    const tarifaNegociadaVisa = convenioRecaudo.adquirencia[1]?.tarifaNegociada
    const tarifaNegociadaElectron = convenioRecaudo.adquirencia[2]?.tarifaNegociada


    //MASTER

    // tarigaNegociada
    const tarifaNegociadaCreditoMaster = convenioRecaudo.adquirencia[3]?.tarifaNegociada
    const tarifaNegociadaDebitoMaster = convenioRecaudo.adquirencia[4]?.tarifaNegociada
    const tarifaNegociadaDebitoMaestro = convenioRecaudo.adquirencia[5]?.tarifaNegociada

    // SUMAS ADQUIRENCIA COLUMNA FACTURACION 

    const sumaDebitoMaster = (convenioRecaudo.adquirencia[1]?.facturacion) || (convenioRecaudo.adquirencia[3]?.facturacion) ? conversionPesos({ valor: (parseInt(convenioRecaudo.adquirencia[1]?.facturacion !== '' ? convenioRecaudo.adquirencia[1]?.facturacion : 0) + parseInt(convenioRecaudo.adquirencia[3]?.facturacion !== '' ? convenioRecaudo.adquirencia[3]?.facturacion : 0)) }) : ''

    const sumaVisaMaster = (convenioRecaudo.adquirencia[0]?.facturacion) || (convenioRecaudo.adquirencia[4]?.facturacion) ? conversionPesos({ valor: (parseInt(convenioRecaudo.adquirencia[0]?.facturacion !== '' ? convenioRecaudo.adquirencia[0]?.facturacion : 0) + parseInt(convenioRecaudo.adquirencia[4]?.facturacion !== '' ? convenioRecaudo.adquirencia[4]?.facturacion : 0)) }) : ''



    //CONVENIO PAGO

    // nomina


    /*
    
    
    
    */
    const dataTercerosCantidadDB = convenioPagoNominaNegociada.length > 0 ? convenioPagoNominaNegociada : (JSON.parse(listNegociarNomina))?.DATA

    const dataTerceroCantidad = dataTercerosCantidadDB?.map((nomina) => {

        const valorCantidad = (nomina.permitirNegociar == 1) ? 'Ilimitado' : nomina.cantidad == 0 ? '' : nomina.cantidad

        return {
            id: nomina.idnegociarNomina,
            cantidad: valorCantidad,
            tarifaNegociada: nomina?.tarifaNegociada
        }

    })

    const retCajeroVerdeCant = (dataTerceroCantidad?.find((nomina) => (nomina.id === 1097)))?.cantidad
    const NoTxCant = (dataTerceroCantidad?.find((nomina) => (nomina.id === 1102)))?.cantidad
    const NoTxTarifa = (dataTerceroCantidad?.find((nomina) => (nomina.id === 1102)))?.tarifaNegociada
    const redPropiaCant = (dataTerceroCantidad?.find((nomina) => (nomina.id === 1096)))?.cantidad
    const EfectyCant = (dataTerceroCantidad?.find((nomina) => (nomina.id === 1099)))?.cantidad
    const saquePagueCant = (dataTerceroCantidad?.find((nomina) => (nomina.id === 1098)))?.cantidad

    const cuotaChip = convenioPagoNominaNegociada?.find(e => e.idnegociarNomina === 1103)?.tarifaNegociada
    const NoTx = (convenioPagoNominaNegociada?.find((nomina) => (nomina.idnegociarNomina === 1102)))?.cantidad
    const retCajeroVerde = (convenioPagoNominaNegociada?.find((nomina) => (nomina.idnegociarNomina === 1097)))?.cantidad
    const retOficina = (convenioPagoNominaNegociada?.find((nomina) => (nomina.idnegociarNomina === 1100)))?.cantidad
    const redPropia = (convenioPagoNominaNegociada?.find((nomina) => (nomina.idnegociarNomina === 1096)))?.cantidad
    const NoTxPago = convenioPagoNominaNegociada[6] ? convenioPagoNominaNegociada[6] : ''
    // frecuencia pago verificar los id de la lista semanal,quincenal,mensual

    const fPago = convenioPagoNominaTipo?.frecuenciaPago
    const frecuenciaPago = fPago === '119' ? 'Mensual' : fPago === '118' ? 'Quincenal' : fPago === '117' ? 'Semanal' : ''


    // Proveedores

    //472
    //473


    const pagoTerceros = convenioPagoTerceros[0]
    const pagoACHTerceros = convenioPagoTerceros[1]
    const pagoSebraTerceros = convenioPagoTerceros[2]

    // Uso Exclusivo Bancoomeva para Convenios de Pago Proveedores

    const cuentaPagadoraPagoNomina = configuracion.convenioPago?.cuentaRecaudadora1[0]




    const ServicioFinancieroOficinaVirtual = servicioFinanciero?.solicitud[0]


    const reciprocidadPactada = (reciprocidadResumen?.ahorro.monto1 && reciprocidadResumen?.ahorro.monto1 !== '') || (reciprocidadResumen?.corriente.monto0 && reciprocidadResumen?.corriente?.monto0 !== '')
        ? conversionPesos({ valor: (((reciprocidadResumen?.ahorro.monto1 && reciprocidadResumen?.ahorro.monto1 !== '') ? parseInt(reciprocidadResumen?.ahorro.monto1) : 0) + ((reciprocidadResumen?.corriente?.monto0 && reciprocidadResumen?.corriente?.monto0 !== '') ? parseInt(reciprocidadResumen?.corriente.monto0) : 0)) })
        : ''

    const efecty = convenioRecaudo?.recaudoCorresponsales?.find(e => e.idcorresponsales === 7)
    const superGiro = convenioRecaudo?.recaudoCorresponsales?.find(e => e.idcorresponsales === 8)
    const saquePague = convenioRecaudo?.recaudoCorresponsales?.find(e => e.idcorresponsales === 9)

    /**Validar item a mostrar */

    const corresponsalEfecty = (convenioRecaudo?.recaudoCorresponsales[0]?.cantidad !== '' && convenioRecaudo?.recaudoCorresponsales[0]?.ticket_promedio !== '' && convenioRecaudo.recaudoCorresponsales[0]?.tarifaCosto !== '') && (convenioRecaudo.recaudoCorresponsales[0]?.cantidad !== '' && convenioRecaudo.recaudoCorresponsales[0]?.ticket_promedio !== '' && convenioRecaudo.recaudoCorresponsales[0]?.tarifaCosto !== '' && convenioRecaudo.recaudoCorresponsales[0]?.cantidad)

    const formatoRecaudo = configuracion.convenioRecaudo?.recaudoFormato

    const formatoBancoomeva = (formatoRecaudo?.formatoBanCoomeva && formatoRecaudo?.formatoBanCoomeva !== false) ? 'X' : ''
    const formatoEntidad = (formatoRecaudo?.formatoEntidad && formatoRecaudo?.formatoEntidad !== false) ? 'X' : ''

    // Uso Exclusivo Bancoomeva para Convenios de Recaudo

    const convenioRecaudoOficinaCodBarra = convenioRecaudo?.recaudoOficina?.find(e => e.idrecaudoOficina === 1)


    const convenioRecaudoOficinaManual = convenioRecaudo?.recaudoOficina?.find(e => e.idrecaudoOficina === 2)

    //TODO: POSIBLE BUSCAR POR ID SE EL ORDEN NO ES EL MISMO 
    const servifinancieroConvenio = servicioFinanciero?.solicitud


    const ofinaVirtualPjServicioFinanciero = servifinancieroConvenio?.find(e => e.idFinanciero === 1)
    const chequera30ServicioFinanciero = servifinancieroConvenio?.find(e => e.idFinanciero === 2)
    const chequera100ServicioFinanciero = servifinancieroConvenio?.find(e => e.idFinanciero === 3)
    const chequeGerenciaServicioFinanciero = servifinancieroConvenio?.find(e => e.idFinanciero === 4)
    const chequeraFormaContinuaServicioFinanciero = servifinancieroConvenio?.find(e => e.idFinanciero === 5)
    const tarjetaCreditoServicioFinanciero = servifinancieroConvenio?.find(e => e.idFinanciero === 6)
    const girorServicioFinanciero = servifinancieroConvenio?.find(e => e.idFinanciero === 7)


    const convenioRecaudoPse = convenioRecaudo?.recaudoPSE[1]
    const convenioPortalPagosPse = convenioRecaudo?.recaudoPSE[0]

    const valoresCodigoUnico = Object.keys(configuracion.adquirencia.infoComercio)
        .filter(key => key.startsWith("codigoUnico") && configuracion.adquirencia.infoComercio[key] !== '') // Filtrar claves que comienzan con "codigoUnico" y no están vacías
        .sort((a, b) => {
            const numA = parseInt(a.replace("codigoUnico", ""), 10) || 0;
            const numB = parseInt(b.replace("codigoUnico", ""), 10) || 0;
            return numA - numB;
        })
        .map(key => configuracion.adquirencia.infoComercio[key]);



    const fecha = new Date().toLocaleDateString()

    const fechaDuracion = sumarDiasFechaIncial(fecha, 365)

    const dia = fecha.split('/')[0]
    const mes = fecha.split('/')[1]
    const yyy = fecha.split('/')[2]


    return (
        <Document>
            <Page wrap size={'LETTER'} style={{ padding: "0 13px" }}>
                <View style={{ width: "100%", margin: "0 auto" }}>
                    <View style={styles.header}>
                        <View style={styles.section1}>
                            <View style={styles.flexSpace2}>
                                <Text>Nuevo</Text>
                                <Text style={styles.border2rem}>{solicitud.tipoOperacion?.nuevo ? "x" : null}</Text>
                            </View>
                            <View style={styles.flexSpace2}>
                                <Text>Renovación</Text>
                                <Text style={styles.border2rem}>{solicitud.tipoOperacion?.renovacion ? "x" : null}</Text>
                            </View>
                        </View>
                        <Text style={styles.section1Titulo}>ESPECIFICACIONES TÉCNICAS Y OPERATIVAS DE CONVENIOS</Text>
                        <View style={styles.fechasd}>
                            <View className=''>
                                <View style={styles.flexSpace4}>
                                    <Text>Fecha</Text>
                                    <Text>{fecha}</Text>
                                </View>
                                <View style={styles.flexSpace4}>
                                    <Text>Regional</Text>
                                    <Text>{cliente?.nombreRegional || ''}</Text>
                                </View>

                                <View style={styles.flexSpace4}>
                                    <Text>Oficina</Text>
                                    <Text>{cliente?.oficina || ''}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 1. Información de las partes del Acuerdo Técnico Operativo - Banco */}
                <TecnicoOperativo View={View} Text={Text} data={tecnioOperador} />

                {/* Informacion cliente */}

                <InformacionCliente View={View} Text={Text} data={cliente} fechaDuracion={fechaDuracion} clienteModal={clientModal} clienteFiducia={clienteFiducia} fecha={fecha} />

                {/* convenio a negociar */}
                <View style={{ fontWeight: "normal" }}>
                    <Text style={{ color: "white", textAlign: "center", backgroundColor: "#FF6B19", marginTop: "3px", fontSize: 8, padding: "4px 0px" }} >3. INFORMACIÓN DE PRODUCTOS Y SERVICIOS</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8, fontSize: 7, marginTop: "4px" }}>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 6 }}>
                            <Text style={{ borderBottom: "0.5px", width: "10px", textAlign: "center" }}>{convenioRecaudo.adquirencia.length > 0 ? "X" : null}</Text>
                            <Text>Adquirencia</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 6 }}>
                            <Text style={{ borderBottom: "0.5px", width: "10px", textAlign: "center" }}>{convenioRecaudo.recaudoCorresponsales.length > 0 ? "X" : null}</Text>
                            <Text>Corresponsales Bancarios</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 6 }}>
                            <Text style={{ borderBottom: "0.5px", width: "10px", textAlign: "center" }}>{(Object.values(convenioPago.convenioPagoNominaTipo).length > 1) ? "X" : null}</Text>
                            <Text>Convenio de Pago Nómina</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 6 }}>
                            <Text style={{ borderBottom: "0.5px", width: "10px", textAlign: "center" }}>{convenioRecaudo.recaudoOficina.length > 0 ? "X" : null}</Text>
                            <Text>Convenio de Recaudo</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 6 }}>
                            <Text style={{ borderBottom: "0.5px", width: "10px", textAlign: "center" }}>{convenioRecaudo.recaudoPSE.length > 0 ? "X" : null}</Text>
                            <Text>PSE</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 6 }}>
                            <Text style={{ borderBottom: "0.5px", width: "10px", textAlign: "center" }}>{convenioPago.convenioPagoTerceros.length > 0 ? "X" : null}</Text>
                            <Text>Convenios de Pago Proveedores</Text>
                        </View>
                    </View>
                </View>

                {/* solo servicio financiero y credito */}
                {
                    soloConvenioFinanciero ?
                        <View style={{ fontSize: 8 }}>
                            <Text style={{ color: "white", margin: "3px 0px", backgroundColor: "#FF6B19", textAlign: "center", padding: "3px 0px" }} >Uso Exclusivo Bancoomeva para Convenios de Recaudo</Text>
                            {/* <h1 className='text-center bg-orange-600 text-white m-3'>Uso Exclusivo Bancoomeva para Convenios de Recaudo</h1> */}
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", border: "0.5", padding: "4px 8px" }} >
                                <View >
                                    <View style={{ display: "flex", flexDirection: "row", gap: 20, marginTop: "3px" }} >
                                        <Text>Recaudo Manual en Oficina</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10, marginLeft: "25px" }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{convenioRecaudoOficinaManual?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioRecaudoOficinaManual?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudoOficinaManual?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>



                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>PSE Recaudo</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{convenioRecaudoPse?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioRecaudoPse?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudoPse?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>PSE Compras</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}></Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Recaudos con código de barras</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{convenioRecaudoOficinaCodBarra?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioRecaudoOficinaCodBarra?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudoOficinaCodBarra?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Consignación Nacional</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}></Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Corresponsales</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}></Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Extensión de red</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}></Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Tarifa Negociada Oficina Virtual PJ</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ofinaVirtualPjServicioFinanciero?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{ofinaVirtualPjServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: ofinaVirtualPjServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    {/* adicional ajustes */}
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Portal de Pagos</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{convenioPortalPagosPse?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioPortalPagosPse?.tarifaNegociada ? conversionPesos({ valor: convenioPortalPagosPse?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Efecty</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{efecty?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{efecty?.tarifaNegociada ? conversionPesos({ valor: efecty?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Supergiros</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{superGiro?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{superGiro?.tarifaNegociada ? conversionPesos({ valor: superGiro?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Saque y Pague</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{saquePague?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{saquePague?.tarifaNegociada ? conversionPesos({ valor: saquePague?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Cheques de Gerencia</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{chequeGerenciaServicioFinanciero?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{chequeGerenciaServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: chequeGerenciaServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Cheques en Formas Continuas</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{chequeraFormaContinuaServicioFinanciero?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{chequeraFormaContinuaServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: chequeraFormaContinuaServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Cuenta Cte. 30 Cheques</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{chequera30ServicioFinanciero?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{chequera30ServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: chequera30ServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Cuenta Cte. 100 Cheques</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{chequera100ServicioFinanciero?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{chequera100ServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: chequera100ServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                        <Text>Giros</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{girorServicioFinanciero?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{girorServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: girorServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "75px" }} >
                                        <Text>Reciprocidad Pactada</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{reciprocidadPactada}</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View > : undefined
                }


                {/* adquirencia */}

                {
                    // filterAdquirencia
                    validAdqurencia
                        ?
                        <View style={{ fontSize: 8 }}>
                            <Text style={{ textAlign: "center", backgroundColor: "red", color: "white", marginTop: "8px", padding: "3px 0px" }} >ADQUIRENCIA</Text>
                            {/* className='flex justify-evenly text-sm w-[100%]' */}
                            <View style={{ display: "flex", flexDirection: "row" }} >
                                <View style={{ width: "50%" }}>
                                    <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Información Franquicia VISA</Text>
                                    <View style={{ margin: "4px 0px 4px 8px" }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 30, marginBottom: "4px" }}>
                                            <Text>Franquicia</Text>
                                            <View style={{ display: "flex", flexDirection: "row" }} >
                                                <Text style={{ borderBottom: "0.5px", width: "24px", textAlign: "center" }}>{`${adquirenciaVisa || visaCredito || electron ? 'X' : ''}`}</Text>
                                                <Text>VISA</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 34, marginBottom: "6px" }}>
                                            <Text>Producto</Text>
                                            <View style={{ display: "flex", flexDirection: "row" }}>

                                                <Text style={{ borderBottom: "0.5px", width: "24px", textAlign: "center" }}>{`${visaCredito ? 'X' : ''}`}</Text>
                                                <Text>Crédito</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "24px", textAlign: "center" }}>{`${adquirenciaVisa ? 'X' : ''}`}</Text>
                                                <Text>Débito</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "24px", textAlign: "center" }}>{`${electron ? 'X' : ''}`}</Text>
                                                <Text>Electrón</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                            <Text>Tarifa Negociada</Text>
                                            {/* conversionPesos({valor:cuenta?.porcentaje,style:'percent'}) */}
                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{tarifaNegociadaCreditoVisa ? conversionPesos({ valor: tarifaNegociadaCreditoVisa, style: "percent", nDecimales: 2 }) : ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{tarifaNegociadaVisa ? conversionPesos({ valor: tarifaNegociadaVisa, style: "percent", nDecimales: 2 }) : ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{tarifaNegociadaVisa ? conversionPesos({ valor: tarifaNegociadaElectron, style: "percent", nDecimales: 2 }) : ''}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: "50%", borderLeft: "0.5px" }}>
                                    <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Información Franquicia MASTER</Text>
                                    <View style={{ margin: "4px 0px 4px 8px" }}>



                                        <View style={{ display: "flex", flexDirection: "row", gap: 22, marginBottom: "8px" }}>
                                            <Text>Franquicia</Text>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "24px", textAlign: "center" }}>{`${creditoMaster || debitoMater || debitoMaestro ? 'x' : ''}`}</Text>
                                                <Text>Master</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 26, marginBottom: "4px" }}>
                                            <Text>Producto</Text>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "24px", textAlign: "center" }}>{`${creditoMaster ? 'X' : ''}`}</Text>
                                                <Text>Crédito</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "24px", textAlign: "center" }}>{`${debitoMater ? 'X' : ''}`}</Text>
                                                <Text>Débito</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "24px", textAlign: "center" }}>{`${debitoMaestro ? 'X' : ''}`}</Text>
                                                <Text>Débito Maestro</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 8, marginBottom: "4px" }} >
                                            <Text>Tarifa Negociada</Text>

                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{tarifaNegociadaCreditoMaster ? conversionPesos({ valor: tarifaNegociadaCreditoMaster, style: "percent", nDecimales: 2 }) : ''}</Text>

                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{tarifaNegociadaDebitoMaster ? conversionPesos({ valor: tarifaNegociadaDebitoMaster, style: "percent", nDecimales: 2 }) : ''}</Text>

                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{tarifaNegociadaDebitoMaestro ? conversionPesos({ valor: tarifaNegociadaDebitoMaestro, style: "percent", nDecimales: 2 }) : ''}</Text>


                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/*  className='flex justify-evenly text-sm w-[100%] */}
                            <View style={{ display: "flex", flexDirection: "row", width: '100%' }}>
                                <View style={{ width: "50%" }}>
                                    <Text style={{ textAlign: "center", color: "white", backgroundColor: "#FF6B19", padding: "3px 0px" }} >Información Tributaria de la Empresa</Text>
                                    <View style={{ margin: "10px 8px 10px 8px" }} >
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 8 }} >
                                            {/*  className='flex space-x-[8rem] mb-1' */}
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ width: "50%" }}>{''}</Text>
                                                {/* <Text style={{ marginLeft: "20px", borderBottom: "0.5px", width: "40px", textAlign: "center" }}></Text> */}
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
                                                <Text style={{ fontSize: 6 }}>No. de Resolución</Text>
                                                <Text style={{ fontSize: 6 }}>Fecha de Resolución</Text>
                                            </View>


                                        </View>
                                        {/* className='flex space-x-[11.5rem] mb-1' */}
                                        {
                                            configuracion.adquirencia.infoTriburaria.map((info, i) => (
                                                <View key={`$infotributaria${i}`} style={{ marginTop: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", gap: 6 }} >
                                                    <View style={{ width: "50%" }} >
                                                        <Text>{info.infoTributaria}</Text>

                                                    </View>
                                                    <Text style={{ borderBottom: "0.5px", width: "20%", textAlign: "center" }}>{
                                                        info.id == '102' ? info.list === '1' ? 'Simple' : info.list === '2' ? 'Especial' : '' :
                                                            info.list === '1' ? 'si' : info.list === '0' ? 'no' : ''
                                                    }</Text>
                                                    <Text style={{ borderBottom: "0.5px", width: "25%", textAlign: "center" }}>{info.nResolucion}</Text>
                                                    <Text style={{ borderBottom: "0.5px", width: "15%", textAlign: "center" }}>{info.fechaResolucion}</Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                </View>
                                <View style={{ width: "50%", borderLeft: "0.5px" }}>
                                    <Text style={{ color: "white", textAlign: "center", backgroundColor: "#FF6B19", padding: "3px 0px" }}>Información del Comercio</Text>
                                    <View style={{ margin: "6px 10px 6px 10px" }} >
                                        <View style={{ marginTop: "10px", display: "flex", flexDirection: "row", gap: 6, marginBottom: "8px" }}>

                                            <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                                <Text>Horario de Servicio:</Text>
                                                <Text style={{ marginLeft: "10px", borderBottom: "0.5px", width: "80px", textAlign: "center" }} >{
                                                    configuracion.adquirencia.infoComercio['codLista.horario'] == 1 ? 'Diurno' : configuracion.adquirencia.infoComercio['codLista.horario'] == 2 ? 'Nocturno' :
                                                        configuracion.adquirencia.infoComercio['codLista.horario'] == 3 ? 'Mixto' : ''
                                                }</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                                <Text>VNP</Text>
                                                <Text style={{ marginLeft: "10px", borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{configuracion.adquirencia.infoComercio['codLista.vnp'] == 0 ? 'No' : configuracion.adquirencia.infoComercio['codLista.vnp'] == 1 ? 'Si' : ''}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                                <Text>VP</Text>
                                                <Text style={{ marginLeft: "10px", borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{configuracion.adquirencia.infoComercio['codLista.vp'] == 0 ? 'No' : configuracion.adquirencia.infoComercio['codLista.vp'] == 1 ? 'Si' : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: "20px", display: "flex", flexDirection: "row", gap: 16, marginBottom: "8px" }} >
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                                <Text>Código MCC:</Text>
                                                <Text style={{ marginLeft: "10px", borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{remi[0]}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                                <Text>Link de Pagos</Text>
                                                <Text style={{ marginLeft: "10px", borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{configuracion.adquirencia.infoComercio['codLista.linkPago'] === 0 ? 'Credibanco' : 'Redeban'}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                                <Text>Comercio Pignorado</Text>
                                                <Text style={{ marginLeft: "10px", borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{configuracion.adquirencia.infoComercio['codLista.comercioPignorado'] == 0 ? 'No' : configuracion.adquirencia.infoComercio['codLista.comercioPignorado'] == 1 ? 'Si' : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 20, display: "flex", flexDirection: "row", marginBottom: 4, width: '100%' }}>

                                            {/* Contenedor de Novedad de Cuenta */}
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                                <Text>Novedad de cuenta</Text>
                                                <Text style={{
                                                    marginLeft: 10,
                                                    borderBottomWidth: 0.5,
                                                    borderBottomColor: "black",
                                                    width: 40,
                                                    textAlign: "center",
                                                    alignSelf: "flex-start" // asegura que el borde esté alineado individualmente 
                                                }}>
                                                    {configuracion.adquirencia.infoComercio['codLista.novedadCuenta'] == 0 ? 'No' : configuracion.adquirencia.infoComercio['codLista.novedadCuenta'] == 1 ? 'Si' : ''}
                                                </Text>
                                            </View>

                                            {/* Contenedor de Vinculación */}
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                                <Text>Vinculación</Text>
                                                <Text style={{
                                                    marginLeft: 10,
                                                    borderBottomWidth: 0.5,
                                                    borderBottomColor: "black",
                                                    width: 40,
                                                    textAlign: "center",
                                                    alignSelf: "flex-end" // asegura que el borde esté alineado individualmente 
                                                }}>
                                                    {configuracion.adquirencia.infoComercio['codLista.vinculacion'] == 0 ? 'No' : configuracion.adquirencia.infoComercio['codLista.vinculacion'] == 1 ? 'Si' : ''}
                                                </Text>
                                            </View>

                                            {/* Contenedor de Código Único */}

                                        </View>

                                        <View style={{ width: '100%' }}>
                                            <Text>Código Único</Text>
                                            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 8, width: '100%' }}>
                                                {valoresCodigoUnico?.map((item, index) => (
                                                    <Text
                                                        key={index}
                                                        style={{
                                                            marginLeft: 10,
                                                            borderBottomWidth: 0.5,
                                                            borderBottomColor: "black",
                                                            width: 40,
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {item}
                                                    </Text>
                                                ))}
                                            </View>

                                        </View>


                                    </View>
                                </View>
                            </View>

                            {/* registro de cuentas */}
                            <View>
                                <Text style={{ textAlign: "center", color: "white", backgroundColor: "#FF6B19", padding: "3px 0px" }}>Registro de Cuentas Corrientes o de Fiduciaria para Abonos de Ventas con Tarjetas </Text>
                                <View style={{ margin: "0px 8px 0px 8px", }}>

                                    {
                                        configuracion.adquirencia?.tipoCuenta1?.map((cuenta, i) => {

                                            let filaValida = (cuenta.cuenta === '1' || cuenta.cuenta === '2') && (cuenta?.numCuenta && cuenta?.numCuenta !== '') && (cuenta?.porcentaje && cuenta?.porcentaje != '')

                                            if (!filaValida) {
                                                return null;
                                            }


                                            return (
                                                <View key={`adquirencia${i}`} style={{ marginTop: "4px", display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                                    <View style={{ display: "flex", flexDirection: "row", gap: 80 }} >
                                                        <Text>Tipo de Cuenta:</Text>
                                                        <View style={{ display: "flex", flexDirection: "col", justifyContent: "space-between" }}>
                                                            <Text>{cuenta.cuenta === '1' ? "Ahorro" : cuenta.cuenta === '2' ? 'Corriente' : ''}</Text>
                                                            <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}></Text>

                                                        </View>
                                                    </View>
                                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text>Numero de la Cuenta :</Text>
                                                        <View style={{ display: "flex", flexDirection: "col", justifyContent: "space-between" }}>
                                                            <Text>{cuenta?.numCuenta}</Text>
                                                            <p style={{ borderBottom: "0.5px", width: "75px", textAlign: "center" }}></p>

                                                        </View>

                                                    </View>
                                                    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                                        <Text>Porcentaje :</Text>
                                                        <View style={{ display: "flex", flexDirection: "col", justifyContent: "space-between" }}>
                                                            <Text style={{ width: "75px" }}>{cuenta?.porcentaje ? conversionPesos({ valor: cuenta?.porcentaje, style: 'percent' }) : ''}</Text>
                                                            <p style={{ borderBottom: "0.5px", width: "75px", textAlign: "center" }}></p>

                                                        </View>

                                                    </View>
                                                    <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                                        <Text>Código Oficina</Text>
                                                        <View style={{ display: "flex", flexDirection: "col", justifyContent: "space-between" }}>
                                                            <Text>{cliente?.oficina || ''}</Text>
                                                            <p style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}></p>

                                                        </View>

                                                    </View>
                                                </View>

                                            )
                                        }
                                        )
                                    }

                                </View>
                            </View>


                            {/* informacion ventas */}
                            <View>
                                <Text style={{ textAlign: "center", color: "white", backgroundColor: "#FF6B19", padding: "3px 0px" }}>Información Ventas</Text>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "6px 8px 6px 8px" }}>
                                    <Text >Tipo de Ventas:</Text>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.adquirencia.tipoVenta?.visa ? 'X' : ''}`}</Text>
                                        <Text >Visa</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.adquirencia.manual?.manual ? 'X' : ''}`}</Text>
                                        <Text >Manual</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.adquirencia.tipoVenta?.servPublico ? 'X' : ''}`}</Text>
                                        <Text >Servicios Públicos</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.adquirencia.tipoVenta?.masterCard ? 'X' : ''}`}</Text>
                                        <Text >Master Card</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.adquirencia.tipoVenta?.aerolines ? 'X' : ''}`}</Text>
                                        <Text >Aerolíneas</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.adquirencia.tipoVenta?.pagoAutomatico ? 'X' : ''}`}</Text>
                                        <Text >Pago Automático</Text>
                                    </View>

                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "6px 8px 6px 8px" }}>
                                    <Text >Facturación Mensual</Text>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 6 }} >
                                        <Text >Tarjeta Débito</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{sumaDebitoMaster}</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 6 }} >

                                        <Text >Tarjeta Crédito</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{sumaVisaMaster}</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 6 }} >

                                        <Text >Tarjeta Electrón</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioRecaudo.adquirencia[2]?.facturacion ? conversionPesos({ valor: convenioRecaudo.adquirencia[2]?.facturacion }) : ''}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Uso Exclusivo Bancoomeva para Adquirencia */}
                            <View>
                                <Text style={{ textAlign: "center", color: "white", backgroundColor: "#FF6B19", padding: "3px 0px" }}>Uso Exclusivo Bancoomeva para Adquirencia</Text>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "0px 8px", gap: 20 }}>
                                    <View style={{ width: "50%" }}>
                                        <View style={{ marginTop: "6px", display: "flex", flexDirection: "row", gap: 20 }} >
                                            <Text>Tarifa Negociada Oficina Virtual PJ</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ServicioFinancieroOficinaVirtual?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ServicioFinancieroOficinaVirtual?.tarifaNegociada ? conversionPesos({ valor: ServicioFinancieroOficinaVirtual?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                        <View style={{ marginTop: "6px", display: "flex", flexDirection: "row", gap: 20 }}>
                                            <Text>Nombre del Gerente</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}></Text>

                                        </View>
                                    </View>
                                    <View style={{ width: "50%" }}>
                                        <View style={{ marginTop: "6px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text>Reciprocidad Pactada</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "150px", textAlign: "center" }}>{reciprocidadPactada || ''}</Text>
                                        </View>
                                        <View style={{ marginTop: "6px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text>Cédula del Gerente</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "210px", textAlign: "center" }}></Text>
                                        </View>
                                    </View>
                                </View>
                            </View>


                        </View>
                        :
                        null
                }

                {/* convenio Recaudo */}
                {
                    // codigoBarras || manualReferencia

                    validRecuado

                        ?
                        <View style={{ fontSize: 8 }}>
                            <Text style={{ backgroundColor: "red", color: "white", textAlign: "center", marginTop: "8px", padding: "3px 0px" }}>CONVENIO DE RECAUDO</Text>

                            <Text style={{ margin: "2px 8px" }}>
                                El Banco y la Empresa hemos celebrado el presente Acuerdo Técnico Operativo (en adelante ACUERDO)   con el objetivo de reglamentar la prestación del servicio bancario de recaudo
                            </Text>

                            {/* informacion general */}
                            <View style={{ fontSize: 8 }}>
                                <Text style={{ color: "white", margin: "3px 0px", backgroundColor: "#FF6B19", textAlign: "center", padding: "1px 0px" }} >Información General</Text>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%", borderRight: "0.5px" }} >
                                        <Text>Tipo de Recaudo:</Text>
                                        <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                                            <View style={{ display: "flex", flexDirection: "row" }} >
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{pseRecaudo ? 'x' : ''}</Text>
                                                <Text >Botón PSE</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}></Text>
                                                <View>
                                                    <Text >Bloqueo cuenta</Text>
                                                    <Text>recaudadora</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{codigoBarras ? 'x' : ''}</Text>
                                                <Text >Código de Barras</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{portalPago ? 'x' : ''}</Text>
                                                <Text >Portal de Pagos PSE </Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{manualReferencia ? 'x' : ''}</Text>
                                                <Text >Manual</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                {/* <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center",color:"white" }}></Text> */}
                                                <Text style={{ color: "white" }}>Manual</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                                            <Text >Formato a utilizar para el recaudo:</Text>

                                            <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{formatoBancoomeva}</Text>
                                                <View>
                                                    <Text >Formato </Text>
                                                    <Text >Bancoomeva</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{formatoEntidad}</Text>
                                                <View>
                                                    <Text >Formato de</Text>
                                                    <Text > la Entidad</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 24, marginTop: "10px" }}>
                                            <Text >¿Requiere asobancaria por ftp?</Text>

                                            <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{campoAdicionalesModal?.ftp === '1' ? 'X' : ''}</Text>
                                                <Text >SI</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{campoAdicionalesModal?.ftp === '0' ? 'X' : ''}</Text>
                                                <Text >NO</Text>
                                            </View>
                                        </View>


                                    </View>

                                </View>
                                {/* ...... */}
                                <View style={{ border: "0.5px", padding: "8px 0px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: "8px" }} >
                                    <View style={{ width: "50%", marginLeft: "8px" }} >

                                        <Text>Campos a capturar:</Text>
                                        <Text>*Uso exclusivo para recaudos manuales</Text>
                                    </View>
                                    <View style={{ width: "50%" }}>
                                        <View style={{ display: "flex", flexDirection: "row" }} >
                                            <Text style={{ textAlign: "center", marginRight: "5px", color: "white" }}>Campo 1</Text>
                                            <Text style={{ border: "0.5px", width: "35%", textAlign: "center" }}>Nombre del Campo</Text>
                                            <Text style={{ border: "0.5px", width: "35%", textAlign: "center" }}>Tipo de Campo</Text>
                                        </View>
                                        {/* {
                                            configuracion.convenioRecaudo.recaudoManuales1.map((recaudo, i) => (
                                                <View key={`recuadomanual1${i}`} style={{ display: "flex", flexDirection: "row" }}>
                                                    <Text style={{ textAlign: "center", marginRight: "5px" }}>{`Campo ${i + 1}`}</Text>
                                                    <Text style={{ border: "0.5px", width: "35%", textAlign: "center" }}>{recaudo.nombreCampo}</Text>
                                                    <Text style={{ border: "0.5px", width: "35%", textAlign: "center" }}>{recaudo.tipoCampo}</Text>
                                                </View>
                                            ))
                                        } */}

                                        {

                                            configuracion.convenioRecaudo.recaudoManuales1.map((recaudo, i) => {

                                                let filaValida = (recaudo?.nombreCampo && recaudo?.nombreCampo !== '') && (recaudo?.tipoCampo && recaudo?.tipoCampo != '')

                                                if (!filaValida) {
                                                    return null;
                                                }


                                                return (
                                                    <View key={`recuadomanual1d${i}`} style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ textAlign: "center", marginRight: "5px" }}>{`Campo ${i + 1}`}</Text>
                                                        <Text style={{ border: "0.5px", width: "35%", textAlign: "center" }}>{recaudo.nombreCampo}</Text>
                                                        <Text style={{ border: "0.5px", width: "35%", textAlign: "center" }}>{recaudo.tipoCampo}</Text>
                                                    </View>

                                                )
                                            }
                                            )

                                        }

                                    </View>
                                </View>

                                <View style={{ margin: "0px 8px", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "15px", gap: 6 }} >
                                    <View style={{ width: "25%" }}>
                                        <Text>Números de cuenta recaudadora</Text>
                                        {/* <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text>¿Cuantas filas requiere adicionar?</Text>
                                            <Text style={{ border: "0.5px", width: "20px", height: "8px", textAlign: "center", color: "black" }} >10dsafdsa</Text>
                                        </View> */}
                                    </View>
                                    {/* className='w-[75%]' */}
                                    <View style={{ width: "75%" }} >
                                        <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}></Text>
                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}></Text>
                                            <Text>EAN</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>

                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text>Ahorro</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text>Corriente</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                            </View>
                                        </View>

                                        {/* {
                                            // { nCuenta: '543', ean: '543', tipoCuentas: '1' }

                                            cuentaRecaudodora?.map((ean, i) => (
                                                <View key={i} style={{ marginTop: "3px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ width: "80px", textAlign: "center" }}></Text>
                                                    <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{ean?.nCuentar}</Text>
                                                    <Text>EAN</Text>
                                                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ean?.eanr}</Text>

                                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text>Ahorro</Text>
                                                        <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ean?.tipoCuentasr === '1' ? 'x' : ''}</Text>
                                                    </View>
                                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text>Corriente</Text>
                                                        <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ean?.tipoCuentasr === '2' ? 'x' : ''}</Text>
                                                    </View>
                                                </View>
                                            ))
                                        } */}

                                        {
                                            cuentaRecaudodora?.map((ean, i) => {

                                                let filaValida = (ean.tipoCuentasr === '1' || ean.tipoCuentasr === '2') && (ean?.nCuentar && ean?.nCuentar !== '') && (ean?.eanr && ean?.eanr != '')

                                                if (!filaValida) {
                                                    return null;
                                                }


                                                return (
                                                    <View key={i} style={{ marginTop: "3px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                        <Text style={{ width: "80px", textAlign: "center" }}></Text>
                                                        <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{ean?.nCuentar}</Text>
                                                        <Text>EAN</Text>
                                                        <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ean?.eanr}</Text>

                                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                                            <Text>Ahorro</Text>
                                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ean?.tipoCuentasr === '1' ? 'x' : ''}</Text>
                                                        </View>
                                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                                            <Text>Corriente</Text>
                                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ean?.tipoCuentasr === '2' ? 'x' : ''}</Text>
                                                        </View>
                                                    </View>

                                                )
                                            }
                                            )
                                        }

                                    </View>
                                </View>
                            </View>

                            {/* modelo de pago */}
                            <View style={{ fontSize: 8 }}>

                                <Text style={{ color: "white", margin: "3px 0px", backgroundColor: "#FF6B19", textAlign: "center", padding: "3px 0px" }} >Modelo de Pago</Text>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6 }}>
                                        <Text>Aceptación de pagos vencidos:</Text>
                                        {/* modeloPago: { idrem: '1', completo: true, parcial: true }, */}
                                        <View >
                                            <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.convenioRecaudo.modeloPago?.idrem === '1' ? 'X' : ''}`}</Text>
                                                <Text >Acepta</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", marginTop: "5px", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.convenioRecaudo.modeloPago?.idrem === '0' ? 'X' : ''}`}</Text>
                                                <Text >No Acepta</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6 }}>
                                        <Text>Se debe permitir el pago </Text>
                                        {/* modeloPago: { idrem: '0', completo: true, parcial: true }, */}
                                        <View >
                                            <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.convenioRecaudo.modeloPago?.completo === true ? 'X' : ''}`}</Text>
                                                <Text >Pago Completo</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", marginTop: "5px", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.convenioRecaudo.modeloPago?.parcial === true ? 'X' : ''}`}</Text>
                                                <Text >Cualquier Valor</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6 }}>
                                        <Text>Acepta pago en:</Text>
                                        {/* recuadoClasePago: { cheque: true, Efectivo: true, Personal: true, Gerencia: true }, */}
                                        <View >
                                            <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.convenioRecaudo.recuadoClasePago?.Efectivo === true ? 'X' : ''}`}</Text>
                                                <Text >Efectivo </Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", marginTop: "5px", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.convenioRecaudo.recuadoClasePago?.cheque === true ? 'X' : ''}`}</Text>
                                                <Text >Cheque</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View style={{ width: "100%", border: "0.5px", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "8px", gap: 10, padding: "8px 8px" }}>
                                    <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                                        <Text>Si acepta Pago en cheques, indique si recibe:</Text>

                                        <View >
                                            <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.convenioRecaudo.recuadoClasePago?.Gerencia === true ? 'X' : ''}`}</Text>
                                                <Text >Cheques de Gerencia</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", marginTop: "5px", gap: 4, marginTop: "4px" }}>
                                                <Text style={{ borderBottom: "0.5px", width: "25px", textAlign: "center" }}>{`${configuracion.convenioRecaudo.recuadoClasePago?.Personal === true ? 'X' : ''}`}</Text>
                                                <Text >Cheques Personales</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ width: "100%" }} >
                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                                            <View>
                                                <View style={{ display: "flex", flexDirection: "row" }} >
                                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{recaudoRespaldo?.nameGirador && recaudoRespaldo?.nameGirador == true ? 'x' : ''}</Text>
                                                        <Text >Nombre del girador </Text>
                                                    </View>
                                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{recaudoRespaldo?.numeroDocumentoPago && recaudoRespaldo?.numeroDocumentoPago == true ? 'x' : ''}</Text>
                                                        <Text >No documento pago</Text>
                                                    </View>
                                                </View>
                                                <View style={{ display: "flex", flexDirection: "row", marginTop: "5px" }} >
                                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{recaudoRespaldo?.telefono && recaudoRespaldo?.telefono == true ? 'x' : ''}</Text>
                                                        <Text >No. Telefónico </Text>
                                                    </View>
                                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{recaudoRespaldo?.otra && recaudoRespaldo?.otra == true ? 'x' : ''}</Text>
                                                        <Text >Otra especificación </Text>
                                                    </View>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}>
                                            <Text >¿Cual? </Text>
                                            <Text style={{ borderBottom: "0.5px", width: "50%", textAlign: "center" }}>{configuracion.convenioRecaudo.recaudoRespaldo?.cual}</Text>

                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Uso Exclusivo Bancoomeva para Convenios de Recaudo */}
                            <View style={{ fontSize: 8 }}>
                                <Text style={{ color: "white", margin: "3px 0px", backgroundColor: "#FF6B19", textAlign: "center", padding: "3px 0px" }} >Uso Exclusivo Bancoomeva para Convenios de Recaudo</Text>
                                {/* <h1 className='text-center bg-orange-600 text-white m-3'>Uso Exclusivo Bancoomeva para Convenios de Recaudo</h1> */}
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", border: "0.5", padding: "4px 8px" }} >
                                    <View >
                                        <View style={{ display: "flex", flexDirection: "row", gap: 20, marginTop: "3px" }} >
                                            <Text>Recaudo Manual en Oficina</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10, marginLeft: "25px" }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{convenioRecaudoOficinaManual?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioRecaudoOficinaManual?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudoOficinaManual?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>



                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>PSE Recaudo</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{convenioRecaudoPse?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioRecaudoPse?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudoPse?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>PSE Compras</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}></Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Recaudos con código de barras</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{convenioRecaudoOficinaCodBarra?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioRecaudoOficinaCodBarra?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudoOficinaCodBarra?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Consignación Nacional</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}></Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Corresponsales</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}></Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Extensión de red</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}></Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Tarifa Negociada Oficina Virtual PJ</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ofinaVirtualPjServicioFinanciero?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{ofinaVirtualPjServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: ofinaVirtualPjServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>
                                        {/* adicional ajustes */}
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Portal de Pagos</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{convenioPortalPagosPse?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{convenioPortalPagosPse?.tarifaNegociada ? conversionPesos({ valor: convenioPortalPagosPse?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Efecty</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{efecty?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{efecty?.tarifaNegociada ? conversionPesos({ valor: efecty?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Supergiros</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{superGiro?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{superGiro?.tarifaNegociada ? conversionPesos({ valor: superGiro?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Saque y Pague</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{saquePague?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{saquePague?.tarifaNegociada ? conversionPesos({ valor: saquePague?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Cheques de Gerencia</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{chequeGerenciaServicioFinanciero?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{chequeGerenciaServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: chequeGerenciaServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Cheques en Formas Continuas</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{chequeraFormaContinuaServicioFinanciero?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{chequeraFormaContinuaServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: chequeraFormaContinuaServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Cuenta Cte. 30 Cheques</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{chequera30ServicioFinanciero?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{chequera30ServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: chequera30ServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Cuenta Cte. 100 Cheques</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{chequera100ServicioFinanciero?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{chequera100ServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: chequera100ServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "3px" }} >
                                            <Text>Giros</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{girorServicioFinanciero?.cantidad || ''}</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{girorServicioFinanciero?.tarifaNegociada ? conversionPesos({ valor: girorServicioFinanciero?.tarifaNegociada }) : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: "75px" }} >
                                            <Text>Reciprocidad Pactada</Text>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                                                <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}></Text>
                                                <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{reciprocidadPactada}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View >
                        </View>
                        : null
                }

                {/* CORRESPONSAL BANCARIO */}
                {
                    //  corresponsal
                    validCorres

                        ?
                        <View style={{ fontSize: 8 }}>
                            <Text style={{ backgroundColor: "red", color: "white", textAlign: "center", marginTop: "8px", padding: "3px 0px" }}>CORRESPONSALES BANCARIOS</Text>
                            <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Datos de Contacto de la empresa: Información de la persona autorizada por la empresa para establecer contacto con Bancoomeva</Text>


                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "0px 8px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                    <Text>Nombre Completo 1:</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "120px", textAlign: "center" }}>{clienteFiducia?.nombreRepresent}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                    <Text>Cargo:</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "120px", textAlign: "center" }}>{clienteFiducia?.cargoF}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                    <Text>Teléfono / Ext: </Text>
                                    <Text style={{ borderBottom: "0.5px", width: "120px", textAlign: "center" }}>{clienteFiducia?.telContacto}</Text>
                                </View>

                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "4px 8px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                    <Text>Celular:</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{clienteFiducia?.celContacto}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text>Correo electrónico:</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}>{clienteFiducia?.corContacto}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                    <Text>Ciudad: </Text>
                                    <Text style={{ borderBottom: "0.5px", width: "130px", textAlign: "center" }}>{clienteFiducia?.ciudadContacto}</Text>
                                </View>

                            </View>

                            {/* infomracion negocio */}

                            <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Información Negocio</Text>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <View>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 14 }} >
                                        <Text>Corresponsal Bancario</Text>
                                        <View>

                                            <View style={{ display: "flex", flexDirection: "row", gap: 6 }} >
                                                <View style={{ display: "flex", flexDirection: "row", gap: 6 }} >
                                                    <Text>Corresponsal</Text>
                                                    <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{''}</Text>
                                                </View>
                                                <View style={{ display: "flex", flexDirection: "row", marginTop: "4px", gap: 6 }}>
                                                    <Text>Efecty</Text>
                                                    <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{efecty?.cantidad && efecty?.cantidad > 0 ? 'X' : ''}</Text>
                                                </View>
                                            </View>

                                            <View style={{ display: "flex", flexDirection: "row", gap: 6 }} >
                                                <View style={{ display: "flex", flexDirection: "row", marginTop: "4px", gap: 6 }}>
                                                    <Text>Supergiros</Text>
                                                    <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{superGiro?.cantidad && superGiro?.cantidad > 0 ? 'X' : ''}</Text>
                                                </View>
                                                <View style={{ display: "flex", flexDirection: "row", marginTop: "4px", gap: 6 }}>
                                                    <Text>Saque y Pague</Text>
                                                    <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{saquePague?.cantidad && saquePague?.cantidad > 0 ? 'X' : ''}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 32, alignItems: "center", marginTop: "8px" }}>
                                        <Text>Tipo de Recaudo:</Text>
                                        <View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                                <Text>Manual</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{tipoRecuado?.manual === true ? 'X' : ''}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", gap: 6, marginTop: "6px" }}>
                                                <Text>Código de Barras</Text>
                                                <Text style={{ borderBottom: "0.5px", width: "30px", textAlign: "center" }}>{tipoRecuado?.codigoBarra === true ? 'X' : ''}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ padding: "3px 8px" }}>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                            <Text>Con Base de Facturación</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{BaseWebTicket['codListaselect1'] === '1' ? 'X' : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: "8px" }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>

                                            <Text>Convenio con Web Service</Text>
                                            {/* <Text>
                                                Ticket Promedio
                                            </Text> */}

                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{BaseWebTicket['codListaselect2'] === '1' ? 'X' : ''}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginTop: "8px", gap: 4 }}>
                                            <Text>Ticket Promedio </Text>
                                            <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>{BaseWebTicket['codListaselect3'] === '1' ? 'X' : ''}</Text>
                                        </View>
                                    </View>
                                    <View>

                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column", gap: 15, marginTop: "9px" }}>
                                    <Text>No Cuenta de recaudadora</Text>
                                    {/* {

                                        cuentaRecaudadoraEan?.map(e => (
                                            <Text key={e.id} style={{ borderBottom: "0.2px", width: "150px", textAlign: "center" }}>{e?.nCuenta}</Text>
                                        ))

                                    } */}

                                    {
                                        cuentaRecaudadoraEan?.map((e) => {

                                            let filaValida = (e?.nCuenta && e?.nCuenta != '')

                                            if (!filaValida) {
                                                return null;
                                            }


                                            return (
                                                <Text key={e.id + 'recaudocuenta'} style={{ borderBottom: "0.2px", width: "150px", textAlign: "center" }}>{e?.nCuenta}</Text>

                                            )
                                        }
                                        )
                                    }

                                </View>
                            </View>

                            {/* modeloPago: { idrem: '0', completo: true, parcial: true } */}

                            {/* Modelo de pago */}
                            <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Modelo de Pago</Text>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "2px 8px" }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Text>Aceptación de pagos vencidos:</Text>
                                    <View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{modeloPago.idrem === '1' ? 'X' : ''}</Text>
                                            <Text>Acepta</Text>

                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginTop: "4px" }}>
                                            <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{modeloPago.idrem === '0' ? 'X' : ''}</Text>
                                            <Text>No Acepta</Text>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6 }}>
                                    <Text>Se debe permitir el pago </Text>
                                    <View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{modeloPago?.completo === true ? 'X' : ''}</Text>
                                            <Text>Pago Completo</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginTop: "4px" }}>
                                            <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{modeloPago?.parcial === true ? 'X' : ''}</Text>
                                            <Text>Cualquier Valor * Menor a la base de facturación.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View >
                                <View style={{ border: "0.5px", padding: "8px 4px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: "8px" }} >
                                    <View style={{ width: "30%", marginLeft: "8px" }} >

                                        <Text>Campos a capturar:</Text>
                                        <Text>*Uso exclusivo para recaudos manuales</Text>
                                    </View>
                                    <View style={{ width: "70%" }}>
                                        <View style={{ display: "flex", flexDirection: "row" }} >
                                            <Text style={{ textAlign: "center", marginRight: "5px", color: "white" }}>Campo 1</Text>
                                            <Text style={{ border: "0.5px", width: "50%", textAlign: "center" }}>Nombre del Campo</Text>
                                            <Text style={{ border: "0.5px", width: "50%", textAlign: "center" }}>Tipo de Campo</Text>
                                        </View>

                                        {

                                            recuadoManual.map((campo, i) => {

                                                let filaValida = (campo?.nombreCampo && campo?.nombreCampo !== '') && (campo?.tipoCampo && campo?.tipoCampo != '')

                                                if (!filaValida) {
                                                    return null;
                                                }

                                                return (
                                                    <View key={i + 'campos2'} style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ textAlign: "center", marginRight: "5px" }}>{`Campo ${i}`}</Text>
                                                        <Text style={{ border: "0.5px", width: "50%", textAlign: "center" }}>{campo.nombreCampo}</Text>
                                                        <Text style={{ border: "0.5px", width: "50%", textAlign: "center" }}>{campo.tipoCampo}</Text>
                                                    </View>
                                                )
                                            }
                                            )
                                        }
                                        {/* {
                                            recuadoManual.map((campo, i) => (
                                                <View key={i} style={{ display: "flex", flexDirection: "row" }}>
                                                    <Text style={{ textAlign: "center", marginRight: "5px" }}>{`Campo ${i}`}</Text>
                                                    <Text style={{ border: "0.5px", width: "50%", textAlign: "center" }}>{campo.nombreCampo}</Text>
                                                    <Text style={{ border: "0.5px", width: "50%", textAlign: "center" }}>{campo.tipoCampo}</Text>
                                                </View>
                                            ))
                                        } */}
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        null
                }

                {/* CONVENIO DE PAGO   */}

                {
                    validConvenioPago ?
                        <View style={{ fontSize: 8 }}>
                            <Text style={{ backgroundColor: "red", color: "white", textAlign: "center", marginTop: "8px", padding: "3px 0px" }}>CONVENIO DE PAGO</Text>
                            {/* Nómina */}
                            <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Nómina</Text>
                            <View style={{ fontSize: 8, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    <View>
                                        <Text>Número de pagos mediante</Text>
                                        <Text> cuentas Bancoomeva</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", marginTop: "2px" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "30px", textAlign: "center" }}>{NoTxCant}</Text>
                                        <Text>Con cuentas Bancoomeva</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    <View>
                                        <Text>Retiros Exentos por Empleado</Text>
                                        <Text> - Cajero Verde</Text>
                                    </View>
                                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center", marginTop: "2px" }}>{retCajeroVerdeCant}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    <View>
                                        <Text>Retiros Exentos por Empleado</Text>
                                        <Text>  - Cajero Oficina</Text>
                                    </View>
                                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center", marginTop: "2px" }}>{redPropiaCant}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    <View>
                                        <Text>Retiros Exentos por </Text>
                                        <Text>Empleado Saque y pague</Text>
                                    </View>
                                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center", marginTop: "2px" }}>{saquePagueCant}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    <View>
                                        <Text>Retiros Exentos por </Text>
                                        <Text>Empleado - Efecty</Text>
                                    </View>
                                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center", marginTop: "2px" }}>{EfectyCant}</Text>
                                </View>
                            </View>

                            <View style={{ border: "0.5px", display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "8px 8px", marginTop: "4px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text >Frecuencia de Pago Nómina</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center", marginTop: "2px" }}>{frecuenciaPago}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text >Número de Cuenta Pagadora:</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "250px", textAlign: "center", marginTop: "2px" }}>{cuentaPagadoraPagoNomina?.numeroCuenta || ''}</Text>
                                </View>
                            </View>

                            {/* Proveedores */}

                            <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Proveedores</Text>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "5px 8px" }}>
                                <View >
                                    {/* <Text>Número de Proveedores?</Text>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 8, marginTop: "3px" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{pagoTerceros?.cantidadNueva || ''}</Text>
                                        <Text>Con cuentas Bancoomeva</Text>
                                    </View> */}
                                    <View style={{ display: "flex", flexDirection: "row", gap: 80, marginTop: "3px", justifyContent: 'space-between' }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                            <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{pagoTerceros?.cantidadNueva || ''}</Text>
                                            <Text>Con cuentas Bancoomeva</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text>Valor</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{pagoTerceros?.tarifaNegociada ? conversionPesos({ valor: pagoTerceros?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 80, marginTop: "3px", justifyContent: 'space-between' }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                            <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{pagoSebraTerceros?.cantidadNueva || ''}</Text>
                                            <Text>Pagos Sebra</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text>Valor</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{pagoSebraTerceros?.tarifaNegociada ? conversionPesos({ valor: pagoSebraTerceros?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 80, marginTop: "3px", justifyContent: 'space-between' }}>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                            <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{pagoACHTerceros?.cantidadNueva || ''}</Text>
                                            <Text>Con cuentas en Otros Bancos</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text>Valor</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{pagoACHTerceros?.tarifaNegociada ? conversionPesos({ valor: pagoACHTerceros?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                    {/* <View style={{ display: "flex", flexDirection: "row", gap: 8, marginTop: "3px" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "40px", textAlign: "center" }}>{pagoACHTerceros?.cantidadNueva || ''}</Text>
                                        <Text>Con cuentas en Otros Bancos</Text>
                                    </View> */}
                                </View>
                                <View>
                                    <Text>Frecuencia de Pago:</Text>
                                    <View style={{ display: "flex", flexDirection: "row", margin: "9px 0px 0px 0px" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{frecuenciaPago}</Text>
                                        <Text></Text>
                                    </View>
                                </View>
                                {/* <View >
                                    <Text>No de Pagos a Cuentas?:</Text>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 8, marginTop: "4px" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{pagoTerceros?.cantidadNueva || ''}</Text>
                                        <Text>Bancoomeva</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 8, marginTop: "10px" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "50px", textAlign: "center" }}>{pagoACHTerceros?.cantidadNueva || ''}</Text>
                                        <Text>Otras entidades financieras via ACH</Text>
                                    </View>
                                </View> */}
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, marginTop: "10px" }} >
                                <Text>Número de Cuenta Pagadora:</Text>
                                <Text style={{ borderBottom: "0.5px", width: "280px", textAlign: "center" }}>{cuentaRecaudadora2[0]?.numeroCuenta}</Text>
                            </View>
                            {/* Uso Exclusivo Bancoomeva para Convenios de Pago Nómina */}
                            {/* ACLARAR CAMPOS  */}
                            <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Uso Exclusivo Bancoomeva para Convenios de Pago Nómina</Text>
                            <View style={{ display: "flex", flexDirection: "row", gap: 4, padding: "2px 8px" }}>
                                <View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "6px 0px" }}>
                                        <Text>Cuota Manejo Chip</Text>
                                        {/* cuotaManejoChip */}
                                        <Text style={{ borderBottom: "0.5px", width: "150px", textAlign: "center" }}>{cuotaChip ? conversionPesos({ valor: cuotaChip }) : ''}</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "6px 0px" }}>
                                        <Text>Tarifa Negociada pago nómina cuentas Bancoomeva</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "150px", textAlign: "center" }}>{
                                            NoTxTarifa ? conversionPesos({ valor: NoTxTarifa }) : ''
                                        }</Text>
                                    </View>
                                </View>
                                <View >
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "6px 0px" }}>
                                        <Text>Reciprocidad Pactada</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "150px", textAlign: "center" }}>{reciprocidadPactada}</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "6px 0px" }}>
                                        <Text>Tarifa Negociada Oficina Virtual PJ</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{ServicioFinancieroOficinaVirtual?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "70px", textAlign: "center" }}>{ServicioFinancieroOficinaVirtual?.tarifaNegociada ? conversionPesos({ valor: ServicioFinancieroOficinaVirtual?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 4, marginBottom: "6px" }}>
                                <Text>Número de Cuenta Pagadora:</Text>
                                <Text style={{ borderBottom: "0.5px", width: "280px", textAlign: "center" }}>{cuentaPagadoraPagoNomina?.numeroCuenta}</Text>
                            </View>
                            {/* Uso Exclusivo Bancoomeva para Convenios de Pago Proveedores */}
                            {/* **** */}
                            <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Uso Exclusivo Bancoomeva para Convenios de Pago Proveedores</Text>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "space-between", padding: "1px 8px" }}>
                                <View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 4, margin: "6px 0px" }}>
                                        <Text>Tarifa Negociada pagos Proveedores mediante cuentas Bancoomeva</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "150px", textAlign: "center" }}>$ {pagoTerceros?.tarifaNegociada || ''}</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 4, margin: "6px 0px" }}>
                                        <Text>Tarifa Negociada Oficina Virtual PJ</Text>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                            <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ServicioFinancieroOficinaVirtual?.cantidad || ''}</Text>
                                            <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>{ServicioFinancieroOficinaVirtual?.tarifaNegociada ? conversionPesos({ valor: ServicioFinancieroOficinaVirtual?.tarifaNegociada }) : ''}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View >
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 4, margin: "6px 0px" }}>
                                        <Text>Tarifa Negociada pagos Proveedores mediante ACH</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "150px", textAlign: "center" }}>$ {pagoACHTerceros?.tarifaNegociada || ''}</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 4, margin: "6px 0px" }}>
                                        <Text>Reciprocidad Pactada</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}>{reciprocidadPactada}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        : undefined
                }
                {/* PSE */}
                {
                    //portalPago || pseRecaudo
                    activarSeccionConvenioRecaudo
                        ?
                        <View style={{ fontSize: 8 }}>
                            <Text style={{ backgroundColor: "red", color: "white", textAlign: "center", marginTop: "8px", padding: "3px 0px" }}>PSE</Text>
                            <View style={{ display: "flex", flexDirection: "row", gap: 20, padding: "10px 8px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                    <Text style={{ borderBottom: "0.5px", width: "30px", textAlign: "center" }}>{portalPago ? 'X' : ''}</Text>
                                    <Text className='text-xs'>Portal de Pago</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                                    <Text style={{ borderBottom: "0.5px", width: "30px", textAlign: "center" }}>{pseRecaudo ? 'X' : ''}</Text>
                                    <Text className='text-xs'>Boton PSE</Text>
                                </View>
                            </View>
                            <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >Uso Exclusivo Bancoomeva</Text>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                <View>
                                    <Text style={{ color: "white" }} >Recaudo Portal de Pago</Text>
                                    <Text>Cantidad mes</Text>
                                    <Text>Valor Promedio</Text>
                                    <Text>Tarifa unitaria pactada</Text>
                                    {/* <Text>Tarifa Negociada Oficina Virtual PJ</Text> */}
                                </View>
                                <View>
                                    <Text>Compras Pagina Web</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}></Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}></Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}></Text>
                                    {/* <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>0,00%</Text> */}
                                </View>
                                <View>
                                    <Text>Recaudo Pagina Web</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>{convenioRecaudoPse?.cantidad || ''}</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>{convenioRecaudoPse?.ticket ? conversionPesos({ valor: convenioRecaudoPse?.ticket }) : ''}</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>{convenioRecaudoPse?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudoPse?.tarifaNegociada }) : ''}</Text>
                                    {/* <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>0,00%</Text> */}
                                </View>
                                <View>
                                    <Text>Compras Portal de Pago</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}></Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}></Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}></Text>
                                    {/* <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>0,00%</Text> */}
                                </View>
                                <View>
                                    <Text>Recaudo Portal de Pago</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>{convenioPortalPagosPse?.cantidad || ''}</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>{convenioPortalPagosPse?.ticket ? conversionPesos({ valor: convenioPortalPagosPse?.ticket }) : ''}</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>{convenioPortalPagosPse?.tarifaNegociada ? conversionPesos({ valor: convenioPortalPagosPse?.tarifaNegociada }) : ''}</Text>
                                    {/* <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}></Text> */}
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 4, margin: "6px 0px" }}>
                                    <Text>Tarifa Negociada Oficina Virtual PJ</Text>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                        <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>{ServicioFinancieroOficinaVirtual?.cantidad || ''}</Text>
                                        <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>{ServicioFinancieroOficinaVirtual?.tarifaNegociada ? conversionPesos({ valor: ServicioFinancieroOficinaVirtual?.tarifaNegociada }) : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 4, margin: "6px 0px" }}>
                                    <Text>Reciprocidad Pactada</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}>{reciprocidadPactada}</Text>
                                </View>
                            </View>
                        </View>
                        : null
                }
                {/* <h1 className='text-center bg-orange-600 text-white mt-1'></h1> */}
                <View style={{ fontSize: 8 }}>
                    <Text style={{ textAlign: "center", backgroundColor: "#FF6B19", color: "white", padding: "3px 0px" }} >OBSERVACIONES ADICIONALES DE LOS CONVENIOS</Text>
                </View>
                {/* Firmas */}
                <Firmas View={View}
                    Text={Text}
                    campoAdicionalesModal={campoAdicionalesModal}
                    diaLetras={diaLetras}
                    dia={dia}
                    mes={mes}
                    yyy={yyy}
                    tecnioOperador={tecnioOperador}
                    clientModal={clientModal}
                />
            </Page>
        </Document>
    )
};