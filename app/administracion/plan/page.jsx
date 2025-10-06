import { PlanPrincipal } from "@/app/components/administracion/plan/PlanPrincipal";
import EncabezadoMenuAdministracion from "@/app/components/headers/administracion/EncabezadoMenuAdministracion";
import { cookies, headers } from "next/headers";

export default async function PagePlan({ searchParams }) {

    const headersList = headers();
    const referer = headersList.get('referer');

    // if (referer == null) { redirect('/login/administracion') };

    // const listPlan = JSON.parse(await fnQueryListarPlanes())
    const rolActivo = cookies().get('rol')?.value;



    return <section className=" w-full sm:inline md:w-[95%] ">

        <EncabezadoMenuAdministracion
            urlImage={'cabecera3'}
            title={'MENÚ Administrador'}
            subtitle={'Asignación de Planes de Depósito'}
            enableInput={{ "input1": true }}
            btnConsultar={true}
            iconSearch={true}
            perfilActivo={rolActivo}
        />

        <main className="flex justify-center h-[80vh]">
            <PlanPrincipal />

        </main>

    </section>
};
