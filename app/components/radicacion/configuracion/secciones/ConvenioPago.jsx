'use client'

import CuentaRecaudadora from "../CuentaRecaudadora"
import SeccionPage from "../adicional/SeccionPage"

const headTable = ["Número Cuenta pagadora para Pago Nómina", "Tipo de Cuenta"]
const headTable2 = ["Número Cuenta pagadora para Pago Terceros", "Tipo de Cuenta"]


const ConvenioPago = ({ listTipoCuenta, rolPerfil, usuario, estadoAprobacionParametrizador, solicitud, updateConfiguracion, configuracion }) => {

    const habilitarInput =  (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined&&rolPerfil === 'Radicación')
    ? false :
    (
      !((estadoAprobacionParametrizador.estadoParametrizacion !== 1)
      && (rolPerfil === 2 && estadoAprobacionParametrizador.estadoAprobacion !== 0)))
    
    
    
    // (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined) ?
    //     false
    //     : (!((estadoAprobacionParametrizador.estadoParametrizacion !== 1) && (rolPerfil === 'Radicación' && estadoAprobacionParametrizador.estadoAprobacion === 1)))

    const activarConvenioPago = solicitud?.tipoConvenio?.convenioPago !== undefined && solicitud?.tipoConvenio?.convenioPago !== ''


    return (
        <>
            {
                // filterAdquirencia
                activarConvenioPago
                    ?
                    <>
                        <SeccionPage title={"Convenio de Pago"} w={"w-48"} />

                        <div className='flex space-x-4'>
                            <CuentaRecaudadora
                                headTable={headTable}
                                listTipoCuenta={listTipoCuenta}
                                seccion={'ctaRecaudadora2'}
                                idFormulario={'frmctaRecaudadora2'}
                                propieadd={'convenioPago'}
                                subPropiedad={'cuentaRecaudadora1'}
                                habilitarInput={habilitarInput}
                                configuracion={configuracion}
                                updateConfiguracion={updateConfiguracion}
                            />
                            <CuentaRecaudadora
                                headTable={headTable2}
                                listTipoCuenta={listTipoCuenta}
                                seccion={'ctaRecaudadora3'}
                                idFormulario={'frmctaRecaudadora3'}
                                propieadd={'convenioPago'}
                                subPropiedad={'cuentaRecaudadora2'}
                                habilitarInput={habilitarInput}
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

export default ConvenioPago