import React from 'react'
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { Firmas } from './Firmas'
import { sumarDiasFechaIncial } from '@/app/lib/utils'

const diaLetras = {
    "1": "uno",
    "2": "dos",
    "3": "tres",
    "4": "cuatro",
    "5": "cinco",
    "6": "seis",
    "7": "siete",
    "8": "ocho",
    "9": "nueve",
    "10": "diez",
    "11": "once",
    "12": "doce",
    "13": "trece",
    "14": "catorce",
    "15": "quince",
    "16": "dieciséis",
    "17": "diecisiete",
    "18": "dieciocho",
    "19": "diecinueve",
    "20": "veinte",
    "21": "veintiuno",
    "22": "veintidós",
    "23": "veintitrés",
    "24": "veinticuatro",
    "25": "veinticinco",
    "26": "veintiséis",
    "27": "veintisiete",
    "28": "veintiocho",
    "29": "veintinueve",
    "30": "treinta",
    "31": "treinta y uno"
}

const ContratoConvenios = ({ dataContext }) => {


    const { cliente, clienteFiducia, convenioPago, convenioRecaudo, solicitud, tecnioOperador,
        clientModal,
        campoAdicionalesModal, } = dataContext

    // oficina
    const codigoBarras = convenioRecaudo.recaudoOficina[0]?.cantidad && convenioRecaudo.recaudoOficina[0]?.cantidad !== '' && convenioRecaudo.recaudoOficina[0]?.ticket && convenioRecaudo.recaudoOficina[0]?.ticket !== ''

    const manualReferencia = convenioRecaudo.recaudoOficina[1]?.cantidad && convenioRecaudo.recaudoOficina[1]?.cantidad !== '' && convenioRecaudo.recaudoOficina[1]?.ticket && convenioRecaudo.recaudoOficina[1]?.ticket !== ''

    //pse
    const pseRecaudo = convenioRecaudo.recaudoPSE[0]?.cantidad && convenioRecaudo.recaudoPSE[0]?.cantidad !== '' || convenioRecaudo.recaudoPSE[0]?.ticket && convenioRecaudo.recaudoPSE[0]?.ticket !== ''
    const portalPago = convenioRecaudo.recaudoPSE[1]?.cantidad && convenioRecaudo.recaudoPSE[1]?.cantidad !== '' || convenioRecaudo.recaudoPSE[0]?.ticket && convenioRecaudo.recaudoPSE[0]?.ticket !== ''

    const filterAdquirencia = (convenioRecaudo.adquirencia.filter(e => (e.tarifaRemi !== '' && e.punosNegociados !== '' && e.tarifaNegociada !== '') && (e?.tarifaRemi && e?.punosNegociados && e?.tarifaNegociada))).length > 0

    const acuerdoLibranza = false

    const financiamiento = false


    const fecha = new Date().toLocaleDateString()

    const fechaDuracion = sumarDiasFechaIncial(fecha, 365)

    const dia = fecha.split('/')[0]
    const mes = fecha.split('/')[1]
    const yyy = fecha.split('/')[2]


    return (
        <Document>
            <Page size="LETTER" style={{ padding: "0 13px" }} >
                <View style={{ width: "100%", margin: "0 auto", }}>
                    <View style={{ width: "100%" }}>
                        {/* header */}
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <Text style={{ fontSize: "8px", textAlign: "center", fontWeight: "bold", padding: "3px 0px", paddingLeft: "50px" }}>CONTRATO Y  ESPECIFICACIONES TÉCNICAS DE CONVENIOS - CONTRATO INTEGRAL</Text>
                            </View>
                            <View >
                                <View style={{ display: "flex", flexDirection: "row", fontSize: 8, borderWidth: "1px", padding: "0px 16px" }}>
                                    <Text style={{ borderRightWidth: 1, padding: "0px 20px 0px 0px" }}>Fecha</Text>
                                    <Text>{fecha}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", fontSize: 8, borderWidth: "1px", padding: "0px 16px" }}>
                                    <Text style={{ borderRightWidth: 1, padding: "0px 10px 0px 0px" }}>Regional</Text>
                                    <Text>{cliente?.nombreRegional || ''}</Text>
                                </View>
                            </View>
                        </View>
                        {/* operativo banco */}
                        <Text style={{ padding: "3px 0px", fontSize: "8px", fontWeight: "bold", textAlign: "center", backgroundColor: "#c00000", color: "white" }}>1. Información de las Partes del Acuerdo Técnico Operativo - Banco</Text>
                        <View style={{ margin: "0px 10px" }}>

                            <View style={{ marginTop: "2%", display: "flex", flexDirection: "row", fontSize: "8px", alignItems: "center", gap: 14 }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                                    <Text>Nombre:</Text>
                                    <Text>Bancoomeva</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                    <Text>Nit:</Text>
                                    <Text>900.406.150-5</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                    <Text>Representado por:</Text>
                                    <View style={{ width: "80rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {tecnioOperador?.representado}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                                    <Text>Mayor de edad y vecino(a) de:</Text>
                                    <View style={{ width: "80rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {tecnioOperador?.amyorEdadVencino}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", fontSize: "8px", marginTop: "10px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text>Identificado(a) con la cédula de ciudadanía No:</Text>
                                    <View style={{ width: "150rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {tecnioOperador?.identificacion}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text>de:</Text>
                                    <View style={{ width: "110rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {tecnioOperador?.de}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 14, fontSize: "8px", marginTop: "10px" }}>
                                <Text>Quien en este instrumento obra en su calidad de:</Text>
                                <View style={{ width: "200rem", textAlign: "center" }}>
                                    <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}>  {"Representante legal"}</Text>
                                </View>
                            </View>


                            <View style={{ display: "flex", flexDirection: "row", fontSize: "8px", marginTop: "10px" }}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text>Dirección:</Text>
                                    <View style={{ width: "300rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {tecnioOperador?.direccion}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", marginLeft: "15px" }}>
                                    <Text>Ciudad:</Text>
                                    <View style={{ width: "250rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {tecnioOperador?.ciudad}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", gap: 14, fontSize: "8px", marginTop: "10px" }}>
                                <Text>Correo electrónico:</Text>
                                <View style={{ width: "88px", textAlign: "center" }}>
                                    <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {tecnioOperador?.correo}</Text>
                                </View>
                            </View>


                        </View>

                        {/* operativo Cliente */}
                        <Text style={{ padding: "3px 0px", fontSize: "8px", backgroundColor: "#c00000", color: "white", marginTop: "20px", textAlign: "center" }}>2. Información de las Partes del Acuerdo Técnico Operativo - Cliente</Text>
                        <View style={{ margin: "0px 10px" }}>

                            <View style={{ marginTop: "2%", display: "flex", flexDirection: "row", fontSize: "8px", alignItems: "center", gap: 20 }}>

                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text>Nombre:</Text>
                                    <View style={{ width: "180rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}>{cliente?.cliente}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text>Nit:</Text>
                                    <View style={{ width: "40rem", textAlign: "center", borderBottomWidth: "1px", borderColor: "black" }}>
                                        <Text>{cliente?.numDocumento}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: "0 14" }}>
                                    <Text>Representado en este acto por:</Text>
                                    <View style={{ width: "150rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}>{clientModal?.representadoPorCli}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", fontSize: "8px", marginTop: "10px" }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text>Identificado(a) con la cédula de ciudadanía No:</Text>
                                    <View style={{ width: "100rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {clientModal?.identificacionCli}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text>de:</Text>
                                    <View style={{ width: "50rem", textAlign: "center", borderBottomWidth: "1px", borderColor: "black" }}>
                                        <Text >{clientModal?.deCli}</Text>
                                    </View>
                                </View>

                                <View style={{ display: "flex", flexDirection: "row", gap: 14 }}>
                                    <Text>Tipo de cliente</Text>
                                    <View style={{ width: "80rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {cliente?.tipoPersona}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 14, fontSize: "8px", marginTop: "10px" }}>
                                <Text>Quien en este instrumento obra en su calidad de:</Text>
                                <View style={{ width: "250rem", textAlign: "center" }}>
                                    <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {"Representante legal"}</Text>
                                </View>
                            </View>


                            <View style={{ display: "flex", flexDirection: "row", fontSize: "8px", marginTop: "10px" }}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text>Dirección:</Text>
                                    <View style={{ width: "250rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {clientModal?.direccionCli}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", marginLeft: "15px" }}>
                                    <Text>Ciudad:</Text>
                                    <View style={{ width: "100rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {clientModal?.ciudadCli}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", marginLeft: "15px" }}>
                                    <Text>Código CIIU</Text>
                                    <View style={{ width: "60rem", textAlign: "center" }}>
                                        <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}>  {clientModal?.codigoCiiu}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", gap: 14, fontSize: "8px", marginTop: "10px" }}>
                                <Text>Correo electrónico:</Text>
                                <View style={{ width: "600rem", textAlign: "center" }}>
                                    <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}> {clientModal?.correoCli}</Text>
                                </View>
                            </View>



                            <View style={{ fontSize: 8, display: "flex", flexDirection: "row", gap: 8, justifyContent: "space-between", marginTop: "6px" }}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                                        <Text>Naturaleza Jurídica:</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "30px", textAlign: "center" }}>
                                            {clienteFiducia?.naturaleza === '1' ? "X" : null}
                                        </Text>
                                        <Text>Pública</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                                        <Text style={{ borderBottom: "0.5px", width: "30px", textAlign: "center" }}>
                                            {clienteFiducia?.naturaleza === '2' ? "X" : null}
                                        </Text>
                                        <Text>Privada</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                                    <Text>Duración:</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>
                                        {fechaDuracion}
                                    </Text>
                                </View>

                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                                    <Text>Fecha de Inicio:</Text>
                                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>
                                        {fecha}
                                    </Text>
                                </View>

                            </View>



                        </View>

                        {/* Informacion de las partes */}
                        <Text style={{ padding: "3px 0px", fontWeight: "bold", backgroundColor: "#FF6B19", color: "white", marginTop: "20px", fontSize: "8px", textAlign: "center" }}>Información de las Partes del Acuerdo Técnico Operativo - Cliente</Text>
                        <View style={{ margin: "0px 10px" }}>

                            <View style={{ fontSize: "8px", marginTop: "4px" }}>
                                <Text>
                                    Las partes debidamente identificadas en este documento, han convenido celebrar un acuerdo con el objetivo de reglamentar la prestación de los servicios bancarios de recaudo, pago de nómina y/o proveedores, y adquirencia, el cual se regirá por las siguientes cláusulas:
                                </Text>
                            </View>

                        </View>

                        {/* capitulo 1 */}
                        <View style={{ margin: "2px 0px" }}>
                            <Text style={{ fontSize: "8px", textAlign: "center" }}>CAPÍTULO I</Text>
                            <Text style={{ fontSize: "8px", textAlign: "center" }}>DISPOSICIONES GENERALES PARA TODOS LOS SERVICIOS</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "4px 10px 0px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>1.- CONCEPTO. El presente documento regula los términos y condiciones de los servicios bancarios de (i) recaudo, (ii) pagos de nómina y/o proveedores, y (iii) adquirencia, los cuales estarán comprendidos por el alcance establecido en las disposiciones especiales contenidas en los capítulos que regulan cada servicio en particular. Para todos los efectos contractuales, entiéndase por “recaudo” al negocio jurídico en virtud del cual el Banco, obrando en condición de agente de transferencia, atiende un mandato del Cliente para recibir dinero de manos de terceras personas denominadas “Usuarios”, que tienen una obligación legal o contractual con el Cliente, donde correlativamente el Banco se obliga a abonar los dineros recibidos en la cuenta bancaria que deberá poseer el Cliente en el Banco. Así mismo, ha de entenderse por “pagos de nómina y/o proveedores” al servicio en virtud del cual el Cliente, utilizando la plataforma electrónica “Oficina Virtual” del Banco, procesa órdenes de transferencia de fondos en forma masiva y organizada  a cuentas previamente matriculadas de terceras personas denominadas “Usuarios”, bien sea utilizando la red del Banco para abonos en cuentas Bancoomeva o mediante la red ACH en la cual los abonos se procesan con destino a cuentas de otras entidades financieras afiliadas al sistema ACH. Y finalmente, debe entenderse por “adquirencia” al servicio por medio del cual el Cliente se adhiere a la red de transferencias electrónicas del Banco para vincular unos dispositivos de lectura de Tarjetas a la cuenta bancaria del Cliente en la cual han de abonarse todas las sumas de dinero que se procesen como pagos por parte de los “Usuarios” en los establecimientos del Cliente utilizando Tarjetas Débito o Crédito.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "8px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>2.- OBJETO Por virtud del presente convenio, el Banco se obliga a prestar al Cliente los servicios seleccionados en el numeral tres (3) del Anexo de especificaciones técnicas y Operativas de convenios, los cuales tendrán el alcance establecido en el capítulo que regula las disposiciones especiales de cada uno de ellos.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "2px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>3.- MODALIDADES DE RECAUDO. Tratándose del servicio de recaudo, este podrá realizarse por cualquiera de las dos siguientes modalidades, a elección del Cliente, pudiendo optar por contratar solo una de ellas, o las dos:</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "2px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>a) RECAUDO EN OFICINAS. En esta modalidad el recaudo se realiza a través de la red de oficinas del Banco ubicadas en el territorio nacional, durante el horario de atención de cada oficina y en la forma definida en el formato de “Especificaciones Técnicas y Operativas Convenio de Recaudo” que forma parte integral del presente convenio en calidad de Anexo, o bien a través de los corresponsales bancarios contratados por el Banco.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "2px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>b) RECAUDO POR EL SISTEMA DE PAGOS SEGUROS EN LÍNEA (PSE). Para la prestación de este servicio, el Banco tiene suscrito con la firma A.C.H. Colombia S.A., así como con el Banco de la República, unos contratos que le permiten utilizar los servicios de transferencia electrónica de fondos y que incluyen a su vez, la recepción, validación, procesamiento, distribución, compensación y liquidación de transacciones, entre otros, todo ello de conformidad con lo establecido en los contratos respectivos, en los formatos determinados y en los Manuales de Operaciones respectivos. De acuerdo con lo establecido en el Contrato Uniforme para la Transferencia Electrónica de Fondos y otras operaciones del Sistema A.C.H Colombia S.A., el Banco está facultado para celebrar acuerdos con sus clientes en virtud de los cuales estos lo autorizan para originar y/o recibir Transacciones Débito y Crédito, según el caso a través de la red de propiedad de A.C.H Colombia. En desarrollo de tales contratos, ACH Colombia S.A. cuenta con el servicio de Pagos Seguros en Línea (PSE) de manera centralizada y estandarizada para realizar pagos en línea por Internet, mediante el débito de recursos en las cuentas del “Usuario” desde la entidad financiera donde se encuentran los mismos. Para los propósitos de este convenio, el Banco tiene dispuesto el servicio de “Recaudos PSE” como una alternativa electrónica y totalmente opcional para el Cliente que lo solicite.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "2px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>c) RECAUDO POR PUNTO EFECTY: Para la prestación de este servicio, el Banco tiene suscrito con la firma Efectivo Ltda., un contrato que le permite utilizar los servicios de recaudo a través de los puntos Efecty, para suscribir con los clientes empresariales una alternativa de recaudo totalmente opcional. Para este servicio, se especifican las siguientes características especiales de operación en Línea: 1. El Cliente podrá realizar recaudos a través de esta red con la opción de con o sin base de datos, que cargará por medio de un correo electrónico al banco, o por medio de Web Service. El Cliente será el responsable de transferir la información en los horarios y frecuencia establecidos en la negociación, que será dispuesta a Efectivo Ltda., con el propósito de operar el recaudo en el territorio nacional. La utilización de base de datos de recaudo será opcional. 2. El dinero proveniente de los recaudos efectuados a través de los puntos de Pago Efecty serán trasferidos a las Cuentas de Recaudo del Cliente por Efectivo Ltda. en línea. El Cliente debe tener mínimo 250 operaciones de recaudo en los puntos de recaudo Baloto. 3. La relación comercial siempre será entre el Banco y el Cliente. 4. Toda reclamación sobre las operaciones de recaudos deberá canalizarse a través del Banco. El Cliente tendrá que presentar el soporte de pago entregado por el punto de recaudo Efecty para este fin. 5. Las operaciones de recaudo en los puntos de recaudo Efecty tendrán una tarifa que será negociada en el momento de la contratación con el Cliente. 6. Las operaciones de recaudo realizadas por este canal tendrán modalidad manual. 6. El monto por tracción mínimo es de mil pesos ($1.000) y máximo es de un millón ($1.000.000), en caso de necesitar tranzar por encima del monto máximo, se deben realizar varias transacciones.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "3px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARÁGRAFO. Las sumas que el Banco recaude en desarrollo de este convenio serán acreditadas a la cuenta de depósitos del Cliente previamente designada. El Cliente reconoce, desde ahora y sin reservas, como prueba de las operaciones que se realicen en desarrollo del presente contrato, las notas crédito y todo tipo de registros que aparezcan en el respectivo extracto de cuenta. Igualmente, acepta, como prueba de que una transacción electrónica no se efectuó, el registro de rechazo de la misma cuando se utilice los canales electrónicos del Banco.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "3px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>4.- MODALIDAD DE PAGOS DE NÓMINA Y/O PROVEEDORES. El servicio de pago se prestará en la modalidad de “Pago por Oficina Virtual Bancoomeva”, utilizando para ello las claves de acceso al sistema, las cuales han sido previamente asignadas por el Cliente a través del portal electrónico. Los pagos se harán en el formato dispuesto por el Banco y que se encuentra publicado en la Oficina Virtual denominado “formato propio” o en su defecto, las partes podrán acordar el uso de un formato propuesto por el Cliente, siempre y cuando éste sea compatible con el sistema de la Oficina Virtual. En caso de existir deficiencias en la transmisión de la información vía Internet, el Cliente podrá solicitar al Banco que se realice el pago mediante el envío de un archivo de pago en un formato de archivo plano a fin de que el Banco pueda capturar manualmente los registros del pago. Esta modalidad de pago será prestada a nivel nacional siempre y cuando el Cliente haya matriculado previamente las cuentas destinatarias de los pagos en la Oficina Virtual y que se encuentren en entidades financieras adscritas al sistema ACH. El Usuario podrá consultar en tiempo real a través de Oficina Virtual la información del pago realizado, consistente en valor y cuenta origen, cuenta destino de los fondos y al día hábil siguiente podrá consultar la información completa. Los pagos que se realicen a cuentas de otras entidades financieras se completarán en los ciclos dispuestos por el operador del sistema ACH. PARÁGRAFO. El Banco realizará el pago o dispersión de los fondos a través de la Oficina Virtual siempre que el Cliente tenga los fondos disponibles en su cuenta para realizarlo, de lo contrario, la operación será rechazada. El Banco generará automáticamente por el sistema de Oficina Virtual los comprobantes de pago correspondientes a las transacciones de cada registro de manera detallada o total. El Banco se reserva el derecho de no realizar los pagos en formatos que no sean compatibles con el sistema de Oficina Virtual o con el sistema del Banco mismo, incluyendo también aquellos formatos que si bien son los compatibles con el sistema, presenten inconsistencias, enmendaduras o cualquier otra irregularidad a juicio del Banco.
                                Además de las obligaciones que emanan de la naturaleza del acuerdo del que da cuenta el presente contrato el empleador que entregará la información confidencialidad estará obligado a: 1. Mantener la información confidencial en estricta reserva y no revelar ningún dato de la información a ninguna otra parte, relacionada o no, sin el consentimiento previo y escrito del empleado; 2. Instruir al personal que estará encargado de recibir y enviar la información confidencial, debiendo suscribir el correspondiente acuerdo de confidencialidad si fuere necesario, de su obligación de recibir, tratar y usar la información que reciban como confidencial y destinada únicamente al propósito objeto del acuerdo, en los mismos términos en que se establece en el presente contrato; 3. Viewulgar la información confidencial únicamente a las personas autorizadas para su recepción dentro de la organización; 4. Informar a cada uno de sus empleados, contratistas o representantes que reciben Información Confidencial, de la naturaleza confidencial de la información que se ha suministrado en desarrollo del presente Contrato e instruirlos para manejarla bajo adecuadas medidas de seguridad y que estos la utilicen de conformidad con lo dispuesto en este Contrato. El empleador será el responsable directo ante el Banco por el manejo y envío de información de sus empleados hacia el banco y por cualquier uso de la Información Confidencial que sus empleados, contratistas o representantes hicieren en contravención a lo pactado en este Contrato.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>5.-CONCEPTOS OBJETO DE RECAUDO. Cuando el Cliente haya contratado el servicio de recaudo, las sumas de dinero que el Banco reciba en recaudo serán por el(los) conceptos indicados en el Anexo de Especificaciones Técnicas y Operativas de este convenio. Durante su ejecución, y en cualquier tiempo, el Cliente podrá solicitar al Banco el recaudo de otros conceptos no definidos aquí, entendiéndose incorporados dichos conceptos a las reglas de este convenio.</Text>
                        </View>


                        <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>6.- DURACIÓN.La duración de éste convenio será la establecida en el numeral dos (2) del Anexo de especificaciones técnicas y Operativas de convenios. No obstante el plazo aquí pactado, las partes podrán dar por terminado el convenio en cualquier tiempo, dando aviso escrito a la otra parte con no menos de quince (15) días calendario de anticipación a la fecha en que se hará efectiva la terminación, sin necesidad de justificación, declaración judicial, ni reconvenciones o requerimientos por mora o indemnización de perjuicios de ninguna clase, derechos  a los que renuncian las partes. Parágrafo. Considerando que el presente convenio regula un servicio que resulta ser accesorio del contrato de cuenta corriente o de cuenta de ahorro, en el evento de darse la terminación del contrato principal, se producirá la terminación del presente convenio de manera consecuencial.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>7.- TARIFAS Y RECIPROCIDADES. Las tarifas que Banco cobrará al Cliente por los servicios objeto de este convenio serán las definidas en el Anexo de Especificaciones Técnicas y Operativas que forma parte integral del presente documento en calidad de Anexo. En el mismo documento se definirán las reciprocidades a las que se haya comprometido a cumplir el Cliente con el Banco en la ejecución de este convenio. Cuando las tarifas hayan sido pactadas en virtud de determinadas reciprocidades a las que el Cliente se hubiese obligado a cumplir, desde ahora el Cliente autoriza al Banco para efectuar las consultas necesarias tendientes a hacer seguimiento a la satisfacción de dicha obligación. Cuando el Banco observe que el Cliente no ha cumplido con el nivel de reciprocidades a las que se hubiese obligado, el Banco estará facultado para incrementar y cobrar la tarifa plena que se encuentre vigente para los servicios objeto de este convenio al momento de aplicar el incremento. Para todos los efectos de este convenio, la tarifa plena será la que se encuentre publicada en la página web del Banco al momento del incremento. Los precios y comisiones aquí establecidas corresponden a la vigencia del año en el que se suscribe el presente convenio. Para cada año subsiguiente los valores anteriores, se incrementarán en la tarifa que en forma previa y oportuna el Banco notifique al Cliente, las cuales no podrán ser inferiores al Índice de Precios al Consumidor (IPC) certificado por el DANE para año inmediatamente anterior.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>8.- DÉBITOS.  El Banco podrá debitar de las cuentas bancarias del Cliente, incluyendo la cuenta recaudadora, en forma automática y sin previo aviso al Cliente, las sumas de dinero que se originen por los siguientes conceptos: (i) Para atender órdenes de embargo libradas por autoridades competentes, (ii) comisiones o tarifas por el servicio pactado, o las tarifas derivadas de las reciprocidades convenidas. (iii) Impuestos por movimientos financieros, (iv) Cuando un tercero manifieste haber sido víctima de fraude y aporte prueba sumaria de tal situación. Lo anterior siempre y cuando haya formulado reclamación previa al Cliente. (v) Cuando el pago se haya efectuado mediante cheque y éste fuere devuelto por cualquier causal. (vi) Para compensar deudas con cualquier obligación dineraria que posea el Cliente con el Banco y sea actualmente exigible dada su condición de mora. (vii) Envío de cheques devueltos. (viii) cuando el Banco acredite en la cuenta recaudadora dineros de otro Cliente por error técnico o humano. (ix) Por orden de autoridad judicial o administrativa.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>9.- SEGURIDAD DE LA INFORMACIÓN Y RECURSOS TECNOLÓGICO.Las partes se comprometen a perfeccionar el proceso de recaudo, recibo y entrega de la información adoptando la tecnología y desarrollos informáticos necesarios para satisfacer más eficientemente a los “Usuarios” y el Cliente, así mismo manifiestan que cuentan con los estándares de seguridad adecuados de modo que la transmisión de la información y las transacciones objeto del presente convenio estén acordes con parámetros y herramientas de seguridad de alta confiabilidad. Así mismo se obligan a disponer todas las condiciones para que sus sitios de Internet o páginas sean seguros. Para los fines de la prestación de los servicios contratados, el Banco podrá utilizar su propia plataforma tecnológica o la de un tercero designado por éste que cumpla con los estándares de seguridades exigidos. En tal caso dicho tercero estará autorizado para conocer la información necesaria para la ejecución del servicio con fines estrictamente transaccionales y de procesamiento de información.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>10.- CONFIDENCIALIDAD DE LA INFORMACIÓN. Toda la información que las partes intercambien en desarrollo del presente convenio tiene la naturaleza de confidencial, y por tanto, cada parte asume el compromiso de mantenerla bajo estricta reserva y se obliga a adoptar las medidas necesarias para evitar que sea Viewulgada, publicada o puesta al conocimiento de terceras personas ajenas a la relación contractual. Para el Banco la presente obligación se establece sin perjuicio de su deber de mantener “reserva bancaria”. Para el Cliente este deber se extiende a guardar la más estricta confidencialidad respecto de la información del Banco, del Manual de Operaciones de los clientes afiliados al sistema PSE, y de los “Usuarios”, sean éstos clientes o no del Banco, protegiendo su intimidad negocial por medios idóneos tales como la encripción de información y el control lógico de acceso a la misma. Como consecuencia de lo anterior, las partes se abstendrán de revelar la información a terceros, e instruirán a sus empleados y dependientes para mantener la confidencialidad sobre toda información, so pena de indemnizar los perjuicios que se causen a la parte afectada como consecuencia de cualquier infracción a este deber de confidencialidad.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>11.- RECLAMOS. Cualquier reclamación de los “Usuarios” que no sea imputable al Banco deberá ser atendida por el Cliente, para lo cual el Banco prestará toda la colaboración y se obliga a suministrar al Cliente la información que se requiera para atender dichas reclamaciones. En el evento que el Banco reciba una reclamación de este tipo, estará facultado a trasladarlo al Cliente, quien desde ya se obliga a darle el trámite respectivo de acuerdo a sus procesos internos para solución de peticiones, quejas y reclamos. A su turno, las reclamaciones que el Cliente tenga frente al Banco las podrá formular a través del enlace “Atentos” habilitado en el portal de Internet www.bancoomeva.com.co o podrá acudir directamente a las oficinas de Bancoomeva, así como a la Defensoría del Consumidor Financiero o también podrá formular sus reclamaciones ante la Superintendencia Financiera de Colombia a través de la página web www.superfinanciera.gov.co. El Banco dispondrá de un término prudencial para dar respuesta a las reclamaciones del Cliente, el cual, en ningún caso podrá superar el término legalmente establecido. En el evento que por la complejidad de caso el Banco requiera de tiempo adicional para dar una respuesta completa y de fondo, procederá avisar oportunamente sobre la postergación del plazo para responder, indicando en todo caso la fecha máxima en la que dará la respuesta.</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>8. ANEXOS.  Forman parte integral del presente convenio los documentos que se relacionan a continuación, los cuales tienen la calidad de Anexos y resultan aplicables a las partes para la ejecución del servicio instrumentado en este convenio. Cualquier diferencia entre este documento y los Anexos, prevalecerá lo dicho en este convenio. Los Anexos listados a continuación serán los aplicables a cada uno de los servicios elegidos por el Cliente:</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>a) Anexo No.1.- Formato de Especificaciones Técnicas y Operativas de Convenios</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>b) Anexo No.2.- Manual de Operaciones de los Clientes Afiliados al Sistema PSE</Text>
                        </View>

                        <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>13. NOTIFICACIONES. Para todos los efectos derivados del presente convenio las partes fijan como direcciones oficiales en donde pueden ser notificadas o recibir correspondencia las establecidas en el Anexo de Especificaciones Técnicas y Operativas del presente documento.</Text>
                        </View>


                        {/* capitulo 2 */}
                        {

                            codigoBarras || manualReferencia ?
                                <>

                                    <View style={{ margin: "8px 0px" }}>
                                        <Text style={{ fontSize: "8px", textAlign: "center" }}>CAPÍTULO II</Text>
                                        <Text style={{ fontSize: "8px", textAlign: "center" }}>DISPOSICIONES ESPECIALES AL SERVICIO DE RECAUDO EN OFICINAS</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "0px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>14.- PUNTOS DE RECAUDO. Los servicios de recaudo objeto de este convenio se podrán realizar a través de los siguientes puntos:</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>a)  Oficinas Bancoomeva a nivel nacional</Text>


                                    </View>
                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>b)  Corresponsales  bancarios</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>c)  Aliados comerciales para el servicio de recaudo</Text>
                                    </View>


                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>15.- MODALIDAD. El servicio de recaudo en oficinas que prestará el Banco se efectuará en la modalidad de recaudo por caja, en las condiciones determinada por el Cliente en el Anexo “Especificaciones Técnicas y Operativas de Convenios”. Mediante el servicio de recaudo en caja el Banco se compromete a efectuar el recaudo en sus Oficinas habilitadas en los días y horas de atención al público establecidas por el Banco. El recaudo se hará en el “formato del Banco” o los formatos previamente aprobados por el Banco denominado “formato propio”, el cual debe llevar impreso el número de cuenta recaudadora. El costo de la impresión del formato, la producción, distribución y administración de la papelería que se utilizará para el recaudo estará a cargo del Cliente. Este tipo de recaudo se hará a través del recaudo manual o por código de barras. El Cliente generará y entregará al Banco la información sobre su facturación en condiciones aptas para su captura automática. Dicha información y referencias de captura serán validadas en caja por el Banco a través del cupón de recaudo manual o del código de barras y dígito de chequeo. En caso de existir deficiencias en la generación del código o dígito, o que los mismos no estén en condiciones aptas para su captura automática, el Banco quedará facultado para abstenerse de recibir el pago. Esta modalidad será prestada a nivel local o nacional, según lo establecido en la solicitud de especificaciones técnicas y operativas convenio de recaudo. El Cliente podrá consultar a través del medio electrónico habilitado por el Banco y en tiempo real la información del recaudo consistente en valor y primera, segunda y tercera referencia de captura y al día hábil siguiente podrá consultar la información completa.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>16.- MEDIOS DE PAGO. Para efectos del servicio de recaudo, el Banco admitirá los pagos que efectúen los “Usuarios” por el valor total a pagar y en la forma establecida en el formato de Especificaciones Técnicas y Operativas Convenio de Convenios. Para los “Usuarios” se entenderán como medios de pago (i) dinero en efectivo, (ii) cheque, o (iii) el débito a una cuenta en el Banco, sin perjuicio que en cualquier momento posterior el Banco implemente y habilite otros medios de pago según la modalidad de recaudo.</Text>
                                    </View>


                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>17.- PAGOS CON CHEQUE. El Banco podrá recibir el pago de los “Usuarios” mediante cheques siempre y cuando así lo consienta Cliente en el formato de Especificaciones Técnicas y Operativas de Convenios. En tales eventos los Cheques deben ser de la misma plaza donde se paga, deben estar librados a la orden del Cliente y en todo caso el “Usuario” debe registrar al respaldo del mismo el número de la cuenta del Cliente, nombre y teléfono del librador y referencia del pago o las definidas por el Cliente. Tanto el Banco como el Cliente se obligan a brindar esta información a los “Usuarios”. El Banco podrá abstenerse de recibir cheques que no contengan la anterior información. Los cheques que en desarrollo de los servicios objeto del presente convenio reciba el Banco, se entienden recibidos “salvo buen cobro”, por lo que su importe sólo será acreditado definitivamente una vez resulte corriente. En caso que el Banco haya facilitado la disponibilidad del importe del cheque recibido, con anterioridad a su pago por parte del banco librado, y éste resultare impagado, desde ahora el Cliente autoriza irrevocablemente al Banco para debitar su valor de la cuenta acreditada o de cualquier depósito que tuviere en el BANCO, e incluso para cargarlo contra cualquier cupo de sobregiro que tenga en dicha(s) cuenta(s). Así mismo el Banco no responderá en ningún caso por los cheques que reciba para el pago y que no pudiera ser efectivo por cualquier causa. Diariamente los cheques devueltos estarán a disposición del Cliente en las oficinas del Banco, siendo responsabilidad exclusiva del Cliente reclamarlos. Si transcurrido un mes sin que el Cliente reclame los cheques devueltos, el Banco, a su elección, los mantendrá en custodia por un tiempo prudencial o los enviará a la última dirección registrada del Cliente, bajo su costo y riesgo. En el evento de pérdida, hurto, destrucción total o parcial de los cheques recibidos para los pagos, la responsabilidad del Banco se limitará a efectuar el cobro de los mismos ante los Bancos librados de conformidad con los acuerdos interbancarios y en caso de que dicha gestión resulte infructuosa y si es del caso, efectuará a su costa el proceso de cancelación y reposición de los títulos, para lo cual el Cliente se compromete a prestarle la colaboración que sea necesaria.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>18.- REGISTRO DE TRANSACCIONES Y COMPROBANTES. El Banco dejará registro de las transacciones de recaudo por medio de sistemas computarizados. De cara a los “Usuarios” el Banco imprimirá en el respaldo de las facturas canceladas y de los cupones o desprendibles, el timbre de la máquina registradora o en su defecto el sello del Banco con la firma del cajero que lo reciba y entregará al “Usuario” los cupones destinados para el Cliente y se reservará el cupón distinguido con el nombre “Banco” para sus archivos. El Banco se reserva el derecho de no recibir pagos en formatos incompletos, mal diligenciados o que presenten inconsistencias, enmendaduras o cualquier otra irregularidad a juicio del Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>19.- RECAUDO EN CORRESPONSALES Y ALIADOS COMERCIALES. En el evento que el Banco habilite otros canales de recaudo tales como corresponsables bancarios o aliados comerciales para la prestación de éste servicio, el Banco dispondrá la capacitación y operatividad necesaria para que el recaudo en esos canales se lleve a cabo en las mismas condiciones operáticas y técnicas que las oficinas del Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>20.- TRANSACCIONES EN HORARIOS ADICIONALES O EXTENDIDOS. Con la suscripción del presente convenio, desde ya el Cliente acepta los horarios bancarios corrientes, los cuales serán los dispuestos por el Banco para la prestación de sus servicios ordinarios en oficinas a nivel nacional. Cuando el Banco disponga la extensión de horarios para la prestación de servicios o habilite los mismos en días sábados o festivos, las transacciones serán procesadas con fecha del siguiente día hábil. Es entendido que los pagos cuyo vencimiento esté previsto para un día festivo se prorrogará para todos los efectos hasta el día hábil siguiente, y el Cliente aceptará que su abono se produzca en esa nueva fecha. Si el Cliente requiere validación de fecha límite de pago se recibirán los pagos hasta la fecha de vencimiento únicamente en horario normal, dado que todo recaudo efectuado en horario adicional, sábado, domingo o festivo, será contabilizado con fecha del día hábil siguiente.</Text>
                                    </View>

                                </> : null

                        }


                        {/* Capitlo III */}
                        {
                            pseRecaudo || portalPago ?
                                <>
                                    <View style={{ margin: "10px 0px" }}>
                                        <Text style={{ fontSize: "8px", textAlign: "center" }}>CAPÍTULO III</Text>
                                        <Text style={{ fontSize: "8px", textAlign: "center" }}>DISPOSICIONES ESPECIALES AL SERVICIO DE RECAUDO POR INTERNET PSE</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "0px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>21.- OBJETO. Adicional al servicio de recaudo manual en oficinas, el Banco tiene a disposición del Cliente el servicio de recaudo mediante el sistema de procesamiento electrónico de los pagos y cobros utilizando el botón de pagos PSE de propiedad del proveedor ACH Colombia S.A. Las normas contenidas en este capítulo serán aplicables a las partes cuando el Cliente haya optado por contratar este servicio, constancia de la que se dejará registro mediante la asignación del tipo de servicio en el Anexo de especificaciones técnicas y Operativas de convenios. Así entonces, las partes regulan las condiciones generales que deberán ser observadas como consecuencia de la prestación del servicio de procesamiento electrónico de los pagos vinculados a los recaudos que los “Usuarios” realicen a través del sistema centralizado y estandarizado conocido como PSE a través de la página web del Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>22.- ALCANCE.El Banco pone a disposición del Cliente un espacio en su portal de pagos electrónico a través de su página web www.bancoomeva.com.co mediante el cual podrá alojar, configurar y categorizar su facturación, a través del cual podrá recibir pagos electrónicos a través de una taquilla asignada configurada por el servicio de PSE Hosting. Es responsabilidad del Cliente realizar el cargue de un archivo plano con la información de la facturación de los “Usuarios”.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>23.- RESPONSABILIDAD DEL BANCO. En la ejecución de esta clase de operaciones fiduciarias, el Banco actúa como recaudador, por lo que no se constituye en responsable ni garante del Cliente frente a sus empleados, clientes, usuarios, miembros y terceros en lo relativo a solvencia, seriedad, solidez o cumplimiento de las obligaciones que le competen al Cliente.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>24.- REQUISITOS DE CONECTIVIDAD Y OPERACIÓN. Para efectos de llevar a cabo éste servicio electrónico, el Cliente se obliga a cumplir de manera previa a la suscripción del presente convenio, todos los requerimientos y a asumir los costos de la infraestructura mínima de conectividad y autenticación descrita en el Manual de Operaciones de los clientes afiliados al sistema PSE, que hace parte integral de este convenio.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>25.- OPERATIVIDAD DEL SERVICIO.Una vez suscrito este convenio, el Banco habilitará una taquilla en su portal de pagos electrónico a nombre del Cliente. Posteriormente le asignará un Usuario y una contraseña de acceso a su taquilla asignada. Una vez ingrese a la taquilla, el Cliente deberá realizar el cargue de las facturas o Estados de Cuenta de los “Usuarios” en un archivo plano bajo la estructura definida por el Banco. En los periodos de pago definidos por el Cliente. Los “Usuarios” podrán ingresar a la página www.bancoomeva.com.co y buscar al Cliente en el portal de pagos, posteriormente ingresan su número de identificación y demás códigos de validación definidos por el Cliente, seleccionarán la factura a su nombre y posteriormente podrán ordenar el pago de la misma a través del sistema de Pagos Seguros en Línea. Cada “Usuario” procesará el pago de las factura a favor del Cliente mediante el débito de su cuenta en la entidad financiera que la posea, transfiriendo los recursos mediante la red ACH hasta la cuenta recaudadora que el Cliente posee en el Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>26.- CUSTODIA DEL USUARIO Y CONTRASEÑA. Es responsabilidad del Cliente mantener bajo estricta confidencialidad el usuario y la contraseña asignada por el Banco para realizar el cargue de su facturación en el portal de pagos del Banco. Estos datos son personales e intransferibles, por lo que el Cliente asume la responsabilidad por el uso y manejo de los mismos.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>27.- SUSPENSIÓN DEL SERVICIO. El Banco se reserva la facultad, en todo tiempo, de negar el servicio, o de suspender y/o terminar el servicio en ejecución, de manera unilateral, por razones de protección del sistema de pagos. Se presumen como razones de protección del sistema, aquellas que se basen en la detección de vulnerabilidades en los sistemas de operación y/o procesamiento del Banco, el sistema de operación y/o procesamiento del Cliente, o la inclusión del Cliente y/o de sus principales accionistas o directores en listados nacionales o internacionales como sospechosos de participar en actividades de lavado de activos, de faltas a la transparencia en la contratación, o de estar vinculados de cualquier otra forma a actividades delincuenciales o de apoyo a grupos al margen de la ley.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>28.- ACREDITACIÓN DE LOS PAGOS. El Cliente manifiesta conocer y aceptar que la acreditación de los pagos no se hará en línea, pues éstos se podrán hacer efectivos dentro de los tiempos que tome la compensación interbancaria o los ciclos de transferencia de la red de pagos. Adicionalmente, el Cliente autoriza al Banco para que reverse las transacciones que se hayan realizado de manera errónea o fraudulenta, a criterio del Banco y/o las autoridades competentes</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "8px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>29.- OBLIGACIONES GENERALES A CARGO DEL CLIENTE. Para la habilitación y puesta en funcionamiento del sistema de recaudos y pagos PSE el Cliente se obliga a:</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>a) Diligenciar en forma correcta el formato dispuesto para la inscripción de la cuenta corriente o de ahorros receptora de los recursos de  su propiedad, asumiendo las consecuencias derivadas de un error en el trámite y a entregarla al Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>b) Diligenciar en forma correcta la información requerida para la obtención del certificado digital requerido y cumplir con todas las cargas y obligaciones inherentes a la custodia física, lógica y administrativa de la(s) clave(s) y del certificado.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>c) Mantener en forma encriptada el registro de todas las operaciones, obligándose a entregar al Banco copia de los registros que le sean solicitados.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>d) Contar con sistemas de prevención, control y seguridad que enfrenten los riesgos de fraude vinculados a vulnerabilidades en el área administrativa, física, lógica y de comunicaciones. El Banco se reserva el derecho de efectuar visitas de auditoría cuando lo estime conveniente, para lo cual puede contar con el apoyo de terceros.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>e) Atender en forma debida y oportuna las reclamaciones que se presenten, entendiéndose en forma directa con el cliente en la resolución de los conflictos vinculados al derecho de retracto, o diferencias en las condiciones, calidad, cantidad o cualquier otra materia vinculada al  bien o servicio como tal.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>f) Guardar la factura o documento equivalente para acreditar la realidad y condiciones de la venta y el debido cumplimiento de las disposiciones tributarias. Las transacciones a las que se refiere el presente reglamento, deberán acompañarse de un recibo, factura  o documento equivalente que se entregará adjunto al bien o servicio adquirido por el cliente financiero.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "8px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>30.- LIMITES A LA RESPONSABILIDAD DEL BANCO POR RIESGOS TECNOLÓGICOS. El Banco no asume responsabilidad alguna por la continuidad del servicio y los riesgos a los que se encuentra expuesta la infraestructura tecnológica del sistema de pagos y su operación. Esta exención de responsabilidad se extiende entre otras materias, sin limitarse a ellas, a los riesgos tecnológicos derivados de errores lógicos en los aplicativos, sabotajes en los soportes lógicos, fallas en los equipos de hardware, caídas en el fluido eléctrico o en los servicios de telecomunicaciones asociados a la prestación del servicio. El Banco se exonera de toda responsabilidad pecuniaria derivada de estos hechos y limita su responsabilidad al ejercicio de las actividades correctivas que razonablemente deban tomarse para restituir el servicio o hacer frente a las anomalías que llegaren a afectarlo. Esta exoneración de responsabilidad se extiende a favor de todos los integrantes del sistema de pagos a través del cual se procesan las operaciones.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>31.- SUSPENSIÓN DEL SERVICIO. El Banco se reserva la facultad, en todo tiempo, de negar el servicio, o de suspender y/o terminar el servicio en ejecución, de manera unilateral, por razones de protección del sistema de pagos. Se presumen como razones de protección del sistema, aquellas que se basen en la detección de vulnerabilidades en los sistemas de operación y/o procesamiento del Banco, el sistema de operación y/o procesamiento del Cliente, o la inclusión del Banco y/o de sus principales accionistas o directores en listados nacionales o internacionales como sospechosos de participar en actividades de lavado de activos, de faltas a la transparencia en la contratación, o de estar vinculados de cualquier otra forma a actividades delincuenciales o de apoyo a grupos al margen de la ley.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>32.- RIESGO DE REPUDIO. En el caso de recaudo de facturación, no se aplicará el derecho de repudio y por lo tanto el “Usuario” deberá hacer la reclamación directamente al Cliente en caso tal que no esté de acuerdo con el valor facturado. Ni el Banco ni ACH Colombia serán responsables por inconsistencias en el valor facturado por lo que se entenderá que el valor que liquide la pagina transaccional respectiva es el valor adeudado y que se podrá pagar. No obstante lo anterior, en caso de permitirse tecnológicamente los pagos parciales, deberá notificarse con la antelación y los términos establecidos en este convenio.</Text>
                                    </View>


                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>33.- ACREDITACIÓN DE LA CUENTA. La acreditación de la cuenta no se hará en línea, haciéndose efectiva dentro de los tiempos que tome la compensación interbancaria. Cualquier cambio en este aspecto será informado con la correspondiente antelación y entrará a aplicar en los términos aquí consagrados, de conformidad con los términos de este convenio.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>34.- INFORMACIÓN DE CAMBIOS RELEVANTES. El Cliente es responsable de informar de manera inmediata al Banco cualquier modificación que pueda incidir en el desarrollo de este convenio, tales como cambios en sus datos, sitios o mecanismos de operación, de modo que ésta realice las modificaciones necesarias en los registros.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>35.- CAMBIOS. Las condiciones de conectividad y autenticación, así como los términos de este reglamento, podrán ser modificados de tiempo en tiempo por el Banco, no obstante: (i) el Banco se obliga a notificar al Cliente, a la página Web o a la dirección registrada de los cambios al reglamento o del programa de actualización tecnológica requerido;  (ii) los cambios entrarán en vigencia a partir de los cinco (5) días hábiles siguientes a la notificación anterior, salvo que los cambios contengan otra fecha para su vigencia o se establezca un período para su implementación. (iii) dentro del plazo de los cinco (5) días hábiles siguientes a la notificación del cambio o requerimiento, el Cliente podrá, sin indemnización alguna a su cargo y con justa causa, ejercer su derecho de terminación anticipada del negocio jurídico, el que deberá ejercerse mediante comunicación escrita dirigida al Banco. (iv) el no recibo de una comunicación de retiro dentro del plazo en cuestión se presume como aceptación de los cambios o modificaciones. Así mismo, se tendrá como una aceptación tácita, el trámite y no repudiación de recaudos por estos canales dentro de los días inmediatamente siguientes a la entrada en vigor del cambio en cuestión.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>36.- CLÁUSULA ANTIFRAUDE. El Cliente al hacer uso de los servicios del Banco, acepta y autoriza las investigaciones y auditorías decretadas por el Banco y la utilización de la información del usuario final, para la prevención del fraude, determinación de su posible ocurrencia e investigación de incidentes o posibles vulnerabilidades. El Banco podrá contratar con terceras entidades el desarrollo de tales investigaciones, auditorías y visitas a quienes el Cliente se obliga a prestar su colaboración y asistencia, lo que implica extender su autorización, sobre bases de la debida confidencialidad, a la consulta o reporte de información concerniente a dichas operaciones, en los registros y bases de datos propias y otras bases especializadas, todo esto, sin perjuicio de la observancia de las garantías previstas en las disposiciones legales vigentes. Dichas visitas y procedimientos se realizarán con el objeto de establecer la realidad de los hechos y producir recomendaciones que subsanen posibles vulnerabilidades y mejoren el perfil del riesgo de la operación, en cuyo desarrollo si se advierten elementos que comprometan la responsabilidad del Cliente, su investigación se hará en todo caso con observancia de parámetros acordes al debido proceso, lo que implica la socialización con el Cliente de los hallazgos y la extensión al mismo de una oportunidad para aportar nuevas pruebas previa a la producción del informe final por parte de la entidad designada con destino al Banco. En todo caso, éste informe refleja una opinión técnica o profesional por parte de una entidad de derecho privado que no es vinculante para el Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>37.- CONTROL, PREVENCIÓN Y DETECCIÓN DE FRAUDE.El Banco establecerá los mecanismos de control, prevención y detección de fraudes de acuerdo con los parámetros de seguridad establecidos por éste para cada comercio en particular, tales como generar alertas, hacer monitoreos, bloqueos, reversiones, establecer límites transaccionales, establecer transacciones sujetas a verificación y en general cualquier otro control que sea considerado por el Banco para mitigar la exposición al riesgo de fraude en adición o complemento a los controles existentes en los Manuales de Operación de los servicios ofrecidos por el Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>38.- REVERSIÓN DE OPERACIONES. El Cliente autoriza al Banco para que reverse las transacciones y/o retenga, reintegre, debite o bloquee los recursos que se hayan acreditado en sus cuentas de manera errónea o fraudulenta por parte del Banco u otro(s) cliente(s) del Banco u otros bancos. En caso de que no sea posible el reintegro de los dineros, el Cliente se obliga a devolverlos al Banco dentro de los cinco (5) días hábiles siguientes a la solicitud escrita realizada por el Banco sin necesidad de requerimientos adicionales. El incumplimiento de lo previsto anteriormente, dará lugar a que el Banco inicié los procesos judiciales correspondientes con base en sus registros contables y lo dispuesto en el presente contrato, y para tal efecto lo dispuesto en la presente cláusula queda dotado de mérito ejecutivo.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>39.- VALOR PROBATORIO. El Cliente se compromete a reconocer como prueba, sin reserva alguna los registros electrónicos generados en la utilización del sistema de transferencia electrónica de fondos aquí convenido, teniendo en cuenta que los registros electrónicos tendrán el valor probatorio que le otorga la Ley 527 de 1999.</Text>
                                    </View>

                                </> : null
                        }





                        {/* CAPITULO IV */}
                        {
                            filterAdquirencia ?
                                <>
                                    <View>
                                        <Text style={{ fontSize: "8px", textAlign: "center" }}>CAPÍTULO IV</Text>
                                        <Text style={{ fontSize: "8px", textAlign: "center" }}>DISPOSICIONES ESPECIALES DEL SERVICIO DE ADQUIRENCIA</Text>
                                    </View>
                                    <View style={{ fontSize: "8px", margin: "8px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>40.- OBJETO.Por virtud del presente contrato, el Banco pone a disposición del Cliente toda su infraestructura tecnológica necesarios para realizar el recaudo de los pagos que los clientes y usuarios del Cliente realicen en sus establecimientos de comercio, mediante el uso de Tarjetas Débito o Crédito de cualquiera de las franquicias o sistemas que ofrezcan este servicio en el Banco. El servicio de recaudo de que trata el presente capítulo se denominará Adquirencia. El establecimiento de crédito emisor de la Tarjeta se denominará “Pagador” y el Banco, en su calidad de recaudador de los pagos, se denominará “Adquirente”.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>41.- CONTRATO ACCESORIO. El presente servicio es de naturaleza accesoria en la medida que lo que regula es un servicio financiero que depende de la existencia de un contrato de cuenta corriente bancaria o de depósito de ahorro en cuenta, de tal suerte que la vigencia y alcance del presente servicio estará subordinada a la existencia del contrato principal.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>42.- ADQUIRENCIA.</Text>
                                        <Text style={{ display: "inline" }}> El Cliente podrá afiliarse a las franquicias de pagos electrónicos que determine, con el objetivo de realizar la venta de productos y servicios en sus establecimientos de comercio, aceptando las Tarjetas Débito o Crédito como medio de pago. Para estos efectos, el Banco actuará como adquierente recibiendo los abonos autorizados por el Pagador y derivados de los pagos efectuados por los Tarjetahabientes. El Banco aceptará la consignación, para las cuentas designadas, de vouchers o comprobantes de venta, originadas en las ventas que el Cliente realice  aceptando  como  medio  de  pago  tarjetas  débito  o crédito de las franquicias autorizadas. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px 0px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>43.- MANEJO OPERATIVO.Para la realización de las consignaciones por parte del Cliente. Cada alternativa corresponde a uno de los mecanismos para realización de ventas ofrecidos por las franquicias de tarjetas y pactados entre el Cliente y dichas franquicias, de tal manera que no obstante lo  aquí establecido,  el procedimiento  se surtirá  teniendo  en cuenta  los procedimientos operativos pactados entre el Cliente y las franquicias, así como los procedimientos establecidos en los reglamentos operativos de cada una de las franquicias de tarjetas débito o crédito, para cada procedimiento de ventas con tarjetas débito o crédito. Para todas las ventas que se realicen en un punto de venta del Cliente con tarjetas débito o crédito, éste se obliga a exigir al Tarjetahabiente la presentación de la Tarjeta y el documento de identificación para validar que su identificación corresponda al nombre realzado, indentado o termoimpreso en la Tarjeta y que la firma registrada en la Tarjeta, sea la misma que la estampada en el pagaré o comprobante de venta, para lo cual debe exigir que el Tarjetahabiente firme en su presencia dicho documento. El Cliente se obliga a abstenerse de realizar ventas en el evento en que la persona portadora de la Tarjeta Débito o Crédito no se identifique como titular de la misma, asumiendo ante el Banco la responsabilidad que se derive de fraudes o suplantaciones de personas por el incumplimiento de dicha obligación. Para cada uno de los siguientes esquemas de recaudo se operará de la como se establece a continuación:</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>a) CONSIGNACIÓN DE VENTAS PRESENCIALES MANUALES.El Cliente se obliga a consignar los vouchers dentro de un plazo no superior a los tres (3) días hábiles siguientes a la fecha de la transacción, para el efecto, deberá diligenciar el comprobante de consignación dispuesto por el Banco, relacionar los vouchers a consignar, el valor total de los vouchers, marcar el tipo de franquicia e imprimir los datos del afiliado a través de la máquina imprinter. En el evento que el Banco llegue a implementar una modificación al procedimiento para este tipo de ventas, el Cliente se obliga a cumplirlo en los términos que le haya informado el Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>b) CONSIGNACIÓN ELECTRÓNICA. Si el Cliente posee datafono con tecnología  para  depósito  electrónico, no  necesitará  diligenciar  el  comprobante manual de consignación, sino que deberá realizar el cierre de la terminal ya que la transacción quedará almacenada en el sistema de pagos para los procesos respectivos.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>c) VENTAS ESPECIALES (VENTAS NO PRESENCIALES).En caso que el Cliente obtenga la autorización para procesar ventas con tarjeta por canales de distribución diferentes a los anteriores, se sujetará en cada caso a los reglamentos y condiciones definidos por el sistema de pagos correspondiente. El Cliente se obliga a cumplir el procedimiento establecido y el que llegare a establecer el Banco y/o las franquicias para este tipo de ventas. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>d) RECAUDO. En caso que se autorice la habilitación de los canales electrónicos de recaudo de los sistemas de tarjetas para las operaciones de recaudo convenidas con el Banco, se aplicarán los reglamentos y condiciones definidos por el sistema de pagos correspondiente, sin perjuicio de las reglas y condiciones especiales acordadas entre las partes. En este evento se modificará el presente contrato, para establecer la mecánica operativa para realizar las consignaciones y para determinar el tiempo mínimo de disponibilidad de los recursos por parte del Cliente – tiempo de canje – en caso de resultar corrientes las operaciones, y para incluir todas las previsiones que resulten pertinentes. La prestación del servicio se realizará siempre que el Banco convenga expresamente en ello.</Text>
                                    </View>


                                    <View style={{ fontSize: "8px", margin: "8px 10px" }}>

                                        <Text style={{ textAlign: "justify" }}>
                                            PARÁGRAFO  PRIMERO.
                                            Previo el  cumplimiento  de todos  los requisitos antes señalados por parte del Cliente, el Banco presentará para cobro ante el correspondiente sistema de pagos los valores y documentos consignados, trámite que se surtirá de conformidad con lo establecido en los reglamentos operativos de cada sistema de pagos, de tal manera que los recursos estarán disponibles en la cuenta del Cliente en los plazos mínimos de disponibilidad señalados en los correspondientes reglamentos.<Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARÁGRAFO SEGUNDO.</Text>El Cliente se obliga a diligenciar debidamente los  valores o bases exigidos  por la  ley tributaria para  el cálculo de  impuestos, retenciones o devoluciones, en el dispositivo de acceso, pagaré o documento de pago   correspondiente. El Cliente será el único responsable frente a la Dirección de Impuestos y Aduanas Nacionales o cualquier otra autoridad tributaria correspondiente, por la exactitud y correcta liquidación y reporte del impuesto o base correspondiente, manteniendo libre al Banco y al sistema de pagos de la responsabilidad que les sea inculcada por reportar el impuesto, practicar la retención correspondiente o calcular las devoluciones a que haya lugar  sobre valores o bases que por  dicha  causa  no reflejen adecuadamente el monto del impuesto, retención o devolución respectiva.
                                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARÁGRAFO TERCERO.</Text>

                                            El Cliente autoriza al Banco para cargar, el valor de cualquier pagaré o nota de compra sin número de autorización asignado por el sistema de pagos, que carezca de la correspondiente autorización o que no reúna los demás requisitos exigidos por el sistema de pagos o que se encuentre en discusión o haya sido objeto de repudio, así como el valor de las sanciones a su cargo derivadas de su vinculación a un sistema de pagos. Se pacta de manera expresa que el valor se podrá debitar y/o cargar aún en caso de que los valores correspondientes ya hayan resultado corrientes al realizar la operación de canje, y aún, cuando respecto de la consignación correspondiente no hayan existido glosas o reportes de errores por parte del sistema de pagos. El Cliente autoriza que el débito y/o cargo se realizará contra simple solicitud escrita, electrónica o por cualquier otro medio del sistema de pagos. Las partes acuerdan expresamente que el Banco no asume responsabilidad alguna en caso de que la solicitud de débito y/o crédito realizada por el sistema de pagos corresponda a irregularidades efectivas de las operaciones, o a causales establecidas en los convenios, reglamentos u otros documentos que vinculen al medio de pagos con el Cliente, de tal manera que cualquier reclamación por la realización de dichos débitos debe ser dirigida directamente al correspondiente sistema de pagos o su entidad administradora.
                                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARÁGRAFO CUARTO.</Text>
                                            El Banco producirá y enviará un estado de cuenta mensual en donde relacionará y liquidará todas las transacciones de acuerdo con las condiciones pactadas por el servicio.
                                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARÁGRAFO QUINTO.</Text>
                                            El Cliente se obliga a suministrar al Banco y a los sistemas de pago que lo exijan en los plazos estipulados en los reglamentos de cada sistema de pagos, las copias de los comprobantes de venta de aquellas  transacciones que los tarjetahabientes de las entidades financieras asociadas al respectivo sistema manifiestan no haber realizado, cumpliendo con las características mínimas definidas por cada sistema de pagos, y a dar las explicaciones sobre todas las circunstancias de las transacciones. De no hacerlo, o en caso de no haber recursos suficientes de cualquier cuenta o depósito que el Cliente tenga en el Banco, o en el evento de haber cancelado la cuenta recaudadora o de no tener otros depósitos, el Cliente autoriza al Banco a cargar contra los recursos de la cuenta recaudadora el valor correspondiente a los comprobantes no presentados, así como a crear a su cargo una cuenta por cobrar. El Cliente desde ahora autoriza al Banco a reportar cualquier operador de información la existencia, origen, incumplimiento, tiempo de mora, etc., de las obligaciones a su cargo en las obligaciones del presente contrato.<Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARÁGRAFO SEXTO.</Text>  El Cliente declara  que  conoce y acepta los contracargos y todas las causales de devolución  definidas por el sistema de pagos correspondiente. El Banco podrá abstenerse de abonar o cancelar vouchers o documentos de pago que no reúnan los requisitos establecidos en los reglamentos de los sistemas de pagos a que pertenecen los respectivos vouchers o notas de compra. En estos casos, o si los documentos consignados no resultan corrientes, el Banco los devolverá al Cliente para que éste gestione su recaudo por las vías conducentes.
                                            <Text style={{ fontWeight: "bold", textAlign: "justify" }}> PARAGRAFO SEPTIMO.</Text>
                                            CANCELACIONES: En caso de presentarse una solicitud de cancelación de Adquirencia, el cliente podrá efectuarla, sin embargo, la Cuenta Corriente solo podrá cancelarse transcurridos 180 días calendario después de haber realizado la última transacción.
                                        </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "10px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>44.- OBLIGACIONES DEL CLIENTE. En desarrollo de este contrato, el Cliente se obliga para con el Banco a cumplir con todas y cada una de las obligaciones derivadas del presente contrato, en especial al cumplimiento de las siguientes: (i) Asistir con sus empleados al curso de capacitación en políticas de seguridad impartido por los Franquiciantes o por cualquier otra entidad que informe el Banco. (ii) Observar y acatar siempre los términos y condiciones que regulen los derechos, cargas y obligaciones de los establecimientos aceptantes de tarjetas en el respectivo sistema, lo que comprende, sin limitarse a ello, las disposiciones sobre distribución del riesgo, firmeza y   reversión de operaciones, débitos y/o cargos. En desarrollo de lo anterior, autoriza de manera irrevocable al Banco para efectuar los reversos, débitos, y/o cargos a la cuenta, en desarrollo de las reglas previstas por el respectivo sistema de pagos y en el Estatuto del Consumidor. (iii) Reintegrar al Banco el valor de las sumas, multas y/o sanciones que, con ocasión de su culpa o dolo o nivel de fraude, le hayan sido impuestas al Banco por parte de los sistemas de pagos, como en el evento en que las entidades financieras emisoras de tarjetas se abstengan de asumir el riesgo de fraude, porque Cliente excede el índice definido de fraude. (iv) Colaborar en el control del fraude mediante la estricta aplicación de las cautelas y cotejos previstos por cada sistema de pagos en la realización de la venta de bienes y servicios, según el tipo de canal de distribución autorizado. En el evento en que el nivel de fraude del Cliente en ventas presenciales supere el índice de siniestralidad promedio del mercado aplicable por  el tipo de establecimiento, según se determine dentro del sistema de pagos respectivo, éste se obliga a asumir las pérdidas derivadas de todo fraude cometido, una vez superado dicho nivel, así como las sanciones pecuniarias a cargo del Banco e impuestas por el sistema de pagos correspondiente. En las ventas a distancia o sin presencia física (venta no presencial), el riesgo de fraude corre por cuenta del Cliente, sin perjuicio de las excepciones previstas en los programas especiales de tales sistemas de tarjeta. En cualquier caso, el Cliente autoriza al Banco para debitar y/o cargar de su cuenta o cualquier depósito que tenga en el Banco, cualquier suma, multa o sanción que se origine con ocasión del exceso en los niveles de fraude del Cliente. (v) A no realizar  ninguna operación sin el cumplimiento de todos los requisitos, verificación de los reglamentos y adecuada identificación de los Tarjetahabientes. (vi) Cuando el Cliente reciba alguna transacción que sea tachada de fraudulenta o irregular, dar toda la información, colaborar con la investigación y permitir el acceso a sus archivos y registros contables relativos a tal operación. (vii) Guardar, para todos los tipos de ventas que le sean autorizados, la más estricta confidencialidad con la información contenida en los vouchers o notas de compra que sean objeto de procesamiento, así  como  frente  a  la  información  a  la que llegare  a tener acceso, vinculada a la utilización de una tarjeta o instrumento de pago del sistema de marca en el respectivo canal de distribución. El Cliente declara conocer y aceptar que dicha información se encuentra sujeta a reserva bancaria y en consecuencia se obliga a mantener indemne al Banco frente a cualquier daño, pérdida, acción, sanción, multa o requerimiento del que sea sujeto como consecuencia de la violación de dicha reserva. El Cliente deberá abstenerse de almacenar, por cualquier medio, el contenido de cualquier pista de banda magnética del reverso de las Tarjetas o Chip. Se prohíbe la lectura de la banda magnética o chip en dispositivos no autorizados al Cliente por sistema de pagos o la red, así como almacenar el código de validación de las tarjetas. En caso de efectuarse registros cruzados en sus sistemas de procesamiento de las ventas, que supongan la captura de los datos relativos a la transacción financiera con propósitos legítimos, la misma se hará previa autorización de los sistemas de pagos y/o Banco adquirente, en condiciones de encripción y custodia de los datos que no afecten la privacidad y seguridad de la información y que sean acordes con los estándares de seguridad de la información exigidos actualmente o en el futuro, para la guarda y custodia de información financiera por las autoridades colombianas y/o por los sistemas de pagos internacionales y/o Banco Adquirente en sus programas de cumplimiento. El Cliente podrá almacenar solamente la información de las tarjetas que resulte esencial para su negocio o para la fácil  ubicación de  la  transacción para  efectos  de  la atención de cualquier reclamación, siendo esta: (1) Nombre; (2) Número de la Tarjeta encriptado y/o Fecha de vencimiento; (3) Número de autorización u otro elemento que encadene la operación con sus propios registros. En el evento de que el Cliente haya almacenado información sensible de los tarjehabientes, deberá ajustarse a la directriz aquí establecida, mediante la destrucción o eliminación segura de la información cuyo almacenamiento se prohíbe y mediante la conservación de la información restante en los términos antes prescritos. El Cliente asume las siguientes obligaciones esenciales respecto de la información sensible de los tarjetahabientes que conforme al nivel de autorización de los sistemas de pagos y/o banco adquirente,  almacene en  sus  sistemas:  a)  Almacenar  todos  los  datos del tarjetahabiente en forma cifrada en un área limitada al personal autorizado del Cliente; b) Hacer copia de respaldo de los archivos solamente en forma cifrada; c) Limitar el acceso físico y lógico a la plataforma de la computadora; d) Proteger el acceso físico y lógico a los servidores de archivo; e) Separar los datos de carácter comercial sobre los tarjetahabientes de la demás información. El Banco y/o los sistemas de pagos se reservan la facultad de efectuar auditoria en forma directa o de una entidad especializada para el efecto, para verificar las condiciones de la custodia lógica, física y organizativa de la información sensible y de los documentos y de ordenar medidas que resulten necesarias para salvaguardar la privacidad y seguridad de dicha información, de acuerdo al estándar que sea definido por el sistema de pagos y/o las autoridades financieras en forma general o por tipo de establecimiento o forma de venta, frente a información sujeta a reserva bancaria. (viii) El Cliente se obliga a reportar con destino al Banco y a los sistemas de pagos, respecto de los cuales haya pactado con el Banco la relación de Adquirencia o de banco pagador y a mantener actualizada la información solicitada con motivo del proceso de afiliación. Igualmente, el Cliente asume la obligación de informar en los mismos términos todo cambio  de  significación en su estructura de propiedad del negocio, como en el caso de las adquisiciones de acciones, participaciones o cuotas sociales que representen el 5% o más del poder accionario o nivel de control del respectivo establecimiento. (ix) Es obligación del Cliente cumplir con las disposiciones legales que regulen las ventas por sistemas de financiación, con tarjeta o a distancia o que resulten aplicables a este tipo de ventas, incluyendo la contenida en regulaciones o reglamentaciones de origen administrativo, como las circulares y resoluciones emanadas de la Superintendencia de Industria y Comercio o la entidad que haga sus veces. En desarrollo de los derechos del consumidor, el Cliente dará información suficiente al tarjetahabiente acerca de las condiciones de la venta y entrega de los bienes y servicios respectivos, políticas de garantía, cambio  y devolución de mercancía. Es responsabilidad única del Cliente los reclamos y quejas que se presenten por transacciones con los tarjetahabientes por la calidad, precios o condiciones de sus mercancías o servicios o el ejercicio del derecho de retracto, frente a lo cual saldrá a la defensa y mantendrá indemne al Banco. (x) Pignoración de Adquirencias: cuando el cliente tenga o soliciten obligaciones de crédito con el Banco y/o que soliciten disminución de tasa REMI, el Cu (Código Único) quedará pignorado con Bancoomeva por el tiempo que se defina en la negociación del convenio con Adquirencia. (xi) El Cliente se compromete para con el Banco a contar, mantener y entregar la certificación PCI-DDS emitida por una entidad que ostente la categoría QSA (Qualified Security Assessor). (xii) El Cliente adelantará las campañas informativas que considere pertinentes relacionadas con las medidas de seguridad que deben adoptar los compradores y vendedores para la realización de operaciones de comercio electrónico. (xiii) El Cliente se compromete a informar al consumidor financiero sobre la manera como se realiza el procedimiento de pago.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "4px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}> 45.- AUTORIZACIONES IRREVOCABLES.Con la suscripción del presente contrato, el Cliente acepta y autoriza al Banco para tomar las medidas preventivas que considere pertinentes, incluyendo la congelación de fondos, cuando de la intervención del Banco o cualquier otra institución autorizada por el Banco o el sistema de pagos respectivo, así como de los reportes de los sistemas de alertamiento de transacciones, se pueda preveer o concluir el uso fraudulento de una tarjeta. En desarrollo de lo anterior, el Cliente acepta que se adelanten las investigaciones a que haya lugar y se tomen las medidas preventivas que el Banco considere necesarias y las que conforme a los reglamentos de los sistemas de pagos le sean exigibles al Banco, tales como bloqueos temporales o desafiliación, capacitaciones, reversión de operaciones o el cargo precautelativo hasta por el monto de las transacciones objeto de alerta o sospecha. La reversión de operaciones, el cargo precautelativo o el no abono de sumas en canje, según el caso, procederá frente a transacciones reportadas  por  los  sistemas de alertamiento o de investigación  del fraude que revistan fundadamente el perfil de posibles operaciones fraudulentas, cuando en el caso de confirmarse como tales o de ocurrir su repudio, su importe deba ser asumido por el Cliente. En dicho caso, las sumas reversadas, debitadas o en canje, según el caso, se mantendrán en una cuenta contable  del Banco hasta que culmine la investigación tendiente a confirmar la realidad y validez de tales operaciones y/o transcurra el término que el Banco emisor tenga conforme a los reglamentos del respectivo sistema de pagos para tramitar el repudio de su tarjetahabiente. En caso de no presentarse un repudio oportuno por parte del tarjetahabiente, los montos previamente debitados serán objeto de abono definitivo a favor del Cliente, salvo en el evento en que la investigación arroje la ocurrencia de una conducta culposa o dolosa por parte del Cliente, sus empleados, contratistas y/o dependientes. En cualquier evento, el Cliente reconoce que no habrá lugar al pago de intereses ni al reconocimiento de suma alguna por razón de la adopción de alguna de estas medidas.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>46.- COMPENSACIÓN.El producto de las consignaciones de los vouchers o notas crédito se realizará como “saldo en canje” y sólo estará disponible para la utilización del Cliente a partir del momento en que los vouchers o consignaciones resulten corrientes y el producto de los mismos sea puesto a disposición del Cliente a través del sistema de compensación para operaciones de cada una de las franquicias de tarjetas débito o crédito (sistemas de pago). En caso que los vouchers no resulten corrientes, la cuenta será debitada y/o cargada por el importe de los vouchers devueltos, los cuales serán puestos a disposición del Cliente por el Banco. El Cliente autoriza el débito y/o cargo de la cuenta con ocasión de las operaciones de consignación de vouchers o notas de venta con tarjetas débito o crédito, cuando a pesar de los mismos haber resultado corrientes, haya lugar a ello de acuerdo con lo convenido entre el Cliente y las correspondientes franquicias de tarjetas y en los casos previstos para tal efecto en los reglamentos operativos de cada uno de los sistemas de pago.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>47.- NATURALEZA DE LOS COMPROBANTES DE VENTA.Los comprobantes o papeles por cualquier venta no son dinero, y por ello se reciben sujetos a la cláusula de buen cobro, de tal suerte que si son desconocidos por cualquier causa, el Banco queda facultado para realizar su correspondiente débito.  </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>48.- ALCANCE DEL SERVICIO. Por la prestación del servicio al que se refiere este contrato el Banco no adquiere responsabilidad frente al Cliente por el pago efectivo de los vouchers y comprobantes objeto de consignación, ya que la obligación del Banco se limita a poner a disposición del Cliente el canal para la consignación y pago de las operaciones. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>49.- ABONOS.  El Banco efectuará un solo abono diario por los vouchers o notas de compra, correspondientes a ventas realizadas con cada sistema de pagos (cada franquicia), el cual será resultado de la sumatoria de los vouchers o comprobantes de venta que resulten corrientes en cada jornada de compensación.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>50.- COMISIÓN.Por  la  prestación  del  servicio  aquí  convenido,  en  especial  por  la realización del proceso de acreditación o abono en cuenta de los vouchers o comprobantes de venta derivados de la utilización de tarjetas débito o crédito por parte de los tarjetahabientes de los sistemas de pagos emisores de las tarjetas objeto de aceptación, el Cliente se obliga a pagar una comisión de acuerdo con los parámetros y porcentajes establecidos. El valor de las comisiones fijadas como un porcentaje o valor fijo del precio de la transacción, se establecerá descontando el valor correspondiente al IVA y a las propinas. PARÁGRAFO PRIMERO.- Las comisiones que el Cliente reconocerá al pagador por cada pagaré o comprobante de venta depositado en su cuenta, serán descontadas del valor pagado por el voucher  o comprobante de venta correspondiente. Para lo anterior, las partes acuerdan que en cualquier caso el Banco podrá debitarla y/o cargarla de cualquier cuenta o depósito, así sea conjunta o separada, que el Cliente tenga en el Banco y de ser el caso, el Banco podrá proceder al cobro ejecutivo de las mismas, para lo cual prestará mérito ejecutivo el presente contrato junto con los comprobantes contables en poder del Banco. PARÁGRAFO SEGUNDO.- Las partes convienen el siguiente sistema para ajustar las comisiones pactadas: El Banco podrá proponer al Cliente el cambio de los porcentajes de cobro de comisiones o proponer el cambio de los criterios inicialmente fijados para establecer los niveles de comisiones. Para tal efecto el Banco comunicará por escrito al Cliente las nuevas tablas de comisiones y/o criterios para fijación de las mismas, por cualquier medio. A partir de la fecha de la comunicación o publicación de las nuevas tablas o criterios, el Cliente tendrá treinta (30) días calendario para manifestar su desacuerdo con las nuevas tarifas o criterios de fijación de las mismas, caso en el cual se dará por terminado el servicio, salvo que las partes convengan otra cosa. Las partes acuerdan que se tendrá como aceptación tácita de las nuevas tarifas o criterios de fijación de las mismas el hecho que en el término precitado el Cliente no manifieste su desacuerdo con la nueva tabla o los nuevos criterios señalados para la fijación de la comisión y continúe realizando consignaciones en el Banco en desarrollo del servicio, en este caso a partir de la fecha de vencimiento del preaviso precitado se aplicarán las nuevas tarifas o condiciones. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>51.- FALLAS EN LOS SISTEMAS DE COMUNICACIÓN. El Cliente declara que conoce y acepta que el  Banco no es responsable por las deficiencias en el servicio originadas por fallas en los sistemas de comunicación, en los equipos de computación, en el fluido eléctrico, por actos de fuerza mayor tales como cierres o bloqueos de Oficina por huelga, paro, conmoción civil, acciones de autoridad o de movimientos subversivos. En todo caso, el Banco declara que cuenta con planes de contingencia y continuidad del negocio, de tal suerte que se compromete a realizar sus mejores esfuerzos para realizar el proceso de recaudos en el menor tiempo posible, después de resuelto el inconveniente.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>52.- GASTOS E IMPUESTOS.Los gastos, impuestos y cualesquiera otros que cause la ejecución del presente contrato serán cubiertos por el Cliente inmediatamente se generen. En caso que no sean pagados inmediatamente, el Cliente autoriza al Banco para debitar y/o cargar los montos correspondientes de las cuentas del Cliente. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>53.- MODIFICACIONES. Cualquier modificación, terminación, supresión o adición a los términos y condiciones del presente contrato serán informadas por el Banco al Cliente por cualquier medio idóneo. Si pasados cinco (5) días de anunciada, el titular no manifestare su inconformidad con la modificación, supresión o adición, o continúa el manejo, se tendrá aceptada. En caso que el titular no acepte la modificación, adición, o supresión del reglamento, podrá dar por terminado el contrato. Si el Cliente no acepta las modificaciones, deberá abstenerse de hacer uso del servicio de Adquirencia aquí regulado.</Text>
                                        {/* <Text style={{ display: "inline" }}>''</Text> */}
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>54.- CAUSALES DE CANCELACIÓN DEL SERVICIO. La relación del Banco como adquirente y/o pagador de las ventas del Cliente con las tarjetas, se encuentra ligada a las causales de terminación del contrato de cuenta corriente bancaria y/o de ahorros. En caso que el Banco renuncie a su condición de adquirente y/o pagador frente a un sistema de pagos, cesará toda obligación de adelantar operaciones o servicios a favor del Cliente frente a las ventas efectuadas con las tarjetas del sistema de pagos respectivo y el presente contrato se  entenderá  terminado.  Además  de las  causales de  terminación  de  la relación previstas en el contrato de cuenta corriente bancaria y/o ahorros, la relación de banco adquirente o pagador podrá suspenderse temporal o definitivamente, a decisión del Banco por cualquiera de las causales previstas por el respectivo sistema de pagos o de tarjetas, para la suspensión y/o terminación de la relación y/o del servicio, lo que se entiende sin perjuicio de las facultades de suspensión o terminación del servicio que se puedan reservar dichos sistemas de pagos o tarjetas. El Banco en cualquier tiempo y en forma inmediata podrá suspender de manera definitiva el servicio de adquirencia y/o la afiliación a los sistemas de pagos respecto de uno o varios puntos de ventas, por las causales que se enuncian a continuación o por las contenidas en los reglamentos de los sistemas de pagos y que se consideran justas: (i) El indebido manejo de sus relaciones bancarias, así como la cancelación, embargo o congelación de cualquiera de sus cuentas y depósitos con cualquier institución financiera que impidan el depósito. (ii) Acciones corporativas y procedimientos que busquen la liquidación de la persona jurídica, su fusión, escisión, entrar en concurso de acreedores, reorganización, efectuar cesión de pasivos o reestructuraciones y en general cualquier hecho que pueda tener un efecto material adverso en el patrimonio del Cliente o el incumplimiento de sus obligaciones convencionales. (iii) Fraccionamiento de una misma venta o intento de obtener autorizaciones consecutivas por montos menores sobre tarjetas que han sido rechazadas. (iv) Alteración de vouchers o presentación de comprobantes previamente elaborados. (v) Aceptación de tarjetas robadas, extraviadas, alteradas, falsificadas con montaje o vencidas. (vi) Depósitos de vouchers sin número de autorización o autorización falsa. (vii) Prestar los equipos (datafonos, máquina imprinter etc.) a un tercero. (viii) Proporcionar dinero en efectivo por operaciones que se efectúan con las tarjetas. (ix) Operar con un código de operación diferente al otorgado al Cliente o aceptar transacciones que no correspondan a la actividad autorizada en la afiliación. (x) Por  no  proporcionar  los  vouchers  o  comprobantes  de  venta  que  los sistemas de pagos o el Banco le soliciten. (xi) Cambiar de domicilio, cerrar el comercio o cesión a un tercero sin notificar previamente y por escrito al Banco y a los sistemas de pagos. (xii) Inactividad por tiempo superior a seis (6) meses. (xiii) Hacer caso omiso de los mensajes enviados por la terminal electrónica. (xiv) Situación reiterada de consumos no reconocidos por los tarjetahabientes en condiciones de frecuencia, volumen o magnitud que superen los indicadores normales de riesgo de fraude dentro de los sistemas de pago, por tipo de actividad económica o establecimiento de comercio. (xv) Hacer mal uso de la información concerniente a tarjetas o a los tarjetahabientes, o por fallas o vulnerabilidades en los sistemas de protección de la información. (xvi) Falsedad en la actividad económica reportada, falsificación con ocasión de la apertura de la cuenta de depósito. (xvii) Exceso de los niveles de fraude. (xviii) Por inclusión del establecimiento, sus directores o administradores como sospechosos o responsables de actividades  de  lavado  de  activos  en  los listados de la OFAC, DEA, FBI, ONU o en reportes de autoridades locales, extranjeras o internacionales competentes o por la iniciación en su contra de procesos legales por lavado de activos o delitos conexos o vinculados, o por la iniciación en su contra de procesos de extinción de dominio. (xix) Cuando el procedimiento de investigación realizado por el Banco o un delegado para tal fin concluya que el Cliente ha incumplido con las obligaciones derivadas del presente contrato y/o de los reglamentos de los sistemas de pagos, y por ello se ha hecho merecedor de dicha sanción.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>55. DEBER DE COLABORACIÓN. El Cliente se obliga a prestar toda su colaboración y a suministrar oportunamente la información, documentos y registros que se lleguen a requerir a fin de atender reclamos, aclarar situaciones o poder dar respuesta a las autoridades competentes sobre cualquiera de las transacciones. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>56. MANEJO DE LA INFORMACIÓN POR PARTE DE BANCOOMEVA Y REPORTES A LAS CENTRALES DE INFORMACIÓN FINANCIERA: La información relacionada con el producto a que se refiere este Reglamento es absolutamente confidencial. No obstante, El Cliente autoriza expresamente a Bancoomeva para la realización de los siguientes actos jurídicos: 1. Para intercambiar información crediticia o de cualquiera otra índole relacionada con El Cliente con otros Bancos e Instituciones Financieras, sus filiales, matrices y/o vinculadas, agencias centralizadoras de riesgo y crédito nacionales y extranjeras. 2. Para que con fines estadísticos, de control, supervisión, prevención de lavado de activos y financiación del terrorismo e información comercial, reporte, solicite, procese y Viewulgue a la Central de Información de la Asociación Bancaria y de Entidades Financieras del país, a la UIAF (Unidad de Información y Análisis Financiero) y a cualquier otra Entidad que maneje bases de datos, con los mismos fines, toda la información referente a su comportamiento como Cliente de Bancoomeva. 3. Para consultar los datos suministrados por otras entidades sobre los aspectos mencionados en el numeral anterior, lo que implica que el cumplimiento de las obligaciones del Cliente se reflejará en las mencionadas bases de datos, en donde se consignan de manera completa todos los datos referentes a su actual y pasado comportamiento frente al Sector Financiero en general frente al cumplimiento de sus operaciones activas de crédito. La autorización anterior permite a Bancoomeva y a las centrales de información de riesgo Viewulgar la información mencionada para fines de: i) evaluar los riesgos de concederme un crédito, ii) verificar el cumplimiento de mis deberes contractuales, constitucionales y legales y, iii) elaborar estadísticas y derivar, mediante modelos matemáticos, conclusiones de ellas. 4. Para fines de procesamiento de datos, custodia, fines comerciales  y de mercadeo o de vinculación del Cliente a otras empresas del Grupo Empresarial Coomeva, el Cliente autoriza a Bancoomeva para que pueda transferir o subcontratar la prestación de cualquier parte de los productos y servicios objeto de este Reglamento con un tercero, incluido cualquier otro miembro del Grupo Empresarial Coomeva, sea que ese tercero opere o no en otro territorio, ya sea entre otros servicios relacionados con el procesamiento de datos de las Cuentas Corrientes Bancarias y/o de Ahorros y los depósitos a término, transmisión y almacenamiento de órdenes o información de las Cuentas Corrientes Bancarias y/o de Ahorros y los depósitos a término y/o de El Cliente para su utilización a escala nacional o internacional incluyendo las redes de cajeros automáticos, servicios computarizados, servicios de atención telefónica, cobranzas u otros de naturaleza similar. El Cliente acepta que este proceso pudiera implicar la recolección, archivo, procesamiento y transmisión de dicha información por parte de terceros y/o empresas del Grupo Empresarial Coomeva localizados dentro o fuera de Colombia y sus respectivos Empleados y Contratistas. Todos éstos deberán guardar la misma confidencialidad a la que está sujeta Bancoomeva, con las limitaciones impuestas por las leyes aplicables sobre la materia, en la jurisdicción donde ésta se recolecte, archive, procese o transmita. El Cliente autoriza a Bancoomeva para que pueda compartir a su discreción y para cualquier propósito lícito, la información, detalles o datos relacionados con El Cliente y/o sus transacciones con cualquier miembro o miembro asociado del grupo de entidades que forman parte del Grupo Empresarial Coomeva. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>57.- LISTAS DE CONTROL: El Cliente conoce, entiende y acepta de manera voluntaria e inequívoca que Bancoomeva en cumplimiento de su obligación legal de prevenir y controlar el lavado de activos y la financiación del terrorismo y siguiendo la jurisprudencia de la Corte Constitucional sobre la materia, por considerarlo una causal objetiva, podrá terminar la prestación de los servicios y el suministro de los productos objeto presente reglamento cuando su nombre haya sido incluido en la lista OFAC (Office of Foreign Assets Control), comúnmente llamada Lista Clinton, o en cualquier otra de igual o similar naturaleza, de carácter nacional o internacional, o cuando haya sido incluido en alguna lista como la lista ONU, lista de la Contraloría, lista de la Procuraduría, etc. en la que se publiquen los datos de las Personas condenadas o vinculadas por las Autoridades Nacionales o Internacionales, de manera directa o indirecta, con actividades ilícitas, tales como narcotráfico, terrorismo, lavado de activos, tráfico de estupefacientes, secuestro extorsivo y/o trata de Personas, entre otras. PARAGRAFO I: Sin perjuicio de lo anterior, cuando El Cliente sea una Persona Jurídica, para que Bancoomeva pueda terminar unilateralmente el contrato bastará con que el nombre de alguno de sus Socios y/o Administradores haya sido incluido en alguna lista con las características mencionadas en esta cláusula. De conformidad con el Artículo 22 de la ley 222 de 1995 se entenderá por Administrador el Representante Legal, el liquidador, el factor, los Miembros de Juntas o Consejos Directivos y quienes de acuerdo con los estatutos ejerzan o detenten esas funciones. PARAGRAFO II: La vinculación formal del Cliente, si es el caso, de cualquiera de sus Socios, Administradores y/ o Representantes Legales a un proceso judicial nacional y/o internacional relacionado con las actividades de las que trata esta cláusula, también será causal suficiente para terminar unilateralmente el Contrato.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "5px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>58.- DECLARACIONES FINALES.El Cliente declara que: (i) los costos, gastos, comisiones, intereses y tarifas que se causan en desarrollo del presente contrato le han sido informados por el Banco, que los conoce y acepta, y que ha tenido la oportunidad de compararlos con los de otras instituciones. (ii) Es obligación del Cliente mantenerse informado sobre los costos, gastos, intereses, comisiones y tarifas vigentes antes de autorizar ventas mediante tarjetas débito o crédito, así que en el evento de autorizarlas es porque los acepta. (iii) Que ha leído y entendido el presente contrato, que el Banco le ha informado de manera clara y completa las características del servicio financiero al que se refiere este contrato, sus condiciones, las consecuencias del incumplimiento, los procedimientos y seguridades que se deben tener en cuenta en su uso, sus derechos y obligaciones, los riesgos que conlleva la ejecución del contrato y el incumplimiento de las obligaciones a su cargo y que los acepta, obligándose a  su cumplimiento. </Text>
                                    </View>
                                </>
                                : null
                        }



                        {/* Acuerdo convenio libranza */}

                        {

                            acuerdoLibranza ?
                                <View>

                                    <Text style={{ padding: "3px 0px", backgroundColor: "#FF6B19", color: "white", fontSize: "8px", textAlign: "center" }}>Consideraciones del Acuerdo Convenio Libranza</Text>


                                    <View style={{ fontSize: "8px", margin: "18px 10px 0px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>PRIMERO. - EL BANCO se compromete para con LA EMPRESA, a estudiar y conceder créditos a sus empleados, contratistas o afiliados (en este último caso, de tratarse LA EMPRESA de una cooperativa), que se otorgarán mediante la modalidad de “descuentos por nómina” o “descuentos por libranza”, con los requerimientos que EL BANCO tiene establecidos para sus clientes y los adicionales determinados por EL BANCO en la ejecución del presente convenio.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARAGRAFO. -EL BANCO se reserva la facultad de conceder o no el crédito, si del estudio de la documentación se deduce que este no cumple las condiciones mínimas que lo garanticen. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>SEGUNDO. -  LA EMPRESA se compromete a realizar los siguientes actos: a) A efectuar los descuentos a sus empleados, contratistas o afiliados del valor de sus salarios, honorarios, remuneraciones por prestación de servicios, remuneraciones como integrante de cooperativa, prestaciones sociales, cesantías, indemnizaciones, bonificaciones, vacaciones, primas legales o extra legales, liquidaciones o cualquier emolumento y/o concepto al que contractual o legalmente tengan derecho con LA EMPRESA, a lo sumo, en las fechas de vencimiento de las obligaciones correspondientes, para que se apliquen al saldo de los créditos aprobados por EL BANCO tanto por capital como por intereses de plazo y de mora, y gastos de cobranza, de conformidad con las tasas aplicadas por el BANCO a los créditos correspondientes, todo de acuerdo con las autorizaciones impartidas por el empleado, contratista o afiliado, de las cuales se obliga LA EMPRESA a dar certificación al BANCO antes de efectuar cualquier desembolso. En todo caso, la autorización de descuento se entenderá recibida a entera satisfacción con la firma en señal de aceptación de los funcionarios de LA EMPRESA autorizados al efecto. LA EMPRESA se obliga a actualizar permanentemente la designación de tales funcionarios autorizados. b) A trasladar al BANCO, los dineros descontados o retenidos a sus funcionarios, empleados, contratistas o afiliados, para el pago de los créditos y demás gastos, incluidos, los gastos de cobranza. El traslado del valor de los descuentos se efectuará, a lo sumo, en la fecha misma de vencimiento de la obligación a cargo del deudor respectivo. Por el presente documento, LA EMPRESA autoriza de manera expresa e irrevocable al BANCO a debitar de sus cuentas de ahorros y/o corrientes el valor de los descuentos en las fechas previstas en los correspondientes títulos de deuda. c) A presentar al BANCO, todos los documentos, aprobaciones y certificaciones que sean necesarios para estudiar, tramitar y aprobar los créditos a favor de sus empleados y/o funcionarios. d) A efectuar el primer descuento a partir del mes siguiente a aquel en que el crédito otorgado fue desembolsado y/o en las oportunidades que correspondan de acuerdo con los títulos de deuda y/o las autorizaciones de descuento. e) A descontar anticipadamente la cuota o cuotas correspondientes al (a los) período(s) en que el empleado, contratista o afiliado va a gozar de vacaciones o licencia. f) A avisar al BANCO de la fecha en que se inicien los periodos de vacaciones y licencias así como de todo retiro, muerte, terminación de contrato de trabajo o relación laboral, terminación del contrato de prestación de servicios o de la afiliación o desvinculación, sean los anteriores voluntarios o no, en la fecha de la aceptación por parte de LA EMPRESA de la licencia o vacaciones o en la fecha de la ocurrencia de la desvinculación, terminación, desafiliación, conocimiento de la muerte o retiro, con la indicación del valor de la liquidación que resulte a favor del empleado, contratista o afiliado y de los descuentos efectuados para el pago del crédito. g) En caso de retiro, desvinculación voluntaria o no del empleado, contratista o afiliado, o terminación del contrato de trabajo, la relación laboral, contrato de prestación de servicios o afiliación, cualquiera sea su causa, incluso en el caso de muerte del trabajador, contratista o afiliado o cuando sea acelerado el plazo de las obligaciones a cargo del empleado, contratista o afiliado por parte del BANCO, LA EMPRESA se obliga a descontar del valor total de los salarios, honorarios, remuneraciones por prestación de servicios, remuneraciones como integrante de cooperativa, prestaciones sociales, cesantías, intereses de cesantías,  indemnizaciones, bonificaciones, vacaciones, primas legales o extra legales, liquidaciones o cualquier emolumento y/o concepto al que contractual o legalmente tenga derecho el empleado, contratista o afiliado con LA EMPRESA, y a trasladar dichos valores descontados a EL BANCO hasta el momento en que éste último expida el respectivo paz y salvo por concepto de todas las obligaciones pendientes de los empleados, contratistas o afiliados.  h) Igualmente, en caso de retiro, desvinculación voluntaria o no del empleado o terminación del contrato de trabajo, prestación de servicios, afiliación a cooperativa o relación laboral, cualquiera que sea la causa, incluyendo por muerte del empleado, LA EMPRESA se compromete a enviar al BANCO, dentro de los cinco (5) días siguientes a la terminación, la información y soportes correspondientes a la citada terminación, así como la liquidación del empleado, la carta de despido, renuncia y/o el acuerdo de terminación. La liquidación debe indicar el valor de todos los conceptos que LA EMPRESA resulte deberle al empleado, con la consecuente indicación de que serán trasladados al BANCO hasta concurrencia del saldo pendiente de las obligaciones del empleado frente al mismo.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARAGRAFO. -En caso de mora o retardo de LA EMPRESA para el traslado de las sumas descontadas a los empleados, contratistas o afiliados, reconocerá al BANCO un interés moratorio, a la tasa máxima legal vigente.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>TERCERO. -El término del presente contrato será de un (1) año contado a partir de la fecha en que se suscribe el presente documento, y será prorrogado automáticamente a su vencimiento, por plazos sucesivos de un (1) año, salvo en el caso en que con una antelación no inferior a treinta (30) días al citado vencimiento del término o de la prórroga respectiva, cualquiera de LAS PARTES manifieste mediante comunicación escrita dirigida a la otra, su intención de no prorrogar, caso en el cual, el presente contrato se dará por terminado a su vencimiento sin que exista lugar a indemnización alguna. Sin perjuicio de lo anterior, en todo momento EL BANCO podrá dar por terminado el contrato unilateralmente sin que se cause indemnización alguna, avisando a LA EMPRESA, con treinta (30) días de antelación a la fecha prevista para la terminación.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>PARAGRAFO. -La terminación del convenio por cualquier causa no releva a LA EMPRESA de efectuar los descuentos y traslados que se hubieran autorizado con anterioridad a la terminación.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>CUARTO. - LAS PARTES dejan expresa constancia que el presente contrato es sin cuantía y en consecuencia, no causa impuesto de timbre de acuerdo con la Ley.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>QUINTO. - LAS PARTES podrán establecer aspectos particulares de la presente relación contractual mediante un anexo operativo del presente documento</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "16px 10px" }}>
                                        <Text style={{ textAlign: "justify" }}>En cualquier caso, las partes de este Acuerdo se obligan a dar cumplimiento estricto a las disposiciones contempladas en la Ley 1527, sus Decretos Reglamentarios y toda norma que resulte aplicable a las operaciones de Libranza, en especial la Empresa deberá hacer cumplir lo dispuesto en el Artículo 6 de la Ley 1527 y sus Parágrafos, donde se responsabiliza por las obligaciones derivadas en su calidad de Entidad Pagadora en especial las relacionadas con los descuentos y verificación.</Text>
                                    </View>

                                </View>
                                : null





                        }

                        {/* Consideraciones del Servicio de botón de financiamiento */}

                        {
                            financiamiento ?
                                <View>

                                    <Text style={{ padding: "3px 0px", backgroundColor: "#FF6B19", color: "white", marginTop: "14px", fontSize: "8px", textAlign: "center" }}>Consideraciones del Servicio de botón de financiamiento</Text>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}> OBJETO: El Banco tiene a disposición del Cliente el servicio de Botón de Financiamiento que se instalará en la página web del Cliente con el fin de que éste sea utilizado por sus “Usuarios” para financiar los productos y servicios ofrecidos por el Cliente o como solución de financiamiento a través de la adquisición de créditos en las diferentes líneas ofrecidas por el Banco. Las normas contenidas en este capítulo serán aplicables a las partes cuando el Cliente haya optado por contratar este servicio, constancia de la que se dejará registro mediante la asignación del tipo de servicio en el Anexo de especificaciones técnicas y Operativas de convenios. Así entonces, las partes regulan las condiciones generales que deberán ser observadas como consecuencia de la prestación del servicio de Botón de Financiamiento que los “Usuarios” del Cliente realicen a través de la página web del Cliente. Para efectos de las Cláusulas contenidas en este capítulo, se entenderá por “Usuarios”, a los clientes, asociados y/o afiliados del Cliente. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ display: "inline" }}> ALCANCE: El Banco pone a disposición del Cliente un botón en su página web mediante el cual los “Usuarios” podrán financiar los productos y servicios ofrecidos por el Cliente, a través de un crédito de consumo otorgado por el Banco. El Botón de Financiamiento funciona como un link que conduce a la pasarela de créditos Banca Xpress Convenios a través de un endpoint de servicios, en la cual se inicia el proceso de otorgamiento de Crédito. Para ello, se validará la identidad del “Usuario”, se solicitará la información que el Banco ha establecido como necesaria para evaluar la solicitud de crédito y una vez verificada la identidad del “Usuario” y la información recibida por éste, el crédito podrá ser o no aprobado. La aprobación del Crédito dependerá del resultado de la validación de identidad y de las Políticas de Riesgo de Crédito que han sido establecidas por Bancoomeva. Si el crédito es aprobado en línea a través de Banca Xpress, el Banco abonará a la cuenta recaudadora abierta en Bancoomeva del Cliente, el valor desembolsado y enviará la referencia de pago debidamente detallado para identificar al “Usuario” que ha realizado el pago de sus productos o servicios a través de esta opción de financiamiento. El Botón de Financiamiento también podrá ser utilizado como una solución de financiamiento para el “Usuario” del Cliente, sin estar ligado a la adquisición de productos o servicios ofrecidos por éste último, en cuyo caso el proceso de otorgamiento del crédito será el descrito anteriormente y el valor aprobado del crédito será desembolsado en la cuenta de ahorros o corriente abierta en Bancoomeva que indique el “Usuario”. Los “Usuarios” del Cliente podrán ser asistidos por el call center del Banco para recibir apoyo en el proceso de la solicitud de crédito a través de la plataforma Banca Xpress y para atender las inquietudes operativas que se tengan sin que ello genere ninguna contraprestación a cargo del Cliente o el “Usuario”. La pasarela de créditos Banca Xpress Convenios se encuentra bajo el dominio y administración del Banco, por lo cual, éste es responsable de la seguridad.</Text>

                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>INFORMACIÓN A LOS USUARIOS: En virtud de la celebración del presente Convenio y de la adquisición del servicio regulado en el presente capítulo, el Banco ha establecido condiciones diferenciales en la oferta de los productos de crédito en beneficio de los “Usuarios” que los adquieran a través del Botón de Financiamiento. Las condiciones aplicables para las líneas de crédito que se ofrezcan por el Banco, serán las que éste informe al Cliente y que deberán ser publicadas y puestas en conocimiento de los “Usuarios” en la página web del Cliente. En ningún momento el Cliente, podrá modificar la información entregada por el Banco, ni estará habilitado para suministrar información sobre los productos de crédito que no haya sido enviada directamente por el Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>RESPONSABILIDAD DEL BANCO:  El Banco será responsable de realizar la validación de identidad y el estudio de crédito para cada “Usuario” cuya aprobación dependerá de que el “Usuario” cumpla el perfil de acuerdo con las Políticas de Riesgo de Crédito que han sido establecidas por el Banco y por tanto no se encuentra obligado a aprobar todas las solicitudes de crédito que se realice por los “Usuarios” que utilicen la opción del Botón de Financiamiento, cuando éstas no se ajusten a sus políticas de crédito. El Banco tampoco será responsable en el evento de que las solicitudes de crédito no puedan realizarse o sean interferidas por fallas en los sistemas de comunicación, la red, en los equipos de computación o en el fluido eléctrico.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>REQUISITOS DE CONECTIVIDAD Y OPERACIÓN: Para efectos de llevar a cabo éste servicio, el Cliente se obliga a cumplir de manera previa a la suscripción del presente convenio, todos los requerimientos de la infraestructura mínima para la integración del Botón de Financiamiento con la página web del Banco. Así mismo, el Cliente se compromete a ejecutar las instrucciones que el Banco le indique para conectar su página web con la pasarela de créditos Banca Xpress Convenios del Banco.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>ACREDITACIÓN DE LOS PAGOS:El Cliente manifiesta conocer y aceptar que la acreditación de los pagos no se hará indefectiblemente en línea, pues éstos se podrán hacer efectivos dentro de los tiempos que tomen los ciclos de transferencia de la red de pagos. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>OBLIGACIONES A CARGO DEL CLIENTE:Para la habilitación y puesta en funcionamiento del Botón de Financiamiento el Cliente se obliga a: </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ textAlign: "justify" }}>a)Diligenciar en forma correcta el formato dispuesto para la inscripción de la cuenta corriente o de ahorros receptora de los recursos de su propiedad, en la cual se depositarán los desembolsos de los créditos otorgados por el Banco, asumiendo las consecuencias derivadas de un error en el trámite y a entregarla al Banco. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ textAlign: "justify" }}>b) Ofrecer en su página Web la opción de pago por medio del Banco, a fin de que el “Usuario” interesado en adquirir un producto o servicio ofrecido por el Cliente pueda seleccionar dicha opción, generándose un vínculo enrutado desde la página del Cliente hacia la página web del Banco. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "1px 10px" }}>
                                        <Text style={{ textAlign: "justify" }}>c) Informar a los “Usuarios” sobre la solución de financiamiento ofrecida por el Banco a través del Botón de Financiamiento, con el fin de que éstos la conozcan y hagan uso de la misma. La gestión del Cliente será meramente informativa sobre la existencia de la oferta de crédito con la que cuenta el Banco, sin que ello implique la obligación de suministrar información sobre los productos de crédito del Banco. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ textAlign: "justify" }}> Parágrafo: El Banco no tiene injerencia en la información Viewulgada en la página web del Cliente, por lo que no le asiste responsabilidad alguna en el desarrollo de la adquisición del bien o servicio por parte del “Usuario”. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>RELACIONES JURÍDICAS INDEPENDIENTES:El Banco no asume responsabilidad alguna por el negocio jurídico que se celebra entre el Cliente y su “Usuario” en relación a los productos y/o servicios que éste último adquiere de parte del primero y que se pagan a través del Botón de Financiamiento ofrecido por el Banco. Por su parte, el Cliente no asume responsabilidad alguna por la relación que se crea entre el Banco y el “Usuario” cuando a éste le es aprobado y desembolsado el crédito en virtud de lo cual adquiere la calidad de “Cliente” de Bancoomeva. El Banco será el único responsable por el seguimiento al cumplimiento de las obligaciones crediticias adquiridas por el “Usuario” y por tanto gestionará directamente los eventuales cobros de cartera y acuerdos de pago. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>ATENCIÓN DE QUEJAS Y RECLAMOS: El Cliente deberá atender las peticiones, quejas y reclamos formulados por parte de los “Usuarios” que se relacionen con los productos y servicios ofrecidos por éste. Por su parte el Banco atenderá las peticiones, quejas y reclamos que se relacionen con el crédito otorgado al “Usuario” como opción de financiamiento.</Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>MARCAS:El Banco autoriza expresamente al Cliente a utilizar su nombre, marca y logo para efectos de publicitar y dar a conocer a sus “Usuarios” en su página web, el servicio de Botón de Financiamiento. El Cliente se compromete a no utilizar el nombre, marca, logo, enseña comercial o cualquier elemento de propiedad intelectual del Banco para fines distintos a dar a conocer a sus “Usuarios” sobre el servicio de Botón de Financiamiento que por medio del presente Convenio se adquiere. Así mismo, reconoce que la celebración de este contrato no le genera ningún derecho de uso más que el expresamente aquí contenido. El Cliente no podrá utilizar ningún elemento distintivo del Banco perteneciente a su propiedad intelectual, sin su previa y expresa autorización. </Text>
                                    </View>

                                    <View style={{ fontSize: "8px", margin: "6px 10px" }}>
                                        <Text style={{ fontWeight: "bold", textAlign: "justify" }}>DURACIÓN: El presente servicio tendrá duración indefinida y podrá ser terminado por cualquiera de las partes, notificando a la otra parte con una antelación mínima de noventa (90) días calendario de anticipación a la fecha de terminación. </Text>
                                    </View>

                                </View>
                                : null
                        }


                        {/* Firmas */}

                        <Firmas View={View}
                            Text={Text}
                            campoAdicionalesModal={campoAdicionalesModal}
                            diaLetras={diaLetras}
                            dia={dia}
                            mes={mes}
                            yyy={yyy}
                            tecnioOperador={tecnioOperador}
                            clientModal={clientModal}
                        />




                    </View>
                </View>

            </Page>
        </Document>

    )
}

/**
  <Firmas View={View}
                    Text={Text}
                    campoAdicionalesModal={campoAdicionalesModal}
                    diaLetras={diaLetras}
                    dia={dia}
                    mes={mes}
                    yyy={yyy}
                    tecnioOperador={tecnioOperador}
                    clientModal={clientModal}   
                />
 */


export default ContratoConvenios