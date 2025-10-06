import { cookies } from "next/headers";
import EncabezadoRadicacionClientes from '@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes';
import TabsBarSeleccionado from '@/app/components/radicacionCliente/TabsBarSeleccionado';
import TabsBarSeleccionadoSegundo from '@/app/components/radicacionCliente/TabsBarSeleccionadoSegundo';
import { useProviderRadClient } from '@/app/provider/ProviderRadicacionCliente';
import { JuntaDirectivaPjN } from '@/app/components/radicacionCliente/pj/JuntaDirectivaPjN';
import { queryDataCampos } from '@/app/lib/administracion/querys';
import { queryListTipoSociedad, queryTipoJuntaDirectiva } from '@/app/lib/menuPrincipal/actions';

// Deshabilita ISR en desarrollo; en prod puedes ajustar a RRULE o segundos de cache.
export const revalidate = 0;

export default async function JuntaDirectivaPj() {

    const rolActivo = cookies().get('rol')?.value;
    const contextRadClient = useProviderRadClient;


    // Paralelizar todas las consultas
    const [
        rawDataCampos,
        rawTipoSociedad,
        rawJuntaDirectiva,

    ] = await Promise.all([
        queryDataCampos(),
        queryListTipoSociedad(),
        queryTipoJuntaDirectiva(),
    ]);


    // Helpers para parseo y extracción
    const parse = raw => JSON.parse(raw);
    const extract = res => (res.STATUS === 200 ? res.DATA : []);


    // Filtrar campos de validación
    const allCampos = parse(rawDataCampos).DATA || [];
    const dataCamposAdministacion = allCampos.filter(e => e.TIPOCLI === 'Pj' && e.nombre === 'Junta Directiva');


    // Construir objeto de listas
    const listas = {
        listTipoSociedad: extract(parse(rawTipoSociedad)),
        listTipoJuntaDirectiva: extract(parse(rawJuntaDirectiva)),
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
            //listaModalProspecto={listas}
            />
            <main className="flex-grow">
                <TabsBarSeleccionadoSegundo contextRadClient={contextRadClient} />
                <div className="border-2 py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <TabsBarSeleccionado contextRadClient={contextRadClient} />
                    <section className="flex flex-row">
                        <div className="w-full px-8 py-1">
                            <div className="p-4 min-h-screen">
                                <JuntaDirectivaPjN contextRadClient={contextRadClient}
                                    dataCamposAdministacion={dataCamposAdministacion}
                                    {...listas} />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
}
