'use server'

const restConsultarCatalogos = require('@/app/lib/services/catalogos/fn_restConsultarCatalogos');
import { fnQueryListarCatalogos } from '@/app/lib/admin/catalogos/fnQueryListarCatalogos';
import { insertCatalogoInListas } from '@/app//lib/admin/catalogos/fnInsertCatalogoInListas';

export const fnQueryPoolCatalogos = async () => {

    let responsServer = {};
    let requestServices = {};

    try {

        const resListarCat = JSON.parse(await fnQueryListarCatalogos());
        let countCat = 0;

        if (resListarCat.STATUS === 200) {

            for (const i of resListarCat.DATA) {
                requestServices.catalogo = i.catalogo.trim(); 
                requestServices.idcatalogo = i.idcatalogos;

                const responsServicio = JSON.parse(await restConsultarCatalogos.fn_restConsultarCatalogos(JSON.stringify(requestServices)));

                if (responsServicio.status === 200) {
                    let reqInsert = {
                        "idCatalogo":requestServices.idcatalogo,
                        "catalogo": requestServices.catalogo,
                        "data": responsServicio.data
                    };

                    const resUpdate = JSON.parse(await insertCatalogoInListas(JSON.stringify(reqInsert)));
                    
                    if (resUpdate.STATUS === 200) {
                        countCat++;
                    };
                };

                if (countCat === resListarCat.DATA.length) {
                    break;
                };
            };

            if (countCat === resListarCat.DATA.length) {
                responsServer.status = 200;
            } else {
                responsServer.status = 202;
                responsServer.message = 'No todos los catalagos fueron actualizados';
            };
        };

        return JSON.stringify(responsServer)

    } catch (error) {
        console.log(error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };

};