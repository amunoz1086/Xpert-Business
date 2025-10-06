'use server'

//import { fn_restConsultarParticipantes } from '@/app/lib/services/cobis/fn_restConsultas.js';
//import { parseRepresentante } from './parseRepresentante';

export const parserClientePj = async (req) => {
    const resDataCliente = JSON.parse(req);

    let personaJuridica = {};
    const datosBasicos = {};
    const informacionFinanciera = {};


    try {
        datosBasicos.reference = {
            "referenciaCliente": resDataCliente.data.operationData?.OrganisationReference?.CustomerReference,
            "codStatusCliente": resDataCliente.data.operationData?.OrganisationReference?.CustomerStatus.Code,
            "statusCliente": resDataCliente.data.operationData?.OrganisationReference?.CustomerStatus.Name
        };
        //Datos Generales
        datosBasicos.datosGenerales = {
            "razonSocial": resDataCliente.data.operationData?.OrganisationReference?.OrganizationProfile?.OrganizationName?.LegalName,
            "codPaisConstitucion": resDataCliente.data.operationData?.OrganisationReference?.Country?.Code,
            "tipoIdentificacion": resDataCliente.data.operationData?.PartyIdentification?.PartyIdentification?.PartyIdentificationType?.Code,
            "numeroIdentificacion": resDataCliente.data.operationData?.PartyIdentification.PartyIdentification.Identification, //NIT
            "tipoSociedad": resDataCliente.data.operationData?.OrganisationReference?.ProfileType?.Code, //Tipo de Compañia
            "categoriaCompania": resDataCliente.data.operationData?.OrganisationReference?.MerchantCategory?.Code, //Naturaleza Juridica
            "oficina": resDataCliente.data.operationData?.OrganisationReference?.BranchExt?.Code,
            "oficial": resDataCliente.data.operationData?.OrganisationReference?.Official?.Code
        };
        //Datos Económicos
        datosBasicos.datosEconomicos = {
            "representanLegal": resDataCliente.data.operationData?.OrganisationReference?.OrganizationProfile?.RepresentativeOfficer,
            "actividadEconomica": resDataCliente.data.operationData?.OrganisationReference?.OrganizationProfile?.Sector?.Code,
            "fuentePrincipalIngresos": resDataCliente.data.operationData?.OrganisationReference?.OrganizationProfile?.IncomeSource?.Code,
            "ingresosAnuales": resDataCliente.data.operationData?.OrganisationReference?.OrganizationProfile?.AnnualIncome,
            "grupoEconomico": resDataCliente.data.operationData?.OrganisationReference?.OrganizationProfile?.EconomicGroup?.Code
        };
        //Conozca Su Cliente
        datosBasicos.conozcaSuCliente = {
            "paisOperacion": resDataCliente.data.operationData?.OrganisationReference?.Jurisdiction?.Code,
            "coberturaGeografica": resDataCliente.data.operationData?.OrganisationReference?.GeographicCoverage?.Code,
            "numeroSucursales": resDataCliente.data.operationData?.OrganisationReference?.NumberBranchesExt,
            "numeroEmpleados": resDataCliente.data.operationData?.OrganisationReference?.NumberEmployees
        };
        //Información Legal
        datosBasicos.informacionLegal = {
            "nombreComercial": resDataCliente.data.operationData?.OrganisationReference?.OrganizationProfile?.OrganizationName?.TradingName,
            "fechaConstitucion": resDataCliente.data.operationData?.OrganisationReference?.EstablishmentDate,
            "fechaInscripcion": resDataCliente.data.operationData?.OrganisationReference?.RegistrationDate
        };
        //Teléfonos del Negocio
        datosBasicos.telefonosNegocio = '';
        let isPhoneNegocio = [];
        const phoneAddressNegocio = resDataCliente.data.operationData?.OrganisationReference?.PartyContactPoint?.PhoneAddress;
        if (phoneAddressNegocio.length > 0) {
            for (let i of phoneAddressNegocio) {
                let phoneNegocio = {
                    "tipoTelefono": parserData(i?.TypeExt?.Code),
                    "tipoContacto": parserData(i?.ContactTypeExt?.Code),
                    "prefijo": parserData(i?.PrefixExt?.Code),
                    "numero": parserData(i?.PhoneNumber),
                    "mensajeria": parserData(i?.MessagingType?.Code),
                    "principal": parserData(i?.Preference === true ? 'on' : 'off'),
                    "operadora": '',
                    "tipoContrato": ''
                };

                isPhoneNegocio.push(phoneNegocio);
                datosBasicos.telefonosNegocio = isPhoneNegocio.filter(isTipoContacto => isTipoContacto.tipoContacto.includes('N'));
            };

        };
        //Teléfonos de Oficina
        datosBasicos.telefonosOficina = '';
        let isPhoneOficina = [];
        const phoneAddressOficina = resDataCliente.data.operationData?.OrganisationReference?.PartyContactPoint?.PhoneAddress;
        if (phoneAddressOficina.length > 0) {
            for (let i of phoneAddressOficina) {
                let phoneOficina = {
                    "tipoTelefono": parserData(i?.TypeExt?.Code),
                    "tipoContacto": parserData(i?.ContactTypeExt?.Code),
                    "prefijo": parserData(i?.PrefixExt?.Code),
                    "numero": parserData(i?.PhoneNumber),
                    "mensajeria": parserData(i?.MessagingType?.Code),
                    "principal": parserData(i?.Preference === true ? 'on' : 'off'),
                    "operadora": '',
                    "tipoContrato": ''
                };

                isPhoneOficina.push(phoneOficina);
                datosBasicos.telefonosOficina = isPhoneOficina.filter(isTipoContacto => isTipoContacto.tipoContacto.includes('O'));
            };
        };
        //Teléfonos de Personal Autorizado
        datosBasicos.telefonosPersonalAutorizado = '';
        let isPhonePersonal = [];
        const phoneAddressPersonal = resDataCliente.data.operationData?.OrganisationReference?.PartyContactPoint?.PhoneAddress;
        if (phoneAddressPersonal.length > 0) {
            for (let i of phoneAddressPersonal) {
                let phonePersonal = {
                    "tipoTelefono": parserData(i?.TypeExt?.Code),
                    "tipoContacto": parserData(i?.ContactTypeExt?.Code),
                    "prefijo": parserData(i?.PrefixExt?.Code),
                    "numero": parserData(i?.PhoneNumber),
                    "mensajeria": parserData(i?.MessagingType?.Code),
                    "principal": parserData(i?.Preference === true ? 'on' : 'off'),
                    "operadora": '',
                    "tipoContrato": ''
                };

                isPhonePersonal.push(phonePersonal);
                datosBasicos.telefonosPersonalAutorizado = isPhonePersonal.filter(isTipoContacto => isTipoContacto.tipoContacto.includes('P'));
            };
        };
        //Correos Electrónicos
        datosBasicos.correosElectronicos = [];
        const electronicAddress = resDataCliente.data.operationData?.OrganisationReference?.PartyContactPoint?.ElectronicAddress;
        if (electronicAddress.length > 0) {
            for (let i of electronicAddress) {
                let correo = {
                    "tipoCorreo": parserData(i?.Identification.Code),
                    "correoElectronico": parserData(i?.EmailAddress),
                    "usuPreferente": parserData(i?.Preference === true ? 'on' : 'off')
                };
                datosBasicos.correosElectronicos.push(correo);
            };
        };
        //Sitios Web
        datosBasicos.sitiosWeb = [];
        const webAddress = resDataCliente.data.operationData?.OrganisationReference?.PartyContactPoint?.WebAddress;
        if (webAddress.length > 0) {
            for (let i of webAddress) {
                let web = {
                    "tipoSitioWeb": parserData(i?.Identification?.Code),
                    "url": parserData(i?.URLAddress),
                    "usuPreferente": parserData(i?.Preference === true ? 'on' : 'off')
                };
                datosBasicos.sitiosWeb.push(web);
            };
        };
        //Dirección de Negocio
        datosBasicos.direccionNegocio = '';
        let isNegocio = [];
        const addressNegocio = resDataCliente.data.operationData?.OrganisationReference?.PartyContactPoint?.PostalAddress;
        if (addressNegocio.length > 0) {
            for (let i of addressNegocio) {
                let negocio = {
                    "direccionPrincipalNegocio": parserData(i?.Preference === true ? 'on' : 'off'),
                    "tipoDireccion": parserData(i?.AddressType?.Code),
                    "pais": parserData(i?.Country?.Code),
                    "departamento": parserData(i?.Region?.Code),
                    "ciudad": parserData(i?.TownName?.Code),
                    "tipoViaPrincipal": parserData(i?.LocationExt?.MainStreetType?.Code),
                    "numeroViaPrincipal": parserData(i?.LocationExt?.MainStreetNumber),
                    "nombreViaPrincipal": parserData(i?.StreetName),
                    "letraViaPrincipal": parserData(i?.LocationExt?.MainStreetLetter?.Code),
                    "sectoViarPrincipal": parserData(i?.LocationExt?.MainRegion?.Code),
                    "tipoViaSecundaria": parserData(i?.LocationExt?.SecondaryStreetType?.Code),
                    "numeroViaSecundaria": parserData(i?.LocationExt?.SecondaryStreetNumber),
                    "nombreViaSecundaria": parserData(i?.LocationExt?.SecondaryStreetName),
                    "letraPrincipalViaSecundaria": parserData(i?.LocationExt?.SecondaryStreetLetter?.Code),
                    "sectorViaSecundaria": parserData(i?.LocationExt?.SecondaryRegion?.Code),
                    "numeroPredioViaSecundaria": parserData(i?.LocationExt?.PropertyNumber),
                    "barrio": parserData(i?.LocationExt?.PropertyGroup?.Code === 'BRR' ? 'on' : 'off'),
                    "nombreBarrio": parserData(i?.LocationExt?.PropertyGroupName),
                    "unidad": parserData(i?.UnitHomeType?.Code),
                    "numeroUnidad": parserData(i?.LocationExt?.InternalNumber),
                    "letraUnidad": parserData(i?.LocationExt?.UnitLetter),
                    "interiorDescripcion": parserData(i?.LocationExt?.HomeType?.Code),
                    "numeroInterior": parserData(i?.LocationExt?.HouseNumber),
                    "letraInterior": parserData(i?.LocationExt?.InteriorLetter),
                    "referenciaUbicacion": parserData(i?.AddressReference),
                };

                isNegocio.push(negocio);
                datosBasicos.direccionNegocio = isNegocio.filter(isTipoDireccion => isTipoDireccion.tipoDireccion.includes('AE'));
            };
        };
        //Dirección de Sucursal
        datosBasicos.direccionSucursal = '';
        let isSucursal = [];
        const addressSucursal = resDataCliente.data.operationData?.OrganisationReference?.PartyContactPoint?.PostalAddress;
        if (addressSucursal.length > 0) {
            for (let i of addressSucursal) {
                let sucursal = {
                    "direccionPrincipalSucursal": parserData(i?.Preference),
                    "tipoDireccion": parserData(i?.AddressType?.Code),
                    "pais": parserData(i?.Country?.Code),
                    "departamento": parserData(i?.Region?.Code),
                    "ciudad": parserData(i?.TownName?.Code),
                    "tipoViaPrincipal": parserData(i?.LocationExt?.MainStreetType?.Code),
                    "numeroViaPrincipal": parserData(i?.LocationExt?.MainStreetNumber),
                    "nombreViaPrincipal": parserData(i?.StreetName),
                    "letraViaPrincipal": parserData(i?.LocationExt?.MainStreetLetter?.Code),
                    "sectoViarPrincipal": parserData(i?.LocationExt?.MainRegion?.Code),
                    "tipoViaSecundaria": parserData(i?.LocationExt?.SecondaryStreetType?.Code),
                    "numeroViaSecundaria": parserData(i?.LocationExt?.SecondaryStreetNumber),
                    "nombreViaSecundaria": parserData(i?.LocationExt?.SecondaryStreetName),
                    "letraPrincipalViaSecundaria": parserData(i?.LocationExt?.SecondaryStreetLetter?.Code),
                    "sectorViaSecundaria": parserData(i?.LocationExt?.SecondaryRegion?.Code),
                    "numeroPredioViaSecundaria": parserData(i?.LocationExt?.PropertyNumber),
                    "barrio": parserData(i?.LocationExt?.PropertyGroup?.Code === 'BRR' ? 'on' : 'off'),
                    "nombreBarrio": parserData(i?.LocationExt?.PropertyGroupName),
                    "unidad": parserData(i?.UnitHomeType?.Code),
                    "numeroUnidad": parserData(i?.LocationExt?.InternalNumber),
                    "letraUnidad": parserData(i?.LocationExt?.UnitLetter),
                    "interiorDescripcion": parserData(i?.LocationExt?.HomeType?.Code),
                    "numeroInterior": parserData(i?.LocationExt?.HouseNumber),
                    "letraInterior": parserData(i?.LocationExt?.InteriorLetter),
                    "referenciaUbicacion": parserData(i?.AddressReference),
                };

                isSucursal.push(sucursal);
                datosBasicos.direccionSucursal = isSucursal.filter(isTipoDireccion => isTipoDireccion.tipoDireccion.includes('SU'));
            };
        };
        //Residencia Fiscal
        datosBasicos.residenciaFiscal = {
            "personaEstadosUnidos": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.EntityOfUSA?.Code,
            "personaEspecificaEstadosUnidos": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.SpecificEntityOfUSA?.Code,
            "TIN": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.IdentificationOfUSA,
            "noTIN": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.CommentIdentification,
            "noAplica": '',
            "clasificacionFATCA": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.TypeEntityFATCA?.Code,
            "GIIN": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.EntityHasGIINID?.Code,
            "numeroGIIN": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.GlobalIntermediaryIdentification,
            "CRSPJ": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.EntityHasTaxResidence?.Code,
            "paisRecidenciaFiscal": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.Country?.Code,
            "ultimaFechaActualizacion": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.LastUpdateDate,
            "tipoIdentificacionTributaria": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.TaxIdentificationType?.Code,
            "numeroIdentificacionTributaria": resDataCliente.data.operationData?.OrganisationReference?.LegalResidence?.TaxIdentificationNumber,
        };
        //Referencia Personal
        datosBasicos.referenciaPersonal = {
            "relacion": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.Relationship?.Code),
            "nombreCompleto": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.Name),
            "primerApellido": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.FirstLastName),
            "segundoApellido": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.SecondLastName),
            "tipoIdentificacionPersonal": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.PartyIdentification?.PartyIdentification?.PartyIdentificationType?.Code),
            "numeroIdentificacion": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.PartyIdentification?.PartyIdentification?.Identification),
            "tipoContacto": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.contactType?.Code),
            "tipoTelefono": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.PhoneType?.Code),
            "prefijo": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.Prefix?.Code),
            "telefono": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.PhoneNumber),
            "referenciaPep": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.PEPReference?.Code),
            "funcionPep": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.PEPDetails[0]?.Code),
            "nombreInstitucion": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.Institution?.Code),
            "cargoPep": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.Position?.Code),
            "fechaInicio": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.StartDate),
            "fechaFin": parserData(resDataCliente.data.operationData?.OrganisationReference.OrganizationProfile?.PersonalReferenceExt[0]?.TerminationDate)
        };
        //Campos Adicionales
        datosBasicos.camposAdicionales = {
            "fechaIngresoAsociadoPj": parserData(resDataCliente.data.operationData?.OrganisationReference?.AdditionalDataExt?.DateOfEntry?.Name),
            "tipoClientesPj": parserData(resDataCliente.data.operationData?.OrganisationReference?.AdditionalDataExt?.CustomerType?.Name),
            "sectorEconomico": parserData(resDataCliente.data.operationData?.OrganisationReference?.AdditionalDataExt?.EconomicSector?.Name),
            "ciudadConstitucion": parserData(resDataCliente.data.operationData?.OrganisationReference?.AdditionalDataExt?.CityOfEstablishment?.Name),
            "marcaCorrespondenciaUnica": parserData(resDataCliente.data.operationData?.OrganisationReference?.AdditionalDataExt?.UniqueCorrespondenceMarking?.Name === 'AE' ? 'on' : 'off'),
            "fechaCorte": parserData(resDataCliente.data.operationData?.OrganisationReference?.AdditionalDataExt?.CutOffDate?.Name),
        };
        //Información Financiera
        //Situación Económica
        informacionFinanciera.situacionEconomica = {
            "tipoBalance": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.EconomicSituation[0]?.Balance?.Code,
            "claseBalance": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.EconomicSituation[0]?.Certification?.Code,
            "fechaCorte": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.EconomicSituation[0]?.CutOffDate,
            "ventasAnuales": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.EconomicSituation[0]?.AnnualSales?.Value,
            "ingresosMensuales": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.EconomicSituation[0]?.MonthlyIncome?.Value,
            "PGJ": '',
            "ingresosNoOperacionales": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.EconomicSituation[0]?.NonOperatingIncome?.Value,
            "gastosAnuales": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.EconomicSituation[0]?.AnnualExpenses?.Value,
            "egresosMensuales": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.EconomicSituation[0]?.MonthlyExpenses?.Value
        };
        //Situación Patrimonial
        informacionFinanciera.situacionPatrimonial = {
            "tipoBalance": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.FinancialSituation[0]?.Balance?.Code,
            "claseBalance": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.FinancialSituation[0]?.Certification?.Code,
            "fechaCorte": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.FinancialSituation[0]?.CutOffDate,
            "activos": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.FinancialSituation[0]?.Assets?.Value,
            "BGJ": '',
            "pasivos": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.FinancialSituation[0]?.Passives?.Value,
            "patrimonio": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.FinancialSituation[0]?.Patrimony?.Value,
            "capitalSocial": resDataCliente.data.operationData?.OrganisationReference?.FinancialInformationExt?.FinancialSituation[0]?.SocialCapital?.Value
        };
        //Balance General
        informacionFinanciera.balanceGeneral = {
            "fechaCorte": '',
            "activosCorrientes": '',
            "activosFijos": '',
            "otrosActivos": '',
            "totalActivos": '',
            "pasivosCorrientes": '',
            "pasivosLargoPlazo": '',
            "otrosPasivos": '',
            "totalPasivos": '',
            "patrimonioNeto": ''
        };
        //Estado de Resultados
        informacionFinanciera.estadoResultados = {
            "ingresosOperacionales": '',
            "costoVentas": '',
            "utilidadBruta": '',
            "gastosAdministrativos": '',
            "gastosVentas": '',
            "utilidadOperacional": '',
            "ingresosNoOperacionales": '',
            "gastosNoOperacionales": '',
            "utilidadAntesImpuestos": '',
            "Impuestos": '',
            "utilidadNeta": ''
        };
        //Información Tributaria y Obligaciones
        informacionFinanciera.informaciónTributaria = {
            "declaracionRenta": '',
            "declaracionIVA": '',
            "retencionFuente": '',
            "informacionExogena": ''
        };
        //Obligaciones Financieras
        informacionFinanciera.obligacionesFinancieras = {
            "entidadFinanciera": '',
            "tipoCredito": '',
            "Valor Inicial": '',
            "saldoActual": '',
            "fechaInicio": '',
            "fechaVencimiento": ''
        };
        //Participantes
        //Representante Legal
        datosBasicos.representanteLegal = '';
        let isRepresentante = [];
        const participantes = resDataCliente.data.operationData?.OrganisationReference?.AdditionalDataExt?.Participants;
        if (participantes.length > 0) {
            for (let i of participantes) {
                let representante = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                };

                isRepresentante.push(representante);
                datosBasicos.representanteLegal = isRepresentante.filter(isRelationShip => isRelationShip.RelationShip === '2');
            };
        };
        //Contactos Autorizados
        datosBasicos.contactoAutorizado = '';
        let isContacto = [];
        if (participantes.length > 0) {
            for (let i of participantes) {
                let contacto = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                };

                isContacto.push(contacto);
                datosBasicos.contactoAutorizado = isContacto.filter(isRelationShip => isRelationShip.RelationShip === '7');
            };
        };
        //Administrador Fiduciario
        datosBasicos.administradorFiduciario = '';
        let isFiduciario = [];
        if (participantes.length > 0) {
            for (let i of participantes) {
                let fiduciario = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                };

                isFiduciario.push(fiduciario);
                datosBasicos.administradorFiduciario = isFiduciario.filter(isRelationShip => isRelationShip.RelationShip === '30');
            };
        };
        //Titular Consorcio
        datosBasicos.titularConsorcio = '';
        let isTitular = [];
        if (participantes.length > 0) {
            for (let i of participantes) {
                let titular = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                };

                isTitular.push(titular);
                datosBasicos.titularConsorcio = isTitular.filter(isRelationShip => isRelationShip.RelationShip === '19');
            };
        };
        //Administrador Consorcio
        datosBasicos.administradorConsorcio = '';
        let isAdmin = [];
        if (participantes.length > 0) {
            for (let i of participantes) {
                let admin = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                };

                isAdmin.push(admin);
                datosBasicos.administradorConsorcio = isAdmin.filter(isRelationShip => isRelationShip.RelationShip === '20');
            };
        };
        //Junta Directiva
        datosBasicos.juntaDirectiva = '';
        let isJunta = [];
        if (participantes.length > 0) {
            for (let i of participantes) {
                let junta = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                };

                isJunta.push(junta);
                datosBasicos.juntaDirectiva = isJunta.filter(isRelationShip => isRelationShip.RelationShip === '5');
            };
        };
        //Accionistas
        datosBasicos.accionista = '';
        let isAccionista = [];
        if (participantes.length > 0) {
            for (let i of participantes) {
                let accionista = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                    "RelationshipAttribute": parserData(i?.RelationshipAttribute),
                };

                isAccionista.push(accionista);
                datosBasicos.accionista = isAccionista.filter(isRelationShip => isRelationShip.RelationShip === '3');
            };
        };
        //Controlante
        datosBasicos.controlante = '';
        let isControlante = [];
        if (participantes.length > 0) {
            for (let i of participantes) {
                let controlante = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                };

                isControlante.push(controlante);
                datosBasicos.controlante = isControlante.filter(isRelationShip => isRelationShip.RelationShip === '4');
            };
        };
        //Beneficiario
        datosBasicos.beneficiario = '';
        let isBeneficiario = [];
        if (participantes.length > 0) {
            for (let i of participantes) {
                let beneficiario = {
                    "RelationShip": parserData(i?.RelationShip?.Code),
                    "CustomerReference": parserData(i?.CustomerReference?.Code),
                };

                isBeneficiario.push(beneficiario);
                datosBasicos.beneficiario = isBeneficiario.filter(isRelationShip => isRelationShip.RelationShip === '1');
            };
        };


        personaJuridica = {
            datosBasicos,
            informacionFinanciera
        };

        return JSON.stringify(personaJuridica);

    } catch (e) {
        console.error('Error_parserClientePj:', e);
        datosBasicos.state = 400;
        datosBasicos.message = e.message;
        return JSON.stringify(datosBasicos);
    };
};


function parserData(data) {
    let resParserData;

    switch (data) {
        case undefined:
            resParserData = '';
            break;
        case null:
            resParserData = '';
            break;
        default:
            resParserData = data;
            break;
    };

    return resParserData;
};