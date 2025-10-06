import { queryGastosDirectosOficina, queryGastosDirectosPse, queryJustificacionOficina, queryJustificacionPse } from '@/app/lib/administracion/querys';
import JustificacionPse from './JustificacionPse';
import JustificacionOficina from './JustificacionOficina';
import { queryListarSiNo } from '@/app/lib/admin/querys/listas';

export default async function JustificacionOficinaPseServer({ searchParams, filaAffectada }) {

    const listaJustificacionOficina = await queryJustificacionOficina();
    const listaJustificacionPse = await queryJustificacionPse();
    const listaSiNO = await queryListarSiNo();
    const listaGastoDirectosOficina = await queryGastosDirectosOficina();
    const listaGastoDirectoPse = await queryGastosDirectosPse();

    return (
        <>
            <JustificacionOficina
                listaJustificacionOficina={JSON.parse(listaJustificacionOficina)}
                listaSiNO={JSON.parse(listaSiNO)}
                listaGastoDirectosOficina={JSON.parse(listaGastoDirectosOficina)}
                searchParams={searchParams}
                filaAffectada={filaAffectada}
            />
            <JustificacionPse
                listaJustificacionPse={JSON.parse(listaJustificacionPse)}
                listaSiNO={JSON.parse(listaSiNO)}
                listaGastoDirectoPse={JSON.parse(listaGastoDirectoPse)}
                searchParams={searchParams}
                filaAffectada={filaAffectada}
            />
        </>
    );
};