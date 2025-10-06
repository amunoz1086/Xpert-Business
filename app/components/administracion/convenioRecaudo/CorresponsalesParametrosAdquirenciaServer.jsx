import { queryAdquirencia, queryCorresponsales, queryParametrosEfecty } from "@/app/lib/administracion/querys";
import Adquirencia from "./Adquirencia";
import Corresponsales from "./Corresponsales";
import ParametroEfecty from "./ParametroEfecty";
import { queryListarAplica, queryListarEstado } from "@/app/lib/admin/querys/listas";


export default async function CorresponsalesParametrosAdquirenciaServer({ searchParams, filaAffectada }) {

    const listaAdquirencia = await queryAdquirencia();
    const listaParametroEfecty = await queryParametrosEfecty();
    const listaCorresponsales = await queryCorresponsales();
    const listaAplica = await queryListarAplica();
    const listaEstado = await queryListarEstado();

    return (
        <>
            <div className='w-full flex justify-between space-x-8 mt-4'>
                <div className="w-full">
                    <Corresponsales
                        listaCorresponsales={JSON.parse(listaCorresponsales)}
                        listaAplica={JSON.parse(listaAplica)}
                        listaEstado={JSON.parse(listaEstado)}
                        searchParams={searchParams}
                        filaAffectada={filaAffectada}
                    />
                    <ParametroEfecty
                        listaParametroEfecty={JSON.parse(listaParametroEfecty)}
                        searchParams={searchParams}
                        filaAffectada={filaAffectada}
                    />
                </div>
                <Adquirencia
                    listaAdquirencia={JSON.parse(listaAdquirencia)}
                    searchParams={searchParams}
                    filaAffectada={filaAffectada}
                />
            </div>
        </>
    );
};