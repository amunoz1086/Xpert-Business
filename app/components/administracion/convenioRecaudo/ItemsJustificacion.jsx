import { transformarValorPuntoDecimal } from "@/app/lib/utils";

const ItemsJustificacion = ({ fila, onChangeInput, onDelete, opcionesSelect, index, idGasto, indexFila, tipoJustificacion, idGastoDirectos, idJustificacion, seccion }) => {

  const onBlurTransformaPesos = (e) => {
    const valor = e.target.value;
    document.getElementById(e.target.id).value = `${transformarValorPuntoDecimal({ valor: valor, cantidadDecimales: ',0' })}`;
  };

  return (
    // <tr >
    <div className='w-full text-xs flex  border border-gray-300'>
      <div className='w-1/2' /* style={{ width: '50%' }} */>
        <input
          id={`idNuevo${indexFila}${idGasto}`}
          name={fila.nuevo ? `nuevo${indexFila}${idGasto}` : fila.modificado ? `modificado${indexFila}${idGasto}` : undefined}
          type="text"
          className='hidden'
          defaultValue={fila.nuevo ? fila[idGastoDirectos] : fila.modificado ? fila[idJustificacion] : ''}
        />
        <input
          id={`tipo${indexFila}${idGasto}`}
          name={fila.nuevo ? `nuevo${indexFila}${idGasto}` : fila.modificado ? `modificado${indexFila}${idGasto}` : undefined}
          type="text"
          defaultValue={fila[tipoJustificacion]}
          onChange={(e) => { onChangeInput(e, idGasto, indexFila) }}
          className={`w-full bg-transparent outline-none  px-1`}
        />
      </div>
      <div className="border border-gray-300 w-1/5" /* style={{ width: '20%' }} */>
        <select
          id={`lista${indexFila}${idGasto}`}
          name={fila.nuevo ? `nuevo${indexFila}${idGasto}` : fila.modificado ? `modificado${indexFila}${idGasto}` : undefined}
          defaultValue={fila.permitirNegociar}
          onChange={(e) => { onChangeInput(e, idGasto, indexFila) }}
          className=" border-coomeva_color-grisSombra bg-transparent w-full"
        >
          {opcionesSelect.map((opcion) => (
            <option key={opcion.codLista} value={opcion.codLista}>{opcion.descripcion}</option>
          ))}
        </select>
      </div>
      <div className="border flex items-center  border-gray-300 w-2/6" /* style={{ width: '30%' }} */>
        <label htmlFor={`tarifaPlena${indexFila}${idGasto}`} className="text-xs">$</label>
        <input
          id={`tarifaPlena${indexFila}${idGasto}`}
          name={fila.nuevo ? `nuevo${indexFila}${idGasto}` : fila.modificado ? `modificado${indexFila}${idGasto}` : undefined}
          type="text"
          defaultValue={transformarValorPuntoDecimal({ valor: fila.tarifaPlena, cantidadDecimales: ',0', quitarPunto: true })}
          onChange={(e) => { onChangeInput(e, idGasto, indexFila) }}
          onBlur={onBlurTransformaPesos}
          className={`w-full text-end outline-none bg-transparent`}
        />
      </div>
    </div>
  );
};

export default ItemsJustificacion