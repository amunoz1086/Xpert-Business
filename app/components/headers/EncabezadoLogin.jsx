'use client'

import { useState } from "react";
import Link from 'next/link'
import { TiArrowBack } from "react-icons/ti";
import { FaSignOutAlt } from 'react-icons/fa';
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/lib/auth/auth";
import { useDatosFuncionProvider } from "@/app/hooks/useDatosFuncionProvider";
import Loading from "../share/Loading";

function EncabezadoLogin({ title, subtitle, parrafo, session }) {

  const [loading, setLoading] = useState(false);
  const { limpiarProviderContext } = useDatosFuncionProvider();
  const pathName = usePathname();
  const route = useRouter();
  const tamSubtitulo = "fontBold";


  const cerrarSession = async (e) => {
    try {

      setLoading(true);
      await logout();

      limpiarProviderContext();
      setLoading(false);
      route.push('/login')

    } catch (error) {
      console.log(error)
    }
  };

  const regresar = () => {
    route.back()
  }



  return (
    <div className="mb-14 w-full">

      {
        (pathName.split('/')[2]) === 'administracion' ? <Link href={'/login/perfil'} className=" flex justify-end">
          <TiArrowBack className={` text-coomeva_color-azulClaro  w-16 h-7 cursor-pointer`} />
        </Link> : undefined
      }

      <div className="flex w-full justify-end items-center">
        {
          (pathName.split('/')[2]) === 'opciones' || (pathName.split('/')[2]) === 'depositoVista' ? <button onClick={regresar} className=" flex justify-end">
            <TiArrowBack className={` text-coomeva_color-azulClaro  w-16 h-7 cursor-pointer`} />
          </button> : undefined
        }

        {
          (pathName.split('/')[2]) === 'perfil' || (pathName.split('/')[2]) === 'opciones' || (pathName.split('/')[2]) === 'depositoVista' ?
            <div className=" flex justify-end pr-8" >
              <button onClick={cerrarSession} id="btnLogoutPerfil">
                <FaSignOutAlt className={`text-coomeva_color-azulClaro  w-8 h-6 cursor-pointer classFaSignOutAlt`} /* style={{ pointerEvents: 'none' }} */ />
              </button>

            </div> : undefined
        }
      </div>

      <div className="relative h-full" /* style={{ position: "relative", height: "100%" }} */>
        <img
          className=" absolute -top-10 left-0 w-20 h-20"
          width={60}
          height={60}
          src="/logos/logogris.svg"
          alt="logo"
        />
      </div>
      <div className={`classDiplay ${parrafo ? '' : 'classDisplayHiddenParrafo'}`} /* style={{ display: `flex`, justifyContent: "center", alignItems: "center", gap: "60px", marginLeft: "40px" }} */>
        <div id="contLogo" className="" >
          <h1 className="font-bold text-coomeva_color-azulOscuro text-xl">{title}</h1>
          <p className={`text-xs font-semibold ${tamSubtitulo} colorSubtitulo`}>{subtitle}</p>

        </div>
        <div className="">
          <p className="text-xs text-gray-500 ">{parrafo}</p>
        </div>
      </div>

      {
        loading && <Loading />
      }
    </div>

  );
}

export default EncabezadoLogin;