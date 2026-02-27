const http = require('http');
const keepAliveAgent = new http.Agent({ keepAlive: true });
const { randomUUID } = require('crypto');
const { getSession } = require('@/app/lib/auth/auth');
const keycloakqa = require('@/app/lib/services/cognito/fn_restKeycloakqa');

let _cached = null;
let _expiresAt = 0;

async function getAccessToken() {
  const now = Date.now();
  if (_cached && now < _expiresAt) return _cached;

  const raw = await keycloakqa.fn_restKeycloakqa();
  const { access_token, expires_in, token_type } = JSON.parse(raw).data;
  _cached = { access_token, token_type };
  // desfasar 60s para prevenir expiración in-flight
  _expiresAt = now + (expires_in - 60) * 1000;
  return _cached;
}

async function fn_restSimularDepositoPlazo(dataReques) {

  const usuario = (await getSession()).userBACK.user;

  const {
    mnemonic,
    paymentType,
    paymentFrequency,
    interestCompounded,
    amount,
    currencyCode,
    termInDays,
    valueDate
  } = JSON.parse(dataReques);

  const SIMULAR_DEPOSITOPLAZO_HOST = process.env.URL_HOST_SIMULAR_DEPOSITOPLAZO;
  const SIMULAR_DEPOSITOPLAZO_PORT = process.env.URL_PORT_SIMULAR_DEPOSITOPLAZO;
  const SIMULAR_DEPOSITOPLAZO_PATH = process.env.URL_PATH_SIMULAR_DEPOSITOPLAZO;

  const PROTOCOL = (http ? 'http' : 'https');
  const externalUrl = `${PROTOCOL}://${SIMULAR_DEPOSITOPLAZO_HOST.trim()}${SIMULAR_DEPOSITOPLAZO_PORT ? `:${SIMULAR_DEPOSITOPLAZO_PORT.trim()}` : ''}${SIMULAR_DEPOSITOPLAZO_PATH.trim()}`;

  console.log(`✅ External API URL: ${externalUrl}`);
  console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);

  const { access_token, token_type } = await getAccessToken();

  let json_data = {};
  let response_json_data = {};

  try {
    const options = {
      'method': 'POST',
      'hostname': `${SIMULAR_DEPOSITOPLAZO_HOST}`,
      'port': SIMULAR_DEPOSITOPLAZO_PORT,
      'path': `${SIMULAR_DEPOSITOPLAZO_PATH}`,
      'agent': keepAliveAgent,
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${token_type} ${access_token}`
      },
      'maxRedirects': 20
    };


    let promise = new Promise(function (resolve, reject) {
      const req = http.request(options, res => {
        res.setEncoding('utf8');               // decodifica directamente a string
        json_data.status = res.statusCode;
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            data: body
          });
        });
        res.on('error', err => reject(err));
      });

      const payload = {
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
          "simulation": {
            "depositType": {
              "mnemonic": mnemonic
            },
            "currency": {
              "code": currencyCode
            },
            "termInDays": termInDays,
            "interestCompounded": interestCompounded,
            "amount": amount,
            "paymentType": paymentType,
            "valueDate": valueDate
          }
        }
      };

      if (paymentFrequency !== "") {
        payload.operationData.simulation.paymentFrequency = {
          "code": paymentFrequency
        };
      };

      const postData = JSON.stringify(payload);

      let parsedPostData = JSON.parse(postData)
      console.log('request propietarios:', JSON.stringify(parsedPostData, null, 2));


      //captura errores de la request
      req.on('error', err => reject(err));
      req.write(postData);
      req.end();

    });

    await promise
      .finally(() => console.log(`✅ Integratión simulateCdt status: ${json_data.status}`))
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
    console.error('❌ Error simulateCdt', error);
  };
};

module.exports = {
  "fn_restSimularDepositoPlazo": fn_restSimularDepositoPlazo,
};