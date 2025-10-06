'use client'
import { formatearFecha, validarCompoRequerido } from '@/app/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { ImCalendar } from 'react-icons/im'


export const CampoFecha = ({ valorInput = '', h = '8', fontSize = 'text-lg', placeholder = 'Fecha', nameInput = 'name', validacionRequeridoEditable, onChangeInput = () => { }, onBlurInput = () => { } }) => {

    const { requerido, estado } = validacionRequeridoEditable

    const [mostrar, setMostrar] = useState(false)

    const [placeholderInput, setPlaceholderInput] = useState(placeholder)

    const [inputType, setInputType] = useState('text'); // Inicializamos como 'text'

    const dateInputRef = useRef(null);

    return (
        <div className="relative w-full">
            <div className='flex space-x-1'>
                {requerido ? <div > <p className={` ${mostrar || valorInput != '' ? 'text-coomeva_color-rojo' : 'text-transparent'} `}>*</p></div> : undefined}
                <div > <label className={`text-[0.97rem] ${mostrar || (valorInput !== '' && valorInput !== null) || inputType == 'date' ? 'text-coomeva_color-grisLetras' : 'text-transparent'} `} htmlFor={nameInput}>{placeholder}</label>
                </div>
            </div>
            <div className='flex w-full items-center gap-2'>
                {
                    mostrar == false && requerido == true ? <label className='text-coomeva_color-rojo' htmlFor={nameInput}>*</label> : undefined
                }
                <div className=' flex  border-b border-gray-600 items-center w-full'>
                    <input
                        type={inputType}
                        placeholder={placeholder}
                        className={`w-full h-${h} text-coomeva_color- bg-transparent ${fontSize} text-coomeva_color-grisPestaña focus:outline-none appearance-none`}
                        name={nameInput}
                        id={nameInput}
                        required={requerido}
                        disabled={estado}
                        onChange={
                            (e) => {
                                //requerido && e.target.setCustomValidity('');
                                onChangeInput(e)
                            }
                        }
                        value={valorInput != '' && valorInput != undefined ? formatearFecha({ fecha: valorInput }) : ''}
                        onBlur={(e) => {
                            //validarCompoRequerido({ e, setMostrar, setPlaceholderInput, placeholder, requerido })
                            onBlurInput(e)
                            if (!document.getElementById(nameInput).value) {
                                setInputType('text'); // Si el input está vacío, vuelve a 'text' al perder el foco
                            }
                        }}
                        onFocus={(e) => {
                            setInputType('date')
                            setMostrar(true)
                            setPlaceholderInput('')
                        }}
                        ref={dateInputRef}
                    />
                    {inputType === 'text' &&
                        <ImCalendar className={`${estado ? 'text-gray-300' : 'text-coomeva_color-rojo'} ml-2 cursor-pointer`} onClick={() => !estado && setInputType('date')} onFocus={() => !estado && setInputType('date')} />}
                </div>
            </div>
        </div>
    );
};