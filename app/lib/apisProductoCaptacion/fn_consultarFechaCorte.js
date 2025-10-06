'use server'


import { fn_restFechaCorte } from '@/app/lib/services/cobis/fn_restConsultaFechaCorte';
const restConsultarCliente = require("@/app/lib/services/cobis/fn_restConsultas.js");
import { fn_restConsultarCatalogos } from '@/app/lib/services/catalogos/fn_restConsultarCatalogos';


export const fn_consultarFechaCorte = async (data) => {

  const { custonReference, numeroDocumento, tipoDocumento } = JSON.parse(data);

  let responsServices = {};

  try {

    const dataReques = {
      "customerId": custonReference,
      "identification": numeroDocumento,
      "identificationType": tipoDocumento,
      "customerType": "PJ",
      "catalogo": "cl_fechas_corte"
    };

    const rawFechaIncio = JSON.parse(await fn_restFechaCorte(JSON.stringify(dataReques)));
    responsServices.fechaInicio = await fechaConver(rawFechaIncio.data.operationData.fechaProximoCorte);

    const rawCodeCorte = JSON.parse(await restConsultarCliente.fn_restConsultarCliente(JSON.stringify(dataReques)));
    const CutOffDate = rawCodeCorte.data.operationData.OrganisationReference.AdditionalDataExt.CutOffDate.Name;

    const rawFechaCorte = JSON.parse(await fn_restConsultarCatalogos(JSON.stringify(dataReques)));
    const fechaCorte = rawFechaCorte.data.filter(fecha => fecha.code === CutOffDate);

    responsServices.dia = fechaCorte[0].value;
    responsServices.status = 200;

  } catch (error) {
    console.log(error);
    responsServices.status = 500;

  } finally {
    return JSON.stringify(responsServices);
  };

};


async function fechaConver(pdata) {
  const [dia, mes, anio] = pdata.split("-");
  const fechaObj = new Date(`${anio}-${mes}-${dia}`);

  if (!isNaN(fechaObj)) {
    // Obtener en formato YYYY-MM-DD
    const fechaFormateada = fechaObj.toISOString().split("T")[0];
    return fechaFormateada;
  } else {
    return '000-00-00';
  };

};