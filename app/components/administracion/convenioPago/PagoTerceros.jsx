'use client'

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ImPlus } from "react-icons/im";
import { TbTrashXFilled } from "react-icons/tb";

import { deletePagoTerseros } from "@/app/lib/administracion/delete";
import { conversionPesos, formatearValor, insertarParametroUrl, resetearPesos, validarNumeroInputText } from '@/app/lib/utils';
import { insertPagoTerseros } from '@/app/lib/administracion/inserts';
import { updatePagoTerceros } from "@/app/lib/administracion/update";


const PagoTerceros = ({ listaPagosTerceros, searchParams, filaAffectada }) => {

  const pathName = usePathname()
  const searchParamsF = useSearchParams()
  const { replace } = useRouter();
  const [tipo, setTipo] = useState([]);
  const [listaPagoTerceros, setLIistaPagoTerceros] = useState(listaPagosTerceros?.DATA || [])
  const lastRowRef = useRef(null);

  useEffect(() => {

    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({ behavior: "smooth" });
    }

  }, [tipo]);


  useEffect(() => {
    searchParams === '3' && actualizarPagoTerceros()
  }, [searchParams])


  const insertCelda = () => {

    if (listaPagoTerceros.length > 0) {
      let pagoTercero = document.getElementById(`pagoTerseros${listaPagoTerceros.length - 1}`)
      let tarifa = document.getElementById(`tarifaPlena${listaPagoTerceros.length - 1}`)
      if (pagoTercero.value === '' && tarifa.value === '') return
    }
    setLIistaPagoTerceros([...listaPagoTerceros, { pagoTerseros: "", tarifaPlena: "", nuevo: true }]);
  };


  const guardarData = async (e) => {

    let frmData = new FormData(document.getElementById('frmPagosTerceros'));
    const formValidate = frmData.entries()
    var existData = formValidate.next().value;

    if (existData === undefined) {
      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioPago', valorParametro: 4, replace, pathName, affectRow: filaAffectada })
      return
    }

    try {
      const response = await insertPagoTerseros({ formData: frmData })

      const nFilaAfectad = parseInt(filaAffectada) + response.ROWSAFFECT

      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioPago', valorParametro: 4, replace, pathName, affectRow: nFilaAfectad })

    } catch (error) {

      console.log(error)

    }
  }

  const actualizarPagoTerceros = async (e) => {

    let frmData = new FormData(document.getElementById('frmPagosTerceros'));


    const formValidate = frmData.entries()

    var existData = formValidate.next().value;

    if (existData === undefined) {
      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioPago', valorParametro: 4, replace, pathName, affectRow: filaAffectada })
      return
    }

    try {




      let ordenarData = {}

      frmData.forEach((value, key) => {

        if (!ordenarData[key]) { ordenarData[key] = []; }

        var patron = /[a-zA-Z]/;

        patron.test(value) ? ordenarData[key].push(value) : ordenarData[key].push(formatearValor({ valor: value }));

      });


      let data = Object.values(ordenarData)

      const response = await updatePagoTerceros({ data })

      const nFilaAfectad = parseInt(filaAffectada) + response.ROWSAFFECT

      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioPago', valorParametro: 4, replace, pathName, affectRow: nFilaAfectad })

    } catch (error) {

      console.log(error)

    }
  }


  const EliminarPagosTerceroDB = async (index, rowsDelete) => {

    await deletePagoTerseros({ rowsDelete: rowsDelete })

    const nuevoArray = [...listaPagoTerceros];

    nuevoArray.splice(index, 1);

    setLIistaPagoTerceros(nuevoArray)
  }


  const handleChange = (index, field, value) => {

    const nuevasFilas = [...listaPagoTerceros];
    nuevasFilas[index][field] = resetearPesos({ valor: value })
    setLIistaPagoTerceros(nuevasFilas);
    document.getElementById(`${field}${index}`).value = conversionPesos({ valor: value, nDecimales: 1 })
  };

  const habilitarInputOnclick = (index) => {

    let habilitarList = [...listaPagoTerceros]

    habilitarList[index].habilitar = true

    setLIistaPagoTerceros(habilitarList);
  }


  return (
    <form id="frmPagosTerceros" className="w-full h-full pl-1  text-sm  flex">
      <div className="h-[9rem] w-[85rem]">
        <table className="w-[100%]">
          <thead>
            <tr className="text-coomeva_color-rojo font-bold  ">
              <th className="border sticky bg-white  top-0 left-0 right-0 border-gray-300 text-left px-1">
                Pago Terceros
              </th>
              <th className="border sticky  top-0 left-0 right-0 bg-white  border-gray-300 ">Tarifa Plena</th>
              <th className="border sticky  top-0 left-0 right-0 bg-white  border-gray-300 ">Tarifa Costo</th>
              <th className="pl-3.5">
                <i
                  className="text-coomeva_color-rojo "
                  onClick={insertCelda}
                >
                  <ImPlus className='w-5 h-5 hidden' />
                </i></th>
            </tr>
          </thead>
          <tbody>
            {listaPagoTerceros.map((content, index) => (
              <tr ref={index === tipo.length - 1 ? lastRowRef : null} className="relative" key={index}>
                <td className="border border-gray-300 ">
                  <input
                    id={`pagoTerseros${index}`}
                    className="w-full px-1"
                    // name={`pagoTerseros${index}`}
                    defaultValue={content.pagoTerseros}
                    type="text"
                    disabled={!content.nuevo}
                    autoComplete='off'
                    autoFocus
                  />
                </td>
                <td className="border relative border-gray-300">
                  {content.habilitar ?
                    null :
                    <div
                      key={index + "itemse"}
                      className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                      onClick={() => { habilitarInputOnclick(index) }}
                    >
                    </div>
                  }
                  <input
                    id={`tarifaPlena${index}`}
                    type="percent"
                    name={content.habilitar ? `pagoTercero${index}` : undefined}
                    className="text-right w-full px-1 "
                    defaultValue={conversionPesos({ valor: content.tarifaPlena, nDecimales: 1 })}
                    onChange={(e) => { validarNumeroInputText(e) }}
                    onBlur={(e) => handleChange(index, "tarifaPlena", e.target.value)}
                    // disabled={content.nuevo}
                    min={0}
                    autoComplete='off'
                    onFocus={e => {
                      e.target.value = content.tarifaPlena
                      e.target.type = "percent"
                    }}
                  />
                </td>
                <td className="border relative border-gray-300">
                  {content.habilitar ?
                    null :
                    <div
                      key={index + "itemse"}
                      className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                      onClick={() => { habilitarInputOnclick(index) }}
                    >
                    </div>
                  }
                  <div className="flex ">
                    <div className="grow">
                      <input
                        id={`tarifaCosto${index}`}
                        type="text"
                        name={content.habilitar ? `pagoTercero${index}` : undefined}
                        className="text-right w-full px-1 "
                        defaultValue={conversionPesos({ valor: content.tarifaCosto, nDecimales: '1', quitarPunto: true })}
                        onChange={(e) => { validarNumeroInputText(e) }}
                        onBlur={(e) => handleChange(index, "tarifaCosto", e.target.value)}
                        // disabled={content.nuevo}
                        placeholder="-"
                        min={0}
                        autoComplete='off'
                        onFocus={e => {
                          e.target.value = content.tarifaCosto
                          e.target.type = "percent"
                        }} />
                    </div>
                    <input
                      id={`id${index}`}
                      name={content.habilitar ? `pagoTercero${index}` : undefined}
                      type="text"
                      className='hidden'
                      defaultValue={content.idpagoTerseros}
                    />
                    <i
                      className="text-2xl text-coomeva_color-rojo absolute inset-y-0 -right-0.5 hidden"
                      disabled={true}
                      onClick={() => { EliminarPagosTerceroDB(index, content.idpagoTerseros) }}
                    >
                      <TbTrashXFilled className="hidden" />
                    </i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default PagoTerceros