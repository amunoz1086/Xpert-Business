'use client'

import ListaSelect from "../../share/ListaSelect";
import InputClientPerfil from "./InputClientPerfil";
import { conversionPesos, formatearValor, validarNumeroInputText } from "@/app/lib/utils";
import { usePerfil } from "@/app/hooks/usePerfil";
import { useEffect, useRef, useState } from "react";


export default function FormPerfil({ rolActivo, regionals, oficinas, vinculo, tipoContrato, listTipoClient, sectors, estadoBanco, listEstadoCoomeva, asociadoCoomeva }) {

    const { cliente, updateDataCliente, editar, estadoSolicitud } = usePerfil()

    const [antiguedaAsociado, setAntiguedaAsociado] = useState('')

    const [actualizarComponente, setActualizarComponente] = useState('')

    const [antigueda, setAntigueda] = useState(false)

    const [listaOficinas, setListaOficinas] = useState(oficinas)

    const habilitarInput = (rolActivo !== '' && rolActivo !== 2) || (rolActivo !== '' && rolActivo === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3)

    let oficina = cliente?.oficina && oficinas?.find(off => off.COD_OFICINA == cliente.oficina)

    cliente["regional"] = cliente?.regional || oficina?.REGIONAL

    const buscarRegional = (regionals?.find(a => a.COD_REGIONAL_RAD == (cliente?.regional || oficina?.REGIONAL)))

    cliente["nombreRegional"] = buscarRegional !== undefined ? buscarRegional?.REGIONAL_RAD : ''

    const inputRef = useRef(null);

    const onChangeAsociado = (e) => {

        document.getElementById(e.target.id).value = e.target.value

        cliente[(e.target.id).split('.')[1]] = parseInt(e.target.value)

        cliente["antiguedad_coo"] = e.target.value !== '1' ? '0' : cliente?.antiguedad_coo || ''

        let campo = {}

        const nombreCampo = (e.target.id).split('.')[1]

        campo[((e.target.id).split('.'))[1]] = (nombreCampo == 'activos' || nombreCampo == 'ingreso' || nombreCampo == 'ventas_an') ? formatearValor({ valor: e.target.value }) : e.target.value

        const dataActualizar = { ...cliente, ...campo }

        updateDataCliente(dataActualizar)

        setAntiguedaAsociado(e.target.value !== '1' ? '0' : cliente?.antiguedad_coo || '')

        setActualizarComponente(e.target.value)

        document.getElementById("idAntiguedad_coo.antiguedad_coo").value = e.target.value !== '1' ? '0' : cliente?.antiguedad_coo || ''

        setAntigueda(e.target.value !== '1')

    }

    useEffect(() => {

        if (cliente["antiguedad_coo"] == undefined) setAntiguedaAsociado('')

    }, [cliente["antiguedad_coo"]])


    const onChangeAsingarValor = (e) => {

        const { id, value } = e.target

        let campo = {}

        const nombreCampo = (id).split('.')[1]

        if (nombreCampo === 'regional') {

            const oficinasFiltrada = oficinas.filter(o => o.REGIONAL == e.target.value)

            setListaOficinas(oficinasFiltrada)

        }


        campo[((id).split('.'))[1]] = (nombreCampo == 'activos' || nombreCampo == 'ingreso' || nombreCampo == 'ventas_an') ? formatearValor({ valor: value }) : value


        const dataActualizar = { ...cliente, ...campo }

        updateDataCliente(dataActualizar)

        // document.getElementById(e.target.id).value =( nombreCampo === 'activos' || nombreCampo ==='ingreso'||nombreCampo=== 'ventas_an') && value !=='' ? conversionPesos({valor:value}) : value

        setActualizarComponente(e.target.value)

    }


    const onBlur = (e) => {


        // const {id,value} =e.target

        // const nombreCampo =(id).split('.')[1]

        // document.getElementById(e.target.id).value =( nombreCampo === 'activos' || nombreCampo ==='ingreso'||nombreCampo=== 'ventas_an') && value !=='' ? conversionPesos({valor:value}) : value

    }

    useEffect(() => {
        if (inputRef.current) {

            (cliente?.nuevoCliente == true || editar == true) && inputRef.current.focus(); // Asigna el enfoque cuando el componente se monta
        }
    }, [cliente?.nuevoCliente, editar])


    return (
        <form id='frmPerfil' className='flex justify-around w-full'>
            <div className='w-full'>
                <InputClientPerfil
                    descripcion={"Cliente"}
                    id={"idCliente"}
                    name={'cliente'}
                    bgFila={1}
                    value={cliente?.cliente || ''}
                    inhabilitarInput={(cliente?.cliente && cliente?.nuevoCliente !== true && editar !== true) || habilitarInput}
                    nuevoCliente={cliente?.nuevoCliente || cliente?.cliente}
                    onChangeInput={onChangeAsingarValor}
                    inputRef={inputRef}
                />
                {
                    <ListaSelect
                        descripcion={"Regional"}
                        classTitle={"text-coomeva_color-rojo ml-4 text-sm w-[25%] font-bold"}

                        id={"COD_REGIONAL_RAD"}
                        valor={'REGIONAL_RAD'}
                        name={'regional'}
                        color={1}
                        lista={regionals}
                        // onchangeSelect={onChangeSelect}
                        onchangeSelect={onChangeAsingarValor}

                        defaultValue={cliente?.regional || oficina?.REGIONAL}
                        inhabilitarSelect={(cliente?.regional && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                        mostrarLista={cliente?.regional || cliente?.nuevoCliente}
                    />
                }

                <ListaSelect
                    descripcion={"Coomeva"}
                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%]  text-sm font-bold"}
                    id={"COD_ASOC"}
                    valor={"ASOC"}
                    name={'coomeva'}
                    lista={asociadoCoomeva}
                    onchangeSelect={onChangeAsociado}
                    inhabilitarSelect={(cliente?.coomeva && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    defaultValue={cliente?.coomeva}
                    mostrarLista={cliente?.coomeva || cliente?.nuevoCliente || editar === true}
                />

                <InputClientPerfil
                    descripcion={"Antigüedad Coomeva (meses)"}
                    id={"idAntiguedad_coo"}
                    name={"antiguedad_coo"}
                    // value={isAsoc !== "1" ? 0 : ''}
                    value={cliente?.antiguedad_coo || ''}
                    inhabilitarInput={(cliente?.antiguedad_coo && cliente?.nuevoCliente !== true && editar !== true || antigueda == true) || habilitarInput}
                    onChangeInput={onChangeAsingarValor}
                    // onChangeValidacion={(e) => { validarNumeroInputText(e) }}
                    nuevoCliente={cliente?.nuevoCliente || cliente?.cliente}
                />

                <ListaSelect
                    descripcion={"Estado Coomeva"}
                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}

                    id={"COD_ESTADO_ASO"}
                    valor={"ESTADO_ASO"}
                    name={'estado_coo'}
                    lista={listEstadoCoomeva}
                    onchangeSelect={onChangeAsingarValor}
                    inhabilitarSelect={(cliente?.estado_coo && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    defaultValue={cliente?.estado_coo}
                    mostrarLista={cliente?.estado_coo || cliente?.nuevoCliente || editar === true}
                />

                <ListaSelect
                    descripcion={"Tipo Contrato"}
                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                    id={"COD_TIP_CONTRATO"}
                    valor={'TIPO_CONTRATO'}
                    name={'tipo_contrato'}
                    color={1}
                    lista={tipoContrato}
                    onchangeSelect={onChangeAsingarValor}
                    inhabilitarSelect={(cliente?.tipo_contrato && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    defaultValue={cliente?.tipo_contrato}
                    mostrarLista={cliente?.nuevoCliente || cliente?.tipo_contrato}
                />

                <InputClientPerfil
                    descripcion={"Ventas anuales"}
                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                    id={"idventas_an"}
                    name={"ventas_an"}
                    bgFila={1}

                    value={cliente?.ventas_an ? cliente?.ventas_an !== '' ? conversionPesos({ valor: formatearValor({ valor: cliente?.ventas_an }) }) : '' : ''}
                    inhabilitarInput={(cliente?.ventas_an && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    onChangeInput={onChangeAsingarValor}
                    onChangeValidacion={(e) => { validarNumeroInputText(e) }}
                    nuevoCliente={cliente?.nuevoCliente || cliente?.cliente}
                    onBlur={onBlur}
                    activarFocus={true}
                    valContext={cliente?.ventas_an}
                />

                <ListaSelect
                    descripcion={"Sector"}
                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                    id={"COD_SECTOR"}
                    valor={'NOMBRE'}
                    name={'sector'}
                    color={1}
                    lista={sectors}
                    onchangeSelect={onChangeAsingarValor}
                    inhabilitarSelect={(cliente?.sector && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    defaultValue={cliente?.sector}
                    mostrarLista={cliente?.nuevoCliente || cliente?.sector}
                />

            </div>
            <div className='w-full'>
                <ListaSelect
                    descripcion={"Tipo Cliente"}
                    classTitle={"text-coomeva_color-rojo ml-4 text-sm font-bold"}
                    id={"TIPOCLI"}
                    valor={"TIPOCLI"}
                    name={'tipoPersona'}
                    lista={listTipoClient}
                    onchangeSelect={onChangeAsingarValor}
                    inhabilitarSelect={(cliente?.tipoPersona) || habilitarInput}
                    defaultValue={cliente?.tipoPersona ? cliente.tipoPersona === 'PJ' ? 'Pj' : cliente.tipoPersona : '' || cliente?.nuevoCliente}
                    mostrarLista={cliente?.tipoPersona}
                />

                <ListaSelect
                    descripcion={"Oficina"}
                    classTitle={"text-coomeva_color-rojo ml-4 text-sm font-bold"}
                    id={"COD_OFICINA"}
                    valor={"OFICINA"}
                    color={1}
                    name={'oficina'}
                    lista={listaOficinas}
                    onchangeSelect={onChangeAsingarValor}
                    inhabilitarSelect={(cliente?.oficina && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    defaultValue={cliente?.oficina}
                    mostrarLista={cliente?.nuevoCliente || cliente?.oficina}
                />

                <ListaSelect
                    descripcion={"Vinculado"}
                    classTitle={"text-coomeva_color-rojo ml-4 text-sm font-bold"}
                    id={"codLista"}
                    valor={"descripcion"}
                    name={'vinculado'}
                    lista={vinculo}
                    onchangeSelect={onChangeAsingarValor}
                    inhabilitarSelect={((cliente?.vinculado == 1 || cliente?.vinculado == 0) && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    defaultValue={cliente?.vinculado + ''}
                    mostrarLista={((cliente?.vinculado == 1 || cliente?.vinculado == 0) || cliente?.nuevoCliente || editar === true)}
                />

                <InputClientPerfil
                    descripcion={"Antigüedad banco"}
                    id={"idAntiguedad_ban"}
                    name={"antiguedad_ban"}
                    value={cliente?.antiguedad_ban || ''}
                    inhabilitarInput={(cliente?.antiguedad_ban && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    nuevoCliente={cliente?.nuevoCliente || cliente?.cliente}
                    onChangeInput={onChangeAsingarValor}
                    onChangeValidacion={(e) => { validarNumeroInputText(e) }}
                />

                <ListaSelect
                    descripcion={"Estado Banco"}
                    classTitle={"text-coomeva_color-rojo ml-4 text-sm font-bold"}
                    id={"COD_ESTADO_BCO"}
                    valor={"ESTADO_BCO"}
                    name={'estado_ban'}
                    lista={estadoBanco}
                    onchangeSelect={onChangeAsingarValor}
                    inhabilitarSelect={(cliente?.estado_ban && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    defaultValue={cliente?.estado_ban}
                    mostrarLista={cliente?.estado_ban || cliente?.nuevoCliente || editar === true}
                />

                <InputClientPerfil
                    descripcion={"Ingreso Mensual"}
                    id={"idIngreso"}
                    name={"ingreso"}
                    value={cliente?.ingreso ? cliente?.ingreso !== '' ? conversionPesos({ valor: formatearValor({ valor: cliente?.ingreso }) }) : '' : ''}
                    inhabilitarInput={(cliente?.ingreso && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    nuevoCliente={cliente?.nuevoCliente || cliente?.cliente}
                    onChangeInput={onChangeAsingarValor}
                    onChangeValidacion={(e) => { validarNumeroInputText(e) }}
                    onBlur={onBlur}
                    activarFocus={true}
                    valContext={cliente?.ingreso}
                />

                <InputClientPerfil
                    descripcion={"Activos"}
                    id={"idActivos"}
                    name={"activos"}
                    bgFila={1}

                    value={cliente?.activos ? cliente?.activos !== '' ? conversionPesos({ valor: formatearValor({ valor: cliente?.activos }) }) : '' : ''}
                    inhabilitarInput={(cliente?.activos && cliente.nuevoCliente !== true && editar !== true) || habilitarInput}
                    nuevoCliente={cliente?.nuevoCliente || cliente?.cliente}
                    onChangeInput={onChangeAsingarValor}
                    onChangeValidacion={(e) => { validarNumeroInputText(e) }}

                    activarFocus={true}
                    valContext={cliente?.activos}

                />

                <InputClientPerfil
                    descripcion={"Score"}
                    id={"score"}
                    value={''}
                    inhabilitarInput={false}
                    activarFocus={true}
                    onChangeInput={() => { }}
                />

            </div>
        </form>
    )
}