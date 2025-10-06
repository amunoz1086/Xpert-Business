import { queryListarTipoCuenta } from "@/app/lib/admin/querys/listas"

import TipoCuenta from "./TipoCuenta"


export default async function DepositoTipoCuenta({habilitarInput,rolActivo,context}) {

    const listTipoCuenta = await queryListarTipoCuenta()
   
    return (
        <div> <p className="text-base text-coomeva_color-rojo font-roboto font-medium text-left mt-4 mb-1">1. Seleccione el tipo de cuenta</p>
           <TipoCuenta listTipoCuenta={JSON.parse(listTipoCuenta)} habilitarInput={habilitarInput} rolActivo={rolActivo} context={context}/>
        </div>
    )
}

