'use server';

import { fetchLists } from "@/app/lib/utils";
import { queryListarTipoId } from '@/app/lib/admin/querys/listas';
import {
    queryListCatCompañia, queryListCiudades, queryListDepartamentos, queryListEstadoCivil, queryListOficiales, queryListOficinas, queryListPaises,
    queryListPrefijoPais, queryListSexo, queryListTipoSociedad, queryReferenciaTiempo, queryTipoAccionista, queryTipoContacto, queryTipoContrato,
    queryTipoDireccion, queryTipoDireccionVirtual, queryTipoEdificio, queryTipoIdFiscal, queryTipoLetraVia, queryTipoMensajeria, queryTipoOperador,
    queryTipoPep, queryTipoPropiedad, queryTipoSectorVia, queryTipoTelefono, queryTipoVia, queryTipoViviendaInterior
} from '@/app/lib/menuPrincipal/actions';


export const fn_catalogosFetchLists = async () => {

    // fetch all the lists you need in parallel
    const listas = await fetchLists({
        listTipoDocumento: queryListarTipoId,
        listPaises: queryListPaises,
        listDepartemento: queryListDepartamentos,
        listCiduades: queryListCiudades,
        listCategoriaCompania: queryListCatCompañia,
        listTipoSociedad: queryListTipoSociedad,
        listOficina: queryListOficinas,
        listPrefijos: queryListPrefijoPais,
        listTipoTelefono: queryTipoTelefono,
        listTipoContacto: queryTipoContacto,
        listTipoMensajeria: queryTipoMensajeria,
        listTipoOperador: queryTipoOperador,
        listTipoContrato: queryTipoContrato,
        listTipoDireccionVirtual: queryTipoDireccionVirtual,
        listTipoDireccion: queryTipoDireccion,
        listTipoVia: queryTipoVia,
        listTipoSectorVia: queryTipoSectorVia,
        listTipoLetraVia: queryTipoLetraVia,
        listTipoEdificio: queryTipoEdificio,
        listTipoIdFiscal: queryTipoIdFiscal,
        listOficial: queryListOficiales,
        listTipoPEP: queryTipoPep,
        listTipoVivienda: queryTipoViviendaInterior,
        listTipoPropiedad: queryTipoPropiedad,
        listReferenciaTiempo: queryReferenciaTiempo,
        listSexo: queryListSexo,
        listEstadoCivil: queryListEstadoCivil,
        listTipoAccionistas: queryTipoAccionista,
    });

    return JSON.stringify(listas);

};