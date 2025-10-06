import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
import UploadDocument from "@/app/components/radicacion/documentos/UploadDocument";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if (referer == null) { redirect('/login/perfil') }

    const rolActivo = cookies().get('rol')?.value

    if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil')


    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">
        <EncabezadoMenuPrincipal
            urlImage={'cabecera1'}
            title={'CARGUE'}
            subtitle={'Documentos'}
            enableInput={{ "input1": true, "input2": true }}
            convenioNegociar={"Recuado"}
            tipoConv={'Nuevo'}
            perfilActivo={rolActivo}
        />
        <main className="flex-grow">
            <UploadDocument rolActivo={rolActivo} />
        </main>

    </section>

};