'use client'

import { validarNumeros, validarTexto } from '@/app/lib/utils'
import { useEffect, useRef, useState } from 'react'

const InformacionCliente = ({ naturalezaPersona, cargoPersona, NomRepresent, cedRepresent, rolPerfil, clienteFiducia, updateClienteFiducia, estadoAprobacionParametrizador, updateHistorialPath,estadoSolicitud }) => {

  const habilitarInput =
    (estadoAprobacionParametrizador.estadoAprobacion === undefined && estadoAprobacionParametrizador.estadoParametrizacion === undefined&&rolPerfil === 'Radicación')
      ? false :
      (
        !((estadoAprobacionParametrizador.estadoParametrizacion !== 1)
        && (rolPerfil === 2 && estadoAprobacionParametrizador.estadoAprobacion !== 0)))


  const [correo, setCorreo] = useState(clienteFiducia?.corContacto || '')
  const [errorCorreo, setErrorCorreo] = useState(false)
  const correoRef = useRef()


  const onBlurInput = (e) => {

    e.target.value == '' && setErrorCorreo(false)
    updateClienteFiducia(e.target?.id, e.target.value)

    if (e.target.id == 'corContacto') {
      if (errorCorreo) {
        correoRef.current.focus();
      }
    }

  }


  const onChangeEmailValidacion = (e) => {

    const value = e.target.value;

    const expresionValidarCorreo = /^[a-zA-Z0-9_%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]*$/;

    const isValidEmail = expresionValidarCorreo.test(value);

    if (isValidEmail) {
      setCorreo(value);
      setErrorCorreo(false)
    } else {
      setCorreo(value);
      setErrorCorreo(true)
    }

  }



  useEffect(() => { return () => updateHistorialPath(true) }, [])



  return (
    <div className='px-3 py-5 h-56 w-full border border-slate-50 bg-white shadow-md rounded-md  '>
      <div className='flex'>
      <h2 className='w-[25%] m-auto mb-4 text-coomeva_color-rojo'>Información cliente</h2>
      <h2 className='w-[25%] ml-4 mb-4 text-coomeva_color-rojo'>Corresponsales Bancarios</h2>
      <h2 className='w-[25%] m-auto mb-4 text-coomeva_color-rojo'></h2>
      <h2 className='w-[25%] m-auto mb-4 text-coomeva_color-rojo'></h2>
      </div>
     
      <div className='flex w-[98%] items-center justify-center font-normal  m-auto space-x-8 text-slate-600 mb-8'>
        <div className='w-full space-y-1'>
          <p className='text-xs'>Naturaleza jurídica</p>
          <div className=''>
            <label className=' ' htmlFor='naturaleza'>{''} </label>
            <select
              id={`naturaleza`}
              name={`naturaleza`}
              defaultValue={clienteFiducia?.naturaleza || 'default'}
              onBlur={onBlurInput}
              disabled={habilitarInput}
              className='w-full h-7 font-normal  text-sm outline-none bg-transparent border-t border-x border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 ' >
              <option disabled value={"default"} >Seleccionar</option>
              {
                naturalezaPersona.map(naturaleza => (
                  <option key={naturaleza.codLista} value={naturaleza.codLista} >{naturaleza.descripcion}</option>
                ))
              }
            </select>
            <hr className='border-1 border-gray-600' />
          </div>

        </div>
        <div className='w-full space-y-1'>
          <p className='text-xs w-full'> Cargo de la persona de contacto</p>
          <div>
            <label className=' ' htmlFor='cargoF'>{cargoPersona} </label>
            <input
              type="text"
              id="cargoF"
              name="cargoF"
              className="focus:outline-none font-normal text-gray-500  flex item-start w-full bg-red  "
              defaultValue={clienteFiducia?.cargoF || ''}
              autoComplete='off'
              onBlur={onBlurInput}
              onChange={validarTexto}
              disabled={habilitarInput}
            />
            <hr className='border-1 border-gray-600' />
          </div>

        </div>
        <div className='w-full space-y-1'>
          <p className='text-xs'>Nombre del contacto</p>
          <div>
            <label className=' ' htmlFor='nombreRepresent'>{NomRepresent} </label>
            <input
              type="text"
              id="nombreRepresent"
              name="nombreRepresent"
              className="focus:outline-none font-normal text-gray-500  flex item-start w-full bg-red  "
              defaultValue={clienteFiducia?.nombreRepresent || ''}
              autoComplete="off"
              onBlur={onBlurInput}
              onChange={validarTexto}
              disabled={habilitarInput}
            />
            <hr className='border-1 border-gray-600' />
          </div>

        </div>
        <div className='w-full space-y-1'>
          <p className='text-xs'>Cédula del contacto</p>
          <label className=' ' htmlFor='cedRepresent'>{cedRepresent} </label>
          <input
            type="text"
            id="cedRepresent"
            name="cedRepresent"
            className="focus:outline-none font-normal text-gray-500  flex item-start w-full bg-red  "
            defaultValue={clienteFiducia?.cedRepresent || ''}
            autoComplete="off"
            onBlur={onBlurInput}
            onChange={validarNumeros}
            disabled={habilitarInput}
          />
          <hr className='border-1 border-gray-600' />
        </div>
      </div>
      {/* ajustes */}
      <div className='flex w-[98%] items-center justify-center font-normal  m-auto space-x-8 text-slate-600'>
        <div className='w-full space-y-1'>
          <p className='text-xs w-full'>Teléfono  Contacto</p>
          <div>
            <label className=' ' htmlFor='telContacto'> </label>
            <input
              type="text"
              id="telContacto"
              name="telContacto"
              className="focus:outline-none font-normal text-gray-500  flex item-start w-full bg-red  "
              defaultValue={clienteFiducia?.telContacto || ''}
              autoComplete="off"
              onBlur={onBlurInput}
              disabled={habilitarInput}
              onChange={validarNumeros}
            />
            <hr className='border-1 border-gray-600' />
          </div>

        </div>
        <div className='w-full space-y-1'>
          <p className='text-xs w-full'> Celular contacto</p>
          <div>
            <label className=' ' htmlFor='celContacto'> </label>
            <input
              type="text"
              id="celContacto"
              name="celContacto"
              className="focus:outline-none font-normal text-gray-500  flex item-start w-full bg-red  "
              defaultValue={clienteFiducia?.celContacto || ''}
              autoComplete="off"
              onBlur={onBlurInput}
              onChange={validarNumeros}
              disabled={habilitarInput}
            />
            <hr className='border-1 border-gray-600' />
          </div>

        </div>
        <div className='w-full space-y-1'>
          <div className='flex space-x-2'><p className='text-xs'>Correo contacto </p> {errorCorreo ? <p className='text-xs text-coomeva_color-rojo'>no es valido.</p> : undefined}</div>
          <div>
            <label className=' ' htmlFor='corContacto'> </label>
            <input
              type="email"
              id="corContacto"
              name="corContacto"
              className="focus:outline-none font-normal text-gray-500  flex item-start w-full bg-red  "
              value={correo}
              autoComplete="off"
              onBlur={onBlurInput}
              onChange={onChangeEmailValidacion}
              disabled={habilitarInput}
              ref={correoRef}
            />
            <hr className='border-1 border-gray-600' />
          </div>


        </div>
        <div className='w-full space-y-1'>
          <p className='text-xs'>Ciudad contacto</p>
          <label className=' ' htmlFor='ciudadContacto'> </label>
          <input
            type="text"
            id="ciudadContacto"
            name="ciudadContacto"
            className="focus:outline-none font-normal text-gray-500  flex item-start w-full bg-red  "
            defaultValue={clienteFiducia?.ciudadContacto || ''}
            autoComplete="off"
            onBlur={onBlurInput}
            onChange={validarTexto}
            disabled={habilitarInput}
          />
          <hr className='border-1 border-gray-600' />
        </div>
      </div>
    </div>
  )
}

export default InformacionCliente