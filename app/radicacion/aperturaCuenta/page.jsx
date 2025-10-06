import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
import { ContenidoApertura } from "@/app/components/radicacion/aperturaCuenta/ContenidoApertura";
import { useProvider } from "@/app/provider/Providers";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export default function Page() {

    const headersList = headers();
    const referer = headersList.get('referer');

    if (referer == null) { redirect('/login/perfil') };
    const rolActivo = cookies().get('rol')?.value
    if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil');


    const habilitarInput = rolActivo !== '' && rolActivo !== 2;
    const context = useProvider;

    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">

        <EncabezadoMenuPrincipal
            urlImage={'cabecera1'}
            title={'MENU'}
            subtitle={'Apertura de cuentas'}
            enableInput={{ "input1": false, "input2": false }}
            convenioNegociar={"Pago"}
            tipoConv={'Nuevo'}
            perfilActivo={rolActivo}

        />

        <main className="  flex-grow">
            <section className=' w-full '>
                <div className='flex space-x-20 items-center'>
                    <div className='w-full'>
                        <Suspense fallback={"loading depositocuent"}>
                            <ContenidoApertura habilitarInput={habilitarInput} rolActivo={rolActivo} context={context} />
                        </Suspense>
                    </div>
                </div>
            </section>
        </main>
    </section>
}