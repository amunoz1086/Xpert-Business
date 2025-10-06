'use client'
import { FaMapMarkerAlt } from "react-icons/fa";

export const CardDetalleItem = ({ children, icono,w='w-96',badgeInferior }) => {
    return (
        <div className={` bg-white border border-gray-200 shadow-sm  rounded-md p-3 ${w}`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    {
                        icono ? <FaMapMarkerAlt/> : undefined
                    }
                    <h1>Nombre</h1>
                  {
                    badgeInferior ? undefined:  <div className='mt-1' ><p className='bg-gray-200 w-24 rounded-full text-xs px-2 text-center py-1 '>Preferente</p></div>
                  }

                </div>
                <div>
                    <p>x</p>
                </div>
            </div>
            <div className="">
                {children}
            </div>
        </div>
    )
}
