"use server";

import { nodeEmail } from '@/config/conectSMTP';
import { resetearPesos } from '../../utils';

export const notificacion = async (req, tipoEnte) => {

    const APP_URL = process.env.URL_APP;

    let dataCorreo = JSON.parse(req);
    let resulSendEmail = {};
    let responseEmail = {};
    let listaCorreos = '';
    const arrayString = dataCorreo.CORREO;


    if (arrayString.includes('[', 0)) {
        listaCorreos = JSON.parse(dataCorreo.CORREO).toString();
        console.log('Notificacion aprobadores:', `${JSON.parse(dataCorreo.CORREO).toString()}`);
    } else {
        listaCorreos = dataCorreo.CORREO;
        console.log('Notificacion aprobadores:', `${dataCorreo.CORREO}`);
    };


    const message = {
        from: "noreplyqa@coomeva.com.co",
        to: `${listaCorreos.trim()}`,
        subject: `Solicitud Nº ${dataCorreo.COD_SOLICITUD} de ${dataCorreo.CREDITO === '01' ? 'Credito' : ''}, ${dataCorreo.CONVENIO === '03' ? 'Convenio' : ''} ${dataCorreo.OPERACION !== '1' ? 'Ajuste' : 'Nuevo'} - ${dataCorreo.CLIENTE} - ${dataCorreo.NIT_CLIENTE} `,
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
                            Cordial Saludo, la regional <strong>${dataCorreo.REGIONAL}</strong> ha solicitado la ${tipoEnte} de la operación <strong>Nº ${dataCorreo.COD_SOLICITUD}</strong> de
                            <strong>${dataCorreo.CREDITO === '01' ? 'Credito' : ''}, ${dataCorreo.CONVENIO === '03' ? 'Convenio' : ''}
                            ${dataCorreo.OPERACION !== '1' ? 'Ajuste' : 'Nuevo'}</strong>.
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
                                    <td style="border-bottom: solid 1px #ced4da; width: 30%;">${dataCorreo.NIT_CLIENTE}</td>
                                    <td style="color: #c24c4c; font-weight:bold; width:5%;">Cliente:</td>
                                    <td style="border-bottom: solid 1px #ced4da; width: 50%;">${dataCorreo.CLIENTE}</td>
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
                                        <span class="${dataCorreo.CREDITO === '01' ? '' : 'activar'}"
                                            style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                        </span>
                                        <span class="${dataCorreo.CREDITO === '01' ? 'activar' : ''}"
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
                                        <span class="${dataCorreo.CONVENIO === '03' ? '' : 'activar'}"
                                            style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                        </span>
                                        <span class="${dataCorreo.CONVENIO === '03' ? 'activar' : ''}"
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
                                        <span class="${dataCorreo.OPERACION === '1' ? '' : 'activar'}"
                                            style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                        </span>
                                        <span class="${dataCorreo.OPERACION === '1' ? 'activar' : ''}"
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
                                    <td style="text-align: center;">$ ${dataCorreo.CUPO_MONTO === null ? 0 : dataCorreo.CUPO_MONTO === '' ? 0 : parseFloat(dataCorreo.CUPO_MONTO).toLocaleString()}</td>
                                    <td style="text-align: center;">${isNaN(parseFloat(dataCorreo.CUPO_PLAZO).toLocaleString()) ? 0 : parseFloat(dataCorreo.CUPO_PLAZO).toLocaleString()}</td>
                                    <td style="text-align: center;">${isNaN(parseFloat(dataCorreo.CUPO_REDESCUENTO).toFixed(2).toLocaleString()) ? 0.00 : parseFloat(dataCorreo.CUPO_REDESCUENTO).toFixed(2).toLocaleString()} %</td>
                                    <td style="text-align: center;">${isNaN(parseFloat(dataCorreo.CUPO_COBERTURA).toFixed(2).toLocaleString()) ? 0.00 : parseFloat(dataCorreo.CUPO_COBERTURA).toFixed(2).toLocaleString()} %</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Tesoreria</td>
                                    <td style="text-align: center;">$ ${dataCorreo.TESO_MONTO === null ? 0 : dataCorreo.TESO_MONTO === '' ? 0 : parseFloat(dataCorreo.TESO_MONTO).toLocaleString()}</td>
                                    <td style="text-align: center;">${isNaN(parseFloat(dataCorreo.TESO_PLAZO).toLocaleString()) ? 0 : parseFloat(dataCorreo.TESO_PLAZO).toLocaleString()}</td>
                                    <td style="text-align: center;">${isNaN(parseFloat(dataCorreo.TESO_REDESCUENTO).toFixed(2).toLocaleString()) ? 0.00 : parseFloat(dataCorreo.TESO_REDESCUENTO).toFixed(2).toLocaleString()} %</td>
                                    <td style="text-align: center;">${isNaN(parseFloat(dataCorreo.TESO_COBERTURA).toFixed(2).toLocaleString()) ? 0.00 : parseFloat(dataCorreo.TESO_COBERTURA).toFixed(2).toLocaleString()} %</td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 35%;">
                            <table border="1" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Total Cartera</td>
                                    <td style="background-color: #e9ecef;">$ ${dataCorreo.TOTAL_CARTERA === null ? 0 : resetearPesos({ valor: dataCorreo.TOTAL_CARTERA })}</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Total Captación</td>
                                    <td style="background-color: #e9ecef;">$ ${isNaN(dataCorreo.TOTAL_CAPTACION) ? 0 : resetearPesos({ valor: dataCorreo.TOTAL_CAPTACION })}</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Antigüedad (Meses)</td>
                                    <td style="background-color: #e9ecef;">${dataCorreo.ANTIGUEDAD}</td>
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
                                    <td>$ ${dataCorreo.CORRIENTEMONTO === null ? 0 : dataCorreo.CORRIENTEMONTO === '' ? 0 : parseFloat(dataCorreo.CORRIENTEMONTO).toLocaleString()}</td>
                                    <td>${dataCorreo.CORRIENTETASA === null ? 0.00 : dataCorreo.CORRIENTETASA === '' ? 0 : parseFloat(dataCorreo.CORRIENTETASA).toFixed(2).toLocaleString()} %</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Corriente</td>
                                    <td>$ ${dataCorreo.AHORROMONTO === null ? 0 : dataCorreo.AHORROMONTO === '' ? 0 : parseFloat(dataCorreo.AHORROMONTO).toLocaleString()}</td>
                                    <td>${dataCorreo.AHORROTASA === null ? 0.00 : dataCorreo.AHORROTASA === '' ? 0 : parseFloat(dataCorreo.AHORROTASA).toFixed(2).toLocaleString()} %</td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 45%;">
                            <table style="font-size: 14px;">
                                <tr>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 20px;">
                                            <span class="${dataCorreo.CONVENIOPAGO === '1' ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.CONVENIOPAGO === '1' ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Convenio de Pago
                                        </div>
                                    </td>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 60px;">
                                            <span class="${dataCorreo.CONVENIORECAUDO === '2' ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.CONVENIORECAUDO === '2' ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Convenio Recaudo
                                        </div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 20px;">
                                            <span class="${dataCorreo.SERVICIOFINANCIERO === '3' ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.SERVICIOFINANCIERO === '3' ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Servicios Financieros
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 40px;">
                                            <span class="${Object.keys(dataCorreo.CONVENIONOMINA).length > 0 ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${Object.keys(dataCorreo.CONVENIONOMINA).length > 0 ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Pago Nómina
                                        </div>
                                    </td>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 80px;">
                                            <span class="${dataCorreo.RECAUDOBARRAS.length > 0 ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.RECAUDOBARRAS.length > 0 ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Código de Barras
                                        </div>
                                    </td>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 20px;">
                                            <span class="${dataCorreo.RECAUDOPSE.length > 0 ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.RECAUDOPSE.length > 0 ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            PSE Recaudo
                                        </div>
                                    </td>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 20px;">
                                            <span class="${dataCorreo.RECAUDOPORTAL.length > 0 ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.RECAUDOPORTAL.length > 0 ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Portal de Pagos
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 40px;">
                                            <span class="${dataCorreo.CONVENIOTERCEROS.length > 0 ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.CONVENIOTERCEROS.length > 0 ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Pago Terceros
                                        </div>
                                    </td>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 80px;">
                                            <span class="${dataCorreo.RECAUDOREFERENCIA.length > 0 ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.RECAUDOREFERENCIA.length > 0 ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Manual Referencia
                                        </div>
                                    </td>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 20px;">
                                            <span class="${dataCorreo.RECAUDOCORRESPONSAL.length > 0 ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.RECAUDOCORRESPONSAL.length > 0 ? 'activar' : ''}"
                                                style="color:#343a40; font-size: 18px;"> &#8865;
                                            </span>
                                            Corresponsal
                                        </div>
                                    </td>
                                    <td style="line-height: 2rem;">
                                        <div style="margin-left: 20px;">
                                            <span class="${dataCorreo.RECAUDOADQUIRENCIA.length > 0 ? '' : 'activar'}"
                                                style=" color: #c24c4c; font-size: 18px;"> &#8864;
                                            </span>
                                            <span class="${dataCorreo.RECAUDOADQUIRENCIA.length > 0 ? 'activar' : ''}"
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
                                        ${isNaN(parseFloat(dataCorreo.COSTO_INTEGRAL_MAX).toFixed(2).toLocaleString()) ? 0 : parseFloat(dataCorreo.COSTO_INTEGRAL_MAX).toFixed(2).toLocaleString()} %</td>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Costo Int. EA%</td>
                                    <td style="background-color: #e9ecef;">
                                        ${isNaN(parseFloat(dataCorreo.COSTO_INTEGRAL).toFixed(2).toLocaleString()) ? 0 : parseFloat(dataCorreo.COSTO_INTEGRAL).toFixed(2).toLocaleString()} %</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Rentabilidad Min.</td>
                                    <td style="background-color: #e9ecef;">
                                        ${isNaN(parseFloat(dataCorreo.RENTABILIDAD_MIN).toFixed(2).toLocaleString()) ? 0 : parseFloat(dataCorreo.RENTABILIDAD_MIN).toFixed(2).toLocaleString()} %</td>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Rentabilidad Real%.</td>
                                    <td style="background-color: #e9ecef;">
                                        ${isNaN(parseFloat(dataCorreo.RENTABILIDAD).toFixed(2).toLocaleString()) ? 0 : parseFloat(dataCorreo.RENTABILIDAD).toFixed(2).toLocaleString()} %</td>
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
                                    <td style="background-color: #e9ecef;">$ ${dataCorreo.MARGEN_CARTERA === null ? 0 : resetearPesos({ valor: dataCorreo.MARGEN_CARTERA })}</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Margen Captación</td>
                                    <td style="background-color: #e9ecef;">$ ${dataCorreo.MARGEN_CAPTACION === null ? 0 : resetearPesos({ valor: dataCorreo.MARGEN_CAPTACION })}</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Margen Convenios</td>
                                    <td style="background-color: #e9ecef;">$ ${dataCorreo.MARGEN_CONVENIOS === null ? 0 : resetearPesos({ valor: dataCorreo.MARGEN_CONVENIOS })}</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Utilidad</td>
                                    <td style="background-color: #e9ecef;">$ ${dataCorreo.UTILIDAD_ANUAL === null ? 0 : resetearPesos({ valor: dataCorreo.UTILIDAD_ANUAL })}</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Reciprocidad Adquirencia</td>
                                    <td style="background-color: #e9ecef;">$ ${dataCorreo.RECIPROCIDAD_ADQUIRIDA === null ? 0 : resetearPesos({ valor: dataCorreo.RECIPROCIDAD_ADQUIRIDA })}</td>
                                </tr>
                            </table>
                            <br>
                            <h5
                                style="background-color:#c24c4c; color: white; height:2rem; text-align: center; line-height: 2rem;">
                                ENTE Y PARAMETRIZADOR
                            </h5>
                            <table border="1" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Ente de Atribución</td>
                                    <td style="background-color: #e9ecef;">${dataCorreo.CARGO_APRO}</td>
                                </tr>
                                <tr>
                                    <td style="color: #c24c4c; font-weight: bold; height: 1.7rem;">Parametrización</td>
                                    <td style="background-color: #e9ecef;">${dataCorreo.CARGO_PARA}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <br>
                <br>
                Mediante el siguiente link puede ingresar a la aplicación para aprobar o negar la solicitud: <a
                    href="${APP_URL}">apricingapp.coomeva.com.co</a>
            </main>
        </body>
        
        </html>`
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