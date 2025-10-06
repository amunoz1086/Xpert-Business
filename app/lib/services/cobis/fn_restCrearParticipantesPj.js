const https = require('https');
const keepAliveAgent = new https.Agent({ keepAlive: true });
const { randomUUID } = require('crypto');
const { getSession } = require('@/app/lib/auth/auth');
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

async function fn_restCrearParticipantesPj(dataReques) {

    const { customerType, tipoPersona, numeroIdentificacion, razonSocial, paisConstitucion, fechaConstitucion, tipoCompania,
        categoriaCompania, oficial, oficina, direccionPrincipal, tipoDireccion, pais, departamento, ciudad, viaPrincipal, numeroViaPrincipal,
        nombreViaPrincipal, letraViaPrincipal, sectorViaPrincipal, viaSecundaria, numeroViaSecundaria, nombreViaSecundaria, letraViaSecundaria,
        sectorViaSecundaria, numeroPredioViaSecundaria, tieneBarrio, nombreBarrio, unidad, numeroUnidad, letraUnidad, interior, numeroInterior,
        letraInterior, numeroPersonas, tipoVivienda, anosResidencia, referenciaUbiacion, numero, tipoTelefono, tipoContacto, prefijo, operadora,
        tipoContrato, telefonoPrincipal, mensajeria, usuarioEmail, tipo, usoPreferente
    } = JSON.parse(dataReques)[0];


    const CREAR_PARTICIPANTES_HOST = process.env.URL_HOST_CREAR_PARTICIPANTES_PJ;
    const CREAR_PARTICIPANTES_PORT = process.env.URL_PORT_CREAR_PARTICIPANTES_PJ;
    const CREAR_PARTICIPANTES_PATH = process.env.URL_PATH_CREAR_PARTICIPANTES_PJ;

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

            const req = https.request(options, res => {
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
                                "TypeOfIdentification": `${tipoPersona}`,
                                "NationalRegistrationNumber": `${numeroIdentificacion === undefined ? "" : numeroIdentificacion}`
                            }
                        },
                        "OrganizationReference": {
                            "OrganizationProfile": {
                                "OrganizationName": {
                                    "LegalName": `${razonSocial === undefined ? "" : razonSocial}`,
                                    "TradingName": `${razonSocial === undefined ? "" : razonSocial}`
                                },
                                "ProfileType": `${tipoCompania === undefined ? "" : tipoCompania}`,
                                "MerchantCategory": `${categoriaCompania === undefined ? "" : categoriaCompania}`,
                                /* "Sector": "0119", */
                                /* "EconomicIntent": "11", */
                                /* "Revenue": null, */
                                /* "EconomicGroup": "5" */
                            },
                            "OrganizationDate": {
                                "OrganizationEstablishmentDate": `${fechaConstitucion === undefined ? "" : fechaConstitucion}`
                            },
                            "PlaceOfRegistration": `${paisConstitucion === undefined ? 0 : paisConstitucion}`,
                            "BranchExt": `${oficina === undefined ? 1 : oficina}`,
                            "Officer": `${oficial === undefined ? 1 : oficial}`,
                            "EstablishmentDate": `${fechaConstitucion === undefined ? "" : fechaConstitucion}`,
                            /* "OrganizationInvolvement": {
                                "RepresentativeOfficer": "100000001"
                            },
                            "BranchPortfolio": {
                                "NumberExt": "2"
                            },
                            "NumberOfEmployeesExt": "100",
                            "Location": {
                                "LocationReference": "170",
                                "Jurisdiction": "1"
                            }, */
                            "PartyReference": {
                                "PartyIdentification": {
                                    "TypeOfIdentification": `${tipoPersona === undefined ? "" : tipoPersona}`,
                                    "NationalRegistrationNumber": `${numeroIdentificacion === undefined ? "" : numeroIdentificacion}`
                                },
                                "PartyContactPoint": [
                                    {
                                        "PhoneNumber": {
                                            "TypeExt": `${tipoTelefono === undefined ? "" : tipoTelefono}`,
                                            "ContractTypeReferenceExt": `${tipoContacto === undefined ? "" : tipoContacto}`,
                                            "ContactTypeExt": `${tipoContacto === undefined ? "" : tipoContacto}`,
                                            "PrefixReferenceExt": `${prefijo === undefined ? "" : prefijo}`,
                                            "PhoneNumber": `${numero === undefined ? "" : numero}`,
                                            "MessagingTypeReferenceExt": `${mensajeria === undefined ? "" : mensajeria}`,
                                            "Preference": `${telefonoPrincipal === undefined ? false : telefonoPrincipal === 'on'}`
                                        },
                                        "BusinessAddressExt": {
                                            "Preference": `${direccionPrincipal === undefined ? false : direccionPrincipal === 'on'}`,
                                            "AddressType": {
                                                "Code": `${tipoDireccion === undefined ? "" : tipoDireccion}`
                                            },
                                            "Country": {
                                                "Code": `${pais === undefined ? "" : pais}`,
                                            },
                                            "Department": `${departamento === undefined ? "" : departamento}`,
                                            "Town": `${ciudad === undefined ? "" : ciudad}`,
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
                                            "InternalNumber": `${numeroUnidad === undefined ? "" : numeroUnidad}`,
                                            "UnitLetter": `${letraUnidad === undefined ? "" : letraUnidad}`,
                                            "HomeType": {
                                                "Code": `${interior === undefined ? "" : interior}`
                                            },
                                            "HouseNumber": `${numeroInterior === undefined ? "" : numeroInterior}`,
                                            "InteriorLetter": `${letraInterior === undefined ? "" : letraInterior}`,
                                            "Directions": `${referenciaUbiacion === undefined ? "" : referenciaUbiacion}`
                                        }
                                    },
                                ]
                            },
                            "VirtualAddresses": [
                                {
                                    "Username": `${usuarioEmail === undefined ? "" : usuarioEmail}`,
                                    "Type": `${tipo === undefined ? "" : tipo}`,
                                    "PreferentialUse": `${usoPreferente === undefined ? false : usoPreferente === 'on'}`,
                                }
                            ]
                        }
                    }
                }
            });

            console.log('request participantes PJ:', postData);

            //captura errores de la request
            req.on('error', err => reject(err));
            req.write(postData);
            req.end();

        });

        await promise
            .finally(() => console.log(`Integratión Participantes Pj ${numeroIdentificacion} status: ${json_data.status}`))
            .then(result => {
                response_json_data.data = JSON.parse(result.data);
            })
            .catch(error => {
                throw (error);
            });

        return JSON.stringify(response_json_data);

    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    "fn_restCrearParticipantesPj": fn_restCrearParticipantesPj,
};