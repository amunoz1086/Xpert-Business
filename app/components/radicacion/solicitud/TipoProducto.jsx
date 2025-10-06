'use client'



export default function TipoProducto({ listTypeProducts, onChangeSave, solicitud,deshabilitar,validarAccionCuenta,validarAccionCDT }) {


  return (
    <div className={`p-6   w-96 border rounded-lg flex flex-col shadow-md bg-white  my-4`}>
      <h1 className="text-base mb-5 text-coomeva_color-rojo">Tipo de producto</h1>
      <div className="space-y-4 grid grid-cols-2">
        {
          listTypeProducts?.map(tipo => (
            <div key={tipo.COD_PRODUCTO} className="rounded flex basis-5/6 items-center space-x-2 ">
              <input
                id={tipo.COD_PRODUCTO}
                name={tipo.NOMBRE}
                onClick={onChangeSave}
                disabled={(tipo.COD_PRODUCTO === '02' ? true : false) || deshabilitar}
                value={tipo.COD_PRODUCTO}
                type="checkbox"
                defaultChecked={
                  tipo.COD_PRODUCTO === '06' && validarAccionCuenta||
                  tipo.COD_PRODUCTO === '05' && validarAccionCDT
                }
                className={`border border-coomeva_color-grisPestaña border-opacity-30 shadow-sm ${
                 ( tipo.COD_PRODUCTO === '06' && validarAccionCuenta) ||( tipo.COD_PRODUCTO === '05' && validarAccionCuenta)? "bg-coomeva_color-azulClaro cursor-default" :''
                    

                   } appearance-none w-7 h-7  rounded-md `}
              />
              <label className={`text-sm ${tipo.COD_PRODUCTO !== '2' ? "cursor-default" : null} text-coomeva_color-azulOscuro`} htmlFor={tipo.COD_PRODUCTO}>{tipo.NOMBRE}</label>
            </div>
          ))
        }
      </div>
    </div>
  )
}