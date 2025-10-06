'use client'

import CheckInput from "../../share/CheckInput"

const TipoVenta = ({ habilitarInput,updateConfiguracion, configuracion }) => {

    let data = configuracion.adquirencia.tipoVenta

    const onChangeBlur = (e) => {

        data[e.target.id] = e.target.checked

        updateConfiguracion('adquirencia', 'tipoVenta', data)

    }



    return (
        <div className=' w-[48%] mt-4 h-full'>
            <div className='w-full h-[14.8rem] border rounded-md bg-white shadow-md px-6 '>
                <p className='text-coomeva_color-rojo mb-2 text-base py-4 '>Tipo de venta</p>
                <form id="frmTipoVenta" className='flex gap-10'>
                    <div className='space-y-3'>
                        <CheckInput
                            id={"visa"}
                            value={1}
                            labelText={"Visa"}
                            style={"text-coomeva_color-azulOscuro text-sm font-normal"}
                            onBlur={onChangeBlur}
                            stateCheck={data?.visa}
                            enable={habilitarInput}
                        />
                        <CheckInput
                            id={"manual"}
                            value={2}
                            labelText={"Manual"}
                            style={"text-coomeva_color-azulOscuro text-sm font-normal"}
                            onBlur={onChangeBlur}
                            stateCheck={data?.manual}
                            enable={habilitarInput}
                        />
                        <CheckInput
                            id={"pagoAutomatico"}
                            value={3}
                            labelText={"Pago automático"}
                            style={"text-coomeva_color-azulOscuro text-sm font-normal"}
                            onBlur={onChangeBlur}
                            stateCheck={data?.pagoAutomatico}
                            enable={habilitarInput}
                        />
                    </div>
                    <div className='space-y-3'>
                        <CheckInput
                            id={"masterCard"}
                            value={4}
                            labelText={"MasterCard"}
                            style={"text-coomeva_color-azulOscuro text-sm font-normal"}
                            onBlur={onChangeBlur}
                            stateCheck={data?.masterCard}
                            enable={habilitarInput}
                        />
                        <CheckInput
                            id={"aerolines"}
                            value={5}
                            labelText={"Aerolíneas"}
                            style={"text-coomeva_color-azulOscuro text-sm font-normal"}
                            onBlur={onChangeBlur}
                            stateCheck={data?.aerolines}
                            enable={habilitarInput}
                        />
                        <CheckInput
                            id={"servPublico"}
                            value={6}
                            labelText={"Servicios públicos"}
                            style={"text-coomeva_color-azulOscuro text-sm font-normal"}
                            onBlur={onChangeBlur}
                            stateCheck={data?.servPublico}
                            enable={habilitarInput}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TipoVenta