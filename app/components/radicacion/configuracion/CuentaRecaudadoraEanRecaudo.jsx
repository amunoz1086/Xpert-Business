'use client'

import {  useState } from "react"

const headTable = ["Número Cuenta Recaudadora", "EAN", "Tipo de Cuenta"]

const bodyTable = [
    {
        id: 1,
        numCuentar:"" ,
        eanr: '',
        tipoCuentar: ""
    },
    {
        id: 2,
        numCuentar:"" ,
        eanr: '',
        tipoCuentar: ""
    }, {
        id: 3,
        numCuentar:"" ,
        eanr: '',
        tipoCuentar: ""
    }
]


export default function CuentaRecaudadoraEanRecaudo({ listTipoCuenta,habilitarInput,updateConfiguracion, configuracion }) {

    const infoContext = configuracion['convenioRecaudo']['cuentaRecaudodora']

    const [filas, setFilas] = useState(infoContext.length > 0 ? infoContext : [...bodyTable])

    const handleInputChange = (e, campo, valor, fila) => {


        const newList = [...filas]

        newList[fila][campo] = valor

        updateConfiguracion('convenioRecaudo', 'cuentaRecaudodora', newList)

        document.getElementById(e.target.id).value = valor
    };


    const onKeyAgregarFilaEnter = (e) => {


        if (e.key === 'Enter') {
            setFilas([...filas, ...[{
                id: filas.length+1,
                cuenta: "",
                numCuenta: '',
                porcentaje: ""
            }]])
        }

    }

    return (
        <div className='w-full mt-4 '>

            <div className="container w-full">
                <fieldset className="border bg-white shadow-md rounded-md w-full">
                    <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
                        <h2 className="text-transparent mt-4 w-60 text-center">Agregar Reciprocidad Pactada</h2>
                    </legend>
                    <form id={'frmCuentaEan'} className="h-[10rem] overflow-y-scroll">
                        <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                            <thead className="bg-coomeva_color-grisPestaña2 sticky top-0">
                                <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                    {headTable.map((head, i) => (
                                        <th className={`align-bottom text-start px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filas?.map((servicio, i) => (
                                        <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.id}>
                                            <td>

                                                <input
                                                    id={`nCuentar${i}`}
                                                    name={`nCuentar${i}`}
                                                    type="number"
                                                    defaultValue={infoContext[i]?.nCuentar || ''}
                                                    className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                    onBlur={(e) => { handleInputChange(e, 'nCuentar', e.target.value, i) }}
                                                    onKeyUp={onKeyAgregarFilaEnter}
                                                    disabled={habilitarInput}
                                                    autoComplete="off"
                                                />
                                            </td>
                                            <td>

                                                <input
                                                    id={`eanr${i}`}
                                                    name={`eanr${i}`}
                                                    type="text"
                                                    defaultValue={infoContext[i]?.eanr || ''}
                                                    className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                    onBlur={(e) => { handleInputChange(e, 'eanr', e.target.value, i) }}
                                                    onKeyUp={onKeyAgregarFilaEnter}
                                                    disabled={habilitarInput}
                                                    autoComplete="off"
                                                />
                                            </td>
                                            <td className="flex justify-center">
                                                <select
                                                    id={`tipoCuentasr${i}`}
                                                    name={`tipoCuentasr${i}`}
                                                    defaultValue={infoContext[i]?.tipoCuentasr || ''}
                                                    disabled={habilitarInput}
                                                    onBlur={(e) => { handleInputChange(e, 'tipoCuentasr', e.target.value, i) }}
                                                    onKeyUp={onKeyAgregarFilaEnter}
                                                    className='w-44 h-7 font-normal  text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4' >
                                                    <option value={"default"} >Seleccionar</option>
                                                    {listTipoCuenta.DATA?.map((op, i) => (
                                                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                                                    ))}

                                                </select>

                                            </td>


                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </form>
                </fieldset>
            </div>
        </div>
    )
}


