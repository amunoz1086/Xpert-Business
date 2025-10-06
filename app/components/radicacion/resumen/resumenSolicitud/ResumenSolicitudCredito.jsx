
import BtnControl from "../../cliente/BtnControl";

import { conversionPesos } from "@/app/lib/utils";

const tablaEncabezado = ['Producto', 'Monto', 'Plazo', 'Spread', 'FNG']

const dataResumenCredito = [
  {
    comercial: 'Cupo',
    monto: "",
    spreadIbr: "",
    plazo: "",
    spreadRedescuento: "",
    modalidadTasa: "",

    coberturaFng: "",
    Tipo_RDTO: "",
    codCupo: 200,


},
{
  comercial: 'Tesorería',
  monto: "0",
  spreadIbr: "0",
  plazo: "0",
  spreadRedescuento: "0",
  modalidadTasa: "0",

  coberturaFng: "0",
  Tipo_RDTO: "0",
  codCupo: 100,


}
];


export default function ResumenSolicitudCredito({  creditoNuevo,resetResultados }) {

  const sumaTotal = (creditoNuevo || [])?.reduce((acumulador, fila) => {

    const clavesValidas = Object.keys(fila).filter(
      (clave) => clave !== 'codCupo' && clave !== 'comercial'
    );


    const sumaFila = clavesValidas.reduce((suma, clave) => {
      const valor = parseFloat(fila[clave]);
      return !isNaN(valor) ? suma + valor : suma;
    }, 0);

    return acumulador + sumaFila;
  }, 0);


  return (
    <main className=" bg-transparent h-full w-full mx-auto relative overflow-auto ">
      <div className="container w-full">
        <fieldset className="border bg-white shadow-md rounded-md w-full">
          <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
            <h2 className="text-coomeva_color-rojo mt-4 w-60 text-center">Crédito</h2>
          </legend>
          <div className="h-[8rem] overflow-y-scroll ">
            <table className={`table-auto w-[99%] text-sm  mx-auto mb-3 text-start  `}>
              <thead className="bg-coomeva_color-grisPestaña2 sticky top-0">
                <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                  {tablaEncabezado?.map((head, i) => (
                    <th className={`align-bottom text-center  px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  (creditoNuevo.length>0?creditoNuevo: dataResumenCredito)?.map((servicio, i) => (
                    <tr className={`text-[#002E49] text-center ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.codCupo}>
                      <td>
                        <input
                          id={`producto${i}`}
                          type="text"
                          defaultValue={servicio.comercial}
                          className={` bg-transparent  font-bold  text-coomeva_color-rojo ml-2   bg-opacity-40 w-full   outline-none h-8`}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <input
                          id={`montoCredito${i}`}
                          type="text"
                          defaultValue={conversionPesos({ valor: servicio.monto === '' ? 0 : servicio.monto })}
                          className={` bg-transparent  text-center  bg-opacity-40 w-full   outline-none h-8`}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <input
                          id={`plazo${i}`}
                          type="text"
                          defaultValue={servicio?.plazo || 0}
                          className={`${i === 2 ? 'text-coomeva_color-rojo font-bold ' : undefined} bg-transparent text-center   bg-opacity-40 w-full   outline-none h-8`}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <input
                          id={`spread${i}`}
                          type="text"
                          defaultValue={
                            conversionPesos({ valor: servicio.spreadIbr === '' ? 0 : servicio.spreadIbr, style: "percent", nDecimales: 2 })
                          }
                          className={` bg-transparent   bg-opacity-40 w-full  text-center  outline-none h-8`}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <input
                          id={`fng${i}`}
                          type="text"
                          defaultValue={
                            conversionPesos({ valor: servicio.coberturaFng === '' ? 0 : servicio.coberturaFng, style: "percent", nDecimales: 2 })
                          }
                          className={` bg-transparent   bg-opacity-40 w-full   outline-none text-center h-8`}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-end mb-2">
            <BtnControl
              name={'Ver detalle'}
              url={'/radicacion/convenioServicios/creditoNuevo'}
              enableButton={sumaTotal === 0 ? false : true}
              opcion={'navegar'}
              resetResultados={resetResultados}
            />
          </div>
        </fieldset>
      </div>
    </main>
  );
};