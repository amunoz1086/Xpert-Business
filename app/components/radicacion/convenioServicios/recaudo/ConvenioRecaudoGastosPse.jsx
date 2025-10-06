import {  queryGastosDirectosPse, queryJustificacionPse } from '@/app/lib/convenios/actions';
import GastosPse from './GastosPse';

export default async function ConvenioRecaudoGastosPse({rolUsuario}) {


    const listConvenioRecaudoPse = await queryGastosDirectosPse()

    const listGastoJustificacionPse = await queryJustificacionPse()

    return (
        <GastosPse
            listaGasPse={JSON.parse(listConvenioRecaudoPse)}
            listaJustificacionPse={JSON.parse(listGastoJustificacionPse)}
            rolUsuario={rolUsuario}
        />
    )
}

