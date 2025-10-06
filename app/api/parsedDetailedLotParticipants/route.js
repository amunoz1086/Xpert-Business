import { parsedParticipantePn, parsedParticipantePj } from '@/app/lib/apisClientePj/parsedParticipantes';
import { NextResponse } from 'next/server';


export const POST = async (request) => {
    try {
        const { reqParsed } = await request.json();

        if (reqParsed.tipo === 'PN') {

            const rawPn = await parsedParticipantePn(reqParsed);
            console.log('### rawSerializacion PN:', 200);

            const resultados = JSON.stringify(rawPn);
            return NextResponse.json({ resultados });

        } else if (reqParsed.tipo === 'PJ') {

            const rawPj = await parsedParticipantePj(reqParsed);
            console.log('### rawSerializacion PJ:', 200);

            const resultados = JSON.stringify(rawPj);
            return NextResponse.json({ resultados });

        }

    } catch (err) {
        console.log('###', err)
        return NextResponse.json({ error: 'Error interno: ' + err.message }, { status: 500 });
    };

};