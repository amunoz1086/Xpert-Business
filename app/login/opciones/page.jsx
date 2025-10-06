import EncabezadoLogin from "@/app/components/headers/EncabezadoLogin";
import PerfilLink from "@/app/components/login/Perfil-link";
import { getSession, obtenerTokenSession } from "@/app/lib/auth/auth";
import { redirect } from "next/navigation"; 

export default async function Opciones() {

    const rols = await getSession();
    const token = await obtenerTokenSession();

    if (((rols?.userBACK?.sesion) === undefined) && (token == undefined)) redirect('/login');

    return (
        <>
            <header >
                <EncabezadoLogin
                    title={"Seleccione una Opción "}
                    subtitle={"OPCIONES"}
                    session={rols?.userBACK?.sesion}
                />
            </header>
            <main className="w-full px-2 mt-6  flex flex-col space-y-2 h-[75vh] overflow-y-scroll">
                <PerfilLink
                    roles={rols?.userBACK.rol}
                    perfil={2}
                />
            </main>
        </>
    )
};