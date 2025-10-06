import { Suspense } from "react";
import { ListadoCampos } from "@/app/components/share/ListadoCampos";
import { queryListarSiNo } from "@/app/lib/admin/querys/listas";
import { useProvider } from "@/app/provider/Providers";
import EncabezadoMenuAdministracion from "@/app/components/headers/administracion/EncabezadoMenuAdministracion";
import TabsBarPjPn from "@/app/components/administracion/camposClientes/TabsBarPjPn";
import { cookies } from "next/headers";
import { queryDataCampos } from "@/app/lib/administracion/querys";


export default async function Perfil() {

    const rolActivo = cookies().get('rol')?.value;
    // if (rolActivo !== 1) return redirect('/login/perfil');

    // Llamada a la consulta de la lista
    const listSiNo = JSON.parse(await queryListarSiNo());

    const dataCampos =(JSON.parse(await queryDataCampos())).DATA.filter(e => e.TIPOCLI=='PN'&&e.nombre=='Perfil');  

    const context = useProvider

    return (
        <section className=" w-full  sm:inline  md:w-[95%]">

        <EncabezadoMenuAdministracion
            urlImage={'cabecera1'}
            title={'CAMPOS'}
            subtitle={'Clientes'}
            enableInput={{ "input1": false, "input2": false }}
            paragraph2={'Definir campo en creación y modificación'}
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
                            tituloPagina="Datos Generales Persona Natural"
                            nombrePrimerCol="Datos PN"
                            tituloFilaDosColTercera="Edición"
                            seccion={'secc1'}
                            formId={'form1'}
                            listSiNo={listSiNo}
                            bodyTabla={dataCampos}
                            idListBody={'idCampo:'}
                            descripcionListBody={'descripcion'}
                            tituloSaltoPagina={[{ id: 2000, numFila: 24, titulo: "RESIDENCIA FISCAL" }]}
                        />

                    </div>
                </section>



            </div>


        </main>

     

    </section>
    );
}
