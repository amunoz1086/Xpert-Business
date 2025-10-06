import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import EncabezadoMenuAdministracion from "@/app/components/headers/administracion/EncabezadoMenuAdministracion";
import { ListarCatalogos } from "@/app/components/administracion/catalogos/ListarCatalogos";
import { fnQueryListarCatalogos } from '@/app/lib/admin/catalogos/fnQueryListarCatalogos';


export default async function Catalogos() {

    const headersList = headers();
    const referer = headersList.get('referer');
    const rolActivo = cookies().get('rol')?.value;

    if (referer == null) { redirect('/login/administracion') };


    const listPlan = JSON.parse(await fnQueryListarCatalogos());


    return <section className=" w-full sm:inline md:w-[95%] ">

        <EncabezadoMenuAdministracion
            urlImage={'cabecera3'}
            title={'MENÚ Administrador'}
            subtitle={'Actualizar Catálogos'}
            paragraph={''}
            enableInput={{ "input1": false }}
            btnConsultar={false}
            btnNuevo={false}
            btnEditar={false}
            btnCancelar={false}
            iconSearch={false}
            perfilActivo={rolActivo}
        />

        <main className="flex justify-center h-[60vh]">
            <ListarCatalogos
                listPlan={listPlan.DATA}
            />
        </main>

    </section>
};