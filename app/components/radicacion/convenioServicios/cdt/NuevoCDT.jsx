'use client'

import { CampoFecha } from "@/app/components/share/CampoFecha"
import { CampoLista } from "@/app/components/share/CampoLista"
import { CampoMoneda } from "@/app/components/share/CampoMoneda"
import { CampoMonedaDecimal } from "@/app/components/share/CampoMonedaDecimal"
import { CampoNumero } from "@/app/components/share/CampoNumero"
import { CampoNumeroParseoMilDecimal } from "@/app/components/share/CampoNumeroParseoMilDecimal"
import { CampoPorcentaje } from "@/app/components/share/CampoPorcentaje"
import { CampoTexto } from "@/app/components/share/CampoTexto"
import { fnQueryListarCDTsNuevos } from "@/app/lib/convenios/cdt/fnQueryListarCDTsNuevos"
import { fnQueryListarFormaPagoCdt } from "@/app/lib/convenios/cdt/fnQueryListarFormaPagoCdt"
import { fnQueryReinversionCdt } from "@/app/lib/convenios/cdt/fnQueryListarReinversionCdt"
import { fnQueryListarRolCdtNuevo } from "@/app/lib/convenios/cdt/fnQueryListarRolCdtNuevo"
import { formatearPesosColombianos, formatearValor, resetearPesos } from "@/app/lib/utils"
import dynamic from "next/dynamic"
import { useContext, useEffect, useRef, useState } from "react"
import { IoAddCircle } from "react-icons/io5"
import { MdArrowDropDownCircle } from "react-icons/md"
const DynamicModal = dynamic(() => import('../../../share/Modals'))


