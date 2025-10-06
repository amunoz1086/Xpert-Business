
import { CDTVencimiento } from "@/app/components/radicacion/convenioServicios/cdt/CDTVencimiento";
import DetalleCDT from "@/app/components/radicacion/convenioServicios/cdt/DetalleCDT";
import { NuevoCDT } from "@/app/components/radicacion/convenioServicios/cdt/NuevoCDT";
import { ListaCuenta } from "@/app/components/radicacion/convenioServicios/cuenta/ListaCuenta";
import ServicioFinancieroSolicitud from "@/app/components/radicacion/convenioServicios/serFinancieros/ServicioFinancieroSolicitud";
import Loading from "@/app/components/share/Loading";
import { fnQueryListarPlanes } from "@/app/lib/admin/ahorro/fnQueryListarPlanes";
import { queryListarTipoCuenta, querylistProductoBanco } from "@/app/lib/admin/querys/listas";
import { useProvider } from "@/app/provider/Providers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {

    const rolActivo = cookies().get('rol')?.value

    // if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login')

    const context = useProvider

    const listaTipoCuenta = JSON.parse(await queryListarTipoCuenta())
    const listaProductBancario = JSON.parse(await querylistProductoBanco())
    const listaPlanes = JSON.parse(await fnQueryListarPlanes())


    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">

        <main className="  flex-grow">

            <div className={`border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg`}>


                <section className="">
                    <div className=" px-8 py-1">
                        <div className="mx-10 my-7 text-coomeva_color-grisLetras font-medium">
                            {/* <h2>CDT`s en procesos de vencimientos</h2> */}
                        </div>
                        {/* <Suspense fallback={<Loading />}> */}
                        <ListaCuenta
                            rolUsuario={rolActivo}
                            context={context}
                            listaTipoCuenta={listaTipoCuenta?.DATA || []}
                            listaProductBancario={listaProductBancario?.DATA || []}
                            listaPlanes={listaPlanes?.DATA || []}
                        />

                        {/* </Suspense> */}
                    </div>

                </section>
            </div>
        </main>



    </section>
}