'use client'

import React, { useState } from 'react'
import {
  TabsPersonalNaturalRadicacionCliente,
  TabsPersonaJuridicaRadicacionClienteSegundo
} from '@/app/lib/utils'
//import { usePathname, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { TabsBarRadicacionCliente } from '../share/TabsBarRadicacionCliente'
import {
  validateDatosPersonalesCliente,
  validateResidenciaFiscal,
  validateDatosBasicos
} from '@/app/lib/utils/validaciones'

const DynamicModal = dynamic(() => import('../share/Modals'))

const TabsBarSeleccionadoSegundo = ({ contextRadClient }) => {
  const { tabBarSeleccionado, perfilPj } = contextRadClient()

  // estado para errores de validación
  const [modalErrors, setModalErrors] = useState([])
  const [showErrorModal, setShowErrorModal] = useState(false)

  // mapa tab → función de validación
  const validations = {
    datosPersonales: () => validateDatosPersonalesCliente(contextRadClient),
    residenciaFiscal: () => validateResidenciaFiscal(contextRadClient),
    datosBasicos: () => validateDatosBasicos(contextRadClient),
    // agregar más validaciones si es necesario
  }

  // callback cuando hay errores
  const onValidationError = (errs) => {
    setModalErrors(errs)
    setShowErrorModal(true)
  }

  return (
    <>
      {tabBarSeleccionado !== 'NIT' ? (
        <TabsBarRadicacionCliente
          Tabs={TabsPersonalNaturalRadicacionCliente}
          context={contextRadClient}
          validations={validations}
          onValidationError={onValidationError}
        />
      ) : (
        <TabsBarRadicacionCliente
          Tabs={TabsPersonaJuridicaRadicacionClienteSegundo}
          context={contextRadClient}
          perfilPj={perfilPj}
          validations={validations}
          onValidationError={onValidationError}
        />
      )}

      {showErrorModal && (
        <DynamicModal
          titulo="Errores de validación"
          mostrarImagneFondo
          cerrarModal={() => setShowErrorModal(false)}
          mostrarModal={() => setShowErrorModal(false)}
        >
          <ul className="text-red-600 list-disc list-inside">
            {modalErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </DynamicModal>
      )}
    </>
  )
}

export default TabsBarSeleccionadoSegundo
