'use client'

import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import { TbTrashXFilled } from "react-icons/tb";
import { ImPlus } from "react-icons/im";
import { transformaDataGuardarDB } from '@/app/lib/utils';
import { insertParametrosEfecty, redirecionar } from '@/app/lib/administracion/inserts';
import { deleteParametrosEfecty } from '@/app/lib/administracion/delete';
import { updateParametrosEfecty } from "@/app/lib/administracion/update";
const DynamicModal = dynamic(() => import('../../share/Modals'));

export default function ParametroEfecty({ listaParametroEfecty, searchParams, filaAffectada }) {

  const [mostrarModal, setMostrarModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [listaParametro, setListaParametro] = useState(listaParametroEfecty?.DATA || []);

  useEffect(() => { searchParams === '7' && guardarData() }, [searchParams]);

  const agregarFila = () => {
    setListaParametro([...listaParametro, { codigo: '', parametros: '', nuevo: true }]);
  };

  const eliminarFila = async (id, index) => {
    const response = JSON.parse(await deleteParametrosEfecty({ rowsDelete: id }));
    const nuevoArray = [...listaParametro];
    nuevoArray.splice(index, 1);
    setListaParametro([...nuevoArray]);
  };

  const handleChange = (index, field, value) => {

    console.log(index)
    console.log(field)
    console.log(value)
    const nuevasFilas = [...listaParametro];
    nuevasFilas[index][field] = value;
    console.log(nuevasFilas)
    setListaParametro(nuevasFilas);
  };

  const guardarData = async () => {
    let frmData = new FormData(document.getElementById('frmParametro'));
    const formValidate = frmData.entries();
    var existData = formValidate.next().value;

    try {
      if (existData === undefined) {
        const mensaje = filaAffectada === '0' ? 'No hay campos para actualizar' : 'Actualizacion exitosa';
        setMessageModal(mensaje);
        setMostrarModal(!mostrarModal);
        redirecionar({ url: '/administracion/convenioRecaudo' });
        // insertarParametroUrl({ searchParamsF, nombreParametro: 'convenioRecaudo', valorParametro: 0, replace, pathName })
        return;
      };

      const data = JSON.parse(transformaDataGuardarDB({ formData: frmData, paramEfecty: true }));

      console.log(data)

      const response = JSON.parse(await updateParametrosEfecty( data ));
      const mensaje = response.STATUS === 200 ? 'Registro Exitoso' : response.MESSAGE;

      setMessageModal(mensaje);
      setMostrarModal(!mostrarModal);
      redirecionar({ url: '/administracion/convenioRecaudo' });
    } catch (error) {
      console.log(error);
    };
  };

  const cerrarModal = () => {
    setMostrarModal(!mostrarModal)
  };


  const habilitarInputOnclick = (index) => {
    const nuevasFilas = [...listaParametro];
    nuevasFilas[index].nuevo = true;
    setListaParametro(nuevasFilas);
  };


  return (
    <div className=" w-full overflow-y-scroll h-30  scroll-smooth mb-6  mt-6 text-sm">
      <form id='frmParametro'>
        <table className="table-auto  border-collapse  ">
          <thead >
            <tr >
              <th className=" w-14 px-2 text-left  text-coomeva_color-grisPestaña   ">Código</th>
              <th className=" px-2 text-left  text-coomeva_color-grisPestaña">Parámetros Ticket Promedio Efecty</th>
              {/* <th className=" px-4 flex justify-center items-center align-middle">
                <ImPlus className='text-coomeva_color-rojo' onClick={agregarFila} size={20} />
              </th> */}
            </tr>
          </thead>
          <tbody>
            {listaParametro.map((fila, index) => (
              <tr key={index}>
                <td className=" w-4">
                  <input
                    type="text"
                    name={fila.nuevo ?`nuevo${index}`:undefined}
                    value={fila.idParametrosEfecty ? fila.idParametrosEfecty : (index + 1)}
                    onChange={(e) => handleChange(index, "codigo", e.target.value)}
                    className=' w-14 px-2 outline-none'
                    readOnly={true}
                  />
                </td>
                <td className="">
                  <div className="grow relative">
                    {fila.nuevo ?
                      null :
                      <div
                        key={index + "itemset"}
                        className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer'
                        onClick={() => { habilitarInputOnclick(index) }}>
                      </div>
                    }

                    <input
                     name={fila.nuevo ?`nuevo${index}`:undefined}
                      type="text"
                      value={fila.ParametrosEfecty}
                      onChange={(e) => handleChange(index, "ParametrosEfecty", e.target.value)}
                      className=' px-2'
                      // disabled={!fila.nuevo}
                    />
                  </div>

               

              </td>
                {/* <td className="  px-4 flex justify-center">
                  <div onClick={() => eliminarFila(fila.idParametrosEfecty, index)} className=" text-coomeva_color-rojo hover:text-red-800">
                    <TbTrashXFilled size={25} />
                  </div>
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>

    </form>
      {
    mostrarModal &&
      <DynamicModal titulo={'Notificación'} mostrarModal={cerrarModal} mostrarImagneFondo={true}>
        <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{
          messageModal
        }</p>
      </DynamicModal>
  }
    </div >
  );
};

