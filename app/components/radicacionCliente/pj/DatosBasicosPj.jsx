'use client'

import { useEffect, useState } from 'react';
import { loadDraft, saveDraft } from '@/app/lib/utils/draft'
import { CampoFecha } from '../../share/CampoFecha';
import { CampoTexto } from '../../share/CampoTexto';
import { CampoLista } from '../../share/CampoLista';
import { CampoNumeroParseoMil } from '../../share/CampoNumeroParseoMil';
import { CampoTelefono } from '../../share/CampoTelefono';
import { CampoCorreo } from '../../share/CampoCorreo';
import { formatearNumeroTelefono, objectoValidarCampoAdministracion } from '@/app/lib/utils';
import { CampoMoneda } from '../../share/CampoMoneda';
import { SeccionFondo } from '../../share/SeccionFondoRadicacion';
import { CheckInputRojo } from '../../share/CheckInputRojo';
import { CheckNuevo } from '../../share/CheckNuevo';
import Modals from '../../share/Modals';
import { BiTrash } from 'react-icons/bi';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { FaGlobe } from "react-icons/fa";
import { ButtomValidarCcNit } from '../ButtomValidarCcNit';
import { CampoNumero } from '../../share/CampoNumero';
import dynamic from 'next/dynamic';
import { CardDirecciones } from '../../share/CardDirecciones';
import { fn_catalogosCliente } from '@/app/lib/apisClientePj/fn_catalogosCliente';
import Loading from '../../share/Loading';


const DynamicModal = dynamic(() => import('../../share/Modals'));


