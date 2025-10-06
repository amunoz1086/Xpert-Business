import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Credito from "@/app/components/administracion/credito/Credito";

export default async function PageCredito() {

    const headersList = headers()
    const referer = headersList.get('referer')

    if (referer == null) { redirect('/login/administracion') }

    const rolActivo = cookies().get('rol')?.value;
    if (rolActivo !== '1') return redirect('/login/perfil');

    return <section className='flex flex-wrap'>
        <div className='w-full  p-2'>
            <Credito />
        </div>
    </section>
};