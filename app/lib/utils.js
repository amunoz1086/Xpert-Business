export const rolUsuario = { 'radicador': false, 'aprobador': true, 'parametrizador': true }


/**opciones pestañas */
export const Tabs = [
    {
        name: 'Crédito',
        href: '/radicacion/convenioServicios/creditoNuevo',
        tab: 'credito',
        inactiva: true
    },
    // {
    //     name: 'Convenio de Pago',
    //     href: '/radicacion/convenioServicios',
    //     tab: 'convenioPago',
    //     inactiva: true
    // },
    // {
    //     name: 'Convenio de Recaudo',
    //     href: '/radicacion/convenioServicios/convenioRecaudo',
    //     tab: 'convenioRecaudo',
    //     inactiva: true
    // },
    // {
    //     name: 'Servicios Financieros',
    //     href: '/radicacion/convenioServicios/servicioFinanciero',
    //     tab: 'servicioFinanciero',
    //     inactiva: true
    // },
    {
        name: 'Convenio',
        href: '/radicacion/convenioServicios',
        tab: 'convenioPago',
        inactiva: true
    },
    {
        name: 'CDT',
        href: '/radicacion/convenioServicios/cdt',
        tab: 'cdt',
        inactiva: false
    },
    {
        name: 'Cuentas',
        href: '/radicacion/convenioServicios/cuenta',
        tab: 'cuenta',
        inactiva: false
    },
    {
        name: 'Resumen de la Operación',
        href: '/radicacion/resumen',
        tab: 'resumen',
        inactiva: false
    }
];


export const listCoberturaFNG = [
    {
        id: 1,
        value: 0,
        descripcion: '0%'
    },
    {
        id: 2,
        value: 10,
        descripcion: '10%'
    },
    {
        id: 3,
        value: 20,
        descripcion: '20%'
    }, {
        id: 4,
        value: 30,
        descripcion: '30%'
    }, {
        id: 5,
        value: 40,
        descripcion: '40%'
    }, {
        id: 6,
        value: 50,
        descripcion: '50%'
    }, {
        id: 7,
        value: 60,
        descripcion: '60%'
    }, {
        id: 8,
        value: 70,
        descripcion: '70%'
    }, {
        id: 9,
        value: 80,
        descripcion: '80%'
    }, {
        id: 10,
        value: 90,
        descripcion: '90%'
    }, {
        id: 11,
        value: 100,
        descripcion: '100%'
    },
];


export const listEntidadRedescueto = [
    {
        id: 1,
        value: 'Bancoldex',
        descripcion: 'Bancoldex'
    },
    {
        id: 2,
        value: 'Findeter',
        descripcion: 'Findeter'
    },
    {
        id: 3,
        value: 'Finagro',
        descripcion: 'Finagro'
    },
];


export const TabsCamposClientes = [
    {
        name: 'Perfil',
        href: '/administracion/camposClientes/pj/perfil',
        tab: 'perfil'
    },
    {
        name: 'Representante Legal',
        href: '/administracion/camposClientes/pj/representanteLegal',
        tab: 'representanteLegal'
    },
    {
        name: 'Contacto Autorizado',
        href: '/administracion/camposClientes/pj/contactoAutorizado',
        tab: 'contactoAutorizado'
    },
    {
        name: 'Junta Directiva',
        href: '/administracion/camposClientes/pj/juntaDirectiva',
        tab: 'juntadirectiva'
    },
    {
        name: 'Accionistas',
        href: '/administracion/camposClientes/pj/accionistas',
        tab: 'accionistas'
    },
    {
        name: 'Controlantes',
        href: '/administracion/camposClientes/pj/controlantes',
        tab: 'controlantes'
    },
    {
        name: 'Beneficiarios',
        href: '/administracion/camposClientes/pj/beneficiarios',
        tab: 'beneficiarios'
    },
    {
        name: 'Informacion Financiera',
        href: '/administracion/camposClientes/pj/informacionFinanciera',
        tab: 'informacionFinanciera'
    },
    {
        name: 'Documentos',
        href: '/administracion/camposClientes/pj/documentos',
        tab: 'documentos'
    }
];


export const TabsCamposClientPn = [
    {
        name: 'Perfil',
        href: '/administracion/camposClientes/pn/perfil',
        tab: 'credito'
    },
    {
        name: 'Actividad economica',
        href: '/administracion/camposClientes/pn/actividadEconomica',
        tab: 'convenioPago'
    },
    {
        name: 'Referencias',
        href: '/administracion/camposClientes/pn/referencias',
        tab: 'convenioRecaudo'
    },
    {
        name: 'Documentos',
        href: '/administracion/camposClientes/pj/documentos',
        tab: 'documentos'
    }
];


