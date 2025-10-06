import { useEffect, useState } from "react";
// import axios from "axios";
import { BiSolidRightArrow } from "react-icons/bi";
import { fnQueryIbrs } from "@/app/lib/convenios/actions";

import dynamic from 'next/dynamic'
const DynamicModal = dynamic(() => import('../share/Modals'), { ssr: false })

const ModalConTasa = (props) => {

  /* estado inicial modal  */
  const [showModal, setShowModal] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  /* estado inicial campos  */
  const [itemsIbr, setItemsIbr] = useState([]);
  const [valorIdSelect, setValorIdSelect] = useState();
  const [valIdSelect, setValIdSelect] = useState();
  const [tasaBaseSpread, setTasaBaseSpread] = useState(0);
  const [tasaBaseSpreadObt, setTasaBaseSpreadObt] = useState(0);
  const [tasaMensual, setTasaMensual] = useState(0);
  const [tasaEfectiva, setTasaEfectiva] = useState(0);

  const endModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setTasaBaseSpread(20);
    setTasaBaseSpreadObt(50);
    setTasaMensual(4);
    setTasaEfectiva(50);
    loadIbrList();
  }, []);

  async function loadIbrList() {
    const resul = JSON.parse(await fnQueryIbrs());
    loadListIbrs(resul.ibrs);
  }

  const loadListIbrs = (datIbr) => {
    let defautValue = {
      cod_ibr: "DEFAULT",
      ibr_descripcion: "Seleccione",
      cod_fech: "0",
      valor_ibr: "DEFAULT",
    };

    datIbr.unshift(defautValue);
    let opcionMostrar = ["1", "3", "DEFAULT"];
    let filtrarOpcion = datIbr.filter((ibrs) => opcionMostrar.includes(ibrs.cod_ibr));

    setItemsIbr(
      filtrarOpcion.map((ibrs) =>
        ibrs.cod_ibr === "DEFAULT" ? (
          <option
            style={{ color: "grey" }}
            key={ibrs.cod_ibr}
            id={ibrs.cod_ibr}
            value={ibrs.valor_ibr}
          >
            {ibrs.ibr_descripcion}
          </option>
        ) : (
          <option
            id={ibrs.cod_ibr}
            key={ibrs.cod_ibr}
            value={ibrs.cod_ibr}
            data-ibr={ibrs.valor_ibr}
          >
            {ibrs.ibr_descripcion}
          </option>
        )
      )
    );
  };

  const onChangeSelect = (e) => {

    setValorIdSelect(e.target.value);
    let seleccionSpread = document.getElementById(e.target.value);
    let corteAnual = document.getElementById("corteAnual");
    corteAnual.value = parseFloat(seleccionSpread.dataset.ibr).toFixed(2);

  };
  const onChangeSelectTasa = (e) => {
    setValIdSelect(e.target.value);
    let seleccionSpread = document.getElementById(e.target.value);
    let corteAnualTasa = document.getElementById("corteAnualTasa");
    corteAnualTasa.value = parseFloat(seleccionSpread.dataset.ibr).toFixed(2);
  };

  const validarTope = (IBR, tope, mensaje) => {
    if (IBR > tope) {
      setMessageAlert(mensaje + tope + "%")
      setShowModal(true)
    }
  };

  const validarSelect = (valor) => {
    if (valor === "DEFAULT" || valor === undefined) {
      setMessageAlert("Debe selecionar una Tasa Base")
      setShowModal(true)
    }
  };

  const fnCalculoSpread = (e) => {
    if (e.key === "Enter") {
      validarTope(
        document.getElementById('indSpreadiBR').value,
        tasaBaseSpread,
        "El porcentaje Spread IBR no puede ser mayor a "
      );
      validarSelect(valorIdSelect);
      let corteAnual = document.getElementById("corteAnual").value;
      let tasaEfectivaAnual = document.getElementById("tasaEfectiva");
      let tasaNominalAnualSpread = document.getElementById("tasaNominalAnualSpread");
      let tasaMvSpread = document.getElementById("tasaMvSpread");
      document.getElementById('indSpreadiBR').value = parseFloat(document.getElementById('indSpreadiBR').value).toFixed(2);
      if (
        document.getElementById('indSpreadiBR').value <= tasaBaseSpread &&
        valorIdSelect !== "DEFAULT" &&
        valorIdSelect !== undefined
      ) {

        if (valorIdSelect === "1") {
          validarTope(
            document.getElementById('indSpreadiBR').value,
            tasaBaseSpread,
            "El porcentaje Spread IBR no puede ser mayor a "
          );
          tasaEfectivaAnual.value = (
            ((parseFloat(100) +
              (parseFloat(corteAnual) + parseFloat(document.getElementById('indSpreadiBR').value)) / 12) **
              12 /
              1e24) *
            100 -
            100
          ).toFixed(2);
        }
        if (valorIdSelect === "3") {
          validarTope(
            document.getElementById('indSpreadiBR').value,
            tasaBaseSpread,
            "El porcentaje Spread IBR no puede ser mayor a "
          );
          tasaEfectivaAnual.value = (
            (parseFloat(100) +
              (parseFloat(corteAnual) + parseFloat(document.getElementById('indSpreadiBR').value)) / 4) **
            4 /
            1000000 -
            100
          ).toFixed(2);
        }

        tasaNominalAnualSpread.value = (
          (((parseFloat(100) + parseFloat(tasaEfectivaAnual.value)) / 100) **
            (1 / 12) *
            100 -
            100) *
          12
        ).toFixed(2);

        tasaMvSpread.value = (tasaNominalAnualSpread.value / 12).toFixed(2);
      }
      e.preventDefault();
    }
  };
  const fnCalculoSpreadTasaAnual = (e) => {
    if (e.key === "Enter") {
      validarTope(
        document.getElementById('indTasaNAMV').value,
        tasaBaseSpreadObt,
        "El porcentaje Tasa NAMV no puede ser mayor a "
      );
      validarSelect(valIdSelect);
      let corteAnualTasa = document.getElementById("corteAnualTasa").value;
      let tasaEfectivaSpread = document.getElementById("tasaEfectivaSpread");
      let spreadIbr = document.getElementById("spreadIbr");
      document.getElementById('indTasaNAMV').value = parseFloat(document.getElementById('indTasaNAMV').value).toFixed(2);

      if (
        document.getElementById('indTasaNAMV').value <= tasaBaseSpreadObt &&
        valIdSelect !== "DEFAULT" &&
        valIdSelect !== undefined
      ) {

        tasaEfectivaSpread.value = (
          ((parseFloat(100) + parseFloat(document.getElementById('indTasaNAMV').value) / 12) ** 12 /
            1e24) *
          100 -
          100
        ).toFixed(2);

        if (valIdSelect === "1") {
          validarTope(
            document.getElementById('indTasaNAMV').value,
            tasaBaseSpreadObt,
            "El porcentaje Tasa NAMV no puede ser mayor a "
          );
          spreadIbr.value = (
            document.getElementById('indTasaNAMV').value - parseFloat(corteAnualTasa)
          ).toFixed(2);
        }
        if (valIdSelect === "3") {
          validarTope(
            document.getElementById('indTasaNAMV').value,
            tasaBaseSpreadObt,
            "El porcentaje Tasa NAMV no puede ser mayor a "
          );
          spreadIbr.value = (
            (((parseFloat(100) + parseFloat(tasaEfectivaSpread.value)) / 100) **
              (1 / 4) *
              100 -
              100) *
            4 -
            corteAnualTasa
          ).toFixed(2);
        }
      }
      e.preventDefault();
    }
  };
  const fnTasaMaE = (e) => {
    if (e.key === "Enter") {
      validarTope(
        document.getElementById('tasaIndiM').value,
        tasaMensual,
        "El porcentaje Tasa Mensual no puede ser mayor a "
      );
      let tasaNominalMaE = document.getElementById("tasaNmenEfe");
      let tasaEfectivaMaE = document.getElementById("tasaEmenEfe");
      document.getElementById('tasaIndiM').value = parseFloat(document.getElementById('tasaIndiM').value).toFixed(2);

      if (document.getElementById('tasaIndiM').value <= tasaMensual) {

        tasaNominalMaE.value = (document.getElementById('tasaIndiM').value * 12).toFixed(2);

        tasaEfectivaMaE.value = (
          ((parseInt(100) + parseFloat(document.getElementById('tasaIndiM').value)) ** 12 / 1e24) * 100 -
          100
        ).toFixed(2);
      }
      e.preventDefault();
    }
  };
  const fnTasaEaM = (e) => {
    if (e.key === "Enter") {
      validarTope(
        document.getElementById('tasaIndiEaM').value,
        tasaEfectiva,
        "El porcentaje Tasa Efectiva Anual no puede ser mayor a "
      );
      let tasaNominalEaM = document.getElementById("tasaNefeMen");
      document.getElementById('tasaIndiEaM').value = parseFloat(document.getElementById('tasaIndiEaM').value).toFixed(2);
      let tasaMvE = document.getElementById("tasaMv");
      if (document.getElementById('tasaIndiEaM').value <= tasaEfectiva) {

        tasaNominalEaM.value = (
          (((parseInt(100) + parseFloat(document.getElementById('tasaIndiEaM').value)) / 100) **
            0.0833333333333333 *
            100 -
            100) *
          12
        ).toFixed(2);

        tasaMvE.value = (tasaNominalEaM.value / 12).toFixed(2);
      }
      e.preventDefault();
    }
  };
  return (
    <>
      {
        (showModal)
        &&
        <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
        </DynamicModal>
      }

      <div className="inset-0 w-full h-full bg-modal fixed z-50 flex">
        <div className="flex justify-center items-center flex-col w-[1050px] rounded-lg shadow-xl   bg-white m-auto ">
          <h1 className="font-bold text-xl text-red-600 bold my-5 px-40">
            CONVERSOR DE TASAS
          </h1>
          <section className=" mx-1 grid grid-cols-2 grid-rows-2 gap-12 mt-1 -mb-10 border w-[1000px] px-16">
            <div className="mt-8 col-start-1 row-start-1 text-sm w-[350px]">
              <div className=" grid grid-cols-12 items-center">
                <BiSolidRightArrow className=" col-span-2 text-red-600 w-14 h-14" />
                <h5 className="label col-span-10">
                  Tasa base + Spread a Efectiva
                </h5>
              </div>

              <div className=" ml-12 mt-0 grid grid-cols-2 -mr-7">
                <label htmlFor="selectTasaBs" className="w-full  border">Seleccione tasa base</label>
                <select
                  defaultValue={"DEFAULT"}
                  name=""
                  id="selectTasaBs"
                  className="border text-center"
                  required
                  onChange={(e) => onChangeSelect(e)}
                >
                  {itemsIbr}
                </select>
                <label htmlFor="indSpreadiBR" className="w-full border">Indica Spread IBR</label>
                <input
                  id="indSpreadiBR"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  onKeyUp={fnCalculoSpread}
                ></input>
              </div>

              <h5 className=" label ml-12 -mr-7">Resultados</h5>
              <div className="grid grid-cols-2 ml-12 -mr-7">
                <label htmlFor="corteAnual" className="w-full border">IBR Anual al corte</label>
                <input
                  id="corteAnual"
                  type="number"
                  placeholder="0.00%"
                  readOnly
                  className="border text-end"
                ></input>
                <label htmlFor="tasaEfectiva" className="w-full  border">Tasa Efectiva Anual</label>
                <input
                  id="tasaEfectiva"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  readOnly
                ></input>
                <label htmlFor="tasaNominalAnualSpread" className="w-full  border">Tasa Nominal Anual MV</label>
                <input
                  id="tasaNominalAnualSpread"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  readOnly
                ></input>
                <label htmlFor="tasaMvSpread" className="w-full  border">Tasa M.V.</label>
                <input
                  id="tasaMvSpread"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  readOnly
                ></input>
              </div>
            </div>

            <div className="ml-5 mt-8 col-start-2 row-start-1 text-sm w-[350px]">
              <div className=" grid grid-cols-12 items-center">
                <BiSolidRightArrow className=" col-span-2 text-red-600 w-14 h-14" />
                <h5 className="label col-span-10">
                  Obtener Spread desde Tasa Anual
                </h5>
              </div>

              <div className="mt-0 grid grid-cols-2 ml-12 -mr-7">
                <label htmlFor="selectObtenerSpread" className="w-full border">Seleccione tasa base</label>
                <select
                  name=""
                  id="selectObtenerSpread"
                  className="border text-center"
                  required
                  onChange={(e) => onChangeSelectTasa(e)}
                >
                  {itemsIbr}
                </select>
                <label htmlFor="indTasaNAMV" className="w-full border">Indica Tasa NAMV</label>
                <input
                  id="indTasaNAMV"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  onKeyUp={fnCalculoSpreadTasaAnual}
                ></input>
              </div>

              <h5 className="label ml-12 -mr-7">Resultados</h5>
              <div className="grid grid-cols-2 ml-12 -mr-7">
                <label htmlFor="corteAnualTasa" className="w-full border">IBR Anual al corte</label>
                <input
                  id="corteAnualTasa"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  readOnly
                ></input>
                <label htmlFor="tasaEfectivaSpread" className="w-full border">Tasa Efectiva Anual</label>
                <input
                  id="tasaEfectivaSpread"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  readOnly
                ></input>
                <label htmlFor="spreadIbr" className="w-full border">Spread IBR</label>
                <input
                  id="spreadIbr"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  readOnly
                ></input>
              </div>
            </div>

            <div className="col-start-1 row-start-2 text-sm w-[350px]">
              <div className=" grid grid-cols-12 items-center">
                <BiSolidRightArrow className=" col-span-2 text-red-600 w-14 h-14" />
                <h5 className="label col-span-10">
                  Tasa Mensual a Efectiva
                </h5>
              </div>
              <div className="mt-0 grid grid-cols-2 ml-12 -mr-7">
                <label htmlFor="tasaIndiM" className="col-start-1 w-full border">
                  Indica Tasa Mensual
                </label>
                <input
                  id="tasaIndiM"
                  type="number"
                  className="border text-end col-start-2"
                  placeholder="0.00%"
                  onKeyUp={fnTasaMaE}
                ></input>
              </div>

              <h5 className=" label ml-12 -mr-7">Resultados</h5>
              <div className="grid grid-cols-2 ml-12 -mr-7 ">
                <label htmlFor="tasaNmenEfe" className="w-full border col-start-1">
                  Tasa Nominal Anual MV
                </label>
                <input
                  id="tasaNmenEfe"
                  type="number"
                  className="border text-end col-start-2"
                  placeholder="0.00%"
                  readOnly
                ></input>
                <label htmlFor="tasaEmenEfe" className="w-full border col-start-1">
                  Tasa Efectiva Anual
                </label>
                <input
                  id="tasaEmenEfe"
                  type="number"
                  className="border text-end col-start-2"
                  placeholder="0.00%"
                  readOnly
                ></input>
              </div>
            </div>

            <div className="ml-5 col-start-2 row-start-2 text-sm w-[350px]">
              <div className=" grid grid-cols-12 items-center">
                <BiSolidRightArrow className=" col-span-2 text-red-600 w-14 h-14" />
                <h5 className="label col-span-10">
                  Tasa Efectiva a Mensual
                </h5>
              </div>
              <div className="mt-0 grid grid-cols-2 ml-12 -mr-7">
                <label htmlFor="tasaIndiEaM" className="w-full border">
                  Indica Tasa Efectiva Anual
                </label>
                <input
                  id="tasaIndiEaM"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  onKeyUp={fnTasaEaM}
                ></input>
              </div>

              <h5 className="label ml-12 -mr-7">Resultados</h5>
              <div className="grid grid-cols-2 ml-12 -mr-7">
                <label htmlFor="tasaNefeMen" className="w-full border">Tasa Nominal Anual MV</label>
                <input
                  id="tasaNefeMen"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  readOnly
                ></input>
                <label htmlFor="tasaMv" className="w-full border">Tasa MV</label>
                <input
                  id="tasaMv"
                  type="number"
                  className="border text-end"
                  placeholder="0.00%"
                  readOnly
                ></input>
              </div>
            </div>
          </section>

          <div className="flex justify-between ">
            <button
              className="mb-6 w-auto px-8 h-10 bg-red-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
              onClick={props.onClick}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalConTasa;
