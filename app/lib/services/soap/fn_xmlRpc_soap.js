/* MP: fn_xmlRpc_soap, funcion para la consulta de webservices */

const http = require('http');
const fs = require('fs');

async function fn_xmlRpc_soap(dataReques) {

    const options = {
        'method': 'POST',
        'hostname': dataReques.prHostname,
        'port': dataReques.prPort,
        'path': dataReques.prPath,
        'headers': dataReques.prContentType,
        'maxRedirects': 20
    };

    let json_data = {};
    let response_json_data;

    let promise = new Promise(function (resolve, reject) {
        const req = http.request(options, function (res) {
            let chunks = [];
            json_data.status = res.statusCode;

            if (res.statusCode === 200) {
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                res.on("end", function (chunk) {
                    let body = Buffer.concat(chunks);
                    json_data.idXml = dataReques.pridXml;
                    json_data.xmlData = body.toString();
                    resolve(json_data);
                });
            } else {
                res.on('data', function (chunk) {
                    json_data.message = 'Error conexión no establecida al servicio';
                    json_data.idXml = dataReques.pridXml;
                    reject(json_data);
                });
            };
        }).on('error', (error) => {
            json_data.status = error.errno;
            json_data.code = error.code;
            json_data.message = error.message;
            json_data.idXml = dataReques.pridXml;
            reject(json_data);
        });

        let postData = dataReques.prXml;

        req.write(postData);
        req.end();
    });

    await promise
        .finally(() => console.log(`webservice ${json_data.idXml} status:${json_data.status}`))
        .then(result => {
            response_json_data = JSON.stringify(result);
        })
        .catch(error => {
            console.log(error)
            response_json_data = JSON.stringify(error);
        })

    return response_json_data;
};

module.exports = {
    "fn_xmlRpc_soap": fn_xmlRpc_soap,
}