'use client'

import { formatearNumeroTelefono, validarCompoRequerido } from "@/app/lib/utils"
import { useState } from "react"

export const CampoTelefono = ({ valorInput = '', nameInput = 'name',placeholder, validacionRequeridoEditable, onChangeInput = () => { }, onBlurInput = () => { } }) => {
    
    const { requerido, estado } = validacionRequeridoEditable

    const [mostrar, setMostrar] = useState(false)
   
    const [placeholderInput, setPlaceholderInput] = useState(placeholder)

    return (
        <div className='w-full space-y-1'>
            <div>

                <div className='flex space-x-1'>
                    {requerido ? <div > <p className={` ${mostrar || valorInput != '' ? 'text-coomeva_color-rojo' : 'text-transparent'} `}>*</p></div> : undefined}
                    <div > <label className={`text-[0.97rem] ${mostrar ||( valorInput !== ''&&valorInput !== null) ? 'text-coomeva_color-grisLetras' : 'text-transparent'} `} htmlFor={nameInput}>{placeholder}</label>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    {
                        mostrar == false && requerido == true ? <label className='text-coomeva_color-rojo' htmlFor={nameInput}>*</label> : undefined
                    }

                    <input
                        type="text"
                        id={nameInput}
                        name={nameInput}
                        className="focus:outline-none bg-transparent text-lg  text-gray-600  flex item-start w-full bg-red  "
                        autoComplete='off'
                        placeholder={placeholderInput}
                        required={requerido}
                        disabled={estado}
                        onChange={
                            (e) => {
                                //requerido && e.target.setCustomValidity('');


                                onChangeInput(e)


                                e.target.value = e.target.value.length > 0 ? formatearNumeroTelefono({ numero: e.target.value }) : ''

                            }
                        }
                        value={valorInput}
                        onBlur={(e) => {
                           //validarCompoRequerido({ e, setMostrar, setPlaceholderInput, placeholder, requerido })
                            onBlurInput(e)
                        }}
                        onFocus={(e) => {
                            setMostrar(true)
                            setPlaceholderInput('')
                        }}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remover cualquier letra
                        }}
                    />
                </div>

                <hr className='border-1 mt-1 border-gray-600' />
            </div>
        </div>
    )
}
