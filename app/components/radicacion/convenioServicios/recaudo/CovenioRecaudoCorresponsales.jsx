import EstructuraTabla from "@/app/components/share/EstructuraTabla"
import { queryCorresponsales, queryParametrosEfecty } from "@/app/lib/convenios/actions"
import TablaRecaudoCorresponsales from "./TablaRecaudoCorresponsales"


export default async function ConvenioRecaudoCorresponsal({ rolUsuario }) {

    const listRecaudoCorresponsales = await queryCorresponsales()
    const listParametrosEfecty = await queryParametrosEfecty()

    return (
        <EstructuraTabla>
            <TablaRecaudoCorresponsales
                listRecaudoCorresponsales={JSON.parse(listRecaudoCorresponsales)}
                listParametrosEfecty={JSON.parse(listParametrosEfecty)}
                rolUsuario={rolUsuario}
            />
        </EstructuraTabla>
    )
};