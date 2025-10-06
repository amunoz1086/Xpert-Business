'use server';

/* fn_profile, permite la validacion del usario en el directorio activo del banco */

const https = require('https');
const fs = require('fs');
const Ip = require('ip');
const bearerToken = require('../services/cognito/fn_restCognito');


export const val_fn_profile = async (userName, password) => {

  console.log(`Validating user:${userName}, IP: ${Ip.address()}`);

  let responseUserProfile;
  const validateUserResponse = {};

  try {

    const rawData = await bearerToken.fn_restCognito();
    const access_token = JSON.parse(rawData).rawData;

    const dateToday = new Date().toISOString();
    const ipTransaccion = Ip.address();

    let invokerDateTime = dateToday.slice(0, dateToday.indexOf('T'));
    let invokerLocation = '';
    let json_data = {};

    const postData = JSON.stringify({
      "idInvoker": "usuariobanco",
      "invokerAction": "validateUser",
      "invokerDateTime": `${invokerDateTime}`,
      "canal": "web",
      "ipTransaccion": `${ipTransaccion}`,
      "invokerLocation": `${invokerLocation}`,
      "idAppProcess": "apprecios",
      "directory": "0",
      "userName": `${userName}`,
      "password": `${password}`,
      "applicacionBuscada": "apprecios",
      "validaAplicacion": "0",
      "identificacion": ""
    });

    const PROFILE_HOST = process.env.URL_HOST_PROFILE;
    const PROFILE_PORT = process.env.URL_PORT_PROFILE;
    const PROFILE_PATH = process.env.URL_PATH_PROFILE;

    const options = {
      'method': 'POST',
      'hostname': `${PROFILE_HOST.toString().trim()}`,
      'port': `${PROFILE_PORT.trim()}`,
      'path': `${PROFILE_PATH.toString().trim()}`,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `${JSON.parse(access_token).token_type} ${JSON.parse(access_token).access_token}`
      },
      'maxRedirects': 20
    };

    let promise = new Promise(function (resolve, reject) {
      const req = https.request(options, (res) => {
        let chunks = [];

        try {

          if (res.statusCode === 200) {
            json_data.response = res.statusCode;
            res.on('data', (chunk) => {
              chunks.push(chunk);
              resolve(json_data);
            });

            res.on('end', (chunk) => {
              let body = Buffer.concat(chunks);
              json_data.data = JSON.parse(body.toString()).Mensaje;
              resolve(json_data);
            });

            res.on('error', (error) => {
              throw new Error(`${error}`);
            });

          } else {
            throw new Error(`${res.statusCode}:${res.statusMessage}; descripcion: ${res.message === undefined ? res.statusMessage : res.message}`);
          };

        } catch (error) {
          console.log(error);
          json_data.response = 500;
          json_data.message = error.message;
          console.error(`Request proflie error: ${error.message}`);
          reject(json_data);
        };
      });

      req.write(postData);
      req.end();
    });

    await promise
      .finally(() => console.log(`apiProfile state: ${json_data.response}`))
      .then(result => {
        if (result.data.codigoMensaje === '202') {
          validateUserResponse.codeState = result.data.codigoMensaje;
          validateUserResponse.authorized = false;
          validateUserResponse.userId = postData.userName;
          validateUserResponse.message = result.data.tipoMensaje;

          console.log('Response profile:', validateUserResponse);
          responseUserProfile = JSON.stringify(validateUserResponse);

        } else if (result.data.codigoMensaje === '200' && result.data.validateUserResponse.return.authorized === 'false') {
          validateUserResponse.codeState = 401;
          validateUserResponse.authorized = result.data.validateUserResponse.return.authorized;
          validateUserResponse.userId = result.data.validateUserResponse.return.userId;
          validateUserResponse.name = result.data.validateUserResponse.return.name;
          validateUserResponse.mail = result.data.validateUserResponse.return.mail;
          validateUserResponse.message = 'Usuario y/o contraseña inválidos';

          console.log('Response profile:', validateUserResponse);
          responseUserProfile = JSON.stringify(validateUserResponse);

        } else if (result.data.codigoMensaje === '200' && result.data.validateUserResponse.return.authorized === 'true') {
          validateUserResponse.codeState = 200;
          validateUserResponse.authorized = result.data.validateUserResponse.return.authorized;
          validateUserResponse.userId = result.data.validateUserResponse.return.userId;
          validateUserResponse.name = result.data.validateUserResponse.return.name;
          validateUserResponse.mail = result.data.validateUserResponse.return.mail;
          validateUserResponse.ipTransaccion = `${ipTransaccion}`;

          console.log('Response profile:', validateUserResponse);
          responseUserProfile = JSON.stringify(validateUserResponse);

        } else {
          throw new Error(`${result.data.codigoMensaje}: ${result.data.descripcion}`);
        }
      })
      .catch(
        error => {
          console.log(`Error processing response: ${JSON.stringify(error)}`);
          validateUserResponse.codeState = error.response === undefined ? 500 : error.response;
          validateUserResponse.service = 'apiProfile';
          validateUserResponse.message = error.message === undefined ? error : error.message;
          responseUserProfile = JSON.stringify(validateUserResponse);
        }
      );

  } catch (error) {
    console.log('Error profile:', error);
    validateUserResponse.codeState = error.response === undefined ? 500 : error.response;
    validateUserResponse.service = 'apiProfile';
    validateUserResponse.message = error.message === undefined ? error : error.message;
    responseUserProfile = JSON.stringify(validateUserResponse);
  }


  return (responseUserProfile);
};