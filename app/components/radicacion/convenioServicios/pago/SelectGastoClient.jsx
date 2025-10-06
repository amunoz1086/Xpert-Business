'use client'

export default  function SelectGastoClient({ listGastos,setIdGasto,id,valor,idGastoContext,habilitarInput }) {


    const onchangeSelect = (e) => {

        const val = e.target.value

       setIdGasto(val)
       
    }

    return (
        <div className={`bg-white h-8 lg:w-[67%]  md:w-[50%] flex justify-end text-end ml-[32.5%] mt-[0.5rem]   `}>
            <select
                id={id}
                name={id}
                defaultValue={idGastoContext|| "Default"}
                className=' border py-[0.12rem] my-[0.1rem] border-coomeva_color-azulClaro rounded-md w-full outline-none text-sm font-normal bg-transparent text-coomeva_color-azulOscuro'
                onChange={onchangeSelect}
                disabled={habilitarInput}
            >
                <option  defaultValue={"Default"}>Seleccionar</option>
                {
                    listGastos?.map(gasto => (
                        <option
                            value={gasto[id]}
                            key={gasto[id]}
                        >
                            {gasto[valor]}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

