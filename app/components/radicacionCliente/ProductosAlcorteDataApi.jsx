'use client'

import { ProductosAlCorte } from "./ProductosAlCorte"

const ProductosAlcorteDataApi = ({contextRadClient}) => {

    const {   creditoProducto,
        cuentasProducto,
        cdtProducto,
        convenioActualProducto,
        reciprocidadProducto, clienteNuevoProspectoActualizar, tabBarSeleccionado } = contextRadClient()

        return (
        <div>

          

            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>

                <ProductosAlCorte
                    marginTop="12"
                    titulo={'Créditos'}
                    keyObjectBodyId={'cod_body'}
                    keyObjectoHead={
                        {
                            id: 'id',
                            descripcion: 'descripcion'
                        }
                    }
                    keyObjectoBody={[
                        // 'numeroObligacion',
                        // 'linea',
                        // 'monto',
                        // 'fecha',
                        // 'plazo',
                        // 'saldo',
                        // 'tasa',
                        // 'spread',
                        // 'saldoCapital',
                        // 'garantia',
                       
                        // 'calificacion',
                        // 'estado',
                        // 'diasMora',
                        // 'saldoMora',
                        // 'pagoMinimo',
                        'pagoTotal',
                        'montoTotal',
                        'cupoUtilizado',
                        'fechaAprobacion',
                        'fechaVencimiento',
                        'cupoDisponible',
                        'conteoDias',
                        'tasaReferencia'
                    ]
                    }
                    headTable={
                        [
                            {
                                id: 1,
                                descripcion: ''
                            },
                            {
                                id: 2,
                                descripcion: 'Monto total cupo'
                            },
                            {
                                id: 3,
                                descripcion: 'Cupo utilizado'
                            },
                            {
                                id: 4,
                                descripcion: 'Fecha de aprobación'
                            },
                            {
                                id: 5,
                                descripcion: 'Fecha de vencimiento cupo'
                            },
                            {
                                id: 6,
                                descripcion: 'Cupo disponible'
                            },
                            {
                                id: 7,
                                descripcion: 'Conteo de días de vigencia'
                            },
                            {
                                id: 8,
                                descripcion: 'Tasa de referencia'
                            },
                            {
                                id: 9,
                                descripcion: ''
                            }, {
                                id: 10,
                                descripcion: ''
                            }, {
                                id: 11,
                                descripcion: ''
                            }, {
                                id: 12,
                                descripcion: ''
                            }, {
                                id: 13,
                                descripcion: ''
                            }, {
                                id: 14,
                                descripcion: ''
                            }, {
                                id: 15,
                                descripcion: ''
                            }, {
                                id: 16,
                                descripcion: ''
                            }, {
                                id: 17,
                                descripcion: ''
                            },
                            // {
                            //     id: 5,
                            //     descripcion: 'Spread'
                            // }, {
                            //     id: 6,
                            //     descripcion: 'Saldo a Capital'
                            // }, {
                            //     id: 7,
                            //     descripcion: 'Garantía'
                            // }, {
                            //     id: 8,
                            //     descripcion: 'Calificación'
                            // }, {
                            //     id: 9,
                            //     descripcion: 'Estado'
                            // },
                            // {
                            //     id: 10,
                            //     descripcion: 'Días de Mora'
                            // },
                            // {
                            //     id: 11,
                            //     descripcion: 'Saldo en Mora'
                            // },
                            // {
                            //     id: 12,
                            //     descripcion: 'Pago Mínimo'
                            // },
                            // {
                            //     id: 13,
                            //     descripcion: 'Pago Total'
                            // },
                            // {
                            //     id: 14,
                            //     descripcion: 'Monto Total Cupo'
                            // },
                            // {
                            //     id: 15,
                            //     descripcion: 'Fecha de Aprobación Cupo'
                            // },
                            // {
                            //     id: 16,
                            //     descripcion: 'Fecha de Vencimiento Cupo'
                            // },
                            // {
                            //     id: 17,
                            //     descripcion: 'Cupo Disponible'
                            // },{
                            //     id: 18,
                            //     descripcion: 'Conteo de Días de Vigencia'
                            // },


                        ]
                    }
                    bodyTable={
                      creditoProducto
                    }
                />
            </section>

            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>

                <ProductosAlCorte
                    marginTop="12"
                    titulo={'Cuentas'}
                    keyObjectBodyId={'cod_body'}
                    keyObjectoHead={
                        {
                            id: 'id',
                            descripcion: 'descripcion'
                        }
                    }


    
                    keyObjectoBody={[
                        'cuentas',
                        'tipo',
                        'fechaInicial',
                        'tasaEA',
                        'saldo',
                        'estadoCuenta',
                        'bloqueo',
                        'totalCupoSobregiro',
                        'fechaAproSobregiro',
                        'fechaVencSobregiro',
                        'cupoDispoSobregiro',
                        'conteo',

                    ]
                    }
                    headTable={
                        [
                            {
                                id: 1,
                                descripcion: 'Número de Cuenta'
                            },
                            {
                                id: 2,
                                descripcion: 'Tipo de Cuenta'
                            },
                            {
                                id: 3,
                                descripcion: 'Fecha Apertura'
                            },
                            {
                                id: 4,
                                descripcion: 'Tasa EA'
                            },
                            {
                                id: 5,
                                descripcion: 'Saldo'
                            },
                            {
                                id: 6,
                                descripcion: 'Estado de Cuenta'
                            },
                            {
                                id: 7,
                                descripcion: 'Bloqueo'
                            },
                            {
                                id: 8,
                                descripcion: 'Monto Total Cupo Sobregiro'
                            },
                            {
                                id: 9,
                                descripcion: 'Fecha de Aprobación Cupo Sobregiro'
                            },
                            {
                                id: 10,
                                descripcion: 'Fecha de Vencimiento Cupo Sobregiro'
                            },
                            {
                                id: 11,
                                descripcion: 'Cupo Disponible Sobregiro'
                            },
                            {
                                id: 12,
                                descripcion: 'Conteo de Días de Vigencia Cupo Sobregiro'
                            }


                        ]
                    }
                    bodyTable={
                     cuentasProducto
                    }
                />

            </section>


            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>
                <ProductosAlCorte
                    marginTop="12"
                    titulo={'CDT'}
                    keyObjectBodyId={'cod_body'}
                    keyObjectoHead={
                        {
                            id: 'id',
                            descripcion: 'descripcion'
                        }
                    }
                    keyObjectoBody={[
                        'nCdt',
                        'tipoCdt',
                        'claseCdt',
                        'montoCdt',
                        'fechaInicial',
                        'fechaFIn',
                        'tasaBaseEa',
                        'periocidad',
                        'interesLiquidado',
                        'interesAcumalo',
                        'estadoCDT',
                        'bloqueo',
                        'tipoTasa',
                        'spread'

                    ]
                    }
                    headTable={
                        [
                            {
                                id: 1,
                                descripcion: 'Número de CDT'
                            },
                            {
                                id: 2,
                                descripcion: 'Tipo de CDT'
                            },
                            {
                                id: 3,
                                descripcion: 'Clase de CDT'
                            },
                            {
                                id: 4,
                                descripcion: 'Monto'
                            },
                            {
                                id: 5,
                                descripcion: 'Fecha Inicial'
                            },
                            {
                                id: 6,
                                descripcion: 'Fecha Fin'
                            },
                            {
                                id: 7,
                                descripcion: 'Tasa EA'
                             }, 
                             {
                                id: 8,
                                descripcion: 'Periodicidad Liquidación Intereses'
                             }, 
                             {
                                id: 9,
                                descripcion: 'Valor Intereses Liquidados Último Periodo'
                             }, 
                             {
                                id: 10,
                                descripcion: 'Valor Intereses Acumulados por Pagar'
                             }, 
                             {
                                id: 11,
                                descripcion: 'Estado CDT'
                             }, 
                             {
                                id: 12,
                                descripcion: 'Bloque'
                             }, 
                             {
                                id: 13,
                                descripcion: 'Tasa de Referencia'
                             }, 
                             {
                                id: 14,
                                descripcion: 'Spread'
                             }, 
                           

                        ]
                    }
                    bodyTable={
                       cdtProducto
                    }
                />
            </section>


            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>
                <ProductosAlCorte
                    marginTop="12"
                    titulo={'Convenio Actual'}
                    keyObjectBodyId={'cod_body'}
                    keyObjectoHead={
                        {
                            id: 'id',
                            descripcion: 'descripcion'
                        }
                    }

                    keyObjectoBody={[
                        'servicio',
                        'unidad',
                        'cantidad',
                        'tarifa',


                    ]
                    }
                    headTable={
                        [
                            {
                                id: 1,
                                descripcion: 'Servicio'
                            },
                            {
                                id: 2,
                                descripcion: 'Unidad'
                            },
                            {
                                id: 3,
                                descripcion: 'Cantidad'
                            },
                            {
                                id: 4,
                                descripcion: 'Tarifa'
                            },


                        ]
                    }
                    bodyTable={
                       convenioActualProducto
                    }

                    existeReciprocidad={reciprocidadProducto}
                />
            </section>

        </div>
    )
}

export default ProductosAlcorteDataApi
