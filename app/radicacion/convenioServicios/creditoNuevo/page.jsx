
// import CreditoNuevo from "@/app/components/radicacion/creditoNuevo/CreditoNuevo"

import { Credito } from "@/app/components/radicacion/creditoNuevo/Credito"
import CreditoNuevoComponent from "@/app/components/radicacion/creditoNuevo/CreditoNuevoComponent"
import { queryListarIbrsTipoCred } from "@/app/lib/admin/credito/queryListarIbrsTipoCred"
import { queryListarRedescuento } from "@/app/lib/admin/credito/queryListarRedescuento"
import { querylistarproducto } from "@/app/lib/admin/querys/listas"
import { fnQueryIbrs, queryListarCoberturaFng } from "@/app/lib/convenios/actions"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"


export default async function Page() {

    const headersList = headers()

    // const referer = headersList.get('referer')

    // if (referer == null) { redirect('/login/perfil') }

    // const rolActivo = cookies().get('rol')?.value

    // if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil')


    const listaIbr = await fnQueryIbrs();

    const listaProducto = await querylistarproducto();

    const listaIbrNueva = await queryListarIbrsTipoCred()


    const listaRedescuento = await queryListarRedescuento()

    const listaCoberturaFng = await queryListarCoberturaFng()


    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">

        <main className="  flex-grow">
            <div className={`border-2 w-full py-4 bg-coomeva_color-grisFondo border-coomeva_color-grisPestaña2 rounded-lg`}>
{/*                
                <CreditoNuevoComponent
                    rolPerfil={rolActivo}
                    listaIbrs={JSON.parse(listaIbr).ibrs}
                    listaProducto={JSON.parse(listaProducto).DATA}
                    listaIbrNueva={JSON.parse(listaIbrNueva).DATA}
                    listaRedescuento={JSON.parse(listaRedescuento).DATA}
                    listaCoberturaFng={JSON.parse(listaCoberturaFng).DATA}
                /> */}

                 <Credito
                   
                /> 

            </div>
        </main>

    </section>
}