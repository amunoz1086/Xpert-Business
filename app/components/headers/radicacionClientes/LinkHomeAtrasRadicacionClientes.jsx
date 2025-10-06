'use client'

import { TiArrowBack, TiHome, TiDelete } from "react-icons/ti";
import { usePathname, useRouter } from 'next/navigation'
import { useDatosFuncionProvider } from "@/app/hooks/useDatosFuncionProvider";
import { usePerfil } from "@/app/hooks/usePerfil";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
// import { useDatosFuncionProvider } from "@/app/hooks/useDatosFuncionProvider";



const LinkHomeAtrasRadicacionClientes = ({ perfilActivo }) => {

    const { limpiarProviderContext } = useDatosFuncionProvider();
    const { limpiarProviderRadicacionCliente } = usePerfil();
    const { limpiarConsorcio } = useProviderRadClient();

    const pathName = usePathname();
    const pageActual = (pathName.split('/'))[2] || (pathName.split('/'))[1];
    const router = useRouter();

    const navegarAtrar = () => {
        //  router.back()
    };


    const navegarHome = () => {
        // router.push('/login/administracion')
    };


    const cancelarOperacion = (reset = false) => {
        // if (perfilActivo === 2) {
        limpiarProviderContext(true);
        limpiarProviderRadicacionCliente(true);
        limpiarConsorcio();
        localStorage.removeItem('btnGuardar');
        router.push('/radicacionCliente/radicacionPj/datosPersonaJuridicaPj');
        //     return
        // }
        // router.push('/radicacion/bandejaSolicitudes')
    };


    return (

        <div className="flex space-x-2">
            <TiHome onClick={navegarHome} disabled={true} className={`text-coomeva_color-grisPestaña w-8 h-6`} />
            <TiArrowBack onClick={navegarAtrar} disabled={true} className={`text-coomeva_color-grisPestaña w-8 h-6`} />
            <TiDelete onClick={cancelarOperacion} className={`${pageActual !== 'bandejaSolicitudes' && perfilActivo !== 3 ? 'text-white ' : 'text-gray-400'}  w-6 h-6 cursor-pointer`} />
        </div>

    )
}

export default LinkHomeAtrasRadicacionClientes