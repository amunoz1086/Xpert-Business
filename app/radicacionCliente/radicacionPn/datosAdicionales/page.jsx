import { cookies } from "next/headers";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
import EncabezadoRadicacionClientes from "@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes";
import TabsBarSeleccionado from "@/app/components/radicacionCliente/TabsBarSeleccionado";
import { ButtomUsuarioProspetcto } from "@/app/components/share/ButtomUsuarioProspetcto";
import { DatosAdicionalesPn } from "@/app/components/radicacionCliente/pn/DatosAdicionales";
import * as actions from "@/app/lib/menuPrincipal/actions";
import {
    queryListarTipoId,
} from "@/app/lib/admin/querys/listas";
import {
    queryListDepartamentos,
    queryListCiudades,
    queryListDireccion,
    queryListCIIU,
    queryListPrefijoPais,
    queryListIniActAño,
    queryListIniActMes,
    queryListPeriodos,
    queryListTipoBalance,
    queryListPaises,
} from "@/app/lib/menuPrincipal/actions";
import { queryDataCampos } from "@/app/lib/administracion/querys";

// Deshabilita ISR en desarrollo; en producción puedes poner un TTL o RRULE
export const revalidate = 0;

export default async function DatosAdicionalesPnPage() {
    const rolActivo = cookies().get("rol")?.value;
    const contextRadClient = useProviderRadClient;

    // 1) Mapea todas las funciones de fetch que necesitas
    const listFetchers = {
        /* listDepartamentos: queryListDepartamentos,
        listCiudades: queryListCiudades,
        listDireccion: queryListDireccion,
        listCIIU: queryListCIIU,
        listPrefijos: queryListPrefijoPais,
        listAAFecha: queryListIniActAño,
        listMesFecha: queryListIniActMes,
        listPeriodos: queryListPeriodos,
        listTipoBalance: queryListTipoBalance,
        listPaises: queryListPaises,
        listTipoDocumento: queryListarTipoId,
        listCatCompania: actions.queryListCatCompañia,
        listOficinas: actions.queryListOficinas,
        listOficiales: actions.queryListOficiales,
        listMarcacionCorrespondencia: actions.queryMarcacionCorrespondencia,
        listTipoProductoVincuLaft: actions.queryTipoProductoVincuLaft,
        listTipoParentesco: actions.queryTipoParentesco,
        listTipoContacto: actions.queryTipoContacto,
        listTipoTelefono: actions.queryTipoTelefono,
        listTipoContratoLaboral: actions.queryTipoContratoLaboral,
        listRolEmpresa: actions.queryRolEmpresa,
        listDependenciaLaboral: actions.queryDependenciaLaboral,
        listTipoMoneda: actions.queryTipoMoneda,
        listTipoVinculacion: actions.queryTipoVinculacion,
        listTipoIdFiscal: actions.queryTipoIdFiscal,
        listTipoEstablecimiento: actions.queryTipoEstablecimiento,
        listDiasAtencion: actions.queryDiasAtencion,
        listSexo: actions.queryListSexo,
        listTipoMensajeria: actions.queryTipoMensajeria,
        listReferenciaTiempo: actions.queryReferenciaTiempo,
        listTipoPropiedad: actions.queryTipoPropiedad,
        listTipoSociedad: actions.queryListTipoSociedad,
        listActividadEconomica: actions.queryListActividadEconomica,
        listCoberturaGeografica: actions.queryCoberturageografica,
        listTipoVia: actions.queryTipoVia,
        listTipoSectorVia: actions.queryTipoSectorVia,
        listTipoLetraVia: actions.queryTipoLetraVia,
        listSeccionFatca: actions.querySeccionFatca,
        listTipoCliente: actions.queryTipoCliente, */
    };

    // 2) Dispara todas las requests en paralelo
    const raws = await Promise.all(Object.values(listFetchers).map(fn => fn()));
    const parsed = raws.map(r => JSON.parse(r));

    // 3) Construye tu objeto `listas` extrayendo STATUS===200 ? DATA : []
    const listas = Object.keys(listFetchers).reduce((acc, key, idx) => {
        const res = parsed[idx];
        acc[key] = Array.isArray(res.DATA) && res.STATUS === 200 ? res.DATA : [];
        return acc;
    }, {});

    // 4) Campos de validación (por separado)
    const rawCampos = await queryDataCampos();
    const allCampos = JSON.parse(rawCampos).DATA || [];
    const dataCampos = allCampos.filter(
        e => e.TIPOCLI === "PN" && e.nombre === "Datos Adicionales"
    );

    // 5) Renderiza usando spread para pasar todas las listas
    return (
        <section className="w-full sm:inline md:w-[95%] lg:w-[100%]">
            <EncabezadoRadicacionClientes
                urlImage="cabecera3"
                title="MENÚ"
                subtitle="Principal"
                paragraph="Digite el ID del cliente..."
                enableInput={{ input1: true, input2: true }}
                enableListDoc
                btnConsultar
                btnNuevo
                iconSearch
                perfilActivo={rolActivo}
                listaModalProspecto={listas}
            />
            <main className="flex-grow">
                <TabsBarSeleccionado contextRadClient={contextRadClient} />
                <div className="border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <div className="flex justify-end mb-6 px-8 mt-2">
                        <ButtomUsuarioProspetcto contextRadClient={contextRadClient} />
                    </div>
                    <section className="flex flex-row">
                        <div className="w-full px-2 py-1">
                            <DatosAdicionalesPn
                                contextRadClient={contextRadClient}
                                dataCamposAdministacion={[]}
                                {...listas}
                            />
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
}
