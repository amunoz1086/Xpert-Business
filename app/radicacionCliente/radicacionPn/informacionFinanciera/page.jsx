import { cookies } from "next/headers";
import EncabezadoRadicacionClientes from "@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes";
import TabsBarSeleccionado from "@/app/components/radicacionCliente/TabsBarSeleccionado";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
import { ButtomUsuarioProspetcto } from "@/app/components/share/ButtomUsuarioProspetcto";
import { InformacionFinanciera } from "@/app/components/radicacionCliente/pn/InformacionFinanciera";
import { queryDataCampos } from "@/app/lib/administracion/querys";
import {
    queryListarTipoId,
    queryListPaises,
    queryListCiudades,
    queryListDireccion
} from "@/app/lib/admin/querys/listas";
import {
    queryListPrefijoPais,
    queryListTipoBalance,
    queryTipoBalance
} from "@/app/lib/menuPrincipal/actions";

// Desactivar ISR en desarrollo
export const revalidate = 0;

export default async function ReferenciaPnPage({ searchParams }) {
    const rolActivo = cookies().get("rol")?.value;
    const contextRadClient = useProviderRadClient;

    // 1) Lanzar en paralelo solo las queries necesarias
    /* const [
        rawTipoId,
        rawPaises,
        rawCiudades,
        rawDirecciones,
        rawPrefijos,
        rawListTipoBalance,
        rawTipoBalance,
        rawCampos
    ] = await Promise.all([
        queryListarTipoId(),
        queryListPaises(),
        queryListCiudades(),
        queryListDireccion(),
        queryListPrefijoPais(),
        queryListTipoBalance(),
        queryTipoBalance(),
        queryDataCampos()
    ]);
 */
    // 2) Parsear y extraer DATA en un solo paso
   /*  const jsons = [rawTipoId, rawPaises, rawCiudades, rawDirecciones, rawPrefijos, rawListTipoBalance, rawTipoBalance, rawCampos].map(r => JSON.parse(r));
    const extract = o => (o.STATUS === 200 && Array.isArray(o.DATA) ? o.DATA : []); */

    /* const [
        tipoIdJson,
        paisesJson,
        ciudadesJson,
        direccionesJson,
        prefijosJson,
        listTipoBalanceJson,
        tipoBalanceJson,
        camposJson
    ] = jsons;
 */
    /* // 3) Filtrar solo los campos de validación para 'Referencias'
    const dataCamposAdministacion = (camposJson.DATA || []).filter(
        e => e.TIPOCLI === "PN" && e.nombre === "Referencias"
    ); */

    // 4) Construir el objeto único de listas
    const listas = {
        /* listTipoDocumento: extract(tipoIdJson),
        listPaises: extract(paisesJson),
        listCiduades: extract(ciudadesJson),
        listDirecciones: extract(direccionesJson),
        listPrefijos: extract(prefijosJson),
        listTipoBalance: extract(listTipoBalanceJson),
        tipoBalance: extract(tipoBalanceJson) */
    };

    return (
        <section className="w-full sm:inline md:w-[95%] lg:w-[100%]">
            <EncabezadoRadicacionClientes
                urlImage="cabecera3"
                title="MENÚ"
                subtitle="Principal"
                paragraph="Digite el ID del cliente para consultar su información. Puede registrar un nuevo cliente, actualizar los datos de uno existente o iniciar una solicitud de precios preferencial"
                enableInput={{ input1: true, input2: true }}
                enableListDoc
                btnConsultar
                btnNuevo
                iconSearch
                perfilActivo={rolActivo}
                searchParams={searchParams}
                listaModalProspecto={listas}
            />

            <main className="flex-grow">
                <TabsBarSeleccionado contextRadClient={contextRadClient} />

                <div className="border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <div className="flex justify-end px-4 items-start mb-6">
                        <ButtomUsuarioProspetcto contextRadClient={contextRadClient} />
                    </div>
                    <InformacionFinanciera
                        contextRadClient={contextRadClient}
                        dataCamposAdministacion={[]}
                        {...listas}
                    />
                </div>
            </main>
        </section>
    );
}
