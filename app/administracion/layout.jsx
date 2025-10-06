import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutAdmin } from "../components/share/LayoutAdmin";


export default async function Layout({ children }) {

    const rolActivo = cookies().get('rol')?.value;

    if (+rolActivo != 1) {
        return redirect('/login/perfil');
    };

    return (
        <div className="">
            <LayoutAdmin>{children}</LayoutAdmin>
        </div>
    );
};