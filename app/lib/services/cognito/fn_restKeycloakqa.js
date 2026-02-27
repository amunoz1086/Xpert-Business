const https = require('https');
const fs = require('fs');
const querystring = require('querystring');


async function fn_restKeycloakqa() {


    if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    };

    console.log('Suspendiendo Validacion de Certificado Keycloak:', process.env.NODE_TLS_REJECT_UNAUTHORIZED);

    const KEYCLOAK_HOST = process.env.KEYCLOAK_TOKEN_HOST;
    const KEYCLOAK_PORT = process.env.KEYCLOAK_TOKEN_PORT;
    const KEYCLOAK_PATH = process.env.KEYCLOAK_TOKEN_PATH;

    const KEYCLOAK_GRANT_TYPE = process.env.KEYCLOAK_GRANT_TYPE;
    const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
    const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;

    const PROTOCOL = (https ? 'https' : 'http');
    const externalUrl = `${PROTOCOL}://${KEYCLOAK_HOST.trim()}${KEYCLOAK_PORT ? `:${KEYCLOAK_PORT.trim()}` : ''}${KEYCLOAK_PATH.trim()}`;

    console.log(`✅ External API URL: ${externalUrl}`);
    console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);

    let json_data = {};
    let response_json_data = {};

    try {

        const options = {
            'method': 'POST',
            'hostname': `${KEYCLOAK_HOST}`,
            'port': KEYCLOAK_PORT,
            'path': `${KEYCLOAK_PATH}`,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            'maxRedirects': 20,
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

            const postData = querystring.stringify({
                'grant_type': `${KEYCLOAK_GRANT_TYPE}`,
                'client_id': `${KEYCLOAK_CLIENT_ID}`,
                'client_secret': `${KEYCLOAK_CLIENT_SECRET}`
            });

            req.write(postData);
            req.end();

        });

        await promise
            .finally(() => console.log(`Integratión Keycloak status: ${json_data.status}`))
            .then(result => {
                response_json_data.data = JSON.parse(result.data);
            })
            .catch(error => {
                throw (error);
            });

        return JSON.stringify(response_json_data);

    } catch (error) {
        console.log(`❌ External API URL: ${externalUrl}`);
        console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);
        console.log('fn_restKeycloakqa:', error);
    };
};

module.exports = {
    "fn_restKeycloakqa": fn_restKeycloakqa,
};