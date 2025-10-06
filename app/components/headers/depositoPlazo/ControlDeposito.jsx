"use client";

import EncabezadoDepositoPlazo from '@/app/components/headers/depositoPlazo/EncabezadoDepositoPlazo';
import { ContenidoDepositoPlazo } from "@/app/components/radicacion/depositoPlazo/ContenidoDepositoPlazo";
import { Suspense, useState } from "react";


export default function ControlDeposito() {

  const [cdts, setCdts] = useState([]);

  const handleBusqueda = async (dataDepositoPlazo) => {
    try {
      if (dataDepositoPlazo === null) {
        setCdts([]);
        return
      };

      setCdts(dataDepositoPlazo);

    } catch (error) {
      console.error("Error al buscar CDT:", error);
      setCdts([]);
    };
  };

  return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%]">
    <EncabezadoDepositoPlazo
      urlImage="cabecera1"
      title="MENÚ"
      subtitle="Depósito a Plazo"
      enableInput={{ input1: true }}
      enableListDoc
      btnConsultar
      onBuscar={handleBusqueda}
    />
    <main className="flex-grow mb-10">
      <section className=' w-full '>
        <div className='flex space-x-20 items-center'>
          <div className='w-full'>
            <Suspense fallback={"loading depositocuent"}>
              <ContenidoDepositoPlazo dataDepositoPlazo={cdts} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  </section>
};