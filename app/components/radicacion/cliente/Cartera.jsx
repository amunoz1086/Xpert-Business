'use client'

import { usePerfil } from "@/app/hooks/usePerfil"
import { conversionPesos } from "@/app/lib/utils"

export default function Cartera() {

    const {cliente}=usePerfil()

    return (
        <main className="p-1 flex">
            <div className="rounded-lg flex-col  w-full py-2 shadow-lg border border-gray-100">
                <section className="text-m  px-5 py-3 "><h2>Cartera</h2></section>

                <table className="w-full  text-sm bg-coomeva_color-grisPestaña2">
                    <thead>
                        <tr className="border-y text-left h-8 ">
                            <th></th>
                            <th className="text-coomeva_color-rojo ">Consumo</th>
                            <th className="text-coomeva_color-rojo">Hipotecario</th>
                            <th className="text-coomeva_color-rojo">Comercial</th>
                        </tr>
                    </thead>
                    <tbody className="text-coomeva_color-azulOscuro">
                        <tr className="border-y h-8 bg-white ">
                            <th className="text-left pl-12  text-coomeva_color-rojo">Promedio</th>
                            <td>
                                {cliente?.carteraConsumo && conversionPesos({ valor: cliente?.carteraConsumo || 0 })}
                            </td>
                            <td>
                                {cliente?.carteraHipotecario && conversionPesos({ valor: cliente?.carteraHipotecario || 0 })}
                            </td>
                            <td>
                                {cliente?.carteraComercial && conversionPesos({ valor: cliente?.carteraComercial || 0 })}
                            </td>
                        </tr>
                        <tr className="border-y h-8 ">
                            <th className="text-left pl-12 text-coomeva_color-rojo">Total Cartera</th>
                            <td >
                                {cliente?.totalCartera && conversionPesos({ valor: cliente?.totalCartera || 0 })}

                            </td>
                            <th className="text-left  text-coomeva_color-rojo">Calificación Actual</th>
                            <td >
                                {cliente?.calificacionActual || ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}
