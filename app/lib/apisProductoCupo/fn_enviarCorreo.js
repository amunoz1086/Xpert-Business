'use server'

import { fn_restEnviarCorreo } from '@/app/lib/services/cobis/fn_restEnviarCorreo';

export const fn_enviarCorreo = async (data) => {

  const { destinatarios, mensaje, asunto } = JSON.parse(data);
  let responsServices = {};

  try {

    const dataReques = {
      "destinatarios": destinatarios,
      "mensaje": mensaje,
      "asunto": asunto
    };

    const dataCrear = await fnDatosBasicos(dataReques);
    console.log(dataCrear);

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
  return JSON.parse(await fn_restEnviarCorreo(JSON.stringify(pDataReques)));
};