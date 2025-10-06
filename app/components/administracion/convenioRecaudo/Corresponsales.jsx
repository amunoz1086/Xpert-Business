'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImPlus } from "react-icons/im";
import { insertCorresponsales } from '@/app/lib/administracion/inserts';
import { updateCorresponsales } from '@/app/lib/administracion/update';
import { insertarParametroUrl, transformDataGuardarDBNombre, transformaDataGuardarDB, transformarValorPuntoDecimal, validarNumeroInputText } from '@/app/lib/utils';


export default function Corresponsales({ listaCorresponsales, listaAplica, listaEstado, searchParams, filaAffectada }) {

    const pathName = usePathname();
    const searchParamsF = useSearchParams();
    const { replace } = useRouter();
    const [tipo, setTipo] = useState(listaCorresponsales?.DATA || []);

    useEffect(() => {
        searchParams === '5' && actualizarCorresponsal()
    }, [searchParams]);

    const agregarFila = () => {
        setTipo([...tipo, {
            corresponsales: '',
            tarifaPlena: '',
            estado: '',
            ticket_promedio: '',
            nuevo: true
        }]);
    };

    const actualizarCorresponsal = async () => {
        let filaAfectada = 0;
        let form = new FormData(document.getElementById("formCorresponsal"));

        const { formNuevo, formModificado } = Array.from(form.entries()).reduce(
            (acc, [name, value]) => {
                if (name.includes("nuevo")) {
                    acc.formNuevo.append(name.replace("nuevo_", ""), value);
                } else if (name.includes("modificar")) {
                    acc.formModificado.append(name.replace("modificar_", ""), value);
                };
                return acc;
            },
            { formNuevo: new FormData(), formModificado: new FormData() }
        );

        if (formNuevo && formNuevo.entries().next().done === false) {
            filaAfectada = await fetchBD({ opcion: 'nuevo', formData: formNuevo });
        };

        if (formModificado && formModificado.entries().next().done === false) {
            filaAfectada = await fetchBD({ opcion: 'modificar', formData: formModificado });
        };

        insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: '6', replace, pathName, nombreParamsRow: 'nR', affectRow: filaAfectada + parseInt(filaAffectada) });
    };


    const fetchBD = async ({ opcion, formData }) => {
        let responseRow = 0;
        let data = transformDataGuardarDBNombre({ formData: formData, campoCondicion: 0 });

        try {
            const guardarOpcion = {
                "nuevo": async () => {
                    const res = JSON.parse(await insertCorresponsales({ data }))
                    responseRow = responseRow + res.ROWSAFFECT
                },
                "modificar": async () => {
                    const res = JSON.parse(await updateCorresponsales({ data }))
                    responseRow = responseRow + res.ROWSAFFECT
                }
            };

            opcion === 'modificar' && await guardarOpcion.modificar();
            opcion === 'nuevo' && await guardarOpcion.nuevo();

        } catch (error) {
            console.log(error);
        };

        return responseRow;
    };


    const habilitarInputOnclick = (index) => {
        let habilitarList = [...tipo];
        habilitarList[index].habilitar = true;
        setTipo(habilitarList);
    };

    const formatearValorItem = (e) => {
        const valor = e.target.value;
        document.getElementById(e.target.id).value = `${transformarValorPuntoDecimal({ valor: valor, cantidadDecimales: ',0' })}`;
    };

    return (
        <div className="w-full">
            <form id='formCorresponsal' className='h-[6rem] overflow-y-scroll'>
                <table className="w-full table-auto border-collapse relative text-sm">
                    <thead className='bg-white  '>
                        <tr className='text-coomeva_color-rojo'>
                            <th className=" py-1 text-left border w-[25%]">Corresponsales</th>
                            <th className=" py-1 text-center border w-[25%]">Tarifa Plena</th>
                            <th className=" py-1 text-center border w-[25%]">Estado</th>
                            <th className=" py-1 text-center border w-[25%]">Ticket Promedio</th>
                            <th> <i
                                className="text-coomeva_color-rojo text-xl cursor-pointer"
                                onClick={agregarFila}
                            >
                                <ImPlus className='hidden' />
                            </i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipo.map((fila, index) => (
                            <tr key={index}>
                                <td className="border textoContenidoAdmin">
                                    <input
                                        id={`idHidden${index}`}
                                        type="text"
                                        name={fila.habilitar ? `modificar${index}corresponsal` : undefined}
                                        defaultValue={fila.idcorresponsales}
                                        className='hidden'
                                    />
                                    <input
                                        id={`id${index}`}
                                        type="text"
                                        defaultValue={fila.corresponsales}
                                        className="w-full"
                                        name={fila?.nuevo ? `nuevo${index}corresponsal` : undefined}
                                    />
                                </td>
                                <td className="border  relative flex space-x-2">
                                    <label htmlFor={`tarifaPlenaCorresponsal${index}`}>$</label>
                                    {fila.habilitar || fila?.nuevo ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}>
                                        </div>
                                    }
                                    <input
                                        id={`tarifaPlenaCorresponsal${index}`}
                                        type="text"
                                        name={fila.habilitar ? `modificar${index}corresponsal` : fila?.nuevo ? `nuevo${index}corresponsal` : undefined}
                                        defaultValue={transformarValorPuntoDecimal({ valor: fila.tarifaPlena, cantidadDecimales: ',0', quitarPunto: true })}
                                        onChange={(e) => { validarNumeroInputText(e) }}
                                        onBlur={formatearValorItem}
                                        className="w-full text-end"
                                    />
                                </td>
                                <td className="border  relative">
                                    {fila.habilitar || fila?.nuevo ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}>
                                        </div>
                                    }
                                    <select
                                        id={`estado${index}`}
                                        name={fila.habilitar ? `modificar${index}corresponsal` : fila?.nuevo ? `nuevo${index}corresponsal` : undefined}
                                        defaultValue={fila.estado}
                                        className="w-full"
                                    >{
                                            listaEstado?.DATA.map((estado, index) => (
                                                <option key={index} value={estado.codLista}>{estado.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td className="border relative">
                                    {fila.habilitar || fila?.nuevo ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}>
                                        </div>
                                    }
                                    <select
                                        id={`ticket_promedio${index}`}
                                        name={fila.habilitar ? `modificar${index}corresponsal` : fila?.nuevo ? `nuevo${index}corresponsal` : undefined}
                                        defaultValue={fila.ticket_promedio}
                                        className="w-full"
                                    >
                                        {
                                            listaAplica?.DATA.map((negociar, index) => (
                                                <option key={index} value={negociar.codLista}>{negociar.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};