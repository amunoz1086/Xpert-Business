/* MP: webservices la vinculación del cliente PN, PJ */

async function fn_soap_usoGeneral(dataUsoGeneral) {

    let dataReques = {};

    const USOGENERAL_HOST = process.env.URL_HOST_SOAP_USOGENERAL;
    const USOGENERAL_PORT = process.env.URL_PORT_SOAP_USOGENERAL;
    const USOGENERAL_PATH = process.env.URL_PATH_SOAP_USOGENERAL;
    const SOAP_USERNAME = process.env.USOGENERAL_USERNAME;

    dataReques.prHostname = `${USOGENERAL_HOST}`;
    dataReques.prPort = `${USOGENERAL_PORT}`;
    dataReques.prPath = `${USOGENERAL_PATH}`;
    dataReques.prContentType = { 'Content-Type': 'application/xml' };
    dataReques.pridXml = 'Uso_General';
    dataReques.prXml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://pragma.co/ents/common/BaseMessageFormat/V1" xmlns:ns="http://bancoomeva.com.co/interacciondigital/usogeneral/1.0">
    <soapenv:Header>
        <v1:requestHeaderOut>
            <systemId>1</systemId>
            <messageId>VENPR-163794212029597</messageId>
            <invokerDateTime>2021-11-26T10:55:19</invokerDateTime>
            <securityCredential>
                <userName>${SOAP_USERNAME}</userName>
                <userToken>V3nN0pC4l910aBc0</userToken>
            </securityCredential>
            <destination>
                <name>usoGeneral</name>
                <namespace>http://usogeneral.com.co/1.0</namespace>
                <operation>usoGeneral</operation>
            </destination>
            <classification>
                <classification>?</classification>
            </classification>
        </v1:requestHeaderOut>
    </soapenv:Header>
    <soapenv:Body>
        <ns:usoGeneralRequest>
            <datosGenericosRequest>
                <ipTransaccion>10.10.1.55</ipTransaccion>
                <codTransaccion />
                <canal>1</canal>
                <bancaMovilActiva>true</bancaMovilActiva>
            </datosGenericosRequest>
            <usoGeneral>
                <!--Zero or more repetitions:-->
                <invocacionProgramas>
                    <codigoPrograma>1</codigoPrograma>
                    <error></error>
                    <texto></texto>
                    <textoError></textoError>
                </invocacionProgramas>
                <invocacionProgramas>
                    <codigoPrograma>2</codigoPrograma>
                    <error />
                    <texto />
                    <textoError />
                </invocacionProgramas>
                <invocacionProgramas>
                    <codigoPrograma>3</codigoPrograma>
                    <error />
                    <texto />
                    <textoError />
                </invocacionProgramas>
                <invocacionProgramas>
                    <codigoPrograma>4</codigoPrograma>
                    <error />
                    <texto />
                    <textoError />
                </invocacionProgramas>
                <invocacionProgramas>
                    <codigoPrograma>5</codigoPrograma>
                    <error />
                    <texto />
                    <textoError />
                </invocacionProgramas>
                <invocacionProgramas>
                    <codigoPrograma>6</codigoPrograma>
                    <error />
                    <texto />
                    <textoError />
                </invocacionProgramas>
                <invocacionProgramas>
                    <codigoPrograma>7</codigoPrograma>
                    <error />
                    <texto />
                    <textoError />
                </invocacionProgramas>
                <cantidadProgramas>7</cantidadProgramas>
                <identificacionCliente>${dataUsoGeneral.numDocumento}</identificacionCliente>
            </usoGeneral>
        </ns:usoGeneralRequest>
    </soapenv:Body>
</soapenv:Envelope>`;

    return JSON.stringify(dataReques);
};

module.exports = {
    "fn_soap_usoGeneral": fn_soap_usoGeneral,
}