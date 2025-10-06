'use client'

import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
import { fn_pool_soap } from "@/app/lib/services/soap/fn_pool_soap";
import Loading from "../../share/Loading";
import { usePerfil } from "@/app/hooks/usePerfil";
import { useEffect, useState } from "react";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";

const DynamicModal = dynamic(() => import('../../share/Modals'))

export default function FormSearchAdministracion({ enableInputActividad, enableListDoc, enableInput, convenioNegociar, tipoConv, paragraph2, paragraph3, btnDatosGeneralesPJ, btnGuardar, btnConsultar, btnNuevo, btnEditar, btnCancelar, placeholderBuscarDocumento, listTipoDocumentId }) {


    const { cliente, updateDataCliente, limpiarProvider, pathConvenio, updateDocumentoCliente } = usePerfil()

    const contextRadCliente = useProviderRadClient

    const searchParam = useSearchParams()

    const patnName = usePathname()

    const { replace, push } = useRouter()

    const [habilitarBtnNuevo, setHabilitarBtnNuevo] = useState(false)

    const [mostrarModal, setMostrarModal] = useState(false)

    const [messageModal, setMessageModal] = useState('')

    const [inputUsuario, setInputUsuario] = useState('')

    const [btnGuardarNuevo, setBtnGuardarNuevo] = useState(false)

    const [accionGuardar, setAccionGuardar] = useState(0)

    const [activarBtnPjPn, setActivarBtnPjPn] = useState('pj')

    const [activarBtnGuardar, setActivarBtnGuardar] = useState(false)

    const [activarListarTodo, setactivarListarTodo] = useState(false)

    const [loading, setLoadin] = useState(false)

    const rutaActual = (patnName.split('/'))[2]

    useEffect(() => {

        const handlePjPn = (e) => {
            setActivarBtnGuardar(e.detail);
        };

        const handleActivarEditarAdmin = (e) => {
            setBtnGuardarNuevo(true)
            setAccionGuardar(2)
        };

        const guardoUsuario = (e) => {
            setBtnGuardarNuevo(false);
        };
        window.addEventListener("activarBtnGuardar", handlePjPn);
        window.addEventListener("activarBtnEditarAdmin", handleActivarEditarAdmin);
        window.addEventListener("guardoUsuario", guardoUsuario);


        return () => {

            window.removeEventListener("activarBtnGuardar", handlePjPn);
            window.addEventListener("activarBtnEditarAdmin", handleActivarEditarAdmin);
            window.addEventListener("guardoUsuario", guardoUsuario);
        };
    }, []);

    // const funcionesConsultar = {

    //     'remi': (e) => onChangeActividadEconomica(e),
    //     'bandejaSolicitudes': (e) => onChangeActividadEconomica(e),
    //     'usuarios': (e) => onChangeUsuarios(e),
    //     'radicacion': async (e) => {

    //         e.preventDefault()
    //         limpiarProvider()



    //         const inputBuscar = document.getElementById('foco_user').value

    //         if (inputBuscar.trim() === "") {
    //             setMessageModal('Por favor digite número de identificación del cliente')
    //             setMostrarModal(!mostrarModal)
    //             return
    //         }

    //         try {

    //             setLoadin(true)

    //             let response = await fn_pool_soap({ tipoDocumento: tipoDocument, numDocumento: inputBuscar })
    //             response = JSON.parse(response)

    //             if (response.status !== 200) {

    //                 const tipoPersona = tipoDocument === '1' ? 'PN' : tipoDocument === '3' ? 'PJ' : ''
    //                 const dataUpdateContext = Object.assign(response, { tipoPersona: tipoPersona, numDocumento: inputBuscar })

    //                 updateDataCliente(dataUpdateContext)
    //                 setMessageModal(response.message)
    //                 setMostrarModal(!mostrarModal)
    //                 setHabilitarBtnNuevo(true)

    //                 return
    //             }

    //             response.tipoDocumento = inputBuscar;
    //             response.nuevoCliente = false;
    //             response.editar = true;
    //             response.tipoDocumento = tipoDocument;



    //             const clienteContext = { ...cliente, ...response }
    //             setHabilitarBtnNuevo(false)
    //             updateDataCliente(clienteContext)

    //         } catch (error) {

    //             setMessageModal(error.message)
    //             setMostrarModal(!mostrarModal)

    //         } finally {
    //             setLoadin(false)
    //         }


    //     }
    // }

    const onChangeUsuarios = (e) => {

        e.preventDefault()

        // let valueInput = document.getElementById('usuario')

        const param = new URLSearchParams(searchParam)

        param.set('q', inputUsuario)

        param.set('o', 1)

        replace(`${patnName}?${param}`)

    }

    const onClickConsultarCliente = async (e) => {

        e.preventDefault()

        if (patnName.split('/')[2] == 'ahorro') {

            const event = new CustomEvent("consultarPlan", {
                detail: inputUsuario
            })

            window.dispatchEvent(event)

            return
        }


        if (activarListarTodo) {

            const event = new CustomEvent("consultar", {
                detail: ''
            });
            window.dispatchEvent(event);
            setactivarListarTodo(false)
            return
        }


        if (inputUsuario != '') {

            e.preventDefault()

            const event = new CustomEvent("consultar", {
                detail: inputUsuario
            });
            window.dispatchEvent(event);
            setactivarListarTodo(true)

            return

        }

        // setMessageModal('digite el nombre de usuario que desea consultar')
        // setMostrarModal(true)


    }

    const onClickNuevoCliente = () => {

        setAccionGuardar(1)
        setBtnGuardarNuevo(true)
        const event = new CustomEvent("nuevoUsuario");
        window.dispatchEvent(event);
    }
    const onClickCancelar = () => {
        setAccionGuardar(0)
        setBtnGuardarNuevo(false)
        const event = new CustomEvent("cancelar");
        window.dispatchEvent(event);
    }

    const onClickGuardar = () => {

        const event = new CustomEvent((patnName.split('/'))[4]);

        window.dispatchEvent(event);
    }

    const onClickEditar = (e) => {
        // updateEditarUsua(true)
        setBtnGuardarNuevo(true)
        setAccionGuardar(2)
        e.preventDefault()


        const event = new CustomEvent("editar", {
            detail: true
        });
        window.dispatchEvent(event);
    }
    const onClickBtnPjPn = (option) => {

        setActivarBtnPjPn(option)

        const event = new CustomEvent("pj", {
            detail: option
        });

        window.dispatchEvent(event);


    }

    const onClickGuardarActualizar = (e) => {

        e.preventDefault()

        // updateEditarUsua(true)

        const event = new CustomEvent("guardar", {
            detail: true
        });
        window.dispatchEvent(event);
        // }

        // if (accionGuardar == 2) {

        //     const event = new CustomEvent("editar", {
        //         detail: true
        //     });
        //     window.dispatchEvent(event);
        // }

        // setBtnGuardarNuevo(false)

    };


    const validarUsuario = (e) => {
        setInputUsuario(e.target.value)
        // updateDocumentoCliente(e.target.value)
    };


    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
    };


    return (
        <>
            {
                loading && <Loading />
            }

            <form id='frmBuscar' className="flex justify-start items-end  w-full">
                {paragraph2 ?
                    <div className="flex flex-col items-center w-full md:w-[70%] lg:w-full" >
                        <p className="ml-24 text-xs text-justify text-[#FFFFFF] w-[90%] h-auto mb-4">
                            Definir campos en creación y modificación.
                        </p>
                        {btnDatosGeneralesPJ ?
                            <div id="btnCliente" className="flex justify-center items-center space-x-4 w-full">
                                <button
                                    onClick={() => { onClickBtnPjPn('pj') }}
                                    type="button"
                                    className={`ml-16 flex justify-center items-center ${patnName.split('/')[3] != 'pj' ? 'bg-transparent' : 'bg-white text-coomeva_color-azulOscuro'} border border-coomeva_color-grisSombra text-[#FFFFFF] w-[80%] h-8 rounded-md shadow hover:shadow-lg`}
                                >
                                    Datos Generales PJ
                                </button>
                                <button
                                    onClick={() => { onClickBtnPjPn('pn') }}
                                    type="button"
                                    className={`ml-4 flex justify-center items-center ${patnName.split('/')[3] != 'pn' ? 'bg-transparent' : 'bg-white text-coomeva_color-azulOscuro'} border border-coomeva_color-grisSombra text-[#FFFFFF] w-[80%] h-8 rounded-md shadow hover:shadow-lg`}
                                >
                                    Datos Generales PN
                                </button>
                            </div>
                            : null
                        }
                    </div>
                    : null
                }
                {<div className='w-[100%]'>
                    <div className='flex w-[100%]'>
                        {
                            enableInput.input1 ?
                                <div className="relative block border-b-gray-300 border-b w-[70%]">
                                    <input
                                        id="foco_user"
                                        name="foco_user"
                                        type="text"
                                        className="py-2 focus:outline-none bg-transparent text-[#FFFFFF] text-lg w-full block peer z-0"
                                        required
                                        autoComplete="off"
                                        autoFocus
                                        value={inputUsuario}
                                        onChange={validarUsuario}
                                        disabled={rutaActual !== "usuarios" && rutaActual !== "ahorro"}
                                    />
                                    <label
                                        className={`absolute bottom-0 py-2 left-0 transition-all pointer-events-none text-white peer-valid:-translate-y-6 peer-valid:text-sm peer-focus:-translate-y-6 peer-focus:text-sm`}
                                        htmlFor="foco_user"
                                        id="labelUsuario"
                                    >
                                        {rutaActual == 'ahorro' ? '' : 'Usuario'}
                                    </label>
                                </div>
                                : null
                        }
                        {
                            enableInput.input1 || enableInput.input2 ?
                                <div className="flex justify-end items-end w-[20%] ">
                                    <HiAdjustmentsHorizontal
                                        className="w-[100%] h-7"
                                        style={{ cursor: "pointer", color: "#FFFFFF" }}
                                        title="Settings"
                                    />
                                </div> : null
                        }
                    </div>
                </div>
                }
                {
                    paragraph3 ?
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
                <div className="w-full flex justify-between">
                    {
                        btnConsultar ?
                            <div className={wBtn(btnNuevo, btnEditar, btnCancelar)} >
                                <BuscarClienteButtom onClickConsultarCliente={onClickConsultarCliente} />
                            </div>
                            : null
                    }
                    {
                        btnNuevo || activarListarTodo ?
                            <div id="btnCliente" className="flex justify-center items-center w-full">
                                {
                                    btnGuardarNuevo ? <button
                                        onClick={onClickGuardarActualizar}
                                        // disabled={!habilitarBtnNuevo}
                                        type="button" className={`flex justify-center items-center  ${!btnGuardarNuevo ? 'bg-transparent' : 'bg-white text-coomeva_color-azulOscuro'}  border border-coomeva_color-grisSombra text-[#FFFFFF] w-[90%] h-8 rounded-md shadow hover:shadow-lg`}>
                                        Guardar
                                    </button> : <button
                                        onClick={onClickNuevoCliente}
                                        // disabled={!habilitarBtnNuevo}
                                        type="button" className={`flex justify-center items-center  ${!habilitarBtnNuevo ? 'bg-transparent' : 'bg-white text-coomeva_color-azulOscuro'}  border border-coomeva_color-grisSombra text-[#FFFFFF] w-[90%] h-8 rounded-md shadow hover:shadow-lg`}>
                                        Nuevo Usuario
                                    </button>
                                }
                            </div> : null
                    }
                    {
                        btnCancelar ?
                            <div id="btnCliente" className="flex justify-center items-center w-full">
                                <button
                                    onClick={btnGuardarNuevo ? onClickCancelar : activarListarTodo ? onClickConsultarCliente : () => { }}
                                    // disabled={!habilitarBtnNuevo}
                                    type="button"
                                    className={`flex justify-center items-center  ${btnGuardarNuevo || activarListarTodo ? 'bg-white text-coomeva_color-azulOscuro' : 'bg-transparent'}  border border-coomeva_color-grisSombra text-[#FFFFFF] w-[90%] h-8 rounded-md shadow hover:shadow-lg`}>
                                    {activarListarTodo ? 'Listar todos' : 'Cancelar'}
                                </button>
                            </div> : null
                    }
                    {
                        btnGuardar ?
                            <div id="btnCliente" className="flex justify-end items-end w-full">
                                <button
                                    onClick={onClickGuardar}
                                    // disabled={!habilitarBtnNuevo}
                                    type="button" className={`flex justify-center items-center  ${!activarBtnGuardar ? 'bg-transparent' : 'bg-white text-coomeva_color-azulOscuro'}  border border-coomeva_color-grisSombra text-[#FFFFFF] w-[40%] h-8 rounded-md shadow hover:shadow-lg`}>
                                    Guardar
                                </button>
                            </div> : null
                    }
                </div>
            </form>
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
            className="flex justify-center items-center bg-[#FFFFFF]  text-coomeva_color-azulOscuro w-full h-8 rounded-md shadow hover:shadow-lg"
        >
            Consultar
        </button>
    )
};

function wBtn(btnNuevo, btnEditar, btnCancelar) {

    let wth = '';

    if (btnNuevo && btnEditar && btnCancelar) {
        wth = "w-full";
    } else {
        wth = "w-[30%]";
    }

    return wth;
};