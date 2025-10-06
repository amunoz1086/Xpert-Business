'use client'

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ImPlus } from "react-icons/im";
import ItemsJustificacion from './ItemsJustificacion';
import { insertJustificacionOficina } from '@/app/lib/administracion/inserts';
import { updateJustificacionOficina } from '@/app/lib/administracion/update';
import { insertarParametroUrl, transformDataGuardarDBNombre } from '@/app/lib/utils';


export default function JustificacionOficina({ listaJustificacionOficina, listaGastoDirectosOficina, listaSiNO, searchParams, filaAffectada }) {

  const pathName = usePathname();
  const searchParamsF = useSearchParams();
  const { replace } = useRouter();
  const [listaJustificacion, setListaJustificacion] = useState({});
  const lastRowRef = useRef(null);


  useEffect(() => {
    try {
      if (listaJustificacionOficina.STATUS) {
        let data = {}
        for (let i of listaJustificacionOficina.DATA) {
          data[i.idgastosDirectosOficina] = new Array(i);
        };
        setListaJustificacion(data);
      };
    } catch (error) {
      console.log(error)
    };
  }, []);

  useEffect(() => {
    searchParams === '3' && handleSubmit();
  }, [searchParams]);

  const agregarJustificacion = (index) => {
    let nuevaJustificacion = { ...listaJustificacion };

    if (!Object.keys(listaJustificacion).includes(index + '') || Object.keys(listaJustificacion).length == 0) {

      nuevaJustificacion[index] = []
      nuevaJustificacion[index].push({
        idgastosDirectosOficina: index,
        tipoGastosDirectosOficina: '',
        idjustificacionOficina: '',
        tipoJustificacionOfi: '',
        permitirNegociar: '',
        tarifaPlena: '',
        nuevo: true
      })
      setListaJustificacion(nuevaJustificacion);
      return
    }

    nuevaJustificacion[index].push({
      idgastosDirectosOficina: nuevaJustificacion[index][0].idgastosDirectosOficina,
      tipoGastosDirectosOficina: '',
      idjustificacionOficina: '',
      tipoJustificacionOfi: '',
      permitirNegociar: '',
      tarifaPlena: '',
      nuevo: true
    });

    setListaJustificacion(nuevaJustificacion);
  };

  const eliminarJustificacion = async (index, filaIndex, idGasto) => {
    const nuevaJustificacion = { ...listaJustificacion };
    nuevaJustificacion[idGasto].splice(filaIndex, 1);
    nuevaJustificacion[idGasto].length === 0 && delete nuevaJustificacion[idGasto];
    setListaJustificacion(nuevaJustificacion);
  };

  const handleFilaChange = (e, idPagosIdirecto, indexJustificacion) => {
    if (!(e.target.name).includes('nuevo')) {
      let justificacion = { ...listaJustificacion };
      if (justificacion[idPagosIdirecto][indexJustificacion].habilitar) {
        justificacion[idPagosIdirecto][indexJustificacion].modificado = true;
        setListaJustificacion(justificacion);
        return
      };
    };
  };

  const habilitarInputOnclick = (idPagosIdirecto, indexJustificacion) => {
    let justificacion = { ...listaJustificacion };
    justificacion[idPagosIdirecto][indexJustificacion].habilitar = true;
    setListaJustificacion(justificacion);
  };

  /* handleSubmit 
   * se filtran los valores de los input que tiene la propiedad modificado,
   * nuevo y se generan dos formData separados uno para el endpoint updateJustifiacionOficina
   * y otro para insertJustificacionOficina
   */

  const handleSubmit = async () => {
    let filaAfectada = 0;
    let form = new FormData(document.getElementById("formJustificacion"));

    const { formNuevo, formModificado } = Array.from(form.entries()).reduce(
      (acc, [name, value]) => {
        if (name.includes("nuevo")) {
          acc.formNuevo.append(name.replace("nuevo_", ""), value);
        } else if (name.includes("modificado")) {
          acc.formModificado.append(name.replace("modificado_", ""), value);
        }
        return acc;
      },
      { formNuevo: new FormData(), formModificado: new FormData() }
    );

    if (formNuevo && formNuevo.entries().next().done === false) {
      filaAfectada = await fetchBD({ opcion: 'nuevo', formData: formNuevo })
    };

    if (formModificado && formModificado.entries().next().done === false) {
      filaAfectada = await fetchBD({ opcion: 'modificar', formData: formModificado })
    };

    insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: '4', replace, pathName, nombreParamsRow: 'nR', affectRow: filaAfectada + parseInt(filaAffectada) })
  };

  const fetchBD = async ({ opcion, formData }) => {
    let responseRow = 0;
    let data = transformDataGuardarDBNombre({ formData: formData, campoCondicion: 1 });

    try {
      const guardarOpcion = {
        "nuevo": async () => {
          const res = JSON.parse(await insertJustificacionOficina({ data }))
          responseRow = responseRow + res.ROWSAFFECT
        },
        "modificar": async () => {
          const res = JSON.parse(await updateJustificacionOficina({ data }))
          responseRow = responseRow + res.ROWSAFFECT
        }
      };

      opcion === 'modificar' && await guardarOpcion.modificar();
      opcion === 'nuevo' && await guardarOpcion.nuevo();

    } catch (error) {
      console.log(error);
    };

    return responseRow;
  };

  return (
    <form id='formJustificacion' className="w-full overflow-y-scroll h-40  scroll-smooth">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border w-[44%] border-gray-300 text-coomeva_color-rojo">Justificación</th>
            <th className='flex justify-stretch items-center divide-x divide-solid text-xs h-8 text-coomeva_color-rojo'>
              <div className=' px-1  text-sm'>Gastos Directos</div>
              <div className=' px-1   text-sm'>Permitir Negociar</div>
              <div className='px-1   text-sm'>Tarifa Plena</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {listaGastoDirectosOficina?.DATA && listaGastoDirectosOficina?.DATA.map((gasto, index) => (
            <tr key={index} className="border border-gray-300 w-full text-xs">
              <td className=" flex flex-row justify-between items-center w-full">
                <span className='w-full text-sm'>{gasto.tipoGastosDirectosOficina}</span>
                <div
                  onClick={() => agregarJustificacion(gasto.idgastosDirectosOficina)}
                  className=" cursor-pointer mr-1 text-coomeva_color-rojo"
                >
                  <ImPlus size={15} className='hidden' />
                </div>
              </td>
              <td className="border border-gray-300 ">
                <div className="overflow-y-auto h-6">
                  <table className="w-full">
                    <tbody>
                      {listaJustificacion[gasto.idgastosDirectosOficina] && listaJustificacion[gasto.idgastosDirectosOficina + ""].map((fila, filaIndex) => (
                        <tr
                          className={`p-0 relative ${!fila.nuevo && !fila.habilitar ? 'bg-coomeva_color-grisFondo' : null} `}
                          key={filaIndex + "just"}
                          ref={listaJustificacion[gasto.idgastosDirectosOficina] && filaIndex === listaJustificacion[fila.idgastosDirectosOficina].length - 1 ? lastRowRef : null}
                        >
                          <td>
                            {fila.nuevo || fila.habilitar ?
                              null :
                              <div
                                key={filaIndex + "justdiv"}
                                className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer'
                                onClick={() => { habilitarInputOnclick(gasto.idgastosDirectosOficina, filaIndex) }}>
                              </div>
                            }
                            <div className='w-full'>
                              <ItemsJustificacion
                                key={filaIndex}
                                fila={fila}
                                index={index}
                                indexFila={filaIndex}
                                onDelete={() => { eliminarJustificacion(index, filaIndex, gasto.idgastosDirectosOficina) }}
                                opcionesSelect={listaSiNO?.DATA}
                                idGasto={gasto.idgastosDirectosOficina}
                                onChangeInput={handleFilaChange}
                                tipoJustificacion={'tipoJustificacionOfi'}
                                idGastoDirectos={'idgastosDirectosOficina'}
                                idJustificacion={'idjustificacionOficina'}
                                seccion={'jOficina'}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};