'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { queryDetalleSolicitud } from '@/app/lib/solicitudes/queryDetalleSolicitud';
import { queryEstadoSolicitud } from '@/app/lib/solicitudes/queryEstadoSolicitud';
import { conversionPesos, resetearPesos } from "@/app/lib/utils";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
import { usePerfil } from "@/app/hooks/usePerfil";
import { queryClientePj } from "@/app/lib/apisClientePj/actions";
import { queryUserPerfilCliente } from "@/app/lib/admin/usuarios/queryUserPerfilCliente";


const ItemsSolicitudBandeja = ({ solicitud, contextData, tipoPersona }) => {

  const contextRadCliente = useProviderRadClient;
  const { cliente, updateDataCliente, limpiarProvider, pathConvenio, updateDocumentoCliente, inputDocument, limpiarProviderRadicacionCliente } = usePerfil();
  const searchParam = useSearchParams();
  const { crearClienteNuevoProspectoActualizar, perfilPn, perfilPj, actualizarPerfilPn, actualizarReferenciaPn, actualizarActiviadEconomicaPn,
    actualizarDetalleActiviadEconomicaPn, actualizarResidenciaFiscalPn, actualizarTabBarSeleccionado, tabBarSeleccionado, actualizarPerfilPj, actualizarRepresentanteLegalPj,
    actualizarResidenciaFiscalPj, actualizarJuntaDirectivaPj, actualizarContactoAutorizadoPj, actualizarAccionistaPj,
    actualizarBeneficiarioPj, actualizarInformacionFinancieraPj, actualizarControlantesPj, actualizarAccionistasPn,
    actualizarBeneficiariosPn, actualizarTipoPersona,
    actualizarJuntaDirectivaPn, actualizarActivarConsulta, activarConsulta, actualizarJuntaDirectivaPjPn, actualizarCreditoProducto,
    actualizarCuentasProducto,
    actualizarCdtProducto,
    actualizarConvenioActualProducto,
    actualizarReciprocidadProducto } = contextRadCliente()
  const route = useRouter();
  const [userPermitir, setUserPermitir] = useState(false);


  useEffect(() => {
    permisosUsuario()
  }, []);


  const permisosUsuario = async () => {
    const permisos = await queryUserPerfilCliente();
    if (permisos.data.COD_PERF_CLIENTE === 2) {
      setUserPermitir(true);
    }
  };


  const detallesSolicitud = async (e, estadoSolicitud, botom, nit, tipPersona) => {

    const { updateCodigoSolictud, updateStatusCorreo } = contextData;
    let dataSolicitud = {};
    let nSolicitud = {};
    nSolicitud.cod_solicitud = parseInt(e.target.id || e.target.name);

    try {
      let response = await queryDetalleSolicitud(nSolicitud.cod_solicitud);

      let resEstadoAprobacion = await queryEstadoSolicitud(nSolicitud);

      dataSolicitud = JSON.parse(response.DATA);

      //dataSolicitud[0].ESTADO_SOLICITUD = desicionRespuesta[estadoSolicitud];

      if (JSON.parse(resEstadoAprobacion).state !== 205) {
        dataSolicitud[0].estadoAprobacion = JSON.parse(resEstadoAprobacion).data[0].estadoAprobacion;
        dataSolicitud[0].estadoParametrizacion = JSON.parse(resEstadoAprobacion).data[0].estadoParametrizacion === null ? 0 : JSON.parse(resEstadoAprobacion).data[0].estadoParametrizacion;
      } else {
        dataSolicitud[0].estadoAprobacion = 0;
        dataSolicitud[0].estadoParametrizacion = 0;
      };

      updateCodigoSolictud(dataSolicitud.COD_SOLICITUD);
      updateStatusCorreo(response?.statusCorreo ? response?.statusCorreo === 'true' ? true : false : false);
      cargarDatosSolictudContext({ solicitudBD: dataSolicitud });

      if (botom == 1) {
        route.push('/radicacion/resumen');
      };

      if (botom == 2) {

        const param = new URLSearchParams(searchParam)
        param.set('q', nit)

        switch (tipPersona) {
          case "PJ": {
            actualizarTabBarSeleccionado('3');
            route.push(`${'/radicacionCliente/radicacionPj/datosPersonaJuridicaPj'}?${param}`);
            break;
          }
          case "PN": {
            actualizarTabBarSeleccionado('1');
            route.push(` ${'/radicacionCliente/radicacionPn/datosPersonaNaturalPn'}?${param}`);
            break;
          }
          default:
            break;
        };

        //route.push(` ${nit.length == 9 ? '/radicacionCliente/radicacionPj/datosPersonaJuridicaPj' : '/radicacionCliente/radicacionPn/datosPersonaNaturalPn'}?${param}`)

      };

    } catch (error) {
      console.log(error);
    };
  };


  const cargarDatosSolictudContext = ({ solicitudBD }) => {

    const { updateCodigoSolictud, updateTecnicoOperador,
      updateConfiguracion,
      updateDepositoVista,
      updateServicioFinanciero,
      updateDataRemi,
      updateConvenioRecaudo,
      updateDataSolciitud,
      updateConvenioPago,
      updateDataCliente, updateEstadoSolicitud,
      updateCreditoNuevo,
      updateReciprocidadResumen,
      updateResumenMotor,
      updateClienteFiducia,
      updateCampoAdicionalesModal,
      updateClientModal,
      updateAprobacionParametrizacion,
      updateIdSolictudDb,
      updateDocumentoCliente
    } = contextData

    const {
      SOLICITUD, ID_RADICADOR, TECNICO_OPERADOR, CONVENIO_PAGO, CONVENIO_RECAUDO, CONVENIO_SERVICIO,
      RADICACION, DEPOSITO_VISTA, CONFIGURACION, REMI, KNIME, SERVICIOS_FINANCIEROS,
      CREDITO_NUEVO, RECIPROCIDAD_RESUMEN, ESTADO_SOLICITUD, CLIENTE_FIDUCIA, DOCUMENTO, CLIENTE_MODAL, CAMPO_ADICIONALES_MODAL, estadoAprobacion, estadoParametrizacion

    } = solicitudBD[0]


    ESTADO_SOLICITUD == 3 ? updateAprobacionParametrizacion({

    }) : updateAprobacionParametrizacion({
      estadoAprobacion: estadoAprobacion,
      estadoParametrizacion: estadoParametrizacion,
      idRadicador: ID_RADICADOR
    })


    updateDocumentoCliente(solicitudBD[0]?.NIT_CLIENTE || '')

    updateDataSolciitud(SOLICITUD);
    // convenio Pago
    updateConvenioPago(undefined, CONVENIO_PAGO);
    // convenio Recaudo
    updateConvenioRecaudo(undefined, CONVENIO_RECAUDO);
    // convenio Financiero
    updateServicioFinanciero(undefined, SERVICIOS_FINANCIEROS);
    // depositoVista
    updateDepositoVista(undefined, DEPOSITO_VISTA);
    // configuracion
    // updateCreditoNuevo(CREDITO_NUEVO);


    updateCreditoNuevo(Array.isArray(CREDITO_NUEVO) ? CREDITO_NUEVO : [])
    //acutalizar el estado solicitud

    updateEstadoSolicitud(ESTADO_SOLICITUD);
    updateReciprocidadResumen(RECIPROCIDAD_RESUMEN);
    updateDataRemi(REMI || []);
    updateDataCliente(RADICACION);

    const config = DOCUMENTO;

    updateClienteFiducia(undefined, CLIENTE_FIDUCIA, true);
    updateTecnicoOperador(JSON.parse(TECNICO_OPERADOR));
    updateCampoAdicionalesModal(JSON.parse(CAMPO_ADICIONALES_MODAL));
    updateClientModal(CLIENTE_MODAL);
    updateIdSolictudDb(solicitudBD[0]?.COD_SOLICITUD);

    updateConfiguracion("adquirencia", "infoTriburaria", config?.adquirencia?.infoTriburaria || []);
    updateConfiguracion("adquirencia", "infoComercio", config?.adquirencia?.infoComercio || {});
    updateConfiguracion("adquirencia", "tipoVenta", config?.adquirencia?.tipoVenta || {});
    updateConfiguracion("adquirencia", "tipoCuenta1", config?.adquirencia?.tipoCuenta1 || []);


    updateConfiguracion("convenioRecaudo", "recaudoFormato", config?.convenioRecaudo?.recaudoFormato || {});
    updateConfiguracion("convenioRecaudo", "recaudoManuales1", config?.convenioRecaudo?.recaudoManuales1 || []);
    updateConfiguracion("convenioRecaudo", "recaudoSiNo", config?.convenioRecaudo?.recaudoSiNo || '');
    updateConfiguracion("convenioRecaudo", "cuentaRecaudodora", config?.convenioRecaudo?.cuentaRecaudodora || []);
    updateConfiguracion("convenioRecaudo", "modeloPago", config?.convenioRecaudo?.modeloPago || {});
    updateConfiguracion("convenioRecaudo", "recuadoClasePago", config?.convenioRecaudo?.recuadoClasePago || {});
    updateConfiguracion("convenioRecaudo", "recaudoRespaldo", config?.convenioRecaudo?.recaudoRespaldo || {});

    updateConfiguracion("corresponsales", "tipoRecuado", config?.corresponsales?.tipoRecuado || {});
    updateConfiguracion("corresponsales", "BaseWebTicket", config?.corresponsales?.BaseWebTicket || {});
    updateConfiguracion("corresponsales", "tipoCuenta", config?.corresponsales?.tipoCuenta || []);
    updateConfiguracion("corresponsales", "recuadoManual", config?.corresponsales?.recuadoManual || []);
    updateConfiguracion("corresponsales", "cuentaRecaudadoraEan", config?.corresponsales?.cuentaRecaudadoraEan || []);
    updateConfiguracion("corresponsales", "modeloPago", config?.corresponsales?.modeloPago || {});

    updateConfiguracion("convenioPago", "cuentaRecaudadora1", config?.convenioPago?.cuentaRecaudadora1 || []);
    updateConfiguracion("convenioPago", "cuentaRecaudadora2", config?.convenioPago?.cuentaRecaudadora2 || []);
    updateResumenMotor(resultadoResumen(KNIME));
  };

  const resultadoResumen = (dtResult) => {

    const { DATOS_ENTE_ATRIBUCION_FINAL } = dtResult;
    const aprobadores = {
      gerencia: false,
      vprecidencia: false,
      presidencia: false,
      junta: false,
    };

    DATOS_ENTE_ATRIBUCION_FINAL.length > 0 && DATOS_ENTE_ATRIBUCION_FINAL.map(e => {
      const tipoApor = e.tipo_aprobador.toLowerCase()
      aprobadores.presidencia = (tipoApor).includes('presidencia')
      aprobadores.vprecidencia = (tipoApor).includes('vic')
      aprobadores.gerencia = (tipoApor).includes('gerente')
      aprobadores.junta = (tipoApor).includes('junta')

    });

    return {
      entes: aprobadores,
      responseKnime: dtResult
    };
  };


  const onClickConsultarCliente = async ({ nit = '' }) => {


    limpiarProviderRadicacionCliente()


    const clientePj = JSON.parse(await queryClientePj(nit))

    //console.log('perfil pj')

    //console.log(clientePj)

    // const clientePn = JSON.parse(await queryClientePn(inputBuscar))

    const tipoDocument = ''

    if (tipoDocument == '3') {

      try {

        setLoadin(true)

        // const clientePj = JSON.parse(await queryClientePj(inputBuscar))


        if (clientePj.state !== 200) {
          setLoadin(false)
          setMessageModal(clientePj.message)
          setMostrarModal(!mostrarModal)
          setHabilitarBtnNuevo(false)
          actualizarPerfilPj(clientePj)
          return
        }


        const creditoP = JSON.parse(await queryCreditoProducto(inputBuscar))

        console.log('credito')
        console.log(creditoP)

        const cuentasP = JSON.parse(await queryCuentasProducto(inputBuscar))

        console.log('cuentas')
        console.log(cuentasP)

        const cdtP = JSON.parse(await querycdtProcducto(inputBuscar))

        console.log('cdt')
        console.log(cdtP)

        const convenioActual = JSON.parse(await queryConvenioActualProducto(inputBuscar))

        console.log('convenio Actual')
        console.log(convenioActual)

        const reciprocidad = JSON.parse(await queryReciprocidadProducto(inputBuscar))



        actualizarCreditoProducto(creditoP?.data || [])
        actualizarCuentasProducto(cuentasP?.data || [])
        actualizarCdtProducto(cdtP?.data || [])
        actualizarConvenioActualProducto(convenioActual?.data || [])
        actualizarReciprocidadProducto(reciprocidad?.data || [])


        setHabilitarBtnNuevo(true)
        actualizarActivarConsulta(true)




        const representanteLegal = JSON.parse(await queryRepresentanteLegalPj(inputBuscar))

        const contactoAutorizado = JSON.parse(await queryContactosAutorizadosPj(inputBuscar))

        const juntaDirectivaPj = JSON.parse(await queryJuntaDirectivaPj(inputBuscar))

        const residenciaFiscalPj = JSON.parse(await queryResidenciaFiscalPj(inputBuscar))

        const accionistaPj = JSON.parse(await queryAccionistasPj(inputBuscar))

        const beneficiarioPj = JSON.parse(await queryBeneficiariosPJ(inputBuscar))

        const informacionFinancieraPj = JSON.parse(await queryInformacionFinancieraPj(inputBuscar))

        const controlantesPj = JSON.parse(await queryControlantes(inputBuscar))





        const juntaDirectivaPn = JSON.parse(await queryJuntaDirectivaPn(inputBuscar))

        const accionistasPn = JSON.parse(await queryAccionistasPn(inputBuscar))

        const beneficiariosPn = JSON.parse(await queryBeneficiariosPn(inputBuscar))



        if (clientePj.state == 200) {

          // clientePj.data[0].fechaConstitucion = formatearFecha({ fecha: clientePj.data[0].fechaConstitucion })

          clientePj.data[0].state = clientePj.state

          actualizarPerfilPj(clientePj.data[0])


          actualizarTipoPersona(clientePj?.data[0]?.tipopersona)

        }

        if (representanteLegal.state == 200) {



          actualizarRepresentanteLegalPj(representanteLegal.data)

        }

        if (residenciaFiscalPj.state == 200) {

          actualizarResidenciaFiscalPj(residenciaFiscalPj.data[0])
        }

        if (juntaDirectivaPn.state == 200) {

          actualizarJuntaDirectivaPn(juntaDirectivaPn.data)
          actualizarJuntaDirectivaPjPn(juntaDirectivaPn.data)
        }


        if (juntaDirectivaPj.state == 200) {

          actualizarJuntaDirectivaPjPn(juntaDirectivaPj.data)
          actualizarJuntaDirectivaPj(juntaDirectivaPj.data)
        }


        if (juntaDirectivaPj.state == 200 && juntaDirectivaPn.state == 200) {

          const unirArray = [...juntaDirectivaPn.data, ...juntaDirectivaPj.data];

          actualizarJuntaDirectivaPjPn(unirArray)
        }

        if (accionistaPj.state == 200) {

          actualizarAccionistaPj(accionistaPj.data)
        }

        if (beneficiarioPj.state == 200) {

          actualizarBeneficiarioPj(beneficiarioPj.data)
        }

        if (informacionFinancieraPj.state == 200) {

          actualizarInformacionFinancieraPj(informacionFinancieraPj.data)
        }


        if (controlantesPj.state == 200) {

          actualizarControlantesPj(controlantesPj.data)

        }

        if (contactoAutorizado.state == 200) {


          // contactoAutorizado.data[0].fechaExpedicion = formatearFecha({ fecha: contactoAutorizado.data[0].fechaExpedicion })

          // contactoAutorizado.data[0].fechaIngreso = formatearFecha({ fecha: contactoAutorizado.data[0].fechaIngreso })

          // contactoAutorizado.data[0].fechaSalida = formatearFecha({ fecha: contactoAutorizado.data[0].fechaSalida })

          actualizarContactoAutorizadoPj(contactoAutorizado.data)
        }


        if (accionistasPn.state == 200) {

          actualizarAccionistasPn(accionistasPn.data)
        }
        if (beneficiariosPn.state == 200) {

          actualizarBeneficiariosPn(beneficiariosPn.data)
        }





      } catch (error) {

        console.log(error)

        setMessageModal(error.message)
        setMostrarModal(!mostrarModal)
        actualizarActivarConsulta(false)

      } finally {

        setLoadin(false)

        return
      }

    }


    if (tipoDocument == '1' || tipoDocument == '2') {

      try {

        setLoadin(true)

        const clientePn = JSON.parse(await queryClientePn(inputBuscar))

        if (clientePn.state !== 200) {
          setLoadin(false)
          setHabilitarBtnNuevo(false)
          setMessageModal(clientePn.message)
          setMostrarModal(!mostrarModal)
          actualizarPerfilPn(clientePn)
          return
        }

        console.log(clientePn)

        const creditoP = JSON.parse(await queryCreditoProducto(inputBuscar))

        console.log(creditoP?.data)

        const cuentasP = JSON.parse(await queryCuentasProducto(inputBuscar))

        const cdtP = JSON.parse(await querycdtProcducto(inputBuscar))

        const convenioActual = JSON.parse(await queryConvenioActualProducto(inputBuscar))

        const reciprocidad = JSON.parse(await queryReciprocidadProducto(inputBuscar))

        actualizarCreditoProducto(creditoP?.data || [])
        actualizarCuentasProducto(cuentasP?.data || [])
        actualizarCdtProducto(cdtP?.data || [])
        actualizarConvenioActualProducto(convenioActual?.data || [])
        actualizarReciprocidadProducto(reciprocidad?.data || [])


        setHabilitarBtnNuevo(true)
        actualizarActivarConsulta(true)
        if (clientePn.state == 200) {

          console.log(clientePn)

          clientePn.data[0].state = clientePn.state

          clientePn.data[0].cliente = clientePn.data[0]?.primerApellido + ' ' +
            clientePn.data[0]?.segundoApellido + ' ' +
            clientePn.data[0]?.primerNombre + ' ' +
            clientePn.data[0]?.segundoNombre

          actualizarPerfilPn(clientePn.data[0])

          actualizarTipoPersona(clientePn?.tipoPersona)
        }


        const residenciaFiscalPn = JSON.parse(await queryResidenciaFiscalPn(inputBuscar))


        if (residenciaFiscalPn.state == 200) {
          actualizarResidenciaFiscalPn(residenciaFiscalPn.data[0])
        }

        const actividadEconomicaPn = JSON.parse(await queryActividadEconomicaPn(inputBuscar))


        if (actividadEconomicaPn.state == 200) {


          actualizarActiviadEconomicaPn(actividadEconomicaPn.data[0])

          const detalleActividadPn = JSON.parse(await queryDetalleActividadPn(inputBuscar))

          actualizarDetalleActiviadEconomicaPn(detalleActividadPn.data)

        }


        const referenciaPn = JSON.parse(await queryReferenciasPn(inputBuscar))

        if (referenciaPn.state == 200) {

          actualizarReferenciaPn(referenciaPn.data)

        }



      } catch (error) {

      } finally {
        setLoadin(false)
      }

    }

    // funcionesConsultar[rutaActual](e)
  }


  //console.log(solicitud)
  return (
    <div className="container border border-coomeva_color-grisPestaña2 shadow-md rounded-lg mt-4 w-[100vw]"
    //  style={{ width: '100vw' }}
    >
      <div className="flex items-center overflow-y-auto rounded-lg w-[100%]"
      // style={{ width: '100%' }} 
      >
        <div className="w-full">
          <span className="bg-coomeva_color-grisPestaña2 py-1"></span>
          <table
            className="w-full divide-y divide-gray-300"
            border={1}
          >
            <thead className=" text-coomeva_color-rojo  text-xs bg-coomeva_color-grisPestaña2">
              <tr className="divide-x divide-gray-300" >
                <th className="p-3 w-[5%]">Nº Solicitud</th>
                <th className="p-3 w-[10%]">Fecha</th>
                <th className="p-3 w-[15%] text-start">Oficina</th>
                <th className="p-3 w-[10%] text-start">Regional</th>
                <th className="p-3 w-[10%] text-start">ID Cliente</th>
                <th className="p-3 w-[20%] text-start">Cliente</th>
                <th className="p-3 w-[10%] text-start">Producto</th>
                <th className="p-3 w-[15%] text-start">Total Cartera</th>
                <th className="p-3 w-[15%] text-start">Total Captación</th>
                <th className="p-3 w-[10%] text-start">Rentabilidad</th>
                <th className="p-3 w-[15%] text-start">Costo Integral</th>
                <th className="p-3 w-[10%] text-start">Ente de Aprobación</th>
                <th className="p-3 w-[10%] text-start">Decisión</th>
                <th className="p-3 w-[10%] text-start">Estado Parametrizador</th>
                <th className="p-3 w-[10%] text-start">Estado</th>
              </tr>
            </thead>
            <tbody className="p-8 text-[11.5px] text-coomeva_color-azulOscuro font-semibold">
              <tr className="divide-x bg-white divide-gray-300">
                <td className="p-3 w-[5%] text-center">{solicitud.COD_SOLICITUD}</td>
                <td className="p-3 w-[10%] text-center">{solicitud.FECHA_HORA}</td>
                <td className="p-3 w-[15%]">{solicitud.OFICINA}</td>
                <td className="p-3 w-[10%]">{solicitud.REGIONAL}</td>
                <td className="p-3 w-[10%]">{solicitud.NIT_CLIENTE}</td>
                <td className="p-3 w-[20%]">{solicitud.CLIENTE}</td>
                <td className="p-3 w-[10%]">{solicitud.NOMBRE_PRODUCTO}</td>
                <td className="p-3 w-[15%]">{'$ ' + resetearPesos({ valor: solicitud?.TOTAL_CARTERA || solicitud?.TOTAL_CARTERA || 0 })}</td>
                <td className="p-3 w-[15%]">{'$ ' + resetearPesos({ valor: solicitud?.TOTAL_CAPTACION || solicitud?.TOTAL_CAPTACION || 0 })}</td>
                <td className="p-3 w-[5%]">{conversionPesos({ valor: solicitud.RENTABILIDAD, nDecimales: 2, style: "percent" })}</td>
                <td className="p-3 w-[5%]">{conversionPesos({ valor: solicitud.COSTO_INTEGRAL, nDecimales: 2, style: "percent" })}</td>
                <td className="p-3 w-[15%]">{solicitud.codEnte}</td>
                <td className="p-3 w-[10%]">{solicitud.Aprobacion}</td>
                <td className="p-3 w-[10%] text-center">{solicitud.Parametrizacion}</td>
                <td className="p-3 w-[10%] text-center">
                  <div>
                    <p>{solicitud.DESCRIP_PERSONA}</p>
                    <button
                      name={solicitud.COD_SOLICITUD}
                      onClick={solicitud.ESTADO_PERSONA !== "10" ? (userPermitir ? (e) => { detallesSolicitud(e, solicitud.Aprobacion, 2, solicitud.NIT_CLIENTE, solicitud.TIPO_PERSONA) } : null) : null}
                      className={`border py-1 border-coomeva_color-grisPestaña text-coomeva_color-grisPestaña rounded-md px-6 text-xs ${solicitud.ESTADO_PERSONA !== "10" ? (userPermitir ? "hover:text-coomeva_color-rojo hover:border-coomeva_color-rojo" : "enabled:hover:border-gray-300 enabled:hover:text-gray-200 disabled:opacity-75 cursor-not-allowed") : "enabled:hover:border-gray-300 enabled:hover:text-gray-200 disabled:opacity-75 cursor-not-allowed"} `}
                    >
                      Crear
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <span className="bg-white py-1"></span>
        </div>
        <div className="flex justify-center items-center w-[10%] h-[10%]">
          <button id={solicitud.COD_SOLICITUD} onClick={(e) => { detallesSolicitud(e, solicitud.Aprobacion, 1, solicitud.NIT_CLIENTE, '') }} className=" transition duration-300 ease-in-out bg-white text-center text-sm text-coomeva_color-rojo border rounded-lg border-red-500 hover:bg-coomeva_color-rojo hover:text-white w-[70%] py-6">
            Ingresar
          </button>
        </div>
      </div>
    </div >
  );
};

export default ItemsSolicitudBandeja;