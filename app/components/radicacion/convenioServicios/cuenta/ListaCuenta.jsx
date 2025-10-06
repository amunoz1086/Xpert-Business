'use client'
import React, { useEffect, useState } from 'react'
import SeccionPage from '../../configuracion/adicional/SeccionPage'
import { CampoNumero } from '@/app/components/share/CampoNumero'
import { CampoTexto } from '@/app/components/share/CampoTexto'
import { CampoLista } from '@/app/components/share/CampoLista'
import { CampoFecha } from '@/app/components/share/CampoFecha'
import { CampoMoneda } from '@/app/components/share/CampoMoneda'
import { MdAdd } from 'react-icons/md'
import { IoAddCircle } from 'react-icons/io5'
import DetallePlan from './DetallePlan'
import AsignarCuenta from './AsignarCuenta'
import { useConvenioServicio } from '@/app/hooks/useConvenioServicio'
import { fnQueryListCuentasPorCliente } from '@/app/lib/convenios/cuentas/fnQueryListCuentasPorCliente'
import { fnQueryRangoPlan } from '@/app/lib/admin/ahorro/fnQueryRangoPlan'

const headTable = [
    {
        id: 1,
        descripcion: 'Nro. Cuenta'
    },
    {
        id: 2,
        descripcion: 'Producto'
    },
    {
        id: 3,
        descripcion: 'Producto Bancario'
    },
    {
        id: 4,
        descripcion: 'Fecha Apertura'
    },
    {
        id: 5,
        descripcion: 'Saldo a la Fecha'
    },
    {
        id: 6,
        descripcion: 'Plan Actual'
    },
    {
        id: 7,
        descripcion: 'Modificar Plan'
    }
]



const listaProduto =[
    {
        id:'1',
        descripcion:''
    },
    {
        id:'2',
        descripcion:''
    }
]


