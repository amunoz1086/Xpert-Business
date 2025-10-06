'use server'

import { fn_restCrearPAP } from '@/app/lib/services/cobis/fn_restCrearPAP';
import { getSession } from '@/app/lib/auth/auth';

export const fn_orquestadorAsignarPlanAhorro = async (data) => {

  const { rawRolesAsignados, rawOperacion, rawAsigancion } = JSON.parse(data);
  const usuario = (await getSession()).userBACK.user;

  let responsServices = {};

  try {

    const dataReques = {
      "customerReference": rawRolesAsignados[0].custonReference,
      //"nameTitular": rawRolesAsignados[0].nombreCliente,
      "productReferenceCode": rawOperacion.producto, //Producto
      "accountCurrencyCode": `${rawOperacion.moneda}`, //Moneda
      "accountSubtypeCode": rawOperacion.productoBancario, //Subproducto
      "accountCategoryCode": rawOperacion.categoria, //Categoria
      "savingsAccountOriginationReasonCode": rawOperacion.origen, //Origen
      "officcerCode": rawOperacion.oficial, //Oficial
      "branch": +rawOperacion.oficina, //Oficina
      "productOwnership": rawOperacion.titularidad, //Titularidad
      "savingsReason": rawAsigancion.motivoAhorro, //Motivo
      "paymentFrequency": rawAsigancion.frecuencia, //Frecuencia
      "dueType": rawAsigancion.tipoVencimiento, //Tipo de Vencimiento
      "numberOfPayments": rawAsigancion.numeroCuotas, //No. de Cuotas
      "value": limpiarNumero(rawAsigancion.nValor), //Valor
      "automaticDebit": rawAsigancion.debitoAutomatico, //Debito Automatico
      "autoRenewal": `${rawAsigancion.renovacionAutomatica}`, //=== true ? 'S' : 'N', // Renovacion Automatica
      "sequential": rawAsigancion.secuencial //Secuencial
    }

    const dataCrear = await fnDatosBasicos(dataReques, rawRolesAsignados);
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


async function fnDatosBasicos(pDataReques, pRolesAsignados) {

  let arrayPropietarios = [];

  if (pRolesAsignados.length > 1) {
    for (const i of pRolesAsignados) {
      if (i.rol === 'C' || i.rol === 'F' || i.rol === 'S') {
        const AccountParty = {
          CustomerReference: `${i.custonReference}`,
          AccountPartyRole: `${i.rol}`
        };
        arrayPropietarios.push(AccountParty);
      }
    }
  };

  return JSON.parse(await fn_restCrearPAP(JSON.stringify(pDataReques), arrayPropietarios));
};


function limpiarNumero(pValue) {
  const numeroLimpio = pValue.replace(/\./g, '').replace(/[^\d]/g, '');
  return parseFloat(numeroLimpio).toFixed(2);
};