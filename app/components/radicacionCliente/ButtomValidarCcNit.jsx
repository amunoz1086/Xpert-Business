'use client'
//import { fnInspektor } from '@/app/lib/inspektor/fn_inspektor'

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Loading from '../share/Loading';
import { usePathname, useRouter } from 'next/navigation';
const DynamicModal = dynamic(() => import('../share/Modals'))


export const ButtomValidarCcNit = ({ contextRadClient, ruta, nitTipoDocumento }) => {

  const dataContext = contextRadClient()
  const { clienteNuevoProspectoActualizar, perfilPj } = dataContext
  const [mostrarModal, setMostrarModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [loading, setLoadin] = useState(false);
  //const [hrefActual, setHrefActual] = useState('')

  const { push } = useRouter()
  const pathname = usePathname()


  //console.log(perfilPj)

  const onclickContinuar = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    let rutaNavergar = typeof ruta === 'function' ? await ruta() : ruta;
    if (!rutaNavergar) return;

    /* if (perfilPj?.datosGenerales?.tipoSociedad != '' && perfilPj?.datosGenerales?.tipoSociedad != undefined) {
      if ((ruta === '/radicacionCliente/radicacionPj/accionistasPj') && !(((perfilPj?.datosGenerales?.tipoSociedad >= 1 && perfilPj?.datosGenerales?.tipoSociedad <= 8) || (perfilPj?.datosGenerales?.tipoSociedad >= 37 && perfilPj?.datosGenerales?.tipoSociedad <= 38)))) {
        rutaNavergar = '/radicacionCliente/radicacionPj/controlantesPj'
      }
      if (ruta === '/radicacionCliente/radicacionPj/controlantesPj' && !((perfilPj?.datosGenerales?.tipoSociedad >= 10 && perfilPj?.datosGenerales?.tipoSociedad <= 36))) {
        rutaNavergar = '/radicacionCliente/radicacionPj/beneficiariosPj'
      }
    }; */

    const pageActual = pathname.split('/')[3];
    const formularioValido = validarCamposObligaroriosNavegar();


    if (formularioValido) {

      /* const keyContextPaginaActual = {
        datosPersonaNaturalPn: 'perfilPn',
        datosAdicionales: 'referecniaPn',
        representanteLegalPj: 'representanteLegalPj',
        datosPersonaJuridicaPj: 'perfilPj',
        contactosAutorizadosPj: 'contactoAutorizadoPj',
        juntaDirectivaPj: 'juntaDirectivaPn',
        accionistasPj: 'accionistaPj',
        controlantesPj: 'controlantesPj',
        beneficiariosPj: 'beneficiarioPj'
      } */

      /* const dataContextPaginaActual = dataContext[keyContextPaginaActual[pageActual]]

      const identificacionNitPaginaActual = {
        datosPersonaNaturalPn: 'informacionGenerales',
        datosAdicionales: 'referecniaPn',
        datosAdicionales: [' referenciaFamiliar', 'referenciaPersonal']
      } */

      /* let resultadoValidacion = {}

      const habilitar = (clienteNuevoProspectoActualizar == '1' || clienteNuevoProspectoActualizar == '2' || clienteNuevoProspectoActualizar == '3' || clienteNuevoProspectoActualizar == '4')

      if (habilitar) {

        if (dataContextPaginaActual != undefined) {

          if (Array.isArray(dataContextPaginaActual)) {


            if (dataContextPaginaActual.length > 0) {



              for (const [i, item] of dataContextPaginaActual.entries()) {



                resultadoValidacion = await validarCedulaNit({ identification: item.numeroIdentificacion, identificationType: item.tipoIdentificacion })

                if (resultadoValidacion?.authorized == false) {



                  break

                }

              };

            } else {
              resultadoValidacion = {
                authorized: true,

              }
            }

          } else {


            const propiedad = identificacionNitPaginaActual[pageActual]

            if (Array.isArray(propiedad)) {


              for (const [i, item] of propiedad.entries()) {

                resultadoValidacion = await validarCedulaNit({ identification: dataContextPaginaActual[item]?.tipoIdentificacion, identificationType: dataContextPaginaActual[item]?.numeroIdentificacion })

                if (resultadoValidacion?.authorized == false) {

                  break

                }

              };


            } else {

              resultadoValidacion = await validarCedulaNit({ identification: dataContextPaginaActual[propiedad]?.tipoIdentificacion, identificationType: dataContextPaginaActual[propiedad]?.numeroIdentificacion })

            }

          }

          if (resultadoValidacion?.authorized == false) {
            setMessageModal(resultadoValidacion?.message)
            setMostrarModal(true)

            setHrefActual(ruta)

            return

            // return
          }


          push(rutaNavergar)
        }

      } */

      push(rutaNavergar)
    }

  }


  /* const validarCedulaNit = async (datos) => {

    setLoadin(true)

    try {

      const data = JSON.stringify(datos);
      const response = JSON.parse(await fnInspektor(data));

      if (response.authorized == false || response.state != 200) {
        return response
      }


    } catch (error) {

      console.log(error)
      return {
        authorized: false,
        message: 'Faltan datos'
      }

    } finally {
      setLoadin(false)
    }
  } */

  const validarCamposObligaroriosNavegar = () => {

    const pageActual = pathname.split('/')[3]
    let formularioValido = true

    // let nombreKey = pageActual == 'contactosAutorizadosPj' ? 'contactoAutorizadoPj' : pageActual

    const formId = document.getElementById(pageActual)

    if (!valiacionFormulario(formId)) {
      formularioValido = false
    }
    return formularioValido
  }


  const valiacionFormulario = (formId) => {
    if (formId) {
      if ((!formId.checkValidity())) {
        formId.reportValidity()
        //   formId2.reportValidity()
        return false
      }
    }
    return true
  }

  const cerrarModal = async () => {
    setMostrarModal(false);
    const rutaDestino = typeof ruta === 'function' ? await ruta() : ruta;

    if (typeof rutaDestino === 'string') {
      push(rutaDestino);
    } else {
      console.warn('Ruta inválida en cerrarModal:', rutaDestino);
    }
  }

  return (
    <>
      {
        loading ? <Loading /> : undefined
      }

      <div className='flex justify-end'>
        <button className='text-white bg-coomeva_color-rojo py-1 px-2 rounded-md w-40 text-xs h-10' type="button" onClick={(e) => { onclickContinuar(e) }}>Continuar</button>
        {
          (mostrarModal)
            ?
            <DynamicModal titulo={'Notificación'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModal}>
              <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
            </DynamicModal> : undefined
        }
      </div>
    </>
  )
}