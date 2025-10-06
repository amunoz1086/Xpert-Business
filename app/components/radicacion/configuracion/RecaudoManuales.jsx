'use client'

import {  useState } from "react";
import EstructuraTabla from "../../share/EstructuraTabla"

const headTable = ["Nombre del Campo", "Tipo Campo"]

export default function RecaudoManuales({ seccion, idFormulario, propiedad, subPropiedad, habilitarInput,updateConfiguracion, configuracion }) {

  const bodytabl = [
    {
      id: '1',
      nombreCampo: '',
      tipoCampo: ''
    },
    {
      id: '2',
      nombreCampo: '',
      tipoCampo: ''
    }, {
      id: '3',
      nombreCampo: '',
      tipoCampo: ''
    }
  ]

  const infoContext = configuracion[propiedad][subPropiedad]

  const [filas, setFilas] = useState(infoContext?.length > 0 ? infoContext : [...bodytabl])

  const handleInputChange = (e, campo, valor, fila) => {


    const newList = [...filas]

    newList[fila][campo] = valor

    updateConfiguracion(propiedad, subPropiedad, newList)

    document.getElementById(e.target.id).value = valor
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
    <div className='w-full '>
      <p className='text-coomeva_color-azulOscuro text-sm'>* Uso exclusivo para recaudos manuales</p>
      <EstructuraTabla titulo={'Recaudo Manual'} hidden={true}>
        <form id={idFormulario} className="h-[10rem] overflow-y-scroll">
          <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
            <thead className="bg-coomeva_color-grisPestaña2 sticky top-0">
              <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                {headTable.map((head, i) => (
                  <th className={`align-bottom text-start px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                filas?.map((servicio, i) => (
                  <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.id}>
                    <td>
                      <input
                        id={`${seccion}nombreCampo${i}`}
                        name={`${seccion}nombreCampo${i}`}
                        type="text"

                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                        defaultValue={infoContext[i]?.nombreCampo || ''}
                        // onChange={handleInputChange}
                        onBlur={(e) => { handleInputChange(e, 'nombreCampo', e.target.value, i) }}
                        onKeyUp={onKeyAgregarFilaEnter}
                        disabled={habilitarInput}
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        id={`${seccion}tipoCampo${i}`}
                        name={`${seccion}tipoCampo${i}`}
                        type="text"

                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                        defaultValue={infoContext[i]?.tipoCampo || ''}
                        // onChange={handleInputChange}
                        onBlur={(e) => { handleInputChange(e, 'tipoCampo', e.target.value, i) }}
                        onKeyUp={onKeyAgregarFilaEnter}
                        disabled={habilitarInput}
                        autoComplete="off"
                      />

                    </td>


                  </tr>
                ))
              }
            </tbody>

          </table>
        </form>
      </EstructuraTabla>
    </div>
  )
}

