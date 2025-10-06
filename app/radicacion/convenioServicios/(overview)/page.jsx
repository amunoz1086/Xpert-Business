import { queryFrecuenciaNomina, queryNegociarNomina, queryPagoTerseros, queryPromedioNomina } from "@/app/lib/convenios/actions";
import FormConvenioPago from "@/app/components/radicacion/convenioServicios/pago/FormConvenioPago";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/perfil')}

    const rolActivo = cookies().get('rol')?.value

    if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil')

    const listFrecuenciaNomina = await queryFrecuenciaNomina()
    const listPromedioNomina = await queryPromedioNomina()
    const listNegociarNomina = await queryNegociarNomina()
    const listPagoTercero = await queryPagoTerseros()

    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">
        <main className=" flex-grow">
            <FormConvenioPago
                searchParams={searchParams}
                listFrecuenciaNomina={JSON.parse(listFrecuenciaNomina)}
                listPromedioNomina={JSON.parse(listPromedioNomina)}
                listNegociarNomina={JSON.parse(listNegociarNomina)}
                listPagoTercero={JSON.parse(listPagoTercero)}
                rolPerfil={rolActivo}
            />
        </main>
    </section>
};