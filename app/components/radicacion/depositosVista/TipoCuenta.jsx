'use client'

import {  useEffect, useState } from "react";
import EstructuraSelect from "../../share/EstructuraSelect";


export default function TipoCuenta({ listTipoCuenta,habilitarInput,rolActivo,context }) {

    const { updateDepositoVista, depositoVista,estadoSolicitud } = context()

    const habilitarInputRol=habilitarInput|| (rolActivo !=='' && rolActivo===2)&& (estadoSolicitud!==''&&estadoSolicitud!==3)
 

    const [cuenta, setCuenta] = useState('')

    const onChangeSelect = (e) => {
        setCuenta(e.target.value)
    }

    useEffect(() => {
       
        cuenta.length >0 && updateDepositoVista('tipoCuenta', cuenta)
       
    }, [cuenta])



    return (
        <EstructuraSelect
            value={depositoVista?.tipoCuenta || 'default'}
            options={listTipoCuenta.DATA}
            onChangeSelect={onChangeSelect}
            code="codLista"
            description={"descripcion"}
            name={'tipoCuenta'}
            id={'tipoCuenta'}
            habilitarInput={habilitarInputRol}

        />
    )
}

