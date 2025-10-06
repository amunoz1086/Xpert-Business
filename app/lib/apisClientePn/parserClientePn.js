'use server'

export const parserClientePn = async (req) => {
    const resDataCliente = JSON.parse(req);
    let personaNatural = {};
    const datosBasicos = {};
    const adicionales = {};
    const informacionFinanciera = {};

    try {
        datosBasicos.reference = {
            "fechaVinculacion": resDataCliente.data.operationData.PersonReference?.EnrollmentDate,
            "codigoCliente": resDataCliente.data.operationData.PersonReference?.CustomerReference,
            "codStatusCliente": resDataCliente.data.operationData.PersonReference?.CustomerStatus?.Code,
            "statusCliente": resDataCliente.data.operationData.PersonReference?.CustomerStatus?.Name
        };
        //Información General
        datosBasicos.informacionGenerales = {
            "oficial": resDataCliente.data.operationData.PersonReference?.OfficerExt,
            "primerNombre": resDataCliente.data.operationData.PersonReference?.PersonName[0]?.value,
            "segundoNombre": resDataCliente.data.operationData.PersonReference?.PersonName[1]?.value,
            "primerApellido": resDataCliente.data.operationData.PersonReference?.PersonName[2]?.value,
            "segundoApellido": resDataCliente.data.operationData.PersonReference?.PersonName[3]?.value,
            "tipoIdentificacion": resDataCliente.data.operationData.PartyIdentification?.PartyIdentification?.PartyIdentificationType?.Code,
            "numeroIdentificacion": resDataCliente.data.operationData.PartyIdentification?.PartyIdentification?.PartyIdentificationType?.Code,
            "fechaExpedicionDocumento": resDataCliente.data.operationData.PersonReference?.IssueDate,
            "paisNacimiento": resDataCliente.data.operationData.PersonReference?.PersonLocation[0]?.LocationReference?.Code,
            "ciudadNacimiento": resDataCliente.data.operationData.PersonReference?.PersonLocation[1]?.LocationReference?.Code,
            "provinciaNacimiento": resDataCliente.data.operationData.PersonReference?.PersonLocation[4]?.LocationReference?.Code,
            "fechaNacimiento": resDataCliente.data.operationData.PersonReference?.BirthDate,
            "sexo": resDataCliente.data.operationData.PersonReference?.Sex?.Code,
            "genero": resDataCliente.data.operationData.PersonReference?.Gender?.Code,
            "estadoCivil": resDataCliente.data.operationData.PersonReference?.MaritalStatus?.Code,
            "oficina": resDataCliente.data.operationData.PersonReference?.BankBranch,
            "tieneTutor": resDataCliente.data.operationData.PersonReference?.TutorExt?.Code,
            "nombreTutor": resDataCliente.data.operationData.PersonReference?.TutorExt?.Name,
            "referidoPor": resDataCliente.data.operationData.PersonReference?.OfficerReferenceExt?.Code,
            "comoSeEntero": resDataCliente.data.operationData.PersonReference?.AdditionalDataExt?.KnowYourCustomerData?.HowDidYouFindOut
        };
        //Datos Demográficos
        datosBasicos.datosDemograficos = {
            "primeraNacionalidad": resDataCliente.data.operationData.PersonReference?.PersonLocation[3]?.LocationReference.Code,
            "segundaNacionalidad": resDataCliente.data.operationData.PersonReference?.PersonLocation[2]?.LocationReference.Code,
            "terceraNacionalidad": resDataCliente.data.operationData.PersonReference?.PersonLocation[5]?.LocationReference.Code,
            "profesionOficio": resDataCliente.data.operationData.PersonReference?.Profession?.Code,
            "nivelAcademico": resDataCliente.data.operationData.PersonReference?.PersonProfile?.EducationLevel?.Code,
            "ocupacion": resDataCliente.data.operationData.PersonReference?.PersonProfile?.Occupation?.Code,
            "dependientesEconomicos": resDataCliente.data.operationData?.PersonReference?.PersonProfile?.Dependants,
            "esPEP": resDataCliente.data.operationData.PersonReference?.PersonProfile?.PEPRelationship?.Code
        };
        //Direcciones
        datosBasicos.direcciones = [];
        const address = resDataCliente.data.operationData.PersonReference?.PartyContactPoint?.PostalAddress;
        if (address.length > 0) {
            for (let i of address) {
                let domicilio = {};
                if (i !== null) {
                    domicilio.tipoDireccion = i.AddressType?.Code;
                    domicilio.direccionPrincipal = i.Preference;
                    domicilio.pais = i.Country?.Code;
                    domicilio.departamento = i.Region?.Code;
                    domicilio.ciudad = i.TownName?.Code;
                    domicilio.viaPrincipal = i.LocationExt?.MainStreetType?.Code;
                    domicilio.numeroViaPrincipal = i.LocationExt?.MainStreetNumber;
                    domicilio.nombreViaPrincipal = i.StreetName;
                    domicilio.letraViaPrincipal = i.LocationExt?.MainStreetLetter?.Code;
                    domicilio.sectoViarPrincipal = i.LocationExt?.MainRegion?.Code;
                    domicilio.viaSecundaria = i.LocationExt?.SecondaryStreetType?.Code;
                    domicilio.numeroViaSecundaria = i.LocationExt?.SecondaryStreetNumber;
                    domicilio.nombreViaSecundaria = i.LocationExt?.SecondaryStreetName;
                    domicilio.letraViaSecundaria = i.LocationExt?.SecondaryStreetLetter?.Code;
                    domicilio.sectorViaSecundaria = i.LocationExt?.SecondaryRegion?.Code;
                    domicilio.numeroPredioViaSecundaria = i.LocationExt?.PropertyNumber;
                    domicilio.barrio = i.LocationExt?.PropertyGroup?.Code;
                    domicilio.nombreBarrio = i.LocationExt?.PropertyGroupName;
                    domicilio.unidad = i.UnitHomeType?.Code;
                    domicilio.numeroUnidad = i.LocationExt?.InternalNumber;
                    domicilio.letraUnidad = i.LocationExt?.UnitLetter;
                    domicilio.interiorDescripcion = i.LocationExt?.HomeType?.Code;
                    domicilio.numeroInterior = i.LocationExt?.HouseNumber;
                    domicilio.letraInterior = i.LocationExt?.InteriorLetter;
                    domicilio.referenciaUbicacion = i.AddressReference;
                    datosBasicos.direcciones.push(domicilio);
                };
            };
        };
        //Información de Contacto Telefónico
        datosBasicos.contactoTelefonico = [];
        const phoneAddress = resDataCliente.data.operationData.PersonReference?.PartyContactPoint?.PhoneAddress;
        if (phoneAddress.length > 0) {
            for (let i of phoneAddress) {
                let phone = {
                    "tipoTelefono": i?.TypeExt?.Code,
                    "prefijo": i?.PrefixExt?.Code,
                    "numero": i?.PhoneNumber,
                    "tipoContacto": i?.ContactTypeExt?.Code,
                    "operadora": i?.Additional?.ServiceLine?.Code,
                    "tipoContrato": i?.Additional?.ContractType?.Code,
                    "mensajeria": i?.MessagingType?.Code,
                    "marcarPrincipal": i?.Preference,
                };
                datosBasicos.contactoTelefonico.push(phone);
            };
        };
        //Información de Correo Electrónico
        datosBasicos.correosElectronicos = [];
        const electronicAddress = resDataCliente.data.operationData.PersonReference?.PartyContactPoint?.ElectronicAddress;
        if (electronicAddress.length > 0) {
            for (let i of electronicAddress) {
                let correo = {
                    "tipoCorreo": i?.Identification?.Code,
                    "correoElectronico": i?.EmailAddress,
                    "usuPreferente": i?.Preference
                };
                datosBasicos.correosElectronicos.push(correo);
            };
        };
        //Conozca su Cliente
        datosBasicos.conozcaSuCliente = {
            "tipoDiscapacidad": resDataCliente.data.operationData.PersonReference?.AdditionalDataExt?.KnowYourCustomerData?.DisabilityType?.Code,
            "origenIngresos": resDataCliente.data.operationData.PersonReference?.AdditionalDataExt?.KnowYourCustomerData?.IncomeSource?.Code,
            "montoIngresosMensual": resDataCliente.data.operationData.PersonReference?.AdditionalDataExt?.KnowYourCustomerData?.IncomeAmount,
            "actividadEconomica": resDataCliente.data.operationData.PersonReference?.AdditionalDataExt?.KnowYourCustomerData?.EconomicActivity?.Code
        };
        //Información Fiscal
        datosBasicos.informacionFiscal = {
            "declaraRentaColombia": '',
            "FATCA": resDataCliente.data.operationData.PersonReference?.PersonProfile?.FATCA,
            "CRS": resDataCliente.data.operationData.PersonReference?.PersonProfile?.CRS,
            "situacionImpositiva": '',
            "paisRecidenciaFiscal": '', //resDataCliente.data.operationData.PersonReference?.PersonProfile?.TaxResidence[0]?.Country?.Code,
            "tipoIdentificacionTributaria": '', //resDataCliente.data.operationData.PersonReference?.PersonProfile?.TaxResidence[0]?.PartyCustomerIdentification?.PartyIdentification?.PartyIdentificationType?.Code,
            "numeroIdentificacionTributaria": '', //resDataCliente.data.operationData.PersonReference?.PersonProfile?.TaxResidence[0]?.PartyCustomerIdentification?.PartyIdentification?.Identification,
            "esCiudadano": '', //resDataCliente.data.operationData.PersonReference?.PersonProfile?.TaxResidence[0]?.IsCitizen,
            "esResidente": '', //resDataCliente.data.operationData.PersonReference?.PersonProfile?.TaxResidence[0]?.IsResidence,
        };
        //Datos del Cónyuge
        datosBasicos.datosConyuge = {
            "tipoidentificacion": resDataCliente.data.operationData.PersonReference.PersonProfile?.SpouseReferenceExt?.IdentificationReference?.PartyIdentification?.PartyIdentificationType,
            "numeroIdentificacion": resDataCliente.data.operationData.PersonReference.PersonProfile?.SpouseReferenceExt?.IdentificationReference?.PartyIdentification?.Identification,
            "primerNombre": resDataCliente.data.operationData.PersonReference?.PersonName[0]?.value,
            "segundoNombre": resDataCliente.data.operationData.PersonReference?.PersonName[1]?.value,
            "primerApellido": resDataCliente.data.operationData.PersonReference?.PersonName[2]?.value,
            "segundoApellido": resDataCliente.data.operationData.PersonReference?.PersonName[3]?.value,
            "fechaNacimiento": resDataCliente.data.operationData.PersonReference.PersonProfile?.SpouseReferenceExt?.BirthDate,
            "paisNacimiento": '', //resDataCliente.data.operationData.PersonReference.PersonProfile?.SpouseReferenceExt?.PersonLocation[0]?.LocationReferenceType?.countryBirth?.code,
            "ciudadNacimiento": '', //resDataCliente.data.operationData.PersonReference.PersonProfile?.SpouseReferenceExt?.PersonLocation[0]?.LocationReferenceType?.cityBirth?.code,
            "provinciaNacimiento": '', //resDataCliente.data.resDataCliente.data.operationData.PersonReference.PersonProfile?.SpouseReferenceExt?.PersonLocation[0]?.LocationReferenceType?.provinceBirth?.code,
            "fechaExpedicionDocumento": '',
            "sexo": resDataCliente.data.operationData.PersonReference?.PersonProfile?.SpouseReferenceExt?.Sex?.Code
        };
        //Datos adicionales
        //Datos Generales Adicionales
        adicionales.datosGeneralesAdicionales = {
            "paisExpedicion": '',
            "departamentoExpedicion": '',
            "lugarExpedicion": '',
            "actividadEEconomicaEmpresaDondeTrabaja": '',
            "tipoEmpresaDondeTrabaja": '',
            "grupoEtnico": '',
            "LGTBIQ": '',
            "marcacionCorrespondencia": '',
            "fechaCorteEstadoCuenta": '',
            "recibirInformacionCelular": '',
            "recibirInformacionCorreo": '',
            "datosSensibles": '',
            "productosVinculacion": {
                "cuentaAhorros": '',
                "cuentaCorriente": '',
                "tarjetaCredito": '',
                "creditoPersonal": '',
                "creditoHipotecario": '',
                "seguroVida": '',
                "inversion": '',
                "pension": ''
            }
        };
        //Referencia Familiar
        adicionales.referenciaFamiliar = {
            "nombreCompleto": '',
            "primerApellido": '',
            "segundoApellido": '',
            "parentesco": '',
            "tipoIdentificacion": '',
            "numeroIdentificacion": '',
            "tipoContacto": '',
            "tipoTelefono": '',
            "prefijo": '',
            "telefono": '',
            "PEPReferencia": '',
            "funcion": '',
            "nombreInstitucion": '',
            "cargo": '',
            "fechaInicio": '',
            "fechaFin": ''
        };
        //Referencia Personal
        adicionales.referenciaPersonal = {
            "nombreCompleto": '',
            "primerApellido": '',
            "segundoApellido": '',
            "parentesco": '',
            "tipoIdentificacion": '',
            "numeroIdentificacion": '',
            "tipoContacto": '',
            "tipoTelefono": '',
            "prefijo": '',
            "telefono": '',
            "PEPReferencia": '',
            "funcion": '',
            "nombreInstitucion": '',
            "cargo": '',
            "fechaInicio": '',
            "fechaFin": ''
        };
        //Datos del Negocio
        adicionales.datosDelNegocio = {
            "nombreEstablecimiento": '',
            "tipoIdentificacionTributaria": '',
            "numeroIdentificacionTributaria": '',
            "queActividad": '',
            "direccionNegocioIgualDomicilioPersonal": '',
            "tiempoDesempenandoActividad": '',
            "tipoEstablecimiento": '',
            "horaInicio": '',
            "horaFin": '',
            "quienAtiendeNegocio": '',
            "numeroEmpleados": '',
            "inicioActividades": '',
            "tiempoExperienciaEmpresarial": '',
            "actividadNegocio": '',
            "cualesDiasAtencion": {
                "lunes": '',
                "martes": '',
                "miercoles": '',
                "jueves": '',
                "viernes": '',
                "sabado": '',
                "domingo": ''
            }
        };
        //Información Financiera
        //Situación Económica
        informacionFinanciera.situacionEconomica = {
            "tipoBalance": '',
            "claseBalance": '',
            "fechaCorte": '',
            "salarioFijo": '',
            "salarioVariableComisiones": '',
            "arrendamientoIngresos": '',
            "rendimientosFinancieros": '',
            "horarios": '',
            "otrosIngresos": '',
            "totalIngresos": '',
            "arriendoEgresos": '',
            "gastosPersonalesFamiliares": '',
            "cuotaCoomeva": '',
            "prestamosDiferentesBancoomeva": '',
            "deduccionesNomina": '',
            "targetasCredito": '',
            "otrosGastos": '',
            "totalEgresos": ''
        };
        //Situación Patrimonial
        informacionFinanciera.situacionPatrimonial = {
            "tipoBalance": '',
            "claseBalance": '',
            "fechaCorte": '',
            "totalActivos": '',
            "totalPasivos": '',
            "propiedadRaiz": '',
            "vehiculo": ''
        };

        personaNatural = {
            datosBasicos,
            adicionales,
            informacionFinanciera
        };
        
        return JSON.stringify(personaNatural);

    } catch (e) {
        console.error('Error_queryCliente:', e);
        datosBasicos.state = 400;
        datosBasicos.message = e.message;
        return JSON.stringify(datosBasicos);
    };
};