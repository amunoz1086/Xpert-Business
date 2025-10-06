import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export const CardDirecciones = ({ listaDirecciones = [], listTipoDireccion, listCiduades, listDepartamentos, editarDireccion, eliminarDireccion, tipoDireccionEditar, listPaises }) => {
    return (
        <>
            {
                listaDirecciones?.length > 0 ?
                    listaDirecciones.map((item, i) => (
                        <div key={i} className="border border-gray-200 h-36 rounded-md">
                            <div className={` bg-white border border-gray-200 shadow-sm  rounded-md p-3 `}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-x-2">
                                        <FaMapMarkerAlt />
                                        {/* <h1>{item?.tipoDireccion}</h1> */}
                                        <h1>{listTipoDireccion?.find(e => e.code == item?.tipoDireccion)?.value}</h1>
                                        {
                                            <div className='mt-1' >
                                                {
                                                    item.direccionPrincipalNegocio === 'on' ?
                                                        <p className='bg-gray-200 w-24 rounded-full text-xs px-2 text-center py-1 '>Preferente</p> :
                                                        <p className=' w-24 rounded-full text-xs px-2 text-transparent py-1 '>Preferente</p>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className='flex gap-x-4'>
                                        <button type="button" onClick={() => { editarDireccion(i, tipoDireccionEditar) }} className=" font-bold">Editar</button>
                                        <p onClick={() => { eliminarDireccion(i) }} className='text-lg cursor-pointer'>x</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-x-3 mt-2'>
                                    <p className='text-slate-700 text-sm'>{`${item?.tipoViaPrincipal} ${item?.numeroViaPrincipal} ${item?.nombreViaPrincipal} ${item?.letraViaPrincipal} ${item?.sectoViarPrincipal} ${item?.tipoViaSecundaria} ${item?.numeroViaSecundaria} ${item?.nombreViaSecundaria} ${item?.letraPrincipalViaSecundaria} ${item?.sectorViaSecundaria} ${item?.numeroPredioViaSecundaria} BRR ${item?.nombreBarrio} ${item?.numeroUnidad}`}</p>
                                    <p className='text-slate-500 text-sm'>{`${(listPaises?.find(e => e.code == item.pais)?.value) || ''}, ${(listDepartamentos?.find(e => e.code == item.departamento)?.value)}, ${(listCiduades?.find(e => e.code == item.ciudad)?.value) || ''}`}</p>
                                    <p className='text-slate-700 text-sm'><em>Ref: {item.referenciaUbicacion}</em></p>
                                </div>
                            </div>
                        </div>
                    ))

                    : <div className="border border-gray-200 h-32 rounded-md flex flex-col justify-center items-center">
                        <h3 >No hay direcciones registradas</h3>
                    </div>
            }
        </>
    )
}
