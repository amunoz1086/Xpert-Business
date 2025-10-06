'use client'


import { conversionPesos, resetearPesos, validarNumeroInputText } from "@/app/lib/utils";
import { useProvider } from "@/app/provider/Providers";


import { useContext, useEffect, useState, } from "react";



const tablaEncabezado = [
    "Credibanco VP",
    "Redeban VP",
    "Credibanco VNP",
    "Redeban VNP",
    "Redeban Micropagos",
    "Credibanco Vending",
    "Credibanco Tr. Masivo",
    "Total"
]


export default function TablaRecaudoRedes({  rolUsuario }) {

    const { updateConvenioRecaudo, convenioRecaudo, estadoSolicitud } =useProvider()

    const [redes, setRedes] = useState({
        "credibanVp": convenioRecaudo.redes?.credibanVp || '',
        "redebanVp": convenioRecaudo.redes?.redebanVp || '',
        "credibancoVnp": convenioRecaudo.redes?.credibancoVnp || '',
        "redebanVnp": convenioRecaudo.redes?.redebanVnp || '',
        "redebanMicropagos": convenioRecaudo.redes?.redebanMicropagos || '',
        "credibancoVendig": convenioRecaudo.redes?.credibancoVendig || '',
        "credibancoTrMasivo": convenioRecaudo.redes?.credibancoTrMasivo || '',
        "total": convenioRecaudo.redes?.total || ''
    })

    const habilitarInput = (rolUsuario !== '' && rolUsuario !== 2) || (rolUsuario !== '' && rolUsuario === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3)

    const handleInputChange = (e, campo, valor, fila) => {

        if (valor < 0 || valor > 100) return

        setRedes(redesActual => ({
            ...redesActual, [campo]: valor
        }))



    };

    const handleInputOnBlur = () => {

        let total = (redes.credibanVp !== '' ? parseInt(redes.credibanVp) : 0) +
            (redes.redebanVp !== '' ? parseInt(redes.redebanVp) : 0) +
            (redes.credibancoVnp !== '' ? parseInt(redes.credibancoVnp) : 0) +
            (redes.redebanVnp !== '' ? parseInt(redes.redebanVnp) : 0) +
            (redes.redebanMicropagos !== '' ? parseInt(redes.redebanMicropagos) : 0) +
            (redes.credibancoVendig !== '' ? parseInt(redes.credibancoVendig) : 0) +
            (redes.credibancoTrMasivo !== '' ? parseInt(redes.credibancoTrMasivo) : 0)

        setRedes(redesActual => ({
            ...redesActual,
            ['total']: total

        }))

        updateConvenioRecaudo('redes', { ...redes, ['total']: total })

        let validarCompletos = redes.credibanVp !== '' && redes.redebanVp !== '' && redes.credibancoVnp !== '' &&
            redes.redebanVnp !== '' && redes.redebanMicropagos !== '' && redes.credibancoVendig !== '' &&
            redes.credibancoTrMasivo !== ''


        let validarCamposVacios = redes.credibanVp == '' || redes.redebanVp == '' || redes.credibancoVnp == '' ||
            redes.redebanVnp == '' || redes.redebanMicropagos == '' || redes.credibancoVendig == '' ||
            redes.credibancoTrMasivo == ''

       

    }



   
    return (
        <form className="container w-full">
            <fieldset className="border bg-white shadow-md rounded-md w-full">
                <div>
                    <table className={`table-fixed  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                        <thead className="bg-coomeva_color-grisPestaña2">
                            <tr className={`  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                {tablaEncabezado.map((head) => (
                                    <th className={`align-bottom  px-2 text-center' text-coomeva_color-rojo text-sm  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="w-10">
                                    <input
                                        name={`credibanVp`}
                                        id={`credibanVp`}
                                        type="number"
                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        value={redes.credibanVp}
                                        onChange={(e) => handleInputChange(e, 'credibanVp', e.target.value)}
                                        autoComplete="off"
                                        onBlur={handleInputOnBlur}

                                        disabled={habilitarInput}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`redebanVp`}
                                        id={`redebanVp`}
                                        type="number"
                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        value={redes.redebanVp}
                                        onChange={(e) => handleInputChange(e, 'redebanVp', e.target.value)}
                                        autoComplete="off"
                                        onBlur={handleInputOnBlur}

                                        disabled={habilitarInput}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`credibancoVnp`}
                                        id={`credibancoVnp`}
                                        type="number"
                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        value={redes.credibancoVnp}
                                        onChange={(e) => handleInputChange(e, 'credibancoVnp', e.target.value)}
                                        autoComplete="off"
                                        onBlur={handleInputOnBlur}
                                        disabled={habilitarInput}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`redebanVnp`}
                                        id={`redebanVnp`}
                                        type="number"
                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        value={redes.redebanVnp}
                                        onChange={(e) => handleInputChange(e, 'redebanVnp', e.target.value)}
                                        autoComplete="off"
                                        onBlur={handleInputOnBlur}
                                        disabled={habilitarInput}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`redebanMicropagos`}
                                        id={`redebanMicropagos`}
                                        type="number"
                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        value={redes.redebanMicropagos}
                                        onChange={(e) => handleInputChange(e, 'redebanMicropagos', e.target.value)}
                                        onBlur={handleInputOnBlur}
                                        autoComplete="off"
                                        disabled={habilitarInput}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`credibancoVendig`}
                                        id={`credibancoVendig`}
                                        type="number"
                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        value={redes.credibancoVendig}
                                        onChange={(e) => handleInputChange(e, 'credibancoVendig', e.target.value)}
                                        onBlur={handleInputOnBlur}
                                        autoComplete="off"
                                        disabled={habilitarInput}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`credibancoTrMasivo`}
                                        id={`credibancoTrMasivo`}
                                        type="number"
                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        value={redes.credibancoTrMasivo}
                                        onChange={(e) => handleInputChange(e, 'credibancoTrMasivo', e.target.value)}
                                        onBlur={handleInputOnBlur}
                                        autoComplete="off"
                                        disabled={habilitarInput}
                                    />
                                </td>
                                <td>
                                    <input
                                        name={`total`}
                                        id={`total`}

                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                        value={`${redes.total} ${redes.total !== '' ? '%' : ''}`}
                                        onChange={(e) => { }}
                                        autoComplete="off"
                                        disabled={true}
                                    />
                                </td>
                            </tr>

                        </tbody>

                    </table>
                </div>
            </fieldset>

           
        </form>
    )
}