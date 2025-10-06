
import { queryGastosDirectosOficina, queryJustificacionOficina } from "@/app/lib/convenios/actions"

import GastosOficina from "./GastosOficina"


export default async function ConvenioRecaudoGastosOficina({  rolUsuario}) {

    const listGastosOficina = await queryGastosDirectosOficina()

    const listGastoJustificacionOficina = await queryJustificacionOficina()

    return (
        <GastosOficina
            listaGastoOfina={JSON.parse(listGastosOficina)}
            listaJustificacionOficina={JSON.parse(listGastoJustificacionOficina)}
            rolUsuario={rolUsuario}
        />
    )
}

