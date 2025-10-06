'use client'

import { useState } from "react"
import SelectGastoClient from "../pago/SelectGastoClient"
import TableGastoClient from "./TableGastoClient"
import { useProvider } from "@/app/provider/Providers"


export default function GastosOficina({ listaGastoOfina, listaJustificacionOficina, rolUsuario }) {

    const dataContext = useProvider()

    const [idGasto, setIdGasto] = useState(dataContext.convenioRecaudo['gastoasOficina'][0]?.idgastosDirectosOficina || '')
    
    const habilitarInput = (rolUsuario !== '' && rolUsuario !== 2) || (rolUsuario !== '' && rolUsuario === 2) && (dataContext?.estadoSolicitud !== '' && dataContext?.estadoSolicitud !== 3)


    return (
        <div className="container ">

            <SelectGastoClient
                idGastoContext={idGasto}
                listGastos={listaGastoOfina.DATA}
                setIdGasto={setIdGasto}
                id={'idgastosDirectosOficina'}
                valor={'tipoGastosDirectosOficina'}
                valorDefualt={dataContext}
                habilitarInput={habilitarInput}
            />

            <TableGastoClient
                tituloGasto={"Gasto de recaudo oficina"}
                dataContext={dataContext}
                seccion={'gastoOficinaJust'}
                idGasto={idGasto}
                idFormulario={'frmGastoOficina'}
                propiedad={'gastoasOficina'}
                idGastoDirectoFiltrar={'idgastosDirectosOficina'}
                listaJustificacion={listaJustificacionOficina}
                idJustificacion={'idjustificacionOficina'}
                tipoJustificacion={'tipoJustificacionOfi'}
                habilitarInput={habilitarInput}

            />
        </div>
    )
}

