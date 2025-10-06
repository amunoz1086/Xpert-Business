import { cookies } from "next/headers";
//import { redirect } from "next/navigation";
//import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
//import { Suspense } from "react";
import { ListadoCampos } from "@/app/components/share/ListadoCampos";
import { queryListarSiNo } from "@/app/lib/admin/querys/listas";
import EncabezadoMenuAdministracion from "@/app/components/headers/administracion/EncabezadoMenuAdministracion";
import TabsBarPjPn from "@/app/components/administracion/camposClientes/TabsBarPjPn";
import { useProvider } from "@/app/provider/Providers";
import BtnControl from "@/app/components/radicacion/cliente/BtnControl";
import { queryDataCampos } from "@/app/lib/administracion/querys";


export default async function InformacionFinanciera() {

    const rolActivo = cookies().get('rol')?.value;
    // if (rolActivo !== 1) return redirect('/login/perfil');

    const listSiNo = JSON.parse(await queryListarSiNo())

    const dataCampos = (JSON.parse(await queryDataCampos()))?.DATA?.filter(e => e.TIPOCLI == 'Pj' && e.nombre == 'Información Financiera');

    const context = useProvider

    return (
        <section className=" w-full  sm:inline  md:w-[95%] ">

            <EncabezadoMenuAdministracion
                urlImage={'cabecera1'}
                title={'CAMPOS'}
                subtitle={'Clientes'}
                enableInput={{ "input1": false, "input2": false }}
                paragraph2={'Definir campos en creación y modificación'}
                btnDatosGeneralesPJ={true}
                btnGuardar={true}
                perfilActivo={rolActivo}

            />


            <main className=" flex-grow">
                <TabsBarPjPn context={context} />

                <div className={`border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg`}>
                    <section className="flex flex-row">
                        <div className=" w-full px-2 py-1">
                            <ListadoCampos
                                tituloPagina="Información Financiera"
                                seccion={'secc1'}
                                formId={'form1'}
                                listSiNo={listSiNo}
                                bodyTabla={dataCampos}
                                idListBody={'id'}
                                descripcionListBody={'descripcion'}

                            />

                        </div>
                    </section>

                </div>

            </main>

            <section>
                <div className="w-full flex justify-end px-5">
                    <BtnControl
                        btnDefault={true}
                        // bgBoton="bg-transparent"
                        name={"Guardar"}
                        url={''}
                        enableButton={true}
                        opcion={'navegar'}
                        cliente={''}
                    />
                </div>
            </section>
        </section>
    );
};