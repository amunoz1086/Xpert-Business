'use client';

import { useContext, useEffect, useState } from "react";
import ItemsSolicitudBandeja from "./ItemsSolicitudBandeja";
import { DataContext } from "@/app/provider/Providers";
import { queryListarSolicitudes } from '@/app/lib/solicitudes/queryListarSolicitudes';
import dynamic from 'next/dynamic';
import Loading from "@/app/components/share/Loading";
import { useDatosFuncionProvider } from "@/app/hooks/useDatosFuncionProvider";

const DynamicModal = dynamic(() => import('../../components/share/Modals'));

export default function BandejaSolicitud({ searchParams, contextRadClient }) {

  const valorConsulta = searchParams?.q || '';
  const [showModal, setShowModal] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const contextData = useContext(DataContext);
  const { limpiarProviderContext } = useDatosFuncionProvider();
  const [lista, setLista] = useState([]);


  useEffect(() => {
    listaBandejaSolicitud()
    limpiarProviderContext()

  }, []);


  const listaBandejaSolicitud = async () => {

    setShowLoading(true);

    try {
      const response = await queryListarSolicitudes();
      const resp = JSON.parse(response);

      if (resp.STATUS) {
        let data = JSON.parse(resp.DATA);
        setLista(data);
      } else {
        setShowLoading(false);
        setMessageAlert(resp.MESSAGE);
        setShowModal(true);
      };

      setShowLoading(false);

    } catch (error) {
      setShowLoading(false);
      console.log(error);
    };

  };

  const filtrardData = valorConsulta !== '' && valorConsulta !== undefined ? lista.filter(e => e.NIT_CLIENTE === valorConsulta) : lista;
  const endModal = () => setShowModal(false);

  return (
    <div className="overflow-y-scroll h-[60vh]">

      {
        showLoading && <Loading />
      }

      {
        (showModal)
        &&
        <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
        </DynamicModal>
      }

      {filtrardData.map(solicitud => (<ItemsSolicitudBandeja key={solicitud.COD_SOLICITUD} contextData={contextData} solicitud={solicitud} />))}

    </div>
  )
};