"use client";

import { useState } from "react";
import BtnControl from "../../cliente/BtnControl";
import { fn_resKnine } from "@/app/lib/services/knime/fn_resKnine";
import Loading from "@/app/components/share/Loading";
import { queryInsertSolicitud } from "@/app/lib/solicitudes/queryInsertSolicitud";
import { envioCorreo } from "@/app/lib/services/correo/envioCorreo";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { queryDecisionParametrizador } from "@/app/lib/solicitudes/queryDecisionParametrizador";
import { queryDecisionAprobador } from "@/app/lib/solicitudes/queryDecisionAprobador";
import { queryEstadoSolicitud } from "@/app/lib/solicitudes/queryEstadoSolicitud";
import { queryCorreoRadicador } from "@/app/lib/solicitudes/queryCorreoRadicador";
import { notificacion } from "@/app/lib/services/correo/notificacion";
import { notificacionRadicacion } from "@/app/lib/services/correo/notificacionRadicacion";
import { limpiarContext } from "@/app/lib/utils";

import { deleteBucketS3 } from "@/app/lib/documentos/bucketS3Pool";
import { cargaDocumentosDiferidos } from "@/app/lib/documentos/cargaDocumentosDiferidos";
import { queryUpdateCorreoParametrizador } from "@/app/lib/solicitudes/queryUpdateCorreoParametrizador";

const DynamicModal = dynamic(() => import("../../../share/Modals"));

