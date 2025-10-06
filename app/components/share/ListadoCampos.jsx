
'use client'

import { updatedDataCampos } from "@/app/lib/administracion/update";
import { obtenerValoresObligatorios } from "@/app/lib/utils"
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import dynamic from "next/dynamic";


const DynamicModal = dynamic(() => import('./Modals'))


export const ListadoCampos = ({ tituloPagina = '', formId, seccion, bodyTabla = [], idListBody, descripcionListBody, listSiNo, nombrePrimerCol = 'Datos empresas', nombreTercerColFilaUno = 'Actualización', tituloFilaDosColTercera = 'Hablitar', habilitarInput, tituloSaltoPagina = [], tablaEncabezado1 = ['', '', '', 'Creación', 'Prospecto', 'No Cliente'], tablaEncabezado2 = ['', '', '', 'Obligatorio', 'Obligatorio', 'Obligatorio'] }) => {

    const infoContext = []

    const pathName = usePathname()

    const [listaEditados, setListaEditados] = useState([])

    const pageActual = pathName.split('/')[4]


    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showLoading, setShowLoading] = useState(false)




    const dispatchEvent = (estado) => {

        const event = new CustomEvent("activarBtnGuardar", {
            detail: estado
        });
        window.dispatchEvent(event);

    }

    const handleInputChange = (e) => {

        dispatchEvent(true)

        document.getElementById(e.target.id).value = e.target.value
    };

    const onBlurInput = (e, i, name) => {

        bodyTabla[i].editar = true
        bodyTabla[i][name] = e.target.value

    }



    const guardarDataDb = async () => {

        const filterData = bodyTabla.filter(item => item.editar == true)

        const dataEnviar = obtenerValoresObligatorios(filterData)


        try {

            setShowLoading(true)

            const response = JSON.parse(await updatedDataCampos(dataEnviar))

            setMessageAlert(response.MESSAGE)


        } catch (error) {

            console.log(error)

        } finally {

            dispatchEvent(false)
            setShowLoading(false)
            setShowModal(true)
        }




    }


    useEffect(() => {

        window.addEventListener(pageActual, guardarDataDb);

        return () => {

            window.removeEventListener(pageActual, guardarDataDb);
        };
    }, []);

    const endModal = () => setShowModal(false);

    return (

        <form id={pageActual} className="">

            <h4 className="mb-8 mt-6 mx-14">{tituloPagina}</h4>

            <table className={`table-auto  w-full text-sm  px-4 mb-3 text-start `}>
                <thead className="bg-coomeva_color-grisPestaña2">
                    <tr className={`font-roboto text-sm bg-coomeva_color-grisPestaña2 h-[35px]`}>
                        <th className={`align-middle text-center px-2 text-coomeva_color-rojo `} rowSpan="2">{nombrePrimerCol}</th>

                        <th className={`align-middle text-center px-2 bg-zinc-300 text-coomeva_color-rojo w-[20%]`} colSpan="2">{nombreTercerColFilaUno}</th>

                        {tablaEncabezado1?.slice(3).map((head, i) => (
                            <th className={`align-middle text-center  bg-zinc-300 text-coomeva_color-rojo border px-4 `} key={`${head}${i}`} >{head}</th>
                        ))}
                    </tr>

                    <tr className={`font-roboto text-sm bg-coomeva_color-grisPestaña2 h-[35px] border`}>

                        <th className={`align-middle text-center px-2 text-coomeva_color-rojo   `}>Obligatorio</th>

                        <th className={`align-middle text-center px-2 text-coomeva_color-rojo  `}>{tituloFilaDosColTercera}</th>

                        {tablaEncabezado2?.slice(3).map((head, i) => (
                            <th className={`align-middle text-center text-coomeva_color-rojo w-[10%]`} key={`${head}${i}`} >{head}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className="font-medium text-[#002e49ed]">
                    {
                        bodyTabla?.map((info, i) => {
                            const filaCoincide = tituloSaltoPagina.find(titulo => titulo.numFila === i);
                            return filaCoincide !== undefined
                                ? (
                                    <React.Fragment key={`fila-${info[idListBody]}-${i}`}>
                                        <tr className={`text-[#002e49ed] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-middle border shadow-md px-3`}>
                                            <td className="text-center px-3">
                                                <label className="w-full text-center text-[#002E49]" htmlFor={`hidden${seccion}id${i}`}>
                                                    {filaCoincide?.titulo || ''}
                                                </label>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr key={`info-${info[idListBody]}-${i}`} className={`text-[#002e49ed] ${i % 2 == 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-middle border shadow-md`}>
                                            <td className="align-middle px-3" style={{ width: '40%' }}>
                                                <label htmlFor={`hidden${seccion}id${i}`}>{info[descripcionListBody]}</label>
                                                <input id={`hidden${seccion}id${i}`} name={info.editar ? `editarhidden${seccion}campo${i}` : undefined} defaultValue={info[idListBody]} type="text" className="hidden" />
                                                <input id={`hidden${seccion}infoTributaria${i}`} name={`hidden${seccion}infoTributaria${i}`} defaultValue={info[descripcionListBody]} type="text" className="hidden" />
                                            </td>
                                            <td className="align-middle px-2">
                                                <select
                                                    id={`${seccion}listActObligatorio${i}`}
                                                    name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                    defaultValue={info['actObligatorio'] + '' || 'default'}
                                                    onBlur={(e) => { onBlurInput(e, i, 'actObligatorio') }}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={habilitarInput}
                                                    className='w-full h-7 font-normal text-sm text-center outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                                >
                                                    <option value={'default'}>Seleccionar</option>
                                                    {listSiNo.DATA?.map((op) => (
                                                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="align-middle px-2">
                                                <select
                                                    id={`${seccion}listActEdicion${i}`}
                                                    name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                    defaultValue={info['actEditable'] + '' || 'default'}
                                                    onBlur={(e) => { onBlurInput(e, i, 'actEditable') }}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={habilitarInput}
                                                    className='w-full h-7 font-normal text-sm outline-none text-center bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                                >
                                                    <option value={'default'}>Seleccionar</option>
                                                    {listSiNo.DATA?.map((op) => (
                                                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="align-middle px-2">
                                                <select
                                                    id={`${seccion}listCreacionObligatorio${i}`}
                                                    name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                    defaultValue={info['creaObligatorio'] + '' || 'default'}
                                                    onBlur={(e) => { onBlurInput(e, i, 'creaObligatorio') }}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={habilitarInput}
                                                    className='w-full h-7 font-normal text-sm outline-none text-center bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                                >
                                                    <option value={'default'}>Seleccionar</option>
                                                    {listSiNo.DATA?.map((op) => (
                                                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="align-middle px-2">
                                                <select
                                                    id={`${seccion}listProsObligatorio${i}`}
                                                    name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                    defaultValue={info['prospObligatorio'] + '' || 'default'}
                                                    onBlur={(e) => { onBlurInput(e, i, 'prospObligatorio') }}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={habilitarInput}
                                                    className='w-full h-7 font-normal text-sm outline-none text-center bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                                >
                                                    <option value={'default'}>Seleccionar</option>
                                                    {listSiNo.DATA?.map((op) => (
                                                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="align-middle px-2">
                                                <select
                                                    id={`${seccion}listNoCliObligatorio${i}`}
                                                    name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                    defaultValue={info['nCliObligatorio'] + '' || 'default'}
                                                    onBlur={(e) => { onBlurInput(e, i, 'nCliObligatorio') }}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={habilitarInput}
                                                    className='w-full h-7 font-normal text-sm outline-none text-center bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                                >
                                                    <option value={'default'}>Seleccionar</option>
                                                    {listSiNo.DATA?.map((op) => (
                                                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                                : (
                                    <tr key={`info-${info[idListBody]}-${i}`} className={`text-[#002e49ed] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-middle border shadow-md px-3`}>
                                        <td className="align-middle px-3" style={{ width: '40%' }}>
                                            <label htmlFor={`hidden${seccion}id${i}`}>{info[descripcionListBody]}</label>
                                            <input id={`hidden${seccion}id${i}`} name={info.editar ? `editarhidden${seccion}campo${i}` : undefined} defaultValue={info[idListBody]} type="text" className="hidden" />
                                            <input id={`hidden${seccion}infoTributaria${i}`} name={`hidden${seccion}infoTributaria${i}`} defaultValue={info[descripcionListBody]} type="text" className="hidden" />
                                        </td>
                                        <td className="align-middle px-2">
                                            <select
                                                id={`${seccion}listActObligatorio${i}`}
                                                name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                defaultValue={info['actObligatorio'] + '' || 'default'}
                                                onBlur={(e) => { onBlurInput(e, i, 'actObligatorio') }}
                                                onChange={handleInputChange}
                                                required
                                                disabled={habilitarInput}
                                                className='w-full h-7 font-normal text-sm text-center outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                            >
                                                <option value={'default'}>Seleccionar</option>
                                                {listSiNo.DATA?.map((op) => (
                                                    <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="align-middle px-2">
                                            <select
                                                id={`${seccion}listActEdicion${i}`}
                                                name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                defaultValue={info['actEditable'] + '' || 'default'}
                                                onBlur={(e) => { onBlurInput(e, i, 'actEditable') }}
                                                onChange={handleInputChange}
                                                required
                                                disabled={habilitarInput}
                                                className='w-full h-7 font-normal text-sm outline-none text-center bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                            >
                                                <option value={'default'}>Seleccionar</option>
                                                {listSiNo.DATA?.map((op) => (
                                                    <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="align-middle px-2">
                                            <select
                                                id={`${seccion}listCreacionObligatorio${i}`}
                                                name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                defaultValue={info['creaObligatorio'] + '' || 'default'}
                                                onBlur={(e) => { onBlurInput(e, i, 'creaObligatorio') }}
                                                onChange={handleInputChange}
                                                required
                                                disabled={habilitarInput}
                                                className='w-full h-7 font-normal text-sm outline-none text-center bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                            >
                                                <option value={'default'}>Seleccionar</option>
                                                {listSiNo.DATA?.map((op) => (
                                                    <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="align-middle px-2">
                                            <select
                                                id={`${seccion}listProsObligatorio${i}`}
                                                name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                defaultValue={info['prospObligatorio'] + '' || 'default'}
                                                onBlur={(e) => { onBlurInput(e, i, 'prospObligatorio') }}
                                                onChange={handleInputChange}
                                                required
                                                disabled={habilitarInput}
                                                className='w-full h-7 font-normal text-sm outline-none text-center bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                            >
                                                <option value={'default'}>Seleccionar</option>
                                                {listSiNo.DATA?.map((op) => (
                                                    <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="align-middle px-2">
                                            <select
                                                id={`${seccion}listNoCliObligatorio${i}`}
                                                name={info.editar ? `editar${seccion}campo${i}` : undefined}
                                                defaultValue={info['nCliObligatorio'] + '' || 'default'}
                                                onBlur={(e) => { onBlurInput(e, i, 'nCliObligatorio') }}
                                                onChange={handleInputChange}
                                                required
                                                disabled={habilitarInput}
                                                className='w-full h-7 font-normal text-sm outline-none text-center bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md px-2'
                                            >
                                                <option value={'default'}>Seleccionar</option>
                                                {listSiNo.DATA?.map((op) => (
                                                    <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                );
                        })
                    }
                </tbody>





            </table>


            {
                showLoading ? <Loading /> : undefined
            }

            {
                (showModal)
                    ?
                    <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                        <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                    </DynamicModal> : undefined
            }

        </form>


    )
}


