'use client'

import { useProvider } from "@/app/provider/Providers"
import InformacionCliente from "./InformacionCliente"
import InformacionProductosServicios from "./InformacionProductosServicios"
import Modal from "./Modal"
import Adquirencia from "./secciones/Adquirencia"
import ConvenioPago from "./secciones/ConvenioPago"
import ConvenioRecaudo from "./secciones/ConvenioRecaudo"
import Corresponsales from "./secciones/Corresponsales"

export const ClienteConfiguracion = ({ listNaturalezaJuridica, rolActivo, listSiNo, listTipoCuenta, usuario, listNegociarNomina }) => {

    const context = useProvider()
    const { clienteFiducia, updateClienteFiducia, estadoAprobacionParametrizador, updateConfiguracion, updateHistorialPath, convenioPago, convenioRecaudo, solicitud, configuracion,estadoSolicitud } = context

    return (
        <main className="flex-grow">
            <section className=' w-full '>

                <div className='space-y-4'>

                    <InformacionCliente
                        naturalezaPersona={listNaturalezaJuridica?.DATA || []}
                        rolPerfil={rolActivo}
                        clienteFiducia={clienteFiducia}
                        estadoAprobacionParametrizador={estadoAprobacionParametrizador}
                        updateClienteFiducia={updateClienteFiducia}
                        updateHistorialPath={updateHistorialPath}
                        estadoSolicitud={estadoSolicitud}
                    />

                    <InformacionProductosServicios
                        convenioPago={convenioPago}
                        convenioRecaudo={convenioRecaudo}
                        solicitud={solicitud}
                        resetResultados={context?.resetResultados}
                    />

                </div>

                <Adquirencia
                    listSiNo={listSiNo}
                    listTipoCuenta={listTipoCuenta}
                    rolPerfil={rolActivo}
                    usuario={usuario?.userBACK?.user}
                    estadoAprobacionParametrizador={estadoAprobacionParametrizador}
                    solicitud={solicitud}
                    configuracion={configuracion}
                    updateConfiguracion={updateConfiguracion}
                />


                <ConvenioRecaudo
                    listSiNo={listSiNo}
                    listTipoCuenta={listTipoCuenta}
                    rolPerfil={rolActivo}
                    usuario={usuario?.userBACK?.user}
                    estadoAprobacionParametrizador={estadoAprobacionParametrizador}
                    solicitud={solicitud}
                    configuracion={configuracion}
                    updateConfiguracion={updateConfiguracion}
                />


                <Corresponsales
                    listSiNo={listSiNo}
                    listTipoCuenta={listTipoCuenta}
                    rolPerfil={rolActivo}
                    usuario={usuario?.userBACK?.user}
                    estadoAprobacionParametrizador={estadoAprobacionParametrizador}
                    solicitud={solicitud}
                    configuracion={configuracion}
                    updateConfiguracion={updateConfiguracion}
                />


                <ConvenioPago
                    listTipoCuenta={listTipoCuenta}
                    rolPerfil={rolActivo}
                    usuario={usuario?.userBACK?.user}
                    estadoAprobacionParametrizador={estadoAprobacionParametrizador}
                    solicitud={solicitud}
                    configuracion={configuracion}
                    updateConfiguracion={updateConfiguracion}
                />

                <section className=' w-full flex justify-center '>

                    <Modal
                        listaSino={listSiNo}
                        rolPerfil={rolActivo}
                        listNegociarNomina={listNegociarNomina}
                        context={context}
                    />

                </section>
            </section>
        </main>
    )
}
