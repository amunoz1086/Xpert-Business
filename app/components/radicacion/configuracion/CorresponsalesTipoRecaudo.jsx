'use client'

import CheckInput from "../../share/CheckInput"


export default function CorresponsalesTipoRecaudo({habilitarInput,updateConfiguracion, configuracion}) {

    let data = configuracion['corresponsales']['tipoRecuado']

    const onChangeBlur = (e) => {

        data[e.target.id] = e.target.checked 

        updateConfiguracion('corresponsales', 'tipoRecuado', data)

    }

    return (
        <section className='container bg-white shadow-md border border-slate-50  py-6 px-3 rounded-md'>
            <form id="frmTipoRecaudo">
                <div className='w-full'>
                    <p className='text-center text-coomeva_color-azulClaro font-bold my-2'>Tipo de recaudo</p>
                    <div className='flex justify-between px-10 py-2'>
                        <div>
                            <CheckInput
                                id={"manual"}
                                value={1}
                                labelText={"Manual"}
                                style={"font-normal text-sm text-coomeva_color-azulClaro"}
                                onBlur={onChangeBlur}
                                stateCheck={data?.manual}
                                enable={habilitarInput}
                            />
                        </div>
                        <div>
                            <CheckInput
                                id={"codigoBarra"}
                                value={2}
                                labelText={"Código de Barras"}
                                style={"font-normal text-sm text-coomeva_color-azulClaro"}
                                onBlur={onChangeBlur}
                                stateCheck={data?.codigoBarra}
                                enable={habilitarInput}
                            />
                        </div>
                    </div>
                </div>

            </form>
        </section>
    )
}

