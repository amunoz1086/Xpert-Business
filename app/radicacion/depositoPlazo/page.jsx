import ControlDeposito from '@/app/components/headers/depositoPlazo/ControlDeposito';
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";


export default function Page() {

    const headersList = headers();
    const referer = headersList.get('referer');

    if (referer == null) { redirect('/login/perfil') };
    const rolActivo = cookies().get('rol')?.value
    if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil');

    return <ControlDeposito />

}