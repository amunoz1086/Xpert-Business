const http = require('http');
const keycloakqa = require('@/app/lib/services/keycloak/fn_restKeycloak');
const { getSession } = require('@/app/lib/auth/auth');

// Agent con keepAlive para reusar conexiones TLS
const agent = new http.Agent({ keepAlive: true });

let _cachedToken = null;
let _expiresAt = 0;

// Obtiene y cachea el token hasta poco antes de expirar
async function getAccessToken() {
  const now = Date.now();
  if (_cachedToken && now < _expiresAt) return _cachedToken;

  const raw = await keycloakqa.fn_restKeycloak();
  const { access_token, expires_in, token_type } = JSON.parse(raw).data;
  _cachedToken = { access_token, token_type };
  _expiresAt = now + (expires_in - 60) * 1000;
  return _cachedToken;
}

// Pausa para retries
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Petición genérica POST JSON con timeout y retries
async function postJson(host, port, path, payload, token) {
  const body = JSON.stringify(payload);
  const maxRetries = 3;
  const timeoutMs = 10000; // 10s timeout

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const PROTOCOL = (http ? 'http' : 'https');
    const externalUrl = `${PROTOCOL}://${host.trim()}${port ? `:${port.trim()}` : ''}${path.trim()}`;

    console.log(`✅ External API URL: ${externalUrl}`);
    console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);

    try {
      return await new Promise((resolve, reject) => {
        const options = {
          method: 'POST',
          hostname: host,
          port,
          path,
          agent,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body),
            'Accept': 'application/json',
            'Authorization': `${token.token_type} ${token.access_token}`
          }
        };

        const req = http.request(options, res => {
          const buffers = [];
          res.on('data', chunk => buffers.push(chunk));
          res.on('end', () => {
            const text = Buffer.concat(buffers).toString();
            if (res.statusCode !== 200) {
              return reject(new Error(`Status ${res.statusCode}: ${text}`));
            }
            try {
              resolve(JSON.parse(text));
            } catch (err) {
              reject(new Error(err));
            }
          });
        });

        req.on('error', reject);
        req.setTimeout(timeoutMs, () => {
          req.destroy(new Error(504));
        });
        req.write(body);
        req.end();

      });

    } catch (err) {
      console.log(`❌ External API URL: ${externalUrl}`);
      console.log(`➡️ Protocol detected (by module): ${PROTOCOL.toUpperCase()}`);
      if (attempt === maxRetries) throw err;
      console.warn(`Attempt ${attempt} failed: ${err.message}, retrying...`);
      await sleep(100 * 2 ** (attempt - 1));
    }
  }
}

// Campos comunes para header, metadata y deviceContext
async function commonHeader() {
  const token = await getAccessToken();
  const usuario = (await getSession()).userBACK.user;

  return {
    messageId: 'msg-' + Date.now(),
    timestamp: new Date().toISOString(),
    originatingBank: process.env.ORINATINGBANK,
    authToken: `${token.token_type} ${token.access_token}`,
    callbackUrl: process.env.CALLBACKURL,
    requestType: 'query',
    transactionId: 'txn-' + Date.now(),
    channel: process.env.CHANNEL,
    userLogin: usuario
  };
}

function commonMetadata() {
  return {
    priority: process.env.PRIORITY,
    serviceLevelAgreement: process.env.SERVICELEVELAGREEMENT,
    processingMode: process.env.PROCESSINGMODE
  };
}

async function commonDeviceContext() {
  const usuario = (await getSession()).userBACK.user;

  return {
    deviceId: 'device-' + Date.now(),
    deviceType: 'server',
    osVersion: process.version,
    ipAddress: '127.0.0.1',
    macAddress: '00:1B:44:11:3A:B7',
    geoLocation: { latitude: '0.0000', longitude: '0.0000' },
    clientApp: { appName: process.env.APPNAME, appVersion: process.env.APPVERSION, userAgent: usuario }
  };
}

