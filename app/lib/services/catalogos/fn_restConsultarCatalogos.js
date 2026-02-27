const http = require('http');
const fs = require('fs');
const { randomUUID } = require('crypto');
const { getSession } = require('@/app/lib/auth/auth');
const keycloakqa = require('@/app/lib/services/cognito/fn_restKeycloakqa');

async function fn_restConsultarCatalogos(dataReques) {

    const { catalogo } = JSON.parse(dataReques);

    const CAT_HOST = process.env.URL_HOST_CATALOGO;
    const CAT_PORT = process.env.URL_PORT_CATALOGO;
    const CAT_PATH = process.env.URL_PATH_CATALOGO;

    const PROTOCOL = (http ? 'http' : 'https');
    const externalUrl = `${PROTOCOL}://${CAT_HOST.trim()}${CAT_PORT ? `:${CAT_PORT.trim()}` : ''}${CAT_PATH.trim()}`;

    console.log(`✅ External API URL: ${externalUrl}`);
    console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);

    const token = JSON.parse(await keycloakqa.fn_restKeycloakqa());
    const access_token = token.data.access_token;
    const token_type = token.data.token_type;

    const usuario = (await getSession()).userBACK.user;

    const options = {
        'method': 'POST',
        'hostname': `${CAT_HOST}`,
        'port': CAT_PORT,
        'path': `${CAT_PATH}`,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `${token_type} ${access_token}`
        },
        'maxRedirects': 20
    };

    let json_data = {};
    let response_json_data = {};

    try {

        let promise = new Promise(function (resolve, reject) {

            const req = http.request(options, function (res) {
                const chunks = [];
                json_data.status = res.statusCode;

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function (chunk) {
                    const body = Buffer.concat(chunks);
                    resolve(body.toString());
                });

                res.on("error", function (error) {
                    reject(error);
                });
            });

            const postData = JSON.stringify({
                "header": {
                    "messageId": `${randomUUID()}`,
                    "timestamp": new Date().toISOString(),
                    "originatingBank": process.env.ORINATINGBANK,
                    "authToken": `${token_type} ${access_token}`,
                    "callbackUrl": process.env.CALLBACKURL,
                    "requestType": "transfer",
                    "transactionId": 'txn-' + Date.now()
                },
                "metadata": {
                    "priority": process.env.PRIORITY,
                    "serviceLevelAgreement": process.env.SERVICELEVELAGREEMENT,
                    "processingMode": process.env.PROCESSINGMODE
                },
                "deviceContext": {
                    "deviceId": 'device-' + Date.now(),
                    "deviceType": 'server',
                    "osVersion": process.version,
                    "ipAddress": "127.0.0.1",
                    "macAddress": "00:1B:44:11:3A:B7",
                    "geoLocation": {
                        "latitude": "0.0000",
                        "longitude": "0.0000"
                    },
                    "clientApp": {
                        "appName": process.env.APPNAME,
                        "appVersion": process.env.APPVERSION,
                        "userAgent": `${usuario}`
                    }
                },
                "operationData": {
                    "catalog": `${catalogo.trim()}`
                }
            });

            req.write(postData);
            req.end();

        });

        await promise
            .finally(() => console.log(`Catálogo ${catalogo.trim()} status: ${json_data.status}`))
            .then(result => {
                let resultParser = JSON.parse(result);
                response_json_data.status = json_data.status;
                response_json_data.data = resultParser.operationData.catalogs;
            })
            .catch(error => {
                console.log(error)
                throw (error);
            });

        return JSON.stringify(response_json_data);

    } catch (error) {
        console.log(`❌ External API URL: ${externalUrl}`);
        console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);
        console.log(error);
    };
};

module.exports = {
    "fn_restConsultarCatalogos": fn_restConsultarCatalogos,
};