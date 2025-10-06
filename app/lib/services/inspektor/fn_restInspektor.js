const https = require('https');
const fs = require('fs');
const { randomUUID } = require('crypto');
const { getSession } = require('@/app/lib/auth/auth');
const keycloakqa = require('@/app/lib/services/keycloak/fn_restKeycloak');

async function fn_restInspektor(dataReques) {

    const { documentType, documentNumber } = JSON.parse(dataReques);

    const INSPEKTOR_HOST = process.env.URL_HOST_INSPEKTOR;
    const INSPEKTOR_PORT = process.env.URL_PORT_INSPEKTOR;
    const INSPEKTOR_path = process.env.URL_PATH_INSPEKTOR;

    const token = JSON.parse(await keycloakqa.fn_restKeycloak());
    const access_token = token.data.access_token;
    const token_type = token.data.token_type;

    let json_data = {};
    let response_json_data = {};

    const usuario = (await getSession()).userBACK.user;

    try {

        const options = {
            'method': 'POST',
            'hostname': `${INSPEKTOR_HOST}`,
            'port': INSPEKTOR_PORT,
            'path': `${INSPEKTOR_path}`,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${token_type} ${access_token}`
            },
            'maxRedirects': 20
        };


        let promise = new Promise(function (resolve, reject) {

            const req = https.request(options, function (res) {
                const chunks = [];
                json_data.status = res.statusCode;

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function (chunk) {
                    const body = Buffer.concat(chunks);
                    json_data.data = body.toString();
                    resolve(json_data);
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
                    "documentType": `${documentType}`,
                    "documentNumber": `${documentNumber}`
                }
            });


            req.write(postData);
            req.end();

        });

        await promise
            .finally(() => console.log(`✅ Integration Inspektor status: ${json_data.status}`))
            .then(result => {
                response_json_data.data = JSON.parse(result.data);
            })
            .catch(error => {
                throw (error);
            });

        return JSON.stringify(response_json_data);

    } catch (error) {
        console.error('❌ Error en fn_restInspektor:', error);
    };
};

module.exports = {
    "fn_restInspektor": fn_restInspektor,
};