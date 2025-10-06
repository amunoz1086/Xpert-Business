import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import NegociarNominaServer from "@/app/components/administracion/convenioPago/NegociarNominaServer";
import PagoTerceroServer from "@/app/components/administracion/convenioPago/PagoTerceroServer";
import PromedioFrecuenciaNominaServer from "@/app/components/administracion/convenioPago/PromedioFrecuenciaNominaServer";

export default function ConvenioPago({ searchParams }) {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/administracion')}

    const rolActivo = cookies().get('rol')?.value;

    if (rolActivo != 1) return redirect('/login/perfil');

    const guardar = searchParams?.convenioPago || '';
    const filaAffectada = searchParams?.n || '';

    return (
        <section className='w-[100%] flex flex-wrap pt-5'>
            <div className='w-full  md:w-1/2 p-2 '>
                <PromedioFrecuenciaNominaServer searchParams={guardar} filaAffectada={filaAffectada} />
            </div>
            <div className='w-full md:w-1/2 p-2'>
                <PagoTerceroServer searchParams={guardar} filaAffectada={filaAffectada} />
            </div>
            <div className='w-full p-2 '>
                <NegociarNominaServer searchParams={guardar} filaAffectada={filaAffectada} />
            </div>
        </section>
    );
};