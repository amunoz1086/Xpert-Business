/* MP: webservices consulta de Variables internas 1.0, solo solicita numDocumento */

async function fn_soap_variablesInternas(dataVariablesInternas) {

   let dataReques = {};

   const CHANNELADAPTER_HOST = process.env.URL_HOST_SOAP_CHANNELADAPTER;
   const CHANNELADAPTER_PORT = process.env.URL_PORT_SOAP_CHANNELADAPTER;
   const CHANNELADAPTER_PATH = process.env.URL_PATH_SOAP_CHANNELADAPTER;
   const SOAP_USERNAME = process.env.SERV_SOAP_USERNAME;

   dataReques.prHostname = `${CHANNELADAPTER_HOST}`;
   dataReques.prPort = `${CHANNELADAPTER_PORT}`;
   dataReques.prPath = `${CHANNELADAPTER_PATH}`;
   dataReques.prContentType = { 'Content-Type': 'application/xml' };
   dataReques.pridXml = 'consulta_variables';
   dataReques.prXml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:v1="http://pragma.co/ents/common/BaseMessageFormat/V1" 
    xmlns:ns="http://bancoomeva.com.co/interacciondigital/consultarvariablesinternas/1.0">
    <soapenv:Header>
       <v1:requestHeaderOut>
          <systemId>1</systemId>
          <messageId>\${=java.util.UUID.randomUUID()}</messageId>
          <!--Optional:-->
          <invokerDateTime>2018-03-06T0215501</invokerDateTime>
          <!--Optional:-->
          <securityCredential>
             <userName>${SOAP_USERNAME}</userName>
             <!--Optional:-->
             <userToken>aW50X2RpZ2l0YWw=</userToken>
          </securityCredential>
          <!--Optional:-->
          <destination>
             <!--Optional:-->
             <name>consultarVariablesInternas</name>
             <!--Optional:-->
             <namespace>http://consultarvariablesinternas.com.co/1.0</namespace>
             <!--Optional:-->
             <operation>consultarVariablesInternas</operation>
          </destination>
          <!--Optional:-->
          <classification>
             <!--1 or more repetitions:-->
             <classification>?</classification>
          </classification>
       </v1:requestHeaderOut>
    </soapenv:Header>
    <soapenv:Body>
       <ns:consultarVariablesInternasRequest>
          <datosGenericosRequest>
             <ipTransaccion>1.1.1.1</ipTransaccion>
             <codTransaccion>1</codTransaccion>
             <canal>1</canal>
          </datosGenericosRequest>
          <consultarVariablesInternasReq>
             <numDocumento>${dataVariablesInternas.numDocumento}</numDocumento>
          </consultarVariablesInternasReq>
       </ns:consultarVariablesInternasRequest>
    </soapenv:Body>
    </soapenv:Envelope>`;

   return JSON.stringify(dataReques);
};

module.exports = {
   "fn_soap_variablesInternas": fn_soap_variablesInternas,
}