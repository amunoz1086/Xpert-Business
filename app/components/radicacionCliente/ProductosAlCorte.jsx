'use client'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { conversionPesos, formatearFecha, transformarCantidadPesos, transformaValorPesos } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
//import SeccionDetalleCredito from './pj/SeccionDetalleCredito';

export const ProductosAlCorte = ({ existeReciprocidad = [], titulo, mostrarSeccion, keyObjectBodyId, keyObjectoHead, keyObjectoBody = [], headTable = [], bodyTable = [], marginTop = '' }) => {
  const [isTableVisible, setTableVisible] = useState(false);

  const tableRef = useRef(null);


  const scrollIzquierda = () => {
    if (tableRef.current) {
      tableRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };


  const scrollDerecha = () => {

    if (tableRef.current) {
      tableRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {

    const handleProductoAlCorte = (e) => {

      setTableVisible(e.detail)
    };

    window.addEventListener("productoAlcorte", handleProductoAlCorte);

    return () => {
      window.removeEventListener("productoAlcorte", handleProductoAlCorte);

    };
  }, []);

  return (
    <div className={`w-full mt-12 mt-${marginTop}`}>

      <div

        className={`overflow-hidden w-full transition-all duration-500 ease-in-out ${isTableVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        {
          mostrarSeccion ?
            <>
              <div className="w-full flex">
                <div className="w-full text-xs "><p>Producto al corte</p></div>
                <div className="w-full flex justify-end">icono</div>
              </div>
              <hr className="w-full border  mb-8" />
            </> : undefined
        }


        <div className='flex justify-between items-center mb-2'>
          <div>
            <p className=" text-xs">{titulo}</p>
          </div >
          <div className=" flex space-x-2">
            {/* Botón para desplazar a la izquierda */}
            <button
              onClick={scrollIzquierda}
              className=" px-[0.42rem] py-2  rounded-full text-gray-600 border  border-gray-500 hover:bg-gray-300 transition"
            >
              <FaChevronLeft className='h-3 w-4' />
            </button>

            {/* Botón para desplazar a la derecha */}
            <button
              onClick={scrollDerecha}
              className=" px-[0.42rem] py-2 rounded-full text-gray-600 border  border-gray-500 hover:bg-gray-300 transition"
            >
              <FaChevronRight className='h-3 w-4' />
            </button>
          </div>
        </div>
        <div ref={tableRef} className="overflow-x-auto whitespace-nowrap scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full">
          <table className="w-full table-fixed text-xs font-light">
            <thead className=" w-full text-white rounded-md">
              <tr className="rounded- bg-coomeva_color-rojo ">
                {
                  headTable.map((item, i) => (
                    <th key={item[keyObjectoHead.id] + 'head'} className={`p-2 w-60 ${i == 0 ? 'rounded-tl-md' : undefined}  ${i == (headTable.length - 1) ? 'rounded-tr-md' : undefined}`}>{item[keyObjectoHead.descripcion]}</th>
                  ))
                }

              </tr>
            </thead>
            {
              titulo != 'Créditos'
                ?
                <tbody className="">


                  {
                    bodyTable.map((item, i) => (
                      <tr key={item[keyObjectBodyId]} className={`${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} `}>
                        {
                          keyObjectoBody.map((key, i) => (
                            <td key={`${i}td`} className="p-2 border "><p className="text-[#1f5675] text-xs font-normal">{
                              key.toLowerCase().includes("fecha") ?
                                // formatearFecha({fecha: item[key]})
                                item[key]

                                : key.toLowerCase().includes("monto") || key.toLowerCase().includes("saldo")
                                  ? conversionPesos({ valor: item[key], nDecimales: 3 }) :
                                  key.toLowerCase().includes("tasaEA") ? transformarCantidadPesos({ cantidad: item[key], decimales: 2, signo: '%' })
                                    : item[key]}</p></td>
                          ))
                        }
                      </tr>
                    ))
                  }


                  {
                    existeReciprocidad.length > 0 ?
                      existeReciprocidad.map((item, i) => (
                        <tr key={item.codCliente + 'rexipo'} className="mt-3">{conversionPesos({ valor: item.monto })}</tr>
                      ))

                      :
                      undefined
                  }


                </tbody>
                :
                bodyTable.map((credito, i) => (
                  <tbody key={i + 'creditoc'} className={`shadow-md border-b-2  `}>
                    <tr className="bg-white">
                      <td className="p-2 ">{credito?.descripcion || ''}</td>
                      <td className="p-2  text-center">{conversionPesos({ valor: credito?.montoTotalCupo, nDecimales: 3 }) || ''}</td>
                      <td className="p-2 text-center">{conversionPesos({ valor: credito?.cupoUtilizado, nDecimales: 3 }) || ''}</td>
                      <td className="p-2 text-center">{formatearFecha({ fecha: credito?.fechaAproCupo }) || ''}</td>
                      <td className="p-2 text-center">{formatearFecha({ fecha: credito?.fechaVenciCupo }) || ''}</td>
                      <td className="p-2 text-center">{conversionPesos({ valor: credito?.cupoDisponible, nDecimales: 3 }) || ''}</td>
                      <td className="p-2 text-center">{credito?.diasVigencia || ''}</td>

                      <td className="p-2 text-center">{credito?.tasaReferencia || ''}</td>

                    </tr>
                    <tr className="bg-coomeva_color-grisSombra ">
                      <td className="p-2  "></td>
                      <td className="p-2  text-center ">Numero de obligacion de cartera</td>
                      <td className="p-2  text-center">Linea</td>
                      <td className="p-2 text-center">Monto desembolso</td>
                      <td className="p-2  text-center">Fecha desembolso</td>
                      <td className="p-2 text-center">Plazo(meses)</td>
                      <td className="p-2 text-center">Tasa de referencia</td>
                      <td className="p-2 text-center">Spread/Tasa Fija</td>
                      <td className="p-2 text-center">Saldo a capital</td>
                      <td className="p-2 text-center">Garantia</td>
                      <td className="p-2 text-center">Calificación</td>
                      <td className="p-2 text-center">Estado</td>
                      <td className="p-2 text-center">Días de mora</td>
                      <td className="p-2 text-center">Pago mínimo</td>
                      <td className="p-2 text-center">Pago total</td>
                      <td className="p-2 text-center">Redescuento</td>
                      <td className="p-2 text-center">Spread Redescuento</td>

                    </tr>
                    <tr className="bg-white">
                      <td className="p-2 ">Utilizacion</td>
                      <td className="p-2  text-center">1026</td>
                      <td className="p-2 text-center">Sobregiro</td>
                      <td className="p-2 text-center">$60.000.000</td>
                      <td className="p-2 text-center">1/1/25</td>
                      <td className="p-2 text-center">1</td>
                      <td className="p-2 text-center">Tasa fija</td>
                    </tr>
                    <tr className="bg-coomeva_color-grisSombra">
                      <td className="p-2 " colSpan={2}><h4 className='text-gray-500 font-bold'>sección 2 Sobregiro</h4></td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-2 ">Cupo</td>

                      <td className="p-2  text-center">$3500.0000.000</td>
                      <td className="p-2 text-center">$2.500.000</td>
                      <td className="p-2 text-center">12/15/23</td>
                      <td className="p-2 text-center">1/1/25</td>
                      <td className="p-2 text-center">1.000.000</td>
                      <td className="p-2 text-center">555</td>
                    </tr>
                    <tr className=" bg-coomeva_color-grisSombra">

                      <td className="p-2  "></td>
                      <td className="p-2  text-center ">Numero de obligacion de cartera</td>
                      <td className="p-2  text-center">Linea</td>
                      <td className="p-2 text-center">Monto desembolso</td>
                      <td className="p-2  text-center">Fecha desembolso</td>
                      <td className="p-2 text-center">Plazo(meses)</td>
                      <td className="p-2 text-center">Tasa de referencia</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-2 ">Utilizacion</td>

                      <td className="p-2  text-center">1026</td>
                      <td className="p-2 text-center">Sobregiro</td>
                      <td className="p-2 text-center">$60.000.000</td>
                      <td className="p-2 text-center">1/1/25</td>
                      <td className="p-2 text-center">1</td>
                      <td className="p-2 text-center">Tasa fija</td>
                    </tr>


                    <tr className="bg-coomeva_color-grisSombra">
                      <td className="p-2  text-gray-500 font-bold" colSpan={2} >Sección 3 crédito específico</td>
                    </tr>
                    {/* <tr className="bg-white">
                      <td className="p-2 ">Cupo</td>

                      <td className="p-2  text-center">$3500.0000.000</td>
                      <td className="p-2 text-center">$2.500.000</td>
                      <td className="p-2 text-center">12/15/23</td>
                      <td className="p-2 text-center">1/1/25</td>
                      <td className="p-2 text-center">1.000.000</td>
                      <td className="p-2 text-center">555</td>
                    </tr> */}
                    <tr className=" bg-coomeva_color-grisSombra">

                      <td className="p-2  "></td>
                      <td className="p-2  text-center ">Numero de obligacion de cartera</td>
                      <td className="p-2  text-center">Linea</td>
                      <td className="p-2 text-center">Monto desembolso</td>
                      <td className="p-2  text-center">Fecha desembolso</td>
                      <td className="p-2 text-center">Plazo(meses)</td>
                      <td className="p-2 text-center">Tasa de referencia</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-2 ">-</td>

                      <td className="p-2  text-center">1026</td>
                      <td className="p-2 text-center">Sobregiro</td>
                      <td className="p-2 text-center">$60.000.000</td>
                      <td className="p-2 text-center">1/1/25</td>
                      <td className="p-2 text-center">1</td>
                      <td className="p-2 text-center">Tasa fija</td>
                    </tr>
                  </tbody>
                ))




            }


          </table>
        </div>

      </div>
    </div>
  );
}