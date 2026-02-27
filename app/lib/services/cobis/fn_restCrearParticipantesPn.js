const http = require('http');
const { randomUUID } = require('crypto');
const { getSession } = require('@/app/lib/auth/auth');
const keepAliveAgent = new http.Agent({ keepAlive: true });
const keycloakqa = require('@/app/lib/services/cognito/fn_restKeycloakqa');

let _cached = null;
let _expiresAt = 0;

async function getAccessToken() {
  const now = Date.now();
  if (_cached && now < _expiresAt) return _cached;

  const raw = await keycloakqa.fn_restKeycloakqa();
  const { access_token, expires_in, token_type } = JSON.parse(raw).data;
  _cached = { access_token, token_type };
  // desfasar 60s para prevenir expiración in-flight
  _expiresAt = now + (expires_in - 60) * 1000;
  return _cached;
}

async function fn_restCrearParticipantesPn(dataReques) {

  const { tipoPersona, tipoIdentificacion, numeroIdentificacion, identificacion, customerType, primerApellido, segundoApellido, primerNombre, segundoNombre,
    oficial, fechaExpedicion, paisNacimiento, ciudadNacimiento, fechaNacimiento, sexo, oficina, provinciaNacimiento, estadoCivil, fatca,
    crs, paisResidenciaFiscal, tipoIdentificacionTributaria, numeroidentificacionTributaria, esCiudadano, esRecidente, pep, tipoPep,
    direccionPrincipal, tipoDireccion, pais, viaPrincipal, numeroViaPrincipal, nombreViaPrincipal, letraViaPrincipal, sectorViaPrincipal,
    viaSecundaria, numeroViaSecundaria, nombreViaSecundaria, letraViaSecundaria, sectorViaSecundaria, numeroPredioViaSecundaria, tieneBarrio,
    nombreBarrio, unidad, numeroUnidad, letraUnidad, interior, numeroInterior, letraInterior, numeroPersonas, tipoVivienda, anosResidencia,
    referenciaUbiacion, numero, tipoTelefono, tipoContacto, prefijo, operadora, tipoContrato, mensajeria, telefonoPrincipal, usuarioEmail,
    tipo, usoPreferente, departamento, ciudad
  } = JSON.parse(dataReques)[0];


  const CREAR_PARTICIPANTES_HOST = process.env.URL_HOST_CREAR_PARTICIPANTES_PN;
  const CREAR_PARTICIPANTES_PORT = process.env.URL_PORT_CREAR_PARTICIPANTES_PN;
  const CREAR_PARTICIPANTES_PATH = process.env.URL_PATH_CREAR_PARTICIPANTES_PN;

  const PROTOCOL = (http ? 'http' : 'https');
  const externalUrl = `${PROTOCOL}://${CREAR_PARTICIPANTES_HOST.trim()}${CREAR_PARTICIPANTES_PORT ? `:${CREAR_PARTICIPANTES_PORT.trim()}` : ''}${CREAR_PARTICIPANTES_PATH.trim()}`;

  console.log(`✅ External API URL: ${externalUrl}`);
  console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);

  const { access_token, token_type } = await getAccessToken();
  const usuario = (await getSession()).userBACK.user;

  let json_data = {};
  let response_json_data = {};

  try {
    const options = {
      'method': 'POST',
      'hostname': `${CREAR_PARTICIPANTES_HOST}`,
      'port': CREAR_PARTICIPANTES_PORT,
      'path': `${CREAR_PARTICIPANTES_PATH}`,
      'agent': keepAliveAgent,
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${token_type} ${access_token}`
      },
      'maxRedirects': 20
    };


    let promise = new Promise(function (resolve, reject) {

      const req = http.request(options, res => {
        res.setEncoding('utf8');               // decodifica directamente a string
        json_data.status = res.statusCode;
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            data: body
          });
        });
        res.on('error', err => reject(err));
      });

      const postData = JSON.stringify({
        "header": {
          "messageId": `${randomUUID()}`,
          "timestamp": new Date().toISOString(),
          "originatingBank": process.env.ORINATINGBANK,
          "authToken": `${token_type} ${access_token}`,
          "callbackUrl": process.env.CALLBACKURL,
          "requestType": "transfer",
          "transactionId": 'txn-' + Date.now()
        },
        "metadata": {
          "priority": process.env.PRIORITY,
          "serviceLevelAgreement": process.env.SERVICELEVELAGREEMENT,
          "processingMode": process.env.PROCESSINGMODE
        },
        "deviceContext": {
          "deviceId": 'device-' + Date.now(),
          "deviceType": 'server',
          "osVersion": process.version,
          "ipAddress": "127.0.0.1",
          "macAddress": "00:1B:44:11:3A:B7",
          "geoLocation": {
            "latitude": "0.0000",
            "longitude": "0.0000"
          },
          "clientApp": {
            "appName": process.env.APPNAME,
            "appVersion": process.env.APPVERSION,
            "userAgent": `${usuario}`
          }
        },
        "operationData": {
          "CustomerReference": {
            "PartyReference": {
              "CustomerType": `${customerType}`,
              "PartyIdentification": {
                "TypeOfIdentification": `${tipoIdentificacion === undefined ? "" : tipoIdentificacion}`,
                "NationalRegistrationNumber": `${numeroIdentificacion === '' ? identificacion : numeroIdentificacion}`
              }
            },
            "PersonReference": {
              "CustomerReference": {
                /* "Occupation": "AM", */
                /* "Dependants": 10, */
                /* "Profession": "11101", */
                "OfficerExt": {
                  "Code": `${oficial === undefined ? 1 : oficial}`
                },
                "PersonName": [
                  {
                    "Type": "name",
                    "Value": `${primerNombre === undefined ? "" : primerNombre}`
                  },
                  {
                    "Type": "otherName",
                    "Value": `${segundoNombre === undefined ? "" : segundoNombre}`
                  },
                  {
                    "Type": "lastName",
                    "Value": `${primerApellido === undefined ? "" : primerApellido}`
                  },
                  {
                    "Type": "otherLastName",
                    "Value": `${segundoApellido === undefined ? "" : segundoApellido}`
                  }
                ],
                "PersonIdentification": [
                  {
                    "PersonIdentificationType": {
                      "Code": `${tipoIdentificacion === undefined ? "" : tipoIdentificacion}`
                    },
                    "Identification": `${numeroIdentificacion === '' ? identificacion : numeroIdentificacion}`,
                    "IssueDate": `${fechaExpedicion === undefined ? "" : fechaExpedicion}`
                  }
                ],
                "PersonLocation": [
                  {
                    "LocationReferenceType": "countryBirth",
                    "LocationReference": `${paisNacimiento === undefined ? "" : paisNacimiento}`
                  },
                  {
                    "LocationReferenceType": "cityBirth",
                    "LocationReference": `${ciudadNacimiento === undefined ? "" : ciudadNacimiento}`
                  },
                  {
                    "LocationReferenceType": "provinceBirth",
                    "LocationReference": `${provinciaNacimiento === undefined ? "" : provinciaNacimiento}`
                  }
                ],
                "BirthDate": `${fechaNacimiento === undefined ? "" : fechaNacimiento}`,
                "Sex": {
                  "Code": `${sexo === undefined ? "" : sexo}`
                },
                "CivilStatus": {
                  "Code": `${estadoCivil === undefined ? "" : estadoCivil}`
                },
                "Branch": {
                  "Code": `${oficina === undefined ? 1 : oficina}`
                },
                "Fatca": `${fatca === undefined ? false : fatca === 'on'}`,
                "Crs": `${crs === undefined ? false : crs === 'on'}`,
                "TaxResidenceCountry": {
                  "CountryCode": `${paisResidenciaFiscal === undefined ? 1 : paisResidenciaFiscal}`,
                  "Type": {
                    "Code": `${tipoIdentificacionTributaria === undefined ? "" : tipoIdentificacionTributaria}`
                  },
                  "Identification": {
                    "Number": `${numeroidentificacionTributaria === undefined ? "" : numeroidentificacionTributaria}`
                  },
                  "CitizenOfCountry": `${esCiudadano === undefined ? false : esCiudadano === 'on'}`,
                  "ResidenceOfCountry": `${esRecidente === undefined ? false : esRecidente === 'on'}`
                },
                "PepSituation": {
                  "Code": `${pep === undefined ? "N" : pep === 'on' ? 'S' : 'N'}`
                },
                "TypePep": [
                  {
                    "Code": `${tipoPep === undefined ? "" : tipoPep}`
                  }
                ],
                "PartyContactPoint": [
                  {
                    "PostalAddress": {
                      "Preference": `${direccionPrincipal === undefined ? false : direccionPrincipal === 'on'}`,
                      "AddressType": {
                        "Code": `${tipoDireccion === undefined ? "" : tipoDireccion}`
                      },
                      "Country": {
                        "Code": `${pais === undefined ? 0 : pais}`
                      },
                      "Department": `${departamento === undefined ? "" : departamento}`,
                      "Town": `${ciudad === undefined ? 0 : ciudad}`,
                      "MainStreetTypeExt": {
                        "Code": `${viaPrincipal === undefined ? "" : viaPrincipal}`
                      },
                      "MainStreetNumberExt": `${numeroViaPrincipal === undefined ? "" : numeroViaPrincipal}`,
                      "StreetName": `${nombreViaPrincipal === undefined ? "" : nombreViaPrincipal}`,
                      "MainStreetLetterExt": {
                        "Code": `${letraViaPrincipal === undefined ? "" : letraViaPrincipal}`
                      },
                      "RegionExt": {
                        "Code": `${sectorViaPrincipal === undefined ? "" : sectorViaPrincipal}`
                      },
                      "SecondaryStreetTypeExt": {
                        "Code": `${viaSecundaria === undefined ? "" : viaSecundaria}`
                      },
                      "SecondaryStreetNumber": `${numeroViaSecundaria === undefined ? "" : numeroViaSecundaria}`,
                      "SecondaryStreet": `${nombreViaSecundaria === undefined ? "" : nombreViaSecundaria}`,
                      "SecondaryStreetLetter": {
                        "Code": `${letraViaSecundaria === undefined ? "" : letraViaSecundaria}`
                      },
                      "SecondaryRegion": {
                        "Code": `${sectorViaSecundaria === undefined ? "" : sectorViaSecundaria}`
                      },
                      "PropertyNumber": `${numeroPredioViaSecundaria === undefined ? "" : numeroPredioViaSecundaria}`,
                      "PropertyGroup": {
                        "Code": `${tieneBarrio === undefined ? "" : tieneBarrio === 'on' ? 'BRR' : ''}`
                      },
                      "PropertyGroupName": `${nombreBarrio === undefined ? "" : nombreBarrio}`,
                      "UnitHomeType": {
                        "Code": `${unidad === undefined ? "" : unidad}`
                      },
                      "InternalNumber": `${numeroUnidad === undefined ? 0 : numeroUnidad}`,
                      "UnitLetter": `${letraUnidad === undefined ? "" : letraUnidad}`,
                      "HomeType": {
                        "Code": `${interior === undefined ? "" : interior}`
                      },
                      "HouseNumber": `${numeroInterior === undefined ? "" : numeroInterior}`,
                      "InteriorLetter": `${letraInterior === undefined ? "" : letraInterior}`,
                      //"TimeInCurrentResidence": `${añosResidencia}`,
                      //"NumberOfPeopleLivingInResidence":`${numeroPersonas}`,
                      "PropertyType": `${tipoVivienda === undefined ? "" : tipoVivienda}`,
                      "Directions": `${referenciaUbiacion === undefined ? "" : referenciaUbiacion}`
                    }
                  },
                  {
                    "PersonalNumberExt": {
                      "PhoneNumber": `${numero === undefined ? "" : numero}`,
                      "TypeExt": `${tipoTelefono === undefined ? "" : tipoTelefono}`,
                      "ContactTypeExt": `${tipoContacto === undefined ? "" : tipoContacto}`,
                      "PrefixReferenceExt": `${prefijo === undefined ? "" : prefijo}`,
                      "CustomerServiceLine": `${operadora === undefined ? "" : operadora}`,
                      "ContractType": `${tipoContrato === undefined ? "" : tipoContrato}`,
                      "MessagingType": `${mensajeria === undefined ? "" : mensajeria}`,
                      "Preference": `${telefonoPrincipal === undefined ? false : telefonoPrincipal === 'on'}`
                    }
                  },
                  /* {
                      "PhoneNumber": {
                          "PhoneNumber": `${phone2}`,
                          "TypeExt": "C",
                          "ContactTypeExt": "D",
                          "PrefixReferenceExt": "604",
                          "Preference": false
                      }
                  }, */
                  /* {
                      "BusinessNumberExt": {
                          "PhoneNumber": `${phone3}`,
                          "TypeExt": "C",
                          "ContactTypeExt": "O",
                          "PrefixReferenceExt": "604",
                          "Preference": true
                      },
                      "BusinessAddressExt": {
                          "Preference": false,
                          "AddressType": {
                              "Code": "AE"
                          },
                          "Country": {
                              "Code": "170"
                          },
                          "Department": "5",
                          "Town": "5001000",
                          "MainStreetTypeExt": {
                              "Code": "TRL"
                          },
                          "MainStreetNumberExt": "10",
                          "StreetName": "Los Altos del Prados",
                          "MainStreetLetterExt": {
                              "Code": "25"
                          },
                          "RegionExt": {
                              "Code": "NORTE"
                          },
                          "SecondaryStreetTypeExt": {
                              "Code": "AK"
                          },
                          "SecondaryStreetNumber": "22",
                          "SecondaryStreet": "11",
                          "SecondaryStreetLetter": {
                              "Code": "26"
                          },
                          "SecondaryRegion": {
                              "Code": "ESTE"
                          },
                          "PropertyNumber": "22",
                          "PropertyGroup": {
                              "Code": "BRR"
                          },
                          "PropertyGroupName": "Los Santos",
                          "UnitHomeType": {
                              "Code": "BL"
                          },
                          "InternalNumber": "22",
                          "UnitLetter": "R",
                          "HouseNumber": "1",
                          "InteriorLetter": "R",
                          "Directions": "Ubicación esquina."
                      }
                  } */
                ],
                "VirtualAddresses": [
                  {
                    "Username": `${usuarioEmail === undefined ? "" : usuarioEmail}`,
                    "Type": `${tipo === undefined ? "" : tipo}`,
                    "PreferentialUse": `${usoPreferente === undefined ? false : usoPreferente === 'on'}`
                  }
                ],
                /* "AdditionalDataExt": [
                    {
                        "ExpeditionDepartmentExt": {
                            "Code": "27",
                            "Description": "ExpeditionDepartmentExt",
                            "CatalogValue": "13"
                        }
                    },
                    {
                        "ExpeditionCountryExt": {
                            "Code": "28",
                            "Description": "ExpeditionCountryExt",
                            "CatalogValue": "100"
                        }
                    },
                    {
                        "ExpeditionPlaceExt": {
                            "Code": "19",
                            "Description": "ExpeditionPlaceExt",
                            "CatalogValue": "10001007"
                        }
                    },
                    {
                        "CutOffDateStatusExt": {
                            "Code": "24",
                            "Description": "CutOffDateStatusExt",
                            "CatalogValue": "4"
                        }
                    }
                ] */
              }
            }
          }
        }
      });

      console.log('request participantes PN:', postData);

      //captura errores de la request
      req.on('error', err => reject(err));
      req.write(postData);
      req.end();

    });

    await promise
      .finally(() => console.log(`Integratión Participantes Pn ${numeroIdentificacion} status: ${json_data.status}`))
      .then(result => {
        response_json_data.data = JSON.parse(result.data);
      })
      .catch(error => {
        throw (error);
      });

    return JSON.stringify(response_json_data);

  } catch (error) {
    console.log(`❌ External API URL: ${externalUrl}`);
    console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);
    console.error(error);
  };
};

module.exports = {
  "fn_restCrearParticipantesPn": fn_restCrearParticipantesPn,
};