'use server'

import { fn_restSimularDepositoPlazo } from '@/app/lib/services/cobis/fn_restSimularDepositoPlazo';
import { getSession } from '@/app/lib/auth/auth';

export const fn_orquestarSimulador = async (data) => {

  const {
    producto,
    formaPago,
    frecuenciaPago,
    capitalizaInteres,
    monto,
    moneda,
    plazo,
    fechaActivacion,
    fechaVencimiento
  } = JSON.parse(data);

  const usuario = (await getSession()).userBACK.user;

  let responsServices = {};

  try {

    const dataReques = {
      "mnemonic": producto,
      "paymentType": formaPago,
      "paymentFrequency": frecuenciaPago,
      "interestCompounded": capitalizaInteres === 0 ? false : true,
      "amount": await prepararMonto(monto), //parseFloat(monto.replace(/\./g, '').replace(/[^\d]/g, '')).toFixed(2),
      "currencyCode": moneda,
      "termInDays": +plazo,
      "valueDate": fechaActivacion
    };

    const dataSimulacion = await fnDatosBasicos(dataReques);
    console.log(dataSimulacion);
    responsServices.status = dataSimulacion.data?.status;
    responsServices.usu = usuario;

    if (+responsServices.status === 200) {
      const validacionStatusOperationData = dataSimulacion.data?.operationData.hasOwnProperty("status");

      if (validacionStatusOperationData && dataSimulacion.data?.operationData.status === '400') {
        responsServices.status = dataSimulacion.data?.operationData.status;
        responsServices.message = dataSimulacion.data?.operationData;
      } else {
        responsServices.data = dataSimulacion.data?.operationData;
      };

    } else {
      responsServices.message = dataSimulacion.data;
    };

  } catch (error) {
    console.log('❌ Error fn_orquestarSimulador', error);
  };

  return JSON.stringify(responsServices);
};


async function fnDatosBasicos(pDataReques) {
  return JSON.parse(await fn_restSimularDepositoPlazo(JSON.stringify(pDataReques)));
};


async function prepararMonto(pMonto) {
  pMonto = pMonto.replace(/[^\d.,]/g, '');
  const montoSplit = pMonto.split('');
  let controlIDX = 0;

  for (const i of montoSplit) {
    if (i === '.') {
      montoSplit.splice(controlIDX, 1);
    };
    controlIDX = controlIDX + 1
  };

  pMonto = (montoSplit.join(''));
  pMonto = pMonto.replace(',', '.');

  const numero = parseFloat(pMonto);
  if (isNaN(numero)) {
    throw new Error('El monto no es válido.');
  };

  return pMonto;
};