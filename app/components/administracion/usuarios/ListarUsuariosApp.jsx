'use client';
import { DropdownList } from '@/app/components/share/DropdownList';
import { TbTrashXFilled, TbEdit } from "react-icons/tb";
import { useState, useEffect } from 'react';
import { val_fn_profile } from '@/app/lib/auth/fn_profile';
import { fnDeleteUsuarios } from '@/app/lib/admin/usuarios/queryDeleteUsuario';
import dynamic from 'next/dynamic';
import { codeErrorMessage } from '@/app/lib/utils';
import Loading from '../../share/Loading';
import { fnQueryListarUsuarios } from '@/app/lib/admin/usuarios/queryListarUsuarios';
import { fnQueryInsertUsusario } from '@/app/lib/admin/usuarios/queryInsertUsuario';
import { fnQueryUpdateUsuarios } from '@/app/lib/admin/usuarios/queryUpdateUsuario';


const DynamicModal = dynamic(() => import('../../share/Modals'));


export const ListarUsuariosApp = ({ listUusuarios, listarcargo = [], listarregional = [], listaroficinas = [],
  listarcanal = [], listarperfil = [], listartipoaprobador = [], listarperfilclientes = [], listarparametrizador = [], listOpcionProducto = [] }) => {

  //const [usuario, setUsuario] = useState('');
  //const [cargo, setCargo] = useState('');
  //const [regional, setRegional] = useState('');
  //const [oficina, setOficina] = useState('');
  //const [perfilProductos, setPerfilProductos] = useState('');
  //const [tipoAprobador, setTipoAprobador] = useState('');
  //const [tipoParametrizador, setTipoParametrizador] = useState('');
  //onst [modoNuevoUsuario, setModoNuevoUsuario] = useState(false);


  const [loading, setLoading] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalConfirmar, setMostrarModalConfirmar] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [filas, setFilas] = useState(listUusuarios);
  const [modoEdicion, setModoEdicion] = useState(false);
  const multiselect = false;
  const [opcionesSelecionada, setOpcionesSelecionada] = useState(multiselect ? [] : '');
  //const [opcionesSelecionada2, setOpcionesSelecionada2] = useState(multiselect ? [] : '');
  const [filtroOficina, setFiltroOficina] = useState({ index: undefined, regional: undefined });
  const [itemSeleccionado, setItemSeleccionado] = useState({ index: undefined, usuario: undefined });
  const [filaEnfocada, setFilaEnfocada] = useState(null);
  //const [filaEditada, setFilaEditada] = useState(null);


  const cargarListaUsuarios = async () => {
    try {

      setLoading(true);
      const dataUsuarios = JSON.parse(await fnQueryListarUsuarios());
      const data = dataUsuarios.status == 200 ? dataUsuarios.data : [];

      setFilas(data);
      setOpcionesSelecionada([]);
      setItemSeleccionado({ index: undefined, usuario: undefined });
      //setOpcionesSelecionada2(multiselect ? [] : '');
      setFiltroOficina({ index: undefined, regional: undefined });
      setFilaEnfocada(null);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };


  const agregarNuevaFila = () => {
    const nuevaFila = {
      USUARIO: '',
      NOMBRE: '',
      CORREO: '',
      CARGO: '',
      REGIONAL: '',
      OFICINA: '',
      CANAL: '',
      PERFIL: [],
      TIPO_APROBADOR: '',
      TIPO_PARAMETRIZADOR: '',
      nuevo: true
    };

    setModoEdicion(false);
    setFilaEnfocada(null);
    setFilas((prevFilas) => [
      nuevaFila,
      ...prevFilas
    ]);

  };


  useEffect(() => {

    const handleNuevoUsuarioEvent = () => {
      agregarNuevaFila();
      //setModoNuevoUsuario(true)
    };

    const handleCancelarEvent = async () => cargarListaUsuarios();
    const handleConsultarEvent = (e) => {
      const filtro = e.detail != '' ? filas.filter(fila => fila.USUARIO == e.detail) : listUusuarios
      setFilas(filtro)
    };

    const handleGuardarEvent = (e) => guardarUsuarioDb();
    const handleEditarEvent = (e) => editarUsuarioDb();

    window.addEventListener('editar', handleEditarEvent);
    window.addEventListener('guardar', handleGuardarEvent);
    window.addEventListener("consultar", handleConsultarEvent);
    window.addEventListener("nuevoUsuario", handleNuevoUsuarioEvent);
    window.addEventListener("cancelar", handleCancelarEvent);

    return () => {
      window.removeEventListener('editar', handleEditarEvent);
      window.removeEventListener('guardar', handleGuardarEvent);
      window.removeEventListener("consultar", handleConsultarEvent);
      window.removeEventListener("nuevoUsuario", handleNuevoUsuarioEvent);
      window.removeEventListener("cancelar", handleCancelarEvent);
    };

  }, [filas]);


  const activarModoEdicion = (index, usuario) => {

    const filaEditable = filas.findIndex(e => e.USUARIO === usuario);
    filas[filaEditable].editable = true;

    setFilas(filas);

    const event = new CustomEvent("activarBtnEditarAdmin");
    window.dispatchEvent(event);
    //setFilaEditada(index);

  };


  const handlePerfilProductosChange = (value, index) => {

    setOpcionesSelecionada(value);
    const nuevasFilas = [...filas];
    nuevasFilas[index].PERFIL = value;
    //setPerfilProductos(value);

    if (!opcionesSelecionada.includes(2)) {
      nuevasFilas[index].PERFIL_CLIENTE = '';
    }

    if (opcionesSelecionada.includes(3)) {
      nuevasFilas[index].TIPO_APROBADOR = '';
    } else if (opcionesSelecionada.includes(4)) {
      nuevasFilas[index].TIPO_PARAMETRIZADOR = '';
    } else {
      nuevasFilas[index].TIPO_APROBADOR = '';
      nuevasFilas[index].TIPO_PARAMETRIZADOR = '';
    }

    setFilas(nuevasFilas);

  };


  const handleDelete = async () => {

    try {

      setMostrarModalConfirmar(false);
      setLoading(true);

      const responseEliminar = JSON.parse(await fnDeleteUsuarios(filas[itemSeleccionado.index].USUARIO));

      if (responseEliminar != 200) {
        setMessageModal('No fue posible eliminar el usuario, intente nuevamente ');
        setMostrarModal(true);
        return;
      }

      setMessageModal('Usuario eliminado');
      setMostrarModal(true);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setItemSeleccionado({ index: undefined, usuario: undefined });
      cargarListaUsuarios();
    }

  };


  const confirmarEliminar = (index, usuario) => {
    setItemSeleccionado({ index, usuario });
    setMessageModal(`¿Estás seguro de que deseas eliminar el usuario ${usuario}? Esta acción no se puede deshacer.`);
    setMostrarModalConfirmar(true);
  };


  const guardarUsuarioDb = async (e) => {

    let usuario = filas.find(e => e.nuevo == true || e.editable == true);
    const { formDataUser, mensaje, error } = generarFormDataDb(usuario);

    try {

      if (error) {
        setMessageModal(mensaje)
        setMostrarModal(true)
        return
      }

      setLoading(true)

      const resposne = usuario.nuevo
        ? await fnQueryInsertUsusario(formDataUser)
        : await fnQueryUpdateUsuarios(formDataUser)

      if (!resposne.state) {
        setLoading(false)
        setMessageModal(resposne.message)
        setMostrarModal(true)
        return
      }

      setLoading(false)
      setMessageModal(resposne.message)
      setMostrarModal(true)
      const event = new CustomEvent("guardoUsuario", {
        detail: ''
      });

      window.dispatchEvent(event);
      cargarListaUsuarios()

    } catch (error) {
      console.log(error);
    }

  };


  const generarFormDataDb = (usuario) => {

    if (!usuario?.NOMBRE || !usuario?.CORREO) {
      return { formDataUser: null, mensaje: 'Por favor, complete todos los campos antes de continuar', error: true };
    };

    const CARGO = listarcargo?.filter(e => e.COD_CARGO == usuario?.CARGO)[0]?.COD_CARGO;
    const OFICINA = listaroficinas?.filter(e => e.COD_OFICINA == usuario?.OFICINA)[0]?.COD_OFICINA;
    const REGIONAL = listarregional?.filter(e => e.COD_REGIONAL_RAD == usuario?.REGIONAL)[0]?.COD_REGIONAL_RAD;
    const CANAL = listarcanal?.filter(e => e.COD_CANAL_RAD == usuario?.CANAL)[0]?.COD_CANAL_RAD;
    const TIPO_APROBADOR = listartipoaprobador?.filter(e => e.cod_aprobador == usuario?.TIPO_APROBADOR)[0]?.cod_aprobador;
    const PERFIL_CLIENTE = listarperfilclientes.perfil?.filter(e => e.codPerfilCliente == usuario?.PERFIL_CLIENTE)[0]?.codPerfilCliente;
    const TIPO_PARAMETRIZADOR = listarparametrizador.perfil?.filter(e => e.codTipPardor == usuario?.TIPO_PARAMETRIZADOR)[0]?.codTipPardor;


    if (!CARGO || !OFICINA || !REGIONAL || !CANAL) {
      return { formDataUser: null, mensaje: 'Por favor, complete todos los campos antes de continuar', error: true }
    };


    const perfiles = [];
    const perilProduto = [];


    let listaPerfil = usuario?.editable ? Array.isArray(usuario?.PERFIL) ? usuario?.PERFIL : JSON.parse(usuario?.PERFIL) : usuario?.PERFIL;


    if (listaPerfil.includes(6)) {
      listaPerfil?.map(e => {
        const filterProductos = [];
        filterProductos.push(listOpcionProducto.filter(p => p.codeOpcionProducto === e)[0]?.codeOpcionProducto);

        for (let i of filterProductos) {
          if (i !== undefined) {
            perilProduto.push(i)
          };
        }

      });
    };


    listaPerfil?.map(e => {
      const filterPerfil = [];
      filterPerfil.push(listarperfil.filter(p => p.COD_PERFIL === e)[0]?.COD_PERFIL);

      for (let i of filterPerfil) {
        if (i !== undefined) {
          perfiles.push(i)
        };
      }
      //perfiles.push(listarperfil.filter(p => p.COD_PERFIL === e)[0]?.COD_PERFIL)
    });


    if (listaPerfil.includes(6)) {
      if (perilProduto.length === 0) {
        return { formDataUser: null, mensaje: 'Debe seleccionar, minimo una de las opciones de radicación producto', error: true };
      };
    };


    if (perfiles.length == 0) {
      return { formDataUser: null, mensaje: 'Por favor, complete todos los campos antes de continuar', error: true };
    };

    /* if (perfiles.length == 2 && ((PERFIL_CLIENTE == '' || !PERFIL_CLIENTE) || (TIPO_PARAMETRIZADOR == '' || !TIPO_PARAMETRIZADOR))) {
      return { formDataUser: null, mensaje: 'Por favor, complete todos los campos antes de continuar', error: true }
    } */


    const requierePerfilCliente = perfiles.includes(2);
    const requiereTipoParametrizador = perfiles.includes(2) && perfiles.includes(4);


    if (
      (requierePerfilCliente && (!PERFIL_CLIENTE || PERFIL_CLIENTE === '')) ||
      (requiereTipoParametrizador && (!TIPO_PARAMETRIZADOR || TIPO_PARAMETRIZADOR === ''))
    ) {
      return {
        formDataUser: null,
        mensaje: 'Por favor, complete todos los campos antes de continuar',
        error: true,
      };
    };


    if (perfiles.length == 1 && (perfiles[0] == 2 && (PERFIL_CLIENTE == '' || !PERFIL_CLIENTE))) {
      return { formDataUser: null, mensaje: 'Por favor, complete todos los campos antes de continuar', error: true }
    };

    if (perfiles.length == 1 && (perfiles[0] == 3 && (TIPO_APROBADOR == '' || !TIPO_APROBADOR))) {
      return { formDataUser: null, mensaje: 'Por favor, complete todos los campos antes de continuar', error: true }
    };

    if (perfiles.length == 1 && (perfiles[0] == 4 && (TIPO_PARAMETRIZADOR == '' || !TIPO_PARAMETRIZADOR))) {
      return { formDataUser: null, mensaje: 'Por favor, complete todos los campos antes de continuar', error: true }
    };


    const formDataUser = new FormData();


    perfiles.forEach(perfil => {
      formDataUser.append('perfiles', perfil);
    });


    formDataUser.set(usuario?.editable ? 'usuario' : 'idUsuario', usuario?.USUARIO);
    formDataUser.set('nombre', usuario?.NOMBRE);
    formDataUser.set('correo', usuario?.CORREO);
    formDataUser.set('cargo', CARGO);
    formDataUser.set('oficina', OFICINA);
    formDataUser.set('regional', REGIONAL);
    formDataUser.set('canal', CANAL);
    formDataUser.set('aprobador', TIPO_APROBADOR);
    formDataUser.set('parametrizador', usuario?.TIPO_PARAMETRIZADOR);
    formDataUser.set('perfilCliente', PERFIL_CLIENTE);
    formDataUser.set('perfilProducto', perilProduto);

    return { formDataUser: formDataUser, mensaje: '', error: false }

  };


  const editarUsuarioDb = async (e) => {
    try {
      let usuario = filas.find(e => e.editable == true);
      const formDataUser = generarFormDataDb(usuario);
      await fnQueryUpdateUsuarios(formDataUser);
      //const resposne = await fnQueryUpdateUsuarios(formDataUser);
      cargarListaUsuarios();

    } catch (error) {
      console.log(error);
    };

  };


  const handleUsuarioBlur = async (index) => {

    if (filas[index] && filas[index].USUARIO.trim() !== '') {

      try {
        const pass = 'kKx3bOeCTr';
        setLoading(true);
        const responseProfile = JSON.parse(await val_fn_profile(filas[index].USUARIO, pass));

        if (responseProfile.codeState !== 401) {
          setMessageModal(codeErrorMessage[responseProfile.codeState])
          setMostrarModal(true)
          return
        }

        let nuevasFilas = [...filas];
        nuevasFilas[index].NOMBRE = responseProfile.name;
        nuevasFilas[index].CORREO = responseProfile.mail;
        setFilas(nuevasFilas);

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

    } else {
      console.log('No hacer validaciones, campo vacío');
    }

  };


  const handlePerfilClientesChange = (value, index) => {
    //setOpcionesSelecionada2(value)
    const nuevasFilas = [...filas];
    nuevasFilas[index].PERFIL_CLIENTE = value;
    setFilas(nuevasFilas);
  };


  const handleTipoAprobadorChange = (value, index) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index].TIPO_APROBADOR = value;
    setFilas(nuevasFilas);
  };


  const handleTipoParametrizadorChange = (value, index) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index].TIPO_PARAMETRIZADOR = value;
    setFilas(nuevasFilas)
  };


  const handleUsuarioKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      handleUsuarioBlur(index);
    }
  };


  const cerrarModal = () => {
    setMostrarModal(!mostrarModal)

  };


  const filtrarOficinas = () => {
    if (filtroOficina.regional) {
      let idRegional = listarregional.find(e => e.COD_REGIONAL_RAD == filtroOficina.regional).COD_REGIONAL_RAD;
      let oficinasFiltradas = listaroficinas.filter((oficina) => oficina.REGIONAL == idRegional);
      return oficinasFiltradas;
    }

    return listaroficinas;

  };


  return (
    <div className=" w-full border border-coomeva_color-grisPestaña2 shadow-md rounded-lg mt-4 overflow-scroll  h-full">
      {/* <div className="  w-full  rounded-lg "> */}
      <div className="w-full  flex   ">
        <p className="bg-coomeva_color-grisPestaña2 py-1"></p>

        <table
          className=" w-full  divide-y divide-gray-300 "
          border={1}
        >
          <thead className=" text-coomeva_color-rojo  text-xs bg-coomeva_color-grisPestaña2 sticky top-0 z-10 ">
            <tr className="divide-x divide-gray-300" >
              <th className="p-4 sticky top-0 bg-coomeva_color-grisPestaña2">USUARIO</th>
              <th className="p-2 w-[10%] text-center">NOMBRE</th>
              <th className="p-3 w-[15%] text-center">CORREO</th>
              <th className="p-3 w-[10%] text-center">CARGO</th>
              <th className="p-3 w-[15%] text-center">REGIONAL</th>
              <th className="p-3 w-[15%] text-center">OFICINA</th>
              <th className="p-3 w-[10%] text-center">CANAL</th>
              <th className="p-3 w-[15%] text-center ">PERFIL PRODUCTOS</th>
              <th className="p-3 w-[10%] text-center">PERFIL CLIENTES</th>
              <th className="p-3 w-[10%] text-center">TIPO APROBADOR</th>
              <th className="p-3 w-[10%] text-center">TIPO PARAMETRIZADOR</th>
            </tr>
          </thead>

          <tbody className="p-8 text-[11.5px] text-coomeva_color-azulOscuro font-semibold">
            {filas.map((fila, index) => (
              <tr key={fila.USUARIO}
                className={`divide-x bg-white divide-gray-300 ${modoEdicion && filaEnfocada === index ? 'border border-blue-500' : ''}`}
                onClick={() => setFilaEnfocada(index)} >
                <td
                  className="p-3 rounded-bl-lg">
                  <input
                    id={index + 'usuario'}
                    type='text' className={`${!(fila?.nuevo) ? '' : ''} border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full`}
                    placeholder="Ingrese código de usuario"
                    value={fila?.USUARIO || ''}
                    onBlur={() => handleUsuarioBlur(index)}
                    onChange={(e) => {
                      const nuevasFilas = [...filas];
                      nuevasFilas[index].USUARIO = e.target.value;
                      setFilas(nuevasFilas);
                      //setUsuario(e.target.value);
                    }}
                    disabled={(fila?.nuevo !== true)}
                    required
                    onKeyDown={(e) => handleUsuarioKeyDown(e, index)}
                  // disabled={modo === 'consulta' || modoEdicion || !fila.editable||!fila.nuevo || !fila.nuevo} // No editable en modo de edición
                  />
                </td>
                <td className="p-3 min-w-[150px] w-[20%]">
                  <input
                    id={index + 'nombre'}
                    type="text"
                    className="border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full"
                    value={fila.NOMBRE} readOnly required />
                </td>
                <td className="p-3 min-w-[115px] w-[20%]">
                  <input
                    id={index + 'email'}
                    type="email"
                    className="border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full"
                    value={fila.CORREO}
                    readOnly
                    required />
                </td>
                <td className="p-3 min-w-[115px] w-[20%]">
                  <select
                    id={index + 'cargo'}
                    className={`border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full h-full relative`}
                    value={fila.CARGO}
                    onChange={(e) => {
                      const nuevasFilas = [...filas];
                      nuevasFilas[index].CARGO = e.target.value;
                      setFilas(nuevasFilas);
                      //setCargo(e.target.value);
                    }}
                    disabled={!fila.editable && !fila.nuevo}
                    required
                  >
                    <option
                      value="">Seleccione cargo
                    </option>
                    {listarcargo.map((option) => (<option key={option.COD_CARGO} value={option.COD_CARGO}>{option.CARGO} </option>))}
                  </select>
                </td>
                <td className="p-3 min-w-[115px] w-[20%]">
                  <select
                    id={index + 'regional'}
                    className={`border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full h-full`}
                    value={fila.REGIONAL || ''}
                    onChange={(e) => {
                      const nuevasFilas = [...filas];
                      nuevasFilas[index].REGIONAL = e.target.value;
                      setFilas(nuevasFilas);
                      //setRegional(e.target.value);
                      setFiltroOficina({ index, regional: e.target.value })
                    }}
                    required
                    disabled={!fila.editable && !fila.nuevo}
                  >
                    <option
                      value="">Seleccione regional
                    </option>
                    {listarregional.map((option) => (<option key={option.COD_REGIONAL_RAD} value={option.COD_REGIONAL_RAD}>{option.REGIONAL_RAD} </option>))}
                  </select>
                </td>
                <td className="p-3 min-w-[150px] w-[20%]">
                  <select
                    id={index + 'oficina'}
                    className={`border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full h-full`}
                    value={fila?.OFICINA || ''}
                    onChange={(e) => {
                      const nuevasFilas = [...filas];
                      nuevasFilas[index].OFICINA = e.target.value;
                      setFilas(nuevasFilas);
                      //setOficina(e.target.value);
                    }}
                    disabled={!fila.editable && !fila.nuevo}
                    required
                  >
                    <option
                      value="">Seleccione oficina
                    </option>
                    {fila.editable || fila.nuevo ?
                      filtrarOficinas().map((option) => (<option key={option.COD_OFICINA} value={option.COD_OFICINA}>{option.OFICINA} </option>)) :
                      listaroficinas.map((option) => (<option key={option.COD_OFICINA} value={option.COD_OFICINA}>{option.OFICINA} </option>))}
                  </select>
                </td>
                <td className="p-3 min-w-[115px] w-[20%]">
                  <select
                    id={index + 'canal'}
                    className={`border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full h-full`}
                    value={fila?.CANAL || ''}
                    onChange={(e) => {
                      const nuevasFilas = [...filas];
                      nuevasFilas[index].CANAL = e.target.value;
                      setFilas(nuevasFilas);
                    }}
                    disabled={!fila.editable && !fila.nuevo}
                    required>
                    <option
                      value="">Seleccione canal
                    </option>
                    {listarcanal.map((option) => (<option key={option.COD_CANAL_RAD} value={option.COD_CANAL_RAD}>{option.CANAL_RAD} </option>))}
                  </select>
                </td>
                <td className="p-3 relative text-center  ">
                  <DropdownList
                    multiselect={true}
                    opcionesSelecionada={Array.isArray(fila?.PERFIL) ? fila?.PERFIL : JSON.parse(fila?.PERFIL)}
                    index={index}
                    setOpcionesSelecionada={handlePerfilProductosChange}
                    idLista={'COD_PERFIL'}
                    descripcion={'PERFIL'}
                    ListOpciones={listarperfil}
                    subOpciones={listOpcionProducto}
                    habilitar={!fila.editable && !fila.nuevo}
                  />
                </td>
                <td className="px-2 min-w-[150px] w-[20%] ">
                  <DropdownList
                    multiselect={false}
                    opcionesSelecionada={fila.PERFIL_CLIENTE}
                    index={index}
                    setOpcionesSelecionada={handlePerfilClientesChange}
                    idLista={'codPerfilCliente'}
                    descripcion={'descripcion'}
                    ListOpciones={
                      listarperfilclientes?.perfil
                    }
                    habilitar={!(fila.editable || fila.nuevo) || (Array.isArray(fila.PERFIL) ? !fila.PERFIL.includes(2) : fila.PERFIL !== 2)}
                  />
                </td>
                <td className="p-3 min-w-[150px] w-[20%]">
                  <select
                    id={index + 'tipo_aprobador'}
                    value={fila?.TIPO_APROBADOR || ''}
                    onChange={(e) => handleTipoAprobadorChange(e.target.value, index)}
                    className={`border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full h-full`}
                    disabled={
                      !(fila.editable || fila.nuevo) || !opcionesSelecionada.includes(3)
                    }
                    required
                  >
                    <option value="">Seleccione tipo aprobador</option>
                    {listartipoaprobador.map((option) => (<option key={option.cod_aprobador} value={option.cod_aprobador}>
                      {option.tipo_aprobador}
                    </option>))}
                  </select>
                </td>
                <td className="p-3 min-w-[180px] w-[30%]">
                  <select
                    id={index + 'tipo_parametrizador'}
                    className={`border-2 border-coomeva_color-azulOscuro rounded-md p-2 w-full h-full`}
                    value={fila?.TIPO_PARAMETRIZADOR || ''}
                    onChange={(e) => handleTipoParametrizadorChange(e.target.value, index)}
                    disabled={!(fila.editable || fila.nuevo) || !opcionesSelecionada.includes(4)}
                    required >
                    <option
                      value="">Seleccione Tipo Parametrizador
                    </option>
                    {listarparametrizador?.perfil?.map((option, index) => (
                      <option key={option.codTipPardor} value={option.codTipPardor}>
                        {option.descripcion} </option>))}
                  </select>
                </td>
                <td className="p-3 w-[5%] flex space-x-3">
                  <button disabled={fila.nuevo == true} onClick={() => activarModoEdicion(index, fila.USUARIO)}>
                    <i className={`text-2xl ${fila.nuevo == true ? 'text-coomeva_color-grisPestaña2 ' : 'text-coomeva_color-rojo'}  pointer-events-none`}>
                      <TbEdit />
                    </i>
                  </button>
                  <button disabled={fila.nuevo == true} onClick={() => confirmarEliminar(index, fila.USUARIO)}>
                    <i className={`text-2xl ${fila.nuevo == true ? 'text-coomeva_color-grisPestaña2 ' : 'text-coomeva_color-rojo'}  pointer-events-none`}>
                      <TbTrashXFilled />
                    </i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="bg-white py-1"></p>
      </div>
      {/* <div className="flex justify-center items-center w-[10%] h-[10%]"> */}
      {/*<button id={solicitud.COD_SOLICITUD} onClick={(e) => { detallesSolicitud(e, solicitud.Aprobacion) }} className=" transition duration-300 ease-in-out bg-white text-center text-sm text-coomeva_color-rojo border rounded-lg border-red-500 hover:bg-coomeva_color-rojo hover:text-white w-[70%] py-6">
                Ingresar
              </button>*/}
      {/* </div> */}
      {/* </div> */}
      {
        (mostrarModal)
        &&
        <DynamicModal titulo={'Notificación'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModal}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
        </DynamicModal>
      }
      {
        (mostrarModalConfirmar) ?
          <DynamicModal titulo={'Notificación'} mostrarImagneFondo={true} mostrarModal={handleDelete} cerrarModal={() => { setMostrarModalConfirmar(false) }}>
            <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
          </DynamicModal>
          : undefined
      }
      {
        loading && <Loading />
      }
    </div>
  );
};