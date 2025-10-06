'use client'

import { updateRecaudoPse } from "@/app/lib/administracion/update";
import { insertarParametroUrl, transformaDataGuardarDB, transformarCantidadPesos, transformarValorPuntoDecimal, validarNumeroInputText } from "@/app/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const RecaudoPse = ({ listaRecaudoPse, searchParams, filaAffectada }) => {

  const [tipo, setTipo] = useState(listaRecaudoPse?.DATA || []);
  const pathName = usePathname();
  const searchParamsF = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => { searchParams === '2' && actualizarRecaudoPse() }, [searchParams]);

  const onBlurTransformaPesos = (e) => {
    const valor = e.target.value;
    document.getElementById(e.target.id).value = `${transformarValorPuntoDecimal({ valor: valor, cantidadDecimales: ',0' })}`;
  };

  const actualizarRecaudoPse = async () => {

    const frmData = new FormData(document.getElementById("frmRecaudoPse"));
    const formValidate = frmData.entries();
    const existData = formValidate.next().value;

    try {
      if (existData === undefined) {
        insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: 3, replace, pathName, nombreParamsRow: 'nR', affectRow: filaAffectada });
        return;
      }

      const data = JSON.parse(transformaDataGuardarDB({ formData: frmData }));
      const response = JSON.parse(await updateRecaudoPse({ data }));
      const nFilaAfectad = parseInt(filaAffectada) + response.ROWSAFFECT;
      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: 3, replace, pathName, nombreParamsRow: 'nR', affectRow: nFilaAfectad });

    } catch (error) {
      console.log(error);
    };
  };

  const habilitarInputOnclick = (index) => {
    let habilitarList = [...tipo];
    habilitarList[index].habilitar = true;
    setTipo(habilitarList);
  };

  return (
    <main className="w-full py-6 flex text-sm">
      <form id="frmRecaudoPse" className="w-full">
        <table className="w-full h-full">
          <thead>
            <tr className="text-coomeva_color-rojo font-bold ">
              <th className="border border-gray-300 text-left px-1">
                PSE
              </th>
              <th className="border border-gray-300">Tarifa Plena</th>
              <th className="border border-gray-300">Tarifa Costo</th>
            </tr>
          </thead>
          <tbody>
            {tipo.map((content, index) => (
              <tr className="relative" key={index}>
                <td className="border border-gray-300 ">

                  <input
                    id={`pagoPse${index}`}

                    className="w-full px-1 pointer-events-none opacity-100 bg-white "
                    defaultValue={content.tipoRecaudoPse}
                    type="text"
                    readOnly
                  />
                </td>
                <td className="border border-gray-300">
                  <div className="flex pl-2">
                    <div className="grow-0">$</div>
                    <div className="grow relative">
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
                        id={`tarifaPlenaPse${index}`}

                        name={content.habilitar ? `pagoPse${index}` : undefined}
                        className="text-right w-full px-1 "
                        type="text"
                        defaultValue={transformarValorPuntoDecimal({ valor: content.tarifaPlena, cantidadDecimales: ',0', quitarPunto: true })}
                        onChange={(e) => { validarNumeroInputText(e) }}
                        onBlur={onBlurTransformaPesos}
                        onFocus={e => e.target.defaultValue = content.tarifaPlena}
                        placeholder="-"

                      />
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300">
                  <div className="flex pl-2">
                    <div className="grow-0">$</div>
                    <div className="grow relative">
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
                        id={`tarifaCostoPse${index}`}
                        name={content.habilitar ? `pagoPse${index}` : undefined}

                        className="text-right w-full px-1 "
                        type="text"
                        defaultValue={transformarValorPuntoDecimal({ valor: content.tarifaCosto, cantidadDecimales: ',0', quitarPunto: true })}
                        onChange={(e) => { validarNumeroInputText(e) }}
                        onBlur={onBlurTransformaPesos}
                        onFocus={e => e.target.value = content.tarifaCosto}
                        placeholder="-"
                      />
                      <input type="text" name={content.habilitar ? `pagoPse${index}` : undefined} className="hidden" defaultValue={content.idrecaudoPse} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </form>
    </main>
  );
};

export default RecaudoPse