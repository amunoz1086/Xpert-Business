
'use client'

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import dynamic from "next/dynamic";
import {BiTrash} from 'react-icons/bi'


const DynamicModal = dynamic(() => import('./Modals'))

export const ListadoDocumentos = ({ tituloPagina = '', formId, seccion, bodyTabla = [], idListBody, descripcionListBody }) => {

    const [tableData, setTableData] = useState(bodyTabla);
    const pathName = usePathname();
    const pageActual = pathName.split('/')[4];

    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);


    useEffect(() => {
        setTableData(bodyTabla);
        setIsSaveEnabled(false);
    }, [bodyTabla]);

   
    const dispatchEvent = (estado) => {
        setIsSaveEnabled(estado);
        const event = new CustomEvent("activarBtnGuardar", {
            detail: estado
        });
        window.dispatchEvent(event);
    };

    const handleRowChange = (index, field, value) => {
        dispatchEvent(true);
        const updatedData = [...tableData];
        updatedData[index] = {
            ...updatedData[index],
            [field]: value,
            editar: true
        };
        setTableData(updatedData);
    };

    const handleAddNewItem = () => {
        dispatchEvent(true);
        const newItem = {
            [idListBody]: `new-${Date.now()}`,
            [descripcionListBody]: '',
            nombreCorto: '',
            codigo: '',
            credito: false,
            cuenta: false,
            cdt: false,
            nomina: false,
            pagoTerceros: false,
            recaudoOficina: false,
            recaudoCorresponsal: false,
            isNew: true,
            editar: true,
        };
        setTableData([...tableData, newItem]);
    };

    const handleRemoveNewItem = (indexToRemove) => {

        const nuevosDocumentos = tableData.filter((_, index) => index !== indexToRemove);

        const camposEditados = nuevosDocumentos.some(item => item.editar === true);

        if (!camposEditados) {
            dispatchEvent(false);
        }

        setTableData(nuevosDocumentos);
    };

    const guardarDataDb = async () => {
        const filterData = tableData.filter(item => item.editar === true);

        try {
            setShowLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessageAlert('Datos guardados exitosamente (simulación).');

        } catch (error) {

            setMessageAlert('Ocurrió un error al guardar (simulación).');
        } finally {
            dispatchEvent(false); 
            setShowLoading(false);
            setShowModal(true);
        }
    };

    useEffect(() => {
        window.addEventListener(pageActual, guardarDataDb);
        return () => {
            window.removeEventListener(pageActual, guardarDataDb);
        };
    }, [tableData]);

    const endModal = () => setShowModal(false);

    return (
    
        <div>
            <form id={pageActual} className="">
                <div className='flex justify-between items-center mb-8 mt-6 mx-14'>
                    <h4 className="">{tituloPagina}</h4>
                    <button
                        type="button"
                        onClick={handleAddNewItem}
                        className="bg-coomeva_color-rojo hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                    >
                        +
                    </button>
                </div>
                <div className=" overflow-y-auto max-h-[60vh] border rounded-lg shadow">
                    <table className="table-fixed w-full text-sm text-start">
                        <thead className="sticky top-0 bg-white">
                            <tr className="font-roboto text-sm bg-coomeva_color-grisPestaña2 text-coomeva_color-rojo h-[50px]">
                                <th className="align-middle text-center px-2 py-3 w-40 break-words">Documento</th>
                                <th className="align-middle text-center px-2 py-3 w-28 break-words">Nombre corto</th>
                                <th className="align-middle text-center px-2 py-3 w-28 break-words">Código</th>
                                <th className="align-middle text-center px-2 py-3 w-28 break-words">Crédito</th>
                                <th className="align-middle text-center px-2 py-3 w-28 break-words">Cuenta</th>
                                <th className="align-middle text-center px-2 py-3 w-28 break-words">CDT</th>
                                <th className="align-middle text-center px-2 py-3 w-28 break-words">Nómina</th>
                                <th className="align-middle text-center px-2 py-3 w-24 break-words">Pago Terceros</th>
                                <th className="align-middle text-center px-2 py-3 w-24 break-words">Recaudo oficina</th>
                                <th className="align-middle text-center px-2 py-3 w-28 break-words">Recaudo corresponsal</th>
                                <th className="align-middle text-center px-2 py-3 w-28 break-words">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="font-medium text-[#002e49ed]">
                            {tableData.map((info, i) => (
                                <tr key={info[idListBody]} className={`text-[#002e49ed] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} align-middle border-b`}>
                                    <td className="align-middle px-3 py-3">
                                        {info.isNew ? <input type="text" value={info[descripcionListBody]} onChange={(e) => handleRowChange(i, descripcionListBody, e.target.value)} className="w-full p-1 border rounded" /> : <label>{info[descripcionListBody]}</label>}
                                    </td>
                                    <td className="align-middle px-2 py-3 text-center">
                                        {info.isNew ? <input type="text" value={info.nombreCorto} onChange={(e) => handleRowChange(i, 'nombreCorto', e.target.value)} className="w-full p-1 border rounded" /> : <label>{info.nombreCorto}</label>}
                                    </td>
                                    <td className="align-middle px-2 py-3 text-center">
                                        {info.isNew ? <input type="text" value={info.codigo} onChange={(e) => handleRowChange(i, 'codigo', e.target.value)} className="w-full p-1 border rounded" /> : <label>{info.codigo}</label>}
                                    </td>

                                    {['credito', 'cuenta', 'cdt', 'nomina', 'pagoTerceros', 'recaudoOficina', 'recaudoCorresponsal'].map(field => (
                                        <td key={field} className="align-middle text-center px-2 py-3">
                                            <input
                                                type="checkbox"
                                                checked={!!info[field]}
                                                disabled={!info.isNew && field != 'credito'} // Permitir editar 'credito' siempre, otros solo si es nuevo
                                                onChange={(e) => handleRowChange(i, field, e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300"
                                            />
                                        </td>
                                    ))}
                                   

                                    <td className="align-middle text-center px-2 py-3">
                                        {info.isNew && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewItem(i)}
                                                className=" text-coomeva_color-rojo text-xs font-bold py-1 px-2 rounded"
                                            >
                                                 <BiTrash className="w-5 h-5"/>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </form>

            <div className="flex justify-end mt-8 mx-14">
                <button
                    type="button"
                    onClick={guardarDataDb}
                    disabled={!isSaveEnabled}
                    className={`font-bold py-2 px-20 rounded transition-colors duration-300 text-xs ${isSaveEnabled
                            ? 'bg-coomeva_color-rojo hover:bg-red-500 text-white'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        }`}
                >
                    Guardar
                </button>
            </div>


            {showLoading && <Loading />}

            {showModal && (
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            )}
        </div>
    );
};




