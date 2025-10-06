'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { loadDraft, saveDraft } from '@/app/lib/utils/draft'
import { CampoTexto } from '../../share/CampoTexto'
import { CampoLista } from '../../share/CampoLista'
import { CampoFecha } from '../../share/CampoFecha'
import { CampoTelefono } from '../../share/CampoTelefono'
import { CampoCorreo } from '../../share/CampoCorreo'
import { CampoNumeroParseoMil } from '../../share/CampoNumeroParseoMil'
import { CampoNumero } from '../../share/CampoNumero'
import { ButtomGuardarRadicacionCleinte } from '../../share/ButtomGuardarRadicacionCleinte'
import { ButtomAgregarItem } from '../../share/ButtomAgregarItem'
import { objectoValidarCampoAdministracion } from '@/app/lib/utils'
import { insertActividadEconomicaPn, insertClientePn, insertDetalleActivEcoPn, insertDireccionActividad, insertRecidenciaFiscalPn, insertReferenciasPn } from '@/app/lib/apisClientePn/actionsInsert'
import { insertDatosImpositivos, insertDirecciones } from '@/app/lib/apisClientePj/actionsInsert'
import { updateActividadEconomicaPn, updateClientePn, updateDetalleActivEcoPn, updateDireccionActividad, updateRecidenciaFiscalPn, updateReferenciasPn } from '@/app/lib/apisClientePn/actionsUpdate'
import { updateDatosImpositivos, updateDirecciones } from '@/app/lib/apisClientePj/actionsUpdate'
import Loading from '../../share/Loading'
import dynamic from 'next/dynamic'
import { usePerfil } from '@/app/hooks/usePerfil'


const DynamicModal = dynamic(() => import('../../share/Modals'))



export const ReferenciaPn = ({ contextRadClient, listTipoDocumento, listPaises, listCiduades, listDirecciones, listPrefijos, dataCamposAdministacion = [] }) => {

    const { referecniaPn, perfilPn, actualizarReferenciaPn, clienteNuevoProspectoActualizar, residenciaFiscalPn, activadEconomicaPn, detalleActivadEconomicaPn, tipoPersona } = contextRadClient()

    const DRAFT_KEY = 'referecniaPn';

    // 1) Al montar carga draft
    useEffect(() => {
        const draft = loadDraft(DRAFT_KEY);
        if (draft && Array.isArray(draft)) {
            actualizarReferenciaPn(draft);
        }
        return () => {
            // si quieres limpiar al salir, descomenta:
            // clearDraft(DRAFT_KEY);
        }
    }, []);

    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        saveDraft(DRAFT_KEY, referecniaPn);
    }, [referecniaPn]);

    const { inputDocument } = usePerfil()

    let deshabilitar = clienteNuevoProspectoActualizar != '1' && clienteNuevoProspectoActualizar != '2' && clienteNuevoProspectoActualizar != '3'


    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showLoading, setShowLoading] = useState(false)

    const onChangeInput = (e) => {

        const { name, value } = e.target;

        const [nameCampo, index] = name.split('-');

        const posItem = parseInt(index, 10);

        const updatedReferenciaPn = [...referecniaPn];

        updatedReferenciaPn[posItem] = {
            ...updatedReferenciaPn[posItem],
            [nameCampo]: value
        };

        actualizarReferenciaPn(updatedReferenciaPn);

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
            nuevo:true
        }

        actualizarReferenciaPn([...referecniaPn, nuevaReferencia]);
    };




    const mostrarModalMensaje = ({mensaje=''}) => {

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
         
            perfilPn.numeroIdentificacion=inputDocument

            const re = JSON.parse(await insertClientePn(perfilPn, tipoPersonaGuardar));

            if (result.STATUS != 200) {
                mostrarModalMensaje({mensaje:'¡Atención! No se pudo completar la acción porque algunos campos obligatorios no han sido llenados o contienen información incorrecta. Por favor, verifica y completa todos los campos marcados como requeridos antes de continuar.'})
               
            }


            const reDirecion = JSON.parse(await insertDirecciones(perfilPn, perfilPn.numeroIdentificacion));

           
            const reDatosImpositivos = JSON.parse(await insertDatosImpositivos(perfilPn, perfilPn.numeroIdentificacion, perfilPn.numeroIdentificacion));

          
            const reReferenciaFiscalPn = JSON.parse(await insertRecidenciaFiscalPn(residenciaFiscalPn, perfilPn.numeroIdentificacion));


            const actividadEco = JSON.parse(await insertActividadEconomicaPn(activadEconomicaPn, perfilPn.numeroIdentificacion));


            const reDirecionActiv = JSON.parse(await insertDireccionActividad(activadEconomicaPn, perfilPn.numeroIdentificacion));

          

            if(detalleActivadEconomicaPn && detalleActivadEconomicaPn.length > 0){
                

                for (const item of detalleActivadEconomicaPn) {

                    const resDetalle = JSON.parse(await insertDetalleActivEcoPn(item, perfilPn.numeroIdentificacion));
    
                }

            }
           

            if(referecniaPn && referecniaPn.length > 0){

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


            if(detalleActivadEconomicaPn && detalleActivadEconomicaPn.length > 0){

                for (const item of detalleActivadEconomicaPn) {

                    const resDetalle = JSON.parse(await updateDetalleActivEcoPn(item, perfilPn.numeroIdentificacion));
    
                }

            }

           

          

            //referencia

            if(referecniaPn && referecniaPn.length > 0){

                for (const item of referecniaPn) {

                    

                    const reReferencias =item.nuevo==true ? JSON.parse(await insertReferenciasPn(item, perfilPn.numeroIdentificacion)) :JSON.parse(await updateReferenciasPn(item, perfilPn.numeroIdentificacion))

    
                    const reDirecion =item.nuevo==true? JSON.parse(await insertDirecciones(item, item.numeroIdentificacion)) :JSON.parse(await updateDirecciones(item, item.numeroIdentificacion))
    

    
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
            {
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

            }


            <div className='flex justify-between mt-5'>
                <ButtomAgregarItem titulo={'Agregar Referencias'}
                    onClick={agregarNuevaReferencia} clienteNuevoProspectoActualizar={clienteNuevoProspectoActualizar}
                    contextRadClient={contextRadClient} />
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