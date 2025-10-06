'use client'

const ConvenioRecaudoSiNo = ({ listSiNO,habilitarInput,updateConfiguracion, configuracion }) => {

    const onchangeSelect = () => {

        updateConfiguracion('convenioRecaudo', 'recaudoSiNo', (document.getElementById('idrem')).value)
    
    }

    return (
        <div className='mt-4 mx-2 '>
            <div className='w-[18rem] border rounded-md bg-white shadow-md px-6 py-10'>
                <p className='text-coomeva_color-azulOscuro mb-4 text-sm'>Formato a utilizar para el recaudo</p>
                <form >
                    <select
                        name={"idrem"}
                        id={'idrem'}
                        defaultValue={configuracion.convenioRecaudo?.recaudoSiNo}
                        onChange={onchangeSelect}
                        disabled={habilitarInput}
                        className='w-40 h-7 font-normal  text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4'>
                        <option value={"default"} >Seleccionar</option>
                        {listSiNO.DATA?.map((op, i) => (
                            <option
                                value={op.codLista}
                                key={op.codLista}>
                                {op.descripcion}
                            </option>
                        ))}
                    </select>
                    {/* <ListaSelect
                        classTitle={"text-coomeva_color-rojo ml-4 text-sm font-bold"}
                        id={"codLista"}
                        color={1}
                        valor={"descripcion"}
                        lista={listSiNO.DATA}
                        name={'lista'}
                        onchangeSelect={onchangeSelect}
                        defaultValue={configuracion.convenioRecaudo?.recaudoSiNo}
                        mostrarLista={true}

                    /> */}
                </form>
            </div>
        </div>
    )
}

export default ConvenioRecaudoSiNo