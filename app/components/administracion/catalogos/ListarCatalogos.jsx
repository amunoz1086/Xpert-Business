'use client';

import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../../share/Loading';
import { fnQueryPoolCatalogos } from '@/app/lib/admin/catalogos/fnQueryPoolCatalogos';
import { fnQueryListarCatalogos } from '@/app/lib/admin/catalogos/fnQueryListarCatalogos';

const DynamicModal = dynamic(() => import('../../share/Modals'));

export const ListarCatalogos = ({ listPlan }) => {

  const [loading, setLoading] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalConfirmar, setMostrarModalConfirmar] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [filas, setFilas] = useState(listPlan);


  const actualizarCatalogos = async () => {
    setLoading(true);
    try {
      const resActualizarCatalogos = JSON.parse(await fnQueryPoolCatalogos());
      if (resActualizarCatalogos.status === 200) {
        setLoading(false);
        setMessageModal('Los Catálogos de la app fueron actualizados');
        setMostrarModal(true);
      } else {
        setLoading(false);
        setMessageModal(`${resActualizarCatalogos.message}`);
        setMostrarModal(true);
      };
    } catch (err) {
      console.log(err);
    }
  };


  const cerrarModal = async () => {
    setMostrarModal(!mostrarModal)
    const resList = JSON.parse(await fnQueryListarCatalogos());
    setFilas(resList.DATA)
  };


  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getUTCFullYear();
    return `${dia}/${mes}/${año}`;
  };


  return (
    <div className=" w-[90%] h-[80%]">
      <table className="w-full radiusTopTable">
        <thead className=" text-coomeva_color-rojo text-xs bg-coomeva_color-grisPestaña2 top-0">
          <tr className="divide-x divide-gray-300" >
            <th className="p-3 w-[30%] text-center">CATALOGO</th>
            <th className="p-3 w-[30%] text-center">ULTIMA ACTUALIZACION</th>
            <th className="p-3 w-[10%] text-center"></th>
          </tr>
        </thead>
      </table>
      <div className="w-full border border-coomeva_color-grisPestaña2 shadow-md overflow-y-auto radiusBottomTable h-[70%]">
        <div className="w-full">
          <table className="w-full">
            <tbody id="datosPlan" className="text-[11.5px] text-coomeva_color-azulOscuro font-semibold">
              {filas?.map((fila, index) => (
                <tr key={index}>
                  <td className="p-2 w-[17%]">
                    <input
                      id={index + 'nombre'}
                      type="text"
                      className="p-2 w-full bg-transparent"
                      value={fila.catalogo} readOnly />
                  </td>
                  {/* <td className="p-2 w-[17%]">
                    <input
                      id={index + 'nombre'}
                      type="text"
                      className="p-2 w-full bg-transparent text-center"
                      value={fila.pathCat} readOnly />
                  </td> */}
                  <td className="p-2 w-[17%]">
                    <input
                      id={index + 'nombre'}
                      type="text"
                      className="p-2 w-full bg-transparent text-center"
                      value={formatFecha(fila.fech_actualizacion)} readOnly />
                  </td>
                  <td className="p-2 w-[4.95%] content-center justify-items-center">
                    {
                      fila.fechaUltima !== null ?
                        <IoIosCheckmarkCircle className={`text-[1rem] h3LogoAministracion pointer-events-none`} />
                        :
                        <FaCircleXmark className={`text-[0.85rem] tituloAdministracion pointer-events-none`} />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex justify-end pt-10">
        {/* <button className={`w-[180px] bg-coomeva_color-rojo text-xs rounded-md text-center py-3 text-white m-4`} onClick={() => nuevoPath()}>
          Nuevo Path
        </button> */}
        <button className={`w-[180px] bg-coomeva_color-rojo text-xs rounded-md text-center py-3 text-white m-4`} onClick={() => actualizarCatalogos()}>
          Actualizar Catálogos
        </button>
      </div>

      {
        (mostrarModal)
        &&
        <DynamicModal titulo={'Notificación'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModal}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
        </DynamicModal>
      }
      {
        (mostrarModalConfirmar) ?
          <DynamicModal titulo={'Notificación'} mostrarImagneFondo={true} mostrarModal={handleDelete} cerrarModal={() => { setMostrarModalConfirmar(false) }}>
            <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
          </DynamicModal>
          : undefined
      }
      {
        loading && <Loading />
      }

    </div>
  );
};