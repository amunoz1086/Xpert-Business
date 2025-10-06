'use client'

import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
import { fn_pool_soap } from "@/app/lib/services/soap/fn_pool_soap";
import ListTipoDocument from './ListTipoDocument';
import Loading from "../share/Loading";

import { usePerfil } from "@/app/hooks/usePerfil";
import { useState } from "react";
import { infoTabs } from "@/app/lib/utils";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";

const DynamicModal = dynamic(() => import('../share/Modals'))

export default function FormSearch({ enableInputActividad, enableListDoc, enableInput, convenioNegociar, tipoConv, paragraph2, btnConsultar, btnNuevo, placeholderBuscarDocumento, listTipoDocumentId }) {


    const { cliente, updateDataCliente, limpiarProvider, pathConvenio, updateDocumentoCliente, inputDocument } = usePerfil();
      const contextRadCliente = useProviderRadClient
    const { perfilPn, perfilPj} = contextRadCliente()
    const informacion = infoTabs[`${pathConvenio}`];
    const searchParam = useSearchParams();
    const patnName = usePathname();
    const { replace } = useRouter();
    const [habilitarBtnNuevo, setHabilitarBtnNuevo] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [loading, setLoading] = useState(false);

    const rutaActual = (patnName.split('/'))[2] || 'radicacion'


    //{ convenioNegociar }

    const funcionesConsultar = {

        'remi': (e) => onChangeActividadEconomica(e),
        'bandejaSolicitudes': (e) => onChangeActividadEconomica(e),
        'radicacion': async (e) => {

            e.preventDefault()
            limpiarProvider()


            const inputBuscar = document.getElementById('numDocumento').value
            const tipoDocument = document.getElementById('tipoDocumento').value

            if (inputBuscar.trim() === "" || tipoDocument.trim() === "") {
                setMessageModal('Por favor, digite el número de identificación del cliente')
                setMostrarModal(!mostrarModal)
                return
            }

       
            if(tipoDocument=='3'&&inputBuscar.length!==9){
                
                setMessageModal('Por favor, ingrese un NIT válido de 9 dígitos')
                setMostrarModal(!mostrarModal)
                return
            }

            try {

                setLoading(true)

                let response = await fn_pool_soap({ tipoDocumento: tipoDocument, numDocumento: inputBuscar })
                response = JSON.parse(response)

                if (response.status !== 200) {

                    const tipoPersona = fnTipoPersona(tipoDocument) //tipoDocument === '1' ? 'PN' : tipoDocument === '3' ? 'PJ' : ''
                    const dataUpdateContext = Object.assign(response, { tipoPersona: tipoPersona, numDocumento: inputBuscar })

                    updateDataCliente(dataUpdateContext)
                    setMessageModal(response.message)
                    setMostrarModal(!mostrarModal)
                    setHabilitarBtnNuevo(true)

                    return
                }

                response.numDocumento = inputBuscar;
                response.nuevoCliente = false;
                response.editar = true;
                response.tipoDocumento = tipoDocument;


                const clienteContext = { ...cliente, ...response }
                setHabilitarBtnNuevo(false)
                updateDataCliente(clienteContext)

            } catch (error) {

                setMessageModal(error.message)
                setMostrarModal(!mostrarModal)

            } finally {
                setLoading(false)
            }


        }
    }


    const onChangeActividadEconomica = (e) => {

        e.preventDefault()

        let valueInput = document.getElementById('remi')

        const param = new URLSearchParams(searchParam)

        param.set('q', valueInput.value)

        replace(`${patnName}?${param}`)

    }


    const onClickConsultarCliente = async (e) => funcionesConsultar[rutaActual](e)

    const onClickActivarNuevoCliente = () => {
        const tipoDocument = document.getElementById('tipoDocumento').value;
        const inputBuscar = document.getElementById('numDocumento').value;
        const tipoPersona = fnTipoPersona(tipoDocument); //tipoDocument === '1' ? 'PN' : tipoDocument === '3' ? 'PJ' : ''
        updateDataCliente({ tipoPersona: tipoPersona, nuevoCliente: true, numDocumento: inputBuscar });
    }

    const validarNumeroDocumento = (e) => {
        const numero = /^\d+$/.test(e.target.value);
        const tipoDocument = document.getElementById('tipoDocumento').value;
        const inputBuscar = document.getElementById('numDocumento').value;

        if (!numero && e.target.value !== '' || (tipoDocument == '3' && inputBuscar.length == 10)) {
            // document.getElementById(e.target.id).value = e.target.value.length > 1 ?(e.target.value).slice(0, -1):''
            return
        };

        updateDocumentoCliente(e.target.value);
    };

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
    };


    return (
        <>
            {
                loading && <Loading />
            }

            <form id='frmBuscar' className="flex justify-start items-center  w-full">
                {<div className='w-[70%]'>
                    <div className='flex w-[100%]'>
                        {enableListDoc ?
                            <div className="flex w-[28%]">
                                <ListTipoDocument tipoPersona={cliente?.tipoDocumento} listTipoDocumentId={listTipoDocumentId} />
                            </div>
                            : null
                        }

                        {

                            enableInput.input1 ?

                                <div className={`flex flex-col w-[57%]`}>
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
                                        disabled={rutaActual !== "radicacion"}
                                    />
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
                                        className="focus:outline-none font-normal flex item-start w-full bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                        placeholder={placeholderBuscarDocumento}

                                        defaultValue={''}
                                        autoComplete="off"
                                    />
                                </div>
                                : null
                        }

                        {
                            enableInput.input2 ?
                                <div className='ml-8 mr-8 flex flex-col w-[50%]'>
                                    <div className='text-[#FFFFFF]  text-xs'>
                                        <label htmlFor="nombreCliente">Cliente</label>
                                    </div>
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        id="nombreCliente"
                                        defaultValue={cliente?.cliente||perfilPj?.razonSocial || perfilPn?.cliente}
                                        disabled={rutaActual !== "radicacion"}
                                        className="focus:outline-none font-normal flex item-start w-full bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                    />
                                </div>
                                : null}
                        {
                            enableInput.input1 && enableInput.input2 ? null :
                                <div className="flex justify-end items-end w-[15%] ">
                                    <HiAdjustmentsHorizontal
                                        className="w-[100%] h-7 text-white cursor-pointer"
                                        /* style={{ cursor: "pointer", color: "#FFFFFF" }} */
                                        title="Settings"
                                    />
                                </div>
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
                                >{convenioNegociar || informacion?.convenioNegociar}
                                </p>
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
                            /* style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "start",
                            }} */
                            className="flex items-start justify-center hidden sm:block md:w-[70%] lg:w-[30%]"
                        >
                            <p className="hidden sm:block text-xs text-justify text-[#FFFFFF] w-[90%] h-auto">
                                Selecciona el tipo de producto y el tipo de operación que incluye la solicitud de precio preferencial. Pudes elegir un solo tipo de producto y operación o realizar varios en la misma solicitud
                            </p>
                        </div>
                        : null
                }

                {
                    btnConsultar ?
                        <div className="flex justify-start items-start w-[30%]" >
                            <BuscarClienteButtom onClickConsultarCliente={onClickConsultarCliente} />
                        </div>
                        : null
                }
            </form>
            {
                btnNuevo ?
                    <div id="btnCliente" className="flex justify-center items-center w-[14%]">
                        <button
                            onClick={onClickActivarNuevoCliente}
                            disabled={!habilitarBtnNuevo}
                            type="text" className={`flex justify-center items-center  ${!habilitarBtnNuevo ? 'bg-transparent' : 'bg-white text-coomeva_color-azulOscuro'}  border border-coomeva_color-grisSombra text-[#FFFFFF] w-[90%] h-8 rounded-md shadow hover:shadow-lg`}>
                            Nuevo Cliente
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
        </>
    )
};

function BuscarClienteButtom({ onClickConsultarCliente }) {
    return (
        <button
            onClick={onClickConsultarCliente}
            className="flex justify-center items-center bg-[#FFFFFF]  text-coomeva_color-azulOscuro w-[50%] h-8 rounded-md shadow hover:shadow-lg"
        >
            Consultar
        </button>
    )
};

function fnTipoPersona(tipoDoc) {
    if (tipoDoc === '1') {
        return 'PN';
    } else if (tipoDoc === '3') {
        return 'PJ';
    } else {
        return '';
    }
};