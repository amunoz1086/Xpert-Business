import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import EncabezadoLogin from "@/app/components/headers/EncabezadoLogin";
import AdminLinks from "@/app/components/login/Admin-link";

export default function Admin() {

    const rolActivo = cookies().get('rol')?.value

    if (rolActivo != 1) return redirect('/login/perfil')

    return <>
        <header >
            <EncabezadoLogin
                title={"Acceso"}
                subtitle={"Administrador"}
            />
        </header>
        <main className="w-full  mt-6  flex flex-col space-y-2">
            <AdminLinks />
        </main>
    </>
}