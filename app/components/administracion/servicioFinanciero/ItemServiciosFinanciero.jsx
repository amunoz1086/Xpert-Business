'use client'

import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import { updateReciprocidadMinima, updateServiciosFinancieros } from '@/app/lib/administracion/update'
import { transformarValorPuntoDecimal, validarNumeroInputText } from "@/app/lib/utils";
import ReciprocidadMinimaConvenio from './ReciprocidadMinimaConvenio';
const DynamicModal = dynamic(() => import('../../share/Modals'));
const DynamicLoading = dynamic(() => import('../../share/Loading'));


const ItemServiciosFinanciero = ({ listaSelect, serviciosFinancieros, listaReciprocidadMinima }) => {

  const [serviciosFinancierosList, setServiciosFinancierosList] = useState(serviciosFinancieros)

  const [mostrarModal, setMostrarModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const [messageModal, setMessageModal] = useState('')

  const [editarReciprocidad, setEditarReciprocidad] = useState(false)


  const [reciprocidad, setReciprocidad] = useState(listaReciprocidadMinima?.[0] || {})

  useEffect(() => {

    setReciprocidad(listaReciprocidadMinima?.[0] || {})

  }, [])

  const removeCurrencyFormat = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  const onChange = (e) => {

    const { name, value } = e.target

    setReciprocidad((prevState) => ({
      ...prevState,
      [name]: removeCurrencyFormat(value)
    }))

    setEditarReciprocidad(true)

  }


  const habilitarInputOnclick = (index) => {

    let servicoFin = [...serviciosFinancierosList]

    servicoFin[index].habilitar = true

    setServiciosFinancierosList(servicoFin);
  }

  const onchangeSelect = (e, index) => {

    let servicoFin = [...serviciosFinancierosList]

    servicoFin[index].obligatorio = e.target.value

    setServiciosFinancierosList(servicoFin);
  }

  const cerrarModal = () => {

    setMostrarModal(!mostrarModal)

    setServiciosFinancierosList(serviciosFinancieros);

  }

  const formatearValor = (e) => {

    const valor = e.target.value

    document.getElementById(e.target.id).value = `${transformarValorPuntoDecimal({ valor: valor, cantidadDecimales: ',0' })}`

  }



  const actualizarFinanciero = async (formData) => {

    setLoading(true)

    try {

      let response = { MESSAGE: '' }

      response = JSON.parse(await updateServiciosFinancieros(formData))

      console.log(response)

      if (editarReciprocidad) {
        response = JSON.parse(await updateReciprocidadMinima(reciprocidad))
      }





      setLoading(false)

      setMessageModal(response.MESSAGE)

      setMostrarModal(!mostrarModal)

      setEditarReciprocidad(false)

    } catch (error) {

      setLoading(false)

      setMessageModal(response.MESSAGE)

      setMostrarModal(!mostrarModal)

    }
  }


  return (
    <div className='w-full text-sm'>
      <form id={`servicioFinancieroform`} action={actualizarFinanciero} className="">
        {serviciosFinancierosList.map((informacion, i) => (
          <div className='relative' key={i}>
            {informacion.habilitar ?
              null :
              <button
                key={i + "itemser"}
                className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer'
                onClick={() => { habilitarInputOnclick(i) }} >
              </button>
            }
            <input
              id={`id${i}`}
              name={informacion.habilitar ? `modificado${i}${informacion.idFinanciero}` : undefined}
              type="text"
              className='hidden'
              defaultValue={informacion.idFinanciero}

            />
            <div
              id={informacion.idFinanciero}
              key={informacion.idFinanciero}
              className="grid grid-cols-4 h-7"

            >
              <input
                key={i}
                id={i}
                className="border text-start w-[100%] "
                defaultValue={informacion.servicio}
              />
              {/* </div> */}

              <div>
                <label htmlFor={informacion.idFinanciero + "tarifa"} className="absolute mx-2">$</label>
                <input
                  key={i}
                  id={informacion.idFinanciero + "tarifa"}
                  name={informacion.habilitar ? `modificado${i}${informacion.idFinanciero}` : undefined}
                  type="text"

                  className="border h-7 text-end w-[100%] px-4"
                  defaultValue={transformarValorPuntoDecimal({ valor: informacion.tarifa, cantidadDecimales: ',0' })}
                  onChange={(e) => { validarNumeroInputText(e) }}
                  onBlur={formatearValor}
                  min={0}
                ></input>
              </div>
              <div>
                <p className="absolute mx-2">$</p>
                <input
                  id={`cost${i}`}
                  name={informacion.habilitar ? `modificado${i}${informacion.idFinanciero}` : undefined}
                  type="text"
                  className="border h-7 text-end w-[100%] px-4"
                  defaultValue={transformarValorPuntoDecimal({ valor: informacion.costo, cantidadDecimales: ',0' })}
                  onChange={(e) => { validarNumeroInputText(e) }}
                  onBlur={formatearValor}
                  min={0}
                ></input>
              </div>
              <div className="flex w-full">
                <select
                  id={`obligatorio${i}`}
                  name={informacion.habilitar ? `modificado${i}${informacion.idFinanciero}` : undefined}
                  value={informacion["obligatorio"] !== null ? informacion.obligatorio : "default"}
                  onChange={(e) => { onchangeSelect(e, i) }}
                  className="w-full border">
                  <option disabled defaultValue={"default"}>Seleccionar</option>
                  {listaSelect.map((info, i) => (
                    <option key={info.codLista} value={info.codLista}>
                      {info.descripcion}
                    </option>

                  ))}
                </select>
              </div>

            </div>
          </div>

        ))}
      </form>

      <ReciprocidadMinimaConvenio
        listaReciprocidadMinima={listaReciprocidadMinima}
        onChange={onChange}
        reciprocidad={reciprocidad}
      />
      {
        mostrarModal &&
        <DynamicModal titulo={'Notificación'} mostrarModal={cerrarModal} mostrarImagneFondo={true}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{
            messageModal
          }</p>
        </DynamicModal>

      }
      {
        loading ?
          DynamicLoading
          : undefined
      }
    </div>
  );
}

export default ItemServiciosFinanciero