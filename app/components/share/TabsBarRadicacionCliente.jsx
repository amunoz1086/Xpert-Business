'use client'

import { saveDraft } from '@/app/lib/utils/draft';
import { dataPageDatosCliente } from '@/app/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from "next/dynamic";
import Loading from './Loading';
//import { fnInspektor } from '@/app/lib/inspektor/fn_inspektor';

const DynamicModal = dynamic(() => import('./Modals'))

/**
 * @param {Object} props
 * @param {Array} props.Tabs
 * @param {string} props.activeTab
 * @param {Object} props.perfilPj
 * @param {Function} props.context
 * @param {Object.<string, Function>} props.validations
 * @param {(errors: string[]) => void} props.onValidationError
 */
export const TabsBarRadicacionCliente = ({
  Tabs,
  activeTab,
  perfilPj,
  context,
  validations = {},
  onValidationError = () => { }
}) => {
  const dataContext = context()
  const [loading, setLoading] = useState(false)
  const [rutaNavegar, setRutaNavegar] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarModalValidacionNit, setMostrarModalValidacionNit] = useState(false)
  const [messageModal, setMessageModal] = useState('')
  const [hrefActual, setHrefActual] = useState('')

  const { push } = useRouter()
  const pathname = usePathname()

  const navegarRuta = async (tab) => {
    const segments = pathname.split('/')
    const pageActual = segments[3]
    const subPage = segments[4]

    // 1) per-tab custom validations
    if (typeof validations[tab.tab] === 'function') {
      const errs = validations[tab.tab]()
      if (Array.isArray(errs) && errs.length) {
        onValidationError(errs)
        return
      }
    }

    // 2) unsaved-changes guard
    setRutaNavegar(tab.href)
    if (pageActual === 'pj' || pageActual === 'pn') {
      const dataForm = dataPageDatosCliente({ pageActual, subPage })
      if (dataForm.length > 0) {
        setMessageModal('Hay cambios sin guardar. Si continúa, se perderán')
        setMostrarModal(true)
        return
      }
    }

    // 3) HTML5 form validity
    const form = document.getElementById(pageActual)
    if (form && !form.checkValidity()) {
      form.reportValidity()
      return
    }

    /* // 4) NIT/Cédula batch check
    const keyCtx = {
      datosPersonaNaturalPn: 'perfilPn',
      datosAdicionales: 'referenciaPn',
      representanteLegalPj: 'representanteLegalPj',
      datosPersonaJuridicaPj: 'perfilPj',
      contactosAutorizadosPj: 'contactoAutorizadoPj',
      juntaDirectivaPj: 'juntaDirectivaPn',
      accionistasPj: 'accionistaPj',
      controlantesPj: 'controlantesPj',
      beneficiariosPj: 'beneficiarioPj'
    }
    const dataCtxPage = dataContext[keyCtx[pageActual]]
    const habilitar = ['1','2','3','4'].includes(dataContext.clienteNuevoProspectoActualizar)
    if (habilitar && dataCtxPage !== undefined) {
      const batch = Array.isArray(dataCtxPage)
        ? dataCtxPage.map(item => ({
            identification: item.numeroIdentificacion,
            identificationType: item.tipoIdentificacion
          }))
        : [{
            identification: dataCtxPage.numeroIdentificacion,
            identificationType: dataCtxPage.tipoIdentificacion
          }]
      for (const d of batch) {
        setLoading(true)
        const resp = JSON.parse(await fnInspektor(JSON.stringify(d)))
        setLoading(false)
        if (resp.authorized === false || resp.state !== 200) {
          setMessageModal(resp.message)
          setMostrarModalValidacionNit(true)
          setHrefActual(tab.href)
          return
        }
      }
    } */

    // 5) **SAVE DRAFT** before leaving
    const draftData = dataPageDatosCliente({ pageActual, subPage })
    saveDraft(pageActual, draftData)

    // 6) finally navigate
    push(tab.href)
  }

  const cerrarModal = () => setMostrarModal(false)
  const btnContinuarModal = () => {
    setMostrarModal(false)
    push(rutaNavegar)
  }
  const cerrarModalValidacionNit = () => {
    setMostrarModalValidacionNit(false)
    push(hrefActual)
  }

  return (
    <div className="flex justify-evenly">
      {Tabs.map(tab => {
        const isDisabled =
          tab.tab === "documentos" ||
          (!(perfilPj?.datosGenerales?.tipoSociedad >= 10 &&
            perfilPj?.datosGenerales?.tipoSociedad <= 36)
            && tab.tab === 'controlantes') ||
          ((!((perfilPj?.datosGenerales?.tipoSociedad >= 1 &&
            perfilPj?.datosGenerales?.tipoSociedad <= 8) ||
            (perfilPj?.datosGenerales?.tipoSociedad >= 37 &&
              perfilPj?.datosGenerales?.tipoSociedad <= 38)))
            && tab.tab === 'accionistas') ||
          (!((perfilPj?.datosGenerales?.tipoSociedad == 24) ||
            (perfilPj?.datosGenerales?.tipoSociedad == 30) ||
            (perfilPj?.datosGenerales?.tipoSociedad == 28) ||
            (perfilPj?.datosGenerales?.tipoSociedad == 33))
            && tab.tab === 'administradorFiduciario')||
          (!((perfilPj?.datosGenerales?.tipoSociedad == 20))
            && tab.tab === 'titularConsorcio')||
          (!((perfilPj?.datosGenerales?.tipoSociedad == 20))
            && tab.tab === 'administradorConsorcio')

        return (
          <button
            key={tab.name}
            onClick={() => { if (!isDisabled) navegarRuta(tab) }}
            disabled={isDisabled}
            aria-label={`navegar a ${tab.name}`}
            className={`
              py-2 px-4 text-center text-[15px] text-coomeva_color-grisLetras mx-2
              ${pathname === tab.href || activeTab === tab.href
                ? 'bg-white border-2 border-b-0'
                : 'bg-coomeva_color-grisPestaña2'}
              rounded-tr-lg rounded-tl-lg
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {tab.name}
          </button>
        )
      })}

      {/* Unsaved changes modal */}
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

      {/* NIT/Cédula validation modal */}
      {mostrarModalValidacionNit && (
        <DynamicModal
          titulo="Notificación"
          textBtnContinuar="Ok"
          ocultarBtnCancelar={true}
          mostrarImagneFondo={true}
          mostrarModal={cerrarModalValidacionNit}
        >
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">
            {messageModal}
          </p>
        </DynamicModal>
      )}

      {/* Loading spinner */}
      {loading && <Loading />}
    </div>
  )
}
