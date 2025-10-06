'use client';

/* Librerias */
import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import { GrDocumentPdf } from "react-icons/gr";
/* Servicios y APIS*/
import { fn_catalogosPropietarios } from '@/app/lib/propietarios/fn_catalogosPropietarios';
import { fn_catalogosPropietarios as catalogoPropietario } from "@/app/lib/propietarios/fn_catalogosPropietarios";
import { queryClientePj } from "@/app/lib/apisClientePj/fn_queryClientePj";
import { queryClientePn } from '@/app/lib/apisClientePn/fn_queryClientePn';
import { fnInspektor } from '@/app/lib/inspektor/fn_inspektor';
import { fn_orquestadorProductosCaptacion } from '@/app/lib/apisProductoCaptacion/fn_orquestadorCrearModificar';
import { fn_orquestadorAsignarPlanAhorro } from '@/app/lib/apisProductoCaptacion/fn_orquestadorAsignar';
import { fn_orquestadorCuentaMaestra } from '@/app/lib/apisProductoCaptacion/fn_orquestadorCuentaMaestra';
import { fnQueryAgrupacionTipoCompaniaFiltro } from '@/app/lib/admin/cuentas/queryAgrupacionTipoCompaniaFiltro';
import { fnQueryAgrupacionRolFiltro } from '@/app/lib/admin/cuentas/queryAgrupacionRolFiltro';
import { fnQueryAgrupacionProductoFiltro } from '@/app/lib/admin/cuentas/queryAgrupacionProductoFiltro';
import { fnQueryAgrupacionTitularidadFiltro } from '@/app/lib/admin/cuentas/queryAgrupacionTitularidadFiltro';
import { fnQueryUsuarioOficina } from "@/app/lib/apisProductoCaptacion/fnQueryUsuarioOficina";
import { fnQueryActaContratos } from "@/app/lib/apisProductoCaptacion/fnQueryActasContratos";
import { queryListarManejoCuota } from "@/app/lib/admin/querys/listas";
import {
    queryListTipoSociedad,
    queryListCiudades,
    queryListMotivoAhorro,
    queryListFrecuenciaAhorro,
    queryListOficinas,
    queryListTipoServicio
} from '@/app/lib/menuPrincipal/actions';
import { fn_consultarFechaCorte } from '@/app/lib/apisProductoCaptacion/fn_consultarFechaCorte';
/* Share */
import Loading from '@/app/loading';
import CuentaPDF from './CuentaPDF';
import AsignarPDF from './AsignarPDF';


const DynamicModal = dynamic(() => import('../../share/Modals'), { ssr: false });
const datos = [];


