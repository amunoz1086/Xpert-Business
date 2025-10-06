'use server'

function safeGet(fn) {
    try {
        const val = fn();
        return val === undefined || val === null ? '' : val;
    } catch {
        return '';
    }
}

export const parsedParticipantePn = async (rawParticipantePn) => {
    const rawData = rawParticipantePn?.data?.operationData;

    try {
        const participante = {
            // Datos Cliente
            oficial: safeGet(() => rawData.PersonReference.OfficerExt),
            primerNombre: safeGet(() => rawData.PersonReference.PersonName[0].value),
            segundoNombre: safeGet(() => rawData.PersonReference.PersonName[1].value),
            primerApellido: safeGet(() => rawData.PersonReference.PersonName[2].value),
            segundoApellido: safeGet(() => rawData.PersonReference.PersonName[3].value),
            tipoIdentificacion: safeGet(() => rawData.PartyIdentification.PartyIdentification.PartyIdentificationType.Code),
            numeroIdentificacion: safeGet(() => rawData.PartyIdentification.PartyIdentification.Identification),
            fechaExpedicion: safeGet(() => rawData.PersonReference.IssueDate),
            paisNacimiento: safeGet(() => rawData.PersonReference.PersonLocation[0].LocationReference.Code),
            ciudadNacimiento: safeGet(() => rawData.PersonReference.PersonLocation[1].LocationReference.Code),
            fechaNacimiento: safeGet(() => rawData.PersonReference.BirthDate),
            sexo: safeGet(() => rawData.PersonReference.Sex.Code),
            oficina: safeGet(() => rawData.PersonReference.BankBranch.Code),
            provinciaNacimiento: safeGet(() => rawData.PersonReference.PersonLocation[4].LocationReference.Code),
            estadoCivil: safeGet(() => rawData.PersonReference.MaritalStatus.Code),

            // Residencia Fiscal
            fatca: safeGet(() => rawData.PersonReference.PersonProfile.FATCA === true ? 'on' : 'off'),
            crs: safeGet(() => rawData.PersonReference.PersonProfile.CRS === true ? 'on' : 'off'),
            paisResidenciaFiscal: safeGet(() => rawData.PersonReference.PersonProfile.TaxResidence[0].Country.Code),
            tipoIdentificacionTributaria: safeGet(() => rawData.PersonReference.PersonProfile.TaxResidence[0].PartyCustomerIdentification.PartyIdentification.PartyIdentificationType.Code),
            numeroidentificacionTributaria: safeGet(() => rawData.PersonReference.PersonProfile.TaxResidence[0].PartyCustomerIdentification.PartyIdentification.Identification),
            esCiudadano: safeGet(() => rawData.PersonReference.PersonProfile.TaxResidence[0].IsCitizen === true ? 'on' : 'off'),
            esRecidente: safeGet(() => rawData.PersonReference.PersonProfile.TaxResidence[0].IsResidence === true ? 'on' : 'off'),
            pep: safeGet(() => rawData.PersonReference.PersonProfile.PEPSituation.Code !== 'S' ? 'off' : 'on'),
            tipoPep: safeGet(() => rawData.PersonReference.PersonProfile.PEPType[0].Code),

            // Direcciones
            direccionPrincipal: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].Preference === true ? 'on' : 'off'),
            tipoDireccion: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].AddressType.Code),
            pais: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].Country.Code),
            departamento: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].Region.Code),
            ciudad: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].TownName.Code),
            viaPrincipal: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.MainStreetType.Code),
            numeroViaPrincipal: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.MainStreetNumber),
            nombreViaPrincipal: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].StreetName),
            letraViaPrincipal: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.MainStreetLetter.Code),
            sectorViaPrincipal: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.MainRegion.Code),
            viaSecundaria: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryStreetType.Code),
            numeroViaSecundaria: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryStreetNumber),
            nombreViaSecundaria: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryStreetName),
            letraViaSecundaria: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryStreetLetter.Code),
            sectorViaSecundaria: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryRegion.Code),
            numeroPredioViaSecundaria: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.PropertyNumber),
            tieneBarrio: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.PropertyGroup.Code === 'BRR' ? 'on' : 'off'),
            nombreBarrio: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.PropertyGroupName),
            unidad: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].UnitHomeType.Code),
            numeroUnidad: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.InternalNumber),
            letraUnidad: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.UnitLetter),
            interior: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.HomeType.Code),
            numeroInterior: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.HouseNumber),
            letraInterior: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.InteriorLetter),
            numeroPersonas: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.NumberOfPeopleLivingInResidence),
            tipoVivienda: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.PropertyType.Code),
            anosResidencia: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].LocationExt.TimeInCurrentResidence),
            referenciaUbiacion: safeGet(() => rawData.PersonReference.PartyContactPoint.PostalAddress[0].AddressReference),

            // Contactos
            numero: safeGet(() => rawData.PersonReference.PartyContactPoint.PhoneAddress[0].PhoneNumber),
            tipoTelefono: safeGet(() => rawData.PersonReference.PartyContactPoint.PhoneAddress[0].TypeExt.Code),
            tipoContacto: safeGet(() => rawData.PersonReference.PartyContactPoint.PhoneAddress[0].ContactTypeExt.Code),
            prefijo: safeGet(() => rawData.PersonReference.PartyContactPoint.PhoneAddress[0].PrefixExt.Code),
            operadora: safeGet(() => rawData.PersonReference.PartyContactPoint.PhoneAddress[0].Additional.ServiceLine.Code),
            tipoContrato: safeGet(() => rawData.PersonReference.PartyContactPoint.PhoneAddress[0].Additional.ContractType.Code),
            mensajeria: safeGet(() => rawData.PersonReference.PartyContactPoint.PhoneAddress[0].Additional.MessagingType.Code),
            telefonoPrincipal: safeGet(() => rawData.PersonReference.PartyContactPoint.PhoneAddress[0].Preference === true ? 'on' : 'off'),
            usuarioEmail: safeGet(() => rawData.PersonReference.PartyContactPoint.ElectronicAddress[0].EmailAddress),
            tipo: safeGet(() => rawData.PersonReference.PartyContactPoint.ElectronicAddress[0].Identification.Code),
            usoPreferente: safeGet(() => rawData.PersonReference.PartyContactPoint.ElectronicAddress[0].Preference === true ? 'on' : 'off'),

        };

        participante.status = 200;
        return participante;

    } catch (error) {
        console.error('Error parsing participante:', error);
        return { status: 500, error: 'Error interno al procesar el participante' };
    }
};


