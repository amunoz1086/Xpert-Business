'use client'

import dynamic from 'next/dynamic'
import ListTipoDocument from './ListTipoDocumentRadicacionClientes';
import { usePerfil } from "@/app/hooks/usePerfil";
import React, { useEffect, useState } from "react";
import Loading from "../../share/Loading";
//import { queryCuentas } from "@/app/lib/apisProductoCupo/fn_queryCuentas";
//import { queryListarTipoId } from "@/app/lib/admin/querys/listas";
import { queryListDocumentoPj } from "@/app/lib/menuPrincipal/actions";
//import { obtenerCookiePerfil } from "@/app/lib/auth/auth";
//import { fn_querySobregiroPendiente } from "@/app/lib/apisProductoCupo/fn_querySobregiroPendiente";
import { queryDepositoPlazo } from "@/app/lib/apisProductoDepositoPlazo/fn_queryDepositoPlazo";

const DynamicModal = dynamic(() => import('../../share/Modals'));


export default function FormSearch({ enableInput, btnConsultar, onBuscar }) {

    const { updateDocumentoCliente, inputDocument } = usePerfil();

    const [mostrarModal, setMostrarModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const [loading, setLoading] = useState(false);
    const [nameCliente, setNameCliente] = useState('');
    const [listTipoDocumentId, setListTipoDocumentId] = useState([]);

    const [messageModalInspecktor, setMessageModalInspecktor] = useState('');
    const [modalInspecktor, setModalInspecktor] = useState(false);
    const [dataReporte, setDataReporte] = useState([]);


    /* Cargar lista Tipo Documentos */
    useEffect(() => {
        try {
            if (Array.isArray(listTipoDocumentId)) {
                if (listTipoDocumentId.length === 0) {
                    const timeoutCatalogo = setTimeout(async () => {
                        const cat = JSON.parse(await queryListDocumentoPj()).DATA;
                        setListTipoDocumentId(cat);
                    }, 100);

                    return () => clearTimeout(timeoutCatalogo);
                };
            };
        } catch (error) {
            console.log('No posible cargar la lista', error)
        }

    }, [listTipoDocumentId]);


    /* Funcion Busar CDTs */
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
            setMessageModal('Por favor, ingrese un número de identificación válido de 9 dígitos');
            setMostrarModal(!mostrarModal);
            return;
        };

        /* if ((tipoDocument !== 'NIT') && inputBuscar.length < 7) {
            setLoading(false);
            setMessageModal('Por favor, ingrese un número de documento válido con un mínimo de 7 dígitos');
            setMostrarModal(!mostrarModal);
            return;
        }; */


        //Buscar Cuentas PJ
        if (tipoDocument === 'NIT') {

            try {

                const dataBuscarClientePj = {
                    "identification": inputBuscar,
                    "identificationType": `${tipoDocument}`
                };

                /* Consultar Depositos a plazo */
                const depositoPlazo = JSON.parse(await queryDepositoPlazo(JSON.stringify(dataBuscarClientePj)));

                if (depositoPlazo.state !== 200) {
                    setLoading(false);

                    if (+depositoPlazo.state === 204) {
                        const listReference = depositoPlazo.listReference;
                        setDataReporte(JSON.parse(listReference));
                        setMessageModalInspecktor(depositoPlazo.message);
                        //setModalInspecktor(true);
                        setTimeout(() => setModalInspecktor(true), 0);
                        return;
                    };

                    setDataReporte([]);
                    setMessageModal(depositoPlazo.message);
                    setMostrarModal(!mostrarModal);
                    return;
                };

                setDataReporte([]);
                setNameCliente(depositoPlazo.customer.customerName);
                let resDepositoPlazo = {};

                if (+depositoPlazo.data.data.status === 400) {
                    setMessageModal(`${depositoPlazo.data.data.message}`);
                    setMostrarModal(!mostrarModal);
                    resDepositoPlazo.status = 205;
                    resDepositoPlazo.customer = depositoPlazo.customer;
                    resDepositoPlazo.data = [];
                    onBuscar(resDepositoPlazo);
                    return;
                };

                const nDepositosPlazo = depositoPlazo.data.data.operationData.ProductInstanceReference.TermDeposit;

                if (nDepositosPlazo.length > 0) {
                    resDepositoPlazo.status = 200;
                    resDepositoPlazo.customer = depositoPlazo.customer;
                    resDepositoPlazo.data = nDepositosPlazo;
                    onBuscar(resDepositoPlazo);
                } else {
                    setMessageModal(`${depositoPlazo.customer.customerName}, no tiene Depositos a Plazo activos`);
                    setMostrarModal(!mostrarModal);
                    resDepositoPlazo.status = 204;
                    resDepositoPlazo.customer = depositoPlazo.customer;
                    resDepositoPlazo.data = [];
                    onBuscar(resDepositoPlazo);
                };

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


        // Buscar Cliente NITE
        if (tipoDocument !== 'NIT') {
            try {
                setLoading(false);
                setMessageModal('Servicio no disponible para empresas extranjeras sin nit');
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


    const cerrarModalInspector = async () => {
        setDataReporte([]);
        setModalInspecktor(!modalInspecktor);
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
                loading && <Loading />
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
                                    <tr key={`${item.listReference.code}-${index}`}>
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