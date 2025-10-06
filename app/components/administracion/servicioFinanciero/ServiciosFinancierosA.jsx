import { queryServiciosFinancieros } from "@/app/lib/administracion/querys";
import ItemServiciosFinanciero from "./ItemServiciosFinanciero";


const ServicioFinancieroA = async ({ listaSiNo = [], listaReciprocidadMinima = [] }) => {

  const serviciosFinancieros = await queryServiciosFinancieros()

  return (
    <div className="flex flex-col justify-center items-center w-[90%] mt-20  mx-auto my-auto ">
      <div className="grid grid-cols-4 w-full h-full text-coomeva_color-rojo font-semibold ">
        <p className="w-full border ">
          Servicios Financieros
        </p>
        <p className="w-full border  text-center">
          Tarifa Plena
        </p>
        <p className="w-full border  text-center">
          Tarifa Costo
        </p>
        <p className="w-full border  text-center">
          Obligatorio
        </p>
      </div>
      <ItemServiciosFinanciero
        listaSelect={listaSiNo?.DATA || []}
        serviciosFinancieros={JSON.parse(serviciosFinancieros)?.DATA || []}
        listaReciprocidadMinima={listaReciprocidadMinima?.DATA}
      />

    </div>
  );
};

export default ServicioFinancieroA;