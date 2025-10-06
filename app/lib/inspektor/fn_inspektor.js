'use server'

const restInspektor = require("@/app/lib/services/inspektor/fn_restInspektor");

export const fnInspektor = async (req) => {

    const { documentNumber } = JSON.parse(req);
    const dataInspektor = {};

    try {

        const resDataInspektor = JSON.parse(await restInspektor.fn_restInspektor(req));

        if (resDataInspektor.data.status === '200') {
            const inhibitoryReferen = resDataInspektor.data.operationData.inhibitoryReference

            if (!inhibitoryReferen.match) {
                dataInspektor.state = resDataInspektor.data.status;
                dataInspektor.authorized = true;
                dataInspektor.message = `Documento ${documentNumber}, no se encuentra en listas restrictivas`;
            } else {
                dataInspektor.state = 204;
                dataInspektor.authorized = false;
                dataInspektor.message = `Documento ${documentNumber} se encuentra en almenos una listas restrictivas`;
                dataInspektor.listReference = JSON.stringify(inhibitoryReferen.matchList);
            };

        } else {
            dataInspektor.state = resDataInspektor.data.status;
            dataInspektor.authorized = true;
            dataInspektor.message = `Servicio Inspecktor: ${resDataInspektor.data.message}`;
        };

        return JSON.stringify(dataInspektor);

    } catch (e) {
        console.error('Error fnInspektor:', e);
        dataInspektor.state = 400;
        dataInspektor.authorized = true;
        dataInspektor.message = e.message;
        return JSON.stringify(dataInspektor);
    };
};