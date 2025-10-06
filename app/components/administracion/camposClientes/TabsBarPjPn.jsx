'use client'
import React, { useEffect, useState } from 'react'
import TabsBarCamposClientes from '../../share/TabsBarCamposClientes'
import { dataPageDatosCliente, TabsCamposClientes, TabsCamposClientPn } from '@/app/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

import dynamic from "next/dynamic";


const DynamicModal = dynamic(() => import('../../share/Modals'))


const TabsBarPjPn = ({ context }) => {

  const [mostrarModal, setMostrarModal] = useState(false)

  const [messageModal, setMessageModal] = useState('')


  const pathName = usePathname()
  const { push } = useRouter()

  const pageActual = pathName.split('/')[4]

  const [mostrarPNpJ, setMostrarPNpJ] = useState(pathName.split('/')[3])
  const [opcionBtn, setOpcionBtn] = useState(pathName.split('/')[3])

  useEffect(() => {

    const handlePjPn = (e) => {


      const dataForm = dataPageDatosCliente({ pageActual })

      if (dataForm.length > 0) {
        setOpcionBtn(e.detail)
        setMessageModal('Hay cambios sin guardar. Si continúa, se perderán')
        setMostrarModal(true)
        return
      }

      push(`/administracion/camposClientes/${e.detail}/perfil`)

    };
    window.addEventListener("pj", handlePjPn);

    return () => {

      window.removeEventListener("pj", handlePjPn)
    };
  }, []);




  const cerrarModal = () => {
    setMostrarModal(!mostrarModal)
  }

  const btnContinuarModal = () => {

    setMostrarModal(!mostrarModal)
    push(`/administracion/camposClientes/${opcionBtn}/perfil`)

  }


  return (
    < >
      {mostrarPNpJ === 'pj' ? <TabsBarCamposClientes Tabs={TabsCamposClientes} context={context} /> : null}
      {mostrarPNpJ === 'pn' ? <TabsBarCamposClientes Tabs={TabsCamposClientPn} context={context} /> : null}
      {
        (mostrarModal)
          ?

          <DynamicModal titulo={'Notificación'} cerrarModal={cerrarModal} mostrarImagneFondo={true} mostrarModal={() => { btnContinuarModal() }}>
            <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
          </DynamicModal>
          :
          undefined

      }


    </>

  )
}

export default TabsBarPjPn