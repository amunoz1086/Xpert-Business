'use client';

import React, { useEffect, useState } from "react";
/* components */
import ModalMenu from "@/app/components/share/Mdl";
/* APIS */
import { queryTipoCredIbrState } from "@/app/lib/admin/credito/queryTipoCredIbrState";
import { querylistarproducto } from "@/app/lib/admin/querys/listas";
import { updateTipoCredIbrState } from "@/app/lib/admin/credito/updateTipoCredIbrState";
import { queryTipoRedescuentoStatus } from "@/app/lib/admin/credito/queryTipoRedescuentoStatus";
import { updateTipoRedescuentoStatus } from "@/app/lib/admin/credito/updateTipoRedescuentoStatus";

const Credito = () => {

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


    useEffect(() => {
        setBtnNuevo('Actualizar')
        fnQueryTipoCredito();
        fnQueryTipoRedescuento();
        document.getElementById('btnGuardar').classList.add('invisible');
    }, []);


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


    const fnQueryTipoCredito = async () => {
        try {
            const dataList = JSON.parse(await querylistarproducto());
            if (dataList.STATUS) {
                const resListTipocredito = fnListTipocredito(dataList.DATA);
                if (resListTipocredito === 200) {
                    fnQueryModalidadIbr()
                };
            } else {
                callModal(true, `${dataList.MESSAGE}`, '', 'Ok', 'none', '', null, () => endModal);
            };
        } catch (error) {
            console.log(error);
        };
    };
    

    const fnQueryTipoRedescuento = async () => {
        try {
            const dataList = JSON.parse(await queryTipoRedescuentoStatus());
            if (dataList.STATUS) {
                fnListarRedescuento(dataList.DATA);
            } else {
                callModal(true, `${dataList.MESSAGE}`, '', 'Ok', 'none', '', null, () => endModal);
            };
        } catch (error) {
            console.log(error);
        };
    };


    const fnQueryModalidadIbr = async () => {
        try {
            const dataList = JSON.parse(await queryTipoCredIbrState());
            if (dataList.STATUS) {
                fnListarModalidadIbr(dataList.DATA);
            } else {
                callModal(true, `${dataList.MESSAGE}`, '', 'Ok', 'none', '', null, () => endModal);
            };
        } catch (error) {
            console.log(error);
        };
    };


    const fnListTipocredito = (dataTipoCredito) => {

        const tbody = document.getElementById('modalidadIbr');
        let contRow = 0;

        for (const row of dataTipoCredito) {
            const tr = document.createElement('tr');
            tr.className = 'border-t border-solid';
            tr.id = row.COD_TIP_PROD;

            const dataRow = (Object.values(row));
            dataRow.shift();

            for (let tdData of dataRow) {
                const td = document.createElement('td');
                td.className = 'font-bold text-[#4e6170] text-sm';
                td.textContent = tdData;
                tr.appendChild(td);
            };

            tbody.appendChild(tr);
            contRow++;
        };

        if (dataTipoCredito.length === contRow) {
            return 200;
        };
    };


    const fnListarModalidadIbr = (dataModalidadIbr) => {
        const tbody = document.getElementById('modalidadIbr');
        const elementsTr = tbody.querySelectorAll('tr');

        for (const trElement of elementsTr) {
            const tr = document.getElementById(trElement.id);
            const td = document.createElement('td');

            td.className = "flex flex-col";
            td.id = trElement.id;

            for (const cell of dataModalidadIbr) {

                if (trElement.id === cell.COD_TIP_PROD.toString()) {
                    const div = document.createElement('div');

                    const input = document.createElement('input');
                    input.id = `${cell.ibr_descripcion}${cell.COD_TIP_PROD}`;
                    input.name = `${cell.ibr_descripcion}${cell.COD_TIP_PROD}`;
                    input.dataset.id = cell.cod_ibr;
                    input.dataset.tipoCred = cell.COD_TIP_PROD;
                    input.value = cell.descripcion;
                    input.checked = cell.codEstado;
                    input.type = 'checkbox';

                    const label = document.createElement('label');
                    label.className = 'text-sm';
                    label.htmlFor = `${cell.ibr_descripcion}${cell.COD_TIP_PROD}`;
                    label.textContent = ` ${cell.ibr_descripcion}`;

                    div.appendChild(input);
                    div.appendChild(label);
                    td.appendChild(div);
                };
            };

            tr.appendChild(td);
        };
    };


    const fnListarRedescuento = (dataRedescuento) => {
        const tbody = document.getElementById('redescuento');

        const tr = document.createElement('tr');
        tr.className = 'border-t border-solid';

        const dataRow = (Object.values(dataRedescuento));

        for (let cell of dataRow) {

            const div = document.createElement('div');
            const input = document.createElement('input');

            input.id = `${cell.descripcion}${cell.cod_redescuento}`;
            input.name = `${cell.descripcion}${cell.cod_redescuento}`;
            input.dataset.id = cell.cod_redescuento;
            input.value = cell.descripcionEstado;
            input.checked = cell.codEstado;
            input.type = 'checkbox';

            const label = document.createElement('label');

            label.className = 'text-sm';
            label.htmlFor = `${cell.descripcion}${cell.cod_redescuento}`;
            label.textContent = ` ${cell.descripcion}`;

            div.appendChild(input);
            div.appendChild(label);
            tr.appendChild(div);
        };

        tbody.appendChild(tr);
    };


    const fnActualizar = async (e) => {
        await fnGuardarModalidad(e);
    };


    const fnGuardarModalidad = async (e) => {
        e.preventDefault();

        try {

            let formElements = document.getElementById('frmDataModalida');
            let inputElement = formElements.querySelectorAll('input');
            let dataModalidad = [];
            let dataStatusControl = [];

            for (const iData of inputElement) {
                dataModalidad.push({
                    "tipoCred": iData.dataset.tipoCred,
                    "id": iData.dataset.id,
                    "state": iData.checked
                });

                if (!iData.checked) {
                    let lineaCredito = iData.dataset.tipoCred === '43' ? 'T' : 'C';
                    dataStatusControl.push(lineaCredito);
                };
            };

            const statusControl = fnControlInputsModalidad(dataStatusControl);

            if (statusControl === 200) {
                const dataInsert = JSON.parse(await updateTipoCredIbrState(dataModalidad));
                if (dataInsert.STATUS === 200) {
                    await fnGuardarRedescuento(e);
                } else {
                    callModal(true, dataInsert.MESSAGE, '', 'Ok', 'none', '', () => endModal, () => endModal);
                };
            };

        } catch (e) {
            console.error(e);
        };
    };


    const fnGuardarRedescuento = async (e) => {
        e.preventDefault();

        try {

            let formElements = document.getElementById('frmDataRedescuento');
            let inputElement = formElements.querySelectorAll('input');
            let dataRedescuento = [];
            let dataStatusControl = 0;

            for (const iData of inputElement) {
                dataRedescuento.push({
                    "id": iData.dataset.id,
                    "state": iData.checked
                });

                if (!iData.checked) {
                    dataStatusControl++;
                };
            };

            const statusControlRedescuento = fnControlInputsRedescuento(dataStatusControl);

            if (statusControlRedescuento === 200) {

                const dataInsert = JSON.parse(await updateTipoRedescuentoStatus(dataRedescuento));

                if (dataInsert.STATUS === 200) {
                    callModal(true, dataInsert.MESSAGE, 'Ok', '', '', 'none', () => endModal);
                } else {
                    callModal(true, dataInsert.MESSAGE, '', 'Ok', 'none', '', () => endModal, () => endModal);
                };
            };

        } catch (e) {
            console.error(e);
        };

    };


    const fnControlInputsModalidad = (dataStatusControl) => {
        const controlInputs = {};

        dataStatusControl.forEach((value) => {
            controlInputs[value] = (controlInputs[value] || 0) + 1;
        });

        if (controlInputs.T === 5 || controlInputs.C === 5) {
            callModal(true, 'Debe seleccionar al menos una modalidad para cada línea de crédito', 'Ok', '', '', 'none', () => endModal);
            return 202;
        } else {
            return 200;
        };
    };


    const fnControlInputsRedescuento = (dataStatusControl) => {

        if (dataStatusControl === 4) {
            callModal(true, 'Debe seleccionar al menos una entidad de redescuento', 'Ok', '', '', 'none', () => endModal);
            return 202;
        } else {
            return 200;
        };
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
                                    onClick={(e) => fnActualizar(e)}
                                >
                                    {btnNuevo}
                                </button>
                            </div>
                        </form>
                    </section>
                    <section className="mt-12 w-full flex flex-row justify-around">
                        <div>
                            <form id="frmDataModalida" name="frmDataModalida">
                                <table className="w-[35rem]">
                                    <thead>
                                        <tr>
                                            <th className="text-left w-[25%] text-[#D62429]">Línea</th>
                                            <th className="text-left w-[70%] text-[#D62429]">Modalidad IBR</th>
                                        </tr>
                                    </thead>
                                    <tbody id="modalidadIbr">
                                        {/* contenido Modalidad Ibr*/}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <div>
                            <form id="frmDataRedescuento" name="frmDataRedescuento">
                                <table className="w-[35rem]">
                                    <thead>
                                        <tr>
                                            <th className="text-left w-[20%] text-[#D62429]">Entidad Redescuento</th>
                                        </tr>
                                    </thead>
                                    <tbody id="redescuento">
                                        {/* contenido Entidad Redescuento */}
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

export default Credito;