export const parsedParticipantePj = async (rawParticipantePj) => {
    const d = rawParticipantePj?.data?.operationData;

    try {
        const participante = {
            tipoIdentificacion: safeGet(() => d.PartyIdentification.PartyIdentification.PartyIdentificationType.Code),
            numeroIdentificacion: safeGet(() => d.PartyIdentification.PartyIdentification.Identification),
            razonSocial: safeGet(() => d.OrganisationReference.OrganizationProfile.OrganizationName.LegalName),
            paisConstitucion: safeGet(() => d.OrganisationReference.Country.Code),
            fechaConstitucion: safeGet(() => d.OrganisationReference.EstablishmentDate),
            tipoCompania: safeGet(() => d.OrganisationReference.ProfileType.Code),
            categoriaCompania: safeGet(() => d.OrganisationReference.MerchantCategory.Code),
            oficial: safeGet(() => d.OrganisationReference.Official.Code),
            oficina: safeGet(() => d.OrganisationReference.BranchExt.Code),

            direccionPrincipal: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].Preference === true ? 'on' : 'off'),
            tipoDireccion: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].AddressType.Code),
            pais: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].Country.Code),
            departamento: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].Region.Code),
            ciudad: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].TownName.Code),
            viaPrincipal: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.MainStreetType.Code),
            numeroViaPrincipal: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.MainStreetNumber),
            nombreViaPrincipal: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].StreetName),
            letraViaPrincipal: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.MainStreetLetter.Code),
            sectorViaPrincipal: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.MainRegion.Code),
            viaSecundaria: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryStreetType.Code),
            numeroViaSecundaria: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryStreetNumber),
            nombreViaSecundaria: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryStreetName),
            letraViaSecundaria: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryStreetLetter.Code),
            sectorViaSecundaria: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.SecondaryRegion.Code),
            numeroPredioViaSecundaria: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.PropertyNumber),
            tieneBarrio: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.PropertyGroup.Code === 'BRR' ? 'on' : 'off'),
            nombreBarrio: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.PropertyGroupName),
            unidad: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].UnitHomeType.Code),
            numeroUnidad: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.InternalNumber),
            letraUnidad: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.UnitLetter),
            interior: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.HomeType.Code),
            numeroInterior: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.HouseNumber),
            letraInterior: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.InteriorLetter),
            numeroPersonas: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.NumberOfPeopleLivingInResidence),
            tipoVivienda: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.PropertyType.Code),
            anosResidencia: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].LocationExt.TimeInCurrentResidence),
            referenciaUbiacion: safeGet(() => d.OrganisationReference.PartyContactPoint.PostalAddress[0].AddressReference),

            numero: safeGet(() => d.OrganisationReference.PartyContactPoint.PhoneAddress[1].PhoneNumber),
            tipoTelefono: safeGet(() => d.OrganisationReference.PartyContactPoint.PhoneAddress[1].TypeExt.Code),
            tipoContacto: safeGet(() => d.OrganisationReference.PartyContactPoint.PhoneAddress[1].ContactTypeExt.Code),
            prefijo: safeGet(() => d.OrganisationReference.PartyContactPoint.PhoneAddress[1].PrefixExt.Code),
            operadora: safeGet(() => d.OrganisationReference.PartyContactPoint.PhoneAddress[1].Additional.ServiceLine.Code),
            tipoContrato: safeGet(() => d.OrganisationReference.PartyContactPoint.PhoneAddress[1].Additional.ContractType.Code),
            mensajeria: safeGet(() => d.OrganisationReference.PartyContactPoint.PhoneAddress[1].Additional.MessagingType.Code),
            telefonoPrincipal: safeGet(() => d.OrganisationReference.PartyContactPoint.PhoneAddress[1].Preference === true ? 'on' : 'off'),
            usuarioEmail: safeGet(() => d.OrganisationReference.PartyContactPoint.ElectronicAddress[0].EmailAddress),
            tipo: safeGet(() => d.OrganisationReference.PartyContactPoint.ElectronicAddress[0].Identification.Code),
            usoPreferente: safeGet(() => d.OrganisationReference.PartyContactPoint.ElectronicAddress[0].Preference === true ? 'on' : 'off'),
        };

        participante.status = 200;
        return participante;

    } catch (error) {
        console.error('Error parsing participante:', error);
        return { status: 500, error: 'Error interno al procesar el participante' };
    }
};