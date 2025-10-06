'use client'
import React, { useEffect, useState } from 'react'
import {
  dataPageDatosCliente,
  TabsCamposClientes,
  TabsCamposClientPn,
  TabsPersonaJuridicaRadicacionCliente,
  TabsPersonalNaturalRadicacionCliente
} from '@/app/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import dynamic from "next/dynamic";
import { TabsBarRadicacionCliente } from '../share/TabsBarRadicacionCliente';
import {
  validateDatosPersonalesCliente,
  validateResidenciaFiscal
} from '@/app/lib/utils/validaciones'

const DynamicModal = dynamic(() => import('../share/Modals'))

const TabsBarSeleccionado = ({ contextRadClient }) => {
  const { tabBarSeleccionado, perfilPj } = contextRadClient()
  const [mostrarModal, setMostrarModal] = useState(false)
  const [messageModal, setMessageModal] = useState('')
  const [modalErrors, setModalErrors] = useState([])

  const pathName = usePathname()
  const router = useRouter()
  const { push } = router
  const [opcionBtn] = useState(pathName.split('/')[3])

  // Mapa de validaciones por pestaña
  const validations = {
    datosPersonales: () => validateDatosPersonalesCliente(contextRadClient),
    residenciaFiscal: () => validateResidenciaFiscal(contextRadClient),
  }

  const closeErrorModal = () => setModalErrors([])
  const confirmErrorModal = () => {
    setModalErrors([])
    push(`/administracion/camposClientes/${opcionBtn}/perfil`)
  }

  const cerrarModal = () => setMostrarModal(!mostrarModal)
  const btnContinuarModal = () => {
    setMostrarModal(false)
    push(`/administracion/camposClientes/${opcionBtn}/perfil`)
  }

  return (
    <>
      {/* Pestañas principales */}
      {tabBarSeleccionado !== 'NIT' && (
        <TabsBarRadicacionCliente
          Tabs={TabsPersonalNaturalRadicacionCliente}
          context={contextRadClient}
          validations={validations}
          onValidationError={setModalErrors}
        />
      )}
      {tabBarSeleccionado === 'NIT' && (
        <TabsBarRadicacionCliente
          Tabs={TabsPersonaJuridicaRadicacionCliente}
          context={contextRadClient}
          perfilPj={perfilPj}
          validations={validations}
          onValidationError={setModalErrors}
        />
      )}

      {/* Modal genérico de notificación (si lo necesitas aún) */}
      {mostrarModal && (
        <DynamicModal
          titulo="Notificación"
          cerrarModal={cerrarModal}
          mostrarImagneFondo={true}
          mostrarModal={btnContinuarModal}
        >
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">
            {messageModal}
          </p>
        </DynamicModal>
      )}

      {/* Modal de errores de validación */}
      {modalErrors.length > 0 && (
        <DynamicModal
          titulo="Errores de validación"
          mostrarImagneFondo={true}
          cerrarModal={closeErrorModal}
          mostrarModal={confirmErrorModal}
        >
          <ul className="text-red-600 list-disc list-inside space-y-1">
            {modalErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </DynamicModal>
      )}
    </>
  )
}

export default TabsBarSeleccionado
