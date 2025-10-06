
import ConvenioRecaudoOficina from "@/app/components/radicacion/convenioServicios/recaudo/ConvenioRecaudoOficina";
import ConveniORecaudoPse from "@/app/components/radicacion/convenioServicios/recaudo/ConvenioRecaudoPse";
import ConvenioRecaudoCorresponsal from "@/app/components/radicacion/convenioServicios/recaudo/CovenioRecaudoCorresponsales";
import ConvenioRecaudoSolicitud from "@/app/components/radicacion/convenioServicios/recaudo/ConvenioRecaudoSolicitud";
import ConvenioRecaudoGastosOficina from "@/app/components/radicacion/convenioServicios/recaudo/convenioRecaudoGastosOficina";
import TipoConvenioServicioPago from "@/app/components/radicacion/convenioServicios/pago/TipoConvenioServicioPago";
import ConvenioRecaudoGastosPse from "@/app/components/radicacion/convenioServicios/recaudo/ConvenioRecaudoGastosPse";
import { cookies, headers } from "next/headers";
import { Suspense } from "react";
import TablaRecaudoRedes from "@/app/components/radicacion/convenioServicios/recaudo/TablaRecaudoRedes";
import { RecaudoOficinaSkeleton } from "@/app/components/skeletons";
import { redirect } from "next/navigation";


export default  function Page() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/perfil')}

    const rolActivo = cookies().get('rol')?.value

    if ((rolActivo) === undefined || (rolActivo) === '') redirect('//login/perfil')

    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">
        <main className="  flex-grow">
            <div className={`border-2 w-full py-4 bg-coomeva_color-grisFondo border-coomeva_color-grisPestaña2 rounded-lg`}>
                <section className="flex flex-row">
                    <div className=" w-full px-2 py-1">
                        <Suspense fallback={<RecaudoOficinaSkeleton />}>
                            <ConvenioRecaudoOficina
                                rolUsuario={rolActivo}
                            />
                        </Suspense>
                    </div>
                </section>

                <section className="flex flex-row">
                    <div className=" w-full px-2 py-1">
                        <Suspense fallback={<RecaudoOficinaSkeleton />}>
                            <ConveniORecaudoPse
                                rolUsuario={rolActivo}
                            />
                        </Suspense>
                    </div>
                </section>

                <section className="flex flex-row">
                    <div className=" w-full px-2 py-1">
                        <Suspense fallback={<RecaudoOficinaSkeleton />}>
                            <ConvenioRecaudoCorresponsal
                                rolUsuario={rolActivo}
                            />
                        </Suspense>
                    </div>
                </section>

                <section className="flex flex-row">
                    <div className=" container px-2 py-1">
                        <Suspense fallback={"cargado ...."}>
                            <ConvenioRecaudoGastosOficina
                                rolUsuario={rolActivo}
                            />
                        </Suspense>
                    </div>
                </section>

                <section className="flex flex-row">
                    <div className=" container px-2 py-1 ">
                        <Suspense fallback={"cargado ...."}>
                            <ConvenioRecaudoGastosPse
                                rolUsuario={rolActivo}
                            />
                        </Suspense>
                    </div>
                </section>

                <section className="flex flex-row">
                    <div className=" w-full px-2 py-1 ">
                        <Suspense fallback={"cargado ...."}>
                            <ConvenioRecaudoSolicitud
                                rolUsuario={rolActivo}
                            />
                        </Suspense>
                    </div>
                </section>

                <section className=" px-4">
                    <TablaRecaudoRedes
                        rolUsuario={rolActivo}
                    />
                </section>

                <section className="flex flex-row">
                    <div className=" w-4/12 px-2 py-1  ">
                        <TipoConvenioServicioPago
                            titulo={"Tipo de convenio"}
                        />
                    </div>
                </section>
            </div>
        </main>
    </section>
}