import { cookies, headers } from "next/headers";
import EncabezadoRadicacionClientes from '@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes';
import { useProviderRadClient } from '@/app/provider/ProviderRadicacionCliente';
import { ButtomUsuarioProspetcto } from '@/app/components/share/ButtomUsuarioProspetcto';
import ControlBotonesCliente from '@/app/components/radicacion/cliente/ControlBotonesCliente';
import { queryDataCampos } from "@/app/lib/administracion/querys";
import ProductosAlcorteDataApi from "@/app/components/radicacionCliente/ProductosAlcorteDataApi";
import { DatosBasicosPj } from "@/app/components/radicacionCliente/pj/DatosBasicosPj";
import TabsBarSeleccionadoSegundo from "@/app/components/radicacionCliente/TabsBarSeleccionadoSegundo";

// Deshabilita ISR en desarrollo; en prod puedes ajustar a RRULE o segundos de cache.
export const revalidate = 0;

export default async function DatospersonajuridicaPj({ searchParams }) {
    
    // Obtener cookies y headers
    const perfilCliente = cookies().get('perfilCliente')?.value;
    // const headersList = headers();
    // const referer = headersList.get('referer');
    // if (!referer) redirect('/login/perfil');
    // const rolActivo = cookies().get('rol')?.value;
    // if (rolActivo !== '2') redirect('/login/perfil');

    const contextRadClient = useProviderRadClient;

    // VALIDACCION CAMPOS DESDE EL ADMINISTRADOR
    const camposValidar = (JSON.parse(await queryDataCampos()))?.DATA;
    const dataCampos = camposValidar?.filter(e => e.TIPOCLI == 'Pj' && e.nombre == 'Perfil');

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
                searchParams={searchParams}
            //listaModalProspecto={listas}
            />
            <main className="flex-grow">
                <TabsBarSeleccionadoSegundo contextRadClient={contextRadClient} />
                <div className="border-2 py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <section className="flex">
                        <div className="w-full px-8 py-1">
                            <div className="p-4 min-h-screen">
                                <div className="flex justify-between mb-8">
                                    <h3 className="font-semibold">Datos Generales Persona Jurídica</h3>
                                    <ButtomUsuarioProspetcto contextRadClient={contextRadClient} campoValidarAdministracion={dataCampos} />
                                </div>
                                <DatosBasicosPj
                                    contextRadClient={contextRadClient}
                                    dataCamposAdministacion={dataCampos}
                                />
                                <section className="flex my-4 pr-2 mt-8">
                                    <ControlBotonesCliente mostrarBtnRadCliente perfilCliente={perfilCliente} />
                                </section>
                                <ProductosAlcorteDataApi contextRadClient={contextRadClient} />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
};