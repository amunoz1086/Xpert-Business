'use client'

import dynamic from 'next/dynamic'
import ListTipoDocument from './ListTipoDocumentRadicacionClientes';
import { usePerfil } from "@/app/hooks/usePerfil";
import React, { useEffect, useState } from "react";
import Loading from "../../share/Loading";
import { queryCuentas } from "@/app/lib/apisProductoCupo/fn_queryCuentas";
import { queryListarTipoId } from "@/app/lib/admin/querys/listas";
import { obtenerCookiePerfil } from "@/app/lib/auth/auth";
import { fn_querySobregiroPendiente } from "@/app/lib/apisProductoCupo/fn_querySobregiroPendiente";


const DynamicModal = dynamic(() => import('../../share/Modals'))


export default function FormSearch({ enableInput, btnConsultar, onBuscar }) {

    const { updateDocumentoCliente, inputDocument } = usePerfil();

    const [mostrarModal, setMostrarModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [loading, setLoading] = useState(false);
    const [nameCliente, setNameCliente] = useState('');
    const [listTipoDocumentId, setListTipoDocumentId] = useState([]);


    /* Cargar lista Tipo Documentos */
    useEffect(() => {
        try {
            if (Array.isArray(listTipoDocumentId)) {
                if (listTipoDocumentId.length === 0) {
                    const timeoutCatalogo = setTimeout(async () => {
                        const cat = JSON.parse(await queryListarTipoId()).DATA;
                        setListTipoDocumentId(cat);
                    }, 100);

                    return () => clearTimeout(timeoutCatalogo);
                };
            };
        } catch (error) {
            console.log('No posible cargar la lista', error)
        }

    }, [listTipoDocumentId]);


    /* Funcion Busar Cuentas */
    const onClickConsultarCliente = async (e) => {

        e?.preventDefault();
        setLoading(true);
        setNameCliente('');
        onBuscar(null)


        const inputBuscar = document.getElementById('numDocumento').value;
        const tipoDocument = document.getElementById('tipoDocumento').value;


        if (inputBuscar === undefined || tipoDocument === "") {
            setLoading(false);
            setMessageModal('Ingrese el número de identificación del cliente');
            setMostrarModal(!mostrarModal);
            return;
        };

        if (tipoDocument === 'NIT' && inputBuscar.length !== 9) {
            setLoading(false);
            setMessageModal('Por favor, ingrese un NIT válido de 9 dígitos');
            setMostrarModal(!mostrarModal);
            return;
        };

        if ((tipoDocument !== 'NIT') && inputBuscar.length < 7) {
            setLoading(false);
            setMessageModal('Por favor, ingrese un número de documento válido con un mínimo de 7 dígitos');
            setMostrarModal(!mostrarModal);
            return;
        };


        //Buscar Cuentas PJ
        if (tipoDocument === 'NIT') {

            try {

                const dataBuscarClientePj = {
                    "identification": inputBuscar,
                    "identificationType": `${tipoDocument}`
                };

                /* Consultar Cuentas en la BD si es Aprobador */
                let rawSobregirospendientes = {};
                const perfilUsuario = await obtenerCookiePerfil();

                if (+perfilUsuario.value === 3) {
                    rawSobregirospendientes = JSON.parse(await fn_querySobregiroPendiente(JSON.stringify(dataBuscarClientePj)));

                    if (rawSobregirospendientes.STATUS !== 200) {
                        setLoading(false);
                        setMessageModal(`Cliente ${dataBuscarClientePj.identification} no cuenta con solicitudes pendientes`);
                        setMostrarModal(!mostrarModal);
                        return;
                    };
                };

                /* Consultar Cuentas en el Servicio Retrieve */
                const cuentaspPj = JSON.parse(await queryCuentas(JSON.stringify(dataBuscarClientePj)));

                if (cuentaspPj.state !== 200) {
                    setLoading(false);
                    setMessageModal(cuentaspPj.message);
                    setMostrarModal(!mostrarModal);
                    return;
                };

                setNameCliente(cuentaspPj.data[0].AccountAlias);

                for (let i of cuentaspPj.data) {
                    i.ClientID = inputBuscar;
                };

                if (+perfilUsuario.value === 3 && rawSobregirospendientes.STATUS === 200) {
                    cuentaspPj.dataSobregiro = rawSobregirospendientes.DATA
                };

                onBuscar(cuentaspPj);

            } catch (error) {
                console.log(error);
                setMessageModal(error.message);
                setMostrarModal(!mostrarModal);
                onBuscar([]);
            } finally {
                setLoading(false)
                //return
            }

        };


        // Buscar Cliente PN
        if (tipoDocument !== 'NIT') {
            try {
                setLoading(false);
                setMessageModal('Servicio no disponible para persona Natural');
                setMostrarModal(!mostrarModal);
                return
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        };

    };


    const validarNumeroDocumento = (e) => {
        const numero = /^\d+$/.test(e.target.value);
        const tipoDocument = document.getElementById('tipoDocumento').value;
        const inputBuscar = document.getElementById('numDocumento').value;

        if ((!numero || e.target.value.length > 9) && tipoDocument == 'NIT' && e.target.value !== '') {
            e.target.value = e.target.value.slice(0, 9);
            return;
        };

        if (!numero && e.target.value !== '' || (tipoDocument == 'NIT' && inputBuscar.length == 10)) {
            // document.getElementById(e.target.id).value = e.target.value.length > 1 ?(e.target.value).slice(0, -1):''
            return;
        };

        updateDocumentoCliente(e.target.value);
    };


    const cerrarModal = async () => {
        setMostrarModal(!mostrarModal);
    };


    return (
        <>
            <form id='frmBuscar' className="flex justify-start items-center  w-full">
                {<div className='w-[60%]'>
                    <div className='flex w-[100%]'>

                        <div className="-ml-7 mr-6 items-end flex flex-col w-[28%]">
                            <ListTipoDocument
                                listTipoDocumentId={listTipoDocumentId}
                            />
                        </div>

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
                                            value={nameCliente}
                                            className="focus:outline-none font-normal flex item-start w-full bg-transparent border-b border-b-coomeva_color-grisSombra text-[#FFFFFF]"
                                        />
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
                }
                {
                    btnConsultar ?
                        <div className={`ml-6 items-start justify-start flex flex-col w-[20%]`}>
                            <div className=" mt-4 flex justify-start items-start w-[70%]" >
                                <BuscarClienteButtom
                                    onClickConsultarCliente={onClickConsultarCliente}
                                />
                            </div>
                        </div>
                        : null
                }
            </form>
            {
                (mostrarModal)
                &&
                <DynamicModal titulo={'Notificación'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModal}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
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
            Buscar
        </button>
    )
};