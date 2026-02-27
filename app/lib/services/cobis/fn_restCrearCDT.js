const http = require('http');
const keepAliveAgent = new http.Agent({ keepAlive: true });
const { randomUUID } = require('crypto');

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

async function fn_restCrearCDT(dataReques, firmantes, recepcion, metodoInto, metodoOut) {

  const {
    branchLocation,
    customerReference,
    depositCurrencyCode,
    depositAmount,
    depositTerm,
    depositValueDate,
    depositAccountOfficer,
    payOutMethod,
    productTypeCode,
    compoundingIndicator,
    paymentTypeCode,
    frequencyCode,
    interestRate,
    ownershipTypeCode,
    dematerialization,
    userAgent
  } = JSON.parse(dataReques);

  const CREAR_CDT_HOST = process.env.URL_HOST_CREAR_CDT;
  const CREAR_CDT_PORT = process.env.URL_PORT_CREAR_CDT;
  const CREAR_CDT_PATH = process.env.URL_PATH_CREAR_CDT;

  const PROTOCOL = (http ? 'http' : 'https');
  const externalUrl = `${PROTOCOL}://${CREAR_CDT_HOST.trim()}${CREAR_CDT_PORT ? `:${CREAR_CDT_PORT.trim()}` : ''}${CREAR_CDT_PATH.trim()}`;

  console.log(`✅ External API URL: ${externalUrl}`);
  console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);

  const { access_token, token_type } = await getAccessToken();

  let json_data = {};
  let response_json_data = {};

  try {
    const options = {
      'method': 'POST',
      'hostname': `${CREAR_CDT_HOST}`,
      'port': CREAR_CDT_PORT,
      'path': `${CREAR_CDT_PATH}`,
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
        res.setEncoding('utf8');
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
          "requestType": "creation",
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
            "userAgent": `${userAgent}`
          }
        },
        "operationData": {
          "BranchLocation": {
            "Identifier": branchLocation
          },
          "termDepositArrangement": {
            "CustomerReference": {
              "Code": customerReference
            },
            "Deposit": {
              "CurrencyCode": depositCurrencyCode,
              "Amount": depositAmount,
              "Term": depositTerm,
              "ValueDate": depositValueDate,
              "AccountOfficer": {
                "Login": depositAccountOfficer
              },
              "PayInDetail": recepcion
            },
            "FundAccessArrangement": {
              "PayInMethod": metodoInto.PayInMethod,
              "PayOutMethod": payOutMethod,
            },
            "ProductType": {
              "Code": productTypeCode
            },
            "InterestArrangement": {
              "CompoundingIndicator": compoundingIndicator,
              "PaymentType": {
                "Code": paymentTypeCode
              },
              "Frequency": {
                "Code": frequencyCode
              },
              "InterestRate": interestRate
            },
            "CustomerArrangement": {
              "OwnershipType": {
                "Code": ownershipTypeCode
              },
            },
            "Dematerialization": {
              "SecurityHoldingIndicator": dematerialization
            }
          }
        }
      };

      if (Array.isArray(firmantes) && firmantes.length > 0) {
        payload.operationData.termDepositArrangement.CustomerArrangement.JointParty = firmantes;
      };

      if (metodoInto.PayInMethod === 'AHO' || metodoInto.PayInMethod === 'CTE') {
        payload.operationData.termDepositArrangement.FundAccessArrangement.PayInAccount = metodoInto.PayInAccount;
      };

      if (payOutMethod === 'AHO' || payOutMethod === 'CTE') {
        payload.operationData.termDepositArrangement.FundAccessArrangement.PayOutAccount = metodoOut.PayOutAccount;
      };

      const postData = JSON.stringify(payload);
      let parsedPostData = JSON.parse(postData);

      console.log('✅ request Creación CDT:', JSON.stringify(parsedPostData, null, 2));

      //captura errores de la request
      req.on('error', err => reject(err));
      req.write(postData);
      req.end();

    });

    await promise
      .finally(() => console.log(`✅ Integratión Creación CDT status: ${json_data.status}`))
      .then(result => {
        response_json_data.data = JSON.parse(result.data);
      })
      .catch(error => {
        console.log(`❌ External API URL: ${externalUrl}`);
        console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);
        throw (error);
      });

    return JSON.stringify(response_json_data);

  } catch (error) {
    console.error('❌Error Integratión Creación CDT', error);
  };
};

module.exports = {
  "fn_restCrearCDT": fn_restCrearCDT,
};