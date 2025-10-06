'use client'

import React, { useState, useEffect, useRef } from 'react';
import { loadDraft, saveDraft, clearDraft } from '@/app/lib/utils/draft';
import { CampoTexto } from '../../share/CampoTexto';
import { CampoLista } from '../../share/CampoLista';
import { objectoValidarCampoAdministracion } from '@/app/lib/utils';
import { ButtomAgregarItem } from '../../share/ButtomAgregarItem';
import { ButtomUsuarioProspetcto } from '../../share/ButtomUsuarioProspetcto';
import { ButtomValidarCcNit } from '../ButtomValidarCcNit';
import { CheckInputRojo } from '../../share/CheckInputRojo';
import { CampoNumero } from '../../share/CampoNumero';
import { CheckDesplazable } from '../../share/CheckDesplazable';
import { CampoFecha } from '../../share/CampoFecha';
import { CampoCorreo } from '../../share/CampoCorreo';
import { fn_catalogosFetchLists } from '@/app/lib/apisClientePj/fn_catalogosFetchLists';
import { fn_crearModificarParticipantes, consultarParticipantes } from '@/app/lib/apisClientePj/fn_crearModificarParticipantes';
import dynamic from 'next/dynamic';
import Loading from '../../share/Loading';
import { BiSearchAlt } from "react-icons/bi";
import { fn_queryProspecto } from "@/app/lib/apisClientePj/fn_queryProspecto";
import { fnInspektor } from '@/app/lib/inspektor/fn_inspektor';


const DynamicModal = dynamic(() => import('../../share/Modals'));


