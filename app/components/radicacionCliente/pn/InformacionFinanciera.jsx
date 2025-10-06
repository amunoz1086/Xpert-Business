'use client'
import React from 'react'
import { useState, useEffect } from 'react'
// import { CampoTexto } from '../../share/CampoTexto'
import { CampoLista } from '../../share/CampoLista'
import { CampoFecha } from '../../share/CampoFecha'
// import { CampoTelefono } from '../../share/CampoTelefono'
// import { CampoCorreo } from '../../share/CampoCorreo'
// import { CampoNumeroParseoMil } from '../../share/CampoNumeroParseoMil'
// import { CampoNumero } from '../../share/CampoNumero'
import { ButtomGuardarRadicacionCleinte } from '../../share/ButtomGuardarRadicacionCleinte'
// import { ButtomAgregarItem } from '../../share/ButtomAgregarItem'
import { objectoValidarCampoAdministracion } from '@/app/lib/utils'
import { insertActividadEconomicaPn, insertClientePn, insertDetalleActivEcoPn, insertDireccionActividad, insertRecidenciaFiscalPn, insertReferenciasPn } from '@/app/lib/apisClientePn/actionsInsert'
import { insertDatosImpositivos, insertDirecciones } from '@/app/lib/apisClientePj/actionsInsert'
import { updateActividadEconomicaPn, updateClientePn, updateDetalleActivEcoPn, updateDireccionActividad, updateRecidenciaFiscalPn, updateReferenciasPn } from '@/app/lib/apisClientePn/actionsUpdate'
import { updateDatosImpositivos, updateDirecciones } from '@/app/lib/apisClientePj/actionsUpdate'
import Loading from '../../share/Loading'
import dynamic from 'next/dynamic'
import { usePerfil } from '@/app/hooks/usePerfil'
// import { CheckInputRojo } from '../../share/CheckInputRojo'
// import { CheckDesplazable } from '../../share/CheckDesplazable'
import { CampoMoneda } from '../../share/CampoMoneda'
import { SeccionFondo } from '../../share/SeccionFondoRadicacion'
// import { ButtomValidarCcNit } from '../ButtomValidarCcNit'
import { fn_catalogosParticipantes } from '@/app/lib/apisClientePn/fn_catalogosParticipantes';


const DynamicModal = dynamic(() => import('../../share/Modals'))



