import { cookies } from "next/headers";
import EncabezadoRadicacionClientes from '@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes';
import TabsBarSeleccionado from '@/app/components/radicacionCliente/TabsBarSeleccionado';
import TabsBarSeleccionadoSegundo from '@/app/components/radicacionCliente/TabsBarSeleccionadoSegundo';
import { useProviderRadClient } from '@/app/provider/ProviderRadicacionCliente';
import { queryDataCampos } from '@/app/lib/administracion/querys';
import { AdministradorConsorcio } from "@/app/components/radicacionCliente/pj/AdministradorConsorcio";


// Deshabilita ISR en desarrollo; en prod puedes ajustar a RRULE o segundos de cache.
export const revalidate = 0;

export default async function AdministradorConsorcios() {
    // Datos de contexto
    const rolActivo = cookies().get('rol')?.value;
    const contextRadClient = useProviderRadClient;

    const camposValidar = (JSON.parse(await queryDataCampos()))?.DATA;
    const dataCamposAdministacion = camposValidar?.filter(e => e.TIPOCLI === 'Pj' && e.nombre === 'Representante Legal');

    return (
        <section className="w-full sm:inline md:w-[95%] lg:w-[100%]">
            <EncabezadoRadicacionClientes
                urlImage="cabecera3"
                title="MENÚ"
                subtitle="Principal"
                paragraph="Digite el ID del cliente para consultar su información..."
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
                <div className="border-2 py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <TabsBarSeleccionado contextRadClient={contextRadClient} />
                    <section className="flex flex-row">
                        <div className="w-full px-8 py-1">
                            <div className="p-4 min-h-screen">
                                <div className="px-2">
                                    <AdministradorConsorcio
                                        contextRadClient={contextRadClient}
                                        dataCampos={dataCamposAdministacion}
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
