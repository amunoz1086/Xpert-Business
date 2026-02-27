'use client';

/* Librerias */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
/* Share */
import Loading from '@/app/loading';
import ModalsForForm from "../../share/ModalsForForm";
import { CampoLista } from "../../share/CampoLista";
import { CampoFecha } from "../../share/CampoFecha";
import { CampoNumero } from "../../share/CampoNumero";
import { CampoMonedaDecimal } from "../../share/CampoMonedaDecimal";
import { queryListTipoSobregiro } from "@/app/lib/menuPrincipal/actions";
import { fn_orquestadorAsignarSobregiro } from "@/app/lib/apisProductoCupo/fn_orquestadorAsignarSobregiro";
import { fn_queryAsignacionCuenta } from "@/app/lib/apisProductoCupo/fn_queryAsignacionCuenta";
import { obtenerCookiePerfil } from "@/app/lib/auth/auth";
import { fn_update_cupoSobregiro } from "@/app/lib/apisProductoCupo/fn_update_cupoSobregiro";
import { fn_insert_cupoSobregiro } from "@/app/lib/apisProductoCupo/fn_insert_cupoSobregiro";
import { fn_enviarCorreo } from "@/app/lib/apisProductoCupo/fn_enviarCorreo";
import { conversionPesos } from "@/app/lib/utils";


const DynamicModal = dynamic(() => import('../../share/Modals'), { ssr: false });


