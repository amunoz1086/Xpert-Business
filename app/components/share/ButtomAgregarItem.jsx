import React from 'react'
import { ImPlus } from 'react-icons/im'

export const ButtomAgregarItem = ({ titulo,onClick,clienteNuevoProspectoActualizar }) => {

   const habilitar = (clienteNuevoProspectoActualizar == '1' || clienteNuevoProspectoActualizar == '2' || clienteNuevoProspectoActualizar == '3'|| clienteNuevoProspectoActualizar == '4')
    return (
        <button type='button' disabled={!habilitar} onClick={onClick} className={`mt-5 ${habilitar?'bg-coomeva_color-rojo text-white':'bg-zinc-300 text-white'}mt-8  py-2 px-9 rounded-lg shadow-lg  flex items-center justify-between text-xs space-x-4`}>
            <span className={`${habilitar ?'text-white' :'text-black'} mr-2`}>{titulo}</span>
            <div className={`flex items-center justify-center ${habilitar ? 'bg-white':'bg-gray-200'}  text- h-6 w-6 rounded-full`}>
                <ImPlus className="h-2 w-2" />
            </div>
        </button>
    )
}
