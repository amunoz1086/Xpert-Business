'use client'

import { queryBuzon, deleteBuzon, deleteBD, closeBD } from "@/app/lib/services/localBd/indexedDB";
import { queryInsertBuzo } from "@/app/lib/solicitudes/queryInsertBuzo";
import { uploadBucketS3Diferidos } from "@/app/lib/documentos/bucketS3Pool";

export const cargaDocumentosDiferidos = async (idSolicitud) => {

    let responseCarga = {};

    try {
        const dataBuzonLocal = await queryBuzon();
        if (dataBuzonLocal.status === 200) {
            const resExistencias = await validarExistencias(dataBuzonLocal);
            if (resExistencias > 0) {
                await insertDataBuzon(dataBuzonLocal, idSolicitud);
                await upFileBuzon(dataBuzonLocal, idSolicitud);
            };
        };

    } catch (error) {
        console.error('error:', error);
        responseCarga.status = 404;
    };

    return JSON.stringify(responseCarga);
};


async function validarExistencias(dbBuzonLocal) {
    const dBuzonLocal = dbBuzonLocal.contains;
    return dBuzonLocal.length;
};


async function insertDataBuzon(insertBuzonLocal, idSolicitud) {
    let resInsertBuzon;
    const insertDBuzonLocal = insertBuzonLocal.contains;

    for (const keys of insertDBuzonLocal) {
        let dataDoc = {};

        dataDoc.name = keys.buzonName
        dataDoc.file = keys.fileName;
        dataDoc.idSolicitud = idSolicitud;
        resInsertBuzon = await queryInsertBuzo(JSON.stringify(dataDoc));
    };

    return resInsertBuzon;
};


async function upFileBuzon(upBuzonLocal, idSolicitud) {
    let resUpBuzon;
    const upDBuzonLocal = upBuzonLocal.contains;
    const directoryName = `Buzon_${idSolicitud}`;

    for (const file of upDBuzonLocal) {
        resUpBuzon = await uploadBucketS3Diferidos(file.contenido, directoryName, file.fileName);
    };

    if (JSON.parse(resUpBuzon).status === 200) {
        await deleteTemporales();
    };
};


async function deleteTemporales() {
    await deleteBuzon();
};