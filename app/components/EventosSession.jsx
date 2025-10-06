'use client'

import { useInactividad } from '../hooks/useInactividad';
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useDatosFuncionProvider } from "../hooks/useDatosFuncionProvider";

import Loading from "./share/Loading";
import { logout } from '../lib/auth/auth';

const DynamicModal = dynamic(() => import('./share/Modals'));

export const EventosSession = () => {

  const { limpiarProviderContext } = useDatosFuncionProvider();
   const { push } = useRouter();
   const [navegar, setNavegar] = useState(false)
   const pathName =usePathname()

  const { showModal, expiroSession,messageAlert } = useInactividad();

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {

    if(expiroSession){

      if(pathName!=='/login'){logoutSession()} 
    }
   
  }, [expiroSession])

  useEffect(() => {
    if(navegar){
      push('/login')
    }
    
  }, [navegar])
  
  
  const logoutSession = async () => {

    limpiarProviderContext();
    setLoading(true);

    try {
      await logout();
      setLoading(false);

      setNavegar(true)
     
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      {(showModal && (pathName!=='/login')) && (
        <DynamicModal
          titulo="Notificación"
          ocultarBtnCancelar={true}
          ocultarBtnContinuar={true}
          textBtnContinuar="Continuar"
          mostrarImagneFondo={true}
        >
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">
          {messageAlert} 
          </p>
        </DynamicModal>
      )}
      {loading && <Loading />}
    </>

  );
}