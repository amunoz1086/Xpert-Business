'use client'

import { conversionPesos, validarCompoRequerido } from "@/app/lib/utils"
import { useState } from "react"

export const CampoPorcentaje = ({ valorInput = '', placeholder = 'Porcentaje',validacionRequeridoEditable, nameInput = 'name', nDecimales=2, onChangeInput = () => { }, onBlurInput = () => { } }) => {

    const { requerido, estado } = validacionRequeridoEditable
    const [mostrar, setMostrar] = useState(false)
    const [placeholderInput, setPlaceholderInput] = useState(placeholder)

    return (
        <div className='w-full space-y-1'>
            <div>

                <div className='flex space-x-1'>
                    {requerido ? <div > <p className={` ${mostrar||valorInput!='' ? 'text-coomeva_color-rojo' : 'text-transparent'} `}>*</p></div> : undefined}
                    <div > <label className={`text-[0.97rem] ${mostrar||( valorInput !== ''&&valorInput !== null) ? 'text-coomeva_color-grisLetras' : 'text-transparent'} `} htmlFor={nameInput}>{placeholder}</label>
                    </div>
                </div>
                <input
                    type="percent"
                    id={nameInput}
                    name={nameInput}
                    className="focus:outline-none text-lg bg-transparent  text-gray-600  flex item-start w-full bg-red  "
                    autoComplete='off'
                    placeholder={placeholderInput}
                    required={requerido}
                    disabled={estado}
                    onChange={
                        (e) => {
                            //requerido && e.target.setCustomValidity('');
                            
                            onChangeInput(e)

                        }
                    }
                    defaultValue={valorInput}
                    onBlur={(e) => {

                       //validarCompoRequerido({ e, setMostrar, setPlaceholderInput, placeholder, requerido })

                        e.target.value = e.target.value.length>0? conversionPesos({ valor:e.target.value,nDecimales:nDecimales,style: "percent" }):''

                        onBlurInput(e)
                    
                    }}
                    onFocus={(e) => {

                        let cleanedNumber = e.target.value.replace(/[^\d,]/g, '');
                        
                        cleanedNumber = cleanedNumber.replace(/\./g, '');
                        
                        cleanedNumber = cleanedNumber.replace(/,/g, '.');

  

                        e.target.value=cleanedNumber!=''?parseFloat(cleanedNumber):e.target.value
                        setMostrar(true)
                        setPlaceholderInput('')
                    }}
                    onInput={(e) => {

                        e.target.value =  e.target.value = e.target.value.replace(/[^\d.]/g, '');
                    }}

                  
                />
                <hr className='border-1 mt-1 border-gray-600' />
            </div>
        </div>
    )
}
