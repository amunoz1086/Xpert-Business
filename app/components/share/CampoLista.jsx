'use client'

import { validarCompoRequerido } from "@/app/lib/utils"
import { useState } from "react"
import { MdArrowDropDownCircle } from "react-icons/md"



export const CampoLista = ({ descripcionPrefijo, fontSize = 'text-lg', validacionRequeridoEditable, selectBorderAzul = false, hiddenPlaceholder = false, lista = [], idLista = '', descripcionList = '', valorInput = '', placeholder = 'Lista', nameInput = '', onChangeInput = () => { }, onBlurInput = () => { } }) => {

  const [mostrar, setMostrar] = useState(false);
  const { requerido, estado } = validacionRequeridoEditable;
  const [placeholderInput, setPlaceholderInput] = useState(placeholder);
  const [mensaejeDefault, setMensaejeDefault] = useState(placeholder);


  return (
    <div className='w-full space-y-1'>
      <div className='flex space-x-1'>
        {requerido ? <div > <p className={` ${mostrar || valorInput != '' ? 'text-coomeva_color-rojo' : 'text-transparent'} `}>*</p></div> : undefined}
        {hiddenPlaceholder ? undefined : <div >
          <label className={`text-[0.97rem] ${mostrar || (valorInput !== '' && valorInput !== null) ? 'text-coomeva_color-grisLetras' : 'text-transparent'} `} htmlFor={nameInput}>{placeholder}</label>
        </div>
        }
      </div>

      {
        selectBorderAzul ?
          <div className="relarive">
            <select
              id={nameInput}
              name={nameInput}
              defaultValue={valorInput}
              className=' px-2 border h-8 my-[0.1rem] pl-4 border-coomeva_color-azulClaro rounded-md w-full outline-none text-sm font-normal bg-transparent text-coomeva_color-azulOscuro'
              required={requerido}

              disabled={estado}

              onChange={
                (e) => {
                  //requerido && e.target.setCustomValidity('');
                  onChangeInput(e)
                }
              }

              onBlur={(e) => {

                //validarCompoRequerido({ e, setMostrar, setPlaceholderInput, placeholder, requerido })



                onBlurInput(e)

              }}
              onFocus={(e) => {
                setMensaejeDefault('Seleccionar')
                setMostrar(true)
                setPlaceholderInput('')
              }}
            >
              <option disabled value=''>{mensaejeDefault}</option>
              {lista.map((item, i) => (
                <option key={item[idLista] + i} value={item[idLista]} >
                  {item[descripcionList]}
                </option>
              ))}
            </select>

          </div> :
          <div className='relative'>
            <div className="flex justify-center items-center">
              <label className='text-coomeva_color-rojo' htmlFor={nameInput}>{mostrar == false && requerido == true ? '*' : ''}</label>
              <select

                id={nameInput}
                name={nameInput}
                value={valorInput || ''}
                className={`w-full px-2  font-normal border-none ${fontSize} outline-none bg-transparent appearance-none pr-10`}
                required={requerido}

                disabled={estado}

                onChange={
                  (e) => {
                    //requerido && e.target.setCustomValidity('');
                    onChangeInput(e)
                  }
                }

                onBlur={(e) => {

                  //validarCompoRequerido({ e, setMostrar, setPlaceholderInput, placeholder, requerido })



                  onBlurInput(e)

                }}
                onFocus={(e) => {
                  setMensaejeDefault('Seleccionar')
                  setMostrar(true)
                  setPlaceholderInput('')
                }}
              >

                <option value=''>{mensaejeDefault}</option>
                {lista.map(item => (
                  <option key={item[idLista]} value={item[idLista]} >
                    {descripcionPrefijo ? `+${item[descripcionList]}` + ' ' + `(${item[descripcionPrefijo]})` : item[descripcionList]}
                  </option>
                ))}

              </select>

            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center text-white rounded-full ">
              {/* <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.5 7.5L10 12l4.5-4.5h-9z" />
              </svg> */}
              <MdArrowDropDownCircle className={`${estado ? 'text-gray-300' : 'text-coomeva_color-rojo'} h-5 w-5`} />
            </div>
            <hr className='border-1 border-gray-600' />
          </div>
      }
    </div>
  )
};