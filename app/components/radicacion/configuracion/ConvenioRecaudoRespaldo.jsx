'use client'

import CheckInput from "../../share/CheckInput"

export default function ConvenioRecaudoRespaldo({habilitarInput,updateConfiguracion, configuracion}) {

    let data = configuracion['convenioRecaudo']['recaudoRespaldo']

    const onChangeBlur = (e) => {

        const {id,value,checked}=e.target

        data[id] = checked ? checked : value =='on'?false:value

        updateConfiguracion('convenioRecaudo', 'recaudoRespaldo', data)

    }

    return (
        <form id="frmRecaudoRespaldo" className=' w-full flex items-center justify-center bg-white shadow-md  border border-slate-50 px-8 py-3 mt-2'>
            <div className='w-full lg:-mt-6'>
                <p className='text-center mb-4 text-coomeva_color-azulOscuro   font-semibold font-roboto'>Información al respaldo</p>
                <div className='flex'>
                    <CheckInput
                        id={"nameGirador"}
                        labelText={"Nombre del girador"}
                        value={1}
                        style={"font-normal text-sm text-coomeva_color-azulClaro"}
                        onBlur={onChangeBlur}
                        stateCheck={data?.nameGirador}
                        enable={habilitarInput}

                    />
                    <CheckInput
                        id={"telefono"}
                        labelText={"No. de teléfono"}
                        value={2}
                        style={"font-normal text-sm text-coomeva_color-azulClaro"}
                        onBlur={onChangeBlur}
                        stateCheck={data?.telefono}
                        enable={habilitarInput}
                    />
                    <CheckInput
                        id={"numeroDocumentoPago"}
                        labelText={"No. documento de pago"}
                        value={3}
                        style={"font-normal text-sm text-coomeva_color-azulClaro"}
                        onBlur={onChangeBlur}
                        stateCheck={data?.numeroDocumentoPago}
                        enable={habilitarInput}
                    />
                    <CheckInput
                        id={"otra"}
                        labelText={"Otra"}
                        value={4}
                        style={"font-normal text-sm text-coomeva_color-azulClaro"}
                        onBlur={onChangeBlur}
                        stateCheck={data?.otra}
                        enable={habilitarInput}
                    />
                </div>
            </div>
            <div className='w-[30rem] lg:mt-4'>
                <p className='text-center mb-2 font-roboto font-semibold text-coomeva_color-azulOscuro'>¿Cual?</p>
                <div>
                    <textarea
                        id='cual'
                        name='cual'
                        className='w-full h-auto p-2 text-coomeva_color-azulClaro bg-coomeva_color-grisPestaña2 outline-none  rounded-md'
                        onBlur={onChangeBlur}
                        defaultValue={data?.cual}
                        disabled={habilitarInput}

                    >

                    </textarea>
                </div>
            </div>
        </form>
    )
}

