'use client'

import EstructuraTabla from "../../share/EstructuraTabla"
import { dataFormularioOrdenada } from "@/app/lib/utils"


const tablaEncabezado = ['', '', 'No. Resolución', 'Fecha de resolución']

const bodyTable = [
  {
    id: 1,
    infoTributaria: 'Responsable de IVA',
    valordrop: "0",
    numResolucion: '',
    fechResolucion: ''
  },
  {
    id: 2,
    infoTributaria: 'Declarante',
    valordrop: "1",
    numResolucion: '',
    fechResolucion: ''
  }
  ,
  {
    id: 3,
    infoTributaria: 'AutoRet Retefuente',
    valordrop: "",
    numResolucion: '',
    fechResolucion: ''
  },
  {
    id: 4,
    infoTributaria: 'Auto Rete Industria y Comercio',
    valordrop: "",
    numResolucion: '',
    fechResolucion: ''
  },
  {
    id: 6,
    infoTributaria: 'Grandes Contribuyentes',
    valordrop: "",
    numResolucion: '',
    fechResolucion: ''
  },
  {
    id: 7,
    infoTributaria: 'Entidad sin Animo de Lucro',
    valordrop: "",
    numResolucion: '',
    fechResolucion: ''
  },
  {
    id: 102,
    infoTributaria: 'Regimen',
    valordrop: "",
    numResolucion: '',
    fechResolucion: ''
  }


]

const listSimpleEspecial=[
  {
    codLista:1,
    descripcion:'Simple'
  },
  {
    codLista:2,
    descripcion:'Especial'
  }
]

const seccion = 'infoTributariaseccion'

export default function InformacionTributaria({ listSiNo,habilitarInput,updateConfiguracion, configuracion }) {

  const infoContext = configuracion.adquirencia.infoTriburaria

  const handleInputChange = (e) => document.getElementById(e.target.id).value = e.target.value;

  const onBlurInput = () => {

    const currenForm = document.getElementById('frmInfoTributaria')

    if (currenForm) {

      const formData = new FormData(currenForm);

      const data = dataFormularioOrdenada({ formularioRef: formData, seccion: seccion })

      updateConfiguracion('adquirencia', 'infoTriburaria', data)

    }
  }


  return (
    <EstructuraTabla titulo={'informacion Tributaria'} hidden={true}>
      <form id="frmInfoTributaria">
        <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
          <thead className="bg-coomeva_color-grisPestaña2">
            <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
              {tablaEncabezado?.map((head, i) => (
                <th className={`align-bottom text-start px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={`${head}${i}`} >{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              bodyTable?.map((info, i) => {

                return(
                  i== bodyTable.length-1?
                  <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={info.id}>
                  <td>
                    <input
                      id={`${seccion}${info.infoTributaria}${i}`}
                      name={`${seccion}${info.infoTributaria}${i}`}
                      type="text"
                      defaultValue={info.infoTributaria}
                      className={` bg-coomeva_color-grisPestaña2   bg-opacity-40 w-full   outline-none h-8`}
                      disabled={true}
  
                    />
                    <input id={`hidden${seccion}id${i}`} name={`hidden${seccion}id${i}`} defaultValue={info.id} type="text" className="hidden" />
                    <input id={`hidden${seccion}infoTributaria${i}`} name={`hidden${seccion}infoTributaria${i}`} defaultValue={info.infoTributaria} type="text" className="hidden" />
  
                  </td>
  
                  <td colSpan={3}>
                    <select
                      id={`${seccion}list${i}`}
                      name={`${seccion}list${i}`}
                      defaultValue={infoContext?.[i]?.list || 'default'}
                      onBlur={onBlurInput}
                      onChange={handleInputChange}
                      disabled={habilitarInput}
                      className='w-full h-7 font-normal text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4' >
                      <option value={'default'} >Seleccionar</option>
                      {listSimpleEspecial.map((op, i) => (
                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                      ))}
                    </select>
                  </td>
  
            
                </tr>
                  :
                  <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={info.id}>
                  <td>
                    <input
                      id={`${seccion}${info.infoTributaria}${i}`}
                      name={`${seccion}${info.infoTributaria}${i}`}
                      type="text"
                      defaultValue={info.infoTributaria}
                      className={` bg-coomeva_color-grisPestaña2   bg-opacity-40 w-full   outline-none h-8`}
                      disabled={true}
  
                    />
                    <input id={`hidden${seccion}id${i}`} name={`hidden${seccion}id${i}`} defaultValue={info.id} type="text" className="hidden" />
                    <input id={`hidden${seccion}infoTributaria${i}`} name={`hidden${seccion}infoTributaria${i}`} defaultValue={info.infoTributaria} type="text" className="hidden" />
  
                  </td>
  
                  <td>
                    <select
                      id={`${seccion}list${i}`}
                      name={`${seccion}list${i}`}
                      defaultValue={infoContext?.[i]?.list || 'default'}
                      onBlur={onBlurInput}
                      onChange={handleInputChange}
                      required
                     
                      disabled={habilitarInput}
                      className='w-44 h-7 font-normal text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4' >
                      <option value={'default'} >Seleccionar</option>
                      {listSiNo.DATA?.map((op, i) => (
                        <option value={op.codLista} key={op.codLista}>{op.descripcion}</option>
                      ))}
                    </select>
                  </td>
  
                  <td>
  
                    <input
                      id={`${seccion}nResolucion${i}`}
                      name={`${seccion}nResolucion${i}`}
                      type="number"
                      required
                      className={`${(i!==0)&&(i!==1)? 'bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8':'bg-transparent'}`}
                      defaultValue={infoContext[i]?.nResolucion || ''}
                      onBlur={onBlurInput}
                      onChange={handleInputChange}
                      disabled={((i!==0) &&(i!==1)?false:true)||habilitarInput}
                      autoComplete="off"
                    />
            
                  </td>
                  <td>
  
                    <input
                      id={`${seccion}fechaResolucion${i}`}
                      name={`${seccion}fechaResolucion${i}`}
                      type={(i!==0) &&(i!==1)?"date":"number"}
                      required
                      className={`${(i!==0)&&(i!==1)? 'bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8':'bg-transparent'}`}
                      defaultValue={infoContext[i]?.fechaResolucion || ''}
                      onBlur={onBlurInput}
                      onChange={handleInputChange}
                      disabled={((i!==0) &&(i!==1)?false:true)||habilitarInput}
                    />
                  </td>
  
                </tr>
                )
             


              })
            }
          </tbody>

        </table>
      </form>
    </EstructuraTabla>

  )
}

