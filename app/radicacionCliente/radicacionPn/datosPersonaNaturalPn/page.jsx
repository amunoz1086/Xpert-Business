import { cookies } from "next/headers";
import { DatosPersonaNatural } from '@/app/components/radicacionCliente/pn/DatosPersonaNatural';
import { ResidenciaFiscalPnN } from '@/app/components/radicacionCliente/pn/ResidenciaFiscalPnN';
import TabsBarSeleccionado from '@/app/components/radicacionCliente/TabsBarSeleccionado';
import EncabezadoRadicacionClientes from '@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes';
import { useProviderRadClient } from '@/app/provider/ProviderRadicacionCliente';
import { ButtomUsuarioProspetcto } from '@/app/components/share/ButtomUsuarioProspetcto';
import ControlBotonesCliente from "@/app/components/radicacion/cliente/ControlBotonesCliente";
import ProductosAlcorteDataApi from "@/app/components/radicacionCliente/ProductosAlcorteDataApi";

// Desactivar ISR en desarrollo
export const revalidate = 0;

export default async function DatosPersonaNaturalPnPage({ searchParams }) {
    const rolActivo = cookies().get('rol')?.value;
    const perfilCliente = cookies().get('perfilCliente')?.value;
    const contextRadClient = useProviderRadClient;

    const listas = {
        /* listTipoDocumento: extract(tipoIdRaw), */
    };

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
                searchParams={searchParams}
                listaModalProspecto={listas}
            />

            <main className="flex-grow">
                <TabsBarSeleccionado contextRadClient={contextRadClient} />

                <div className="border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <div className="flex justify-end items-start mb-6 px-8 mt-2">
                        <ButtomUsuarioProspetcto contextRadClient={contextRadClient} />
                    </div>

                    <section className="flex flex-row">
                        <div className="w-full px-2 py-1">
                            <DatosPersonaNatural
                                contextRadClient={contextRadClient}
                                perfilCliente={perfilCliente}
                                //dataCamposAdministacion={dataCampos}
                                dataCamposAdministacion={[]}
                                
                            />
                        </div>
                    </section>

                    <div className="flex justify-between items-start mb-6 mt-4 px-8">
                        <h3 className="font-semibold">Residencia fiscal</h3>
                    </div>
                    <div className="mb-6">
                        <ResidenciaFiscalPnN
                            contextRadClient={contextRadClient}
                            perfilCliente={perfilCliente}
                            //dataCamposAdministacion={dataCampos}
                            dataCamposAdministacion={[]}
                            {...listas}
                        />
                    </div>
                </div>

                <section className="w-full my-4 flex flex-row pr-2 mt-8">
                    <ControlBotonesCliente mostrarBtnRadCliente perfilCliente={perfilCliente} />
                </section>

                <ProductosAlcorteDataApi contextRadClient={contextRadClient} />
            </main>
        </section>
    );
}
