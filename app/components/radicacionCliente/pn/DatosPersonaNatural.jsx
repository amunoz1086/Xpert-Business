'use client';

import React, { useEffect, useState } from "react";
import { loadDraft, saveDraft } from "@/app/lib/utils/draft";
import { CampoLista } from "../../share/CampoLista";
import { CampoTexto } from "../../share/CampoTexto";
import { CampoFecha } from "../../share/CampoFecha";
import { CampoNumeroParseoMil } from "../../share/CampoNumeroParseoMil";
import { CampoCorreo } from "../../share/CampoCorreo";
import { objectoValidarCampoAdministracion } from "@/app/lib/utils";
import { usePerfil } from "@/app/hooks/usePerfil";
import { SeccionFondo } from "../../share/SeccionFondoRadicacion";
import { CheckNuevo } from "../../share/CheckNuevo";
import Modals from "../../share/Modals";
import { BiTrash } from "react-icons/bi";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { fn_catalogosParticipantes } from '@/app/lib/apisClientePn/fn_catalogosParticipantes';


export const DatosPersonaNatural = ({ contextRadClient, dataCamposAdministacion }) => {

    const { perfilPn, actualizarPerfilPn, clienteNuevoProspectoActualizar } = contextRadClient();
    const DRAFT_KEY = 'perfilPn';
    const [catalogo, setCatalogo] = useState({});
    

    //INICIALIZANDO CATALOGOS
    useEffect(() => {

        if (Object.keys(catalogo).length === 0) {
            try {
                const timeoutCatalogo = setTimeout(async () => {
                    const cat = JSON.parse(await fn_catalogosParticipantes());
                    setCatalogo(cat);
                }, 100);

                return () => clearTimeout(timeoutCatalogo);

            } catch (error) {
                console.log(error);
            };
        }

    }, []);


    // 1) Al montar carga draft
    useEffect(() => {
        const draft = loadDraft(DRAFT_KEY);
        if (draft && Array.isArray(draft)) {
            actualizarPerfilPn(draft);
        }
        return () => {
            // si quieres limpiar al salir, descomenta:
            // clearDraft(DRAFT_KEY);
        }
    }, []);

    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        saveDraft(DRAFT_KEY, perfilPn);
    }, [perfilPn]);

    const [tieneTutor, setTieneTutor] = useState(false)

    const [esPEP, setEsPEP] = useState(false)

    const [activarBarrio, setActivarBarrio] = useState(false)

    const [activarUnidad, setActivarUnidad] = useState(false)

    const [activarInterior, setActivarInterior] = useState(false)

    const [agregarDireccion, setAgregarDireccion] = useState(false)

    const [agregarTelefono, setAgregarTelefono] = useState(false)

    const [formTelefono, setformTelefono] = useState({
        tipoTelefono: '',
        tipoContacto: '',
        prefijo: '',
        numero: '',
        mensajeria: '',
        marcaPrincipal: '',
        operadora: '',
        tipoContrato: '',

    })

    const [formDireccion, setformDireccion] = useState({
        tipoDireccion: '',
        direccionPrincipal: '',
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




    const { inputDocument } = usePerfil()

    // let deshabilitar = clienteNuevoProspectoActualizar != '1' && clienteNuevoProspectoActualizar != '2' && clienteNuevoProspectoActualizar != '3'

    // const onChangeInput = (e) => {



    //     const { name, value } = e.target


    //     if (name == 'tutor') {
    //         setTieneTutor(!tieneTutor)
    //     }
    //     if (name == 'esPEP') {
    //         setEsPEP(!esPEP)
    //     }

    //     if (name == 'barrio') {
    //         setActivarBarrio(!activarBarrio)
    //     }

    //     if (name == 'unidad') {
    //         setActivarUnidad(!activarUnidad)
    //     }

    //     if (name == 'interior') {
    //         setActivarInterior(!activarInterior)
    //     }


    //     const updatedPerfilPn = { ...perfilPn, [name == 'extranjero' || name == 'nacional' ? 'relacionDependencia' : name]: name == 'extranjero' || name == 'nacional' ? name : value };

    //     actualizarPerfilPn(updatedPerfilPn)

    // }


    const onChangeInput = (e) => {

        const { name, type, checked, value } = e.target;

        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;

        const keys = name.split(".");

        if (keys[1] == 'tieneTutor') {
            setTieneTutor(!tieneTutor)
        }
        if (keys[1] == 'esPEP') {
            setEsPEP(!esPEP)
        }

        if (keys[1] == 'barrio') {
            setActivarBarrio(!activarBarrio)
        }

        if (keys[1] == 'unidad') {
            setActivarUnidad(!activarUnidad)
        }

        if (keys[1] == 'interior') {
            setActivarInterior(!activarInterior)
        }


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

        const updatedPerfilPn = updateNestedObject(perfilPn, keys, inputValue);

        actualizarPerfilPn(updatedPerfilPn);


    }


    const onChangeInputTelefono = (e) => {

        const { name, value } = e.target

        setformTelefono({
            ...formTelefono,
            [name]: value

        })


    }
    const onChangeInputDireccion = (e) => {

        const { name, value } = e.target

        setformDireccion({
            ...formDireccion,
            [name]: value

        })


    }

    const guardarTelefono = (e) => {



        formTelefono['id'] = Date.now()


        const updatedPerfilPn = {
            ...perfilPn,
            ['contactoTelefonico']: [...perfilPn['contactoTelefonico'], { ...formTelefono }],
        };


        actualizarPerfilPn(updatedPerfilPn);

        cerrarModal(2)
    }

    const guardarTelefonoEdicion = () => {

        alert('dafdlsa')

        const nuevosTelefonos = perfilPn.contactoTelefonico.map(tel =>
            tel.id === formTelefono.id ? { ...formTelefono } : tel
        );


        actualizarPerfilPn({
            ...perfilPn,
            contactoTelefonico: nuevosTelefonos
        });

        cerrarModal(2)
    }


    const guardarDireccion = () => {

        formDireccion['id'] = Date.now()

        const updatedPerfilPn = {
            ...perfilPn,
            ['direcciones']: [...perfilPn['direcciones'], { ...formDireccion },],
        };


        actualizarPerfilPn(updatedPerfilPn);

        cerrarModal(1)

    }

    const guardarDireccionesEdicion = () => {

        const nuevasDirecciones = perfilPn.direcciones.map(dir =>
            dir.id === formDireccion.id ? { ...formDireccion } : dir
        );


        actualizarPerfilPn({
            ...perfilPn,
            direcciones: nuevasDirecciones
        });

        cerrarModal(1)
    }

    const eliminarDireccion = (id) => {



        const perfilActualizado = {
            ...perfilPn,
            direcciones: perfilPn.direcciones.filter(e => e.id !== id)
        };


        actualizarPerfilPn(perfilActualizado);



    }

    const eliminarTelefono = (id) => {



        const perfilActualizado = {
            ...perfilPn,
            contactoTelefonico: perfilPn.contactoTelefonico.filter(e => e.id !== id)
        };


        actualizarPerfilPn(perfilActualizado);

    }

    const editarTelefono = (id) => {


        const telefono = perfilPn.contactoTelefonico.find(e => e.id == id)

        telefono['modoEdicion'] = true

        setformTelefono(
            { ...telefono }

        );

        abrirModal(2)

    }

    const editarDireccion = (id) => {


        const direccion = perfilPn.direcciones.find(e => e.id == id)



        direccion['modoEdicion'] = true



        setformDireccion(
            { ...direccion }

        );

        abrirModal(1)

    }

    const resetTelefono = (id) => {


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

    }

    const resetDirecciones = (id) => {


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

    }




    const cerrarModal = (op) => {

        resetTelefono()
        resetDirecciones()

        const abrirModalSeleccionado = {
            1: () => setAgregarDireccion(false),
            2: () => setAgregarTelefono(false),

        }

        abrirModalSeleccionado[op]()
    }

    const abrirModal = (op) => {



        const abrirModalSeleccionado = {
            1: () => { setAgregarDireccion(true) },
            2: () => setAgregarTelefono(true),

        }

        abrirModalSeleccionado[op]()
    }


    return (
        <div className="datosPersonaNatural p-6 container mx-auto">
            <SeccionFondo nCol={2} titulo={'Encabezado'}>

                <div >
                    <CampoFecha
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        valorInput={perfilPn?.datosBasicos?.reference?.fechaVinculacion}
                        onChangeInput={onChangeInput}
                        placeholder="Fecha de vinculación"
                        nameInput="reference.fechaVinculacion"

                    />
                </div>
                <div >
                    <CampoTexto
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        valorInput={perfilPn?.datosBasicos?.reference?.codigoCliente}
                        onChangeInput={onChangeInput}
                        nameInput="reference.codigoCliente"
                        placeholder="Código del cliente "

                    />
                </div>


            </SeccionFondo>



            <form id="datosPersonaNaturalPn" className="">

                <SeccionFondo titulo={'Información General'}>

                    <div >
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.oficial}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.oficial"
                            placeholder=" Oficial"

                        />
                    </div>

                    <div >

                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '100',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.primerNombre}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.primerNombre"
                            placeholder="Primer Nombre"

                        />
                    </div>

                    <div >
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.segundoNombre}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.segundoNombre"
                            placeholder="Segundo Nombre"

                        />
                    </div>

                    <div >

                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.primerApellido}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.primerApellido"
                            placeholder="Primer Apellido"

                        />
                    </div>

                    <div >

                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.segundoApellido}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.segundoApellido"
                            placeholder="Segundo Apellido"

                        />
                    </div>
                    <div >
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.tipoIdentificacion}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.tipoIdentificacion"
                            placeholder="Tipo de identificación"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '100',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                // validacionAdicional: true
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
                                // validacionAdicional: true
                            }))}
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.numeroIdentificacion}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.numeroIdentificacion"
                            placeholder="Número de Identificación"

                        />

                    </div>

                    <div >
                        <div className="">
                            <CampoFecha
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={perfilPn?.datosBasicos?.informacionGenerales?.fechaExpedicionDocumento}
                                onChangeInput={onChangeInput}
                                placeholder="Fecha de expedición documento"
                                nameInput="informacionGenerales.fechaExpedicionDocumento"

                            />
                        </div>
                    </div>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.paisNacimiento}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.paisNacimiento"
                            placeholder=" Pais de Nacimiento"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listPaises}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.provinciaNacimiento}
                            placeholder="Departameto de Expedición"
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.provinciaNacimiento"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listDepartemento}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.ciudadNacimiento}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.ciudadNacimiento"
                            placeholder=" Ciudad de Nacimiento"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listCiduades}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div className="">
                        <CampoFecha
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.fechaNacimiento}
                            onChangeInput={onChangeInput}
                            placeholder="Fecha de Nacimiento"
                            nameInput="informacionGenerales.fechaNacimiento"

                        />
                    </div>

                    <div >
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.sexo}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.sexo"
                            placeholder="Sexo"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listSexo}
                            idLista="code"
                            descripcionList="value"

                        />
                    </div>

                    <div >
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.genero}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.genero"
                            placeholder="Género"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listSexo}
                            idLista="code"
                            descripcionList="value"

                        />
                    </div>

                    <div>

                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.estadoCivil}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.estadoCivil"
                            placeholder=" Estado Civil"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listEstadoCivil}
                            idLista="code"
                            descripcionList="value"

                        />
                    </div>

                    <div >
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.oficina}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.oficina"
                            placeholder="Oficina"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listOficina}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>

                    <div>
                        <CheckNuevo
                            titulo={'¿Tiene un tutor?'}
                            subtitulo={'Marque si el cliente tiene un tutor legal.'}
                            id={'tutor'}
                            // name={'informacionGenerales.tieneTutor'}
                            // onChangeInput={onChangeInput}
                            // valorInput={perfilPn?.informacionGenerales?.tieneTutor}

                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.tieneTutor}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.tieneTutor"
                        />
                    </div>
                    {
                        tieneTutor ?
                            <CampoTexto
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={perfilPn?.datosBasicos?.informacionGenerales?.nombreTutor}
                                onChangeInput={onChangeInput}
                                nameInput="informacionGenerales.nombreTutor"
                                placeholder="Nombre del tutor"

                            />
                            : undefined
                    }

                    <div >
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.referidoPor}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.referidoPor"
                            placeholder="Referido por"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={[{ code: 1, value: 'Sin catalogo' }]}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>

                    <div >
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.informacionGenerales?.comoSeEntero}
                            onChangeInput={onChangeInput}
                            nameInput="informacionGenerales.comoSeEntero"
                            placeholder="¿Cómo se enteró?"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            // lista={listConoceIf}
                            lista={[{ code: 1, value: 'Sin catalogo' }]}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>


                </SeccionFondo>

                <SeccionFondo titulo={'Datos Demográficos'}>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.datosDemograficos?.primeraNacionalidad}
                            onChangeInput={onChangeInput}
                            nameInput="datosDemograficos.primeraNacionalidad"
                            placeholder="Primera nacionalidad "
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listPaises}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>

                    <div>
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.datosDemograficos?.segundaNacionalidad}
                            onChangeInput={onChangeInput}
                            nameInput="datosDemograficos.segundaNacionalidad"
                            placeholder="Segunda nacionalidad"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listPaises}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.datosDemograficos?.terceraNacionalidad}
                            onChangeInput={onChangeInput}
                            nameInput="datosDemograficos.terceraNacionalidad"
                            placeholder="Tercera nacionalidad"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listPaises}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>

                    <div>
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn?.datosBasicos?.datosDemograficos?.profesionOficio}
                            onChangeInput={onChangeInput}
                            nameInput="datosDemograficos.profesionOficio"
                            placeholder="Profesión u oficio"

                        />
                    </div>

                    <div>

                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.datosDemograficos?.nivelAcademico}
                            onChangeInput={onChangeInput}
                            nameInput="datosDemograficos.nivelAcademico"
                            placeholder="Nivel académico"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listNivelEstudio}
                            idLista="code"
                            descripcionList="value"

                        />

                    </div>

                    <div>

                        <CampoLista
                            valorInput={perfilPn?.datosBasicos?.datosDemograficos?.ocupacion}
                            onChangeInput={onChangeInput}
                            nameInput="datosDemograficos.ocupacion"
                            placeholder="Ocupación"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listTipoOcupacion}
                            idLista="code"
                            descripcionList="value"

                        />

                    </div>

                    <div>

                        <CampoNumeroParseoMil
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn?.datosBasicos?.datosDemograficos?.dependientesEconomicos}
                            onChangeInput={onChangeInput}
                            nameInput="datosDemograficos.dependientesEconomicos"
                            placeholder="Dependientes económicos"

                        />
                    </div>

                    <div>

                        <CheckNuevo
                            titulo={'¿Es PEP?'}
                            nameInput={'datosDemograficos.esPEP'}
                            id={'esPEP'}
                            subtitulo={'Persona Expuesta Políticamente'}
                            onChangeInput={onChangeInput}
                            valorInput={perfilPn?.datosBasicos?.datosDemograficos?.esPEP}
                        />

                    </div>

                    {
                        esPEP ?
                            <div>
                                <CampoLista
                                    valorInput={perfilPn?.datosBasicos?.datosDemograficos?.tipoPEP}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosDemograficos.tipoPEP"
                                    placeholder="Tipo PEP"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '00',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listTipoPEP}
                                    idLista="code"
                                    descripcionList="value"

                                />
                            </div>
                            : undefined
                    }

                </SeccionFondo>


                <SeccionFondo nCol={1} titulo={'Direcciones'} textButtom="Agregar dirección" onClickButtom={() => { abrirModal(1) }}>

                    <div className="border border-gray-200 h-48 rounded-md flex gap-x-3 p-4 justify-start overflow-x-auto items-center">
                        {
                            perfilPn?.datosBasicos?.direcciones?.length > 0 ?

                                perfilPn?.datosBasicos?.direcciones.map((item, i) => (
                                    <div key={i} className={` bg-white border border-gray-200 shadow-sm  rounded-md p-3 flex-shrink-0 w-[30rem]`}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-x-2">
                                                <p className="font-bold">Dirección de negocio</p>
                                                <p className="rounded-full bg-black text-white text-xs py-1 px-2">Principal</p>
                                            </div>
                                            <div className="flex items-center gap-x-2">

                                                <button type="button" onClick={() => { editarDireccion(item.id) }} className=" font-bold">Editar</button>
                                                <BiTrash onClick={() => { eliminarDireccion(item.id) }} className="text-coomeva_color-rojo w-5 h-5 cursor-pointer" />
                                            </div>
                                        </div>
                                        <p className="my-2 text-xs text-gray-500"></p>
                                        <p className="my-2 "></p>
                                    </div>
                                ))

                                : <h3 className="w-full text-center">{`No hay direcciones registradas

                                Haga clic en "Agregar dirección" para registrar una nueva`}</h3>
                        }
                    </div>
                </SeccionFondo>
                <SeccionFondo nCol={1} titulo={'Información de Contacto Telefónico'} subtitulo={'Teléfonos de Contacto'} textButtom="Agregar teléfono" onClickButtom={() => { abrirModal(2) }}>
                    <div className="border border-gray-200 h-36 rounded-md flex gap-x-3 p-4 justify-start overflow-x-auto items-center">
                        {
                            perfilPn?.datosBasicos?.contactoTelefonico?.length > 0 ?
                                perfilPn?.datosBasicos?.contactoTelefonico.map((item, i) => (
                                    <div key={i} className={` bg-white border border-gray-200 shadow-sm  rounded-md p-3 flex-shrink-0 w-[30rem]`}>
                                        <div className=" ">
                                            <div className="flex justify-between items-center gap-x-2">
                                                <div className="flex gap-x-2">
                                                    <PhoneIcon className="w-5 h-5 " />
                                                    <p className="font-bold">Telefono de negocio</p>
                                                </div>
                                                <div className="">
                                                    <p className="rounded-full bg-black text-white text-xs py-1 px-2">Principal</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="my-2 text-xs text-gray-500"></p>
                                        <p className="my-2 "></p>

                                        <div className="flex justify-between items-center gap-x-2">
                                            <button type="button" onClick={() => { editarTelefono(item.id) }} className=" font-bold">Editar</button>
                                            <BiTrash onClick={() => { eliminarTelefono(item.id) }} className="text-coomeva_color-rojo w-5 h-5 cursor-pointer" />
                                        </div>
                                    </div>

                                    // <CardDetalleItem key={i} icono={true} >
                                    //     <div className=''>
                                    //         <p className='text-slate-500 text-xs'>Movil</p>

                                    //         <p className='text-slate-500 '>+23 3424324435</p>
                                    //     </div>

                                    //     <div className='mt-4 flex justify-between'>
                                    //         <button>Editar</button>

                                    //         <p className='text-coomeva_color-rojo'>Eliminar</p>

                                    //     </div>

                                    // </CardDetalleItem>

                                ))

                                : <h3 className="text-center w-full">No hay teléfonos registrados</h3>
                        }
                    </div>
                </SeccionFondo>
                <SeccionFondo nCol={1} titulo={'Información de Correo Electrónico'} subtitulo={'Correos Electrónicos'} descripcion={'Puede registrar hasta dos correos electrónicos. Marque uno como preferente para comunicaciones.'}>
                    <div className="bg-white border border-gray-200 rounded-md py-4 px-4 shadow-sm">
                        <h3 className="my-3">Email 1</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div >
                                <CampoCorreo
                                    valorInput={perfilPn?.datosBasicos?.correosElectronicos[0]?.correoElectronico}
                                    onChangeInput={onChangeInput}
                                    placeholder="Correo Electrónico"
                                    nameInput="correoElectronico1"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '00',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />
                            </div>
                            <div>
                                <div>
                                    <CampoLista
                                        valorInput={perfilPn?.datosBasicos?.correosElectronicos[0]?.tipoCorreo}
                                        onChangeInput={onChangeInput}
                                        nameInput="tipo1"
                                        placeholder="Tipo"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listTipoDireccionVirtual}
                                        idLista="code"
                                        descripcionList="value"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Uso preferente para comunicaciones</label>
                        </div>
                        <hr className="my-2" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-md py-4 px-4 shadow-sm">
                        <h3 className="my-3">Email 2</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div >
                                <CampoCorreo
                                    valorInput={perfilPn?.datosBasicos?.correosElectronicos[1]?.correoElectronico}
                                    onChangeInput={onChangeInput}
                                    placeholder="Correo Electrónico"
                                    nameInput="correoElectronico2"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '00',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />
                            </div>
                            <div>
                                <div>
                                    <CampoLista
                                        valorInput={perfilPn?.datosBasicos?.correosElectronicos[1]?.tipoCorreo}
                                        onChangeInput={onChangeInput}
                                        nameInput="tipo2"
                                        placeholder="Tipo"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listTipoDireccionVirtual}
                                        idLista="code"
                                        descripcionList="value"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Uso preferente para comunicaciones</label>
                        </div>
                        <hr className="my-2" />
                    </div>
                </SeccionFondo>
                <SeccionFondo titulo={'Conozca su Cliente'} >
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.conozcaSuCliente?.tieneDiscapacidad}
                            onChangeInput={onChangeInput}
                            nameInput="conozcaSuCliente.tieneDiscapacidad"
                            placeholder="Tipo de discapacidad"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listDiscapacidad}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.conozcaSuCliente?.origenIngresos}
                            onChangeInput={onChangeInput}
                            nameInput="conozcaSuCliente.origenIngresos"
                            placeholder="Origen de ingresos"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listPrincipalIngreso}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.conozcaSuCliente?.montoIngresosMensual}
                            onChangeInput={onChangeInput}
                            nameInput="conozcaSuCliente.montoIngresosMensual"
                            placeholder="Monto ingresos mensual"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={[{ code: 1, value: 'Sin catalogo' }]}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.conozcaSuCliente?.actividadEconomica}
                            onChangeInput={onChangeInput}
                            nameInput="conozcaSuCliente.actividadEconomica"
                            placeholder="Actividad económica"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listActividadEconomica}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                </SeccionFondo>

                {/* <div>
                    <CampoLista
                        valorInput={perfilPn.paisExpedicion}
                        onChangeInput={onChangeInput}
                        nameInput="paisExpedicion"
                        placeholder="Pais de expedición"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={listPaises}
                        idLista="codPais"
                        descripcionList="descripcion"
                    />
                </div>
                <div>
                    <CampoLista
                        valorInput={perfilPn.lugarExpedicion}
                        onChangeInput={onChangeInput}
                        nameInput="lugarExpedicion"
                        placeholder="Lugar de expedición"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={listCiduades}
                        idLista="codCiudad"
                        descripcionList="descripcion"
                    />
                </div>
                <div>
                    <CampoLista
                        valorInput={perfilPn.ciudadExpedicion}
                        onChangeInput={onChangeInput}
                        nameInput="ciudadExpedicion"
                        placeholder="Ciudad de Expedición"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={listCiduades}
                        idLista="codCiudad"
                        descripcionList="descripcion"
                    />
                </div>
                <div>
                    <CampoLista
                        valorInput={perfilPn.departamentoNacimiento}
                        onChangeInput={onChangeInput}
                        nameInput="departamentoNacimiento"
                        placeholder="Departamento de Nacimiento"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={listDepartamentos}
                        idLista="codDepto"
                        descripcionList="descripcion"
                    />
                </div>
                <div className="grid grid-cols-5 gap-x-4 col-span-4">
                    <div>
                        <div className="">
                            <CampoLista
                                valorInput={perfilPn.codDireccion}
                                onChangeInput={onChangeInput}
                                nameInput="codDireccion"
                                placeholder="Direccion"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '00',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={listDirecciones}
                                idLista="codListDirecc"
                                descripcionList="descripcion"
                            />
                        </div>
                    </div>
                    <div>
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn.viaPrincipal}
                            onChangeInput={onChangeInput}
                            nameInput="viaPrincipal"
                            placeholder="Via Principal"
                        />
                    </div>
                    <div>
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn.viaSecundaria}
                            onChangeInput={onChangeInput}
                            nameInput="viaSecundaria"
                            placeholder="Via Secundaria"
                        />
                    </div>
                    <div>
                        <CampoNumeroParseoMil
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn.numeroInmueble}
                            onChangeInput={onChangeInput}
                            nameInput="numeroInmueble"
                            placeholder="Numero"
                        />
                    </div>
                    <div >
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn.referenciaUbicacion}
                            onChangeInput={onChangeInput}
                            nameInput="referenciaUbicacion"
                            placeholder=" Referencia Ubicacion"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-x-4 col-span-4">
                    <div>
                        <CampoTelefono
                            valorInput={perfilPn.telefono}
                            onChangeInput={onChangeInput}
                            placeholder="Telefono"
                            nameInput="telefono"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-x-4 col-span-4">
                    <div>
                        <CampoLista
                            valorInput={perfilPn.tieneDiscapacidad}
                            onChangeInput={onChangeInput}
                            nameInput="tieneDiscapacidad"
                            placeholder="Tiene alguna Discapacidad"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={listSiNo}
                            idLista="codLista"
                            descripcionList="descripcion"
                        />
                    </div>
                    <div className="col-span-2">
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn.tipoDiscapacidad}
                            onChangeInput={onChangeInput}
                            nameInput="tipoDiscapacidad"
                            placeholder="Tipo de Discapacidad"
                            estado={(perfilPn.tieneDiscapacidad != '1')}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-x-4 col-span-4">
                    <CampoTexto
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        valorInput={perfilPn.oficina}
                        onChangeInput={onChangeInput}
                        nameInput="oficina"
                        placeholder=" Oficina"
                    />
                    <div className="col-span-2">

                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={perfilPn.oficialOficina}
                            onChangeInput={onChangeInput}
                            nameInput="oficialOficina"
                            placeholder="Oficial de Oficina"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 col-span-4">
                    <CampoLista
                        valorInput={perfilPn.desempeñoCargoPEP}
                        onChangeInput={onChangeInput}
                        nameInput="desempeñoCargoPEP"
                        placeholder="Actualmente o en los 2 ultimos años han desempeñado un cargo publico PEP"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={listSiNo}
                        idLista="codLista"
                        descripcionList="descripcion"
                    />
                </div>
                <div className="grid grid-cols-5 gap-x-4 items-center col-span-4">
                    <div className="">
                        <p> *Si la respuesta es afirmativa se requiere lo siguiente</p>
                    </div>
                    <div className="col-span-2">
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                validacionAdicional: perfilPn.desempeñoCargoPEP != '1'
                            }))}
                            valorInput={perfilPn.tipoPEP}
                            onChangeInput={onChangeInput}
                            nameInput="tipoPEP"
                            placeholder="-Informacon Adicional (Tipo PEP)"
                        />
                    </div>
                    <div className=" col-span-2">
                        <CampoLista
                            placeholder="¿Pertenece o hace parte de algun grupo etnico?"
                            valorInput={perfilPn.perteneceGrupoEtnico}
                            onChangeInput={onChangeInput}
                            nameInput="perteneceGrupoEtnico"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                validacionAdicional: perfilPn.desempeñoCargoPEP != '1'
                            }))}
                            className="p-2 -mt-1"
                            lista={listSiNo}
                            idLista="codLista"
                            descripcionList="descripcion"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 col-span-4">
                    <div className="col-span-2">
                        <CampoLista
                            placeholder="-¿Desempeña o ha desempeño un cargo Politico/Publico nacional o extrangero o representa legalmente alguna
                            organizacion internacional o tiene algun vinculo familiar o de negocio con un PEP?"
                            valorInput={perfilPn.desempeñaDesempeño}
                            onChangeInput={onChangeInput}
                            nameInput="desempeñaDesempeño"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                validacionAdicional: perfilPn.desempeñoCargoPEP != '1'
                            }))}
                            lista={listSiNo}
                            idLista="codLista"
                            descripcionList="descripcion"

                        />
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-x-4 col-span-4">

                    <div>

                    </div>
                    <div className="col-span-2">

                        <p>Relacion de Dependencia</p>
                        <div className="flex space-x-20 mt-2 gap-x-8 pt-3" >
                            <div className="inline-flex items-center cursor-pointer">
                                <CheckInput
                                    id={'nacional'}
                                    checked={perfilPn.relacionDependencia == 'nacional'}
                                    onChangeInput={onChangeInput}
                                    enable={(perfilPn.desempeñaDesempeño != '1')}
                                    labelText={"Nacional"}

                                />
                            </div>
                            <div className="inline-flex items-center cursor-pointer ml-4">
                                <CheckInput
                                    id={'extranjero'}
                                    checked={perfilPn.relacionDependencia == 'extranjero'}
                                    onChangeInput={onChangeInput}
                                    enable={(perfilPn.desempeñaDesempeño != '1')}
                                    labelText={"Extranjero"}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="col-span-2">
                        <CampoTexto
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '00',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                validacionAdicional: perfilPn.desempeñaDesempeño != '1'
                            }))}
                            valorInput={perfilPn.rol}
                            onChangeInput={onChangeInput}
                            nameInput="rol"
                            placeholder="Rol"

                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 col-span-4">
                    <CampoFecha
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        valorInput={perfilPn.fechaIngreso}
                        onChangeInput={onChangeInput}
                        placeholder="Fecha de Ingreso"
                        nameInput="fechaIngreso"
                        estado={(perfilPn.desempeñoCargoPEP != '1')}
                    />
                    <CampoFecha
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '00',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        valorInput={perfilPn.fechaSalida}
                        onChangeInput={onChangeInput}
                        placeholder="Fecha de Salida"
                        nameInput="fechaSalida"
                        estado={(perfilPn.desempeñoCargoPEP != '1')}
                    />
                </div> */}
            </form>
            {
                agregarDireccion ?
                    <Modals w={60} fondoAzul={true} bg="bg-white" iconoAlert={false} ocultarLogo={true} ocultarBtnCancelar={true} ocultarBtnContinuar={true}>
                        <div className="w-full px-4 mb-6 rounded-md py-6   overflow-y-auto h-[70vh] ">
                            <div className="flex justify-between items-center ">
                                <div>
                                    <h1 className="font-bold  text-gray-600">Agregar dirección </h1>
                                    <p className="text-xs mb-3 text-gray-500">Complete la información de la dirección a continuación</p>
                                </div>
                                <div onClick={() => { cerrarModal(1) }} className="cursor-pointer">
                                    <h3 className="text-lg font-bold">x</h3>
                                </div>
                            </div>
                            <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                                <div>
                                    <CampoLista
                                        valorInput={formDireccion.tipoDireccion}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="tipoDireccion"
                                        placeholder="Tipo de dirección"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listTipoDireccion}
                                        idLista="code"
                                        descripcionList="value"
                                    />
                                </div>
                                <div>
                                    <CheckNuevo
                                        titulo={'Dirección principal'}
                                        subtitulo={'Marque si esta es su dirección principal'}
                                        nameInput={'direccionPrincipal'}
                                        valorInput={formDireccion.direccionPrincipal}
                                    />
                                </div>
                                <div>
                                    <CampoLista
                                        valorInput={formDireccion.pais}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="pais"
                                        placeholder="País"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listPaises}
                                        idLista="code"
                                        descripcionList="value"
                                    />
                                </div>
                                <div>
                                    <CampoLista
                                        valorInput={formDireccion.departamento}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="departamento"
                                        placeholder="Departamento"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listDepartemento}
                                        idLista="code"
                                        descripcionList="value"
                                    />
                                </div>
                                <div>
                                    <CampoLista
                                        valorInput={formDireccion.ciudad}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="ciudad"
                                        placeholder="Ciudad"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listCiduades}
                                        idLista="code"
                                        descripcionList="value"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.tipoViaPrincipal}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="tipoViaPrincipal"
                                        placeholder="Vía principal"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.numeroViaPrincipal}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="numeroViaPrincipal"
                                        placeholder="Número vía principal"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.nombreViaPrincipal}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="nombreViaPrincipal"
                                        placeholder="Nombre vía principal"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.letraViaPrincipal}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="letraViaPrincipal"
                                        placeholder="Letra vía principal"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.sectoViarPrincipal}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="sectoViarPrincipal"
                                        placeholder="Sector vía principal"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.tipoViaSecundaria}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="tipoViaSecundaria"
                                        placeholder="Vía secundaria"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.numeroViaSecundaria}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="numeroViaSecundaria"
                                        placeholder="Número vía secundaria"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.nombreViaSecundaria}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="nombreViaSecundaria"
                                        placeholder="Nombre vía secundaria"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.letraPrincipalViaSecundaria}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="letraPrincipalViaSecundaria"
                                        placeholder="Letra vía secundaria"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.sectorViaSecundaria}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="sectorViaSecundaria"
                                        placeholder="Sector vía secundaria"
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.numeroPredioViaSecundaria}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="numeroPredioViaSecundaria"
                                        placeholder="Número predio vía secundaria"
                                    />
                                </div>
                                <div>
                                    <CheckNuevo
                                        titulo={'Barrio'}
                                        subtitulo={'¿La dirección incluye barrio?'}
                                        name={'barrio'}
                                        id={'barrio'}
                                        onChangeInput={onChangeInput}
                                        valorInput={formDireccion.barrio}
                                    />
                                </div>
                                {
                                    activarBarrio ?
                                        <div >
                                            <CampoTexto
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '00',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                                valorInput={formDireccion.nombreBarrio}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="nombreBarrio"
                                                placeholder="Nombre del barrio"
                                            />
                                        </div>
                                        : undefined
                                }
                                <div>
                                    <CheckNuevo
                                        titulo={'Unidad'}
                                        subtitulo={'¿La dirección incluye unidad?'}
                                        name={'unidad'}
                                        id={'unidad'}
                                        valorInput={formDireccion.unidad}
                                        onChangeInput={onChangeInput}
                                    />
                                </div>
                                {
                                    activarUnidad ?
                                        <div >
                                            <CampoTexto
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '00',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                                valorInput={formDireccion.numeroUnidad}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="numeroUnidad"
                                                placeholder="Número unidad"
                                            />
                                        </div>
                                        : undefined
                                }
                                {
                                    activarUnidad ? <div >
                                        <CampoTexto
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '00',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                            valorInput={formDireccion.letraUnidad}
                                            onChangeInput={onChangeInputDireccion}
                                            nameInput="letraUnidad"
                                            placeholder="Letra unidad"
                                        />
                                    </div> : undefined
                                }
                                <div>
                                    <CheckNuevo
                                        titulo={'Interior'}
                                        subtitulo={'¿La dirección incluye interior?'}
                                        name={'interiorDescripcion'}
                                        id={'interior'}
                                        onChangeInput={onChangeInput}
                                        valorInput={formDireccion.interiorDescripcion}
                                    />
                                </div>
                                {activarInterior ?
                                    <div >
                                        <CampoTexto
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '00',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                            valorInput={formDireccion.numeroInterior}
                                            onChangeInput={onChangeInputDireccion}
                                            nameInput="numeroInterior"
                                            placeholder="Número interior"
                                        />
                                    </div>
                                    :
                                    undefined}
                                {
                                    activarInterior ?
                                        <div >
                                            <CampoTexto
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '00',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                                valorInput={formDireccion.letraInterior}
                                                onChangeInput={onChangeInputDireccion}
                                                nameInput="letraInterior"
                                                placeholder="Letra interior"
                                            />
                                        </div>
                                        : undefined
                                }
                            </div>
                            <h3 className="font-bold py-3 mt-2">Referencias de ubicación</h3>
                            <div className={`grid grid-cols-1gap-y-4 `} >
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={formDireccion.referenciaUbicacion}
                                        onChangeInput={onChangeInputDireccion}
                                        nameInput="referenciaUbicacion"
                                        placeholder="Referencias de ubicación"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-end w-full">
                            <div className="space-x-3 gap-x-6 ">
                                <button onClick={() => { cerrarModal(1) }} className="py-2 px-8 bg-[#979797ff] rounded-lg  text-white text-xs mx-3">Cancelar</button>
                                <button onClick={(formDireccion.modoEdicion != true) ? guardarDireccion : guardarDireccionesEdicion} id="modal" className={`py-2 px-8 bg-coomeva_color-rojo  rounded-lg mx-auto text-white text-xs`}>Guardar dirección</button>
                            </div>
                        </div>
                    </Modals>
                    : undefined
            }
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
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
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
                                            id: '00',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div >
                                    <CampoTexto
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '00',
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
                                    valorInput={formTelefono.tipoContacto}
                                    onChangeInput={onChangeInputTelefono}
                                    nameInput="tipoContacto"
                                    placeholder="Tipo de Contacto"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '00',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listTipoContacto}
                                    idLista="code"
                                    descripcionList="value"
                                />
                                <CampoLista
                                    valorInput={formTelefono.operadora}
                                    onChangeInput={onChangeInputTelefono}
                                    nameInput="operadora"
                                    placeholder="Operadora"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '00',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listTipoOperador}
                                    idLista="code"
                                    descripcionList="value"
                                />
                                <CampoLista
                                    valorInput={formTelefono.tipoContrato}
                                    onChangeInput={onChangeInputTelefono}
                                    nameInput="tipoContrato"
                                    placeholder="Tipo de Contrato"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '00',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listTipoContrato}
                                    idLista="code"
                                    descripcionList="value"
                                />
                                <CampoLista
                                    valorInput={formTelefono.mensajeria}
                                    onChangeInput={onChangeInputTelefono}
                                    nameInput="mensajeria"
                                    placeholder="Mensajería"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '00',
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
                                        valorInput={formTelefono.marcaPrincipal}
                                        nameInput={'marcaPrincipal'}
                                        onChangeInput={onChangeInputTelefono}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-end w-full">
                            <div className="space-x-3 gap-x-6 ">
                                <button type="button" onClick={() => { cerrarModal(2) }} className="py-2 px-8 bg-[#979797ff] rounded-lg  text-white text-xs mx-3">Cancelar</button>
                                <button type="button" onClick={(formTelefono.modoEdicion != true) ? guardarTelefono : guardarTelefonoEdicion} id="modal" className={`py-2 px-8 bg-coomeva_color-rojo  rounded-lg mx-auto text-white text-xs`}>Guardar telefono</button>
                            </div>
                        </div>
                    </Modals>
                    : undefined
            }
        </div>
    )
}