export const ListaCuenta = ({context,listaTipoCuenta,listaProductBancario,listaPlanes}) => {

  
        const {  updatePathConvenio } = useConvenioServicio()

    const {cuenta,updateCuenta} = context()

    const [modal, setModal] = useState(false)
    const [modalDetalle, setModalDetalle] = useState(false)
    const [nameCampoAux, setNameCampoAux] = useState('')
    const [planActual, setPlanActual] = useState('')

        useEffect(() => {
            updatePathConvenio('cuenta')
        }, [])

        useEffect(() => {

            cargarCuentas()
         
        }, [])
        

    const cerrarModal = () => {

        setModal(false)

    }

    const cerrarModalDetalle = () => {

        setModalDetalle(false)

    }

    const mostrarModal = (name,planActual) => {

        setNameCampoAux(name)
        setPlanActual(planActual)
        setModal(true)

    }

    // const [listCuentas, setListCuentas] = useState([
    //     {
    //         id: 1,
    //         nCuenta: '',
    //         producto: '',
    //         productoBancario: '',
    //         fechaApertura: '',
    //         saldoFecha: '',
    //         planActual: '',
    //         modificarPlan: '',
           

    //     }
    // ])

    const [nuevo, setNuevo] = useState(false)

    const nuevaCuenta = () => {
        const fecha = new Date();

        const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura 2 dígitos
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Asegura 2 dígitos
        const año = fecha.getFullYear();
        
        const fechaFormateada = `${año}-${mes}-${dia}`;

        const nuevoItem = {
            id: cuenta.length + 1,
            nCuenta: '********',
            producto: '',
            productoBancario: '',
            fechaApertura: fechaFormateada,
            saldoFecha: '0',
            planActual: '',
            modificarPlan: '',
            nuevo: true

        }
        updateCuenta([...cuenta, nuevoItem]);
        setNuevo(true)
    };


    
        const cargarCuentas = async () => {
    
            try {
    
                const cuentas = JSON.parse(await fnQueryListCuentasPorCliente(JSON.stringify({ idCliente: '800070225' })))
    
                console.log('cuentas nueva')
                console.log(cuentas)
                console.log(cuentas)
                if (cuentas.STATUS == 200) {

                   if(cuenta.length>0) {
                    return
                   }
                   updateCuenta(cuentas.cdtVencidos)
                   
                }
    
    
    
            } catch (error) {
    
            }
    
        }

    const cancelar = () => {

        updateCuenta(cuenta.filter(e=>e.nuevo == true));
        setNuevo(false)
    };

    const crearCuenta = () => {

        setNuevo(false)
         const index =cuenta.findIndex(e => e.nuevo == true)

         console.log(index)

        const  listaCuentasNueva = [...cuenta]

        listaCuentasNueva[index] = {
            ...cuenta[index],
            ['nuevo']: false
        };

        updateCuenta(listaCuentasNueva)
    };

    const onChangeInput = (e) => {

        const { name, value,tasaEA } = e.target;

        const [nameCampo, index] = name.split('-');

        const posItem = parseInt(index, 10);

        const cuentasCp = [...cuenta];

        

        cuentasCp[posItem] = {
            ...cuenta[posItem],
            [nameCampo]: value,
            ['tasaEA']:tasaEA
        };

   
        updateCuenta(cuentasCp);

    }

    const handleFocus =async (planActual) => {

        console.log(planActual)

        const plan = listaPlanes.find(e => e.plan==planActual.planActual)

        try {
            console.log(plan)

            const resp =JSON.parse( await fnQueryRangoPlan(plan.plan,plan.codPlan))

            console.log(resp)
            
        } catch (error) {

            console.log(error)
            
        }


       setModalDetalle(true)
      
    };

    
  console.log(cuenta)

  console.log(listaPlanes)


    return (
        <div>
            <SeccionPage w={'w-64'} title={"Consulta cuenta existentes"} />
            <div className="overflow-x-auto w-full">
                <table className="w-full table-fixed text-xs font-light  ">
                    <thead className=" w-full text-white rounded-md">
                        <tr className="rounded- bg-coomeva_color-rojo ">
                            {
                                headTable.map((item, i) => (
                                    <th key={i + 'head'} className={`p-2  ${i == 0 ? 'rounded-tl-md' : undefined}  ${i == (headTable.length - 1) ? 'rounded-tr-md' : undefined}`}>{item['descripcion']}</th>
                                ))
                            }

                        </tr>
                    </thead>
                    <tbody className="">


                        {
                            cuenta.map((item, i) => (
                                <tr key={i + 'cuenta'} >
                                    <td>
                                        <div className='py-4 pr-2'>
                                            <CampoNumero
                                                fonntSeze='text-xs'
                                                validacionRequeridoEditable={{ 'requerido': false, 'estado': true }}
                                                placeholder=''
                                                valorInput={item.nCuenta}
                                                onChangeInput={onChangeInput}
                                                nameInput={"nCuenta-" + i}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className='py-4 pr-2'>
                                            <CampoLista
                                                validacionRequeridoEditable={{ 'requerido': false, estado: item.nuevo ==true?false:true }}
                                                placeholder=''
                                                lista={listaTipoCuenta}
                                                idLista='id'
                                                descripcionList='descripcion'
                                                onChangeInput={onChangeInput}
                                                valorInput={item.producto}
                                                nameInput={"producto-" + i}
                                                fontSize='text-xs'
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className='py-4 pr-2'>
                                            <CampoLista
                                                validacionRequeridoEditable={{ 'requerido': false, estado: item.nuevo ==true?false:true }}
                                                placeholder=''
                                                lista={listaProductBancario.filter(e => e.codCuenta==((item.producto=='Ahorro')?1:(item.producto=='Corriente')?2:''))}
                                                idLista='descripcion:'
                                                descripcionList='descripcion'

                                                fontSize='text-xs'
                                                onChangeInput={onChangeInput}
                                                valorInput={item.productoBancario}
                                                nameInput={"productoBancario-" + i}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <CampoFecha h='5'
                                                fontSize='text-xs'
                                                placeholder=''
                                                validacionRequeridoEditable={{ requerido: false,estado:true }}
                                                onChangeInput={onChangeInput}
                                                valorInput={item.fechaApertura}
                                                nameInput={"fechaApertura-" + i}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <CampoMoneda
                                                fontSize='text-xs'
                                                placeholderAux=''
                                                validacionRequeridoEditable={{ requerido: false }}

                                                placeholder=''
                                                onChangeInput={onChangeInput}
                                                valorInput={item.saldoFecha+''}
                                                nameInput={"saldoFecha-" + i}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className='border-b  flex  justify-between items-center'>
                                            <div> <p className='outline-none block' >{item.planActual}</p></div>
                                            <div
                                                onClick={() => { mostrarModal("planActual-" + i) }}
                                                
                                                onMouseEnter={() =>{item.nuevo !=true? handleFocus(item):undefined}}
                                                className=' cursor-pointer '
                                            >
                                                <MdAdd className='text-coomeva_color-rojo w-5 h-5' />
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        <div  onClick={(item.nuevo==false || item.nuevo==undefined) ?() => {  mostrarModal("modificarPlan-" + i,item.planActual) }:() => { }} className='cursor-pointer text-center'>
                                            <p>{((item.nuevo==false || item.nuevo==undefined&&(!item.modificarPlan)))?'Seleccionar':item.modificarPlan}</p>
                                            {/* <CampoLista
                                                validacionRequeridoEditable={{ 'requerido': false,estado:true }}
                                                placeholder=''
                                                lista={[
                                                   
                                                ]}
                                                idLista='id'
                                                descripcionList='descripcion'

                                                fontSize='text-xs'
                                                onChangeInput={onChangeInput}
                                                valorInput={item.modificarPlan}
                                                nameInput={"modificarPlan-" + i}
                                            /> */}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }



                    </tbody>
                </table>
            </div>
            <DetallePlan listaPlanes={listaPlanes} cerrarModal={cerrarModal} onChangeInput={onChangeInput} modal={modal}  nameCampo={nameCampoAux} />
            <AsignarCuenta cerrarModal={cerrarModalDetalle} onChangeInput={onChangeInput} modal={modalDetalle} nameCampo={nameCampoAux}  planActual ={planActual}/>
            {
                nuevo ? <div className="flex gap-4 justify-end">

                    <button onClick={cancelar} className="border text-xs border-gray-500 w-40 h-8 rounded-md text-gray-500">Cancelar</button>
                    <button onClick={crearCuenta} className="bg-coomeva_color-rojo  rounded-md w-40 h-8 text-white text-xs">Crear</button>

                </div> : undefined
            }
            <div className=" cursor-pointer  mt-14 flex rounded-md  w-40  h-8 gap-4 justify-center items-center bg-coomeva_color-rojo text-white">
                <button onClick={nuevaCuenta} className=" text-xs" >Agregar CDN </button>
                <IoAddCircle />
            </div>
        </div>
    )
}