export const DatosBasicosPj = ({ contextRadClient, dataCamposAdministacion = [] }) => {

    const [activarTab, setActivarTab] = useState(1)
    const [agregarTelefono, setAgregarTelefono] = useState(false)
    const [tipoTelefonoSeleccionado, settipoTelefonoSeleccionado] = useState('')
    const { perfilPj, actualizarPerfilPj, clienteNuevoProspectoActualizar } = contextRadClient()
    const [catalogo, setCatalogo] = useState({});
    const [mostrarModal, setMostrarModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [listaTelefonosFiltro, setListaTelefonosFiltro] = useState([]);
    const [listaDireccionFiltro, setListaDireccionFiltro] = useState([]);
    const [showLoading, setShowLoading] = useState(false);


    //INICIALIZANDO CATALOGOS
    useEffect(() => {
        try {
            if (Object.keys(catalogo).length === 0) {

                const timeoutCatalogo = setTimeout(async () => {
                    const cat = JSON.parse(await fn_catalogosCliente());
                    setCatalogo(cat);
                }, 100);

                return () => clearTimeout(timeoutCatalogo);
            }
        } catch (error) {
            console.log(error)
        };

    }, []);


    const DRAFT_KEY = 'perfilPj';
    // 1) Al montar carga draft
    useEffect(() => {
        try {
            const draft = loadDraft(DRAFT_KEY);
            if (draft && Array.isArray(draft) && Object.keys(catalogo).length > 0) {
                const draftConListas = draft.map(item => {
                    const nuevo = { ...item };
                    montarListPn(nuevo);
                    return nuevo;
                });

                actualizarPerfilPj(draftConListas);
            }
            return () => {
                // si quieres limpiar al salir, descomenta:
                // clearDraft(DRAFT_KEY);
            }

        } catch (error) {
            console.log(error);
        };

    }, [catalogo]);

    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        saveDraft(DRAFT_KEY, perfilPj);
    }, [perfilPj]);


    //INICIALIZANDO FILTROS de TELEFONO Y DIRECCIONES
    useEffect(() => {

        const diferirFiltros = setTimeout(() => {
            setListaTelefonosFiltro(catalogo.listTipoContacto);
            setListaDireccionFiltro(catalogo.listTipoDireccion);
        }, 200);

        return () => clearTimeout(diferirFiltros);

    }, []);


    //MONTAR DEPARTAMENTO
    const [lDepartamentos, setLDepartamentos] = useState([]);
    const [montarDepartamento, setMontarDepartamento] = useState([]);
    useEffect(() => {
        setLDepartamentos(catalogo.listDepartamento);
    }, [montarDepartamento]);


    //MONTAR CIUDAD
    const [lCiudad, setLCiudad] = useState([]);
    const [montarCiudad, setMontarCiudad] = useState();
    useEffect(() => {

        let codCiudad = montarCiudad;
        try {
            if (typeof (montarCiudad) === 'string') {
                const catCiudad = catalogo.listCiudades.filter(ciudades => ciudades.code.startsWith(codCiudad));
                setLCiudad(catCiudad);
            } else {
                setLCiudad(catalogo.listCiudades);
            };
        } catch (error) {
            console.log(error)
        };

    }, [montarCiudad]);


    //MONTAR CIUDAD CONSTITUCION
    const [lCiudadConstitucion, setLCiudadConstitucion] = useState([]);
    const [montarCiudadConstitucion, setMontarCiudadConstitucion] = useState();
    useEffect(() => {
        setLCiudadConstitucion(catalogo.listCiudades);
    }, [montarCiudadConstitucion]);


    /* let deshabilitar = clienteNuevoProspectoActualizar != '1' && clienteNuevoProspectoActualizar != '2' && clienteNuevoProspectoActualizar != '3' */

    const [formTelefono, setformTelefono] = useState({
        tipoTelefono: '',
        tipoContacto: '',
        prefijo: '',
        numero: '',
        mensajeria: '',
        principal: '',
        operadora: '',
        tipoContrato: '',
    });


    const [formSitioWeb, setformSitioWeb] = useState({
        tipoSitioWeb: '',
        url: '',
        usuPreferente: '',
    });


    const [formCorreo, setformCorreo] = useState({
        tipoCorreo: '',
        correoElectronico: '',
        usuPreferente: '',
    });


    const [formDireccion, setformDireccion] = useState({
        direccionPrincipalNegocio: '',
        tipoDireccion: 'AE',
        pais: '',
        departamento: '',
        ciudad: '',
        tipoViaPrincipal: '',
        numeroViaPrincipal: '',
        nombreViaPrincipal: '',
        letraViaPrincipal: '',
        sectoViarPrincipal: '',
        tipoViaSecundaria: '',
        numeroViaSecundaria: '',
        nombreViaSecundaria: '',
        letraPrincipalViaSecundaria: '',
        sectorViaSecundaria: '',
        numeroPredioViaSecundaria: '',
        barrio: '',
        nombreBarrio: '',
        unidad: '',
        numeroUnidad: '',
        letraUnidad: '',
        interiorDescripcion: '',
        numeroInterior: '',
        letraInterior: '',
        referenciaUbicacion: '',
        motivo: ''
    });


    const onChangeInput = (e) => {

        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;
        const keys = name.split(".");

        if ((keys.includes('numeroIdentificacion')) && perfilPj.datosGenerales?.tipoIdentificacion == 'NIT') {

            if (value.length == 10) {
                return;
            }
        };

        const updateNestedObject = (obj, keys, value) => {
            const newObj = { ...obj };

            let current = newObj;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newObj;
        };

        const updatedPerfilPj = updateNestedObject(perfilPj, keys, inputValue);
        actualizarPerfilPj(updatedPerfilPj);

        if (name === 'camposAdicionales.sectorEconomico') {
            setMontarCiudadConstitucion(true)
        };

    };


    const onBlurInputDocumento = (e) => {
        const { name, type, checked, value } = e.target;
        // const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;
        const keys = name.split(".");

        if ((keys.includes('numeroIdentificacion')) && perfilPj.datosGenerales.tipoIdentificacion == 'NIT') {
            if (value.length !== 9) {
                setMessageModal('Por favor, ingrese un NIT válido de 9 dígitos')
                setMostrarModal(!mostrarModal)
                return
            }
        }
    };


    const cerrarModalNit = () => {
        setMostrarModal(!mostrarModal)
    };


    useEffect(() => {
        if (formTelefono.prefijo === '170' && formTelefono.numero?.length > 11) {
            setformTelefono(prev => ({
                ...prev,
                numero: prev.numero.slice(0, 11)
            }));
        }
    }, [formTelefono.prefijo]);


    const onChangeInputTelefono = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;

        if (name == 'numero') {
            if (formTelefono.prefijo == '170' && value.length >= 11) {
                return;
            }
        }

        if (formTelefono?.modoEdicion == true) {
            setformTelefono({
                ...formTelefono,
                [name]: inputValue
            })
            return
        }

        if (name != 'tipoContacto') {
            setformTelefono({
                ...formTelefono,
                [name]: inputValue
            })
        }
    };


    const onChangeInputSitioWeb = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;

        setformSitioWeb({
            ...formSitioWeb,
            [name]: inputValue
        });
    };


    const onChangeInputCorreo = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;

        setformCorreo({
            ...formCorreo,
            [name]: inputValue
        });

    };


    const onChangeInputDireccion = (e) => {
        const { name, value } = e.target;

        setformDireccion({
            ...formDireccion,
            [name]: value
        });

        switch (name) {
            case 'pais': {
                localStorage.removeItem('paisCode');
                localStorage.setItem("paisCode", value);
                setMontarDepartamento(true);
                break;
            }
            case 'departamento': {
                let paisSelect = localStorage.getItem('paisCode');

                if (paisSelect === '170') {
                    setMontarCiudad(value);
                } else {
                    setMontarCiudad(false);
                };
            }
            default:
                break;
        };
    };


    const onClickTab = (e, tab) => {
        resetForm()
        e.preventDefault()
        setActivarTab(tab)
        try {
            let tipoDireccionF = tab == 1 ? 'AE' : 'SU'
            setListaDireccionFiltro(catalogo.listTipoDireccion.filter(e => e.code == tipoDireccionF))

            setformDireccion(
                {
                    direccionPrincipalNegocio: '',
                    tipoDireccion: tipoDireccionF,
                    pais: '',
                    departamento: '',
                    ciudad: '',
                    tipoViaPrincipal: '',
                    numeroViaPrincipal: '',
                    nombreViaPrincipal: '',
                    letraViaPrincipal: '',
                    sectoViarPrincipal: '',
                    tipoViaSecundaria: '',
                    numeroViaSecundaria: '',
                    nombreViaSecundaria: '',
                    letraPrincipalViaSecundaria: '',
                    sectorViaSecundaria: '',
                    numeroPredioViaSecundaria: '',
                    barrio: '',
                    nombreBarrio: '',
                    unidad: '',
                    numeroUnidad: '',
                    letraUnidad: '',
                    interiorDescripcion: '',
                    numeroInterior: '',
                    letraInterior: '',
                    referenciaUbicacion: '',
                    motivo: ''
                },
            )
        } catch (error) {
            console.log(error);
        };
    };


    const guardarTelefono = () => {

        formTelefono['id'] = Date.now()

        const updatedPerfilPj = {
            ...perfilPj,
            telefonos: {
                ...perfilPj.telefonos,
                [tipoTelefonoSeleccionado]: [...perfilPj.telefonos[tipoTelefonoSeleccionado], formTelefono],
            },
        };

        actualizarPerfilPj(updatedPerfilPj);
        cerrarModal(2)
    };


    const guardarTelefonoEdicion = () => {
        const updatedPerfilPj = {
            ...perfilPj,
            telefonos: {
                ...perfilPj.telefonos,
                [tipoTelefonoSeleccionado]: perfilPj.telefonos[tipoTelefonoSeleccionado].map(tel =>
                    tel.modoEdicion ? { ...formTelefono, modoEdicion: false } : tel
                )
            }
        };

        actualizarPerfilPj(updatedPerfilPj);
        cerrarModal(2)
        resetForm()
    };


    const eliminarTelefono = (id, opcionTel) => {
        try {

            const updatedPerfilPj = {
                ...perfilPj,
                telefonos: {
                    ...perfilPj.telefonos,
                    [opcionTel]: perfilPj.telefonos[opcionTel].filter((_, index) => index !== id)
                }
            };

            actualizarPerfilPj(updatedPerfilPj);

        } catch (error) {
            console.log(error);
        };
    };


    const eliminarSitioWeb = (id) => {
        try {
            const perfilActualizado = {
                ...perfilPj,
                sitiosWeb: perfilPj.sitiosWeb.filter(e => e.id !== id)
            };

            actualizarPerfilPj(perfilActualizado);

        } catch (error) {
            console.log(error);
        };
    };


    const eliminarCorreo = (id) => {
        try {
            const perfilActualizado = {
                ...perfilPj,
                correosElectronicos: perfilPj.correosElectronicos.filter(e => e.id !== id)
            };

            actualizarPerfilPj(perfilActualizado);

        } catch (error) {
            console.log(error);
        };
    };


    const editarTelefono = (id, opcionTel, tipoContacto) => {
        const telefono = perfilPj.telefonos[opcionTel][id]
        telefono['modoEdicion'] = true
        setformTelefono(
            telefono
        );

        abrirModal(1, opcionTel, telefono.tipoContacto)

    };


    const guardarSitioWeb = () => {

        const existePreferente = perfilPj.sitiosWeb?.some(
            correo => correo.usuPreferente === 'on'
        );

        if (formSitioWeb.usuPreferente == 'on' && existePreferente) {
            setMessageModal('Ya existe un sitio web preferente')
            setMostrarModal(!mostrarModal)
            return;
        }

        formSitioWeb['id'] = Date.now()

        const updatedPerfilPj = {
            ...perfilPj,
            ['sitiosWeb']: [...perfilPj['sitiosWeb'], formSitioWeb],
        };

        actualizarPerfilPj(updatedPerfilPj);
        resetForm()

    };


    const guardarCorreo = () => {

        const existePreferente = perfilPj.correosElectronicos?.some(
            correo => correo.usuPreferente === 'on'
        );

        if (formCorreo.usuPreferente == 'on' && existePreferente) {
            setMessageModal('Ya existe un correo electrónico preferente')
            setMostrarModal(!mostrarModal)
            return;
        }

        const emailInput = document.querySelector('#frmCorreo input[type="email"]');

        if (!emailInput.checkValidity()) {
            emailInput.reportValidity();
            return;
        }

        formCorreo['id'] = Date.now()

        const updatedPerfilPj = {
            ...perfilPj,
            ['correosElectronicos']: [...perfilPj['correosElectronicos'], formCorreo],
        };

        actualizarPerfilPj(updatedPerfilPj);
        resetForm()

    };


    const guardarDireccion = () => {
        try {
            let opcionActiva = activarTab == 1 ? 'direccionNegocio' : 'direccionSucursal';

            if (!formDireccion.modoEdicion) {

                formDireccion['id'] = Date.now()

                const updatedPerfilPj = {
                    ...perfilPj,
                    direcciones: {
                        ...perfilPj.direcciones,
                        [opcionActiva]: [...perfilPj.direcciones[opcionActiva], formDireccion],
                    },
                };

                actualizarPerfilPj(updatedPerfilPj);

            }

            if (formDireccion.modoEdicion) {

                const perfilPjCopia = [...perfilPj.direcciones[opcionActiva]]
                const listPerfil = perfilPjCopia.filter(e => !e.modoEdicion)

                delete formDireccion['modoEdicion']

                listPerfil.push(formDireccion)

                const updatedPerfilPj = {
                    ...perfilPj,
                    direcciones: {
                        ...perfilPj.direcciones,
                        [opcionActiva]: listPerfil,
                    },
                };

                actualizarPerfilPj(updatedPerfilPj)
            }

            resetForm()

        } catch (error) {
            console.log(error);
        };

    };


    const eliminarDireccion = (id) => {
        try {
            const opcionActiva = activarTab == 1 ? 'direccionNegocio' : 'direccionSucursal';
            const updatedPerfilPj = {
                ...perfilPj,
                direcciones: {
                    ...perfilPj.direcciones,
                    [opcionActiva]: perfilPj.direcciones[opcionActiva].filter((_, index) => index !== id),
                },
            };

            actualizarPerfilPj(updatedPerfilPj);

        } catch (error) {
            console.log(error);
        };
    };


    const resetForm = () => {

        setformCorreo({
            tipoCorreo: '',
            correoElectronico: '',
            usuPreferente: '',
        })

        setformDireccion({
            direccionPrincipalNegocio: '',
            tipoDireccion: '',
            pais: '',
            departamento: '',
            ciudad: '',
            tipoViaPrincipal: '',
            numeroViaPrincipal: '',
            nombreViaPrincipal: '',
            letraViaPrincipal: '',
            sectoViarPrincipal: '',
            tipoViaSecundaria: '',
            numeroViaSecundaria: '',
            nombreViaSecundaria: '',
            letraPrincipalViaSecundaria: '',
            sectorViaSecundaria: '',
            numeroPredioViaSecundaria: '',
            barrio: '',
            nombreBarrio: '',
            unidad: '',
            numeroUnidad: '',
            letraUnidad: '',
            interiorDescripcion: '',
            numeroInterior: '',
            letraInterior: '',
            referenciaUbicacion: '',
        })
        setformSitioWeb({
            tipoSitioWeb: '',
            url: '',
            usuPreferente: '',
        })
        setformTelefono({
            tipoTelefono: '',
            tipoContacto: '',
            prefijo: '',
            numero: '',
            mensajeria: '',
            principal: '',
            operadora: '',
            tipoContrato: '',
        })

    };


    const cerrarModal = (op) => {
        const abrirModalSeleccionado = {
            2: () => setAgregarTelefono(false),
        }
        abrirModalSeleccionado[op]()
        resetForm()
    };


    const abrirModal = (op, tipoTelefono, tipoContacto) => {
        try {
            settipoTelefonoSeleccionado(tipoTelefono)
            setListaTelefonosFiltro(catalogo.listTipoContacto.filter(e => e.code == tipoContacto))

            const abrirModalSeleccionado = {
                1: () => {
                    setAgregarTelefono(true)
                },

                2: () => {
                    setformTelefono({
                        ...formTelefono,
                        ['tipoContacto']: tipoContacto
                    })
                    setAgregarTelefono(true)
                },
            }
            abrirModalSeleccionado[op]();

        } catch (error) {
            console.log(error);
        };
    };


    const editarDireccion = (id, opcionDir) => {
        const direccion = perfilPj.direcciones[opcionDir][id]
        direccion['modoEdicion'] = true
        setformDireccion(
            direccion
        );
    };


    useEffect(() => {
        if (formDireccion.pais) {
            localStorage.setItem('paisCode', formDireccion.pais);
            setMontarDepartamento(true);
        }
    }, [formDireccion.pais]);


    useEffect(() => {
        const paisSelect = localStorage.getItem('paisCode');
        if (formDireccion.departamento && paisSelect === '170') {
            setMontarCiudad(formDireccion.departamento);
        } else if (formDireccion.departamento) {
            setMontarCiudad(false);
        }
    }, [formDireccion.departamento]);


    /* useEffect(() => {
        try {
            if (perfilPj?.camposAdicionales?.sectorEconomico !== undefined) {
                setMontarCiudadConstitucion(true);
            }
        } catch (error) {
            console.log(error);
        };
    }, [perfilPj]); */


    return (
        <div className="datosPersonaNatural  container mx-auto">
            <form id='datosPersonaJuridicaPj' className="">
                <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                    <div className="flex justify-between items-center">
                        <div className='flex gap-6'>
                            <h1 className="font-bold py-3">Datos Generales </h1>
                        </div>
                    </div>
                    <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                        <div className=''>
                            <CampoTexto
                                valorInput={perfilPj?.datosGenerales?.razonSocial}
                                onChangeInput={onChangeInput}
                                nameInput="datosGenerales.razonSocial"
                                placeholder="Razón social"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '100',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                }))}
                            />
                        </div>
                        <div className=''>
                            <CampoLista
                                valorInput={perfilPj?.datosGenerales?.codPaisConstitucion}
                                onChangeInput={onChangeInput}
                                nameInput="datosGenerales.codPaisConstitucion"
                                placeholder='País de constitución'
                                lista={catalogo.listPaises}
                                idLista="code"
                                descripcionList="value"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.datosGenerales?.tipoIdentificacion}
                                onChangeInput={onChangeInput}
                                nameInput="datosGenerales.tipoIdentificacion"
                                placeholder="Tipo Identificación"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '100',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    // validacionAdicional: false
                                }))}
                                lista={catalogo.listTipoDocumento}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div  >
                            <CampoTexto

                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '100',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    // validacionAdicional: false
                                }))}
                                valorInput={perfilPj?.datosGenerales?.numeroIdentificacion}
                                onChangeInput={onChangeInput}
                                onBlurInput={onBlurInputDocumento}
                                nameInput="datosGenerales.numeroIdentificacion"
                                placeholder="Número de Identificación"
                            />
                        </div>
                        <div className=''>
                            <CampoLista
                                valorInput={perfilPj?.datosGenerales?.tipoSociedad}
                                onChangeInput={onChangeInput}
                                nameInput="datosGenerales.tipoSociedad"
                                placeholder='Tipo de Compañía (Tipo Sociedad)'
                                lista={catalogo.listTipoSociedad}
                                idLista='code'
                                descripcionList='value'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.datosGenerales?.categoriaCompania}
                                onChangeInput={onChangeInput}
                                nameInput="datosGenerales.categoriaCompania"
                                placeholder="Categoría de Compañía (Naturaleza Jurídica)"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listCategoriaCompania}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.datosGenerales?.oficina}
                                onChangeInput={onChangeInput}
                                nameInput="datosGenerales.oficina"
                                placeholder="Oficina"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listOficina}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.datosGenerales?.oficial}
                                onChangeInput={onChangeInput}
                                nameInput="datosGenerales.oficial"
                                placeholder="Oficial"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listOficial}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                    </div>
                    <h3 className="font-bold py-3 my-2">Datos Económicos</h3>
                    <div className='grid grid-cols-3 gap-x-8 gap-y-4'>
                        <div className=''>
                            <CampoTexto
                                readOnly={true}
                                valorInput={perfilPj?.datosEconomicos?.representanLegal}
                                onChangeInput={onChangeInput}
                                nameInput="datosEconomicos.representanLegal"
                                placeholder="Representante Legal"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.datosEconomicos?.actividadEconomica}
                                onChangeInput={onChangeInput}
                                nameInput="datosEconomicos.actividadEconomica"
                                placeholder="Actividad Económica"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listActividadEconimica}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.datosEconomicos?.fuentePrincipalIngresos}
                                onChangeInput={onChangeInput}
                                nameInput="datosEconomicos.fuentePrincipalIngresos"
                                placeholder="Fuente Principal de Ingresos"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listFuentePrincipalIngreso}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoMoneda
                                valorInput={perfilPj?.datosEconomicos?.ingresosAnuales}
                                onChangeInput={onChangeInput}
                                nameInput="datosEconomicos.ingresosAnuales"
                                placeholder="Ingresos Anuales"
                                placeholderAux='Ingresos Anuales'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                            />
                        </div>
                        <div >
                            <CampoTexto
                                readOnly={true}
                                valorInput={perfilPj?.datosEconomicos?.grupoEconomico}
                                onChangeInput={onChangeInput}
                                nameInput="datosEconomicos.grupoEconomico"
                                placeholder="Grupo Económico"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                            />
                        </div>
                    </div>
                    <h3 className="font-bold py-3 my-2">Conozca Su Cliente</h3>
                    <hr className='my-2' />
                    <div className='grid grid-cols-3 gap-x-8 gap-y-4'>
                        <div>
                            <CampoLista
                                valorInput={perfilPj?.conozcaSuCliente?.paisOperacion}
                                onChangeInput={onChangeInput}
                                nameInput="conozcaSuCliente.paisOperacion"
                                placeholder="País de Operación"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listPaises}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div>
                            <CampoLista
                                valorInput={perfilPj?.conozcaSuCliente?.coberturaGeografica}
                                onChangeInput={onChangeInput}
                                nameInput="conozcaSuCliente.coberturaGeografica"
                                placeholder="Cobertura Geográfica"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listCoberturageografica}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div className=''>
                            <CampoNumeroParseoMil
                                valorInput={perfilPj?.conozcaSuCliente?.numeroSucursales}
                                onChangeInput={onChangeInput}
                                nameInput="conozcaSuCliente.numeroSucursales"
                                placeholder='Número de Sucursales'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div className=''>
                            <CampoNumeroParseoMil
                                valorInput={perfilPj?.conozcaSuCliente?.numeroEmpleados}
                                onChangeInput={onChangeInput}
                                nameInput="conozcaSuCliente.numeroEmpleados"
                                placeholder='Número de Empleados'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                    <h3 className="font-bold py-3 my-2">Información Legal</h3>
                    <hr className='my-2' />
                    <div className='grid grid-cols-3 gap-x-8 gap-y-4'>
                        <div className=''>
                            <CampoTexto
                                valorInput={perfilPj?.informacionLegal?.nombreComercial}
                                onChangeInput={onChangeInput}
                                nameInput="informacionLegal.nombreComercial"
                                placeholder="Nombre Comercial"

                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div >
                            <CampoFecha
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0026',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={perfilPj?.informacionLegal?.fechaConstitucion}
                                onChangeInput={onChangeInput}
                                placeholder="Fecha de Constitución"
                                nameInput="informacionLegal.fechaConstitucion"
                            />
                        </div>
                        <div >
                            <CampoFecha
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0026',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={perfilPj?.informacionLegal?.fechaInscripcion}
                                onChangeInput={onChangeInput}
                                placeholder="Fecha de Inscripción"
                                nameInput="informacionLegal.fechaInscripcion"
                            />
                        </div>
                    </div>

                    <h3 className="font-bold py-3 my-2">Teléfonos</h3>
                    <hr className='my-2' />

                    <SeccionFondo titulo={'Teléfonos del Negocio'} nCol={1} subtitulo={'Teléfonos de Contacto'} textButtom='Agregar Teléfono' onClickButtom={() => { abrirModal(2, 'telefonoNegocio', 'N') }}>
                        <div className="border border-gray-200 h-48 rounded-md flex gap-x-3 p-4 justify-start overflow-x-auto items-center">
                            {
                                perfilPj?.telefonos?.telefonoNegocio?.length > 0 ?
                                    perfilPj?.telefonos?.telefonoNegocio.map((item, i) => (
                                        <div key={i} className={`my-2 bg-white border border-gray-200 shadow-sm  rounded-md p-3 flex-shrink-0 w-[30rem]`}>
                                            <div className=" ">
                                                <div className="flex justify-between items-center gap-x-2">
                                                    <div className="flex gap-x-2">
                                                        <PhoneIcon className="w-5 h-5 " />
                                                        <p className="font-bold">{catalogo.listTipoTelefono?.find(e => e.code == item.tipoTelefono)?.value}</p>
                                                    </div>
                                                    <div >
                                                        {
                                                            item.principal == 'on' ? <p className="rounded-full bg-black text-white text-xs py-1 px-2">Principal</p> : undefined
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="my-2 text-xs text-gray-500">{catalogo.listTipoContacto?.find(e => e.code == item.tipoContacto)?.value}</p>
                                            <p className="my-2 ">{formatearNumeroTelefono({ numero: item.numero })}</p>
                                            <p className="my-2 ">{catalogo.listTipoOperador?.find(e => e.code == item.operadora)?.value}</p>
                                            <div className="flex justify-between items-center gap-x-2">
                                                <button type="button" onClick={() => { editarTelefono(i, 'telefonoNegocio', 'N') }} className=" font-bold">Editar</button>
                                                <BiTrash onClick={() => { eliminarTelefono(i, 'telefonoNegocio') }} className="text-coomeva_color-rojo w-5 h-5 cursor-pointer" />
                                            </div>
                                        </div>
                                    ))

                                    : <h3>No hay teléfonos registrados</h3>
                            }
                        </div>
                    </SeccionFondo>
                    <SeccionFondo titulo={'Teléfonos de Oficina'} nCol={1} subtitulo={'Teléfonos de Contacto'} textButtom='Agregar Teléfono' onClickButtom={() => { abrirModal(2, 'telefonoOficina', 'O') }}>
                        <div className="border border-gray-200 h-48 rounded-md flex gap-x-3 p-4 justify-start overflow-x-auto items-center">
                            {
                                perfilPj?.telefonos?.telefonoOficina?.length > 0 ?
                                    perfilPj?.telefonos?.telefonoOficina.map((item, i) => (
                                        <div key={i} className={`my-2 bg-white border border-gray-200 shadow-sm  rounded-md p-3 flex-shrink-0 w-[30rem]`}>
                                            <div className=" ">
                                                <div className="flex justify-between items-center gap-x-2">
                                                    <div className="flex gap-x-2">
                                                        <PhoneIcon className="w-5 h-5 " />
                                                        <p className="font-bold">{catalogo.listTipoTelefono?.find(e => e.code == item.tipoTelefono)?.value}</p>
                                                    </div>
                                                    <div >
                                                        {
                                                            item.principal == 'on' ? <p className="rounded-full bg-black text-white text-xs py-1 px-2">Principal</p> : undefined
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="my-2 text-xs text-gray-500">{catalogo.listTipoContacto?.find(e => e.code == item.tipoContacto)?.value}</p>
                                            <p className="my-2 ">{formatearNumeroTelefono({ numero: item.numero })}</p>
                                            <p className="my-2 ">{catalogo.listTipoOperador?.find(e => e.code == item.operadora)?.value}</p>
                                            <div className="flex justify-between items-center gap-x-2">
                                                <button type="button" onClick={() => { editarTelefono(i, 'telefonoOficina') }} className=" font-bold">Editar</button>
                                                <BiTrash onClick={() => { eliminarTelefono(i, 'telefonoOficina') }} className="text-coomeva_color-rojo w-5 h-5 cursor-pointer" />
                                            </div>
                                        </div>
                                    ))
                                    : <h3>No hay teléfonos registrados</h3>
                            }
                        </div>
                    </SeccionFondo>
                    <SeccionFondo titulo={'Teléfonos de Personal Autorizado'} nCol={1} subtitulo={'Teléfonos de Contacto'} textButtom='Agregar Teléfono' onClickButtom={() => { abrirModal(2, 'telefonoPersonalAutorizado', 'P') }}>
                        <div className="border border-gray-200 h-48 rounded-md flex gap-x-3 p-4 justify-start overflow-x-auto items-center">
                            {
                                perfilPj?.telefonos?.telefonoPersonalAutorizado?.length > 0 ?
                                    perfilPj?.telefonos?.telefonoPersonalAutorizado.map((item, i) => (
                                        <div key={i} className={`my-2 bg-white border border-gray-200 shadow-sm  rounded-md p-3 flex-shrink-0 w-[30rem]`}>
                                            <div className=" ">
                                                <div className="flex justify-between items-center gap-x-2">
                                                    <div className="flex gap-x-2">
                                                        <PhoneIcon className="w-5 h-5 " />
                                                        <p className="font-bold">{catalogo.listTipoTelefono?.find(e => e.code == item.tipoTelefono)?.value}</p>
                                                    </div>
                                                    <div >
                                                        {
                                                            item.principal == 'on' ? <p className="rounded-full bg-black text-white text-xs py-1 px-2">Principal</p> : undefined
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="my-2 text-xs text-gray-500">{catalogo.listTipoContacto?.find(e => e.code == item.tipoContacto)?.value}</p>
                                            <p className="my-2 ">{formatearNumeroTelefono({ numero: item.numero })}</p>
                                            <p className="my-2 ">{catalogo.listTipoOperador?.find(e => e.code == item.operadora)?.value}</p>
                                            <div className="flex justify-between items-center gap-x-2">
                                                <button type="button" onClick={() => { editarTelefono(i, 'telefonoPersonalAutorizado') }} className=" font-bold">Editar</button>
                                                <BiTrash onClick={() => { eliminarTelefono(i, 'telefonoPersonalAutorizado') }} className="text-coomeva_color-rojo w-5 h-5 cursor-pointer" />
                                            </div>
                                        </div>
                                    ))
                                    : <h3>No hay teléfonos registrados</h3>
                            }
                        </div>
                    </SeccionFondo>
                    <h3 className="font-bold py-3 my-2">Correos Electrónicos</h3>
                    <hr className='my-2' />
                    <SeccionFondo nCol={1} >
                        <div className="border border-gray-200 h-36 rounded-md flex gap-x-3 p-4 justify-start overflow-x-auto items-center">
                            {
                                perfilPj?.correosElectronicos?.length > 0 ?
                                    perfilPj?.correosElectronicos?.map((item, i) => (
                                        <div key={i} className={`my-2 bg-white border border-gray-200 shadow-sm  rounded-md p-3 flex-shrink-0 w-[30rem]`}>
                                            <div className=" ">
                                                <div className="flex justify-between items-center gap-x-2">
                                                    <div className="flex gap-x-2">
                                                        <p className="font-bold">{item.correoElectronico}</p>
                                                    </div>
                                                    <div >
                                                        <p onClick={() => { eliminarCorreo(item.id) }} className="rounded-full   cursor-pointer  text-xs py-1 px-2">x</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=''>
                                                <p className='text-slate-500 text-sm'>Tipo:{item.tipoCorreo}</p>

                                                <div>
                                                    {
                                                        item.usuPreferente == 'on' ? <p className='bg-gray-200 mt-2 text-xs text-center py-1  w-20 rounded-full '>preferente</p> : <p className='bg-transparent mt-2 text-xs text-center  py-1  w-20 rounded-full text-transparent'>preferente</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : <h3 >No hay correos electrónicos registrados</h3>
                            }
                        </div>
                        <div className='shadow-sm border border-gray-100 rounded-md px-2'>
                            <h3 className='py-4'>Agregar Correo Electrónico</h3>
                            <div id='frmCorreo' >
                                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                                    <div >
                                        <CampoLista
                                            valorInput={formCorreo?.tipoCorreo}
                                            onChangeInput={onChangeInputCorreo}
                                            nameInput="tipoCorreo"
                                            placeholder="Tipo"
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '000',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                validacionAdicional: false
                                            }))}
                                            lista={catalogo.listTipoDireccionVirtual}
                                            idLista={'code'}
                                            descripcionList={'value'}

                                        />
                                    </div>
                                    <div>
                                        <CampoCorreo

                                            valorInput={formCorreo?.correoElectronico}
                                            onChangeInput={onChangeInputCorreo}
                                            nameInput="correoElectronico"
                                            placeholder="Correo Electrónico"

                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '000',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                    <div >
                                        {/* npmbre del campo */}
                                        {/* usuPreferente */}
                                        <CheckInputRojo
                                            labelText={'Uso preferente'}
                                            valorInput={formCorreo.usuPreferente}
                                            onChangeInput={onChangeInputCorreo}
                                            nameInput={'usuPreferente'}
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <button type='button' onClick={
                                        formCorreo.correoElectronico != '' && formCorreo.tipoCorreo != '' ? guardarCorreo : () => { }
                                    }
                                        className={`${formCorreo.tipoCorreo != '' && formCorreo.correoElectronico != '' ? 'bg-coomeva_color-rojo' : 'bg-coomeva_color-grisPestaña'}
                                 rounded-sm text-white text-xs py-1 px-2 mx-2 my-4`
                                        }> + Agregar correo</button>
                                </div>
                            </div>
                        </div>
                    </SeccionFondo>
                    <h3 className="font-bold py-3 my-2">Sitios Web</h3>
                    <hr className='my-2' />
                    <SeccionFondo nCol={1} >
                        <div className="border border-gray-200 h-36 rounded-md flex gap-x-3 p-4 justify-start overflow-x-auto items-center">
                            {
                                perfilPj?.sitiosWeb?.length > 0 ?
                                    perfilPj?.sitiosWeb?.map((item, i) => (
                                        <div key={i} className={`my-2 bg-white border border-gray-200 shadow-sm  rounded-md p-3 flex-shrink-0 w-[30rem]`}>
                                            <div className=" ">
                                                <div className="flex justify-between items-center gap-x-2">
                                                    <div className="flex gap-x-2">
                                                        <FaGlobe className="w-5 h-5 " />
                                                        <p className="font-bold">{item.url}</p>
                                                    </div>
                                                    <div >
                                                        <p onClick={() => { eliminarSitioWeb(item.id) }} className="rounded-full cursor-pointer text-xs py-1 px-2">x</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <p className='text-slate-500 text-sm mt-1'>Tipo:{item.tipoSitioWeb}</p>
                                                {
                                                    item.usuPreferente == 'on' ? <p className='bg-gray-200 mt-2 text-xs text-center py-1  w-20 rounded-full '>preferente</p> : <p className='bg-transparent mt-2 text-xs text-center text-transparent py-1  w-20 rounded-full '>preferente</p>
                                                }
                                            </div>
                                        </div>
                                    ))

                                    : <h3 >No hay sitios web registrados</h3>
                            }
                        </div>
                        <div className='shadow-sm border border-gray-100 rounded-md px-2'>
                            <h3 className='py-4'>Agregar Sitio Web</h3>

                            <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                                <div >
                                    <CampoLista
                                        valorInput={formSitioWeb.tipoSitioWeb}
                                        onChangeInput={onChangeInputSitioWeb}
                                        nameInput="tipoSitioWeb"
                                        placeholder="Tipo"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '000',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                            validacionAdicional: false
                                        }))}
                                        lista={catalogo.listTipoDireccionVirtual}
                                        idLista={'code'}
                                        descripcionList={'value'}
                                    />
                                </div>
                                <div>
                                    <CampoTexto
                                        valorInput={formSitioWeb.url}
                                        onChangeInput={onChangeInputSitioWeb}
                                        nameInput="url"
                                        placeholder="URL"

                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '000',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div >
                                    <CheckInputRojo
                                        labelText={'Uso preferente'}
                                        nameInput={'usuPreferente'}
                                        valorInput={formSitioWeb.usuPreferente}
                                        onChangeInput={onChangeInputSitioWeb}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type='button'
                                    onClick={guardarSitioWeb}
                                    disabled={!(formSitioWeb.tipoSitioWeb != '')}
                                    className={`${(formSitioWeb.tipoSitioWeb != '') ? 'bg-coomeva_color-rojo' : 'bg-gray-300'} rounded-sm text-white text-xs py-1 px-2 mx-2 my-4`}
                                > + Agregar Sitio Web</button>
                            </div>
                        </div>

                    </SeccionFondo>

                    <h3 className="font-bold py-3 my-2">Direcciones</h3>
                    <hr className='my-2' />

                    <div >
                        <div className='col-span-2 flex justify-evenly'>
                            <button
                                className={activarTab === 1 ? 'bg-white w-full rounded-md py-1 uppercase' : 'bg-gray-300 w-full rounded-md py-1 uppercase'}
                                onClick={(e) => { onClickTab(e, 1) }}
                            >
                                dirección de Negocio
                            </button>
                            <button
                                className={activarTab === 2 ? 'bg-white w-full  rounded-md py-1 uppercase' : 'bg-gray-300 w-full rounded-md py-1 uppercase'}
                                onClick={(e) => { onClickTab(e, 2) }}
                            >
                                dirección de Sucursal
                            </button>
                        </div>
                        <div >
                            {
                                activarTab == 1 ?
                                    <CardDirecciones
                                        listCiudades={catalogo.listCiudades}
                                        listDepartamentos={catalogo.listDepartamento}
                                        listTipoDireccion={catalogo.listTipoDireccion}
                                        editarDireccion={editarDireccion}
                                        eliminarDireccion={eliminarDireccion}
                                        listaDirecciones={perfilPj?.direcciones?.direccionNegocio}
                                        tipoDireccionEditar={'direccionNegocio'}
                                        listPaises={catalogo.listPaises}
                                    /> :
                                    <CardDirecciones
                                        listCiudades={catalogo.listCiudades}
                                        listDepartamentos={catalogo.listDepartamento}
                                        listTipoDireccion={catalogo.listTipoDireccion}
                                        editarDireccion={editarDireccion}
                                        eliminarDireccion={eliminarDireccion}
                                        listaDirecciones={perfilPj?.direcciones?.direccionSucursal}
                                        tipoDireccionEditar={'direccionSucursal'}
                                        listPaises={catalogo.listPaises}
                                    />
                            }
                            <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-300  mt-3 ">
                                <h3 className='font-bold'> {`Agregar Dirección de ${activarTab == 1 ? 'Negocio' : 'Sucursal'} `}</h3>
                                <div className=''>
                                    <div className='my-4' >
                                        <CheckInputRojo
                                            labelText={'Dirección Principal'}
                                            nameInput={'direccionPrincipalNegocio'}
                                            onChangeInput={onChangeInputDireccion}
                                            valorInput={formDireccion.direccionPrincipalNegocio}
                                        />
                                    </div>
                                    <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                                        <div >
                                            <CampoLista
                                                valorInput={formDireccion?.tipoDireccion}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="tipoDireccion"
                                                placeholder="Tipo de Dirección"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={listaDireccionFiltro}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                        <div >
                                            <CampoLista
                                                valorInput={formDireccion?.pais}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="pais"
                                                placeholder="País"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listPaises}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                        <div >
                                            <CampoLista
                                                valorInput={formDireccion?.departamento}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="departamento"
                                                placeholder="Departamento"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={lDepartamentos}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                        <div >
                                            <CampoLista
                                                valorInput={formDireccion?.ciudad}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="ciudad"
                                                placeholder="Ciudad"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={lCiudad}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                    </div>

                                    <h3 className='py-4 font-bold'>Vía Principal</h3>

                                    <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                                        <div >
                                            <CampoLista
                                                valorInput={formDireccion?.tipoViaPrincipal}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="tipoViaPrincipal"
                                                placeholder="Tipo Vía"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listTipoVia}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoNumero
                                                valorInput={formDireccion?.numeroViaPrincipal}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="numeroViaPrincipal"
                                                placeholder='Número'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '00',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoTexto

                                                valorInput={formDireccion?.nombreViaPrincipal}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="nombreViaPrincipal"
                                                placeholder="Nombre"

                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '000',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoLista
                                                valorInput={formDireccion?.letraViaPrincipal}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="letraViaPrincipal"
                                                placeholder="Letra"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listTipoLetraVia}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                    </div>
                                    <div className=''>
                                        <CampoLista
                                            valorInput={formDireccion?.sectoViarPrincipal}
                                            onChangeInput={onChangeInputDireccion}
                                            nameInput="sectoViarPrincipal"
                                            placeholder="Sector"
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '0023',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                validacionAdicional: false
                                            }))}
                                            lista={catalogo.listTipoSectorVia}
                                            idLista={'code'}
                                            descripcionList={'value'}
                                        />
                                    </div>

                                    <h3 className='py-4 font-bold'>Vía Secundaria</h3>

                                    <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                                        <div >
                                            <CampoLista
                                                valorInput={formDireccion?.tipoViaSecundaria}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="tipoViaSecundaria"
                                                placeholder="Tipo Vía"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listTipoVia}
                                                idLista={'code'}
                                                descripcionList={'value'}

                                            />
                                        </div>
                                        <div className=''>
                                            <CampoNumero
                                                valorInput={formDireccion?.numeroViaSecundaria}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="numeroViaSecundaria"
                                                placeholder='Número'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '00',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoTexto
                                                valorInput={formDireccion?.nombreViaSecundaria}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="nombreViaSecundaria"
                                                placeholder="Nombre"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '000',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoLista
                                                valorInput={formDireccion?.letraPrincipalViaSecundaria}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="letraPrincipalViaSecundaria"
                                                placeholder="Letra"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listTipoLetraVia}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoLista
                                                valorInput={formDireccion?.sectorViaSecundaria}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="sectorViaSecundaria"
                                                placeholder="Sector"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listTipoSectorVia}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoNumero
                                                valorInput={formDireccion?.numeroPredioViaSecundaria}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="numeroPredioViaSecundaria"
                                                placeholder='Número Predio'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '00',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        <div className='my-4' >
                                            <CheckInputRojo
                                                labelText={'Incluir Barrio'}
                                                nameInput={'barrio'}
                                                onChangeInput={onChangeInputDireccion}
                                                valorInput={formDireccion?.barrio}
                                            />
                                        </div>
                                    </div>
                                    {
                                        formDireccion.barrio != '' ?
                                            <div className=''>
                                                <CampoTexto
                                                    valorInput={formDireccion?.nombreBarrio}
                                                    onChangeInput={onChangeInputDireccion}
                                                    nameInput="nombreBarrio"
                                                    placeholder="Nombre del Barrio"

                                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                        id: '000',
                                                        listaCamposAdministracion: dataCamposAdministacion,
                                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                    }))}
                                                />
                                            </div>
                                            : undefined
                                    }

                                    <h3 className='py-4 font-bold'>Información Adicional</h3>

                                    <div className='grid grid-cols-3 gap-x-8 gap-y-4'>
                                        <div className=''>
                                            <CampoLista
                                                valorInput={formDireccion?.unidad}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="unidad"
                                                placeholder="Unidad"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listTipoEdificio}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoNumero
                                                valorInput={formDireccion?.numeroUnidad}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="numeroUnidad"
                                                placeholder="Número"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '000',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoLista
                                                valorInput={formDireccion?.letraUnidad}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="letraUnidad"
                                                placeholder="Letra"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listTipoLetraVia}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoTexto
                                                valorInput={formDireccion?.interiorDescripcion}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="interiorDescripcion"
                                                placeholder="Descripción"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '000',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoNumero
                                                valorInput={formDireccion?.numeroInterior}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="numeroInterior"
                                                placeholder="Número"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '000',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        <div className=''>
                                            <CampoLista
                                                valorInput={formDireccion?.letraInterior}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="letraInterior"
                                                placeholder="Letra"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '0023',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false
                                                }))}
                                                lista={catalogo.listTipoLetraVia}
                                                idLista={'code'}
                                                descripcionList={'value'}
                                            />
                                        </div>
                                    </div>
                                    <div className=''>
                                        <CampoTexto
                                            valorInput={formDireccion?.referenciaUbicacion}
                                            onChangeInput={onChangeInputDireccion}
                                            nameInput="referenciaUbicacion"
                                            placeholder="Referencias de Ubicación"
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '000',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button type='button' onClick={guardarDireccion} className='bg-coomeva_color-rojo rounded-sm text-white text-xs py-1 px-2 mx-2 my-4'> + Agregar Dirección</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="font-bold py-3 my-2">Residencia Fiscal</h3>
                    <hr className='my-2' />

                    <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                        <div>
                            <CheckNuevo
                                valorInput={perfilPj?.residenciaFiscal?.personaEstadosUnidos}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.personaEstadosUnidos"
                                titulo={'1.	¿Es su Entidad una Persona de EE.UU?'}
                            />
                        </div>
                        <div>
                            <CheckNuevo
                                titulo={'2.	¿Es la Entidad una Persona Especifica de EE.UU?'}
                                valorInput={perfilPj?.residenciaFiscal?.personaEspecificaEstadosUnidos}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.personaEspecificaEstadosUnidos"
                            />
                        </div>
                        <div className=''>
                            <CampoNumero
                                valorInput={perfilPj?.residenciaFiscal?.TIN}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.TIN"
                                placeholder='3. Indique su Número  TIN/EIN'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div className=' gap-x-4 items-center'>
                            <CheckInputRojo
                                labelText={'No TIN'}
                                valorInput={perfilPj?.residenciaFiscal?.noTIN}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.noTIN" />
                            {
                                perfilPj?.residenciaFiscal?.noTIN == 'on' ?
                                    <CampoTexto
                                        valorInput={perfilPj?.residenciaFiscal?.motivo}
                                        onChangeInput={onChangeInput}
                                        nameInput="residenciaFiscal.motivo"
                                        placeholder="Indique motivo"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '000',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                    : undefined
                            }
                        </div>
                        <div>
                            <CheckNuevo
                                titulo={'4.	Seleccione Una de las Siguientes Opciones Que se Listan a Continuación'}
                                subtitulo={''}
                                valorInput={perfilPj?.residenciaFiscal?.siguientesOpciones}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.siguientesOpciones"
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.residenciaFiscal?.clasificacionFATCA}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.clasificacionFATCA"
                                placeholder="5.	Seleccione una de las Opciones de la Clasificacion de Entidades Según FATCA"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listSeccionFatca}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div>
                            <CheckNuevo
                                titulo={'6.	La Entidad como Institución Financiera Tiene un Numero GIIN:'}
                                subtitulo={''}
                                valorInput={perfilPj?.residenciaFiscal?.GIIN}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.GIIN"
                            />
                        </div>
                        <div className=''>
                            <CampoNumero
                                valorInput={perfilPj?.residenciaFiscal?.numeroGIIN}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.numeroGIIN"
                                placeholder='Número GIIN'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div>
                            <CheckNuevo
                                titulo={'7.	¿Tiene residencia fiscal en algún país?'}
                                subtitulo={''}
                                valorInput={perfilPj?.residenciaFiscal?.tienePais}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.tienePais"
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.residenciaFiscal?.paisRecidenciaFiscal}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.paisRecidenciaFiscal"
                                placeholder="País de Residencia Fiscal"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listPaises}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.residenciaFiscal?.tipoIdentificacionTributaria}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.tipoIdentificacionTributaria"
                                placeholder="Tipo de Identificación Tributaria"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listTipoIdFiscal}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div className=''>
                            <CampoNumero
                                valorInput={perfilPj?.residenciaFiscal?.numeroIdentificacionTributaria}
                                onChangeInput={onChangeInput}
                                nameInput="residenciaFiscal.numeroIdentificacionTributaria"
                                placeholder='Número de Identificación Tributaria'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>

                    <h3 className="font-bold py-3 my-7">Referencia Personal</h3>
                    <hr className='my-2' />

                    <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.relacion}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.relacion"
                                placeholder="Relación"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listTipoParentesco}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div>
                            <CampoTexto
                                valorInput={perfilPj?.camposAdicionales?.nombreCompleto}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.nombreCompleto"
                                placeholder='Nombre completo'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div>
                            <CampoTexto
                                valorInput={perfilPj?.camposAdicionales?.primerApellido}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.primerApellido"
                                placeholder='Primer Apellido'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div>
                            <CampoTexto
                                valorInput={perfilPj?.camposAdicionales?.segundoApellido}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.segundoApellido"
                                placeholder='Segundo Apellido'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.tipoIdentificacionPersonal}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.tipoIdentificacionPersonal"
                                placeholder="Tipo identificación personal"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listTipoDocumento}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoNumero
                                valorInput={perfilPj?.camposAdicionales?.numeroIdentificacion}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.numeroIdentificacion"
                                placeholder='Numero identificación '
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.tipoContacto}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.tipoContacto"
                                placeholder="Tipo de contacto"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listTipoContacto}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.tipoTelefono}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.tipoTelefono"
                                placeholder="Tipo de telefono"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                }))}
                                lista={catalogo.listTipoTelefono}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.prefijo}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.prefijo"
                                placeholder="Prefijo"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                }))}
                                lista={catalogo.listPrefijos}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoTelefono
                                valorInput={perfilPj?.camposAdicionales?.telefono}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.telefono"
                                placeholder='Telefono'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div>
                            <CheckNuevo
                                valorInput={perfilPj?.camposAdicionales?.referenciaPep}
                                titulo={'¿Actualmente o en los 2 ultimos años a desempeñado un cargo publico PEP?'}
                                subtitulo={'.'}
                                nameInput={'camposAdicionales.referenciaPep'}
                                onChangeInput={onChangeInput}
                                deshabilitar={true}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.funcionPep}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.funcionPep"
                                placeholder="Función"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listFuncionPep}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.nombreInstitucion}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.nombreInstitucion"
                                placeholder="Nombre institución  "
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listDependenciaPep}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.cargoPep}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.cargoPep"
                                placeholder="Cargo "
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listCargosPep}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoFecha
                                valorInput={perfilPj?.camposAdicionales?.fechaInicio}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.fechaInicio"
                                placeholder='Fecha inicio '
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div className='mb-4' >
                            <CampoFecha
                                valorInput={perfilPj?.camposAdicionales?.fechaFin}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.fechaFin"
                                placeholder='Fecha fin '
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>

                    <h3 className="font-bold py-3 my-2">Campos Adicionales</h3>
                    <hr className='my-2' />

                    <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                        <div >
                            <CampoFecha
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0026',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={perfilPj?.camposAdicionales?.fechaIngresoAsociadoPj}
                                onChangeInput={onChangeInput}
                                placeholder="Fecha de Ingreso de Asociado PJ"
                                nameInput="camposAdicionales.fechaIngresoAsociadoPj"
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.tipoClientesPj}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.tipoClientesPj"
                                placeholder="Tipo de Clientes PJ"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listTipoCliente}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.sectorEconomico}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.sectorEconomico"
                                placeholder="Sector Económico"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listaSector}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.ciudadConstitucion}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.ciudadConstitucion"
                                placeholder="Ciudad de Constitución"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={perfilPj?.camposAdicionales?.ciudadConstitucion !== undefined
                                    ? catalogo?.listCiudades?.filter(ciudades => ciudades.code.startsWith(perfilPj?.camposAdicionales?.ciudadConstitucion))
                                    : lCiudadConstitucion
                                }
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div>
                            <CheckNuevo
                                valorInput={perfilPj?.camposAdicionales?.marcaCorrespondenciaUnica}
                                titulo={'Marcación de Correspondencia Única'}
                                subtitulo={'Marcar si se desea recibir toda la correspondencia en una sola dirección.'}
                                nameInput={'camposAdicionales.marcaCorrespondenciaUnica'}
                                onChangeInput={onChangeInput}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={perfilPj?.camposAdicionales?.fechaCorte}
                                onChangeInput={onChangeInput}
                                nameInput="camposAdicionales.fechaCorte"
                                placeholder="Fecha de Corte"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '0023',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: false
                                }))}
                                lista={catalogo.listFechaCorte}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                    </div>
                </div>
            </form>
            {
                agregarTelefono ?
                    <Modals w={48} fondoAzul={true} bg="bg-white" iconoAlert={false} ocultarLogo={true} ocultarBtnCancelar={true} ocultarBtnContinuar={true}>
                        <div className="w-full px-4 mb-6 rounded-md py-6   overflow-y-auto h-[67vh] ">
                            <div className="flex justify-between items-center ">
                                <div>
                                    <h1 className="font-bold  text-gray-600">Agregar Teléfono </h1>
                                    <p className="text-xs mb-3 text-gray-500">Complete los datos del teléfono de contacto.</p>
                                </div>
                                <div onClick={() => { cerrarModal(2) }} className="cursor-pointer">
                                    <h3 className="text-lg font-bold">x</h3>
                                </div>
                            </div>
                            <div className={`grid grid-cols-1 gap-x-8 gap-y-4 `}>
                                <div>
                                    <CampoLista
                                        valorInput={formTelefono.tipoTelefono}
                                        onChangeInput={onChangeInputTelefono}
                                        nameInput="tipoTelefono"
                                        placeholder="Tipo de Teléfono"
                                        validacionRequeridoEditable={
                                            (objectoValidarCampoAdministracion({
                                                id: '000',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                // validacionAdicional: true
                                            }))
                                        }
                                        lista={catalogo.listTipoTelefono}
                                        idLista="code"
                                        descripcionList="value"
                                    />
                                </div>
                            </div>
                            <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>
                                <div >
                                    <CampoLista
                                        valorInput={formTelefono.prefijo}
                                        onChangeInput={onChangeInputTelefono}
                                        nameInput="prefijo"
                                        placeholder='Prefijo'
                                        lista={catalogo.listPrefijos}
                                        idLista='code'
                                        descripcionList='value'
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '0098',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div >
                                    <CampoTelefono
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '0019',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formTelefono.numero}
                                        onChangeInput={onChangeInputTelefono}
                                        nameInput="numero"
                                        placeholder="Número"
                                    />
                                </div>
                            </div>
                            <div className={`grid grid-cols-1 gap-x-8 gap-y-4 `}>
                                <CampoLista
                                    valorInput={formTelefono?.tipoContacto}
                                    onChangeInput={onChangeInputTelefono}
                                    nameInput="tipoContacto"
                                    placeholder="Tipo de Contacto"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '0023',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={listaTelefonosFiltro}
                                    idLista="code"
                                    descripcionList="value"
                                />
                                <CampoLista
                                    valorInput={formTelefono?.operadora}
                                    onChangeInput={onChangeInputTelefono}
                                    nameInput="operadora"
                                    placeholder="Operadora"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '0023',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listTipoOperador}
                                    idLista="code"
                                    descripcionList="value"
                                />
                                <CampoLista
                                    valorInput={formTelefono?.tipoContrato}
                                    onChangeInput={onChangeInputTelefono}
                                    nameInput="tipoContrato"
                                    placeholder="Tipo de Contrato"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '0023',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listTipoContrato}
                                    idLista="code"
                                    descripcionList="value"
                                />
                                <CampoLista
                                    valorInput={formTelefono?.mensajeria}
                                    onChangeInput={onChangeInputTelefono}
                                    nameInput="mensajeria"
                                    placeholder="Mensajería"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '0023',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listTipoMensajeria}
                                    idLista="code"
                                    descripcionList="value"
                                />
                                <div>
                                    <CheckNuevo
                                        titulo={'Marcar como teléfono principal'}
                                        nameInput={'principal'}
                                        valorInput={formTelefono.principal}
                                        onChangeInput={onChangeInputTelefono}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-end w-full">
                            <div className="space-x-3 gap-x-6 ">
                                <button type='buttom' onClick={() => { cerrarModal(2) }} className="py-2 px-8 bg-[#979797ff] rounded-lg  text-white text-xs mx-3">Cancelar</button>
                                {/* <button onClick={guardarTelefono} id="modal" className={`py-2 px-8 bg-coomeva_color-rojo  rounded-lg mx-auto text-white text-xs`}>Guardar tefono</button> */}
                                <button type='buttom' onClick={(formTelefono.modoEdicion != true) ? guardarTelefono : guardarTelefonoEdicion} id="modal" className={`py-2 px-8 bg-coomeva_color-rojo  rounded-lg mx-auto text-white text-xs`}>Agregar</button>
                            </div>
                        </div>
                    </Modals>
                    : undefined
            }
            <ButtomValidarCcNit contextRadClient={contextRadClient} ruta={'/radicacionCliente/radicacionPj/representanteLegalPj'} />
            {
                showLoading && <Loading />
            }
            {
                (mostrarModal)
                &&
                <DynamicModal titulo={'Notificación'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModalNit}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
                </DynamicModal>
            }
        </div>
    )
};