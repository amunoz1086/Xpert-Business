import { fn_restConsultarParticipantes } from '@/app/lib/services/cobis/fn_restConsultas';
import { NextResponse } from 'next/server';


export const POST = async (request) => {
    try {
        
        const { reqData } = await request.json();

        /* if (!Array.isArray(reqData)) {
            return NextResponse.json({ error: 'Grupo inválido' }, { status: 400 });
        } */

        //const resultados = await Promise.all(
            //grupo.map(async (item) => {
                try {
                    const raw = await fn_restConsultarParticipantes({
                        customerReference: reqData.customerReference,
                        customerType: reqData.customerType,
                    });

                    console.log('### rawConsultaParticipante:', 200);
                    const rawData = JSON.stringify(raw)
                    return NextResponse.json({ rawData });

                    //return JSON.stringify(raw);

                } catch (err) {
                    return { error: err.message, customerReference: reqData.CustomerReference };
                }
            //})
        //);

        //return NextResponse.json({ grupo: resultados });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Error interno: ' + err.message }, { status: 500 });
    }
};