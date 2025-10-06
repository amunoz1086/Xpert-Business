'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ImPlus } from "react-icons/im";
import { TbTrashXFilled } from "react-icons/tb"
import { useState, useEffect, useRef } from "react";

import { deleteFrecuenciaNomina } from "@/app/lib/administracion/delete";
import { insertarParametroUrl } from '@/app/lib/utils';
import { insertFrecuenciaNomina } from '@/app/lib/administracion/inserts';

const FrecuenciaNomina = ({ listaFrecuenciaNomina, searchParams, filaAffectada }) => {

  const pathName = usePathname()
  const searchParamsF = useSearchParams()
  const { replace } = useRouter();

  const [tipo, setTipo] = useState(listaFrecuenciaNomina?.DATA || []);
  const lastRowRef = useRef(null);


  useEffect(() => {

    if (lastRowRef.current) {

      lastRowRef.current.scrollIntoView({ behavior: "smooth" });

    }
  }, [tipo]);

  useEffect(() => {

    searchParams === '2' && guardarData()

  }, [searchParams])


  const insertCelda = () => {

    if (tipo.length > 0) {

      let validarInput = document.getElementById(`frcNomina${tipo.length - 1}`)

      if (validarInput != null) {
        validarInput.value !== '' && setTipo([...tipo, { tipo: '', nuevo: true }])
        return
      }
    }
    // validacion para evitar crear input si el anterior no contiene info
    setTipo([...tipo, { tipo: '', nuevo: true }])

  };


  const deleteCeldaBBDD = async (index, id) => {

    await deleteFrecuenciaNomina({ rowsDelete: id, usuario: 'lojani' })


    const nuevoArray = [...tipo];

    nuevoArray.splice(index, 1);

    setTipo([...nuevoArray])


  };

  const handleChangeTipo = (index, event) => {

    const nuevoArray = [...tipo];

    nuevoArray[index].tipo = event.target.value;

    setTipo(nuevoArray);

  };

  const guardarData = async () => {

    let frmData = new FormData(document.getElementById('frmFrecuenciaNomina'));

    const formValidate = frmData.entries()
    const existData = formValidate.next().value;

    if (existData === undefined) {
      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioPago', valorParametro: 3, replace, pathName, affectRow: filaAffectada })
      return
    }

    try {

      const data = {};

      frmData.forEach((value, key) => {

        if (!data[key]) {
          data[key] = [];
        }
        data[key].push(value);
      });

      const resulData = Object.values(data)


      const response = await insertFrecuenciaNomina({ data: resulData, usuario: 'lojani' })

      const nFilaAfectad = parseInt(filaAffectada) + response.ROWSAFFECT

      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioPago', valorParametro: 3, replace, pathName, affectRow: nFilaAfectad })

    } catch (error) {

      console.log(error)

    }


  }


  return (
    <main className="w-full h-[5rem] flex text-sm">
      {/* <i
        className="text-coomeva_color-rojo mr-2 pt-7 pointer-events-none"
        onClick={insertCelda}
      >
        <ImPlus className='w-5 h-5 invisible' />
      </i> */}
      <table className="w-full h-[92%]">

        <tbody>
          <tr className="">
            <td className='mx-0 px-0'></td>
            <td className="border border-gray-300  flex w-[96%] h-full items-center text-center">
              <p className='w-full'>Frecuencia Pago nómina</p>
            </td>
            <td className="mx-0 px-0">
              <form id="frmFrecuenciaNomina" className="flex flex-col w-[97.5%]">
                {tipo.map((content, index) => (
                  <div
                    key={index}
                    className="flex w-[100%]"
                    ref={index === tipo.length - 1 ? lastRowRef : null}
                  >
                    <div className="ml-1 text-center">{index + 1}</div>
                    <input
                      id={`frcNomina${index}`}
                      name={`frcNomina${index}`}
                      type="text"
                      className=" w-full mx-auto border border-gray-300 outline-none px-2"
                      value={content.tipo}
                      disabled={!content.nuevo}
                      onChange={(e) => handleChangeTipo(index, e)}
                      autoComplete='off'
                      autoFocus
                    />
                    {/* <i className="text-2xl text-coomeva_color-rojo pointer-events-none" onClick={() => deleteCeldaBBDD(index, content.idfrecuenciaNomina)}><TbTrashXFilled className='invisible'/></i> */}
                  </div>
                ))}

              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default FrecuenciaNomina
