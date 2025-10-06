'use client'

import { TiArrowBack, TiHome, TiDelete } from "react-icons/ti";
import { usePathname, useRouter } from 'next/navigation'
import { useDatosFuncionProvider } from "@/app/hooks/useDatosFuncionProvider";
// import { useDatosFuncionProvider } from "@/app/hooks/useDatosFuncionProvider";



const LinkHomeAtrasAdministracion = ({ perfilActivo }) => {

    const {limpiarProviderContext}=useDatosFuncionProvider()


    const pathName = usePathname()

    const pageActual = (pathName.split('/'))[2]||(pathName.split('/'))[1]

    const router = useRouter()

    const navegarAtrar = () => {

        //  router.back()

    }


    const navegarHome = () => {

            router.push('/login/administracion')
    }

    const cancelarOperacion = (reset = false) => {


        // if (perfilActivo === 2) {
        //     limpiarProviderContext(true)

        //     router.push('/radicacion')
        //     return
        // }


        // router.push('/radicacion/bandejaSolicitudes')
    }





    return (

        <div className="flex space-x-2">
            <TiHome onClick={navegarHome} disabled={true} className={`${pageActual !== 'bandejaSolicitudes' && perfilActivo !== 3 ? 'text-white' : 'text-gray-400'}  w-8 h-6 cursor-pointer`} />
            <TiArrowBack onClick={navegarAtrar} disabled={true} className={`text-coomeva_color-grisPestaña w-8 h-6`} />
            <TiDelete onClick={cancelarOperacion} disabled={true} className={`text-coomeva_color-grisPestaña w-8 h-6`} />

        </div>

    )
}

export default LinkHomeAtrasAdministracion