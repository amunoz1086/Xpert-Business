import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
import FormSolicitud from "@/app/components/radicacion/solicitud/FormSolicitud";
import { CardSkeleton } from "@/app/components/skeletons";
import { Suspense } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Page() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {
        redirect('/login/perfil')
    }

    const rolActivo = cookies().get('rol')?.value

    if ((rolActivo) === undefined||(rolActivo) === '') redirect('/login')



    return <section className=" w-full  sm:inline  md:w-[95%] ">

        <EncabezadoMenuPrincipal
            urlImage={'cabecera1'}
            title={'MENÚ'}
            subtitle={'Solicitud'}
            enableInput={{ "input1": true, "input2": true }}
            paragraph2={'Selecciona el tipo de producto y el tipo de operación que incluye la solicitud de precio preferencial. Pudes elegir un solo tipo de producto y operación o realizar varios en la misma solicitud'}
        perfilActivo={rolActivo}
        />

        <main className=" flex-grow">

            <Suspense fallback={<CardSkeleton />}>
                <FormSolicitud rolActivo={rolActivo}/>
            </Suspense>


        </main>

    </section>
}