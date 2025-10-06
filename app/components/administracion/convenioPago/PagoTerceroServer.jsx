import { queryPagoTerseros } from "@/app/lib/administracion/querys";
import PagoTerceros from "./PagoTerceros";

export default async function PagoTerceroServer({searchParams,filaAffectada}) {

    const listaPagosTerceros = await queryPagoTerseros()

    return (
        <>
            <PagoTerceros 
            listaPagosTerceros={JSON.parse(listaPagosTerceros)} 
            searchParams={searchParams}
             filaAffectada={filaAffectada}
             />
        </>
    )
}

