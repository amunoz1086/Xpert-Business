

const EstructuraSelect = ({ options, onChangeSelect, code, description, name, id, value,habilitarInput }) => {


    return (

        <div className="relative inline-block w-full">
            {
                options && <select

                    defaultValue={value}
                    onChange={onChangeSelect}
                    disabled={habilitarInput}
                    className='w-44 h-7 font-normal text-sm outline-none bg-white border border-coomeva_color-azulClaro border-spacing-1 rounded-md  px-2 mx-4' name={name} id={id}>
                    <option value={"default"} >Seleccionar</option>
                    {options?.map((op, i) => (
                        <option value={op[code]} key={op[description]}>{op[description]}</option>
                    ))}
                </select>
            }
        </div>
    );
};

export default EstructuraSelect