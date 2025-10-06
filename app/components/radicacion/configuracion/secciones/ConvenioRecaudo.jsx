'use client'

import ConvenioRecaudoClasePago from "../ConvenioRecaudoClasePago"
import ConvenioRecaudoFormato from "../ConvenioRecaudoFormato"
import ConvenioRecaudoRespaldo from "../ConvenioRecaudoRespaldo"
import ConvenioRecaudoSiNo from "../ConvenioRecaudoSiNo"
import ModeloPago from "../ModeloPago"
import RecaudoManuales from "../RecaudoManuales"
import SeccionPage from "../adicional/SeccionPage"

import CuentaRecaudadoraEanRecaudo from "../CuentaRecaudadoraEanRecaudo"

const headTable2 = ["Numero Cuenta recaudadora", "Tipo de Cuenta"]

const ConvenioRecaudo = ({ listSiNo, listTipoCuenta, rolPerfil, usuario, estadoAprobacionParametrizador, solicitud,updateConfiguracion, configuracion }) => {

    const habilitarInput = (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined&&rolPerfil === 'Radicación')
    ? false : (!((estadoAprobacionParametrizador.estadoParametrizacion !== 1)&& (rolPerfil === 2 && estadoAprobacionParametrizador.estadoAprobacion !== 0)))
    
    
    //   (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined) ?
    //     false
    //     : (!((estadoAprobacionParametrizador.estadoParametrizacion !== 1) && (rolPerfil === 'Radicación' && estadoAprobacionParametrizador.estadoAprobacion === 1)))

    const activarRecaudo = solicitud?.tipoConvenio?.convenioRecaudo !== undefined && solicitud?.tipoConvenio?.convenioRecaudo !== ''

    return (
        <>
            {
                //    codigoBarras||manualReferencia 
                activarRecaudo
                    ?

                    <>
                        <SeccionPage title={"Convenio recaudo"} w={"w-40"} />

                        <div className='space-y-4'>
                            <section className='flex items-center space-x-4'>
                                <ConvenioRecaudoFormato
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                                <RecaudoManuales
                                    seccion={'primerRecaudoManual'}
                                    idFormulario={'frmRecaudoMP'}
                                    propiedad={'convenioRecaudo'}
                                    subPropiedad={'recaudoManuales1'}
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                            </section>

                            <section className='flex items-center space-x-4'>
                                <ConvenioRecaudoSiNo
                                    listSiNO={listSiNo}
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />

                                <CuentaRecaudadoraEanRecaudo
                                    listTipoCuenta={listTipoCuenta}
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />

                                {/* <CuentaRecaudadora headTable={headTable2} listTipoCuenta={listTipoCuenta} seccion={'ctaRecaudadora1'} idFormulario={'frmctaRecaudadora1'} propieadd={'convenioRecaudo'} subPropiedad={'cuentaRecaudodora'}  habilitarInput={habilitarInput} /> */}
                            </section>

                            <section className='flex items-center space-x-4'>
                                <ModeloPago
                                    listSiNO={listSiNo}
                                    idFormulario={'frmModeloPago1'}
                                    propiedad={'convenioRecaudo'}
                                    subPropiedad={'modeloPago'}
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                                <ConvenioRecaudoClasePago
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                            </section>

                            <ConvenioRecaudoRespaldo
                                habilitarInput={habilitarInput}
                                configuracion={configuracion}
                                updateConfiguracion={updateConfiguracion}
                            />

                        </div>
                    </>

                    : null
            }

        </>
    )
}

export default ConvenioRecaudo