'use client'

import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
//import { fn_pool_soap } from "@/app/lib/services/soap/fn_pool_soap";
import ListTipoDocument from './ListTipoDocumentRadicacionClientes';
import { usePerfil } from "@/app/hooks/usePerfil";
import React, { useEffect, useState, useRef } from "react";
import { formatearFecha, generarCadenaVerficacion, infoTabs, objectoValidarCampoAdministracion, TabsCamposClientes, TabsCamposClientPn, TabsPersonaJuridicaRadicacionCliente, TabsPersonaJuridicaRadicacionClienteSegundo, TabsPersonalNaturalRadicacionCliente } from "@/app/lib/utils";
import Loading from "../../share/Loading";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
//import { queryAccionistasPj, queryAccionistasPn, queryBeneficiariosPJ, queryBeneficiariosPn, querycdtProcducto, queryContactosAutorizadosPj, queryControlantes, queryConvenioActualProducto, queryCreditoProducto, queryCuentasProducto, queryInformacionFinancieraPj, queryJuntaDirectivaPj, queryJuntaDirectivaPn, queryReciprocidadProducto, queryRepresentanteLegalPj, queryResidenciaFiscalPj } from "@/app/lib/apisClientePj/actions";
//import { queryActividadEconomicaPn, queryDetalleActividadPn, queryReferenciasPn, queryResidenciaFiscalPn } from "@/app/lib/apisClientePn/actions";
import { queryClientePj } from "@/app/lib/apisClientePj/fn_queryClientePj";
import { queryClientePn } from "@/app/lib/apisClientePn/fn_queryClientePn";
import Modals from "../../share/Modals";
import ModalsForForm from "../../share/ModalsForForm";

import { CheckInputRojo } from "../../share/CheckInputRojo";
import { CampoLista } from "../../share/CampoLista";
import { CampoNumero } from "../../share/CampoNumero";
import { CampoTexto } from "../../share/CampoTexto";
import { CheckDesplazable } from "../../share/CheckDesplazable";
import { CampoFecha } from "../../share/CampoFecha";
import { CampoCorreo } from "../../share/CampoCorreo";
import { fnInspektor } from '@/app/lib/inspektor/fn_inspektor';
import { fn_catalogosFetchLists } from '@/app/lib/apisClientePj/fn_catalogosFetchLists';
import { fn_crearModificarParticipantes } from '@/app/lib/apisClientePj/fn_crearModificarParticipantes';


const DynamicModal = dynamic(() => import('../../share/Modals'))


