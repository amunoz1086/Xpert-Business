'use client';

import React, { useEffect, useState } from 'react';
import CardResumen from '../resumenSolicitud/CardResumen';
import ResumenSolicitudReciprocidad from '../resumenSolicitud/ResumenSolicitudReciprocidad';
import BotonesResumen from '../resumenSolicitud/BotonesResumen';
import ResumenSolicitudCredito from '../resumenSolicitud/ResumenSolicitudCredito';
import InformacionProductosServicios from '../../configuracion/InformacionProductosServicios';
//import ResumenSolicitudCaptacion from '../resumenSolicitud/ResumenSolicitudCaptacion';
import ResultadoSolicitudVolumen from './ResultadoSolicitudVolumen';
import ResumenSolicitud from './ResumenSolicitud';
import ResultadoSolicitudCumplimiento from './ResultadoSolicitudCumplimiento';
import { useProvider } from '@/app/provider/Providers';
import { ResumenCDT } from '../resumenSolicitud/ResumenCDT';
import TipoConvenio from '../../convenioServicios/serFinancieros/TipoConvenio';
//import ResumenCuenta from '../resumenSolicitud/resumenCuenta';
import ResumenCuenta from '@/app/components/radicacion/resumen/resumenSolicitud/ResumenCuenta';
import dynamic from 'next/dynamic';
import { conversionPesos } from '@/app/lib/utils';


const DynamicModal = dynamic(() => import("../../../share/Modals"));




