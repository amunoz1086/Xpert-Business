'use client'

import { conversionPesos, resetearPesos, separarMiles, validarNumeroDocumento, validarNumeroInputText } from "@/app/lib/utils";
import { useEffect } from "react";

const tablaEncabezado = ['Servicios Financieros', 'Tarifa Plena', 'Cantidad', 'Tarifa Negociada']
const seccion = 'servFinanciero'

export default function TablaServFinanciero({ listServFinancieros, rolUsuario, context }) {

    const { updateServicioFinanciero, servicioFinanciero, estadoSolicitud,updatePathConvenio } = context()

    //const habilitarInputRol =  (rolUsuario !== '' && rolUsuario === 2) && estadoSolicitud !== '' && estadoSolicitud !== 3

   // const habilitarInputRol =  (rolUsuario !== '' && rolUsuario === 2) && estadoSolicitud !== '' && estadoSolicitud !== 3
    const habilitarInputRol=(rolUsuario !=='' && rolUsuario!==2)|| (rolUsuario !=='' && rolUsuario===2)&& (estadoSolicitud!==''&& estadoSolicitud!==3)

    useEffect(() => {
        updatePathConvenio('servicioFinanciero')
    }, [])

    const handleInputChange = (e, campo, valor, fila) => {
        const newList = servicioFinanciero?.solicitud.length > 0 ? servicioFinanciero.solicitud.map(item => ({ ...item })) : [...listServFinancieros?.DATA];
        newList[fila][campo] = resetearPesos({ ...newList[fila], valor });
        updateServicioFinanciero('solicitud', newList)
        document.getElementById(e.target.id).value = campo !== 'cantidad' ? conversionPesos({ valor }) : valor !== '' ? separarMiles({ valor }) : valor
    };


    return (

        <form id="fromServicioFinanciero" >
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
                        listServFinancieros.DATA?.map((servicio, i) => (
                            <tr className={`text-coomeva_color-azulOscuro ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.idFinanciero}>
                                <td className="w-[35%] px-2">
                                    <input
                                        name={`${seccion}${i}`}
                                        id={`${seccion}${i}`}
                                        type="text"
                                        defaultValue={servicio.servicio}
                                        className={` bg-transparent   bg-opacity-40 w-full outline-none h-8 `}
                                        disabled={true}
                                    />
                                    <input name={`${seccion}idFinanciero${i}`} id={`${seccion}idFinanciero${i}`} defaultValue={servicio.idFinanciero} className={`hidden`} />
                                    <input name={`hidden${seccion}servicio${i}`} id={`hidden${seccion}servicio${i}`} defaultValue={servicio.servicio} className={`hidden`} />
                                </td>
                                <td className="flex items-center space-x-1 pl-2   w-full  bg-opacity-40">
                                    <input
                                        name={`${seccion}tarifa${i}`}
                                        id={`${seccion}tarifa${i}`}
                                        type="text"
                                        defaultValue={conversionPesos({ valor: servicio.tarifa })}
                                        className={`text-center  bg-coomeva_color-grisPestaña2   bg-opacity-40 w-full   outline-none h-8`}
                                        disabled={true}
                                    />
                                    <input name={`hidden${seccion}tarifa${i}`} id={`hidden${seccion}tarifa${i}`} defaultValue={servicio.tarifa} className={`hidden`} />
                                </td>
                                <td>
                                    <input
                                        name={`${seccion}cantidad${i}`}
                                        id={`${seccion}cantidad${i}`}
                                        onChange={validarNumeroDocumento}
                                        required={i == 0}
                                        onInvalid={(e) => i == 0 && e.target.setCustomValidity('Campo obligatorio.')}
                                        onInput={(e) => e.target.setCustomValidity('')}
                                        onBlur={(e) => handleInputChange(e, 'cantidad', e.target.value, i)}
                                        className={` ${servicio.obligatorio === 0 ? 'bg-coomeva_color-grisPestaña2   bg-opacity-40' : 'bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25'}   w-full  text-center outline-none h-8 px-2`}
                                        disabled={servicio.obligatorio === 0 || habilitarInputRol}
                                        defaultValue={
                                            servicioFinanciero?.solicitud[i]?.cantidad ? separarMiles({ valor: servicioFinanciero?.solicitud[i]?.cantidad }) : ''
                                        }
                                        autoComplete="off"
                                        onFocus={(e) => {
                                            e.target.value = servicioFinanciero?.solicitud[i]?.cantidad || ''
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`${seccion}tarifaNegociada${i}`}
                                        id={`${seccion}tarifaNegociada${i}`}
                                        type="currency"
                                        required={i == 0}
                                        // title="Campo obligarorio"
                                        onInvalid={(e) => i == 0 && e.target.setCustomValidity('Campo obligatorio.')}
                                        onInput={(e) => e.target.setCustomValidity('')}
                                        className={` ${servicio.obligatorio === 0 ? 'bg-coomeva_color-grisPestaña2   bg-opacity-40' : 'bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25'}   w-full  text-center outline-none h-8 px-3`}
                                        disabled={servicio.obligatorio === 0 || habilitarInputRol}
                                        defaultValue={servicioFinanciero?.solicitud[i]?.tarifaNegociada ?
                                            conversionPesos({ valor: servicioFinanciero?.solicitud[i]?.tarifaNegociada }) : ''}
                                        onBlur={(e) => handleInputChange(e, 'tarifaNegociada', e.target.value, i)}
                                        onChange={(e) => { validarNumeroInputText(e) }}
                                        autoComplete="off"
                                        onFocus={(e) => {
                                            e.target.value = servicioFinanciero?.solicitud[i]?.tarifaNegociada || ''
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
    );
};