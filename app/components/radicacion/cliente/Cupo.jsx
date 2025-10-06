'use client'

import { usePerfil } from "@/app/hooks/usePerfil";
import { conversionPesos } from "@/app/lib/utils";


export default function Cupo() {

  const { cliente } = usePerfil()
  return (
    <main className="p-1 flex">
      <div className="rounded-lg flex-col  w-full py-2 shadow-lg border border-gray-100">
        <section className="text-m text-coomeva_color-grisLetras px-5 py-3 "><h2>Cupo</h2></section>

        <table className="w-full bg-coomeva_color-grisPestaña2 text-sm">
          <thead>
            <tr className="border-y text-left h-8 ">
              <th className="text-coomeva_color-rojo ">Cupo Consumo</th>
              <th className="text-coomeva_color-rojo">Cupo Comercial</th>
            </tr>
          </thead>
          <tbody className="text-coomeva_color-azulOscuro">
            <tr className="border-y h-8 ml-4 bg-white ">
              <td>{
                cliente?.cupoConsumo && conversionPesos({ valor: cliente?.cupoConsumo || 0 })

              }</td>
              <td>{
                cliente?.cupoComercial && conversionPesos({ valor: cliente?.cupoComercial || 0 })
              }</td>
            </tr>
            <tr className="border-y h-8 bg-white">
              <td></td>
              <td></td>

            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

