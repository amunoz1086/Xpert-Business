'use client'

import { conversionPesos, resetearPesos } from "@/app/lib/utils";
import {  useState } from "react";

export default function TipoCuenta({ seccion, listTipoCuenta, idFormulario, propiedad, subPropiedad,habilitarInput,headTable,desactivarFormato=false,updateConfiguracion, configuracion }) {


  let tableBody = [
    {
      id: 1,
      cuenta: "",
      numCuenta: '',
      porcentaje: ""
    },
    {
      id: 2,
      cuenta: "",
      numCuenta: '',
      porcentaje: ""
    }, {
      id: 3,
      cuenta: "",
      numCuenta: '',
      porcentaje: ""
    }
  ]

  const tipoCuentaContext = configuracion[propiedad][subPropiedad]

  const [filas, setFilas] = useState(tipoCuentaContext.length>0?tipoCuentaContext:[...tableBody])


 

  const handleInputChange = (e, campo, valor, fila) => {


    const newList =  [...filas]

    newList[fila][campo] =resetearPesos({valor:valor})

    updateConfiguracion(propiedad, subPropiedad, newList)

    document.getElementById(e.target.id).value = campo !== 'cuenta' && campo !=='numCuenta'&&desactivarFormato===false ?conversionPesos({valor:valor,nDecimales:2,style:'percent'}) : valor
  };

  const onKeyAgregarFilaEnter = (e) => {


      if (e.key === 'Enter') {
          setFilas([...filas, ...[{
              id: filas.length+1,
              cuenta: "",
               numCuenta: '',
              porcentaje: ""
          }]])
      }

  }

  return (
    <div className="container w-full">
      <fieldset className="border bg-white shadow-md rounded-md w-full">
        <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
          <h2 className="text-coomeva_color-rojo mt-4 w-60 text-center">Tipo de cuenta</h2>
        </legend>
        <form id={idFormulario} className="h-[10rem] overflow-y-scroll">
          <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
            <thead className="bg-coomeva_color-grisPestaña2 sticky top-0">
              <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                {headTable.map((head, i) => (
                  <th className={`align-bottom text-start px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={`${head}${i}`} >{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                filas?.map((servicio, i) => (
                  <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.id}>
                    <td className="flex justify-center">

                      <select
                        id={`${seccion}cuenta${i}`}
                        name={`${seccion}cuenta${i}`}
                        defaultValue={tipoCuentaContext[i]?.cuenta|| 'default'}
                        onBlur={(e)=>{handleInputChange(e,'cuenta',e.target.value,i)}}
                        disabled={habilitarInput}
                        className='w-44 h-7 font-normal  text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4' >
                        
                         <option value={"default"} >Seleccionar</option>
                        {listTipoCuenta.DATA?.map((op, i) => (
                          <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        id={`${seccion}numCuenta${i}`}
                        name={`${seccion}numCuenta${i}`}
                        type="number"
                        disabled={habilitarInput}
                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                        defaultValue={tipoCuentaContext[i]?.numCuenta || ''}
                        onBlur={(e)=>{handleInputChange(e,'numCuenta',e.target.value,i)}}
                        autoComplete="off"
                      />

                    </td>
                    <td>
                      <input
                        id={`${seccion}porcentaje${i}`}
                        name={`${seccion}porcentaje${i}`}
                        type= {`${desactivarFormato}?:"text":"percent"`}
                        disabled={habilitarInput}
                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                        defaultValue={tipoCuentaContext[i]?.porcentaje || ''}
                        onBlur={(e)=>{handleInputChange(e,'porcentaje',e.target.value,i)}}
                        onFocus={(e) =>
                           (e.target.value = tipoCuentaContext[i]?.porcentaje||'')
                        }
                        autoComplete="off"
                        // onBlur={onBlurInput}
                        onKeyUp={onKeyAgregarFilaEnter}
                      />
                    </td>

                  </tr>
                ))
              }
            </tbody>

          </table>
        </form>
      </fieldset>
    </div>
  )
}



/**
 * CODIGO FUE OPTIMIZADO BORRAR CUANDO PASE APRODUCCION
 */



  // const handleInputChange = (e) => {

  //   document.getElementById(e.target.id).value = e.target.value

  //   const currenForm = document.getElementById(idFormulario)

  //   if (currenForm) {

  //     const formData = new FormData(currenForm);

  //     const data = dataFormularioOrdenada({ formularioRef: formData, seccion: seccion })

  //     updateConfiguracion(propiedad, subPropiedad, data)

  //   }
  // };
  
  // const onBlurInput = (e) => {

  //   const signo = (e.target.id).includes('porcentaje') ? '%' : 'COP'

  //   const valorTransformado = transformaValorPesos(e.target.value, 1, signo)

  //   document.getElementById(e.target.id).value = valorTransformado

  // }
