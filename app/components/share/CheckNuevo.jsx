'use client'

export const CheckNuevo = ({ titulo, subtitulo, valorInput, nameInput, onChangeInput, border = true, deshabilitar }) => {

  const isChecked = valorInput == 'on' ? true : false;

  return (
    <div className={`${border ? 'border border-gray-200' : ''} rounded-md flex gap-4 py-2 px-4`}>
      <input name={nameInput} onChange={onChangeInput} disabled={deshabilitar} checked={isChecked} id={nameInput} className="w-4 h-4 " type="checkbox" />
      <div>
        <label className={`${deshabilitar ? 'text-gray-400' : null} font-bold text-sm`} htmlFor={nameInput}>{titulo}</label>
        <p className="text-xs">{subtitulo}</p>
      </div>
    </div>
  )
}