import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import PlanRemuneracion from "@/app/components/administracion/depositosVista/PlanRemuneracion";
import { queryPlanRemuneracion } from "@/app/lib/administracion/querys";
import { queryListarPlanRem } from "@/app/lib/admin/querys/listas";

export default async function DepositoVista() {

    const headersList = headers()

    const referer = headersList.get('referer')

    // if(referer == null) {redirect('/login/administracion')}

    const rolActivo = cookies().get('rol')?.value;
    // if (rolActivo != 1) return redirect('/login/perfil');

    const listaPlanRemuneracion = await queryPlanRemuneracion();
    const listPlanRem = await queryListarPlanRem();

    return <section className='flex flex-wrap'>
        <div className='w-full  p-2'>
            <PlanRemuneracion listaPlanRemuneracion={JSON.parse(listaPlanRemuneracion)} listSelect={JSON.parse(listPlanRem)} />
        </div>
    </section>

};