/* const https = require('https');
const keycloakqa = require('@/app/lib/services/cognito/fn_restKeycloakqa');

// Agent con keepAlive para reusar conexiones TLS
const agent = new https.Agent({ keepAlive: true });

let _cachedToken = null;
let _expiresAt = 0;

// Obtiene y cachea el token hasta poco antes de expirar
async function getAccessToken() {
  const now = Date.now();
  if (_cachedToken && now < _expiresAt) return _cachedToken;

  const raw = await keycloakqa.fn_restKeycloakqa();
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
  const timeoutMs = 5000; // 5s timeout

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
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

        const req = https.request(options, res => {
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
              reject(new Error('Invalid JSON response'));
            }
          });
        });

        req.on('error', reject);
        req.setTimeout(timeoutMs, () => {
          req.destroy(new Error('Request timeout'));
        });
        req.write(body);
        req.end();
      });
    } catch (err) {
      if (attempt === maxRetries) throw err;
      console.warn(`Attempt ${attempt} failed: ${err.message}, retrying...`);
      await sleep(100 * 2 ** (attempt - 1));
    }
  }
}

// Campos comunes para header, metadata y deviceContext
function commonHeader() {
  return {
    messageId: 'msg-' + Date.now(),
    timestamp: new Date().toISOString(),
    originatingBank: 'Bancoomeva',
    authToken: '123456',
    callbackUrl: 'https://api.bancoomeva.com/callback',
    requestType: 'query',
    transactionId: 'txn-' + Date.now(),
    channel: 'web',
    userLogin: 'system'
  };
}

function commonMetadata() {
  return {
    priority: 'medium',
    serviceLevelAgreement: 'standard',
    processingMode: 'asynchronous'
  };
}

function commonDeviceContext() {
  return {
    deviceId: 'device-' + Date.now(),
    deviceType: 'server',
    osVersion: process.version,
    ipAddress: '127.0.0.1',
    macAddress: '00:1B:44:11:3A:B7',
    geoLocation: { latitude: '0.0000', longitude: '0.0000' },
    clientApp: { appName: 'MyApp', appVersion: '1.0.0', userAgent: 'Node.js' }
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
    header: commonHeader(),
    metadata: commonMetadata(),
    deviceContext: commonDeviceContext(),
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

  try {
    return await postJson(host, port, path, payload, token);
  } catch (err) {
    console.error('Error en fn_restConsultarCliente:', err.message);
    throw err;
  }
}

// Consulta participantes
async function fn_restConsultarParticipantes(dataRequest) {
  const { customerReference, customerType } =
    typeof dataRequest === 'string' ? JSON.parse(dataRequest) : dataRequest;

  const host = process.env.URL_HOST_CLIENTE;
  const port = process.env.URL_PORT_CLIENTE;
  const path = process.env.URL_PATH_CLIENTE;

  const token = await getAccessToken();
  const payload = {
    header: commonHeader(),
    metadata: commonMetadata(),
    deviceContext: commonDeviceContext(),
    operationData: {
      CustomerReference: customerReference,
      CustomerType: customerType
    }
  };

  try {
    return await postJson(host, port, path, payload, token);
  } catch (err) {
    console.error('Error en fn_restConsultarParticipantes:', err.message);
    throw err;
  }
}

module.exports = {
  fn_restConsultarCliente,
  fn_restConsultarParticipantes
};
 */