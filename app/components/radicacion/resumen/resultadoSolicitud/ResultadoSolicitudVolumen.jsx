'use client';

import { resetearPesos } from "@/app/lib/utils";

const ResultadoSolicitudVolumen = ({ dataMotor, dataContext, cliente }) => {

    
    const bodyTable = [
        {
            id: 1,
            descripcion: "Total Cartera",
            valor: '$ ' + resetearPesos({ valor: dataContext?.TOTAL_PROMEDIO_COLOCA || dataMotor?.TOTAL_PROMEDIO_COLOCA || 0 })
        },
        {
            id: 2,
            descripcion: "Total Captación",
            valor: '$ ' + resetearPesos({ valor: dataContext?.VALOR_CAPTACION_1 || dataMotor?.VALOR_CAPTACION_1 || 0 })
        },
        {
            id: 3,
            descripcion: "Antiguedad(Meses)",
            valor: cliente?.antiguedad_ban
        }
    ]

    const bodyTable2 = [
        {
            id: 4,
            descripcion: "Margen Cartera",
            valor: '$ ' + resetearPesos({ valor: dataContext?.TOTAL_MARGEN_CARTERA || dataMotor?.TOTAL_MARGEN_CARTERA || 0 })
        },
        {
            id: 5,
            descripcion: "Margen Captación",
            valor: '$ ' + resetearPesos({ valor: dataMotor?.MARGEN_CAPTACION || dataMotor?.MARGEN_CAPTACION || 0 })
        },
        {
            id: 6,
            descripcion: "Margen Convenios",
            valor: '$ ' + resetearPesos({ valor: dataMotor?.MARGEN_CONVENIOS || dataMotor?.MARGEN_CONVENIOS || 0 })
        },
        {
            id: 7,
            descripcion: "Utilidad",
            valor: '$ ' + resetearPesos({ valor: dataContext?.UTILIDAD_ANUAL || dataMotor?.UTILIDAD_ANUAL || 0 })
        },
        {
            id: 8,
            descripcion: "Reciprocidad Adquirencia",
            valor: '$ ' + resetearPesos({ valor: dataContext?.ADQUI_RECIPRO || dataMotor?.ADQUI_RECIPRO || 0 })
        },
        {
            id: 9,
            descripcion: "Reciprocidad Mínima",
            valor: '$ ' + resetearPesos({ valor: dataContext?.RECIPRO_MIN || dataMotor?.RECIPRO_MIN || 0 })
        }
    ]


    return (<div className="p-1  h-full w-full relative ">
        <div className="container w-full">
            <fieldset className="border bg-white shadow-md rounded-md w-full">
                <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
                    <h4 className="text-coomeva_color-rojo font-semibold px-4 mt-4 text-sm  text-center">VOLUMEN DE NEGOCIO ACTUAL DEL CLIENTE</h4>
                </legend>
                <div>
                    <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                        <tbody>
                            {
                                bodyTable?.map((servicio, i) => (
                                    <tr className={`text-[#002E49] text-left ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.id}>
                                        <td className="text-coomeva_color-rojo font-semibold" style={{ width: '40%' }}>
                                            {servicio.descripcion}
                                        </td>
                                        <td>
                                            {servicio.valor}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </fieldset>
        </div>
        <div className="container w-full">
            <fieldset className="border bg-white shadow-md rounded-md w-full">
                <div>
                    <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                        <tbody>
                            {
                                bodyTable2?.map((recaudo, i) => (
                                    <tr className={`text-[#002E49] text-left ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={recaudo.id}>
                                        <td className="text-coomeva_color-rojo font-semibold" style={{ width: '40%' }}>
                                            {recaudo.descripcion}
                                        </td>
                                        <td>
                                            {recaudo.valor}
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
    )
}

export default ResultadoSolicitudVolumen