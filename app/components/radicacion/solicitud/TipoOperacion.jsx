'use client'

export default function TipoOperacion({ listTipoOperations, onChangeSave, solicitud, deshabilitarInput }) {

  return (
    <div className={`p-6  bg-white h-64 w-60 border rounded-lg flex flex-col shadow-md  my-4`}>
      <h1 className="text-base mb-5 text-coomeva_color-rojo">Tipo de Operación</h1>
      <div className="space-y-4">
        {
          listTipoOperations?.map(tipo => (
            <div key={`operacion${tipo.COD_OPERACION}`} className="rounded flex basis-5/6 items-center space-x-2 ">
              <input
                id={`operacion${tipo.COD_OPERACION}`}
                name={tipo.NOMBRE}
                value={tipo.COD_OPERACION}
                onClick={onChangeSave}
                disabled={(tipo.COD_OPERACION === 2 ? true : false) || deshabilitarInput}
                type="checkbox"
                className={`border  border-coomeva_color-grisPestaña border-opacity-30 shadow-sm
                ${tipo.COD_OPERACION !== 2 ?
                    tipo.COD_OPERACION === 1 && solicitud?.tipoOperacion?.nuevo ? ' bg-coomeva_color-azulClaro cursor-default' : 'cursor-default'
                    : null} appearance-none w-7 h-7   rounded-md`}

                defaultChecked={
                  tipo.COD_OPERACION === 1 && solicitud?.tipoOperacion?.nuevo
                }
              />
              <label className="text-sm cursor-default text-coomeva_color-azulOscuro" htmlFor={`operacion${tipo.COD_OPERACION}`}>{tipo.NOMBRE}</label>
            </div>
          ))
        }
      </div>
    </div>
  )
}