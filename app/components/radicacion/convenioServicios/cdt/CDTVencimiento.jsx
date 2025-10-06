'use client'

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { TbTrashXFilled } from 'react-icons/tb';
import DetalleCDT from './DetalleCDT';
import { conversionPesos, formatearFecha } from '@/app/lib/utils';
import { useConvenioServicio } from '@/app/hooks/useConvenioServicio'
import { fnQueryListarCDTsVencidos } from '@/app/lib/convenios/cdt/fnQueryListarCDTsVencidos';
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
import { fnQueryReinversionCdt } from '@/app/lib/convenios/cdt/fnQueryListarReinversionCdt'
import { fnQueryListarFormaPagoCdt } from '@/app/lib/convenios/cdt/fnQueryListarFormaPagoCdt'

const DynamicModal = dynamic(() => import('../../../share/Modals'))

export const CDTVencimiento = () => {

    const contextPj = useProviderRadClient();
    const { perfilPj } = contextPj;
    const { updatePathConvenio } = useConvenioServicio();
    const [listaCDTVencidos, setListaCDTVencidos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showModalDetalle, setShowModalDetalle] = useState(false);
    const [itemSeleccionado, setItemSeleccionado] = useState([]);


    const [formaPagoCdt, setFormaPagoCdt] = useState({
        '1': '',
        '2': '',
        '3': ''
    });


    useEffect(() => {
        updatePathConvenio('cdt')
        cargarCdtVencidos()
    }, []);


    const cargarCdtVencidos = async () => {
        try {
            const cdtVencido = JSON.parse(await fnQueryListarCDTsVencidos(JSON.stringify({ idCliente: `${perfilPj.NIT}` })));

            if (cdtVencido.STATUS == 200) {
                setListaCDTVencidos(cdtVencido.cdtVencidos)
            };
        } catch (error) {
            console.log(error);
        };
    };


    const mostrarModalConfirmacion = ({ item }) => {
        cargarDetalle({ codCDT: item })
        cargarFormaDepagoDetalle({ codCDT: item })
        setShowModalDetalle(true)
    };


    const cargarDetalle = async ({ codCDT }) => {
        try {
            const detalle = JSON.parse(await fnQueryReinversionCdt(JSON.stringify({ codCDT: codCDT })));
            if (detalle.STATUS == 200) {
                setItemSeleccionado(detalle.reinversion)
            };
        } catch (error) {
            console.log(error)
        };
    };


    const cargarFormaDepagoDetalle = async ({ codCDT = '' }) => {
        try {
            const formaPago = JSON.parse(await fnQueryListarFormaPagoCdt(JSON.stringify({ codCDT: codCDT })));

            const formaPagoItem = {
                1: 'efectivo',
                2: 'cheque',
                3: 'debito'
            };

            if (formaPago.STATUS == 200) {
                const objeto = formaPago.otraFormaPago.reduce((acc, item) => {
                    const formaPago = formaPagoItem[item.codFormaPago];
                    acc[formaPago] = item.valor;
                    return acc;
                }, {});

                setFormaPagoCdt(objeto)
            };

        } catch (error) {
            console.log(error)
        };
    };


    const endModal = () => {
        eliminarItem();
        setShowModalDetalle(false);
        setShowModal(false);
    }


    const cerrarModalDetalle = () => {
        sessionStorage.clear();
        setShowModalDetalle(false);
        setItemSeleccionado({});
    }


    const cerrarModal = () => {
        setShowModal(false)
        setShowModalDetalle(true)
    }


    const eliminarItem = () => {
        //console.log(listaCDTVencidos.filter((e) => e.codCDT != itemSeleccionado?.codCDT))
        const nuevaLista = listaCDTVencidos.filter((e) => e.codCDT != itemSeleccionado?.codCDT)
        setListaCDTVencidos(nuevaLista)
    }


    const mostrarModalConfirmar = () => {
        setMessageAlert(`¿Está seguro que desea cancelar este CDT?`)
        // setShowModal(true)
        setShowModal(true)
        setShowModalDetalle(false)
    }


    return (
        <div className='overflow-x-auto '>
            <table className='table-fixed w-full border-separate border-spacing-x-[40px]'>
                <thead>
                    <tr className='text-coomeva_color-rojo text-left'>
                        <th className='w-6'></th>
                        <th className='w-28'>Nro. CDT</th>
                        <th className='w-2'></th>
                        <th className='w-44'>Producto</th>
                        <th className='w-44'>Monto</th>
                        <th className='w-44'>Interés</th>
                        <th className='w-44'>Plazo Apertura</th>
                        <th className='w-44'>Fecha Apertura</th>
                        <th className='w-44'>Fecha de Vencimiento</th>
                        <th className='w-44'>Tipo de tasa</th>
                        <th className='w-44'>Tasa Base</th>
                        <th className='w-44'>Spread</th>
                        <th className='w-44'>Forma de Pago Interés</th>
                        <th className='w-44'>Frecuencia de pago</th>
                        <th className='w-44'>Origen de Fondos</th>
                        <th className='w-44'>Razón de Apertura</th>
                        <th className='w-44'>Tipo de Título</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaCDTVencidos.map((cdtVencido) => (
                            <tr key={cdtVencido.codControl} className='text-left text-[15px] text-coomeva_color-grisLetras'>
                                <td className='border-b  py-2'>{cdtVencido.codControl}</td>
                                <td className='w-28 border-b  py-2 ' >{cdtVencido.codCDT}</td>
                                <td className='w-2'>
                                    <TbTrashXFilled onClick={() => mostrarModalConfirmacion({ item: cdtVencido.codCDT })} title="Cancelar CDT" className='text-coomeva_color-rojo cursor-pointer h-5 w-5' />
                                </td>
                                <td className='w-28 border-b  py-2 ' >
                                    {cdtVencido.producto}
                                </td>
                                <td className='w-44 border-b  py-2'>{conversionPesos({ valor: cdtVencido.monto })}</td>
                                <td className='w-44 border-b  py-2'>{conversionPesos({ valor: cdtVencido.interes })}</td>
                                <td className='w-44 border-b  py-2'>{cdtVencido.plazoApertura}</td>
                                <td className='w-44 border-b  py-2'>{formatearFecha({ fecha: cdtVencido.fechaApertura })}</td>
                                <td className='w-44 border-b  py-2'>{formatearFecha({ fecha: cdtVencido.fechaVencimiento })}</td>
                                <td className='w-44 border-b  py-2'>{cdtVencido.tipoTasa}</td>
                                <td className='w-44 border-b  py-2'>{conversionPesos({ valor: cdtVencido.tasaBase, nDecimales: 2, style: "percent" })}</td>
                                <td className='w-44 border-b  py-2'>{conversionPesos({ valor: cdtVencido.spread, nDecimales: 2, style: "percent" })}</td>
                                <td className='w-44 border-b  py-2'>{cdtVencido.formaPagoInteres}</td>
                                <td className='w-44 border-b  py-2'>{cdtVencido.frecuenciaPago}</td>
                                <td className='w-44 border-b  py-2'>{cdtVencido.origenFondo}</td>
                                <td className='w-44 border-b  py-2'>{cdtVencido.razonApertura}</td>
                                <td className='w-44 border-b  py-2'>{cdtVencido.tipoTitulo}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                (showModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} cerrarModal={cerrarModal} textBtnContinuar="Si" textBtnCancelar='No' mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                    <div className="flex gap-4 text-coomeva_color-rojo">
                        <p>No. CDT</p>
                        <div>
                            <p className='text-sm'>{itemSeleccionado.codCDT}</p>
                            <hr className='border border-coomeva_color-rojo' />
                        </div>
                    </div>
                </DynamicModal>
            }
            {
                <DetalleCDT formaPagoCdt={formaPagoCdt} showModalDetalle={showModalDetalle} cerrarModalDetalle={cerrarModalDetalle} mostrarModalConfirmar={mostrarModalConfirmar} itemSeleccionado={itemSeleccionado} />
            }
        </div>
    )
};