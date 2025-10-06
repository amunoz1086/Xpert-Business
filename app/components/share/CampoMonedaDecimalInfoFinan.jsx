'use client'

import { conversionPesos, validarCompoRequerido } from "@/app/lib/utils"
import { useState } from "react"


export const CampoMonedaDecimalInfoFinan = ({ valorInput = '',id, bgFila,descripcion,placeholder = 'Moneda', nameInput = 'name',validacionRequeridoEditable,nDecimales=2, onChangeInput = () => { }, onBlurInput = () => { } }) => {
   
    const {estado,requerido}=validacionRequeridoEditable

    const [mostrar, setMostrar] = useState(false)

    const [placeholderInput, setPlaceholderInput] = useState(placeholder)

    return (
  
           <div className={`${bgFila == 1 ? "bg-coomeva_color-grisPestaña2" : "bg-white"} h-8 w-full flex justify-between items-center py-1 px-1`}>
           <label className='mx-4 text-coomeva_color-rojo text-start  text-sm font-bold w-full' htmlFor={`${id}.${nameInput}`}>{descripcion}</label>
                <input
                    type="currency"
                    id={nameInput}
                    name={nameInput}
                    className={`outline-none bg-transparent w-[10rem] h-[1.8rem] text-center
                        ${!estado ? ' border border-coomeva_color-azulOscuro border-opacity-30 rounded-md' : null}
                         px-2 text-coomeva_color-azulOscuro text-sm`}
                    autoComplete='off'
                    
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

                        e.target.value = e.target.value.length>0? conversionPesos({ valor:e.target.value,nDecimales:nDecimales }):''

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
        
    )
}
