'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ImPlus } from "react-icons/im";
import { TbTrashXFilled } from "react-icons/tb";
import { useState, useEffect, useRef } from "react";
import { deletePromedioNomina } from '@/app/lib/administracion/delete';
import { insertarParametroUrl } from '@/app/lib/utils';
import { insertPromedioNomina } from '@/app/lib/administracion/inserts';
import { updatePromedioNomina } from '@/app/lib/administracion/update';


const PromedioNomina = ({ listaPromedioNomina, searchParams }) => {

  const pathName = usePathname()
  const searchParamsF = useSearchParams()
  const { replace } = useRouter();
  const formRef = useRef(null)
  const [tipo, setTipo] = useState(listaPromedioNomina?.DATA || []);
  const lastRowRef = useRef(null);

  useEffect(() => {

    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({ behavior: "smooth" });
    }

  }, [tipo]);

  useEffect(() => {
    searchParams === '1' && guardarData()
  }, [searchParams])



  const insertCelda = () => {

    if (tipo.length > 0) {

      let validarInput = document.getElementById(`tipo${tipo.length - 1}`)

      if (validarInput.value === '') return

    }

    setTipo([...tipo, { tipo: "", nuevo: true }]);

  };

  const guardarData = async () => {

    let frmData = new FormData(document.getElementById('frmDataComponent'));

    const formValidate = frmData.entries()

    var existData = formValidate.next().value;

    if (existData === undefined) {

      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioPago', valorParametro: 2, replace, pathName })
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
      const response = await updatePromedioNomina(resulData)

      setTipo(listaPromedioNomina?.DATA)

      insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioPago', valorParametro: 2, replace, pathName, affectRow: response.ROWSAFFECT })

    } catch (error) {

      console.log(error)

    }
  }


  const EliminarPromedioNominaDB = async (rowsDelete, index) => {

    await deletePromedioNomina({ rowsDelete: rowsDelete })

    const nuevoArray = [...tipo];

    nuevoArray.splice(index, 1);

    setTipo(nuevoArray);

  }

  const handleChangeTipo = (index, event) => {

    const nuevoArray = [...tipo];

    nuevoArray[index].tipo = event.target.value;

    setTipo(nuevoArray);
  };


  const habilitarInputOnclick = (index) => {

    console.log(index)

    setTipo(prevTipo => {
      return prevTipo.map((item, i) =>
        i === index ? { ...item, habilitar: true } : item
      );
    });
  }

  return (
    <main className="w-full h-[6.6rem]  text-sm  flex items-center">
      {/* <i
        className="text-coomeva_color-rojo mr-2 pt-7"
        onClick={insertCelda}
      >
        <ImPlus className='w-5 h-5' />
      </i> */}
      <table className="w-full h-[92%]">
        <thead>
          <tr className="text-coomeva_color-rojo text-sm font-semibold ">
            <th className="mx-0 px-0"></th>
            <th className="border border-gray-300  ">Pago Nómina</th>
            <th className="border border-gray-300 ">Tipo</th>
          </tr>
        </thead>

        <tbody>
          <tr className="">
            <td className='mx-0 px-0'></td>
            <td className="border w-[43.1%]  border-gray-300 h-full items-center text-center">
              <p className='w-full'>Ingreso Promedio mes Nómina</p>
            </td>
            <td className="mx-0 px-0">
              <form ref={formRef} id='frmDataComponent' className="flex flex-col w-full overflow-y-scroll h-20 scrollbar-w-2">
                {tipo.map((content, index) => (
                  <div
                    className="flex w-full relative"
                    ref={index === tipo.length - 1 ? lastRowRef : null}
                    key={`${index}promedio`}

                  >
                    <div className="ml-3.5 text-center ">{index + 1}</div>

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
                      type="text"
                      id={`id${index}`}
                      name={content.habilitar ? `tipo${index}` : undefined}
                      value={content.idpromedioNomina}

                      className=' w-14 px-2 outline-none hidden'
                      readOnly={true}
                    />
                    <input
                      type="text"
                      id={`tipo${index}`}
                      name={content.habilitar ? `tipo${index}` : undefined}
                      className=" w-full ml-2 px-2 border border-gray-200 outline-none"
                      value={content.tipo}
                      onChange={(e) => { handleChangeTipo(index, e) }}
                      disabled={!content.habilitar}
                      autoComplete='off'

                    />
                    {/* <i
                      className="text-2xl text-coomeva_color-rojo"
                      onClick={() => { EliminarPromedioNominaDB(content.idpromedioNomina, index) }}
                    >
                      <TbTrashXFilled />
                    </i> */}
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

export default PromedioNomina