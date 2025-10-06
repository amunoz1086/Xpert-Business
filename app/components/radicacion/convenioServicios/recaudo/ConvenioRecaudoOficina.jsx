import { queryRecaudoOficina } from "@/app/lib/convenios/actions"
import TablaRecaudoOficina from "./TablaRecaudoOficina"


export default async function ConvenioRecaudoOficina({rolUsuario}) {

    const listConvenioRecaudoOficina =await queryRecaudoOficina()

    return (
        <div className="p-1  h-full w-full relative ">
          <TablaRecaudoOficina 
          listaRecOficina={JSON.parse(listConvenioRecaudoOficina)}
          rolUsuario={rolUsuario}
          />
        </div>
    )
}






