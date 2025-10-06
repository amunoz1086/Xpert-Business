'use server'

import { fn_restAsignarSobregiro } from '@/app/lib/services/cobis/fn_restAsignarSobregiro';
import { fn_update_cupoSobregiro } from "@/app/lib/apisProductoCupo/fn_update_cupoSobregiro";

export const fn_orquestadorAsignarSobregiro = async (data) => {

  const { numeroCuenta, tipoSobregiro, monto, fechaVencimiento } = JSON.parse(data);
  let responsServices = {};

  try {

    const dataReques = {
      "Identification": numeroCuenta,
      "Type": tipoSobregiro,
      "Amount": parseFloat(monto).toFixed(2),
      "ExpiryDate": convertirFecha(fechaVencimiento)
    };

    const dataCrear = await fnDatosBasicos(dataReques);
    console.log(dataCrear);

    responsServices.status = dataCrear.data?.status;

    if (+responsServices.status === 200) {
      await guardarAsignacionBd(data); //update
    };

    if (dataCrear.data?.message === undefined || dataCrear.data?.message === null) {
      responsServices.message = dataCrear.data?.operationData.Message;
    } else {
      responsServices.message = dataCrear.data?.message;
    };

  } catch (error) {
    console.log(error);
  };

  return JSON.stringify(responsServices);

};


async function fnDatosBasicos(pDataReques) {
  return JSON.parse(await fn_restAsignarSobregiro(JSON.stringify(pDataReques)));
};


const convertirFecha = (fechaDDMMYYYY) => {
  const [dia, mes, anio] = fechaDDMMYYYY.split("-");
  return `${anio}-${mes}-${dia}`;
};


async function guardarAsignacionBd(pData) {
  const rawData = JSON.parse(pData);
  rawData.EdoSolicitud = 20;

  const resGuardarAsignacionBd = await fn_update_cupoSobregiro(JSON.stringify(rawData));
  let parsedRes = {};
  if (typeof resGuardarAsignacionBd === "string" && resGuardarAsignacionBd.length > 0) {
    parsedRes = JSON.parse(resGuardarAsignacionBd);
  };

  if (parsedRes.STATUS !== 200) {
    console.error(parsedRes.MESSAGE);
  } else {
    console.error(`##Guardando asignacion en BD estatus: ${parsedRes.STATUS}`);
  };
};