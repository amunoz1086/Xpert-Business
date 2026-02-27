'use client';

/* Librerias */
import React, { useState, useEffect, useRef } from 'react';
import { pdf } from '@react-pdf/renderer';
import { UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/solid';
import { MdOutlineDeleteForever } from "react-icons/md";
import dynamic from 'next/dynamic';
import { GrDocumentPdf } from "react-icons/gr";
import { IoIosAddCircle } from "react-icons/io";
import { FaCalculator } from "react-icons/fa";
/* Servicios y APIS*/
import { fn_catalogosPropietarios } from '@/app/lib/propietarios/fn_catalogosPropietarios';
import { fn_catalogosPropietarios as catalogoPropietario } from "@/app/lib/propietarios/fn_catalogosPropietarios";
import { queryClientePj } from "@/app/lib/apisClientePj/fn_queryClientePj";
import { queryClientePn } from '@/app/lib/apisClientePn/fn_queryClientePn';
import { fnInspektor } from '@/app/lib/inspektor/fn_inspektor';
import { queryCuentas } from "@/app/lib/apisProductoDepositoPlazo/fn_queryCuentas";
import { fn_orquestadorCrearCDT } from '@/app/lib/apisProductoDepositoPlazo/fn_orquestadorCrearCDT';
import { fn_orquestarSimulador } from '@/app/lib/apisProductoDepositoPlazo/fn_orquestarSimulador';
import { fnQueryAgrupacionTipoCompaniaFiltro } from '@/app/lib/admin/cuentas/queryAgrupacionTipoCompaniaFiltro';
import { fnQueryAgrupacionRolFiltro } from '@/app/lib/admin/cuentas/queryAgrupacionRolFiltro';
//import { fnQueryUsuarioOficina } from "@/app/lib/apisProductoCaptacion/fnQueryUsuarioOficina";
import { fnQueryActaContratos } from "@/app/lib/apisProductoCaptacion/fnQueryActasContratos";
import { queryListCiudades } from '@/app/lib/menuPrincipal/actions';
import { fn_consultarFechaCorte } from '@/app/lib/apisProductoCaptacion/fn_consultarFechaCorte';
import { titulosSubtitulosMensajes } from '@/app/lib/services/parametros/action';
/* Share */
import Loading from '@/app/loading';
import CdtPDF from './CdtPDF';
import { rangosFrecuencias, minimosMaximos, diaHabil } from "@/app/lib/apisProductoDepositoPlazo/action";
import { formatearFecha } from '@/app/lib/utils';
import { CampoLista } from "../../share/CampoLista";
import { CampoNumero } from "../../share/CampoNumero";
import { conversionPesos, validarCompoRequerido } from "@/app/lib/utils";
import { CampoMonedaDecimal } from "../../share/CampoMonedaDecimal";


const DynamicModal = dynamic(() => import('../../share/Modals'), { ssr: false });
const datos = [];


export const ContenidoDepositoPlazo = ({ dataDepositoPlazo }) => {

    const [activarTab, setActivarTab] = useState(0);
    const [rol, setRol] = useState('');
    const [tipoPersona, setTipoPersona] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [consultaClientePjPn, setConsultaClientePjPn] = useState([]);

    const [showDescarga, setShowDescarga] = useState(false);
    const [showRecursosModal, setShowRecursosModal] = useState(false);
    const [recursosText, setRecursosText] = useState('');

    const [nombreCliente, setNombreCliente] = useState('');
    const [tipoCompania, setTipoCompania] = useState('');
    //const [clientParticipanteTipo, setClientParticipanteTipo] = useState('');

    const [isClientActive, setIsClientActive] = useState(false);
    const [isClientProspect, setIsClientProspect] = useState(false);
    const [isCreado, setIsCreado] = useState(false);
    const [isSimulacion, setIsSimulacion] = useState(false);
    const [isNValorValido, setIsNValorValido] = useState(false);
    const [isNPlazoValido, setIsNPlazoValido] = useState(false);
    //const [isClientReportedInspektor, setIsClientReportedInspektor] = useState(false);
    //const [isICBF, setIsICBF] = useState(false);
    const [isSolicitaFirmante, setIsSolicitaFirmante] = useState(true);
    const [isTasaEspecial, setIsTasaEspecial] = useState(true);
    const [isDesmaterializado, setIsDesmaterializado] = useState(true);
    const [isActivarFrecuenciaPago, setIsActivarFrecuenciaPago] = useState(true);
    const [isFlexirenta, setIsFlexirenta] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isActivarCuentaRecepcion, setIsActivarCuentaRecepcion] = useState(true);
    const [isActivarAgregarFormaRecepcion, setIsActivarAgregarFormaRecepcion] = useState(false);
    const [isActivarContinuarFormaRecepcion, setIsActivarContinuarFormaRecepcion] = useState(true);
    const [isFiltrarReinvercion, setIsFiltrarReinvercion] = useState(false);
    const [isActivarCuentaPago, setIsActivarCuentaPago] = useState(true);
    const [isChequeGerencia, setIsChequeGerencia] = useState(false);
    const [isActivarOficina, setIsActivarOficina] = useState(true);
    const [isActivarFormaPago, setIsActivarFormaPago] = useState(false);
    const [isVencido, setIsVencido] = useState(false);

    //const [inspektorReportMessage, setInspektorReportMessage] = useState('');
    const [rolesAsignados, setRolesAsignados] = useState(datos);
    const [validationMessage, setValidationMessage] = useState('');
    const [rolMessage, setRolMessage] = useState('');

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [messageConfirmModal, setMessageConfirmModal] = useState('');
    const [showModalInspektor, setShowModalInspektor] = useState(false);
    const [messageInspektor, setMessageInspektor] = useState('');

    const [showNotificacionModal, setShowNotificacionModal] = useState(false)
    const [messageNotificacionModal, setMessageNotificacionModal] = useState('');

    const [showModalTasaInteres, setShowModalTasaInteres] = useState(false)
    const [messageModalTasaInteres, setMessageModalTasaInteres] = useState('');

    const [showNotificacionFirmante, setShowNotificacionFirmante] = useState(false)
    const [messageNotificacionFirmante, setMessageNotificacionFirmante] = useState('');
    const [showModalSimulacion, setShowModalSimulacion] = useState(false);

    const [confimarModalEliminar, setConfimarModalEliminar] = useState(false);
    const [rolToDelete, setRolToDelete] = useState(null);
    const [rolOptions, setRolOptions] = useState([]);
    const [tipoPersonaOptions, setTipoPersonaOptions] = useState([]);
    const [tipoDocPjOptions, setTipoDocPjOptions] = useState([]);
    const [tipoDocPnOptions, setTipoDocPnOptions] = useState([]);
    const [dataReporte, setDataReporte] = useState([]);

    const [listaTipoSociedad, setListaTipoSociedad] = useState([]);
    const [listaProducto, setListaProducto] = useState([]);
    const [listaMoneda, setListaMoneda] = useState([]);
    //const [listaProductoBancario, setListaProductoBancario] = useState([]);
    const [listaCategoria, setListaCategoria] = useState([]);
    //const [listaTipoPromedio, setListaTipoPromedio] = useState([]);
    //const [listaTipoCapitalizacion, setListaTipoCapitalizacion] = useState([]);
    const [listaOrigen, setListaOrigen] = useState([]);
    const [listaOficiales, setListaOficiales] = useState([]);
    //const [listaTitularidad, setListaTitularidad] = useState([]);
    //const [listaCorrientePj, setListaCorrientePj] = useState([]);
    //const [listaAhorroPj, setListaAhorroPj] = useState([]);
    //const [listaMotivoAhorro, setListaMotivoAhorro] = useState([]);
    //const [listaTipoFrecuencia, setListaTipoFrecuencia] = useState([]);
    //const [listaTipoVencimiento, setListaTipoVencimiento] = useState([]);
    //const [listaOficina, setListaOficina] = useState([]);
    //const [listaTipoServicio, setListaTipoServicio] = useState([]);
    const [listaFormaPago, setListaFormaPago] = useState([]);
    const [listaFrecuenciaPago, setListaFrecuenciaPago] = useState([]);
    //const [safeListaFrecuenciaPago, setSafeListaFrecuenciaPago] = useState([]);
    const [listaSiNo, setListaSino] = useState([]);
    const [listaTipoCuenta, setLisTipoCuenta] = useState([]);
    const [listaOficinasFisicas, setListaOficinasFisicas] = useState([]);
    const [listaRazonApertura, setListaRazonApertura] = useState([]);
    const [listaFormaRecepcionPago, setListaFormaRecepcionPago] = useState([]);
    const [listaCuentas, setListaCuentas] = useState([]);
    const [listaCuentasPago, setListaCuentasPago] = useState([]);
    const [listaFormaPagoInteres, setListaFormaPagoInteres] = useState([]);

    const [activarAgregar, setActivarAgregar] = useState(true);
    const [dataPlazo, setDataPlazo] = useState([]);
    const [mensajePlazo, setMensajePlazo] = useState('');
    const [minimos, setMinimos] = useState(0);
    const [maximos, setMaximos] = useState(0);
    const [montominimo, setMontominimo] = useState('');
    const [mensajeResultadoSimulador, setMensajeResultadoSimulador] = useState('');
    const [formaRecepcionAsignada, setFormaRecepcionAsignada] = useState([]);

    const prevListFrecuenciaPago = useRef();
    const prevListFormaRecpcion = useRef();
    const diferir = useRef(false);

    const initFormOperacion = {
        producto: '',
        formaPago: '',
        frecuenciaPago: '',
        capitalizaInteres: 0,
        categoria: 'NOM',
        monto: '',
        moneda: 0,
        checkInteres: false,
        tasaInteres: '',
        plazo: '',
        fechaActivacion: '',
        fechaVencimiento: '',
        instruccionEspecial: '',
        desmaterializado: '',
        tipoCuenta: 'O',
        oficial: '',
        oficina: '',
        origen: '',
        razonApertura: ''
    };

    const initDataSimulador = {
        tasaInteres: '',
        totalInteres: '',
        isr: '',
        montoProximoPago: '',
        fechaProximoPago: '',
        numeroPagos: ''
    };

    const initFormFormaRecepcion = {
        formaRecepcion: '',
        fr_moneda: '0',
        fr_cuenta: '',
        fr_monto: '',
        totalRecibir: ''
    };

    const initFormFormaPago = {
        fp_formaPago: '',
        fp_monto: '',
        fp_cuenta: '',
        totalPagar: '',
        fp_oficinaChequeGerencia: ''
    };

    const [formOperacion, setFormOperacion] = useState(initFormOperacion);
    const [formSimulador, setFormSimulador] = useState(initDataSimulador);
    const [formFormaRecepcion, setFormFormaRecepcion] = useState(initFormFormaRecepcion);
    const [formFormaPago, setFormFormaPago] = useState(initFormFormaPago);


    //Cancelar o Finalizar Operacion
    const cancelarOperacion = () => {
        setRecursosText('');
        setShowDescarga(false);
        localStorage.removeItem('dataContrato');
        setFormaRecepcionAsignada([]);
        setRolesAsignados([]);
        setFormOperacion(initFormOperacion);
        setFormSimulador(initDataSimulador);
        setFormFormaRecepcion(initFormFormaRecepcion);
        setFormFormaPago(initFormFormaPago);
        setActivarAgregar(true);
        setIsClientActive(false);
        setIsClientProspect(false);
        setIsCreado(false);
        setIsSimulacion(false);
        setIsNValorValido(false);
        setIsNPlazoValido(false);
        //setIsClientReportedInspektor(false);
        setIsSolicitaFirmante(true);
        setIsTasaEspecial(true);
        setIsDesmaterializado(true);
        setIsActivarFrecuenciaPago(true);
        setIsFlexirenta(false);
        setIsChecked(false);
        setIsActivarCuentaRecepcion(true);
        setIsActivarAgregarFormaRecepcion(false);
        setIsActivarContinuarFormaRecepcion(true);
        setIsFiltrarReinvercion(false);
        setIsActivarCuentaPago(true);
        setIsChequeGerencia(false);
        setIsActivarOficina(true);
        setIsActivarFormaPago(false);
        setTipoCompania('');
        setRolMessage('');
        setDataPlazo([]);
        setDataReporte([]);
        setMensajeResultadoSimulador('');
        setFormaRecepcionAsignada([]);

        /* const listaRol = localStorage.getItem('listRol');
        setRolOptions(JSON.parse(listaRol)); */
        localStorage.removeItem('controlRol');
        localStorage.removeItem('listRol');
        localStorage.removeItem('rolFiltrados');
        localStorage.removeItem('administradorConsorcio');
        localStorage.removeItem('titularConsorcio');
        localStorage.removeItem('tipoCompania');

        setActivarTab(0);
    };

    /* Cargando Datos Consulta */
    useEffect(() => {
        if (diferir.current) {
            if (dataDepositoPlazo.status === 200) {
                cancelarOperacion();
                setDataPlazo(dataDepositoPlazo.data || []);
                setActivarAgregar(false);
                return;
            };
            if (dataDepositoPlazo.status === 204 || dataDepositoPlazo.status === 205) {
                cancelarOperacion();
                setDataPlazo([]);
                setActivarAgregar(false);
                return;
            };

            cancelarOperacion();
            setDataPlazo([]);
            setActivarAgregar(true);

        } else {
            diferir.current = true;
            cancelarOperacion();
            setDataPlazo([]);
            setActivarAgregar(true);
        };

    }, [dataDepositoPlazo]);


    const loadOptions = async () => {
        try {
            setShowLoading(true);
            const { listarRolPropietarios, listarTipoCliente, listTipoDocumentoPj,
                listTipoDocumentoPn
            } = JSON.parse(await fn_catalogosPropietarios());
            const { listProductoCDT, listFormaPago, listSiNo, listTipoMoneda, listOficiales,
                listOficinasFisicas, listFrecuenciaPago, listCategoriaPlazo, listTipoCuenta,
                listOrigenFondos, listRazonApertura, listFormaRecepcionPago

            } = JSON.parse(await catalogoPropietario());

            setRolOptions(listarRolPropietarios);
            setTipoPersonaOptions(listarTipoCliente);
            setTipoDocPjOptions(listTipoDocumentoPj);
            setTipoDocPnOptions(listTipoDocumentoPn);
            setShowLoading(false);
            setListaProducto(listProductoCDT);
            setListaFormaPago(listFormaPago);
            setListaFrecuenciaPago(listFrecuenciaPago);
            setListaSino(listSiNo);
            setListaCategoria(listCategoriaPlazo);
            setListaMoneda(listTipoMoneda.filter(item => ['0'].includes(item.code)));
            setLisTipoCuenta(listTipoCuenta);
            setListaOficiales(listOficiales);
            setListaOficinasFisicas(listOficinasFisicas);
            setListaOrigen(listOrigenFondos);
            setListaRazonApertura(listRazonApertura);
            setListaFormaRecepcionPago(listFormaRecepcionPago);
            setListaFormaPagoInteres(listFormaRecepcionPago);
            prevListFrecuenciaPago.current = listFrecuenciaPago;
            prevListFormaRecpcion.current = listFormaRecepcionPago;

            //setListaTipoPromedio(listarTipoPromedio);
            //setListaTipoCapitalizacion(listarTipoCapitalizacion);            
            //setListaTitularidad(listTitularidad);
            //setListaCorrientePj(listCorrientePj);
            //setListaAhorroPj(listAhorroPj);

        } catch (error) {
            console.log(error);
            setShowLoading(false);
        };
    };


    useEffect(() => {
        loadOptions();
    }, []);


    const onClickTab = async (e, tab) => {
        e.preventDefault();

        if (isCreado) {
            return;
        };

        if (tab === 1) {
            if (activarAgregar) {
                return;
            };
            setActivarTab(tab);
            await goOnPropietarios();
            return;
        };
        if (tab === 2) {
            if (rolesAsignados.length > 0) {
                setActivarTab(tab);
                return;
            };
            return;
        };
        if (tab === 3) {
            if (isSimulacion) {
                setActivarTab(tab);
                if (isFiltrarReinvercion) {
                    //filtrar lista forma de pago
                    const filtrarFormaRecepcionPago = listaFormaRecepcionPago.filter(reinversion => ['REINVCAP', 'REINVINT'].includes(reinversion.code.trim()));
                    setListaFormaRecepcionPago(filtrarFormaRecepcionPago);
                    setActivarTab(tab);
                } else {
                    setListaFormaRecepcionPago(prevListFormaRecpcion.current);
                    setActivarTab(tab);
                };

                if (formaRecepcionAsignada.length === 0) {
                    setFormFormaRecepcion((state) => ({
                        ...state,
                        totalRecibir: formOperacion.monto
                    }));
                };

                return;
            };

            return;
        };
        if (tab === 4) {
            if (isActivarFormaPago) {
                setFormFormaPago((state) => ({
                    ...state,
                    totalPagar: formSimulador.totalInteres,
                    fp_monto: formSimulador.totalInteres
                }))
                setActivarTab(tab);
                return;
            };
            return;
        };

        setActivarTab(tab);
    };


    const calculoFechas = async (pCustonId) => {
        setShowLoading(true);
        try {
            const rawFechaDia = JSON.parse(await fn_consultarFechaCorte(pCustonId));
            if (rawFechaDia.status !== 200) {
                throw ('No fue posible generar la fecha de inicio y corte');
            };

            setShowLoading(false);

            setFormAsignar(prev => ({
                ...prev,
                fechaInicio: rawFechaDia.fechaInicio
            }));

            setFormAsignar(prev => ({
                ...prev,
                numeroDia: rawFechaDia.dia
            }));


        } catch (error) {
            console.log(error)
            setShowLoading(false);
            setMessageNotificacionModal(error);
            setShowNotificacionModal(true);
        };
    };


    const handleRolChange = (e) => setRol(e.target.value);


    const handleTipoPersonaChange = (e) => {
        setTipoPersona(e.target.value);
        setTipoDocumento('');
        setNumeroDocumento('');
        setNombreCliente('');
        //setTipoCompania('');
        //setClientParticipanteTipo('');
        setValidationMessage('');
        setIsClientActive(false);
        setIsClientProspect(false);
        //setIsClientReportedInspektor(false);
        //setInspektorReportMessage('');
    };


    const handleTipoDocumentoChange = (e) => {
        setTipoDocumento(e.target.value);
        setNumeroDocumento('');
        setNombreCliente('');
        //setTipoCompania('');
        //setClientParticipanteTipo('');
        setValidationMessage('');
        setIsClientActive(false);
        setIsClientProspect(false);
        //setIsClientReportedInspektor(false);
        //setInspektorReportMessage('');
    };


    const handleNumeroDocumentoChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        let maxLength = 10;

        if (tipoDocumento === 'NIT') {
            maxLength = 9;
        };

        if (value.length <= maxLength) {
            setNumeroDocumento(value);
            setValidationMessage('');
        } else {
            setValidationMessage(`El número de documento no puede tener más de ${maxLength} dígitos.`);
        };

        setNombreCliente('');
        //setTipoCompania('');
        //setClientParticipanteTipo('');
        setIsClientActive(false);
        setIsClientProspect(false);
        //setIsClientReportedInspektor(false);
        //setInspektorReportMessage('');
    };


    const servicioInspektor = async (pDatosGenerales) => {
        const operationData = {
            "documentType": pDatosGenerales.identificationType,
            "documentNumber": pDatosGenerales.identification
        };
        const validarDocumentosListasRestrictivas = JSON.parse(await fnInspektor(JSON.stringify(operationData)));
        return validarDocumentosListasRestrictivas;
    };


    const handleSearch = async () => {

        if (!tipoDocumento || !numeroDocumento) {
            setValidationMessage('Por favor, seleccione el tipo y número de documento para buscar.');
            return;
        };

        setValidationMessage('');
        setNombreCliente('');
        //setTipoCompania('');
        //setClientParticipanteTipo('');
        setIsClientActive(false);
        setIsClientProspect(false);
        //setIsClientReportedInspektor(false);
        //setInspektorReportMessage('');

        const dataBuscarCliente = {
            "identification": numeroDocumento,
            "identificationType": tipoDocumento,
            "customerType": tipoPersona == 2 ? 'PJ' : 'PN'
        };

        try {

            setShowLoading(true);
            const cliente = JSON.parse(await (tipoPersona == 2 ? queryClientePj(JSON.stringify(dataBuscarCliente)) : queryClientePn(JSON.stringify(dataBuscarCliente))));
            setShowLoading(false);

            if (cliente.state == 200) {

                // Check Inspektor report
                setShowLoading(true);
                const resInspektor = await servicioInspektor(dataBuscarCliente);
                setShowLoading(false);

                if (!resInspektor.authorized) {
                    const listReference = resInspektor.listReference;
                    setValidationMessage(resInspektor.message);
                    setMessageInspektor(resInspektor.message);
                    setDataReporte(JSON.parse(listReference));
                    setShowModalInspektor(true);
                    return;
                };


                const data = (JSON.parse(cliente.data));
                setConsultaClientePjPn(data);


                if (dataBuscarCliente.customerType === 'PJ') {
                    if (+data.datosBasicos.datosGenerales.tipoSociedad === 20) {
                        localStorage.removeItem('administradorConsorcio');
                        localStorage.removeItem('titularConsorcio');
                        localStorage.removeItem('tipoCompania');
                        localStorage.setItem('administradorConsorcio', JSON.stringify(data.datosBasicos.administradorConsorcio));
                        localStorage.setItem('titularConsorcio', JSON.stringify(data.datosBasicos.titularConsorcio));
                        localStorage.setItem('tipoCompania', +data.datosBasicos.datosGenerales.tipoSociedad)
                    };
                };


                if (tipoPersona == 2) {

                    const { reference, datosGenerales } = (JSON.parse(cliente.data).datosBasicos);
                    //setTipoCompania(datosGenerales?.tipoSociedad);

                    if (!reference.codStatusCliente == 'A' || !reference.codStatusCliente == 'P') {
                        setValidationMessage('La creación de productos requiere que el ID sea cliente o prospecto – Menú Clientes.');
                        return;
                    };


                    setNombreCliente(datosGenerales.razonSocial);
                    // setTipoCompania(datosGenerales.tipoSociedad || '');
                    // setClientParticipanteTipo(clientData.participanteTipo || ''); // Store the participant type
                    setIsClientActive(reference.codStatusCliente == 'A');
                    setIsClientProspect(reference.codStatusCliente == 'P');
                    // setIsClientReportedInspektor(clientData.isReportedInspektor);
                    // setInspektorReportMessage(clientData.inspektorMessage || '');
                    return;
                };


                if (tipoPersona == 1) {
                    const { datosBasicos } = (JSON.parse(cliente.data));
                    setNombreCliente(`${datosBasicos?.informacionGenerales?.primerNombre || ''} ${datosBasicos?.informacionGenerales?.primerApellido || ''}`);
                    // setTipoCompania(datosGenerales.tipoSociedad || '');
                    // setClientParticipanteTipo(clientData.participanteTipo || ''); // Store the participant type
                    setIsClientActive(datosBasicos?.reference?.codStatusCliente == 'A');
                    setIsClientProspect(datosBasicos?.reference?.codStatusCliente == 'P');
                    // setIsClientReportedInspektor(clientData.isReportedInspektor);
                    // setInspektorReportMessage(clientData.inspektorMessage || '');
                    return;
                };
            };


            if (cliente.state != 200) {
                setValidationMessage('Propietario debe ser creado como prospecto en Menú Clientes.')
                return;
            };

        } catch (error) {
            console.log('error consulta', error);
            setShowLoading(false);
        };
    };


    const handleAddPropietario = async () => {

        if (!rol || !tipoPersona || !tipoDocumento || !numeroDocumento || !nombreCliente) {
            setValidationMessage('Por favor, complete todos los campos y busque un cliente válido antes de adicionar.');
            return;
        };

        if (rolesAsignados.length === 0 && rol !== 'T') {
            setValidationMessage('El primer rol a insertar debe ser "Titular".');
            return;
        };

        let referencia = '';
        let phone = '';
        let ciudadExp = '';

        if (tipoPersona == 2) {
            const isPJ = tipoPersona == 2;
            const hasTitular = rolesAsignados.some(r => r.rol === 'T');

            if (isPJ && rol === 'T' && hasTitular) {
                setValidationMessage('Solo se permite un "Titular" para clientes de tipo Jurídica.');
                return;
            };

            const { reference, datosGenerales } = consultaClientePjPn.datosBasicos;
            const isConsorcioCompany = tipoCompania == 20;
            const isFirmanteOrSecundario = rol === 'F' || rol === 'S';

            if (isFirmanteOrSecundario && isConsorcioCompany) {

                const tAdministradorConsorcio = JSON.parse(localStorage.getItem('administradorConsorcio'));
                const tTitularConsorcio = JSON.parse(localStorage.getItem('titularConsorcio'));

                const consoricio = tAdministradorConsorcio.some(item => {
                    return item.CustomerReference.includes(reference.referenciaCliente);
                });

                const titular = tTitularConsorcio.some(item => {
                    return item.CustomerReference.includes(reference.referenciaCliente);
                });

                if ((!consoricio) && (!titular)) {
                    setValidationMessage('Propietario debe ser Participante del Titular del Consorcio – Opción Clientes.');
                    return;
                }
            };

            /* parametros administrador*/
            if (rol === 'T') {

                if (datosGenerales?.tipoSociedad === null) {
                    setValidationMessage('Propietario no tiene un tipo de compañia definida.');
                    return;
                };

                setTipoCompania(datosGenerales?.tipoSociedad);
                const dataTipoCompania = {
                    "pTipoPersona": tipoPersona,
                    "pTipoCompania": datosGenerales?.tipoSociedad
                };

                const rParametros = await parametrosTipoCompania(dataTipoCompania);

                if (!rParametros) {
                    setValidationMessage('Tipo de compañia no cuenta con controles administrativos.');
                    return;
                };
            };

            referencia = reference.referenciaCliente;
        };

        if (tipoPersona == 1) {
            const hasTitular = rolesAsignados.some(r => r.rol === 'T');

            if (rol === 'T') {
                if (hasTitular && rolesAsignados[0].tipoDocumento === 'NIT') {
                    setValidationMessage('Solo se permite un "Titular" para clientes de tipo Jurídica.');
                    return;
                };
            };

            if (rol === 'T' && !hasTitular) {
                const dataTipoCompania = {
                    "pTipoPersona": tipoPersona,
                    "pTipoCompania": null
                };

                const rParametros = await parametrosTipoCompania(dataTipoCompania);

                if (!rParametros) {
                    setValidationMessage('Tipo persona no cuenta con controles administrativos.');
                    return;
                };
            };

            const { datosBasicos } = consultaClientePjPn;
            const titularIsConsorcio = localStorage.getItem('tipoCompania');

            if (+titularIsConsorcio === 20) {

                const tAdministradorConsorcio = JSON.parse(localStorage.getItem('administradorConsorcio'));
                const tTitularConsorcio = JSON.parse(localStorage.getItem('titularConsorcio'));

                const consoricio = tAdministradorConsorcio.some(item => {
                    return item.CustomerReference.includes(datosBasicos?.reference?.codigoCliente);
                });

                const titular = tTitularConsorcio.some(item => {
                    return item.CustomerReference.includes(datosBasicos?.reference?.codigoCliente);
                });

                if ((!consoricio) && (!titular)) {
                    setValidationMessage('Propietario debe ser Participante del Titular del Consorcio – Opción Clientes.');
                    return;
                }
            };

            referencia = datosBasicos?.reference?.codigoCliente;
            phone = datosBasicos?.contactoTelefonico[0]?.numero;
            ciudadExp = datosBasicos?.informacionGenerales?.ciudadNacimiento;
        };

        const isDuplicate = rolesAsignados.some(
            (item) => item.tipoDocumento === tipoDocumento && item.numeroDocumento === numeroDocumento
        );

        if (isDuplicate) {
            setValidationMessage('Este propietario ya ha sido asignado.');
            return;
        };


        const newId = rolesAsignados.length > 0 ? Math.max(...rolesAsignados.map(r => r.id)) + 1 : 1;
        const newPropietario = {
            id: newId,
            rol: rol,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            nombreCliente: nombreCliente,
            custonReference: referencia,
            tipoPersona: tipoPersona,
            tipoCompania: tipoCompania,
            phoneNumero: phone,
            ciudadExp: ciudadExp
        };
        setRolesAsignados([...rolesAsignados, newPropietario]);

        setRol('');
        setTipoPersona('');
        setTipoDocumento('');
        setNumeroDocumento('');
        setNombreCliente('');
        setRolMessage('');
        //setClientParticipanteTipo('');
        setValidationMessage('');
        setIsClientActive(false);
        setIsClientProspect(false);
        //setIsClientReportedInspektor(false);
        //setInspektorReportMessage('');
        setConsultaClientePjPn([]);
    };


    const handleDeleteClick = (id) => {
        const roleToDelete = rolesAsignados.find(r => r.id === id);
        if (roleToDelete && roleToDelete.rol === 'T') {
            setRolToDelete(roleToDelete);
            setConfimarModalEliminar(true);
        } else {
            setRolesAsignados(rolesAsignados.filter(r => r.id !== id));
        };
    };


    const deleteRowFormaPago = (id, e) => {
        e.preventDefault();
        const toDelete = formaRecepcionAsignada.find(r => r.id === id);
        const cleanToDeleteMonto = prepararMonto(toDelete?.fr_monto);
        const cleanTotalRecibir = prepararMonto(formFormaRecepcion.totalRecibir);
        const totalSumRecibir = (parseFloat(cleanToDeleteMonto) + parseFloat(cleanTotalRecibir));

        const totalSumRecibirFormateado = totalSumRecibir
            ? new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
            }).format(Number(totalSumRecibir))
            : '$0.00';

        setFormFormaRecepcion((state) => ({
            ...state,
            totalRecibir: totalSumRecibirFormateado
        }));

        setFormaRecepcionAsignada(formaRecepcionAsignada.filter(delt => delt.id !== id));
        setIsActivarAgregarFormaRecepcion(false);
        setIsActivarContinuarFormaRecepcion(true);
    };


    const confirmDelete = (confirmed) => {
        if (confirmed && rolToDelete) {
            if (rolToDelete.rol === 'T') {
                cancelarOperacion();
                setValidationMessage('El Titular y todos los propietarios asociados han sido eliminados.');
            }
        };
        setConfimarModalEliminar(false);
        setRolToDelete(null);
    };


    const confirmarTasaInteres = (pEstado) => {
        if (pEstado) {
            setIsTasaEspecial(false);
            setIsChecked(true);
            setShowModalTasaInteres(false);
            return;
        };

        setShowModalTasaInteres(false);
        setFormOperacion((state) => ({
            ...state,
            checkInteres: ''
        }));
    };


    const confirmarFirmante = (pEstado) => {
        if (pEstado) {
            setIsSolicitaFirmante(false);
            setActivarTab(1)
            setShowNotificacionFirmante(false);
            return;
        };

        setShowNotificacionFirmante(false);
        setIsSolicitaFirmante(false);
    };


    const confirmSimulacion = (pEstado) => {
        if (pEstado) {
            setActivarTab(3);
            setShowModalSimulacion(false);

            if (isFiltrarReinvercion) {
                //filtrar lista forma de pago
                const filtrarFormaRecepcionPago = listaFormaRecepcionPago.filter(reinversion => ['REINVCAP', 'REINVINT'].includes(reinversion.code.trim()));
                setListaFormaRecepcionPago(filtrarFormaRecepcionPago);
            } else {
                setListaFormaRecepcionPago(prevListFormaRecpcion.current);
            };

            if (formaRecepcionAsignada.length === 0) {
                setFormFormaRecepcion((state) => ({
                    ...state,
                    totalRecibir: formOperacion.monto
                }));
            };

            return;

        };

        setIsSimulacion(false);
        setShowModalSimulacion(false);
    };


    const handleContinue = () => {
        setActivarTab(2);
        setValidationMessage('');
        setRolMessage('');
    };


    const noContinua = () => {
        const cRol = JSON.parse(localStorage.getItem('controlRol'));
        setRolMessage(cRol.mensaje);
    }

    const continueFormaRecepcion = () => {
        setFormFormaPago((state) => ({
            ...state,
            totalPagar: formSimulador.totalInteres,
            fp_monto: formSimulador.totalInteres
        }))

        setActivarTab(4);
    };


    const isAddButtonEnabled =
        rol &&
        tipoPersona &&
        tipoDocumento &&
        numeroDocumento &&
        nombreCliente &&
        (isClientActive ||
            isClientProspect)
    // !isClientReportedInspektor &&
    // validationMessage === ''; 


    const endModal = () => setShowConfirmModal(false);
    const endModalInspektor = () => setShowModalInspektor(false);
    const endNotificacionModal = () => setShowNotificacionModal(false);


    const endModalCuentaMaestra = () => {
        /* if (isCreado) {
            cancelarOperacion();
            setShowConfirmModal(false);
            return;
        }; */

        endModal();
    };


    const crearCDT = async (e) => {
        e.preventDefault();
        const formId = document.getElementById('formPagos');
        const validoForm = validacionFormulario(formId);

        if (validoForm) {
            setShowLoading(true);
            const rawData = {
                'rawPropietarios': rolesAsignados,
                'rawOperacion': formOperacion,
                'rawRecepcion': formaRecepcionAsignada,
                'rawPagos': formFormaPago,
                'rawSimulador': formSimulador
            };

            const crearCDT = JSON.parse(await fn_orquestadorCrearCDT(JSON.stringify(rawData)));
            rawData.ncuenta = crearCDT?.operation?.termDepositArrangement?.Deposit?.AccountIdentifier;
            rawData.codeCuenta = crearCDT?.operation?.termDepositArrangement?.Deposit?.Code;
            rawData.usu = crearCDT?.usu;

            if (+crearCDT.status !== 200) {
                setShowLoading(false);
                setMessageConfirmModal(crearCDT?.message);
                setShowConfirmModal(true);
                return;
            };

            setShowLoading(false);
            setMessageConfirmModal(`${crearCDT?.message} - Code: ${crearCDT?.operation?.termDepositArrangement?.Deposit.Code} - Number: ${crearCDT?.operation?.termDepositArrangement?.Deposit.AccountIdentifier}`);
            setShowConfirmModal(true);
            setIsCreado(true);
            setShowDescarga(true);
            await preparandoDataContrato(rawData);
        };
    };


    const validacionFormulario = (formId) => {
        if (formId) {
            if ((!formId.checkValidity())) {
                formId.reportValidity()
                return false
            };
        };

        return true;
    };


    const preparandoDataContrato = async (rawData) => {
        const dataContrato = {
            "oficina": fOficina(rawData.rawOperacion.oficina),
            "producto": rawData.ncuenta,
            "fechaApertura": fFechaApertura(new Date()),
            "titular": rawData.rawPropietarios[0].nombreCliente,
            "identificacion": rawData.rawPropietarios[0].numeroDocumento,
            "tipoCuenta": fTipoCuenta(rawData.rawOperacion.tipoCuenta),
            "monto": rawData.rawOperacion.monto,
            "plazo": rawData.rawOperacion.plazo,
            "tasaNominal": rawData.rawOperacion.tasaInteres,
            "fechaVencimiento": fFechaApertura(rawData.rawOperacion.fechaVencimiento),
            "tasaEfectiva": rawData.rawSimulador.tasaInteres,
            "cuentaAbonoInteres": rawData.rawPagos.fp_cuenta,
            "formaPagoInteres": fFormaPago(rawData.rawPagos.fp_formaPago),
            "ciudadExpedicion": await ciudadExpedicion(rawData.rawPropietarios[0].tipoDocumento, rawData),
            "recepcion": rawData.rawRecepcion,
            "desmaterializado": rawData.rawOperacion.desmaterializado,
            "totalMonto": rawData.rawOperacion.monto,
            "recursos": ''
        };

        localStorage.removeItem('dataContrato');
        localStorage.setItem('dataContrato', JSON.stringify(dataContrato));
    };


    const fFechaApertura = (fecha) => {

        if (!fecha) return "";

        if (fecha instanceof Date) {
            return new Intl.DateTimeFormat("es-CO", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }).format(fecha).replace(/\//g, "-");
        }

        if (typeof fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            const [year, month, day] = fecha.split("-").map(Number);
            const date = new Date(year, month - 1, day);
            return new Intl.DateTimeFormat("es-CO", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }).format(date).replace(/\//g, "-");
        }

        return String(fecha);
    };


    const fOficina = (pOficina) => {
        const filtrarOficina = listaOficinasFisicas.filter(oficina => oficina.code === pOficina);
        return filtrarOficina[0].value;
    };


    const fTipoCuenta = (pTipoCuenta) => {
        const filtrarTipoCuenta = listaTipoCuenta.filter(tipoCuenta => tipoCuenta.code === pTipoCuenta);
        return filtrarTipoCuenta[0].value;
    };


    const fFormaPago = (pFormaPago) => {
        const filtrarFormaPago = listaFormaPagoInteres.filter(formaPago => formaPago.code === pFormaPago);
        return filtrarFormaPago[0].value;
    };


    const ciudadExpedicion = async (pTipoDocumento, pRawData) => {
        if (pTipoDocumento === 'NIT') {
            return 'No Aplica';
        };

        const rawCiudad = await queryListCiudades();
        let ciudad = '';

        if (typeof (rawCiudad) === 'string' && rawCiudad.length > 0) {
            const parsedCiudad = JSON.parse(rawCiudad).DATA;
            ciudad = parsedCiudad.filter(elemt => elemt.code === pRawData.rawPropietarios[0].ciudadExp)[0].value;
        };

        return ciudad[0].value;
    };


    const onChangeOperacion = async (e) => {
        const { value, name } = e.target
        setFormOperacion(state => ({
            ...state,
            [name]: value
        }));

        try {

            // Forma de Pago
            if (name === 'formaPago') {
                setFormOperacion((state) => ({
                    ...state,
                    frecuenciaPago: '',
                    plazo: ''
                }));
                if (value === 'VEN') {
                    setIsActivarFrecuenciaPago(true);
                    setIsVencido(true);
                    return;
                };

                setIsActivarFrecuenciaPago(false);
                setIsVencido(false);
                return;
            };

            // Producto
            if (name === 'producto') {
                setFormOperacion((state) => ({
                    ...state,
                    formaPago: '',
                    frecuenciaPago: '',
                    plazo: '',
                    monto: '',
                    checkInteres: '',
                    tasaInteres: '',
                    fechaActivacion: '',
                    fechaVencimiento: ''
                }));

                setIsTasaEspecial(true);
                setIsChecked(false);
                setFormOperacion((state) => ({
                    ...state,
                    tasaInteres: ''
                }));

                const Flexirenta_Vencido_FondoLiquidez = ['CDAT', 'CDTV', 'FDLV'];
                const IBR1_IBR3_IPC = ['VIBR1', 'VIBR3', 'VIPC3'];

                const isFlexirenta_Vencido_FondoLiquidez = Flexirenta_Vencido_FondoLiquidez.includes(value);
                const isIBR1_IBR3_IPC = IBR1_IBR3_IPC.includes(value);

                const rawMinimosMaximos = JSON.parse(await minimosMaximos(JSON.stringify(value)));

                setMinimos(rawMinimosMaximos?.data[0]?.valor_minimo);
                setMaximos(rawMinimosMaximos?.data[0]?.valor_maximo);

                if (isFlexirenta_Vencido_FondoLiquidez) {
                    setFormOperacion((state) => ({
                        ...state,
                        desmaterializado: '',
                    }));

                    setIsDesmaterializado(false);

                    if (value === 'CDAT') {
                        setFormOperacion((state) => ({
                            ...state,
                            formaPago: 'VEN',
                        }));
                        setIsFlexirenta(true);
                        setIsActivarFrecuenciaPago(true);
                        setIsFiltrarReinvercion(true);
                    } else {
                        setIsFlexirenta(false);
                        setIsActivarFrecuenciaPago(true);
                        setIsFiltrarReinvercion(false);
                    };

                    setMontominimo('300.000');
                    return;
                };

                if (isIBR1_IBR3_IPC) {
                    setFormOperacion((state) => ({
                        ...state,
                        desmaterializado: 1,
                        formaPago: 'PER',
                    }));

                    setIsFlexirenta(true);
                    setIsFiltrarReinvercion(false);
                    setIsDesmaterializado(true);
                    setMontominimo('100.000.000');

                    const isFirmante = rolesAsignados.some(firmante => firmante.rol === 'F');
                    if (!isFirmante) {
                        setMessageNotificacionFirmante('Para el producto seleccionado debe indicar un Firmante');
                        setShowNotificacionFirmante(true);
                    };

                    return;
                };

                return;
            };

            // Monto.
            /* if (name === 'monto') {
                const limpio = value.replace(/\./g, '').replace(/[^\d]/g, '');
                const formateado = limpio
                    ? new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                    }).format(Number(limpio))
                    : '';
                setFormOperacion((state) => ({
                    ...state,
                    [name]: formateado,
                }));
            } else {
                setFormOperacion((state) => ({
                    ...state,
                    [name]: value,
                }));
            }; */

            // Plazo
            if (name === 'plazo') {
                setFormOperacion((state) => ({
                    ...state,
                    frecuenciaPago: '',
                    fechaActivacion: '',
                    fechaVencimiento: ''
                }));

                setListaFrecuenciaPago(prevListFrecuenciaPago.current);
            };

            // Tasa de Interes
            if (name === 'checkInteres') {
                setFormOperacion((state) => ({
                    ...state,
                    checkInteres: e.target.checked,
                }));

                if (!formOperacion.checkInteres) {
                    setMessageModalTasaInteres(`¿Cliente tiene aprobada una tasa especial?`)
                    setShowModalTasaInteres(true);
                    return;
                };

                setIsTasaEspecial(true);
                setIsChecked(false);
                setFormOperacion((state) => ({
                    ...state,
                    tasaInteres: ''
                }));
            };

            if (name === 'tasaInteres') {
                const limpio = value.replace(/[^\d.]/g, '');
                setFormOperacion((state) => ({
                    ...state,
                    tasaInteres: limpio,
                }));
            };

            // Desmaterializado
            if (name === 'desmaterializado') {
                if (+value === 1) {
                    const isFirmante = rolesAsignados.some(firmante => firmante.rol === 'F');
                    if (!isFirmante) {
                        setMessageNotificacionFirmante('Para el tipo "SI" en Desmaterializado debe indicar un Firmante');
                        setShowNotificacionFirmante(true);
                        return;
                    };
                };
                return;
            };

        } catch (error) {
            console.log(error);
        };
    };


    const onChangeRecepcion = async (e) => {
        const { value, name } = e.target
        setFormFormaRecepcion((state) => ({
            ...state,
            [name]: value
        }));

        try {

            if (name === 'formaRecepcion') {
                setFormFormaRecepcion((state) => ({
                    ...state,
                    fr_cuenta: ''
                }));

                if (value.trim() === 'AHO' || value.trim() === 'CTE') {
                    setShowLoading(true);
                    setIsActivarCuentaRecepcion(false);
                    const filtrarRolesAsignados = rolesAsignados.filter(titular => titular.rol === 'T');

                    //Buscar cuentas
                    const dataBuscarClientePj = {
                        "identification": filtrarRolesAsignados[0]?.numeroDocumento,
                        "identificationType": filtrarRolesAsignados[0]?.tipoDocumento,
                        "acountType": value.trim()
                    };

                    const cuentaspPj = JSON.parse(await queryCuentas(JSON.stringify(dataBuscarClientePj)));

                    if (+cuentaspPj.state !== 200) {
                        setShowLoading(false);
                        setMessageNotificacionModal(cuentaspPj.message);
                        setShowNotificacionModal(true);
                        return;
                    };

                    setShowLoading(false);
                    setListaCuentas(cuentaspPj.data);
                    return;
                };

                setIsActivarCuentaRecepcion(true);
                return;
            };

            // Monto Forma de Recepción
            /* if (name === 'fr_monto') {
                const limpio = value.replace(/\./g, '').replace(/[^\d]/g, '');
                const formateado = limpio
                    ? new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                    }).format(Number(limpio))
                    : '';
                setFormFormaRecepcion((state) => ({
                    ...state,
                    [name]: formateado,
                }));

                return;
            }; */

        } catch (error) {
            console.log(error)
        };
    };


    const onChangePago = async (e) => {
        const { value, name } = e.target
        setFormFormaPago((state) => ({
            ...state,
            [name]: value
        }));

        try {

            if (name === 'fp_formaPago') {
                setIsActivarOficina(true);
                setIsChequeGerencia(false);
                setFormFormaPago((state) => ({
                    ...state,
                    fp_cuenta: '',
                    fp_oficinaChequeGerencia: ''
                }));

                if (value.trim() === 'AHO' || value.trim() === 'CTE') {
                    setShowLoading(true);
                    setIsActivarCuentaPago(false);

                    const filtrarRolesAsignados = rolesAsignados.filter(titular => titular.rol === 'T');

                    //Buscar cuentas
                    const dataBuscarClientePj = {
                        "identification": filtrarRolesAsignados[0]?.numeroDocumento,
                        "identificationType": filtrarRolesAsignados[0]?.tipoDocumento,
                        "acountType": value.trim()
                    };
                    const cuentaspPj = JSON.parse(await queryCuentas(JSON.stringify(dataBuscarClientePj)));

                    if (+cuentaspPj?.state !== 200) {
                        setShowLoading(false);
                        setMessageNotificacionModal(cuentaspPj?.message);
                        setShowNotificacionModal(true);
                        return;
                    };

                    setShowLoading(false);
                    setListaCuentasPago(cuentaspPj?.data);
                    return;
                };

                if (value.trim() === 'CHG') {
                    setIsActivarCuentaPago(true);
                    setIsActivarOficina(false);
                    setIsChequeGerencia(true);
                    return;
                };

                setIsActivarCuentaPago(true);
                return;
            };

        } catch (error) {
            console.log(error)
        };
    };


    const calcularFechaVencimiento = (fechaAprobacion, vigenciaDias) => {
        if (!fechaAprobacion || isNaN(vigenciaDias)) return "";

        const [anio, mes, dia] = fechaAprobacion.split('-').length === 3
            ? fechaAprobacion.split('-')
            : fechaAprobacion.split('-').reverse();

        const fecha = new Date(`${anio}-${mes}-${dia}T00:00:00`);
        fecha.setDate(fecha.getDate() + parseInt(vigenciaDias));

        const diaF = String(fecha.getDate()).padStart(2, '0');
        const mesF = String(fecha.getMonth() + 1).padStart(2, '0');
        const anioF = fecha.getFullYear();

        return `${anioF}-${mesF}-${diaF}`;
    };


    const onBlurNValor = async (e) => {
        e.preventDefault();
        const { value, name } = e.target;

        if (value === '') {
            setIsNValorValido(false);
            return;
        };

        setFormOperacion((state) => ({
            ...state,
            [name]: conversionPesos({ valor: value, nDecimales: 2 }),
        }));

        // Monto
        const cleanMontoMinimo = montominimo.replace(/\./g, '').replace(/[^\d]/g, '');
        let validacion = +value < parseFloat(cleanMontoMinimo);

        if (validacion) {
            setIsNValorValido(true);
        } else {
            setIsNValorValido(false);
        };
    };


    const onBlurTasaInteres = async (e) => {
        e.preventDefault();
        const { value } = e.target;

        if (value.length > 0) {

            const CleanValuePorcentage = limpiarPorcentage(value);

            const formatted = new Intl.NumberFormat("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(CleanValuePorcentage) + "%";

            setFormOperacion((state) => ({
                ...state,
                tasaInteres: formatted
            }));

            /* const isFirmante = rolesAsignados.some(firmante => firmante.rol === 'F');
            if (!isFirmante) {
                setMessageNotificacionFirmante('Para clientes con tasas de interes especiales, debe indicar un Firmante');
                setShowNotificacionFirmante(true);
            }; */
        };
    };

    const limpiarPorcentage = (pValor) => {
        if (typeof (pValor) === 'string' && pValor.length > 0) {
            const valorClean = pValor
                .replace('%', '')
                .replace(',', '.')
                .trim()
            return valorClean;
        };

        return null;

    };

    const onBlurNPlazo = async (e) => {
        e.preventDefault();
        const { value } = e.target;
        const isMenor = value < +minimos;
        const isMayor = value > +maximos;
        const productoValor = {};

        try {

            if (value === '') {
                setIsNPlazoValido(false);
                return;
            };

            //Campo Fecha de Activación
            const fechaActivacion = formatearFecha({ fecha: new Date().toISOString() });

            //Campo Fecha de Vencimiento
            const fechaVencimientoCalculada = calcularFechaVencimiento(fechaActivacion, +value);
            const fechaHabil = JSON.parse(await diaHabil(JSON.stringify({ fecha: fechaVencimientoCalculada })));
            const fechaVencimiento = formatearFecha({ fecha: fechaHabil.data });

            setFormOperacion((state) => ({
                ...state,
                fechaActivacion,
                fechaVencimiento
            }));

            // Campo Producto
            if (formOperacion.producto === 'CDAT') {
                if (isMayor) {
                    setMensajePlazo(`El plazo maximo no puede ser mayor a ${maximos} días`)
                    setIsNPlazoValido(true);
                    return;
                };
                setIsNPlazoValido(false);
                return;
            };

            if (formOperacion.producto === 'CDTV' || formOperacion.producto === 'FDLV') {
                if (isMenor) {
                    setMensajePlazo(`El plazo minimo para el producto seleccionado es de ${minimos} días`)
                    setIsNPlazoValido(true);
                    return;
                };

                if (isMayor) {
                    setMensajePlazo(`El plazo maximo no puede ser mayor a ${maximos} días`)
                    setIsNPlazoValido(true);
                    return;
                };

                productoValor.producto = formOperacion.producto;
                productoValor.plazo = value;

                const isDentroRangoTasaFija = JSON.parse(await rangosFrecuencias(JSON.stringify(productoValor)));
                if (!isDentroRangoTasaFija.dentroRango) {
                    setMensajePlazo(`Para el producto seleccionado no se aceptan valores irregulares`);
                    setIsNPlazoValido(true);
                    return;
                };

                //aplicarfiltro a frecuencia
                const rangosFrecuenciavalidos = isDentroRangoTasaFija.frecuencia.filter(Boolean);
                await aplicarfiltroFrecuenciaPago(rangosFrecuenciavalidos);

                setIsNPlazoValido(false);
                return;
            };

            if (formOperacion.producto === 'VIBR1' || formOperacion.producto === 'VIBR3' || formOperacion.producto === 'VIPC3') {
                if (isMenor) {
                    setMensajePlazo(`El plazo minimo para el producto seleccionado es de ${minimos} días`)
                    setIsNPlazoValido(true);
                    return;
                };

                if (isMayor) {
                    setMensajePlazo(`El plazo maximo no puede ser mayor a ${maximos} días`)
                    setIsNPlazoValido(true);
                    return;
                };

                productoValor.producto = formOperacion.producto;
                productoValor.plazo = value;

                const isDentroRangoTasaFija = JSON.parse(await rangosFrecuencias(JSON.stringify(productoValor)));
                if (!isDentroRangoTasaFija.dentroRango) {
                    setMensajePlazo(`Para el producto seleccionado no se aceptan valores irregulares`);
                    setIsNPlazoValido(true);
                    return;
                };

                //aplicarfiltro a frecuencia
                const rangosFrecuenciavalidos = isDentroRangoTasaFija.frecuencia.filter(Boolean);
                await aplicarfiltroFrecuenciaPago(rangosFrecuenciavalidos);

                setIsNPlazoValido(false);
                return;
            };

        } catch (error) {
            console.log(error);
        };
    };


    const onBlurFechaAvtvacion = async (e) => {
        e.preventDefault();
        try {
            const { value } = e.target;
            const fechaActivacion = formatearFecha({ fecha: value });

            const fechaVencimientoCalculada = calcularFechaVencimiento(fechaActivacion, +formOperacion.plazo);
            const fechaHabil = JSON.parse(await diaHabil(JSON.stringify({ fecha: fechaVencimientoCalculada })));
            const fechaVencimiento = formatearFecha({ fecha: fechaHabil.data });

            setFormOperacion((state) => ({
                ...state,
                fechaVencimiento
            }));

        } catch (error) {
            console.log(error);
        };
    };


    const aplicarfiltroFrecuenciaPago = async (rangosFrecuenciavalidos) => {
        if ((rangosFrecuenciavalidos.length > 1) && (isVencido)) {
            setIsActivarFrecuenciaPago(true);
            setFormOperacion((state) => ({
                ...state,
                frecuenciaPago: '',
            }));
            return;
        } else if ((rangosFrecuenciavalidos.length > 1) && (!isVencido)) {
            setIsActivarFrecuenciaPago(false);
            const filterListFrecuenciaPago = listaFrecuenciaPago.filter(listFrePag => rangosFrecuenciavalidos.toString().includes(listFrePag.code));
            setListaFrecuenciaPago(filterListFrecuenciaPago);
            return;
        };

        if (isVencido) {
            setFormOperacion((state) => ({
                ...state,
                frecuenciaPago: '',
            }));
            return;
        };

        setListaFrecuenciaPago(listaFrecuenciaPago);
        setFormOperacion((state) => ({
            ...state,
            frecuenciaPago: rangosFrecuenciavalidos[0],
        }));

        setIsActivarFrecuenciaPago(true);
        return;
    };


    const navegacionPestanas = async (e) => {
        e.preventDefault();

        if (e.target.id === 'p0') {
            setActivarTab(1);
            await goOnPropietarios();
            return;
        };
        if (e.target.id === 'p1') {
            setActivarTab(0);
            return;
        };
        if (e.target.id === 'p3') {
            setActivarTab(2);
            return;
        };
        if (e.target.id === 'p4') {
            setActivarTab(3);
            return;
        };
    };


    const finalizar = (e) => {
        e.preventDefault();
        cancelarOperacion();
    };


    const parametrosTipoCompania = async (pDataTipoCompania) => {
        setShowLoading(true);
        const resParametrosTipoCompania = JSON.parse(await fnQueryAgrupacionTipoCompaniaFiltro(JSON.stringify(pDataTipoCompania)));

        if (resParametrosTipoCompania?.STATUS !== 200) {
            setShowLoading(false);
            return false;
        };

        const rawDataRol = {
            "pGrupo": resParametrosTipoCompania?.DATA[0]?.codAgrupador
        };

        const resRol = JSON.parse(await fnQueryAgrupacionRolFiltro(JSON.stringify(rawDataRol)));
        setShowLoading(false);

        if (resRol?.STATUS === 200) {
            localStorage.removeItem('controlRol');
            localStorage.setItem('controlRol', JSON.stringify(resRol?.DATA[0]));
            await controlRol();
        };

        return true;

    };


    const controlRol = async () => {
        localStorage.removeItem('listRol');
        localStorage.setItem('listRol', JSON.stringify(rolOptions));

        const dataRol = JSON.parse(localStorage.getItem('controlRol'));
        const objEliminar = [];

        if (dataRol.titular === 3) {
            objEliminar.push('T');
        };

        if (dataRol.secundario === 3) {
            objEliminar.push('S');
        };

        if (dataRol.firmante === 3) {
            objEliminar.push('F');
        };

        if (dataRol.cotitular === 3) {
            objEliminar.push('C');
        };

        const rolFiltrados = rolOptions.filter(item => !objEliminar.includes(item.code));
        localStorage.setItem('rolFiltrados', JSON.stringify(rolFiltrados));
        setRolOptions(rolFiltrados);
    };


    const descargarPdf = async () => {
        setShowRecursosModal(false);
        const rawDataContrato = JSON.parse(localStorage.getItem('dataContrato'));
        rawDataContrato.recursos = recursosText;
        let contenidoDoc = {};

        contenidoDoc = JSON.parse(await fnQueryActaContratos(JSON.stringify({ pNombreActa: 'aperturaCDTCDAT' })));

        const blob = await pdf(
            <CdtPDF
                datosCuenta={{
                    oficina: rawDataContrato?.oficina,
                    producto: rawDataContrato?.producto,
                    fechaApertura: rawDataContrato?.fechaApertura,
                    nombre: rawDataContrato?.titular,
                    identificacion: rawDataContrato?.identificacion,
                    tipoCuenta: rawDataContrato?.tipoCuenta,
                    monto: rawDataContrato?.monto,
                    plazo: rawDataContrato?.plazo,
                    tasaNominal: rawDataContrato?.tasaNominal,
                    fechaVencimiento: rawDataContrato?.fechaVencimiento,
                    tasaEfectiva: rawDataContrato?.tasaEfectiva,
                    cuentaAbonoInteres: rawDataContrato?.cuentaAbonoInteres,
                    formaPagoInteres: rawDataContrato?.formaPagoInteres,
                    ciudad: rawDataContrato?.ciudadExpedicion,
                    recursos: rawDataContrato?.recursos,
                    desmaterializado: rawDataContrato?.desmaterializado,
                    totalMonto: rawDataContrato?.totalMonto
                }}
                formaRecepcion={{
                    recepcion: rawDataContrato?.recepcion
                }}
                contenido={{
                    logo: contenidoDoc?.data[0]?.logo,
                    vigilado: contenidoDoc?.data[0]?.vigilado,
                    fogafin: contenidoDoc?.data[0]?.fogafin,
                    text1: contenidoDoc?.data[0]?.text1,
                    text2: contenidoDoc?.data[0]?.text2,
                    text3: contenidoDoc?.data[0]?.text3,
                    text4: contenidoDoc?.data[0]?.text4,
                    text5: contenidoDoc?.data[0]?.text5,
                    text6: contenidoDoc?.data[0]?.text6,
                    text7: contenidoDoc?.data[0]?.text7,
                    text8: contenidoDoc?.data[0]?.text8,
                    text9: contenidoDoc?.data[0]?.text9,
                }}
            />
        ).toBlob();

        const blobUrl = URL.createObjectURL(blob);

        const win = window.open(blobUrl, '_blank', 'noopener,noreferrer');
        if (win) {
            const interval = setInterval(() => {
                if (win.closed) {
                    clearInterval(interval);
                    URL.revokeObjectURL(blobUrl);
                }
            }, 1000);
        }
    };


    const solicitarRecursos = (e) => {
        e?.preventDefault?.();
        setShowRecursosModal(true);
    };


    const goOnPropietarios = async () => {
        const isTitular = rolesAsignados.some(rol => rol.rol === 'T');
        if (!isTitular) {
            const newId = rolesAsignados.length > 0 ? Math.max(...rolesAsignados.map(r => r.id)) + 1 : 1;
            const newPropietario = {
                id: newId,
                rol: dataDepositoPlazo?.customer?.rol,
                tipoDocumento: dataDepositoPlazo?.customer?.partyIdentificationType,
                numeroDocumento: dataDepositoPlazo?.customer?.partyIdentification,
                nombreCliente: dataDepositoPlazo?.customer?.customerName,
                custonReference: dataDepositoPlazo?.customer?.customerReference,
                tipoPersona: dataDepositoPlazo?.customer?.customerType,
                tipoCompania: dataDepositoPlazo?.customer?.profileType,
                phoneNumero: '',
                ciudadExp: ''
            };
            setRolesAsignados([...rolesAsignados, newPropietario]);
        };
    };


    const simular = async (e) => {
        e?.preventDefault?.();

        const formId = document.getElementById('formOperacion');
        const validoForm = validacionFormulario(formId);
        if (!validoForm) {
            return;
        };

        // validar firmante.
        /* if (formOperacion.checkInteres) {
            const isFirmante = rolesAsignados.some(firmante => firmante.rol === 'F');

            if (!isFirmante) {
                setMessageNotificacionModal('Para tasa de interes especial debe incluir un firmante')
                setShowNotificacionModal(true)
                return;
            };
        }; */

        if (+formOperacion.desmaterializado === 1) {
            const isFirmante = rolesAsignados.some(firmante => firmante.rol === 'F');

            if (!isFirmante) {
                setMessageNotificacionModal('Para desmaterializado debe incluir un firmante')
                setShowNotificacionModal(true)
                return;
            };
        };

        try {
            setShowLoading(true);
            //Mensaje Parametrizable
            const rawMensajeParametrizable = JSON.parse(await titulosSubtitulosMensajes(JSON.stringify(1)));
            const mensajeParametrizable = rawMensajeParametrizable?.data[0]?.valor
            setMensajeResultadoSimulador(mensajeParametrizable);

            //Simulacion
            const rawSimulacion = JSON.parse(await fn_orquestarSimulador(JSON.stringify(formOperacion)));
            if (+rawSimulacion.status !== 200) {
                setShowLoading(false);
                setMessageNotificacionModal(rawSimulacion?.message?.message);
                setShowNotificacionModal(true);
                return;
            };

            const parsedSimulacion = rawSimulacion?.data?.simulation;

            setFormSimulador((state) => ({
                ...state,
                tasaInteres: parsedSimulacion?.rate,
                totalInteres: parsedSimulacion?.totalEstimatedInterest,
                isr: parsedSimulacion?.taxAmount,
                montoProximoPago: parsedSimulacion?.estimatedInterest,
                fechaProximoPago: parsedSimulacion?.nextPaymentDate,
                numeroPagos: parsedSimulacion?.numberOfPayments
            }));

            setShowLoading(false);
            setShowModalSimulacion(true);
            setIsSimulacion(true)

        } catch (error) {
            setShowLoading(false);
            console.log(error);
        };
    };


    const agregarFormaRecepcion = () => {

        const formId = document.getElementById('formRecepcion');
        const validoForm = validacionFormulario(formId);
        if (!validoForm) {
            return;
        };

        const cleanTotalRecibir = prepararMonto(formFormaRecepcion.totalRecibir);
        const cleanMontoRecibir = formFormaRecepcion.fr_monto;
        const totalSubtractRecibir = (parseFloat(cleanTotalRecibir) - parseFloat(cleanMontoRecibir));

        if (totalSubtractRecibir < 0) {
            setMessageNotificacionModal('El monto a pagar no debe ser mayor al total a recibir');
            setShowNotificacionModal(true);
            return;
        };

        const filtroFormaRecepcio = listaFormaRecepcionPago.filter(forma => forma.code === formFormaRecepcion.formaRecepcion);
        const filtroMoneda = listaMoneda.filter(moneda => moneda.code === formFormaRecepcion.fr_moneda);

        const newId = formaRecepcionAsignada.length > 0 ? Math.max(...formaRecepcionAsignada.map(r => r.id)) + 1 : 1;
        const newFormaRecepcion = {
            id: newId,
            formaRecepcion: filtroFormaRecepcio[0].value,
            formaRecepcionCode: formFormaRecepcion.formaRecepcion.trim(),
            fr_moneda: filtroMoneda[0].value,
            fr_monedaCode: formFormaRecepcion.fr_moneda,
            fr_cuenta: formFormaRecepcion.fr_cuenta.trim(),
            fr_monto: conversionPesos({ valor: formFormaRecepcion.fr_monto, nDecimales: 2 }) //(formFormaRecepcion.fr_monto)
        };
        setFormaRecepcionAsignada([...formaRecepcionAsignada, newFormaRecepcion]);

        const totalSubtractRecibirFormateado = totalSubtractRecibir
            ? new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
            }).format(Number(totalSubtractRecibir))
            : '$0.00';

        setFormFormaRecepcion((state) => ({
            ...state,
            formaRecepcion: '',
            fr_cuenta: '',
            fr_monto: '',
            totalRecibir: totalSubtractRecibirFormateado
        }));

        if (totalSubtractRecibir === 0) {
            setIsActivarAgregarFormaRecepcion(true);
            setIsActivarContinuarFormaRecepcion(false);
            setIsActivarFormaPago(true);
            return;
        };
    };

    const prepararMonto = (pMonto) => {
        pMonto = pMonto.replace(/[^\d.,]/g, '');
        const montoSplit = pMonto.split('');
        let controlIDX = 0;

        for (const i of montoSplit) {
            if (i === '.') {
                montoSplit.splice(controlIDX, 1);
            };
            controlIDX = controlIDX + 1
        };

        pMonto = (montoSplit.join(''));
        pMonto = pMonto.replace(',', '.');

        const numero = parseFloat(pMonto);
        if (isNaN(numero)) {
            throw new Error('El monto no es válido.');
        };

        return pMonto;
    };


    return (
        <div className='w-full'>
            <div>
                <div className='col-span-2 flex justify-evenly'>
                    <button
                        className={activarTab === 0 ? 'bg-white  rounded-t-md py-2 w-64 ' : 'bg-gray-300  rounded-t-md py-2 w-64'}
                        onClick={(e) => { onClickTab(e, 0) }}
                    >
                        Consultar CDT
                    </button>
                    <button
                        className={activarTab === 1 ? 'bg-white  rounded-t-md py-2 w-64 ' : 'bg-gray-300  rounded-t-md py-2 w-64'}
                        onClick={(e) => { onClickTab(e, 1) }}
                    >
                        Propietarios
                    </button>
                    <button
                        className={activarTab === 2 ? 'bg-white  rounded-t-md py-2 w-64' : 'bg-gray-300  rounded-t-md py-2 w-64'}
                        onClick={(e) => { onClickTab(e, 2) }}
                    >
                        Operación
                    </button>
                    <button
                        className={activarTab === 3 ? 'bg-white  rounded-t-md py-2 w-64' : 'bg-gray-300  rounded-t-md py-2 w-64'}
                        onClick={(e) => { onClickTab(e, 3) }}
                    >
                        Forma Recepción
                    </button>
                    <button
                        className={activarTab === 4 ? 'bg-white  rounded-t-md py-2 w-64' : 'bg-gray-300  rounded-t-md py-2 w-64'}
                        onClick={(e) => { onClickTab(e, 4) }}
                    >
                        Forma Pago Intereses
                    </button>
                </div>
                <div className='w-full border px-4 py-4 rounded-md shadow-sm bg-white'>
                    {
                        activarTab === 0 ? (
                            <>
                                <div className='py-4'>
                                    <h3 className='text-lg font-semibold mb-4 text-gray-800'>Consultar CDT</h3>
                                    <div className='border-t border-gray-200'></div>
                                    <div className='px-10'>
                                        <br />
                                        <div className='w-full'>
                                            <div className="h-80 overflow-auto" >
                                                <table className="min-w-full">
                                                    <thead className="top-0">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs text-red-600 font-medium text-gray-500 uppercase tracking-wider">
                                                                Nro. CDT
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs text-red-600 font-medium text-gray-500 uppercase tracking-wider">
                                                                Producto
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs text-red-600 font-medium text-gray-500 uppercase tracking-wider">
                                                                Monto
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs text-red-600 font-medium text-gray-500 uppercase tracking-wider">
                                                                Fecha vencimiento
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs text-red-600 font-medium text-gray-500 uppercase tracking-wider">
                                                                Estado
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {dataPlazo.length > 0 ? (
                                                            dataPlazo.map((fila) => (
                                                                <tr key={fila.Identification}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.IdentifierValue.Value}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.ProductName.Name}</td>
                                                                    <td className="py-4 whitespace-nowrap text-sm text-left text-gray-900">{conversionPesos({ valor: fila.AvailableAmount, nDecimales: 2 })}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.ToDateTime.DateTimeContent}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.Status}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                                    No hay CDTs
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-6">
                                            <button
                                                id='p0'
                                                onClick={(e) => navegacionPestanas(e)}
                                                disabled={activarAgregar}
                                                className={`px-8 py-2 text-xs rounded-md shadow-md flex items-center ${activarAgregar ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                            >
                                                Agregar CDT <IoIosAddCircle className='pl-2 text-2xl' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>)
                            : activarTab === 1 ? (
                                <>
                                    <div className='py-6'>
                                        <h3 className='text-lg font-semibold mb-4 text-gray-800'>Asignación de roles</h3>
                                        <div className='border border-gray-300 p-6 rounded-md bg-white shadow-sm'>
                                            <div className='flex flex-col md:flex-row gap-x-8 gap-y-4'>
                                                {/* Campo Rol */}
                                                <div className='flex-1 flex items-center'>
                                                    <label htmlFor="rol-select" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Rol</label>
                                                    <select
                                                        id="rol-select"
                                                        name="rol"
                                                        value={rol}
                                                        onChange={handleRolChange}
                                                        className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    >
                                                        <option value="">Seleccione</option>
                                                        {(rolOptions ?? []).map(option => (
                                                            <option className="disabled" key={option.code} value={option.code}>{option.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Campo Tipo de persona */}
                                                <div className='flex-1 flex items-center'>
                                                    <label htmlFor="tipo-persona-select" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[100px]'>Tipo de persona</label>
                                                    <select
                                                        id="tipo-persona-select"
                                                        name="tipoPersona"
                                                        value={tipoPersona}
                                                        onChange={handleTipoPersonaChange}
                                                        className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    >
                                                        <option value="">Seleccione</option>
                                                        {(tipoPersonaOptions ?? []).map(option => (
                                                            <option key={option.COD_TIPO_CLIENTE} value={option.COD_TIPO_CLIENTE}>{option.TIPOCLI}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Campo Tipo documento */}
                                                <div className='flex-1 flex items-center'>
                                                    <label htmlFor="tipo-documento-select" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[100px]'>Tipo documento</label>
                                                    <select
                                                        id="tipo-documento-select"
                                                        name="tipoDocumento"
                                                        value={tipoDocumento}
                                                        onChange={handleTipoDocumentoChange}
                                                        className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    >
                                                        <option value="">Seleccione</option>
                                                        {tipoPersona == 2 && tipoDocPjOptions.map(option => (
                                                            <option key={option.code} value={option.code}>{option.value}</option>
                                                        ))}
                                                        {tipoPersona == 1 && tipoDocPnOptions.map(option => (
                                                            <option key={option.code} value={option.code}>{option.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Campo Número documento */}
                                                <div className='flex-1 flex items-center'>
                                                    <label htmlFor="numero-documento-input" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[120px]'>Número documento</label>
                                                    <input
                                                        type="text"
                                                        id="numero-documento-input"
                                                        name="numeroDocumento"
                                                        placeholder="Ingrese número"
                                                        value={numeroDocumento}
                                                        onChange={handleNumeroDocumentoChange}
                                                        className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        maxLength={tipoDocumento === 'NIT' ? 9 : 10}
                                                    />
                                                </div>
                                                {/* Botón Buscar */}
                                                <div className='flex items-end'>
                                                    <button
                                                        type="button"
                                                        onClick={handleSearch}
                                                        disabled={isSolicitaFirmante}
                                                        //className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-coomeva_color-rojo hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '
                                                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isSolicitaFirmante ? 'bg-coomeva_color-grisPestaña text-white' : 'bg-coomeva_color-rojo hover:bg-red-600'}  focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                                    >
                                                        Buscar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {nombreCliente && (
                                            <div className="mt-4 text-sm font-medium text-gray-700">
                                                Cliente Encontrado: <span className="font-semibold text-gray-900">{nombreCliente}</span>
                                            </div>
                                        )}
                                        {validationMessage && (
                                            <div className="text-red-600 text-sm mt-2">{validationMessage}</div>
                                        )}
                                    </div>
                                    <div className='flex items-start md:items-center py-6 gap-4 flex-wrap'>
                                        {/* Sección del botón Adicionar */}
                                        <div>
                                            <button
                                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${!isAddButtonEnabled ? 'bg-coomeva_color-grisPestaña text-white' : 'bg-coomeva_color-rojo hover:bg-red-600'}  focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                                onClick={handleAddPropietario}
                                                disabled={!isAddButtonEnabled}
                                            >
                                                <UserPlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden="true" />
                                                Adicionar
                                            </button>
                                        </div>
                                        {/* Sección Tipo de compañía */}
                                        <div className='flex items-center'>
                                            <label htmlFor="tipo-compania-select" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[120px]'>Tipo de Compañía</label>
                                            <select
                                                id="tipo-compania-select"
                                                name="tipoCompania"
                                                value={tipoCompania}
                                                readOnly
                                                disabled
                                                className='block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none sm:text-sm'
                                            >
                                                <option value="DEFAULT">{'Compañia/Sociedad'}</option>
                                                {
                                                    (listaTipoSociedad ?? []).map(option => (
                                                        <option key={option.code} value={option.code}>{option.value}</option>
                                                    ))
                                                }
                                            </select>
                                            {rolMessage && (
                                                <div className="text-red-600 text-sm ml-10"><strong>{rolMessage}</strong></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <h3 className='text-lg font-semibold mb-2 text-gray-800'>Roles asignados</h3>
                                        <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50 sticky top-0">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            ROL
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            TIPO DOCUMENTO
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            NÚMERO DOCUMENTO
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            NOMBRE CLIENTE
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Eliminar</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {rolesAsignados.length > 0 ? (
                                                        rolesAsignados.map((fila) => (
                                                            <tr key={fila.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.rol}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.tipoDocumento}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.numeroDocumento}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.nombreCliente}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button
                                                                        onClick={() => handleDeleteClick(fila.id)}
                                                                        className="text-red-600 hover:text-red-900"
                                                                    >
                                                                        <UserMinusIcon className='-ml-1 mr-2 h-5 w-5 text-coomeva_color-rojo' aria-hidden="true" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                                No hay roles asignados aún.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <div className='w-[30%] flex justify-between items-stretch'>
                                            <button
                                                id='p1'
                                                onClick={(e) => navegacionPestanas(e)}
                                                className={`text-xs border rounded-md py-2 px-10 bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                            >
                                                ANTERIOR
                                            </button>
                                            <button
                                                onClick={handleContinue}
                                                disabled={rolesAsignados.length === 0}
                                                className={`px-10 py-2 text-xs  rounded-md shadow-md ${rolesAsignados.length === 0 ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                            >
                                                CONTINUAR
                                            </button>
                                        </div>
                                    </div>
                                </>)
                                : activarTab === 2 ? (
                                    <form id='formOperacion' name='formOperacion'>
                                        <fieldset disabled={isSimulacion}>
                                            <div className='w-full border px-4 py-4 rounded-b-md shadow-sm bg-white  flex flex-col gap-y-8'>
                                                <div className="flex gap-10">
                                                    {/* Producto */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="producto" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Producto</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="producto"
                                                            name="producto"
                                                            value={formOperacion?.producto}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaProducto ?? []).map(option => (
                                                                <option key={option.code} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Forma de Pago */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="formaPago" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Forma de Pago</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="formaPago"
                                                            name="formaPago"
                                                            value={formOperacion?.formaPago}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            disabled={isFlexirenta}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaFormaPago ?? []).map(option => (
                                                                <option key={option.code} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Frecuencia de Pago */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="frecuenciaPago" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Frecuencia de Pago</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="frecuenciaPago"
                                                            name="frecuenciaPago"
                                                            value={formOperacion?.frecuenciaPago}
                                                            onChange={onChangeOperacion}
                                                            disabled={isActivarFrecuenciaPago}
                                                            required={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaFrecuenciaPago ?? []).map(option => (
                                                                <option key={option.code} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Capitaliza Intereses */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="capitalizaInteres" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Capitaliza Intereses</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="capitalizaInteres"
                                                            name="capitalizaInteres"
                                                            value={formOperacion?.capitalizaInteres}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            disabled={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaSiNo ?? []).map(option => (
                                                                <option key={option.codLista} value={option.codLista}>{option.descripcion}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Categoría */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="categoria" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Categoría</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="categoria"
                                                            name="categoria"
                                                            value={formOperacion?.categoria}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            disabled={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaCategoria ?? []).map(option => (
                                                                <option key={option.code} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex gap-10">
                                                    {/* Monto */}
                                                    <div className='flex flex-col items-start w-[17.5%]'>
                                                        <div className='flex'>
                                                            <label htmlFor="monto" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Monto</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            id="monto"
                                                            name="monto"
                                                            placeholder="$"
                                                            value={formOperacion?.monto}
                                                            autoComplete='off'
                                                            required={true}
                                                            onChange={onChangeOperacion}
                                                            onBlur={onBlurNValor}
                                                            onFocus={(e) => {
                                                                let cleanedNumber = e.target.value.replace(/[^\d,]/g, '');
                                                                cleanedNumber = cleanedNumber.replace(/\./g, '');
                                                                cleanedNumber = cleanedNumber.replace(/,/g, '.');
                                                                e.target.value = cleanedNumber != '' ? parseFloat(cleanedNumber) : e.target.value
                                                            }}
                                                            onInput={(e) => {
                                                                const cleanedNumber = e.target.value.replace(/[^\d.]/g, '');
                                                                e.target.value = cleanedNumber.replace(/(\.)(?=.*\.)/g, '');
                                                            }}
                                                            className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        />
                                                        {(isNValorValido)
                                                            &&
                                                            <p className="text-coomeva_color-rojo text-xs">
                                                                El monto minimo para el producto seleccionado es de ${montominimo}
                                                            </p>
                                                        }
                                                    </div>
                                                    {/* Moneda */}
                                                    <div className='flex flex-col items-start w-[38.5%]'>
                                                        <div className="flex">
                                                            <label htmlFor="moneda" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Moneda</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="moneda"
                                                            name="moneda"
                                                            value={formOperacion?.moneda}
                                                            required={true}
                                                            onChange={onChangeOperacion}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaMoneda ?? []).map(option => (
                                                                <option key={option.code} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Tasa de Interes */}
                                                    <div className='flex flex-col items-start w-[17.5%]'>
                                                        <div className="flex">
                                                            <label htmlFor="checkInteres" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Tasa de Interes</label>
                                                            {(isChecked)
                                                                &&
                                                                <p className='text-coomeva_color-rojo mr-2'>*</p>
                                                            }
                                                            <input
                                                                type="checkbox"
                                                                id="checkInteres"
                                                                name="checkInteres"
                                                                checked={formOperacion.checkInteres}
                                                                onChange={onChangeOperacion}
                                                                className='py-2 px-3 sm:text-sm'
                                                            />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            id="tasaInteres"
                                                            name="tasaInteres"
                                                            placeholder="%"
                                                            value={formOperacion?.tasaInteres}
                                                            autoComplete='off'
                                                            required={true}
                                                            onChange={onChangeOperacion}
                                                            onBlur={onBlurTasaInteres}
                                                            disabled={isTasaEspecial}
                                                            className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-10">
                                                    {/* Plazo */}
                                                    <div className='flex flex-col items-start w-[17.5%]'>
                                                        <div className='flex'>
                                                            <label htmlFor="plazo" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Plazo</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <input
                                                                type="number"
                                                                id="plazo"
                                                                name="plazo"
                                                                placeholder="0"
                                                                value={formOperacion?.plazo}
                                                                onChange={onChangeOperacion}
                                                                required={true}
                                                                onBlur={onBlurNPlazo}
                                                                className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                            />
                                                            <span className='border py-2 px-3 gray-300 rounded-md shadow-sm sm:text-sm bg-gray-300'>Días</span>
                                                        </div>
                                                        {(isNPlazoValido)
                                                            &&
                                                            <p className="text-coomeva_color-rojo text-xs">
                                                                {mensajePlazo}
                                                            </p>
                                                        }
                                                    </div>
                                                    {/* Fecha de Activación */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="fechaActivacion" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Fecha de Activación</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <input
                                                            id="fechaActivacion"
                                                            name="fechaActivacion"
                                                            type='date'
                                                            value={formOperacion.fechaActivacion}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            onBlur={onBlurFechaAvtvacion}
                                                            //readOnly
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        />
                                                    </div>
                                                    {/* Fecha de Vencimiento */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="fechaVencimiento" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Fecha de Vencimiento</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <input
                                                            id="fechaVencimiento"
                                                            name="fechaVencimiento"
                                                            type='date'
                                                            value={formOperacion.fechaVencimiento}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            readOnly
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-10">
                                                    {/* Instruccion Especial */}
                                                    <div className='flex flex-col items-start w-[59%]'>
                                                        <div className='flex'>
                                                            <label htmlFor="instruccionEspecial" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Instrucción Especial</label>
                                                            <p className='text-coomeva_color-rojo'></p>
                                                        </div>
                                                        <input
                                                            id="instruccionEspecial"
                                                            name="instruccionEspecial"
                                                            value={formOperacion?.instruccionEspecial}
                                                            placeholder="Instrucción Especial"
                                                            onChange={onChangeOperacion}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                        </input>
                                                    </div>
                                                    {/* Desmaterializado */}
                                                    <div className='w-[40rem] flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="desmaterializado" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Desmaterializado</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="desmaterializado"
                                                            name="desmaterializado"
                                                            value={formOperacion?.desmaterializado}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            disabled={isDesmaterializado}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaSiNo ?? []).map(option => (
                                                                <option id={option.codLista} key={option.codLista} value={option.codLista}>{option.descripcion}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex gap-10">
                                                    {/* Tipo de Cuenta */}
                                                    <div className='flex flex-col items-start w-[17.5%]'>
                                                        <div className='flex'>
                                                            <label htmlFor="tipoCuenta" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Tipo de Cuenta</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="tipoCuenta"
                                                            name="tipoCuenta"
                                                            value={formOperacion?.tipoCuenta}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            disabled={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaTipoCuenta ?? []).map(option => (
                                                                <option key={option.code} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Oficial Cuenta */}
                                                    <div className='flex flex-col items-start w-[17.5%]'>
                                                        <div className='flex'>
                                                            <label htmlFor="oficial" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Oficial Cuenta</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="oficial"
                                                            name="oficial"
                                                            value={formOperacion?.oficial}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaOficiales ?? []).map(option => (
                                                                <option key={option.code} value={option.value}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Oficina de apertura */}
                                                    <div className='flex flex-col items-start w-[17.5%]'>
                                                        <div className='flex'>
                                                            <label htmlFor="oficina" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Oficina de Apertura</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="oficina"
                                                            name="oficina"
                                                            value={formOperacion?.oficina}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaOficinasFisicas ?? []).map(option => (
                                                                <option key={option.code} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Origen de Fondos */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="origen" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Origen de Fondos</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="origen"
                                                            name="origen"
                                                            value={formOperacion?.origen}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaOrigen ?? []).map(option => (
                                                                <option key={option.code} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* Razón Apertura */}
                                                    <div className='flex-1 flex-col items-center'>
                                                        <div className='flex'>
                                                            <label htmlFor="razonApertura" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Razón Apertura</label>
                                                            <p className='text-coomeva_color-rojo'>*</p>
                                                        </div>
                                                        <select
                                                            id="razonApertura"
                                                            name="razonApertura"
                                                            value={formOperacion?.razonApertura}
                                                            onChange={onChangeOperacion}
                                                            required={true}
                                                            className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {(listaRazonApertura ?? []).map(option => (
                                                                <option id={option.code} key={option.code} data-value={option.value} value={option.code}>{option.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className='flex justify-around py-5'>
                                            <button
                                                id='simular'
                                                onClick={(e) => simular(e)}
                                                disabled={isSimulacion}
                                                className={`flex items-center border rounded-md py-1 px-4 ${isSimulacion ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                            >
                                                <FaCalculator />
                                                <span className='px-2'>Simular</span>
                                            </button>
                                        </div>
                                    </form>)
                                    : activarTab === 3 ? (
                                        <form name="formRecepcion" id="formRecepcion" className="space-y-4">
                                            <h3 className='text-lg font-semibold mb-4 py-6 text-gray-800'>Recepción de Fondos</h3>
                                            <div className='px-10'>
                                                <div className='py-4'>
                                                    <div className='w-[100%]'>
                                                        <div className='w-[100%] flex gap-x-9 gap-y-4'>
                                                            {/* Forma de Recepción */}
                                                            <div className='w-[20%]'>
                                                                <CampoLista
                                                                    valorInput={formFormaRecepcion.formaRecepcion}
                                                                    onChangeInput={onChangeRecepcion}
                                                                    nameInput={"formaRecepcion"}
                                                                    placeholder='Forma de Recepción'
                                                                    lista={listaFormaRecepcionPago || []}
                                                                    idLista='code'
                                                                    descripcionList='value'
                                                                    validacionRequeridoEditable={{ requerido: true, estado: false }}
                                                                />
                                                            </div>
                                                            {/* Moneda */}
                                                            <div className='w-[20%]'>
                                                                <CampoLista
                                                                    valorInput={formFormaRecepcion.fr_moneda}
                                                                    onChangeInput={onChangeRecepcion}
                                                                    nameInput={"fr_moneda"}
                                                                    placeholder='Moneda'
                                                                    lista={listaMoneda || []}
                                                                    idLista='code'
                                                                    descripcionList='value'
                                                                    validacionRequeridoEditable={{ requerido: false, estado: true }}
                                                                />
                                                            </div>
                                                            {/* Cuenta */}
                                                            <div className='w-[20%]'>
                                                                <CampoLista
                                                                    valorInput={formFormaRecepcion.fr_cuenta}
                                                                    onChangeInput={onChangeRecepcion}
                                                                    nameInput={"fr_cuenta"}
                                                                    placeholder='Cuenta'
                                                                    lista={listaCuentas || []}
                                                                    idLista='value'
                                                                    descripcionList='value'
                                                                    validacionRequeridoEditable={{ requerido: true, estado: isActivarCuentaRecepcion }}
                                                                />
                                                            </div>
                                                            {/* Monto */}
                                                            <div className='w-[20%]'>
                                                                {/* <CampoNumero
                                                                    valorInput={formFormaRecepcion.fr_monto}
                                                                    onChangeInput={onChangeRecepcion}
                                                                    nameInput={"fr_monto"}
                                                                    placeholder='Monto'
                                                                    validacionRequeridoEditable={{ requerido: true, estado: false }}
                                                                /> */}
                                                                <CampoMonedaDecimal
                                                                    valorInput={formFormaRecepcion.fr_monto}
                                                                    onChangeInput={onChangeRecepcion}
                                                                    nameInput={"fr_monto"}
                                                                    placeholder='Monto'
                                                                    estado={false}
                                                                    requerido={true}
                                                                    nDecimales={2}
                                                                />
                                                            </div>
                                                            {/* Agregar */}
                                                            <div className='flex items-end'>
                                                                <button
                                                                    type="button"
                                                                    onClick={agregarFormaRecepcion}
                                                                    disabled={isActivarAgregarFormaRecepcion}
                                                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isActivarAgregarFormaRecepcion ? 'bg-coomeva_color-grisPestaña text-white' : 'bg-coomeva_color-rojo hover:bg-red-600'}  focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                                                >
                                                                    Agregar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-start w-[100%]'>
                                                    {/* Total a Recibir*/}
                                                    <div className='py-4'>
                                                        <span>TOTAL A RECIBIR: </span>
                                                        <span>{formFormaRecepcion.totalRecibir}</span>
                                                    </div>
                                                </div>
                                                <div className='w-full pt-10'>
                                                    <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-50 sticky top-0">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Moneda
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Forma de Recepción
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Monto
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Cuenta
                                                                    </th>
                                                                    <th scope="col" className="relative px-6 py-3">
                                                                        <span className="sr-only">Eliminar</span>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {formaRecepcionAsignada.length > 0 ? (
                                                                    formaRecepcionAsignada.map((fila) => (
                                                                        <tr key={fila.id}>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.fr_moneda}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.formaRecepcion}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.fr_monto}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.fr_cuenta}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                                <button
                                                                                    onClick={(e) => deleteRowFormaPago(fila.id, e)}
                                                                                    className="text-red-600 hover:text-red-900"
                                                                                >
                                                                                    <MdOutlineDeleteForever className='-ml-1 mr-2 h-5 w-5 text-coomeva_color-rojo' aria-hidden="true" />
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                                            No hay datos aún.
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end mt-6 pb-4">
                                                    <div className='w-[30%] flex justify-between items-stretch'>
                                                        <button
                                                            id='p3'
                                                            onClick={(e) => navegacionPestanas(e)}
                                                            disabled={isCreado}
                                                            className={`text-xs border rounded-md py-2 px-10 ${isCreado ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                                        >
                                                            ANTERIOR
                                                        </button>
                                                        <button
                                                            onClick={continueFormaRecepcion}
                                                            disabled={isActivarContinuarFormaRecepcion}
                                                            className={`px-10 py-2 text-xs  rounded-md shadow-md ${isActivarContinuarFormaRecepcion ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                                        >
                                                            CONTINUAR
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>)
                                        : activarTab === 4 && (
                                            <form name="formPagos" id="formPagos" className="space-y-4">
                                                <h3 className='text-lg font-semibold mb-4 py-6 text-gray-800'>Forma de Pago</h3>
                                                <div className='px-10 flex flex-col items-center'>
                                                    <div className='w-[80%]'>
                                                        <fieldset disabled={isCreado}>
                                                            <div className='py-4'>
                                                                <div className='w-[100%]'>
                                                                    <div className='w-[100%] flex justify-between gap-x-9 gap-y-4'>
                                                                        {/* Forma de Pago */}
                                                                        <div className='w-[30%]'>
                                                                            <CampoLista
                                                                                valorInput={formFormaPago?.fp_formaPago}
                                                                                onChangeInput={onChangePago}
                                                                                nameInput={"fp_formaPago"}
                                                                                placeholder='Forma de Pago'
                                                                                lista={listaFormaPagoInteres || []}
                                                                                idLista='code'
                                                                                descripcionList='value'
                                                                                validacionRequeridoEditable={{ requerido: true, estado: false }}
                                                                            />
                                                                        </div>
                                                                        {/* Monto */}
                                                                        <div className='w-[30%]'>
                                                                            <CampoNumero
                                                                                valorInput={`$ ${formFormaPago?.fp_monto}`}
                                                                                onChangeInput={onChangePago}
                                                                                nameInput={"fp_monto"}
                                                                                placeholder='Monto'
                                                                                validacionRequeridoEditable={{ requerido: false, estado: true }}
                                                                            />
                                                                        </div>
                                                                        {/* Cuenta */}
                                                                        <div className='w-[30%]'>
                                                                            <CampoLista
                                                                                valorInput={formFormaPago?.fp_cuenta}
                                                                                onChangeInput={onChangePago}
                                                                                nameInput={"fp_cuenta"}
                                                                                placeholder='Cuenta'
                                                                                lista={listaCuentasPago || []}
                                                                                idLista='value'
                                                                                descripcionList='value'
                                                                                validacionRequeridoEditable={{ requerido: true, estado: isActivarCuentaPago }}
                                                                            />
                                                                        </div>
                                                                        {/* Oficina Donde Reclama Cheque de Gerencia */}
                                                                        {(isChequeGerencia)
                                                                            &&
                                                                            <div className='w-[30%]'>
                                                                                <CampoLista
                                                                                    valorInput={formFormaPago?.fp_oficinaChequeGerencia}
                                                                                    onChangeInput={onChangePago}
                                                                                    nameInput={"fp_oficinaChequeGerencia"}
                                                                                    placeholder='Oficina'
                                                                                    lista={listaOficinasFisicas || []}
                                                                                    idLista='code'
                                                                                    descripcionList='value'
                                                                                    validacionRequeridoEditable={{ requerido: true, estado: isActivarOficina }}
                                                                                />
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-start w-[100%]'>
                                                                {/* Total a Recibir*/}
                                                                <div className='py-4'>
                                                                    <span>TOTAL INTERESES A PAGAR: </span>
                                                                    <span>$ {formFormaPago.totalPagar}</span>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                        <div className="flex justify-between mt-10 mb-10 ">
                                                            <div className='w-[45%] flex justify-between items-stretch ml-30'>
                                                                {
                                                                    showDescarga &&
                                                                    <button
                                                                        type='button'
                                                                        onClick={(e) => solicitarRecursos(e)}
                                                                        className='border rounded-md py-1 px-10 flex items-center bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2'
                                                                        title='Formato Apertura de Cuenta'
                                                                    >
                                                                        <GrDocumentPdf /><span className='text-xs ml-3'>DESCARGAR</span>
                                                                    </button>
                                                                }
                                                                {
                                                                    showDescarga &&
                                                                    <button
                                                                        onClick={(e) => finalizar(e)}
                                                                        className='text-xs border rounded-md py-1 px-10 bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2'
                                                                    >
                                                                        FINALIZAR
                                                                    </button>
                                                                }
                                                            </div>
                                                            <div className='w-[35%] flex justify-between items-stretch'>
                                                                <button
                                                                    id='p4'
                                                                    onClick={(e) => navegacionPestanas(e)}
                                                                    disabled={isCreado}
                                                                    className={`text-xs border rounded-md py-2 px-9 ${isCreado ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                                                >
                                                                    ANTERIOR
                                                                </button>
                                                                <button
                                                                    onClick={crearCDT}
                                                                    disabled={isCreado}
                                                                    className={`px-10 py-3 text-xs rounded-md ${isCreado ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                                                >
                                                                    CREAR
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        )
                    }
                </div>
            </div>
            {
                showLoading && <Loading />
            }
            {
                (showConfirmModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageConfirmModal}</p>
                </DynamicModal>
            }
            {
                (showNotificacionModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endNotificacionModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageNotificacionModal}</p>
                </DynamicModal>
            }
            {
                (showModalTasaInteres)
                &&
                <DynamicModal titulo={'Tasa de Interés'} mostrarModal={() => confirmarTasaInteres(true)} cerrarModal={() => confirmarTasaInteres(false)} textBtnContinuar="Aceptar" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModalTasaInteres}</p>
                </DynamicModal>
            }
            {
                (showNotificacionFirmante)
                &&
                <DynamicModal titulo={'Tasa de Interés'} mostrarModal={() => confirmarFirmante(true)} cerrarModal={() => confirmarFirmante(false)} textBtnContinuar="Aceptar" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageNotificacionFirmante}</p>
                </DynamicModal>
            }
            {
                (showModalInspektor)
                &&
                <DynamicModal titulo={'Servicio Inspektor'} mostrarModal={endModalInspektor} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageInspektor}</p>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="border-b-2 text-left text-xs frmDataListColorTh w-[8%]">Tipo</th>
                                <th className="border-b-2 text-left text-xs frmDataListColorTh w-[8%]">Lista</th>
                                <th className="border-b-2 text-center text-xs frmDataListColorTh w-[8%]">Codigo</th>
                            </tr>
                        </thead>
                        <tbody id="dataList" >
                            {dataReporte.map((item, index) => (
                                <tr key={item.listReference.code}>
                                    <td className='text-xs'>{item.matchType.description}</td>
                                    <td className='text-xs'>{item.listReference.name}</td>
                                    <td className='text-xs text-center'>{item.listReference.code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DynamicModal>
            }
            {
                (confimarModalEliminar)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={() => confirmDelete(true)} cerrarModal={() => confirmDelete(false)} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{validationMessage}</p>
                    <p className="text-lg font-semibold mb-4 text-gray-900">Confirmar Eliminación del Titular</p>
                    <p className="mb-6 text-gray-700">Esta acción eliminará todos los demás propietarios automáticamente. ¿Desea continuar?</p>
                </DynamicModal>
            }
            {
                (showRecursosModal)
                &&
                <DynamicModal titulo={'¿Procedencia de los Recursos?'} mostrarModal={descargarPdf} cerrarModal={() => setShowRecursosModal(false)} ocultarBtnCancelar={false} textBtnContinuar="Continuar" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{''}</p>
                    <textarea
                        name="recurso"
                        rows="3"
                        cols="30"
                        maxLength="50"
                        placeholder='Escribe tu comentario aquí...'
                        defaultValue={recursosText}
                        onChange={(e) => setRecursosText(e.target.value)}
                    >
                    </textarea>
                </DynamicModal>
            }
            {
                (showModalSimulacion)
                &&
                <DynamicModal titulo={'Resultado Simulación'} mostrarModal={() => confirmSimulacion(true)} cerrarModal={() => confirmSimulacion(false)} textBtnContinuar="Aceptar" mostrarImagneFondo={true}>
                    <h2 className=" w-full text-base leading-[0.8] text-[#002e49f3] font-semibold">Tasa de Interés</h2>
                    <p className="  w-full text-base leading-[0.8] text-[#002e49f3]">{formSimulador.tasaInteres}%</p>
                    <h2 className=" w-full text-base leading-[0.8] text-[#002e49f3] font-semibold">Total Interés</h2>
                    <p className="  w-full text-base leading-[0.8] text-[#002e49f3]">$ {formSimulador.totalInteres}</p>
                    <h2 className=" w-full text-base leading-[0.8] text-[#002e49f3] font-semibold">ISR</h2>
                    <p className="  w-full text-base leading-[0.8] text-[#002e49f3]">{formSimulador.isr}</p>
                    <h2 className=" w-full text-base leading-[0.8] text-[#002e49f3] font-semibold">Monto Próximo Pago</h2>
                    <p className="  w-full text-base leading-[0.8] text-[#002e49f3]">$ {formSimulador.montoProximoPago}</p>
                    <h2 className=" w-full text-base leading-[0.8] text-[#002e49f3] font-semibold">Fecha Próximo Pago</h2>
                    <p className="  w-full text-base leading-[0.8] text-[#002e49f3]">{formSimulador.fechaProximoPago}</p>
                    <h2 className=" w-full text-base leading-[0.8] text-[#002e49f3] font-semibold">Número de Pagos</h2>
                    <p className="  w-full text-base leading-[0.8] text-[#002e49f3]">{formSimulador.numeroPagos}</p>
                    <p className="  w-full text-xs text-[#002e49f3] font-semibold">{mensajeResultadoSimulador}</p>
                </DynamicModal>
            }
        </div >
    );
};