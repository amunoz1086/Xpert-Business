'use server'

/* MP: Funcion para leer el archivo remi y tranformarlo a Json.*/

import { readFile } from 'fs/promises';
import { insertDataRemi } from '../remi/fn_insertDataRemi';

export const readFileRemi = async (pathFile) => {

    let responsServer = {};

    try {
        let dataFile = [];
        let dataFileParser = [];
        const fileContents = await readFile(pathFile, { encoding: 'utf8' });
        fileContents.split('\n').forEach(line => {
            dataFile.push(line.trim());
        });

        const [HeadData, ...BodyData] = dataFile;
        const arrayHeadData = (HeadData.replace(/\s/g, '')).toLowerCase().split(',');
        const arrayBodyData = BodyData.map((body) => body.split(','));

        let u = [];
        for (let i = 0; i < BodyData.length; i++) {
            let d = BodyData[i].trim();
            u.push(d.match(/"([^"]*)"/));
            if (u[i] && u[i].length > 1) {
                if (arrayBodyData[i].length === 8) {
                    arrayBodyData[i].splice(1, 1);
                    arrayBodyData[i].splice(1, 0, u[i][1]);
                };
                if (arrayBodyData[i].length === 9) {
                    arrayBodyData[i].splice(1, 2);
                    arrayBodyData[i].splice(1, 0, u[i][1]);
                };
                if (arrayBodyData[i].length === 10) {
                    arrayBodyData[i].splice(1, 3);
                    arrayBodyData[i].splice(1, 0, u[i][1]);
                };
                if (arrayBodyData[i].length === 11) {
                    arrayBodyData[i].splice(1, 4);
                    arrayBodyData[i].splice(1, 0, u[i][1]);
                }
                if (arrayBodyData[i].length === 12) {
                    arrayBodyData[i].splice(1, 5);
                    arrayBodyData[i].splice(1, 0, u[i][1]);
                };
            };
        };

        arrayHeadData.unshift('id');

        for (let i = 0; i < arrayBodyData.length; i++) {
            arrayBodyData[i].unshift(i);
        };

        for (let i = 0; i < arrayBodyData.length; i++) {
            dataFileParser.push(await arrToObjectData(arrayHeadData, arrayBodyData[i]));
        };

        responsServer.status = 200;
        responsServer.value = JSON.stringify(dataFileParser);
        
        insertDataRemi(JSON.stringify(dataFileParser));

        return JSON.stringify(responsServer);

    } catch (error) {
        console.log(error);
        responsServer.status = 500;
        responsServer.message = (error.message);

        return JSON.stringify(responsServer);
    };
};

async function arrToObjectData(arrHeader, arrBody) {
    const data = arrHeader.reduce((prevValue, curValue, curIndex,
        arr) => {
        return { ...prevValue, [curValue]: arrBody[curIndex] };
    }, {});

    return data;
};