import EstructuraTabla from "@/app/components/share/EstructuraTabla"
import { queryServiciosFinancieros } from "@/app/lib/convenios/actions"
import TablaServFinanciero from "./TablaServFinanciero"

export default async function ServicioFinancieroSolicitud({rolUsuario,context}) {

    const listServFinancieros = await queryServiciosFinancieros()

   
    return (
       <EstructuraTabla titulo={'Servicio'} hidden={false} >
        
            <TablaServFinanciero listServFinancieros={JSON.parse(listServFinancieros)} context={context} rolUsuario={rolUsuario}/>

       </EstructuraTabla>
    )
}

