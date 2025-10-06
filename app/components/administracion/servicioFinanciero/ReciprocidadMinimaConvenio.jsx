'use client'

const ReciprocidadMinimaConvenio = ({ onChange, reciprocidad }) => {

  const removeCurrencyFormat = (value) => {
    return value.replace(/[^0-9]/g, '');
  };


  const formatToPesos = (value) => {

    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);

  };


  return (
    <div id="" className='w-full flex gap-5 mt-2'>
      <p className='mr-14'>Reciprocidad mínima Convenios</p>

      <div className='ml-16 gap-2 flex  border '>
        <label className="hidden text-coomeva_color-rojo" id="monto" htmlFor="monto">$</label>
        <input
          className='w-80 outline-none'
          type="text"
          name="monto"
          id="monto"
          onChange={onChange}
          value={formatToPesos(reciprocidad.monto)}
          onFocus={(e) => { e.target.value = removeCurrencyFormat(e.target.value); }}
        />
      </div>
    </div>
  )
}

export default ReciprocidadMinimaConvenio