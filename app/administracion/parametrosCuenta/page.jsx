import { cookies, headers } from "next/headers";
import EncabezadoMenuAdministracion from "@/app/components/headers/administracion/EncabezadoMenuAdministracion";
import { ListaParamettrosCuenta } from "@/app/components/administracion/parametrosCuentas/ListaParamettrosCuenta";


export default async function ParametrosCuenta() {

    const headersList = headers();
    const referer = headersList.get('referer');
    const rolActivo = cookies().get('rol')?.value;

    return <section className=" w-full sm:inline md:w-[95%] ">

        <EncabezadoMenuAdministracion
            urlImage={'cabecera3'}
            title={'MENÚ Administrador'}
            subtitle={'Parámetros de Cuenta'}
            enableInput={{ "input1": false }}
            btnConsultar={false}
            iconSearch={false}
            perfilActivo={rolActivo}
        />

        <main className="">
            <ListaParamettrosCuenta
            />
        </main>

    </section>
};