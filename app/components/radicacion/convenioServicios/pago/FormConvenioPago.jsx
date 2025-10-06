'use client'


import { useEffect, useState } from "react"

import ConvenioPagoNominaTipo from "./ConvenioPagoNominaTipo"
import TipoConvenioServicioPago from "./TipoConvenioServicioPago"
import ConvenioPagoNominaNegociada from "./ConvenioPagoNominaNegociada"
import ConvenioPagoNominaTerceros from "./ConvenioPagoNominaTerceros"
import { useConvenioServicio } from "@/app/hooks/useConvenioServicio"

export default function FormConvenioPago({ listPromedioNomina, listFrecuenciaNomina, listNegociarNomina, listPagoTercero, rolPerfil }) {

    const { updateConvenioPago, convenioPago,estadoSolicitud,updatePathConvenio } = useConvenioServicio()

    const habilitarInput=(rolPerfil !=='' && rolPerfil!==2)|| (rolPerfil !=='' && rolPerfil===2)&& (estadoSolicitud!==''&& estadoSolicitud!==3)
    const [cuataManejosChip, setCuataManejosChip] = useState('')
    const [numeroPagoTx, setNumeroPagoTx] = useState('')

    useEffect(() => {
        updatePathConvenio('convenioPago')
    }, [])

    return (
        <>
            {/* <TabsBar Tabs={Tabs} context={context} /> */}
            <div className={`border-2 w-full py-4 bg-coomeva_color-grisFondo border-coomeva_color-grisPestaña2 rounded-lg`}>
                <section className="flex flex-row">
                    <div className=" w-3/5 px-2 py-1">
                        <ConvenioPagoNominaTipo
                            listPromedioNomina={listPromedioNomina.DATA}
                            listFrecuenciaNomina={listFrecuenciaNomina.DATA}
                            updateConvenioPago={updateConvenioPago}
                            convenioPagoNominaTipo={convenioPago.convenioPagoNominaTipo}
                            convenioPagoNominaNegociada={convenioPago.convenioPagoNominaNegociada}
                            setCuataManejosChip={setCuataManejosChip}
                            setNumeroPagoTx={setNumeroPagoTx}
                            habilitarInput={habilitarInput}

                            listNegociarNomina={listNegociarNomina}
                            convenioPago={convenioPago}
                        />
                    </div>
                    <div className=" w-2/5 px-2 -mt-3">
                        <TipoConvenioServicioPago
                            titulo={"Tipo de convenio"}
                            tipoConvenioActual={1}

                        />
                    </div>
                </section>

                <section className="flex flex-row">
                    <div className=" w-full px-2 py-1">
                        <ConvenioPagoNominaNegociada
                            listNegociarNomina={listNegociarNomina}
                            updateConvenioPago={updateConvenioPago}
                            convenioPago={convenioPago}
                            numeroPagoTx={numeroPagoTx}
                            cuataManejosChip={cuataManejosChip}
                            habilitarInput={habilitarInput}
                        />
                    </div>
                </section>

                <section className="flex flex-row">
                    <div className=" w-full px-2 py-1">
                        <ConvenioPagoNominaTerceros
                            listPagoTercero={listPagoTercero}
                            updateConvenioPago={updateConvenioPago}
                            convenioPagoTerceros={convenioPago.convenioPagoTerceros}
                            habilitarInput={habilitarInput}
                        />
                    </div>
                </section>
            </div>
        </>
    )
};