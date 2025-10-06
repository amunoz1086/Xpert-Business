'use client';

import React, { useEffect, useState } from "react";
/* components */
import ModalMenu from "@/app/components/share/Mdl";
/* function */
import { fnQueryListarCargos } from "@/app/lib/admin/usuarios/queryListarCargo";
import { fnQueryListarOficinas } from "@/app/lib/admin/usuarios/queryListarOficinas";
import { fnQueryListarRegional } from "@/app/lib/admin/usuarios/queryListarRegional";
import { fnQueryListarCanal } from "@/app/lib/admin/usuarios/queryListarCanal";
import { fnQueryListarPerfil } from "@/app/lib/admin/usuarios/queryListarPerfil";
import { fnQueryListarTipoAprobador } from "@/app/lib/admin/usuarios/queryListarTipoAprobador";
import { fnQueryListarUsuarios } from "@/app/lib/admin/usuarios/queryListarUsuarios";
import { fnQueryUsuarios } from "@/app/lib/admin/usuarios/queryUsuario";
import { fnQueryUpdateUsuarios } from "@/app/lib/admin/usuarios/queryUpdateUsuario";
import { fnQueryInsertUsusario } from "@/app/lib/admin/usuarios/queryInsertUsuario";
import { fnDeleteUsuarios } from "@/app/lib/admin/usuarios/queryDeleteUsuario";
import { val_fn_profile } from "@/app/lib/auth/fn_profile";
import Loading from "../../share/Loading";

