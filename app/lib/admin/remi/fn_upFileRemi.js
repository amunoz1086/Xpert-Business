'use server'

/* MP: funcion para cargar el archivo remi al servidor */

import { writeFile } from 'fs/promises';
import path from 'path';

export const upFileRemi = async (dataFile) => {

    let responsServer = {};
    const file = dataFile.get('csv');
    const directoryPath = path.resolve(process.cwd(), 'public', 'remiFile');
    const filePath = path.join(directoryPath, file.name);

    try {

        const fileByte = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileByte);
        writeFile(filePath, fileBuffer);

        responsServer.status = 200;
        responsServer.path = filePath;
        responsServer.dirPath = directoryPath;


        return JSON.stringify(responsServer);

    } catch (error) {
        responsServer.status = 500;
        responsServer.message = error

        return JSON.stringify(responsServer);
    };
};