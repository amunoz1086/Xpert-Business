
import BtnControl from "@/app/components/radicacion/cliente/BtnControl";
import ServicioFinancieroSolicitud from "@/app/components/radicacion/convenioServicios/serFinancieros/ServicioFinancieroSolicitud";
import TipoConvenio from "@/app/components/radicacion/convenioServicios/serFinancieros/TipoConvenio";
import Loading from "@/app/components/share/Loading";
import { useProvider } from "@/app/provider/Providers";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Page() {

    const headersList = headers()
    const referer = headersList.get('referer')

    if (referer == null) { redirect('/login/perfil') }

    const rolActivo = cookies().get('rol')?.value

    if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil')

    const context = useProvider

    return <section className="w-full  sm:inline  md:w-[95%]  lg:w-[95%]">

        <main className="flex-grow">
            <div className={`border-2 w-full py-4 bg-coomeva_color-grisFondo border-coomeva_color-grisPestaña2 rounded-lg`}>
                <section className="">
                    <div className=" px-2 py-1">
                        <Suspense fallback={<Loading />}>
                            <ServicioFinancieroSolicitud rolUsuario={rolActivo} context={context} />
                        </Suspense>
                    </div>
                    {/* <div className=" w-2/6 px-2 py-1 ">
                        <div className="w-full ">
                            <TipoConvenio
                                id={"tipoConvenioservicio"}
                                context={context}
                                titulo={"Observaciones"}
                                descripcion={"Presentación del Convenio para el Ente de Aprobación"}
                                dimensionTextArea={{
                                    // columna: 45,
                                    fila: 7
                                }}
                                rolUsuario={rolActivo}
                            />
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <BtnControl
                                name="Adicionar Cuenta Remunerada"
                                url={'/radicacion/depositoVista'}
                                validarCampos={true}
                                enableButton={false}
                                frmId={'fromServicioFinanciero'}
                                frmId2={'formTipoConvenio'}
                                opcion={'adicionarCuentaResumen'}
                            />
                            <BtnControl
                                name="Resumen Operación      "
                                url={'/radicacion/resumen'}
                                enableButton={true}
                                frmId={'fromServicioFinanciero'}
                                frmId2={'formTipoConvenio'}
                                opcion={'adicionarCuentaResumen'}
                                validarCampos={true}
                                paddingX={true}
                            />
                        </div>
                    </div> */}
                </section>
            </div>
        </main>
    </section>
};