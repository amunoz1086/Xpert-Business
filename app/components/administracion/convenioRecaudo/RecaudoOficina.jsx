'use client'

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateRecaudoOficina } from "@/app/lib/administracion/update";
import { insertarParametroUrl, transformaDataGuardarDB, transformarValorPuntoDecimal, validarNumeroInputText } from "@/app/lib/utils";

const RecaudoOficina = ({ listaRecaudoOficina, searchParams, filaAffectada }) => {

  const pathName = usePathname()
  const searchParamsF = useSearchParams()
  const { replace } = useRouter();
  const [tipo, setTipo] = useState(listaRecaudoOficina?.DATA || []);

  useEffect(() => { searchParams === '1' && actualizarRecaudoOficina() }, [searchParams])

  const actualizarRecaudoOficina = async () => {
    const frmData = new FormData(document.getElementById("frmRecaudoOficina"))
    const formValidate = frmData.entries();
    const existData = formValidate.next().value;

    try {
      if (existData === undefined) {
        insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: 2, replace, pathName, nombreParamsRow: 'nR' });
        return
      };

      const data = JSON.parse(transformaDataGuardarDB({ formData: frmData }));
      const response = JSON.parse(await updateRecaudoOficina({ data }));
      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: 2, replace, pathName, nombreParamsRow: 'nR', affectRow: response.ROWSAFFECT });

    } catch (error) {
      console.log(error);
    };
  };

  const habilitarInputOnclick = (index) => {
    let habilitarList = [...tipo];
    habilitarList[index].habilitar = true;
    setTipo(habilitarList);
  };

  const formatearValorItem = (e) => {
    const valor = e.target.value;
    try {
      document.getElementById(e.target.id).value = `${transformarValorPuntoDecimal({ valor: valor, cantidadDecimales: ',0' })}`;
    } catch (error) {
      console.log(error);
    };
  };


  return (
    <form id="frmRecaudoOficina" className="w-full  py-6  flex text-sm">
      <table className="w-full h-full">
        <thead>
          <tr className="text-coomeva_color-rojo font-bold ">
            <th className="border border-gray-300 text-left px-1">
              Recaudo Oficina
            </th>
            <th className="border border-gray-300">Tarifa Plena</th>
            <th className="border border-gray-300">Tarifa Costo</th>
          </tr>
        </thead>
        <tbody>
          {tipo.map((content, index) => (
            <tr key={index}>
              <td className="border border-gray-300">
                <input
                  id={`pago${index}`}
                  className="w-full px-1 pointer-events-none opacity-100 bg-white"
                  defaultValue={content.tipoRecaudoOficina}
                  type="text"
                  disabled
                />
              </td>
              <td className="border border-gray-300">
                <div className="flex pl-2">
                  <label htmlFor={`tarifaPlena${index}`} className="grow-0">$</label>
                  <div className="grow  relative">
                    {content.habilitar ?
                      null :
                      <div
                        key={index + "itemse"}
                        className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer'
                        onClick={() => { habilitarInputOnclick(index) }}>
                      </div>
                    }
                    {" "}
                    <input
                      id={`tarifaPlena${index}`}
                      name={content.habilitar ? `pago${index}` : undefined}
                      className="text-right w-full px-1"
                      type="text"
                      defaultValue={transformarValorPuntoDecimal({ valor: content.tarifaPlena, cantidadDecimales: ',0', quitarPunto: true })}
                      onChange={(e) => { validarNumeroInputText(e) }}
                      onBlur={formatearValorItem}
                      onFocus={e => e.target.value = content.tarifaPlena}
                      placeholder="-"

                    />
                  </div>
                </div>
              </td>
              <td className="border border-gray-300">
                <div className="flex pl-2">
                  <label htmlFor={`tarifaCosto${index}`} className="grow-0">$</label>
                  <div className="grow relative">
                    {content.habilitar ?
                      null :
                      <div
                        key={index + "itemset"}
                        className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer'
                        onClick={() => { habilitarInputOnclick(index) }}>
                      </div>
                    }
                    {" "}
                    <input
                      id={`tarifaCosto${index}`}
                      name={content.habilitar ? `pago${index}` : undefined}
                      className="text-right w-full px-1 "
                      type="text"
                      defaultValue={transformarValorPuntoDecimal({ valor: content.tarifaCosto, cantidadDecimales: ',0', quitarPunto: true })}
                      onChange={(e) => { validarNumeroInputText(e) }}
                      onBlur={formatearValorItem}
                      onFocus={e => e.target.value = content.tarifaCosto}
                      placeholder="-"
                    />
                    <input type="text" name={content.habilitar ? `pago${index}` : undefined} className="hidden" defaultValue={content.idrecaudoOficina} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default RecaudoOficina
