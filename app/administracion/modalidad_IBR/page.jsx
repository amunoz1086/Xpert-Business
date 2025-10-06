import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import ModalidadIBR from "@/app/components/administracion/modalidad_IBR/ModalidadIBR";

export default async function PageModalidadIBR() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/administracion')}

    const rolActivo = cookies().get('rol')?.value;
    if (rolActivo != 1) return redirect('/login/perfil');

    return <section className='flex flex-wrap'>
        <div className='w-full  p-2'>
            <ModalidadIBR />
        </div>
    </section>
};