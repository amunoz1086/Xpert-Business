import { cookies } from 'next/headers';
import EncabezadoRadicacionClientes from '@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes';
import TabsBarSeleccionado from '@/app/components/radicacionCliente/TabsBarSeleccionado';
import TabsBarSeleccionadoSegundo from '@/app/components/radicacionCliente/TabsBarSeleccionadoSegundo';
import { useProviderRadClient } from '@/app/provider/ProviderRadicacionCliente';
import { AccionistasPjN } from '@/app/components/radicacionCliente/pj/AccionistasPjN';
import { queryDataCampos } from '@/app/lib/administracion/querys';
import { queryListTipoSociedad } from '@/app/lib/menuPrincipal/actions';

// Deshabilita ISR en desarrollo; en prod puedes ajustar a RRULE o segundos de cache.
export const revalidate = 0;

export default async function AccionistasPj() {
    const rolActivo = cookies().get('rol')?.value;
    const contextRadClient = useProviderRadClient;

    // Paralelizar todas las consultas
    const [
        rawTipoSociedad,
    ] = await Promise.all([
        queryListTipoSociedad(),
    ]);

    // Helpers para parseo y extracción
    const parse = raw => JSON.parse(raw);
    const extract = res => (res.STATUS === 200 ? res.DATA : []);

    const listas = {
        listTipoSociedad: extract(parse(rawTipoSociedad)),
    };


    // first, get and filter your admin‐validation fields
    const rawCampos = JSON.parse(await queryDataCampos());
    const campos = rawCampos.DATA || [];
    const dataCamposAdministacion = campos.filter(
        (e) => e.TIPOCLI === 'Pj' && e.nombre === 'Accionistas'
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
                    <div className="p-4 min-h-screen">
                        <AccionistasPjN
                            contextRadClient={contextRadClient}
                            dataCamposAdministacion={dataCamposAdministacion}
                            {...listas}
                        />
                    </div>
                </div>
            </main>
        </section>
    );
}