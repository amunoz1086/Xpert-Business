
import LoginForm from "../../components/login/LoginForm";
import EncabezadoLogin from '@/app/components/headers/EncabezadoLogin';
import { getSession } from '@/app/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function Page() {

    const rols = await getSession()

    // if((rols?.userBACK?.sesion)!==undefined ) redirect('/login/perfil')

    return <>
        <header >
            <EncabezadoLogin
                title={"Acceso"}
                subtitle={"LOGIN"}
                parrafo={''}
            />
        </header>
        <main className="w-full flex flex-col font-light pt-4">
            <header className="mx-auto mb-8">
                <img
                    src="/login/log-in-girl.svg"
                    width={1000}
                    height={1000}
                    className="mx-auto w-80 h-80 mb-5"
                    alt="Imagen del login de precios preferenciales"
                    priority={'true'}
                />
                <h1 className="text-coomeva_color-rojo text-center font-semibold">
                    XPERT BUSINESS
                </h1>
            </header>
            <LoginForm />
        </main>
    </>
}