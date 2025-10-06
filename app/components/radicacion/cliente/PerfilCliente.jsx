import {
    fnQueryListarRegional,
    fnQueryListarVinculo,
    queryListarTipoContrato,
    queryListarTipoCliente,
    querylistarSector,
    queryListarEstadoBanco,
    queryListarEstadoCoomeva,
    queryListarAsocCoomeva,
    fnQueryListarOficinas
} from '@/app/lib/menuPrincipal/actions';
import FormPerfil from './FormPerfil';



export default async function PerfilCliente({ rolActivo }) {

    const listRegional = await fnQueryListarRegional();
    const listVinculo = await fnQueryListarVinculo();
    const tipoContrato = await queryListarTipoContrato();
    const listTipoClient = await queryListarTipoCliente();
    const listSector = await querylistarSector();
    const listEstadoBanco = await queryListarEstadoBanco();
    const listEstadoCoomeva = await queryListarEstadoCoomeva();
    const asociadoCoomeva = await queryListarAsocCoomeva();
    const listOficina = await fnQueryListarOficinas();

    return (
        <main className="p-1  h-full w-full overflow-auto">

            <div className="overflow-y-auto  text-coomeva_color-grisLetras h-10 w-32 ml-8 flex border-x border-t bg-white rounded-t-lg"><h1 className="m-auto ">Perfil</h1></div>

            <section className=" w-full h-full flex py-5 shadow rounded-lg bg-white ">
                <FormPerfil
                    regionals={JSON.parse(listRegional).regional}
                    oficinas={JSON.parse(listOficina).oficinas}
                    vinculo={JSON.parse(listVinculo)?.DATA}
                    tipoContrato={JSON.parse(tipoContrato)?.DATA}
                    listTipoClient={JSON.parse(listTipoClient)?.DATA}
                    sectors={JSON.parse(listSector)?.DATA}
                    estadoBanco={JSON.parse(listEstadoBanco)?.DATA}
                    listEstadoCoomeva={JSON.parse(listEstadoCoomeva)?.DATA}
                    asociadoCoomeva={JSON.parse(asociadoCoomeva)?.DATA}
                    rolActivo={rolActivo}
                />


            </section>

            {/* <FormPerfil2
                    regionals={JSON.parse(listRegional).regional}
                    oficinas={JSON.parse(listOficina).oficinas}
                    vinculo={JSON.parse(listVinculo)?.DATA}
                    tipoContrato={JSON.parse(tipoContrato)?.DATA}
                    listTipoClient={JSON.parse(listTipoClient)?.DATA}
                    sectors={JSON.parse(listSector)?.DATA}
                    estadoBanco={JSON.parse(listEstadoBanco)?.DATA}
                    listEstadoCoomeva={JSON.parse(listEstadoCoomeva)?.DATA}
                    asociadoCoomeva={JSON.parse(asociadoCoomeva)?.DATA}
                    rolActivo={rolActivo}
                /> */}
        </main>
    );
};