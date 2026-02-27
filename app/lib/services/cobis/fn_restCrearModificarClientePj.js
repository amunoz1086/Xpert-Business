const http = require('http');
const fs = require('fs');
const { randomUUID } = require('crypto');
const { getSession } = require('@/app/lib/auth/auth');
const keycloakqa = require('@/app/lib/services/cognito/fn_restKeycloakqa');


async function fn_restCrearModificarClientePj(pDatosBasicos, pInformacionFinanciera, pParticipantes) {

    const usuario = (await getSession()).userBACK.user;

    const CREAR_CLIENTES_HOST = process.env.URL_HOST_CREAR_CLIENTES_PJ;
    const CREAR_CLIENTES_PORT = process.env.URL_PORT_CREAR_CLIENTES_PJ;
    const CREAR_CLIENTES_PATH = process.env.URL_PATH_CREAR_CLIENTES_PJ;

    const PROTOCOL = (http ? 'http' : 'https');
    const externalUrl = `${PROTOCOL}://${CREAR_CLIENTES_HOST.trim()}${CREAR_CLIENTES_PORT ? `:${CREAR_CLIENTES_PORT.trim()}` : ''}${CREAR_CLIENTES_PATH.trim()}`;

    console.log(`✅ External API URL: ${externalUrl}`);
    console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);


    const token = JSON.parse(await keycloakqa.fn_restKeycloakqa());
    const access_token = token.data.access_token;
    const token_type = token.data.token_type;

    let json_data = {};
    let response_json_data = {};

    try {

        const options = {
            'method': 'POST',
            'hostname': `${CREAR_CLIENTES_HOST}`,
            'port': CREAR_CLIENTES_PORT,
            'path': `${CREAR_CLIENTES_PATH}`,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${token_type} ${access_token}`
            },
            'maxRedirects': 20
        };


        let promise = new Promise(function (resolve, reject) {

            const req = http.request(options, function (res) {

                const chunks = [];
                json_data.status = res.statusCode;

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function (chunk) {
                    const body = Buffer.concat(chunks);
                    json_data.data = body.toString();
                    resolve(json_data);
                });

                res.on("error", function (error) {
                    reject(error);
                });
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
                            "CustomerType": "PJ",
                            "PartyIdentification": {
                                "TypeOfIdentification": `${pDatosBasicos.datosGenerales.tipoIdentificacion}`,
                                "NationalRegistrationNumber": `${pDatosBasicos.datosGenerales.numeroIdentificacion}`
                            }
                        },
                        "OrganizationReference": {
                            "OrganizationProfile": {
                                "OrganizationName": {
                                    "LegalName": `${pDatosBasicos.datosGenerales.razonSocial === undefined ? "" : pDatosBasicos.datosGenerales.razonSocial}`,
                                    "TradingName": `${pDatosBasicos.informacionLegal.nombreComercial === undefined ? "" : pDatosBasicos.informacionLegal.nombreComercial}`
                                },
                                "ProfileType": `${pDatosBasicos.datosGenerales.tipoSociedad === undefined ? "" : pDatosBasicos.datosGenerales.tipoSociedad}`,
                                "MerchantCategory": `${pDatosBasicos.datosGenerales.categoriaCompania === undefined ? "" : pDatosBasicos.datosGenerales.categoriaCompania}`,
                                "Sector": `${pDatosBasicos.datosEconomicos.actividadEconomica === undefined ? "" : pDatosBasicos.datosEconomicos.actividadEconomica}`,
                                "EconomicIntent": `${pDatosBasicos.datosEconomicos.fuentePrincipalIngresos === undefined ? "" : pDatosBasicos.datosEconomicos.fuentePrincipalIngresos}`,
                                "Revenue": `${pDatosBasicos.datosEconomicos.ingresosAnuales === undefined ? '0.00' : parseFloat(pDatosBasicos.datosEconomicos.ingresosAnuales).toFixed(2)}`,
                                "EconomicGroup": `${pDatosBasicos.datosEconomicos.grupoEconomico === undefined ? "" : pDatosBasicos.datosEconomicos.grupoEconomico}` // Validar de donde viene el valor
                            },
                            "OrganizationLocation": {
                                "LocationReference": `${pDatosBasicos.conozcaSuCliente.paisOperacion === undefined ? 0 : pDatosBasicos.conozcaSuCliente.paisOperacion}`
                            },
                            "OrganizationDate": {
                                "OrganizationEstablishmentDate": `${pDatosBasicos.informacionLegal.fechaInscripcion === undefined ? 0 : pDatosBasicos.informacionLegal.fechaInscripcion}`
                            },
                            "EstablishmentDate": `${pDatosBasicos.informacionLegal.fechaConstitucion === undefined ? "" : pDatosBasicos.informacionLegal.fechaConstitucion}`,
                            "PlaceOfRegistration": `${pDatosBasicos.datosGenerales.codPaisConstitucion === undefined ? 0 : pDatosBasicos.datosGenerales.codPaisConstitucion}`,
                            "Officer": `${pDatosBasicos.datosGenerales.oficial === undefined ? 1 : pDatosBasicos.datosGenerales.oficial}`,
                            "OrganizationInvolvement": {
                                "RepresentativeOfficer": `${pParticipantes[0].CustomerRightSide.Code === undefined ? 1 : pParticipantes[0].CustomerRightSide.Code}`, //`${pDatosBasicos.datosEconomicos.representanLegal}` //100000220 //100000670
                            },
                            "BranchExt": `${pDatosBasicos.datosGenerales.oficina === undefined ? 1 : pDatosBasicos.datosGenerales.oficina}`,
                            "BranchPortfolio": {
                                "NumberExt": `${pDatosBasicos.conozcaSuCliente.numeroSucursales === undefined ? 0 : pDatosBasicos.conozcaSuCliente.numeroSucursales}`
                            },
                            "NumberOfEmployeesExt": `${pDatosBasicos.conozcaSuCliente.numeroEmpleados === undefined ? 0 : pDatosBasicos.conozcaSuCliente.numeroEmpleados}`,
                            "Location": {
                                "Jurisdiction": `${pDatosBasicos.conozcaSuCliente.coberturaGeografica === undefined ? "" : pDatosBasicos.conozcaSuCliente.coberturaGeografica}`
                            },
                            "PartyReference": {
                                "PartyIdentification": {
                                    "TypeOfIdentification": `${pDatosBasicos.datosGenerales.tipoIdentificacion === undefined ? "" : pDatosBasicos.datosGenerales.tipoIdentificacion}`,
                                    "NationalRegistrationNumber": `${pDatosBasicos.datosGenerales.numeroIdentificacion === undefined ? "" : pDatosBasicos.datosGenerales.numeroIdentificacion}`
                                },
                                "PartyContactPoint": [
                                    {
                                        "PhoneNumber": {
                                            "TypeExt": `${pDatosBasicos.telefonos.telefonoNegocio[0]?.tipoTelefono === undefined ? "" : pDatosBasicos.telefonos.telefonoNegocio[0]?.tipoTelefono}`,
                                            "ContactTypeExt": `${pDatosBasicos.telefonos.telefonoNegocio[0]?.tipoContacto === undefined ? "" : pDatosBasicos.telefonos.telefonoNegocio[0]?.tipoContacto}`,
                                            "PrefixReferenceExt": `${pDatosBasicos.telefonos.telefonoNegocio[0]?.prefijo === undefined ? "" : pDatosBasicos.telefonos.telefonoNegocio[0]?.prefijo}`,
                                            "PhoneNumber": `${pDatosBasicos.telefonos.telefonoNegocio[0]?.numero === undefined ? "" : pDatosBasicos.telefonos.telefonoNegocio[0]?.numero}`,
                                            "MessagingTypeReferenceExt": `${pDatosBasicos.telefonos.telefonoNegocio[0]?.mensajeria === undefined ? "" : pDatosBasicos.telefonos.telefonoNegocio[0]?.mensajeria}`,
                                            "Preference": `${pDatosBasicos.telefonos.telefonoNegocio[0]?.principal === undefined ? false : pDatosBasicos.telefonos.telefonoNegocio[0]?.principal === 'on'}` //true or false
                                        },
                                        "BusinessAddressExt": {
                                            "Preference": `${pDatosBasicos.direcciones.direccionNegocio[0]?.direccionPrincipalNegocio === undefined ? false : pDatosBasicos.direcciones.direccionNegocio[0]?.direccionPrincipalNegocio === 'on'}`, //true or false
                                            "AddressType": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.tipoDireccion === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.tipoDireccion}`
                                            },
                                            "Country": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.pais === undefined ? 0 : pDatosBasicos.direcciones.direccionNegocio[0]?.pais}`
                                            },
                                            "Town": `${pDatosBasicos.direcciones.direccionNegocio[0]?.ciudad === undefined ? 0 : pDatosBasicos.direcciones.direccionNegocio[0]?.ciudad}`,
                                            "Department": `${pDatosBasicos.direcciones.direccionNegocio[0]?.departamento === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.departamento}`,
                                            "MainStreetTypeExt": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.tipoViaPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.tipoViaPrincipal}`
                                            },
                                            "MainStreetNumberExt": `${pDatosBasicos.direcciones.direccionNegocio[0]?.numeroViaPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.numeroViaPrincipal}`,
                                            "StreetName": `${pDatosBasicos.direcciones.direccionNegocio[0]?.nombreViaPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.nombreViaPrincipal}`,
                                            "MainStreetLetterExt": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.letraViaPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.letraViaPrincipal}` //cl_letra_via
                                            },
                                            "RegionExt": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.sectoViarPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.sectoViarPrincipal}` //cl_sector_dir
                                            },
                                            "SecondaryStreetTypeExt": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.tipoViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.tipoViaSecundaria}`
                                            },
                                            "SecondaryStreetNumber": `${pDatosBasicos.direcciones.direccionNegocio[0]?.numeroViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.numeroViaSecundaria}`,
                                            "SecondaryStreet": `${pDatosBasicos.direcciones.direccionNegocio[0]?.nombreViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.nombreViaSecundaria}`,
                                            "SecondaryStreetLetter": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.letraPrincipalViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.letraPrincipalViaSecundaria}` //cl_letra_via
                                            },
                                            "SecondaryRegion": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.sectorViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.sectorViaSecundaria}` //cl_sector_dir
                                            },
                                            "PropertyNumber": `${pDatosBasicos.direcciones.direccionNegocio[0]?.numeroPredioViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.numeroPredioViaSecundaria}`,
                                            "PropertyGroup": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.barrio === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.barrio === 'on' ? 'BRR' : ""}`//cl_tipo_conjunto
                                            },
                                            "PropertyGroupName": `${pDatosBasicos.direcciones.direccionNegocio[0]?.nombreBarrio === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.nombreBarrio}`,
                                            "UnitHomeType": {
                                                "Code": `${pDatosBasicos.direcciones.direccionNegocio[0]?.unidad === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.unidad}` //cl_tipo_edificio
                                            },
                                            "InternalNumber": `${pDatosBasicos.direcciones.direccionNegocio[0]?.numeroUnidad === undefined ? 0 : pDatosBasicos.direcciones.direccionNegocio[0]?.numeroUnidad}`,
                                            "UnitLetter": `${pDatosBasicos.direcciones.direccionNegocio[0]?.letraUnidad === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.letraUnidad}`, //cl_letra_via
                                            "HouseNumber": `${pDatosBasicos.direcciones.direccionNegocio[0]?.numeroInterior === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.numeroInterior}`,
                                            "InteriorLetter": `${pDatosBasicos.direcciones.direccionNegocio[0]?.letraInterior === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.letraInterior}`,
                                            "Directions": `${pDatosBasicos.direcciones.direccionNegocio[0]?.referenciaUbicacion === undefined ? "" : pDatosBasicos.direcciones.direccionNegocio[0]?.referenciaUbicacion}`
                                        }
                                    },
                                    {
                                        "WorkNumber": {
                                            "TypeExt": `${pDatosBasicos.telefonos.telefonoOficina[0]?.tipoTelefono === undefined ? "" : pDatosBasicos.telefonos.telefonoOficina[0]?.tipoTelefono}`,
                                            "ContactTypeExt": `${pDatosBasicos.telefonos.telefonoOficina[0]?.tipoContacto === undefined ? "" : pDatosBasicos.telefonos.telefonoOficina[0]?.tipoContacto}`,
                                            "PrefixReferenceExt": `${pDatosBasicos.telefonos.telefonoOficina[0]?.prefijo === undefined ? "" : pDatosBasicos.telefonos.telefonoOficina[0]?.prefijo}`,
                                            "PhoneNumber": `${pDatosBasicos.telefonos.telefonoOficina[0]?.numero === undefined ? "" : pDatosBasicos.telefonos.telefonoOficina[0]?.numero}`,
                                            "MessagingTypeReferenceExt": `${pDatosBasicos.telefonos.telefonoOficina[0]?.mensajeria === undefined ? "" : pDatosBasicos.telefonos.telefonoOficina[0]?.mensajeria}`,
                                            "Preference": `${pDatosBasicos.telefonos.telefonoOficina[0]?.principal === undefined ? false : pDatosBasicos.telefonos.telefonoOficina[0]?.principal === 'on'}`
                                        },
                                        "OfficeAddressExt": {
                                            "Preference": `${pDatosBasicos.direcciones.direccionSucursal[0]?.direccionPrincipalSucursal === undefined ? false : pDatosBasicos.direcciones.direccionSucursal[0]?.direccionPrincipalSucursal === 'on'}`,
                                            "AddressType": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.tipoDireccion === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.tipoDireccion}`
                                            },
                                            "Country": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.pais === undefined ? 0 : pDatosBasicos.direcciones.direccionSucursal[0]?.pais}`
                                            },
                                            "Department": `${pDatosBasicos.direcciones.direccionSucursal[0]?.departamento === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.departamento}`,
                                            "Town": `${pDatosBasicos.direcciones.direccionSucursal[0]?.ciudad === undefined ? 0 : pDatosBasicos.direcciones.direccionSucursal[0]?.ciudad}`,
                                            "MainStreetTypeExt": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.tipoViaPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.tipoViaPrincipal}`
                                            },
                                            "MainStreetNumberExt": `${pDatosBasicos.direcciones.direccionSucursal[0]?.numeroViaPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.numeroViaPrincipal}`,
                                            "StreetName": `${pDatosBasicos.direcciones.direccionSucursal[0]?.nombreViaPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.nombreViaPrincipal}`,
                                            "MainStreetLetterExt": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.letraViaPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.letraViaPrincipal}` //cl_letra_via
                                            },
                                            "RegionExt": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.sectoViarPrincipal === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.sectoViarPrincipal}` //cl_sector_dir
                                            },
                                            "SecondaryStreetTypeExt": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.tipoViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.tipoViaSecundaria}`
                                            },
                                            "SecondaryStreetNumber": `${pDatosBasicos.direcciones.direccionSucursal[0]?.numeroViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.numeroViaSecundaria}`,
                                            "SecondaryStreet": `${pDatosBasicos.direcciones.direccionSucursal[0]?.nombreViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.nombreViaSecundaria}`,
                                            "SecondaryStreetLetter": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.letraPrincipalViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.letraPrincipalViaSecundaria}` ////cl_letra_via
                                            },
                                            "SecondaryRegion": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.sectorViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.sectorViaSecundaria}` //cl_sector_dir
                                            },
                                            "PropertyNumber": `${pDatosBasicos.direcciones.direccionSucursal[0]?.numeroPredioViaSecundaria === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.numeroPredioViaSecundaria}`,
                                            "PropertyGroup": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.barrio === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.barrio === 'on' ? 'BRR' : ""}` //cl_tipo_conjunto
                                            },
                                            "PropertyGroupName": `${pDatosBasicos.direcciones.direccionSucursal[0]?.nombreBarrio === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.nombreBarrio}`,
                                            "UnitHomeType": {
                                                "Code": `${pDatosBasicos.direcciones.direccionSucursal[0]?.unidad === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.unidad}` //cl_tipo_edificio
                                            },
                                            "InternalNumber": `${pDatosBasicos.direcciones.direccionSucursal[0]?.numeroUnidad === undefined ? 0 : pDatosBasicos.direcciones.direccionSucursal[0]?.numeroUnidad}`,
                                            "UnitLetter": `${pDatosBasicos.direcciones.direccionSucursal[0]?.letraUnidad === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.letraUnidad}`, //cl_letra_via
                                            "HouseNumber": `${pDatosBasicos.direcciones.direccionSucursal[0]?.numeroInterior === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.numeroInterior}`,
                                            "InteriorLetter": `${pDatosBasicos.direcciones.direccionSucursal[0]?.letraInterior === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.letraInterior}`,
                                            "Directions": `${pDatosBasicos.direcciones.direccionSucursal[0]?.referenciaUbicacion === undefined ? "" : pDatosBasicos.direcciones.direccionSucursal[0]?.referenciaUbicacion}`
                                        }
                                    },
                                    {
                                        "PersonalNumber": {
                                            "TypeExt": `${pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.tipoTelefono === undefined ? "" : pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.tipoTelefono}`,
                                            "ContactTypeExt": `${pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.tipoContacto === undefined ? "" : pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.tipoContacto}`,
                                            "PrefixReferenceExt": `${pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.prefijo === undefined ? "" : pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.prefijo}`,
                                            "PhoneNumber": `${pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.numero === undefined ? "" : pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.numero}`,
                                            "MessagingTypeReferenceExt": `${pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.mensajeria === undefined ? "" : pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.mensajeria}`,
                                            "Preference": `${pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.principal === undefined ? false : pDatosBasicos.telefonos.telefonoPersonalAutorizado[0]?.principal === 'on'}`
                                        }
                                    }
                                ]
                            },
                            "VirtualAddresses": [
                                {
                                    "Username": `${pDatosBasicos.correosElectronicos[0]?.correoElectronico === undefined ? "" : pDatosBasicos.correosElectronicos[0]?.correoElectronico}`, //El correo debe ser valido
                                    "Type": `${pDatosBasicos.correosElectronicos[0]?.tipoCorreo === undefined ? "" : pDatosBasicos.correosElectronicos[0]?.tipoCorreo}`, // cl_tdireccion_virtual
                                    "PreferentialUse": `${pDatosBasicos.correosElectronicos[0]?.usuPreferente === undefined ? false : pDatosBasicos.correosElectronicos[0]?.usuPreferente === 'on'}`
                                },
                                {
                                    "Username": `${pDatosBasicos.sitiosWeb[0]?.url === undefined ? "" : pDatosBasicos.sitiosWeb[0]?.url}`,
                                    "Type": `${pDatosBasicos.sitiosWeb[0]?.tipoSitioWeb === undefined ? "" : pDatosBasicos.sitiosWeb[0]?.tipoSitioWeb}`, // cl_tdireccion_virtual
                                    "PreferentialUse": `${pDatosBasicos.sitiosWeb[0]?.usuPreferente === undefined ? false : pDatosBasicos.sitiosWeb[0]?.usuPreferente === 'on'}`
                                }
                            ],
                            "LegalResidence": {
                                "EntityOfUSA": `${pDatosBasicos?.residenciaFiscal?.personaEstadosUnidos === undefined ? "CRS1.2" : pDatosBasicos?.residenciaFiscal?.personaEstadosUnidos === 'on' ? "CRS1.1" : "CRS1.2"}`,
                                ...(pDatosBasicos?.residenciaFiscal?.personaEstadosUnidos === 'on' && {
                                    "SpecificEntityOfUSA": `${pDatosBasicos?.residenciaFiscal?.personaEspecificaEstadosUnidos === undefined ? "" : pDatosBasicos?.residenciaFiscal?.personaEspecificaEstadosUnidos === 'on' ? "CRS2.1" : ""}`
                                }),
                                ...(pDatosBasicos?.residenciaFiscal?.personaEstadosUnidos === 'on' && {
                                    "IdentificationOfUSA": {
                                        "Number": `${pDatosBasicos?.residenciaFiscal?.TIN === undefined ? "" : pDatosBasicos?.residenciaFiscal?.TIN}`
                                    }
                                }),
                                ...(pDatosBasicos?.residenciaFiscal?.personaEstadosUnidos === 'on' && {
                                    "CommentIdentification": `${pDatosBasicos?.residenciaFiscal?.motivo === undefined ? "No Quiere" : pDatosBasicos?.residenciaFiscal?.motivo === "" ? "No Quiere" : pDatosBasicos?.residenciaFiscal?.motivo}`
                                }),
                                "TypeEntityFATCA": {
                                    "Code": `${pDatosBasicos?.residenciaFiscal?.clasificacionFATCA === undefined ? "CRS5.5" : pDatosBasicos?.residenciaFiscal?.clasificacionFATCA === '' ? "CRS5.5" : pDatosBasicos?.residenciaFiscal?.clasificacionFATCA}` //"CRS5.5"
                                },
                                "EntityHasGIINId": {
                                    "Code": `${pDatosBasicos?.residenciaFiscal?.GIIN === undefined ? "CRS6.2" : pDatosBasicos?.residenciaFiscal?.GIIN === 'on' ? "CRS6.1" : "CRS6.2"}` //"CRS6.1"
                                },
                                ...(pDatosBasicos?.residenciaFiscal?.personaEstadosUnidos === 'on' && {
                                    "GlobalIntermediaryIdentification": {
                                        "Code": `${pDatosBasicos?.residenciaFiscal?.numeroGIIN === undefined ? "" : pDatosBasicos?.residenciaFiscal?.numeroGIIN}`
                                    }
                                }),
                                "EntityHasTaxResidence": {
                                    "Code": `${pDatosBasicos?.residenciaFiscal?.tienePais === undefined ? "CRS7.2" : pDatosBasicos?.residenciaFiscal?.tienePais === 'on' ? "CRS7.1" : "CRS7.2"}` //"CRS7.1"
                                },
                                ...(pDatosBasicos?.residenciaFiscal?.personaEstadosUnidos === 'on' && {
                                    "CountryCode": `${pDatosBasicos?.residenciaFiscal?.paisRecidenciaFiscal === undefined ? 1 : pDatosBasicos?.residenciaFiscal?.paisRecidenciaFiscal}`
                                }),
                                ...(pDatosBasicos?.residenciaFiscal?.personaEstadosUnidos === 'on' && {
                                    "TaxIdentification": {
                                        "Type": {
                                            "Code": `${pDatosBasicos?.residenciaFiscal?.tipoIdentificacionTributaria === undefined ? "" : pDatosBasicos?.residenciaFiscal?.tipoIdentificacionTributaria}`
                                        },
                                        "Number": `${pDatosBasicos?.residenciaFiscal?.numeroIdentificacionTributaria === undefined ? "" : pDatosBasicos?.residenciaFiscal?.numeroIdentificacionTributaria}`
                                    }
                                })
                            },
                            /* "PersonalReferenceExt": {
                                "RelationshipType": {
                                    "Code": "AM"
                                },
                                "PersonName": [
                                    {
                                        "Type": "name",
                                        "Name": `${pDatosBasicos.camposAdicionales.nombreCompleto}`
                                    },
                                    {
                                        "Type": "otherName",
                                        "Name": `${pDatosBasicos.camposAdicionales.nombreCompleto}`
                                    },
                                    {
                                        "Type": "lastName",
                                        "Name": `${pDatosBasicos.camposAdicionales.primerApellido}`
                                    },
                                    {
                                        "Type": "otherLastName",
                                        "Name": `${pDatosBasicos.camposAdicionales.segundoApellido}`
                                    }
                                ],
                                "PersonIdentification": {
                                    "PersonIdentificationType": {
                                        "Code": `${pDatosBasicos.camposAdicionales.tipoIdentificacionPersonal}`
                                    },
                                    "Identification": `${pDatosBasicos.camposAdicionales.numeroIdentificacion}`
                                },
                                "PepSituation": "N", //Debe ser lista
                                "PepFunction": [
                                    {
                                        "Code": `${pDatosBasicos.camposAdicionales.funcionPep}`
                                    }
                                ],
                                "PoliticalOfficeDependency": {
                                    "Code": "1"
                                },
                                "PoliticalOffice": {
                                    "Code": "1"
                                },
                                "StartDatePEP": `${pDatosBasicos.camposAdicionales.fechaInicio}`,
                                "EndDatePEP": `${pDatosBasicos.camposAdicionales.fechaFin}`,
                                "PartyContactPoint": {
                                    "PhoneNumberReference": {
                                        "ContractTypeReferenceExt": `${pDatosBasicos.camposAdicionales.tipoContacto}`
                                    },
                                    "TypeExt": `${pDatosBasicos.camposAdicionales.tipoTelefono}`,
                                    "PrefixReferenceExt": `${pDatosBasicos.camposAdicionales.prefijo}`,
                                    "PhoneNumber": `${pDatosBasicos.camposAdicionales.telefono}`
                                }
                            }, */
                            "AdditionalDataExt": [
                                {
                                    /* "EnrollMentDatePJExt": {
                                        "Code": "2",
                                        "Description": "FECHA DE INGRESO ASOCIADO PJ",
                                        "CatalogValue": `${pDatosBasicos.camposAdicionales.fechaIngresoAsociadoPj}`
                                    } */
                                },
                                {
                                    /* "TypeClientExt": {
                                        "Code": "4",
                                        "Description": "TIPO DE CLIENTE",
                                        "CatalogValue": `${pDatosBasicos.camposAdicionales.tipoClientesPj}`
                                    } */
                                },
                                {
                                    "SectorExt": {
                                        "Code": "5",
                                        "Description": "SECTOR ECONOMICO",
                                        "CatalogValue": `${pDatosBasicos.camposAdicionales.sectorEconomico === undefined ? "" : pDatosBasicos.camposAdicionales.sectorEconomico}`
                                    }
                                },
                                {
                                    "CityOfEstalishmentExt": {
                                        "Code": "22",
                                        "Description": "CIUDAD DE CONSTITUCION",
                                        "CatalogValue": `${pDatosBasicos.camposAdicionales.ciudadConstitucion === undefined ? "" : pDatosBasicos.camposAdicionales.ciudadConstitucion}`
                                    }
                                },
                                {
                                    "CorrespondenceExt": {
                                        "Code": "13",
                                        "Description": "CORRESPONDENCIA",
                                        "CatalogValue": `${pDatosBasicos.camposAdicionales.marcaCorrespondenciaUnica === undefined ? "" : pDatosBasicos.camposAdicionales.marcaCorrespondenciaUnica === 'on' ? "AE" : ""}` //Cl_corresp
                                    }
                                },
                                {
                                    "CutOffExt": {
                                        "Code": "23",
                                        "Description": "FECHA DE CORTE",
                                        "CatalogValue": `${pDatosBasicos.camposAdicionales.fechaCorte === undefined ? "" : pDatosBasicos.camposAdicionales.fechaCorte}` // cl_fechas_corte
                                    }
                                },
                                {
                                    "VinculationProductsExt": {
                                        "Code": "32",
                                        "Description": "PRODUCTOS",
                                        "CatalogValue": "2" //cl_productos_vincu_laft
                                    }
                                }
                            ],
                            "ParticipantsExt": pParticipantes,
                            "FinancialInformationExt": {
                                "Balance": {
                                    "Code": `${pInformacionFinanciera.situacionEconomica.tipoBalance === undefined ? "" : pInformacionFinanciera.situacionEconomica.tipoBalance}`//"PGJ"
                                },
                                "Certification": {
                                    "Code": `${pInformacionFinanciera.situacionEconomica.claseBalance === undefined ? "" : pInformacionFinanciera.situacionEconomica.claseBalance}`//"A"
                                },
                                "CutOffDate": `${pInformacionFinanciera.situacionEconomica.fechaCorte === undefined ? "" : pInformacionFinanciera.situacionEconomica.fechaCorte}`,
                                "AnnualSales": {
                                    "Code": "300",
                                    "AccountAmount": `${pInformacionFinanciera.situacionEconomica.ventasAnuales === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionEconomica.ventasAnuales).toFixed(2)}`,
                                    "Name": "AnnualSales"
                                },
                                "MonthlyIncome": {
                                    "Code": "302",
                                    "AccountAmount": `${pInformacionFinanciera.situacionEconomica.ingresosMensuales === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionEconomica.ingresosMensuales).toFixed(2)}`,
                                    "Name": "MonthlyIncome"
                                },
                                "NonOperatingIncome": {
                                    "Code": "304",
                                    "AccountAmount": `${pInformacionFinanciera.situacionEconomica.ingresosNoOperacionales === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionEconomica.ingresosNoOperacionales).toFixed(2)}`,
                                    "Name": "NonOperatingIncome"
                                },
                                "AnnualExpenses": {
                                    "Code": "301",
                                    "AccountAmount": `${pInformacionFinanciera.situacionEconomica.gastosAnuales === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionEconomica.gastosAnuales).toFixed(2)}`,
                                    "Name": "AnnualExpenses"
                                },
                                "MonthlyExpenses": {
                                    "Code": "303",
                                    "AccountAmount": `${pInformacionFinanciera.situacionEconomica.egresosMensuales === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionEconomica.egresosMensuales).toFixed(2)}`,
                                    "Name": "MonthlyExpenses"
                                },
                                "EquityInformationExt": {
                                    "Balance": {
                                        "Code": `${pInformacionFinanciera.situacionPatrimonial.tipoBalance === undefined ? "" : pInformacionFinanciera.situacionPatrimonial.tipoBalance}`//"BGJ"
                                    },
                                    "Certification": {
                                        "Code": `${pInformacionFinanciera.situacionPatrimonial.claseBalance === undefined ? "" : pInformacionFinanciera.situacionPatrimonial.claseBalance}`//"A"
                                    },
                                    "CutOffDate": `${pInformacionFinanciera.situacionPatrimonial.fechaCorte === undefined ? "" : pInformacionFinanciera.situacionPatrimonial.fechaCorte}`
                                },
                                "Assets": {
                                    "Code": "400",
                                    "AccountAmount": `${pInformacionFinanciera.situacionPatrimonial.activos === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionPatrimonial.activos).toFixed(2)}`,
                                    "AccountJustify": "Assets"
                                },
                                "Passives": {
                                    "Code": "401",
                                    "AccountAmount": `${pInformacionFinanciera.situacionPatrimonial.pasivos === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionPatrimonial.pasivos).toFixed(2)}`,
                                    "AccountJustify": "Passives"
                                },
                                "Patrimony": {
                                    "Code": "402",
                                    "AccountAmount": `${pInformacionFinanciera.situacionPatrimonial.patrimonio === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionPatrimonial.patrimonio).toFixed(2)}`,
                                    "AccountJustify": "Patrimony"
                                },
                                "SocialCapital": {
                                    "Code": "403",
                                    "AccountAmount": `${pInformacionFinanciera.situacionPatrimonial.capitalSocial === undefined ? '0.00' : parseFloat(pInformacionFinanciera.situacionPatrimonial.capitalSocial).toFixed(2)}`,
                                    "AccountJustify": "SocialCapital"
                                }
                            }
                        }
                    }
                }
            });

            let parsedPostData = JSON.parse(postData)
            console.log('request Cliente PJ:', JSON.stringify(parsedPostData, null, 2));

            req.write(postData);
            req.end();

        });


        await promise
            .finally(() => console.log(`Integratión Crear Cliente status: ${json_data.status}`))
            .then(result => {
                if (json_data.status !== 200) throw (JSON.stringify(json_data));
                response_json_data.data = JSON.parse(result.data);
            })
            .catch(error => {
                console.log(error)
                throw (error);
            });

        return JSON.stringify(response_json_data);

    } catch (error) {

        console.log(`❌ External API URL: ${externalUrl}`);
        console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);

        const contError = JSON.parse(error);
        const errorData = JSON.parse(contError.data);
        const status = contError.status;
        const statusInterno = errorData.status;
        const mensaje = errorData.message;

        if (status === 400) {
            response_json_data.data = {
                "status": status,
                "message": `status:${status}-, ${mensaje}`
            };
        } else {
            console.log('CrearModificarClientes:', status);
            response_json_data.data = {
                "status": status,
                "message": `Code: ${statusInterno} - ${mensaje}`
            };
        };

        return JSON.stringify(response_json_data);
    };
};

module.exports = {
    "fn_restCrearModificarClientePj": fn_restCrearModificarClientePj,
};