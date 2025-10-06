'use client'

import { transformaValorPesos } from "@/app/lib/utils"
import { useState } from "react"

const tablaEncabezado = ['Rango Inferior', 'Rango Maximo', 'Tasa EA Solicitada']


const listOptional = [
    {
        idplanRemuneracion: '1',
        rangoInferior: "",
        rangoMaximo: "",
        tasaEA: ""
    },
    {
        idplanRemuneracion: '2',
        rangoInferior: "",
        rangoMaximo: "",
        tasaEA: ""
    },
    {
        idplanRemuneracion: '3',
        rangoInferior: "",
        rangoMaximo: "",
        tasaEA: ""
    },
    {
        idplanRemuneracion: '4',
        rangoInferior: "",
        rangoMaximo: "",
        tasaEA: ""
    }
    ,
    {
        idplanRemuneracion: '5',
        rangoInferior: "",
        rangoMaximo: "",
        tasaEA: ""
    }
]

export default function BodyTable({ listSelect, listTaableBody, habilitarInput,rolActivo,context }) {


    const { updateDepositoVista, depositoVista,estadoSolicitud } = context()
    const habilitarInputRol=habilitarInput|| (rolActivo !=='' && rolActivo===2)&& (estadoSolicitud!==''&&estadoSolicitud!==3)

    // planRemuracion
    const filtrarDatos = (val) => listTaableBody?.filter(a => a.planRemuneracion.toLowerCase() === val.toLowerCase())

    const dataFiltrada = filtrarDatos(depositoVista.planRemuracion.planRem)

    const [listTable, setListTable] = useState(dataFiltrada?.length > 0 ? dataFiltrada : listOptional)

    const onChangeSelect = (e) => {

        const filtrarDescripcion = filtrarDatos(e.target.value)

        filtrarDescripcion.length > 0 ? setListTable(filtrarDescripcion) : setListTable(listOptional)

        const planRemuracion= {
            planRem:e.target.value||'',
            monto:filtrarDescripcion[filtrarDescripcion.length - 1]?.rangoInferior||'',
            tasa:filtrarDescripcion[filtrarDescripcion.length - 1]?.tasaEA||'',
        }

        updateDepositoVista('planRemuracion', planRemuracion)

    }


    return (
        <div className="flex-1">
            <p className='text-base text-coomeva_color-rojo font-roboto font-medium text-left mt-4 mb-2'>2. Elige plan de remuneración</p>
            <div className="relative inline-block w-64">
                <select
                    defaultValue={depositoVista.planRemuracion.planRem || ''}
                    onChange={onChangeSelect}
                    disabled={habilitarInputRol}
                    className='w-44 h-7 font-normal text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4' name={"planrem"} id={'idrem'}>
                    <option value={"default"} >Seleccionar</option>
                    {listSelect?.map((op, i) => (
                        <option value={op.descripcion} key={op.codLista}>{op.descripcion}</option>
                    ))}
                </select>
            </div>

            <p className='mb-2'></p>
            <div className="p-1  h-full w-full relative ">
                <div className="container w-full">
                    <fieldset className="border bg-white shadow-md rounded-md w-full">
                        <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
                            <h2 className="text-transparent mt-4 w-60 text-center">Solícitud</h2>
                        </legend>
                        <div>
                            <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                                <thead className="bg-coomeva_color-grisPestaña2">
                                    <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                        {tablaEncabezado?.map((head, i) => (
                                            <th className={`align-bottom pl-14 text-start text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listTable?.map((servicio, i) => (
                                            <tr className={`text-coomeva_color-azulOscuro font-semibold text-sm  ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.idplanRemuneracion}>
                                                <td>

                                                    <input
                                                        id={`rangoInferior${i}`}
                                                        name={`rangoInferior${i}`}
                                                        type="text"
                                                        defaultValue={transformaValorPesos(servicio?.rangoInferior, '', 'COP')}
                                                        disabled={true}
                                                        className="bg-transparent pl-16"
                                                    />
                                                </td>
                                                <td>

                                                    <input
                                                        id={`rangoMaximo${i}`}
                                                        name={`rangoMaximo${i}`}
                                                        type="text"
                                                        defaultValue={servicio?.rangoMaximo == 0 && servicio?.rangoMaximo !== '' ? 'en adelante' : transformaValorPesos(servicio.rangoMaximo, '', 'COP')}
                                                        disabled={true}
                                                        className="bg-transparent  pl-16"
                                                        
                                                    />
                                                </td>
                                                <td>

                                                    <input
                                                        id={`tasaEA${i}`}
                                                        name={`tasaEA${i}`}
                                                        type="text"
                                                        defaultValue={transformaValorPesos(servicio.tasaEA, '', '%')}
                                                        disabled={true}
                                                        className="bg-transparent pl-16"
                                                      
                                                    />
                                                </td>

                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}
