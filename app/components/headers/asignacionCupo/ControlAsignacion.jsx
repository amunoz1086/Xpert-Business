"use client";

import EncabezadoAsignacionCupo from '@/app/components/headers/asignacionCupo/EncabezadoAsignacionCupo';
import { ContenidoAsignar } from "@/app/components/radicacion/asignarCupo/ContenidoAsignar";
import { Suspense, useState } from "react";


export default function ControlAsignacion() {

  const [cuentas, setCuentas] = useState([]);

  const handleBusqueda = async (dataCuentas) => {

    try {
      if (dataCuentas === null) {
        setCuentas([]);
        return
      };

      setCuentas(dataCuentas);

    } catch (error) {
      console.error("Error al buscar cuentas:", error);
      setCuentas([]);
    }

  };

  return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%]">
    <EncabezadoAsignacionCupo
      urlImage="cabecera1"
      title="MENÚ"
      subtitle="Asignar Cupo"
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
              <ContenidoAsignar datos={cuentas} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  </section>
};