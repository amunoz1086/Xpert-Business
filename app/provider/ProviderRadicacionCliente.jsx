'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ContextRadClient = createContext(null)

export const useProviderRadClient = () => {

    return useContext(ContextRadClient)
}

export const ProviderRadicacionCliente = ({ children }) => {

    const [tabBarSeleccionado, setTabBarSeleccionado] = useState('NIT')

    const [clienteNuevoProspectoActualizar, setClienteNuevoProspectoActualizar] = useState('')

    const crearClienteNuevoProspectoActualizar = useCallback((data) => {
        setClienteNuevoProspectoActualizar(data)
    }, [])

    // Persona Natural

    const [perfilPn, setPerfilPn] = useState({
        reference: {},
        contactoTelefonico: [],
        direcciones: []
    })

    /**
     * datosadioconales
     */


    // const [datosAdicionales, setDatosAdicionales] = useState({
    //     datosGeneralesAdicionales: {},
    //     referenciaFamiliar: {},
    //     referenciaPersonal: {},
    //     referenciaLaborales: [],
    //     datosDelNegocio: {}
    // })

    const [datosGeneralesAdicionalPn, setDatosGeneralesAdicionalPn] = useState({})
    const actualizardatosGeneralesAdicionalPn = useCallback((data) => {
        setDatosGeneralesAdicionalPn(data)
    }, [])

    const [referenciaPersonalAdicionalPn, setReferenciaPersonalAdicionalPn] = useState({});
    const actualizarReferenciaPersonalAdicionalPn = useCallback((data) => {
        setReferenciaPersonalAdicionalPn(data);
    }, []);

    const [referenciaFamiliarAdicionalPn, setReferenciaFamiliarAdicionalPn] = useState({});
    const actualizarReferenciaFamiliarAdicionalPn = useCallback((data) => {
        setReferenciaFamiliarAdicionalPn(data);
    }, []);

    const [referenciaLaboralAdicionalPn, setReferenciaLaboralAdicionalPn] = useState([]);
    const actualizarReferenciaLaboralAdicionalPn = useCallback((data) => {
        setReferenciaLaboralAdicionalPn(data);
    }, []);

    const [datosNegocioAdicionalPn, setDatosNegocioAdicionalPn] = useState({});
    const actualizarDatosNegocioAdicionalPn = useCallback((data) => {
        setDatosNegocioAdicionalPn(data);
    }, []);


    //context actualizado

    const [residenciaFiscalPn, setResidenciaFiscalPn] = useState({})
    const actualizarResidenciaFiscalPn = useCallback((data) => {
        setResidenciaFiscalPn(data)
    }, [])

    const [activadEconomicaPn, setActivadEconomicaPn] = useState({})
    const [detalleActivadEconomicaPn, setDetalleActivadEconomicaPn] = useState([{}])

    const actualizarDetalleActiviadEconomicaPn = useCallback((data) => {
        setDetalleActivadEconomicaPn(data)
    }, [])

    // const [referecniaPn, setReferecniaPn] = useState([])
    const [referecniaPn, setReferecniaPn] = useState({

        datosGeneralesAdicionales: {
            paisExpedicion: '',
            departamentoExpedicion: '',
            lugarExpedicion: '',
            actividadEEconomicaEmpresaDondeTrabaja: '',
            tipoEmpresaDondeTrabaja: '',
            grupoEtnico: '',
            LGTBIQ: '',
            marcacionCorrespondencia: '',
            fechaCorteEstadoCuenta: '',
            recibirInformacionCelular: '',
            recibirInformacionCorreo: '',
            datosSensibles: '',
            cuentaAhorros: '',
            cuentaCorriente: '',
            tarjetaCredito: '',
            creditoPersonal: '',
            creditoHipotecario: '',
            seguroVida: '',
            inversion: '',
            pension: '',
        },
        referenciaFamiliar: {
            nombreCompleto: '',
            primerApellido: '',
            segundoApellido: '',
            parentesco: '',
            tipoIdentificacion: '',
            numeroIdentificacion: '',
            tipoContacto: '',
            tipoTelefono: '',
            prefijo: '',
            telefono: '',
            PEPReferencia: '',
            funcion: '',
            nombreInstitucion: '',
            cargo: '',
            fechaInicio: '',
            fechaFin: '',
        },
        referenciaPersonal: {
            nombreCompleto: '',
            primerApellido: '',
            segundoApellido: '',
            parentesco: '',
            tipoIdentificacion: '',
            numeroIdentificacion: '',
            tipoContacto: '',
            tipoTelefono: '',
            prefijo: '',
            telefono: '',
            PEPReferencia: '',
            funcion: '',
            nombreInstitucion: '',
            cargo: '',
            fechaInicio: '',
            fechaFin: '',
        },
        datosDelNegocio: {
            nombreEstablecimiento: '',
            tipoIdentificacionTributaria: '',
            numeroIdentificacionTributaria: '',
            queActividad: '',
            direccionNegocioIgualDomicilioPersonal: '',
            tiempoDesempenandoActividad: '',
            tipoEstablecimiento: '',
            horaInicio: '',
            horaFin: '',
            quienAtiendeNegocio: '',
            numeroEmpleados: '',
            inicioActividades: '',
            tiempoExperienciaEmpresarial: '',
            actividadNegocio: '',
            lunes: '',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: '',
            sabado: '',
            domingo: '',
            direccionDomicilio: ''
        }
    })

    const actualizarPerfilPn = useCallback((data) => {
        setPerfilPn(data)
    }, [])

    const actualizarActiviadEconomicaPn = useCallback((data) => {
        setActivadEconomicaPn(data)
    }, [])

    const actualizarReferenciaPn = useCallback((data) => {
        setReferecniaPn(data)
    }, [])

    const actualizarTabBarSeleccionado = useCallback((data) => {
        setTabBarSeleccionado(data)
    }, [])


    // Persona Juridica
    const [perfilPj, setPerfilPj] = useState(
        {
            informacionGeneral: {
                "razonSocial": '',
                "codPaisConstitucion": '',
                "tipoIdentificacion": '',
                "numeroIdentificacion": '',
                "tipoSociedad": '',
                "categoriaCompania": '',
                "oficina": '',
                "oficial": '',
            },

            datosEconomicos: {

                "representanLegal": '',
                "actividadEconomica": '',
                "fuentePrincipalIngresos": '',
                "ingresosAnuales": '',
                "grupoEconomico": '',

            },


            conoscaCliente: {
                "paisOperacion": '',
                "coberturaGeografica": '',
                "numeroSucursales": '',
                "numeroEmpleados": '',

            },


            informacionLegal: {
                "nombreComercial": '',
                "fechaConstitucion": '',
                "fechaInscripcion": '',
            },

            telefonos: {
                telefonoNegocio: [
                    // {
                    //     "tipoTelefono": '',
                    //     "tipoContacto": '',
                    //     "prefijo": '',
                    //     "numero": '',
                    //     "mensajeria": '',
                    //     "principal": '',
                    //     "operadora": '',
                    //     "tipoContrato": '',
                    // }
                ],
                telefonoOficina: [
                    //     {
                    //     "tipoTelefono": '',
                    //     "tipoContacto": '',
                    //     "prefijo": '',
                    //     "numero": '',
                    //     "mensajeria": '',
                    //     "principal": '',
                    //     "operadora": '',
                    //     "tipoContrato": '',
                    // }
                ],
                telefonoPersonalAutorizado: [
                    //     {
                    //     "tipoTelefono": '',
                    //     "tipoContacto": '',
                    //     "prefijo": '',
                    //     "numero": '',
                    //     "mensajeria": '',
                    //     "principal": '',
                    //     "operadora": '',
                    //     "tipoContrato": '',
                    // }
                ],

            },

            correosElectronicos: [
                // {
                //     "tipoCorreo": '',
                //     "correoElectronico": '',
                //     "usuPreferente": '',
                // }
            ],

            sitiosWeb: [
                //     {
                //     "tipoSitioWeb": '',
                //     "url": '',
                //     "usuPreferente": '',
                // }
            ],

            direcciones: {
                direccionNegocio: [
                    // {
                    //     "direccionPrincipalNegocio": '',
                    //     "tipoDireccion": '',
                    //     "pais": '',
                    //     "departamento": '',
                    //     "ciudad": '',
                    //     "tipoViaPrincipal": '',
                    //     "numeroViaPrincipal": '',
                    //     "nombreViaPrincipal": '',
                    //     "letraViaPrincipal": '',
                    //     "sectoViarPrincipal": '',
                    //     "tipoViaSecundaria": '',
                    //     "numeroViaSecundaria": '',
                    //     "nombreViaSecundaria": '',
                    //     "letraPrincipalViaSecundaria": '',
                    //     "sectorViaSecundaria": '',
                    //     "numeroPredioViaSecundaria": '',
                    //     "barrio": '',
                    //     "nombreBarrio": '',
                    //     "unidad": '',
                    //     "numeroUnidad": '',
                    //     "letraUnidad": '',
                    //     "interiorDescripcion": '',
                    //     "numeroInterior": '',
                    //     "letraInterior": '',
                    //     "referenciaUbicacion": '',
                    // }
                ],
                direccionSucursal: [
                    // {
                    //     "direccionPrincipalNegocio": '',
                    //     "tipoDireccion": '',
                    //     "pais": '',
                    //     "departamento": '',
                    //     "ciudad": '',
                    //     "tipoViaPrincipal": '',
                    //     "numeroViaPrincipal": '',
                    //     "nombreViaPrincipal": '',
                    //     "letraViaPrincipal": '',
                    //     "sectoViarPrincipal": '',
                    //     "tipoViaSecundaria": '',
                    //     "numeroViaSecundaria": '',
                    //     "nombreViaSecundaria": '',
                    //     "letraPrincipalViaSecundaria": '',
                    //     "sectorViaSecundaria": '',
                    //     "numeroPredioViaSecundaria": '',
                    //     "barrio": '',
                    //     "nombreBarrio": '',
                    //     "unidad": '',
                    //     "numeroUnidad": '',
                    //     "letraUnidad": '',
                    //     "interiorDescripcion": '',
                    //     "numeroInterior": '',
                    //     "letraInterior": '',
                    //     "referenciaUbicacion": '',
                    // }
                ]

            }
        })

    const actualizarPerfilPj = useCallback((data) => {
        setPerfilPj(data)
    }, [])

    const [representanteLegalPj, setRepresentanteLegalPj] = useState([])
    const actualizarRepresentanteLegalPj = useCallback((data) => {
        setRepresentanteLegalPj(data)
    }, [])

    const [residenciaFiscalPj, setResidenciaFiscalPj] = useState({})
    const actualizarResidenciaFiscalPj = useCallback((data) => {
        setResidenciaFiscalPj(data)
    }, [])


    const [juntaDirectivaPj, setJuntaDirectivaPj] = useState([])
    const actualizarJuntaDirectivaPj = useCallback((data) => {
        setJuntaDirectivaPj(data)
    }, [])

    const [accionistaPj, setAccionistaPj] = useState([])
    const actualizarAccionistaPj = useCallback((data) => {
        setAccionistaPj(data)
    }, [])

    const [beneficiarioPj, setBeneficiarioPj] = useState([])
    const actualizarBeneficiarioPj = useCallback((data) => {
        setBeneficiarioPj(data)
    }, [])

    const [informacionFinancieraPj, setInformacionFinancieraPj] = useState({

        situacionEconomica: {
            tipoBalance: '',
            claseBalance: '',
            fechaCorte: '',
            ventasAnuales: '',
            ingresosMensuales: '',
            PGJ: '',
            ingresosNoOperacionales: '',
            gastosAnuales: '',
            egresosMensuales: '',

        },
        situacionPatrimonial: {
            tipoBalance: '',
            claseBalance: '',
            fechaCorte: '',
            activos: '',
            BGJ: '',
            pasivos: '',
            patrimonio: '',
            capitalSocial: '',

        },
        balanceGeneral: {
            fechaCorte: '',
            activosCorrientes: '',
            activosFijos: '',
            otrosActivos: '',
            totalActivos: '',
            pasivosCorrientes: '',
            pasivosLargoPlazo: '',
            otrosPasivos: '',
            totalPasivos: '',
            patrimonioNeto: '',

        },
        estadoResultados: {
            ingresosOperacionales: '',
            costoVentas: '',
            utilidadBruta: '',
            gastosAdministrativos: '',
            gastosVentas: '',
            utilidadOperacional: '',
            ingresosNoOperacionales: '',
            gastosNoOperacionales: '',
            utilidadAntesImpuestos: '',
            Impuestos: '',
            utilidadNeta: '',

        },
        informacionTributaria: {
            declaracionRenta: '',
            declaracionIVA: '',
            retencionFuente: '',
            informacionExogena: '',

        },
        obligacionesFinancieras: {
            entidadFinanciera: '',
            tipoCredito: '',
            ValorInicial: '',
            saldoActual: '',
            fechaInicio: '',
            fechaVencimiento: '',
        }
    });

    const actualizarInformacionFinancieraPj = useCallback((data) => {
        setInformacionFinancieraPj(data)
    }, [])

    const [controlantesPj, setControlantesPj] = useState([])
    const actualizarControlantesPj = useCallback((data) => {
        setControlantesPj(data)
    }, [])

    const [contactoAutorizadoPj, setContactoAutorizadoPj] = useState([])
    const actualizarContactoAutorizadoPj = useCallback((data) => {
        setContactoAutorizadoPj(data)
    }, [])

    const [juntaDirectivaPn, setJuntaDirectivaPn] = useState([])
    const actualizarJuntaDirectivaPn = useCallback((data) => {
        setJuntaDirectivaPn(data)
    }, [])

    const [accionistasPn, setAccionistasPn] = useState([])
    const actualizarAccionistasPn = useCallback((data) => {
        setAccionistasPn(data)
    }, [])

    const [beneficiariosPn, setBeneficiariosPn] = useState([])
    const actualizarBeneficiariosPn = useCallback((data) => {
        setBeneficiariosPn(data)
    }, [])

    const [tipoPersona, setTipoPersona] = useState('')
    const actualizarTipoPersona = useCallback((data) => {
        setTipoPersona(data)
    }, [])

    const [activarConsulta, setActivarConsulta] = useState(false)
    const actualizarActivarConsulta = useCallback((data) => {
        setActivarConsulta(data)
    }, [])

    const [juntaDirectivaPjPn, setJuntaDirectivaPjPn] = useState([])
    const actualizarJuntaDirectivaPjPn = useCallback((data) => {
        setJuntaDirectivaPjPn(data)
    }, [])


    //producto
    const [creditoProducto, setCreditoProducto] = useState([])
    const actualizarCreditoProducto = useCallback((data) => {
        setCreditoProducto(data)
    }, [])

    const [cuentasProducto, setCuentasProducto] = useState([])
    const actualizarCuentasProducto = useCallback((data) => {
        setCuentasProducto(data)
    }, [])

    const [cdtProducto, setCdtProducto] = useState([])
    const actualizarCdtProducto = useCallback((data) => {
        setCdtProducto(data)
    }, [])

    const [convenioActualProducto, setConvenioActualProducto] = useState([])
    const actualizarConvenioActualProducto = useCallback((data) => {
        setConvenioActualProducto(data)
    }, [])

    const [reciprocidadProducto, setReciprocidadProducto] = useState([])
    const actualizarReciprocidadProducto = useCallback((data) => {
        setReciprocidadProducto(data)
    }, [])

    const [botmGuardar, setBotmGuardar] = useState(false)
    const actualizarBotmGuardar = useCallback((data) => {
        setBotmGuardar(data)
    }, [])

    const [activarBtnSolicitud, setActivarBtnSolicitud] = useState(true)
    const actualizarBtnSolicitud = useCallback((data) => {
        setActivarBtnSolicitud(data)
    }, [])

    const [paginasPendientePorValidar, setPaginasPendientePorValidar] = useState([])
    const actualizarpaginasPendientePorValidar = useCallback((data) => {
        setPaginasPendientePorValidar(data)
    }, [])

    const [cambioTipoCliente, setCambioTipoCliente] = useState(false)
    const actualizarCambioTipoCliente = useCallback((data) => {
        setCambioTipoCliente(data)
    }, [])

    const [modalProspectoPjPn, setModalProspectoPjPn] = useState({})
    const actualizarModalProspectoPnPj = useCallback((data) => {
        setModalProspectoPjPn(data)
    }, [])

    const [administradorFiduciario, setAdministradorFiduciario] = useState([])
    const actualizarAdministradorFiduciario = useCallback((data) => {
        setAdministradorFiduciario(data)
    }, [])

    const [titularConsorcio, setTitularConsorcio] = useState([])
    const actualizarTitularConsorcio = useCallback((data) => {
        setTitularConsorcio(data)
    }, [])

    const [administradorConsorcio, setAdministradorConsorcio] = useState([]);
    const actualizarAdministradorConsorcio = useCallback((data) => {
        setAdministradorConsorcio(data)
    }, [])

    const [cuentas, setCuentas] = useState([])
    const actualizarCuentas = useCallback((data) => {
        setCuentas(data)
    }, []);

    const limpiarConsorcio = useCallback(() => {
        setAdministradorConsorcio([]);
        setTitularConsorcio([]);
        setAdministradorFiduciario([]);
    }, []);

    const limpiarCuentas = useCallback(() => {
        setCuentas([]);
    }, []);


    const contextValue = useMemo(() => ({
        modalProspectoPjPn,
        cambioTipoCliente,
        actualizarCambioTipoCliente,
        actualizarModalProspectoPnPj,
        paginasPendientePorValidar,
        actualizarpaginasPendientePorValidar,
        activarBtnSolicitud,
        botmGuardar,
        actualizarBotmGuardar,
        actualizarBtnSolicitud,

        clienteNuevoProspectoActualizar,
        tipoPersona,
        perfilPn,
        residenciaFiscalPn,
        activadEconomicaPn,
        detalleActivadEconomicaPn,
        referecniaPn,
        tabBarSeleccionado,
        activarConsulta,
        juntaDirectivaPjPn,

        perfilPj,
        representanteLegalPj,
        residenciaFiscalPj,
        juntaDirectivaPj,
        accionistaPj,
        beneficiarioPj,
        informacionFinancieraPj,
        controlantesPj,
        contactoAutorizadoPj,
        juntaDirectivaPn,
        accionistasPn,
        beneficiariosPn,

        creditoProducto,
        cuentasProducto,
        cdtProducto,
        convenioActualProducto,
        reciprocidadProducto,

        administradorFiduciario,
        titularConsorcio,
        administradorConsorcio,
        actualizarAdministradorFiduciario,
        actualizarTitularConsorcio,
        actualizarAdministradorConsorcio,

        crearClienteNuevoProspectoActualizar,
        actualizarPerfilPn,
        actualizarResidenciaFiscalPn,
        actualizarActiviadEconomicaPn,
        actualizarDetalleActiviadEconomicaPn,
        actualizarReferenciaPn,
        actualizarTabBarSeleccionado,

        actualizarPerfilPj,
        actualizarRepresentanteLegalPj,
        actualizarResidenciaFiscalPj,
        actualizarJuntaDirectivaPj,
        actualizarAccionistaPj,
        actualizarBeneficiarioPj,
        actualizarInformacionFinancieraPj,
        actualizarControlantesPj,
        actualizarContactoAutorizadoPj,
        actualizarAccionistasPn,
        actualizarBeneficiariosPn,
        actualizarJuntaDirectivaPn,
        actualizarTipoPersona,
        actualizarActivarConsulta,
        actualizarJuntaDirectivaPjPn,

        actualizarCreditoProducto,
        actualizarCuentasProducto,
        actualizarCdtProducto,
        actualizarConvenioActualProducto,
        actualizarReciprocidadProducto,

        cuentas,
        actualizarCuentas,
        limpiarCuentas,

        datosGeneralesAdicionalPn,
        actualizardatosGeneralesAdicionalPn,
        referenciaPersonalAdicionalPn,
        actualizarReferenciaPersonalAdicionalPn,
        referenciaFamiliarAdicionalPn,
        actualizarReferenciaFamiliarAdicionalPn,
        referenciaLaboralAdicionalPn,
        actualizarReferenciaLaboralAdicionalPn,
        datosNegocioAdicionalPn,
        actualizarDatosNegocioAdicionalPn,
        limpiarConsorcio

    }), [modalProspectoPjPn, cambioTipoCliente, actualizarCambioTipoCliente, actualizarModalProspectoPnPj, paginasPendientePorValidar,
        actualizarpaginasPendientePorValidar, activarBtnSolicitud, botmGuardar, actualizarBotmGuardar, actualizarBtnSolicitud,
        clienteNuevoProspectoActualizar, tipoPersona, perfilPn, residenciaFiscalPn, activadEconomicaPn, detalleActivadEconomicaPn, referecniaPn,
        tabBarSeleccionado, activarConsulta, juntaDirectivaPjPn, perfilPj, representanteLegalPj, residenciaFiscalPj, juntaDirectivaPj, accionistaPj,
        beneficiarioPj, informacionFinancieraPj, controlantesPj, contactoAutorizadoPj, juntaDirectivaPn, accionistasPn, beneficiariosPn,
        creditoProducto, cuentasProducto, cdtProducto, convenioActualProducto, reciprocidadProducto, administradorFiduciario, titularConsorcio,
        administradorConsorcio, actualizarAdministradorFiduciario, actualizarTitularConsorcio, actualizarAdministradorConsorcio,
        crearClienteNuevoProspectoActualizar, actualizarPerfilPn, actualizarResidenciaFiscalPn, actualizarActiviadEconomicaPn,
        actualizarDetalleActiviadEconomicaPn, actualizarReferenciaPn, actualizarTabBarSeleccionado, actualizarPerfilPj, actualizarRepresentanteLegalPj,
        actualizarResidenciaFiscalPj, actualizarJuntaDirectivaPj, actualizarAccionistaPj, actualizarBeneficiarioPj, actualizarInformacionFinancieraPj,
        actualizarControlantesPj, actualizarContactoAutorizadoPj, actualizarAccionistasPn, actualizarBeneficiariosPn, actualizarJuntaDirectivaPn,
        actualizarTipoPersona, actualizarActivarConsulta, actualizarJuntaDirectivaPjPn, actualizarCreditoProducto, actualizarCuentasProducto,
        actualizarCdtProducto, actualizarConvenioActualProducto, actualizarReciprocidadProducto, cuentas, actualizarCuentas, limpiarCuentas,
        datosGeneralesAdicionalPn, actualizardatosGeneralesAdicionalPn, referenciaPersonalAdicionalPn, actualizarReferenciaPersonalAdicionalPn,
        referenciaFamiliarAdicionalPn, actualizarReferenciaFamiliarAdicionalPn, referenciaLaboralAdicionalPn, actualizarReferenciaLaboralAdicionalPn,
        datosNegocioAdicionalPn, actualizarDatosNegocioAdicionalPn, limpiarConsorcio]
    )


    return (
        <ContextRadClient.Provider value={contextValue}>
            {children}
        </ContextRadClient.Provider>
    )
}