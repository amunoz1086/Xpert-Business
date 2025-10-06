'use client'

import CheckInput from "../../share/CheckInput"


const ConvenioRecaudoClasePago = ({habilitarInput,updateConfiguracion, configuracion}) => {

    let data = configuracion['convenioRecaudo']['recuadoClasePago']

    const onChangeBlur = (e) => {

        data[e.target.id] = e.target.checked 

        updateConfiguracion('convenioRecaudo', 'recuadoClasePago', data)

    }

    return (
        <section className='container bg-white shadow-md border border-slate-50 w-[40rem] py-4 px-3 rounded-md'>
            <form id="frmClasePago" >
                <div className='w-full'>
                    <p className='text-center text-coomeva_color-azulClaro font-bold'>Acepta pago en</p>
                    <div className='flex justify-between px-10 py-2'>
                        <div>
                            <CheckInput
                                id={"cheque"}
                                value={1}
                                labelText={"Cheque"}
                                style={"font-normal text-sm text-coomeva_color-azulClaro"}
                                onBlur={onChangeBlur}
                                stateCheck={data?.cheque}
                                enable={habilitarInput}
                                onChangeInput={onChangeBlur}
                            />
                        </div>
                        <div>
                            <CheckInput
                                id={"Efectivo"}
                                value={2}
                                labelText={"Efectivo"}
                                style={"font-normal text-sm text-coomeva_color-azulClaro"}
                                onBlur={onChangeBlur}
                                stateCheck={data?.Efectivo}
                                enable={habilitarInput}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className='text-center text-coomeva_color-azulClaro font-bold'>Tipo de cheque</h3>
                    <div className='flex justify-between px-10 py-2'>
                        <div>
                            <CheckInput
                                id={"Personal"}
                                value={3}
                                labelText={"Personal"}
                                style={"font-normal text-sm text-coomeva_color-azulClaro"}
                                onBlur={onChangeBlur}
                                stateCheck={data?.Personal}
                                enable={habilitarInput}
                            />
                        </div>
                        <div>
                            <CheckInput
                                id={"Gerencia"}
                                value={4}
                                labelText={"Gerencia"}
                                style={"font-normal text-sm text-coomeva_color-azulClaro"}
                                onBlur={onChangeBlur}
                                stateCheck={data?.Gerencia}
                                enable={habilitarInput}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default ConvenioRecaudoClasePago