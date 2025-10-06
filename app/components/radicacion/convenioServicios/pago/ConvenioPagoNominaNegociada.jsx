
'use client'

import { useEffect, useRef } from "react"
import TableNogociada from "./TableNogociada"
import { conversionPesos, resetearPesos } from "@/app/lib/utils"

export default function ConvenioPagoNominaNegociada({ listNegociarNomina, updateConvenioPago, convenioPago, numeroPagoTx, cuataManejosChip, habilitarInput }) {

  const formRef = useRef(null)

  useEffect(() => {
  }, [numeroPagoTx, cuataManejosChip])

  const handleInputChange = (e, campo, valor, fila) => {
    const newList = convenioPago.convenioPagoNominaNegociada.length > 0 ? convenioPago.convenioPagoNominaNegociada : [...listNegociarNomina?.DATA.map(obj => ({ ...obj, tarifaNegociada: 0 }))];
    newList[fila][campo] = resetearPesos({ ...newList[fila], valor });
    updateConvenioPago('convenioPagoNominaNegociada', newList);
    document.getElementById(e.target.id).value = campo !== 'cantidad' && valor !== '' ? conversionPesos({ valor: valor }) : valor;
  };

  return (
    <form ref={formRef} id="frmNegociar" className="p-1  h-full w-full relative ">
      <div className="container w-full">
        <fieldset className="border bg-white shadow-md rounded-md w-full">
          <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
            <h2 className="text-coomeva_color-rojo mt-4 w-60 text-center text-sm font-semibold">Pago Nómina</h2>
          </legend>
          <div>
            <TableNogociada
              listNegociarNomina={listNegociarNomina}
              handleInputChange={handleInputChange}
              contextData={convenioPago}
              numeroPagoTx={numeroPagoTx}
              cuataManejosChip={cuataManejosChip}
              habilitarInput={habilitarInput}
            />
          </div>
        </fieldset>
      </div>
    </form>
  )
};