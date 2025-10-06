'use client'

import { conversionPesos, resetearPesos, separarMiles, validarNumeroDocumento, validarNumeroInputText } from "@/app/lib/utils";
import { useProvider } from "@/app/provider/Providers";

const tablaEncabezado = ["Corresponsales", "Tarifa Plena", "Cantidad", "Ticket Promedio", "Tarifa Negociada"]
const seccion = "recaudoCorresponsales"

export default function TablaRecaudoCorresponsales({ listRecaudoCorresponsales, listParametrosEfecty, rolUsuario }) {

    const { updateConvenioRecaudo, convenioRecaudo, estadoSolicitud } = useProvider();

    const habilitarInput = (rolUsuario !== '' && rolUsuario !== 2) || (rolUsuario !== '' && rolUsuario === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3)

    const handleInputChange = (e, campo, valor, fila) => {
        const newList = convenioRecaudo.recaudoCorresponsales.length > 0 ? convenioRecaudo.recaudoCorresponsales : [...listRecaudoCorresponsales?.DATA]
        newList[fila][campo] = resetearPesos({ valor })
        updateConvenioRecaudo('recaudoCorresponsales', newList)
        document.getElementById(e.target.id).value = campo !== 'cantidad' && campo !== 'ticket_promedio' && valor !== '' ? conversionPesos({ valor })  :valor!==''?separarMiles({valor}):valor
    };

    return (
        <form id="frmCorresponsal">
            <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                <thead className="bg-coomeva_color-grisPestaña2">
                    <tr className={`text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                        {tablaEncabezado.map((head, i) => (
                            <th className={`align-bottom text-center px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        listRecaudoCorresponsales.DATA?.map((recaudo, i) => {
                            const inactivo = recaudo.estado === 1;
                            const ticketPromedioEstado = recaudo.ticket_promedio !==2

                            return (
                                <tr className={`text-coomeva_color-azulOscuro ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={recaudo.idcorresponsales}>
                                    <td>
                                        <input
                                            name={`${seccion}${i}`}
                                            id={`${seccion}${i}`}
                                            type="text"
                                            defaultValue={recaudo.corresponsales}
                                            className={` bg-transparent  font-semibold bg-opacity-40 w-full  outline-none h-8`}
                                            disabled={true}
                                        />
                                        <input name={`${seccion}idcorresponsales${i}`} id={`${seccion}idcorresponsales${i}`} defaultValue={recaudo.idcorresponsales} className={`hidden`} />
                                        <input name={`hidden${seccion}corresponsales${i}`} id={`hidden${seccion}corresponsales${i}`} defaultValue={recaudo.corresponsales} className={`hidden`} />
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
                                            className={`${inactivo ? 'bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25' : 'bg-coomeva_color-grisPestaña2   bg-opacity-40'}  w-full  text-center outline-none h-8`}
                                            defaultValue={
                                                convenioRecaudo.recaudoCorresponsales[i]?.cantidad ? separarMiles({ valor: convenioRecaudo.recaudoCorresponsales[i]?.cantidad }) : ''
                                            }
                                            onBlur={(e) => handleInputChange(e, 'cantidad', e.target.value, i)}
                                            disabled={!inactivo || habilitarInput}
                                            autoComplete="off"
                                            onFocus={(e) => {
                                                e.target.value = convenioRecaudo.recaudoCorresponsales[i]?.cantidad || ''
                                            }}
                                        />
                                    </td>
                                    <td>
                                        {
                                           ticketPromedioEstado ?
                                                <select
                                                    name={`${seccion}ticket_promedio${i}`}
                                                    id={`${seccion}ticket_promedio${i}`}
                                                    defaultValue={convenioRecaudo.recaudoCorresponsales[i]?.ticket_promedio || 'defualt'}
                                                    className=' border h-8 my-[0.1rem] border-coomeva_color-azulClaro rounded-md w-full outline-none text-sm font-normal bg-transparent text-coomeva_color-azulOscuro'
                                                    onBlur={(e) => handleInputChange(e, 'ticket_promedio', e.target.value, i)}
                                                    disabled={habilitarInput}
                                                >
                                                    <option disabled value={"defualt"}>Seleccionar</option>
                                                    {
                                                        listParametrosEfecty?.DATA.map(parametro => (
                                                            <option
                                                                value={parametro.idParametrosEfecty}
                                                                key={parametro.idParametrosEfecty}
                                                            >
                                                                {parametro.ParametrosEfecty}
                                                            </option>
                                                        ))
                                                    }
                                                </select> : null
                                        }
                                    </td>
                                    <td>
                                        <input
                                            name={`${seccion}tarifaNegociada${i}`}
                                            id={`${seccion}tarifaNegociada${i}`}
                                            type="currency"
                                            className={`${inactivo ? 'bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25' : 'bg-coomeva_color-grisPestaña2   bg-opacity-40'}  w-full  text-center outline-none h-8`}
                                            defaultValue={convenioRecaudo.recaudoCorresponsales[i]?.tarifaNegociada ? conversionPesos({ valor: convenioRecaudo.recaudoCorresponsales[i]?.tarifaNegociada }) : recaudo?.tarifaNegociada ? conversionPesos({ valor: resetearPesos({ valor: recaudo?.tarifaNegociada }) }) : ''}
                                            onBlur={(e) => handleInputChange(e, 'tarifaNegociada', e.target.value, i)}
                                            onChange={(e) => { validarNumeroInputText(e) }}
                                            disabled={!inactivo || habilitarInput}
                                            autoComplete="off"
                                            onFocus={(e) => {
                                                e.target.value = convenioRecaudo.recaudoCorresponsales[i]?.tarifaNegociada || recaudo?.tarifaNegociada || ''
                                                e.target.type = "currency";
                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>
        </form>
    );
};