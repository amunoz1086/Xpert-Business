'use client'

import CorresponsalesBaseWebTicket from "../CorresponsalesBaseWebTicket"
import CorresponsalesTipoRecaudo from "../CorresponsalesTipoRecaudo"
import CuentaRecaudadoraEan from "../CuentaRecaudadoraEan"
import ModeloPago from "../ModeloPago"
import RecaudoManuales from "../RecaudoManuales"
import SeccionPage from "../adicional/SeccionPage"


const Corresponsales = ({ listSiNo, listTipoCuenta, rolPerfil, usuario, estadoAprobacionParametrizador, solicitud, updateConfiguracion, configuracion }) => {

    const habilitarInput =  (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined&&rolPerfil === 'Radicación')
    ? false :(!((estadoAprobacionParametrizador.estadoParametrizacion !== 1)&& (rolPerfil === 2 && estadoAprobacionParametrizador.estadoAprobacion !== 0)))
    
    
    // (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined) ?
    //     false
    //     : (!((estadoAprobacionParametrizador.estadoParametrizacion !== 1) && (rolPerfil === 'Radicación' && estadoAprobacionParametrizador.estadoAprobacion === 1)))

    const activarCorresponsales = solicitud?.tipoConvenio?.convenioRecaudo !== undefined && solicitud?.tipoConvenio?.convenioRecaudo !== ''


    return (
        <>
            {
                // corresponsal
                activarCorresponsales
                    ? <>
                        <SeccionPage title={"Corresponsales"} w={"w-40"} />

                        <div className='space-y-4'>
                            <div className='flex space-x-4'>
                                <CorresponsalesTipoRecaudo
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                                <CorresponsalesBaseWebTicket
                                    listSiNo={listSiNo.DATA}
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                            </div>

                            {/* <TipoCuenta
                                listTipoCuenta={listTipoCuenta}
                                seccion={'primerTipoCuenta'}
                                idFormulario={'frmCorresponsal'}
                                subPropiedad={'tipoCuenta'}
                                propiedad={'corresponsales'}
                                habilitarInput={habilitarInput}
                                headTable={["", "No. de Cuenta", "Concepto Recaudo"]}
                                desactivarFormato={true}
                            /> */}

                            <div className='flex space-x-4'>
                                <RecaudoManuales
                                    seccion={'tercerRecaudoManual'}
                                    idFormulario={'frmRecaudoMT'}
                                    propiedad={'corresponsales'}
                                    subPropiedad={'recuadoManual'}
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />

                                <CuentaRecaudadoraEan
                                    listTipoCuenta={listTipoCuenta}
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                            </div>

                            <div className="w-[50%]">
                                <ModeloPago
                                    listSiNO={listSiNo}
                                    idFormulario={'frmModeloPagoCorresponsal'}
                                    propiedad={'corresponsales'}
                                    subPropiedad={'modeloPago'}
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                            </div>
                        </div>
                    </>
                    : null
            }

        </>
    )
}

export default Corresponsales