export const TabsPersonalNaturalRadicacionCliente = [
    {
        name: 'Datos básicos',
        href: '/radicacionCliente/radicacionPn/datosPersonaNaturalPn',
        tab: 'perfilPn'
    },
    // {
    //     name: 'Actividad economica',
    //     href: '/radicacionCliente/radicacionPn/actividadEconomicaPn',
    //     tab: 'actividadEconomicaPn'
    // },
    {
        name: 'Datos adicionales',
        href: '/radicacionCliente/radicacionPn/datosAdicionales',
        tab: 'datosAdicionales'
    },
    // {
    //     name: 'Referencias',
    //     href: '/radicacionCliente/radicacionPn/referenciaPn',
    //     tab: 'referenciaPn'
    //  },

    ,
    {
        name: 'información financiera',
        href: '/radicacionCliente/radicacionPn/informacionFinanciera',
        tab: 'informacionFinanciera'
    }
    // {
    //     name: 'Documentos',
    //     href: '/administracion/camposClientes/pj/documentos',
    //     tab: 'documentos'
    // }
];


export const TabsPersonaJuridicaRadicacionCliente = [
    // {
    //     name: 'Datos básicos',
    //     href: '/radicacionCliente/radicacionPj/datosBasicos',
    //     tab: 'perfil'
    // },
    // {
    //     name: 'perfil',
    //     href: '/radicacionCliente/radicacionPj/datosPersonaJuridicaPj',
    //     tab: 'perfil'
    // },


    {
        name: 'Representante Legal',
        href: '/radicacionCliente/radicacionPj/representanteLegalPj',
        tab: 'representanteLegal'
    },
    {
        name: 'Contacto Autorizado',
        href: '/radicacionCliente/radicacionPj/contactosAutorizadosPj',
        tab: 'contactoAutorizado'
    }, {
        name: 'Administrador Fiduciario',
        href: '/radicacionCliente/radicacionPj/administradorFiduciario',
        tab: 'administradorFiduciario'
    }, {
        name: 'Titular Consorcio',
        href: '/radicacionCliente/radicacionPj/titularConsorcio',
        tab: 'titularConsorcio'
    }, {
        name: 'Administrador Consorcio',
        href: '/radicacionCliente/radicacionPj/administradorConsorcio',
        tab: 'administradorConsorcio'
    },
    {
        name: 'Junta Directiva',
        href: '/radicacionCliente/radicacionPj/juntaDirectivaPj',
        tab: 'juntadirectiva'
    },
    {
        name: 'Accionistas',
        href: '/radicacionCliente/radicacionPj/accionistasPj',
        tab: 'accionistas'
    },
    {
        name: 'Controlantes',
        href: '/radicacionCliente/radicacionPj/controlantesPj',
        tab: 'controlantes'
    },
    {
        name: 'Beneficiarios',
        href: '/radicacionCliente/radicacionPj/beneficiariosPj',
        tab: 'beneficiarios'
    },




    // {
    //     name: 'Informacion Financiera',
    //     href: '/radicacionCliente/radicacionPj/informacionFinancieraPj',
    //     tab: 'informacionFinanciera'
    // }





    // {
    //     name: 'Documentos',
    //     href: '/administracion/camposClientes/pj/documentos',
    //     tab: 'documentos'
    // },
]

export const TabsPersonaJuridicaRadicacionClienteSegundo = [
    {
        name: 'Datos básicos',
        href: '/radicacionCliente/radicacionPj/datosPersonaJuridicaPj',
        tab: 'perfil'
    },
    // {
    //     name: 'perfil',
    //     href: '/radicacionCliente/radicacionPj/datosPersonaJuridicaPj',
    //     tab: 'perfil'
    // },


    {
        name: 'Participantes',
        href: '/radicacionCliente/radicacionPj/representanteLegalPj',
        tab: 'representanteLegal'
    },
    // {
    //     name: 'Contacto Autorizado',
    //     href: '/radicacionCliente/radicacionPj/contactosAutorizadosPj',
    //     tab: 'contactoAutorizado'
    // },
    // {
    //     name: 'Junta Directiva',
    //     href: '/radicacionCliente/radicacionPj/juntaDirectivaPj',
    //     tab: 'juntadirectiva'
    // },
    // {
    //     name: 'Accionistas',
    //     href: '/radicacionCliente/radicacionPj/accionistasPj',
    //     tab: 'accionistas'
    // },
    // {
    //     name: 'Controlantes',
    //     href: '/radicacionCliente/radicacionPj/controlantesPj',
    //     tab: 'controlantes'
    // },
    // {
    //     name: 'Beneficiarios',
    //     href: '/radicacionCliente/radicacionPj/beneficiariosPj',
    //     tab: 'beneficiarios'
    // },




    {
        name: 'Informacion Financiera',
        href: '/radicacionCliente/radicacionPj/informacionFinancieraPj',
        tab: 'informacionFinanciera'
    }





    // {
    //     name: 'Documentos',
    //     href: '/administracion/camposClientes/pj/documentos',
    //     tab: 'documentos'
    // },
]


