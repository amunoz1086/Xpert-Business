import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
import SolicitudResumen from "@/app/components/radicacion/resumen/resultadoSolicitud/SolicitudResumen";
import { queryListarTipoOperacion, queryListarTipoProducto } from "@/app/lib/admin/querys/listas";
import { queryListarReciprocidadMinima } from "@/app/lib/administracion/querys";
import { getSession } from "@/app/lib/auth/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Page() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/perfil')}

    const listTypeProducts = await queryListarTipoProducto()
    // const listTipeOperactions = await queryListarTipoOperacion()
    const reciprocidadMinimaAdmin = await queryListarReciprocidadMinima()

    const rolActivo = cookies().get('rol')?.value


    if ((rolActivo) === undefined||(rolActivo) === '') redirect('/login/perfil')


    const usuario = (await getSession())?.userBACK?.user


    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">
        <EncabezadoMenuPrincipal
            urlImage={'cabecera1'}
            title={'RESUMEN'}
            subtitle={'de la Operación'}
            enableInput={{ "input1": true, "input2": true }}
            perfilActivo={rolActivo}
        />
        <main className="flex-grow">
            <SolicitudResumen
             listTypeProducts={JSON.parse(listTypeProducts)} 
            //  listTipeOperactions={JSON.parse(listTipeOperactions)} 
             rolActivo={rolActivo} usuario={usuario}
             reciprocidadMinimaAdmin={JSON.parse(reciprocidadMinimaAdmin)} 
             />
        </main>
    </section>
};