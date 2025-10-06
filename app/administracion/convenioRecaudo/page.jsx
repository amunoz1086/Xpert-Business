import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import RecaudoOficinaPseServer from "@/app/components/administracion/convenioRecaudo/RecaudoOficinaPseServer";
import JustificacionOficinaPseServer from "@/app/components/administracion/convenioRecaudo/JustificacionOficinaPseServer";
import CorresponsalesParametrosAdquirenciaServer from "@/app/components/administracion/convenioRecaudo/CorresponsalesParametrosAdquirenciaServer";
import GastosDirectosClienteOficina from "@/app/components/administracion/convenioRecaudo/GastosDirectosClienteOficina";
import GastosDirectosClientePse from "@/app/components/administracion/convenioRecaudo/GastosDirectosClientePse";
import { Suspense } from "react";

export default function ConvenioRecaudo({ searchParams }) {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/administracion')}

    const rolActivo = cookies().get('rol')?.value;
    if (rolActivo != 1) return redirect('/login/perfil');

    const guardar = searchParams?.convenioRecaudo || '';
    const filaAffectada = searchParams?.nR || '';

    return <>
        <section className='w-full space-y-6'>
            <div className='flex w-full space-x-6'>
                <RecaudoOficinaPseServer searchParams={guardar} filaAffectada={filaAffectada} />
            </div>
            <div className='flex w-full space-x-6'>
                <GastosDirectosClienteOficina />
                <GastosDirectosClientePse />
            </div>
            <div className='flex w-full space-x-6'>
                <Suspense fallback={<p>&apos; &apos;</p>}>
                    <JustificacionOficinaPseServer searchParams={guardar} filaAffectada={filaAffectada} />
                </Suspense>

            </div>
        </section>
        <section className='mb-10'>
            <CorresponsalesParametrosAdquirenciaServer searchParams={guardar} filaAffectada={filaAffectada} />
        </section>
    </>
};