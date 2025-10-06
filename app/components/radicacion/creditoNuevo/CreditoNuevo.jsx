"use client";

// import { fnQueryIbrs } from "@/app/lib/convenios/actions";
// import { useEffect, useState } from "react";
// import ModalConTasa from "../../modules/ModalConTasa";
// import BtnControl from "../cliente/BtnControl";
// import { useProvider } from "@/app/provider/Providers";
// import { querylistarproducto } from "@/app/lib/admin/querys/listas";
// import { conversionPesos, listCoberturaFNG, listEntidadRedescueto } from "@/app/lib/utils";
// import dynamic from 'next/dynamic';
// // import CreditoNuevoComponent from "./CreditoNuevoComponent";

// const DynamicModal = dynamic(() => import('../../share/Modals'))

const CreditoNuevo = ({ rolPerfil }) => {

  // const { creditoNuevo, updateCreditoNuevo, solicitud, estadoSolicitud, updatePathConvenio } = useProvider();

  const habilitarInput=(rolPerfil !=='' && rolPerfil!==2)|| (rolPerfil !=='' && rolPerfil===2)&& (estadoSolicitud!==''&& estadoSolicitud!==3)

  // const [verificacionStatus, setVerificacionStatus] = useState(true);

  // const [datosFormateados, setDatosFormateados] = useState({});

  // const [showModal, setShowModal] = useState(false);

  // const [messageAlert, setMessageAlert] = useState("");

  // const [showTasa, setShowTasa] = useState(false);

  // const [data, setData] = useState({
  //   cupoMonto: creditoNuevo?.cupoMonto || "",
  //   cupoIBR: creditoNuevo?.cupoIBR || "",
  //   cupoPlazo: creditoNuevo?.cupoPlazo || "",
  //   cupoRedescuento: creditoNuevo?.cupoRedescuento || "",
  //   cupoCobertura: creditoNuevo?.cupoCobertura || "",
  //   codCupoTipoTasa: creditoNuevo?.codCupoTipoTasa || "",
  //   tesoMont: creditoNuevo?.tesoMont || "",
  //   tesoIBR: creditoNuevo?.tesoIBR || "",
  //   tesoPlazo: creditoNuevo?.tesoPlazo || "",
  //   tesoRedescuento: creditoNuevo?.tesoRedescuento || "",
  //   tesoCobertura: creditoNuevo?.tesoCobertura || "",
  //   codTesoTipoTasa: creditoNuevo?.codTesoTipoTasa || "",
  //   promedio: creditoNuevo?.promedio || "",
  //   tasaNAMV: creditoNuevo?.tasaNAMV || "",
  //   codCupo: creditoNuevo?.codCupo || "",
  //   codTeso: creditoNuevo?.codTeso || "",
  //   itemIdCupoTipoTasa: creditoNuevo?.itemIdCupoTipoTasa || '',
  //   itemIdTesoTipoTasa: creditoNuevo?.itemIdTesoTipoTasa || '',
  //   Tipo_RDTO_Cupo: creditoNuevo?.Tipo_RDTO_Cupo || '',
  //   Tipo_RDTO_Teso: creditoNuevo?.Tipo_RDTO_Teso || '',

  // });



  // useEffect(() => {
  //   updatePathConvenio('credito')
  // }, [])

  // const validacionProductos = () => {
  //   let dataProductos = Object.values(data);
  //   let control = 0;
  //   for (let i of dataProductos) {
  //     if (i === "" || i === "DEFAULT") {
  //     } else {
  //       control++;
  //     }
  //   }
  //   return control;
  // };

  // /* estado inicial de las listas */
  // const [listItemsIbrsCupo, setListItemsIbrsCupo] = useState([]);
  // const [backListItemsIbrsCupo, setBackListItemsIbrsCupo] = useState([]);
  // const [listItemsIbrsTeso, setListItemsIbrsTeso] = useState([]);
  // const [backListItemsIbrsTeso, setBackListItemsIbrsTeso] = useState([]);
  // const [dataCupo, setDataCupo] = useState(0);
  // const [dataTeso, setDataTeso] = useState(0);
  // const [btnResumen, setBtnResumen] = useState((validacionProductos() >= 8));

  // /* event load */
  // useEffect(() => {
  //   loadIbrList();
  //   loadTipoProd();
  // }, []);


  // async function loadIbrList() {
  //   const resul = await fnQueryIbrs();

  //   loadIbrs(JSON.parse(resul).ibrs);
  // };

  // async function loadTipoProd() {

  //   const resul = await querylistarproducto();

  //   let valuesTipoProd = JSON.parse(resul).DATA;
  //   let valFilter = "Cupo";
  //   let selectCupo = valuesTipoProd.filter((cupo) =>
  //     valFilter.includes(cupo.NOMBRE)
  //   );

  //   /***estod da undefined */
  //   valFilter = "Tesorería";
  //   let selectTeso = valuesTipoProd.filter((cupo) =>
  //     valFilter.includes(cupo.NOMBRE)
  //   );

  //   setDataCupo(selectCupo[0]?.COD_TIP_PROD);
  //   setDataTeso(selectTeso[0]?.COD_TIP_PROD);
  // }

  // const modalTasa = () => {
  //   setShowTasa(true);
  // };

  // const loadIbrs = (ibrList) => {

  //   let listAux = [...ibrList]

  //   let defautValue = {
  //     cod_ibr: creditoNuevo?.codCupoTipoTasa || "DEFAULT",
  //     ibr_descripcion: "Seleccione",
  //     cod_fech: "0",
  //     valor_ibr: "DEFAULT",
  //   };

  //   listAux.unshift(defautValue);

  //   let opcionMostrar = ["1", "3", "DEFAULT"];

  //   let filtrarOpcion = listAux.filter((ibrs) =>

  //     opcionMostrar.includes(ibrs.cod_ibr)

  //   );

  //   setListItemsIbrsCupo(
  //     filtrarOpcion.map((ibrs) =>
  //       ibrs.cod_ibr === "DEFAULT" ? (
  //         <option
  //           style={{ color: "grey" }}
  //           id={ibrs.cod_ibr}
  //           key={ibrs.cod_ibr}
  //           value={ibrs.valor_ibr}
  //         >
  //           {ibrs.ibr_descripcion}{" "}
  //         </option>
  //       ) : (
  //         <option id={ibrs.cod_ibr} key={ibrs.cod_ibr} value={ibrs.valor_ibr}>
  //           {ibrs.ibr_descripcion}
  //         </option>
  //       )
  //     )
  //   );

  //   defautValue['cod_ibr'] = creditoNuevo?.codTesoTipoTasa && creditoNuevo?.codTesoTipoTasa !== '' ? creditoNuevo?.codTesoTipoTasa : "DEFAULT";
  //   listAux = [...ibrList];
  //   listAux.unshift(defautValue);

  //   let filtrarOpcionL = listAux.filter((ibrs) =>
  //     opcionMostrar.includes(ibrs.cod_ibr)
  //   );

  //   setListItemsIbrsTeso(
  //     filtrarOpcionL.map((ibrs) =>
  //       ibrs.cod_ibr === "DEFAULT" ? (
  //         <option
  //           style={{ color: "grey" }}
  //           id={ibrs.cod_ibr}
  //           key={ibrs.cod_ibr}
  //           value={ibrs.valor_ibr}
  //         >
  //           {ibrs.ibr_descripcion}{" "}
  //         </option>
  //       ) : (
  //         <option id={ibrs.cod_ibr} key={ibrs.cod_ibr} value={ibrs.valor_ibr}>
  //           {ibrs.ibr_descripcion}
  //         </option>
  //       )
  //     )
  //   );
  // };

  // function verificacion() {
  //   if (data.cupoIBR > 50 || data.tesoIBR > 50) {
  //     setMessageAlert("El porcentaje Spread IBR no puede ser mayor a 50%")
  //     setShowModal(true)
  //     setVerificacionStatus(false);
  //   };

  //   if (data.cupoPlazo > 84) {
  //     setMessageAlert(`El plazo para cupo no puede ser mayor a 84 días`)
  //     setShowModal(true)
  //     setVerificacionStatus(false);
  //   };

  //   if (data.tesoPlazo > 18) {
  //     setMessageAlert(`El plazo para tesoreria no puede ser mayor a 18 meses`)
  //     setShowModal(true)
  //     setVerificacionStatus(false);
  //   };

  //   if (data.cupoRedescuento > 30 || data.tesoRedescuento > 30) {
  //     setMessageAlert(`El spread redescuento no puede ser mayor a 30%`)
  //     setShowModal(true)
  //     setVerificacionStatus(false);
  //   };

  //   if (data.cupoCobertura > 100 || data.tesoCobertura > 100) {
  //     setMessageAlert(`La cobertura FNG no puede ser mayor a 100%`)
  //     setShowModal(true)
  //     setVerificacionStatus(false);
  //   };
  // };


  // const Agregar = () => {
  //   let proStatus = validacionProductos();

  //   if (proStatus >= 8) {
  //     if (verificacionStatus) {

  //       setBtnResumen(true);
  //     } else {
  //       verificacion();
  //     }
  //   };
  // };

  // useEffect(() => {
  //  Agregar()
  // }, [data])
  


  // const handlechange = async (e) => {


  //   if (e.target.name === 'codCupoTipoTasa' || e.target.name === 'codTesoTipoTasa') {
  //     data[e.target.name === 'codCupoTipoTasa' ? 'itemIdCupoTipoTasa' : 'itemIdTesoTipoTasa'] = e.target.options[e.target.selectedIndex].getAttribute('id')
  //   }

  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   });

  //   setDatosFormateados({
  //     ...datosFormateados,
  //     cupoIBR: Number(data.cupoIBR / 100).toLocaleString(undefined, {
  //       style: "percent",
  //       minimumFractionDigits: 2,
  //     }),
  //   });

  //   setVerificacionStatus(true);

   
  // };


  // const validateCupoPlazo = (e) => {
  //   e.target.value = data.cupoPlazo < 0 ? "" : data.cupoPlazo;
  //   verificacion();
  // };

  // const validateTesoPlazo = (e) => {
  //   e.target.value = data.tesoPlazo < 0 ? "" : data.tesoPlazo;
  //   verificacion();
  // };

  // const actualizarContext = (e) => {

  //   let newData = { ...data }
  //   newData.codCupo = dataCupo
  //   newData.codTeso = dataTeso
  //   updateCreditoNuevo(newData)
  // };

  // const endModal = () => {
  //   setShowModal(false);
  // };

  // const validacionTasaCupo = (e) => {

  //   if (parseFloat(data.cupoRedescuento) > 0) {
  //     if (listItemsIbrsCupo.length < 3) {

  //       setListItemsIbrsCupo(backListItemsIbrsCupo);
  //     };
  //   } else {
  //     if (listItemsIbrsCupo.length >= 3) {
  //       bKListCupo(listItemsIbrsCupo);
  //       listItemsIbrsCupo.splice(1, 1);
  //     };
  //   };

  // };

  // const bKListCupo = (bkCupo) => {
  //   let newList = bkCupo.slice();
  //   setBackListItemsIbrsCupo(newList);
  // };

  // const validacionTasaTeso = (e) => {

  //   if (parseFloat(data.tesoRedescuento) > 0) {
  //     if (listItemsIbrsTeso.length < 3) {
  //       setListItemsIbrsTeso(backListItemsIbrsTeso);
  //     };
  //   } else {
  //     if (listItemsIbrsTeso.length >= 3) {
  //       bKListTeso(listItemsIbrsTeso);
  //       listItemsIbrsTeso.splice(1, 1);
  //     };
  //   };
  // };

  // const bKListTeso = (bkTeso) => {
  //   let newList = bkTeso.slice();
  //   setBackListItemsIbrsTeso(newList);
  // };





  return (
    <>
      {/* {
        (showModal)
        &&
        <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
        </DynamicModal>
      }

      {showTasa ? <ModalConTasa onClick={() => setShowTasa(false)} /> : null}
 */}

      {/* <CreditoNuevoComponent/> */}

      <main className={"w-full "}>
        {/* <div>
          <div className=" w-full flex items-center  mt-3">
            <p className="w-full text-center  text-sm font-semibold text-coomeva_color-rojo mb-4">
              Seleccione las características por cada tipo de producto
            </p>
          </div>
        </div>
        <form
          id="frmCreditoNuevo"
          name="frmCreditoNuevo"
          action="solicitud2"
          className={" w-full "}
          onBlur={() => Agregar()}
        >
          <div className={"mb-10 w-full"} >
            <div className={"peq:max-lg:min-w-max peq:max-lg:snap-x text-sm"}>
              <div className="grid grid-cols-8  text-coomeva_color-rojo mx-4 border  ">
                <h5 className=" text-sm font-semibold py-1">Comercial</h5>
                <h5 className=" py-1   font-semibold text-center ">Monto</h5>
                <h5 className=" py-1   font-semibold text-center ">Spread IBR</h5>
                <h5 className=" py-1   font-semibold text-center ">Plazo</h5>
                <h5 className=" py-1   font-semibold text-center ">Spread Redescuento</h5>
                <h5 className=" py-1   font-semibold text-center ">Modalidad Tasa</h5>
                <h5 className=" py-1   font-semibold text-center ">Cobertura FNG</h5>
                <h5 className=" py-1   font-semibold text-center ">Entidad Redescuento</h5>
                <label htmlFor="cupoMonto" className="  py-1 font-semibold label border">
                  Cupo
                </label>
                <input
                  type="currency"
                  id="cupoMonto"
                  className="border text-coomeva_color-azulClaro text-center "
                  name="cupoMonto"
                  onChange={handlechange}
                  defaultValue={creditoNuevo?.cupoMonto ? conversionPesos({ valor: creditoNuevo?.cupoMonto }) : ''}
                  onBlur={(e) => {
                    e.target.value =
                      data.cupoMonto < 0
                        ? ""
                        : Number(data.cupoMonto).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        });
                    verificacion();
                    actualizarContext(e)
                  }}
                  onFocus={(e) => {
                    e.target.value = data.cupoMonto < 0 ? "" : data.cupoMonto;
                    e.target.type = "currency";
                  }}
                  autoComplete="off"
                  placeholder="$0"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d.]/g, '');
                  }}
                  disabled={habilitarInput}
                />
                <input
                  type="percent"
                  name="cupoIBR"
                  id="cupoIBR"
                  className="text-coomeva_color-azulClaro border text-center  "
                  onChange={handlechange}
                  defaultValue={creditoNuevo?.cupoIBR ? conversionPesos({ valor: creditoNuevo?.cupoIBR, style: "percent", nDecimales: "2" }) : ''}
                  onBlur={(e) => {
                    e.target.value =
                      data.cupoIBR < 0
                        ? ""
                        : Number(data.cupoIBR / 100).toLocaleString("es-CO", {
                          style: "percent",
                          minimumFractionDigits: 2,
                        });
                    verificacion();
                    actualizarContext(e)
                  }}
                  onFocus={(e) =>
                    (e.target.value = data.cupoIBR < 0 ? "" : data.cupoIBR)
                  }
                  autoComplete="off"
                  placeholder="0.00%"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d.]/g, '');
                  }}
                  disabled={habilitarInput}
                />
                <input
                  type="number"
                  name="cupoPlazo"
                  id="cupoPlazo"
                  className="text-coomeva_color-azulClaro border text-center  "
                  placeholder="0"
                  onChange={handlechange}
                  onBlur={(e) => {
                    validateCupoPlazo(e)
                    actualizarContext(e)
                  }}
                  min={0}
                  defaultValue={creditoNuevo?.cupoPlazo || ""}
                  disabled={habilitarInput}
                />
                <input
                  type="percent"
                  name="cupoRedescuento"
                  id="cupoRedescuento"
                  className="text-coomeva_color-azulClaro border text-center"
                  onChange={handlechange}
                  defaultValue={creditoNuevo?.cupoRedescuento ? conversionPesos({ valor: creditoNuevo?.cupoRedescuento, style: "percent", nDecimales: "2" }) : ''}
                  onBlur={(e) => {
                    e.target.value =
                      data.cupoRedescuento < 0
                        ? ""
                        : Number(data.cupoRedescuento / 100).toLocaleString(
                          "es-CO",
                          {
                            style: "percent",
                            minimumFractionDigits: 2,
                          }
                        );
                    verificacion();
                    validacionTasaCupo(e);
                    actualizarContext(e)
                  }}
                  onFocus={(e) =>
                  (e.target.value =
                    data.cupoRedescuento < 0 ? "" : data.cupoRedescuento)
                  }
                  autoComplete="off"
                  placeholder="0.00%"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d.]/g, '');
                  }}
                  disabled={habilitarInput}
                />
                <select
                  name="codCupoTipoTasa"
                  id="codCupoTipoTasa"
                  className="border text-center "
                  onChange={handlechange}
                  onBlur={(e) => {
                    verificacion()
                    actualizarContext(e)
                  }}
                  defaultValue={creditoNuevo?.codCupoTipoTasa || "DEFAULT"}
                  disabled={habilitarInput}
                >
                  {listItemsIbrsCupo}
                </select>
                <select
                  name="cupoCobertura"
                  id="cupoCobertura"
                  className="border text-center outline-none "
                  defaultValue={data?.cupoCobertura || "DEFAULT"}
                  onChange={handlechange}
                  onBlur={(e) => {
                    verificacion()
                    actualizarContext(e)
                  }}
                  disabled={habilitarInput}
                >
                  <option style={{ color: "grey" }} id={'1'} value={'DEFAULT'}>Seleccionar </option>
                 
                  {
                    listCoberturaFNG.map(item => (
                      <option className="outline-none text-coomeva_color-rojo bg-white" key={item.id} id={item.id} value={item.value}>{item.descripcion} </option>
                    ))
                  }
                </select>
                <select
                  name="Tipo_RDTO_Cupo"
                  id="Tipo_RDTO_Cupo"
                  className="border text-center outline-none "
                  defaultValue={data?.Tipo_RDTO_Cupo || "DEFAULT"}
                  onChange={ handlechange}

                  onBlur={(e) => {
                    verificacion()
                    actualizarContext(e)
                  }}
                  disabled={habilitarInput||(creditoNuevo?.cupoRedescuento==undefined ||creditoNuevo?.cupoRedescuento=='')}
                >
                  <option id={'1'} value={'DEFAULT'}>Seleccionar </option>
                
                  {
                    listEntidadRedescueto.map(item => (
                      <option className="outline-none text-coomeva_color-rojo bg-white" key={item.id} id={item.id} value={item.id}>{item.descripcion} </option>
                    ))
                  }
                </select>
                <label htmlFor="tesoMont" className="  font-semibold label border py-1">
                  Tesorería
                </label>
                <input
                  type="currency"
                  name="tesoMont"
                  id="tesoMont"
                  className="text-coomeva_color-azulClaro border text-center  "
                  onChange={handlechange}
                  defaultValue={creditoNuevo?.tesoMont ? conversionPesos({ valor: creditoNuevo?.tesoMont }) : ''}

                  onBlur={(e) => {
                    e.target.value =
                      data.tesoMont < 0
                        ? ""
                        : Number(data.tesoMont).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        });
                    verificacion();
                    actualizarContext(e)
                  }}
                  onFocus={(e) =>
                    (e.target.value = data.tesoMont < 0 ? "" : data.tesoMont)
                  }
                  autoComplete="off"
                  placeholder="$0"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d.]/g, '');
                  }}
                  disabled={habilitarInput}
                />
                <input
                  type="percent"
                  name="tesoIBR"
                  id="tesoIBR"
                  className="text-coomeva_color-azulClaro border text-center"
                  onChange={handlechange}
                  defaultValue={creditoNuevo?.tesoIBR ? conversionPesos({ valor: creditoNuevo?.tesoIBR, style: "percent", nDecimales: "2" }) : ''}
                  onBlur={(e) => {
                    e.target.value =
                      data.tesoIBR < 0
                        ? ""
                        : Number(data.tesoIBR / 100).toLocaleString("es-CO", {
                          style: "percent",
                          minimumFractionDigits: 2,
                        });
                    verificacion();
                    actualizarContext(e)
                  }}
                  onFocus={(e) =>
                    (e.target.value = data.tesoIBR < 0 ? "" : data.tesoIBR)
                  }
                  autoComplete="off"
                  placeholder="0.00%"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d.]/g, '');
                  }}
                  disabled={habilitarInput}
                />
                <input
                  type="number"
                  name="tesoPlazo"
                  id="tesoPlazo"
                  className="text-coomeva_color-azulClaro border text-center"
                  onChange={handlechange}
                  onBlur={(e) => {
                    validateTesoPlazo(e)
                    actualizarContext(e)
                  }}
                  min={0}
                  placeholder="0"
                  defaultValue={creditoNuevo?.tesoPlazo || ""}
                  disabled={habilitarInput}
                />
                <input
                  type="percent"
                  name="tesoRedescuento"
                  id="tesoRedescuento"
                  className="text-coomeva_color-azulClaro border text-center"
                  onChange={handlechange}
                  defaultValue={creditoNuevo?.tesoRedescuento ? conversionPesos({ valor: creditoNuevo?.tesoRedescuento, style: "percent", nDecimales: "2" }) : ''}
                  onBlur={(e) => {
                    e.target.value =
                      data.tesoRedescuento < 0
                        ? ""
                        : Number(data.tesoRedescuento / 100).toLocaleString(
                          "es-CO",
                          {
                            style: "percent",
                            minimumFractionDigits: 2,
                          }
                        );
                    verificacion();
                    validacionTasaTeso(e);
                    actualizarContext(e);
                  }}
                  onFocus={(e) =>
                  (e.target.value =
                    data.tesoRedescuento < 0 ? "" : data.tesoRedescuento)
                  }
                  autoComplete="off"
                  placeholder="0.00%"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d.]/g, '');
                  }}
                  disabled={habilitarInput}
                />
                <select
                  name="codTesoTipoTasa"
                  id="codTesoTipoTasa"
                  className="border text-center "
                  defaultValue={creditoNuevo?.codTesoTipoTasa || "DEFAULT"}
                  onChange={handlechange}
                  onBlur={(e) => {
                    verificacion()
                    actualizarContext(e)
                  }}
                  disabled={habilitarInput}
                >
                  {listItemsIbrsTeso}
                </select>
                <select
                  name="tesoCobertura"
                  id="tesoCobertura"
                  className="border text-center outline-none "
                  defaultValue={data?.tesoCobertura || "DEFAULT"}
                  onChange={handlechange}
                  onBlur={(e) => {
                    verificacion()
                    actualizarContext(e)
                  }}
                  disabled={habilitarInput}
                >
                  <option style={{ color: "grey" }} id={'1'} value={'DEFAULT'}>Seleccionar </option>
                  {
                    listCoberturaFNG.map(item => (
                      <option className="outline-none text-coomeva_color-rojo bg-white" key={item.id} id={item.id} value={item.value}>{item.descripcion} </option>
                    ))
                  }
                </select>

                <select
                  name="Tipo_RDTO_Teso"
                  id="Tipo_RDTO_Teso"
                  className="border text-center outline-none "
                  defaultValue={data?.Tipo_RDTO_Teso || "DEFAULT"}
                  onChange={handlechange}
                  onBlur={(e) => {
                    verificacion()
                    actualizarContext(e)
                  }}
                  disabled={habilitarInput||(creditoNuevo?.tesoRedescuento==undefined ||creditoNuevo?.tesoRedescuento=='')}
                >
                  <option style={{ color: "grey" }} id={'1'} value={'DEFAULT'}>Seleccionar </option>
                  {
                    listEntidadRedescueto.map(item => (
                      <option className="outline-none text-coomeva_color-rojo bg-white" key={item.id} id={item.id} value={item.id}>{item.descripcion} </option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-col items-end ">
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
              btnResumen ?
                solicitud.tipoConvenio?.['convenioPago']
                  ? '/radicacion/convenioServicios'
                  : solicitud.tipoConvenio?.['convenioRecaudo']
                    ? '/radicacion/convenioServicios/convenioRecaudo'
                    : '/radicacion/resumen'
                : ''
            }
            enableButton={btnResumen}
            opcion={'navegar'}
          />
        </div> */}
      </main>
    </>
  );
};

export default CreditoNuevo;