export const ContenidoAsignar = ({ datos }) => {

    /* loading y modales */
    const [showLoading, setShowLoading] = useState(false);
    const [showNotificacionModal, setShowNotificacionModal] = useState(false);
    const [messageNotificacionModal, setMessageNotificacionModal] = useState('');
    const [showNotificacionAsignacion, setShowNotificacionAsignacion] = useState(false);
    const [messageNotificacionAsignacion, setMessageNotificacionAsignacion] = useState('');
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false);

    const [showObservacion, setShowObservacion] = useState(false);

    /* Datos */
    const [dataCuentas, setDataCuentas] = useState([]);
    const [perfilActivo, setPerfilActivo] = useState();

    /* Catalogos */
    const [tipoSobregiro, setTipoSobregiro] = useState([]);

    /* Campos */
    const [numeroCuentaValue, setNumeroCuentaValue] = useState();
    const [tipoSobregiroValue, setTipoSobregiroValue] = useState();
    const [fechaAprobacionValue, setFechaAprobacionValue] = useState();
    const [montoValue, setMontoValue] = useState();
    const [vigenciaValue, setVigenciaValue] = useState();
    const [numeroActaValue, setNumeroActaValue] = useState();
    const [fechaVencimientoValue, setFechaVencimientoValue] = useState();
    const [dia, setDia] = useState('');
    const [observacion, setObservacion] = useState('');
    const [correoRadicador, setCorreoRadicador] = useState([]);


    /* Cargando Datos Consulta Cuentas */
    useEffect(() => {
        let rawDataCuentas;
        if (datos.hasOwnProperty("dataSobregiro")) {
            rawDataCuentas = datos.dataSobregiro
                .map(id => {
                    const datCuentas = datos.data.find(c => c.AccountID === id.numero_cuenta);
                    if (!datCuentas) return null;
                    return {
                        ...datCuentas,
                        acta: id.acta
                    };
                })
                .filter(Boolean);

            setDataCuentas(rawDataCuentas || []);
        } else {
            rawDataCuentas = datos.data;
            setDataCuentas(rawDataCuentas || []);
        };
    }, [datos]);


    /* Cargando Catalogos */
    useEffect(() => {
        try {
            if (tipoSobregiro.length === 0) {
                const timeoutCatalogo = setTimeout(async () => {
                    const cat = JSON.parse(await queryListTipoSobregiro()).DATA;
                    setTipoSobregiro(cat);
                }, 100);

                return () => clearTimeout(timeoutCatalogo);
            }
        } catch (error) {
            console.log(error)
        };
    }, []);


    /* Calculo de Fechas */
    useEffect(() => {
        if (fechaAprobacionValue && vigenciaValue) {
            const nuevaFecha = calcularFechaVencimiento(fechaAprobacionValue, vigenciaValue);
            setFechaVencimientoValue(nuevaFecha);
        }
    }, [fechaAprobacionValue, vigenciaValue]);


    const calcularFechaVencimiento = (fechaAprobacion, vigenciaDias) => {
        if (!fechaAprobacion || isNaN(vigenciaDias)) return "";

        const [anio, mes, dia] = fechaAprobacion.split('-').length === 3
            ? fechaAprobacion.split('-')
            : fechaAprobacion.split('-').reverse();

        const fecha = new Date(`${anio}-${mes}-${dia}T00:00:00`);
        fecha.setDate(fecha.getDate() + parseInt(vigenciaDias));

        const diaF = String(fecha.getDate()).padStart(2, '0');
        const mesF = String(fecha.getMonth() + 1).padStart(2, '0');
        const anioF = fecha.getFullYear();

        return `${diaF}-${mesF}-${anioF}`;
    };

    /* Validar Perfil Activo */
    useEffect(() => {
        async function perfilActivo() {
            try {
                const rawPerfilUsuario = await obtenerCookiePerfil();
                setPerfilActivo(rawPerfilUsuario.value);
            } catch (error) {
                console.log("Error obteniendo perfil:", error);
            };
        };
        perfilActivo();
    }, []);


    /* Ejecutando Form Asignacion */
    const selectCuenta = (e) => {

        const elementSelect = document.getElementById(e.target.id);
        const dataSetNumCuenta = elementSelect.dataset.numcuenta;
        const dataSetActa = elementSelect.dataset.acta;

        if (+perfilActivo === 602) {
            setNumeroCuentaValue(e.currentTarget.textContent.trim());
            setTipoSobregiroValue('O');
            setMostrarModalCrear(true);
        } else if (+perfilActivo === 3) {
            asignacionCupos(dataSetNumCuenta, dataSetActa);
        };
    };


    /* Validar Datos Asignacion */
    const asignacionCupos = async (pNumeroCuenta, pActa) => {
        setShowLoading(true);

        const cuenta = {
            "numeroCuenta": pNumeroCuenta,
            "acta": pActa
        };

        try {
            const rawAsignacion = JSON.parse(await fn_queryAsignacionCuenta(JSON.stringify(cuenta)));

            if (rawAsignacion.STATUS !== 200) {
                setShowLoading(false);
                setMessageNotificacionModal(`No fue posible cargar los datos, intentelo nuevamente`);
                setShowNotificacionModal(true);
                return;
            };

            const fecha = new Date(rawAsignacion.DATA[0].fecha_aprobacion);
            const fechaFormateada = fecha.toISOString().split("T")[0];

            setNumeroCuentaValue(rawAsignacion.DATA[0].numero_cuenta);
            setTipoSobregiroValue(rawAsignacion.DATA[0].tipo_sobregiro);
            setFechaAprobacionValue(fechaFormateada);
            setMontoValue(conversionPesos({ valor: rawAsignacion.DATA[0].monto, nDecimales: 2 }));
            setVigenciaValue(rawAsignacion.DATA[0].dias_vigencia);
            setNumeroActaValue(rawAsignacion.DATA[0].acta_aprobacion_id);
            setDia(+rawAsignacion.DATA[0].dias_vigencia > 1 ? 'días' : 'día');
            setCorreoRadicador(rawAsignacion.DATA[0].correo_radicador);

            setShowLoading(false);
            setMostrarModalCrear(true);

        } catch (error) {
            console.log(error);
        };
    };


    /* Captura de Cambios en Elementos Form */
    const onChangeElement = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'tipoSobregiro':
                setTipoSobregiroValue(value);
                break;
            case 'fechaAprobacion':
                setFechaAprobacionValue(value);
                break;
            case 'monto':
                setMontoValue(value);
                break;
            case 'vigencia':
                setVigenciaValue(value);
                setDia(value > 1 ? 'días' : 'día')
                break;
            case 'numeroActa':
                setNumeroActaValue(value);
                break;
            default:
                break;
        }
    };


    /* Guardar Asignación */
    const guardarAsignacion = async () => {
        setShowLoading(true);

        let rawDataSave = {
            "numeroCuenta": numeroCuentaValue,
            "tipoSobregiro": tipoSobregiroValue,
            "fechaAprobacion": fechaAprobacionValue,
            "monto": montoValue,
            "vigencia": vigenciaValue,
            "numeroActa": numeroActaValue,
            "fechaVencimiento": fechaVencimientoValue,
            "clientID": dataCuentas[0].ClientID
        };

        const isDataComplit = Object.entries(rawDataSave);
        let camposVacios = [];

        const thNombres = Array.from(document.querySelectorAll("#datosAsignar th"))
            .map(th => ({
                id: th.id,
                nombre: th.textContent.trim()
            }));

        for (let i of isDataComplit) {
            if (i[1] === undefined || i[1] === '') {
                const filterName = thNombres.filter(elemen => elemen.id === i[0])[0].nombre;
                camposVacios.push(filterName);
            };
        };

        if (camposVacios.length > 0) {
            setShowLoading(false);
            setMessageNotificacionModal(`Los siguientes campos se encuentran vacíos y son obligatorios: ${camposVacios}`);
            setShowNotificacionModal(true);
            return;
        };

        rawDataSave.observacion = observacion;
        rawDataSave.EdoSolicitud = 40;

        const resGuardar = await fn_insert_cupoSobregiro(JSON.stringify(rawDataSave));
        let parsedResGuardar = {};

        if (typeof resGuardar === "string" && resGuardar.length > 0) {
            parsedResGuardar = JSON.parse(resGuardar);
        };

        setShowLoading(false);

        if (+parsedResGuardar.STATUS !== 200) {

            if (+parsedResGuardar.STATUS === 204 || +parsedResGuardar.STATUS === 202) {
                setMessageNotificacionModal(`${parsedResGuardar.MESSAGE}`);
                setShowNotificacionModal(true);
                return;
            };

            setMessageNotificacionModal(`No fue posible guardar la asignación de la cuenta ${rawDataSave.numeroCuenta}, intentelo nuevamente`);
            setShowNotificacionModal(true);
            return;
        };

        setMessageNotificacionAsignacion(`Los datos de la asignación para la cuenta ${rawDataSave.numeroCuenta}, se han guardado correctamente`);
        setShowNotificacionAsignacion(true);
        return;
    };


    /* Aprobar Asignación */
    const aprobarAsignacion = async () => {
        setShowLoading(true);

        let rawDataSave = {
            "numeroCuenta": numeroCuentaValue,
            "tipoSobregiro": tipoSobregiroValue,
            "fechaAprobacion": fechaAprobacionValue,
            "monto": montoValue,
            "vigencia": vigenciaValue,
            "numeroActa": numeroActaValue,
            "fechaVencimiento": fechaVencimientoValue,
            "clientID": dataCuentas[0].ClientID
        };

        const isDataComplit = Object.entries(rawDataSave);
        let camposVacios = [];

        const thNombres = Array.from(document.querySelectorAll("#datosAsignar th"))
            .map(th => ({
                id: th.id,
                nombre: th.textContent.trim()
            }));

        for (let i of isDataComplit) {
            if (i[1] === undefined || i[1] === '') {
                const filterName = thNombres.filter(elemen => elemen.id === i[0])[0].nombre;
                camposVacios.push(filterName);
            };
        };

        if (camposVacios.length > 0) {
            setShowLoading(false);
            setMessageNotificacionModal(`Los siguientes campos se encuentran vacíos y son obligatorios: ${camposVacios}`);
            setShowNotificacionModal(true);
            return;
        };

        rawDataSave.observacion = observacion;

        const resGuardar = await fn_orquestadorAsignarSobregiro(JSON.stringify(rawDataSave));
        let parsedResGuardar = {};

        if (typeof resGuardar === "string" && resGuardar.length > 0) {
            parsedResGuardar = JSON.parse(resGuardar);
        };

        validaAsignacion(parsedResGuardar);

    };


    /* Validar Asignación */
    const validaAsignacion = (pRawResponse) => {

        if (+pRawResponse.status === 200) {
            setShowLoading(false);
            setMessageNotificacionAsignacion(pRawResponse.message);
            setShowNotificacionAsignacion(true);

            //correo
            let rawDataCorreo = {
                "destinatarios": [correoRadicador],
                "mensaje": `Cordial saludo,<br><br> El cupo solicitado para el cliente <b>${dataCuentas[0].ClientID}</b>, quedo Asignado correctamente.`,
                "asunto": `Solicitud Cupo sobregiro- Asignado - ${dataCuentas[0].ClientID}`,
            };

            fn_enviarCorreo(JSON.stringify(rawDataCorreo));

            return;
        };

        setShowLoading(false);
        setMessageNotificacionModal(pRawResponse.message);
        setShowNotificacionModal(true);

    };


    /* Cancelar Asignación */
    const canselarAsignacion = async () => {
        setShowObservacion(false);
        setShowLoading(true);
        let rawDataSave = {
            "numeroCuenta": numeroCuentaValue,
            "numeroActa": numeroActaValue,
            "EdoSolicitud": 50,
            "observacion": observacion
        };

        const resUpadate = await fn_update_cupoSobregiro(JSON.stringify(rawDataSave));
        let parsedResGuardar = {};

        if (typeof resUpadate === "string" && resUpadate.length > 0) {
            parsedResGuardar = JSON.parse(resUpadate);
        };

        setShowLoading(false);

        if (parsedResGuardar.STATUS !== 200) {
            setMessageNotificacionAsignacion(`No fue posible cancelar la asignación de la cuenta ${rawDataSave.numeroCuenta}, intentelo nuevamente`);
            setShowNotificacionAsignacion(true);
            return;
        };

        setMessageNotificacionAsignacion(`La asignación para la cuenta ${rawDataSave.numeroCuenta}, ha sido cancelada`);
        setShowNotificacionAsignacion(true);

        //correo
        let rawDataCorreo = {
            "destinatarios": [correoRadicador],
            "mensaje": `Cordial saludo,<br><br> El cupo solicitado para el cliente <b>${dataCuentas[0].ClientID}</b>, fue rechazado bajo la siguiente observación: <br><br> ▸ ${observacion}`,
            "asunto": `Solicitud Cupo sobregiro- Rechazo - ${dataCuentas[0].ClientID}`,
        };

        fn_enviarCorreo(JSON.stringify(rawDataCorreo));

    };


    /* Cerrar Modales */
    const cerrarModalCrear = () => {
        limpiarForm();
        setMostrarModalCrear(false);
    };


    const limpiarForm = () => {
        setNumeroCuentaValue('');
        setTipoSobregiroValue('');
        setFechaAprobacionValue('');
        setMontoValue('');
        setVigenciaValue('');
        setDia('');
        setNumeroActaValue('');
        setFechaVencimientoValue('');
        setObservacion('');
    };


    const endNotificacionModal = () => {
        setShowNotificacionModal(false);
    };


    const endNotificacionAsignacion = () => {
        limpiarForm();
        setMostrarModalCrear(false);
        setShowNotificacionAsignacion(false);
    };


    const solicitarObservacion = (e) => {
        e?.preventDefault?.();
        setShowObservacion(true);
    };


    return (
        <div className='w-full'>
            <div>
                <div className='w-full border px-3 py-4 rounded-md shadow-sm bg-white'>
                    <div className='w-full'>
                        <h3 className='text-xl font-semibold mb-5 text-gray-800'>Asignar Cupo de Sobregiro</h3>
                        <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Número de Cuenta
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Producto
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nombre del Producto
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Titularidad
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dataCuentas.length > 0 ? (
                                        dataCuentas.map((fila, i) => (
                                            <tr key={`${fila.AccountID}-${fila.acta}`}>
                                                <td
                                                    className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        id={`${fila.acta}_${i}`}
                                                        className='text-sm text-blue-800 decoration-solid underline cursor-pointer'
                                                        data-acta={fila.acta}
                                                        data-numcuenta={fila.AccountID}
                                                        onClick={(e) => selectCuenta(e)}
                                                    >
                                                        {fila.AccountID}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.AccountType}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.AccountSubType}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.AccountShortName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fila.AccountStatus}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No hay datos aún.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {
                showLoading && <Loading />
            }
            {
                (showNotificacionModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endNotificacionModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageNotificacionModal}</p>
                </DynamicModal>
            }
            {
                (showNotificacionAsignacion)
                &&
                <DynamicModal titulo={'Asignación Sobregiro'} mostrarModal={endNotificacionAsignacion} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageNotificacionAsignacion}</p>
                </DynamicModal>
            }
            {
                mostrarModalCrear ?
                    <ModalsForForm w="[60%]" p="3" z="[45]" fondoAzul={true} bg="bg-white">
                        <div className="flex justify-between w-full items-center">
                            <button
                                onClick={() => { cerrarModalCrear() }}
                                className="flex w-full justify-end mx-5 cursor-pointer"
                            >
                                <p className="text-2xl" title="Cerrar">x</p>
                            </button>
                        </div>
                        <div className="w-full px-1">
                            <h1 className="font-bold text-base"> {`Creación`}</h1>
                        </div>
                        <div className="h-[25rem] w-full border rounded-lg flex justify-center w-full items-center">
                            <table id="datosAsignar" className='w-[93%] border-collapse border border-gray-300'>
                                <tbody>
                                    <tr>
                                        <th id="numeroCuenta" scope="row" className='border border-gray-300 text-left py-[0.9rem] pl-1 bg-gray-200 text-sm'>Número de cuenta</th>
                                        <td className='border border-gray-100 text-left w-[50%] text-sm'>
                                            <div className='px-1'>
                                                <CampoNumero
                                                    valorInput={numeroCuentaValue}
                                                    onChangeInput={onChangeElement}
                                                    nameInput={"numeroCuenta"}
                                                    placeholder=''
                                                    validacionRequeridoEditable={{ requerido: false, estado: true }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th id="tipoSobregiro" scope="row" className='border border-gray-300 text-left py-[0.9rem] pl-1 bg-gray-200 text-sm'>Tipo de Sobregiro</th>
                                        <td className='border border-gray-100 text-left text-sm'>
                                            <div className='px-1'>
                                                <CampoLista
                                                    valorInput={tipoSobregiroValue}
                                                    onChangeInput={onChangeElement}
                                                    nameInput={"tipoSobregiro"}
                                                    placeholder=''
                                                    lista={tipoSobregiro || []}
                                                    idLista='code'
                                                    descripcionList='value'
                                                    validacionRequeridoEditable={{ requerido: false, estado: +perfilActivo === 3 }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th id="fechaAprobacion" scope="row" className='border border-gray-300 text-left py-[0.9rem] pl-1 bg-gray-200 text-sm'>Fecha de Aprobación</th>
                                        <td className='border border-gray-100 text-left text-sm'>
                                            <div className='px-1'>
                                                <CampoFecha
                                                    valorInput={fechaAprobacionValue}
                                                    onChangeInput={onChangeElement}
                                                    nameInput={"fechaAprobacion"}
                                                    placeholder=''
                                                    validacionRequeridoEditable={{ requerido: false, estado: +perfilActivo === 3 }}
                                                />
                                            </div >
                                        </td>
                                    </tr>
                                    <tr>
                                        <th id="monto" scope="row" className='border border-gray-300 text-left py-[0.9rem] pl-1 bg-gray-200 text-sm'>Monto</th>
                                        <td className='border border-gray-100 text-left text-sm'>
                                            <div className='px-1'>
                                                {/* <CampoNumero
                                                    valorInput={montoValue}
                                                    onChangeInput={onChangeElement}
                                                    nameInput={"monto"}
                                                    placeholder=''
                                                    validacionRequeridoEditable={{ requerido: false, estado: +perfilActivo === 3 }}
                                                /> */}
                                                <CampoMonedaDecimal
                                                    valorInput={montoValue}
                                                    onChangeInput={onChangeElement}
                                                    nameInput={"monto"}
                                                    placeholder=''
                                                    estado={+perfilActivo === 3}
                                                    requerido={false}
                                                    nDecimales={2}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th id="vigencia" scope="row" className='border border-gray-300 text-left py-[0.9rem] pl-1 bg-gray-200 text-sm'>Vigencia</th>
                                        <td className='border border-gray-100 text-left text-sm'>
                                            <div className='flex flex-row flex-wrap-reverse'>
                                                <div className='px-1'>
                                                    <CampoNumero
                                                        valorInput={vigenciaValue}
                                                        onChangeInput={onChangeElement}
                                                        nameInput={"vigencia"}
                                                        placeholder=''
                                                        validacionRequeridoEditable={{ requerido: false, estado: +perfilActivo === 3 }}
                                                    />
                                                </div>
                                                <p className='text-base h-fit'>{dia}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th id="numeroActa" scope="row" className='border border-gray-300 text-left py-[0.9rem] pl-1 bg-gray-200 text-sm'>Número Acta</th>
                                        <td className='border border-gray-100 text-left text-sm'>
                                            <div className='px-1'>
                                                <CampoNumero
                                                    valorInput={numeroActaValue}
                                                    onChangeInput={onChangeElement}
                                                    nameInput={"numeroActa"}
                                                    placeholder=''
                                                    validacionRequeridoEditable={{ requerido: false, estado: +perfilActivo === 3 }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th id="fechaVencimiento" scope="row" className='border border-gray-300 text-left py-[0.9rem] pl-1 bg-gray-200 text-sm'>Fecha de Vencimiento</th>
                                        <td className='border border-gray-100 text-left text-sm'>
                                            <div className='px-1'>
                                                <CampoFecha
                                                    valorInput={fechaVencimientoValue}
                                                    //onChangeInput={onChangeElement}
                                                    nameInput={"fechaVencimiento"}
                                                    placeholder=''
                                                    disabled={true}
                                                    validacionRequeridoEditable={{ requerido: false, estado: true }}
                                                />
                                            </div >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {+perfilActivo === 3 && (
                            <div className="w-full flex justify-end px-1">
                                <button type="button" onClick={aprobarAsignacion} className="bg-coomeva_color-rojo text-white py-1 px-10 rounded-md mr-4">Aprobar</button>
                                <button type="button" onClick={solicitarObservacion} className="bg-coomeva_color-rojo text-white py-1 px-10 rounded-md">Cancelar</button>
                            </div>
                        )}
                        {+perfilActivo === 602 && (
                            <div className="w-full flex justify-end px-1">
                                <button type="button" onClick={guardarAsignacion} className="bg-coomeva_color-rojo text-white py-1 px-10 rounded-md">Guardar</button>
                            </div>
                        )}
                        {
                            (showObservacion)
                            &&
                            <DynamicModal titulo={'¿Motivo de la cancelación?'} mostrarModal={canselarAsignacion} cerrarModal={() => setShowObservacion(false)} ocultarBtnCancelar={false} textBtnContinuar="Continuar" mostrarImagneFondo={true}>
                                <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{''}</p>
                                <textarea
                                    name="recurso"
                                    rows="3"
                                    cols="30"
                                    maxLength="50"
                                    placeholder='Escribe tu comentario aquí...'
                                    defaultValue={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                >
                                </textarea>
                            </DynamicModal>
                        }
                    </ModalsForForm>
                    : null
            }
        </div>
    );
};