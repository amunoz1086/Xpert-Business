'use server'

import fs from 'fs';
import path from 'path';

export const deletePublicDoc = async (idSolicitud) => {

    let responseDelete = {};

    try {

        const loadsDir = path.resolve(process.cwd(), 'public', 'documentos', `${idSolicitud}`);
        fs.rm(loadsDir, { recursive: true, force: true }, err => {
            if (err) {
                //throw err;
                console.error('No fue posible eliminar los archivos temporales:', err);
                responseDelete.status = 404;
            } else {
                console.log('Archivos temporales eliminados');
                responseDelete.status = 200;
            };
        });

    } catch (error) {
        console.error('error:', error);
        responseDelete.status = 404;
    };

    return JSON.stringify(responseDelete);
};