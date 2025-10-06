'use server'

/* MP: funcion para cargar y descargar archivos del bucket s3*/

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';
import path from 'path';

const AWS_REGION = process.env.AWS_S3_REGION;
const AWS_ACCESS_STATUS = valEncode(process.env.AWS_S3_ACCESS_KEY_ID);
const AWS_SECRET_STATUS = valEncode(process.env.AWS_S3_SECRET_ACCESS_KEY);

let AWS_ACCESS;
let AWS_SECRET;

if (AWS_ACCESS_STATUS) {
    //console.log('AWS_ACCESS:', AWS_ACCESS_STATUS)
    AWS_ACCESS = Buffer.from(process.env.AWS_S3_ACCESS_KEY_ID, 'base64').toString('utf-8');
} else {
    //console.log('AWS_ACCESS:', AWS_ACCESS_STATUS)
    AWS_ACCESS = process.env.AWS_S3_ACCESS_KEY_ID;
};

if (AWS_SECRET_STATUS) {
    //console.log('AWS_SECRET:', AWS_SECRET_STATUS)
    AWS_SECRET = Buffer.from(process.env.AWS_S3_SECRET_ACCESS_KEY, 'base64').toString('utf-8');
} else {
    //console.log('AWS_SECRET:', AWS_SECRET_STATUS)
    AWS_SECRET = process.env.AWS_S3_SECRET_ACCESS_KEY;
};


const bucketS3Connect = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS,
        secretAccessKey: AWS_SECRET
    }
});


export const uploadBucketS3 = async (dataDoc, idSolicitud) => {

    let responseUploadBucketS3 = {};

    const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
    const AWS_PATH = process.env.AWS_S3_PATH;

    for (const keys of dataDoc.entries()) {
        const file = dataDoc.get(`${keys[0]}`);
        const fileByte = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileByte);

        try {
            const putCommand = new PutObjectCommand({
                Bucket: AWS_BUCKET_NAME,
                Key: `${AWS_PATH}/${idSolicitud}/${file.name}`,
                Body: fileBuffer
            })

            const responseUpload = await bucketS3Connect.send(putCommand);

            if (responseUpload.$metadata.httpStatusCode === 200) {
                responseUploadBucketS3.status = 200;
            };

        } catch (error) {
            console.error(error);
            responseUploadBucketS3.status = 404;
            responseUploadBucketS3.code = error.Code;
        }
    };

    return JSON.stringify(responseUploadBucketS3);
};


export const downloadBucketS3 = async (idSolicitud, nombreDocumentos) => {

    let nombreArchivos;

    if (Array.isArray(nombreDocumentos)) {
        nombreArchivos = nombreDocumentos.filter(flName => flName !== '');
    } else {
        nombreArchivos = [nombreDocumentos];
    };

    let responseDownloadBucketS3 = {};

    const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
    const AWS_PATH = process.env.AWS_S3_PATH;

    try {

        const paramsBucketListObjects = {
            Bucket: AWS_BUCKET_NAME,
            Prefix: `${AWS_PATH}/${idSolicitud}`
        };

        const listObjects = await bucketS3Connect.send(new ListObjectsV2Command(paramsBucketListObjects));

        if (listObjects.KeyCount === 0) {
            throw new TypeError(404 + ` Directorio /${idSolicitud}, no existe en ${AWS_BUCKET_NAME}`);
        };

        fmkdir(idSolicitud);

        for (let fileName of nombreArchivos) {
            const getCommand = new GetObjectCommand({
                Bucket: AWS_BUCKET_NAME,
                Key: `${AWS_PATH}/${idSolicitud}/${fileName}`
            });

            const responseDownload = await bucketS3Connect.send(getCommand);

            const downloadsDir = path.resolve(process.cwd(), 'public', 'documentos', `${idSolicitud}`);
            const filePath = path.join(downloadsDir, fileName);
            const writeF = fs.createWriteStream(`${filePath}`);

            await responseDownload.Body.pipe(writeF);

            if (responseDownload.$metadata.httpStatusCode === 200) {
                responseDownloadBucketS3.status = 200;
                responseDownloadBucketS3.path = downloadsDir;
            };
        };

    } catch (error) {
        console.error(error);
        responseDownloadBucketS3.status = 404;
        responseDownloadBucketS3.code = error;
    }

    return JSON.stringify(responseDownloadBucketS3);
};


export const deleteBucketS3 = async (idSolicitud) => {

    let responseDeleteBucketS3 = {};

    const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
    const AWS_PATH = process.env.AWS_S3_PATH;

    try {

        const paramsBucketListObjects = {
            Bucket: AWS_BUCKET_NAME,
            Prefix: `${AWS_PATH}/${idSolicitud}`
        };

        const listObjects = await bucketS3Connect.send(new ListObjectsV2Command(paramsBucketListObjects));

        if (listObjects.KeyCount === 0) {
            throw new TypeError(`No se encontro el directorio /${idSolicitud}`);
        };

        for (let obj of listObjects.Contents) {
            const paramsBucketDeleteObject = {
                Bucket: AWS_BUCKET_NAME,
                Key: obj.Key
            };

            const responseDeleted = await bucketS3Connect.send(new DeleteObjectCommand(paramsBucketDeleteObject));

            if (responseDeleted.$metadata.httpStatusCode === 200 || responseDeleted.$metadata.httpStatusCode === 204) {
                responseDeleteBucketS3.status = 200;
            };
        };

    } catch (error) {
        console.error(`No se pudo eliminar el directorio /${idSolicitud}:`, error);
        responseDeleteBucketS3.status = 404;
        responseDeleteBucketS3.message = error.message;
    };

    return JSON.stringify(responseDeleteBucketS3);
};


export const uploadBucketS3Diferidos = async (fileByte, idSolicitud, fileName) => {

    let responseUploadBucketS3 = {};

    const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
    const AWS_PATH = process.env.AWS_S3_PATH;
    const fileBuffer = Buffer.from(fileByte);
    const sizeFile = fileBuffer.byteLength;

    try {
        const parallelUploads3 = new Upload({
            client: bucketS3Connect,
            params: {
                Bucket: AWS_BUCKET_NAME,
                Key: `${AWS_PATH}/${idSolicitud}/${fileName}`,
                Body: fileBuffer,
            },
        })

        parallelUploads3.on("httpUploadProgress", (progress) => {
            if (progress.total === sizeFile) {
                responseUploadBucketS3.status = 200;
            } else {
                throw new Error(`El Archivo ${fileName}, no se termino de cargar`)
            };
        });

        await parallelUploads3.done();


    } catch (error) {
        console.error(error);
        responseUploadBucketS3.status = 404;
        responseUploadBucketS3.code = error.Code;
    }

    return JSON.stringify(responseUploadBucketS3);
};


function valEncode(data) {
    try {
        const dCode = atob(data);
        const eCode = Buffer.from(dCode).toString('base64');
        return eCode === data;

    } catch (error) {
        return true;
    };
};


function fmkdir(dirName) {
    const pathDir = path.resolve(process.cwd(), 'public', 'documentos', `${dirName}`);
    try {
        if (!fs.existsSync(pathDir)) {
            fs.mkdirSync(pathDir);
        };

    } catch (error) {
        console.log(error);
    };
};