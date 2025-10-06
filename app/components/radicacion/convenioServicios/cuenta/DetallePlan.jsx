'use client'
import EstructuraTabla from '@/app/components/share/EstructuraTabla'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { TbArrowLeft } from 'react-icons/tb'


const tablaEncabezado = [
  'Plan', 'Tipo', 'Tasa Máxima EA'
]

const listaPlan = [
  {
    id: 1,
    plan: 'Coop_1',
    tipo: 'Coop',
    tasa: '4.50%'
  },
  {
    id: 2,
    plan: 'Pyme_1',
    tipo: 'Pyme',
    tasa: '0.00%'
  }
]

const seccion = 'pland'

const DynamicModal = dynamic(() => import('@/app/components/share/Modals'))

const DetallePlan = ({ cerrarModal, modal, onChangeInput, nameCampo,listaPlanes }) => {



  const [focusedButtonId, setFocusedButtonId] = useState(null);

  const agregarPlan = (id,tasaEa) => {
    onChangeInput({ target: { name: nameCampo, 'value': id,tasaEA:tasaEa } })
    cerrarModal()
  }





  return (
    <div>
      {
        modal ?
          <DynamicModal footer={false} encabezado={false} titulo={'Buzon'} ocultarBtnCancelar={true} ocultarBtnContinuar={true} fondoAzul={true}  iconoAlert={false} w={40} cerrarModal={() => { cerrarModal }} mostrarImagneFondo={false}  >
            <div className="w-full flex justify-between text-gray-700">
              <div onClick={()=>cerrarModal()} className="flex items-center gap-3 cursor-pointer"><TbArrowLeft /> <p>Atras</p></div>
              <div onClick={()=>cerrarModal()} className="cursor-pointer"><p className="text-xl mx-4 ">x</p></div>
            </div>
            {/* <div className="w-full flex justify-end"> <button className="bg-white text-coomeva_color-rojo hover:text-white rounded-sm w-6 h-6 flex justify-center items-center shadow-lg border hover:bg-coomeva_color-rojo  transition border-coomeva_color-rojo "><ImPlus size={12} /></button></div> */}

            <EstructuraTabla titulo={'Servicio'} hidden={false} >
              <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                <thead className="bg-coomeva_color-grisPestaña2">
                  <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                    {tablaEncabezado.map((head, i) => (
                      <th className={`align-bottom text-center px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {
                    listaPlanes.map((servicio, i) => (
                      <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom text-center`} key={servicio.id}>

                        <td className='text-start'>{servicio.plan}</td>
                        <td>{servicio.tipoPlan}</td>
                        <td className='flex justify-end gap-3 mr-1'>

                          <div>{servicio.tasaEA}</div>
                          <div onClick={() => { agregarPlan(servicio.plan,servicio.tasaEA) }} className='h-5 cursor-pointer w-5 flex justify-center items-center rounded-full bg-coomeva_color-rojo'>
                            <IoAddCircle className='text-white' />
                          </div>

                        </td>


                      </tr>
                    ))
                  }
                </tbody>

              </table>

            </EstructuraTabla>


            {/* <div className=" flex justify-end w-full">
                    <div className="flex gap-8">
                      <button onClick={cerrarModalDetalle} className="py-2 px-16 border border-gray-400 rounded-lg mx-auto text-gray-500 text-xs">Cancelar</button>
                      <button onClick={mostrarModalConfirmar} className="py-2 px-8 bg-coomeva_color-rojo rounded-lg mx-auto text-white text-xs">Confirmar cancelación</button>
      
                    </div>
                  </div>
       */}

         

          </DynamicModal>
          : undefined
      }

    </div>
  )
}

export default DetallePlan
