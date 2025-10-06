'use client'

import { conversionPesos, resetearPesos, separarMiles, validarNumeroDocumento, validarNumeroInputText } from "@/app/lib/utils";
import { useProvider } from "@/app/provider/Providers";
import { useEffect } from "react";


const tablaEncabezado = [
    "Recaudo Oficina",
    "Tarifa Plena",
    "Cantidad",
    "Ticket Promedio",
    "Tarifa Negociada"
]

const seccion = "recaudoOficina"

export default function TablaRecaudoOficina({ listaRecOficina, rolUsuario }) {

    const { updateConvenioRecaudo, convenioRecaudo, estadoSolicitud,updatePathConvenio } = useProvider()

    const habilitarInput = (rolUsuario !== '' && rolUsuario !== 2) || (rolUsuario !== '' && rolUsuario === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3)

    useEffect(() => {
        updatePathConvenio('convenioRecaudo')
    }, [])

    
    

    const handleInputChange = (e, campo, valor, fila) => {

        const newList = convenioRecaudo.recaudoOficina.length > 0 ? convenioRecaudo.recaudoOficina : [...listaRecOficina?.DATA]

        newList[fila][campo] = resetearPesos({ valor })

        updateConvenioRecaudo('recaudoOficina', newList)


        document.getElementById(e.target.id).value = campo !== 'cantidad' && valor !== '' ? conversionPesos({ valor }) :valor!==''?separarMiles({valor}):valor
    };

    return (
        <form className="container w-full">
            <fieldset className="border bg-white shadow-md rounded-md w-full">
                <div>
                    <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                        <thead className="bg-coomeva_color-grisPestaña2">
                            <tr className={`  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                {tablaEncabezado.map((head, i) => (
                                    <th className={`align-bottom  px-2 text-center' text-coomeva_color-rojo text-sm  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaRecOficina.DATA?.map((recaudo, i) => (
                                    <tr className={`text-coomeva_color-azulOscuro ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={recaudo.idrecaudoOficina}>
                                        <td>
                                            <input
                                                name={`${seccion}${i}`}
                                                id={`${seccion}${i}`}
                                                type="text"
                                                defaultValue={recaudo.tipoRecaudoOficina}
                                                className={` bg-transparent font-semibold   bg-opacity-40 w-full  outline-none h-8`}
                                                disabled={true}
                                            />
                                            <input name={`${seccion}idrecaudoOficina${i}`} id={`${seccion}idrecaudoOficina${i}`} defaultValue={recaudo.idrecaudoOficina} className={`hidden`} />
                                            <input name={`hidden${seccion}tipoRecaudoOficina${i}`} id={`hidden${seccion}tipoRecaudoOficina${i}`} defaultValue={recaudo.tipoRecaudoOficina} className={`hidden`} />
                                        </td>
                                        <td>
                                            <input
                                                name={`${seccion}tarifaPlena${i}`}
                                                id={`${seccion}tarifaPlena${i}`}
                                                type="text"
                                                defaultValue={conversionPesos({ valor: recaudo.tarifaPlena })}
                                                className={` bg-coomeva_color-grisPestaña2   bg-opacity-40 w-full  text-center outline-none h-8`}
                                                disabled={true}
                                            />
                                            <input name={`hidden${seccion}tarifaPlena${i}`} id={`hidden${seccion}tarifaPlena${i}`} defaultValue={recaudo.tarifaPlena} className={`hidden`} />
                                        </td>
                                        <td>
                                            <input
                                                name={`${seccion}cantidad${i}`}
                                                id={`${seccion}cantidad${i}`}
                                                onChange={validarNumeroDocumento}
                                                className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                defaultValue={
                                                    convenioRecaudo.recaudoOficina[i]?.cantidad ? separarMiles({ valor: convenioRecaudo.recaudoOficina[i]?.cantidad }) : ''
                                                }
                                                onBlur={(e) => handleInputChange(e, 'cantidad', e.target.value, i)}
                                                autoComplete="off"
                                                disabled={habilitarInput}
                                                onFocus={(e) => {
                                                    e.target.value = convenioRecaudo.recaudoOficina[i]?.cantidad || ''
                                              
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name={`${seccion}ticket${i}`}
                                                id={`${seccion}ticket${i}`}
                                                type="currency"

                                                className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                defaultValue={convenioRecaudo.recaudoOficina[i]?.ticket ? conversionPesos({ valor: convenioRecaudo.recaudoOficina[i]?.ticket }) : ''}
                                                onBlur={(e) => handleInputChange(e, 'ticket', e.target.value, i)}
                                                autoComplete="off"
                                                disabled={habilitarInput}
                                                onFocus={(e) => {
                                                    e.target.value = convenioRecaudo.recaudoOficina[i]?.ticket || ''
                                                    e.target.type = "currency";
                                                }}
                                                onChange={(e) => { validarNumeroInputText(e) }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name={`${seccion}tarifaNegociada${i}`}
                                                id={`${seccion}tarifaNegociada${i}`}
                                                className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                type="currency"
                                                defaultValue={convenioRecaudo.recaudoOficina[i]?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudo.recaudoOficina[i]?.tarifaNegociada }) : ''}
                                                onChange={(e) => { validarNumeroInputText(e) }}
                                                onBlur={(e) => handleInputChange(e, 'tarifaNegociada', e.target.value, i)}
                                                autoComplete="off"
                                                disabled={habilitarInput}
                                                onFocus={(e) => {
                                                    e.target.value = convenioRecaudo.recaudoOficina[i]?.tarifaNegociada || ''
                                                    e.target.type = "currency";
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </fieldset>
        </form>
    )
}