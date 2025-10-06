'use server';

import { fetchLists } from "@/app/lib/utils";
import {
    queryListarTipoPromedio, queryListarTipoCapitalizacion, queryListarSiNo, queryListaTipoCuenta,
    queryListaOrigenFondos, queryListaRazonApertura
} from '@/app/lib/admin/querys/listas';
import {
    queryListRol, queryListarTipoCliente, queryListDocumentoPj, queryListDocumentoPn, queryListProducto, queryTipoMoneda, queryListCategoria,
    queryListOrigen, queryListOficiales, queryListTitularidad, queryListTipoSociedad, queryListProductoCorriente, queryListProductoAhorro,
    queryListProductoCDT, queryListFormaPago, queryListOficinasFisicas, queryListFrecuenciaPago, queryListCategoriaPlazo,
    queryListFormaRecepcionPago
} from '@/app/lib/menuPrincipal/actions';


export const fn_catalogosPropietarios = async () => {

    const listas = await fetchLists({
        listarRolPropietarios: queryListRol, //Propietarios
        listarTipoCliente: queryListarTipoCliente,
        listTipoDocumentoPj: queryListDocumentoPj,
        listTipoDocumentoPn: queryListDocumentoPn,
        listTipoSociedad: queryListTipoSociedad,
        listProducto: queryListProducto, //Operacion
        listTipoMoneda: queryTipoMoneda,
        listCategoria: queryListCategoria,
        listarTipoPromedio: queryListarTipoPromedio,
        listarTipoCapitalizacion: queryListarTipoCapitalizacion,
        listOrigen: queryListOrigen,
        listOficiales: queryListOficiales,
        listTitularidad: queryListTitularidad,
        listCorrientePj: queryListProductoCorriente,
        listAhorroPj: queryListProductoAhorro,
        listProductoCDT: queryListProductoCDT, //Operacion CDT
        listFormaPago: queryListFormaPago,
        listFrecuenciaPago: queryListFrecuenciaPago,
        listCategoriaPlazo: queryListCategoriaPlazo,
        listOficinasFisicas: queryListOficinasFisicas,
        listSiNo: queryListarSiNo,
        listTipoCuenta: queryListaTipoCuenta,
        listOrigenFondos: queryListaOrigenFondos,
        listRazonApertura: queryListaRazonApertura,
        listFormaRecepcionPago: queryListFormaRecepcionPago, //Forma Recepcion CDT
        
        
    });

    return JSON.stringify(listas);

};