import EstructuraTabla from "@/app/components/share/EstructuraTabla"
import { queryRecaudoPse } from "@/app/lib/convenios/actions"
import TablaRecuadoPse from "./TablaRecuadoPse"


export default async function ConveniORecaudoPse({rolUsuario}) {

   

    const listRecaudoPse = await queryRecaudoPse()

    return (
       <EstructuraTabla>
            <TablaRecuadoPse 
            listaRecPse={JSON.parse(listRecaudoPse)}
            rolUsuario={rolUsuario}
            />
       </EstructuraTabla>
    )
}

