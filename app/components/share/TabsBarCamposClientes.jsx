'use client'

import { dataPageDatosCliente, validarNavegacionAtras } from '@/app/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

const DynamicModal = dynamic(() => import('./Modals'));

const TabsBarCamposClientes = ({ Tabs, activeTab }) => {
    const [rutaNavegar, setRutaNavegar] = useState('')
    const [mostrarModal, setMostrarModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const { push } = useRouter()
    const pathname = usePathname()
    const navegarRuta = (tab) => {
        setRutaNavegar(tab.href)
        const pageActual = pathname.split('/')[3]
        if (pageActual == 'pj' || pageActual == 'pn') {
            const dataForm = dataPageDatosCliente({ pageActual: pathname.split('/')[4] })
            if (dataForm.length > 0) {
                setMessageModal('Hay cambios sin guardar. Si continúa, se perderán')
                setMostrarModal(true)
                return
            }
        }
        push(tab.href)
    }
    const btnContinuarModal = () => {
        setMostrarModal(!mostrarModal)
        push(rutaNavegar)
    }
    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
    }
    return (
        <div className="flex" >
            {
                Tabs.map(tab => (
                    <button
                        key={tab.name}
                        onClick={() => navegarRuta(tab)}
                        aria-label="navegar a convenio pago"
                        // disabled={tab.tab === "documentos"}
                        className={`w-[20%] py-2 px-4 text-center text-[15px] text-coomeva_color-grisLetras mx-2 
                            ${pathname === tab.href || activeTab == tab.href ? 'bg-white border-2 border-b-0' : 'bg-coomeva_color-grisPestaña2 '}  
                            rounded-tr-lg rounded-tl-lg 
                           
                            `}
                    >
                        {tab.name}
                    </button>
                ))
            }
            {
                (mostrarModal)
                    ?
                    <DynamicModal titulo={'Notificación'} cerrarModal={cerrarModal} mostrarImagneFondo={true} mostrarModal={btnContinuarModal}>
                        <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
                    </DynamicModal>
                    :
                    undefined
            }
        </div>
    )
}

export default TabsBarCamposClientes