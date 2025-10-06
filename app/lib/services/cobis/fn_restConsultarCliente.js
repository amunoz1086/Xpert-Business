/* const https = require('https');
const keycloakqa = require('@/app/lib/services/cognito/fn_restKeycloakqa');

const agent = new https.Agent({ keepAlive: true });
let _cachedToken = null;
let _expiresAt = 0;

// Reutilizable: obtiene y cachea token
async function getAccessToken() {
  const now = Date.now();
  if (_cachedToken && now < _expiresAt) return _cachedToken;

  const raw = await keycloakqa.fn_restKeycloakqa();
  const { access_token, expires_in, token_type } = JSON.parse(raw).data;
  _cachedToken = { access_token, token_type };
  _expiresAt = now + (expires_in - 60) * 1000;
  return _cachedToken;
}

// Reutilizable: envía JSON y retorna JSON
async function postJson(host, port, path, payload, token) {
  const body = JSON.stringify(payload);
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

  return new Promise((resolve, reject) => {
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
          reject(new Error(err));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Función optimizada para consultar cliente
async function fn_restConsultarCliente(dataRequest) {
  const { identification, identificationType, customerType } =
    typeof dataRequest === 'string' ? JSON.parse(dataRequest) : dataRequest;

  const host = process.env.URL_HOST_CLIENTE;
  const port = process.env.URL_PORT_CLIENTE;
  const path = process.env.URL_PATH_CLIENTE;

  const token = await getAccessToken();

  const payload = {
    deviceContext: {
      clientApp: { appName: '<string>', appVersion: '<string>', userAgent: '<string>' },
      deviceId: '<string>',
      deviceType: '<string>',
      geoLocation: { latitude: '<string>', longitude: '<string>' },
      ipAddress: '<string>',
      macAddress: '<string>',
      osVersion: '<string>'
    },
    header: {
      authToken: '<string>',
      messageId: '<string>',
      originatingBank: '<string>',
      requestType: '<string>',
      timestamp: new Date().toISOString(),
      transactionId: '<string>',
      callbackUrl: '<string>',
      channel: '<string>',
      userLogin: '<string>'
    },
    metadata: {
      priority: 'medium',
      processingMode: 'asynchronous',
      serviceLevelAgreement: '<string>'
    },
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
    console.error('Error en fn_restConsultarCliente:');
    return err;
  }
}

module.exports = { fn_restConsultarCliente };
 */