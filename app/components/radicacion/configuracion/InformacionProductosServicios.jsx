'use client'

import CheckInput from '../../share/CheckInput'
import BtnControl from '../cliente/BtnControl'

const InformacionProductosServicios = ({ convenioPago, convenioRecaudo, solicitud,resetResultados }) => {


    const { convenioPagoNominaTipo, convenioPagoTerceros } = convenioPago

    const pagoTercero = (convenioPagoTerceros.filter(e =>( e?.cantidadNueva &&  e?.tarifaNegociada)&&( e?.cantidadNueva!=='' &&  e?.tarifaNegociada!==''))).length>0
  
    const convenioPagoActive = pagoTercero || Object.values(convenioPagoNominaTipo).length > 0

    const pagoNomina = Object.values(convenioPagoNominaTipo).length > 0


    // convenio Recuado

    const codigoBarras = convenioRecaudo.recaudoOficina[0]?.cantidad && convenioRecaudo.recaudoOficina[0]?.cantidad !== '' && convenioRecaudo.recaudoOficina[0]?.ticket && convenioRecaudo.recaudoOficina[0]?.ticket !== ''
   
    const manualReferencia = convenioRecaudo.recaudoOficina[1]?.cantidad && convenioRecaudo.recaudoOficina[1]?.cantidad !== '' && convenioRecaudo.recaudoOficina[1]?.ticket && convenioRecaudo.recaudoOficina[1]?.ticket !== ''

    const portalPago = (convenioRecaudo.recaudoPSE[0]?.cantidad && convenioRecaudo.recaudoPSE[0]?.cantidad !== '') && (convenioRecaudo.recaudoPSE[0]?.ticket && convenioRecaudo.recaudoPSE[0]?.ticket !== '')
   
    const pseRecaudo  = (convenioRecaudo.recaudoPSE[1]?.cantidad && convenioRecaudo.recaudoPSE[1]?.cantidad !== '' )&&( convenioRecaudo.recaudoPSE[1]?.ticket && convenioRecaudo.recaudoPSE[1]?.ticket !== '')

    const corresponsal = (convenioRecaudo.recaudoCorresponsales.filter(e => (e.cantidad !== '' && e.ticket_promedio !== '' && e.tarifaNegociada !== '') && (e?.cantidad && e?.ticket_promedio && e?.tarifaNegociada))).length > 0

    //adquirencia
    const adquirencia = (convenioRecaudo.adquirencia.filter(e => (e.tarifaRemi !== '' && e.punosNegociados !== '' && e.tarifaNegociada !== '')&&(e?.tarifaRemi  && e?.punosNegociados  && e?.tarifaNegociada))).length > 0

    const { tipoConvenio } = solicitud
 
    const urlBase = '/radicacion/convenioServicios'

    const urlDetalle =tipoConvenio?.convenioPago?urlBase: tipoConvenio?.convenioRecaudo ? `${urlBase}/convenioRecaudo` : `${urlBase}/servicioFinanciero`



    return (
        <div className='container  w-full px-2 py-5  bg-white shadow-md rounded-md my-2'>
            <h2 className='w-[98%] m-auto mb-6 text-red-700  font-roboto font-semibold'>Convenio</h2>
            <div className='grid grid-cols-12  divide-x  text-sm text-slate-900'>
                <div className='w-[99%] col-span-3 px-4 '>

                    <CheckInput
                        id={"conv_pago"}
                        labelText={"Convenio de pago"}
                        enable={true}
                        stateCheck={convenioPagoActive}
                    />

                    <div className='ml-10 mt-4'>
                        <div className='space-y-2'>
                            <CheckInput
                                id={"pago_nomina"}
                                labelText={"Pago nómina"}
                                enable={true}
                                stateCheck={pagoNomina} />
                            <CheckInput
                                id={"pago_tercero"}
                                labelText={"Pago terceros"}
                                enable={true}
                                stateCheck={pagoTercero} />
                        </div>
                    </div>
                </div>
                <div className='w-full col-span-6 px-4'>
                    <CheckInput
                        id={"conv_recaudo"}
                        labelText={"Convenio de recaudo"}
                        enable={true}
                        stateCheck={codigoBarras || manualReferencia || pseRecaudo || portalPago || corresponsal || adquirencia} />
                    <div className='flex ml-10 mt-4 gap-x-4'>
                        <div className='space-y-2'>
                            <CheckInput
                                id={"cod_barra"}
                                labelText={"Código de barras"}
                                enable={true}
                                stateCheck={codigoBarras} />
                            <CheckInput
                                id={"manual_ref"}
                                labelText={"Manual - referencia"}
                                enable={true}
                                stateCheck={manualReferencia} />
                        </div>
                        <div className='space-y-2'>
                            <CheckInput
                                id={"recaudo_pse"}
                                labelText={"PSE recaudo"}
                                enable={true}
                                stateCheck={pseRecaudo} />
                            <CheckInput
                                id={"portal_pago"}
                                labelText={"Portal del pagos"}
                                enable={true}
                                stateCheck={portalPago}
                            />

                        </div>
                        <div className='space-y-2'>
                            <CheckInput
                                id={"corresponsal"}
                                labelText={"Corresponsal"}
                                enable={true}
                                stateCheck={corresponsal} />
                            <CheckInput
                                id={"adquirencia"}
                                labelText={"Adquirencia"}
                                enable={true}
                                stateCheck={adquirencia} />

                        </div>
                    </div>
                </div>
                <div className='w-full col-span-3 px-4'>
                    <CheckInput
                        id={"serv_financiero"}
                        labelText={"Servicio financiero"}
                        enable={true}
                        stateCheck={true} />

                </div>

            </div>

            <div className='flex justify-end'>
                <BtnControl
                    name={'Ver detalle'}
                    url={urlDetalle}
                    enableButton={true}
                    opcion={'navegar'}
                    resetResultados={resetResultados}
                />
            </div>
        </div>
    )
}

export default InformacionProductosServicios