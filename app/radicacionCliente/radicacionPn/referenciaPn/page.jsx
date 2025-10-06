import { cookies } from "next/headers";
import EncabezadoRadicacionClientes from "@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes";
import TabsBarSeleccionado from "@/app/components/radicacionCliente/TabsBarSeleccionado";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
import { ButtomUsuarioProspetcto } from "@/app/components/share/ButtomUsuarioProspetcto";
import { ReferenciaPn } from "@/app/components/radicacionCliente/pn/ReferenciaPn";
import { queryDataCampos } from "@/app/lib/administracion/querys";
import { queryListPaises, queryListCiudades, queryListDireccion, queryListPrefijoPais } from "@/app/lib/menuPrincipal/actions";
import { queryListarTipoId } from "@/app/lib/admin/querys/listas";

// Deshabilita ISR en desarrollo; en prod ajusta revalidate a tus necesidades
export const revalidate = 0;

export default async function ReferenciaPnPage({ searchParams }) {
    const rolActivo = cookies().get("rol")?.value;
    const contextRadClient = useProviderRadClient;

    // 1) Lanza todas las queries en paralelo
    const [
        rawTipoId,
        rawPaises,
        rawCiudades,
        rawDirecciones,
        rawPrefijos,
        rawCampos
    ] = await Promise.all([
        queryListarTipoId(),
        queryListPaises(),
        queryListCiudades(),
        queryListDireccion(),
        queryListPrefijoPais(),
        queryDataCampos()
    ]);

    // 2) Parsear y extraer DATA
    const raws = [rawTipoId, rawPaises, rawCiudades, rawDirecciones, rawPrefijos, rawCampos]
        .map(r => JSON.parse(r));

    const extract = o => (o.STATUS === 200 && Array.isArray(o.DATA) ? o.DATA : []);

    const [
        tipoIdJson,
        paisesJson,
        ciudadesJson,
        direccionesJson,
        prefijosJson,
        camposJson
    ] = raws;

    // 3) Filtrar solo los campos "Referencias" para PN
    const dataCamposAdministacion = (camposJson.DATA || []).filter(
        e => e.TIPOCLI === "PN" && e.nombre === "Referencias"
    );

    // 4) Montar objeto de listas
    const listas = {
        listTipoDocumento: extract(tipoIdJson),
        listPaises: extract(paisesJson),
        listCiduades: extract(ciudadesJson),
        listDirecciones: extract(direccionesJson),
        listPrefijos: extract(prefijosJson)
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
                    <div className="flex justify-between px-4 items-start mb-6">
                        <h3 className="font-semibold">Referencias</h3>
                        <ButtomUsuarioProspetcto contextRadClient={contextRadClient} />
                    </div>

                    <ReferenciaPn
                        contextRadClient={contextRadClient}
                        dataCamposAdministacion={dataCamposAdministacion}
                        {...listas}
                    />
                </div>
            </main>
        </section>
    );
}
