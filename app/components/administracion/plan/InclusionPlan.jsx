'use client'
import { BiTrash } from 'react-icons/bi'
import {  IoAddCircleOutline } from 'react-icons/io5'

export const InclusionPlan = ({ tipoPlan, eliminarInclusionPlan, onBlurInclusion, onChangeInclusion, detallePlan, deshabilitar = false, listaCuentas = [{}], nuevoCliente }) => {

    return (
        <div className='shadow-md rounded-md mt-3'>
            <div className='bg-neutral-400'><h4 className='text-center text-coomeva_color-rojo font-semibold'>Inclusión en el plan</h4></div>
            <div className='text-coomeva_color-rojo flex justify-evenly bg-coomeva_color-grisPestaña2 rounded-t-md'>
                <div><h6 className='text-coomeva_color-azulOscuro'>ID</h6></div>
                <div><h6 className='text-coomeva_color-azulOscuro'>Cliente</h6></div>
            </div>
            {
                listaCuentas.map((c, i) => (
                    <div key={'inclusion' + i} className='flex justify-evenly py-1'>
                        <div className='flex gap-4 justify-center items-center'>
                            <div>
                                <IoAddCircleOutline
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        (listaCuentas.length-1 ==i)&& nuevoCliente(); 
                                    }}
                                    className={`text-${(listaCuentas.length-1 ==i)  ? 'coomeva_color-rojo cursor-pointer' : 'transparent'} h-7 w-7`}
                                />
                            </div>
                            <input
                                id={'nit' + i}
                                disabled={!(c.nuevo) && tipoPlan != 1 ? true : false}
                                className='bg-transparent'
                                type="text"
                                value={c?.idCliente || ''}
                                onBlur={(e) => { onBlurInclusion(e, i) }}
                                onChange={(e) => { onChangeInclusion(e, i) }}

                            />
                        </div>
                        <div className='flex gap-4 justify-center items-center'>
                            <input
                                id={'client' + i}
                                disabled={!(c.nuevo) && tipoPlan != 1 ? true : false}
                                className='bg-transparent'
                                type="text"
                                value={c?.cliente || ''}
                                readOnly
                                onChange={() => { }}

                            />
                            <div>
                                <BiTrash
                                    className={`text-${!(c.nuevo)  ? 'coomeva_color-rojo cursor-pointer' : 'transparent'} h-7 w-7 `}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        eliminarInclusionPlan(i,c?.idCliente); 
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}
