import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
import BandejaSolicitud from "./BandejaSolicitud";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";


export default function Page({ searchParams }) {

  const headersList = headers()

  const referer = headersList.get('referer')

  if(referer == null) {redirect('/login/perfil')}

  const rolActivo = cookies().get('rol')?.value

  if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil')

  return (
    <section className="w-full  sm:inline  md:w-[95%]  lg:w-[100%]">
    
        <EncabezadoMenuPrincipal
          urlImage={"cabecera3"}
          title={"BANDEJA"}
          subtitle={"Solicitudes Activas"}
          enableInputActividad={true}
          btnConsultar={true}
          iconSearch={true}
          tipoConsulta={"solicitud"}
          placeholderBuscarDocumento={'Documento cliente'}
          perfilActivo={rolActivo}
        />
    
      <main className=" flex-grow">
        <section className=" w-full ">
          <BandejaSolicitud searchParams={searchParams} />
        </section>
      </main>
    </section>
  );
}