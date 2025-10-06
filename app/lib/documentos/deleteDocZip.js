'use server'

import fs from 'fs';
import path from 'path';


export const deleteDocZip = async (idSolicitud) => {

    let responseDelete = {};

    try {

        const directoryZip = path.resolve(process.cwd(), 'public', 'documentos');
        const filePath = path.join(directoryZip, idSolicitud + '.zip');

        fs.unlink(filePath, (err => {
            if (err) throw err;
            else {
                console.log('deleteDocZip:', 'Directorio limpiado');
                responseDelete.status = 200;
            };
        }));

    } catch (error) {
        console.error(error);
        responseDelete.status = 404;
    };

    return JSON.stringify(responseDelete);
};