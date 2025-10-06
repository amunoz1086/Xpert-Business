import { cookies, headers } from "next/headers";
//import { redirect } from "next/navigation";
import EncabezadoMenuAdministracion from "@/app/components/headers/administracion/EncabezadoMenuAdministracion";
import { ListarPlanes } from "@/app/components/administracion/ahorro/ListarPlanes";
import { fnQueryListarPlanes } from '@/app/lib/admin/ahorro/fnQueryListarPlanes';
import { queryListarPlanContingencia, queryTipoPlan } from "@/app/lib/admin/querys/listas";


export default async function Ahorro() {

    const headersList = headers();
    const referer = headersList.get('referer');

    // if (referer == null) { redirect('/login/administracion') };

    const listPlan = JSON.parse(await fnQueryListarPlanes())

    const listTipoPlan = JSON.parse(await queryTipoPlan())

    const listaPlanContingencia=JSON.parse(await queryListarPlanContingencia()
) 


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

        <main className="flex justify-center ">
            <ListarPlanes
              
                listPlan={listPlan.DATA}
                listaTipoPlan={listTipoPlan.DATA}
                listaPlanContingencia={listaPlanContingencia.DATA}
            />
        </main>

    </section>
};