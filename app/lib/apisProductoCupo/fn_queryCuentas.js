'use server'


const restConsultarCuentas = require("@/app/lib/services/cobis/fn_restConsultas.js");
import { queryListProductoCorriente } from "@/app/lib/menuPrincipal/actions"

export const queryCuentas = async (req) => {

    const dataCuenta = {};

    try {
        // Llamada al servicio
        const rawRes = await restConsultarCuentas.fn_restConsultarCuentas(req);
        
        const resDataCuenta = typeof rawRes === 'string'
            ? JSON.parse(rawRes)
            : rawRes;

        console.log("##Response Cuentas", resDataCuenta)

        // Validar estructura
        const statusCode = resDataCuenta?.data?.status;
        if (statusCode === '200' || statusCode === 200) {

            const rawProductInstance = resDataCuenta?.data?.operationData?.ProductInstance;
            let cuentasFiltradas = [];

            const catalogoSubproductoCorriente = await queryListProductoCorriente();
            const parsedSubpoducto = parsed(catalogoSubproductoCorriente);


            if (rawProductInstance.length === 0) {
                throw new Error('No se encontraron cuentas para el cliente')
            };

            for (let i of rawProductInstance) {
                if (i.AccountStatus === "ACTIVA" && (i.AccountSubType === "20" || i.AccountSubType === "50")) {
                    let subType = parsedSubpoducto.filter(elemen => elemen?.code === i?.AccountSubType);
                    i.AccountSubType = `${i.AccountSubType}-${subType[0]?.value}`;
                    i.AccountShortName = i.AccountShortName.slice(0, 10);
                    cuentasFiltradas.push(i);
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
        }

        return JSON.stringify(dataCuenta);

    } catch (e) {
        console.error('Error_queryCuenta:', e);
        dataCuenta.state = 400;
        dataCuenta.message = e.message;
        return JSON.stringify(dataCuenta);
    }
};


function parsed(pPasedSubproducto) {
    if (typeof (pPasedSubproducto) === 'string' && pPasedSubproducto.length > 0) {
        return JSON.parse(pPasedSubproducto).DATA
    };

    return [null];
};


function validarCuentasFiltradas(pCuentasFiltradas) {
    if (pCuentasFiltradas.length === 0) {
        throw new Error('Cliente no tiene cuentas validas para la operación de asignación')
    };

    return pCuentasFiltradas
}