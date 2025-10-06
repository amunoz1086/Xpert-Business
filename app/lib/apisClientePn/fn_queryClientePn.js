'use server'

const restConsultarCliente = require("@/app/lib/services/cobis/fn_restConsultas.js");
import{parserClientePn} from "@/app/lib/apisClientePn/parserClientePn";

export const queryClientePn = async (req) => {

    const dataClientePn = {};

    try {

        const resDataCliente = JSON.parse(await restConsultarCliente.fn_restConsultarCliente(req));
        
        if (resDataCliente.data.status === '200') {
            const resParserDataCliente = await parserClientePn(JSON.stringify(resDataCliente));
            dataClientePn.state = 200;
            dataClientePn.data = resParserDataCliente;
        } else {
            dataClientePn.state = 204;
            dataClientePn.message = `${resDataCliente.data.message}`;
        };

        return JSON.stringify(dataClientePn);

    } catch (e) {
        console.error('Error_queryCliente:', e);
        dataClientePn.state = 400;
        dataClientePn.message = e.message;
        return JSON.stringify(dataClientePn);
    };
};