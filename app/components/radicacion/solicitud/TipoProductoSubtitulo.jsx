
export const TipoProductoSubtitulo = ({width=35,seccionSubtitulo=false,listTypeProducts=[],setListTypeProducts,titulo='Tipo de producto',subtitulo='',onChangeSave,deshabilitar}) => {


   const handleChange = (e) => {

    const id = e.target.value; 
 
    setListTypeProducts((prev) =>
      prev.map((it) =>
        it.COD_PRODUCTO == id ? { ...it, ISCHECKED: !it.ISCHECKED } : it
      )
    );
  };

  console.log(listTypeProducts)

  return (
  <div className={`p-6 w-[${width}rem] border rounded-lg flex flex-col shadow-md bg-white my-4`}>
  <h1 className="text-base mb-5 text-coomeva_color-rojo">{titulo}</h1>
  <p className='text-xs mb-2'>{subtitulo}</p>
  <div className="py-2">
    {
      listTypeProducts?.map((tipo, index) => (
        <>
          {/* Conditional rendering for the horizontal line and new subtitle */}
          {(index === listTypeProducts.length - 1&&seccionSubtitulo==true )&& (
            <>
              <hr className="my-4 border-t border-gray-300" /> {/* Horizontal line */}
              <p className=' mb-2 text-coomeva_color-rojo'>¿Desea incluir tasa?</p> {/* New subtitle */}
            </>
          )}

          <div key={tipo.COD_PRODUCTO} className="rounded flex items-center space-x-4 mb-2">
            <input
              id={tipo.COD_PRODUCTO}
              name={tipo.NOMBRE}
              onChange={handleChange}
              disabled={tipo.DESHABILITAR}
              value={tipo.COD_PRODUCTO}
              type="checkbox"
              checked={tipo.ISCHECKED}
              className={`border border-coomeva_color-grisPestaña border-opacity-30 shadow-sm ${
                (tipo.ISCHECKED) ? "bg-coomeva_color-azulClaro cursor-default" : ''} ${tipo.DESHABILITAR ? "bg-gray-100 border-none" : ''} appearance-none w-7 h-7 rounded-md `}
            />
            <label className={`text-sm ${tipo.DESHABILITAR ? "cursor-default" : 'cursor-pointer'} text-coomeva_color-azulOscuro`}>{tipo.NOMBRE}</label>
          </div>
        </>
      ))
    }
  </div>
</div>
  )
}
