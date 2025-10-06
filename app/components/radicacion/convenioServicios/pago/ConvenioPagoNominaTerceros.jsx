'use client'

import { conversionPesos, resetearPesos, separarMiles, validarNumeroDocumento, validarNumeroInputText } from "@/app/lib/utils"
import { useEffect } from "react";


const tablaEncabezado = [
    "",
    "Tarifa Plena",
    "Cantidad Nueva",
    "Tarifa Negociada"
]

const seccion = 'pagoterceros'


export default function ConvenioPagoNominaTerceros({ listPagoTercero, updateConvenioPago, convenioPagoTerceros, habilitarInput }) {

    const handleInputChange = (e, campo, valor, fila) => {

        const newList = convenioPagoTerceros.length > 0 ? convenioPagoTerceros : [...listPagoTercero?.DATA]

        newList[fila][campo] = resetearPesos({ valor: valor })

        updateConvenioPago('convenioPagoTerceros', newList)

        document.getElementById(e.target.id).value = campo !== 'cantidadNueva' && valor !== '' ? conversionPesos({ valor: valor }) :valor!==''?separarMiles({valor}):valor

    };

   

    return (
        <form id="frmTerceros" className="p-1  h-full w-full relative ">
            <div className="container w-full">
                <fieldset className="border bg-white shadow-md rounded-md w-full">
                    <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>

                        <h2 className="text-coomeva_color-rojo mt-4 w-60 text-center text-sm font-semibold"> Pago Terceros</h2>

                    </legend>
                    <div>
                        <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                            <thead className="bg-coomeva_color-grisPestaña2">
                                <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                    {tablaEncabezado.map((head, i) => (
                                        <th className={`align-bottom text-center px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    listPagoTercero.DATA?.map((nomina, i) => (
                                        <tr className={`text-coomeva_color-azulOscuro ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={nomina.idpagoTerseros}>
                                            <td>
                                                <input
                                                    name={`${seccion}${i}`}
                                                    id={`${seccion}${i}`}
                                                    type="text"
                                                    defaultValue={nomina.pagoTerseros}
                                                    className={` bg-transparent   bg-opacity-40 w-full  text-start pl-3 outline-none h-8`}
                                                    disabled={true}
                                                   

                                                />
                                                <input name={`hidden${seccion}idpagoTerseros${i}`} id={`${seccion}idpagoTerseros${i}`} defaultValue={nomina.idpagoTerseros} className={`hidden`} />
                                                <input name={`hidden${seccion}pagoTerseros${i}`} id={`${seccion}pagoTerseros${i}`} defaultValue={nomina.pagoTerseros} className={`hidden`} />
                                            </td>
                                            <td>

                                                <input
                                                    name={`${seccion}tarifaPlena${i}`}
                                                    type="text"
                                                    defaultValue={conversionPesos({ valor: nomina.tarifaPlena })}
                                                    className={` bg-coomeva_color-grisPestaña2   bg-opacity-40 w-full  text-center outline-none h-8`}
                                                    disabled={true}

                                                />
                                                <input name={`hidden${seccion}tarifaPlena${i}`} id={`${seccion}tarifaPlena${i}`} defaultValue={nomina.pagoTerseros} className={`hidden`} />
                                            </td>
                                            <td>
                                                <input
                                                    name={`${seccion}cantidadNueva${i}`}
                                                    id={`${seccion}cantidadNueva${i}`}
                                                    
                                                   
                                                    onChange={validarNumeroDocumento}
                                                    className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                    defaultValue={convenioPagoTerceros[i]?.cantidadNueva ? separarMiles({ valor: convenioPagoTerceros[i]?.cantidadNueva }) : ''}
                                                    onBlur={(e) => handleInputChange(e, 'cantidadNueva', e.target.value, i)}
                                                    autoComplete="off"
                                                    disabled={habilitarInput}
                                                    onFocus={(e) => {
                                                        e.target.value = convenioPagoTerceros[i]?.cantidadNueva || ''
                                                  
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    name={`${seccion}tarifaNegociada${i}`}
                                                    id={`${seccion}tarifaNegociada${i}`}
                                                    className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                    type="currency"
                                                    defaultValue={convenioPagoTerceros[i]?.tarifaNegociada ? conversionPesos({ valor: convenioPagoTerceros[i]?.tarifaNegociada }) : ''}
                                                    onChange={(e) => { validarNumeroInputText(e) }}
                                                    onBlur={(e) => handleInputChange(e, 'tarifaNegociada', e.target.value, i)}
                                                    autoComplete="off"
                                                    disabled={habilitarInput}
                                                    onFocus={(e) => {
                                                        e.target.value = convenioPagoTerceros[i]?.tarifaNegociada || ''
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
            </div>
        </form>
    )
}
