'use client'

import { usePerfil } from "@/app/hooks/usePerfil";
import { conversionPesos } from "@/app/lib/utils";


export default function Captacion() {

  const {cliente}=usePerfil()  

  return (
    <main className="p-1 flex">
      <div className="rounded-lg flex-col  w-full py-2 shadow-lg border border-gray-100">
        <section className="text-m  px-5 py-3 "><h2>Captación</h2></section>

        <table className="w-full bg-coomeva_color-grisPestaña2 text-sm">
          <thead>
            <tr className="border-y text-left h-8 ">
              <th></th>
              <th className="text-coomeva_color-rojo ">Corriente</th>
              <th className="text-coomeva_color-rojo">Ahorros</th>
              <th className="text-coomeva_color-rojo">CDT</th>
            </tr>
          </thead>
          <tbody className="text-coomeva_color-azulOscuro">
            <tr className="border-y h-8 bg-white ">
              <th className="text-left pl-12  text-coomeva_color-rojo">Promedio</th>
              <td>{
                cliente?.captacionCorriente !== undefined && conversionPesos({ valor: cliente?.captacionCorriente || 0 })
              }</td>
              <td>{
                cliente?.captacionAhorros !== undefined&& conversionPesos({ valor: cliente?.captacionAhorros || 0 })
              }</td>
              <td>{
                cliente?.captacionCdt!== undefined && conversionPesos({ valor: cliente?.captacionCdt || 0 })
              }</td>
            </tr>
            <tr className="border-y h-8 ">
              <th className="text-left"></th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="border-y h-8 bg-white">
              <th className="text-left pl-12 text-coomeva_color-rojo">Total Captación</th>
              <td colSpan={3}>{
                cliente?.totalCaptacion && conversionPesos({ valor: cliente?.totalCaptacion || 0 })

              }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
