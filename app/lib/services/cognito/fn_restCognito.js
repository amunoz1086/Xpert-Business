/* MP: fn_restCognito, funcion para conectase a la API Cognito y generar un token */

const https = require('https');
const fs = require('fs');


async function fn_restCognito() {

    let json_data = {};
    let response_json_data;

    try {

        const COGNITO_USU_STATUS = await valEncode(process.env.AUT_COGNITO_USU);
        const COGNITO_PASS_STATUS = await valEncode(process.env.AUT_COGNITO_PASS);

        let COGNITO_USU;
        let COGNITO_PASS;

        if (COGNITO_USU_STATUS) {
            COGNITO_USU = Buffer.from(process.env.AUT_COGNITO_USU, 'base64').toString('utf-8');
        } else {
            COGNITO_USU = process.env.AUT_COGNITO_USU;
        };

        if (COGNITO_PASS_STATUS) {
            COGNITO_PASS = Buffer.from(process.env.AUT_COGNITO_PASS, 'base64').toString('utf-8');
        } else {
            COGNITO_PASS = process.env.AUT_COGNITO_PASS;
        };

        const COGNITO_HOST = process.env.URL_HOST_COGNITO;
        const COGNITO_PATH = process.env.URL_PATH_COGNITO;
        const COGNITO_AUTH = Buffer.from(`${COGNITO_USU.toString().trim()}:${COGNITO_PASS.toString().trim()}`).toString('base64');

        const PROTOCOL = (https ? 'https' : 'http');
        const externalUrl = `${PROTOCOL}://${COGNITO_HOST.trim()}${COGNITO_PATH.trim()}`;

        console.log(`✅ External API URL: ${externalUrl}`);
        console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);


        const options = {
            'method': 'POST',
            'hostname': COGNITO_HOST.toString().trim(),
            'path': COGNITO_PATH.toString().trim(),
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${COGNITO_AUTH}`,
                'Cookie': 'XSRF-TOKEN=cc58f7c6-650e-421b-9522-8bbb8693b0c3'
            },
            'maxRedirects': 20
        };

        let promise = new Promise(function (resolve, reject) {
            const req = https.request(options, function (res) {
                let chunks = [];
                json_data.status = res.statusCode;

                if (res.statusCode === 200) {
                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
                    res.on("end", function (chunk) {
                        let body = Buffer.concat(chunks);
                        json_data.status = res.statusCode;
                        json_data.rawData = body.toString();
                        resolve(json_data);
                    });
                } else {
                    res.on('data', function (chunk) {
                        json_data.status = res.statusCode;
                        json_data.message = 'error en la estructura json';
                        reject(json_data);
                    });
                };
            }).on('error', (error) => {
                console.log(error);
                json_data.status = error.errno;
                json_data.code = error.code;
                json_data.message = error.message;
                reject(json_data);
            });

            req.end();
        });

        await promise
            .finally(() => console.log(`integration Cognito status: ${json_data.status}`))
            .then(result => {
                response_json_data = JSON.stringify(result);
            })
            .catch(error => {
                console.log(error);
                response_json_data = JSON.stringify(error);
            });

    } catch (error) {
        console.log('Error Servicio Cognito:', error)
    }

    return response_json_data;
};

module.exports = {
    "fn_restCognito": fn_restCognito,
};


async function valEncode(data) {
    try {

        const dCode = atob(data);
        const eCode = Buffer.from(dCode).toString('base64');
        return eCode === data;

    } catch (error) {
        return true;
    };
};