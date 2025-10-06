/* MP: webservices consultar produtos PJ sin targetas 1.0, solicita numeroDocumento*/

async function fn_xmlPath_consultarProductosPj_sinTarjeta(dataConsultarProductosPj) {

   let dataReques = {};

   const CHANNELADAPTER_HOST = process.env.URL_HOST_SOAP_CHANNELADAPTER;
   const CHANNELADAPTER_PORT = process.env.URL_PORT_SOAP_CHANNELADAPTER;
   const CHANNELADAPTER_PATH = process.env.URL_PATH_SOAP_CHANNELADAPTER;
   const SOAP_USERNAME = process.env.SERV_SOAP_USERNAME;

   dataReques.prHostname = `${CHANNELADAPTER_HOST}`;
   dataReques.prPort = `${CHANNELADAPTER_PORT}`;
   dataReques.prPath = `${CHANNELADAPTER_PATH}`;
   dataReques.prContentType = { 'Content-Type': 'application/xml' };
   dataReques.pridXml = 'consulta_productosPj_sinTarjetas';
   dataReques.prXml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header>
      <v1:requestHeaderOut xmlns:v1="http://pragma.co/ents/common/BaseMessageFormat/V1">
         <systemId>2</systemId>
         <messageId>BCMV-0102022030722914925</messageId>
         <invokerDateTime>2022-03-07 07:10:05</invokerDateTime>
         <securityCredential>
            <userName>${SOAP_USERNAME}</userName>
            <userToken>aW50X2RpZ2l0YWw=</userToken>
         </securityCredential>
         <destination>
            <name>consultarProductosEmpOrq</name>
            <namespace>http://consultarproductosemporq.com.co/1.0</namespace>
            <operation>consultarProductosEmpOrq</operation>
         </destination>
         <classification>
            <classification>?</classification>
         </classification>
      </v1:requestHeaderOut>
   </soapenv:Header>
   <soapenv:Body>
      <ns:consultarProductosEmpOrqRequest xmlns:ns="http://bancoomeva.com.co/interacciondigital/consultarproductosemporq/1.0">
         <datosGenericosRequest>
            <canal>2</canal>
            <codTransaccion>1</codTransaccion>
            <ipTransaccion>10.18.90.11</ipTransaccion>
            <bancaMovilActiva>1</bancaMovilActiva>
         </datosGenericosRequest>
         <consultarProductosEmpOrq>
            <tipoDocumentoUsuario>1</tipoDocumentoUsuario>
            <numDocumentoUsuario>123456</numDocumentoUsuario>
            <tipoDocumentoEmpresa>3</tipoDocumentoEmpresa>
            <numDocumentoEmpresa>${dataConsultarProductosPj.numDocumento}</numDocumentoEmpresa>
            <codUsuario/>
            <tipoConsulta>9</tipoConsulta>
         </consultarProductosEmpOrq>
      </ns:consultarProductosEmpOrqRequest>
   </soapenv:Body>
   </soapenv:Envelope>`;

   return JSON.stringify(dataReques);
};

module.exports = {
   "fn_xmlPath_consultarProductosPj_sinTarjeta": fn_xmlPath_consultarProductosPj_sinTarjeta,
}