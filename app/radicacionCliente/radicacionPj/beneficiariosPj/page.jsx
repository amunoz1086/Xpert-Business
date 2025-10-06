import { cookies } from "next/headers";
import { fetchLists } from "@/app/lib/utils";
import EncabezadoRadicacionClientes from "@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes";
import TabsBarSeleccionado from "@/app/components/radicacionCliente/TabsBarSeleccionado";
import TabsBarSeleccionadoSegundo from "@/app/components/radicacionCliente/TabsBarSeleccionadoSegundo";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
import { BeneficiariosPjN } from "@/app/components/radicacionCliente/pj/BeneficiariosPjN";
import { queryDataCampos } from "@/app/lib/administracion/querys";
import { queryListTipoSociedad } from '@/app/lib/menuPrincipal/actions';

// disable ISR in dev; in prod you can set revalidate to a number or RRULE
export const revalidate = 0;

export default async function BeneficiariosPjPage() {
    const rolActivo = cookies().get("rol")?.value;
    const contextRadClient = useProviderRadClient;

    // 1️⃣ fetch and filter your admin‐validation fields
    const rawCampos = JSON.parse(await queryDataCampos());
    const campos = rawCampos.DATA || [];
    const dataCamposAdministacion = campos.filter(
        (e) => e.TIPOCLI === "Pj" && e.nombre === "Beneficiarios"
    );

    // 2️⃣ batch all dropdown queries
    // batch‐fetch all your lists
    const lists = await fetchLists({
        listTipoSociedad: queryListTipoSociedad
    });

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
            //listaModalProspecto={listas}
            />

            <main className="flex-grow">
                <TabsBarSeleccionadoSegundo contextRadClient={contextRadClient} />

                <div className="border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <TabsBarSeleccionado contextRadClient={contextRadClient} />
                    <div className="p-4 min-h-screen">
                        <BeneficiariosPjN
                            contextRadClient={contextRadClient}
                            dataCamposAdministacion={dataCamposAdministacion}
                            {...lists}
                        />
                    </div>
                </div>
            </main>
        </section>
    );
}
