'use client'
const TipoConvenio = ({ id,ancho, titulo,desabilitar, descripcion, textDefault, dimensionTextArea = { columna: 36, fila: 4, maxCaractere: 200 } }) => {
  


  return (
    <div className={`container bg-white w-[${ancho}] rounded-md border border-gray-100 shadow-md px-4 py-3`}>
      <h3 className='text-coomeva_color-grisLetras mt-3'>
        {titulo}
        </h3>

      <p  className='mt-2 text-coomeva_color-grisLetras text-sm'>{descripcion}</p>

      <form >
        <label htmlFor={id} className='text-transparent' 
        >informacion</label>
        <textarea
          id={id}
          defaultValue={textDefault}
          cols={dimensionTextArea.columna}
          rows={dimensionTextArea.fila}
          maxLength={200}
           disabled={desabilitar}
          className='rounded-md bg-coomeva_color-grisFondo outline-none border shadow-sm p-2 text-sm text-coomeva_color-azulOscuro '
        >
        </textarea>
      </form>

    </div>
  )
}

export default TipoConvenio