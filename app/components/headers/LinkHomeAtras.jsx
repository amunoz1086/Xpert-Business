'use client'

import { TiArrowBack, TiHome, TiDelete } from "react-icons/ti";
import { usePathname, useRouter } from 'next/navigation'
import { useDatosFuncionProvider } from "@/app/hooks/useDatosFuncionProvider";


const LinkHomeAtras = ({ perfilActivo }) => {

    const { limpiarProviderContext } = useDatosFuncionProvider();
    const pathName = usePathname();
    const pageActual = (pathName.split('/'))[2] || (pathName.split('/'))[1];
    const router = useRouter();

    const navegarAtrar = () => {
        localStorage.removeItem('controlRol');
        localStorage.removeItem('listRol');
        localStorage.removeItem('rolFiltrados');
        localStorage.removeItem('administradorConsorcio');
        localStorage.removeItem('titularConsorcio');
        localStorage.removeItem('tipoCompania');
        pageActual !== 'bandejaSolicitudes' && perfilActivo !== 3 && router.back()
    };


    const navegarHome = () => {

        if (perfilActivo === 2) {
            router.push('/radicacion')
        }
    };


    const cancelarOperacion = (reset = false) => {

        if (+perfilActivo === 2) {
            limpiarProviderContext(true);
            localStorage.removeItem('controlRol');
            localStorage.removeItem('listRol');
            localStorage.removeItem('rolFiltrados');
            localStorage.removeItem('administradorConsorcio');
            localStorage.removeItem('titularConsorcio');
            localStorage.removeItem('tipoCompania');
            pageActual !== 'bandejaSolicitudes' && perfilActivo !== 3 && router.back()
            //router.push('/radicacion');
            //return
        }

        //router.push('/radicacion/bandejaSolicitudes')
    };


    return (

        <div className="flex space-x-2">
            <TiHome onClick={navegarHome} disabled={true} className={`${pageActual !== 'bandejaSolicitudes' && perfilActivo !== 3 ? 'text-white' : 'text-gray-400'}  w-8 h-6 cursor-pointer`} />
            <TiArrowBack onClick={navegarAtrar} className={`${pageActual !== 'bandejaSolicitudes' && perfilActivo !== 3 ? 'text-white' : 'text-gray-400'}  w-8 h-6 cursor-pointer`} />
            <TiDelete onClick={cancelarOperacion} className={`${pageActual !== 'bandejaSolicitudes' && perfilActivo !== 3 ? 'text-white ' : 'text-gray-400'}  w-6 h-6 cursor-pointer`} />
        </div>

    )
};

export default LinkHomeAtras;