export const JuntaDirectivaPjN = ({ contextRadClient, listTipoJuntaDirectiva, campoValidarAdministracion, dataCamposAdministacion = [], listTipoSociedad }) => {

    const [tipoCliente, setTipoCliente] = useState('CC')
    const { clienteNuevoProspectoActualizar, juntaDirectivaPj, actualizarJuntaDirectivaPj, juntaDirectivaPn, actualizarJuntaDirectivaPn, tabBarSeleccionado, perfilPj } = contextRadClient()
    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [catalogo, setCatalogo] = useState({});

    const [showModalInspector, setShowModalInspector] = useState(false);
    const [messageAlertInspecktor, setMessageAlertInspecktor] = useState('');
    const [dataReporte, setDataReporte] = useState([]);

    const [showModalGuardar, setShowModalGuardar] = useState(false);
    const [messageGuardar, setMessageGuardar] = useState('');


    const endModal = async () => {
        setShowModal(false);
        const nIndex = localStorage.getItem('index');
        if (nIndex === null) {
            return;
        }
        await servicioInspektor(nIndex);
    };

    const [grupoDetalle, setGrupoDetalle] = useState([]);
    const workerRef = useRef(null);
    const isBusco = useRef(false);

    //INICIALIZANDO CATALOGOS
    useEffect(() => {

        if (Object.keys(catalogo).length === 0) {
            const timeoutCatalogo = setTimeout(async () => {
                const cat = JSON.parse(await fn_catalogosFetchLists());
                setCatalogo(cat);
            }, 100);

            return () => clearTimeout(timeoutCatalogo);
        }

    }, []);


    const camposAndCatalogos = () => ({
        cantidadJuntaDirectiva: '',
        tipoPersona: '',
        primerApellido: '',
        segundoApellido: '',
        primerNombre: '',
        segundoNombre: '',
        numeroIdentificacion: '',
        razonSocial: '',
        nit: '',
        tipoIntegrante: '',
        ltTipoDocPn: '', //Catalogos
        ltTipoDocPj: '',
        ltOficiales: '',
        ltpasisNac: '',
        ltCiudadesNac: '',
        ltSexo: '',
        ltOficina: '',
        ltProvinciaNacimiento: '',
        ltEstadoCivil: '',
        ltPaisRecidencia: '',
        ltTipoIdFiscal: '',
        ltTipoPEP: '',
        ltTipoDireccion: '',
        ltPaisPn: '',
        ltDepartamentoPn: '',
        ltCiudadPn: '',
        ltTipoVia: '',
        ltTipoLetraVia: '',
        ltTipoSectorVia: '',
        ltTipoEdificio: '',
        ltTipoVivienda: '',
        ltTipoPropiedad: '',
        ltReferenciaTiempo: '',
        ltTipoTelefono: '',
        ltTipoContacto: '',
        ltPrefijos: '',
        ltTipoOperador: '',
        ltTipoContrato: '',
        ltTipoMensajeria: '',
        ltTipoDireccionVirtual: '',
        ltTipoAccionista: '',
        ltCategoriaCompania: '',
        nuevo: true,
        isSearch: false,
        customerReference: '',
        codParticipante: '5',
    });


    const limpiarListas = (data) => {
        const keysExcluir = [
            'ltTipoDocPn', 'ltTipoDocPj', 'ltOficiales', 'ltpasisNac', 'ltCiudadesNac', 'ltSexo',
            'ltOficina', 'ltProvinciaNacimiento', 'ltEstadoCivil', 'ltPaisRecidencia',
            'ltTipoIdFiscal', 'ltTipoPEP', 'ltTipoDireccion', 'ltPaisPn',
            'ltDepartamentoPn', 'ltCiudadPn', 'ltTipoVia', 'ltTipoLetraVia',
            'ltTipoSectorVia', 'ltTipoEdificio', 'ltTipoVivienda', 'ltTipoPropiedad',
            'ltReferenciaTiempo', 'ltTipoTelefono', 'ltTipoContacto', 'ltPrefijos',
            'ltTipoOperador', 'ltTipoContrato', 'ltTipoMensajeria', 'ltTipoDireccionVirtual',
            'ltTipoAccionista', 'ltCategoriaCompania'
        ];

        return data.map(item => {
            const nuevo = { ...item };
            keysExcluir.forEach(k => delete nuevo[k]);
            return nuevo;
        });
    };

    const DRAFT_KEY = 'juntaDirectivaPn';

    // 1) Al montar carga draft
    useEffect(() => {
        const draft = loadDraft(DRAFT_KEY);
        if (draft && Array.isArray(draft) && Object.keys(catalogo).length > 0) {
            const draftConListas = draft.map(item => {
                const nuevo = { ...item };
                montarListPn(nuevo);
                return nuevo;
            });

            actualizarJuntaDirectivaPn(draftConListas);
        }
        /* return () => {

            clearDraft(DRAFT_KEY);
        } */
    }, [catalogo]);

    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        const limpio = limpiarListas(juntaDirectivaPn);
        saveDraft(DRAFT_KEY, limpio);
    }, [juntaDirectivaPn]);


    //Web Worker
    useEffect(() => {
        workerRef.current = new Worker('/workers/juntaDirectiva.js');
        workerRef.current.onmessage = (e) => {
            setShowLoading(false)
            const { data, error } = e.data;
            if (error) {
                console.error('Worker error:', error);
                return;
            }
            // data
            const rawDataRes = data;
            const parsedDataRes = JSON.parse(rawDataRes);
            setGrupoDetalle(parsedDataRes);
        };

        return () => {
            workerRef.current.terminate();
        };

    }, []);


    //Montar Datos Asociados al Cliente Principal
    useEffect(() => {
        if (
            grupoDetalle &&
            Object.keys(grupoDetalle).length > 0 &&
            Object.keys(catalogo).length > 0
        ) {
            const grupoConListas = grupoDetalle?.juntaDirectiva?.map(item => {
                const nuevo = { ...item, nuevo: false, isSearch: true, codParticipante: '5' };
                montarListPn(nuevo);
                return nuevo;
            });

            actualizarJuntaDirectivaPn(grupoConListas);
        }
    }, [grupoDetalle, catalogo]);


    useEffect(() => {
        const updated = [...juntaDirectivaPn];
        let isUpdated = false;

        updated.forEach((item, index) => {
            if (item.isSearch) {
                // País de nacimiento
                if (item.paisNacimiento && !item.ltProvinciaNacimiento?.length) {
                    item.ltProvinciaNacimiento = catalogo.listDepartemento.sort((a, b) => a.value.localeCompare(b.value));
                    isUpdated = true;
                }

                // Provincia → Ciudad nacimiento
                if (item.provinciaNacimiento && !item.ltCiudadesNac?.length) {
                    const paisCode = item.paisNacimiento || localStorage.getItem('paisCode');
                    item.ltCiudadesNac = paisCode === '170'
                        ? catalogo.listCiduades.filter(c => c.code.startsWith(item.provinciaNacimiento)).sort((a, b) => a.value.localeCompare(b.value))
                        : catalogo.listCiduades.sort((a, b) => a.value.localeCompare(b.value));
                    isUpdated = true;
                }

                // País → Departamento
                if (item.pais && !item.ltDepartamentoPn?.length) {
                    item.ltDepartamentoPn = catalogo.listDepartemento.sort((a, b) => a.value.localeCompare(b.value));
                    isUpdated = true;
                }

                // Departamento → Ciudad
                if (item.departamento && !item.ltCiudadPn?.length) {
                    const paisCode = item.pais || localStorage.getItem('paisCode');
                    item.ltCiudadPn = paisCode === '170'
                        ? catalogo.listCiduades.filter(c => c.code.startsWith(item.departamento)).sort((a, b) => a.value.localeCompare(b.value))
                        : catalogo.listCiduades.sort((a, b) => a.value.localeCompare(b.value));
                    isUpdated = true;
                }

                // Cargar lista categoria compañia si es PJ
                if ((item.tipoIdentificacion === 'NIT' || item.customerType === 'PJ') && !item.ltCategoriaCompania?.length) {
                    item.ltCategoriaCompania = catalogo.listCategoriaCompania?.sort((a, b) => a.value.localeCompare(b.value)) || [];
                    isUpdated = true;
                }
            }
        });

        if (isUpdated) actualizarJuntaDirectivaPn(updated);
    }, [juntaDirectivaPn, catalogo]);


    //Buscar Participantes Segun Cliente Principal
    useEffect(() => {
        try {
            const validActualizacion = JSON.parse(localStorage.getItem('draft_juntaDirectivaPn'));
            if (validActualizacion.length === 0) {
                isBusco.current = true;
                buscarParticipantesAlIngresar();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);


    //Buscar desde el CustomerReferece
    const buscarParticipantesAlIngresar = () => {
        try {
            const rawData = localStorage.getItem('draft_perfilPj');

            if (typeof rawData !== 'string' || rawData.trim() === '') {
                throw new Error('JSON vacío o no es una cadena válida');
            }

            const parsedDataParti = JSON.parse(rawData);

            if (parsedDataParti.hasOwnProperty('juntaDirectiva')) {
                const rawCustomerReferences = {
                    "juntaDirectiva": parsedDataParti.juntaDirectiva
                };
                const customerReferences = JSON.stringify(rawCustomerReferences);
                setGrupoDetalle([]);
                setShowLoading(true);
                workerRef.current.postMessage({ customerReferences });
            }

        } catch (error) {
            console.log(error)
        }
    };


    const agregarJuntaDirectivaPn = async (e) => {
        e.preventDefault();
        const nuevaJuntaDrectivaPn = camposAndCatalogos();

        if (juntaDirectivaPn.length === 0) {
            montarListPn(nuevaJuntaDrectivaPn);
            actualizarJuntaDirectivaPn([...juntaDirectivaPn, nuevaJuntaDrectivaPn]);
            return;
        }

        setShowLoading(true);
        const resValidar = await validarParticipante(juntaDirectivaPn)
        if (resValidar) {
            setShowLoading(false);
            montarListPn(nuevaJuntaDrectivaPn);
            actualizarJuntaDirectivaPn([...juntaDirectivaPn, nuevaJuntaDrectivaPn]);
        }
    };


    const validarParticipante = async (partipantes) => {
        let contNuevos = 0;
        let contSearch = 0;

        for (let i of partipantes) {
            if (i.nuevo) {
                contNuevos++
            };
            if (i.isSearch) {
                contSearch++;
            };
        };

        if (contNuevos > 0) {
            for (let i of partipantes) {
                if (i.nuevo) {
                    const resGuardar = JSON.parse(await guardarParticipante([i]));
                    if (resGuardar.status === 200) {
                        i.nuevo = false;
                        i.customerReference = resGuardar.data;
                        return fnAsignarCustomerParticipantesBuscadosAgregar(contSearch);
                    };
                };
            };
            return false;

        } else {
            return fnAsignarCustomerParticipantesBuscadosAgregar(contSearch);
        };
    };


    const guardarParticipante = async (datosForm) => {
        const clearDataForm = limpiarListas(datosForm);
        if (datosForm[0].nuevo) {
            const resGuardarParticipante = JSON.parse(await fn_crearModificarParticipantes(JSON.stringify(clearDataForm)));

            setShowLoading(false);
            if (resGuardarParticipante.status !== 200) {
                setMessageGuardar(`${resGuardarParticipante.message}`);
                setShowModalGuardar(true);
                return false;
            };

            return JSON.stringify(resGuardarParticipante);
        };
    };


    const fnContinuar = async () => {
        setShowLoading(true);
        const partipantes = juntaDirectivaPn;
        let contNuevos = 0;
        let contSearch = 0;

        for (let i of partipantes) {
            if (i.nuevo) {
                contNuevos++
            };

            if (i.isSearch) {
                contSearch++;
            };
        };

        if (contNuevos > 0) {
            let contProcesados = 0;
            for (let i of partipantes) {
                if (i.nuevo) {
                    const resGuardar = JSON.parse(await guardarParticipante([i]));
                    if (resGuardar.status === 200) {
                        i.nuevo = false;
                        i.customerReference = resGuardar.data;
                        actualizarJuntaDirectivaPn([...juntaDirectivaPn]);
                        contProcesados++
                        if (contProcesados === contNuevos) {
                            return fnAsignarCustomerParticipantesBuscadosContinuar(contSearch);
                        };
                        //return '/radicacionCliente/radicacionPj/accionistasPj';
                    };
                };
            };
            return false;

        } else {
            //setShowLoading(false);
            //return '/radicacionCliente/radicacionPj/accionistasPj';
            return fnAsignarCustomerParticipantesBuscadosContinuar(contSearch);
        };
    };


    const validarRuta = () => {
        const dataStorage = localStorage.getItem('draft_perfilPj');
        const parseDataStorage = JSON.parse(dataStorage);
        const accionistas = ['1', '2', '3', '37', '38', '4', '5', '6', '7', '8'];
        const isIncludes = accionistas.includes(parseDataStorage.datosGenerales.tipoSociedad);

        if (isIncludes) {
            return '/radicacionCliente/radicacionPj/accionistasPj';
        };

        return '/radicacionCliente/radicacionPj/controlantesPj';
    };


    const fnAsignarCustomerParticipantesBuscadosContinuar = async (nSearch) => {
        try {
            if (nSearch > 0) {
                const partipantes = juntaDirectivaPn;
                let contProcesados = 0;
                for (let i of partipantes) {
                    if (i.isSearch) {
                        i.customerType = i.tipoIdentificacion === 'NIT' ? 'PJ' : 'PN';
                        const clearDataForm = limpiarListas([i]);
                        const resCustomer = JSON.parse(await consultarParticipantes(JSON.stringify(clearDataForm)));
                        if (resCustomer.hasOwnProperty('CustomerRightSide')) {
                            i.isSearch = false;
                            i.customerReference = resCustomer;
                            actualizarJuntaDirectivaPn([...juntaDirectivaPn]);
                            contProcesados++
                            if (contProcesados === nSearch) {
                                setShowLoading(false);
                                const pathSiguiente = validarRuta();
                                return pathSiguiente;
                            };
                        };
                    };
                };
                return false;
            } else {
                setShowLoading(false);
                const pathSiguiente = validarRuta();
                return pathSiguiente;
            };

        } catch (error) {
            console.log(error);
        };
    };


    const fnAsignarCustomerParticipantesBuscadosAgregar = async (nSearch) => {
        try {
            if (nSearch > 0) {
                const partipantes = juntaDirectivaPn;
                for (let i of partipantes) {
                    if (i.isSearch) {
                        i.customerType = i.tipoIdentificacion === 'NIT' ? 'PJ' : 'PN';
                        const clearDataForm = limpiarListas([i]);
                        const resCustomer = JSON.parse(await consultarParticipantes(JSON.stringify(clearDataForm)));
                        if (resCustomer.hasOwnProperty('CustomerRightSide')) {
                            i.isSearch = false;
                            i.customerReference = resCustomer;
                            actualizarJuntaDirectivaPn([...juntaDirectivaPn]);
                            return true;
                        };
                    };
                };
                return false;

            } else {
                setShowLoading(false);
                const nuevaJuntaDrectivaPn = camposAndCatalogos();
                montarListPn(nuevaJuntaDrectivaPn);
                actualizarJuntaDirectivaPn([...juntaDirectivaPn, nuevaJuntaDrectivaPn]);
                return false;
            };

        } catch (error) {
            console.log(error);
        };
    };


    const montarListPn = (camposPn) => {
        camposPn.ltTipoDocPn = catalogo.listTipoDocumento;
        camposPn.ltOficiales = catalogo.listOficial.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltpasisNac = catalogo.listPaises.sort((a, b) => a.value.localeCompare(b.value));
        //camposPn.ltCiudadesNac = '';
        camposPn.ltSexo = catalogo.listSexo;
        camposPn.ltOficina = catalogo.listOficina.sort((a, b) => a.value.localeCompare(b.value));
        //camposPn.ltProvinciaNacimiento = catalogo.listDepartemento;
        camposPn.ltEstadoCivil = catalogo.listEstadoCivil;
        camposPn.ltPaisRecidencia = catalogo.listPaises.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltTipoIdFiscal = catalogo.listTipoIdFiscal;
        camposPn.ltTipoPEP = catalogo.listTipoPEP;
        camposPn.ltTipoDireccion = catalogo.listTipoDireccion.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltPaisPn = catalogo.listPaises.sort((a, b) => a.value.localeCompare(b.value));
        //camposPn.ltDepartamentoPn = catalogo.listDepartemento;
        //camposPn.ltCiudadPn = '';
        camposPn.ltTipoVia = catalogo.listTipoVia.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltTipoLetraVia = catalogo.listTipoLetraVia.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltTipoSectorVia = catalogo.listTipoSectorVia.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltTipoEdificio = catalogo.listTipoEdificio.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltTipoVivienda = catalogo.listTipoVivienda.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltTipoPropiedad = catalogo.listTipoPropiedad.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltReferenciaTiempo = catalogo.listReferenciaTiempo;
        camposPn.ltTipoTelefono = catalogo.listTipoTelefono.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltTipoContacto = catalogo.listTipoContacto;
        camposPn.ltPrefijos = catalogo.listPrefijos.sort((a, b) => a.value.localeCompare(b.value));
        camposPn.ltTipoOperador = catalogo.listTipoOperador;
        camposPn.ltTipoContrato = catalogo.listTipoContrato;
        camposPn.ltTipoMensajeria = catalogo.listTipoMensajeria;
        camposPn.ltTipoDireccionVirtual = catalogo.listTipoDireccionVirtual;
    };


    const montarListPj = (camposPj) => {
        camposPj.ltTipoDocPj = catalogo.listTipoDocumento;
        camposPj.ltOficiales = catalogo.listOficial.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltpasisNac = catalogo.listPaises.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltCategoriaCompania = catalogo.listCategoriaCompania;
        //camposPj.ltCiudadesNac = '';
        camposPj.ltSexo = catalogo.listSexo;
        camposPj.ltOficina = catalogo.listOficina.sort((a, b) => a.value.localeCompare(b.value));
        //camposPj.ltProvinciaNacimiento = catalogo.listDepartemento;
        camposPj.ltEstadoCivil = catalogo.listEstadoCivil;
        camposPj.ltPaisRecidencia = catalogo.listPaises.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltTipoIdFiscal = catalogo.listTipoIdFiscal;
        camposPj.ltTipoPEP = catalogo.listTipoPEP;
        camposPj.ltTipoDireccion = catalogo.listTipoDireccion.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltPaisPn = catalogo.listPaises.sort((a, b) => a.value.localeCompare(b.value));
        //camposPj.ltDepartamentoPn = catalogo.listDepartemento;
        //camposPj.ltCiudadPn = '';
        camposPj.ltTipoVia = catalogo.listTipoVia.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltTipoLetraVia = catalogo.listTipoLetraVia.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltTipoSectorVia = catalogo.listTipoSectorVia.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltTipoEdificio = catalogo.listTipoEdificio.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltTipoVivienda = catalogo.listTipoVivienda.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltTipoPropiedad = catalogo.listTipoPropiedad.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltReferenciaTiempo = catalogo.listReferenciaTiempo;
        camposPj.ltTipoTelefono = catalogo.listTipoTelefono.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltTipoContacto = catalogo.listTipoContacto;
        camposPj.ltPrefijos = catalogo.listPrefijos.sort((a, b) => a.value.localeCompare(b.value));
        camposPj.ltTipoOperador = catalogo.listTipoOperador;
        camposPj.ltTipoContrato = catalogo.listTipoContrato;
        camposPj.ltTipoMensajeria = catalogo.listTipoMensajeria;
        camposPj.ltTipoDireccionVirtual = catalogo.listTipoDireccionVirtual;
    };


    const onChangeJuntaDirectiva = (e) => {

        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;
        const [nameCampo, index] = name.split('-');
        const posItem = parseInt(index, 10);
        const dataJuntaDirectivaPn = [...juntaDirectivaPn];

        dataJuntaDirectivaPn[posItem] = {
            ...dataJuntaDirectivaPn[posItem],
            [nameCampo]: inputValue
        };

        dataJuntaDirectivaPn[posItem].nuevo = true;
        dataJuntaDirectivaPn[posItem].isSearch = false;

        if (nameCampo === 'tipoPersona') {
            if (value === 'CC') {
                montarListPn(dataJuntaDirectivaPn[posItem]);
            } else if (value === 'NIT') {
                montarListPj(dataJuntaDirectivaPn[posItem]);
            }
        };


        switch (nameCampo) {
            case 'paisNacimiento': {
                localStorage.removeItem('paisCode');
                localStorage.setItem("paisCode", inputValue);
                dataJuntaDirectivaPn[posItem].ltProvinciaNacimiento = catalogo.listDepartemento.sort((a, b) => a.value.localeCompare(b.value));
                break;
            }
            case 'pais': {
                localStorage.removeItem('paisCode');
                localStorage.setItem("paisCode", inputValue);
                dataJuntaDirectivaPn[posItem].ltDepartamentoPn = catalogo.listDepartemento.sort((a, b) => a.value.localeCompare(b.value));
                break;
            }
            case 'provinciaNacimiento': {
                let paisSelect = localStorage.getItem('paisCode');

                if (paisSelect === '170') {
                    dataJuntaDirectivaPn[posItem].ltCiudadesNac = catalogo.listCiduades
                        .filter(ciudades => ciudades.code.startsWith(inputValue))
                        .sort((a, b) => a.value.localeCompare(b.value));
                } else {
                    dataJuntaDirectivaPn[posItem].ltCiudadesNac = catalogo.listCiduades.sort((a, b) => a.value.localeCompare(b.value));
                };
            }
            case 'departamento': {
                let paisSelect = localStorage.getItem('paisCode');

                if (paisSelect === '170') {
                    dataJuntaDirectivaPn[posItem].ltCiudadPn = catalogo.listCiduades
                        .filter(ciudades => ciudades.code.startsWith(inputValue))
                        .sort((a, b) => a.value.localeCompare(b.value));
                } else {
                    dataJuntaDirectivaPn[posItem].ltCiudadPn = catalogo.listCiduades.sort((a, b) => a.value.localeCompare(b.value));
                };
            }
            case 'tipoIdentificacion': {
                localStorage.removeItem('tipoIdentificacion')
                localStorage.setItem('tipoIdentificacion', inputValue)
                break;
            }
            case 'numeroIdentificacion': {
                localStorage.removeItem('numeroIdentificacion')
                localStorage.setItem('numeroIdentificacion', inputValue)
                break;
            }
            default:
                break;
        };

        actualizarJuntaDirectivaPn(dataJuntaDirectivaPn);
    };


    //Buscar desde Cedula o Nit
    const buscarParticipante = async (index) => {

        const rawTipoIdentificacion = document.getElementsByName(`tipoIdentificacion-${index}`);;
        const rawNumeroIdentificacion = document.getElementsByName(`numeroIdentificacion-${index}`);
        const dataBuscarClientePj = {};

        if (rawTipoIdentificacion[0].value !== '' && rawNumeroIdentificacion[0].value) {
            setShowLoading(true);
            if (rawTipoIdentificacion[0].value === 'NIT') {
                dataBuscarClientePj.identification = `${rawNumeroIdentificacion[0].value}`;
                dataBuscarClientePj.identificationType = `${rawTipoIdentificacion[0].value}`;
                dataBuscarClientePj.customerType = 'PJ';
            } else {
                dataBuscarClientePj.identification = `${rawNumeroIdentificacion[0].value}`;
                dataBuscarClientePj.identificationType = `${rawTipoIdentificacion[0].value}`;
                dataBuscarClientePj.customerType = 'PN';
            };

            const rawParticipante = JSON.parse(await fn_queryProspecto(JSON.stringify(dataBuscarClientePj)));
            if (rawParticipante.state !== 200) {
                setShowLoading(false);
                setMessageAlert(rawParticipante.message)
                setShowModal(true);
                localStorage.removeItem('index');
                localStorage.setItem('index', index);
                return;
            };

            const nuevoItem = { ...rawParticipante.data[0], nuevo: false, isSearch: true, codParticipante: '5' };
            montarListPn(nuevoItem);

            const copia = [...juntaDirectivaPn];
            copia[index] = nuevoItem; // ← actualiza solo el índice actual
            actualizarJuntaDirectivaPn(copia);
            setShowLoading(false);

            await servicioInspektor(index);

        } else {
            setShowLoading(false);
            setMessageAlert('Tipo de identificación y/o Número de identificación no deben estar vacios')
            setShowModal(true);
        }

    };


    const cancelarOperacion = (index) => {
        const copia = [...juntaDirectivaPn]
        copia.splice(index, 1)
        actualizarJuntaDirectivaPn(copia);
    };


    const onChangeTipoCliente = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;
        setTipoCliente(inputValue)
    };


    const servicioInspektor = async (index) => {
        const tipoIdentificacion = document.getElementsByName(`tipoIdentificacion-${index}`);
        const numeroIdentificacion = document.getElementsByName(`numeroIdentificacion-${index}`);

        if (tipoIdentificacion[0].value !== '' && numeroIdentificacion[0].value !== '') {
            setShowLoading(true);
            const operationData = {
                "documentType": tipoIdentificacion[0].value,
                "documentNumber": numeroIdentificacion[0].value
            };
            const validarDocumentosListasRestrictivas = JSON.parse(await fnInspektor(JSON.stringify(operationData)));

            if (!validarDocumentosListasRestrictivas.authorized) {
                const listReference = validarDocumentosListasRestrictivas.listReference;
                setDataReporte(JSON.parse(listReference));
            } else {
                setDataReporte([]);
            };

            setShowLoading(false);
            setMessageAlertInspecktor(validarDocumentosListasRestrictivas.message);
            setShowModalInspector(true);
        };
    };


    const endModalInspecktor = () => {
        setShowModalInspector(false);
    };


    const endModalGuardar = () => {
        setShowModalGuardar(false);
    };


    return (

        <form id='juntaDirectivaPj'>

            <div className="flex justify-between items-start mb-6">
                <h3 className="font-semibold">INFORMACIÓN JUNTA DIRECTIVA</h3>
                <ButtomUsuarioProspetcto contextRadClient={contextRadClient} campoValidarAdministracion={campoValidarAdministracion} />
            </div>

            <div className='flex gap-2 mb-3'>
                <label htmlFor="">Cantidad de integrantes</label>
                <input type="number" className='border w-14 text-center  border-gray-200 rounded-md' onChange={() => { }} value={juntaDirectivaPn?.length} />
            </div>

            {
                juntaDirectivaPn?.map((item, i) => (

                    <div key={i + 'junta'} className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                        <h1 className='my-4 font-bold'>Registro de Miembro de Junta Directiva</h1>
                        <div className='w-full px-4 mb-6 rounded-md py-6 border border-gray-200 '>
                            <div className="flex justify-between items-center">
                                <div className='flex gap-6'>
                                    <h1 className="font-bold py-3">Consulta Persona natural o jurídica</h1>
                                </div>
                            </div>
                            <div className='  w-full px-4 mb-6 rounded-md py-6 border border-gray-200'>
                                <label htmlFor="" className=' mb-2 my-6 font-bold'>Seleccione el Tipo de Persona</label>
                                <div className='flex gap-x-5'>
                                    <label className='flex gap-x-4'>
                                        <input
                                            className='accent-coomeva_color-rojo'
                                            type="radio"
                                            onChange={onChangeJuntaDirectiva}
                                            name={"tipoPersona-" + i}
                                            checked={item?.tipoPersona == 'CC' || (item.tipoIdentificacion != 'NIT' && item.tipoIdentificacion != '' && item.tipoIdentificacion != undefined && item?.tipoPersona == undefined)}
                                            value="CC"
                                        />
                                        Persona Natural
                                    </label>

                                    <label className='flex gap-x-4'>
                                        <input
                                            className='accent-coomeva_color-rojo'
                                            type="radio"
                                            onChange={onChangeJuntaDirectiva}
                                            name={"tipoPersona-" + i}
                                            checked={item?.tipoPersona == 'NIT' || (item.tipoIdentificacion == 'NIT' && item.tipoIdentificacion != '' && item.tipoIdentificacion != undefined && item?.tipoPersona == undefined)}
                                            value="NIT" />
                                        Persona Jurídica
                                    </label>
                                </div>
                            </div>

                        </div>
                        {

                            ((item.tipoIdentificacion == 'CC' || item.tipoIdentificacion == 'CE' || item.tipoIdentificacion == 'PAP' || item.tipoIdentificacion == 'PT' || item.tipoIdentificacion == 'RC' || item.tipoIdentificacion == 'TI') && (item?.tipoIdentificacion == '' || item.tipoPersona == undefined)) || item.tipoPersona == 'CC' ?
                                <div className='w-full px-4 mb-6 rounded-md py-6 border border-gray-200'>
                                    {/* <hr className='my-6' /> */}
                                    <h1 className="font-bold py-3">IDENTIFICACIÓN</h1>
                                    <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                        <div >
                                            <CampoLista
                                                valorInput={item.tipoIdentificacion}
                                                onChangeInput={onChangeJuntaDirectiva}
                                                nameInput={"tipoIdentificacion-" + i}
                                                placeholder='Tipo de Identificación'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '100',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                                lista={item.ltTipoDocPn || []}
                                                idLista='code'
                                                descripcionList='value'
                                            />
                                        </div>
                                        <div className='flex flex-row flex-nowrap'>
                                            <CampoNumero
                                                valorInput={item?.numeroIdentificacion}
                                                onChangeInput={onChangeJuntaDirectiva}
                                                nameInput={"numeroIdentificacion-" + i}
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '100',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                                placeholder='Número de identificación'
                                            />
                                            <div className='basis-1/5 flex items-center justify-center'>
                                                <button
                                                    onClick={() => { buscarParticipante(i) }}
                                                    className='text-white bg-coomeva_color-rojo py-1 px-2 rounded-md w-15 h-10 text-2xl'
                                                    type="button"
                                                    title='Buscar'
                                                >
                                                    <BiSearchAlt />
                                                </button>
                                            </div>
                                        </div>

                                        <hr className='my-6 col-span-2' />

                                        <div className='w-full px-4 col-span-2 mb-6 rounded-md py-6 border border-gray-200'>
                                            <h1 className="font-bold py-3">DATOS DEL CLIENTE</h1>
                                            <h2 className="font-bold py-3">GENERAL</h2>
                                            <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                                <div >
                                                    <CampoLista
                                                        valorInput={item.oficial}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"oficial-" + i}
                                                        placeholder='Oficial'
                                                        lista={item.ltOficiales || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.primerNombre}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"primerNombre-" + i}
                                                        placeholder='Primer Nombre'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '100',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.segundoNombre}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"segundoNombre-" + i}
                                                        placeholder='Segundo Nombre'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.primerApellido}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"primerApellido-" + i}
                                                        placeholder='Primer Apellido'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.segundoApellido}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"segundoApellido-" + i}
                                                        placeholder='Segundo Apellido'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.tipoIdentificacion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoIdentificacion-" + i}
                                                        placeholder='Tipo de identificación'
                                                        lista={item.ltTipoDocPn || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '100',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.numeroIdentificacion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroIdentificacion-" + i}
                                                        placeholder='Número de identificación'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '100',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoFecha
                                                        valorInput={item.fechaExpedicion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"fechaExpedicion-" + i}
                                                        placeholder='Fecha de expedición'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.paisNacimiento}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"paisNacimiento-" + i}
                                                        placeholder='País de nacimiento'
                                                        lista={item.ltpasisNac || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.provinciaNacimiento}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"provinciaNacimiento-" + i}
                                                        placeholder='Provincia de nacimiento'
                                                        lista={item.ltProvinciaNacimiento || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.ciudadNacimiento}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"ciudadNacimiento-" + i}
                                                        placeholder='Ciudad de nacimiento'
                                                        lista={item.ltCiudadesNac || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoFecha
                                                        valorInput={item.fechaNacimiento}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"fechaNacimiento-" + i}
                                                        placeholder='Fecha de nacimiento'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.sexo}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"sexo-" + i}
                                                        placeholder='Sexo'
                                                        lista={item.ltSexo || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.oficina}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"oficina-" + i}
                                                        placeholder='Oficina'
                                                        lista={item.ltOficina || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.estadoCivil}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"estadoCivil-" + i}
                                                        placeholder='Estado civil'
                                                        lista={item.ltEstadoCivil || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
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
                                                    <h1 className="font-bold py-3">INFORMACIÓN DE CARGO</h1>
                                                </div>
                                            </div>
                                            <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.cargo}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"cargo-" + i}
                                                        placeholder='Cargo o Rol'
                                                        lista={listTipoJuntaDirectiva}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div></div>
                                                {/* <div className='mb-4'>
                                                    <label htmlFor="" className='font-medium mb-2 mt-3'>Tipo de integrante</label>
                                                    <div>
                                                        <label className='flex gap-x-4'>
                                                            <input type="radio" name={"tipoIntegrante-" + i} onChangeInput={onChangeJuntaDirectiva} value="principal" checked={item.tipoIntegrante == 'principal'} />
                                                            Principal
                                                        </label>

                                                        <label className='flex gap-x-4'>
                                                            <input type="radio" name={"tipoIntegrante-" + i} onChangeInput={onChangeJuntaDirectiva} value="simple" checked={item.tipoIntegrante == 'simple'} />
                                                            Simple
                                                        </label>
                                                    </div>
                                                </div> */}
                                                <div></div>

                                                <div className='col-span-2 my-3'>
                                                    <hr className='my-4' />
                                                </div>

                                            </div>


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
                                                        name={"fatca-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.fatca}
                                                    />
                                                </div>

                                                <div>
                                                    <CheckDesplazable
                                                        // titulo={'CRS'}
                                                        subtitulo={'¿Tiene residencia fiscal en algún país diferente a Colombia?'}
                                                        name={"crs-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.crs}
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
                                                        valorInput={item.paisResidenciaFiscal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"paisResidenciaFiscal-" + i}
                                                        placeholder='País de Residencia Fiscal'
                                                        lista={item.ltPaisRecidencia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.tipoIdentificacionTributaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoIdentificacionTributaria-" + i}
                                                        placeholder='Tipo de Identificación Tributaria'
                                                        lista={item.ltTipoIdFiscal || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroidentificacionTributaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroidentificacionTributaria-" + i}
                                                        placeholder='Número de Identificación Tributaria'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CheckDesplazable
                                                        titulo={'Es ciudadano'}

                                                        name={"esCiudadano-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.esCiudadano}
                                                    />
                                                </div>

                                                <div>
                                                    <CheckDesplazable
                                                        titulo={'Es residente'}

                                                        name={"esRecidente-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.esRecidente}
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
                                                        name={"pep-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.pep}
                                                    />
                                                </div>

                                                {
                                                    item.pep == 'on' ?
                                                        <div>
                                                            <CampoLista
                                                                valorInput={item.tipoPep}
                                                                onChangeInput={onChangeJuntaDirectiva}
                                                                nameInput={"tipoPep-" + i}
                                                                placeholder='Tipo PEP'
                                                                lista={item.ltTipoPEP || []}
                                                                idLista={'code'}
                                                                descripcionList={'value'}
                                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                    id: '00',
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

                                                        name={"direccionPrincipal-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.direccionPrincipal}
                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoDireccion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoDireccion-" + i}
                                                        placeholder='Tipo de Dirección'
                                                        lista={item.ltTipoDireccion || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.pais}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"pais-" + i}
                                                        placeholder='País'
                                                        lista={item.ltPaisPn || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.departamento}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"departamento-" + i}
                                                        placeholder='Departamento'
                                                        lista={item.ltDepartamentoPn || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.ciudad}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"ciudad-" + i}
                                                        placeholder='Ciudad'
                                                        lista={item.ltCiudadPn || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>


                                            </div>

                                            <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>



                                                <div>
                                                    <CampoLista
                                                        valorInput={item.viaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"viaPrincipal-" + i}
                                                        placeholder='Vía principal'
                                                        lista={item.ltTipoVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroViaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroViaPrincipal-" + i}
                                                        placeholder='Número Vía principal'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.nombreViaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"nombreViaPrincipal-" + i}
                                                        placeholder='Nombre Vía principal'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.letraViaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"letraViaPrincipal-" + i}
                                                        placeholder='Letra Vía principal'
                                                        lista={item.ltTipoLetraVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.sectorViaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"sectorViaPrincipal-" + i}
                                                        placeholder='Sector Vía principal'
                                                        lista={item.ltTipoSectorVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                {/* via secundaria */}

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.viaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"viaSecundaria-" + i}
                                                        placeholder='Vía Secundaria'
                                                        lista={item.ltTipoVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroViaSecundaria-" + i}
                                                        placeholder='Número Vía secundaria'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.nombreViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"nombreViaSecundaria-" + i}
                                                        placeholder='Nombre Vía secundaria'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.letraViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"letraViaSecundaria-" + i}
                                                        placeholder='Letra Vía secundaria'
                                                        lista={item.ltTipoLetraVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.sectorViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"sectorViaSecundaria-" + i}
                                                        placeholder='Sector Vía secundaria'
                                                        lista={item.ltTipoSectorVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroPredioViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroPredioViaSecundaria-" + i}
                                                        placeholder='Numero predio vía secundaria'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
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

                                                        name={"tieneBarrio-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.tieneBarrio}
                                                    />
                                                </div>



                                                {
                                                    item.tieneBarrio == 'on' ?
                                                        <div >
                                                            <CampoTexto
                                                                valorInput={item.nombreBarrio}
                                                                onChangeInput={onChangeJuntaDirectiva}
                                                                nameInput={"nombreBarrio-" + i}
                                                                placeholder='Nombre del Barrio'
                                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                    id: '00',
                                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                                }))}
                                                            />
                                                        </div> : undefined
                                                }

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.unidad}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"unidad-" + i}
                                                        placeholder='Unidad'
                                                        lista={item.ltTipoEdificio || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>

                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroUnidad}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroUnidad-" + i}
                                                        placeholder='Numero unidad'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.letraUnidad}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"letraUnidad-" + i}
                                                        placeholder='Letra unidad'
                                                        lista={item.ltTipoLetraVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.interior}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"interior-" + i}
                                                        placeholder='Interior'
                                                        lista={item.ltTipoVivienda || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroInterior}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroInterior-" + i}
                                                        placeholder='Numero unidad'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.letraInterior}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"letraInterior-" + i}
                                                        placeholder='Letra interior'
                                                        lista={item.ltTipoLetraVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>
                                                <div >
                                                    <CampoLista
                                                        valorInput={item.numeroPersonas}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroPersonas-" + i}
                                                        placeholder='Número de Personas'
                                                        lista={item.ltReferenciaTiempo || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoVivienda}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoVivienda-" + i}
                                                        placeholder='Tipo de Vivienda'
                                                        lista={item.ltTipoPropiedad || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div >

                                                    <CampoLista
                                                        valorInput={item.añosResidencia}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"añosResidencia-" + i}
                                                        placeholder='Años en la Residencia'
                                                        lista={item.ltReferenciaTiempo || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div className='col-span-3'>
                                                    <CampoTexto
                                                        valorInput={item.referenciaUbiacion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"referenciaUbiacion-" + i}
                                                        placeholder='Referencias de Ubicación'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
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
                                                        valorInput={item.numero}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numero-" + i}
                                                        placeholder='Número'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoTelefono}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoTelefono-" + i}
                                                        placeholder='Tipo teléfono'
                                                        lista={item.ltTipoTelefono || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}

                                                    />
                                                </div>

                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoContacto}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoContacto-" + i}
                                                        placeholder='Tipo de contacto'
                                                        lista={item.ltTipoContacto || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.prefijo}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"prefijo-" + i}
                                                        placeholder='Prefijo'
                                                        lista={item.ltPrefijos || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.operadora}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"operadora-" + i}
                                                        placeholder='Operadora'
                                                        lista={item.ltTipoOperador || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoContrato}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoContrato-" + i}
                                                        placeholder='Tipo de contrato'
                                                        lista={item.ltTipoContrato || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.mensajeria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"mensajeria-" + i}
                                                        placeholder='Mensajería'
                                                        lista={item.ltTipoMensajeria || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CheckInputRojo
                                                        labelText={'Teléfono principal'}
                                                        nameInput={"telefonoPrincipal-" + i}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        valorInput={item.telefonoPrincipal}
                                                    />
                                                </div>
                                            </div>
                                            <h1 className="font-bold py-3">EMAIL 1</h1>
                                            <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                                                <div >
                                                    <CampoCorreo
                                                        valorInput={item.usuarioEmail}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"usuarioEmail-" + i}
                                                        placeholder='Usuario'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipo}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipo-" + i}
                                                        placeholder='Tipo '
                                                        lista={item.ltTipoDireccionVirtual || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CheckInputRojo
                                                        labelText={'Uso preferente'}
                                                        nameInput={"usoPreferente-" + i}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        valorInput={item.usoPreferente}
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
                            (item?.tipoIdentificacion == 'NIT' && (item?.tipoPersona == '' || item?.tipoPersona == undefined)) || item.tipoPersona == 'NIT' ?
                                <div className='w-full px-4 mb-6 rounded-md py-6 border border-gray-200'>
                                    {/* <hr className='my-6' /> */}

                                    <h1 className="font-bold py-3">IDENTIFICACIÓN</h1>

                                    <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>

                                        <div >
                                            <CampoLista
                                                valorInput={item.tipoIdentificacion}
                                                onChangeInput={onChangeJuntaDirectiva}
                                                nameInput={"tipoIdentificacion-" + i}
                                                placeholder='Tipo de Identificación'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '100',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                                lista={item.ltTipoDocPn || []}
                                                idLista='code'
                                                descripcionList='value'
                                            />
                                        </div>
                                        <div className='flex flex-row flex-nowrap'>
                                            <CampoNumero
                                                valorInput={item?.numeroIdentificacion || item?.nit}
                                                onChangeInput={onChangeJuntaDirectiva}
                                                nameInput={"numeroIdentificacion-" + i}
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '100',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                                placeholder='Número de identificación'
                                            />
                                            <div className='basis-1/5 flex items-center justify-center'>
                                                <button
                                                    onClick={() => { buscarParticipante(i) }}
                                                    className='text-white bg-coomeva_color-rojo py-1 px-2 rounded-md w-15 h-10 text-2xl'
                                                    type="button"
                                                    title='Buscar'
                                                >
                                                    <BiSearchAlt />
                                                </button>
                                            </div>
                                        </div>
                                        <hr className='my-6 col-span-2' />
                                        <div className='w-full px-4 col-span-2 mb-6 rounded-md py-6 border border-gray-200'>
                                            <h1 className="font-bold py-3">DATOS DEL CLIENTE</h1>
                                            <h2 className="font-bold py-3">GENERAL</h2>
                                            <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.razonSocial}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"razonSocial-" + i}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '100',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                        placeholder='Nombre o Razón Social'
                                                    />
                                                </div>
                                                <div >
                                                    {/* <CampoNumero
                                                    valorInput={item.nit}
                                                    onChangeInput={onChangeJuntaDirectiva}
                                                    nameInput={"nit-" + i}
                                                    placeholder='NIT'
                                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                        id: '00',
                                                        listaCamposAdministracion: dataCamposAdministacion,
                                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                    }))}

                                                /> */}
                                                </div>
                                                <div >
                                                    <CampoLista
                                                        valorInput={item.paisConstitucion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"paisConstitucion-" + i}
                                                        placeholder='País de Constitución'
                                                        lista={item.ltPaisPn || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoFecha
                                                        valorInput={item.fechaConstitucion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"fechaConstitucion-" + i}
                                                        placeholder='Fecha de Constitución'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoLista
                                                        valorInput={item.tipoCompania}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoCompania-" + i}
                                                        placeholder='Tipo de Compañía'
                                                        lista={listTipoSociedad}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.categoriaCompania}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"categoriaCompania-" + i}
                                                        placeholder='Categoría de Compañía'
                                                        lista={item.ltCategoriaCompania || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoLista
                                                        valorInput={item.oficial}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"oficial-" + i}
                                                        placeholder='Oficial'
                                                        lista={item.ltOficiales || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <CampoLista
                                                        valorInput={item.oficina}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"oficina-" + i}
                                                        placeholder='Oficina'
                                                        lista={item.ltOficina || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
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
                                                        name={"direccionPrincipal-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.direccionPrincipal}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoDireccion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoDireccion-" + i}
                                                        placeholder='Tipo de Dirección'
                                                        lista={item.ltTipoDireccion || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.pais}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"pais-" + i}
                                                        placeholder='País'
                                                        lista={item.ltPaisPn || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.departamento}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"departamento-" + i}
                                                        placeholder='Departamento'
                                                        lista={item.ltDepartamentoPn || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.ciudad}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"ciudad-" + i}
                                                        placeholder='Ciudad'
                                                        lista={item.ltCiudadPn || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.viaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"viaPrincipal-" + i}
                                                        placeholder='Vía principal'
                                                        lista={item.ltTipoVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroViaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroViaPrincipal-" + i}
                                                        placeholder='Número Vía principal'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.nombreViaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"nombreViaPrincipal-" + i}
                                                        placeholder='Nombre Vía principal'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.letraViaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"letraViaPrincipal-" + i}
                                                        placeholder='Letra Vía principal'
                                                        lista={item.ltTipoLetraVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.sectorViaPrincipal}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"sectorViaPrincipal-" + i}
                                                        placeholder='Sector Vía principal'
                                                        lista={item.ltTipoSectorVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                {/* via secundaria */}
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.viaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"viaSecundaria-" + i}
                                                        placeholder='Vía Secundaria'
                                                        lista={item.ltTipoVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroViaSecundaria-" + i}
                                                        placeholder='Número Vía secundaria'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoTexto
                                                        valorInput={item.nombreViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"nombreViaSecundaria-" + i}
                                                        placeholder='Nombre Vía secundaria'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.letraViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"letraViaSecundaria-" + i}
                                                        placeholder='Letra Vía secundaria'
                                                        lista={item.ltTipoLetraVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.sectorViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"sectorViaSecundaria-" + i}
                                                        placeholder='Sector Vía secundaria'
                                                        lista={item.ltTipoSectorVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroPredioViaSecundaria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroPredioViaSecundaria-" + i}
                                                        placeholder='Numero predio vía secundaria'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
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

                                                        name={"tieneBarrio-" + i}
                                                        onclickCheck={onChangeJuntaDirectiva}
                                                        valorInput={item.tieneBarrio}
                                                    />
                                                </div>
                                                {
                                                    item.tieneBarrio == 'on' ?
                                                        <div >
                                                            <CampoTexto
                                                                valorInput={item.nombreBarrio}
                                                                onChangeInput={onChangeJuntaDirectiva}
                                                                nameInput={"nombreBarrio-" + i}
                                                                placeholder='Nombre del Barrio'
                                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                                    id: '00',
                                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                                }))}
                                                            />
                                                        </div> : undefined
                                                }
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.unidad}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"unidad-" + i}
                                                        placeholder='Unidad'
                                                        lista={item.ltTipoEdificio || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroUnidad}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroUnidad-" + i}
                                                        placeholder='Numero unidad'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.letraUnidad}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"letraUnidad-" + i}
                                                        placeholder='Letra unidad'
                                                        lista={item.ltTipoLetraVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.interior}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"interior-" + i}
                                                        placeholder='Interior'
                                                        lista={item.ltTipoVivienda || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoNumero
                                                        valorInput={item.numeroInterior}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroInterior-" + i}
                                                        placeholder='Numero unidad'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.letraInterior}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"letraInterior-" + i}
                                                        placeholder='Letra interior'
                                                        lista={item.ltTipoLetraVia || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoLista
                                                        valorInput={item.numeroPersonas}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numeroPersonas-" + i}
                                                        placeholder='Número de Personas'
                                                        lista={item.ltReferenciaTiempo || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoVivienda}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoVivienda-" + i}
                                                        placeholder='Tipo de Vivienda'
                                                        lista={item.ltTipoPropiedad || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div >
                                                    <CampoLista
                                                        valorInput={item.añosResidencia}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"añosResidencia-" + i}
                                                        placeholder='Años en la Residencia'
                                                        lista={item.ltReferenciaTiempo || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div className='col-span-3'>
                                                    <CampoTexto
                                                        valorInput={item.referenciaUbiacion}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"referenciaUbiacion-" + i}
                                                        placeholder='Referencias de Ubicación'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
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
                                                        valorInput={item.numero}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"numero-" + i}
                                                        placeholder='Número'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoTelefono}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoTelefono-" + i}
                                                        placeholder='Tipo teléfono'
                                                        lista={item.ltTipoTelefono || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoContacto}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoContacto-" + i}
                                                        placeholder='Tipo de contacto'
                                                        lista={item.ltTipoContacto || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.prefijo}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"prefijo-" + i}
                                                        placeholder='Prefijo'
                                                        lista={item.ltPrefijos || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.operadora}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"operadora-" + i}
                                                        placeholder='Operadora'
                                                        lista={item.ltTipoOperador || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipoContrato}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipoContrato-" + i}
                                                        placeholder='Tipo de contrato'
                                                        lista={item.ltTipoContrato || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.mensajeria}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"mensajeria-" + i}
                                                        placeholder='Mensajería'
                                                        lista={item.ltTipoMensajeria || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CheckInputRojo
                                                        labelText={'Teléfono principal'}
                                                        nameInput={"telefonoPrincipal-" + i}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        valorInput={item.telefonoPrincipal}
                                                    />
                                                </div>
                                            </div>
                                            <h1 className="font-bold py-3">EMAIL 1</h1>
                                            <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                                                <div >
                                                    <CampoCorreo
                                                        valorInput={item.usuarioEmail}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"usuarioEmail-" + i}
                                                        placeholder='Usuario'
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CampoLista
                                                        valorInput={item.tipo}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        nameInput={"tipo-" + i}
                                                        placeholder='Tipo '
                                                        lista={item.ltTipoDireccionVirtual || []}
                                                        idLista={'code'}
                                                        descripcionList={'value'}
                                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                            id: '00',
                                                            listaCamposAdministracion: dataCamposAdministacion,
                                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                        }))}
                                                    />
                                                </div>
                                                <div>
                                                    <CheckInputRojo
                                                        labelText={'Uso preferente'}
                                                        nameInput={"usoPreferente-" + i}
                                                        onChangeInput={onChangeJuntaDirectiva}
                                                        valorInput={item.usoPreferente}
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
                        <div className='flex justify-end my-2'>
                            <button
                                onClick={() => { cancelarOperacion(i) }}
                                className='text-white bg-coomeva_color-rojo py-1 px-2 rounded-md w-40 text-xs h-10'
                                type="button"
                            >Cancelar</button>
                        </div>
                    </div>
                ))
            }
            <div className='flex justify-between items-center'>
                <ButtomAgregarItem
                    titulo={'Agregar'}
                    onClick={agregarJuntaDirectivaPn}
                    clienteNuevoProspectoActualizar={clienteNuevoProspectoActualizar}
                    contextRadClient={contextRadClient} />

                <ButtomValidarCcNit
                    contextRadClient={contextRadClient}
                    ruta={fnContinuar}
                />
            </div>
            {
                showLoading && <Loading />
            }
            {
                (showModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            }
            {
                (showModalInspector)
                &&
                <DynamicModal titulo={'Inspecktor'} mostrarModal={endModalInspecktor} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlertInspecktor}</p>
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
                (showModalGuardar)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModalGuardar} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageGuardar}</p>
                </DynamicModal>
            }

        </form>
    );
};