export const NuevoCDT = ({ context,listaTipoCuenta,listaTipoId }) => {

    const { cdt, updateCDT } = context()

    const [mostrarFormularioCompleto, setMostrarFormularioCompleto] = useState(false)

    const [showModal, setShowModal] = useState(false);

    const [messageAlert, setMessageAlert] = useState('');

    const [idActivo, setIdActivo] = useState('')



    useEffect(() => {
        cargarCdtNuevo()
    }, [])


    const cargarCdtNuevo = async () => {

        try {

            const cdtNuevos = JSON.parse(await fnQueryListarCDTsNuevos(JSON.stringify({ idCliente: '800070225' })))

            if (cdtNuevos.STATUS == 200) {

                const cdtNuevosConRol = await Promise.all(
                    cdtNuevos.cdtNuevos.map(async (item) => {
                      try {
                        // Consultar el rol para el ítem actual
                        const rolResponse = JSON.parse(await fnQueryListarRolCdtNuevo({codCDT:'1234'}));

                        const reinversionResponse = JSON.parse(await fnQueryReinversionCdt({codCDT:'2036'}));

                        const formaPagoResponse = JSON.parse(await fnQueryListarFormaPagoCdt({codCDT:'2036'}));

                        
                        
                        // const reinversionData = await reinversionResponse.json();

                     
                        // console.log(reinversionData)

                        console.log('rol data')
                       
                        console.log('reinversion')
                        // console.log(reinversionData)
            
                        // Crear un nuevo objeto que incluya los datos originales y el rol
                        return {
                          ...item, // Mantener todos los datos originales de cdtNuevos
                          rol: rolResponse?.reinversion, // Agregar la información del rol
                          reinvarsion:reinversionResponse?.reinversion,
                          formaPago:formaPagoResponse?.otraFormaPago
                        //   reinversion:reinversionData
                        };
                      } catch (error) {
                        console.error(`Error al obtener el rol para el ítem ${item.id}:`, error);
                        // Si hay un error, devolver el ítem con el rol como null
                        return {
                          ...item,
                          rol: null,
                        };
                      }
                    })
                  );

                  console.log('ESTE ES CDT ROL')
                  console.log(cdtNuevosConRol)
            
                updateCDT(cdtNuevosConRol)
            }

            

        } catch (error) {

        }

    }

    const expandirFormulario = ({ id }) => {

        setMostrarFormularioCompleto(!mostrarFormularioCompleto)
        setIdActivo(id)
        try {
            
            

        } catch (error) {
            
        }
    }


    const nuevoCDT = () => {

        const fecha = new Date();

        const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura 2 dígitos
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Asegura 2 dígitos
        const año = fecha.getFullYear();

        const fechaFormateada = `${año}-${mes}-${dia}`;

        if (cdt.length == 5) {
            alert('Ya supero el numero CDT permitidos')
            return
        }
        const nuevoItemCDT = {
            id: cdt.length + 1,
            nroCDT: '********',
            producto: '',
            numIdentificacion: '',
            monto: '0',
            interes: '0',
            plazoApertura: '',
            fechaVencimiento: '',
            fechaApertura: fechaFormateada,
            tipoTasa: '',
            tasaBase: '',
            spread: '',
            formaPago: '',
            frecuenciaPago: '',
            origenFondo: '',
            razonApertura: '',
            tipoTitulo: '',
            tipoIdT: '',
            tipoIdF: '',
            identificacionT: '',
            identificacionF: '',
            nombreT: '',
            nombreF: '',
            tipoCuentaT: '',
            tipoCuentaF: '',
            monto1: '',
            monto2: '74000000',
            saldoFavor1: '100000',
            saldoFavor2: '92700000',
            adicion1: '0',
            adicion2: '0',
            faltantes: '0',
            valorEfectivo: '0',
            valorChequeOtrosBanco: '0',
            valorDebito: '0',
            nuevo: true,
            guardar: false
        }
        updateCDT([...cdt, nuevoItemCDT]);
    };



    const onChangeInput = (e) => {

        const { name, value } = e.target;

        const [nameCampo, index] = name.split('-');



        const posItem = parseInt(index, 10);

        const dataCtds = [...cdt];

        if (nameCampo == 'adicion1' && (parseInt(value) > dataCtds[posItem].saldoFavor1)) {
            setMessageAlert('El valor maximo permitido es: ' + dataCtds[posItem].saldoFavor1)
            setShowModal(true)
            return
        }

        if (nameCampo == 'adicion2' && (parseInt(value) > dataCtds[posItem].saldoFavor2)) {
            setMessageAlert('El valor maximo permitido es: ' + dataCtds[posItem].saldoFavor2)
            setShowModal(true)
            return
        }



        dataCtds[posItem] = {
            ...cdt[posItem],
            [nameCampo]: value,
            ['faltantes']: (nameCampo == 'adicion1' || nameCampo == 'adicion2' || 'valorEfectivo' || 'valorChequeOtrosBanco' || 'valorDebito') ? (parseInt(dataCtds[posItem].adicion1) + parseInt(dataCtds[posItem].adicion2) + parseInt(dataCtds[posItem].valorEfectivo) + parseInt(dataCtds[posItem].valorChequeOtrosBanco) + parseInt(dataCtds[posItem].valorDebito)) - parseInt(dataCtds[posItem].monto) + '' : dataCtds[posItem].interes

        };

        // if(nameCampo=='adicion1'||nameCampo=='adicion2'){
        //     dataCtds[posItem] = {
        //         ...listaCDT[posItem],

        //         ['faltantes']:( parseInt(dataCtds[posItem].adicion1)+parseInt(dataCtds[posItem].adicion2)+parseInt(dataCtds[posItem].valorEfectivo)+parseInt(dataCtds[posItem].valorChequeOtrosBanco)+parseInt(dataCtds[posItem].valorDebito))-parseInt(dataCtds[posItem].monto)
        //     };

        // }


        updateCDT(dataCtds);

    }


    const validarMonto = (monto, producto) => {
        // Definir los límites de monto según el producto
        const limites = {
            "1": { min: 300000, max: 50000000000 },
            "2": { min: 300000, max: 50000000000 },
            "3": { min: 300000, max: 50000000000 },
            "4": { min: 100000, max: 50000000000 },
            "5": { min: 100000, max: 50000000000 },
            "6": { min: 100000, max: 50000000000 },
            "6": { min: 100000, max: 50000000000 },
        };



        // Obtener los límites para el producto seleccionado
        const { min, max } = limites[producto] || { min: 0, max: 0 };

        // Validar el monto
        if (monto < min) {
            return `El monto mínimo para ${producto} es ${min.toLocaleString()}`;
        }
        if (monto > max) {
            return `El monto máximo para ${producto} es ${max.toLocaleString()}`;
        }
        return null; // Si el monto es válido, retornar null
    };


    const validarPlazo = (plazo, producto) => {

        console.log(producto)
        // Definir los límites de plazo según el producto
        const limitePlazo = {
            "1": { min: 30, max: 1800, multiplos: false, descripcion: 'CDT vencido' },
            "2": { min: 30, max: 1800, multiplos: false, descripcion: 'CDT Fondo de liquidez' },
            "3": { min: 7, max: 29, multiplos: false, descripcion: 'CDT Flexirenta' },
            "4": { min: 90, max: 1800, multiplos: true, descripcion: 'CDT Tasa variable IBR 1M' },
            "5": { min: 90, max: 1800, multiplos: true, descripcion: 'CDT Tasa variable IBR 2M' },
            "6": { min: 90, max: 1800, multiplos: true, descripcion: 'CDT Tasa variable IBR 3M' },
            "7": { min: 90, max: 1800, multiplos: true, descripcion: 'CDT Tasa variable IPC 3M' }
        };

        // Obtener los límites para el producto seleccionado
        const { min, max, multiplos, descripcion } = limitePlazo[producto] || {};

        if (!min || !max) {
            return 'Producto no válido para la validación de plazo.';
        }

        // Validar el plazo
        if (plazo < min) {
            return `El plazo mínimo para ${descripcion} es de ${min} días.`;
        }
        if (plazo > max) {
            return `El plazo máximo para ${descripcion} es de ${max} días.`;
        }
        if (multiplos && plazo % 30 !== 0) {
            return `El plazo para ${descripcion} solo permite múltiplos de 30. Ejemplo: 90, 120, 150 días.`;
        }




        return null; // Si el plazo es válido, retornar null
    };



    const handleBlur = (e) => {
        const { name, value } = e.target;

        const [nameCampo, index] = name.split('-');



        const posItem = parseInt(index, 10);

        if (isNaN(formatearValor({ valor: value }))) {
            setMessageAlert('El monto debe ser un número válido');
            setShowModal(true)
            return;
        }

        const mensajeError = nameCampo == 'monto' ? validarMonto(formatearValor({ valor: value }), cdt[posItem].producto) : validarPlazo(formatearValor({ valor: value }), cdt[posItem].producto);

        if (mensajeError) {

            setMessageAlert(mensajeError);
            setShowModal(true)
        } else {
            setMessageAlert('');
        }
    };

    const endModal = () => {

        setShowModal(false);

    }

    const guardarCDT = (posItem) => {

        const dataCtds = [...cdt];


        dataCtds[posItem] = {
            ...cdt[posItem],
            ['nuevo']: false,
            ['guardar']: true

        };


        updateCDT(dataCtds);
        setMostrarFormularioCompleto(false)


    }

    const cancelarCDT = (posItem) => {

        const dataCtds = [...cdt];

        const itemCdt = dataCtds[posItem]

        updateCDT(dataCtds.filter(e => e.id != itemCdt.id));
        setMostrarFormularioCompleto(false)


    }



    const filtrarTiposTitulo = (productoId) => {
        const tiposTitulo = [
            { id: 1, descripcion: 'Físico' },
            { id: 2, descripcion: 'Desmaterializado' },
        ];


        if ([1, 2].includes(parseInt(productoId))) {
            return tiposTitulo;
        }
        if (productoId == 3) {
            return tiposTitulo.filter(t => t.id == 1);
        }
        if ([4, 5, 6, 7].includes(parseInt(productoId))) {
            return tiposTitulo.filter(t => t.id == 2);
        }

        return tiposTitulo


    }


    const calcularFechaVencimiento = (fechaApertura, plazoDias) => {
        const fechaVencimiento = new Date(fechaApertura);
        fechaVencimiento.setDate(fechaVencimiento.getDate() + plazoDias);
        return fechaVencimiento;
    }

    console.log(cdt)

    return (
        <>
            <div onClick={nuevoCDT} className=" cursor-pointer mx-14 mb-8 flex rounded-md  w-40  h-8 gap-4 justify-center items-center bg-coomeva_color-rojo text-white">
                <button className=" text-xs" >Agregar CDT </button>
                <IoAddCircle />
            </div>

            <div className="mx-14">
                <h3 className="text-gray-500 mb-5 ">01. Datos del producto</h3>
            </div>

            <div className={` overflow-scroll bg-white `}>
                {
                    cdt.map((item, i) => (


                        <div key={item.id + 'iten'} className="w-full">

                            <div className={`w-full ${mostrarFormularioCompleto && idActivo == 1 ? 'overflow-x-scroll' : undefined}   py-3  bg-white rounded-lg  p-4`}>

                                <div className=''>
                                    <table className='table-fixed w-full '>
                                        <thead className="bg-coomeva_color-grisPestaña2 ">
                                            <tr className={`text-coomeva_color-rojo ${i == 0 ? 'h-10' : 'text-[0.1px]'} `}>
                                                <th className='w-10 text-center'></th>
                                                <th className='w-28 text-center'></th>
                                                <th className='w-28 text-center'>Nro. CDT</th>
                                                <th className='w-44 '>Producto</th>
                                                {/* <th className='w-44'>No. Identificación</th> */}
                                                <th className='w-44'>Monto</th>
                                                <th className='w-44'>Interés</th>
                                                <th className='w-44'>Plazo Apertura</th>

                                                <th className='w-44'>Fecha Apertura</th>
                                                <th className='w-44'>Fecha de Vencimiento</th>
                                                <th className='w-44'>Tipo de tasa</th>
                                                <th className='w-44'>Tasa Base</th>
                                                <th className='w-44'>Spread</th>
                                                <th className='w-44'>Forma de Pago Interés</th>
                                                <th className='w-44'>Frecuencia de pago</th>
                                                <th className='w-44'>Origen de Fondos</th>
                                                <th className='w-44'>Razón de Apertura</th>
                                                <th className='w-44'>Tipo de Título</th>


                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr className=''>
                                                <td className="w-10">
                                                    <MdArrowDropDownCircle onClick={() => { expandirFormulario({ id: item.id }) }} className="text-coomeva_color-rojo" />

                                                </td>
                                                <td className='w-28  py-2 px-[30px] ' >
                                                    <p className="border-b">{i + 1}</p>
                                                </td>

                                                <td className='w-28  py-2 px-[30px] ' >
                                                    {/* <CampoMoneda
                                                        fontSize="text-md"
                                                        textColor="text-coomeva_color-azulClaro"
                                                        borderColor="border-coomeva_color-azulClaro"
                                                        valorInput="10000"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                    /> */}

                                                    <p className="border-b">{item.codCDT}</p>
                                                </td>
                                                <td className='w-44   px-[30px] text-center text-gray-400'>
                                                    <CampoLista
                                                        fontSize="text-sm"
                                                        lista={[
                                                            { id: 1, descripcion: 'CDT vencido' },
                                                            { id: 2, descripcion: 'CDT Fondo de liquidez' },
                                                            { id: 3, descripcion: 'CDT Flexirenta' },
                                                            { id: 4, descripcion: 'CDT Tasa variable IBR 1M ' },
                                                            { id: 5, descripcion: 'CDT Tasa variable IBR 2M' },
                                                            { id: 6, descripcion: 'CDT Tasa variable IBR 3M' },
                                                            { id: 7, descripcion: 'CDT Tasa variable IPC 3M' },

                                                        ]}
                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.producto}
                                                        nameInput={"producto-" + i}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoMoneda
                                                        fontSize="text-md"
                                                        textColor="text-coomeva_color-azulClaro"
                                                        borderColor="border-coomeva_color-azulClaro"
                                                        onBlurInput={handleBlur}
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.monto + ''}
                                                        nameInput={"monto-" + i}
                                                    />
                                                </td>
                                                <td className='w-44 py-2  px-[30px]'>
                                                    <CampoMoneda
                                                        fontSize="text-md"
                                                        textColor="text-coomeva_color-azulClaro"
                                                        borderColor="border-coomeva_color-azulClaro"

                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false, estado: true }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.interes + ''}
                                                        nameInput={"interes-" + i}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoNumero
                                                        fontSize="text-md"
                                                        textColor="text-coomeva_color-azulClaro"
                                                        borderColor="border-coomeva_color-azulClaro"

                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.plazoApertura}
                                                        nameInput={"plazoApertura-" + i}
                                                        onBlurInput={handleBlur}
                                                    /></td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoFecha
                                                        fontSize="text-md"
                                                        textColor="text-coomeva_color-azulClaro"
                                                        borderColor="border-coomeva_color-azulClaro"

                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.fechaApertura}
                                                        nameInput={"fechaApertura-" + i}
                                                    /></td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoFecha
                                                        fontSize="text-md"
                                                        textColor="text-coomeva_color-azulClaro"
                                                        borderColor="border-coomeva_color-azulClaro"

                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.fechaVencimiento}
                                                        nameInput={"fechaVencimiento-" + i}

                                                    /></td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoLista
                                                        fontSize="text-sm"
                                                        lista={item.producto == '' ? [{ id: 1, descripcion: 'Fija' }, { id: 2, descripcion: 'Variable' }] : ['1', '2', ' 3'].includes(item.producto) ? [{ id: 1, descripcion: 'Fija' }] : [{ id: 2, descripcion: 'Variable' }]}
                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.tipoTasa}
                                                        nameInput={"tipoTasa-" + i}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoPorcentaje

                                                        fontSize="text-sm"

                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{
                                                            requerido: false,
                                                            estado: !(['1', '2', '3'].includes(item.producto))
                                                        }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.tasaBase}
                                                        nameInput={"tasaBase-" + i}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoPorcentaje
                                                        fontSize="text-sm"

                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false, estado: !(['4', '5', '6', '7'].includes(item.producto)) }}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoLista
                                                        fontSize="text-sm"
                                                        lista={(item.plazoApertura % 30 === 0) ? [{ id: 1, descripcion: 'Periódica' }, { id: 2, descripcion: 'Vencimiento' }] : [{ id: 1, descripcion: 'Periódica' }, { id: 2, descripcion: 'Vencimiento' }].filter(fp => fp.id === 2)}
                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.formaPago}
                                                        nameInput={"formaPago-" + i}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoLista
                                                        fontSize="text-sm"
                                                        lista={[{ id: 1, descripcion: 'Mensual' }, { id: 2, descripcion: 'Bimensual' }, { id: 3, descripcion: 'Trimestral' }, { id: 4, descripcion: 'Semestral' }, , { id: 4, descripcion: 'Anual' }]}
                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false, estado: item.formaPago != '1' }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.frecuenciaPago}
                                                        nameInput={"frecuenciaPago-" + i}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoLista
                                                        fontSize="text-sm"
                                                        lista={[{ id: 1, descripcion: 'Actividad económica' }, { id: 2, descripcion: 'Ahorros' }, { id: 3, descripcion: 'Capital de trabajo' }]}
                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.origenFondo}
                                                        nameInput={"origenFondo-" + i}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoLista
                                                        fontSize="text-sm"
                                                        lista={[{ id: 1, descripcion: 'Ahorros' }, { id: 2, descripcion: 'Garantía de Crédito' }, { id: 3, descripcion: 'Inversión' }, , { id: 4, descripcion: 'Otro' }]}
                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.razonApertura}
                                                        nameInput={"razonApertura-" + i}
                                                    />
                                                </td>
                                                <td className='w-44  py-2 px-[30px]'>
                                                    <CampoLista
                                                        fontSize="text-sm"
                                                        lista={filtrarTiposTitulo(item.producto)}
                                                        descripcionList="descripcion"
                                                        idLista="id"
                                                        placeholder=""
                                                        validacionRequeridoEditable={{ requerido: false }}
                                                        onChangeInput={onChangeInput}
                                                        valorInput={item.tipoTitulo}
                                                        nameInput={"tipoTitulo-" + i}
                                                    />
                                                </td>


                                            </tr>




                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            {
                                mostrarFormularioCompleto && idActivo == item.id ?
                                    <div className="w-full bg-white rounded-lg shadow-sm pt-8 p-4">
                                        <div className=''>
                                            <table className='table-fixed w-full '>
                                                <thead className="bg-coomeva_color-grisPestaña2">
                                                    <tr className='text-coomeva_color-rojo  h-10 '>
                                                        <th className='w-28 text-center'>Rol</th>
                                                        <th className='w-44 '>Tipo ID</th>
                                                        <th className='w-44'>No. Identificación</th>
                                                        <th className='w-44'>Nombre empresa o Persona Natural</th>
                                                        <th className='w-44'>Tipo de cuenta</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className=''>
                                                        <td className='w-28  py-2 px-[30px] ' >
                                                            {/* <CampoMoneda
                                                                fontSize="text-md"

                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"
                                                                valorInput="10000"
                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                            /> */}
                                                            Titular
                                                        </td>

{/*codCDT:"1234"
codRol:"1"
codTipoCuenta:"1"
nIdentificacion:"5678901124"
nombreEmpresa:"Ana Lopez"
tipoId:"1"*/}
                                                        <td className='w-44  py-2 px-[30px] text-center text-gray-400'>
                                                            <CampoLista
                                                                placeholder=""
                                                                fontSize="text-md"
                                                                lista={listaTipoId}
                                                                descripcionList="descripcion"
                                                                idLista="codLista:"
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.rol?item.rol[0]?.tipoId:item.tipoIdT}
                                                                nameInput={"tipoIdT-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            <CampoNumero
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.rol?item.rol[0]?.nIdentificacion:item.identificacionT}
                                                                nameInput={"identificacionT-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            <CampoTexto
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.rol?item.rol[0]?.nombreEmpresa:item.nombreT}
                                                                nameInput={"nombreT-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                        <CampoLista
                                                                placeholder=""
                                                                fontSize="text-md"
                                                                lista={listaTipoCuenta}
                                                                descripcionList="descripcion"
                                                                idLista="codLista:"
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.rol?item.rol[0]?.codTipoCuenta:item.tipoIdT}
                                                                nameInput={"tipoIdT-" + i}
                                                            />
                                                             {/* <CampoMoneda
                                                            fontSize="text-md"
                                                            textColor="text-coomeva_color-azulClaro"
                                                            borderColor="border-coomeva_color-azulClaro"

                                                            placeholder=""
                                                            validacionRequeridoEditable={{ requerido: false }}
                                                            onChangeInput={onChangeInput}
                                                            valorInput={item.tipoCuentaF}
                                                            nameInput={"tipoCuentaF-" + i}
                                                        /> */}
                                                        </td>


                                                    </tr>
                                                    <tr className='text-left'>
                                                        <td className='w-28  py-2 px-[30px] ' >
                                                            {/* <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"
                                                                valorInput="10000"
                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                            /> */}
                                                            Firmante
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px] text-center text-gray-400'>
                                                            <CampoLista
                                                                placeholder=""
                                                                fontSize="text-md"
                                                                lista={listaTipoId}
                                                                descripcionList="descripcion"
                                                                idLista="codLista:"
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.rol?item.rol[1]?.tipoId:item.tipoIdF}
                                                                nameInput={"tipoIdF-" + i}

                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            <CampoNumero
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.rol?item.rol[1]?.nIdentificacion:item.identificacionF}
                                                                nameInput={"identificacionF-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            <CampoTexto
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.rol?item.rol[1]?.nombreEmpresa:item.nombreF}
                                                                nameInput={"nombreF-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>

                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex gap-4 mt-24">
                                            <p>Nro. CDT</p>
                                            <div>
                                                <input type="text" placeholder="123456789" />
                                                <hr />
                                            </div>
                                        </div>
                                        <div className=' mt-8'>
                                            <table className='table-fixed w-full '>
                                                <thead className="bg-coomeva_color-grisPestaña2">
                                                    <tr className='text-coomeva_color-rojo  h-10 '>
                                                        <th className='w-28 text-center'>Monto</th>
                                                        <th className='w-44 '>01: Reinversión</th>
                                                        <th className='w-44'>Saldo a favor</th>
                                                        <th className='w-44'>Utilización</th>
                                                        <th className='w-44'>Faltantes</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className=''>
                                                        <td className='w-28  py-2 px-[30px] ' >
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.reinvarsion?item.reinvarsion[0]?.monto+'':item.monto1}
                                                                nameInput={"monto1-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px] text-center text-gray-400'>{item.reinvarsion?item.reinvarsion[0].reinversion:'Reinversion'}</td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false, estado: true }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.reinvarsion?item.reinvarsion[0]?.saldoFavor+'':item.saldoFavor1}
                                                                nameInput={"saldoFavor1-" + i}
                                                                valorMaximo={item.saldoFavor1}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.reinvarsion?item.reinvarsion[0]?.adicion+'':item.adicion1}
                                                                nameInput={"adicion1-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'> <CampoMoneda
                                                            fontSize="text-md"
                                                            textColor="text-coomeva_color-azulClaro"
                                                            borderColor="border-coomeva_color-azulClaro"

                                                            placeholder=""
                                                            validacionRequeridoEditable={{ requerido: false }}
                                                            onChangeInput={onChangeInput}
                                                            valorInput={item.faltantes}
                                                            nameInput={"faltantes-" + i}
                                                        /></td>


                                                    </tr>
                                                    <tr className='text-left'>
                                                        <td className='w-28  py-2 px-[30px] ' >
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.reinvarsion?item.reinvarsion[1]?.monto+'':item.monto2}
                                                                nameInput={"monto2-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px] text-center text-gray-400'>{item.reinvarsion?item.reinvarsion[1].reinversion:'Reinversion'}</td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false, estado: true }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.reinvarsion?item.reinvarsion[1]?.saldoFavor+'':item.saldoFavor2}
                                                                nameInput={"saldoFavor2-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.reinvarsion?item.reinvarsion[1]?.adicion+'':item.adicion2}
                                                                nameInput={"adicion2-" + i}
                                                            />
                                                        </td>
                                                        <td className='w-44  py-2 px-[30px]'>
                                                            {/* <CampoMoneda
      textColor="text-coomeva_color-azulClaro"
      borderColor="border-coomeva_color-azulClaro"
      valorInput="0"
      placeholder=""
      validacionRequeridoEditable={{ requerido: false }}
    /> */}
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className=' mt-14 mb-16'>
                                            <table className='table-fixed w-full '>
                                                <thead className="bg-coomeva_color-grisPestaña2">
                                                    <tr className='text-coomeva_color-rojo text-center h-10'>
                                                        <th className='w-[50%]'>02: Otras Formas de Pago</th>
                                                        <th className='w-[50%]'>Valor pagado</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='text-center'>
                                                        <td className='px-36  py-2 ' >
                                                            <CampoTexto
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"
                                                                valorInput="Efectivo"
                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                            />
                                                        </td>
                                                        <td className='px-36  py-2'>
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.formaPago?item.formaPago[0]?.valor+'':item.valorEfectivo}
                                                                nameInput={"valorEfectivo-" + i}
                                                            />
                                                        </td>




                                                    </tr>
                                                    <tr className='text-center'>
                                                        <td className='px-36  py-2 ' >
                                                            <CampoTexto
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"
                                                                valorInput="Cheque otros bancos"
                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                            />
                                                        </td>
                                                        <td className='px-36  py-2'>
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.formaPago?item.formaPago[1]?.valor+'':item.valorChequeOtrosBanco}
                                                                nameInput={"valorChequeOtrosBanco-" + i}
                                                            />
                                                        </td>


                                                    </tr>

                                                    <tr>
                                                        <td className="px-36 ">
                                                            <CampoLista
                                                                fontSize="text-md"
                                                                lista={[{ id: 1, descripcion: 'Debito' }, { id: 2, descripcion: 'opcion 2' }]}
                                                                descripcionList="descripcion"
                                                                idLista="id"
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                placeholder=""
                                                            />
                                                        </td>
                                                        <td className="px-36 ">
                                                            <CampoMoneda
                                                                fontSize="text-md"
                                                                textColor="text-coomeva_color-azulClaro"
                                                                borderColor="border-coomeva_color-azulClaro"

                                                                placeholder=""
                                                                validacionRequeridoEditable={{ requerido: false }}
                                                                onChangeInput={onChangeInput}
                                                                valorInput={item.formaPago?item.formaPago[2]?.valor+'':item.valorDebito}
                                                                nameInput={"valorDebito-" + i}
                                                            />
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        {
                                            (item.nuevo = true && item.guardar == false) ?
                                                <div className="flex gap-4 justify-end">
                                                    <button onClick={() => { cancelarCDT(i) }} className="bg-coomeva_color-rojo  rounded-md w-40 h-8 text-white text-xs">Cancelar</button>
                                                    <button onClick={() => { guardarCDT(i) }} className="border border-gray-500 w-40 h-8 rounded-md text-gray-500">Aceptar</button>
                                                </div> : undefined
                                        }



                                    </div>
                                    :
                                    undefined
                            }

                        </div>




                    ))
                }

            </div>

            {
                (showModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} cerrarModal={endModal} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            }
        </>

    )
}
