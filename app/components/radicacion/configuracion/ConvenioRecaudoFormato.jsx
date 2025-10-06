'use client'

import CheckInput from '../../share/CheckInput'

export default function ConvenioRecaudoFormato ({habilitarInput,updateConfiguracion, configuracion}) {

    let data = configuracion.convenioRecaudo.recaudoFormato

    const onChangeBlur = (e)=> {

        data[e.target.id]=e.target.checked 

        updateConfiguracion('convenioRecaudo','recaudoFormato',data)
       
    }



    return (
        <div className='mt-4 mx-2'>
            <div className='w-[18rem] border rounded-md bg-white shadow-md px-6 py-14 '>
                <p className='text-coomeva_color-azulOscuro mb-2 text-sm'>Formato a utilizar para el recaudo</p>
                <form id='frmRecaudoFormato'  className='space-y-3'>
                    <CheckInput
                        id={"formatoBanCoomeva"}
                        value={1}
                        labelText={"Formato Bancoomeva"}
                        style={"text-coomeva_color-azulOscuro text-sm"}
                        onBlur={onChangeBlur}
                        stateCheck={data?.formatoBanCoomeva}
                        enable={habilitarInput}
                    />
                    <CheckInput
                        id={"formatoEntidad"}
                        value={2}
                        labelText={"Formato Entidad"}
                        style={"text-coomeva_color-azulOscuro text-sm"}
                        onBlur={onChangeBlur}
                        stateCheck={data?.formatoEntidad}
                        enable={habilitarInput}
                    />
                </form>
            </div>
        </div>

    )
}

