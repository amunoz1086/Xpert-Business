'use client'


import { useProvider } from "@/app/provider/Providers"
import BtnControl from "../../cliente/BtnControl"
import { conversionPesos, resetearPesos, validarNumeroInputText } from "@/app/lib/utils"

const tablaEncabezado = ["Adquirencias", "Puntos Mínimos","Ticket promedio", "Tarifa Intercambio", "Facturación", "Puntos Negociados", "Tarifa Negociada"]

const seccion = 'solicitudRecaudo'

export default function TablaSolicitud({ listRecaudoSolicitud, rolUsuario }) {

    const { remi, updateConvenioRecaudo, convenioRecaudo, estadoSolicitud } = useProvider()

    const habilitarInputs = remi?.length > 0 ? false : true

    const habilitarInput = (rolUsuario !== '' && rolUsuario !== 2) || (rolUsuario !== '' && rolUsuario === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3)


    const handleInputChange = (e, campo, valor, fila) => {

        const newList = convenioRecaudo.adquirencia.length > 0 ? convenioRecaudo.adquirencia.map(item => ({ ...item })) : [...listRecaudoSolicitud?.DATA];

        newList[fila][campo] = resetearPesos({ ...newList[fila], valor });

        newList[fila]['tarifaRemi'] = remi[fila + 1]

        newList[fila]['tarifaNegociada'] = remi[fila + 1] && convenioRecaudo.adquirencia[fila]?.punosNegociados !== '' ? (((parseFloat((remi[fila + 1].split('%'))[0])) / 100) + (parseInt(newList[fila]['punosNegociados'])) / 10000) * 100 : ''

        updateConvenioRecaudo('adquirencia', newList)

        document.getElementById(e.target.id).value = campo !== 'punosNegociados' && valor != '' ? conversionPesos({ valor }) : valor

    };



    return (
        <>
            <form id="frmSolicitud">
                <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                    <thead className="bg-coomeva_color-grisPestaña2">
                        <tr className={`text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                            {tablaEncabezado.map((head, i) => (
                                <th className={`align-bottom  font-semibold px-2 text-coomeva_color-rojo text-center  decoration-inherit  w-[15%]`} key={head} >{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listRecaudoSolicitud?.DATA?.map((adquirencia, i) => (
                                <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={adquirencia.idadquirencia}>
                                    <td>
                                        <input
                                            name={`${seccion}${i}`}
                                            id={`${seccion}${i}`}
                                            type="text"
                                            defaultValue={adquirencia.tipoAdquirencia}
                                            className={` bg-transparent   bg-opacity-40 w-full pl-2 outline-none h-8`}
                                            disabled={true}
                                        />
                                        <input name={`${seccion}idadquirencia${i}`} id={`${seccion}idadquirencia${i}`} defaultValue={adquirencia.idadquirencia} className={`hidden`} />
                                        <input name={`hidden${seccion}tipoAdquirencia${i}`} id={`hidden${seccion}tipoAdquirencia${i}`} defaultValue={adquirencia.tipoAdquirencia} className={`hidden`} />
                                    </td>
                                    <td>
                                        <input
                                            name={`${seccion}puntos${i}`}
                                            id={`${seccion}puntos${i}`}
                                            type="text"
                                            defaultValue={adquirencia.puntos}
                                            className={` bg-coomeva_color-grisPestaña2   bg-opacity-40 w-full  text-center outline-none h-8`}
                                            disabled={true}
                                        />
                                        <input name={`hidden${seccion}puntos${i}`} id={`hidden${seccion}puntos${i}`} defaultValue={adquirencia.puntos} className={`hidden`} />
                                    </td>
                                    <td>
                                    <input
                                            name={`${seccion}ticket${i}`}
                                            id={`${seccion}ticket${i}`}
                                            type="currency"
                                            defaultValue={convenioRecaudo.adquirencia[i]?.ticket ? conversionPesos({ valor: convenioRecaudo.adquirencia[i]?.ticket }) : ''}
                                            className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                            onBlur={(e) => handleInputChange(e, 'ticket', e.target.value, i)}
                                            autoComplete="off"
                                            onChange={(e) => { validarNumeroInputText(e) }}
                                            onFocus={(e) => {
                                                e.target.value = convenioRecaudo.adquirencia[i]?.ticket || adquirencia?.ticket || ''
                                                e.target.type = "currency";
                                            }}
                                            disabled={habilitarInput || habilitarInputs}
                                        />
                                    </td>
                                    <td>

                                        <input
                                            name={`${seccion}tarifaRemi${i}`}
                                            id={`${seccion}tarifaRemi${i}`}
                                            type="text"
                                            defaultValue={remi[i + 1] || ''}
                                            className={` bg-coomeva_color-grisPestaña2   bg-opacity-40 w-full  text-center outline-none h-8`}
                                            disabled={true}
                                        />
                                    </td>
                                    <td>

                                        <input
                                            name={`${seccion}facturacion${i}`}
                                            id={`${seccion}facturacion${i}`}
                                            type="currency"
                                            defaultValue={convenioRecaudo.adquirencia[i]?.facturacion ? conversionPesos({ valor: convenioRecaudo.adquirencia[i]?.facturacion }) : ''}
                                            className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                            onBlur={(e) => handleInputChange(e, 'facturacion', e.target.value, i)}
                                            autoComplete="off"
                                            onChange={(e) => { validarNumeroInputText(e) }}
                                            onFocus={(e) => {
                                                e.target.value = convenioRecaudo.adquirencia[i]?.facturacion || adquirencia?.facturacion || ''
                                                e.target.type = "currency";
                                            }}
                                            disabled={habilitarInput || habilitarInputs}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name={`${seccion}punosNegociados${i}`}
                                            id={`${seccion}punosNegociados${i}`}
                                            type="number"

                                            className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                            defaultValue={convenioRecaudo.adquirencia[i]?.punosNegociados || ''}
                                            onBlur={(e) => handleInputChange(e, 'punosNegociados', e.target.value, i)}
                                            autoComplete="off"
                                            disabled={habilitarInput || habilitarInputs}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name={`${seccion}tarifaNegociada${i}`}
                                            id={`${seccion}tarifaNegociada${i}`}
                                            type="percent"

                                            className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                            defaultValue={convenioRecaudo.adquirencia[i]?.tarifaNegociada ?
                                                conversionPesos({ valor: convenioRecaudo.adquirencia[i]?.tarifaNegociada, style: "percent", nDecimales: 2 }) : adquirencia?.tarifaNegociada ? conversionPesos({ valor: resetearPesos({ valor: adquirencia?.tarifaNegociada }), style: "percent", nDecimales: 2 }) : ''
                                            }
                                            onBlur={(e) => handleInputChange(e, 'tarifaNegociada', e.target.value, i)}
                                            onChange={(e) => { validarNumeroInputText(e) }}
                                            autoComplete="off"
                                            disabled={true}
                                            onFocus={(e) => {
                                                e.target.value = convenioRecaudo.adquirencia[i]?.tarifaNegociada || adquirencia?.tarifaNegociada || ''
                                                e.target.type = "percent";
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </form>

            <div className="w-full bg-white-700 -mt-4 flex justify-between items-center shadow-md border-b">
                <div className="flex justify-center items-center space-x-20">
                    <BtnControl
                        name={'Ayuda Tarifa Intercambio'}
                        url={'/radicacion/remi'}
                        enableButton={rolUsuario===2}
                        opcion={'navegar'}
                    />
                    <p className="text-sm font-semibold">MCC</p>
                </div>
                <h6 id='remiMcc' className=' mt-3 w-14 font-semibold text-center mr-4'>{remi[0]}</h6>


            </div>
        </>

    )
};