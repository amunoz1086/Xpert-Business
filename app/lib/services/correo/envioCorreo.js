"use server";

import { nodeEmail } from '@/config/conectSMTP';
import { parserDataCorreo } from './parserDataCorreo';
import { resetearPesos } from '../../utils';

export const envioCorreo = async (req) => {

    const APP_URL = process.env.URL_APP;

    let dataCorreo = JSON.parse(req)
    let resulSendEmail = {};
    let responseEmail = {};
    let dataparser = await parserDataCorreo(dataCorreo);

    if (dataparser.status === 200) {

        console.log('Notificacion desde Solicitar Aprobacion', dataCorreo.KNIME.CORREOS_TIPO_APROBADOR);

        const message = {
            from: "noreplyqa@coomeva.com.co",
            to: `${dataCorreo.KNIME.CORREOS_TIPO_APROBADOR}`,
            subject: `Solicitud Nº ${dataparser.codSolicitud} de, ${dataparser.credito === '01' ? 'Credito' : ''}, ${dataparser.convenio === '03' ? 'Convenio' : ''} ${dataCorreo.PRODUCTO.operacion !== '1' ? 'Ajuste' : 'Nuevo'} - ${dataCorreo.RADICACION.cliente} - ${dataCorreo.RADICACION.numDocumento} `,
            html: `<!DOCTYPE html>
            <html lang="es">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    * {
                        margin: 0px;
                        padding: 0px;
                    }
            
                    h4 {
                        color: #c24c4c;
                        text-align: center;
                    }
            
                    .activar {
                        display: none;
                    }
                </style>
            </head>
            
            <body
                style="height: 100%; width: 100%; margin: 30px 30px 30px 30px; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif;">
                <main style="height: auto; width: 95%; margin: 0% auto;">
                    <table style="width: 95%; border-collapse: collapse;">
                        <tr>
                            <td>
                                <img src="https://www.bancoomeva.com.co/info/bancoomeva/media/bloque4792.png" width="200px"
                                    alt="Logo Bancoomeva" />
                                <br>
                                <br>
                                <br>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Cordial Saludo, la regional <strong>${dataparser.regional}</strong> ha solicitado la aprobación de la operación <strong>Nº ${dataparser.codSolicitud}</strong>, de
                                <strong>${dataparser.credito === '01' ? 'Credito' : ''}, ${dataparser.convenio === '03' ? 'Convenio' : ''}
                                ${dataCorreo.PRODUCTO.operacion !== '1' ? 'Ajuste' : 'Nuevo'}</strong>.
                                <br>
                                <br>
                                <br>
                                <br>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 100%; text-align: center;">
                                <h4>
                                    RESUMEN DE LA OPERACIÓN
                                </h4>
                                <br>
                                <br>
                                <br>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="color: #c24c4c; font-weight:bold; width:5%;">Identificación:</td>
                                        <td style="border-bottom: solid 1px #ced4da; width: 30%;">${dataparser.identificacion}</td>
                                        <td style="color: #c24c4c; font-weight:bold; width:5%;">Cliente:</td>
                                        <td style="border-bottom: solid 1px #ced4da; width: 50%;">${dataparser.cliente}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br>
                                <br>
                                <br>
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%;">
                        <tr>
                            <td style="width: 65%;">
                                <h5
                                    style="background-color:#ced4da; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    Solicitud
                                </h5>
                            </td>
                            <td style="width: 35%;">
                                <h5
                                    style="background-color:#ced4da; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    Resumen de la Solicitud
                                </h5>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <table style="width: 100%;">
                        <tr>
                            <td style="width: 10%; ">
                                <h5
                                    style="background-color:#ced4da; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    Tipo de Producto
                                </h5>
                            </td>
                            <td style="width: 10%;">
                                <h5
                                    style="background-color:#ced4da; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    Tipo de Operación
                                </h5>
                            </td>
                            <td style="width: 45%;">
                                <h5
                                    style="background-color:#ced4da; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    Crédito
                                </h5>
                            </td>
                            <td style="width: 35%;">
                                <h5
                                    style="background-color:#c24c4c; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    VOLUMEN DE NEGOCIO ACTUAL DEL CLIENTE
                                </h5>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 10%;">
                                <table style="font-size: 14px;">
                                    <tr>
                                        <td style="line-height: 2rem;">
                                            <span class="${dataparser.credito === '01' ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataparser.credito === '01' ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Crédito
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="line-height: 2rem;">
                                            <span class="activar" style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="" style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Captación
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="line-height: 2rem;">
                                            <span class="${dataparser.convenio === '03' ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataparser.convenio === '03' ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Convenio
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 10%;">
                                <table style="font-size: 14px;">
                                    <tr>
                                        <td style="line-height: 2rem;">
                                            <span class="${dataparser.nuevo === '1' ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataparser.nuevo === '1' ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Nuevo
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="line-height: 2rem;">
                                            <span class="activar" style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="" style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Ajuste
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="line-height: 2rem;"><br></td>
                                        <td style="line-height: 2rem;"><br></td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 45%;">
                                <table border="1" style="width:100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <th style="color: #c24c4c; height: 1.7rem;">Producto</th>
                                        <th style="color: #c24c4c;">Monto</th>
                                        <th style="color: #c24c4c;">Plazo</th>
                                        <th style="color: #c24c4c;">Spread</th>
                                        <th style="color: #c24c4c;">FNG</th>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Cupo</td>
                                        <td style="text-align: center;">$ ${parseFloat(dataparser.cupoMonto).toLocaleString()}</td>
                                        <td style="text-align: center;">${parseFloat(dataparser.cupoPlazo).toLocaleString()}</td>
                                        <td style="text-align: center;">${parseFloat(dataparser.cupoRedescuento).toFixed(2).toLocaleString()} %</td>
                                        <td style="text-align: center;">${parseFloat(dataparser.cupoCobertura).toFixed(2).toLocaleString()} %</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Tesoreria</td>
                                        <td style="text-align: center;">$ ${parseFloat(dataparser.tesoMonto).toLocaleString()}</td>
                                        <td style="text-align: center;">${parseFloat(dataparser.tesoPlazo).toLocaleString()}</td>
                                        <td style="text-align: center;">${parseFloat(dataparser.tesoRedescuento).toFixed(2).toLocaleString()} %</td>
                                        <td style="text-align: center;">${parseFloat(dataparser.tesoCobertura).toFixed(2).toLocaleString()} %</td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 35%;">
                                <table border="1" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Total Cartera</td>
                                        <td style="background-color: #e9ecef;">$
                                            ${isNaN(dataparser.totalCartera) ? 0 : resetearPesos({ valor: dataparser.totalCartera })}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Total Captación</td>
                                        <td style="background-color: #e9ecef;">$
                                            ${isNaN(dataparser.totalCaptacion) ? 0 : resetearPesos({ valor: dataparser.totalCaptacion })}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Antigüedad (Meses)</td>
                                        <td style="background-color: #e9ecef;">${dataparser.antiguedad}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <table style="width: 100%;">
                        <tr>
                            <td style="width: 20%;">
                                <h5
                                    style="background-color:#ced4da; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    Reciprocidad Pactada
                                </h5>
                            </td>
                            <td style="width: 45%;">
                                <h5
                                    style="background-color:#ced4da; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    Convenio
                                </h5>
                            </td>
                            <td style="width: 35%;">
                                <h5
                                    style="background-color:#c24c4c; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                    RESULTADO DE LA SOLICITUD
                                </h5>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                <table border="1" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <th style="color: #c24c4c; height: 1.7rem;">Producto</th>
                                        <th style="color: #c24c4c;">Monto</th>
                                        <th style="color: #c24c4c;">Tasa</th>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Ahorro</td>
                                        <td>$ ${parseFloat(dataparser.ahorroMonto).toLocaleString()}</td>
                                        <td>${parseFloat(dataparser.ahorroTasa).toFixed(2).toLocaleString()} %</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Corriente</td>
                                        <td>$ ${parseFloat(dataparser.corrienteMonto).toLocaleString()}</td>
                                        <td>${parseFloat(dataparser.corrienteTasa).toFixed(2).toLocaleString()} %</td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 45%;">
                                <table style="font-size: 14px;">
                                    <tr>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 20px;">
                                                <span class="${dataparser.convenioPago === '1' ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.convenioPago === '1' ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Convenio de Pago
                                            </div>
                                        </td>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 60px;">
                                                <span class="${dataparser.convenioRecaudo === '2' ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.convenioRecaudo === '2' ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Convenio Recaudo
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 20px;">
                                                <span class="${dataparser.serviciosFinancieros === '3' ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.serviciosFinancieros === '3' ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Servicios Financieros
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 40px;">
                                                <span class="${dataparser.convenioNomina > 0 ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.convenioNomina > 0 ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Pago Nómina
                                            </div>
                                        </td>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 80px;">
                                                <span class="${dataparser.recaudoBarras > 0 ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.recaudoBarras > 0 ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Código de Barras
                                            </div>
                                        </td>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 20px;">
                                                <span class="${dataparser.recaudoPSE > 0 ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.recaudoPSE > 0 ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                PSE Recaudo
                                            </div>
                                        </td>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 20px;">
                                                <span class="${dataparser.recaudoPortal > 0 ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.recaudoPortal > 0 ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Portal de Pagos
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 40px;">
                                                <span class="${dataparser.convenioTerceros > 0 ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.convenioTerceros > 0 ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Pago Terceros
                                            </div>
                                        </td>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 80px;">
                                                <span class="${dataparser.recaudoReferencia > 0 ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.recaudoReferencia > 0 ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Manual Referencia
                                            </div>
                                        </td>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 20px;">
                                                <span class="${dataparser.recaudoCorresponsal > 0 ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.recaudoCorresponsal > 0 ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Corresponsal
                                            </div>
                                        </td>
                                        <td style="line-height: 2rem;">
                                            <div style="margin-left: 20px;">
                                                <span class="${dataparser.recaudoAdquirencia > 0 ? '' : 'activar'}"
                                                    style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                                </span>
                                                <span class="${dataparser.recaudoAdquirencia > 0 ? 'activar' : ''}"
                                                    style="color:#343a40; font-size: 18px;"> &#8865;
                                                </span>
                                                Adquirencia
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="width: 35%;">
                                <table border="1" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Costo Int. Max EA%</td>
                                        <td style="background-color: #e9ecef;">
                                            ${isNaN(parseFloat(dataparser.costoIntMax).toFixed(2).toLocaleString()) ? 0 : parseFloat(dataparser.costoIntMax).toFixed(2).toLocaleString()} %</td>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Costo Int. EA%</td>
                                        <td style="background-color: #e9ecef;">${isNaN(parseFloat(dataparser.costoInt).toFixed(2).toLocaleString()) ? 0 : parseFloat(dataparser.costoInt).toFixed(2).toLocaleString()} %</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Rentabilidad Min.</td>
                                        <td style="background-color: #e9ecef;">
                                            ${isNaN(parseFloat(dataparser.rentabilidadMin).toFixed(2).toLocaleString()) ? 0 : parseFloat(dataparser.rentabilidadMin).toFixed(2).toLocaleString()} %</td>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Rentabilidad Real%.</td>
                                        <td style="background-color: #e9ecef;">
                                            ${isNaN(parseFloat(dataparser.rentabilidadReal).toFixed(2).toLocaleString()) ? 0 : parseFloat(dataparser.rentabilidadReal).toFixed(2).toLocaleString()} %</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%;">
                        <tr>
                            <td style="width: 65%;">.</td>
                            <td style="width: 35%;">
                                <table border="1" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Margen Cartera</td>
                                        <td style="background-color: #e9ecef;">$
                                            ${isNaN(dataparser.margenCartera) ? 0 : resetearPesos({ valor: dataparser.margenCartera })}</td >
                                    </tr >
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Margen Captación</td>
                                        <td style="background-color: #e9ecef;">$
                                            ${isNaN(dataparser.margenCaptacion) ? 0 : resetearPesos({ valor: dataparser.margenCaptacion })}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Margen Convenios</td>
                                        <td style="background-color: #e9ecef;">$
                                            ${isNaN(dataparser.margenConvenio) ? 0 : resetearPesos({ valor: dataparser.margenConvenio })}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Utilidad</td>
                                        <td style="background-color: #e9ecef;">$
                                            ${isNaN(dataparser.utilidad) ? 0 : resetearPesos({ valor: dataparser.utilidad })}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Reciprocidad Adquirencia</td>
                                        <td style="background-color: #e9ecef;">$
                                            ${isNaN(dataparser.reciproAdquirencia) ? 0 : resetearPesos({ valor: dataparser.reciproAdquirencia })}</td>
                                    </tr>
                                </table >
    <br>
        <h5
            style="background-color:#c24c4c; color: white; height:2rem; text-align: center; line-height: 2rem;">
            ENTE Y PARAMETRIZADOR
        </h5>
        <table border="1" style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
                <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Ente de Atribución</td>
                <td style="background-color: #e9ecef;">${dataparser.enteAtribucion}</td>
            </tr>
            <tr>
                <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Parametrización</td>
                <td style="background-color: #e9ecef;">${dataparser.parametrizacion}</td>
            </tr>
        </table>
    </td>
                        </tr >
                    </table >
    <br>
        <br>
            Mediante el siguiente link puede ingresar a la aplicación para aprobar o negar la solicitud: <a
                href="${APP_URL}">apricingapp.coomeva.com.co</a>
        </main>
    </body>

            </html > `
        };

        let promise = new Promise(function (resolve, reject) {

            nodeEmail.verify(function (error, success) {

                if (error) {
                    console.log(error);
                    resulSendEmail.status = 500;
                    resulSendEmail.message = error.message;
                    resulSendEmail.email = false;
                    reject(resulSendEmail);
                } else {
                    console.log("El servidor está listo para enviar");
                    nodeEmail.sendMail(message, (err, info) => {
                        if (err) {
                            console.log(err);
                            resulSendEmail.status = 500;
                            resulSendEmail.message = err.message;
                            resulSendEmail.email = false;
                            reject(resulSendEmail);
                        } else {
                            resulSendEmail.status = 200;
                            resulSendEmail.message = info.response;
                            resulSendEmail.email = true;
                            resolve(resulSendEmail);
                        };
                    });
                };
            });
        });

        await promise
            .finally(() => console.log('Estado del Correo Enviado:', resulSendEmail.message))
            .then(result => {
                responseEmail = result;
            })
            .catch(error => {
                responseEmail = error;
            });

        return JSON.stringify(responseEmail);
    };
};