'use client'

import { useEffect, useReducer, useState } from 'react';
import { ImPlus } from "react-icons/im";
import ItemsJustificacion from './ItemsJustificacion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { insertJustificacionPse } from '@/app/lib/administracion/inserts';
import { updateJustificacionPse } from '@/app/lib/administracion/update';
import { insertarParametroUrl, transformDataGuardarDBNombre } from '@/app/lib/utils';

const JustificacionPse = ({ listaJustificacionPse, listaSiNO, listaGastoDirectoPse, searchParams, filaAffectada }) => {

  const pathName = usePathname();
  const searchParamsF = useSearchParams();
  const { replace } = useRouter();
  const [listaJustificacion, setListaJustificacion] = useState({});
  const lastRowRef = useReducer(null);

  useEffect(() => {
    try {
      if (listaJustificacionPse.STATUS === 200) {
        let data = {}
        for (let i of listaJustificacionPse.DATA) {
          data[i.idgastosDirectosPse] = new Array(i);
        };
        setListaJustificacion(data);
      };
    } catch (error) {
      console.log(error);
    };
  }, []);

  useEffect(() => {
    searchParams === '4' && handleSubmit();
  }, [searchParams]);

  useEffect(() => {
    lastRowRef.current && lastRowRef.current.scrollIntoView({ behavior: "smooth" });
  }, [listaJustificacion]);

  const agregarJustificacion = (index) => {
    let nuevaJustificacion = { ...listaJustificacion };
    if (!Object.keys(listaJustificacion).includes(index + '') || Object.keys(listaJustificacion).length == 0) {
      nuevaJustificacion[index] = []
      nuevaJustificacion[index].push({
        idgastosDirectosPse: index,
        tipoGastosDirectosPse: '',
        idjustificacionPse: '',
        tipoJustificacionPse: '',
        permitirNegociar: '',
        tarifaPlena: '',
        nuevo: true
      })
      setListaJustificacion(nuevaJustificacion);
      return
    };

    nuevaJustificacion[index].push({
      idgastosDirectosPse: nuevaJustificacion[index][0].idgastosDirectosPse,
      tipoGastosDirectosPse: '',
      idjustificacionPse: '',
      tipoJustificacionPse: '',
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
      let justificacion = { ...listaJustificacion }
      if (justificacion[idPagosIdirecto][indexJustificacion].habilitar) {
        justificacion[idPagosIdirecto][indexJustificacion].modificado = true
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

  const handleSubmit = async () => {
    let filaAfectada = 0;
    let form = new FormData(document.getElementById("formJustificacionPse"));

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
      filaAfectada = await fetchBD({ opcion: 'nuevo', formData: formNuevo });
    };

    if (formModificado && formModificado.entries().next().done === false) {
      filaAfectada = await fetchBD({ opcion: 'modificar', formData: formModificado });
    };

    insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: '5', replace, pathName, nombreParamsRow: 'nR', affectRow: filaAfectada + parseInt(filaAffectada) });
  };

  const fetchBD = async ({ opcion, formData }) => {
    let responseRow = 0;
    let data = transformDataGuardarDBNombre({ formData: formData, campoCondicion: 1 });

    try {
      const guardarOpcion = {
        "nuevo": async () => {
          const res = JSON.parse(await insertJustificacionPse({ data }))
          responseRow = responseRow + res.ROWSAFFECT
        },
        "modificar": async () => {
          const res = JSON.parse(await updateJustificacionPse({ data }))
          responseRow = responseRow + res.ROWSAFFECT
        }
      };

      opcion === 'modificar' && await guardarOpcion.modificar();
      opcion === 'nuevo' && await guardarOpcion.nuevo();

    } catch (error) {
      console.log(error);
    };

    return responseRow
  };

  return (
    <form id='formJustificacionPse' className="w-full overflow-y-scroll h-40  scroll-smooth">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border w-[44%] border-gray-300 text-coomeva_color-rojo">Justificación</th>
            <th className='flex justify-stretch w-full h-8 items-center divide-x divide-solid text-sm h- text-coomeva_color-rojo'>
              <div className=' px-1  text-sm'>Gastos Directos</div>
              <div className=' px-1   text-sm'>Permitir Negociar</div>
              <div className='px-1   text-sm'>Tarifa Plena</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {listaGastoDirectoPse?.DATA && listaGastoDirectoPse?.DATA.map((gasto, index) => (
            <tr key={index} className="border border-gray-300 text-xs">
              <td className=" flex flex-row justify-between items-center w-full">
                <span className='text-sm  w-{90%] '>{gasto.tipoGastosDirectosPse}</span>
                <div
                  onClick={() => agregarJustificacion(gasto.idgastosDirectosPse)}
                  className="cursor-pointer mr-1 text-coomeva_color-rojo"
                >
                  <ImPlus size={15} className='hidden' />
                </div>
              </td>
              <td className="border border-gray-300">
                <div className="overflow-y-auto h-6">
                  <table className="w-full">
                    <tbody>
                      {listaJustificacion[gasto.idgastosDirectosPse] && listaJustificacion[gasto.idgastosDirectosPse + ""].map((fila, filaIndex) => (
                        <tr
                          className={`p-0 relative ${!fila.nuevo && !fila.habilitar ? 'bg-coomeva_color-grisFondo' : null} `}
                          key={filaIndex}
                        ><td>
                            {fila.nuevo || fila.habilitar ?
                              null :
                              <div
                                className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer'
                                onClick={() => { habilitarInputOnclick(gasto.idgastosDirectosPse, filaIndex) }}
                              >
                              </div>}
                            <ItemsJustificacion
                              key={filaIndex}
                              fila={fila}
                              index={index}
                              indexFila={filaIndex}
                              onDelete={() => { eliminarJustificacion(index, filaIndex, gasto.idgastosDirectosOficina) }}
                              opcionesSelect={listaSiNO?.DATA}
                              idGasto={gasto.idgastosDirectosPse}
                              onChangeInput={handleFilaChange}
                              tipoJustificacion={'tipoJustificacionPse'}
                              idGastoDirectos={'idgastosDirectosPse'}
                              idJustificacion={'idjustificacionPse'}
                            />
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

export default JustificacionPse