'use client'

import CheckInput from "../../share/CheckInput"

export default function ModeloPago({ listSiNO, idFormulario, propiedad, subPropiedad,  habilitarInput,updateConfiguracion, configuracion}) {

    let data = configuracion[propiedad][subPropiedad]

    const onChangeBlur = (e) => {

        data[e.target.id] = e.target.checked ? e.target.checked : e.target.value=='on'?false:e.target.value

        updateConfiguracion(propiedad, subPropiedad, data)

    }

    return (
        <form id={idFormulario} className='w-full'>
            <fieldset className='bg-white shadow-md border border-slate-50 rounded-md px-3'>

                <legend className='bg-coomeva_color-grisPestaña2 py-1 px-10 rounded-t-md'>
                    <p className='text-coomeva_color-rojo'>Modelo de pago</p>
                </legend>
                <div className='bg-coomeva_color-grisPestaña2 p-2'>
                    <br />
                </div>
                <div className='flex justify-between p-2'>
                    <p className='font-roboto text-coomeva_color-azulClaro'>Aceptación de pagos vencidos</p>
                    <div>
                        <select
                            name={"idrem"} 
                            id={'idrem'}
                            defaultValue={data?.idrem}
                            onChange={onChangeBlur}
                            disabled={habilitarInput}
                            className='w-52 h-7 font-normal  text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4'>
                            <option value={"default"} >Seleccionar</option>
                            {listSiNO.DATA?.map((op, i) => (
                                <option
                                    value={op.codLista}
                                    key={op.codLista}>
                                    {op.descripcion}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex justify-between bg-coomeva_color-grisPestaña2 mb-3 p-2'>
                    <p className='font-roboto text-coomeva_color-azulClaro'>Se debe permitir el pago</p>
                    <div className='flex lg:space-x-6 space-x-2'>
                        <div>
                            <CheckInput
                                id={"completo"}
                                labelText={"Completo"}
                                value={1}
                                stateCheck={data?.completo}
                                style={"font-normal text-sm text-coomeva_color-azulClaro"}
                                onBlur={onChangeBlur}
                                enable={habilitarInput}
                                onChangeInput={onChangeBlur}
                            />
                        </div>
                        <div>
                            <CheckInput
                                id={"parcial"}
                                labelText={"Parcial"}
                                value={2}
                                style={"font-normal text-sm text-coomeva_color-azulClaro"}
                                stateCheck={data?.parcial}
                                onBlur={onChangeBlur}
                                enable={habilitarInput}
                                onChangeInput={onChangeBlur}
                               
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

