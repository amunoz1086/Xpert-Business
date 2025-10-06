'use client'

import { useProviderRadClient } from '@/app/provider/ProviderRadicacionCliente';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loading from '../../share/Loading';
import { insertAccionistasPj, insertAccionistasPn, insertBeneficiariosPJ, insertBeneficiariosPn, insertClienteJuridico, insertContactosAutorizados, insertControlantes, insertDatosImpositivos, insertDirecciones, insertInformacionFinanciera, insertJuntaDirectivaPj, insertJuntaDirectivaPn, insertRecidenciaFiscal, insertRepresentanteLegal } from '@/app/lib/apisClientePj/actionsInsert';
import { usePerfil } from '@/app/hooks/usePerfil';
const DynamicModal = dynamic(() => import('../../share/Modals'))

export default function BtnControl({ name, perfilCliente, referencia, state, context, arial_label, url, handleTabClick, cliente, btnDefault = true,
  setEvaluar, enableButton, opcion, data, nameFuctionContext, validarCampos, descicion,
  frmId, frmId2, paddingX, functionEvaluarSolcitud, solicitarAprobacion, finalizarParametrizacion, editarCliente, functionContinuar, enviarParametrizar, bgBoton = 'bg-coomeva_color-rojo' }) {

  const [showModal, setShowModal] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');

  const [productoCorte, setproductoCorte] = useState(true);
  const router = useRouter();
  const contextRadCliente = useProviderRadClient
  const [showLoading, setShowLoading] = useState(false)

  const { inputDocument } = usePerfil()


  // const { crearClienteNuevoProspectoActualizar,clienteNuevoProspectoActualizar,actualizarBtnSolicitud,activarBtnSolicitud } = contextRadCliente()

  let {
    tipoPersona,
    perfilPn,
    residenciaFiscalPn,
    activadEconomicaPn,
    detalleActivadEconomicaPn,
    referecniaPn,
    tabBarSeleccionado,
    activarConsulta,
    perfilPj,
    representanteLegalPj,
    residenciaFiscalPj,
    juntaDirectivaPj,
    accionistaPj,
    beneficiarioPj,
    controlantesPj,
    informacionFinancieraPj,
    contactoAutorizadoPj,
    juntaDirectivaPn,
    accionistasPn,
    beneficiariosPn,
    actualizarInformacionFinancieraPj,
    crearClienteNuevoProspectoActualizar, clienteNuevoProspectoActualizar, actualizarBtnSolicitud, activarBtnSolicitud
  } = contextRadCliente()

  //const pathName = usePathname();
  //console.log((pathName.split('/'))[2])


  const opcionesFunciones = {
    'navegar': (url) => {

      enableButton && router.push(url)

    },
    'navegarActualizarContext': () => {
      if (enableButton && (!validarCampos)) {

        nameFuctionContext && updateContext()

        router.push(url)

      }
    },
    'adicionarCuentaResumen': (url) => enableButton ? validarCamposObligaroriosNavegar(url) : undefined,
    'evaluar': async () => enableButton ? await functionEvaluarSolcitud() : undefined,
    'solictarAprobacion': async () => { enableButton && await solicitarAprobacion({ message: '¿Seguro que desea enviar la operación?', functionContinuar: functionContinuar }) },
    'finalizarParametrizacion': async () => enableButton && await finalizarParametrizacion({ message: '¿Seguro que desea finalizar la operación?', functionContinuar: functionContinuar }),
    'negar': async () => enableButton ? await finalizarParametrizacion({ message: '¿Seguro que desea negar la operación?', functionContinuar: functionContinuar, observacion: true }) : undefined,
    'aprobar': async () => enableButton ? await finalizarParametrizacion({ message: '¿Seguro que desea aprobar la operación?', functionContinuar: functionContinuar }) : undefined,
    'documentos': () => "enableButton",
    'verDetalle': () => { },
    'editar': () => editarCliente(),
    'enviarParametrizar': async () => enableButton ? await enviarParametrizar() : undefined,
    'ajustar': async () => enableButton ? await finalizarParametrizacion({ message: '¿Deseas ajustar los parametros de la solicitud?', functionContinuar: functionContinuar }) : undefined,
    'productoAlCorte': async () => enableButton ? onchangeProductoAlCorte() : undefined,
    'solicitudCliente': () => {
      if (enableButton) {


        console.log('boton solictud')
        console.log(perfilCliente)
        console.log(state)

        console.log(perfilPj)

        if ((state == 200 || perfilCliente == 2||referencia=='P'||referencia=='C')) {

          console.log('cliente si esxiste')

          router.push(url)

          return

        }

        if (state == 204) {

          if (clienteNuevoProspectoActualizar == 4 && activarBtnSolicitud == true) {

            // alert('este no cliente')

            guardarDataRadicacionClientePj()

            router.push(url)
            return
          }
          setMessageAlert('Este usuario no es cliente ni prospecto. Para "Iniciar solicitud" debe llenar los campos habilitados en la pestaña Perfil y Estados financieros.¿Estás de acuerdo?')
          setShowModal(true)

        }


      }
    }
  }

  const onClickRouter = () => opcionesFunciones[opcion](url);
  const updateContext = () => context[nameFuctionContext](data);


  const validarCamposObligaroriosNavegar = (url) => {
    const formId = document.getElementById(frmId);
    const formId2 = document.getElementById(frmId2);

    if ((!formId.checkValidity()) || (!formId2.checkValidity())) {
      formId.reportValidity();
      formId2.reportValidity();
      return;
    };
    router.push(url);
  };


  const onchangeProductoAlCorte = () => {



    setproductoCorte(!productoCorte)

    const event = new CustomEvent("productoAlcorte", {
      detail: productoCorte
    });
    window.dispatchEvent(event);



  }


  const mostrarModalMensaje = ({ mensaje = '' }) => {

    setShowLoading(false);
    setMessageAlert(mensaje);
    setShowModal(true);
    return

  }

  const endModal = () => {
    actualizarBtnSolicitud(false)
    crearClienteNuevoProspectoActualizar('4')
    setShowModal(false)

  };


  const guardarDataRadicacionClientePj = async (e) => {
    setShowLoading(true)


    try {
      // e.preventDefault();

      const tipoPersonaGuardar = (tipoPersona == 'Cliente' || clienteNuevoProspectoActualizar == '1') ? 10 : (clienteNuevoProspectoActualizar == '4') ? 30 : ''


      if (Object.keys(perfilPj).length === 0) {
        mostrarModalMensaje({ mensaje: '¡Atención! No se pudo completar la acción porque no se ha ingresado información en la pestaña Perfil. Por favor, asegúrate de completar todos los campos requeridos antes de continuar.' })
      }

      const result = JSON.parse(await insertClienteJuridico(perfilPj, (inputDocument || perfilPj.NIT), tipoPersonaGuardar))

      if (result.STATUS != 200) {
        mostrarModalMensaje({ mensaje: '¡Atención! No se pudo completar la acción porque algunos campos obligatorios no han sido llenados o contienen información incorrecta. Por favor, verifica y completa todos los campos marcados como requeridos antes de continuar.' })

      }

      const resultDir = JSON.parse(await insertDirecciones(perfilPj, inputDocument || perfilPj.NIT));

      const resultResidenciaFiscal = JSON.parse(await insertRecidenciaFiscal(residenciaFiscalPj, inputDocument || perfilPj.NIT));

      if (representanteLegalPj && representanteLegalPj.length > 0) {
        for (const item of representanteLegalPj) {

          // if (!item.numeroIdentificacion || item.numeroIdentificacion.trim() === "") {
          //     mostrarModalMensaje({mensaje:'El número de documento es obligatorio en la pestaña representante legal.'})
          //     break; 
          // }

          const re = JSON.parse(await insertRepresentanteLegal(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña representante legal' })
            break

          }
          const reDirecion = JSON.parse(await insertDirecciones(item, item.numeroIdentificacion));
          const reDatosImpositivos = JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion));
        }
      }

      // Validar y procesar contacto autorizado
      if (contactoAutorizadoPj && contactoAutorizadoPj.length > 0) {

        for (const item of contactoAutorizadoPj) {
          // if (!item.numeroIdentificacion || item.numeroIdentificacion.trim() === "") {
          //     mostrarModalMensaje({mensaje:'El número de documento es obligatorio en la pestaña contacto autorizado.'})
          //     break; 
          // }
          const re = JSON.parse(await insertContactosAutorizados(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña representante legal' })
            break
          }
          const reDirecion = JSON.parse(await insertDirecciones(item, item.numeroIdentificacion));
          const reDatosImpositivos = JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion));
        }
      }

      // Validar y procesar junta directiva PJ
      if (juntaDirectivaPj && juntaDirectivaPj.length > 0) {
        for (const item of juntaDirectivaPj) {

          const re = JSON.parse(await insertJuntaDirectivaPj(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña junta directiva' })
            break
          }
        }
      }

      // Validar y procesar junta directiva PN
      if (juntaDirectivaPn && juntaDirectivaPn.length > 0) {
        for (const item of juntaDirectivaPn) {
          const re = JSON.parse(await insertJuntaDirectivaPn(item, inputDocument || perfilPj.NIT));

          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña junta directiva' })
            break
          }
          const reDatosImpositivos = JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion));

        }
      }

      // Validar y procesar accionistas PJ
      if (accionistaPj && accionistaPj.length > 0) {
        for (const item of accionistaPj) {
          const re = JSON.parse(await insertAccionistasPj(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña accionistas' })
            break
          }

          const reDirecion = JSON.parse(await insertDirecciones(item, item.numeroIdentificacion));

        }
      }

      // Validar y procesar accionistas PN
      if (accionistasPn && accionistasPn.length > 0) {
        for (const item of accionistasPn) {
          const re = JSON.parse(await insertAccionistasPn(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña accionistas' })
            break
          }
          const reDirecion = JSON.parse(await insertDirecciones(item, item.numeroIdentificacion));
          const reDatosImpositivos = JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion));

        }
      }

      // Validar y procesar controlantes PJ
      if (controlantesPj && controlantesPj.length > 0) {
        for (const item of controlantesPj) {
          const re = JSON.parse(await insertControlantes(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña controlantes' })
            break
          }
          const reDirecion = JSON.parse(await insertDirecciones(item, item.numeroIdentificacion));
          const reDatosImpositivos = JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion));
        }
      }

      // Validar y procesar beneficiarios PJ
      if (beneficiarioPj && beneficiarioPj.length > 0) {
        for (const item of beneficiarioPj) {
          const re = JSON.parse(await insertBeneficiariosPJ(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña beneficiarios' })
            break
          }
          const reDirecion = JSON.parse(await insertDirecciones(item, item.numeroIdentificacion));
        }
      }

      // Validar y procesar beneficiarios PN
      if (beneficiariosPn && beneficiariosPn.length > 0) {
        for (const item of beneficiariosPn) {
          const re = JSON.parse(await insertBeneficiariosPn(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña beneficiarios' })
            break
          }
          const reDirecion = JSON.parse(await insertDirecciones(item, item.numeroIdentificacion));
          const reDatosImpositivos = JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion));
        }
      }

      // Validar y procesar información financiera
      if (informacionFinancieraPj && informacionFinancieraPj.length > 0) {
        for (const item of informacionFinancieraPj) {
          const re = JSON.parse(await insertInformacionFinanciera(item, inputDocument || perfilPj.NIT));
          if (re.STATUS != 200) {
            mostrarModalMensaje({ mensaje: 'No se pudo completar la acción. valida los campos obligatorios de la pestaña información financiera' })
            break
          }
        }
      }

      setShowLoading(false);
      setMessageAlert('Tu información se ha guardado correctamente.');
      setShowModal(true);

    } catch (error) {
      console.error(error);

    } finally {
      setShowLoading(false);
    }

  };

  return (
    <>

      {

        btnDefault ?
          <button
            aria-label={arial_label}
            className={enableButton ? `${bgBoton}  text-white w-48 text-xs ${paddingX ? 'px-10' : 'px-6'}  py-3 mt-2 mx-2  rounded-md` : 'bg-zinc-300 text-white font-medium cursor-default w-48 mx-2 py-3 text-xs px-6 mt-2 rounded-md'}
            onClick={onClickRouter}
          >
            {name}
          </button>
          :
          <button
            aria-label={arial_label}
            className={enableButton ? `${bgBoton}  border outline-none border-coomeva_color-azulOscuro text-coomeva_color-azulOscuro  w-48 text-xs ${paddingX ? 'px-10' : 'px-6'}  py-3 mt-2 mx-2  rounded-md` : 'bg-zinc-300 text-white font-medium cursor-default w-48 mx-2 py-3 text-xs px-6 mt-2 rounded-md'}
            onClick={onClickRouter}
          >
            {name}
          </button>
      }

      {
        (showModal)
        &&
        <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
        </DynamicModal>
      }

      {
        showLoading && <Loading />
      }
    </>


  )
};