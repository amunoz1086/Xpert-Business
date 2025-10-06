'use client'

import { usePathname } from "next/navigation"

const titulo= {
    'convenioPago':'Parametrización Convenio Pago',
    'convenioRecaudo':'Parametrización Convenio Recaudo',
    'servicioFinanciero':'Parametrización Servicios Financieros',
    'depositoVista':'Parametrización DEPÓSITOS A LA VISTA'
}

const SubtituloNavbarAdmin = () => {

   const pathName = usePathname()

    return (
        <div className="w-full bg-coomeva_color-grisPestaña p-1 text-center text-white ">
            <span>{titulo[pathName.split('/')[2]]}</span>
        </div>
    )
}

export default SubtituloNavbarAdmin
