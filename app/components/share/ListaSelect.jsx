
export default function ListaSelect({ mostrarLista, name, lista, defaultValue, id, valor, descripcion, onchangeSelect, color, classTitle, inhabilitarSelect, url }) {
  return (
    <div className={`${color == 1 ? "bg-white" : "bg-coomeva_color-grisPestaña2"} h-8 w-full flex justify-between items-center px-12 `}>
      {
        descripcion ?
          <p className={classTitle}
          >{descripcion}
          </p>
          : null
      }
      {
        <select
          id={`${id}.${name}`}
          name={`${id}${name}`}
          className={`${mostrarLista ? null : "hidden"} border h-7 text-center my-[0.1rem] border-coomeva_color-azulClaro rounded-md w-40 outline-none text-sm font-normal bg-transparent text-coomeva_color-azulOscuro`}
          onChange={onchangeSelect}
          value={defaultValue || 'default'}
          disabled={inhabilitarSelect}
        >
          <option  defaultValue="default">Seleccionar</option>
          {lista?.map((item, i) => (
            <option
              key={`${item[id]}${name}${i}`}
              value={(item[id])}
            >{item[valor]}</option>
          ))}
        </select>
      }

    </div>
  )
}