export default function FormSearchRadicacionClientes({ listaModalProspecto = {}, enableInputActividad, searchParams, enableListDoc, enableInput,
    convenioNegociar, tipoConv, paragraph2, btnConsultar, btnNuevo, placeholderBuscarDocumento, listTipoDocumentId, perfilCliente }) {


    const { cliente, updateDataCliente, limpiarProvider, pathConvenio, updateDocumentoCliente, inputDocument, limpiarProviderRadicacionCliente } = usePerfil();
    const contextRadCliente = useProviderRadClient;


    const { crearClienteNuevoProspectoActualizar, perfilPn, perfilPj, actualizarPerfilPn, actualizarReferenciaPn, actualizarActiviadEconomicaPn,
        actualizarDetalleActiviadEconomicaPn, actualizarResidenciaFiscalPn, actualizarTabBarSeleccionado, tabBarSeleccionado, actualizarPerfilPj,
        actualizarRepresentanteLegalPj, actualizarContactoAutorizadoPj, actualizarBeneficiarioPj, actualizarInformacionFinancieraPj,
        actualizarControlantesPj, actualizarAccionistasPn, actualizarTipoPersona, actualizarJuntaDirectivaPn, actualizarActivarConsulta,
        activarConsulta, modalProspectoPjPn, actualizarModalProspectoPnPj, clienteNuevoProspectoActualizar, actualizarCreditoProducto,
        actualizarCuentasProducto, actualizarCdtProducto, actualizarConvenioActualProducto, actualizarReciprocidadProducto, limpiarConsorcio
    } = contextRadCliente();


    const patnName = usePathname();
    const { replace, push } = useRouter();
    const [habilitarBtnNuevo, setHabilitarBtnNuevo] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [modalInspecktor, setModalInspecktor] = useState(false);
    const [messageModalInspecktor, setMessageModalInspecktor] = useState('');
    const [loading, setLoadin] = useState(false);
    const rutaActual = (patnName.split('/'))[2] || 'radicacion';
    const [mostrarModalProspecto, setMostrarModalProspecto] = useState(false)
    const [remi, setRemi] = useState('');
    const [catalogo, setCatalogo] = useState({});
    const informacion = infoTabs[`${pathConvenio}`];
    const dataCamposAdministacion = []

    const [modalProspectos, setModalProspectos] = useState(false);
    const [messageModalProspecto, setMessageModalProspecto] = useState('');

    const [modalGuardarProspecto, setModalGuardarProspectos] = useState(false);
    const [messageGuardarProspecto, setMessageGuardarProspecto] = useState('');

    const [dataReporte, setDataReporte] = useState([]);

    useEffect(() => {
        if (mostrarModalProspecto) {
            try {
                if (Object.keys(catalogo).length === 0) {

                    const timeoutCatalogo = setTimeout(async () => {
                        const cat = JSON.parse(await fn_catalogosFetchLists());
                        setCatalogo(cat);
                    }, 300);

                    return () => clearTimeout(timeoutCatalogo);
                }
            } catch (error) {
                console.log(error)
            };
        }
    }, [mostrarModalProspecto]);


    useEffect(() => {
        autoBusqueda();
    }, []);


    const autoBusqueda = () => {
        if (searchParams !== undefined) {
            const queryUrl = Object.keys(searchParams);
            if (queryUrl.length > 0) {
                document.getElementById('numDocumento').value = '';
                document.getElementById('tipoDocumento').value = '';
                onClickConsultarCliente();
            };
        };
    };


    //MONTAR DEPARTAMENTO
    const [lDepartamentos, setLDepartamentos] = useState([]);
    const [montarDepartamento, setMontarDepartamento] = useState(false);
    useEffect(() => {
        try {
            if (montarDepartamento) {
                setLDepartamentos(catalogo.listDepartemento);
                return;
            }
            setLDepartamentos([]);
        } catch (error) {
            console.log(error)
        }
    }, [montarDepartamento]);


    //MONTAR CIUDAD
    const [lCiudad, setLCiudad] = useState([]);
    const [montarCiudad, setMontarCiudad] = useState(false);
    useEffect(() => {
        let codCiudad = montarCiudad;
        try {
            if (!montarCiudad) {
                setLCiudad([]);
                return;
            }
            const catCiudad = catalogo.listCiduades.filter(ciudades => ciudades.code.startsWith(codCiudad));
            setLCiudad(catCiudad);
        } catch (error) {
            console.log(error)
        };
    }, [montarCiudad]);


    //MONTAR Provincia de nacimiento
    const [ltProvinciaNacimiento, setLtProvinciaNacimiento] = useState([]);
    const [montarProvinciaNacimiento, setMontarProvinciaNacimiento] = useState(false);
    useEffect(() => {
        try {
            if (montarProvinciaNacimiento) {
                setLtProvinciaNacimiento(catalogo.listDepartemento);
                return;
            }
            setLtProvinciaNacimiento([]);
        } catch (error) {
            console.log(error)
        }
    }, [montarProvinciaNacimiento]);


    //MONTAR Ciudad de nacimiento
    const [ltCiudadesNac, setLtCiudadesNac] = useState([]);
    const [montarCiudadesNac, setMontarCiudadesNac] = useState(false);
    useEffect(() => {
        let codCiudad = montarCiudadesNac;
        try {
            if (!montarCiudadesNac) {
                setLtCiudadesNac([]);
                return;
            }
            const catCiudad = catalogo.listCiduades.filter(ciudades => ciudades.code.startsWith(codCiudad));
            setLtCiudadesNac(catCiudad);
        } catch (error) {
            console.log(error)
        };
    }, [montarCiudadesNac]);


    const onClickConsultarCliente = async (e) => {

        e?.preventDefault();
        setLoadin(true);
        limpiarProviderRadicacionCliente();
        limpiarConsorcio();
        localStorage.clear();


        const inputBuscar = document.getElementById('numDocumento').value || Object.values(searchParams)[0];
        const tipoDocument = document.getElementById('tipoDocumento').value || tabBarSeleccionado;


        if (inputBuscar === undefined || tipoDocument === "") {
            setLoadin(false)
            setMessageModal('Ingrese el número de identificación del cliente')
            setMostrarModal(!mostrarModal)
            return
        };

        if (tipoDocument === 'NIT' && inputBuscar.length !== 9) {
            setLoadin(false)
            setMessageModal('Por favor, ingrese un NIT válido de 9 dígitos')
            setMostrarModal(!mostrarModal)
            return
        };

        if ((tipoDocument !== 'NIT') && inputBuscar.length < 7) {
            setLoadin(false)
            setMessageModal('Por favor, ingrese un número de documento válido con un mínimo de 7 dígitos')
            setMostrarModal(!mostrarModal)
            return
        };


        //Buscar Cliente PJ
        if (tipoDocument === 'NIT') {

            try {

                const dataBuscarClientePj = {
                    "identification": inputBuscar,
                    "identificationType": `${tipoDocument}`,
                    "customerType": 'PJ'
                };

                const clientePj = JSON.parse(await queryClientePj(JSON.stringify(dataBuscarClientePj)));
                

                if (clientePj.state !== 200) {
                    setLoadin(false);
                    setMessageModal(clientePj.message);
                    setMostrarModal(!mostrarModal);
                    setHabilitarBtnNuevo(false);
                    actualizarPerfilPj(clientePj.datosGeneralesPj)
                    return
                };


                const creditoP = [] //JSON.parse(await queryCreditoProducto(inputBuscar));
                const cuentasP = [] //JSON.parse(await queryCuentasProducto(inputBuscar));
                const cdtP = [] //JSON.parse(await querycdtProcducto(inputBuscar));
                const convenioActual = [] //JSON.parse(await queryConvenioActualProducto(inputBuscar));
                const reciprocidad = [] //JSON.parse(await queryReciprocidadProducto(inputBuscar));

                actualizarCreditoProducto(creditoP?.data || []);
                actualizarCuentasProducto(cuentasP?.data || []);
                actualizarCdtProducto(cdtP?.data || []);
                actualizarConvenioActualProducto(convenioActual?.data || []);
                actualizarReciprocidadProducto(reciprocidad?.data || []);

                setHabilitarBtnNuevo(true);
                actualizarActivarConsulta(true);


                if (clientePj.state === 200) {
                    const cliente = JSON.parse(clientePj.data)
                    
                    cliente.datosBasicos['direcciones'] = {
                        direccionNegocio: cliente?.datosBasicos?.direccionNegocio || [],
                        direccionSucursal: cliente?.datosBasicos?.direccionSucursal || []
                    }

                    cliente.datosBasicos.telefonos = {
                        telefonoNegocio: cliente?.datosBasicos?.telefonosNegocio || [],
                        telefonoOficina: cliente?.datosBasicos?.telefonosOficina || [],
                        telefonoPersonalAutorizado: cliente?.datosBasicos?.telefonosPersonalAutorizado || []
                    }

                    actualizarPerfilPj(cliente?.datosBasicos);
                    actualizarInformacionFinancieraPj(cliente?.informacionFinanciera || []);


                    //Servicio inspektor
                    await servicioInspektor();

                }

            } catch (error) {
                console.log(error)
                setMessageModal(error.message)
                setMostrarModal(!mostrarModal)
                actualizarActivarConsulta(false)
            } finally {
                setLoadin(false)
                //return
            }

        };


        // Buscar Cliente PN
        if (tipoDocument !== 'NIT') {

            try {

                const dataBuscarClientePn = {
                    "identification": inputBuscar,
                    "identificationType": `${tipoDocument}`,
                    "customerType": 'PN'
                };

                //updateDocumentoCliente

                const clientePn = JSON.parse(await queryClientePn(JSON.stringify(dataBuscarClientePn)));


                if (clientePn.state !== 200) {
                    setLoadin(false)
                    setHabilitarBtnNuevo(false)
                    setMessageModal(clientePn.message)
                    setMostrarModal(!mostrarModal)
                    actualizarPerfilPn(clientePn)
                    return
                };

                //const data = JSON.parse(clientePn.data)

                const creditoP = '' //JSON.parse(await queryCreditoProducto(inputBuscar));
                const cuentasP = '' //JSON.parse(await queryCuentasProducto(inputBuscar));
                const cdtP = '' //JSON.parse(await querycdtProcducto(inputBuscar));
                const convenioActual = '' //JSON.parse(await queryConvenioActualProducto(inputBuscar));
                const reciprocidad = '' //JSON.parse(await queryReciprocidadProducto(inputBuscar));

                actualizarCreditoProducto(creditoP?.data || []);
                actualizarCuentasProducto(cuentasP?.data || []);
                actualizarCdtProducto(cdtP?.data || []);
                actualizarConvenioActualProducto(convenioActual?.data || []);
                actualizarReciprocidadProducto(reciprocidad?.data || []);

                setHabilitarBtnNuevo(true)
                actualizarActivarConsulta(true)

                if (clientePn.state == 200) {

                    const dataClientePn = JSON.parse(clientePn.data);
                    dataClientePn.state = clientePn.state;

                    dataClientePn.cliente = dataClientePn?.datosBasicos.informacionGenerales.primerApellido + ' ' +
                        dataClientePn?.datosBasicos.informacionGenerales?.segundoApellido + ' ' +
                        dataClientePn?.datosBasicos.informacionGenerales?.primerNombre + ' ' +
                        dataClientePn?.datosBasicos.informacionGenerales?.segundoNombre

                    actualizarPerfilPn(dataClientePn);
                    actualizarReferenciaPn(dataClientePn)
                    actualizarTipoPersona(clientePn?.datosBasicos?.reference?.codStatusCliente == 'A' ? 20 : clientePn?.datosBasicos?.reference?.codStatusCliente == 'P' ? 30 : 10);

                    //Servicio inspektor
                    await servicioInspektor();

                }

                //const residenciaFiscalPn = JSON.parse(await queryResidenciaFiscalPn(inputBuscar))
                const residenciaFiscalPn = clientePn?.residenciaFiscalPn;
                if (clientePn.state === 200) {
                    actualizarResidenciaFiscalPn(residenciaFiscalPn)
                    //console.clear();

                }

                //const actividadEconomicaPn = JSON.parse(await queryActividadEconomicaPn(inputBuscar));
                const actividadEconomicaPn = clientePn?.actividadEconomicaPn;
                if (clientePn.state === 200) {
                    actualizarActiviadEconomicaPn(actividadEconomicaPn);

                    //const detalleActividadPn = JSON.parse(await queryDetalleActividadPn(inputBuscar))
                    let parseoData = [];
                    parseoData.push(clientePn?.detalleActividadPn);
                    const detalleActividadPn = parseoData;
                    actualizarDetalleActiviadEconomicaPn(detalleActividadPn);
                }

                //const referenciaPn = JSON.parse(await queryReferenciasPn(inputBuscar));

                if (clientePn.state === 200) {
                    let parseoData = [];
                    parseoData.push(clientePn.referenciaPn);
                    const referenciaPn = parseoData;
                    actualizarReferenciaPn(referenciaPn);
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoadin(false)
            }
        };

    };


    const rutearConsulta = async (tipoDocument) => {
        try {
            if (tipoDocument !== 'NIT') {
                return;
            }

            push('/radicacionCliente/radicacionPj/datosPersonaJuridicaPj');

        } catch (error) {
            console.log(error)
            return false;
        }
    };


    const validarNumeroDocumento = (e) => {
        const numero = /^\d+$/.test(e.target.value)
        const tipoDocument = document.getElementById('tipoDocumento').value
        const inputBuscar = document.getElementById('numDocumento').value
        if ((!numero || e.target.value.length > 9) && tipoDocument == 'NIT' && e.target.value !== '') {
            e.target.value = e.target.value.slice(0, 9);
            return;
        }

        if (!numero && e.target.value !== '' || (tipoDocument == 'NIT' && inputBuscar.length == 10)) {
            // document.getElementById(e.target.id).value = e.target.value.length > 1 ?(e.target.value).slice(0, -1):''
            return
        }

        updateDocumentoCliente(e.target.value)
    };


    const validarUnDigito = () => {
        const inputElement = document.getElementById('digitoVerificacion');
        const valor = inputElement.value;

        if (!/^\d+$/.test(valor)) {
            inputElement.value = valor.replace(/\D/g, '');
        }

        if (valor.length > 1) {
            inputElement.value = valor.slice(-1);
        }
    };


    const onChangeListTipoDocumento = (e) => {
        limpiarProviderRadicacionCliente()
        actualizarTabBarSeleccionado(e.target.value)
        crearClienteNuevoProspectoActualizar('')
        const ruta = {
            '1': TabsPersonalNaturalRadicacionCliente[0].href,
            '2': TabsPersonaJuridicaRadicacionClienteSegundo[0].href
        }
        //console.log(e.target.value)
        push(ruta[e.target.value != 'NIT' ? '1' : '2'])
    };


    const onBlurNumeroDocumento = (e) => {
        const tipoDocument = document.getElementById('tipoDocumento').value
        tipoDocument == 'NIT' && updateDataCliente({ nit: generarCadenaVerficacion({ nit: e.target.value }) })
    };


    const cerrarModal = async () => {
        setMostrarModal(!mostrarModal);
        //Servicio inspektor
        await servicioInspektor();
    };


    const cerrarModalInspector = async () => {
        const tipoIdentificacion = document.getElementById('tipoDocumento').value
        await rutearConsulta(tipoIdentificacion);
        setModalInspecktor(!modalInspecktor);
    };


    const cerrarModalProspecto = async () => {
        setModalProspectos(!modalProspectos);
    };


    const limpiarModalGuardarProspecto = async () => {
        localStorage.clear();
        actualizarModalProspectoPnPj({});
        setMontarDepartamento(false);
        setMontarCiudad(false);
        setMontarProvinciaNacimiento(false);
        setMontarCiudadesNac(false);
        setModalGuardarProspectos(false);
    };


    const nuevoClientePropectoActualizar = (opcion) => {
        if (opcion == '1' || opcion == '2') {
            limpiarProviderRadicacionCliente()
        }
        crearClienteNuevoProspectoActualizar(opcion)
        localStorage.setItem('btnGuardar', 1);
    };


    const onClickButtomNuevoProspecto = () => {
        setMostrarModalProspecto(true)
    };


    const onChangeProspecto = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;
        actualizarModalProspectoPnPj({
            ...modalProspectoPjPn,
            [name]: inputValue
        });

        switch (name) {
            case 'paisNacimiento': {
                localStorage.removeItem('paisCode');
                localStorage.setItem("paisCode", inputValue);
                setMontarProvinciaNacimiento(true);
                break;
            }
            case 'provinciaNacimiento': {
                setMontarCiudadesNac(inputValue);
                break;
            }
            case 'pais': {
                localStorage.removeItem('paisCode');
                localStorage.setItem("paisCode", inputValue);
                setMontarDepartamento(true);
                break;
            }
            case 'departamento': {
                setMontarCiudad(inputValue);
                break;
            }
            default:
                break;
        };
    };


    const guardarProspecto = async () => {
        try {
            setLoadin(true);
            const resGuardarParticipante = JSON.parse(await fn_crearModificarParticipantes(JSON.stringify([modalProspectoPjPn])));

            if (resGuardarParticipante.status !== 200) {
                setLoadin(false);
                setMessageModalProspecto(resGuardarParticipante.message);
                setModalProspectos(true);
                return;
            };

            setLoadin(false);
            setMessageGuardarProspecto(resGuardarParticipante.message);
            setModalGuardarProspectos(true);


        } catch (error) {
            console.log(error)
        };
    };


    const servicioInspektor = async () => {
        const numeroIdentificacion = document.getElementById('numDocumento').value || Object.values(searchParams)[0];
        const tipoIdentificacion = document.getElementById('tipoDocumento').value || tabBarSeleccionado;

        if (!numeroIdentificacion) {
            return;
        };

        const operationData = {
            "documentType": tipoIdentificacion,
            "documentNumber": numeroIdentificacion
        };

        const validarDocumentosListasRestrictivas = JSON.parse(await fnInspektor(JSON.stringify(operationData)));

        if (!validarDocumentosListasRestrictivas.authorized) {
            const listReference = validarDocumentosListasRestrictivas.listReference;
            setDataReporte(JSON.parse(listReference));
        } else {
            setDataReporte([]);
        };

        setMessageModalInspecktor(validarDocumentosListasRestrictivas.message);
        setModalInspecktor(true);
    };


    const cerrarModalProspectos = () => {
        localStorage.clear();
        actualizarModalProspectoPnPj({});
        setMontarDepartamento(false);
        setMontarCiudad(false);
        setMontarProvinciaNacimiento(false);
        setMontarCiudadesNac(false);
        setMostrarModalProspecto(false);
    };


    return (
        <>
            <form id='frmBuscar' className="flex justify-start items-center  w-full">
                {<div className='w-[60%]'>
                    <div className='flex w-[100%]'>
                        {enableListDoc ?
                            <div className="-ml-7 mr-6 items-end flex flex-col w-[28%]">
                                <ListTipoDocument tipoPersona={tabBarSeleccionado} listTipoDocumentId={listTipoDocumentId} onChangeList={onChangeListTipoDocumento} />
                                <div className="mt-4 flex justify-end w-[15%] ">
                                    <HiAdjustmentsHorizontal
                                        className="w-[100%] h-7"
                                        style={{ cursor: "pointer", color: "#FFFFFF" }}
                                        title="Settings"
                                    />
                                </div>
                            </div>

                            : null
                        }
                        {
                            enableInput.input1 ?
                                <div className={`flex flex-col w-[72%]`}>
                                    <div className='text-[#FFFFFF]  text-xs'><label htmlFor="numDocumento">Identificación</label></div>
                                    <input
                                        type="text"
                                        id="numDocumento"
                                        name="numDocumento"
                                        className="focus:outline-none font-normal flex item-start w-full bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                        placeholder={"Identificación Cliente"}
                                        value={inputDocument}
                                        autoComplete="off"
                                        onChange={validarNumeroDocumento}
                                        // disabled={rutaActual !== "radicacion" && rutaActual !== 'radicacionPj'}
                                        onBlur={onBlurNumeroDocumento}
                                    />

                                    <div className='mt-2 mr-8 flex flex-col w-[100%]'>
                                        <div className='text-[#FFFFFF]  text-xs'>
                                            <label htmlFor="nombreCliente">Cliente</label>
                                        </div>
                                        <input
                                            readOnly
                                            autoComplete="off"
                                            type="text"
                                            id="nombreCliente"
                                            onChange={() => { }}
                                            value={perfilPj?.datosGenerales?.razonSocial || perfilPn?.cliente
                                            }
                                            disabled={rutaActual !== "radicacion" && rutaActual !== 'radicacionPj'}
                                            className="focus:outline-none font-normal flex item-start w-full bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                        />
                                    </div>
                                </div>
                                : null
                        }
                        {
                            enableInputActividad ?
                                <div className={`flex flex-col w-[100%]`}>
                                    <input
                                        type="text"
                                        id="remi"
                                        name="remi"
                                        value={remi}
                                        onChange={(e) => setRemi(e.target.value)}
                                        className="focus:outline-none font-normal flex item-start w-full bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                        placeholder={placeholderBuscarDocumento}
                                        autoComplete="off"
                                    />
                                </div>
                                : null
                        }
                    </div>
                </div>
                }
                {
                    enableInput.input3 ?
                        <div className='flex space-x-6 w-[30%]'>
                            <div className='flex flex-col '>
                                <div className='text-[#FFFFFF]  text-xs'>
                                    <p htmlFor="convenioNegociar">Convenio a negociar</p>
                                </div>
                                <p
                                    // autoComplete="off"
                                    // type="text"
                                    id="convenioNegociar"
                                    name="convenioNegociar"
                                    // disabled={true}
                                    // defaultValue={convenioNegociar}
                                    className="focus:outline-none flex item-start w-full font-normal bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                >{convenioNegociar ? convenioNegociar : informacion?.convenioNegociar}</p>
                            </div>
                            <div className='flex flex-col'>
                                <div className='text-[#FFFFFF]  text-xs'>
                                    <label htmlFor="tipoConvenio">Tipo de convenio</label>
                                </div>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    id="tipoConvenio"
                                    name="tipoConvenio"
                                    disabled={true}
                                    placeholder={""}
                                    defaultValue={tipoConv}
                                    className="focus:outline-none font-normal flex item-start w-full bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                ></input>
                            </div>
                        </div>
                        : null}
                {
                    paragraph2 ?
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "start",
                            }}
                            className="hidden sm:block md:w-[70%] lg:w-[30%]"
                        >
                            <p className="hidden sm:block text-xs text-justify text-[#FFFFFF] w-[90%] h-auto">
                                Selecciona el tipo de producto y el tipo de operación que incluye la solicitud de precio preferencial. Pudes elegir un solo tipo de producto y operación o realizar varios en la misma solicitud
                            </p>
                        </div>
                        : null
                }
                {
                    btnConsultar ?
                        <div className={`ml-6 items-start justify-start flex flex-col w-[40%]`}>

                            {tabBarSeleccionado == 'NIT' ?
                                <>
                                    <div className='text-[#FFFFFF]  text-xs'>
                                        <label htmlFor="nombreCliente">Digito de verificación</label>
                                    </div>
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        id="digitoVerificacion"

                                        defaultValue={cliente?.nit}
                                        disabled={
                                            // rutaActual !== "radicacion"
                                            true
                                        }
                                        onChange={validarUnDigito}
                                        className="focus:outline-none font-normal flex item-start w-[70%] bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                    />
                                </>
                                :
                                <>
                                    <div className='text-[#FFFFFF]  text-xs'>
                                        <label htmlFor="nombreCliente" className="text-transparent">Digito de verificación</label>
                                    </div>
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        id="digitoVerificacion"

                                        defaultValue={cliente?.nit}
                                        disabled={
                                            // rutaActual !== "radicacion"
                                            true
                                        }
                                        onChange={validarUnDigito}
                                        className="focus:outline-none font-normal  flex item-start w-[70%] bg-transparent  text-transparent"
                                    />
                                </>
                            }

                            <div className=" mt-4 flex justify-start items-start w-[70%]" >
                                <BuscarClienteButtom
                                    onClickConsultarCliente={onClickConsultarCliente}
                                />
                                <div id="btnCliente" className="flex justify-center items-center w-[100%]">
                                    <button
                                        type="button"
                                        onClick={() => { nuevoClientePropectoActualizar('3') }}
                                        disabled={(!habilitarBtnNuevo || perfilCliente == 1 || activarConsulta == false)}
                                        className={`ml-2 flex justify-center items-center  ${(!habilitarBtnNuevo || perfilCliente == 1 || activarConsulta == false) ? 'bg-zinc-400' : 'bg-white text-coomeva_color-azulOscuro border border-coomeva_color-grisSombra'}   text-[#FFFFFF] w-[100%] h-8 rounded-md shadow hover:shadow-lg`}>
                                        Actualizar info
                                    </button>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </form>
            {
                btnNuevo ?
                    <div id="btnCliente" className="flex flex-col justify-center items-center  w-[20%]">
                        <button
                            onClick={() => { nuevoClientePropectoActualizar('1') }}
                            disabled={(habilitarBtnNuevo == true || perfilCliente == 1)}
                            className={`flex justify-center items-center  ${(habilitarBtnNuevo == true || perfilCliente == 1) ? 'bg-zinc-400' : 'bg-white text-coomeva_color-azulOscuro border border-coomeva_color-grisSombra'}   text-[#FFFFFF] w-full h-8 rounded-md shadow hover:shadow-lg`}>
                            Nuevo Cliente
                        </button>
                        <button
                            onClick={() => {
                                //nuevoClientePropectoActualizar('2')
                                onClickButtomNuevoProspecto()
                            }}
                            disabled={(habilitarBtnNuevo == true || perfilCliente == 1)}
                            className={`mt-4 flex justify-center items-center  ${(habilitarBtnNuevo == true || perfilCliente == 1) ? 'bg-zinc-400' : 'bg-white text-coomeva_color-azulOscuro border border-coomeva_color-grisSombra'}   text-[#FFFFFF] w-full h-8 rounded-md shadow hover:shadow-lg`}>
                            Nuevo Prospecto
                        </button>
                    </div> : null
            }
            {
                (mostrarModal)
                &&
                <DynamicModal titulo={'Notificación'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModal}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
                </DynamicModal>
            }
            {
                (modalInspecktor)
                &&
                <DynamicModal titulo={'Inspecktor'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModalInspector}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModalInspecktor}</p>
                    {
                        (dataReporte.length > 0)
                        &&
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
                    }
                </DynamicModal>
            }
            {
                mostrarModalProspecto ?
                    <ModalsForForm w="[80%]" p="14" z="[9999]" fondoAzul={true} bg="bg-white">
                        <div className="flex justify-between w-full items-center">
                            <div className="w-full px-8">
                                <h1 className="font-bold text-lg"> {` Persona  ${tabBarSeleccionado != 'NIT' ? 'Natural' : 'Jurídica'}`}</h1>
                            </div>
                            <div onClick={() => { cerrarModalProspectos() }} className="flex w-full justify-end mx-12 cursor-pointer">
                                <p className="text-2xl" title="Cerrar">x</p>
                            </div>
                        </div>
                        <div className="overflow-y-auto h-[33rem] w-full">
                            {
                                tabBarSeleccionado != 'NIT' ?
                                    <div className='w-full px-4 mb-6 rounded-md py-6 border border-gray-200 '>
                                        {/* <hr className='my-6' /> */}
                                        <h1 className="font-bold py-3">IDENTIFICACIÓN</h1>
                                        <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                            <div >
                                                <CampoLista
                                                    valorInput={modalProspectoPjPn.tipoIdentificacion}
                                                    onChangeInput={onChangeProspecto}
                                                    nameInput={"tipoIdentificacion"}
                                                    placeholder='Tipo de Identificación'
                                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                        id: '100',
                                                        listaCamposAdministracion: dataCamposAdministacion,
                                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                    }))}
                                                    lista={catalogo.listTipoDocumento}
                                                    idLista='code'
                                                    descripcionList='value'
                                                />
                                            </div>
                                            <div >
                                                <CampoNumero
                                                    valorInput={modalProspectoPjPn?.numeroIdentificacion}
                                                    onChangeInput={onChangeProspecto}
                                                    nameInput={"numeroIdentificacion"}
                                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                        id: '52',
                                                        listaCamposAdministracion: dataCamposAdministacion,
                                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                    }))}
                                                    placeholder='Número de identificación'
                                                />
                                            </div>
                                            <hr className='my-6 col-span-2' />
                                            <div className='w-full px-4 col-span-2 mb-6 rounded-md py-6 border border-gray-200'>
                                                <h1 className="font-bold py-3">DATOS DEL CLIENTE</h1>
                                                <h2 className="font-bold py-3">GENERAL</h2>
                                                <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                                    <div >
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.oficial}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"oficial"}
                                                            placeholder='Oficial'
                                                            lista={catalogo.listOficial}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.primerNombre}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"primerNombre"}
                                                            placeholder='Primer Nombre'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '19',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.segundoNombre}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"segundoNombre"}
                                                            placeholder='Segundo Nombre'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '20',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.primerApellido}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"primerApellido"}
                                                            placeholder='Primer Apellido'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '17',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.segundoApellido}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"segundoApellido"}
                                                            placeholder='Segundo Apellido'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '18',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoIdentificacion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoIdentificacion"}
                                                            placeholder='Tipo de identificación'
                                                            lista={catalogo.listTipoDocumento}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.numeroIdentificacion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroIdentificacion"}
                                                            placeholder='Número de identificación'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoFecha
                                                            valorInput={modalProspectoPjPn.fechaExpedicion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"fechaExpedicion"}
                                                            placeholder='Fecha de expedición'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '23',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.paisNacimiento}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"paisNacimiento"}
                                                            placeholder='País de nacimiento'
                                                            lista={catalogo.listPaises}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.provinciaNacimiento}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"provinciaNacimiento"}
                                                            placeholder='Provincia de nacimiento'
                                                            lista={ltProvinciaNacimiento}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.ciudadNacimiento}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"ciudadNacimiento"}
                                                            placeholder='Ciudad de nacimiento'
                                                            lista={ltCiudadesNac}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoFecha
                                                            valorInput={modalProspectoPjPn.fechaNacimiento}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"fechaNacimiento"}
                                                            placeholder='Fecha de nacimiento'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '23',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.sexo}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"sexo"}
                                                            placeholder='Sexo'
                                                            lista={catalogo.listSexo}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.oficina}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"oficina"}
                                                            placeholder='Oficina'
                                                            lista={catalogo.listOficina}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.estadoCivil}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"estadoCivil"}
                                                            placeholder='Estado civil'
                                                            lista={catalogo.listEstadoCivil}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div className='col-span-2 my-3'>
                                                        <hr className='my-4' />
                                                    </div>

                                                    {/* <h2 className='font-bold'></h2> */}
                                                </div>

                                                {/* <div className="flex justify-between items-center">

                                                    <div className='flex gap-6'>
                                                        <h1 className="font-bold py-3">INFORMACIÓN DE CARGO</h1>
                                                    </div>

                                                </div>

                                                <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>


                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.cargo}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"cargo"}
                                                            placeholder='Cargo o Rol'
                                                            lista={listTipoJuntaDirectiva}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div></div>

                                                    <div className='mb-4'>
                                                        <label htmlFor="" className='font-medium mb-2 mt-3'>Tipo de integrante</label>
                                                        <div>
                                                            <label className='flex gap-x-4'>
                                                                <input type="radio" name={"tipoIntegrante"} onChangeInput={onChangeProspecto} value="principal" checked={modalProspectoPjPn.tipoIntegrante == 'principal'} />
                                                                Principal
                                                            </label>

                                                            <label className='flex gap-x-4'>
                                                                <input type="radio" name={"tipoIntegrante"} onChangeInput={onChangeProspecto} value="simple" checked={modalProspectoPjPn.tipoIntegrante == 'simple'} />
                                                                Simple
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div></div>

                                                    <div className='col-span-2 my-3'>
                                                        <hr className='my-4' />
                                                    </div>

                                                </div> */}


                                                <div className="flex justify-between items-center">

                                                    <div className='flex gap-6'>
                                                        <h1 className="font-bold py-3">RESIDENCIA FISCAL</h1>
                                                    </div>

                                                </div>


                                                <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>

                                                    <div>
                                                        <CheckDesplazable
                                                            // titulo={'FATCA'}
                                                            subtitulo={'¿Tiene residencia fiscal en Estados Unidos y/o países asociados?'}
                                                            name={"fatca"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.fatca}
                                                        />
                                                    </div>

                                                    <div>
                                                        <CheckDesplazable
                                                            // titulo={'CRS'}
                                                            subtitulo={'¿Tiene residencia fiscal en algún país diferente a Colombia?'}
                                                            name={"crs"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.crs}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center">

                                                    <div className='flex gap-6'>
                                                        <h1 className="font-bold py-3">PAÍS DE RESIDENCIA FISCAL</h1>
                                                    </div>

                                                </div>

                                                <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>

                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.paisResidenciaFiscal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"paisResidenciaFiscal"}
                                                            placeholder='País de Residencia Fiscal'
                                                            lista={catalogo.listPaises}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoIdentificacionTributaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoIdentificacionTributaria"}
                                                            placeholder='Tipo de Identificación Tributaria'
                                                            lista={catalogo.listTipoIdFiscal}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.numeroidentificacionTributaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroidentificacionTributaria"}
                                                            placeholder='Número de Identificación Tributaria'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CheckDesplazable
                                                            titulo={'Es ciudadano'}

                                                            name={"esCiudadano"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.esCiudadano}
                                                        />
                                                    </div>

                                                    <div>
                                                        <CheckDesplazable
                                                            titulo={'Es residente'}

                                                            name={"esResidente"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.esResidente}
                                                        />
                                                    </div>


                                                    <div className='col-span-2 my-3'>
                                                        <hr className='my-4' />
                                                    </div>



                                                </div>
                                                <div className="flex justify-between items-center">

                                                    <div className='flex gap-6'>
                                                        <h1 className="font-bold py-3">PERSONA PÚBLICAMENTE EXPUESTA</h1>
                                                    </div>

                                                </div>

                                                <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>

                                                    <div>
                                                        <CheckDesplazable
                                                            // titulo={'PEP'}
                                                            subtitulo={'¿Actualmente o en los últimos dos años: ha desempeñado funciones directiva en Organizaciones Internacionales o Publicas en otro país?'}
                                                            name={"pep"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.pep}
                                                        />
                                                    </div>

                                                    {
                                                        modalProspectoPjPn.pep == 'on' ?
                                                            <div>
                                                                <CampoLista
                                                                    valorInput={modalProspectoPjPn.tipoPep}
                                                                    onChangeInput={onChangeProspecto}
                                                                    nameInput={"tipoPep"}
                                                                    placeholder='Tipo PEP'
                                                                    lista={catalogo.listTipoPEP}
                                                                    idLista={'code'}
                                                                    descripcionList={'value'}
                                                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                        id: '21',
                                                                        listaCamposAdministracion: dataCamposAdministacion,
                                                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                                    }))}

                                                                />
                                                            </div> : undefined
                                                    }

                                                    <div className='col-span-2 my-3'>
                                                        <hr className='my-4' />
                                                    </div>


                                                </div>

                                                <div className="flex justify-between items-center">

                                                    <div className='flex gap-6'>
                                                        <h1 className="font-bold py-3">DIRECCIONES</h1>
                                                    </div>

                                                </div>

                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                                                    <div>
                                                        <CheckDesplazable
                                                            titulo={'Dirección Principal'}

                                                            name={"Direccionprincipal"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.Direccionprincipal}
                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoDireccion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoDireccion"}
                                                            placeholder='Tipo de Dirección'
                                                            lista={catalogo.listTipoDireccion}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.pais}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"pais"}
                                                            placeholder='País'
                                                            lista={catalogo.listPaises}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.departamento}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"departamento"}
                                                            placeholder='Departamento'
                                                            lista={lDepartamentos}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.ciudad}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"ciudad"}
                                                            placeholder='Ciudad'
                                                            lista={lCiudad}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                </div>

                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.viaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"viaPrincipal"}
                                                            placeholder='Vía principal'
                                                            lista={catalogo.listTipoVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.numeroViaPrincipa}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroViaPrincipa"}
                                                            placeholder='Número Vía principal'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.nombreViaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"nombreViaPrincipal"}
                                                            placeholder='Nombre Vía principal'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.letraViaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"letraViaPrincipal"}
                                                            placeholder='Letra Vía principal'
                                                            lista={catalogo.listTipoLetraVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.sectorViaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"sectorViaPrincipal"}
                                                            placeholder='Sector Vía principal'
                                                            lista={catalogo.listTipoSectorVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    {/* via secundaria */}

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.viaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"viaSecundaria"}
                                                            placeholder='Vía Secundaria'
                                                            lista={catalogo.listTipoVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.numeroViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroViaSecundaria"}
                                                            placeholder='Número Vía secundaria'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.nombreViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"nombreViaSecundaria"}
                                                            placeholder='Nombre Vía secundaria'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.letraViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"letraViaSecundaria"}
                                                            placeholder='Letra Vía secundaria'
                                                            lista={catalogo.listTipoLetraVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.sectorViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"sectorViaSecundaria"}
                                                            placeholder='Sector Vía secundaria'
                                                            lista={catalogo.listTipoSectorVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn.numeroPredioViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroPredioViaSecundaria"}
                                                            placeholder='Numero predio vía secundaria'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                </div>

                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                                                    <div>
                                                        <CheckDesplazable
                                                            titulo={'Tiene Barrio'}

                                                            name={"tieneBarrio"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.tieneBarrio}
                                                        />
                                                    </div>

                                                    {
                                                        modalProspectoPjPn.tieneBarrio == 'on' ?
                                                            <div >
                                                                <CampoTexto
                                                                    valorInput={modalProspectoPjPn.nombreBarrio}
                                                                    onChangeInput={onChangeProspecto}
                                                                    nameInput={"nombreBarrio"}
                                                                    placeholder='Nombre del Barrio'
                                                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                        id: '22',
                                                                        listaCamposAdministracion: dataCamposAdministacion,
                                                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                                    }))}

                                                                />
                                                            </div> : undefined
                                                    }

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.unidad}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"unidad"}
                                                            placeholder='Unidad'
                                                            lista={catalogo.listTipoEdificio}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn.numeroUnidad}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroUnidad"}
                                                            placeholder='Numero unidad'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.letraUnidad}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"letraUnidad"}
                                                            placeholder='Letra unidad'
                                                            lista={catalogo.listTipoLetraVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.interior}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"interior"}
                                                            placeholder='Interior'
                                                            lista={catalogo.listTipoVivienda}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn.numeroInterior}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroInterior"}
                                                            placeholder='Numero unidad'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.letraInterior}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"letraInterior"}
                                                            placeholder='Letra interior'
                                                            lista={catalogo.listTipoLetraVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.numeroPersonas}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroPersonas"}
                                                            placeholder='Número de Personas'
                                                            lista={catalogo.listReferenciaTiempo}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoVivienda}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoVivienda"}
                                                            placeholder='Tipo de Vivienda'
                                                            lista={catalogo.listTipoPropiedad}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.anosResidencia}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"anosResidencia"}
                                                            placeholder='Años en la Residencia'
                                                            lista={catalogo.listReferenciaTiempo}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div className='col-span-3'>
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.referenciaUbiacion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"referenciaUbiacion"}
                                                            placeholder='Referencias de Ubicación'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div className='col-span-3 my-3'>
                                                        <hr className='my-4' />
                                                    </div>



                                                </div>

                                                <div className="flex justify-between items-center">

                                                    <div className='flex gap-6'>
                                                        <h1 className="font-bold py-3">CONTACTOS</h1>
                                                    </div>

                                                </div>

                                                <h1 className="font-bold py-3">TELÉFONO</h1>

                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn.numero}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numero"}
                                                            placeholder='Número'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoTelefono}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoTelefono"}
                                                            placeholder='Tipo teléfono'
                                                            lista={catalogo.listTipoTelefono}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoContacto}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoContacto"}
                                                            placeholder='Tipo de contacto'
                                                            lista={catalogo.listTipoContacto}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.prefijo}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"prefijo"}
                                                            placeholder='Prefijo'
                                                            lista={catalogo.listPrefijos}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.operadora}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"operadora"}
                                                            placeholder='Operadora'
                                                            lista={catalogo.listTipoOperador}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoContrato}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoContrato"}
                                                            placeholder='Tipo de contrato'
                                                            lista={catalogo.listTipoContrato}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.mensajeria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"mensajeria"}
                                                            placeholder='Mensajería'
                                                            lista={catalogo.listTipoMensajeria}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div>
                                                        <CheckInputRojo
                                                            labelText={'Teléfono principal'}
                                                            nameInput={"telefonoPrincipal"}
                                                            onChangeInput={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.telefonoPrincipal}

                                                        />
                                                    </div>
                                                </div>

                                                <h1 className="font-bold py-3">EMAIL</h1>

                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                                                    <div >
                                                        <CampoCorreo
                                                            valorInput={modalProspectoPjPn.usuarioEmail}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"usuarioEmail"}
                                                            placeholder='Usuario'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipo}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipo"}
                                                            placeholder='Tipo '
                                                            lista={catalogo.listTipoDireccionVirtual}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>




                                                    <div>
                                                        <CheckInputRojo
                                                            labelText={'Uso preferente'}
                                                            nameInput={"usoPreferente"}
                                                            onChangeInput={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.usoPreferente}

                                                        />
                                                    </div>



                                                </div>

                                                {/* <div className='flex justify-end'>
                    
                                                        <button
                                                            onClick={() => { cancelarOperacion(i) }}
                    
                                                            className='text-white bg-coomeva_color-rojo py-1 px-2 rounded-md w-40 text-xs h-10'
                                                            type="button"
                                                        >Cancelar</button>
                    
                                                    </div> */}

                                            </div>

                                        </div>
                                    </div> : undefined
                            }

                            {
                                tabBarSeleccionado == 'NIT' ?
                                    <div className='w-full px-4 mb-6 rounded-md py-6 border border-gray-200 '>
                                        {/* <hr className='my-6' /> */}
                                        {/* <h1 className="font-bold py-3">IDENTIFICACIÓN</h1> */}
                                        <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                            <div className='w-full px-4 col-span-2 mb-6 rounded-md py-6 border border-gray-200'>

                                                <h1 className="font-bold py-3">DATOS DEL CLIENTE</h1>
                                                <h2 className="font-bold py-3">GENERAL</h2>

                                                <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                                    <div >
                                                        <CampoLista

                                                            valorInput={modalProspectoPjPn.tipoIdentificacion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoIdentificacion"}
                                                            placeholder='Tipo de Identificación'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '53',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                            lista={catalogo.listTipoDocumento}
                                                            idLista='code'
                                                            descripcionList='value'
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn?.numeroIdentificacion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroIdentificacion"}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '52',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                            placeholder='Número de identificación'
                                                        />
                                                    </div>
                                                    <div >

                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.razonSocial}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"razonSocial"}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '50',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                            placeholder='Nombre o Razón Social'
                                                        />
                                                    </div>
                                                    <div >

                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.paisConstitucion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"paisConstitucion"}
                                                            placeholder='País de Constitución'
                                                            lista={catalogo.listPaises}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >

                                                        <CampoFecha
                                                            valorInput={modalProspectoPjPn.fechaConstitucion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"fechaConstitucion"}
                                                            placeholder='Fecha de Constitución'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '19',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >

                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoCompania}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoCompania"}
                                                            placeholder='Tipo de Compañía'
                                                            lista={catalogo.listTipoSociedad}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.categoriaCompania}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"categoriaCompania"}
                                                            placeholder='Categoría de Compañía'
                                                            lista={catalogo.listCategoriaCompania}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.oficial}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"oficial"}
                                                            placeholder='Oficial'
                                                            lista={catalogo.listOficial}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />

                                                    </div>

                                                    <div className="col-span-1">
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.oficina}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"oficina"}
                                                            placeholder='Oficina'
                                                            lista={catalogo.listOficina}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div className='col-span-2 my-3'>
                                                        <hr className='my-4' />
                                                    </div>

                                                    {/* <h2 className='font-bold'></h2> */}

                                                </div>

                                                <div className="flex justify-between items-center">

                                                    <div className='flex gap-6'>
                                                        <h1 className="font-bold py-3">DIRECCIONES</h1>
                                                    </div>

                                                </div>

                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                                                    <div>
                                                        <CheckDesplazable
                                                            titulo={'Dirección Principal'}

                                                            name={"direccionPrincipal"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.direccionPrincipal}
                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoDireccion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoDireccion"}
                                                            placeholder='Tipo de Dirección'
                                                            lista={catalogo.listTipoDireccion}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.pais}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"pais"}
                                                            placeholder='País'
                                                            lista={catalogo.listPaises}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.departamento}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"departamento"}
                                                            placeholder='Departamento'
                                                            lista={lDepartamentos}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.ciudad}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"ciudad"}
                                                            placeholder='Ciudad'
                                                            lista={lCiudad}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>


                                                </div>

                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.viaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"viaPrincipal"}
                                                            placeholder='Vía principal'
                                                            lista={catalogo.listTipoVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.numeroViaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroViaPrincipal"}
                                                            placeholder='Número Vía principal'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.nombreViaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"nombreViaPrincipal"}
                                                            placeholder='Nombre Vía principal'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.letraViaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"letraViaPrincipal"}
                                                            placeholder='Letra Vía principal'
                                                            lista={catalogo.listTipoLetraVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.sectorViaPrincipal}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"sectorViaPrincipal"}
                                                            placeholder='Sector Vía principal'
                                                            lista={catalogo.listTipoSectorVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    {/* via secundaria */}

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.viaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"viaSecundaria"}
                                                            placeholder='Vía Secundaria'
                                                            lista={catalogo.listTipoVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.numeroViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroViaSecundaria"}
                                                            placeholder='Número Vía secundaria'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.nombreViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"nombreViaSecundaria"}
                                                            placeholder='Nombre Vía secundaria'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.letraViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"letraViaSecundaria"}
                                                            placeholder='Letra Vía secundaria'
                                                            lista={catalogo.listTipoLetraVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.sectorViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"sectorViaSecundaria"}
                                                            placeholder='Sector Vía secundaria'
                                                            lista={catalogo.listTipoSectorVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn.numeroPredioViaSecundaria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroPredioViaSecundaria"}
                                                            placeholder='Numero predio vía secundaria'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                                                    <div>
                                                        <CheckDesplazable
                                                            titulo={'Tiene Barrio'}

                                                            name={"tieneBarrio"}
                                                            onclickCheck={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.tieneBarrio}
                                                        />
                                                    </div>
                                                    {
                                                        modalProspectoPjPn.tieneBarrio == 'on' ?
                                                            <div >
                                                                <CampoTexto
                                                                    valorInput={modalProspectoPjPn.nombreBarrio}
                                                                    onChangeInput={onChangeProspecto}
                                                                    nameInput={"nombreBarrio"}
                                                                    placeholder='Nombre del Barrio'
                                                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                        id: '22',
                                                                        listaCamposAdministracion: dataCamposAdministacion,
                                                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                                    }))}

                                                                />
                                                            </div> : undefined
                                                    }
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.unidad}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"unidad"}
                                                            placeholder='Unidad'
                                                            lista={catalogo.listTipoEdificio}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn.numeroUnidad}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroUnidad"}
                                                            placeholder='Numero unidad'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.letraUnidad}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"letraUnidad"}
                                                            placeholder='Letra unidad'
                                                            lista={catalogo.listTipoLetraVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.interior}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"interior"}
                                                            placeholder='Interior'
                                                            lista={catalogo.listTipoVivienda}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn.numeroInterior}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroInterior"}
                                                            placeholder='Numero unidad'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}

                                                        />
                                                    </div>

                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.letraInterior}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"letraInterior"}
                                                            placeholder='Letra interior'
                                                            lista={catalogo.listTipoLetraVia}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.numeroPersonas}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numeroPersonas"}
                                                            placeholder='Número de Personas'
                                                            lista={catalogo.listReferenciaTiempo}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoVivienda}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoVivienda"}
                                                            placeholder='Tipo de Vivienda'
                                                            lista={catalogo.listTipoPropiedad}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div >
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.anosResidencia}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"anosResidencia"}
                                                            placeholder='Años en la Residencia'
                                                            lista={catalogo.listReferenciaTiempo}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className='col-span-3'>
                                                        <CampoTexto
                                                            valorInput={modalProspectoPjPn.referenciaUbiacion}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"referenciaUbiacion"}
                                                            placeholder='Referencias de Ubicación'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className='col-span-3 my-3'>
                                                        <hr className='my-4' />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className='flex gap-6'>
                                                        <h1 className="font-bold py-3">CONTACTOS</h1>
                                                    </div>
                                                </div>
                                                <h1 className="font-bold py-3">TELÉFONO</h1>
                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                                                    <div >
                                                        <CampoNumero
                                                            valorInput={modalProspectoPjPn.numero}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"numero"}
                                                            placeholder='Número'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoTelefono}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoTelefono"}
                                                            placeholder='Tipo teléfono'
                                                            lista={catalogo.listTipoTelefono}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoContacto}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoContacto"}
                                                            placeholder='Tipo de contacto'
                                                            lista={catalogo.listTipoContacto}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.prefijo}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"prefijo"}
                                                            placeholder='Prefijo'
                                                            lista={catalogo.listPrefijos}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.operadora}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"operadora"}
                                                            placeholder='Operadora'
                                                            lista={catalogo.listTipoOperador}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipoContrato}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipoContrato"}
                                                            placeholder='Tipo de contrato'
                                                            lista={catalogo.listTipoContrato}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.mensajeria}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"mensajeria"}
                                                            placeholder='Mensajería'
                                                            lista={catalogo.listTipoMensajeria}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CheckInputRojo
                                                            labelText={'Teléfono principal'}
                                                            nameInput={"telefonoPrincipal"}
                                                            onChangeInput={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.telefonoPrincipal}
                                                        />
                                                    </div>
                                                </div>
                                                <h1 className="font-bold py-3">EMAIL</h1>
                                                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                                                    <div >
                                                        <CampoCorreo
                                                            valorInput={modalProspectoPjPn.usuarioEmail}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"usuarioEmail"}
                                                            placeholder='Usuario'
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '22',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CampoLista
                                                            valorInput={modalProspectoPjPn.tipo}
                                                            onChangeInput={onChangeProspecto}
                                                            nameInput={"tipo"}
                                                            placeholder='Tipo '
                                                            lista={catalogo.listTipoDireccionVirtual}
                                                            idLista={'code'}
                                                            descripcionList={'value'}
                                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                id: '21',
                                                                listaCamposAdministracion: dataCamposAdministacion,
                                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                            }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CheckInputRojo
                                                            labelText={'Uso preferente'}
                                                            nameInput={"usoPreferente"}
                                                            onChangeInput={onChangeProspecto}
                                                            valorInput={modalProspectoPjPn.usoPreferente}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : undefined
                            }

                        </div>
                        <div className="w-full flex justify-end px-10">
                            <button type="button" onClick={guardarProspecto} className="bg-coomeva_color-rojo text-white py-1 px-10 rounded-md">Guardar</button>
                        </div>
                    </ModalsForForm> : null
            }
            {
                (modalProspectos)
                &&
                <DynamicModal titulo={'Notificación Prospecto'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModalProspecto}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModalProspecto}</p>
                </DynamicModal>
            }
            {
                (modalGuardarProspecto)
                &&
                <DynamicModal titulo={'Guardar Prospecto'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={limpiarModalGuardarProspecto}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageGuardarProspecto}</p>
                </DynamicModal>
            }
            {
                loading && <Loading />
            }
        </>
    )
};

function BuscarClienteButtom({ onClickConsultarCliente }) {
    return (
        <button
            onClick={onClickConsultarCliente}
            className="flex justify-center items-center bg-[#FFFFFF]  text-coomeva_color-azulOscuro w-[100%] h-8 rounded-md shadow hover:shadow-lg"
        >
            Consultar
        </button>
    )
};