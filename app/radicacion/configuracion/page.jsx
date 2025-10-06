import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
import { ClienteConfiguracion } from "@/app/components/radicacion/configuracion/ClienteConfiguracion";
import { queryListarNaturaleza, queryListarSiNo, queryListarTipoCuenta } from "@/app/lib/admin/querys/listas";
import { getSession } from "@/app/lib/auth/auth";
import { queryNegociarNomina } from "@/app/lib/convenios/actions";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Page() {

    const headersList = headers()

    const referer = headersList.get('referer')

    if(referer == null) {redirect('/login/perfil')}

    const rolActivo = cookies().get('rol')?.value

    if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil')

    const listSiNo = JSON.parse(await queryListarSiNo())
    const listTipoCuenta = JSON.parse(await queryListarTipoCuenta())
    const listNaturalezaJuridica = JSON.parse(await queryListarNaturaleza())
    const listNegociarNomina = await queryNegociarNomina()
    const usuario = await getSession()

    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[95%] ">

        <EncabezadoMenuPrincipal
            urlImage={'cabecera1'}
            title={'CONFIGURACIÓN'}
            subtitle={'Documentos de convenio'}
            enableInput={{ "input1": true, "input2": true }}
            convenioNegociar={"Recuado"}
            tipoConv={'Nuevo'}
            perfilActivo={rolActivo}
        />


        <ClienteConfiguracion
            rolActivo={rolActivo}
            listNaturalezaJuridica={listNaturalezaJuridica}
            listSiNo={listSiNo}
            listTipoCuenta={listTipoCuenta}
            usuario={usuario}
            listNegociarNomina={listNegociarNomina}
        />

    </section>

}