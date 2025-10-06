import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import EncabezadoMenuAdministracion from "@/app/components/headers/administracion/EncabezadoMenuAdministracion";
//import { Suspense } from "react";
import { useProvider } from "@/app/provider/Providers";
import { ListarUsuariosApp } from "@/app/components/administracion/usuarios/ListarUsuariosApp";
import { fnQueryListarCargos } from "@/app/lib/admin/usuarios/queryListarCargo";
import { fnQueryListarRegional } from "@/app/lib/admin/usuarios/queryListarRegional";
import { fnQueryListarOficinas } from "@/app/lib/admin/usuarios/queryListarOficinas";
import { fnQueryListarCanal } from "@/app/lib/admin/usuarios/queryListarCanal";
import { fnQueryListarPerfil } from "@/app/lib/admin/usuarios/queryListarPerfil";
import { fnQueryListarTipoAprobador } from "@/app/lib/admin/usuarios/queryListarTipoAprobador";
import { queryListTipoParametrizador } from "@/app/lib/admin/usuarios/queryListTipoParametrizador";
import { queryListPerfilCliente } from "@/app/lib/admin/usuarios/queryListPerfilCliente";
import { fnQueryListarUsuarios } from "@/app/lib/admin/usuarios/queryListarUsuarios";
import { fnQueryListarOpcionProducto } from "@/app/lib/admin/usuarios/queryListarOpcionesProducto";


export default async function Usuarios({ searchParams }) {

    const headersList = headers();
    const referer = headersList.get('referer');
    if (referer == null) { redirect('/login/administracion') };

    let lista;
    let listasRegional;
    let listasOficinas;
    let listasCanal;
    let listasPerfil;
    let perfilClientes;
    let listasAprobador;
    let listasParametrizador;
    let listUusuarios;
    let listOpcionProducto;

    try {

        lista = await fnQueryListarCargos();
        listasRegional = await fnQueryListarRegional();
        listasOficinas = await fnQueryListarOficinas();
        listasCanal = await fnQueryListarCanal();
        listasPerfil = await fnQueryListarPerfil();
        perfilClientes = await queryListPerfilCliente();
        listasAprobador = await fnQueryListarTipoAprobador();
        listasParametrizador = await queryListTipoParametrizador();
        listUusuarios = JSON.parse(await fnQueryListarUsuarios());
        listOpcionProducto = JSON.parse(await fnQueryListarOpcionProducto());

    } catch (error) {
        console.log('🛑 Error al cargar listas de Usuarios', error);
    };



    // const listafiltrada = listaUsuarios({ id: searchParams?.q || '' });
    const rolActivo = cookies().get('rol')?.value;
    // if (rolActivo !== 1) return redirect('/login/perfil');
    const context = useProvider

    return <section className=" w-full   sm:inline  md:w-[95%] ">

        <EncabezadoMenuAdministracion
            urlImage={'cabecera3'}
            title={'MENÚ'}
            subtitle={'Administrador'}
            paragraph={'Digite el ID del usuario para consultar su información.'}
            enableInput={{ "input1": true }}
            btnConsultar={true}
            btnNuevo={true}
            btnEditar={true}
            btnCancelar={true}
            iconSearch={true}
            perfilActivo={rolActivo}
        />

        <main className="h-[55vh]">

            <ListarUsuariosApp
                botom={searchParams?.o || ''}
                documento={searchParams?.q || ''}
                listarcargo={lista.cargos}
                listarregional={listasRegional.regional}
                listaroficinas={listasOficinas.oficinas}
                listarcanal={listasCanal.canal}
                listarperfil={listasPerfil.perfil}
                listarperfilclientes={perfilClientes}
                listartipoaprobador={listasAprobador.aprobador}
                listarparametrizador={listasParametrizador}
                listUusuarios={listUusuarios?.status == 200 ? listUusuarios.data : []}
                listOpcionProducto={listOpcionProducto.data}
            />
        </main>
    </section>
};