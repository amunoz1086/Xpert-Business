import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
import TablaRemi from "@/app/components/radicacion/remi/TablaRemi";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page({ searchParams }) {

    const headersList = headers()

    const referer = headersList.get('referer')

    if (referer == null) { redirect('/login/perfil') }

    const rolActivo = cookies().get('rol')?.value

    if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil')


    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] absolute right-0 top-0">
        <header className=" mt-5 mx-8 ">

            <EncabezadoMenuPrincipal
                urlImage={'cabecera3'}
                title={'TARIFA'}
                subtitle={'de Intercambio'}
                enableInputActividad={true}
                btnConsultar={true}
                iconSearch={true}
                perfilActivo={rolActivo}
            />

        </header>
        <main className=" mx-8 flex-grow">
            <section className=' w-full '>
                <TablaRemi searchParams={searchParams} rolActivo={rolActivo} />
            </section>
        </main>
    </section>
}