export const descripcionTipoCliente = {
    10: 'CLIENTE',
    20: 'PROSPECTO',
    30: 'NO CLIENTE',
    1: 'CLIENTE',
    2: 'PROSPECTO',
    4: 'NO CLIENTE',

}


export const validarNumeroDocumento = (e) => {
    const numero = /^\d+$/.test(e.target.value);
    if (!numero) {
        document.getElementById(e.target.id).value = (e.target.value).slice(0, -1)
    };
};


export const transformarCantidadPesos = ({ cantidad, decimales = 1, signo, campo }) => {
    const valor = parseFloat(cantidad);
    if (!isNaN(valor)) {
        if (valor == 0) {
            return ''
        };
        if (signo === 'COP') {
            const factor = 10 ** decimales;
            cantidad = Math.round(cantidad * factor) / factor;
            const valFormateado = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: decimales,
                maximumFractionDigits: decimales,
            }).format(cantidad);

            return valFormateado

        } else if (signo === '%') {
            return valor + '%';
        }
    };
    return cantidad == 0 ? '' : cantidad
};


export const dataFormularioOrdenada = ({ formularioRef, seccion }) => {
    const formValues = {};
    const objectoOrdenado = {};

    formularioRef.forEach((value, key) => {
        const fila = key.match(/\d+/g); // Obtenemos el último carácter que identifica la fila del registro 
        const nuevaLlave = key.replace(`${seccion}`, '').replace('hidden', '').replace(/\d+/g, '');  //quitar oficina y hidden de la llave del objecto
        formValues[nuevaLlave] = value;

        if (!objectoOrdenado[fila]) {
            objectoOrdenado[fila] = {};
        };
        objectoOrdenado[fila][nuevaLlave] = value === "Seleccionar" ? '' : value;
    });

    return Object.values(objectoOrdenado);
};


export const transformaValorPesos = (valor, numDecimales, signo) => {
    if (signo !== '%') {
        const valorNumerico = parseFloat(valor.replace(',0', '').replace(/[^\d]/g, ''));
        if (!isNaN(valorNumerico)) {
            const valorConDecimales = Number.parseFloat(valorNumerico.toFixed(numDecimales));
            const valorFormateado = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: numDecimales,
                maximumFractionDigits: numDecimales,
            }).format(valorConDecimales);

            return valorFormateado
        };
    };

    return valor !== '' ? valor + ',00%' : '';
};


export const transformarValorPuntoDecimal = ({ valor, cantidadDecimales, quitarPunto }) => {
    if (valor !== null && valor !== undefined) {
        valor = quitarPunto && valor !== '' ? valor.toString().split('.') : valor;
        if (valor !== '') {
            valor = valor?.toString().split(',');
            valor = valor !== '' ? valor[0]?.split(/\D+/).join("") : valor;
            return `${valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${cantidadDecimales}`;
        }
        return valor
    }
    return ''
};


export const formatearValor = ({ valor = '' }) => {
    valor = valor.toString();
    valor = valor.split(',');
    valor = valor[0].split(/\D+/).join("");
    return valor;
};


/** insertarParmetroUrl pasar parametro por la  url **/
export const insertarParametroUrl = ({ searchParams, nombreParametro, valorParametro, replace, pathName, affectRow = 0, nombreParamsRow = 'n' }) => {
    const params = new URLSearchParams(searchParams);
    params.set(`${nombreParametro}`, `${valorParametro}`);
    params.set(`${nombreParamsRow}`, affectRow);
    replace(`${pathName}?${params.toString()}`)
};


/** transformaDataGuardarDB funciona para transfroma los formData 
 * en array de array para guardar en la bases de datos INSERT,UPDATE **/
