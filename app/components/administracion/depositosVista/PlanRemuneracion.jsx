'use client'

import { useState } from 'react';
import dynamic from "next/dynamic";
import { MdDelete } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { insertPlanRemuneracion } from '@/app/lib/administracion/inserts';
import { deletePlanRemuneracion } from '@/app/lib/administracion/delete';
import { conversionPesos, resetearPesos } from "@/app/lib/utils";
const DynamicModal = dynamic(() => import('../../share/Modals'));
const DynamicLoading = dynamic(() => import('../../share/Loading'));



const PlanRemuneracion = ({ listaPlanRemuneracion, listSelect }) => {


  const [listaPlan, setListaPlan] = useState(listaPlanRemuneracion?.DATA?listaPlanRemuneracion?.DATA.sort((a, b) => a.planRemuneracion.localeCompare(b.planRemuneracion)) : [])

  const [mostrarModal, setMostrarModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const [messageModal, setMessageModal] = useState('')


  const agregarFila = () => {

    const plan = listaPlan[listaPlan.length - 1]

    if ((plan?.['planRemuneracion'] === '' || plan?.['rangoInferior'] === '' || plan?.['tasaEA'] === '')&& plan!==undefined) return

    setListaPlan([...listaPlan, { planRemuneracion: '', rangoInferior: '', rangoMaximo: '', tasaEA: '', nuevo: true }]);
  };

  const eliminarFila = async (index, idRow) => {

    try {

      setLoading(true)

      let response = JSON.parse(await deletePlanRemuneracion(idRow))

      const mensaje = response.ROWSAFFECT > 0 && response.STATUS === 200 ? 'Registro eliminado' : response.MESSAGE

      setMessageModal(mensaje)

      setLoading(false)

      setMostrarModal(!mostrarModal)

      setListaPlan(listaPlanRemuneracion?.DATA)

   

    } catch (error) {

      console.log(error)
      setLoading(false)

    }



  };

  const handleChange = (index, field, value) => {

    const nuevasFilas = [...listaPlan];

    nuevasFilas[index][field] = resetearPesos({ valor: value })

    setListaPlan(nuevasFilas);

    document.getElementById(`${field}${index}`).value = field != 'tasaEA' ? conversionPesos({ valor: value, nDecimales: 0 }) : conversionPesos({ valor: value, nDecimales: 2, style: 'percent' })

  };

  const rangoIniciarOnBlur = (e, index) => {

    const planRem = obtenerRegistroMayorPorPlanRemuneracion({ planRemuneracion: e.target.value })
    if (planRem) {
      document.getElementById(`rangoInferior${index}`).value = conversionPesos({ valor: planRem?.rangoMaximo + 1, nDecimales: 0 })
    }


  }


  const cerrarModal = () => {

    setListaPlan(listaPlanRemuneracion?.DATA)
    setMostrarModal(!mostrarModal)
  }


  const obtenerRegistroMayorPorPlanRemuneracion = ({ planRemuneracion }) => {

    let registroMayor = null;
    let maxRangoMaximo = -Infinity;


    listaPlan.forEach(registro => {

      if (registro.planRemuneracion === planRemuneracion) {
        const rangoMaximo = parseInt(registro.rangoMaximo);
        if (rangoMaximo > maxRangoMaximo) {
          maxRangoMaximo = rangoMaximo;
          registroMayor = registro;
        }
      }
    });

    return registroMayor;
  }


  return (

    <div className=" mx-auto mt-4">
      <form action={async (formData) => {

        setLoading(true)

        try {

          const response =JSON.parse(await insertPlanRemuneracion(formData))

          setLoading(false)

          setMessageModal(response.MESSAGE)
 
          setMostrarModal(!mostrarModal)

        } catch (error) {

          setLoading(false)

          setMessageModal(response.MESSAGE)
 
          setMostrarModal(!mostrarModal)

        } 

        


      }} id='depositoVistaform' >
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className='text-sm'>
              <th className=" pl-4  bg-coomeva_color-rojo text-left text-white ">Plan Remuneración</th>
              <th className=" pl-4   bg-coomeva_color-rojo text-left text-white ">Rango inferior</th>
              <th className="pl-4   bg-coomeva_color-rojo text-left text-white ">Rango máximo</th>
              <th className="pl-4   bg-coomeva_color-rojo text-left text-white ">Tasa EA Solicitada</th>
              <th className=" px-2  flex justify-center ">
                <button type='button'
                  onClick={agregarFila}
                  className=" text-coomeva_color-rojo hover:bg-coomeva_color-grisPestaña  font-bold  rounded"
                >
                  <FaPlus size={25} />
                </button>
              </th>
            </tr>
          </thead>

          <tbody >
            {listaPlan.map((fila, index) => (
              <tr key={index} className='text-sm'>
                <td className="px-4 border">
                  <div className="flex w-full">
                    <select
                      id={`planRemuneracion${index}`}
                      name={fila.nuevo ? `planRemuneracion${index}` : undefined}
                      disabled={!fila.nuevo}
                      value={fila.planRemuneracion}
                      onChange={(e) => handleChange(index, "planRemuneracion", e.target.value)}

                      onBlur={(e) => { rangoIniciarOnBlur(e, index) }}
                      className="w-full border">
                      <option defaultValue={"default"}>Seleccionar</option>
                      {listSelect?.DATA.map((info, i) => (
                        <option key={info.codLista} value={info.descripcion}>
                          {info.descripcion}
                        </option>

                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-4 border">
                  <input
                    id={`rangoInferior${index}`}
                    type="text"
                    name={fila.nuevo ? `planRemuneracion${index}` : undefined}
                    defaultValue={conversionPesos({ valor: fila.rangoInferior, nDecimales: '', })}
                    onBlur={(e) => handleChange(index, "rangoInferior", e.target.value)}
                    className="w-full "
                    disabled={!fila.nuevo}
                    required
                    min={0}
                    autoComplete="off"
                    onFocus={(e) => {
                      const planRem = obtenerRegistroMayorPorPlanRemuneracion({ planRemuneracion: document.getElementById(`planRemuneracion${index}`).value })
                      e.target.value = fila.rangoInferior || (parseFloat(planRem?.rangoMaximo) + 1) || ''
                      e.target.type = "currency";
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^\d.]/g, '');
                    }} 
                  />
                </td>
                <td className="px-4 border">
                  <input
                    id={`rangoMaximo${index}`}
                    type="text"
                    name={fila.nuevo ? `planRemuneracion${index}` : undefined}
                    defaultValue={conversionPesos({ valor: fila.rangoMaximo, nDecimales: '' })}
                    onBlur={(e) => handleChange(index, "rangoMaximo", e.target.value)}
                    className="w-full "
                    disabled={!fila.nuevo}
                    min={0}
                    required
                    autoComplete="off"
                    onFocus={(e) => {
                      const planRem = obtenerRegistroMayorPorPlanRemuneracion({ planRemuneracion: document.getElementById(`planRemuneracion${index}`).value })
                      e.target.value = fila.rangoMaximo || ''
                      e.target.type = "currency";
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^\d.]/g, '');
                    }}
                  />
                </td>



                <td className="px-4 border">

                  <input

                    id={`tasaEA${index}`}
                    type="percent"
                    name={fila.nuevo ? `planRemuneracion${index}` : undefined}
                    defaultValue={conversionPesos({ valor: fila.tasaEA, nDecimales: 2, style: 'percent' })}
                    onBlur={(e) => handleChange(index, "tasaEA", e.target.value)}
                    className="w-full "
                    disabled={!fila.nuevo}
                    min={0}
                    max={100}
                    required
                    autoComplete="off"
                    onFocus={(e) => {
                      const planRem = obtenerRegistroMayorPorPlanRemuneracion({ planRemuneracion: document.getElementById(`planRemuneracion${index}`).value })
                      e.target.value = fila.tasaEA || ''
                      e.target.type = "currency";
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^\d.]/g, '');
                    }}
                  />
                </td>




                <td className=" flex justify-center">
                  <button type="button" onClick={() => { eliminarFila(index, fila.idplanRemuneracion) }} className="text-red-600 hover:text-red-800">
                    <MdDelete size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {

          mostrarModal &&
          <DynamicModal titulo={'Notificación'} mostrarModal={cerrarModal} mostrarImagneFondo={true}>
            <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{
              messageModal
            }</p>
          </DynamicModal>

        }
        {
          loading?
          <DynamicLoading/>
          :undefined
        }
      </form>

    </div>


  );
}

export default PlanRemuneracion


