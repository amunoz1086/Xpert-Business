'use client'

import { dataFormularioOrdenada } from '@/app/lib/utils'

import {  useEffect, useRef, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

const headtable2 = ['Nit', 'Cuenta']

const tablaBody = [
    {
        id: 1,
        nit: '',
        cuenta: '',
    },
    {
        id: 2,
        nit: '',
        cuenta: '',
    },
    {
        id: 3,
        nit: "",
        cuenta: "",
    },
    {
        id: 4,
        nit: "",
        cuenta: "",
    },
    {
        id: 5,
        nit: "",
        cuenta: "",
    },
]


const DepositoCuentasPlan = ({ habilitarInput, rolActivo,context }) => {


    const { updateDepositoVista, depositoVista, estadoSolicitud } = context()
    
    const habilitarInputRol=habilitarInput|| (rolActivo !=='' && rolActivo===2)&& (estadoSolicitud!==''&&estadoSolicitud!==3)

    const [filas, setFilas] = useState(tablaBody)


    const onKeyAgregarFilaEnter = (e) => {

        if (e.key === 'Enter') {
            setFilas([...filas, ...[{
                id: filas.length,
                nit: "",
                cuenta: "",
            }]])
        }

    }

    const formRef = useRef(null)

    const [otrosCampos, setOtrosCampos] = useState([]);

    useEffect(() => {


        const currenForm = formRef.current

        if (currenForm && otrosCampos.length >0) {

            const formData = new FormData(formRef.current);

            const data = dataFormularioOrdenada({ formularioRef: formData })

            updateDepositoVista('cuentasPlan', data)

        }


    }, [otrosCampos])

    const handleInputChange = (i, campo, valor) => {

        const nuevosOtrosCampos = [...otrosCampos];

        nuevosOtrosCampos[i] = { ...nuevosOtrosCampos[i], [campo]: valor };

        setOtrosCampos(nuevosOtrosCampos);

    };

    return (
        <div className="mt-2">

            <p className='text-base text-coomeva_color-rojo font-roboto font-medium text-left mb-1'>3. Seleccione las cuentas de Plan (Opcional)</p>
            <div className="flex space-x-1 my-4 items-center border border-coomeva_color-rojo rounded-[22px] p-2  mb-4">
                <div>
                    <FiAlertCircle className='text-coomeva_color-rojo w-12 h-12' />
                </div>
                <p className='leading-normal text-sm text-coomeva_color-rojo'>
                    Puede digitar las cuentas en este paso o digitarlas después
                    de llevarse a cabo el proceso de aprobación en el formato
                    de Especificaciones del Contrato
                </p>
            </div>
            <div className="p-1  h-full w-full relative ">
                <div className="container w-full">
                    <fieldset className="border bg-white shadow-md rounded-md w-full">
                        <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
                            <h2 className="text-transparent mt-4 w-60 text-center">Solícitud</h2>
                        </legend>
                        <form ref={formRef} id='formPlanDeposito' className='overflow-x-auto overflow-y-scroll h-[15rem]'>
                            <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                                <thead className="bg-coomeva_color-grisPestaña2 sticky top-0 ">
                                    <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                        {headtable2.map((head, i) => (
                                            <th className={`align-bottom text-start px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={head} >{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filas?.map((servicio, i) => (
                                            <tr className={`text-[#002E49] ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.id}>
                                                <td>
                                                    <input
                                                        name={`nit${i}`}
                                                        id={`nit${i}`}
                                                        onKeyUp={onKeyAgregarFilaEnter}
                                                        type="text"
                                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                        value={otrosCampos[i]?.nit || depositoVista.cuentasPlan[i]?.nit || ''}
                                                        onChange={(e) => handleInputChange(i, 'nit', e.target.value)}
                                                        disabled={habilitarInputRol}
                                                        autoComplete='off'
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^\d.]/g, '');
                                                          }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name={`cuenta${i}`}
                                                        id={`cuenta${i}`}
                                                        onKeyUp={onKeyAgregarFilaEnter}
                                                        type="text"
                                                        className={` bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25 w-full  text-center outline-none h-8`}
                                                        value={otrosCampos[i]?.cuenta || depositoVista.cuentasPlan[i]?.cuenta || ''}
                                                        onChange={(e) => handleInputChange(i, 'cuenta', e.target.value)}
                                                        disabled={habilitarInputRol}
                                                        autoComplete='off'
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^\d.]/g, '');
                                                          }}
                                                    />

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
        </div>
    )
}

export default DepositoCuentasPlan