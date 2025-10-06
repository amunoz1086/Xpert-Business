import { cookies } from "next/headers";
import EncabezadoRadicacionClientes from '@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes';
import TabsBarSeleccionadoSegundo from '@/app/components/radicacionCliente/TabsBarSeleccionadoSegundo';
import { useProviderRadClient } from '@/app/provider/ProviderRadicacionCliente';
import { ButtomUsuarioProspetcto } from '@/app/components/share/ButtomUsuarioProspetcto';
import { InformacionFinancieraPjN } from '@/app/components/radicacionCliente/pj/InformacionFinancieraPjN';
import { queryListarSiNo, queryListarTipoId } from '@/app/lib/admin/querys/listas';
import { queryDataCampos } from '@/app/lib/administracion/querys';
import {
    queryListPeriodos,
    queryListTipoBalance,
    queryTipoBalance,
    queryListPaises,
    queryListDepartamentos,
    queryListCiudades,
    queryListDireccion,
    querylistarSector,
    queryListCatCompañia,
    queryListCIIU,
    queryListOficinas,
    queryListPrefijoPais,
    queryListActividadEconomica,
    queryFuentePrincipalIngreso,
    queryCoberturageografica,
    queryListFechCorte,
    queryTipoTelefono,
    queryTipoContacto,
    queryTipoMensajeria,
    queryTipoOperador,
    queryTipoContrato,
    queryTipoDireccionVirtual,
    queryTipoDireccion,
    queryTipoVia,
    queryTipoSectorVia,
    queryTipoLetraVia,
    querySeccionFatca,
    queryTipoIdFiscal,
    queryTipoCliente,
    queryListOficiales,
    queryTipoEdificio,
    queryFuncionPep,
    queryDependenciaPep,
    queryCargosPep,
    queryTipoParentesco,
    queryReferenciaTiempo,
    queryTipoPropiedad,
    queryListEstadoCivil
} from '@/app/lib/menuPrincipal/actions';

// Deshabilita ISR en desarrollo; en prod puedes ajustar a RRULE o segundos de cache.
export const revalidate = 0;

