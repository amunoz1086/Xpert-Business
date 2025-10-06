import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
import BtnControl from "@/app/components/radicacion/cliente/BtnControl";
import DepositoCuentasPlan from "@/app/components/radicacion/depositosVista/DepositoCuentasPlan";
import DepositoTipoCuenta from "@/app/components/radicacion/depositosVista/DepositoTipoCuenta";
import ServicioFinancieroResumen from "@/app/components/radicacion/depositosVista/ServicioFinancieroResumen";
import { useProvider } from "@/app/provider/Providers";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";



export default function Page() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/perfil')}

    const rolActivo = cookies().get('rol')?.value

    if ((rolActivo) === undefined||(rolActivo) === '') redirect('/login/perfil')


    const habilitarInput = rolActivo !== '' && rolActivo !== 2

    const context = useProvider

    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">

        <EncabezadoMenuPrincipal
            urlImage={'cabecera1'}
            title={'DEPÓSITOS'}
            subtitle={'a la vista'}
            enableInput={{ "input1": true, "input2": true }}
            convenioNegociar={"Pago"}
            tipoConv={'Nuevo'}
            perfilActivo={rolActivo}
        />

        <main className=" mx-8 flex-grow">
            <section className=' w-full '>
                <div className='flex space-x-20 items-center'>
                    <div className='w-[60%]'>
                        <Suspense fallback={"loading depositocuent"}>
                            <DepositoTipoCuenta habilitarInput={habilitarInput} rolActivo={rolActivo} context={context} />
                        </Suspense>

                        <Suspense fallback={"loading depositocuent 2"}>
                            <ServicioFinancieroResumen habilitarInput={habilitarInput} rolActivo={rolActivo} context={context} />
                        </Suspense>
                    </div>
                    <div className='w-[40%]'>
                        <DepositoCuentasPlan habilitarInput={habilitarInput} rolActivo={rolActivo} context={context}/>
                    </div>
                </div>
                <section className=' w-full flex flex-row justify-end'>

                    <BtnControl
                        name="Resumen Operación"
                        url={'/radicacion/resumen'}
                        enableButton={true}
                        opcion={'navegar'}
                    />
                </section>

            </section>
        </main>

    </section>
}