export const ContenidoApertura = () => {

    const [activarTab, setActivarTab] = useState(1);
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
    const [clientParticipanteTipo, setClientParticipanteTipo] = useState('');
    const [vOficina, setVOficina] = useState('');

    const [isClientActive, setIsClientActive] = useState(false);
    const [isClientProspect, setIsClientProspect] = useState(false);
    const [isCreado, setIsCreado] = useState(false);
    const [isPAP, setIsPAP] = useState(false);
    const [isNValorValido, setIsNValorValido] = useState(false);
    const [isNCuotaValido, setIsNCuotaValido] = useState(false);
    const [isClientReportedInspektor, setIsClientReportedInspektor] = useState(false);
    const [isICBF, setIsICBF] = useState(false);

    const [inspektorReportMessage, setInspektorReportMessage] = useState('');
    const [rolesAsignados, setRolesAsignados] = useState(datos);
    const [validationMessage, setValidationMessage] = useState('');
    const [rolMessage, setRolMessage] = useState('');

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [messageConfirmModal, setMessageConfirmModal] = useState('');
    const [showModalInspektor, setShowModalInspektor] = useState(false);
    const [messageInspektor, setMessageInspektor] = useState('');

    const [showNotificacionModal, setShowNotificacionModal] = useState(false)
    const [messageNotificacionModal, setMessageNotificacionModal] = useState('');

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
    const [listaProductoBancario, setListaProductoBancario] = useState([]);
    const [listaCategoria, setListaCategoria] = useState([]);
    const [listaTipoPromedio, setListaTipoPromedio] = useState([]);
    const [listaTipoCapitalizacion, setListaTipoCapitalizacion] = useState([]);
    const [listaOrigen, setListaOrigen] = useState([]);
    const [listaOficiales, setListaOficiales] = useState([]);
    const [listaTitularidad, setListaTitularidad] = useState([]);
    const [listaCorrientePj, setListaCorrientePj] = useState([]);
    const [listaAhorroPj, setListaAhorroPj] = useState([]);
    const [listaMotivoAhorro, setListaMotivoAhorro] = useState([]);
    const [listaTipoFrecuencia, setListaTipoFrecuencia] = useState([]);
    const [listaTipoVencimiento, setListaTipoVencimiento] = useState([]);
    const [listaOficina, setListaOficina] = useState([]);
    const [listaTipoServicio, setListaTipoServicio] = useState([]);


    const initFormOperacion = {
        producto: '',
        moneda: 0,
        productoBancario: '',
        categoria: '',
        tipoPromedio: 3,
        tipoCapitalizacion: 4,
        origen: '',
        oficial: '',
        oficina: '',
        titularidad: '',
        tipoServicio: '',
        numeroContrato: '',
        nombreCuenta: ''
    };

    const initFormAsignar = {
        motivoAhorro: 'E',
        tipoVencimiento: 'C',
        frecuencia: 'M',
        nValor: '',
        numeroCuotas: '',
        renovacionAutomatica: false,
        debitoAutomatico: 'false',
        secuencial: '1',
        fechaInicio: '',
        numeroDia: '',
        fechaVencimiento: ''
    };


    const [formOperacion, setFormOperacion] = useState(initFormOperacion);
    const [formAsignar, setFormAsignar] = useState(initFormAsignar);


    const loadOptions = async () => {
        try {
            setShowLoading(true);
            const { listarRolPropietarios, listarTipoCliente, listTipoDocumentoPj,
                listTipoDocumentoPn
            } = JSON.parse(await fn_catalogosPropietarios());
            const { listProducto, listTipoMoneda, listCategoria, listarTipoPromedio,
                listarTipoCapitalizacion, listOrigen, listOficiales, listTitularidad,
                listCorrientePj, listAhorroPj
            } = JSON.parse(await catalogoPropietario());

            setRolOptions(listarRolPropietarios);
            setTipoPersonaOptions(listarTipoCliente);
            setTipoDocPjOptions(listTipoDocumentoPj);
            setTipoDocPnOptions(listTipoDocumentoPn);
            setShowLoading(false);
            setListaProducto(listProducto.filter(item => ['3', '4'].includes(item.code)));
            setListaMoneda(listTipoMoneda.filter(item => ['0'].includes(item.code)));
            setListaCategoria(listCategoria.filter(item => ['N', 'Z'].includes(item.code)));
            setListaTipoPromedio(listarTipoPromedio);
            setListaTipoCapitalizacion(listarTipoCapitalizacion);
            setListaOrigen(listOrigen);
            setListaOficiales(listOficiales);
            setListaTitularidad(listTitularidad);
            setListaCorrientePj(listCorrientePj);
            setListaAhorroPj(listAhorroPj);

        } catch (error) {
            console.log(error);
            setShowLoading(false);
        };
    };


    const cargarListaTipoSociedad = async () => {
        const tipoSociedad = JSON.parse(await queryListTipoSociedad());
        setListaTipoSociedad(tipoSociedad?.DATA || []);
    };


    const cargarListaMotivoAhorro = async () => {
        const motivoAhorro = JSON.parse(await queryListMotivoAhorro());
        setListaMotivoAhorro(motivoAhorro?.DATA || []);
    };


    const cargarListaTipoFrecuencia = async () => {
        const tipoFrecuencia = JSON.parse(await queryListFrecuenciaAhorro());
        setListaTipoFrecuencia(tipoFrecuencia?.DATA || []);
    };


    const cargarListaManejoCuota = async () => {
        const manejoCuota = JSON.parse(await queryListarManejoCuota());
        filtrarManejoCuota(manejoCuota?.DATA);
    };


    const cargarListaOficina = async () => {
        const cOficina = JSON.parse(await queryListOficinas());
        setListaOficina(cOficina?.DATA);
    };


    const cargarTipoServicio = async () => {
        const cTipoServicio = JSON.parse(await queryListTipoServicio());
        setListaTipoServicio(cTipoServicio?.DATA);
    };


    const filtrarManejoCuota = async (pManejo) => {
        const filterVencimiento = pManejo.filter(elemt => elemt.codLista === 'C');
        const filterSecuencial = pManejo.filter(elemt => elemt.descripcion === 'secuencial')[0].codLista;
        const filterDebitoAutomatico = pManejo.filter(elemt => elemt.descripcion === 'debitoAutomático')[0].codLista;

        setListaTipoVencimiento(filterVencimiento || []);

        setFormAsignar((state) => ({
            ...state,
            debitoAutomatico: filterDebitoAutomatico,
            secuencial: filterSecuencial,
        }));

    };


    useEffect(() => {
        loadOptions();
        cargarListaTipoSociedad();
        cargarListaTipoFrecuencia();
        cargarListaMotivoAhorro();
        cargarListaManejoCuota();
        cargarListaOficina();
        cargarTipoServicio();
    }, []);


    const onClickTab = async (e, tab) => {
        e.preventDefault();

        if (rolesAsignados.length === 0) {
            //setValidationMessage('Debe asignar al menos un rol para continuar.');
            return;
        };

        const cFiltrados = JSON.parse(localStorage.getItem('rolFiltrados')) || [];
        const cObligatorios = JSON.parse(localStorage.getItem('controlRol'));

        for (let i of cFiltrados) {
            let isThere = rolesAsignados.some(rol => rol.rol === i.code);
            if (!isThere) {
                if (i.code === 'T') {
                    if (cObligatorios?.titular === 1) {
                        noContinua();
                        return;
                    };
                };
                if (i.code === 'S') {
                    if (cObligatorios?.secundario === 1) {
                        noContinua();
                        return;
                    };
                };
                if (i.code === 'F') {
                    if (cObligatorios?.firmante === 1) {
                        noContinua();
                        return;
                    };
                };
                if (i.code === 'C') {
                    if (cObligatorios?.cotitular === 1) {
                        noContinua();
                        return;
                    };
                };
            };
        };

        if (tab === 3) {
            const formId = document.getElementById('formPropietario');
            const validoForm = valiacionFormulario(formId);

            if (validoForm) {
                setActivarTab(tab);
                const dataTitular = rolesAsignados.filter(titular => titular.rol === "T");

                const custon_Id = {
                    "custonReference": dataTitular[0].custonReference,
                    "numeroDocumento": dataTitular[0].numeroDocumento,
                    "tipoDocumento": dataTitular[0].tipoDocumento
                };

                await calculoFechas(JSON.stringify(custon_Id));
            };
            return
        }

        setIsCreado(false);
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
        setClientParticipanteTipo('');
        setValidationMessage('');
        setIsClientActive(false);
        setIsClientProspect(false);
        setIsClientReportedInspektor(false);
        setInspektorReportMessage('');
    };


    const handleTipoDocumentoChange = (e) => {
        setTipoDocumento(e.target.value);
        setNumeroDocumento('');
        setNombreCliente('');
        //setTipoCompania('');
        setClientParticipanteTipo('');
        setValidationMessage('');
        setIsClientActive(false);
        setIsClientProspect(false);
        setIsClientReportedInspektor(false);
        setInspektorReportMessage('');
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
        setClientParticipanteTipo('');
        setIsClientActive(false);
        setIsClientProspect(false);
        setIsClientReportedInspektor(false);
        setInspektorReportMessage('');
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
        setClientParticipanteTipo('');
        setIsClientActive(false);
        setIsClientProspect(false);
        setIsClientReportedInspektor(false);
        setInspektorReportMessage('');

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
        setClientParticipanteTipo('');
        setValidationMessage('');
        setIsClientActive(false);
        setIsClientProspect(false);
        setIsClientReportedInspektor(false);
        setInspektorReportMessage('');
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


    const confirmDelete = (confirmed) => {
        if (confirmed && rolToDelete) {
            if (rolToDelete.rol === 'T') {
                setRolesAsignados([]);
                setFormOperacion(initFormOperacion);
                setFormAsignar(initFormAsignar);
                setIsPAP(false);
                setTipoCompania('');
                setRolMessage('');
                const listaRol = localStorage.getItem('listRol');
                setRolOptions(JSON.parse(listaRol));
                localStorage.removeItem('controlRol');
                localStorage.removeItem('listRol');
                localStorage.removeItem('rolFiltrados');
                localStorage.removeItem('administradorConsorcio');
                localStorage.removeItem('titularConsorcio');
                localStorage.removeItem('tipoCompania');
                setValidationMessage('El Titular y todos los propietarios asociados han sido eliminados.');
            }
        };
        setConfimarModalEliminar(false);
        setRolToDelete(null);
    };


    const handleContinue = () => {

        const cFiltrados = JSON.parse(localStorage.getItem('rolFiltrados'));
        const cObligatorios = JSON.parse(localStorage.getItem('controlRol'));

        for (let i of cFiltrados) {
            let isThere = rolesAsignados.some(rol => rol.rol === i.code);
            if (!isThere) {
                if (i.code === 'T') {
                    if (cObligatorios.titular === 1) {
                        noContinua();
                        return;
                    };
                };
                if (i.code === 'S') {
                    if (cObligatorios.secundario === 1) {
                        noContinua();
                        return;
                    };
                };
                if (i.code === 'F') {
                    if (cObligatorios.firmante === 1) {
                        noContinua();
                        return;
                    };
                };
                if (i.code === 'C') {
                    if (cObligatorios.cotitular === 1) {
                        noContinua();
                        return;
                    };
                };
            };
        };

        setIsCreado(false);
        setActivarTab(2);
        setValidationMessage('');
        setRolMessage('');
    };


    const noContinua = () => {
        const cRol = JSON.parse(localStorage.getItem('controlRol'));
        setRolMessage(cRol.mensaje);
    }


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


    const crearPropietario = async (e) => {
        e.preventDefault();
        const formId = document.getElementById('formPropietario');
        const validoForm = valiacionFormulario(formId);

        if (validoForm) {
            setShowLoading(true);
            const rawData = {
                'rawRolesAsignados': rolesAsignados,
                'rawOperacion': formOperacion
            };

            const crearPropietario = JSON.parse(await fn_orquestadorProductosCaptacion(JSON.stringify(rawData)));
            rawData.ncuenta = crearPropietario?.message?.AccountArrangement?.AccountNumber;
            rawData.usu = crearPropietario.usu;

            if (+crearPropietario.status !== 200) {
                setShowLoading(false);
                setMessageConfirmModal(crearPropietario.message);
                setShowConfirmModal(true);
                return;
            };

            setShowLoading(false);
            setMessageConfirmModal(`${crearPropietario?.message?.Message} - Code: ${crearPropietario?.message?.AccountArrangement?.AccountArrangementIdentifier} - Number: ${crearPropietario?.message?.AccountArrangement?.AccountNumber}`);
            setShowConfirmModal(true);

            await preparandoDataContrato(rawData);
            setIsCreado(true);
            setFormOperacion(initFormOperacion);
            setRolesAsignados([]);
            setTipoCompania('');
            setRolMessage('');
            const listaRol = localStorage.getItem('listRol');
            setRolOptions(JSON.parse(listaRol));
            localStorage.removeItem('controlRol');
            localStorage.removeItem('listRol');
            localStorage.removeItem('rolFiltrados');
            localStorage.removeItem('administradorConsorcio');
            localStorage.removeItem('titularConsorcio');
            localStorage.removeItem('tipoCompania');
        };
    };


    const crearCuentaMaestra = async (e) => {
        e.preventDefault();
        const formId = document.getElementById('formPropietario');
        const validoForm = valiacionFormulario(formId);

        if (validoForm) {
            setShowLoading(true);
            const rawData = {
                'rawRolesAsignados': rolesAsignados,
                'rawOperacion': formOperacion
            };

            const cuentaMaestra = JSON.parse(await fn_orquestadorCuentaMaestra(JSON.stringify(rawData)));
            rawData.ncuenta = cuentaMaestra?.message?.AccountArrangement?.AccountNumber;
            rawData.usu = cuentaMaestra.usu;

            if (+cuentaMaestra.status !== 200) {
                setShowLoading(false);
                setMessageConfirmModal(cuentaMaestra.message);
                setShowConfirmModal(true);
                return;
            };

            setShowLoading(false);
            setMessageConfirmModal(`${cuentaMaestra?.message?.Message} - Code: ${cuentaMaestra?.message?.AccountArrangement?.AccountArrangementIdentifier} - Number: ${cuentaMaestra?.message?.AccountArrangement?.AccountNumber}`);
            setShowConfirmModal(true);

            await preparandoDataContrato(rawData);
            setIsCreado(true);
            setFormOperacion(initFormOperacion);
            setRolesAsignados([]);
            setTipoCompania('');
            setRolMessage('');
            const listaRol = localStorage.getItem('listRol');
            setRolOptions(JSON.parse(listaRol));
            localStorage.removeItem('controlRol');
            localStorage.removeItem('listRol');
            localStorage.removeItem('rolFiltrados');
            localStorage.removeItem('administradorConsorcio');
            localStorage.removeItem('titularConsorcio');
            localStorage.removeItem('tipoCompania');
        };
    };


    const crearAsignarPlanAhorro = async (e) => {
        e.preventDefault();
        const formId = document.getElementById('formAsignar');
        let validoForm = valiacionFormulario(formId);

        if (validoForm) {
            if (isNValorValido || isNCuotaValido) {
                setMessageConfirmModal('Algunos campos no cumplen las condiciones')
                setShowConfirmModal(true);
                return;
            };

            if (formAsignar.motivoAhorro !== 'E') {
                setMessageConfirmModal('Para persona jurídica solo se permitir el tipo de motivo Empresarial')
                setShowConfirmModal(true);
                return;
            };

            setShowLoading(true);
            const rawData = {
                'rawRolesAsignados': rolesAsignados,
                'rawOperacion': formOperacion,
                'rawAsigancion': formAsignar
            };

            const asignarPlan = JSON.parse(await fn_orquestadorAsignarPlanAhorro(JSON.stringify(rawData)));

            if (+asignarPlan.status !== 200) {
                setShowLoading(false);
                setMessageConfirmModal(`${asignarPlan.message}`);
                setShowConfirmModal(true);
                return;
            };

            rawData.ncuenta = asignarPlan.operation.SavingsAccountNumber.Number;
            rawData.usu = asignarPlan.usu;

            setShowLoading(false);
            setMessageConfirmModal(`${asignarPlan.message} - Sequential: ${asignarPlan.operation.SavingAccount.Sequential} - AccounNumber: ${asignarPlan.operation.SavingsAccountNumber.Number}`);
            setShowConfirmModal(true);

            await preparandoDataContrato(rawData);
            setIsCreado(true);
            setFormOperacion(initFormOperacion);
            setRolesAsignados([]);
            setFormAsignar(initFormAsignar);
            setTipoCompania('');
            setRolMessage('');
            const listaRol = localStorage.getItem('listRol');
            setRolOptions(JSON.parse(listaRol));
            localStorage.removeItem('controlRol');
            localStorage.removeItem('listRol');
            localStorage.removeItem('rolFiltrados');
            localStorage.removeItem('administradorConsorcio');
            localStorage.removeItem('titularConsorcio');
            localStorage.removeItem('tipoCompania');
        };
    };


    const valiacionFormulario = (formId) => {
        if (formId) {
            if ((!formId.checkValidity())) {
                formId.reportValidity()
                return false
            };
        };

        return true;
    };


    const preparandoDataContrato = async (rawData) => {

        let rawOficial = {
            "pUsuario": rawData.usu
        };

        const rawOficinaOficial = await fnQueryUsuarioOficina(JSON.stringify(rawOficial));

        let oficinaOficial = {};

        if (typeof (rawOficinaOficial) === 'string' && rawOficinaOficial.length > 0) {
            const statusData = JSON.parse(rawOficinaOficial);

            if (statusData.STATUS === 200) {
                oficinaOficial = JSON.parse(rawOficinaOficial).dataOficial;
                setShowDescarga(true);
            } else {
                setMessageNotificacionModal('No fue posible obtener los datos del colaborador.');
                setShowNotificacionModal(true);
            };
        };

        const dataContrato = {
            "producto": fProducto(rawData.rawOperacion.productoBancario),
            "fechaApertura": fFechaApertura(new Date()),
            "oficina": vOficina,
            "nameCodeOficina": `${rawData.rawOperacion.oficina} - ${vOficina}`,
            "numeroCuenta": rawData.ncuenta,
            "identificacion": rawData.rawRolesAsignados[0].numeroDocumento,
            "titular": rawData.rawRolesAsignados[0].nombreCliente,
            "titularidad": fTitularidad(rawData.rawOperacion.titularidad),
            "ciudadExpedicion": await ciudadExpedicion(rawData.rawRolesAsignados[0].tipoDocumento, rawData),
            "colaborador": oficinaOficial[0]?.NOMBRE,
            "colaboradorUsuario": rawData.rawOperacion.oficial,
            "firmantes": rawData.rawRolesAsignados.filter(firmante => firmante.rol === 'F'),
            "valorMensual": isPAP ? rawData.rawAsigancion.nValor : '',
            "fechaFacturacion": isPAP ? fFechaApertura(rawData.rawAsigancion.fechaInicio) : '',
            "plazo": isPAP ? rawData.rawAsigancion.numeroCuotas : '',
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


    const fProducto = (pProducto) => {
        const filterSubProducto = listaProductoBancario.filter(elemt => elemt.code === pProducto);
        return filterSubProducto[0].value;
    };


    const fTitularidad = (pTitularidad) => {
        const filterTitularidad = listaTitularidad.filter(elemt => elemt.code === pTitularidad);
        return `${filterTitularidad[0].code} - ${filterTitularidad[0].value}`;
    };


    const ciudadExpedicion = async (pTipoDocumento, pRawData) => {

        if (pTipoDocumento === 'NIT') {
            return 'No Aplica';
        };

        const rawCiudad = await queryListCiudades();
        let ciudad = '';

        if (typeof (rawCiudad) === 'string' && rawCiudad.length > 0) {
            const parsedCiudad = JSON.parse(rawCiudad).DATA;
            ciudad = parsedCiudad.filter(elemt => elemt.code === pRawData.rawRolesAsignados[0].ciudadExp)[0].value;
        };

        return ciudad[0].value;
    };


    const onChangeOperacion = async (e) => {
        const { value, name } = e.target
        setFormOperacion(state => ({
            ...state,
            [name]: value
        }));

        if (rolesAsignados.length === 0) {
            setMessageConfirmModal('Aún no ha cargado propietarios. Hágalo para poder continuar.');
            setShowConfirmModal(true);
            return;
        };

        if (name === 'producto') {

            const grupo = JSON.parse(localStorage.getItem('controlRol'));
            const pFiltro = {
                "pGrupo": grupo.codAgrupador,
                "pSubproducto": +value
            };

            if (+value === 3) {
                setListaProductoBancario([]);
                setShowLoading(true);
                const resProductoFiltro = JSON.parse(await fnQueryAgrupacionProductoFiltro(JSON.stringify(pFiltro)));
                setShowLoading(false);
                if (resProductoFiltro.STATUS === 200) {
                    const rawSubproductos = resProductoFiltro.DATA[0];
                    const filtroCorriente = listaCorrientePj.filter(item => rawSubproductos.SubProducto.includes(+item.code))
                    setListaProductoBancario(filtroCorriente);
                };
            };

            if (+value === 4) {
                setListaProductoBancario([]);
                setShowLoading(true);
                const resProductoFiltro = JSON.parse(await fnQueryAgrupacionProductoFiltro(JSON.stringify(pFiltro)));
                setShowLoading(false);
                if (resProductoFiltro.STATUS === 200) {
                    const rawSubproductos = resProductoFiltro.DATA[0];
                    const filtroAhorro = listaAhorroPj.filter(item => rawSubproductos.SubProducto.includes(+item.code));
                    setListaProductoBancario(filtroAhorro);
                };
            };

            setShowLoading(true);
            const resTitularidadFiltro = JSON.parse(await fnQueryAgrupacionTitularidadFiltro(JSON.stringify(pFiltro)));
            setShowLoading(false);
            if (resTitularidadFiltro.STATUS === 200) {
                const rawTitularidad = resTitularidadFiltro.DATA[0];
                const filtroTitularidad = listaTitularidad.filter(item => rawTitularidad.codTitularidad.includes(item.code));
                setListaTitularidad(filtroTitularidad);
            };
        };

        if (name === 'productoBancario') {
            if (+value === 55) {
                setIsPAP(true);
                setIsICBF(false);
                return;
            };
            setIsPAP(false);
            if (+value === 22) {
                setIsICBF(true);
                return;
            }
            setIsICBF(false);
        };

        if (name === 'oficina') {
            const elementOficina = document.getElementById(e.target.value);
            setVOficina(elementOficina.dataset.value);
        };
    };


    const onChangeAsignacion = async (e) => {
        const { value, name } = e.target
        if (name === 'nValor') {
            const limpio = value.replace(/\./g, '').replace(/[^\d]/g, '');
            const formateado = limpio ? Number(limpio).toLocaleString('es-CO') : '';

            setFormAsignar((state) => ({
                ...state,
                [name]: formateado,
            }));
        } else {
            setFormAsignar((state) => ({
                ...state,
                [name]: value,
            }));
        };


        if (name === 'numeroCuotas') {
            const calFechaVencimiento = await sumarMeses(formAsignar.fechaInicio, +value);
            setFormAsignar(prev => ({
                ...prev,                // mantiene todo lo anterior
                fechaVencimiento: calFechaVencimiento // solo cambia esta propiedad
            }));
        };

    };


    const sumarMeses = async (fechIni, nCuota) => {
        const [anio, mes, dia] = fechIni.split("-");
        const fecha = new Date(anio, mes - 1, dia);

        if (isNaN(fecha)) {
            return '000-00-00';
        };

        fecha.setMonth(fecha.getMonth() + nCuota);
        return fecha.toISOString().split("T")[0];
    };


    const onBlurNValor = async (e) => {
        e.preventDefault();
        const { value } = e.target
        const limpio = value.replace(/\./g, '').replace(/[^\d]/g, '');
        let validacion = +limpio < 50000;

        if (validacion) {
            setIsNValorValido(true);
        } else {
            setIsNValorValido(false);
        }
    };


    const onBlurNCuotas = async (e) => {
        e.preventDefault();
        const { value } = e.target;
        let validacion = value < 6 || value > 12;

        if (validacion) {
            setIsNCuotaValido(true);
        } else {
            setIsNCuotaValido(false);
        }
    };


    const pestanaAnterior = async (e) => {
        e.preventDefault();

        if (e.target.id === 'p2') {
            setActivarTab(1);
            return
        };
        if (e.target.id === 'p3') {
            setActivarTab(2);
            return
        };
        if (e.target.id === 'p4') {
            const formId = document.getElementById('formPropietario');
            const validoForm = valiacionFormulario(formId);
            if (validoForm) {
                setActivarTab(3);

                const dataTitular = rolesAsignados.filter(titular => titular.rol === "T");

                const custon_Id = {
                    "custonReference": dataTitular[0].custonReference,
                    "numeroDocumento": dataTitular[0].numeroDocumento,
                    "tipoDocumento": dataTitular[0].tipoDocumento
                };

                await calculoFechas(JSON.stringify(custon_Id));

            };
            return
        };
    };


    const finalizar = (e) => {
        e.preventDefault();
        setRecursosText('');
        setIsCreado(false);
        setIsICBF(false);
        setIsPAP(false);
        setShowDescarga(false)
        localStorage.removeItem('dataContrato');
        setActivarTab(1);
    };


    const cancelarOperacion = () => {
        setRecursosText('');
        setIsCreado(false);
        setIsICBF(false);
        setIsPAP(false);
        setShowDescarga(false)
        localStorage.removeItem('dataContrato');
        setActivarTab(1);
    };


    const parametrosTipoCompania = async (pDataTipoCompania) => {
        setShowLoading(true);
        const resParametrosTipoCompania = JSON.parse(await fnQueryAgrupacionTipoCompaniaFiltro(JSON.stringify(pDataTipoCompania)));

        if (resParametrosTipoCompania.STATUS !== 200) {
            setShowLoading(false);
            return false;
        };

        const rawDataRol = {
            "pGrupo": resParametrosTipoCompania.DATA[0].codAgrupador
        };

        const resRol = JSON.parse(await fnQueryAgrupacionRolFiltro(JSON.stringify(rawDataRol)));
        setShowLoading(false);

        if (resRol.STATUS === 200) {
            localStorage.removeItem('controlRol');
            localStorage.setItem('controlRol', JSON.stringify(resRol.DATA[0]));
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

        if (!isPAP) {
            contenidoDoc = JSON.parse(await fnQueryActaContratos(JSON.stringify({ pNombreActa: 'aperturaCuenta' })));
        } else {
            contenidoDoc = JSON.parse(await fnQueryActaContratos(JSON.stringify({ pNombreActa: 'asignaPlanAhorro' })));
        };

        const blob = await pdf(
            !isPAP ?
                <CuentaPDF
                    cliente={{
                        nombre: rawDataContrato.titular,
                        identificacion: rawDataContrato.identificacion,
                        ciudad: rawDataContrato.ciudadExpedicion,
                        recursos: rawDataContrato.recursos,
                    }}
                    colaborador={{
                        nombre: rawDataContrato.colaborador,
                        usuario: rawDataContrato.colaboradorUsuario,
                    }}
                    datosCuenta={{
                        producto: rawDataContrato.producto,
                        numero: rawDataContrato.numeroCuenta,
                        fecha: rawDataContrato.fechaApertura,
                        oficina: rawDataContrato.oficina,
                    }}
                    firmas={{
                        cliente: rawDataContrato.firmaCliente,
                        colaborador: rawDataContrato.firmaColaborador,
                        extra: rawDataContrato.firmantes,
                    }}
                    contenido={{
                        logo: contenidoDoc.data[0].logo,
                        anverso: contenidoDoc.data[0].anverso,
                        reverso: contenidoDoc.data[0].reverso,
                        vigilado: contenidoDoc.data[0].vigilado,
                        fogafin: contenidoDoc.data[0].fogafin,
                        text1: contenidoDoc.data[0].text1,
                        text2: contenidoDoc.data[0].text2,
                        text3: contenidoDoc.data[0].text3,
                        text4: contenidoDoc.data[0].text4,
                        text5: contenidoDoc.data[0].text5,
                        text6: contenidoDoc.data[0].text6,
                        text7: contenidoDoc.data[0].text7,
                    }}
                />
                :
                <AsignarPDF
                    cliente={{
                        nombre: rawDataContrato.titular,
                        identificacion: rawDataContrato.identificacion,
                        ciudad: rawDataContrato.ciudadExpedicion,
                        recursos: rawDataContrato.recursos,
                    }}
                    colaborador={{
                        nombre: rawDataContrato.colaborador,
                        usuario: rawDataContrato.colaboradorUsuario,
                    }}
                    datosCuenta={{
                        producto: rawDataContrato.producto,
                        numero: rawDataContrato.numeroCuenta,
                        fecha: rawDataContrato.fechaApertura,
                        oficina: rawDataContrato.nameCodeOficina,
                        valorMensual: rawDataContrato.valorMensual,
                        fechaFacturacion: rawDataContrato.fechaFacturacion,
                        plazo: rawDataContrato.plazo,
                    }}
                    firmas={{
                        cliente: rawDataContrato.firmaCliente,
                        colaborador: rawDataContrato.firmaColaborador,
                        extra: rawDataContrato.firmantes,
                    }}
                    contenido={{
                        logo: contenidoDoc.data[0].logo,
                        anverso: contenidoDoc.data[0].anverso,
                        reverso: contenidoDoc.data[0].reverso,
                        vigilado: contenidoDoc.data[0].vigilado,
                        fogafin: contenidoDoc.data[0].fogafin,
                        text1: contenidoDoc.data[0].text1,
                        text2: contenidoDoc.data[0].text2,
                        text3: contenidoDoc.data[0].text3,
                        text4: contenidoDoc.data[0].text4,
                        text5: contenidoDoc.data[0].text5,
                        text6: contenidoDoc.data[0].text6,
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


    return (
        <div className='w-full'>
            <div>
                <div className='col-span-2 flex justify-evenly'>
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
                    {
                        isPAP &&
                        <button
                            className={activarTab === 3 ? 'bg-white  rounded-t-md py-2 w-64' : 'bg-gray-300  rounded-t-md py-2 w-64'}
                            onClick={(e) => { onClickTab(e, 3) }}
                        >
                            Asignar Plan de Ahorros
                        </button>
                    }

                </div>
                <div className='w-full border px-4 py-4 rounded-md shadow-sm bg-white'>
                    {
                        activarTab === 1 ? (
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
                                                    {rolOptions?.map(option => (
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
                                                    {tipoPersonaOptions.map(option => (
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
                                                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-coomeva_color-rojo hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '
                                                >
                                                    Buscar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Display client name if found, otherwise keep empty */}
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
                                                listaTipoSociedad.map(option => (
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
                                    <button
                                        onClick={handleContinue}
                                        disabled={rolesAsignados.length === 0}
                                        className={`px-10 py-2 text-xs  rounded-md shadow-md ${rolesAsignados.length === 0 ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </>)
                            : activarTab === 2 ? (
                                <form id='formPropietario' name='formPropietario'>
                                    <div className='w-full border px-4 py-4 rounded-b-md shadow-sm bg-white  flex flex-col gap-y-8'>
                                        <div className="flex gap-10">
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
                                                    {listaProducto.map(option => (
                                                        <option key={option.code} value={option.code}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex-1 flex-col items-center'>
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
                                                    {listaMoneda.map(option => (
                                                        <option key={option.code} value={option.code}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex-1 flex-col items-center'>
                                                <div className='flex'>
                                                    <label htmlFor="productoBancario" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Producto Bancario</label>
                                                    <p className='text-coomeva_color-rojo'>*</p>
                                                </div>
                                                <select
                                                    id="productoBancario"
                                                    name="productoBancario"
                                                    value={formOperacion?.productoBancario}
                                                    onChange={onChangeOperacion}
                                                    required={true}
                                                    className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                >
                                                    <option value="">Seleccione</option>
                                                    {listaProductoBancario.map(option => (
                                                        <option key={option.code} value={option.code}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-10">
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
                                                    className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                >
                                                    <option value="">Seleccione</option>
                                                    {listaCategoria.map(option => (
                                                        <option key={option.code} value={option.code}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex-1 flex-col items-center'>
                                                <div className='flex'>
                                                    <label htmlFor="tipoPromedio" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Tipo de promedio</label>
                                                    <p className='text-coomeva_color-rojo'>*</p>
                                                </div>
                                                <select
                                                    id="tipoPromedio"
                                                    name="tipoPromedio"
                                                    value={formOperacion?.tipoPromedio}
                                                    onChange={onChangeOperacion}
                                                    required={true}
                                                    className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                >
                                                    <option value="">Seleccione</option>
                                                    {listaTipoPromedio.map(option => (
                                                        <option key={option.codLista} value={option.codLista}>{option.descripcion}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex-1 flex-col items-center'>
                                                <div className='flex'>
                                                    <label htmlFor="tipoCapitalizacion" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Tipo capitalización </label>
                                                    <p className='text-coomeva_color-rojo'>*</p>
                                                </div>
                                                <select
                                                    id="tipoCapitalizacion"
                                                    name="tipoCapitalizacion"
                                                    value={formOperacion?.tipoCapitalizacion}
                                                    onChange={onChangeOperacion}
                                                    required={true}
                                                    className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                >
                                                    <option value="">Seleccione</option>
                                                    {listaTipoCapitalizacion.map(option => (
                                                        <option key={option.codLista} value={option.codLista}>{option.descripcion}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-10">
                                            <div className='flex-1 flex-col items-center'>
                                                <div className='flex'>
                                                    <label htmlFor="origen" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Origen</label>
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
                                                    {listaOrigen.map(option => (
                                                        <option key={option.code} value={option.code}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex-1 flex-col items-center'>
                                                <div className='flex'>
                                                    <label htmlFor="oficial" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Oficial Administrador</label>
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
                                                    {listaOficiales.map(option => (
                                                        <option key={option.code} value={option.value}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex-1 flex-col items-center'>
                                                <div className='flex'>
                                                    <label htmlFor="oficina" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Oficina</label>
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
                                                    {listaOficina.map(option => (
                                                        <option id={option.code} key={option.code} data-value={option.value} value={option.code}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-10">
                                            <div className={isICBF ? 'flex-1 flex-col items-center' : 'w-[31.4%]'}>
                                                <div className='flex'>
                                                    <label htmlFor="titularidad" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Titularidad</label>
                                                    <p className='text-coomeva_color-rojo'>*</p>
                                                </div>
                                                <select
                                                    id="titularidad"
                                                    name="titularidad"
                                                    value={formOperacion?.titularidad}
                                                    onChange={onChangeOperacion}
                                                    required={true}
                                                    className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                >
                                                    <option value="">Seleccione</option>
                                                    {listaTitularidad.map(option => (
                                                        <option key={option.code} value={option.code}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={isICBF ? 'flex-1 flex-col items-center' : 'hidden'}>
                                                <div className='flex'>
                                                    <label htmlFor="tipoServicio" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Tipo Servicio</label>
                                                    <p className='text-coomeva_color-rojo'>*</p>
                                                </div>
                                                <select
                                                    id="tipoServicio"
                                                    name="tipoServicio"
                                                    value={formOperacion?.tipoServicio}
                                                    onChange={onChangeOperacion}
                                                    required={isICBF}
                                                    className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                >
                                                    <option value="">Seleccione</option>
                                                    {listaTipoServicio.map(option => (
                                                        <option key={option.code} value={option.code}>{option.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={isICBF ? 'flex-1 flex-col items-center' : 'hidden'}>
                                                <div className='flex'>
                                                    <label htmlFor="numeroContrato" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Numero Contrato</label>
                                                    <p className='text-coomeva_color-rojo'>*</p>
                                                </div>
                                                <input
                                                    id="numeroContrato"
                                                    name="numeroContrato"
                                                    value={formOperacion?.numeroContrato}
                                                    onChange={onChangeOperacion}
                                                    required={isICBF}
                                                    className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                >
                                                </input>
                                            </div>
                                        </div>
                                        <div className="w-[100%]">
                                            <div className='flex-1 flex-col items-center'>
                                                <label htmlFor="nombreCuenta" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Nombre de la cuenta</label>
                                                <input
                                                    id="nombreCuenta"
                                                    name="nombreCuenta"
                                                    value={formOperacion?.nombreCuenta || isICBF ? rolesAsignados[0]?.nombreCliente + '- CM -' + formOperacion?.numeroContrato : rolesAsignados[0]?.nombreCliente}
                                                    onChange={onChangeOperacion}
                                                    disabled={rolesAsignados.length > 0 ? !(rolesAsignados[0].tipoPersona == 2 && (rolesAsignados[0].tipoCompania == 24 || rolesAsignados[0].tipoCompania == 30 || rolesAsignados[0].tipoCompania == 28 || rolesAsignados[0].tipoCompania == 33)) : true}
                                                    className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                >
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-around py-5'>
                                        {
                                            showDescarga &&
                                            <button
                                                type='button'
                                                onClick={(e) => solicitarRecursos(e)}
                                                className='border rounded-md py-1 px-10 flex items-center'
                                                title='Formato Apertura de Cuenta'
                                            >
                                                <GrDocumentPdf /><span className='ml-3'>DESCARGAR FORMATO</span>
                                            </button>
                                        }
                                        {
                                            showDescarga &&
                                            <button
                                                onClick={(e) => finalizar(e)}
                                                className='border rounded-md py-1 px-10'
                                            >
                                                FINALIZAR
                                            </button>
                                        }
                                        <button
                                            id='p2'
                                            onClick={(e) => pestanaAnterior(e)}
                                            disabled={isCreado}
                                            className={`border rounded-md py-1 px-10 ${isCreado ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                        >
                                            ANTERIOR
                                        </button>
                                        {
                                            isPAP &&
                                            <button
                                                id='p4'
                                                onClick={(e) => pestanaAnterior(e)}
                                                className='border rounded-md py-1 px-10'
                                            >
                                                SIGUIENTE
                                            </button>
                                        }
                                        {
                                            !isPAP &&
                                            <button
                                                onClick={isICBF ? crearCuentaMaestra : crearPropietario}
                                                disabled={isCreado}
                                                className={`border rounded-md py-1 px-10 ${isCreado ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                            >
                                                CREAR
                                            </button>
                                        }
                                    </div>
                                </form>)
                                : activarTab === 3 && (
                                    <form name="formAsignar" id="formAsignar" className="space-y-4">
                                        <div className='w-full border px-4 py-8 rounded-b-md shadow-sm bg-white  flex flex-col gap-y-8'>
                                            <div className="flex gap-10">
                                                {/* Motivo de Ahorro */}
                                                <div className='flex-1 flex-col items-center'>
                                                    <div className='flex'>
                                                        <label htmlFor="motivoAhorro" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Motivo de Ahorro</label>
                                                        <p className='text-coomeva_color-rojo'>*</p>
                                                    </div>
                                                    <select
                                                        id="motivoAhorro"
                                                        name="motivoAhorro"
                                                        value={formAsignar?.motivoAhorro}
                                                        onChange={onChangeAsignacion}
                                                        required={true}
                                                        className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    >
                                                        <option value="">Seleccione</option>
                                                        {listaMotivoAhorro.map(option => (
                                                            <option key={option.code} value={option.code}>{option.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Fecha de Inicio */}
                                                <div className='flex-1 flex-col items-center'>
                                                    <div className='flex'>
                                                        <label htmlFor="motivoAhorro" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Fecha de Inicio</label>
                                                        <p className='text-coomeva_color-rojo'>*</p>
                                                    </div>
                                                    <input
                                                        id="fechaInicio"
                                                        name="fechaInicio"
                                                        type='date'
                                                        value={formAsignar?.fechaInicio}
                                                        onChange={onChangeAsignacion}
                                                        required={true}
                                                        readOnly
                                                        className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>
                                                {/* Frecuencia */}
                                                <div className='flex-1 flex-col items-center'>
                                                    <div className='flex'>
                                                        <label htmlFor="frecuencia" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Frecuencia</label>
                                                        <p className='text-coomeva_color-rojo'>*</p>
                                                    </div>
                                                    <select
                                                        id="frecuencia"
                                                        name="frecuencia"
                                                        value={formAsignar?.frecuencia}
                                                        onChange={onChangeAsignacion}
                                                        required={true}
                                                        className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    >
                                                        <option value="">Seleccione</option>
                                                        {listaTipoFrecuencia.map(option => (
                                                            <option key={option.code} value={option.code}>{option.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Día */}
                                                <div className='flex-1 flex-col items-center'>
                                                    <div className='flex'>
                                                        <label htmlFor="numeroCuotas" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Día</label>
                                                        <p className='text-coomeva_color-rojo'>*</p>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <input
                                                            type="number"
                                                            id="numeroDia"
                                                            name="numeroDia"
                                                            placeholder="Número Días"
                                                            value={formAsignar?.numeroDia}
                                                            onChange={onChangeAsignacion}
                                                            //required={true}
                                                            readOnly
                                                            //onBlur={onBlurNCuotas}
                                                            className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-10">
                                                {/* Tipo de Vencimiento */}
                                                <div className='flex-1 flex-col items-center'>
                                                    <div className="flex">
                                                        <label htmlFor="tipoVencimiento" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Tipo de Vencimiento</label>
                                                        <p className='text-coomeva_color-rojo'>*</p>
                                                    </div>
                                                    <select
                                                        id="tipoVencimiento"
                                                        name="tipoVencimiento"
                                                        value={formAsignar?.tipoVencimiento}
                                                        onChange={onChangeAsignacion}
                                                        required={true}
                                                        className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    >
                                                        <option value="">Seleccione</option>
                                                        {listaTipoVencimiento.map(option => (
                                                            <option key={option.codLista} value={option.codLista}>{option.descripcion}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Numero de Cuotas */}
                                                <div className='flex-1 flex-col items-center'>
                                                    <div className='flex'>
                                                        <label htmlFor="numeroCuotas" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>No. de Cuotas</label>
                                                        <p className='text-coomeva_color-rojo'>*</p>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <input
                                                            type="number"
                                                            id="numeroCuotas"
                                                            name="numeroCuotas"
                                                            placeholder="Número Cuotas"
                                                            value={formAsignar?.numeroCuotas}
                                                            onChange={onChangeAsignacion}
                                                            required={true}
                                                            onBlur={onBlurNCuotas}
                                                            className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        />
                                                        <span className='border py-2 px-3 gray-300 rounded-md shadow-sm sm:text-sm bg-gray-300'>Cuotas</span>
                                                    </div>
                                                    {(isNCuotaValido)
                                                        &&
                                                        <p className="text-coomeva_color-rojo text-sm">
                                                            Por caracterización del producto el plazo minino es de 6 cuotas y maximo 12.
                                                        </p>
                                                    }
                                                </div>
                                                {/* Fecha de Vencimiento */}
                                                <div className='flex-1 flex-col items-center'>
                                                    <div className='flex'>
                                                        <label htmlFor="motivoAhorro" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Fecha de Vencimiento</label>
                                                        <p className='text-coomeva_color-rojo'>*</p>
                                                    </div>
                                                    <input
                                                        id="fechaVencimiento"
                                                        name="fechaVencimiento"
                                                        type='date'
                                                        value={formAsignar?.fechaVencimiento}
                                                        onChange={onChangeAsignacion}
                                                        //required={true}
                                                        readOnly
                                                        className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>
                                                {/* Valor */}
                                                <div className='flex-1 flex-col items-center'>
                                                    <div className='flex'>
                                                        <label htmlFor="nValor" className='text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Valor</label>
                                                        <p className='text-coomeva_color-rojo'>*</p>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="nValor"
                                                        name="nValor"
                                                        placeholder="Valor"
                                                        value={formAsignar?.nValor}
                                                        autoComplete='off'
                                                        required={true}
                                                        onChange={onChangeAsignacion}
                                                        onBlur={onBlurNValor}
                                                        className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                    {(isNValorValido)
                                                        &&
                                                        <p className="text-coomeva_color-rojo text-sm">
                                                            El valor minimo de apertura del producto es de $ 50.000 ( COP)
                                                        </p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex gap-10">
                                                {/* Renovación Automática */}
                                                <div className='flex-1 content-center'>
                                                    <input
                                                        type="checkbox"
                                                        id="renovacionAutomatica"
                                                        name="renovacionAutomatica"
                                                        checked={formAsignar.renovacionAutomatica}
                                                        onChange={(e) =>
                                                            setFormAsignar((state) => ({
                                                                ...state,
                                                                renovacionAutomatica: e.target.checked,
                                                            }))
                                                        }
                                                        className='py-2 px-3 sm:text-sm'
                                                    />
                                                    <label htmlFor="renovacionAutomatica" className=' px-2 text-sm font-medium text-gray-700 mb-1 mr-2 min-w-[40px]'>Renovación Automática</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-around py-5'>
                                            {
                                                showDescarga &&
                                                <button
                                                    type='button'
                                                    onClick={(e) => solicitarRecursos(e)}
                                                    className='border rounded-md py-1 px-10 flex items-center'
                                                    title='Formato Apertura de Cuenta'
                                                >
                                                    <GrDocumentPdf /><span className='ml-3'>DESCARGAR FORMATO</span>
                                                </button>
                                            }
                                            {
                                                showDescarga &&
                                                <button
                                                    onClick={(e) => finalizar(e)}
                                                    className='border rounded-md py-1 px-10'
                                                >
                                                    FINALIZAR
                                                </button>
                                            }
                                            <button
                                                id='p3'
                                                onClick={(e) => pestanaAnterior(e)}
                                                disabled={isCreado}
                                                className={`border rounded-md py-1 px-10 ${isCreado ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                            >
                                                ANTERIOR
                                            </button>
                                            <button
                                                onClick={crearAsignarPlanAhorro}
                                                disabled={isCreado}
                                                className={`border rounded-md py-1 px-10 ${isCreado ? 'bg-coomeva_color-grisPestaña text-white cursor-not-allowed' : 'bg-coomeva_color-rojo text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 '}`}
                                            >
                                                CREAR
                                            </button>
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
                <DynamicModal titulo={'Notificación'} mostrarModal={isICBF ? endModalCuentaMaestra : endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
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
        </div >
    );
};