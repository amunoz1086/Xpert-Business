import { queryRecaudoOficina, queryRecaudoPse } from "@/app/lib/administracion/querys";
import RecaudoOficina from "./RecaudoOficina";
import RecaudoPse from "./RecaudoPse";

export default async function RecaudoOficinaPseServer({ searchParams, filaAffectada }) {

    const listaRecaudoOficina = await queryRecaudoOficina();
    const listaRecaudoPse = await queryRecaudoPse();

    return (
        <>
            <RecaudoOficina listaRecaudoOficina={JSON.parse(listaRecaudoOficina)} searchParams={searchParams} filaAffectada={filaAffectada} />
            <RecaudoPse listaRecaudoPse={JSON.parse(listaRecaudoPse)} searchParams={searchParams} filaAffectada={filaAffectada} />
        </>
    );
};

