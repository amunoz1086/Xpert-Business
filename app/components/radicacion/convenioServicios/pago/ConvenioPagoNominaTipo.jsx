'use client'

import { useEffect, useRef, useState } from "react"


const ConvenioPagoNominaTipo = ({ listPromedioNomina, listFrecuenciaNomina, updateConvenioPago, convenioPagoNominaNegociada, convenioPagoNominaTipo, setCuataManejosChip, setNumeroPagoTx, habilitarInput, listNegociarNomina, convenioPago }) => {

    const { ingresoPromedioMes, nEmpleadoCuentBancoomeva, frecuenciaPago } = convenioPagoNominaTipo
    const [formmData, setFormmData] = useState({
        ingresoPromedioMes: ingresoPromedioMes || '',
        nEmpleadoCuentBancoomeva: nEmpleadoCuentBancoomeva || '',
        frecuenciaPago: frecuenciaPago || ''
    });

    const formDataRef = useRef(formmData);

    useEffect(() => {
        formDataRef.current = formmData
    }, [formmData]);

    useEffect(() => {
        return () => {
            const data = formDataRef.current;

            (JSON.stringify(data)).length > 76 && updateConvenioPago('convenioPagoNominaTipo', data)
        };
    }, []);


    const onChangeInputNumeroEmpleado = (e) => {

        const noTx = listNegociarNomina?.DATA.findIndex(e => e.idnegociarNomina === 1102)
        const cuotaChip = listNegociarNomina?.DATA.findIndex(e => e.idnegociarNomina === 1103)
        const newList = convenioPagoNominaNegociada.length > 0 ? convenioPagoNominaNegociada : [...listNegociarNomina?.DATA.map(obj => ({ ...obj, tarifaNegociada: 0 }))];
        const { name, value } = e.target;

        if (name === 'nEmpleadoCuentBancoomeva') {

            const valorFrecuencia = (listFrecuenciaNomina.find(ex => ex.idfrecuenciaNomina == (document.getElementById('frecuenciaPago').value))?.valor || 0)

            newList[cuotaChip]['cantidad'] = value

            if (valorFrecuencia != '' && valorFrecuencia != undefined) {

                newList[noTx]['cantidad'] = parseInt(value) * valorFrecuencia

            }
        };

        setFormmData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === 'frecuenciaPago') {
            const frecuencia = listFrecuenciaNomina.find(ex => ex.idfrecuenciaNomina == (e.target.value));
            const nEmpleado = document.getElementById('nEmpleadoCuentBancoomeva').value;
            newList[noTx]['cantidad'] = parseInt(nEmpleado) * frecuencia?.valor;
        };

        updateConvenioPago('convenioPagoNominaNegociada', newList);
    };


    return (
        <form id='frmTipoNomina' className="p-1  h-full w-full relative">
            <div className=" h-8 w-[40%] bg-[#E8EAEA] z-30 absolute -mt-2 ml-8 flex border-x border-t  rounded-t-lg">
                <h1 className="m-auto text-coomeva_color-rojo text-sm font-semibold">Pago Nómina</h1>
            </div>
            <section className="flex p-4 shadow rounded-lg bg-white ">
                <table className="border-collapse  w-full border">
                    <thead>
                        <tr className="">
                            <th className="w-1/2 bg-[#E8EAEA]"></th>
                            <th className="w-1/2 py-1 text-coomeva_color-rojo  bg-[#E8EAEA] text-sm font-semibold">Tipo</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr className="">
                            <td className="pl-2 text-sm text-coomeva_color-azulClaro">Ingreso Promedio mes Nómina</td>
                            <td className="text-center">
                                <label htmlFor="ingresoPromedioMes" className="hidden">select ingreso</label>
                                <select
                                    id='ingresoPromedioMes'
                                    name='ingresoPromedioMes'
                                    className=' w-40 h-8 bg-transparent text-sm  text-coomeva_color-azulOscuro outline-none border  border-coomeva_color-azulClaro border-spacing-1 rounded-md'
                                    value={formmData.ingresoPromedioMes || ''}
                                    onChange={onChangeInputNumeroEmpleado}
                                    disabled={habilitarInput}
                                >
                                    <option disabled value={''}>Seleccionar</option>
                                    {listPromedioNomina?.map((pnomina, i) => (
                                        <option
                                            key={pnomina.idpromedioNomina}
                                            value={pnomina.idpromedioNomina}>
                                            {pnomina.tipo}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="pl-2 bg-[#E8EAEA] text-coomeva_color-azulClaro text-sm">No. Empleados Cuentas Bancoomeva</td>
                            <td className="bg-[#E8EAEA] text-center">
                                <input
                                    id='nEmpleadoCuentBancoomeva'
                                    name='nEmpleadoCuentBancoomeva'
                                    className=' w-40 text-coomeva_color-azulOscuro  outline-none border rounded-md px-2 py-1 text-sm  border-coomeva_color-azulClaro border-spacing-1 '
                                    type="number"
                                    value={formmData.nEmpleadoCuentBancoomeva}
                                    onChange={onChangeInputNumeroEmpleado}
                                    autoComplete="off"
                                    disabled={habilitarInput}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="pl-2 text-coomeva_color-azulClaro text-sm">Frecuencia Pago nómina</td>
                            <td className='text-center'>
                                <select id='frecuenciaPago'
                                    onChange={onChangeInputNumeroEmpleado}
                                    value={formmData.frecuenciaPago || ''}
                                    name='frecuenciaPago'
                                    disabled={habilitarInput}
                                    className=' w-40 h-8 bg-transparent text-sm  text-coomeva_color-azulOscuro outline-none border  border-coomeva_color-azulClaro border-spacing-1 rounded-md'>
                                    <option disabled value={''}>Seleccionar</option>
                                    {listFrecuenciaNomina?.map(frecuencia => (
                                        <option
                                            key={frecuencia.idfrecuenciaNomina}
                                            value={frecuencia.idfrecuenciaNomina}>
                                            {frecuencia.tipo}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </form>
    )


}

export default ConvenioPagoNominaTipo