'use client'

import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import { ImPlus } from "react-icons/im";
import { TbTrashXFilled } from "react-icons/tb"
import { deleteNegociarNomina } from '@/app/lib/administracion/delete';

import { insertNegociarNomina, redirecionar } from '@/app/lib/administracion/inserts';
import { formatearValor, transformaDataGuardarDB, transformarValorPuntoDecimal, validarNumeroInputText } from '@/app/lib/utils';
import { updateNegociarNomina } from "@/app/lib/administracion/update";
const DynamicModal = dynamic(() => import('../../share/Modals'));


export default function NegociarNomina({ listaNegociarNominam, listaPermitirNegociar, searchParams, filaAffectada }) {


    let [filas, setFilas] = useState(listaNegociarNominam?.DATA || []);

    const [mostrarModal, setMostrarModal] = useState(false)

    const [messageModal, setMessageModal] = useState('')



    useEffect(() => {

        searchParams === '4' && actualizarNegociarNomina()

    }, [searchParams])

    const agregarFila = (e) => {

        e.preventDefault();

        setFilas([...filas, {
            idnegociarNomina: '',
            pagoNomina: '',
            tarifaPlena: '',
            tarifaCosto: '',
            cantidad: '',
            permitirNegociar: '',
            formulaCalculo: '',
            nuevo: true
        }]);

    };

    const handleChange = (index, field, value) => {
        const nuevasFilas = [...filas];
        nuevasFilas[index][field] = value;
        setFilas(nuevasFilas);
    };

    const habilitarInputOnclick = (index) => {



        let habilitarList = [...filas]

        habilitarList[index].habilitar = true

        setFilas(habilitarList);

    }



    const eliminarFila = async (e, index, id) => {

        e.preventDefault()

        await deleteNegociarNomina({ rowsDelete: id })

        const nuevasFilas = [...filas];

        nuevasFilas.splice(index, 1)

        setFilas(nuevasFilas);

    };


    const guardarData = async () => {

        let frmData = new FormData(document.getElementById("frmnegociarNomina"));

        const formValidate = frmData.entries()

        var existData = formValidate.next().value;

        if (existData === undefined) {

            const mensaje = filaAffectada === '0' ? 'No hay campos para actualizar' : 'Actualizacion exitosa'

            setMessageModal(mensaje)

            setMostrarModal(!mostrarModal)

            redirecionar({ url: '/administracion/convenioPago' })

            return

        }

        try {

            let ordenarData = {}

            let con = 0; // Variable para identificar la primera iteración


            frmData.forEach((value, key) => {



                if (!ordenarData[key]) { ordenarData[key] = []; }

                let patron = /[a-zA-Z]/;

                patron.test(value) ? ordenarData[key].push(value) : ordenarData[key].push(formatearValor({ valor: value }));

                con++

            });


            let data = Object.values(ordenarData)





            // const response = await insertNegociarNomina({ data })


            // const mensaje = response.STATUS === 200 ? 'Registro Exitoso' : response.MESSAGE

            // setMessageModal(mensaje)

            // setMostrarModal(!mostrarModal)

            // redirecionar({ url: '/administracion/convenioPago' })

        } catch (error) {

            console.log(error)

        }




    };


    const actualizarNegociarNomina = async () => {

        let frmData = new FormData(document.getElementById("frmnegociarNomina"));

        const formValidate = frmData.entries()

        var existData = formValidate.next().value;

        if (existData === undefined) {

            const mensaje = filaAffectada === '0' ? 'No hay campos para actualizar' : 'Actualizacion exitosa'

            setMessageModal(mensaje)

            setMostrarModal(!mostrarModal)

            redirecionar({ url: '/administracion/convenioPago' })

            return

        }

        try {

            let ordenarData = {}

            let con = 0; // Variable para identificar la primera iteración


            frmData.forEach((value, key) => {



                if (!ordenarData[key]) { ordenarData[key] = []; }

                var patron = /[a-zA-Z]/;

                patron.test(value) ? ordenarData[key].push(value) : ordenarData[key].push(formatearValor({ valor: value }));

                con++

            });


            let data = Object.values(ordenarData)


            const response = JSON.parse(await updateNegociarNomina({ data }))




            const mensaje = response.STATUS === 200 ? 'Actualización Exitosa' : response.MESSAGE

            setMessageModal(mensaje)

            setMostrarModal(!mostrarModal)

            redirecionar({ url: '/administracion/convenioPago' })

        } catch (error) {

            console.log(error)

        }




    };


    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)

    }

    const formatearValorInput = (e) => {

        const valor = e.target.value

        document.getElementById(e.target.id).value = `${transformarValorPuntoDecimal({ valor: valor, cantidadDecimales: ',0' })}`

    }


    return (

        <div className="mx-auto mt-4 mb-10 max-h-60 overflow-y-auto ">

            <form id="frmnegociarNomina" >
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className='text-coomeva_color-rojo sticky z-20 top-0 left-0 right-0 text-sm  border-coomeva_color-grisClaroBordes'>
                            <th className="px-4  text-left border">Pago Nómina </th>
                            <th className="px-4  text-left border">Tarifa Plena</th>
                            <th className="px-4  text-left border">Tarifa Costo</th>
                            <th className="px-4  text-left border">Cantidad</th>
                            <th className="px-4  text-left border">Permitir Negociar</th>
                            <th className="px-4  text-left border">Fórmula Cálculo</th>
                            <th className="pl-3.5 text-left ">
                                <button
                                    onClick={agregarFila}
                                    className="text-coomeva_color-grisLetras font-bold rounded hidden"
                                    disabled={true}
                                >
                                    <ImPlus size={20} />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-sm bg-white '>
                        {filas.map((fila, index) => (
                            <tr key={index}>
                                <td className="border relative w-[25%] px-4">

                                    {fila.habilitar ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}
                                        >
                                        </div>
                                    }
                                    <input
                                        type="text"
                                        // name={`pagoNomina${index}`}
                                        name={fila.habilitar ? `pagoNomina${index}` : undefined}
                                        defaultValue={fila.pagoNomina}
                                        // onChange={(e) => handleChange(index, "pagoNomina", e.target.value)}
                                        className=' w-full'
                                        disabled={true}
                                    // required
                                    />
                                </td>
                                <td className="border relative w-[10%] px-4 ">
                                    {fila.habilitar ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}
                                        >
                                        </div>
                                    }
                                    <div className="flex items-center space-x-1">
                                        <label htmlFor={`tarifaPlenaNegociar${index}`} className="text-xs">$</label>
                                        <input
                                            id={`tarifaPlenaNegociar${index}`}
                                            type="text"
                                            // name={`pagoNomina${index}`}
                                            name={fila.habilitar ? `pagoNomina${index}` : undefined}
                                            defaultValue={transformarValorPuntoDecimal({ valor: fila.tarifaPlena, cantidadDecimales: ',0' })}
                                            // onChange={(e) => handleChange(index, "tarifaPlena", e.target.value)}
                                            // onChange={(e) => { validarNumeroInputText(e) }}
                                            onBlur={formatearValorInput}
                                            className="w-full text-end"
                                            // disabled={!fila.nuevo}
                                            // required
                                            autoComplete="off"
                                        />
                                    </div>
                                </td>
                                <td className="border relative w-[10%] px-4">
                                    {fila.habilitar ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}
                                        >
                                        </div>
                                    }
                                    <div className="flex items-center space-x-1">
                                        <label htmlFor={`tarifaCostoNegociar${index}`} className="text-xs">$</label>
                                        <input
                                            id={`tarifaCostoNegociar${index}`}
                                            type="text"
                                            // name={`pagoNomina${index}`}
                                            name={fila.habilitar ? `pagoNomina${index}` : undefined}
                                            defaultValue={transformarValorPuntoDecimal({ valor: fila.tarifaCosto, cantidadDecimales: ',0' })}
                                            // onChange={(e) => { validarNumeroInputText(e) }}
                                            onBlur={formatearValorInput}
                                            className="w-full text-end"
                                        // disabled={!fila.nuevo}
                                        // required
                                        />
                                    </div>
                                </td>
                                <td className="border relative w-[10%] px-4">
                                    {fila.habilitar ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}
                                        >
                                        </div>
                                    }
                                    <input
                                        type="number"
                                        name={fila.habilitar ? `pagoNomina${index}` : undefined}
                                        // name={`pagoNomina${index}`}
                                        defaultValue={fila.cantidad}
                                        // onChange={(e) => handleChange(index, "cantidad", e.target.value)}
                                        className="w-full text-center"
                                        // disabled={!fila.nuevo}
                                        min={0}
                                    />
                                </td>
                                <td className="border w-[14%] relative px-4 z-10 ">
                                    {fila.habilitar ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}
                                        >
                                        </div>
                                    }
                                    <select
                                        // name={`pagoNomina${index}`}
                                        name={fila.habilitar ? `pagoNomina${index}` : undefined}
                                        defaultValue={fila.permitirNegociar}
                                        // onChange={(e) => handleChange(index, "permitirNegociar", e.target.value)}
                                        className="w-full"
                                    // disabled={!fila.nuevo}
                                    >
                                        {listaPermitirNegociar?.DATA.map((option) => (
                                            <option key={option.cod_permitir} value={option.cod_permitir}>
                                                {option.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border relative px-4">


                                    {fila.habilitar ?
                                        null :
                                        <div
                                            key={index + "itemse"}
                                            className=' text-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer '
                                            onClick={() => { habilitarInputOnclick(index) }}
                                        >
                                        </div>
                                    }
                                    <input type="text"
                                        // name={`pagoNomina${index}`}
                                        name={fila.habilitar ? `pagoNomina${index}` : undefined}
                                        defaultValue={fila.formulaCalculo}
                                        // onChange={(e) => handleChange(index, "formulaCalculo", e.target.value)}
                                        className="w-full"

                                    />

                                    <input
                                        id={`id${index}`}
                                        name={fila.habilitar ? `pagoNomina${index}` : undefined}
                                        type="text"
                                        className='hidden'
                                        defaultValue={fila.idnegociarNomina}

                                    />


                                </td>
                                {/* <td className=" pr-5 flex justify-center">
                                <button
                                    onClick={(e) => { eliminarFila(e, index, fila.idnegociarNomina) }}
                                    className="text-coomeva_color-grisPestaña hidden"
                                    disabled={true}
                                >
                                    <TbTrashXFilled size={25} />
                                </button>
                            </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
            {

                mostrarModal &&
                <DynamicModal titulo={'Notificación'} mostrarModal={cerrarModal} ocultarBtnCancelar={true} mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{
                        messageModal
                    }</p>
                </DynamicModal>

            }
        </div>
    );
}
