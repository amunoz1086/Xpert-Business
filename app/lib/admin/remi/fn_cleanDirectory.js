'use server'

/* MP: Funcion para limpiar el directorio*/

import { readdir, rm } from 'fs/promises';
import path from 'path';

export const rmFile = async (pathDir) => {

    const files = await readdir(pathDir);
    let rmResult = {};

    const rmFiles = new Promise(function (resolve, reject) {

        try {
            for (let i of files) {
                rm(path.join(pathDir, i), { recursive: true });
            };
            resolve(true);
        } catch (error) {
            reject(error);
        };
    });

    rmFiles
        .then(result => {
            rmResult.status = result;
        })
        .catch(error => {
            console.log(error)
            rmResult.status = false;
        });

    return JSON.stringify(rmResult);
};