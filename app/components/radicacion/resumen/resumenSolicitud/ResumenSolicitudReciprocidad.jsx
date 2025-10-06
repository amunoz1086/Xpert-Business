'use client'

import { conversionPesos, resetearPesos, validarNumeroInputText } from "@/app/lib/utils"
import { useState } from "react"


const bodyTable = [
    {
        id: '1',
        tipoCuenta: "Ahorros",
        monto: "",
        tasa: ""
    },
    {
        id: '2',
        tipoCuenta: "Corriente",
        monto: "",
        tasa: ""
    }
]

const headtable2 = ['Producto', 'Monto', 'Tasa NAMV']

const ResumenSolicitudReciprocidad = ({ habilitarInput, updateReciprocidadResumen, reciprocidadResumen,validarSumaReciprocidadMinimaAdmin }) => {



    // const { updateReciprocidadResumen, reciprocidadResumen } = useContext(DataContext)

    const onBlurInput = (e) => {

        const style = (e.target.id).includes('tasa') ? 'percent' : 'currency'
        const tipoCuenta = (e.target.id).includes('1') ? 'ahorro' : 'corriente'


        reciprocidadResumen[tipoCuenta][e.target.id] = resetearPesos({ valor: e.target.value })

        updateReciprocidadResumen(reciprocidadResumen)

        document.getElementById(e.target.id).value = e.target.value !== '' ? conversionPesos({ valor: e.target.value, style: style, nDecimales: style === 'percent' ? 2 : 0 }) : e.target.value;

        validarSumaReciprocidadMinimaAdmin(parseInt(reciprocidadResumen.ahorro?.monto1||0) + parseInt(reciprocidadResumen.corriente?.monto0||0))

    };




    return (
        <div className="container">
            <fieldset className="border bg-white shadow-md rounded-md w-full">
                <legend className={` bg-coomeva_color-grisPestaña2  rounded-t-md`}>
                    <h2 className="text-coomeva_color-rojo text-sm font-semibold mt-4 w-60 text-center">Agregar Reciprocidad Pactada</h2>
                </legend>
                <div>
                    <table className={`table-auto  w-[99%] text-sm  mx-0 mb-3 text-start `}>
                        <thead className="bg-coomeva_color-grisPestaña2">
                            <tr className={`font-semibold text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                {headtable2.map((head, i) => (
                                    <th className={`align-bottom text-center px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bodyTable?.map((servicio, i) => (
                                    <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.id}>
                                        <td>

                                            <input
                                                id={`vacion${i}`}
                                                //  name={`monto${i}`}
                                                type="text"
                                                defaultValue={servicio.tipoCuenta}
                                                className={` bg-transparent  w-full  text-left outline-none h-8`}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                id={`monto${i}`}
                                                name={`monto${i}`}
                                                type="currency"
                                                // defaultValue={reciprocidadResumen[i===1?'ahorro':'corriente'][`monto${i}`] ||''     }
                                                defaultValue={reciprocidadResumen?.[i === 1 ? 'ahorro' : 'corriente'][`monto${i}`] ? conversionPesos({ valor: reciprocidadResumen[i === 1 ? 'ahorro' : 'corriente'][`monto${i}`] }) : ''}
                                                className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                onBlur={onBlurInput}
                                                autoComplete="off"
                                                onFocus={(e) => {
                                                    e.target.value = reciprocidadResumen?.[i === 1 ? 'ahorro' : 'corriente'][`monto${i}`] || ''
                                                    e.target.type = "currency";
                                                }}
                                                onChange={(e) => { validarNumeroInputText(e) }}
                                                disabled={habilitarInput}
                                            />

                                        </td>
                                        <td>
                                            <input
                                                id={`tasa${i}`}
                                                name={`tasa${i}`}
                                                type="percent"
                                                // defaultValue={reciprocidadResumen[i===1?'ahorro':'corriente'][`tasa${i}`] ||''   }
                                                defaultValue={reciprocidadResumen?.[i === 1 ? 'ahorro' : 'corriente'][`tasa${i}`] ? conversionPesos({ valor: reciprocidadResumen[i === 1 ? 'ahorro' : 'corriente'][`tasa${i}`], style: "percent", nDecimales: 2 }) : ''}
                                                className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                onBlur={onBlurInput}
                                                autoComplete="off"
                                                onFocus={(e) => {
                                                    e.target.value = reciprocidadResumen[i === 1 ? 'ahorro' : 'corriente'][`tasa${i}`] || ''
                                                    e.target.type = "percent";
                                                }}
                                                onChange={(e) => { e.target.value = e.target.value.replace(/[^\d.]/g, ''); }}
                                                disabled={habilitarInput}

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
    )
}

export default ResumenSolicitudReciprocidad
