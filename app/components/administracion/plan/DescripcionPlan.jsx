import { formatearFecha } from "@/app/lib/utils"



const DescripcionPlan = ({ detalle = {}, opcionSeleccionada, listaTipoPlan = [], onChangeListaPlan, onBurInput, onChangeDetalle, deshabilitar = false, inactivarMasivos = true, listaPlan = [] }) => {


    return (

        <div className="shadow-md rounded-md mt-3">
            <div className='w-full flex  border mb-[2px] rounded-t-md'>
                <div className='w-full bg-coomeva_color-grisPestaña2 '>
                    <input
                        id="plannombre"
                        className="bg-transparent text-coomeva_color-rojo  px-2 "
                        type="text"
                        defaultValue={'Plan'}
                        readOnly
                    />
                </div>
                <div className='w-full bg-gray-100'>
                    {

                        opcionSeleccionada == 3
                            ? <select
                                name=""
                                id=""
                                className="outline-none w-52"
                                onChange={onChangeListaPlan}
                                
                                >
                                <option value="default" >Seleccione plan</option>
                                {
                                    listaPlan.map((plan) => (
                                        <option key={plan.codPlan} value={plan.codPlan}>{plan.plan}</option>
                                    ))
                                }

                            </select> :
                            <input
                                id="nombre"
                                className="bg-transparent   px-2  border border-gray-300 rounded-md"
                                type="text"
                                value={detalle?.Nombre || ''}
                                onBlur={onBurInput}
                                onChange={(e) => { onChangeDetalle(e, 'Nombre') }}
                                disabled={deshabilitar}
                            />
                    }



                </div>
            </div>
            <div className='w-full flex  border mb-[2px] '>
                <div className='w-full bg-coomeva_color-grisPestaña2'>
                    <input
                        id="tipop"
                        className="bg-transparent text-coomeva_color-rojo  px-2 "
                        type="text"
                        defaultValue={'Tipo de Plan'}
                        readOnly
                    />
                </div>
                <div className='w-full bg-gray-100 '>
                    <select
                        className="w-52"
                        name=""
                        id="tipoPlan"
                        value={detalle?.tipoPlan || 'default'}
                        onBlur={onBurInput}
                        onChange={(e) => { onChangeDetalle(e, 'tipoPlan') }}
                        disabled={deshabilitar && inactivarMasivos}
                    >
                        <option value={'default'}>Seleccionar</option>
                        {
                            listaTipoPlan.map((plan) => (
                                <option key={plan.codTipoPlan} value={plan.codTipoPlan}>{plan.descripcion}</option>
                            ))
                        }

                    </select>
                </div>
            </div>
            <div className='w-full flex  border mb-[2px]  '>
                <div className='w-full bg-coomeva_color-grisPestaña2'>
                    <input
                        id="fecIni"
                        className="bg-transparent text-coomeva_color-rojo  px-2 "
                        type="text"
                        defaultValue={'Fecha inicial'}
                        readOnly

                    />
                </div>
                <div className='w-full bg-gray-100'>
                    <input
                        id="fechaIncial"
                        className="bg-transparent   px-2 "
                        type="date"
                        value={formatearFecha({ fecha: detalle?.fechaInicial || fechaFormateada })}
                        onChange={(e) => { onChangeDetalle(e, 'fechaInicial') }}
                        disabled={deshabilitar}
                    />
                </div>
            </div>
            <div className='w-full flex  border mb-[2px] '>
                <div className='w-full bg-coomeva_color-grisPestaña2'>
                    <input
                        id="fecf"
                        className="bg-transparent text-coomeva_color-rojo  px-2 "
                        type="text"
                        defaultValue={'Fecha último ajuste'}
                        readOnly
                    />
                </div>
                <div className='w-full bg-gray-100'>
                    <input
                        id="fechaUltimo"
                        className="bg-transparent   px-2 "
                        type="text"
                        value={(detalle?.fechaUltimo)}
                        onChange={(e) => { onChangeDetalle(e, 'fechaUltimo') }}
                        disabled={deshabilitar}
                        onBlur={onBurInput}
                    />
                </div>
            </div>

            <div className='w-full flex  border mb-[2px] '>
                <div className='w-full bg-coomeva_color-grisPestaña2'>
                    <input
                        id="fecf"
                        className="bg-transparent text-coomeva_color-rojo  px-2 "
                        type="text"
                        defaultValue={'Fecha de aplicación'}
                        readOnly
                    />
                </div>
                <div className='w-full bg-gray-100'>
                    <input
                        id="fechaAplicacion"
                        className="bg-transparent   px-2 "
                        type="date"
                        value={(detalle?.fechaAplicacion || '')}
                        onChange={(e) => { onChangeDetalle(e, 'fechaAplicacion') }}
                        disabled={deshabilitar && inactivarMasivos}
                        onBlur={onBurInput}
                    />
                </div>
            </div>


        </div>
    )
}

export default DescripcionPlan
