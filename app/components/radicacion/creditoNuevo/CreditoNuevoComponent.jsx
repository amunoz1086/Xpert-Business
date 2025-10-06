'use client'
import { conversionPesos } from '@/app/lib/utils';

import React, { useEffect, useRef, useState } from "react";

import dynamic from 'next/dynamic';
import { useProvider } from '@/app/provider/Providers';
import BtnControl from '../cliente/BtnControl';
import ModalConTasa from "../../modules/ModalConTasa";

const DynamicModal = dynamic(() => import('../../share/Modals'))
const errorModalCreditoNuevo = {
    spreadIbr: 'El porcentaje Spread IBR no puede ser mayor a 50%',
    plazoCupo: 'El plazo para cupo no puede ser mayor a 84 días',
    plazoTeso: 'El plazo para tesoreria no puede ser mayor a 18 meses',
    spreadRedescuento: 'El spread redescuento no puede ser mayor a 30%',
    cobertura: 'La cobertura FNG no puede ser mayor a 100%'
}


const CreditoNuevoComponent = ({ listaIbrs = [], listaProducto = [], rolPerfil, listaIbrNueva = [], listaRedescuento = [], listaCoberturaFng = [] }) => {


    const { creditoNuevo, updateCreditoNuevo, solicitud, estadoSolicitud, updatePathConvenio } = useProvider();

    const [isComplete, setIsComplete] = useState(false);

    const habilitarInput = (rolPerfil !== '' && rolPerfil !== 'Radicación') || (rolPerfil !== '' && rolPerfil === 'Radicación') && (estadoSolicitud !== '' && estadoSolicitud !== 3)

    const [data, setData] = useState([]);

    const [ibrsFilter, setibrsFilter] = useState([])

    const [showTasa, setShowTasa] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [messageAlert, setMessageAlert] = useState("");

    useEffect(() => {
        validarFilaCompleta();
    }, [data]);


    useEffect(() => {

        let lista = []

        listaProducto.map(item => {
            lista.push({
                comercial: item.NOMBRE,
                monto: "",
                spreadIbr: "",
                plazo: "",
                spreadRedescuento: "",
                modalidadTasa: "",
                tipoTasa:'',
                coberturaFng: "",
                Tipo_RDTO: "",
                codCupo: item.COD_TIP_PROD,
                // codTeso: "",

            })
        })

        setData(creditoNuevo.length > 0 ? creditoNuevo : lista)


    }, [])

    useEffect(() => {

        setibrsFilter(listaIbrs.filter(itemn => itemn.cod_ibr == 1 || itemn.cod_ibr == 3))


    }, [])



    const formatToPesos = (value) => {

        const partes = value.split('$');

        if (partes.length > 1 && partes[0] === '') return value


        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(value);

    };

    const removeCurrencyFormat = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    const formatToPercentage = (value) => {
        if (value === '' || isNaN(value)) return value;
        return `${parseFloat(value).toFixed(2)}%`;
    };

    const removePercentageFormat = (value) => {
        return value.replace(/[^0-9.]/g, '');
    };



    const handleInputChange = (e, field, index, formato) => {

        const value = e.target.value;

        const updatedData = [...data];

        if(field=='modalidadTasa'){
            updatedData[index]['tipoTasa']=e.target.options[e.target.selectedIndex].id
        }

        updatedData[index][field] = formato == 1 ? removeCurrencyFormat(value) : formato == 2 ? value : value

        setData(updatedData);
    };


    const validarFilaCompleta = (i) => {

        const filasIncompletas = data.some((fila) => {

            const clavesValidas = Object.keys(fila).filter(
                (clave) => clave !== 'codCupo' && clave !== 'comercial' && clave !== 'tipoTasa'
            );

            const valoresValidos = clavesValidas.map((clave) => fila[clave]);


            const tieneCamposLlenos = valoresValidos.some(
                (valor) => valor !== '' && valor !== null && valor !== undefined
            );


            const todosCamposCompletos = valoresValidos.every(
                (valor) => valor !== '' && valor !== null && valor !== undefined
            );


            return tieneCamposLlenos && !todosCamposCompletos;
        });


        setIsComplete(!filasIncompletas && creditoNuevo.length > 0);
    };



    const endModal = () => {
        setShowModal(false);
    };

    const modalTasa = () => {
        setShowTasa(true);
    };



    return (
        <div id='credito' className="overflow-x-auto w-full mx-auto">
            <table className="min-w-full bg-white border border-gray-200 text-coomeva_color-azulOscuro">
                <thead>
                    <tr className="bg-coomeva_color-grisFondo text-coomeva_color-rojo  text-sm">
                        <th className="py-3 px-4 border-b border-gray-200 ">Comercial</th>
                        <th className="py-3 px-4 border-b border-gray-200 ">Monto</th>
                        <th className="py-3 px-4 border-b border-gray-200 ">Spread IBR</th>
                        <th className="py-3 px-4 border-b border-gray-200 ">Plazo</th>
                        <th className="py-3 px-4 border-b border-gray-200 ">Modalidad Tasa</th>
                        <th className="py-3 px-4 border-b border-gray-200 ">Spread Redescuento</th>

                        <th className="py-3 px-4 border-b border-gray-200 ">Cobertura FNG</th>
                        <th className="py-3 px-4 border-b border-gray-200 ">Entidad Redescuento</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-100   text-coomeva_color-azulClaro text-sm">
                            <td className="py-2 px-4">{row.comercial}</td>
                            <td className="py-2 px-4">
                                <input
                                    name={'monto' + i}
                                    type="text"
                                    placeholder="$ 0"
                                    autoComplete='off'
                                    value={row.monto !== "" ? formatToPesos(row.monto) : ""}
                                    className="bg-white rounded-md border border-gray-300 w-full text-center outline-none h-8"
                                    onFocus={(e) => { e.target.value = removeCurrencyFormat(e.target.value); }}
                                    onBlur={(e) => {
                                        e.target.value = formatToPesos(e.target.value)
                                        updateCreditoNuevo(data)
                                    }}
                                    onChange={(e) => {

                                        handleInputChange(e, 'monto', i, 1)
                                        validarFilaCompleta(i)

                                    }}
                                    disabled={habilitarInput}
                                />
                            </td>
                            <td className="py-2 px-4">

                                <input
                                    type="text"
                                    placeholder="0.00%"
                                    name={'spreadIbr' + i}
                                  
                                    defaultValue={row.spreadIbr !== '' ? conversionPesos({ valor: row.spreadIbr, style: "percent", nDecimales: "2" }) : ''}
                                    className="bg-white rounded-md border border-gray-300 w-full text-center outline-none h-8"
                                    autoComplete='off'
                                    onFocus={(e) => { e.target.value = removePercentageFormat(e.target.value); }}
                                    onBlur={(e) => {

                                        if (parseFloat(formatToPercentage(e.target.value)) > 50) {
                                            setMessageAlert(errorModalCreditoNuevo['spreadIbr'])
                                            setShowModal(true)
                                            e.target.value = ''
                                            handleInputChange(e, 'spreadIbr', i,2)
                                        
                                        }
                                        e.target.value =e.target.value!=''? Number(row.spreadIbr / 100).toLocaleString("es-CO", {
                                            style: "percent",
                                            minimumFractionDigits: 2,
                                        }):''



                                        updateCreditoNuevo(data)
                                    }}
                                    onChange={(e) => { handleInputChange(e, 'spreadIbr', i, 2) }}
                                    disabled={habilitarInput}
                                />

                            </td>
                            <td className="py-2 px-4">
                                <input
                                    name={'plazo' + i}
                                    type="number"
                                    min="0"
                                    placeholder='0'
                                    value={row.plazo}
                                    autoComplete='off'
                                    className="bg-white rounded-md border border-gray-300 w-full text-center outline-none h-8"
                                    onChange={(e) => handleInputChange(e, 'plazo', i)}
                                    onBlur={
                                        (e) => {
                                            if (e.target.value > (row.codCupo == 44 ? 84 : 18)) {
                                                setMessageAlert(errorModalCreditoNuevo[row.codCupo == 44 ? 'plazoCupo' : 'plazoTeso'])
                                                setShowModal(true)
                                                e.target.value = ''
                                                handleInputChange(e, 'plazo', i)
                                            }
                                            updateCreditoNuevo(data)
                                        }
                                    }
                                    disabled={habilitarInput}
                                />
                            </td>
                            <td className="py-2 px-4">
                                <select
                                    name={'modalidadTasa' + i}
                                    value={row.modalidadTasa}
                                    className="bg-white rounded-md border border-gray-300 w-full text-center outline-none h-8"
                                    onChange={(e) => {
                                        handleInputChange(e, 'modalidadTasa', i)
                                        validarFilaCompleta(i)
                                    }}
                                    onBlur={() => updateCreditoNuevo(data)}
                                    disabled={habilitarInput}
                                >

                                    <option style={{ color: "grey" }} id={'1'} value={'DEFAULT'}>Seleccionar </option>
                                    {

                                        ((listaIbrNueva.filter(item => item.COD_TIP_PROD == row.codCupo)))?.map((item, i) => {


                                            return item.cod_ibr.map((codigo, i) => (

                                                <option className="outline-none text-coomeva_color-rojo bg-white" key={codigo + 'select' + i} id={codigo} value={item.valor_ibr[i]}>{item.ibr_descripcion[i]} </option>
                                            ))
                                        })
                                    }
                                   
                                </select>
                            </td>
                            <td className="py-2 px-4">
                                <input
                                    type="text"
                                    placeholder="0.00%"
                                    name={'spreadRedescuento' + i}
                                    defaultValue={row.spreadRedescuento !== '' ? conversionPesos({ valor: row.spreadRedescuento, style: "percent", nDecimales: "2" }) : ''}
                                    className="bg-white rounded-md border border-gray-300 w-full text-center outline-none h-8"
                                    autoComplete='off'
                                    onFocus={(e) => { e.target.value = removePercentageFormat(e.target.value); }}
                                    onBlur={(e) => {

                                        if (parseFloat(formatToPercentage(e.target.value)) > 30) {
                                            setMessageAlert(errorModalCreditoNuevo['spreadRedescuento'])
                                            setShowModal(true)
                                            e.target.value = ''
                                            handleInputChange(e, 'spreadRedescuento', i, 2)
                                        }


                                        if (((parseFloat(e.target.value) < 0) && (Math.abs(parseFloat(e.target.value)) > 8.50))) {
                                            setMessageAlert('El redescuento negativo debe ser inferior')
                                            setShowModal(true)
                                            e.target.value = ''
                                            handleInputChange(e, 'spreadRedescuento', i, 2)
                                        } 
                                           
                                        if ((parseFloat(e.target.value)) >= row.spreadIbr) {
                                            setMessageAlert('Spread Redescuento debe ser menor a Spread IBR')
                                            setShowModal(true)
                                            e.target.value = ''
                                            handleInputChange(e, 'spreadRedescuento', i, 2)
                                        }

                                        e.target.value =e.target.value!=''? Number(row.spreadRedescuento / 100).toLocaleString("es-CO", {
                                            style: "percent",
                                            minimumFractionDigits: 2,
                                        }):e.target.value
                                       
                                        updateCreditoNuevo(data)
                                    }}
                                    onChange={(e) => { handleInputChange(e, 'spreadRedescuento', i, 2) }}
                                    disabled={habilitarInput}
                                />

                            </td>

                            <td className="py-2 px-4">
                                <select
                                    name={'coberturaFng' + i}
                                    value={row.coberturaFng}
                                    className="bg-white rounded-md border border-gray-300 w-full text-center outline-none h-8"
                                    onChange={(e) => {
                                        handleInputChange(e, 'coberturaFng', i)
                                        validarFilaCompleta(i)
                                    }}
                                    onBlur={() => updateCreditoNuevo(data)}
                                    disabled={habilitarInput}
                                >
                                    <option style={{ color: "grey" }} id={'1'} value={'DEFAULT'}>Seleccionar </option>
                                    {
                                        listaCoberturaFng.map(item => (
                                            <option className="outline-none text-coomeva_color-rojo bg-white" key={item.codCobertura} id={item.codCobertura} value={item.valor}>{item.descripcion} </option>
                                        ))
                                    }
                                    
                                </select>
                            </td>
                            <td className="py-2 px-4">
                                <select
                                    name={'Tipo_RDTO' + i}
                                    value={row.Tipo_RDTO}
                                    className="bg-white rounded-md border border-gray-300 w-full text-center outline-none h-8"
                                    disabled={habilitarInput}
                                    onChange={
                                        (e) => {
                                            handleInputChange(e, 'Tipo_RDTO', i)
                                            validarFilaCompleta(i)
                                        }

                                    }
                                    onBlur={() => updateCreditoNuevo(data)}
                                >
                                    <option style={{ color: "grey" }} id={'1'} value={'DEFAULT'}>Seleccionar </option>
                                    {
                                        listaRedescuento.map(item => (
                                            <option key={item.cod_redescuento} id={item.cod_redescuento} value={item.cod_redescuento}>{item.descripcion} </option>
                                        ))
                                    }
                                   
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col items-end mt-10">
                <input
                    type="button"
                    value="Conversor Tasa"
                    id="submit"
                    className="bg-coomeva_color-rojo text-white w-48 text-xs py-3 mx-2  rounded-md col-span-5 col-start-5 row-start-4 peq:max-lg:hidden"
                    onClick={() => modalTasa()}
                />
                <BtnControl style={{ color: 'red' }}
                    name="Resumen Operación"
                    url={
                        isComplete ?
                            solicitud.tipoConvenio?.['convenioPago']
                                ? '/radicacion/convenioServicios'
                                : solicitud.tipoConvenio?.['convenioRecaudo']
                                    ? '/radicacion/convenioServicios/convenioRecaudo'
                                    : '/radicacion/resumen'
                            : ''
                    }
                    enableButton={isComplete}
                    opcion={'navegar'}
                />
            </div>
            {
                (showModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            }

            {showTasa ? <ModalConTasa onClick={() => setShowTasa(false)} /> : null}
        </div>
    );
};

export default CreditoNuevoComponent;






