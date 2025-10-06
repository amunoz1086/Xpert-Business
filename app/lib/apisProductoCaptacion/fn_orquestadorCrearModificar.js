'use server'

import { fn_restCrearCuentaMaestra } from '@/app/lib/services/cobis/fn_restCrearCuentaMaestra';
import { getSession } from '@/app/lib/auth/auth';

export const fn_orquestadorProductosCaptacion = async (data) => {

  const { rawRolesAsignados, rawOperacion } = JSON.parse(data);
  const usuario = (await getSession()).userBACK.user;

  let responsServices = {};

  try {

    const dataReques = {

      "branchIdentification": +rawOperacion.oficina, //Oficina
      "customerCode": +rawRolesAsignados[0].custonReference, //custonReference
      "accountOriginationReasonCode": +rawOperacion.origen, //Origen
      "productOptionCode": +rawOperacion.productoBancario, //SubProducto
      "productInstanceReferenceCode": +rawOperacion.producto, //Producto
      "accountArrangementCurrency": +rawOperacion.moneda, //Moneda
      "accountCategoryCode": rawOperacion.categoria, //Categoria
      "ownershipTypeCode": rawOperacion.titularidad, //Titularidad
      "externalReference": `${+rawOperacion.productoBancario === 8 ? rawRolesAsignados[0].phoneNumero : null}`, //Celular
      "accountName": rawRolesAsignados[0].nombreCliente, //Nombre de la Cuenta
      "serviceTypeCode": null, //Tipo Servicio
      "legalAgreementReference": null, //Numero de Contrato   
      "accountStatus": null,
      "linkedPaymentAccountReference": null,
      "accountTransferIndicator": null,
      "originatingBankReference": null,
      "originatingBankCode": null,
      "officcerCode": rawOperacion.oficial //Oficial

      /* "customerCode": rawRolesAsignados[0].custonReference,
      "nameTitular": rawRolesAsignados[0].nombreCliente,
      "productCode": rawOperacion.producto,
      "currencyCode": rawOperacion.moneda,
      "subtypeCode": rawOperacion.productoBancario,
      "categoryCode": rawOperacion.categoria,
      "originationCode": rawOperacion.origen,
      "officcerCode": rawOperacion.oficial,
      "titularidadCode": rawOperacion.titularidad, */
      //"externalCode": `${+rawOperacion.productoBancario === 8 ? rawRolesAsignados[0].phoneNumero : ""}`
    };

    const dataCrear = await fnDatosBasicos(dataReques, rawRolesAsignados);
    console.log(dataCrear);
    responsServices.status = dataCrear.data?.status;
    responsServices.usu = usuario;

    if (+responsServices.status === 200) {
      responsServices.message = dataCrear.data?.operationData;
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

  return JSON.parse(await fn_restCrearCuentaMaestra(JSON.stringify(pDataReques), arrayPropietarios));
};