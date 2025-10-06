'use client';

import React, { useEffect, useState, useCallback } from "react";
/* components */
import ModalMenu from "@/app/components/share/Mdl";
/* icons */
import { IoAddCircleSharp } from "react-icons/io5";
/* Funtions */
import { fnListarIbr } from '@/app/lib/admin/modalidadIBR/queryListarIbr';
import { fnListarFechasIbr } from '@/app/lib/admin/modalidadIBR/queryListarFechaIbr';
import { fnInserIbr } from '@/app/lib/admin/modalidadIBR/queryInsertIbr';


const ModalidadIBR = () => {

    /* estado inicial botones */
    const [btnNuevo, setBtnNuevo] = useState('');

    /* estado inicial modal  */
    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [valueBtnOne, setValueBtnOne] = useState('');
    const [valueBtnSecond, setValueBtnSecond] = useState('');
    const [visibBtnOne, setVisibBtnOne] = useState('');
    const [visibBtnSecond, setVisibBtnSecond] = useState('');
    const [fnBtnOne, setFnBtnOne] = useState();
    const [fnBtnSecond, setFnBtnSecond] = useState();

    /* Load IBR */
    useEffect(() => {
        setBtnNuevo('Actualizar Tasas')
        fnConsultaListadoIbr();
        document.getElementById('btnGuardar').classList.add('invisible');
    }, []);

    /* funciones */
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

    const endModal = () => {
        setShowModal(false);
    };

    const fnConsultaListadoIbr = useCallback(async () => {
        try {
            const dataList = JSON.parse(await fnListarIbr());
            if (dataList.STATUS) {
                fnListDataIbr(JSON.parse(dataList.DATA));
            } else {
                callModal(true, `${dataList.MESSAGE}`, '', 'Ok', 'none', '', null, () => endModal);
            };
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fnInitElement = () => {
        const btnActualizar = document.getElementById('btnNuevo');
        btnActualizar.removeAttribute('disabled');
        btnActualizar.classList.remove('disabled_btn-user');
    }

    const fnListDataIbr = (dataIbr) => {
        let contRow = 0;
        const tbody = document.getElementById('ibrListar');

        for (const row of dataIbr) {
            const tr = document.createElement('tr');
            tr.id = contRow;
            tr.dataset.dKey = row.dKey;

            const dataRow = (Object.values(row));
            dataRow.shift();
            dataRow.unshift(contRow + 1);

            let contIbr = 0
            for (let ibr of dataRow) {
                const td = document.createElement('td');
                let classIbr = contIbr === 0 ? 'colorTd' : 'sizeElementRow';
                td.className = classIbr;
                td.textContent = ibr;
                tr.appendChild(td);
                contIbr++
            };

            tbody.appendChild(tr);
            contRow++;
        };
    };

    const fnActualizarTasas = (e) => {
        const btnActualizar = document.getElementById('btnNuevo');
        btnActualizar.setAttribute('disabled', true);
        btnActualizar.classList.add('disabled_btn-user');

        const inputs = [
            {
                type: "hidden",
                className: "",
                name: "trNum",
                tabIndex: "",
                autoComplete: ""
            },
            {
                type: "date",
                className: "sizeElementRow",
                name: "fechInicial",
                tabIndex: "2",
                autoComplete: "off"
            },
            {
                type: "date",
                className: "sizeElementRow",
                name: "fechHasta",
                tabIndex: "3",
                autoComplete: "off"
            },
            {
                type: "number",
                className: "sizeElementRow",
                name: "ibr0",
                tabIndex: "4",
                autoComplete: "off"
            },
            {
                type: "number",
                className: "sizeElementRow",
                name: "ibr1",
                tabIndex: "5",
                autoComplete: "off"
            },
            {
                type: "number",
                className: "sizeElementRow",
                name: "ibr3",
                tabIndex: "6",
                autoComplete: "off"
            },
            {
                type: "number",
                className: "sizeElementRow",
                name: "ibr6",
                tabIndex: "7",
                autoComplete: "off"
            },
            {
                type: "number",
                className: "sizeElementRow",
                name: "ibr12",
                tabIndex: "8",
                autoComplete: "off"
            },
        ];

        const buttons = [
            {
                tdClassName: "cursor-pointer sizeColIcons",
                src: "/guardar.svg",
                alt: "",
                title: "Guardar",
                tabIndex: "9",
                imgClassName: "sizeElementColICons",
                onclick: btnGuardar
            },
            {
                tdClassName: "cursor-pointer sizeColIcons",
                src: "/cancelar.svg",
                alt: "",
                title: "Cancelar",
                tabIndex: "9",
                imgClassName: "sizeElementColICons",
                onclick: btnCancelar
            },
        ];

        const tr = document.getElementById('ibrAgregar');
        let tdCount = 0;

        for (let elementInput of inputs) {
            const td = document.createElement('td');
            td.id = `td-${tdCount.toString()}`;
            const input = document.createElement('input');
            input.id = elementInput.name;
            input.type = elementInput.type;
            input.className = elementInput.className;
            input.name = elementInput.name;
            input.required = true;
            if (elementInput.type === 'number') {
                input.placeholder = '0.000 %';
                input.step = '0.001';
                input.min = '0';
                input.max = '99.999';
                input.onchange = (e) => fnDecimalFormat(e);
                input.oninput = (e) => fnControlInput(e);
                input.onblur = (e) => fnControlFoco(e);
            };
            if (elementInput.type === 'date') {
                input.onchange = (e) => fnControlInput(e);
                input.onblur = (e) => fnControlFoco(e);
            };

            input.tabIndex = elementInput.tabIndex;
            tr.appendChild(td);
            td.appendChild(input);
            tdCount++;
        };

        for (let elementButtons of buttons) {
            const td = document.createElement('td');
            td.id = `td-${tdCount.toString()}`;
            td.className = elementButtons.tdClassName
            const img = document.createElement('img');
            img.src = elementButtons.src;
            img.alt = elementButtons.alt;
            img.title = elementButtons.title;
            img.className = elementButtons.imgClassName;
            img.tabIndex = elementButtons.tabIndex;
            img.onclick = elementButtons.onclick;
            tr.appendChild(td);
            td.appendChild(img);
            tdCount++
        };
        e.preventDefault();
        fnUltimaFecha();
        mostrarColBnt();
    };

    const fnUltimaFecha = async () => {
        try {
            const dataList = JSON.parse(await fnListarFechasIbr());
            let DataJson = JSON.parse(dataList.DATA);
            const fechInic = document.getElementsByName('fechInicial');

            if (dataList.STATUS) {
                fechInic[0].value = DataJson[0].fech_hast;
                fechInic[0].setAttribute('readonly', true);
            };
        } catch (error) {
            console.log(error);
        }
    };

    const fnDecimalFormat = (e) => {
        let inputNumber = document.getElementsByName(e.target.name);
        inputNumber[0].value = parseFloat(e.target.value).toFixed(3);
    };

    const fnControlInput = (e) => {
        switch (e.target.type) {
            case 'number':
                fnControlDigitos(e.target.value);
                break;
            case 'date':
                fnValidarFecha(e.target.value);
                break
            default:
                break;
        };
    };

    const fnControlDigitos = (valInput) => {
        const regex = /^\d{1,2}(\.\d{1,3})?$/;
        if (!regex.test(valInput) && valInput !== "") {
            callModal(true, 'Ingresa un valor válido para la asignación IBR: máximo dos enteros y tres decimales', 'Ok', '', '', 'none', () => endModal);
            return false;
        } else {
            return true;
        };
    };

    const fnControlFoco = (e) => {
        switch (e.target.type) {
            case 'number': {
                const resFoco = fnControlDigitos(e.target.value);
                if (!resFoco) {
                    document.getElementById(`${e.target.id}`).focus();
                };
                break;
            }
            case 'date': {
                const resFoco = fnValidarFecha(e.target.value);
                if (!resFoco) {
                    document.getElementById(`${e.target.id}`).focus();
                };
                break
            }
            default:
                break;
        };
    };

    const fnValidarFecha = (valDate) => {
        const [year, month, day] = valDate.split("-").map(Number);
        const dateInput = new Date(year, month - 1, day);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        console.log("Fecha ingresada:", dateInput);
        console.log("Fecha actual:", today);

        if (dateInput < today) {
            callModal(true, 'Por favor, ingresa una fecha válida. No puede ser menor a la actual.', 'Ok', '', '', 'none', () => endModal);
            return false;
        } else {
            return true;
        }
    };

    const fnCancelar = () => {
        const tr = document.getElementById('ibrAgregar');
        let tdNumbers = (Object.keys(tr.getElementsByTagName('td')));
        for (let tdId of tdNumbers) {
            let td = document.getElementById(`td-${tdId}`);
            td.remove();
        };
        endModal();
        ocultarColBnt();
        fnInitElement();
    };

    const fnActualizarTable = () => {
        const tbody = document.getElementById('ibrListar');
        let trNumbers = (Object.keys(tbody.getElementsByTagName('tr')));
        trNumbers.pop();
        for (let trId of trNumbers) {
            let tr = document.getElementById(trId);
            tr.remove();
        };

        let tr = document.getElementById('ibrAgregar');
        let tdNumbers = (Object.keys(tr.getElementsByTagName('td')));
        for (let tdId of tdNumbers) {
            let td = document.getElementById(`td-${tdId}`);
            td.remove();
        };
        fnInitElement();
    };

    const fnGuardar = async () => {
        let frmDataIbr = new FormData(document.frmDataIbr);
        try {
            const dataInsert = JSON.parse(await fnInserIbr(frmDataIbr));

            if (dataInsert.STATE) {
                callModal(true, dataInsert.MESSAGE, 'Ok', '', '', 'none', () => endModal);
                fnActualizarTable();
                ocultarColBnt();
                fnConsultaListadoIbr();
            } else {
                callModal(true, dataInsert.MESSAGE, '', 'Ok', 'none', '', () => endModal, () => endModal);
            };
        } catch (e) {
            console.error(e);
        };
    };

    const btnGuardar = () => {
        let frmIbr = document.getElementById('frmDataIbr');
        if (frmIbr.checkValidity()) {
            callModal(true, 'Esta acción guardara los datos', 'Continuar', 'Cancelar', '', '', () => fnGuardar, () => endModal);
        } else {
            callModal(true, 'Hay campos vacíos. Complete todos los campos e inténtelo de nuevo', '', 'Ok', 'none', '', () => endModal, () => endModal);
        };
    };

    const btnCancelar = () => {
        callModal(true, 'Esta acción cancelará la actualización de la tasa.', 'Continuar', 'Cancelar', '', '', () => fnCancelar, () => endModal);
    };

    const ocultarColBnt = () => {
        const elementeCol = document.getElementById('btnIbrs');
        elementeCol.classList.add('hidden');
    };

    const mostrarColBnt = () => {
        const elementeCol = document.getElementById('btnIbrs');
        elementeCol.classList.remove('hidden');
    };

    return (
        <>
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
                <div className="section-top styleFlex">
                    <section className=" mt-10 sizeSection">
                        <form name="frmIbr">
                            <div className="flex justify-end">
                                <button
                                    id="btnNuevo"
                                    tabIndex='0'
                                    className="btn sizeBtn text-xs"
                                    onClick={(e) => fnActualizarTasas(e)}
                                >
                                    <IoAddCircleSharp className="text-2xl mr-1" />
                                    {btnNuevo}
                                </button>
                            </div>
                        </form>
                    </section>
                    <section className="sizeSection mt-12">
                        <table className="table-fixed border-collapse w-full border-slate-400">
                            <thead>
                                <tr>
                                    <th className="border-x-0 border-b-2 label text-left w-10">n°</th>
                                    <th className="border-x-0 border-b-2 label text-left">Fecha inicial</th>
                                    <th className="border-x-0 border-b-2 label text-left">Fecha hasta</th>
                                    <th className="border-x-0 border-b-2 label text-left">IBR Overnight</th>
                                    <th className="border-x-0 border-b-2 label text-left">IBR a un mes</th>
                                    <th className="border-x-0 border-b-2 label text-left">IBR a tres meses</th>
                                    <th className="border-x-0 border-b-2 label text-left">IBR a seis meses</th>
                                    <th className="border-x-0 border-b-2 label text-left">IBR a doce meses</th>
                                    <th id="btnIbrs" className="border-x-0 border-b-2 label text-left hidden"></th>
                                </tr>
                            </thead>
                        </table>
                        <div className="h-[40vh] overflow-y-auto">
                            <form id="frmDataIbr" name="frmDataIbr">
                                <table className="table-fixed w-full border-slate-400">
                                    <thead>
                                        <tr>
                                            <th className="w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="ibrListar">
                                        <tr id="ibrAgregar">
                                            {/* contenido */}
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </section>
                </div>
            </div >
        </>
    );
};

export default ModalidadIBR;