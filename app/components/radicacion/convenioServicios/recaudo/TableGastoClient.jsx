'use client'

import { conversionPesos, dataFormularioOrdenada, resetearPesos, validarNumeroInputText } from "@/app/lib/utils"
import { useEffect, useState } from "react"


const tablaEncabezado = ['Gastos directos cliente', 'Tarifa Plena', 'Meses a diferir']

const mesesDiferir = [
    //{ id: 1, mesesDiferir: '1' },
    //{ id: 2, mesesDiferir: '2' },
    //{ id: 3, mesesDiferir: '3' },
    //{ id: 4, mesesDiferir: '4' },
    //{ id: 5, mesesDiferir: '5' },
    //{ id: 6, mesesDiferir: '6' },
    //{ id: 7, mesesDiferir: '7' },
    //{ id: 8, mesesDiferir: '8' },
    //{ id: 9, mesesDiferir: '9' },
    //{ id: 10, mesesDiferir: '10' },
    //{ id: 11, mesesDiferir: '11' },
    { id: 12, mesesDiferir: '12' }
]


export default function TableGastoClient({ habilitarInput, tituloGasto, dataContext, idFormulario, propiedad, idGasto, idGastoDirectoFiltrar, listaJustificacion, idJustificacion, tipoJustificacion, seccion }) {

    const { updateConvenioRecaudo, convenioRecaudo } = dataContext

    const dataContextJustificacion = convenioRecaudo[propiedad]

    const [listSelec, setListSelec] = useState(dataContextJustificacion)

    useEffect(() => {

        if (idGasto !== '') {

            const listSelecionada = listaJustificacion?.DATA ? listaJustificacion?.DATA.filter(j => j[idGastoDirectoFiltrar] == idGasto) : []

            const idExists = listSelec.some(item => listSelecionada.some(existingItem => existingItem[idJustificacion] === item[idJustificacion]));

            if (!idExists) {
                setListSelec((list) => [
                    ...list,
                    ...listSelecionada
                ])
            }
        }
    }, [idGasto])



    const handleInputChangeBlur = (e, campo, valor, fila) => {

        const campoMese = (e.target.id).includes('mesesDiferir')

        const newList = [...listSelec]

        newList[fila][campo] = resetearPesos({ valor: valor })

        updateConvenioRecaudo(propiedad, newList)

        document.getElementById(e.target.id).value = !campoMese && valor !== '' ? conversionPesos({ valor: valor }) : valor

    };


    return <div className="p-1  h-full w-full relative ">
        <div className="container w-full">

            <fieldset className="border bg-white shadow-md rounded-md w-full">
                <legend className={` bg-coomeva_color-grisPestaña2  ml-5 rounded-t-md`}>
                    <h2 className="text-coomeva_color-rojo mt-4 w-60 text-center text-sm font-semibold"> {tituloGasto}</h2>
                </legend>

                <form id={idFormulario}>
                    <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                        <thead className="bg-coomeva_color-grisPestaña2">
                            <tr className={`  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                {tablaEncabezado.map((head, i) => (
                                    <th className={`align-bottom text-start pl-14  text-sm font-semibold text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listSelec?.map((just, i) => (
                                    <tr className={`text-coomeva_color-azulOscuro ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={just[idJustificacion]}>
                                        <td>
                                            <input
                                                id={`${seccion}idGasto${i}`}
                                                name={`${seccion}idGasto${i}`}
                                                type="text"
                                                defaultValue={idGasto}
                                                className={`hidden`}

                                            />
                                            <input
                                                id={`${seccion}id${i}`}
                                                name={`${seccion}id${i}`}
                                                type="text"
                                                defaultValue={just[tipoJustificacion]}
                                                className={` bg-transparent  font-semibold bg-opacity-40 w-full ml-14 outline-none h-8`}
                                                disabled={true}

                                            />
                                            <input
                                                id={`${seccion}hiddenidJustificacion${i}`}
                                                name={`${seccion}hiddenidJustificacion${i}`}
                                                type="text"
                                                defaultValue={just[tipoJustificacion]}
                                                className={` hidden`}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name={`${seccion}tarifaPlena${i}`}
                                                id={`${seccion}tarifaPlena${i}`}
                                                type="currency"
                                                className={` bg-white   rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                defaultValue={conversionPesos({ valor: dataContextJustificacion[i]?.idGasto == idGasto ? resetearPesos({ valor: dataContextJustificacion[i]?.tarifaPlena }) : just.tarifaPlena })}
                                                onBlur={(e) => handleInputChangeBlur(e, 'tarifaPlena', e.target.value, i)}
                                                autoComplete="off"
                                                disabled={just.permitirNegociar === 0 || habilitarInput}
                                                onChange={(e) => { validarNumeroInputText(e) }}
                                                onFocus={(e) => {
                                                    e.target.value = dataContextJustificacion[i]?.idGasto == idGasto ? dataContextJustificacion[i]?.tarifaPlena : just.tarifaPlena
                                                    e.target.type = "currency";
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                id={`${seccion}mesesDiferir${i}`}
                                                name={`${seccion}mesesDiferir${i}`}
                                                defaultValue={dataContextJustificacion[i]?.idGasto == idGasto ? dataContextJustificacion[i]?.mesesDiferir : just.mesesDiferir}
                                                className=' border h-8 my-[0.1rem] border-coomeva_color-azulClaro rounded-md w-full outline-none text-sm font-normal bg-transparent text-coomeva_color-azulOscuro'
                                                onBlur={(e) => handleInputChangeBlur(e, 'mesesDiferir', e.target.value, i)}
                                                disabled={habilitarInput}
                                            >
                                                <option defaultValue={"Default"}>Seleccionar</option>
                                                {
                                                    mesesDiferir?.map(mes => (
                                                        <option
                                                            value={mes.id}
                                                            key={mes.id}
                                                        >
                                                            {mes.mesesDiferir}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </form>
            </fieldset>
        </div>
    </div>
}