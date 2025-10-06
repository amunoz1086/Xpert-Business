import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import ServicioFinancieroA from "@/app/components/administracion/servicioFinanciero/ServiciosFinancierosA";
import { queryListarSiNo } from "@/app/lib/admin/querys/listas";
import { queryListarReciprocidadMinima } from "@/app/lib/administracion/querys";

export default async function ServicioFinanciero() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/administracion')}

    const listaReciprocidadMinima =await  queryListarReciprocidadMinima()


    const rolActivo = cookies().get('rol')?.value;
    if (rolActivo != 1) return redirect('/login/perfil');
    const listaSiNo = await queryListarSiNo();

    return <section className='flex flex-wrap justify-center items-center'>
        <div className='w-full  p-2 '>
            <ServicioFinancieroA
                listaSiNo={JSON.parse(listaSiNo)}
                listaReciprocidadMinima={JSON.parse(listaReciprocidadMinima)}
            />
        </div>
    </section>
};