'use client'

import EstructuraTabla from "../../share/EstructuraTabla"
import { dataFormularioOrdenada } from "@/app/lib/utils";


const bodyTable = [
  {
    id: 1,
    numCuenta: 12321,
    tipoCuenta: "1"
  }
]


export default function CuentaRecaudadora({headTable ,listTipoCuenta, seccion, idFormulario, propieadd, subPropiedad,habilitarInput,updateConfiguracion, configuracion }) {

  const infoContext = configuracion[propieadd][subPropiedad]

  const onBlurInputUpdateContext = () => {
    const currenForm = document.getElementById(idFormulario)

    if (currenForm) {

      const formData = new FormData(currenForm);

      const data = dataFormularioOrdenada({ formularioRef: formData, seccion: seccion })

      updateConfiguracion(propieadd, subPropiedad, data)

    }
  }



  return (
    <EstructuraTabla titulo={'tipo cuenta'} hidden={true}>
      <form id={idFormulario}>
        <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
          <thead className="bg-coomeva_color-grisPestaña2">
            <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
              {headTable.map((head, i) => (
                <th className={`align-bottom text-start px-2 text-coomeva_color-rojo  decoration-inherit  w-[100%]`} key={head} >{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              bodyTable?.map((servicio, i) => (
                <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.id}>
                  <td>

                    <input
                      id={`${seccion}numeroCuenta${i}`}
                      name={`${seccion}numeroCuenta${i}`}
                      type="number"
                      className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                      defaultValue={infoContext[i]?.numeroCuenta || ''}
                      // onChange={handleInputChange}
                      onBlur={onBlurInputUpdateContext}
                      disabled={habilitarInput}
                      autoComplete="off"
                    />
                  </td>
                  <td className="flex justify-center">

                    <select
                      id={`${seccion}tipoCuenta${i}`}
                      name={`${seccion}tipoCuenta${i}`}
                      defaultValue={infoContext[i]?.tipoCuenta}
                      // onChange={handleInputChange}
                      onBlur={onBlurInputUpdateContext}
                      disabled={habilitarInput}
                      className='w-44 h-7 font-normal  text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4'>
                      <option defaultValue={"default"} >Seleccionar</option>
                      {listTipoCuenta.DATA?.map((op, i) => (
                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                      ))}
                    </select>

                  </td>


                </tr>
              ))
            }
          </tbody>

        </table>
      </form>
    </EstructuraTabla>
  )
}

