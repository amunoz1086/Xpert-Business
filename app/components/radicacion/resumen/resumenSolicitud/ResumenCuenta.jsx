import React from 'react';
import BtnControl from '../../cliente/BtnControl';


const dataResumenCredito = [{
  roIdcapt: 1,
  modificar: "",
  cuentaNueva: ""
}];

const tablaEncabezado = ["Modificación plan", " Cuenta Nueva"];


export const ResumenCuenta = ({ cuenta }) => {

  console.log('resumen cuenta')

  console.log(cuenta)

  return (
    <main className=" bg-transparent h-full w-full mx-auto relative overflow-auto">
      <div className="container w-full">
        <fieldset className="border bg-white shadow-md rounded-md w-full">
          <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
            <h2 className="text-coomeva_color-rojo mt-4 w-60 text-center">Cuentas</h2>
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
                  (cuenta.filter(a => a.nuevo == false || a.modificarPlan != '' && a.modificarPlan != undefined))?.map((c, i) =>
                  (
                    <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={i}>
                      <td>
                        <input
                          id={`productoCaptacion${i}`}
                          type="text"
                          defaultValue={`No. Cuenta 0928372612 Plan Anterior ${c.modificarPlan != '' ? c.planActual : '-------'}  Plan Nuevo  ${c.modificarPlan != '' ? c.modificarPlan : '------'} tasa maxima ea`}
                          className={` bg-transparent text-start  bg-opacity-40 w-full  outline-none h-8 `}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <input
                          id={`montoCaptacion${i}`}
                          type="text"
                          defaultValue={`Plan ${c.nuevo == false && c.planActual != '' ? c.planActual : '------'} tasa  ${c.nuevo == false && c.tasaEA != '' ? c.tasaEA : '------'} `}
                          className={` bg-transparent text-center  bg-opacity-40 w-full   outline-none h-8`}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  )
                  )
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
};

export default ResumenCuenta;