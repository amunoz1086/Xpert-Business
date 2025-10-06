'use client'

import InformacionComercio from "../InformacionComercio"
import InformacionTributaria from "../InformacionTributaria"
import TipoCuenta from "../TipoCuenta"
import TipoVenta from "../TipoVenta"
import SeccionPage from "../adicional/SeccionPage"


const Adquirencia = ({ listTipoCuenta, listSiNo, rolPerfil, usuario, estadoAprobacionParametrizador, solicitud, updateConfiguracion, configuracion }) => {

    const habilitarInput =  (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined&&rolPerfil === 'Radicación')
    ? false :
    (
      !((estadoAprobacionParametrizador.estadoParametrizacion !== 1)
      && (rolPerfil === 'Radicación' && estadoAprobacionParametrizador.estadoAprobacion !== 0)))



        // (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined) ?
        //     false
        //     : (!((estadoAprobacionParametrizador.estadoParametrizacion !== 1) && (rolPerfil === 2 && estadoAprobacionParametrizador.estadoAprobacion === 1) && (usuario === estadoAprobacionParametrizador?.idRadicador)))
  
    const activarAdquirencia = solicitud?.tipoConvenio?.convenioRecaudo !== undefined && solicitud?.tipoConvenio?.convenioRecaudo !== ''

    return (
        <>

            {
                // filterAdquirencia
                activarAdquirencia
                    ?
                    <>
                        <SeccionPage title={"Adquirencia"} />
                        <div className='space-y-4'>

                            <InformacionTributaria
                                listSiNo={listSiNo}
                                habilitarInput={habilitarInput}
                                configuracion={configuracion}
                                updateConfiguracion={updateConfiguracion}
                            />

                            <section className='flex'>
                                <div className='w-[70%]'>
                                    <InformacionComercio
                                        listSiNo={listSiNo.DATA}
                                        habilitarInput={habilitarInput}
                                        configuracion={configuracion}
                                        updateConfiguracion={updateConfiguracion}
                                    />
                                </div>
                                <TipoVenta
                                    habilitarInput={habilitarInput}
                                    configuracion={configuracion}
                                    updateConfiguracion={updateConfiguracion}
                                />
                            </section>

                            <TipoCuenta
                                listTipoCuenta={listTipoCuenta}
                                seccion={'t1'}
                                idFormulario={'frmRecaudoTP'}
                                subPropiedad={'tipoCuenta1'}
                                propiedad={'adquirencia'}
                                habilitarInput={habilitarInput}
                                headTable={["", "No. de Cuenta", "Porcentaje %"]}
                                configuracion={configuracion}
                                updateConfiguracion={updateConfiguracion}

                            />
                           
                        </div>
                    </>
                    :
                    null
            }


        </>
    )
}

export default Adquirencia