const Usuarios = () => {

    /* estado inicial de datos */
    const [usuario, setUsuario] = useState("");

    /* estado inicial de las listas */
    const [listItemsOficina, setListItemsOficina] = useState([]);
    const [listItemsCargo, setListItemsCargo] = useState([]);
    const [listItemsRegional, setListItemsRegional] = useState([]);
    const [listItemsCanal, setListItemsCanal] = useState([]);
    const [listItemsPerfil, setListItemsPerfil] = useState([]);
    const [listItemsAprobador, setListItemsAprobador] = useState([]);

    /* estado inicial botones */
    const [btnConsultar, setBtnConsultar] = useState('Consultar');
    const [btnEditar, setBtnEditar] = useState('Editar');
    const [btnEliminar] = useState('Eliminar');
    const [btnNuevo, setBtnNuevo] = useState('Nuevo');

    /* estado inicial modal  */
    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [valueBtnOne, setValueBtnOne] = useState('');
    const [valueBtnSecond, setValueBtnSecond] = useState('');
    const [visibBtnOne, setVisibBtnOne] = useState('');
    const [visibBtnSecond, setVisibBtnSecond] = useState('');
    const [fnBtnOne, setFnBtnOne] = useState();
    const [fnBtnSecond, setFnBtnSecond] = useState();

    /* datos cache */
    const [dataOficinas, setDataOficinas] = useState({});

    /* Loading */
    const [showLoading, setShowLoading] = useState(false);

    /* funciones */
    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const enterId = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            consultar();
        }
    };

    const enterUsusario = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const focusIdUsuario = document.getElementById('cargo');
            focusIdUsuario.focus();
        }
    };

    const focusInputUser = () => {
        const focusIdUsuario = document.getElementById('userId');
        focusIdUsuario.focus();
        focusIdUsuario.value = '';
    };

    const callModal = (showModal, messageModal, valueBtnModalOne, valueBtnModalSecond, visibBtnOneModal, visibBtnSecondModal, codeBtnOne, codeBtnSecond) => {
        setShowModal(showModal);
        setMessageAlert(messageModal);
        setValueBtnOne(valueBtnModalOne);
        setValueBtnSecond(valueBtnModalSecond);
        setVisibBtnOne(visibBtnOneModal);
        setVisibBtnSecond(visibBtnSecondModal);
        setFnBtnOne(codeBtnOne);
        setFnBtnSecond(codeBtnSecond);
    };

    const endModal = (showModal) => {
        setShowModal(showModal);
    };

    const setRequiredElmenteForm = () => {
        document.frmDataUser.idUsuario.setAttribute('required', true);
        document.frmDataUser.nombre.setAttribute('required', true);
        document.frmDataUser.correo.setAttribute('required', true);
        document.frmDataUser.cargo.setAttribute('required', true);
        document.frmDataUser.oficina.setAttribute('required', true);
        document.frmDataUser.regional.setAttribute('required', true);
        document.frmDataUser.canal.setAttribute('required', true);
        document.frmDataUser.perfiles.setAttribute('required', true);
    };

    const removeRequiredElmenteForm = () => {
        document.frmDataUser.idUsuario.removeAttribute('required');
        document.frmDataUser.nombre.removeAttribute('required');
        document.frmDataUser.correo.removeAttribute('required');
        document.frmDataUser.cargo.removeAttribute('required');
        document.frmDataUser.oficina.removeAttribute('required');
        document.frmDataUser.regional.removeAttribute('required');
        document.frmDataUser.canal.removeAttribute('required');
        document.frmDataUser.perfiles.removeAttribute('required');
        document.frmDataUser.aprobador.removeAttribute('required');
    };

    const setHiddenElmenteForm = () => {
        document.frmDataUser.idUsuario.setAttribute('hidden', true);
        document.frmDataUser.nombre.setAttribute('hidden', true);
        document.frmDataUser.correo.setAttribute('hidden', true);
        document.frmDataUser.cargo.setAttribute('hidden', true);
        document.frmDataUser.oficina.setAttribute('hidden', true);
        document.frmDataUser.regional.setAttribute('hidden', true);
        document.frmDataUser.canal.setAttribute('hidden', true);
        document.frmDataUser.perfiles.setAttribute('hidden', true);
        document.frmDataUser.aprobador.setAttribute('hidden', true);
        document.frmDataUser.setAttribute('hidden', true);
    };

    const removeHiddenElmenteForm = () => {
        document.frmDataUser.idUsuario.removeAttribute('hidden');
        document.frmDataUser.nombre.removeAttribute('hidden');
        document.frmDataUser.correo.removeAttribute('hidden');
        document.frmDataUser.cargo.removeAttribute('hidden');
        document.frmDataUser.oficina.removeAttribute('hidden');
        document.frmDataUser.regional.removeAttribute('hidden');
        document.frmDataUser.canal.removeAttribute('hidden');
        document.frmDataUser.perfiles.removeAttribute('hidden');
        document.frmDataUser.removeAttribute('hidden');
    };

    const setDisabledElmenteForm = () => {
        document.frmDataUser.idUsuario.setAttribute('disabled', true);
        document.frmDataUser.nombre.setAttribute('disabled', true);
        document.frmDataUser.correo.setAttribute('disabled', true);
        document.frmDataUser.cargo.setAttribute('disabled', true);
        document.frmDataUser.oficina.setAttribute('disabled', true);
        document.frmDataUser.regional.setAttribute('disabled', true);
        document.frmDataUser.canal.setAttribute('disabled', true);
        document.frmDataUser.perfiles.setAttribute('disabled', true);
        document.frmDataUser.aprobador.setAttribute('disabled', true);
    };

    const removeDisabledElmenteForm = (removeStatus) => {
        removeStatus ? document.frmDataUser.idUsuario.removeAttribute('disabled') : document.frmDataUser.idUsuario.setAttribute('disabled', true);
        removeStatus ? document.frmDataUser.nombre.removeAttribute('disabled') : document.frmDataUser.nombre.setAttribute('disabled', true);
        removeStatus ? document.frmDataUser.correo.removeAttribute('disabled') : document.frmDataUser.correo.setAttribute('disabled', true);
        document.frmDataUser.cargo.removeAttribute('disabled');
        document.frmDataUser.oficina.removeAttribute('disabled');
        document.frmDataUser.regional.removeAttribute('disabled');
        document.frmDataUser.canal.removeAttribute('disabled');
        document.frmDataUser.perfiles.removeAttribute('disabled');
    };

    const statusEditar = (editStatus) => {
        let btnEditStatus = document.getElementById('btnEditar')
        if (editStatus) {
            btnEditStatus.removeAttribute('disabled');
            btnEditStatus.classList.replace('disabled_btn-user', 'btn-user');
        } else {
            btnEditStatus.setAttribute('disabled', true);
            btnEditStatus.classList.replace('btn-user', 'disabled_btn-user');
        }
    };

    const statusEliminar = (elitStatus) => {
        let btnElitStatus = document.getElementById('btnEliminar')
        if (elitStatus) {
            btnElitStatus.removeAttribute('disabled');
            btnElitStatus.classList.replace('disabled_btn-user', 'btn-user');
        } else {
            btnElitStatus.setAttribute('disabled', true);
            btnElitStatus.classList.replace('btn-user', 'disabled_btn-user');
        };
    };

    const statusCancelar = (editCancelar) => {
        let btnCancelarStatus = document.getElementById('btnCancelar')
        if (editCancelar) {
            btnCancelarStatus.removeAttribute('disabled');
            btnCancelarStatus.classList.replace('disabled_btn-user', 'btn-user');
        } else {
            btnCancelarStatus.setAttribute('disabled', true);
            btnCancelarStatus.classList.replace('btn-user', 'disabled_btn-user');
        }
    };

    const statusPerfil = (e, numPerfiles) => {
        if (e.target?.value === '3') {
            document.getElementById('thAprobador').removeAttribute('hidden');
            document.getElementById('tdAprobador').removeAttribute('hidden');
            document.frmDataUser.aprobador.removeAttribute('hidden');
            document.frmDataUser.aprobador.removeAttribute('disabled');
            document.frmDataUser.aprobador.setAttribute('required', true);
        } else {
            document.frmDataUser.aprobador.setAttribute('hidden', true);
            document.frmDataUser.aprobador.setAttribute('disabled', true);
            document.frmDataUser.aprobador.removeAttribute('required');
            document.getElementById('thAprobador').setAttribute('hidden', true);
            document.getElementById('tdAprobador').setAttribute('hidden', true);
        };
        for (let i = 0; i < numPerfiles; i++) {
            document.frmDataUser.perfiles.options[i].style.color = 'black';
        };
    };

    const refrescar = () => {
        setBtnConsultar('Consultar');
        setBtnEditar('Editar');
        setBtnNuevo('Nuevo');
        setUsuario('');
        document.frmUsuario.reset();
        document.frmDataUser.reset();
        setDisabledElmenteForm();
        setHiddenElmenteForm();
        removeRequiredElmenteForm();
        document.getElementById('thAprobador').setAttribute('hidden', true);
        document.getElementById('tdAprobador').setAttribute('hidden', true);
        document.frmDataList.removeAttribute('hidden');
        statusEditar(false);
        statusEliminar(false);
        statusCancelar(false);

        if (setShowModal) {
            endModal(false)
        };

        loadListUsuarios();
        focusInputUser();
    };

    /* botones */
    const consultar = async (e) => { /* btn Consultar */
        if (!usuario) {
            callModal(true, 'Ingrese el usuario a consultar', 'Ok', '', '', 'none', () => cancelar, null);
        } else {
            try {
                refrescar();
                statusCancelar(true);
                fnQuery();
            } catch (error) {
                console.log(error);
            };
        };
    };

    const fnQuery = async () => {
        try {
            let dtResult = await fnQueryUsuarios(usuario);
            renderUsuario(JSON.parse(dtResult));
        } catch (error) {
            console.log(error);
        };
    };

    const renderUsuario = (dtResult) => {
        if (dtResult.STATUS) {
            removeHiddenElmenteForm();
            document.frmDataList.setAttribute('hidden', true);

            document.frmDataUser.idUsuario.value = dtResult.ID_USUARIO;
            document.frmDataUser.nombre.value = dtResult.NOMBRE;
            document.frmDataUser.correo.value = dtResult.CORREO;
            document.frmDataUser.cargo.value = dtResult.COD_CARGO
            document.frmDataUser.oficina.value = dtResult.COD_OFICINA;
            document.frmDataUser.regional.value = dtResult.COD_REGIONAL;
            document.frmDataUser.canal.value = dtResult.COD_CANAL;

            if (dtResult.PERFIL.length > 1) {
                document.frmDataUser.perfiles.multiple = true;
                document.frmDataUser.perfiles.value = dtResult.PERFIL;
                for (const element of dtResult.PERFIL) {
                    document.frmDataUser.perfiles.value = element;
                    document.frmDataUser.perfiles.options[document.frmDataUser.perfiles.selectedIndex].style.color = 'firebrick'
                }
            } else {
                document.frmDataUser.perfiles.multiple = false;
                statusPerfil(document.frmDataUser.perfiles.length);
                document.frmDataUser.perfiles.value = dtResult.PERFIL;
            }

            if (dtResult.ENTE !== 0) {
                document.getElementById('thAprobador').removeAttribute('hidden');
                document.getElementById('tdAprobador').removeAttribute('hidden');
                document.frmDataUser.aprobador.removeAttribute('hidden');
                document.frmDataUser.aprobador.value = dtResult.ENTE;
            };

            statusEditar(true);
            statusEliminar(true);
        } else {
            callModal(true, `Usuario: '${usuario.id}', no encontrado`, 'Ok', '', '', 'none', () => refrescar);
        };
    };

    const usuarioEditar = () => { /* btn Editar */
        let btnEdit = document.getElementById('btnEditar').value;
        if (btnEdit === 'Editar') {
            setBtnEditar('Guardar');
            statusCancelar(true);
            removeDisabledElmenteForm(false);
            document.frmDataUser.perfiles.multiple = true;
            if (document.frmDataUser.aprobador.value !== 'DEFAULT') {
                document.frmDataUser.aprobador.removeAttribute('disabled');
            };
            document.frmDataUser.cargo.focus();
        } else {
            callModal(true, `Se almacenaran los cambios, ¿Desea continuar? `, 'Continuar', 'Cancelar', '', '', () => Guardar, () => cancelar);
        }
    };

    const usuarioEliminar = async () => {
        const userValue = document.getElementById('idUsuario').value;
        callModal(true, `El usuario ${userValue} será eliminado y perderá los accesos a la aplicación, ¿Desea continuar? `, 'Continuar', 'Cancelar', '', '', () => eliminar, () => cancelar);
    };

    const eliminar = async () => {
        setShowLoading(true)
        try {
            const responseEliminar = JSON.parse(await fnDeleteUsuarios(document.getElementById('idUsuario').value))
            if (responseEliminar === 200) {
                setShowLoading(false);
                callModal(true, `Usuario eliminado`, 'Ok', '', '', 'none', () => refrescar);
                document.frmDataList.removeAttribute('hidden');
            } else {
                setShowLoading(false);
                callModal(true, `No fue posible eliminar el usuario, intentelo nuevamente `, '', 'Ok', 'none', '', null, () => cancelar);
            };
        } catch (e) {
            console.log(e);
        };
    };

    const Guardar = async () => {
        setShowModal(false);
        let frmDataEdit = new FormData(document.frmDataUser);
        frmDataEdit.set('usuario', document.getElementById('idUsuario').value);
        try {

            let dataPerfil = Object.values(frmDataEdit.getAll('perfiles'));
            let validateDataPerfil = fnValidateDataPerfil(dataPerfil);
            if (validateDataPerfil) {
                fnQueryUpdate(frmDataEdit);
            };

        } catch (e) {
            console.error(e);
        }
    };

    const fnQueryUpdate = async (frmDataUpdate) => {
        try {
            let dataResult = await fnQueryUpdateUsuarios(frmDataUpdate);
            if (dataResult.state) {
                callModal(true, `${dataResult.message} `, 'Ok', '', '', 'none', () => refrescar);
                document.frmDataList.removeAttribute('hidden');
            } else {
                callModal(true, `${dataResult.message} `, '', 'Ok', 'none', '', null, () => cancelar);
            };
        } catch (error) {
            console.log(error);
        };
    };

    const usuarioNuevo = async () => {
        let btnNuev = document.getElementById('btnUserNuevo').value;
        if (btnNuev === 'Nuevo') {
            refrescar();
            statusCancelar(true);
            setBtnNuevo('Guardar');
            removeHiddenElmenteForm();
            removeDisabledElmenteForm(true);
            setRequiredElmenteForm();
            document.frmDataList.setAttribute('hidden', true);
            document.frmDataUser.perfiles.multiple = true;
            document.frmDataUser.idUsuario.focus();
        } else {
            let frmDataInsert = document.getElementById('frmDataUser');
            if (frmDataInsert.checkValidity()) {
                callModal(true, `Insertara un nuevo usuario ¿Desea continuar? `, 'Continuar', 'Cancelar', '', '', () => Adicionar, () => cancelar);
            } else {
                callModal(true, 'Algunos campos no cumplen las condiciones, validelos e intenté nuevamente', '', 'Ok', 'none', '', null, () => cancelar);
            };
        };
    };

    const Adicionar = async () => {
        setShowModal(false);
        let frmDataInsert = new FormData(document.frmDataUser);

        try {
            let dataPerfil = Object.values(frmDataInsert.getAll('perfiles'));
            let validateDataPerfil = fnValidateDataPerfil(dataPerfil);
            if (validateDataPerfil) {
                fnQueryInsert(frmDataInsert);
            };
        } catch (e) {
            console.error(e);
        }
    };

    const fnQueryInsert = async (frmDataInsert) => {
        try {
            let dtResult = await fnQueryInsertUsusario(frmDataInsert);
            if (dtResult.state) {
                callModal(true, `${dtResult.message} `, 'Ok', '', '', 'none', () => refrescar, null);
                document.frmDataList.removeAttribute('hidden');
            } else {
                callModal(true, `${dtResult.message} `, '', 'Ok', 'none', '', null, () => cancelar);
            };
        } catch (error) {
            console.log(error);
        }
    };

    const fnValidateDataPerfil = (dataPerfil) => {
        let dataAutorización;
        if (dataPerfil.length > 2) {
            callModal(true, `Solo se permiten dos perfiles por usuario`, '', 'Ok', 'none', '', null, () => cancelar);
            return false;
        } else if (dataPerfil.length === 1) {
            return true;
        } else {
            if (parseInt(dataPerfil[0]) === 2 && parseInt(dataPerfil[1]) === 4) {
                dataAutorización = true;
            } else {
                dataAutorización = false;
            };
        }
        if (!dataAutorización) {
            callModal(true, `Solo se permiten los perfiles: Radicación + Parametrizacion, para un perfil dual`, '', 'Ok', 'none', '', null, () => cancelar);
            return false;
        } else {
            return true;
        };
    };

    const cancelar = () => {
        setShowModal(false);
        focusInputUser();
    };

    /* css */
    /* const sizeElementRowUser = {
        width: '98%',
        height: '2.5rem',
    };
 */
    /* Load listas desplegables */
    useEffect(() => {

        loadListCargo();
        loadListOficina();
        loadListRegional();
        loadListCanal();
        loadListPerfil();
        loadListAprobador();
        loadListUsuarios();
        statusEditar(false);
        statusEliminar(false);
        statusCancelar(false);
        document.getElementById('btnGuardar').classList.add('invisible');

    }, []);

    const loadListCargo = async () => {
        try {
            let dataResult = await fnQueryListarCargos();
            setListItemsCargo(dataResult.cargos.map(cargos => <option key={cargos.COD_CARGO} value={cargos.COD_CARGO} >{cargos.CARGO}</option>));
        } catch (error) {
            console.log(error);
        };
    };

    const loadListOficina = async () => {
        try {
            let dataResult = await fnQueryListarOficinas();
            setDataOficinas(dataResult.oficinas);
            setListItemsOficina(dataResult.oficinas.map(offices => <option key={offices.COD_OFICINA} value={offices.COD_OFICINA} >{offices.OFICINA}</option>));
        } catch (error) {
            console.log(error);
        };
    };

    const loadListRegional = async () => {
        let dataResult = await fnQueryListarRegional();
        setListItemsRegional(dataResult.regional.map(regional => <option key={regional.COD_REGIONAL_RAD} value={regional.COD_REGIONAL_RAD} >{regional.REGIONAL_RAD}</option>));
    };

    const loadListCanal = async () => {
        let dataResult = await fnQueryListarCanal();
        setListItemsCanal(dataResult.canal.map(canal => <option key={canal.COD_CANAL_RAD} value={canal.COD_CANAL_RAD} >{canal.CANAL_RAD}</option>));
    };

    const loadListPerfil = async () => {
        let dataResult = await fnQueryListarPerfil();
        setListItemsPerfil(dataResult.perfil.map(perfil => <option key={perfil.COD_PERFIL} value={perfil.COD_PERFIL} >{perfil.PERFIL}</option>));
    };

    const loadListAprobador = async () => {
        let dataResult = await fnQueryListarTipoAprobador()
        setListItemsAprobador(dataResult.aprobador.map(aprobador => <option key={aprobador.cod_aprobador} value={aprobador.cod_aprobador} >{aprobador.tipo_aprobador}</option>));
    };

    const filtrarOficinas = (codRegional) => {
        let listadoOfinasfiltro = dataOficinas.filter((oficina) => codRegional.includes(oficina.REGIONAL));
        setListItemsOficina(listadoOfinasfiltro.map(offices => <option key={offices.COD_OFICINA} id={offices.COD_OFICINA} data-regional={offices.REGIONAL} value={offices.COD_OFICINA}>{offices.OFICINA}</option>));
    };

    const loadListUsuarios = async () => {

        try {
            setShowLoading(true);
            let dataResult = JSON.parse(await fnQueryListarUsuarios());

            if (dataResult.status === 200) {
                fnListData(dataResult.data)
            } else {
                setShowLoading(false)
                callModal(true, 'No fue posible cargar el listado de usuarios, recargue la pagina', 'Ok', '', '', 'none', () => cancelar, null);
            };

        } catch (error) {
            setShowLoading(false)
            console.log('loadListUsuarios:', error);
        };

    };

    const fnListData = (dataList) => {
        let contRow = 0;
        const tbody = document.getElementById('dataList');
        const valChidrens = valNodo(tbody);

        if (valChidrens) {
            for (const row of dataList) {
                const tr = document.createElement('tr');
                tr.id = row.USUARIO;
                tr.dataset.dKey = row.USUARIO;

                const dataRow = (Object.values(row));
                dataRow.unshift(contRow + 1);

                let contUsuario = 0
                for (let list of dataRow) {
                    const td = document.createElement('td');
                    let classList = contUsuario === 0 ? 'colorTd' : 'elementRow';
                    td.className = classList;

                    const input = document.createElement('input');
                    input.id = `${row.USUARIO}_${contUsuario}`;
                    input.name = row.USUARIO;
                    input.dataset.data = row.USUARIO;
                    input.type = 'text';
                    input.className = 'classInput';
                    input.readOnly = true;
                    input.value = list;
                    input.onclick = (e) => fnConsulta(e)

                    tr.appendChild(td);
                    td.appendChild(input);

                    contUsuario++
                };

                tbody.appendChild(tr);
                contRow++;
            };
        };

        setShowLoading(false);
    };

    const fnConsulta = (e) => {
        let elementUsuario = document.getElementById('userId')
        elementUsuario.value = e.target.dataset.data
        setUsuario({ id: e.target.dataset.data });
    }

    const valFnProfile = async (e) => {
        const pass = 'kKx3bOeCTr';
        if (e.target.value === '') {
            callModal(true, 'Ingrese el usuario', 'Ok', '', '', 'none', () => cerrarModal, null);
            return
        };

        setShowLoading(true);
        const responseProfile = JSON.parse(await val_fn_profile(e.target.value, pass));

        switch (responseProfile.codeState) {
            case 401:
                setShowLoading(false)
                document.frmDataUser.nombre.value = responseProfile.name;
                document.frmDataUser.correo.value = responseProfile.mail;
                break;
            case '202':
                setShowLoading(false)
                callModal(true, 'Usuario no existe', 'Ok', '', '', 'none', () => cerrarModal, null);
                break;
            case 500:
                setShowLoading(false)
                callModal(true, 'Directorio activo no disponible', 'Ok', '', '', 'none', () => cerrarModal, null);
                break;
            default:
                break;
        }
    };

    const valNodo = (nodo) => {
        if (nodo.childNodes.length > 0) {
            while (nodo.firstChild) {
                nodo.removeChild(nodo.firstChild);
            };
        };

        return true;
    };

    const cerrarModal = () => {
        setShowModal(false);
    };

    const focusNombreCorreo = () => {
        let idUsuarioFocus = document.getElementById('cargo');
        idUsuarioFocus.focus();
    };

    return (
        <>
            {
                showLoading && <Loading />
            }

            {showModal ? (
                <ModalMenu
                    clickBtnOne={fnBtnOne}
                    clickBtnSecond={fnBtnSecond}
                    viewBtnOne={visibBtnOne}
                    viewBtnSecond={visibBtnSecond}
                    modalMenssage={messageAlert}
                    valBtnOne={valueBtnOne}
                    valBtnSecond={valueBtnSecond}
                />
            ) : null}

            <div className="">
                <div className="container-user">
                    <section className=" mt-10 ">
                        <form name="frmUsuario" onSubmit={() => Adicionar()}>
                            <div className="flex">
                                <div className="hr mr-3">
                                    <label className="label-user" htmlFor='userId'>Usuario:</label>
                                    <input
                                        onKeyDown={enterId}
                                        onChange={handleChange}
                                        type="text"
                                        id="userId"
                                        name="id"
                                        className="text-right mr-3 focus: outline-0"
                                        placeholder="Digite el usuario"
                                        autoComplete="off"
                                        tabIndex={0}
                                        autoFocus
                                        required
                                    />
                                </div>
                                <input
                                    onClick={(e) => consultar(e)}
                                    type="button"
                                    id="btnConsulta"
                                    value={btnConsultar}
                                    tabIndex={0}
                                    className="btn-user sizeBtn ml-6"
                                />
                                <input
                                    onClick={usuarioEditar}
                                    type="button"
                                    id="btnEditar"
                                    value={btnEditar}
                                    tabIndex={0}
                                    className="disabled_btn-user mr-6 ml-6 sizeBtn"
                                />
                                <input
                                    onClick={usuarioEliminar}
                                    type="button"
                                    id="btnEliminar"
                                    value={btnEliminar}
                                    tabIndex={0}
                                    className="disabled_btn-user mr-6 ml-6 sizeBtn"
                                />
                                <input
                                    onClick={usuarioNuevo}
                                    type="button"
                                    id="btnUserNuevo"
                                    value={btnNuevo}
                                    tabIndex={0}
                                    className="btn-user sizeBtn"
                                />
                            </div>
                        </form>
                    </section>
                    <section className="section-top">
                        <form id="frmDataUser" name="frmDataUser" hidden>
                            <table className=" table-fixed border-collapse w-full border-slate-400 mb-10">
                                <thead>
                                    <tr>
                                        <th className="border-x-0 border-b-2 label">USUARIO</th>
                                        <th className="border-x-0 border-b-2 label">NOMBRE</th>
                                        <th className="border-x-0 border-b-2 label">CORREO</th>
                                        <th className="border-x-0 border-b-2 label">CARGO</th>
                                        <th className="border-x-0 border-b-2 label">REGIONAL</th>
                                        <th className="border-x-0 border-b-2 label">OFICINA</th>
                                        <th className="border-x-0 border-b-2 label">CANAL</th>
                                        <th className="border-x-0 border-b-2 label">PERFIL</th>
                                        <th className="border-x-0 border-b-2 label" id="thAprobador" hidden>TIPO APROBADOR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="">
                                            <input
                                                type="text"
                                                id="idUsuario"
                                                name="idUsuario"
                                                tabIndex={0}
                                                disabled
                                                hidden
                                                autoComplete="off"
                                                className="text-sm sizeElementRowUser"
                                                onBlur={(e) => valFnProfile(e)}
                                                onKeyDown={enterUsusario}
                                            />
                                        </td>
                                        <td className="">
                                            <input
                                                type="text"
                                                name="nombre"
                                                tabIndex={0}
                                                disabled
                                                hidden
                                                autoComplete="off"
                                                className="text-sm sizeElementRowUser"
                                                onFocus={focusNombreCorreo}
                                            />
                                        </td>
                                        <td className="">
                                            <input
                                                type="email"
                                                name="correo"
                                                tabIndex={0}
                                                disabled
                                                hidden
                                                autoComplete="off"
                                                className="text-sm sizeElementRowUser"
                                                onFocus={focusNombreCorreo}
                                            />
                                        </td>
                                        <td className="">
                                            <select
                                                id="cargo"
                                                name="cargo"
                                                tabIndex={0}
                                                className="text-sm sizeElementRowUser"
                                                defaultValue={''}
                                                disabled
                                                hidden
                                            >
                                                <option value="" disabled>Seleccione Cargo</option>
                                                {listItemsCargo}
                                            </select>
                                        </td>
                                        <td className="">
                                            <select
                                                name="regional"
                                                className="text-sm sizeElementRowUser"
                                                defaultValue={''}
                                                disabled
                                                hidden
                                                onChange={(e) => filtrarOficinas(e.target.value)}
                                            >
                                                <option value="" disabled>Seleccione Regional</option>
                                                {listItemsRegional}
                                            </select>
                                        </td>
                                        <td className="">
                                            <select
                                                name="oficina"
                                                className="text-sm sizeElementRowUser"
                                                defaultValue={''}
                                                disabled
                                                hidden
                                            >
                                                <option value="" disabled>Seleccione Oficina</option>
                                                {listItemsOficina}
                                            </select>
                                        </td>
                                        <td className="">
                                            <select
                                                name="canal"
                                                className="text-sm sizeElementRowUser"
                                                defaultValue={''}
                                                disabled
                                                hidden
                                            >
                                                <option value="" disabled>Seleccione Canal</option>
                                                {listItemsCanal}
                                            </select>
                                        </td>
                                        <td className="">
                                            <select
                                                onChange={(e) => statusPerfil(e, document.frmDataUser.perfiles.length)}
                                                name="perfiles"
                                                className="text-sm sizeElementRowUser"
                                                defaultValue={''}
                                                disabled
                                                hidden
                                            >
                                                <option value="" disabled>Seleccione Perfil</option>
                                                {listItemsPerfil}
                                            </select>
                                        </td>
                                        <td className="" id="tdAprobador" hidden>
                                            <select
                                                name="aprobador"
                                                className="text-sm sizeElementRowUser"
                                                defaultValue={''}
                                                disabled
                                                hidden
                                            >
                                                <option value="" disabled>Seleccione Tipo</option>
                                                {listItemsAprobador}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        <form id="frmDataList" name="frmDataList" className="frmDataListUser" >
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="border-b-2 text-left frmDataListColorTh w-[2%]">n°</th>
                                        <th className="border-b-2 text-left frmDataListColorTh w-[5%]">USUARIO</th>
                                        <th className="border-b-2 text-left frmDataListColorTh w-[12%]">NOMBRE</th>
                                        <th className="border-b-2 text-left frmDataListColorTh w-[12%]">CORREO</th>
                                        <th className="border-b-2 text-left frmDataListColorTh w-[10%]">CARGO</th>
                                        <th className="border-b-2 text-left frmDataListColorTh w-[10%]">PERFIL</th>
                                        <th className="border-b-2 text-left frmDataListColorTh w-[10%]">TIPO APROBADOR</th>
                                    </tr>
                                </thead>
                                <tbody id="dataList" >
                                    {/* contenido */}
                                </tbody>
                            </table>
                        </form>
                    </section>
                    <section className="lg:section-down-btn peq:max-lg:mt-14 mt-10">
                        <input
                            type="button"
                            form="frmUsuario"
                            id="btnCancelar"
                            className="disabled_btn-user mr-6, sizeBtn"
                            value="Cancelar"
                            onClick={() => refrescar()}
                        />
                    </section>
                </div>
            </div >
        </>
    );
};

export default Usuarios;