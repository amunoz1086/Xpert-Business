import React from 'react';
import { cookies } from 'next/headers';
import { ActividadEconomicaPn } from '@/app/components/radicacionCliente/pn/ActividadEconomicaPN';
import EncabezadoRadicacionClientes from '@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes';
import TabsBarSeleccionado from '@/app/components/radicacionCliente/TabsBarSeleccionado';
import { useProviderRadClient } from '@/app/provider/ProviderRadicacionCliente';
import { ButtomUsuarioProspetcto } from '@/app/components/share/ButtomUsuarioProspetcto';
import { fetchLists } from '@/app/lib/utils';
import {
    queryListDepartamentos,
    queryListCiudades,
    queryListDireccion,
    queryListCIIU,
    queryListPrefijoPais,
    queryListIniActAño,
    queryListIniActMes,
    queryListPeriodos,
    queryListTipoBalance
} from '@/app/lib/menuPrincipal/actions';
import { queryDataCampos } from '@/app/lib/administracion/querys';

// Deshabilita ISR en desarrollo
export const revalidate = 0;

export default async function ActividadEconomicaPnPage() {
    const rolActivo = cookies().get('rol')?.value;
    const contextRadClient = useProviderRadClient;

    // Carga todas las listas en paralelo
    const listas = await fetchLists({
        listDepartamentos: queryListDepartamentos,
        listCiudades: queryListCiudades,
        listDireccion: queryListDireccion,
        listCIIU: queryListCIIU,
        listPrefijos: queryListPrefijoPais,
        listIniAA: queryListIniActAño,
        listIniMes: queryListIniActMes,
        listPeriodos: queryListPeriodos,
        listTipoBalance: queryListTipoBalance,
        dataCamposAdministacion: queryDataCampos
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
            />

            <main className="flex-grow">
                <TabsBarSeleccionado contextRadClient={contextRadClient} />
                <div className="border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <div className="flex justify-between items-start mb-6 px-8 mt-2">
                        <h3 className="font-semibold">Datos Actividad Económica</h3>
                        <ButtomUsuarioProspetcto contextRadClient={contextRadClient} />
                    </div>
                    <section className="flex flex-row">
                        <div className="w-full px-2 py-1">
                            <ActividadEconomicaPn
                                contextRadClient={contextRadClient}
                                listDepartamentos={listas.listDepartamentos}
                                listCiduades={listas.listCiudades}
                                listDirecciones={listas.listDireccion}
                                listaCIIU={listas.listCIIU}
                                listPrefijos={listas.listPrefijos}
                                listIniAA={listas.listIniAA}
                                listIniMes={listas.listIniMes}
                                listaPeriodos={listas.listPeriodos}
                                listaTipoBalance={listas.listTipoBalance}
                                dataCamposAdministacion={listas.dataCamposAdministacion.filter(
                                    (e) => e.TIPOCLI === 'PN' && e.nombre === 'Actividad Econ\u00f3mica'
                                )}
                            />
                        </div>
                    </section>
                </div>

                <section className="w-full my-4 flex flex-row pr-2 mt-8" />
            </main>
        </section>
    );
}