export default async function InformacionFinancieraPj() {
    const rolActivo = cookies().get('rol')?.value;
    const perfilCliente = cookies().get('perfilCliente')?.value;
    const contextRadClient = useProviderRadClient;

    // Ejecutar consultas en paralelo
    const [
        rawSiNo,
        rawTipoId,
        rawDataCampos,
        rawPeriodos,
        rawTipoBalance,
        rawBalanceTipo,
        rawPaises,
        rawDepartamentos,
        rawCiudades,
        rawDireccion,
        rawSector,
        rawCatCompania,
        rawCIIU,
        rawOficinas,
        rawPrefijos,
        rawActividadEconomica,
        rawFuenteIngreso,
        rawCobertura,
        rawFechaCorte,
        rawTipoTelefono,
        rawTipoContacto,
        rawTipoMensajeria,
        rawTipoOperador,
        rawTipoContrato,
        rawDirVirtual,
        rawTipoDireccion,
        rawTipoVia,
        rawTipoSectorVia,
        rawTipoLetraVia,
        rawSeccionFatca,
        rawTipoIdFiscal,
        rawTipoCliente,
        rawOficiales,
        rawTipoEdificio,
        rawFuncionPep,
        rawDependenciaPep,
        rawCargosPep,
        rawTipoParentesco,
        rawReferenciaTiempo,
        rawTipoPropiedad,
        rawEstadoCivil
    ] = await Promise.all([
        queryListarSiNo(),
        queryListarTipoId(),
        queryDataCampos(),
        queryListPeriodos(),
        queryListTipoBalance(),
        queryTipoBalance(),
        queryListPaises(),
        queryListDepartamentos(),
        queryListCiudades(),
        queryListDireccion(),
        querylistarSector(),
        queryListCatCompañia(),
        queryListCIIU(),
        queryListOficinas(),
        queryListPrefijoPais(),
        queryListActividadEconomica(),
        queryFuentePrincipalIngreso(),
        queryCoberturageografica(),
        queryListFechCorte(),
        queryTipoTelefono(),
        queryTipoContacto(),
        queryTipoMensajeria(),
        queryTipoOperador(),
        queryTipoContrato(),
        queryTipoDireccionVirtual(),
        queryTipoDireccion(),
        queryTipoVia(),
        queryTipoSectorVia(),
        queryTipoLetraVia(),
        querySeccionFatca(),
        queryTipoIdFiscal(),
        queryTipoCliente(),
        queryListOficiales(),
        queryTipoEdificio(),
        queryFuncionPep(),
        queryDependenciaPep(),
        queryCargosPep(),
        queryTipoParentesco(),
        queryReferenciaTiempo(),
        queryTipoPropiedad(),
        queryListEstadoCivil()
    ]);

    const parse = raw => JSON.parse(raw);
    const extract = res => (res.STATUS === 200 ? res.DATA : []);

    // Preparar datos de validación
    const campos = parse(rawDataCampos).DATA || [];
    const dataCamposAdministacion = campos.filter(e => e.TIPOCLI === 'Pj' && e.nombre === 'Información Financiera');

    // Construir objeto de listas
    const listas = {
        listSiNo: extract(parse(rawSiNo)),
        listTipoDocumento: extract(parse(rawTipoId)),
        dataCamposAdministacion,
        listPeriodos: extract(parse(rawPeriodos)),
        listTipoBalance: extract(parse(rawTipoBalance)),
        tipoBalance: extract(parse(rawBalanceTipo)),
        listPaises: extract(parse(rawPaises)),
        listDepartamentos: extract(parse(rawDepartamentos)),
        listCiudades: extract(parse(rawCiudades)),
        listDireccion: extract(parse(rawDireccion)),
        listaSector: extract(parse(rawSector)),
        listaCIIU: extract(parse(rawCIIU)),
        listOficina: extract(parse(rawOficinas)),
        listPrefijos: extract(parse(rawPrefijos)),
        listActividadEconomica: extract(parse(rawActividadEconomica)),
        listFuentePrincipalIngreso: extract(parse(rawFuenteIngreso)),
        listCoberturageografica: extract(parse(rawCobertura)),
        listFechaCorte: extract(parse(rawFechaCorte)),
        listTipoTelefono: extract(parse(rawTipoTelefono)),
        listTipoContacto: extract(parse(rawTipoContacto)),
        listTipoMensajeria: extract(parse(rawTipoMensajeria)),
        listTipoOperador: extract(parse(rawTipoOperador)),
        listTipoContrato: extract(parse(rawTipoContrato)),
        listTipoDireccionVirtual: extract(parse(rawDirVirtual)),
        listTipoDireccion: extract(parse(rawTipoDireccion)),
        listTipoVia: extract(parse(rawTipoVia)),
        listTipoSectorVia: extract(parse(rawTipoSectorVia)),
        listTipoLetraVia: extract(parse(rawTipoLetraVia)),
        listSeccionFatca: extract(parse(rawSeccionFatca)),
        listTipoIdFiscal: extract(parse(rawTipoIdFiscal)),
        listTipoCliente: extract(parse(rawTipoCliente)),
        listOficiales: extract(parse(rawOficiales)),
        listTipoEdificio: extract(parse(rawTipoEdificio)),
        listFuncionPep: extract(parse(rawFuncionPep)),
        listDependenciaPep: extract(parse(rawDependenciaPep)),
        listCargosPep: extract(parse(rawCargosPep)),
        listTipoParentesco: extract(parse(rawTipoParentesco)),
        listReferenciaTiempo: extract(parse(rawReferenciaTiempo)),
        listTipoPropiedad: extract(parse(rawTipoPropiedad)),
        listEstadoCivil: extract(parse(rawEstadoCivil))
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
                listaModalProspecto={listas}
            />
            <main className="flex-grow">
                <TabsBarSeleccionadoSegundo contextRadClient={contextRadClient} />
                <div className="border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg">
                    <div className="flex justify-between items-start mb-10 px-8">
                        <h3 className="font-semibold">Datos Financieros</h3>
                        <ButtomUsuarioProspetcto contextRadClient={contextRadClient} campoValidarAdministracion={dataCamposAdministacion} />
                    </div>
                    <div className="px-2">
                        <InformacionFinancieraPjN
                            contextRadClient={contextRadClient}
                            listaPeriodos={listas.listPeriodos}
                            dataCamposAdministacion={listas.dataCamposAdministacion}
                            perfilCliente={perfilCliente}
                            listTipoBalance={listas.listTipoBalance}
                            tipoBalance={listas.tipoBalance}
                        />
                    </div>
                </div>
            </main>
        </section>
    );
}