export const InformacionFinanciera = ({ contextRadClient, listDepartamentos, listTipoBalance, tipoBalance, listTipoDocumento, listPaises, listCiduades, listDirecciones, listPrefijos, dataCamposAdministacion = [] }) => {

    const { referecniaPn, perfilPn, actualizarReferenciaPn, clienteNuevoProspectoActualizar, residenciaFiscalPn, activadEconomicaPn, detalleActivadEconomicaPn, tipoPersona } = contextRadClient()
    const { inputDocument } = usePerfil()
    let deshabilitar = clienteNuevoProspectoActualizar != '1' && clienteNuevoProspectoActualizar != '2' && clienteNuevoProspectoActualizar != '3'


    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showLoading, setShowLoading] = useState(false)

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


    // const onChangeInput = (e) => {
    //     const { name, value } = e.target;
    //     const [nameCampo, index] = name.split('-');
    //     const posItem = parseInt(index, 10);
    //     const updatedReferenciaPn = [...referecniaPn];
    //     updatedReferenciaPn[posItem] = {
    //         ...updatedReferenciaPn[posItem],
    //         [nameCampo]: value
    //     };
    //     actualizarReferenciaPn(updatedReferenciaPn);
    // }


    const onChangeInput = (e) => {

        const { name, type, checked, value } = e.target;
        const keys = name.split(".");
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

        const updatedPerfilPn = updateNestedObject(referecniaPn, keys, value);

        actualizarReferenciaPn(updatedPerfilPn);
    }


    const agregarNuevaReferencia = (e) => {

        e.preventDefault()

        const nuevaReferencia = {
            codClienteNatural: '',
            cantidad: '',
            primerApellido: '',
            segundoApellido: '',
            primerNombre: '',
            segundoNombre: '',
            paisNacimiento: '',
            fechaNacimiento: '',
            tipoDocumento: '',
            numeroIdentificacion: '',
            fechaExpedicion: '',
            lugarExpedicion: '',
            codPrefijoTelefonico: '',
            telefono: '',
            correoElectronico: '',
            codDepartamento: '',
            codCiudad: '',
            codDireccion: '',
            viaPrincipal: '',
            viaSecundaria: '',
            numeroInmueble: '',
            referenciaUbicacion: '',
            nuevo: true
        }

        actualizarReferenciaPn([...referecniaPn, nuevaReferencia]);
    };


    const mostrarModalMensaje = ({ mensaje = '' }) => {

        setShowLoading(false);
        setMessageAlert(mensaje);
        setShowModal(true);
        return

    }


    const guardarDataRadicacionCliente = async (e) => {

        e.preventDefault()

        try {

            setShowLoading(true)

            const tipoPersonaGuardar = (tipoPersona == 'Cliente' || clienteNuevoProspectoActualizar == '1') ? 10 : (tipoPersona == 'Prospecto' || clienteNuevoProspectoActualizar == '2') ? 20 : ''

            perfilPn.numeroIdentificacion = inputDocument

            const re = JSON.parse(await insertClientePn(perfilPn, tipoPersonaGuardar));

            if (result.STATUS != 200) {
                mostrarModalMensaje({ mensaje: '¡Atención! No se pudo completar la acción porque algunos campos obligatorios no han sido llenados o contienen información incorrecta. Por favor, verifica y completa todos los campos marcados como requeridos antes de continuar.' })

            }


            const reDirecion = JSON.parse(await insertDirecciones(perfilPn, perfilPn.numeroIdentificacion));
            const reDatosImpositivos = JSON.parse(await insertDatosImpositivos(perfilPn, perfilPn.numeroIdentificacion, perfilPn.numeroIdentificacion));
            const reReferenciaFiscalPn = JSON.parse(await insertRecidenciaFiscalPn(residenciaFiscalPn, perfilPn.numeroIdentificacion));
            const actividadEco = JSON.parse(await insertActividadEconomicaPn(activadEconomicaPn, perfilPn.numeroIdentificacion));
            const reDirecionActiv = JSON.parse(await insertDireccionActividad(activadEconomicaPn, perfilPn.numeroIdentificacion));

            if (detalleActivadEconomicaPn && detalleActivadEconomicaPn.length > 0) {

                for (const item of detalleActivadEconomicaPn) {

                    const resDetalle = JSON.parse(await insertDetalleActivEcoPn(item, perfilPn.numeroIdentificacion));
                }
            }


            if (referecniaPn && referecniaPn.length > 0) {
                for (const item of referecniaPn) {
                    const reReferencias = JSON.parse(await insertReferenciasPn(item, perfilPn.numeroIdentificacion));
                    const reDirecion = JSON.parse(await insertDirecciones(item, item.numeroIdentificacion));
                }
            }


            setShowLoading(false)
            setMessageAlert('Tu información se ha guardado correctamente.')
            setShowModal(true)

        } catch (error) {

            console.log(error)

        } finally {

            setShowLoading(false)
        }

    };


    const actualizarRadicacionCliente = async (e) => {

        e.preventDefault()


        //cliente pn

        try {

            setShowLoading(true)



            const re = JSON.parse(await updateClientePn(perfilPn, clienteNuevoProspectoActualizar == '1' ? 10 : clienteNuevoProspectoActualizar == '2' ? 20 : ''));


            const reDirecion = JSON.parse(await updateDirecciones(perfilPn, perfilPn.numeroIdentificacion));


            const reDatosImpositivos = JSON.parse(await updateDatosImpositivos(perfilPn, perfilPn.numeroIdentificacion, perfilPn.numeroIdentificacion));


            const reReferenciaFiscalPn = JSON.parse(await updateRecidenciaFiscalPn(residenciaFiscalPn, perfilPn.numeroIdentificacion));



            //actividad economica

            const actividadEco = JSON.parse(await updateActividadEconomicaPn(activadEconomicaPn, perfilPn.numeroIdentificacion));


            const reDirecionActiv = JSON.parse(await updateDireccionActividad(activadEconomicaPn, perfilPn.numeroIdentificacion));


            if (detalleActivadEconomicaPn && detalleActivadEconomicaPn.length > 0) {

                for (const item of detalleActivadEconomicaPn) {

                    const resDetalle = JSON.parse(await updateDetalleActivEcoPn(item, perfilPn.numeroIdentificacion));

                }

            }


            //referencia

            if (referecniaPn && referecniaPn.length > 0) {

                for (const item of referecniaPn) {

                    const reReferencias = item.nuevo == true ? JSON.parse(await insertReferenciasPn(item, perfilPn.numeroIdentificacion)) : JSON.parse(await updateReferenciasPn(item, perfilPn.numeroIdentificacion))
                    const reDirecion = item.nuevo == true ? JSON.parse(await insertDirecciones(item, item.numeroIdentificacion)) : JSON.parse(await updateDirecciones(item, item.numeroIdentificacion))

                }

            }


            setShowLoading(false)
            setMessageAlert('tu información se actualizo correctamente.')
            setShowModal(true)

        } catch (error) {

            console.log(error)

        } finally {

            setShowLoading(false)
        }

    };

    const endModal = () => setShowModal(false);



    //actualizarRadicacionCliente

    return (

        <form id='referenciaPn'>
            {/* {
                referecniaPn?.map((item, i) => (
                    <div key={'referencisias' + i} className=" p-6 container mx-auto">

                        {

                            i > 0 ? <h3 className="font-semibold my-14">Referencias</h3> : undefined
                        }


                        <form className='grid grid-cols-4 gap-x-6 gap-y-4'>
                            <div className="grid grid-cols-4 gap-x-5 col-span-4 ">
                                <CampoNumero
                                    valorInput={item.cantidad}
                                    onChangeInput={onChangeInput}
                                    nameInput={"cantidad-" + i}
                                    className="border-b-2 border-gray-500 text-lg font-semibold bg-transparent focus:outline-none focus:border-gray-700"
                                    placeholder='Cantidad de referencias'
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '180',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />
                            </div>
                            <div className='grid grid-cols-4 gap-x-5 col-span-4'>
                                <div>
                                    <CampoTexto
                                        valorInput={item.primerApellido}
                                        onChangeInput={onChangeInput}
                                        nameInput={"primerApellido-" + i}
                                        placeholder="Pimer Apellido"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '183',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div>
                                    <CampoTexto
                                        valorInput={item.segundoApellido}
                                        onChangeInput={onChangeInput}
                                        nameInput={"segundoApellido-" + i}
                                        placeholder="Segundo Apellido"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '184',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div>
                                    <CampoTexto
                                        valorInput={item.primerNombre}
                                        onChangeInput={onChangeInput}
                                        nameInput={"primerNombre-" + i}
                                        placeholder="Primer Nombre"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '181',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div>
                                    <CampoTexto
                                        valorInput={item.segundoNombre}
                                        onChangeInput={onChangeInput}
                                        nameInput={"segundoNombre-" + i}
                                        placeholder="Segundo Nombre"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '182',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-4 gap-x-5 col-span-4'>
                                <div>
                                    <CampoLista
                                        valorInput={item.paisNacimiento}
                                        onChangeInput={onChangeInput}
                                        nameInput={"paisNacimiento-" + i}
                                        placeholder='País de nacimiento'
                                        lista={listPaises}
                                        idLista="codPais"
                                        descripcionList="descripcion"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '185',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div>
                                    <div className=''>
                                        <CampoFecha
                                            valorInput={item.fechaNacimiento}
                                            onChangeInput={onChangeInput}
                                            nameInput={"fechaNacimiento-" + i}
                                            placeholder='Fecha de nacimiento (AÑO/MES/DÍA)'
                                            requerido={true}
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '188',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <CampoLista
                                        valorInput={item.tipoDocumento}
                                        onChangeInput={onChangeInput}
                                        nameInput={"tipoDocumento-" + i}
                                        placeholder='Tipo de documento'
                                        requerido={true}
                                        lista={listTipoDocumento}
                                        idLista={'codLista'}
                                        descripcionList={'descripcion'}
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '186',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div>
                                    <div className=''>
                                        <CampoTexto
                                            valorInput={item.numeroIdentificacion}
                                            onChangeInput={onChangeInput}
                                            nameInput={"numeroIdentificacion-" + i}
                                            placeholder="Numero de identificacion"
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '187',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-4 gap-x-5 col-span-4'>
                                <div>
                                    <div className='relative '>
                                        <CampoFecha
                                            valorInput={item.fechaExpedicion}
                                            onChangeInput={onChangeInput}
                                            nameInput={"fechaExpedicion-" + i}
                                            placeholder='Fecha de expedición (AÑO/MES/DÍA)'
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '189',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>

                                </div>
                                <div>
                                    <CampoLista
                                        valorInput={item.lugarExpedicion}
                                        onChangeInput={onChangeInput}
                                        nameInput={"lugarExpedicion-" + i}
                                        placeholder='Lugar de expedición'
                                        lista={listCiduades}
                                        idLista="codCiudad"
                                        descripcionList="descripcion"
                                        requerido={true}
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '190',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}

                                    />
                                </div>
                                <div>
                                    <CampoLista
                                        valorInput={item.codPrefijoTelefonico}
                                        onChangeInput={onChangeInput}
                                        nameInput={"codPrefijoTelefonico-" + i}
                                        placeholder='Prefijo'
                                        requerido={true}
                                        lista={listPrefijos}
                                        idLista='codListPrefijoPais'
                                        descripcionList='codListPrefijoPais'
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '191',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div>
                                    <div className='pt-1'>
                                        <CampoTelefono
                                            valorInput={item.telefono}
                                            onChangeInput={onChangeInput}
                                            placeholder="Teléfono"
                                            nameInput={"telefono-" + i}
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '187',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-x-5 col-span-4'>
                                <div>
                                    <div>
                                        <CampoCorreo
                                            valorInput={item.correoElectronico}
                                            onChangeInput={onChangeInput}
                                            nameInput={"correoElectronico-" + i}
                                            placeholder='Correo electrónico'
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '180',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-5 gap-x-5 col-span-4'>
                                <div>
                                    <CampoLista
                                        valorInput={item.codDireccion}
                                        onChangeInput={onChangeInput}
                                        nameInput={"codDireccion-" + i}
                                        placeholder='Dirección'
                                        requerido={true}
                                        lista={listDirecciones}
                                        idLista="codListDirecc"
                                        descripcionList="descripcion"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '180',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div>
                                    <div className=''>
                                        <CampoTexto
                                            valorInput={item.viaPrincipal}
                                            onChangeInput={onChangeInput}
                                            nameInput={"viaPrincipal-" + i}
                                            placeholder='Vía principal'
                                            requerido={true}
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '180',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className=''>
                                        <CampoTexto
                                            valorInput={item.viaSecundaria}
                                            onChangeInput={onChangeInput}
                                            nameInput={"viaSecundaria-" + i}
                                            placeholder='Vía secundaria'
                                            requerido={true}
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '180',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className=''>
                                        <CampoNumeroParseoMil
                                            valorInput={item.numeroInmueble}
                                            onChangeInput={onChangeInput}
                                            nameInput={"numeroInmueble-" + i}
                                            placeholder='Número'
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '180',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}

                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className=''>
                                        <CampoTexto
                                            valorInput={item.referenciaUbicacion}
                                            onChangeInput={onChangeInput}
                                            nameInput={"referenciaUbicacion-" + i}
                                            placeholder='Referencia ubicación'
                                            requerido={true}
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '180',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ))

            } */}

            <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                <div className="flex justify-between items-center">

                    <div className='flex gap-6'>
                        <h1 className="font-bold py-3">Situación Económica</h1>
                    </div>

                </div>

                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                    <div>

                        <CampoLista
                            valorInput={referecniaPn?.situacionEconomica?.tipoBalance}
                            placeholder="Tipo de balance"
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.tipoBalance"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '223',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listClaseBalance}
                            idLista="code"
                            descripcionList="value"

                        />
                    </div>

                    <div>

                        <CampoLista
                            valorInput={referecniaPn?.situacionEconomica?.claseBalance}
                            placeholder="Clase de balance"
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.claseBalance"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '223',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listTipoBalance}
                            idLista="code"
                            descripcionList="value"

                        />
                    </div>

                    <div>
                        <CampoFecha
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '226',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={referecniaPn?.situacionEconomica?.fechaCorte}
                            onChangeInput={onChangeInput}
                            placeholder="Fecha de corte"
                            nameInput="situacionEconomica.fechaCorte"

                        />
                    </div>



                </div>

                <h3 className="font-bold py-3 my-2">Ingresos Mensuales</h3>
                <div className='grid grid-cols-3 gap-x-8 gap-y-4'>

                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.salarioFijo}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.salarioFijo"}
                            placeholder='Salario Fijo'
                            placeholderAux='Salario Fijo'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.salarioVariableComisiones}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.salarioVariableComisiones"}
                            placeholder='Salario Variable y Comisiones'
                            placeholderAux='Salario Variable y Comisiones'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.arrendamientoIngresos}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.arrendamientoIngresos"}
                            placeholder='Arrendamiento'
                            placeholderAux='Arrendamiento'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.rendimientosFinancieros}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.rendimientosFinancieros"}
                            placeholder='Rendimientos Financieros'
                            placeholderAux='Rendimientos Financieros'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.horarioshorarios}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.horarioshorarios"}

                            placeholderAux='Honorarios'
                            placeholder='Honorarios'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.otrosIngresos}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.otrosIngresos"}
                            placeholder='Otros Ingresos'
                            placeholderAux='Otros Ingresos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
                <div>
                    <CampoMoneda
                        valorInput={referecniaPn?.situacionEconomica?.totalIngresos}
                        onChangeInput={onChangeInput}
                        nameInput={"situacionEconomica.totalIngresos"}
                        placeholder='Total ingreso'
                        placeholderAux='Total ingreso'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>


                <h3 className="font-bold py-3 my-2">Egresos Mensuales</h3>
                <div className='grid grid-cols-3 gap-x-8 gap-y-4'>

                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.arriendoEgresos}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.arriendoEgresos"}

                            placeholderAux='Arriendo'
                            placeholder='Arriendo'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.gastosPersonalesFamiliares}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.gastosPersonalesFamiliares"}
                            placeholder='Gastos Personales/Familiares'
                            placeholderAux='Gastos Personales/Familiares'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.cuotaCoomeva}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.cuotaCoomeva"}
                            placeholder='Cuota Coomeva'
                            placeholderAux='Cuota Coomeva'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.prestamosDiferentesBancoomeva}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.prestamosDiferentesBancoomeva"}

                            placeholderAux='Prestamos diferentes a Bancoomeva'
                            placeholder='Prestamos diferentes a Bancoomeva'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.deduccionesNomina}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.deduccionesNomina"}

                            placeholderAux='Deducciones Nómina'
                            placeholder='Deducciones Nómina'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.targetasCredito}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.targetasCredito"}

                            placeholderAux='Tarjetas de Crédito'
                            placeholder='Tarjetas de Crédito'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={referecniaPn?.situacionEconomica?.otrosGastos}
                            onChangeInput={onChangeInput}
                            nameInput={"situacionEconomica.otrosGastos"}

                            placeholderAux='Otros gastos'
                            placeholder='Otros gastos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
                <div>
                    <CampoMoneda
                        valorInput={referecniaPn?.situacionEconomica?.totalEgresos}
                        onChangeInput={onChangeInput}
                        nameInput={"situacionEconomica.totalEgresos"}

                        placeholderAux='Total Egresos'
                        placeholder='Total Egresos'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>

            </div>

            <SeccionFondo titulo={'Situación Patrimonial'}>

                <div>

                    <CampoLista
                        valorInput={referecniaPn?.situacionPatrimonial?.tipoBalance}
                        placeholder="Tipo de balance"
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.tipoBalance"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '223',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={catalogo.listClaseBalance}
                        idLista="code"
                        descripcionList="value"

                    />
                </div>

                <div>

                    <CampoLista
                        valorInput={referecniaPn?.situacionPatrimonial?.claseBalance}
                        placeholder="Clase de balance"
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.claseBalance"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '223',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={catalogo.listTipoBalance}
                        idLista="code"
                        descripcionList="value"

                    />
                </div>

                <div>
                    <CampoFecha
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '226',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        valorInput={referecniaPn?.situacionPatrimonial?.fechaCorte}
                        onChangeInput={onChangeInput}
                        placeholder="Fecha de corte"
                        nameInput="situacionPatrimonial.fechaCorte"

                    />
                </div>

                <div>
                    <CampoMoneda
                        valorInput={referecniaPn?.situacionPatrimonial?.totalActivos}
                        onChangeInput={onChangeInput}
                        nameInput={"situacionPatrimonial.totalActivos"}

                        placeholderAux='Total Activos'
                        placeholder='Total Activos'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>
                <div>
                    <CampoMoneda
                        valorInput={referecniaPn?.situacionPatrimonial?.totalPasivos}
                        onChangeInput={onChangeInput}
                        nameInput={"situacionPatrimonial.totalPasivos"}
                        placeholder='Total Pasivos'
                        placeholderAux='Total Pasivos'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>
                <div>
                    <CampoMoneda
                        valorInput={referecniaPn?.situacionPatrimonial?.propiedadRaiz}
                        onChangeInput={onChangeInput}
                        nameInput={"situacionPatrimonial.propiedadRaiz"}

                        placeholderAux='Propiedad Raiz'
                        placeholder='Propiedad Raiz'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>
                <div>
                    <CampoMoneda
                        valorInput={referecniaPn?.situacionPatrimonial?.vehiculo}
                        onChangeInput={onChangeInput}
                        nameInput={"situacionPatrimonial.vehiculo"}

                        placeholderAux='Vehículo'
                        placeholder='Vehículo'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>

            </SeccionFondo>



            <div className='flex justify-end items-center mt-5'>
                {/* <ButtomAgregarItem titulo={'Agregar Referencias'}
                    onClick={agregarNuevaReferencia} clienteNuevoProspectoActualizar={clienteNuevoProspectoActualizar}
                    contextRadClient={contextRadClient} /> */}
                <ButtomGuardarRadicacionCleinte
                    clienteNuevoProspectoActualizar={clienteNuevoProspectoActualizar}
                    //  onClick={guardarDataRadicacionCliente}

                    onClick={clienteNuevoProspectoActualizar == '1' || clienteNuevoProspectoActualizar == '2' ? guardarDataRadicacionCliente : clienteNuevoProspectoActualizar == '3' ? actualizarRadicacionCliente : () => { }}

                />

                {/* <button onClick={actualizarRadicacionCliente}>Actualizar</button> */}
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

        </form>

    )
}


