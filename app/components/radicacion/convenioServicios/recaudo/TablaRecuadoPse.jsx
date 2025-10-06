'use client'

import { conversionPesos, resetearPesos, separarMiles, validarNumeroDocumento, validarNumeroInputText, } from "@/app/lib/utils";
import { useProvider } from "@/app/provider/Providers";
import { useContext } from "react";

const tablaEncabezado = ["PSE", "Tarifa Plena", "Cantidad", "Ticket Promedio", "Tarifa Negociada"]

const seccion = "recaudoPse"

export default function TablaRecuadoPse({ listaRecPse, DataContext, rolUsuario }) {


    const { updateConvenioRecaudo, convenioRecaudo, estadoSolicitud } = useProvider()

    const habilitarInput = (rolUsuario !== '' && rolUsuario !== 2) || (rolUsuario !== '' && rolUsuario === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3)


    const handleInputChange = (e, campo, valor, fila) => {

        const newList = convenioRecaudo.recaudoPSE.length > 0 ? convenioRecaudo.recaudoPSE : [...listaRecPse?.DATA]

        newList[fila][campo] = resetearPesos({ valor })

        updateConvenioRecaudo('recaudoPSE', newList)

        document.getElementById(e.target.id).value = campo !== 'cantidad' && valor !== '' ? conversionPesos({ valor }) :valor!==''?separarMiles({valor}):valor
    };


    return (
        <form id="frmRecaudoPse">
            <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                <thead className="bg-coomeva_color-grisPestaña2">
                    <tr className={`  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                        {tablaEncabezado.map((head, i) => (
                            <th className={`align-bottom text-sm text-center px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        listaRecPse.DATA?.map((recaudo, i) => (
                            <tr className={`text-coomeva_color-azulOscuro ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={recaudo.idrecaudoPse}>
                                <td>
                                    <input
                                        name={`${seccion}${i}`}
                                        id={`${seccion}${i}`}
                                        type="text"
                                        defaultValue={recaudo.tipoRecaudoPse}
                                        className={` bg-transparent font-semibold text-sm bg-opacity-40 w-full  outline-none h-8`}
                                        disabled={true}

                                    />
                                    <input name={`${seccion}idrecaudoPse${i}`} id={`${seccion}idrecaudoPse${i}`} defaultValue={recaudo.idrecaudoPse} className={`hidden`} />
                                    <input name={`hidden${seccion}tipoRecaudoPse${i}`} id={`hidden${seccion}tipoRecaudoPse${i}`} defaultValue={recaudo.tipoRecaudoPse} className={`hidden`} />
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
                                            convenioRecaudo.recaudoPSE[i]?.cantidad ? separarMiles({ valor: convenioRecaudo.recaudoPSE[i]?.cantidad }) : ''
                                        }
                                        onBlur={(e) => handleInputChange(e, 'cantidad', e.target.value, i)}
                                        autoComplete="off"
                                        disabled={habilitarInput}
                                        onFocus={(e) => {
                                            e.target.value = convenioRecaudo.recaudoPSE[i]?.cantidad || ''
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`${seccion}ticket${i}`}
                                        id={`${seccion}ticket${i}`}
                                        type="currency"

                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        defaultValue={convenioRecaudo.recaudoPSE[i]?.ticket ? conversionPesos({ valor: convenioRecaudo.recaudoPSE[i]?.ticket }) : ''}
                                        onBlur={(e) => handleInputChange(e, 'ticket', e.target.value, i)}
                                        autoComplete="off"
                                        disabled={habilitarInput}
                                        onFocus={(e) => {
                                            e.target.value = convenioRecaudo.recaudoPSE[i]?.ticket || recaudo?.ticket || ''
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
                                        defaultValue={convenioRecaudo.recaudoPSE[i]?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudo.recaudoPSE[i]?.tarifaNegociada }) : ''}
                                        onChange={(e) => { validarNumeroInputText(e) }}
                                        onBlur={(e) => handleInputChange(e, 'tarifaNegociada', e.target.value, i)}
                                        autoComplete="off"
                                        disabled={habilitarInput}
                                        onFocus={(e) => {
                                            e.target.value = convenioRecaudo.recaudoPSE[i]?.tarifaNegociada || ''
                                            e.target.type = "currency";
                                        }}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </form>
    )
}