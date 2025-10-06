'use client'

import { useState } from "react"
import SelectGastoClient from "../pago/SelectGastoClient"
import TableGastoClient from "./TableGastoClient"
import { useProvider } from "@/app/provider/Providers"

export default function GastosPse({ listaGasPse, listaJustificacionPse,rolUsuario }) {

    const dataContext = useProvider()
    const [idGasto, setIdGasto] = useState( dataContext.convenioRecaudo['gastosPse'][0]?.idgastosDirectosPse||'')
    const habilitarInput = (rolUsuario !== '' && rolUsuario !== 2) || (rolUsuario !== '' && rolUsuario === 2) && (dataContext?.estadoSolicitud !== '' && dataContext?.estadoSolicitud !== 3)


    return (
        <div className=" container ">

            <SelectGastoClient
            idGastoContext={idGasto}
                listGastos={listaGasPse.DATA}
                setIdGasto={setIdGasto}
                id={'idgastosDirectosPse'}
                valor={'tipoGastosDirectosPse'}
                habilitarInput={habilitarInput}
            />

            <TableGastoClient
            tituloGasto={"Gasto de recaudo PSE"}
                dataContext={dataContext}
                idGasto={idGasto}
                idFormulario={'frmGastoPse'}
                propiedad={'gastosPse'}
                seccion={'gastosPseJusti'}
                idGastoDirectoFiltrar={'idgastosDirectosPse'}
                listaJustificacion={listaJustificacionPse}
                idJustificacion={'idjustificacionPse'}
                tipoJustificacion={'tipoJustificacionPse'}
                habilitarInput={habilitarInput}
            />
        </div>
    )
}