'use client';

import { CiCirclePlus } from "react-icons/ci";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../../share/Loading';
import DescripcionPlan from "../plan/DescripcionPlan";
import RangosDescripcion from "../plan/RangosDescripcion";
import { ClienteCuentaPlanVigente } from "../plan/ClienteCuentaPlanVigente";
import { InclusionPlan } from "../plan/InclusionPlan";
import { FaPencilAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { fnQueryPlan } from "@/app/lib/admin/ahorro/fnQueryPlan";
import { fnQueryRangoPlan } from "@/app/lib/admin/ahorro/fnQueryRangoPlan";
import { procesoEliminarPlan } from "@/app/lib/admin/ahorro/fnProcesoEliminarPlan";
import { fnQueryInclusion } from "@/app/lib/admin/ahorro/fnQueryInclusion";
import { conversionPesos, resetearPesos } from "@/app/lib/utils";
import { insertNewPlan } from "@/app/lib/admin/ahorro/fnInsertNewPlan";
import { insertNewRango } from "@/app/lib/admin/ahorro/fnInsertNewRango";
import { fnQueryListarPlanes } from "@/app/lib/admin/ahorro/fnQueryListarPlanes";
import { queryDatosBaseCliente } from "@/app/lib/admin/ahorro/fnQueryDatosBaseCliente";
import { updateEstadoExcluirPlan } from "@/app/lib/admin/ahorro/fnUpdateEstadoExcluirPlan";
import { insertIncluirEnPlan } from "@/app/lib/admin/ahorro/fnInsertIncluirEnPlan";
import { queryCuentasPlanes } from "@/app/lib/admin/ahorro/fnQueryCuentasPlanes";
import { insertNewVersion } from "@/app/lib/admin/ahorro/fnInsertNewVersion";
import { updateFechaAplicacion } from "@/app/lib/admin/ahorro/fnUpdateFechaAplicacion";
import { updateEstadoPlanRango } from "@/app/lib/admin/ahorro/fnUpdateEstadoPlanRango";


const fecha = new Date();

const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura 2 dígitos
const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Asegura 2 dígitos
const año = fecha.getFullYear();

const fechaFormateada = `${año}-${mes}-${dia}`;

const DynamicModal = dynamic(() => import('../../share/Modals'));
const DynamicLoading = dynamic(() => import('../../share/Loading'));

export const ListarPlanes = ({ listPlan, listaTipoPlan, listaPlanContingencia }) => {


  const [valorConsulta, setValorConsulta] = useState('')

  const [loading, setLoading] = useState(false);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [mostrarModalConfirmar, setMostrarModalConfirmar] = useState(false);

  const [messageModal, setMessageModal] = useState('');

  const [filas, setFilas] = useState(listPlan);

  const [planContingencia, setPlanContingencia] = useState('')

  const [mostrarDetalle, setMostrarDetalle] = useState(false)

  const [detallePlan, setDetallePlan] = useState({
    'fechaInicial': fechaFormateada
  })
  const [rangoPlan, setRangoPlan] = useState([{
    codPlan: '',
    rangoMin: '',
    rangoMax: '',
    tasaEA: ''
  }])

  const [nuevoRangoPlan, setNuevoRangoPlan] = useState([{
    codPlan: '',
    rangoMin: '',
    rangoMax: '',
    tasaEA: ''
  }])

  const [inclusionPlan, setInclusionPlan] = useState([
    { nuevo: true }
  ])

  const [cuentasPlanes, setCuentasPlanes] = useState([{}])

  const [opcionBoton, setOpcionBoton] = useState(0)

  const [estadoBotones, setEstadoBotones] = useState({
    editar: false,
    guardar: false,
    eliminar: false
  })

  const [inactivarMasivos, setInactivarMasivos] = useState(true)


  useEffect(() => {

    const consultarPlan = (e) => {

      filtrarPorNombre(e.detail)

    }



    window.addEventListener('consultarPlan', consultarPlan)

    return () => {

      window.removeEventListener("consultarPlan", consultarPlan)
    };

  }, [])



  const filtrarPorNombre = (nombre = '') => {

    if (nombre != '') {

      filtrardData(nombre)
      return
    }

    setFilas(listPlan)



  }



  const consultarPlanPorCodPlan = async ({ planCod = '' }) => {

    try {

      setLoading(true)

      const plan = JSON.parse(await fnQueryPlan(planCod))

      if (plan.STATUS == 202) {

        setMessageModal(plan.MESSAGE)
        setLoading(false)
        setMostrarModal(true)

        return
      }



      const detallePlanRango = JSON.parse(await fnQueryRangoPlan(planCod, plan?.DATA[0].codPlan))

      setRangoPlan(detallePlanRango?.DATA)

      const listaInclusionPlan = JSON.parse(await fnQueryInclusion(planCod, plan?.DATA[0].codPlan))


      const listaCuentasPlanes = JSON.parse(await queryCuentasPlanes(parseInt(planCod), parseInt(plan?.DATA[0].codPlan)))

      setDetallePlan(plan?.DATA[0])

      setInclusionPlan(listaInclusionPlan?.DATA)

      setCuentasPlanes(listaCuentasPlanes?.DATA || [])




    } catch (error) {

      console.log(error)

    } finally {
      setLoading(false)
    }





  };


  const resetEstados = () => {

    setDetallePlan({ 'fechaInicial': fechaFormateada })

    setRangoPlan([{
      codPlan: '',
      rangoMin: '',
      rangoMax: '',
      tasaEA: ''
    }])

    setNuevoRangoPlan([{
      codPlan: '',
      rangoMin: '',
      rangoMax: '',
      tasaEA: ''
    }])

    setInclusionPlan([
      { nuevo: true }
    ])

    setCuentasPlanes([{}])

  }

  const verDetallePlan = async (codPlan) => {

    try {

      setLoading(true)

      resetEstados()


      const plan = JSON.parse(await fnQueryPlan(codPlan))

      const detallePlanRango = JSON.parse(await fnQueryRangoPlan(codPlan, plan?.DATA[0].codPlan))

      const listaInclusionPlan = JSON.parse(await fnQueryInclusion(codPlan, plan?.DATA[0].codPlan))

      setInclusionPlan(listaInclusionPlan?.DATA || [{ nuevo: true }])



      setDetallePlan(plan?.DATA[0])

      setRangoPlan(detallePlanRango?.DATA)


      setOpcionBoton(1)

      setEstadoBotones(estado => ({
        ...estado,
        ['editar']: true,
        ['guardar']: true
      }))
      setMostrarDetalle(true)

    } catch (error) {

      console.log(error)

    } finally {
      setLoading(false)
    }


  };

  const crearPlan = () => {
    // const parametrosCrear = {
    //   "codPlan": "",
    //   "funcion": 2
    // };



    setOpcionBoton(2)

    setDetallePlan({
      'fechaInicial': fechaFormateada
    })

    setRangoPlan([{
      codPlan: '',
      rangoMin: '',
      rangoMax: '',
      tasaEA: ''
    }])

    setEstadoBotones(estado => ({
      ...estado,
      ['editar']: true,
      ['guardar']: true
    }))

    setMostrarDetalle(true)
  };

  const ajusteMasivoPlan = () => {

    resetEstados()

    setOpcionBoton(3)

    setEstadoBotones(estado => ({
      ...estado,
      ['eliminar']: true,
      ['guardar']: true
    }))

    setMostrarDetalle(true)
  };


  const sintesisPlan = (codPlan) => {

    resetEstados()

    setOpcionBoton(4)
    setEstadoBotones(estado => ({
      ...estado,
      ['editar']: true,
      ['guardar']: true
    }))

    setMostrarDetalle(true)
  };


  const cerrarModal = () => {
    setMostrarModal(!mostrarModal)
  };


  const onBurInput = async (e, i) => {

    if (e.target.id.includes('nit')) {

      try {

        setLoading(true)

        const respon = JSON.parse(await queryDatosBaseCliente(e.target.value))


        const nuevoInclusion = [...inclusionPlan];


        if (respon.STATUS == 200) {

          setLoading(false)

          nuevoInclusion[i]['cliente'] = respon?.DATA.razonSocial;
          setInclusionPlan(nuevoInclusion);
        }

        if (e.target.value != '') {
          setLoading(false)
          setMessageModal(`El cliente:${e.target.value} No existe cliente`)
          setMostrarModal(true)
        }

      } catch (error) {

        console.log(error)

      }





    }

    setEstadoBotones(estado => ({
      ...estado,
      ['guardar']: false,
      ['eliminar']: opcionBoton == 3 ? false : true
    }))
  }


  const onChangeInclusion = async (e, i) => {

    const nuevoInclusion = [...inclusionPlan];

    nuevoInclusion[i]['idCliente'] = e.target.value;

    setInclusionPlan(nuevoInclusion);

  }


  const cancelarOperacion = () => {

    if (opcionBoton == 1) {
      setMessageModal(`Está a punto de eliminar el plan: ${detallePlan?.Nombre}. Seleccione un plan de contingencia para reasignar las cuentas antes de continuar.`)
      setMostrarModalConfirmar(true)
    }

    if (opcionBoton == 2 || opcionBoton == 3) {
      setDetallePlan({
        'fechaInicial': fechaFormateada
      })

      setRangoPlan([{
        codPlan: '',
        rangoMin: '',
        rangoMax: '',
        tasaEA: ''
      }])

      setNuevoRangoPlan([{
        codPlan: '',
        rangoMin: '',
        rangoMax: '',
        tasaEA: ''
      }])

      setInactivarMasivos(true)
    }

    setEstadoBotones({
      editar: false,
      guardar: false,
      eliminar: false
    })

    setMostrarDetalle(false)

  }

  const guardarPlan = async () => {

    try {

      setLoading(true)

      if (opcionBoton == 2) {

        const response = JSON.parse(await insertNewPlan({ nombrePlan: detallePlan.Nombre, tipoPlan: detallePlan.tipoPlan }))

        if (response.STATUS == 200) {

          const transformarData = rangoPlan.map((item, i) => [
            response.DATA.pPlan,
            response.DATA.codPlan,
            i + 1,
            parseInt(item.rangoMin),
            parseInt(item.rangoMax),
            parseFloat(item.tasaEA),
            detallePlan.fechaInicial,
            1
          ]);



          const r = await insertNewRango(transformarData)

          resetEstados()

          cargarPlanesDB()


        }



      }

      if (opcionBoton == 1) {

        const dataNuevo = inclusionPlan.filter((item) => item.nuevo == true);

        const transformarData = dataNuevo.map((item, i) => [
          detallePlan.plan,
          detallePlan.codPlan,
          item.idCliente,
          1
        ]);

        const r = await insertIncluirEnPlan(transformarData)

        resetEstados()


      }

      if (opcionBoton == 3) {

        const nuevaVersionPlan = JSON.parse(await insertNewVersion({ plan: detallePlan.plan }))

        if (nuevaVersionPlan.STATUS == 200) {

          const transformarData = nuevoRangoPlan.map((item, i) => [
            detallePlan.plan,
            nuevaVersionPlan?.DATA.codPlan,
            i + 1,
            parseInt(item.rangoMin),
            parseInt(item.rangoMax),
            parseFloat(item.tasaEA),
            detallePlan.fechaInicial,
            1
          ]);

          const r = JSON.parse(await insertNewRango(transformarData))



          const rUpdateEstado = JSON.parse(await updateEstadoPlanRango({ plan: detallePlan.plan, codPlan: detallePlan.codPlan }))



          const fech = JSON.parse(await updateFechaAplicacion({ plan: detallePlan.plan, codPlan: nuevaVersionPlan?.DATA.codPlan, fechaAplicacion: detallePlan.fechaAplicacion }))

          resetEstados()
          consultarPlanPorCodPlan({ planCod: detallePlan.plan })

        }



      }

    } catch (error) {

      console.log(error)

    } finally {



      setLoading(false)

      setMostrarDetalle(false)


    }




  }

  const editarPlan = () => {
    setInactivarMasivos(false)

  }


  const onChangeDetalle = (e, name) => {

    setDetallePlan({
      ...detallePlan,
      [name]: e.target.value
    })
  }



  const handleAddRow = (index) => {

    const currentRango = rangoPlan[index];

    if (!currentRango.rangoMin || !currentRango.rangoMax || !currentRango.tasaEA) {
      alert('Por favor, llene todos los campos antes de agregar una nueva fila.');
      return;
    }

    const rangoMin = rangoPlan.length > 0 ? parseFloat(currentRango.rangoMax) : undefined;

    const newRango = {
      codPlan: '',
      rangoMin: rangoMin != undefined ? rangoMin + 1 : '',
      rangoMax: '',
      tasaEA: ''
    };
    const newRangos = [...rangoPlan];
    newRangos.splice(index + 1, 0, newRango);
    setRangoPlan(newRangos);
  };


  const handleAddRowNuevoPlan = (index) => {

    const currentRango = nuevoRangoPlan[index];


    const rangoMin = nuevoRangoPlan.length > 0 ? parseFloat(currentRango.rangoMax) : undefined;

    const newRango = {
      codPlan: '',
      rangoMin: rangoMin != undefined ? rangoMin + 1 : '',
      rangoMax: '',
      tasaEA: ''
    };
    const newRangos = [...nuevoRangoPlan];
    newRangos.splice(index + 1, 0, newRango);
    setNuevoRangoPlan(newRangos);
  };

  const removeCurrencyFormat = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  const handleInputChange = (index, field, value) => {
    const newRangos = [...rangoPlan];


    newRangos[index][field] = removeCurrencyFormat(value);
    setRangoPlan(newRangos);

    document.getElementById(`${field}${index}`).value = value != '' ? field != 'tasaEA' ? conversionPesos({ valor: value, nDecimales: 0 }) : conversionPesos({ valor: value, nDecimales: 2, style: 'percent' }) : value
  };


  const handleInputChangeNuevoPlan = (index, field, value) => {
    const newRangos = [...nuevoRangoPlan];


    newRangos[index][field] = removeCurrencyFormat(value);
    setNuevoRangoPlan(newRangos);

    document.getElementById(`${field}${index}`).value = value != '' ? field != 'tasaEA' ? conversionPesos({ valor: value, nDecimales: 0 }) : conversionPesos({ valor: value, nDecimales: 2, style: 'percent' }) : value
  };

  const eliminarRegistroDataBase = async () => {


    try {

      setMostrarModalConfirmar(false)

      setLoading(true)

      const response = JSON.parse(await procesoEliminarPlan({ plan: detallePlan.plan, codPlan: detallePlan.codPlan, planContingencia: planContingencia }))



      setMostrarModalConfirmar(false)

      setPlanContingencia('')

      setFilas(filas.filter((plan) => plan.codPlan != detallePlan.plan))

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }



  };

  const cargarPlanesDB = async () => {

    const listPlan = JSON.parse(await fnQueryListarPlanes())

    setFilas(listPlan.DATA)

  }

  const nuevoCliente = (nombre) => {

    const ultimoCliente = inclusionPlan[inclusionPlan.length - 1];

    if (ultimoCliente && (!ultimoCliente.idCliente || !ultimoCliente.cliente)) {
      setMessageModal('Por favor, complete los campos del cliente anterior antes de agregar uno nuevo.')
      setMostrarModal(true)
      return;
    }

    const nuevaCuenta = {
      id: inclusionPlan.length + 1,
      idCliente: '',
      cliente: '',
      nuevo: true
    }

    const cpListaCuente = [...inclusionPlan, nuevaCuenta]

    setInclusionPlan(cpListaCuente)



  }

  const filtrardData = (nombre) => {


    const result = filas?.filter((item) => {
      const values = Object.values(item);
      return values.some((value) =>
        value.toString().toLowerCase().includes(nombre.toLowerCase())
      );
    })

    if (result.length == 0) {
      setMessageModal(`El plan ${nombre} no existe`)
      setMostrarModal('true')
      setFilas(listPlan)
      return
    }

    setFilas(result)
  }

  const eliminarInclusionPlan = async (i, idCliente) => {


    try {

      setLoading(true)



      const response = JSON.parse(await updateEstadoExcluirPlan({ plan: detallePlan.plan, codPlan: detallePlan.codPlan, idCliente, EstadoInclusion: 2 }))


      if (response.state == 200) {

        setInclusionPlan(inclusionPlan.filter(e => e.idCliente != idCliente))

      }

      resetEstados()


    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }



  };

  const onChangeListaPlan = (e) => {



    consultarPlanPorCodPlan({ planCod: e.target.value })

  }


  return (
    <>

      {
        mostrarDetalle
          ?

          <div className='w-full flex'>
            <div className='space-y-4 w-[95%]'>
              <DescripcionPlan
                deshabilitar={opcionBoton == 1 || opcionBoton == 3}
                detalle={detallePlan}
                listaTipoPlan={listaTipoPlan}
                onBurInput={onBurInput}
                setDetallePlan={setDetallePlan}
                onChangeDetalle={onChangeDetalle}
                inactivarMasivos={inactivarMasivos}
                listaPlan={listPlan}
                onChangeListaPlan={onChangeListaPlan}
                opcionSeleccionada={opcionBoton}
              />
              {
                opcionBoton == 1 || opcionBoton == 2 || opcionBoton == 4
                  ?
                  <RangosDescripcion
                    deshabilitar={opcionBoton == 1}
                    rango={rangoPlan}
                    handleAddRow={handleAddRow}
                    handleInputChange={handleInputChange}
                    removeCurrencyFormat={removeCurrencyFormat}
                  />
                  : undefined}
              {
                opcionBoton == 1 ?
                  <InclusionPlan
                    tipoPlan={detallePlan.tipoPlan}
                    onBlurInclusion={onBurInput}
                    // deshabilitar={detallePlan.tipo == 1}
                    nuevoCliente={nuevoCliente}
                    listaCuentas={inclusionPlan}
                    detallePlan={detallePlan}
                    onChangeInclusion={onChangeInclusion}
                    eliminarInclusionPlan={eliminarInclusionPlan}
                  /> :
                  undefined}

              {/* {opcionBoton == 2 ? <ClienteCuentaPlanVigente /> : undefined} */}

              {
                opcionBoton == 3
                  ?
                  <>
                    <RangosDescripcion
                      rango={rangoPlan}
                      titulo={'Plan Actual'}
                      opcion={opcionBoton}
                      deshabilitar={opcionBoton == 3}
                    />
                    <RangosDescripcion
                      rango={nuevoRangoPlan}
                      titulo={'Nuevo Plan'}
                      opcion={opcionBoton}
                      removeCurrencyFormat={removeCurrencyFormat}
                      handleInputChange={handleInputChangeNuevoPlan}
                      handleAddRow={handleAddRowNuevoPlan}
                      deshabilitar={inactivarMasivos}
                      onBurInput={onBurInput}
                    />
                    {/* <InclusionPlan
                      tipoPlan={detallePlan.tipoPlan}
                      onBlurInclusion={onBurInput}
                      // deshabilitar={detallePlan.tipo == 1}
                      nuevoCliente={nuevoCliente}
                      listaCuentas={inclusionPlan}
                      onChangeInclusion={onChangeInclusion}
                    /> */}
                    <ClienteCuentaPlanVigente listaCuentasPlan={cuentasPlanes} />
                  </>

                  :
                  undefined
              }


            </div>
            <div className=' flex flex-col gap-8 items-center mx-8 '>
              <FaPencilAlt
                className={`h-24 w-14 ${estadoBotones.editar ? 'text-gray-400' : 'text-coomeva_color-rojo cursor-pointer'} h-8 w-8 `}
                onClick={estadoBotones.editar ? () => { } : editarPlan}
              />
              <IoSaveOutline
                className={`h-24 w-14 ${estadoBotones.guardar ? 'text-gray-400' : 'text-coomeva_color-rojo cursor-pointer'} h-8 w-8 `}
                onClick={estadoBotones.guardar ? () => { } : guardarPlan}
              />
              <BiTrash
                className={`h-24 w-14 ${estadoBotones.eliminar ? 'text-gray-400' : 'text-coomeva_color-rojo cursor-pointer'} h-8 w-8 `}
                onClick={estadoBotones.eliminar ? () => { } : cancelarOperacion}
              />
            </div>
          </div>
          :
          <div className=" w-full h-[80%]">
            <table className="w-full radiusTopTable">
              <thead className=" text-coomeva_color-rojo text-xs bg-coomeva_color-grisPestaña2 top-0">
                <tr className="divide-x divide-gray-300" >
                  <th className="p-3 w-[30%] text-center">PLAN</th>
                  <th className="p-3 w-[30%] text-center">TIPO</th>
                  <th className="p-3 w-[30%] text-center">TASA MÁXIMA EA</th>
                  <th className="p-3 w-[10%] text-center"></th>
                </tr>
              </thead>
            </table>
            <div className="w-full border border-coomeva_color-grisPestaña2 shadow-md overflow-y-auto radiusBottomTable h-[70%]">
              <div className="w-full">
                <table className="w-full">
                  <tbody id="datosPlan" className="text-[11.5px] text-coomeva_color-azulOscuro font-semibold">
                    {filas?.map((fila, index) => (
                      <tr key={index}>
                        <td className="p-2 w-[17%]">
                          <input
                            id={index + 'plan'}
                            type="text"
                            className="p-2 w-full bg-transparent"
                            value={fila.plan} readOnly />
                        </td>
                        <td className="p-2 w-[17%]">
                          <input
                            id={index + 'tipo'}
                            type="text"
                            className="p-2 w-full bg-transparent"
                            value={fila.tipoPlan} readOnly />
                        </td>
                        <td className="p-2 w-[17%]">
                          <input
                            id={index + 'tasaMaximaEa'}
                            type="text"
                            className="p-2 w-full bg-transparent"
                            value={fila.tasaEA} readOnly />
                        </td>
                        <td className="p-2 w-[4.95%]">
                          <button onClick={() => verDetallePlan(fila.codPlan)} title='Ver Detalle'>
                            <CiCirclePlus className={`text-2xl text-coomeva_color-rojo pointer-events-none`} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full flex justify-end pt-10">
              <button className={`w-[180px] bg-coomeva_color-rojo text-xs rounded-md text-center py-3 text-white m-4`} onClick={() => crearPlan()}>
                Crear nuevo Plan
              </button>
              <button className={`w-[180px] bg-coomeva_color-rojo text-xs rounded-md text-center py-3 text-white m-4`} onClick={() => ajusteMasivoPlan()}>
                Ajuste Masivo de Planes
              </button>
              <button className={`w-[180px] bg-coomeva_color-rojo text-xs rounded-md text-center py-3 text-white m-4`} onClick={() => sintesisPlan()}>
                Síntesis
              </button>
            </div>




          </div>
      }

      {
        (mostrarModal)
        &&
        <DynamicModal titulo={'Notificación'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModal}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
        </DynamicModal>

      }
      {
        (mostrarModalConfirmar) ?
          <DynamicModal titulo={'Notificación'} mostrarImagneFondo={true} mostrarModal={eliminarRegistroDataBase} cerrarModal={() => { setMostrarModalConfirmar(false) }}>
            <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
            <div className="flex gap-4">
              <h4 className="text-coomeva_color-rojo font-bold">Plan: </h4>
              <select

                name=""
                id=""
                className="w-48 outline-none px-2 rounded-md"
                value={planContingencia}
                onChange={(e) => { setPlanContingencia(e.target.value) }}
              >
                {
                  listaPlanContingencia?.map((c) => (
                    <option key={c.codLista} value={c.codLista}>{c.descripcion}</option>
                  ))
                }

              </select>
            </div>
          </DynamicModal>
          : undefined
      }
      {
        loading ? <DynamicLoading /> : undefined
      }


    </>

  );
};