'use client'

import ListaSelect from "../../share/ListaSelect"

const CorresponsalesBaseWebTicket = ({listSiNo,habilitarInput,updateConfiguracion, configuracion}) => {

    let data = configuracion['corresponsales']['BaseWebTicket']

    const onChangeBlur = (e) => {

        const name = e.target.id.replace('.','')

        data[name] = e.target.value 

        updateConfiguracion('corresponsales', 'BaseWebTicket', data)

    }

    return (
     
            <div className='container flex justify-evenly bg-white shadow-md border border-slate-50 w-full py-6 px-3 rounded-md'>
                <div className="flex flex-col items-center justify-center">
                    <p className='text-coomeva_color-azulOscuro mb-4 text-sm'>Con Base de Facturación</p>
                    <ListaSelect
                        classTitle={"text-coomeva_color-rojo  text-sm font-bold"}
                        id={"codLista"}
                        name={'select1'}
                        valor={"descripcion"}
                        color={1}
                        lista={listSiNo}
                        onchangeSelect={onChangeBlur}
                        defaultValue={data?.codListaselect1||''}
                        mostrarLista={true}
                        inhabilitarSelect={habilitarInput}
                    />
                </div>
                <div className="flex flex-col items-center justify-center" >
                    <p className='text-coomeva_color-azulOscuro mb-4 text-sm'>Convenio con Web Service</p>
                    <ListaSelect
                        classTitle={"text-coomeva_color-rojo  text-sm font-bold"}
                        id={"codLista"}
                        name={'select2'}
                        valor={"descripcion"}
                        color={1}
                        lista={listSiNo}
                        onchangeSelect={onChangeBlur}
                        defaultValue={data?.codListaselect2||''}
                        mostrarLista={true}
                        inhabilitarSelect={habilitarInput}
                    />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className='text-coomeva_color-azulOscuro mb-4 text-sm'>Ticket Promedio</p>
                    <ListaSelect
                        classTitle={"text-coomeva_color-rojo  text-sm font-bold"}
                        id={"codLista"}
                        name={'select3'}
                        valor={"descripcion"}
                        color={1}
                        lista={listSiNo}
                        onchangeSelect={onChangeBlur}
                        defaultValue={data?.codListaselect3||''}
                        mostrarLista={true}
                        inhabilitarSelect={habilitarInput}
                    />
                </div>
            </div>
    
    )
}

export default CorresponsalesBaseWebTicket