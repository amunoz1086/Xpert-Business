'use client'

import { conversionPesos, separarMiles, validarNumeroInputText } from "@/app/lib/utils"

const tablaEncabezado = ["", "Tarifa Plena", "Cantidad", "Tarifa Negociada"]

const seccion = "pagoNominaNegociada"

export default function TableNogociada({ listNegociarNomina, handleInputChange, contextData, numeroPagoTx, cuataManejosChip, habilitarInput }) {



    return (
        <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
            <thead className="bg-coomeva_color-grisPestaña2">
                <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                    {tablaEncabezado.map((head, i) => (
                        <th className={`align-bottom text-center  px-2 text-coomeva_color-rojo text-sm font-semibold  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    listNegociarNomina.DATA?.map((nomina, i) => {
                        const disableInput = (nomina.permitirNegociar == 1) ||
                            (nomina.permitirNegociar == 2) ||
                            (nomina.permitirNegociar == 4) ||
                            (nomina.permitirNegociar == 5) ||
                            habilitarInput

                        const disableTarifaNegociada = (nomina.permitirNegociar !== 3 && nomina.permitirNegociar !== 5) || habilitarInput

                        const valorCantidad = (nomina.permitirNegociar == 1) ? 'Ilimitado' : nomina.cantidad == 0 ? '' : nomina.cantidad

                        return <tr className={`text-[#002E49]  ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={nomina.idnegociarNomina}>
                            <td>
                                <input
                                    name={`${seccion}${i}`}
                                    id={`${seccion}${i}`}
                                    type="text"
                                    defaultValue={nomina.pagoNomina}
                                    className={` bg-transparent   bg-opacity-40 w-full  text-start outline-none h-8 text-sm text-coomeva_color-azulOscuro`}
                                    disabled={true}

                                />
                                <input name={`${seccion}idnegociarNomina${i}`} id={`${seccion}idnegociarNomina${i}`} defaultValue={nomina.idnegociarNomina} className={`hidden`} />
                                <input name={`${seccion}pagoNomina${i}`} id={`${seccion}pagoNomina${i}`} defaultValue={nomina.pagoNomina} className={`hidden`} />
                            </td>
                            <td>

                                <input
                                    id={`${seccion}tarifaPlena${i}`}
                                    name={`${seccion}tarifaPlena${i}`}
                                    type="text"
                                    value={contextData.convenioPagoNominaNegociada[i]?.tarifaPlena && conversionPesos({ valor: contextData.convenioPagoNominaNegociada[i]?.tarifaPlena }) || conversionPesos({ valor: nomina.tarifaPlena })}
                                    className={` bg-coomeva_color-grisPestaña2 text-center pl-2   bg-opacity-40 w-full  outline-none h-8 text-coomeva_color-azulOscuro`}

                                    onChange={(e) => handleInputChange(i, 'tarifaPlena', e.target.value)}
                                    disabled={true}
                                />

                            </td>
                            <td>
                                {
                                    nomina.permitirNegociar === 3 ?
                                        <input
                                            name={`${seccion}cantidad${i}`}
                                            id={`${seccion}cantidad${i}`}
                                            type="number"
                                            defaultValue={contextData.convenioPagoNominaNegociada[i]?.cantidad || nomina.cantidad}
                                            onBlur={(e) => handleInputChange(e, 'cantidad', e.target.value, i)}
                                            className={`${disableInput ? 'bg-coomeva_color-grisPestaña2 w-full   bg-opacity-40' : 'bg-white  rounded-md border border-coomeva_color-azulOscuro w-full'}  text-center pl-2 outline-none h-8 text-coomeva_color-azulOscuro`}
                                            disabled={disableInput}
                                            autoComplete="off"
                                        /> :
                                        <>
                                            <input
                                                name={`${seccion}cantidad${i}`}
                                                id={`${seccion}cantidad${i}`}
                                                value={

                                                    nomina.idnegociarNomina === 1102 ? cuataManejosChip !== '' ? separarMiles({valor:cuataManejosChip})  : contextData.convenioPagoNominaNegociada[i]?.cantidad ? separarMiles({valor:contextData.convenioPagoNominaNegociada[i]?.cantidad}) : valorCantidad
                                                        :
                                                        nomina.idnegociarNomina === 1103 ? numeroPagoTx !== '' ?separarMiles({valor:numeroPagoTx})   : contextData.convenioPagoNominaNegociada[i]?.cantidad ? separarMiles({valor:contextData.convenioPagoNominaNegociada[i]?.cantidad}) : valorCantidad
                                                            : valorCantidad

                                                }
                                                className={`${disableInput ? 'bg-coomeva_color-grisPestaña2 w-full   bg-opacity-40' : 'bg-white  rounded-md border border-coomeva_color-azulOscuro w-full'}  text-center pl-2 outline-none h-8 text-coomeva_color-azulOscuro`}
                                                disabled={disableInput}
                                                onChange={(e) => handleInputChange(e, 'tarifaCosto', e.target.value, i)}

                                            />
                                        </>
                                }

                            </td>
                            <td>
                                <input
                                    name={`${seccion}tarifaNegociada${i}`}
                                    id={`${seccion}tarifaNegociada${i}`}
                                    type="text"
                                    className={`${disableTarifaNegociada ? 'bg-coomeva_color-grisPestaña2 w-full   bg-opacity-40' : 'bg-white  rounded-md border border-coomeva_color-azulOscuro w-full'}  pl-2 outline-none text-center h-8 text-coomeva_color-azulOscuro`}
                                    disabled={disableTarifaNegociada}
                                    defaultValue={contextData.convenioPagoNominaNegociada[i]?.tarifaNegociada || conversionPesos({ valor: contextData.convenioPagoNominaNegociada[i]?.tarifaNegociada || 0 }) || conversionPesos({ valor: nomina.tarifaNegociada || 0 })}
                                    onChange={(e) => { validarNumeroInputText(e) }}
                                    onBlur={(e) => handleInputChange(e, 'tarifaNegociada', e.target.value, i)}
                                    onFocus={(e) => {
                                        e.target.value = contextData.convenioPagoNominaNegociada[i]?.tarifaNegociada || nomina.tarifaNegociada || ''
                                        e.target.type = "currency";
                                    }}
                                    autoComplete="off"
                                />
                                {
                                    disableTarifaNegociada ? <input name={`hidden${seccion}tarifaNegociada${i}`} id={`hidden${seccion}tarifaNegociada${i}`} defaultValue={nomina.tarifaNegociada} className={`hidden`} /> : null
                                }
                            </td>
                        </tr>
                    })
                }
            </tbody>

        </table>
    )
}
