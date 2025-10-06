'use server';

import { queryListarTipoId } from '@/app/lib/admin/querys/listas';
import {
    queryListCatCompañia, queryListCiudades, queryListDepartamentos, queryListEstadoCivil, queryListOficiales, queryListOficinas, queryListPaises,
    queryListPrefijoPais, queryListSexo, queryListTipoSociedad, queryReferenciaTiempo, queryTipoAccionista, queryTipoContacto, queryTipoContrato,
    queryTipoDireccion, queryTipoDireccionVirtual, queryTipoEdificio, queryTipoIdFiscal, queryTipoLetraVia, queryTipoMensajeria, queryTipoOperador,
    queryTipoPep, queryTipoPropiedad, queryTipoSectorVia, queryTipoTelefono, queryTipoVia, queryTipoViviendaInterior
} from '@/app/lib/menuPrincipal/actions';


export const fn_catalogosParticipantes = async () => {

    //ASIGNACION DE CATALOGOS
    const [
        rawTipoDocumento,
        rawPais,
        rawDepartemento,
        rawCiudades,
        rawCategoriaCompañia,
        rawTipoSociedad,
        rawOficina,
        rawPrefijos,
        rawTipoTelefono,
        rawTipoContacto,
        rawTipoMensajeria,
        rawTipoOperador,
        rawTipoContrato,
        rawTipoDireccionVirtual,
        rawTipoDireccion,
        rawTipoVia,
        rawTipoSectorVia,
        rawTipoLetraVia,
        rawTipoVivienda,
        rawTipoIdFiscal,
        rawOficial,
        rawTipoEdificio,
        rawTipoPEP,
        rawReferenciaTiempo,
        rawTipoPropiedad,
        rawSexo,
        rawEstadoCivil,
        rawTipoAccionistas,
    ] = await Promise.allSettled([
        queryListarTipoId(),
        queryListPaises(),
        queryListDepartamentos(),
        queryListCiudades(),
        queryListCatCompañia(),
        queryListTipoSociedad(),
        queryListOficinas(),
        queryListPrefijoPais(),
        queryTipoTelefono(),
        queryTipoContacto(),
        queryTipoMensajeria(),
        queryTipoOperador(),
        queryTipoContrato(),
        queryTipoDireccionVirtual(),
        queryTipoDireccion(),
        queryTipoVia(),
        queryTipoSectorVia(),
        queryTipoLetraVia(),
        queryTipoViviendaInterior(),
        queryTipoIdFiscal(),
        queryListOficiales(),
        queryTipoEdificio(),
        queryTipoPep(),
        queryReferenciaTiempo(),
        queryTipoPropiedad(),
        queryListSexo(),
        queryListEstadoCivil(),
        queryTipoAccionista()
    ]);


    const validCatalogo = (catalogo) => {
        if (catalogo.status === "fulfilled") {
            return JSON.parse(catalogo.value).DATA;
        };

        console.log(console.error("Error cargando catalogo:", result.reason));
        return { DATA: [] };
    };


    const listas = {
        listTipoDocumento: validCatalogo(rawTipoDocumento),
        listPaises: validCatalogo(rawPais),
        listDepartemento: validCatalogo(rawDepartemento),
        listCiduades: validCatalogo(rawCiudades),
        listCategoriaCompania: validCatalogo(rawCategoriaCompañia),
        listTipoSociedad: validCatalogo(rawTipoSociedad),
        listOficina: validCatalogo(rawOficina),
        listPrefijos: validCatalogo(rawPrefijos),
        listTipoTelefono: validCatalogo(rawTipoTelefono),
        listTipoContacto: validCatalogo(rawTipoContacto),
        listTipoMensajeria: validCatalogo(rawTipoMensajeria),
        listTipoOperador: validCatalogo(rawTipoOperador),
        listTipoContrato: validCatalogo(rawTipoContrato),
        listTipoDireccionVirtual: validCatalogo(rawTipoDireccionVirtual),
        listTipoDireccion: validCatalogo(rawTipoDireccion),
        listTipoVia: validCatalogo(rawTipoVia),
        listTipoSectorVia: validCatalogo(rawTipoSectorVia),
        listTipoLetraVia: validCatalogo(rawTipoLetraVia),
        listTipoEdificio: validCatalogo(rawTipoEdificio),
        listTipoIdFiscal: validCatalogo(rawTipoIdFiscal),
        listOficial: validCatalogo(rawOficial),
        listTipoPEP: validCatalogo(rawTipoPEP),
        listTipoVivienda: validCatalogo(rawTipoVivienda),
        listTipoPropiedad: validCatalogo(rawTipoPropiedad),
        listReferenciaTiempo: validCatalogo(rawReferenciaTiempo),
        listSexo: validCatalogo(rawSexo),
        listEstadoCivil: validCatalogo(rawEstadoCivil),
        listTipoAccionistas: validCatalogo(rawTipoAccionistas),
    };

    return JSON.stringify(listas);

};