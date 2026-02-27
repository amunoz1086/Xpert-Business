'use server'

import { fn_restCrearCDT } from '@/app/lib/services/cobis/fn_restCrearCDT';
import { getSession } from '@/app/lib/auth/auth';

export const fn_orquestadorCrearCDT = async (data) => {

  const { rawPropietarios, rawOperacion, rawRecepcion, rawPagos } = JSON.parse(data);
  const usuario = (await getSession()).userBACK.user;

  let responsServices = {};

  try {
    const dataReques = {
      "branchLocation": rawOperacion?.oficina, //Oficina
      "customerReference": rawPropietarios[0]?.custonReference, //Customer Titular
      "depositCurrencyCode": `${rawOperacion?.moneda}`, //Moneda
      "depositAmount": limpiarNumero(rawOperacion?.monto), //Monto
      "depositTerm": rawOperacion?.plazo, //Plazo
      "depositValueDate": rawOperacion?.fechaActivacion, //Fecha activación
      "depositAccountOfficer": rawOperacion?.oficial, //Oficial
      "payOutMethod": rawPagos?.fp_formaPago.trim(), // Forma de Pago
      "productTypeCode": rawOperacion?.producto, //Producto
      "compoundingIndicator": +rawOperacion?.capitalizaInteres === 0 ? false : true, //Capitalizacion
      "paymentTypeCode": rawOperacion?.formaPago, //Forma de Pago
      "frequencyCode": `${rawOperacion?.frecuenciaPago}`, //Frecuencia de Pago
      "interestRate": limpiarPorcentage(rawOperacion?.tasaInteres), //Tasa especial
      "ownershipTypeCode": rawOperacion?.tipoCuenta, //Tipo de Cuenta
      "dematerialization": +rawOperacion?.desmaterializado === 1 ? 'S' : 'N', //Desmaterializado
      //header
      "userAgent": usuario
    };

    const dataCrear = await fnDatosBasicos(dataReques, rawRecepcion, rawPropietarios, rawPagos);
    console.log(dataCrear);

    responsServices.status = dataCrear.data?.status;
    responsServices.usu = usuario;

    if (+responsServices.status === 200) {
      responsServices.message = dataCrear.data?.message;
      responsServices.operation = dataCrear.data?.operationData;
    } else {
      responsServices.message = dataCrear.data?.message;
    };

  } catch (error) {
    console.log(error);
  };

  return JSON.stringify(responsServices);
};


async function fnDatosBasicos(pDataReques, pFormasRecepcion, pRolesAsignados, pFormasPago) {

  let arrayPropietarios = [];
  let arrayFormasRecepcion = [];
  let payInMethod = {};
  let payOutMethod = {};


  //Roles Asignados
  if (pRolesAsignados.length > 1) {
    for (const i of pRolesAsignados) {
      if (i?.rol === 'F') {
        const JointParty = {
          CustomerReference: `${i?.custonReference.trim()}`,
        };
        arrayPropietarios.push(JointParty);
      };
    };
  };


  //Metodos de Pago input y Recepción
  if (pFormasRecepcion.length === 1) {
    payInMethod.PayInMethod = pFormasRecepcion[0]?.formaRecepcionCode.trim();
    if (payInMethod?.PayInMethod === 'AHO' || payInMethod?.PayInMethod === 'CTE') {
      payInMethod.PayInAccount = {
        "Identifier": pFormasRecepcion[0]?.fr_cuenta.trim()
      };
    };
  } else if (pFormasRecepcion.length > 1) {
    let payInDetail = {};

    for (const i of pFormasRecepcion) {
      if (i?.formaRecepcionCode === 'AHO' || i?.formaRecepcionCode === 'CTE') {
        payInDetail = {
          "PaymentMethod": `${i?.formaRecepcionCode}`,
          "PaymentAccount": {
            "Identifier": `${i?.fr_cuenta}`
          },
          "Amount": `${limpiarNumero(i?.fr_monto)}`
        };
      } else {
        payInDetail = {
          "PaymentMethod": `${i?.formaRecepcionCode}`,
          "Amount": `${limpiarNumero(i?.fr_monto)}`
        };
      };

      arrayFormasRecepcion.push(payInDetail);
    };

    payInMethod.PayInMethod = arrayFormasRecepcion.at(-1).PaymentMethod;
    if (payInMethod?.PayInMethod === 'AHO' || payInMethod?.PayInMethod === 'CTE') {
      const numeroCuenta = pFormasRecepcion.at(-1);
      payInMethod.PayInAccount = {
        "Identifier": numeroCuenta?.fr_cuenta.trim()
      };
    };

    arrayFormasRecepcion.pop();

  };


  //Metodos de Pago output
  if (pDataReques?.payOutMethod === 'AHO' || pDataReques?.payOutMethod === 'CTE') {
    payOutMethod.PayOutAccount = {
      "Identifier": pFormasPago?.fp_cuenta.trim()
    };
  };

  return JSON.parse(await fn_restCrearCDT(JSON.stringify(pDataReques), arrayPropietarios, arrayFormasRecepcion, payInMethod, payOutMethod));

};


function limpiarNumero(pValue) {
  pValue = pValue.replace(/[^\d.,]/g, '');
  const montoSplit = pValue.split('');
  let controlIDX = 0;

  for (const i of montoSplit) {
    if (i === '.') {
      montoSplit.splice(controlIDX, 1);
    };
    controlIDX = controlIDX + 1
  };

  pValue = (montoSplit.join(''));
  pValue = pValue.replace(',', '.');

  const numero = parseFloat(pValue);
  if (isNaN(numero)) {
    throw new Error('El monto no es válido.');
  };

  return pValue;
};


function limpiarPorcentage(pValor) {
  if (typeof (pValor) === 'string' && pValor.length > 0) {
    const valorClean = pValor
      .replace('%', '')
      .replace(',', '.')
      .trim()
    return valorClean;
  };

  return null;

};