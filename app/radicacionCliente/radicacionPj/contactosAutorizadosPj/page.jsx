import { cookies } from "next/headers";
import EncabezadoRadicacionClientes from "@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes";
import TabsBarSeleccionado from "@/app/components/radicacionCliente/TabsBarSeleccionado";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
import { queryDataCampos } from "@/app/lib/administracion/querys";
import { ContactosAutorizadosPjN } from "@/app/components/radicacionCliente/pj/ContactosAutorizadosPjN";
import TabsBarSeleccionadoSegundo from "@/app/components/radicacionCliente/TabsBarSeleccionadoSegundo";

// Deshabilita ISR en desarrollo; en prod puedes ajustar a RRULE o segundos de cache.
export const revalidate = 0;

export default async function ContactosAutorizadosPj() {
    const rolActivo = cookies().get("rol")?.value;
    const contextRadClient = useProviderRadClient;

    // grab your admin-validation rules
    const camposValidar = (JSON.parse(await queryDataCampos()))?.DATA;
    const dataCampos = camposValidar?.filter(
        (e) => e.TIPOCLI === "Pj" && e.nombre === "Contacto Autorizado"
    );

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
                //listaModalProspecto={lists}
            />

            <main className="flex-grow">
                <TabsBarSeleccionadoSegundo contextRadClient={contextRadClient} />
                <div className="border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <TabsBarSeleccionado contextRadClient={contextRadClient} />
                    <section className="flex flex-row">
                        <div className="w-full px-8 py-1">
                            <div className="p-4 min-h-screen">
                                <div className="px-2">
                                    <ContactosAutorizadosPjN
                                        contextRadClient={contextRadClient}
                                        dataCamposAdministacion={dataCampos}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
}
