'use server'

//import { fn_crearModificarParticipantes } from '@/app/lib/apisClientePj/fn_crearModificarParticipantes';
import { fn_restCrearModificarClientePj } from '@/app/lib/services/cobis/fn_restCrearModificarClientePj';

export const fn_orquestadorCrearModificar = async (data) => {

  const { datosBasicos, informacionFinanciera, participantes } = JSON.parse(data);

  let responsServices = {};
  let arryParticipantes = [];

  try {

    if (participantes.representanLegal.length > 0) {
      let arrayRepresentanLegal = [];
      for (let i of participantes.representanLegal) {
        arrayRepresentanLegal = arrayRepresentanLegal.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayRepresentanLegal);
    };


    if (participantes.contactosAutorizados.length > 0) {
      let arrayContactosAutorizados = [];
      for (let i of participantes.contactosAutorizados) {
        arrayContactosAutorizados = arrayContactosAutorizados.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayContactosAutorizados);
    };


    if (participantes.administradorFiduciario.length > 0) {
      let arrayAdministradorFiduciario = [];
      for (let i of participantes.administradorFiduciario) {
        arrayAdministradorFiduciario = arrayAdministradorFiduciario.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayAdministradorFiduciario);
    };


    if (participantes.titularConsorcio.length > 0) {
      let arrayTitularConsorcio = [];
      for (let i of participantes.titularConsorcio) {
        arrayTitularConsorcio = arrayTitularConsorcio.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayTitularConsorcio);
    };


    if (participantes.administradorConsorcio.length > 0) {
      let arrayAdministradorConsorcio = [];
      for (let i of participantes.administradorConsorcio) {
        arrayAdministradorConsorcio = arrayAdministradorConsorcio.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayAdministradorConsorcio);
    };


    if (participantes.juntaDirectiva.length > 0) {
      let arrayJuntaDirectiva = [];
      for (let i of participantes.juntaDirectiva) {
        arrayJuntaDirectiva = arrayJuntaDirectiva.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayJuntaDirectiva);
    };


    if (participantes.accionistas.length > 0) {
      let arrayAccionistas = [];
      for (let i of participantes.accionistas) {
        i.customerReference.Porcentaje = i.porcentajeParticipacion
        arrayAccionistas = arrayAccionistas.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayAccionistas);
    };


    if (participantes.controlantes.length > 0) {
      let arrayControlante = [];
      for (let i of participantes.controlantes) {
        arrayControlante = arrayControlante.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayControlante);
    };


    if (participantes.beneficiariosFinales.length > 0) {
      let arrayBeneficiarios = [];
      for (let i of participantes.beneficiariosFinales) {
        i.customerReference.Porcentaje = i.porcentajeBeneficio
        arrayBeneficiarios = arrayBeneficiarios.concat(i.customerReference);
      };
      arryParticipantes = arryParticipantes.concat(arrayBeneficiarios);
    };


    if (arryParticipantes.length > 0) {
      const dataCrear = await fnDatosBasicos(datosBasicos, informacionFinanciera, arryParticipantes);
      console.log(dataCrear);
      responsServices.status = dataCrear.data?.status;
      responsServices.message = dataCrear.data?.message === undefined ? dataCrear.data?.operationData : dataCrear.data?.message;
    } else {
      responsServices.status = 204;
      responsServices.message = 'No hay participantes';
    }

  } catch (error) {
    console.log(error);
  };

  //console.log(responsServices);
  return JSON.stringify(responsServices);
};


async function fnDatosBasicos(pDatosBasicos, pInformacionFinanciera, pParticipantes) {

  let resCrearModificarCliente = {};
  let arrayParticipantes = [];

  for (let i of pParticipantes) {
    if (!i) {
      const validParticipantes = {
        "data": {
          "status": 204,
          "message": 'Faltan participantes'
        }
      }
      return validParticipantes;
    }
    switch (i.RelationShip.Code) {
      case '2': {
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;
        participante.RelationshipAttribute = [
          {
            Code: 1,
            Value: 'T'
          }
        ];

        arrayParticipantes.push(participante);

        break;
      }
      case '7': {
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;

        arrayParticipantes.push(participante);
        break;
      }
      case '30': { //Administrdor Fiduciario
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;

        arrayParticipantes.push(participante);
        break;
      }
      case '19': { // Titular Consorcio
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;

        arrayParticipantes.push(participante);
        break;
      }
      case '20': { // Administrador consorcio
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;

        arrayParticipantes.push(participante);
        break;
      }
      case '5': {
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;
        participante.RelationshipAttribute = [
          {
            Code: 1,
            Value: `${'T'}`
          }
        ];

        arrayParticipantes.push(participante);
        break;
      }
      case '3': {
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;
        participante.RelationshipAttribute = [
          {
            Code: 2,
            Value: `${i.Porcentaje === '' ? '0.00' : parseFloat(i.Porcentaje).toFixed(2)}`

          }
        ];

        arrayParticipantes.push(participante);
        break;
      }
      case '4': {
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;
        participante.RelationshipAttribute = [
          {
            Code: 1,
            Value: `${'A3'}`
          }
        ];

        arrayParticipantes.push(participante);
        break;
      }
      case '1': {
        let participante = {};

        participante.RelationShip = {
          "Code": `${i.RelationShip.Code}`
        };
        participante.CustomerRightSide = {
          "Code": `${i.CustomerRightSide.Code}`
        };
        participante.Side = `${i.Side}`;
        participante.RelationshipAttribute = [
          {
            Code: 1,
            Value: `${'14'}`
          }
        ];

        arrayParticipantes.push(participante);
        break;
      }
      default:
        break;
    };
  };

  resCrearModificarCliente = JSON.parse(await fn_restCrearModificarClientePj(pDatosBasicos, pInformacionFinanciera, arrayParticipantes));
  return resCrearModificarCliente;
};