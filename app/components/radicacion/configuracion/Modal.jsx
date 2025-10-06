'use client'

import { useEffect, useRef, useState } from "react";
import BtnControl from '../cliente/BtnControl';
import { useRouter } from 'next/navigation';

//contrato
import ContratoConvenios from "../contrato/ContratoConvenios";
import EspecificacionContrato from "../contrato/EspecificacionContrato";
import dynamic from "next/dynamic";
import Loading from '../../share/Loading';
import { queryUpdateSolicitudes } from '@/app/lib/solicitudes/queryUpdateSolicitudes';
import { queryFileUp } from '@/app/lib/solicitudes/queryFileUp';
import { queryCorreoParametrizador } from '@/app/lib/solicitudes/queryCorreoParametrizador';
import { validarNumeros, validarTexto } from '@/app/lib/utils';
import { ModalDocumento } from '../../share/ModalDocumento';

const DynamicModal = dynamic(() => import('../../share/Modals'));

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <Loading />,
    },
);


export default function Modal({ listaSino, rolPerfil, listNegociarNomina, context }) {

    const [descargarDoc, setDescargarDoc] = useState(false);

    /* modal */
    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [pdf, setPdf] = useState(false);
    const { idSolicitudDb, tecnioOperador, clientModal, clienteFiducia, campoAdicionalesModal, updateTecnicoOperador, updateClientModal, updateCampoAdicionalesModal, configuracion, convenioPago, isDocumentos, updateIsDocumentos, solicitud, estadoAprobacionParametrizador } = context;
    const activarParametrizacion = ((Object.values(isDocumentos)).filter(e => e === true).length === 5) && (descargarDoc === true) && (idSolicitudDb !== '' && idSolicitudDb !== undefined) && (rolPerfil === 2);

    // updateIsDocumentos

    useEffect(() => {
        getEstadoDocumentos()
        validarBontonDescargaDoc()
    }, [configuracion, clienteFiducia]);


    const getEstadoDocumentos = async () => {
        const responseFile = await queryFileUp(JSON.stringify({ codSolicitud: idSolicitudDb }));
        const resultDocuments = responseFile !== undefined ? JSON.parse(responseFile) : undefined;

        if (resultDocuments?.state === 200) {
            updateIsDocumentos({
                cedula: resultDocuments.statusFile.docCedula,
                rut: resultDocuments.statusFile.docRut,
                certificado: resultDocuments.statusFile.docCertificado,
                formato: resultDocuments.statusFile.docFormato,
                contrato: resultDocuments.statusFile.docContrato
            })
        }
    };


    const { infoTriburaria, infoComercio, tipoVenta, tipoCuenta1 } = configuracion.adquirencia;
    const { cuentaRecaudadora1, cuentaRecaudadora2 } = configuracion.convenioPago;
    const { tipoRecuado, BaseWebTicket, recuadoManual, cuentaRecaudadoraEan } = configuracion.corresponsales;
    const { recaudoFormato, recaudoManuales1, recaudoSiNo, cuentaRecaudodora, modeloPago, recuadoClasePago, recaudoRespaldo } = configuracion.convenioRecaudo;

    /**
     * Validaciones para habilitar boton descarcar Documentos
     * 1 - adquirencia
     * 2 - infomracion tributaria
     * 3 - informacion comercion
     * 4 - tipoVenta
     * 5 - tipoCuenta
     */

    const validacionesFormulario = {

        'informacionCliente': () => {

            const fiducia =
                (clienteFiducia?.naturaleza !== '' && clienteFiducia?.naturaleza) ||
                (clienteFiducia?.cargoF !== '' && clienteFiducia?.cargoF) ||
                (clienteFiducia?.nombreRepresent !== '' && clienteFiducia?.nombreRepresent) ||
                (clienteFiducia?.cedRepresent !== '' && clienteFiducia?.cedRepresent) ||
                (clienteFiducia?.telContacto !== '' && clienteFiducia?.telContacto) ||
                (clienteFiducia?.celContacto !== '' && clienteFiducia?.celContacto) ||
                (clienteFiducia?.corContacto !== '' && clienteFiducia?.corContacto) ||
                (clienteFiducia?.ciudadContacto !== '' && clienteFiducia?.ciudadContacto)

            return fiducia !== undefined

        },
        'adquirencia': () => {

            const validarAdquirencia = infoTriburaria.filter((e, i) => ((e?.list && e?.list && e?.nResolucion && e?.fechaResolucion) && e.list !== '' && e.list !== 'default' && e.nResolucion !== '' && e.fechaResolucion !== '') || ((e.list !== '' && e.list !== 'default') && i === 0) || ((e.list !== '' && e.list !== 'default') && i === 1))
            const validInfoComercio = (Object.values(infoComercio)).filter(e => e !== '' && e !== undefined)
            const validTipoVenta = (Object.values(tipoVenta).some(e => e === true))
            const validTipoCuenta1 = Array.isArray(tipoCuenta1) ? (tipoCuenta1?.some(e => e.cuenta !== 'default' && e.cuenta !== '' && e.numCuenta !== '' && e.porcentaje !== '')) : false

            /**
             * convenio pago
             */

            // const cuentaPagadoraNomina = cuentaRecaudadora1.some(e => e.numeroCuenta !== '' && e.cuenta !== '' && e.numeroCuenta !== undefined && e.tipoCuenta !== undefined)
            // const cuentaPagadoraTerceros = cuentaRecaudadora2.some(e => e.numeroCuenta !== '' && e.cuenta !== '' && e.numeroCuenta !== undefined && e.tipoCuenta !== undefined)
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

            const cuentaPagadoraNomina = cuentaRecaudadora1.some(e => (e.numeroCuenta !== '' && e.numeroCuenta !== undefined) && (e.tipoCuenta !== undefined && e.tipoCuenta !== 'default' && e.tipoCuenta !== ''))
            const cuentaPagadoraTerceros = cuentaRecaudadora2.some(e => (e.numeroCuenta !== '' && e.numeroCuenta !== undefined) && (e.tipoCuenta !== undefined && e.tipoCuenta !== 'default' && e.tipoCuenta !== ''))

            return (cuentaPagadoraNomina || cuentaPagadoraTerceros)
        }
    }


    /***
     * codigo sustituido por ajusted conf documentos -  14-06-24
     */
    // const filterAdquirencia = (convenioRecaudo.adquirencia.some(e => e?.tarifaRemi && e?.facturacion && e?.punosNegociados && e?.tarifaNegociada))

    // const filterRecuadoOficina = (convenioRecaudo.recaudoOficina.some(e => (e?.cantidad && e?.ticket && e?.tarifaCosto) && (e?.cantidad !== '' && e?.ticket !== '' && e?.tarifaCosto !== '')))

    // const filterCorresponsal = (convenioRecaudo.recaudoCorresponsales.some(e => (e?.cantidad && e?.ticket_promedio && e?.tarifaNegociada) && e?.cantidad !== '' && e?.ticket_promedio !== '' && e?.tarifaNegociada !== ''))
    const { convenioPagoNominaTipo, convenioPagoTerceros, convenioPagoNominaNegociada } = convenioPago

    const validarBontonDescargaDoc = () => {

        const activarSeccionConvenioRecaudo = solicitud?.tipoConvenio?.convenioRecaudo !== undefined && solicitud?.tipoConvenio?.convenioRecaudo !== ''
        const activarSeccionConvenioPago = solicitud?.tipoConvenio?.convenioPago !== undefined && solicitud?.tipoConvenio?.convenioPago !== ''
        const validarFiducia = validacionesFormulario.informacionCliente()
        const validAdqurencia = activarSeccionConvenioRecaudo ? validacionesFormulario.adquirencia() : undefined
        const validRecuado = activarSeccionConvenioRecaudo ? validacionesFormulario.convenioRecaudo() : undefined
        const validCorres = activarSeccionConvenioRecaudo ? validacionesFormulario.corresponsal() : undefined
        const validConvenioPago = activarSeccionConvenioPago ? validacionesFormulario.convenioPago() : undefined

        const opcionesPrincipales = Object.values({
            adquirencia: validAdqurencia,
            recaudo: validRecuado,
            corresponsal: validCorres,
            convenioPago: validConvenioPago,
            validarFiducia: validarFiducia
        })

        /*
        
         const filterCountValid = Object.values({
             fAdquirencia: activarSeccionConvenioRecaudo,
             fRecaudo: activarSeccionConvenioRecaudo,
             fCorre: activarSeccionConvenioRecaudo
         })
     
        */

        const val1 = (opcionesPrincipales.filter(e => e === true && e !== undefined)).length
        const expresionValidarCorreo = /^[a-zA-Z0-9_%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]*$/;
        const isValidEmail = clienteFiducia?.corContacto !== '' && clienteFiducia?.corContacto !== undefined ? expresionValidarCorreo.test(clienteFiducia?.corContacto) : true;

        if ((val1 > 0 && (((activarSeccionConvenioRecaudo == true) || (validarFiducia == true)) || (activarSeccionConvenioPago == true))) && descargarDoc !== true && isValidEmail) {
            setDescargarDoc(true)
            return
        }

        if ((val1 === 0 && (activarSeccionConvenioRecaudo !== true || (activarSeccionConvenioPago == true)) || isValidEmail == false) && descargarDoc !== false) {
            setDescargarDoc(false)
            return
        }
    }


    const actualizarContext = async () => {

        const infoTecnico = {

            'representado': document.getElementById('representado').value,
            'amyorEdadVencino': document.getElementById('amyorEdadVencino').value,
            'identificacion': document.getElementById('identificacion').value,
            'direccion': document.getElementById('direccion').value,
            'ciudad': document.getElementById('ciudad').value,
            'correo': document.getElementById('correo').value,
            'de': document.getElementById('de').value,

        }

        const infoCliente = {
            'representadoPorCli': document.getElementById('representadoPorCli').value,
            'identificacionCli': document.getElementById('identificacionCli').value,
            'deCli': document.getElementById('deCli').value,
            'direccionCli': document.getElementById('direccionCli').value,
            'ciudadCli': document.getElementById('ciudadCli').value,
            'correoCli': document.getElementById('correoCli').value,
            'codigoCiiu': document.getElementById('codigoCiiu').value,
        }

        const camposAdicionales = {
            'nombreCompleto': document.getElementById('nombreCompleto').value,
            'cargo': document.getElementById('cargo').value,
            'telefonoAquirencia': document.getElementById('telefonoAquirencia').value,
            'celularAdquirencia': document.getElementById('celularAdquirencia').value,
            'correoAdquirencia': document.getElementById('correoAdquirencia').value,
            'ciudadAquirencia': document.getElementById('ciudadAquirencia').value,
            'nombreGerente': document.getElementById('nombreGerente').value,
            'cedulaGerente': document.getElementById('cedulaGerente').value,
            'ftp': document.getElementById('ftp').value,
            'nomGir': document.getElementById('nomGir').value,
            'numPagGir': document.getElementById('numPagGir').value,
            'telGir': document.getElementById('telGir').value,
            'otraEspGir': document.getElementById('otraEspGir').value,
            'ciudadFirma': document.getElementById('ciudadFirma').value,

        }

        updateTecnicoOperador(infoTecnico)
        updateClientModal(infoCliente)
        updateCampoAdicionalesModal(camposAdicionales)

        //data JSON
        if (idSolicitudDb) {
            const dataDocumento = {
                "DOCUMENTO": configuracion,
                "TECNICO_OPERADOR": tecnioOperador,
                "CLIENTE_MODAL": clientModal,
                "CAMPO_ADICIONALES_MODAL": campoAdicionalesModal,
                "CLIENTE_FIDUCIA": clienteFiducia
            }

            const response = JSON.parse(await queryUpdateSolicitudes(JSON.stringify(dataDocumento), idSolicitudDb))

            if (response.state !== 200) {
                setMessageAlert('No se actualizo el documento')
                setShowModal(true)
                return
            }
        }

        //queryUpdateSolicitudes
        // router.push("/radicacion/contrato")
        setPdf(true)
        modal()
    }

    const imprimirPdf = () => {
        setPdf(false)
        router.push("/radicacion/configuracion")
    }

    const endModal = () => setShowModal(false);

    const enviarParemetrizacion = async () => {
        try {
            setLoading(true);

            const response = JSON.parse(await queryCorreoParametrizador(JSON.stringify({ cod_solicitud: idSolicitudDb })));

            if (response.state !== 200) {
                setMessageAlert('No fue posible enviar la solicitud al parametrizador')
                setShowModal(true)
                return
            };

            setMessageAlert('La solicitud fue enviada al Parametrizador para su procesamiento');
            setShowModal(true);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        };
    };

    const [correo, setCorreo] = useState(clienteFiducia?.corContacto || '')

    const [errorCorreo, setErrorCorreo] = useState({
        "correo": false,
        "correoCli": false,
        "correoAdquirencia": false
    })

    const correoRef = useRef()
    const correoAdquirenciaRef = useRef()
    const correoClientRef = useRef()

    const onChangeEmailValidacion = (e) => {

        const value = e.target.value;
        const expresionValidarCorreo = /^[a-zA-Z0-9_%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]*$/;
        const isValidEmail = expresionValidarCorreo.test(value);

        if (isValidEmail) {
            setErrorCorreo((corr) => ({
                ...corr,
                [e.target.id]: false
            }))
            setCorreo(value);

        } else {
            setErrorCorreo((corr) => ({
                ...corr,
                [e.target.id]: true
            }))
            setCorreo(value);
        }
    }

    const onBlurInput = (e) => {

        e.target.value == '' && setErrorCorreo((corr) => ({
            ...corr,
            [e.target.id]: false
        }))

        if (e.target.id == 'correo' || e.target.id == 'correoCli' || e.target.id == 'correoAdquirencia') {
            if (errorCorreo.correo || errorCorreo.correoAdquirencia || errorCorreo.correoCli) {
                const focusRef = {
                    'correo': () => { correoRef.current.focus() },
                    'correoCli': () => { correoClientRef.current.focus() },
                    'correoAdquirencia': () => { correoAdquirenciaRef.current.focus() }
                }

                focusRef[e.target.id]()
            }
        }
    }

    const modal = () => {
        setMostrarModal(!mostrarModal)
    }


    return (
        <section>
            <div className='flex'>
                {
                    descargarDoc ? <div id="header" className={"header"}>
                        <button onClick={modal} aria-disabled={true} className={"buttom_Document"} >DESCARGAR DOCUMENTOS</button>
                    </div> :
                        <BtnControl
                            name="DESCARGAR DOCUMENTOS    "
                            enableButton={false}
                            url={'/radicacion/contrato'}
                            opcion={'navegar'}
                        />
                }
                <BtnControl
                    name="CARGAR DOCUMENTOS FIRMADOS"
                    url={"/radicacion/documentos"}
                    enableButton={
                        // (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined)
                        //   ? false :
                        //   (
                        //     ((estadoAprobacionParametrizador.estadoParametrizacion !== 1)
                        //     &&
                        (rolPerfil === 'Radicación' && estadoAprobacionParametrizador.estadoAprobacion == 1)
                    }
                    opcion={'navegar'}
                />
                <BtnControl
                    name="ENVIAR A PARAMETRIZACIÓN"
                    enableButton={activarParametrizacion}
                    enviarParametrizar={enviarParemetrizacion}
                    opcion={'enviarParametrizar'}
                />

                {/* <BtnControl
                    name="DESCARGAR DOCUMENTOS"
                    enableButton={true}
                    url={'/radicacion/contrato'}
                    opcion={'navegar'}

                /> */}

                <BtnControl
                    name="Resumen Operación"
                    url={'/radicacion/resumen'}
                    enableButton={true}
                    opcion={'navegar'}
                />

            </div>
            {
                mostrarModal ?
                    <ModalDocumento>
                        <section id="modal" className={"modal"}>
                            <div className={` modal_container overflow-y-scroll h-[100vh]`} >
                                <div className={"container_buttom"}>
                                    <button onClick={modal} className='border rounded-full w-6 h-6 border-spacing-2 flex justify-center items-center border-coomeva_color-rojo font-bold text-coomeva_color-rojo'>x</button>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-2 divide-x-2">
                                    <section>
                                        <h2 className={"titulo"}> Información Técnico Operativo - Banco</h2>
                                        <div className={"groupFlex"}>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="representado" className={"label"}>Representado por</label>
                                                <input
                                                    autoFocus
                                                    id="representado"
                                                    name="representado"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={tecnioOperador?.representado || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="amyorEdadVencino" className={"label"}>Mayor de edad y vecino(a) de</label>
                                                <input
                                                    id="amyorEdadVencino"
                                                    name="amyorEdadVencino"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={tecnioOperador?.amyorEdadVencino || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className={"groupFlex"}>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="identificacion" className={"label"}>Identificado(a) con la cédula de ciudadanía No</label>
                                                <input
                                                    id="identificacion"
                                                    name="identificacion"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarNumeros}
                                                    defaultValue={tecnioOperador?.identificacion || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="de" className={"label"}>de</label>
                                                <input
                                                    id="de"
                                                    name="de"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={tecnioOperador?.de || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className={"groupFlex"}>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="direccion" className={"label"}>Dirección</label>
                                                <input
                                                    id="direccion"
                                                    name="direccion"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    defaultValue={tecnioOperador?.direccion || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="ciudad" className={"label"}>Ciudad</label>
                                                <input
                                                    id="ciudad"
                                                    name="ciudad"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={tecnioOperador?.amyorEdadVencino || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className={"groupLabelInput"}>
                                            <div className='flex space-x-2'><label htmlFor="correo" className={"label"}>Correo electrónico</label> {errorCorreo.correo ? <p className='text-sm text-coomeva_color-rojo'>no es valido.</p> : undefined}</div>
                                            <input
                                                id="correo"
                                                name="correo"
                                                type="email"
                                                className={"inputs"}
                                                autoComplete='off'
                                                defaultValue={tecnioOperador?.correo || ''}
                                                onChange={onChangeEmailValidacion}
                                                ref={correoRef}
                                                onBlur={onBlurInput}
                                            />
                                        </div>
                                    </section>
                                    <section>
                                        <h2 className={"titulo"}> Información Técnico Operativo - Cliente</h2>
                                        <div className={"groupFlex"}>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="representadoPorCli" className={"label"}>Representado en este acto por:</label>
                                                <input
                                                    autoFocus
                                                    id="representadoPorCli"
                                                    name="representadoPorCli"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={clientModal?.representadoPorCli || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className={"groupFlex"}>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="identificacionCli" className={"label"}>Identificado(a) con la cédula de ciudadanía No: </label>
                                                <input
                                                    id="identificacionCli"
                                                    name="identificacionCli"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarNumeros}
                                                    defaultValue={clientModal?.identificacionCli || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="deCli" className={"label"}>de: </label>
                                                <input
                                                    id="deCli"
                                                    name="deCli"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={clientModal?.deCli || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className={"groupFlex"}>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="direccionCli" className={"label"}>Dirección:</label>
                                                <input
                                                    id="direccionCli"
                                                    name="direccionCli"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    defaultValue={clientModal?.direccionCli || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="ciudadCli" className={"label"}>Ciudad: </label>
                                                <input
                                                    id="ciudadCli"
                                                    name="ciudadCli"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={clientModal?.ciudadCli || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="codigoCiiu" className={"label"}>Código CIIU: </label>
                                                <input
                                                    id="codigoCiiu"
                                                    name="codigoCiiu"
                                                    type="text"
                                                    onChange={validarNumeros}
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    defaultValue={clientModal?.codigoCiiu || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className={"groupLabelInput"}>
                                            <div className='flex space-x-2'><label htmlFor="correoCli" className={"label"}>Correo electrónico</label> {errorCorreo.correoCli ? <p className='text-sm text-coomeva_color-rojo'>no es valido.</p> : undefined}</div>
                                            <input
                                                id="correoCli"
                                                name="correoCli"
                                                type="email"
                                                className={"inputs"}
                                                autoComplete='off'
                                                onChange={onChangeEmailValidacion}
                                                onBlur={onBlurInput}
                                                defaultValue={clientModal?.correoCli || ''}
                                                ref={correoClientRef}
                                            />
                                        </div>
                                    </section>
                                </div>
                                <div className="grid grid-cols-2 divide-x-2">
                                    <section>
                                        <h2 className={"titulo"}>ADQUIRENCIA - Uso Exclusivo Bancoomeva</h2>
                                        <div className="grid grid-cols-2">
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="nombreCompleto" className={"label"}>Nombre Completo :</label>
                                                <input
                                                    autoFocus
                                                    id="nombreCompleto"
                                                    name="nombreCompleto"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={campoAdicionalesModal?.nombreCompleto || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="cargo" className={"label"}>Cargo</label>
                                                <input
                                                    id="cargo"
                                                    name="cargo"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={campoAdicionalesModal?.cargo || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="telefonoAquirencia" className={"label"}>Teléfono: / Ext: </label>
                                                <input
                                                    id="telefonoAquirencia"
                                                    name="telefonoAquirencia"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarNumeros}
                                                    defaultValue={campoAdicionalesModal?.telefonoAquirencia || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="celularAdquirencia" className={"label"}>Celular: </label>
                                                <input
                                                    id="celularAdquirencia"
                                                    name="celularAdquirencia"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarNumeros}
                                                    defaultValue={campoAdicionalesModal?.celularAdquirencia || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className={"groupLabelInput"}>
                                                <div className='flex space-x-2'><label htmlFor="correoAdquirencia" className={"label"}>Correo electrónico</label> {errorCorreo.correoAdquirencia ? <p className='text-sm text-coomeva_color-rojo'>no es valido.</p> : undefined}</div>
                                                <input
                                                    id="correoAdquirencia"
                                                    name="correoAdquirencia"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={onChangeEmailValidacion}
                                                    onBlur={onBlurInput}
                                                    ref={correoAdquirenciaRef}
                                                    defaultValue={campoAdicionalesModal?.correoAdquirencia || ''}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="ciudadAquirencia" className={"label"}>Ciudad</label>
                                                <input
                                                    id="ciudadAquirencia"
                                                    name="ciudadAquirencia"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={campoAdicionalesModal?.ciudadAquirencia || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 border-coomeva_color-rojo border-t-2 pb-4 mt-4 py-4 mr-2 ">
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="ciudadFirma" className={"label"}> Para constancia se firma en la ciudad de</label>
                                                <input
                                                    id="ciudadFirma"
                                                    name="ciudadFirma"
                                                    type="text"
                                                    onChange={validarTexto}
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    defaultValue={campoAdicionalesModal?.ciudadFirma || ''}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <button
                                                className={`${errorCorreo.correo || errorCorreo.correoAdquirencia || errorCorreo.correoCli ? "bg-gray-400" : "bg-coomeva_color-rojo"} text-white rounded-md w-36 text-center h-8 flex justify-center items-center`}
                                                onClick={errorCorreo.correo == false && errorCorreo.correoAdquirencia == false && errorCorreo.correoCli == false ? actualizarContext : undefined}
                                            >Generar PDF</button>
                                        </div>
                                    </section>
                                    <section>
                                        <h2 className={"titulo"}>FIDUCIARIA - Datos de Contacto de la empresa</h2>
                                        <div className="grid grid-cols-2">
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="nombreGerente" className={"label"}>Nombre del Representante Legal:</label>
                                                <input
                                                    autoFocus
                                                    id="nombreGerente"
                                                    name="nombreGerente"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={campoAdicionalesModal?.nombreGerente}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="cedulaGerente" className={"label"}>Cédula del Representante Legal:</label>
                                                <input
                                                    id="cedulaGerente"
                                                    name="cedulaGerente"
                                                    type="text"
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarNumeros}
                                                    defaultValue={campoAdicionalesModal?.cedulaGerente}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className={"groupLabelInput"}>
                                                <label htmlFor="ftp" className={"label"}>¿Requiere asobancaria por ftp?</label>
                                                <select
                                                    id={`ftp`}
                                                    name={`ftp`}
                                                    defaultValue={campoAdicionalesModal?.ftp || 'default'}
                                                    className='w-full h-7 font-normal  text-sm outline-none bg-transparent  border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 ' >
                                                    <option disabled value={"default"} >Seleccionar</option>
                                                    {
                                                        listaSino?.DATA?.map(op => (
                                                            <option key={op.codLista} value={op.codLista} >{op.descripcion}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className={"groupLabelInput"}>
                                                {/* <label htmlFor="nomGir" className={"label"}>Nombre del girador</label> */}
                                                <input
                                                    id="nomGir"
                                                    name="nomGir"
                                                    type='hidden'
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarTexto}
                                                    defaultValue={campoAdicionalesModal?.nomGir}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                {/* <label htmlFor="numPagGir" className={"label"}>No. documento pago</label> */}
                                                <input
                                                    id="numPagGir"
                                                    name="numPagGir"
                                                    type='hidden'
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarNumeros}
                                                    defaultValue={campoAdicionalesModal?.numPagGir}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className={"groupLabelInput"}>
                                                {/* <label htmlFor="telGir" className={"label"}>No. Telefónico</label> */}
                                                <input
                                                    id="telGir"
                                                    name="telGir"
                                                    type='hidden'
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    onChange={validarNumeros}
                                                    defaultValue={campoAdicionalesModal?.telGir}
                                                />
                                            </div>
                                            <div className={"groupLabelInput"}>
                                                {/* <label htmlFor="otraEspGir" className={"label"}>Otra especificación</label> */}
                                                <input
                                                    id="otraEspGir"
                                                    name="otraEspGir"
                                                    type='hidden'
                                                    className={"inputs"}
                                                    autoComplete='off'
                                                    defaultValue={campoAdicionalesModal?.otraEspGir}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section></ModalDocumento>
                    : undefined
            }
            {/* codigo para contrato */}
            {
                pdf ?
                    <div>
                        <div className='fixed z-40 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
                            <button
                                className={`buttom absolute right-4 top-12 bg-red-500 text-white px-4 py-2 rounded shadow-lg`}
                                onClick={imprimirPdf}
                            >
                                Regresar
                            </button>
                            <div className='w-full flex'>
                                <PDFViewer className="w-full h-screen">
                                    <EspecificacionContrato dataContext={context} listNegociarNomina={listNegociarNomina} />
                                </PDFViewer>
                                <PDFViewer className="w-full h-screen">
                                    <ContratoConvenios dataContext={context} />
                                </PDFViewer>
                            </div>
                        </div>
                    </div>
                    : undefined
            }

            {
                loading ?
                    <Loading />
                    : undefined
            }

            {
                showModal &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} mostrarImagneFondo={true} ocultarBtnCancelar={true} textBtnContinuar="Ok">
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            }

        </section>
    )
}