// Consulta un cliente
async function fn_restConsultarCliente(dataRequest) {
  const { identification, identificationType, customerType } =
    typeof dataRequest === 'string' ? JSON.parse(dataRequest) : dataRequest;

  const host = process.env.URL_HOST_CLIENTE;
  const port = process.env.URL_PORT_CLIENTE;
  const path = process.env.URL_PATH_CLIENTE;

  const token = await getAccessToken();
  const payload = {
    header: await commonHeader(),
    metadata: commonMetadata(),
    deviceContext: await commonDeviceContext(),
    operationData: {
      PartyIdentification: {
        PartyIdentification: {
          Identification: identification,
          PartyIdentificationType: { Code: identificationType }
        }
      },
      CustomerType: customerType
    }
  };

  let response_json_data = {};

  try {

    const resConsultaCliente = {
      "status": 200,
      "data": await postJson(host, port, path, payload, token)
    };

    return JSON.stringify(resConsultaCliente);

  } catch (err) {
    const rawError = err;
    const rawStatus = /Status\s+(\d+)/.exec(rawError);
    const status = rawStatus ? rawStatus[1] : null;
    const rawMessage = /^Status \d+:\s*\{/.test(err.message)
      ? JSON.parse(err.message.replace(/^Status \d+:\s*/, ''))
      : null;
    const message = rawMessage?.message ?? null;

    if (+status === 400) {
      response_json_data.data = {
        "status": +status,
        "message": `${message}`
      };
    } else {
      console.error('Error en fn_restConsultarCliente PJ:', err);
      response_json_data.data = {
        "status": +status,
        "message": `Code: ${status} - ${message}`
      };
    };

    return JSON.stringify(response_json_data);

  };
};

// Consulta participantes
async function fn_restConsultarParticipantes(dataRequest) {

  const { customerReference, customerType } =
    typeof dataRequest === 'string'
      ? JSON.parse(dataRequest)
      : dataRequest;

  const host = process.env.URL_HOST_CLIENTE;
  const port = process.env.URL_PORT_CLIENTE;
  const path = process.env.URL_PATH_CLIENTE;

  const token = await getAccessToken();
  const payload = {
    header: await commonHeader(),
    metadata: commonMetadata(),
    deviceContext: await commonDeviceContext(),
    operationData: {
      CustomerReference: customerReference,
      CustomerType: customerType
    }
  };

  let response_json_data = {};

  try {

    const resConsultaParticipantes = {
      "status": 200,
      "data": await postJson(host, port, path, payload, token)

    };

    return JSON.stringify(resConsultaParticipantes);

  } catch (err) {

    const rawError = err;
    const rawStatus = /Status\s+(\d+)/.exec(rawError);
    const status = rawStatus ? rawStatus[1] : null;
    const rawMessage = /^Status \d+:\s*\{/.test(err.message)
      ? JSON.parse(err.message.replace(/^Status \d+:\s*/, ''))
      : null;
    const message = rawMessage?.message ?? null;

    if (+status === 400) {
      response_json_data.data = {
        "status": +status,
        "message": `${message}`
      };
    } else {
      console.error('Error en restConsultarParticipantes', err);
      response_json_data.data = {
        "status": +status,
        "message": `Code: ${status} - ${message}`
      };
    };

    return JSON.stringify(response_json_data);

  };
};


// Consulta Cuentas
async function fn_restConsultarCuentas(dataRequest) {

  const { identification, identificationType } = typeof dataRequest === 'string' ? JSON.parse(dataRequest) : dataRequest;

  const host = process.env.URL_HOST_CUENTA_SOBREGIRO;
  const port = process.env.URL_PORT_CUENTA_SOBREGIRO;
  const path = process.env.URL_PATH_CUENTA_SOBREGIRO;

  const token = await getAccessToken();
  const payload = {
    header: await commonHeader(),
    metadata: commonMetadata(),
    deviceContext: await commonDeviceContext(),
    operationData: {
      CustomerReference: {
        PartyIdentification: {
          IdentificationType: { Code: identificationType },
          Identification: identification
        }
      },
      Pagination: {
        PageNumber: 1,
        Size: 100
      }
    }
  };

  let response_json_data = {};

  console.log('##REQUEST CUENTAS', payload)

  try {

    const resConsultaCliente = {
      "status": 200,
      "data": await postJson(host, port, path, payload, token)
    };

    return JSON.stringify(resConsultaCliente);

  } catch (err) {

    const rawError = err;
    const rawStatus = /Status\s+(\d+)/.exec(rawError);
    const status = rawStatus ? rawStatus[1] : null;
    const rawMessage = /^Status \d+:\s*\{/.test(err.message)
      ? JSON.parse(err.message.replace(/^Status \d+:\s*/, ''))
      : null;
    const message = rawMessage?.message ?? null;

    if (+status === 400) {
      response_json_data.data = {
        "status": +status,
        "message": `${message}`
      };
    } else {
      console.error('Error en fn_restConsultarCuentas:', err);
      response_json_data.data = {
        "status": +status,
        "message": `Code: ${status} - ${message}`
      };
    };

    return JSON.stringify(response_json_data);

  };
};


// Consulta Deposito a Plazo
async function fn_restConsultarDepositoPlazo(dataRequest) {

  const {
    PartyIdentificationType,
    Identificacion,
    ProductType,
    PageNumber,
    Size,
  } = typeof dataRequest === 'string' ? JSON.parse(dataRequest) : dataRequest;

  const host = process.env.URL_HOST_QUERY_DEPOSITOPLAZO;
  const port = process.env.URL_PORT_QUERY_DEPOSITOPLAZO;
  const path = process.env.URL_PATH_QUERY_DEPOSITOPLAZO;

  const token = await getAccessToken();
  const payload = {
    header: await commonHeader(),
    metadata: commonMetadata(),
    deviceContext: await commonDeviceContext(),
    operationData: {
      CustomerReference: {
        PartyIdentification: {
          PartyIdentificationType: {
            Code: PartyIdentificationType
          },
          Identification: Identificacion
        }
      },
      ProductType: ProductType,
      Pagination: {
        PageNumber: +PageNumber,
        Size: +Size
      }
    }
  };

  let response_json_data = {};

  //console.log('##REQUEST DEPOSITO PLAZO', payload)

  try {

    const resConsultaCliente = {
      "status": 200,
      "data": await postJson(host, port, path, payload, token)
    };

    return JSON.stringify(resConsultaCliente);

  } catch (err) {

    const rawError = err;
    const rawStatus = /Status\s+(\d+)/.exec(rawError);
    const status = rawStatus ? rawStatus[1] : null;
    const rawMessage = /^Status \d+:\s*\{/.test(err.message)
      ? JSON.parse(err.message.replace(/^Status \d+:\s*/, ''))
      : null;
    const message = rawMessage?.message ?? null;

    if (+status === 400) {
      response_json_data.data = {
        "status": +status,
        "message": `${message}`
      };
    } else {
      console.error('Error en fn_restConsultarDepositoPlazo:', err);
      response_json_data.data = {
        "status": +status,
        "message": `Code: ${status} - ${message}`
      };
    };

    return JSON.stringify(response_json_data);

  };
};


module.exports = {
  fn_restConsultarCliente,
  fn_restConsultarParticipantes,
  fn_restConsultarCuentas,
  fn_restConsultarDepositoPlazo
};