export default function SolicitudResumen({ usuario, listTypeProducts, rolActivo }) {

    const context = useProvider()

    const { resultadoMotor, reciprocidadResumen, estadoSolicitud,
        cliente, updateHistorialPath, solicitud, updateReciprocidadResumen,
        creditoNuevo, convenioRecaudo, convenioPago, depositoVista, cuenta, cdt } = context

    const validarAccionCuenta = (cuenta.filter((c) => c.nuevo == false || c.modificarPlan != '')).length > 0

    const validarAccionCDT = (cdt.filter((item) => item.guardar == true)).length > 0

    const habilitarInput = (rolActivo !== '' && rolActivo !== 2) || (rolActivo !== '' && rolActivo === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3)
    const [evaluar, setEvaluar] = useState(false);

    // &&solicitud?.tipoProducto?.credito=='01'
    const creditoConvenio = (solicitud?.tipoProducto?.convenio == '03')

    const [resultadoEvaluar, setResultadoEvaluar] = useState({
        entes: {
            gerencia: resultadoMotor?.entes?.gerencia || false,
            vprecidencia: resultadoMotor?.entes?.vprecidencia || false,
            presidencia: resultadoMotor?.entes?.presidencia || false,
            junta: resultadoMotor?.entes?.junta || false,
        },
        responseKnime: resultadoMotor?.responseKnime || {}
    });




    const onResetResultados = () => {
        updateReciprocidadResumen(prev => ({
            ahorro: prev.ahorro || {},
            corriente: prev.corriente || {},
            resultadoResumenMotor: {}
        }));

        // setEvaluar(false);
        setResultadoEvaluar({
            entes: {
                gerencia: false,
                vprecidencia: false,
                presidencia: false,
                junta: false,
            },
            responseKnime: {}
        });
    };

    const [validarReciprocidadMinimaAdmin, setvalidarReciprocidadMinimaAdmin] = useState(0)

    const [activeTab, setActiveTab] = useState(1);



    const validarSumaReciprocidadMinimaAdmin = (val) => {

        if (creditoConvenio && val < reciprocidadMinimaAdmin?.DATA[0]?.monto) {
            setMessageAlert(`La reciprocidad mínima en Convenio es ${conversionPesos({ valor: reciprocidadMinimaAdmin?.DATA[0]?.monto || 0 })}`)
            setShowModal(true)
        }

        setvalidarReciprocidadMinimaAdmin(val)
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    useEffect(() => {
        return () => updateHistorialPath(false)
    }, [])

    const endModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className='flex'>
                <button
                    onClick={() => { handleTabClick(1) }}
                    aria-label="navegar a convenio pago"
                    className={`w-[20%] py-2 px-4 text-center text-[15px] text-coomeva_color-grisLetras  mx-2 ${activeTab == '1' ? 'bg-white border-2 border-b-0' : 'bg-coomeva_color-grisPestaña2 '}  rounded-tr-lg rounded-tl-lg`}>

                    Resumen Solicitud</button>
                <button
                    onClick={() => { handleTabClick(2) }}
                    aria-label="navegar a convenio pago"
                    className={`w-[20%] py-2 px-4 text-center text-[15px] text-coomeva_color-grisLetras  mx-2 ${activeTab == '2' ? 'bg-white border-2 border-b-0' : 'bg-coomeva_color-grisPestaña2 '}  rounded-tr-lg rounded-tl-lg`}>
                    Resultado Solicitud
                </button>
            </div>

            <div className={`border-2 w-full py-4 bg-coomeva_color-grisFondo border-coomeva_color-grisPestaña2 rounded-lg`}>
                {
                    activeTab === 1 ?
                        <div className="tab-content " id="tab-1 ">
                            <section className="container flex flex-row">
                                <div className=" w-1/2 px-2 py-1  flex flex-row gap-4">
                                    <CardResumen
                                        listTypeProducts={listTypeProducts}

                                        //   listTipeOperactions={listTipeOperactions}
                                        solicitud={solicitud}
                                        validarAccionCuenta={validarAccionCuenta}
                                        validarAccionCDT={validarAccionCDT}
                                    />
                                </div>
                                <div className=" w-1/2 px-0 py-1 ">
                                    <ResumenSolicitudReciprocidad
                                        rolActivo={rolActivo}
                                        habilitarInput={habilitarInput}
                                        reciprocidadResumen={reciprocidadResumen}
                                        updateReciprocidadResumen={updateReciprocidadResumen}
                                        validarSumaReciprocidadMinimaAdmin={validarSumaReciprocidadMinimaAdmin}
                                    />
                                    <BotonesResumen
                                        usuario={usuario}
                                        rolUsuario={rolActivo}
                                        handleTabClick={handleTabClick}
                                        setEvaluar={setEvaluar}
                                        evaluar={evaluar}
                                        setResultadoEvaluar={setResultadoEvaluar}
                                        resultadoEvaluar={resultadoEvaluar.responseKnime}
                                        estadoSolicitud={estadoSolicitud}
                                        //reciprocidadMinimaAdmin={reciprocidadMinimaAdmin}
                                        validarReciprocidadMinimaAdmin={validarReciprocidadMinimaAdmin}
                                        context={context}

                                    />
                                </div>
                            </section>
                            <section className="w-full py-1">
                                <ResumenSolicitudCredito

                                    creditoNuevo={creditoNuevo}
                                    resetResultados={onResetResultados}
                                />
                                <InformacionProductosServicios
                                    convenioPago={convenioPago}
                                    convenioRecaudo={convenioRecaudo}
                                    solicitud={solicitud}
                                    resetResultados={onResetResultados}
                                />
                                <ResumenCDT cdt={cdt} />
                                <ResumenCuenta cuenta={cuenta} />
                                <TipoConvenio
                                    id={"tipoConvenioservicio"}
                                    context={context}
                                    titulo={"Observaciones"}
                                    descripcion={"Presentación del Convenio para el Ente de Aprobación"}
                                    dimensionTextArea={{
                                        // columna: 45,
                                        fila: 7
                                    }}
                                    rolUsuario={rolActivo}
                                />
                            </section>
                        </div> : undefined
                }
                {
                    activeTab === 2 ?
                        <section className="flex flex-row px-2">
                            <div className=" w-[40%] px-2 py-1 mt-2 ">
                                <ResultadoSolicitudVolumen dataMotor={resultadoEvaluar.responseKnime} cliente={cliente} dataContext={reciprocidadResumen?.resultadoResumenMotor} />
                            </div>
                            <div className=" w-[60%] px-2 py-1 flex flex-col gap-4">
                                <ResumenSolicitud resultadoKnime={resultadoEvaluar.responseKnime} reciprocidadResumen={reciprocidadResumen} />
                                <ResultadoSolicitudCumplimiento
                                    entes={resultadoEvaluar.entes}
                                    resultadoMotor={resultadoMotor}

                                />
                            </div>
                        </section> : undefined
                }
            </div>




            {/*  {showModal && (
                <DynamicModal
                    titulo={"Notificación"}
                    mostrarModal={endModal}
                    ocultarBtnCancelar={true}
                    textBtnContinuar="Ok"
                    mostrarImagneFondo={true}
                >
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">
                        {messageAlert}
                    </p>
                </DynamicModal>
            )} */}
        </>
    )
}