export const transformaDataGuardarDB = ({ formData, paramEfecty }) => {
    const ordenarData = {};
    formData.forEach((value, key) => {
        if (!ordenarData[key]) {
            ordenarData[key] = [];
        }
        ordenarData[key].push(paramEfecty ? value : formatearValor({ valor: value }));
    });

    return JSON.stringify(Object.values(ordenarData));
};


export const transformDataGuardarDBNombre = ({ formData, campoCondicion }) => {
    let ordenarData = {}
    let con = 0; // Variable para identificar la primera iteración

    formData.forEach((value, key) => {
        if (!ordenarData[key]) {
            con = 0
            ordenarData[key] = [];
        }
        con === campoCondicion ? ordenarData[key].push(value) : ordenarData[key].push(formatearValor({ valor: value }));
        con++
    });

    return Object.values(ordenarData)
};


export const dataPageDatosCliente = ({ pageActual }) => {
    const currenForm = document.getElementById(pageActual);

    if (currenForm) {
        const formData = new FormData(currenForm);
        const { formModificado } = Array.from(formData.entries()).reduce(
            (acc, [name, value]) => {
                if (name.includes("editar")) {
                    acc.formModificado.append(name.replace(/editar|hidden/g, ""), value);
                }
                return acc;
            },
            { formModificado: new FormData() }
        );

        if (formModificado && formModificado.entries().next().done === false) {
            console.log(formModificado)
        };

        let ordenarData = {}

        formModificado.forEach((value, key) => {
            if (!ordenarData[key]) {
                ordenarData[key] = [];
            }
            ordenarData[key].push(value == 'default' ? '' : value)
        });

        return Object.values(ordenarData);
    };

    return []
};


/** Validar que solo se ingrese numero **/
export const validarNumeroInputText = (e) => {
    const numero = /^\d+$/.test(e.target.value)
    if (!numero && e.target.value !== '') {
        document.getElementById(e.target.id).value = e.target.value.length > 1 ? (e.target.value).slice(0, -1) : ''
    }
};


/*** Conversores de pesos colombiana - reset **/
export const conversionPesos = ({ valor, nDecimales = 0, style = "currency" }) => {
    const objetPropidad = (style !== 'currency')
        ? {
            style: style,
            minimumFractionDigits: nDecimales,
        }
        : {
            style: style,
            currency: "COP",
            minimumFractionDigits: nDecimales,
        }
    return Number(style !== 'currency' ? (valor / 100) : valor).toLocaleString("es-CO", objetPropidad)
};


export function formatearPesosColombianos(numero) {
    const numeroConvertido = parseFloat(numero);
    return numeroConvertido.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};


/* export const separarMiles = ({ valor }) => {
    return Number(valor).toLocaleString("es-CO", {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}; */


