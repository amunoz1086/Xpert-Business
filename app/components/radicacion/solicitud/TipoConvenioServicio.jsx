'use client'


export default function TipoConvenioServicio({ listTypeConvenio, onChangeSave,solicitud,convenio,deshabilitarInput }) {


  return (
    <div className={`p-6  h-64 w-60 border rounded-lg flex flex-col shadow-md  my-4 bg-white`}>
      <h1 className="text-base mb-5 text-coomeva_color-rojo">Tipo de convenio</h1>
      <div className="space-y-4">
        {
          listTypeConvenio?.map((tipo, i) => (
            <div key={`convenio${tipo.COD_CONVENIO}`} className="rounded flex basis-5/6 items-center space-x-2 ">
              <input
                name={
                  tipo.COD_CONVENIO === 1 ?
                    'convenioPago' : tipo.COD_CONVENIO === 2 ? 'convenioRecaudo' : 'servicioFinanciero'
                }
                onClick={onChangeSave}
                disabled={
                  tipo.COD_CONVENIO === 1 && (convenio?.tipoProducto?.convenio === undefined || convenio?.tipoOperacion?.nuevo === undefined)? true : false
                  ||
                  tipo.COD_CONVENIO === 2  && (convenio?.tipoProducto?.convenio === undefined || convenio?.tipoOperacion?.nuevo === undefined)? true : false
                  ||
                  tipo.COD_CONVENIO === 3 ? true : false
                  ||deshabilitarInput
                }
                value={tipo.COD_CONVENIO}
                type="checkbox"
                id={`convenio${tipo.COD_CONVENIO}`}

                defaultChecked={
                  tipo.COD_CONVENIO === 1 && solicitud.tipoConvenio?.convenioPago ||
                  tipo.COD_CONVENIO === 2 && solicitud.tipoConvenio?.convenioRecaudo
                }


                className={
                  `border border-coomeva_color-grisPestaña border-opacity-30 shadow-sm  appearance-none w-7 h-7 
                ${tipo.COD_CONVENIO !== 3
                    ? tipo.COD_CONVENIO === 1 && solicitud.tipoConvenio?.convenioPago
                      ? 'bg-coomeva_color-azulClaro cursor-pointer'
                      : tipo.COD_CONVENIO === 2 && solicitud.tipoConvenio?.convenioRecaudo
                        ? 'bg-coomeva_color-azulClaro cursor-pointer'
                        : 'cursor-pointer'
                    : 'bg-coomeva_color-azulClaro'
                  }
                  rounded-md`
                }
              />
              <label className="text-sm text-coomeva_color-azulOscuro cursor-pointer" htmlFor={`convenio${tipo.COD_CONVENIO}`}>{tipo.NOMBRE}</label>
            </div>
          ))
        }
      </div>

    </div>

  )
}

