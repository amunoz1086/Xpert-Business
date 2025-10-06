/* MP: webservices consultar produtos PN 1.0, solicita tipoDocumento y numeroDocumento*/

async function fn_xmlPath_consultarProductosPn(dataConsultarProductosPn) {

   let dataReques = {};

   const CHANNELADAPTER_HOST = process.env.URL_HOST_SOAP_CHANNELADAPTER;
   const CHANNELADAPTER_PORT = process.env.URL_PORT_SOAP_CHANNELADAPTER;
   const CHANNELADAPTER_PATH = process.env.URL_PATH_SOAP_CHANNELADAPTER;
   const SOAP_USERNAME = process.env.SERV_SOAP_USERNAME;

   dataReques.prHostname = `${CHANNELADAPTER_HOST}`;
   dataReques.prPort = `${CHANNELADAPTER_PORT}`;
   dataReques.prPath = `${CHANNELADAPTER_PATH}`;
   dataReques.prContentType = { 'Content-Type': 'application/xml' };
   dataReques.pridXml = 'consulta_productos';
   dataReques.prXml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://pragma.co/ents/common/BaseMessageFormat/V1" xmlns:ns="http://bancoomeva.com.co/interaccionDigital/consultarProductos/1.0">
   <soapenv:Header>
      <v1:requestHeaderOut>
         <systemId>1</systemId>
         <messageId>\${=java.util.UUID.randomUUID()}</messageId>
         <!--Optional:-->
         <invokerDateTime>2018-04-16T10:38:13</invokerDateTime>
         <!--Optional:-->
         <securityCredential>
            <userName>${SOAP_USERNAME}</userName>
            <!--Optional:-->
            <userToken>aW50X2RpZ2l0YWw=</userToken>
         </securityCredential>
         <!--Optional:-->
         <destination>
            <!--Optional:-->
            <name>consultarProductos</name>
            <!--Optional:-->
            <namespace>http://consultarProductos.com.co/1.0</namespace>
            <!--Optional:-->
            <operation>consultarProductos</operation>
         </destination>
         <!--Optional:-->
         <classification>
            <!--1 or more repetitions:-->
            <classification>?</classification>
         </classification>
      </v1:requestHeaderOut>
   </soapenv:Header>
   <soapenv:Body>
      <ns:consultarProductosRequest>
         <datosGenericosRequest>
            <canal>1</canal>
            <codTransaccion>010005</codTransaccion>
            <ipTransaccion>192.168.1.1</ipTransaccion>
            <bancaMovilActiva>true</bancaMovilActiva>
         </datosGenericosRequest>
         <consultarProductos>
            <tipoDocumento>${parseInt(dataConsultarProductosPn.tipoDocumento)}</tipoDocumento>
            <numeroDocumento>${dataConsultarProductosPn.numDocumento}</numeroDocumento>
            <!--Optional:--> 
            <tipoConsulta></tipoConsulta>
         </consultarProductos>
      </ns:consultarProductosRequest>
   </soapenv:Body>
   </soapenv:Envelope>`;

   return JSON.stringify(dataReques);
};

module.exports = {
   "fn_xmlPath_consultarProductosPn": fn_xmlPath_consultarProductosPn,
}