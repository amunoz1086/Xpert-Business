'use client'

import { conversionPesos, transformarCantidadPesos } from "@/app/lib/utils"
import BtnControl from "../../cliente/BtnControl"

const tablaEncabezado = ["No. CDT", " Tasa de interés", "Total interés", "Monto", "Fecha Apertura", "Tipo CDT"]

const dataResumenCredito = [{
  roIdcapt: 1,
  producto: "",
  monto: "",
  tasa: ""
}]


export const ResumenCDT = ({ cdt }) => {

  // {
  //   id: 1,
  //   nroCDT: '',
  //   producto: '7',
  //   numIdentificacion: '',
  //   monto: '0',
  //   interes: '',
  //   plazoApertura: '1',
  //   fechaVencimiento: '',
  //   fechaApertura: '2025-02-18',
  //   tipoTasa: '',
  //   spread: '',
  //   formaPago: '',
  //   frecuenciaPago: '',
  //   origenFondo: '',
  //   razonApertura: '',
  //   tipoTitulo: '',
  //   tipoIdT: '',
  //   tipoIdF: '',
  //   identificacionT: '',
  //   identificacionF: '',
  //   nombreT: '',
  //   nombreF: '',
  //   tipoCuentaT: '',
  //   tipoCuentaF: '',
  //   monto1: '',
  //   monto2: '74000000',
  //   saldoFavor1: '100000',
  //   saldoFavor2: '92700000',
  //   adicion1: '0',
  //   adicion2: '0',
  //   faltantes: '0',
  //   valorEfectivo: '0',
  //   valorChequeOtrosBanco: '0',
  //   valorDebito: '0',
  //   nuevo: true,
  //   guardar: false
  // }
  return (
    <main className=" bg-transparent h-full w-full mx-auto relative overflow-auto">
      <div className="container w-full">
        <fieldset className="border bg-white shadow-md rounded-md w-full">
          <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
            <h2 className="text-coomeva_color-rojo mt-4 w-60 text-center">CDT</h2>
          </legend>
          <div>
            <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
              <thead className="bg-coomeva_color-grisPestaña2">
                <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                  {tablaEncabezado?.map((head, i) => (
                    <th className={`align-bottom  px-2 text-coomeva_color-rojo  decoration-inherit  w-36`} key={head} >{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  cdt?.map((c, i) => (
                    <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={c.id}>
                      <td>
                        <input
                          id={`productoCaptacion${i}`}
                          type="text"
                          defaultValue={c.nroCDT}
                          className={` bg-transparent text-start  bg-opacity-40 w-full  outline-none h-8`}
                          disabled={true}

                        />
                      </td>
                      <td>
                        <input
                          id={`montoCaptacion${i}`}
                          type="text"
                          defaultValue={c.interes}
                          className={` bg-transparent text-center  bg-opacity-40 w-full   outline-none h-8`}
                          disabled={true}

                        />
                      </td>
                      <td>
                        <input
                          id={`tasaCaptacion${i}`}
                          type="text"
                          defaultValue={c.tasaBase}
                          className={` bg-transparent text-center  bg-opacity-40 w-full   outline-none h-8`}
                          disabled={true}

                        />
                      </td>
                      <td>
                        <input
                          id={`productoCaptacion${i}`}
                          type="text"
                          defaultValue={conversionPesos({ valor: c.monto })}
                          className={` bg-transparent text-start  bg-opacity-40 w-full  outline-none h-8`}
                          disabled={true}

                        />
                      </td>
                      <td>
                        <input
                          id={`montoCaptacion${i}`}
                          type="text"
                          defaultValue={c.fechaApertura}
                          className={` bg-transparent text-center  bg-opacity-40 w-full   outline-none h-8`}
                          disabled={true}

                        />
                      </td>
                      <td>
                        <input
                          id={`tasaCaptacion${i}`}
                          type="text"
                          defaultValue={c.tipoTitulo == 1 ? 'Físico' : c.tipoTitulo == 1 ? 'Desmaterializado' : ''}
                          className={` bg-transparent text-center  bg-opacity-40 w-full   outline-none h-8`}
                          disabled={true}

                        />
                      </td>

                    </tr>
                  ))
                }
              </tbody>
              <tfoot className=" w-full col-span-6">

                <tr className=" "  >
                  <td colSpan={6} className="text-end">
                    <BtnControl
                      name={'Ver detalle'}
                      url={'/radicacion/convenioServicios/cdt'}
                      enableButton={true}
                      opcion={'navegar'}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </fieldset>
      </div>
    </main>
  )
}
