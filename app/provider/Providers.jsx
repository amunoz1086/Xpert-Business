'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'


export const DataContext = createContext(null)

export const useProvider = () => {

    return useContext(DataContext)

}


export default function Providers({ children }) {


    /**carga data solicitud */
    const [observacion, setObservacion] = useState('este es el contect')

    const [cargarSolicitud, setCargarSolicitud] = useState({})

    const updateCargaSoictud = useCallback((data) => {

        setCargarSolicitud(data)

    }, [])

    const [pathConvenio, setPathConvenio] = useState('')

    const updatePathConvenio = useCallback((data) => {

        setPathConvenio(data)

    }, [])

    const [codigoSolciitud, setCodigoSolciitud] = useState('')

    const [statusCorreo, setStatusCorreo] = useState(false)

    /**
     * bufferDocumentos sin id
     */

    const [uploadBufferFile, setUpLoadBufferFile] = useState(new FormData())

    /**
     * cargaDocumentos
     */
    const [isDocumentos, setIsDocumentos] = useState({
        cedula: false,
        rut: false,
        certificado: false,
        formato: false,
        contrato: false
    })

    const [historialPath, setHistorialPath] = useState(true)

    const [idSolicitudDb, setIdSolicitudDb] = useState('')

    const [inputDocument, setInputDocument] = useState('')

    const [cliente, setCliente] = useState({
        // tipoDocumento: '',
        // documento: '',
        nuevoCliente: false,
        editar: false,

    })

    const [estadoAprobacionParametrizador, setEstadoAprobacionParametrizador] = useState({})

    const [editar, setEditar] = useState(false)

    const [solicitud, setSolicitud] = useState({})

    const [convenioPago, setConvenioPago] = useState({
        convenioPagoNominaTipo: {},
        convenioPagoTerceros: [],
        convenioPagoNominaNegociada: [],
    })



    const [convenioRecaudo, setConvenioRecaudo] = useState({
        recaudoOficina: [],
        recaudoPSE: [],
        recaudoCorresponsales: [],
        adquirencia: [],
        gastosPse: [],
        gastoasOficina: [],
        redes: {
            credibanVp: '0',
            redebanVp: '0',
            credibancoVnp: '0',
            redebanVnp: '0',
            redebanMicropagos: '0',
            credibancoVendig: '0',
            credibancoTrMasivo: '0',
            total: '0'
        }
    })

    const [servicioFinanciero, setServicioFinanciero] = useState({
        solicitud: [],
        tipoConvenio: ''
    })

    const [first, setfirst] = useState({
        componente1: [],
        componente2: {}
    })


    const [depositoVista, setDepositoVista] = useState({

        tipoCuenta: '',
        planRemuracion: {
            planRem: '',
            monto: '',
            tasa: '',
        },
        cuentasPlan: []
    })

    const [remi, setRemi] = useState(
        []
    )

    const [evaluar, setEvaluar] = useState(false)

    const [configuracion, setConfiguracion] = useState({
        adquirencia: {
            infoTriburaria: [],
            infoComercio: {

            },
            tipoVenta: {},
            tipoCuenta1: [

            ]
        },
        convenioRecaudo: {
            recaudoFormato: {},
            recaudoManuales1: [

            ],
            recaudoSiNo: '',
            cuentaRecaudodora: [],
            modeloPago: {},
            recuadoClasePago: {},
            recaudoRespaldo: {}
        },
        corresponsales: {
            tipoRecuado: {},
            BaseWebTicket: {},
            // tipoCuenta: [],
            recuadoManual: [],
            cuentaRecaudadoraEan: [],
            modeloPago: {}
        },
        convenioPago: {
            cuentaRecaudadora1: [],
            cuentaRecaudadora2: []
        }

    })


    const [reciprocidadResumen, setReciprocidResumen] = useState({
        ahorro: {},
        corriente: {},
        resultadoResumenMotor: {}
    })


    const [tecnioOperador, setTecnioOperador] = useState({})

    const [clientModal, setClientModal] = useState({})

    const [campoAdicionalesModal, setCampoAdicionalesModal] = useState({})

    const [estadoSolicitud, setEstadoSolicitud] = useState('')

    const [clienteFiducia, setClienteFiducia] = useState({})



    const [resultadoMotor, setResultadoMotor] = useState({})

    const [botonAprobarSolicitud, setBotonAprobarSolicitud] = useState(false)

    const updateDataSolciitud = useCallback((data) => {
        setSolicitud(data)
    }, [])

    const updateHistorialPath = useCallback((data) => {
        setHistorialPath(data)
    }, [])

    const updateStatusCorreo = useCallback((data) => {
        setStatusCorreo(data)
    }, [])


    const updateBufferDocumentos = useCallback((key, value) => {

        uploadBufferFile.set(key, value);

        setUpLoadBufferFile(uploadBufferFile)


    }, [])


    const updateIsDocumentos = useCallback((data) => {
        setIsDocumentos(data)
    }, [])

    const updateAprobacionParametrizacion = useCallback((data) => {
        setEstadoAprobacionParametrizador(data)
    }, [])


    const updatePrelease3 = useCallback((data) => {
        setfirst(data)
    }, [])

    const updateConvenioPago = useCallback((propiedad, data) => {

        if (!propiedad) {
            setConvenioPago(data)
            return
        }
        setConvenioPago((convenioPago) => ({
            ...convenioPago,
            [propiedad]: data,
        }));
    }, [])

    const updateConvenioRecaudo = useCallback((propiedad, data) => {
        if (!propiedad) {
            setConvenioRecaudo(data)
            return
        }
        setConvenioRecaudo((convenioRecaudo) => ({
            ...convenioRecaudo,
            [propiedad]: data,
        }));
    }, [])

    const updateServicioFinanciero = useCallback((propiedad, data) => {
        if (!propiedad) {
            setServicioFinanciero(data)
            return
        }
        setServicioFinanciero((servFinanciero) => ({
            ...servFinanciero,
            [propiedad]: data,
        }));
    }, [])

    const updateDepositoVista = useCallback((propiedad, data) => {
        if (!propiedad) {
            setDepositoVista(data)
            return
        }
        setDepositoVista((depVista) => ({
            ...depVista,
            [propiedad]: data,
        }));
    }, [])

    const updateDataRemi = useCallback((data) => {
        setRemi(data)
    }, [])

    const updateDataCliente = useCallback((data) => {
        setCliente(data)
    }, [])

    const updateDocumentoCliente = useCallback((data) => {
        setInputDocument(data)
    }, [])

    const updateConfiguracion = useCallback((propiedad, subPropiedad, data) => {
        setConfiguracion((configuracion) => ({
            ...configuracion,
            [propiedad]: {
                ...configuracion[propiedad],
                [subPropiedad]: data,
            }
            // ...configuracion,
            // [propiedad]: data,
        }));
    }, [])

    const updateTecnicoOperador = useCallback((data) => {
        setTecnioOperador(data)
    }, [])

    const updateClientModal = useCallback((data) => {
        setClientModal(data)
    }, [])

    const updateCampoAdicionalesModal = useCallback((data) => {
        setCampoAdicionalesModal(data)
    }, [])

    const updateEvaluar = useCallback((data) => {
        setEvaluar(data)
    }, [])

    const updateEstadoSolicitud = useCallback((data) => {
        setEstadoSolicitud(data)
    }, [])

    const updateEditarPerfil = useCallback((data) => {
        setEditar(data)
    }, [])

    const updateObservacion = useCallback((data) => {
        setObservacion(data)
    }, [])

    const updateReciprocidadResumen = useCallback((data) => {
        setReciprocidResumen(data)
    }, [])

    const updateClienteFiducia = useCallback((propiedad, data, item) => {

        (propiedad) ?
            setClienteFiducia((clienteFiducia) => ({
                ...clienteFiducia,
                [propiedad]: data
            })) : item ? setClienteFiducia(data) : setClienteFiducia({})



    }, [])

    const [creditoNuevo, setCreditoNuevo] = useState([])

    const updateCreditoNuevo = useCallback((data) => {
        setCreditoNuevo(data)
    }, [])

    const updateResumenMotor = useCallback((data) => {
        setResultadoMotor(data)
    }, [])

    const updateCodigoSolictud = useCallback((data) => {
        setCodigoSolciitud(data)
    }, [])

    const habilitarBotoAprobarSolicitud = useCallback((data) => {
        setBotonAprobarSolicitud(data)
    }, [])

    const updateIdSolictudDb = useCallback((data) => {
        setIdSolicitudDb(data)
    }, [])

    const [cdt, setCdt] = useState([])


    const updateCDT = useCallback((data) => {
        setCdt(data)
    }, [])

    const [cuenta, setCuenta] = useState([
        //      {
        //     id: 1,
        //     numCuenta: '*******2394',
        //     producto: '1',
        //     productoBancario: '',
        //     fechaApertura: '',
        //     saldoFecha: '',
        //     planActual: 'Pyme',
        //     modificarPlan: '',


        // }
    ])


    const updateCuenta = useCallback((data) => {
        setCuenta(data)
    }, [])

    const [credito, setCredito] = useState({
        lineaCredito: '',
        tipoTasa: '',
        tasaMin: '',
        tasaMax: '',
        tasaVariable: '',
        spreadMin: '',
        spreadMax: '',
        plazoMin: '',
        plazoMax: '',
        frecuenciaCapital: '',
        periodoGracia: '',
        frecuenciaInteres: ''
    })



    const updateCredito = useCallback((data) => {
        setCredito(data)
    }, [])


    const contextValue = useMemo(() => ({

        cliente,
        editar,
        solicitud,
        convenioPago,
        convenioRecaudo,
        remi,
        servicioFinanciero,
        depositoVista,
        configuracion,
        tecnioOperador,
        clientModal,
        campoAdicionalesModal,
        evaluar,
        estadoSolicitud,
        reciprocidadResumen,
        clienteFiducia,
        creditoNuevo,
        resultadoMotor,
        codigoSolciitud,
        botonAprobarSolicitud,
        estadoAprobacionParametrizador,
        idSolicitudDb,
        isDocumentos,
        uploadBufferFile,
        statusCorreo,
        historialPath,
        pathConvenio,
        inputDocument,
        observacion,
        cdt,
        cuenta,
        credito,
        updateCredito,



        habilitarBotoAprobarSolicitud,
        updateCodigoSolictud,
        updateCreditoNuevo,
        updateClienteFiducia,
        updateReciprocidadResumen,
        updateEditarPerfil,

        updateCampoAdicionalesModal,
        updateClientModal,
        updateTecnicoOperador,

        updateConfiguracion,
        updateDepositoVista,
        updateServicioFinanciero,
        updateDataRemi,
        updateConvenioRecaudo,
        updateDataSolciitud,
        updateConvenioPago,
        updateDataCliente,
        updateEvaluar,
        updateEstadoSolicitud,
        updateResumenMotor,
        updateAprobacionParametrizacion,
        updateIdSolictudDb,
        updateIsDocumentos,
        updateBufferDocumentos,
        updateStatusCorreo,
        updateHistorialPath,
        cargarSolicitud,
        updateCargaSoictud,
        updatePathConvenio,
        updateDocumentoCliente,
        updateObservacion,
        updateCDT,
        updateCuenta

    }), [
        uploadBufferFile, isDocumentos,
        codigoSolciitud, idSolicitudDb,
        solicitud, convenioPago,
        convenioRecaudo, remi,
        servicioFinanciero, depositoVista,
        cliente, configuracion, tecnioOperador,
        editar, evaluar, estadoSolicitud,
        reciprocidadResumen, clienteFiducia,
        creditoNuevo, clientModal,
        campoAdicionalesModal, resultadoMotor,
        botonAprobarSolicitud, estadoAprobacionParametrizador,
        statusCorreo, historialPath, pathConvenio, inputDocument, observacion, cdt, cuenta,
        updateClientModal,
        updateCampoAdicionalesModal,
        updateTecnicoOperador,
        updateConfiguracion,
        updateDepositoVista,
        updateServicioFinanciero,
        updateDataRemi,
        updateConvenioRecaudo,
        updateDataSolciitud,
        updateConvenioPago,
        updateDataCliente,
        updateEvaluar,
        updateEstadoSolicitud,
        updateEditarPerfil,
        updateClienteFiducia,
        updateCreditoNuevo,
        updateResumenMotor,
        updateCodigoSolictud,
        habilitarBotoAprobarSolicitud,
        updateAprobacionParametrizacion,
        updateIdSolictudDb,
        updateIsDocumentos,
        updateBufferDocumentos,
        updateStatusCorreo,
        updateHistorialPath,
        updatePathConvenio,

        cargarSolicitud,
        updateCargaSoictud,
        updateDocumentoCliente,
        updateObservacion,
        updateReciprocidadResumen,
        updateCDT,
        updateCuenta, credito,
        updateCredito,

    ])


    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}

