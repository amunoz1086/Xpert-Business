'use client'

import { FiTrash2 } from "react-icons/fi";

export const SeccionFondo = ({ children, titulo, textButtom = '', onClickButtom, nCol = 3, subtitulo, descripcion, textEliminar }) => {

  return (
    <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
      <div className="flex justify-between items-center">

        <div>
          <h1 className="font-bold py-3">{titulo}</h1>

          <h4 className="mb-2">{subtitulo}</h4>

          <p className="text-xs text-gray-100 mb-2">{descripcion}</p>
        </div>

        {
          textButtom != ''&& textButtom!=undefined ? <div>
            <button type="button" className="bg-coomeva_color-rojo text-white border text-xs border-gray-200 rounded-md px-2 py-1" onClick={onClickButtom}>+ {textButtom}</button>
          </div> : undefined
        }

        {
          textEliminar != ''&& textEliminar!=undefined ? <div className="flex items-center">
            <FiTrash2 className="text-coomeva_color-rojo"/>
            <button type="button" className="text-coomeva_color-rojo font-bold   border-gray-200 rounded-md px-2 py-1" onClick={onClickButtom}> {textEliminar}</button>
          </div> : undefined
        }



      </div>

      <div className={`grid grid-cols-${nCol} gap-x-8 gap-y-4 `}>
        {children}
      </div>

    </div>
  )
}
