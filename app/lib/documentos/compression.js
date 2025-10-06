'use server'

import path from "path";
import fs from "fs";
import archiver from "archiver";

export const compression = async (idSolicitud) => {

    const directory = path.resolve(process.cwd(), 'public', 'documentos', `${idSolicitud}`);
    const directoryZip = path.resolve(process.cwd(), 'public', 'documentos');
    const filePath = path.join(directoryZip, idSolicitud + '.zip');

    let responseCompression = {};

    try {

        const output = fs.createWriteStream(filePath);
        const archive = archiver("zip", {
            zlib: { level: 9 },
        });

        output.on("close", () => {
            console.log(`${archive.pointer()} total bytes written to ${filePath}`);
            responseCompression.status = 200;
        });

        output.on("error", (err) => {
            console.error("Error en el flujo de escritura:", err);
            responseCompression.status = 404;
        });

        archive.pipe(output);
        archive.directory(directory, false);
        await archive.finalize();
        /* archive.on("error", function (err) {
            throw new Error(404);
        }); */

        responseCompression.status = 200;

    } catch (error) {
        console.error('Error durante la compresión::', error);
        responseCompression.status = 404;
    };
    console.log(responseCompression);
    return JSON.stringify(responseCompression);
};