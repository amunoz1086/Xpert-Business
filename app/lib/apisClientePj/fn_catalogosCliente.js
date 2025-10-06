'use server';

import { queryListarTipoId } from '@/app/lib/admin/querys/listas';
import {
    queryListPaises, queryListTipoSociedad, queryListCatCompañia, queryListOficinas, queryListOficiales, queryListActividadEconomica,
    queryFuentePrincipalIngreso, queryCoberturageografica, queryTipoTelefono, queryListPrefijoPais, queryTipoContacto, queryTipoOperador,
    queryTipoContrato, queryTipoMensajeria, queryTipoDireccionVirtual, queryTipoDireccion, queryListDepartamentos, queryListCiudades,
    queryTipoVia, queryTipoLetraVia, queryTipoSectorVia, queryTipoEdificio, querySeccionFatca, queryTipoIdFiscal, queryTipoParentesco,
    queryFuncionPep, queryDependenciaPep, queryCargosPep, queryTipoCliente, querylistarSector, queryListFechCorte
} from '@/app/lib/menuPrincipal/actions';


export const fn_catalogosCliente = async () => {

    try {
        //ASIGNACION DE CATALOGOS
        const [
            rawPais,
            rawTipoDocumento,
            rawTipoSociedad,
            rawCategoriaCompañia,
            rawOficina,
            rawOficial,
            rawActividadEconimica,
            rawFuentePrincipalIngreso,
            rawCoberturageografica,
            rawTipoTelefono,
            rawPrefijos,
            rawTipoContacto,
            rawTipoOperador,
            rawTipoContrato,
            rawTipoMensajeria,
            rawTipoDireccionVirtual,
            rawTipoDireccion,
            rawDepartemento,
            rawCiudades,
            rawTipoVia,
            rawTipoLetraVia,
            rawTipoSectorVia,
            rawTipoEdificio,
            rawSeccionFatca,
            rawTipoIdFiscal,
            rawTipoParentesco,
            rawFuncionPep,
            rawDependenciaPep,
            rawCargosPep,
            rawTipoCliente,
            rawSector,
            rawFechaCorte,
        ] = await Promise.allSettled([
            queryListPaises(),
            queryListarTipoId(),
            queryListTipoSociedad(),
            queryListCatCompañia(),
            queryListOficinas(),
            queryListOficiales(),
            queryListActividadEconomica(),
            queryFuentePrincipalIngreso(),
            queryCoberturageografica(),
            queryTipoTelefono(),
            queryListPrefijoPais(),
            queryTipoContacto(),
            queryTipoOperador(),
            queryTipoContrato(),
            queryTipoMensajeria(),
            queryTipoDireccionVirtual(),
            queryTipoDireccion(),
            queryListDepartamentos(),
            queryListCiudades(),
            queryTipoVia(),
            queryTipoLetraVia(),
            queryTipoSectorVia(),
            queryTipoEdificio(),
            querySeccionFatca(),
            queryTipoIdFiscal(),
            queryTipoParentesco(),
            queryFuncionPep(),
            queryDependenciaPep(),
            queryCargosPep(),
            queryTipoCliente(),
            querylistarSector(),
            queryListFechCorte(),
        ]);


        const validCatalogo = (catalogo) => {
            if (catalogo.status === "fulfilled") {
                const catParse = JSON.parse(catalogo.value).DATA;
                return catParse.sort((a, b) => a.value.localeCompare(b.value));
            };
            console.error("Error cargando catalogo:", result.reason);
            return { DATA: [] };
        };


        const listas = {
            listPaises: validCatalogo(rawPais),
            listTipoDocumento: validCatalogo(rawTipoDocumento),
            listTipoSociedad: validCatalogo(rawTipoSociedad),
            listCategoriaCompania: validCatalogo(rawCategoriaCompañia),
            listOficina: validCatalogo(rawOficina),
            listOficial: validCatalogo(rawOficial),
            listActividadEconimica: validCatalogo(rawActividadEconimica),
            listFuentePrincipalIngreso: validCatalogo(rawFuentePrincipalIngreso),
            listCoberturageografica: validCatalogo(rawCoberturageografica),
            listTipoTelefono: validCatalogo(rawTipoTelefono),
            listPrefijos: validCatalogo(rawPrefijos),
            listTipoContacto: validCatalogo(rawTipoContacto),
            listTipoOperador: validCatalogo(rawTipoOperador),
            listTipoContrato: validCatalogo(rawTipoContrato),
            listTipoMensajeria: validCatalogo(rawTipoMensajeria),
            listTipoDireccionVirtual: validCatalogo(rawTipoDireccionVirtual),
            listTipoDireccion: validCatalogo(rawTipoDireccion),
            listDepartamento: validCatalogo(rawDepartemento),
            listCiudades: validCatalogo(rawCiudades),
            listTipoVia: validCatalogo(rawTipoVia),
            listTipoLetraVia: validCatalogo(rawTipoLetraVia),
            listTipoSectorVia: validCatalogo(rawTipoSectorVia),
            listTipoEdificio: validCatalogo(rawTipoEdificio),
            listSeccionFatca: validCatalogo(rawSeccionFatca),
            listTipoIdFiscal: validCatalogo(rawTipoIdFiscal),
            listTipoParentesco: validCatalogo(rawTipoParentesco),
            listFuncionPep: validCatalogo(rawFuncionPep),
            listDependenciaPep: validCatalogo(rawDependenciaPep),
            listCargosPep: validCatalogo(rawCargosPep),
            listTipoCliente: validCatalogo(rawTipoCliente),
            listaSector: validCatalogo(rawSector),
            listFechaCorte: validCatalogo(rawFechaCorte),
        };

        return JSON.stringify(listas);

    } catch (error) {
        console.log(error)
    }

};