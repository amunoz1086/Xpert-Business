export default function TipoCheck({ checkBoxes, onChangeTipo, titulo, id, idExist, description, isChecked, idDisable, seccion, altura }) {

    return (
        <main>
            <div className={`p-6  h-64 w-60 bg-white border rounded-lg flex flex-col shadow-md`}>
                <h1 className="text-base mb-5 text-coomeva_color-rojo">{titulo}</h1>
                <div className="rounded block basis-5/6 ">
                    {
                        checkBoxes?.map((item, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <label>
                                    <input
                                        required={true}
                                        id={`${item[id]}${seccion}${i}`}
                                        // name={`${item[`${id}`]}${seccion}`}
                                        name={item[`${description}`].split(' ').join('').normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()}
                                        value={item[`${id}`]}
                                        defaultChecked={
                                            item.checkOp === true ||
                                            isChecked ||
                                            idExist && item[id] ||
                                            (id === "COD_CONVENIO" && item["COD_CONVENIO"] == 3) ||
                                            (id === "COD_CONVENIO" && item["COD_CONVENIO"] == 3) ||
                                            item["seleccionado"]
                                        }
                                        onChange={onChangeTipo}
                                        type="checkbox"
                                        disabled={item[`${id}`] == idDisable || item.desabilitar}
                                        className="hidden peer"
                                    />
                                    <span className="w-7 h-7 block relative transition duration-75 text-blue-600 bg-white border border-gray-300 rounded-md peer-focus:ring-blue-500 dark:peer-focus:ring-blue-600  peer-focus:ring-2  cursor-pointer peer-checked:bg-[#004F7D]  "></span>
                                </label>
                                <p
                                    // htmlFor={item[`${id}`]}
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                                >
                                    {item[`${description}`]}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    );
}