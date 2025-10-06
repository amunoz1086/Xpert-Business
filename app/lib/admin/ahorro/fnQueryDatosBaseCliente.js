'use server'

import { queryClientePj } from "@/app/lib/apisClientePj/actions";

export const queryDatosBaseCliente = async (req) => {

    let responsServer = {};

    try {

        if (req === undefined) {
            responsServer.STATUS = 205;
            responsServer.MESSAGE = `El Nit esta vacio`;
            return JSON.stringify(responsServer);
        };

        const res = JSON.parse(await queryClientePj(req));

        switch (res.state) {
            case 200: {
                let clientData = {
                    "nit": res.data[0].NIT,
                    "razonSocial": res.data[0].razonSocial,
                };

                responsServer.STATUS = 200;
                responsServer.DATA = clientData;
                break;
            }
            case 204: {
                responsServer.STATUS = 204;
                responsServer.MESSAGE = `No se encontro a un cliente con el Nit: ${req}`;
                break;
            }
            default:
                break;
        };

        return JSON.stringify(responsServer);

    } catch (error) {
        responsServer.STATUS = 500;
        return JSON.stringify(responsServer);
    };
};