export default function BotonesResumen({
  usuario,
  rolUsuario,
  handleTabClick,
  setEvaluar,
  setResultadoEvaluar,
  context,
  reciprocidadMinimaAdmin,
  validarReciprocidadMinimaAdmin,

}) {
  console.log('object')
  console.log(rolUsuario)

  const route = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  console.log(context.estadoSolicitud )
  const activarBtnEstadoSolicitud = !(context.estadoSolicitud !== "" && context.estadoSolicitud !== 3);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirmar, setShowModalConfirmar] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [crearFuncion, setCrearFuncion] = useState(null);
  const [url, setUrl] = useState("");
  const [mostrarObservacion, setMostrarObservacion] = useState(false)
  const [observacionNegar, setObservacionNegar] = useState('')

  const {
    idSolicitudDb,
    solicitud,
    creditoNuevo,
    convenioRecaudo,
    remi,
    convenioPago,
    servicioFinanciero,
    depositoVista,
    configuracion,
    tecnioOPerador,
    clientModal,
    campoAdicionalesModal,
    resultadoMotor,
    clienteFiducia,
    editar,
    estadoSolicitud,
    evaluar,
    cliente,
    updateEvaluar,
    reciprocidadResumen,
    updateReciprocidadResumen,
    updateResumenMotor,
    statusCorreo,
    historialPath,
    updateHistorialPath,
    updateObservacion,
    observacion
  } = context;

  const validarBotonAprobarNegar = (idSolicitudDb !== '' && idSolicitudDb !== undefined);
  // &&solicitud?.tipoProducto?.credito=='01'
  const creditoConvenio = (solicitud?.tipoProducto?.convenio == '03');


  const fn_resKnime = async () => {

    const produc = solicitud.tipoProducto;

    const productoSolicitud = solicitud?.tipoProducto
      ? (produc?.credito &&
        produc?.convenio &&
        produc?.credito !== "" &&
        produc?.convenio !== "" &&
        `${produc?.credito}, ${produc?.convenio}`) ||
      (produc?.credito && produc?.credito !== "" && `${produc?.credito}`) ||
      (produc?.convenio && produc?.convenio !== "" && `${produc?.convenio}`)
      : "";

    const tipoSolicitudProducto = solicitud?.tipoProducto
      ? (produc?.credito &&
        produc?.convenio &&
        produc?.credito !== "" &&
        produc?.convenio !== "" &&
        `3`) ||
      (produc?.credito && produc?.credito !== "" && `1`) ||
      (produc?.convenio && produc?.convenio !== "" && `2`)
      : "";

    context["cargarSolicitud"] = {
      PRODUCTO: {
        producto: productoSolicitud,
        operacion: solicitud?.tipoOperacion?.nuevo || "",
        tipoSolicitud: tipoSolicitudProducto,
      },
    };

    try {
      setShowLoading(true);
      let dtResult = JSON.parse(await fn_resKnine(JSON.stringify(context)));

      console.clear();
      console.log(dtResult);


      if (dtResult.STATUS === 200 || dtResult.STATUS === 99) {

        if (dtResult.ENTE_APROBACION === "100") {
          updateHistorialPath(false);
        } else {
          updateHistorialPath(true);
        };

        updateResumenMotor(dtResult);

        const {
          DATOS_ENTE_ATRIBUCION_FINAL,
          TOTAL_MARGEN_CARTERA,
          TOTAL_MARGEN_CAPTA,
          TOTAL_MARGEN,
          UTILIDAD_ANUAL,
          POR_COSTO_INTEGRAL_Max,
          PORC_COSTO_INTEGRAL,
          PORC_ROA_MINIMO,
          PORC_ROA_EA,
        } = dtResult;

        const aprobadores = {
          gerencia: false,
          vprecidencia: false,
          presidencia: false,
          junta: false,
        };

        DATOS_ENTE_ATRIBUCION_FINAL.length > 0 &&
          DATOS_ENTE_ATRIBUCION_FINAL.map((e) => {
            const tipoApor = e.tipo_aprobador.toLowerCase();
            aprobadores.presidencia = tipoApor.includes("presidencia");
            aprobadores.vprecidencia = tipoApor.includes("vic");
            aprobadores.gerencia = tipoApor.includes("gerente");
            aprobadores.junta = tipoApor.includes("junta");
          });

        let newRepro = { ...reciprocidadResumen };

        newRepro["resultadoResumenMotor"] = {
          TOTAL_MARGEN_CARTERA,
          TOTAL_MARGEN_CAPTA,
          TOTAL_MARGEN,
          UTILIDAD_ANUAL,
          POR_COSTO_INTEGRAL_Max,
          PORC_COSTO_INTEGRAL,
          PORC_ROA_MINIMO,
          PORC_ROA_EA,
        };

        setResultadoEvaluar({
          entes: aprobadores,
          responseKnime: dtResult,
        });

        // reciprocidadResumen
        updateReciprocidadResumen(newRepro);

        if (dtResult.STATUS === 99) {
          updateEvaluar(false);
        } else {
          updateEvaluar(true);
        };

        handleTabClick(2);

        return;

      } else if (dtResult.STATUS === 204) {
        setMessageAlert("Los datos del ente no fueron generados");
        setShowLoading(false);
        setShowModal(true);
      } else {
        throw dtResult.status;
      }

    } catch (error) {
      setShowLoading(false);
      setMessageAlert("Error conexión api Knime");
      setShowModal(true);
    };
  };


  const solicitarAprobacion = async () => {
    const creditoBase = {
      codCupo: "",
      codTeso: "",
      cupoMonto: "0",
      cupoIBR: "0",
      cupoPlazo: "0",
      cupoRedescuento: "",
      codCupoTipoTasa: "",
      cupoMod: "0",
      cupoCobertura: "0",
      tesoMonto: "0",
      tesoIBR: "0",
      tesoPlazo: "0",
      tesoRedescuento: "0",
      tesoCobertura: "0",
      codTesoTipoTasa: "",
      tesoMod: "0",
      promedio: "0",
      tasaNAMV: "0",
    };
    const clienteBase = {
      cliente: "",
      regional: "",
      oficina: "",
      coomeva: "",
      vinculado: "",
      antiguedad_coo: "",
      antiguedad_ban: "",
      estado_coo: "",
      estado_ban: "",
      tipo_contrato: "",
      ingreso: "",
      ventas_an: "",
      activos: "",
      sector: "",
      carteraConsumo: "",
      carteraHipotecario: "",
      carteraComercial: "",
      totalCartera: "",
      calificacionActual: "",
      cupoConsumo: "",
      cupoComercial: "",
      captacionCorriente: "",
      captacionAhorros: "",
      captacionCdt: "",
      totalCaptacion: "",
      tipoDocumento: "",
      numDocumento: "",
      tipoPersona: "",
    };

    const produc = solicitud.tipoProducto;

    const productoSolicitud = solicitud?.tipoProducto
      ? (produc?.credito &&
        produc?.convenio &&
        produc?.credito !== "" &&
        produc?.convenio !== "" &&
        `${produc?.credito}, ${produc?.convenio}`) ||
      (produc?.credito && produc?.credito !== "" && `${produc?.credito}`) ||
      (produc?.convenio && produc?.convenio !== "" && `${produc?.convenio}`)
      : "";

    const tipoSolicitudProducto = solicitud?.tipoProducto
      ? (produc?.credito &&
        produc?.convenio &&
        produc?.credito !== "" &&
        produc?.convenio !== "" &&
        `3`) ||
      (produc?.credito && produc?.credito !== "" && `1`) ||
      (produc?.convenio && produc?.convenio !== "" && `2`)
      : "";

    const dataRequestSolicitud = {
      PRODUCTO: {
        producto: productoSolicitud,
        operacion: solicitud?.tipoOperacion?.nuevo || "",
        tipoSolicitud: tipoSolicitudProducto,
      },

      RADICACION: Object.assign(clienteBase, cliente),
      // CREDITO_NUEVO: Object.assign(creditoBase, creditoNuevo),
      CREDITO_NUEVO: creditoNuevo,
      CONVENIO_RECAUDO: convenioRecaudo,
      CONVENIO_PAGO: convenioPago,
      CONVENIO_SERVICIO: servicioFinanciero,
      DOCUMENTO: configuracion,
      REMI: remi,
      DEPOSITO_VISTA: depositoVista,
      RECIPROCIDAD_RESUMEN: reciprocidadResumen,
      CONFIGURACIO: configuracion,
      TECNICO_OPERADOR: tecnioOPerador,
      CLIENTE_MODAL: clientModal,
      CAMPO_ADICIONALES_MODAL: campoAdicionalesModal,
      CLIENTE_FIDUCIA: clienteFiducia,
      EDITAR: editar,
      ESTADO_SOLICITUD: estadoSolicitud,
      SOLICITUD: solicitud,
      KNIME: resultadoMotor,
    };

    endModal();
    setShowLoading(true);

    try {
      if (dataRequestSolicitud.KNIME.DATOS_ENTE_ATRIBUCION_FINAL.length !== 0) {
        let respons = JSON.parse(await queryInsertSolicitud(JSON.stringify(dataRequestSolicitud)));

        if (respons.insert) {
          dataRequestSolicitud.COD_SOLICITUD = respons.numSolicitud;
          await cargaDocumentosDiferidos(respons.numSolicitud);
          sendEmailSolicitud(dataRequestSolicitud);
        };

      } else {
        setShowLoading(false);
        setMessageAlert(
          <>¡No hay <b>Aprobadores</b> con el <b>Tipo de Aprobación</b>: <b>{dataRequestSolicitud.KNIME.ENTE_ATRIBUCION_FINAL[0]}</b>!, consulte con su administrador</>
        );
        setShowModal(true);
      };

    } catch (error) {
      setShowLoading(false);
      setMessageAlert(
        `¡La Solicitud no pudo ser enviada! Por favor intentelo mas tarde.`
      );
      setShowModal(true);
      console.log(error);
    }
  };


  const sendEmailSolicitud = async (dataCorreo) => {
    try {
      let respons = JSON.parse(await envioCorreo(JSON.stringify(dataCorreo)));

      if (respons.email) {
        setShowLoading(false);
        setMessageAlert("¡Solicitud enviada para su aprobación!");
        limpiarContext({ context: context, resetDocuemnt: true })
        setShowModal(true);
        setUrl("/radicacion");
      }
    } catch (error) {
      setMessageAlert(
        `¡La Solicitud no pudo ser enviada! Por favor intentelo mas tarde.`
      );
      setShowLoading(false);
      setShowModal(true);
    }
  };


  const finalizarParametrizacion = async ({ desicion }) => {
    setShowModalConfirmar(false);

    let dataDecision = {};
    dataDecision.decision = desicion;
    dataDecision.cod_solicitud = context.idSolicitudDb;

    try {
      setShowLoading(true);
      let response = JSON.parse(await queryDecisionParametrizador(dataDecision));

      if (response.state === 200) {
        await deleteBucketS3(dataDecision.cod_solicitud);
        setMessageAlert("¡Parametrizacion Finalizada!");
        setShowModal(true);
        setUrl("/radicacion/bandejaSolicitudes");
      };

    } catch (error) {
      console.log(error);
    } finally {
      setShowLoading(false);
    };

  };


  const negar = async ({ desicion }) => {

    const textObs = document.getElementById('obs');

    if (textObs.value.length <= 0) {
      textObs.focus()
      return
    };

    setShowModalConfirmar(false);

    let dataDecision = {};
    dataDecision.decision = desicion;
    dataDecision.observacion = textObs.value;
    dataDecision.cod_solicitud = context.idSolicitudDb;

    try {

      setShowLoading(true);
      let response = JSON.parse(await queryDecisionAprobador(dataDecision));
      if (response.data[0].COD === 0) {
        setMessageAlert("¡Decisión registrada!");
        setShowModal(true);
        updateObservacion('')
        setUrl("/radicacion/bandejaSolicitudes");
      };

    } catch (error) {
      console.log(error);
    } finally {
      setShowLoading(false);
    }

  };


  const aprobar = async ({ desicion }) => {
    setShowModalConfirmar(false);

    let dataDecision = {};
    dataDecision.decision = desicion;
    dataDecision.cod_solicitud = context.idSolicitudDb;

    if (solicitud.tipoProducto.hasOwnProperty('credito') && solicitud.tipoProducto.hasOwnProperty('convenio')) {
      aprobarConvenio(dataDecision);
    } else if (solicitud.tipoProducto.hasOwnProperty('convenio')) {
      aprobarConvenio(dataDecision);
    } else if (solicitud.tipoProducto.hasOwnProperty('credito')) {
      aprobarCredito(dataDecision);
    }
  };


  const aprobarCredito = async (dataDecision) => {
    setShowLoading(true);
    try {
      let response = JSON.parse(await queryDecisionAprobador(dataDecision));
      let messageAprobacion = '';
      let tipoEnte = '';

      switch (response.state) {
        case 200:
          if (response.data[0].COD !== 0) {
            let resEstadoSolicitud = JSON.parse(await queryEstadoSolicitud(dataDecision));
            if (resEstadoSolicitud.state === 200) {
              if (resEstadoSolicitud.data[0].estadoAprobacion === 1) {
                messageAprobacion = "¡La decisión ha sido registrada y remitida al Parametrizador para su gestión!";
                tipoEnte = "parametrización";
              } else {
                messageAprobacion = "¡La decisión ha sido registrada y se ha remitido al próximo aprobador para su revisión!";
                tipoEnte = "aprobación";
              };
              //actualizar envio de correo
              await queryUpdateCorreoParametrizador(JSON.stringify(dataDecision));
            } else {
              messageAprobacion = "¡La decisión ha sido registrada y se ha remitido al próximo aprobador para su revisión!";
              tipoEnte = "aprobación";
            };

            let respons = JSON.parse(await notificacion(JSON.stringify(response.data[0]), tipoEnte));
            if (respons.email) {
              setMessageAlert(`${messageAprobacion}`);
              setShowModal(true);
              setUrl("/radicacion/bandejaSolicitudes");
            } else {
              setMessageAlert(`Notificación no enviada:${respons.message}`);
              setShowModal(true);
            };
          } else {
            setMessageAlert("¡Decisión registrada!");
            setShowModal(true);
            setUrl("/radicacion/bandejaSolicitudes");
          };
          break;

        case 204:
          setMessageAlert("¡No fue posible registrar la decisión, ya que no se encontró un ente con el tipo de aprobador requerido para continuar con el flujo definido por el motor de decisiones!");
          setShowModal(true);
          break;

        case 205:
          setMessageAlert("¡No fue posible registrar la decisión, ya que no se encontraron los datos del ente radicador que generó la solicitud!");
          setShowModal(true);
          break;

        case 206:
          setMessageAlert("¡No fue posible registrar la decisión, ya que no se encontró un ente parametrizador que permita continuar con el flujo definido por el motor de decisiones!");
          setShowModal(true);
          break;

        default:
          setMessageAlert("¡Validar Entes!");
          setShowModal(true);
          break;
      };
    } catch (error) {
      setMessageAlert(`${error}, Reintente la operación`);
      setShowModal(true);
    } finally {
      setShowLoading(false);
    };
  };


  const aprobarConvenio = async (dataDecision) => {
    setShowLoading(true);
    try {
      let tipoEnte = "aprobación";
      let response = JSON.parse(await queryDecisionAprobador(dataDecision));

      switch (response.state) {
        case 200:
          if (response.data[0].COD !== 0) {
            let resEstadoSolicitud = JSON.parse(await queryEstadoSolicitud(dataDecision));
            if (resEstadoSolicitud.state === 200) {
              if (resEstadoSolicitud.data[0].estadoAprobacion === 1) {
                let resCorreoRadicador = JSON.parse(await queryCorreoRadicador(dataDecision));
                response.data[0].CORREO = resCorreoRadicador.data[0].CORREO;
                let respons = JSON.parse(await notificacionRadicacion(JSON.stringify(response.data[0]), tipoEnte));
                if (respons.email) {
                  setMessageAlert(
                    "¡La decisión ha sido registrada y enviada al radicador para la carga de documentos!"
                  );
                  setShowModal(true);
                  setUrl("/radicacion/bandejaSolicitudes");
                };
              };
            } else {
              let respons = JSON.parse(await notificacion(JSON.stringify(response.data[0]), tipoEnte));
              if (respons.email) {
                setMessageAlert(
                  "¡Decisión registrada y enviada al siguiente aprobador!"
                );
                setShowModal(true);
                setUrl("/radicacion/bandejaSolicitudes");
              };
            };
          } else {
            setMessageAlert("¡Decisión registrada!");
            setShowModal(true);
            setUrl("/radicacion/bandejaSolicitudes");
          };
          break;

        case 204:
          setMessageAlert("¡No fue posible registrar la decisión, ya que no se encontró un ente con el tipo de aprobador requerido para continuar con el flujo definido por el motor de decisiones!");
          setShowModal(true);
          break;

        case 205:
          setMessageAlert("¡No fue posible registrar la decisión, ya que no se encontraron los datos del ente radicador que generó la solicitud!");
          setShowModal(true);
          break;

        case 206:
          setMessageAlert("¡No fue posible registrar la decisión, ya que no se encontró un ente parametrizador que permita continuar con el flujo definido por el motor de decisiones!");
          setShowModal(true);
          break;

        default:
          setMessageAlert("¡Validar Entes!");
          setShowModal(true);
          break;
      };
    } catch (error) {
      setMessageAlert(`${error}, Reintente la operación`);
      setShowModal(true);
    } finally {
      setShowLoading(false);
    };
  };


  const endModal = () => {
    showModal && setShowModal(false);
    showModalConfirmar && setShowModalConfirmar(false);
    url !== "" && route.push(url);
    setUrl("");
  };


  const mostrarModalConfirmacion = ({ message = "", functionContinuar, observacion = false }) => {
    setMessageAlert(message);
    setMostrarObservacion(observacion)
    setShowModalConfirmar(true);
    setCrearFuncion(functionContinuar);
  };


  const continuarAprobarSolicitud = async () => {
    setShowModalConfirmar(false);
    await solicitarAprobacion();
  };


  const ajustarSolicitud = () => {
    setShowModalConfirmar(false);
    route.push('/radicacion')
  };


  const validarSoloCredito = (solicitud?.tipoProducto && Object.keys(solicitud?.tipoProducto).length == 1 && Object.keys(solicitud?.tipoProducto)[0] == 'credito')
  const validaReciprocidadMini = (validarReciprocidadMinimaAdmin >= reciprocidadMinimaAdmin?.DATA[0]?.monto)
  //const validaReciprocidadMini = (validarReciprocidadMinimaAdmin >= reciprocidadMinimaAdmin?.DATA[0]?.monto)


  return (
    <>
      {showLoading && <Loading />}
      {showModal && (
        <DynamicModal
          titulo={"Notificación"}
          mostrarModal={endModal}
          ocultarBtnCancelar={true}
          textBtnContinuar="Ok"
          mostrarImagneFondo={true}
        >
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">
            {messageAlert}
          </p>
        </DynamicModal>
      )}
      {showModalConfirmar && (
        <DynamicModal
          titulo={"Notificación"}
          mostrarModal={crearFuncion}
          cerrarModal={endModal}
          ocultarBtnCancelar={false}
          mostrarImagneFondo={true}
          textBtnContinuar="Aceptar"
        >
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">
            {messageAlert}
          </p>
          {
            mostrarObservacion ?
              <div>
                <h5 className="text-[#002e49f3] w-full font-semibold text-sm mb-2">Observaciones</h5>
                <textarea
                  cols={36}
                  rows={6}
                  className="outline-none p-4 rounded-md shadow-md text-gray-500 text-sm"
                  name="obs"
                  id="obs"
                  autoFocus
                  value={observacion}
                  onChange={(e) => {
                    updateObservacion(e.target.value)
                    setObservacionNegar(e.target.value)
                  }}
                ></textarea>
                {
                  observacion.length > 0 ?
                    <p className="text-xs text-[#f4f6f700]">fdsfd</p>
                    :
                    <p className="text-coomeva_color-rojo text-xs  w-full ">* Campo obligatorio</p>
                }
              </div>
              :
              undefined
          }
        </DynamicModal>
      )}

      {(rolUsuario == 2 && (
        <div className="container mx-0 px-0 flex text-center justify-between">
          {/* <BtnControl
            name={activarBtnEstadoSolicitud && context.estadoSolicitud!==''?"Ajustar":"Evaluar"}
            enableButton={activarBtnEstadoSolicitud}
            functionEvaluarSolcitud={fn_resKnime}
            context={context}
            opcion={"evaluar"}
            handleTabClick={handleTabClick}
            setEvaluar={setEvaluar}
          /> */}
          {
            activarBtnEstadoSolicitud && context.estadoSolicitud !== '' && historialPath ?

              <BtnControl
                name="Ajustar"
                enableButton={true}
                context={context}
                opcion={"ajustar"}
                finalizarParametrizacion={mostrarModalConfirmacion}
                functionContinuar={() => ajustarSolicitud}

              />
              :
              <BtnControl
                name={"Evaluar"}
                enableButton={creditoConvenio ? validaReciprocidadMini : activarBtnEstadoSolicitud}
                functionEvaluarSolcitud={fn_resKnime}
                context={context}
                opcion={"evaluar"}
                handleTabClick={handleTabClick}
                setEvaluar={setEvaluar}
              />
          }
          <BtnControl
            name="Solicitar Aprobación"
            url={"/"}
            enableButton={(evaluar && historialPath)}
            context={context}
            opcion={"solictarAprobacion"}
            solicitarAprobacion={mostrarModalConfirmacion}
            functionContinuar={() => continuarAprobarSolicitud}
          />
          <BtnControl
            name="Documentos"
            url={"/radicacion/configuracion"}
            enableButton={(evaluar && historialPath) || (context.estadoSolicitud !== "" && true)}
            context={context}
            opcion={"navegar"}
          />
          {/* <BtnControl
            name="NEGAR"
            enableButton={validarBotonAprobarNegar}
            context={context}
            opcion={"negar"}
            finalizarParametrizacion={mostrarModalConfirmacion}
            functionContinuar={() => negar.bind(null, { desicion: 0 })}
          /> */}
        </div>
      )) ||
        (rolUsuario === 3 && (
          <div className="w-full flex justify-end">
            <BtnControl
              name="APROBAR"
              // url={'/'}
              enableButton={validarBotonAprobarNegar}
              context={context}
              opcion={"aprobar"}
              finalizarParametrizacion={mostrarModalConfirmacion}
              functionContinuar={() => aprobar.bind(null, { desicion: 1 })}
            />
            <BtnControl
              name="NEGAR"
              enableButton={validarBotonAprobarNegar}
              context={context}
              opcion={"negar"}
              finalizarParametrizacion={mostrarModalConfirmacion}
              functionContinuar={
                () => negar.bind(null, { desicion: 0, observacion2: 'hola soy observacion' })
              }
            />
            <BtnControl
              name="VOLVER A BANDEJA"
              url={"/radicacion/bandejaSolicitudes"}
              enableButton={true}
              context={context}
              opcion={"navegar"}
            />
          </div>
        )) ||
        (rolUsuario === 4 && (
          <div className="w-full flex justify-end">
            <BtnControl
              name="Finalizar Parametrización"
              enableButton={statusCorreo || validarSoloCredito}
              context={context}
              opcion={"finalizarParametrizacion"}
              finalizarParametrizacion={mostrarModalConfirmacion}
              functionContinuar={() =>
                finalizarParametrizacion.bind(null, { desicion: 1 })
              }
              descicion={1}
            />
            {/* <BtnControl
              name="NEGAR"
              enableButton={false} //{validarBotonAprobarNegar}
              context={context}
              opcion={"negar"}
              finalizarParametrizacion={mostrarModalConfirmacion}
              functionContinuar={() => negar.bind(null, { desicion: 0 })}
            /> */}
            <BtnControl
              name="Descargue Documentos Firmados"
              url={"/radicacion/documentos"}
              enableButton={true}
              context={context}
              opcion={"navegar"}
            />
          </div>
        ))}
    </>
  );
}