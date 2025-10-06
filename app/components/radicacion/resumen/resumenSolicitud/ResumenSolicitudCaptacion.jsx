'use client'

import BtnControl from "../../cliente/BtnControl";
import { conversionPesos } from "@/app/lib/utils";


const tablaEncabezado = ["Producto", "Monto", "Tasa"];
const dataResumenCredito = [{
  roIdcapt: 1,
  producto: "",
  monto: "",
  tasa: ""
}];


const ResumenSolicitudCaptacion = ({ depositoVista,resetResultados }) => {

  return <main className=" bg-transparent h-full w-full mx-auto relative overflow-auto">
    <div className="container w-full">
      <fieldset className="border bg-white shadow-md rounded-md w-full">
        <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
          <h2 className="text-coomeva_color-rojo mt-4 w-60 text-center">Captación</h2>
        </legend>
        <div>
          <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
            <thead className="bg-coomeva_color-grisPestaña2">
              <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                {tablaEncabezado?.map((head, i) => (
                  <th className={`align-bottom  px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                dataResumenCredito?.map((servicio, i) => (
                  <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.roIdcapt}>
                    <td>
                      <input
                        id={`productoCaptacion${i}`}
                        type="text"
                        defaultValue={depositoVista?.tipoCuenta === '1' ? 'Ahorros' : depositoVista?.tipoCuenta === '2' ? 'Corriente' : '--'}
                        className={`bg-transparent text-center bg-opacity-40 w-full outline-none h-8`}
                        disabled={true}
                      />
                    </td>
                    <td>
                      <input
                        id={`montoCaptacion${i}`}
                        type="text"
                        defaultValue={conversionPesos({ valor: depositoVista?.planRemuracion.monto === "" ? 0 : depositoVista?.planRemuracion.monto, nDecimales: 0, style: "currency" })}
                        className={` bg-transparent text-center bg-opacity-40 w-full outline-none h-8`}
                        disabled={true}
                      />
                    </td>
                    <td>
                      <input
                        id={`tasaCaptacion${i}`}
                        type="text"
                        defaultValue={conversionPesos({ valor: depositoVista?.planRemuracion.tasa === "" ? 0 : depositoVista?.planRemuracion.tasa, nDecimales: 2, style: "percent" })}
                        className={` bg-transparent text-center  bg-opacity-40 w-full   outline-none h-8`}
                        disabled={true}
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot className=" w-full col-span-3">
              <tr className=" ">
                <td colSpan={5} className="text-end">
                  <BtnControl
                    name={'Ver detalle'}
                    url={'/radicacion/depositoVista'}
                    enableButton={depositoVista?.tipoCuenta === '' ? false : true}
                    opcion={'navegar'}
                    resetResultados={resetResultados}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </fieldset>
    </div>
  </main>
}

export default ResumenSolicitudCaptacion