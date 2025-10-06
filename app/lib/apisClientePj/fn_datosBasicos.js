import { fn_restCrearModificarClientePj } from '@/app/lib/services/cobis/fn_restCrearModificarClientePj'
import { fn_obtenerDetalleParticipante } from '@/app/lib/apisClientePj/fn_obtenerDetalleParticipante'

export async function fnDatosBasicos(datosBasicos, informacionFinanciera, participantes) {
  // En paralelo, obtiene el CustomerRightSide para cada participante
  const enriched = await Promise.all(
    participantes.map(async p => {
      const raw = await fn_obtenerDetalleParticipante(p.numeroIdentificacion)
      const { CustomerRightSide } = JSON.parse(raw).data
      return { ...p, CustomerRightSide: { Code: CustomerRightSide } }
    })
  )

  // Asigna RelationshipAttribute según el código
  const lookup = {
    '2': () => ({ Code:1, Value:'T' }),
    '7': () => null,
    '5': () => ({ Code:1, Value:'T' }),
    '3': p => ({ Code:2, Value:(parseFloat(p.Porcentaje||0)).toFixed(2) }),
    '4': () => ({ Code:1, Value:'A3' }),
    '1': () => ({ Code:1, Value:'14' }),
  }
  const finalParticipants = enriched.map(p => {
    const base = {
      RelationShip:      { Code: p.RelationShip.Code },
      CustomerRightSide: p.CustomerRightSide,
      Side:              p.Side,
    }
    const attr = lookup[p.RelationShip.Code]?.(p)
    if (attr) base.RelationshipAttribute = [attr]
    return base
  })

  // Llamada con todos los participantes enriquecidos
  const rawRes = await fn_restCrearModificarClientePj(
    datosBasicos,
    informacionFinanciera,
    finalParticipants
  )
  return JSON.parse(rawRes)
}

// Old code, kept for reference
// async function fnDatosBasicos(pDatosBasicos, pInformacionFinanciera, pParticipantes) {

//   let resCrearModificarCliente = {};
//   let arrayParticipantes = [];

//   for (let i of pParticipantes) {

//     switch (i.RelationShip.Code) {
//       case '2': {
//         let participante = {};

//         participante.RelationShip = {
//           "Code": ${i.RelationShip.Code}
//         };
//         participante.CustomerRightSide = {
//           "Code": ${i.CustomerRightSide.Code}
//         };
//         participante.Side = ${i.Side};
//         participante.RelationshipAttribute = [
//           {
//             Code: 1,
//             Value: 'T'
//           }
//         ];

//         arrayParticipantes.push(participante);

//         break;
//       }
//       case '7': {
//         let participante = {};

//         participante.RelationShip = {
//           "Code": ${i.RelationShip.Code}
//         };
//         participante.CustomerRightSide = {
//           "Code": ${i.CustomerRightSide.Code}
//         };
//         participante.Side = ${i.Side};

//         arrayParticipantes.push(participante);
//         break;
//       }
//       case '5': {
//         let participante = {};

//         participante.RelationShip = {
//           "Code": ${i.RelationShip.Code}
//         };
//         participante.CustomerRightSide = {
//           "Code": ${i.CustomerRightSide.Code}
//         };
//         participante.Side = ${i.Side};
//         participante.RelationshipAttribute = [
//           {
//             Code: 1,
//             Value: ${'T'}
//           }
//         ];

//         arrayParticipantes.push(participante);
//         break;
//       }
//       case '3': {
//         let participante = {};

//         participante.RelationShip = {
//           "Code": ${i.RelationShip.Code}
//         };
//         participante.CustomerRightSide = {
//           "Code": ${i.CustomerRightSide.Code}
//         };
//         participante.Side = ${i.Side};
//         participante.RelationshipAttribute = [
//           {
//             Code: 2,
//             Value: ${i.Porcentaje === '' ? '0.00' : parseFloat(i.Porcentaje).toFixed(2)}

//           }
//         ];

//         arrayParticipantes.push(participante);
//         break;
//       }
//       case '4': {
//         let participante = {};

//         participante.RelationShip = {
//           "Code": ${i.RelationShip.Code}
//         };
//         participante.CustomerRightSide = {
//           "Code": ${i.CustomerRightSide.Code}
//         };
//         participante.Side = ${i.Side};
//         participante.RelationshipAttribute = [
//           {
//             Code: 1,
//             Value: ${'A3'}
//           }
//         ];

//         arrayParticipantes.push(participante);
//         break;
//       }
//       case '1': {
//         let participante = {};

//         participante.RelationShip = {
//           "Code": ${i.RelationShip.Code}
//         };
//         participante.CustomerRightSide = {
//           "Code": ${i.CustomerRightSide.Code}
//         };
//         participante.Side = ${i.Side};
//         participante.RelationshipAttribute = [
//           {
//             Code: 1,
//             Value: ${'14'}
//           }
//         ];

//         arrayParticipantes.push(participante);
//         break;
//       }
//       default:
//         break;
//     };
//   };

//   resCrearModificarCliente = JSON.parse(await fn_restCrearModificarClientePj(pDatosBasicos, pInformacionFinanciera, arrayParticipantes));
//   return resCrearModificarCliente;
// };