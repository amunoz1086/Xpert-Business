import ButtonContrato from "@/app/components/radicacion/contrato/ButtonContrato";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if (referer == null) { redirect('/login/perfil') }

    return (
        <ButtonContrato />
    )
};