export const separarMiles = ({ valor }) => {
    const numero = Number(
        String(valor).replace(/[^\d]/g, '') // limpia todo lo que no sea número
    );

    if (isNaN(numero)) return '';

    return numero.toLocaleString("es-CO", {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};


export const resetearPesos = ({ valor }) => {
    return valor.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
};


export const limpiarContext = ({ context, resetDocuemnt }) => {
    const { updateEvaluar,
        updateEditarPerfil,
        updateCodigoSolictud,
        updateTecnicoOperador,
        updateConfiguracion,
        updateDepositoVista,
        updateServicioFinanciero,
        updateDataRemi,
        updateConvenioRecaudo,
        updateDataSolciitud,
        updateConvenioPago,
        updateDataCliente,
        updateEstadoSolicitud,
        updateCreditoNuevo,
        updateReciprocidadResumen,
        updateResumenMotor,
        updateClienteFiducia,
        updateCampoAdicionalesModal,
        updateHistorialPath,
        updateClientModal,
        updateStatusCorreo,
        updateIsDocumentos,
        updateIdSolictudDb,
        updateAprobacionParametrizacion,
        habilitarBotoAprobarSolicitud,
        updateDocumentoCliente,
        updateObservacion
    } = context;

    updateHistorialPath(true);
    resetDocuemnt && updateDocumentoCliente('');
    updateDataCliente({ editar: false });
    // updateEditarPerfil(false)
    updateDataSolciitud({});

    // convenio Pago
    updateConvenioPago(undefined, {
        convenioPagoNominaTipo: {},
        convenioPagoTerceros: [],
        convenioPagoNominaNegociada: [],
    });

    // convenio Recaudo
    updateConvenioRecaudo(undefined, {
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
    });

    // convenio Financiero
    updateServicioFinanciero(undefined, {
        solicitud: [],
        tipoConvenio: "",
    });

    // depositoVista
    updateDepositoVista(undefined, {
        tipoCuenta: "",
        planRemuracion: {
            planRem: "",
            monto: "",
            tasa: "",
        },
        cuentasPlan: [],
    });

    // configuracion
    updateCreditoNuevo([]);

    //acutalizar el estado solicitud
    updateEstadoSolicitud("");
    updateReciprocidadResumen({
        ahorro: {},
        corriente: {},
        resultadoResumenMotor: {},
    });

    updateDataRemi([]);
    // updateDataCliente({});
    updateClienteFiducia();
    updateTecnicoOperador({});
    updateCampoAdicionalesModal({});

    updateClientModal({});
    updateConfiguracion("adquirencia", "infoTriburaria", []);
    updateConfiguracion("adquirencia", "infoComercio", {});
    updateConfiguracion("adquirencia", "tipoVenta", {});
    updateConfiguracion("adquirencia", "tipoCuenta1", []);
    updateConfiguracion("adquirencia", "tipoCuenta2", []);

    updateConfiguracion("convenioRecaudo", "recaudoFormato", {});
    updateConfiguracion("convenioRecaudo", "recaudoManuales1", []);
    updateConfiguracion("convenioRecaudo", "recaudoSiNo", "");
    updateConfiguracion("convenioRecaudo", "cuentaRecaudodora", []);
    updateConfiguracion("convenioRecaudo", "modeloPago", {});

    updateConfiguracion("convenioRecaudo", "recuadoClasePago", {});
    updateConfiguracion("convenioRecaudo", "recaudoRespaldo", {});
    updateConfiguracion("corresponsales", "tipoRecuado", {});
    updateConfiguracion("corresponsales", "BaseWebTicket", {});
    // updateConfiguracion("corresponsales", "tipoCuenta", []);

    updateConfiguracion("corresponsales", "recuadoManual", []);
    updateConfiguracion("corresponsales", "cuentaRecaudadoraEan", []);
    updateConfiguracion("corresponsales", "modeloPago", {});
    updateConfiguracion("convenioPago", "cuentaRecaudadora1", []);
    updateConfiguracion("convenioPago", "cuentaRecaudadora2", []);

    updateEditarPerfil(false);
    updateResumenMotor({});
    updateCodigoSolictud('');
    updateStatusCorreo(false);
    updateIsDocumentos({
        cedula: false,
        rut: false,
        certificado: false,
        formato: false,
        contrato: false
    });

    updateIdSolictudDb('');
    updateAprobacionParametrizacion({});
    updateEvaluar(false);
    habilitarBotoAprobarSolicitud(false);
    updateObservacion('');
};


export const limpiarContextRadicacionCliente = ({ context }) => {
    const { actualizarPerfilPn,
        actualizarResidenciaFiscalPn,
        actualizarActiviadEconomicaPn,
        actualizarDetalleActiviadEconomicaPn,
        actualizarReferenciaPn,
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
        crearClienteNuevoProspectoActualizar,
        actualizarCreditoProducto,
        actualizarCuentasProducto,
        actualizarCdtProducto,
        actualizarConvenioActualProducto,
        actualizarReciprocidadProducto, actualizarCambioTipoCliente } = context

    actualizarCambioTipoCliente(false)

    actualizarPerfilPj(
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
        });

    actualizarPerfilPn({
        reference: {},
        contactoTelefonico: [],
        direcciones: []
    })

    actualizarResidenciaFiscalPj({})
    actualizarResidenciaFiscalPn({})
    actualizarActiviadEconomicaPn({})

    actualizarDetalleActiviadEconomicaPn([{}])
    actualizarReferenciaPn([])
    actualizarRepresentanteLegalPj([])
    actualizarJuntaDirectivaPj([])
    actualizarAccionistaPj([])

    actualizarBeneficiarioPj([])
    actualizarInformacionFinancieraPj([])
    actualizarControlantesPj([])
    actualizarContactoAutorizadoPj([])
    actualizarAccionistaPj([])

    actualizarAccionistasPn([])
    actualizarBeneficiariosPn([])
    actualizarJuntaDirectivaPn([])
    actualizarTipoPersona('')
    actualizarActivarConsulta(false)

    crearClienteNuevoProspectoActualizar('')
    actualizarCreditoProducto([])
    actualizarCuentasProducto([])
    actualizarCdtProducto([])
    actualizarConvenioActualProducto([])
    actualizarReciprocidadProducto([])
};


export const validarNavegacionAtras = ({ evaluar, updateHistorialPath }) => {
    evaluar && updateHistorialPath(false);
};


export const infoTabs = {
    'convenioPago': {
        urlImage: 'cabecera1',
        title: 'CONVENIOS',
        subtitle: 'y servicos',
        enableInput: { "input3": true, "input1": true, "input2": true },
        convenioNegociar: "Pago",
        tipoConv: 'Nuevo'
    },
    'convenioRecaudo': {
        urlImage: 'cabecera1',
        title: 'CONVENIOS',
        subtitle: 'y servicos',
        enableInput: { "input3": true, "input1": true, "input2": true },
        convenioNegociar: "Recaudo",
        tipoConv: 'Nuevo'
    },
    'servicioFinanciero': {
        urlImage: 'cabecera1',
        title: 'CONVENIOS',
        subtitle: 'y servicos',
        enableInput: { "input3": true, "input1": true, "input2": true },
        convenioNegociar: "Servicio Financiero",
        tipoConv: 'Nuevo'
    },
    'credito': {
        urlImage: 'cabecera1',
        title: 'Créditos, Convenios',
        subtitle: 'y servicos',
        enableInput: { "input3": true, "input1": true, "input2": true },
        convenioNegociar: "Crédito",
        tipoConv: 'Nuevo'
    },
    'cdt': {
        convenioNegociar: 'Cdt'
    },
    'cuenta': {
        convenioNegociar: 'Cuentas'
    }
};


export const objectoValidarCampoAdministracion = ({ id, listaCamposAdministracion, clienteNuevoProspectoActualizar, validacionAdicional }) => {
    const campo = listaCamposAdministracion?.find(e => e.idCampo == id);
    let validaciones = {
        placeholder: campo?.descripcion,
        requerido: (
            campo?.creaObligatorio == 1 && clienteNuevoProspectoActualizar == '1') ||
            (campo?.prospObligatorio == 1 && clienteNuevoProspectoActualizar == '2') ||
            (campo?.actObligatorio == 1 && clienteNuevoProspectoActualizar == '3') ||
            (campo?.nCliObligatorio == 1 && clienteNuevoProspectoActualizar == '4') || validacionAdicional ||
            (
                (id == 100 && clienteNuevoProspectoActualizar == '1') ||
                (id == 100 && clienteNuevoProspectoActualizar == '2') ||
                (id == 100 && clienteNuevoProspectoActualizar == '3') ||
                (id == 100 && clienteNuevoProspectoActualizar == '4'))
        ,
        estado: id == 2000 ? true : false


        // id != '207' ? (
        //     (campo?.actEditable == 0 && clienteNuevoProspectoActualizar == '3') || (campo?.nCliObligatorio == 0 && clienteNuevoProspectoActualizar == '4') ||
        //     ((clienteNuevoProspectoActualizar != '1' && clienteNuevoProspectoActualizar != '2' && clienteNuevoProspectoActualizar != '3' && clienteNuevoProspectoActualizar != '4') || validacionAdicional)
        // ) : false
    };
    return validaciones;
};


export const validarNumeros = (e) => {
    const numero = /^\d+$/.test(e.target.value);
    if (!numero && e.target.value !== '') {
        document.getElementById(e.target?.id).value = e.target.value.length > 1 ? (e.target.value).slice(0, -1) : ''
        return;
    };
};


export const validarTexto = (e) => {
    const soloLetras = /^[a-zA-Z ]*$/.test(e.target.value);
    if (!soloLetras && e.target.value !== '') {
        document.getElementById(e.target.id).value =
            e.target.value.length > 1 ? e.target.value.slice(0, -1) : '';
        return;
    };
};


export const sumarDiasFechaIncial = (fecha, dias) => {
    const partes = fecha.split("/");
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const anio = partes[2].length === 2 ? parseInt(partes[2], 10) + 2000 : parseInt(partes[2], 10);
    const fechaInicial = new Date(anio, mes, dia);

    fechaInicial.setDate(fechaInicial.getDate() + dias);

    const diaResultante = String(fechaInicial.getDate()).padStart(2, '0');
    const mesResultante = String(fechaInicial.getMonth() + 1).padStart(2, '0');
    const anioResultante = String(fechaInicial.getFullYear());

    return `${diaResultante}/${mesResultante}/${anioResultante}`;
};


export const validarCompoRequerido = ({ e, setMostrar, setPlaceholderInput, placeholder, requerido }) => {
    if (e.target.value.length > 0) {
        setMostrar(true);
    } else {
        setMostrar(false);
        setPlaceholderInput(placeholder);

        if (requerido) {
            if (!e.target.value) {
                e.target.setCustomValidity('Este campo es requerido');
                e.target.reportValidity();
            } else {
                e.target.setCustomValidity('');
            };
        };
    };
};


export const formatearNumeroTelefono = ({ numero }) => {
    const numericValue = numero?.replace(/\D/g, '');
    if (!numericValue || numericValue.length !== 10) return null;
    return numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
};


export const obtenerValoresObligatorios = (lista) => {
    return lista.map((objeto) => [
        objeto.idCampo + '',
        objeto.actObligatorio + '',
        objeto.actEditable + '',
        objeto.creaObligatorio + '',
        objeto.prospObligatorio + '',
        objeto.nCliObligatorio + '',
    ]);
};


export const generarCadenaVerficacion = ({ nit }) => {
    const cadenaValidacion = nit.padStart(15, '0');
    const invertirOrdenCadena = cadenaValidacion.split('').reverse().join('');
    const arrayCadena = invertirOrdenCadena.split('').map(Number);
    const numerosOperacion = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    let operacion = 0;

    for (let index = 0; index < arrayCadena.length; index++) {
        operacion += arrayCadena[index] * numerosOperacion[index];
    };

    const residuo = operacion % 11;
    const digitoVerificacion = residuo <= 1 ? residuo : 11 - residuo;

    return digitoVerificacion;
};


export const formatearFecha = ({ fecha }) => {
    let date;

    // Verificamos si la fecha contiene un sufijo de zona horaria (Z o +)
    if (fecha.includes('T') && (fecha.includes('Z') || fecha.includes('+'))) {
        date = new Date(fecha); // Parseamos considerando la zona horaria

        const aa = date.getFullYear();
        const mm = ('0' + (date.getMonth() + 1)).slice(-2);
        const dd = ('0' + date.getDate()).slice(-2);
        fecha = `${aa}-${mm}-${dd}`
    }

    return fecha;
};


//   LISTA TEMPORALES 
export const listaSectorEconomico = [
    {
        id: '1', descripcion: 'Tecnologías de información'
    },
    {
        id: '2', descripcion: 'Tecnologías de información II'
    }
];


export const listaTipoSociedad = [
    {
        id: 'Empresa Unipersonal', descripcion: 'Empresa Unipersonal'
    },
    {
        id: 'Empresa2', descripcion: 'Empresa'
    }
];


export const listaPrefijos = [
    {
        id: '+57', descripcion: '+57'
    }
];


export const codeErrorMessage = {
    '202': 'Usuario no existe',
    500: 'Directorio activo no disponible'
};

export const paginasCliente = {
    'datosPersonaJuridicaPj': "Perfil",
    'representanteLegalPj': "Representante Legal",
    'contactosAutorizadosPj': "Contacto Autorizado",
    'juntaDirectivaPj': "Junta Directiva",
    'accionistasPj': "Accionistas",
    'controlantesPj': "Controlantes",
    'beneficiariosPj': "Beneficiarios",
    'informacionFinancieraPj': "Información Financiera",
    'documentos': "Documentos",
    'referenciaPn': "Referencias",
    'actividadEconomicaPn': "Actividad Económica",
}



/**LISTAS TEMPORALES */

export const listasTemporales = {

    actividadEconomica: [
        { cod: '1', descripcion: 'Agricultura, ganadería, silvicultura y pesca' },
        { cod: '2', descripcion: 'Explotación de minas y canteras' },
        { cod: '3', descripcion: 'Industrias manufactureras' },
        { cod: '4', descripcion: 'Suministro de electricidad, gas, vapor y aire acondicionado' },
        { cod: '5', descripcion: 'Distribución de agua' },
        { cod: '6', descripcion: 'Construcción' },
        { cod: '7', descripcion: 'Comercio al por mayor y al por menor' }

    ],
    tipoEmpresaTrabaja: [
        { cod: '1', descripcion: 'Pública' },
        { cod: '2', descripcion: 'Privada' },
        { cod: '3', descripcion: 'Mixta' },
        { cod: '4', descripcion: 'ONG' },
        { cod: '5', descripcion: 'Multinacional' },
        { cod: '6', descripcion: 'Familiar' },
        { cod: '7', descripcion: 'Pyme' },
        { cod: '8', descripcion: 'Otro' }

    ],
    gruposEtnicos:
        [
            { cod: '1', descripcion: 'Ninguno' },
            { cod: '2', descripcion: 'Afrodescendiente' },
            { cod: '3', descripcion: 'Indígena' },
            { cod: '4', descripcion: 'Raizal' },
            { cod: '5', descripcion: 'Palenquero' },
            { cod: '6', descripcion: 'Rom (Gitano)' },

            { cod: '7', descripcion: 'Otro' }

        ],
    opcionales: [
        { cod: '1', descripcion: 'opcion 1' },
        { cod: '2', descripcion: 'opcion 2' },
        { cod: '3', descripcion: 'opcion 3' },
        { cod: '4', descripcion: 'opcion 4' },
        { cod: '5', descripcion: 'opcion 5' },
        { cod: '6', descripcion: 'opcion 6' },

        { cod: '7', descripcion: 'Otro' }

    ],
    perentesco: [{ id: 1, descripcion: 'Padre' }, { id: 2, descripcion: 'Madre' }],
    tipoContacto: [{ id: 1, descripcion: 'Móvil' }, { id: 2, descripcion: 'Fijo' }],
    tipoTelefono: [{ id: 1, descripcion: 'Teléfono de domicilio' }, { id: 2, descripcion: 'Teléfono de oficina' }],
    tipoContrato: [{ id: 1, descripcion: 'Indefinio' }, { id: 2, descripcion: 'Otros' }],
    rol: [{ id: 1, descripcion: 'Administrativo' }, { id: 2, descripcion: 'Operativo' }],
    relacionDependenciaLaboral: [{ id: 1, descripcion: 'Empleado' }, { id: 2, descripcion: 'Contratista' }],
    moneda: [{ id: 1, descripcion: 'Peso colombiano (COP)' }, { id: 2, descripcion: 'Euro (EUR)' }],
    referidoPor: [{ id: 1, descripcion: 'Familiar)' }, { id: 2, descripcion: 'Amigo' }],
    comoSeEntero: [{ id: 1, descripcion: 'Redes Sociales' }, { id: 2, descripcion: 'Television' }],
    comoSeEntero: [{ id: 1, descripcion: 'Primaria' }, { id: 2, descripcion: 'Secundaria' }],
    ocupacion: [{ id: 1, descripcion: 'Empleado' }, { id: 2, descripcion: 'Pensionado' }],
    tipoPEP: [{ id: 1, descripcion: 'Nacional' }, { id: 2, descripcion: 'Extranjero' }],
    tipoCorreo: [{ id: 1, descripcion: 'Personal' }, { id: 2, descripcion: 'Trabajo' }, { id: 3, descripcion: 'Alternativo' }],
    tipoDiscapacidad: [{ id: 1, descripcion: 'Sensorail' }, { id: 2, descripcion: 'Intelectual' }, { id: 2, descripcion: 'Psicosocial' }],
    origenIngreso: [{ id: 1, descripcion: 'Salario' }, { id: 2, descripcion: 'Pensiones' }, { id: 3, descripcion: 'Arriendos' }],
    ingresoMensual: [{ id: 1, descripcion: '1 a 2 millones COP' }, { id: 2, descripcion: '3 a 5 millones COP' }, { id: 3, descripcion: '5 a 10 millones COP' }],
    tipoDireccion: [{ id: 1, descripcion: 'Direccion familiar' }, { id: 2, descripcion: 'Direccion Negocio' }, { id: 3, descripcion: 'Direccion de trabajo' }],
    operadora: [{ id: 1, descripcion: 'Claro' }, { id: 2, descripcion: 'Movistar' }],
    mensajeria: [{ id: 1, descripcion: 'SMP' }, { id: 2, descripcion: 'Telegram' }],


}



export const validarNit = ({ nit, tipo }) => {

    if (tipo === 'NIT' && nit.length !== 9) {

        return false
    }

    return true

}


// Helper to fetch multiple lists in parallel and extract their DATA properties
export async function fetchLists(mapping) {
    // mapping: { key1: () => Promise<string>, key2: () => Promise<string>, ... }
    const entries = Object.entries(mapping);

    // Launch all requests in parallel and parse JSON
    const results = await Promise.all(
        entries.map(([_, fetchFn]) => fetchFn().then((raw) => JSON.parse(raw)))
    );

    // Build an object with the same keys, extracting DATA on success or [] on failure
    return entries.reduce((acc, [key], idx) => {
        const res = results[idx];
        acc[key] = res?.STATUS === 200 && Array.isArray(res.DATA) ? res.DATA : [];
        return acc;
    }, {});
};


// Validar y parsear datos
export async function rawParsedData(paramsData) {
    if (typeof paramsData === 'string' && paramsData.length > 0) {
        return true;
    };

    return fasle;
};