'use server'


const restConsultarCuentas = require("@/app/lib/services/cobis/fn_restConsultas.js");


export const queryCuentas = async (req) => {

    const { acountType } = JSON.parse(req);
    const dataCuenta = {};

    try {
        // Llamada al servicio
        const rawRes = await restConsultarCuentas.fn_restConsultarCuentas(req);

        const resDataCuenta = typeof rawRes === 'string'
            ? JSON.parse(rawRes)
            : rawRes;


        // Validar estructura
        const statusCode = resDataCuenta?.data?.status;
        if (statusCode === '200' || statusCode === 200) {

            const rawProductInstance = resDataCuenta?.data?.operationData?.ProductInstance;
            let cuentasFiltradas = [];

            if (rawProductInstance.length === 0) {
                throw new Error('No se encontraron cuentas para el cliente, seleccione otra forma de recepción o de pago');
            };

            //Consultar Cuentas Corriente
            if (acountType === 'CTE') {
                for (let i of rawProductInstance) {
                    if (i.AccountStatus === "ACTIVA" && (i.AccountSubType === "20" || i.AccountSubType === "47" || i.AccountSubType === "49")) {
                        const listarCuenta = {
                            code: i.InternalProductID,
                            value: i.AccountID,
                            acountType: i.AccountSubType
                        };
                        cuentasFiltradas.push(listarCuenta);
                    };
                };
            };

            //Consultar Cuentas Ahorros
            if (acountType === 'AHO') {
                for (let i of rawProductInstance) {
                    if (i.AccountStatus === "ACTIVA" && (i.AccountSubType === "21" || i.AccountSubType === "46" || i.AccountSubType === "48" || i.AccountSubType === "51" || i.AccountSubType === "55")) {
                        const listarCuenta = {
                            code: i.InternalProductID,
                            value: i.AccountID,
                            acountType: i.AccountSubType
                        };
                        cuentasFiltradas.push(listarCuenta);
                    };
                };
            };

            dataCuenta.state = 200;
            dataCuenta.data = validarCuentasFiltradas(cuentasFiltradas);

        } else if (statusCode === '400' || statusCode === 400) {
            dataCuenta.state = 204;
            dataCuenta.message = `Code: ${statusCode}-. ${resDataCuenta.data.operationData.msjRespuesta}.`;
        } else {
            dataCuenta.state = parseInt(statusCode, 10) || 500;
            dataCuenta.message = `Code: ${statusCode}-. ${resDataCuenta.data.operationData.msjRespuesta}`;
        };

        return JSON.stringify(dataCuenta);

    } catch (e) {
        console.error('Error_queryCuenta:', e);
        dataCuenta.state = 400;
        dataCuenta.message = e.message;
        return JSON.stringify(dataCuenta);
    };
};


function validarCuentasFiltradas(pCuentasFiltradas) {
    if (pCuentasFiltradas.length === 0) {
        throw new Error('Cliente no dispone de cuentas del tipo seleccionado, seleccione otra forma de recepción o de pago');
    };

    return pCuentasFiltradas;
};