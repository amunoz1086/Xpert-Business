
'use client'

import { useSolicitud } from "@/app/hooks/useSolicitud"

const TipoConvenioServicioPago = ({ titulo,tipoConvenioActual }) => {

   const {solicitud}= useSolicitud()


    const listTipoOperations = [
        { COD_CONVENIO: 2, NOMBRE: 'Convenio de Recaudo',ACTIVO:solicitud.tipoConvenio?.convenioRecaudo && tipoConvenioActual },
        { COD_CONVENIO: 3, NOMBRE: 'Servicios Financieros',ACTIVO:true }
    ]
   

    return (
        <div className={`p-6  h-44 w-60 border bg-white rounded-lg flex flex-col shadow-md  my-4`}>
            <h1 className=" mb-5 text-coomeva_color-rojo text-sm font-semibold">{titulo}</h1>
            <div className="space-y-4">
                {
                    listTipoOperations?.map(tipo => (
                        <div key={`operacion${tipo.COD_CONVENIO}`} className={`${tipo.ACTIVO ?null :'hidden'} rounded flex basis-5/6 items-center space-x-2 `}>
                            <input  type="checkbox" id={`operacion${tipo.COD_CONVENIO}`} className="border bg-coomeva_color-azulOscuro  appearance-none w-7 h-7  rounded-md" />
                            <label className={"text-sm "} htmlFor={`operacion${tipo.COD_CONVENIO}`}>{tipo.NOMBRE}</label>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default TipoConvenioServicioPago