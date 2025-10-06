'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateAdquirencia } from "@/app/lib/administracion/update";
import { insertarParametroUrl, transformaDataGuardarDB, transformarValorPuntoDecimal, validarNumeroInputText } from "@/app/lib/utils";
import BtnControl from "../../radicacion/cliente/BtnControl";


export const TablaAdquirencia = ({ listaAdquirencia, searchParams, filaAffectada }) => {

  const pathName = usePathname();
  const searchParamsF = useSearchParams();
  const { replace } = useRouter();
  const [tipo, setTipo] = useState(listaAdquirencia?.DATA || []);

  useEffect(() => {
    searchParams === '6' && actualizarAdquirencia();
  }, [searchParams]);

  const actualizarAdquirencia = async () => {
    let frmData = new FormData(document.getElementById('datosAquirencia'));
    const formValidate = frmData.entries();
    const existData = formValidate.next().value;

    try {
      if (existData === undefined) {
        insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: 7, replace, pathName, nombreParamsRow: 'nR', affectRow: filaAffectada });
        return;
      };

      const data = JSON.parse(transformaDataGuardarDB({ formData: frmData }));
      const response = JSON.parse(await updateAdquirencia({ data }));
      const nFilaAfectad = parseInt(filaAffectada) + response.ROWSAFFECT;
      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: 7, replace, pathName, nombreParamsRow: 'nR', affectRow: nFilaAfectad });

    } catch (error) {
      console.log(error);
    };
  };

  const habilitarInputOnclick = (index) => {
    let habilitarList = [...tipo];
    habilitarList[index].habilitar = true;
    setTipo(habilitarList);
  };

  const onBlurTransformaPesos = (e) => {
    const valor = e.target.value;
    document.getElementById(e.target.id).value = `${transformarValorPuntoDecimal({ valor: valor, cantidadDecimales: ',0' })}`;
  };

  return (
    <div className="w-[90%]">
      <form id='datosAquirencia'>
        <table className=" table-auto border-collapse text-sm">
          <thead>
            <tr className='text-coomeva_color-rojo'>
              <th className=" py-1  text-left border w-[50%]">Adquirencia</th>
              <th className=" py-1  text-center border w-[20%] ">Puntos</th>
              {/* <th className=" py-1 text-center border w-[30%]">Tarifa Costo</th> */}
            </tr>
          </thead>
          <tbody>
            {tipo.map((fila, index) => (
              <tr key={index}>
                <td className="border relative">
                  <input
                    id={`id${index}`}
                    name={fila.habilitar ? `adquirencia${index}` : undefined}
                    type="text"
                    defaultValue={fila.idadquirencia}
                    className='hidden'
                  />
                  {fila.habilitar ?
                    null :
                    <div
                      key={index + "itemse"}
                      className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                      onClick={() => { habilitarInputOnclick(index) }}>
                    </div>
                  }
                  <input
                    id={`idAdquirencia${index}`}
                    type="text"
                    defaultValue={fila.tipoAdquirencia}
                    className="w-full mx-2"
                    disabled={true}
                  />
                </td>
                <td className="border relative">
                  {fila.habilitar ?
                    null :
                    <div
                      key={index + "itemse"}
                      className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                      onClick={() => { habilitarInputOnclick(index) }}>
                    </div>
                  }
                  <input
                    id={`puntos${index}`}
                    name={fila.habilitar ? `adquirencia${index}` : undefined}
                    type="number"
                    defaultValue={fila.puntos}
                    className="w-full text-center"
                    min={0}
                  />
                </td>
                <td className="border relative space-x-2 hidden">
                  <label htmlFor={`tarifaCostoAdquirencia${index}`} className="hidden">$</label>
                  {fila.habilitar ?
                    null :
                    <div
                      key={index + "itemse"}
                      className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer hidden'
                      onClick={() => { habilitarInputOnclick(index) }}>
                    </div>
                  }
                  <input
                    id={`tarifaCostoAdquirencia${index}`}
                    type="text"
                    name={fila.habilitar ? `adquirencia${index}` : undefined}
                    // defaultValue={transformarValorPuntoDecimal({ valor: fila.tarifaCosto, cantidadDecimales: ',0', quitarPunto: true })}
                    defaultValue={''}
                    className="w-full text-end hidden"
                    onBlur={onBlurTransformaPesos}
                    onChange={(e) => { validarNumeroInputText(e) }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

const Adquirencia = ({ listaAdquirencia, searchParams, filaAffectada }) => {
  return (
    <div className="flex flex-col justify-center items-start w-full">
      <TablaAdquirencia listaAdquirencia={listaAdquirencia} searchParams={searchParams} filaAffectada={filaAffectada} />
      <div className="flex justify-center items-center w-[50%] h-[50px] mt-8">
        <div className=" flex justify-between items-center w-[95%] ">
          <h2 className="w-[30%]">Ajustar</h2>
          <BtnControl name={'Tarifa de Intercambio '} url={'/radicacion/remi'} opcion={'navegar'} enableButton={true} />
        </div>
      </div>
    </div>
  );
};
export default Adquirencia;
