import EncabezadoLogin from "@/app/components/headers/EncabezadoLogin";
import PerfilLink from "@/app/components/login/Perfil-link";
import { getSession, obtenerTokenSession, obtenerPerfilProducto } from "@/app/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function DepositoVista() {

    let perfilProducto = [];
    let rols;
    let token;

    try {

        rols = await getSession();
        token = await obtenerTokenSession();

        if (((rols?.userBACK?.sesion) === undefined) && (token == undefined)) redirect('/login');

        const login = {
            "pUsuario": rols?.userBACK.user
        };

        if (login.pUsuario !== undefined) {
            const opcionesProductoUsuario = await obtenerPerfilProducto(JSON.stringify(login));

            if (typeof (opcionesProductoUsuario) === 'string' && opcionesProductoUsuario.length > 0) {
                let parsedPerfilProducto = JSON.parse(opcionesProductoUsuario).DATA;
                let arrayPerfilProducto = parsedPerfilProducto.split(",");
                perfilProducto = arrayPerfilProducto.map(nPro => parseInt(nPro));
            };
        };


    } catch (error) {
        console.log(error);
    };


    return (
        <>
            <header >
                <EncabezadoLogin
                    title={"Depósitos a la Vista"}
                    subtitle={""}
                    session={rols?.userBACK?.sesion}
                />
            </header>
            <main className="w-full px-2 mt-6  flex flex-col space-y-2 h-[75vh] overflow-y-scroll">
                <PerfilLink
                    roles={rols?.userBACK.rol}
                    perfil={3}
                    perfilProducto={perfilProducto}
                />
            </main>
        </>
    )
};