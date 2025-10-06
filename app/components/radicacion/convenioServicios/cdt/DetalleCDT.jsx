'use client'

import { CampoLista } from "@/app/components/share/CampoLista";
import { CampoMoneda } from "@/app/components/share/CampoMoneda";
//import { CampoNumero } from "@/app/components/share/CampoNumero";
import { CampoTexto } from "@/app/components/share/CampoTexto";
//import { fnQueryReinversionCdt } from "@/app/lib/convenios/cdt/fnQueryListarReinversionCdt";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//import { ImPlus } from "react-icons/im";
import { TbArrowLeft } from "react-icons/tb";


const DynamicModal = dynamic(() => import('@/app/components/share/Modals'));


const DetalleCDT = ({ showModalDetalle = false, cerrarModalDetalle, mostrarModalConfirmar, itemSeleccionado = [], formaPagoCdt = {} }) => {

  const [faltantes, setFaltantes] = useState(0);
  const [adicionRCA, setAdicionRCA] = useState(0);
  const [adicionRIN, setAdicionRIN] = useState(0);
  const [valorEfectivo, setValorEfectivo] = useState(0);
  const [valorCheque, setValorCheque] = useState(0);
  const [valorDebito, setValorDebito] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [data, setData] = useState([]);


  useEffect(() => {
    if (showModalDetalle) {
      setFaltantes(0);
      setAdicionRCA(0);
      setAdicionRIN(0);
      setValorEfectivo(0);
      setValorCheque(0);
      setValorDebito(0);
      setData(itemSeleccionado);
      setResetKey((prev) => prev + 1);
    }
  }, [showModalDetalle, itemSeleccionado, formaPagoCdt]);


  const onChangeInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'RCA': {
        setAdicionRCA(value);
        let saldoFavor = data[0].saldoFavor;
        let adicion = value;
        const edoRCA = validarAdicion(id, saldoFavor, adicion);

        if (edoRCA) {
          document.getElementById(id).onblur = () => calculosFaltantes(id);
        };

        break;
      }
      case 'RIN': {
        setAdicionRIN(value);
        let saldoFavor = data[1].saldoFavor;
        let adicion = value;
        const edoRIN = validarAdicion(id, saldoFavor, adicion);

        if (edoRIN) {
          document.getElementById(id).onblur = () => calculosFaltantes(id);
        };

        break;
      }
      case 'efectivo': {
        setValorEfectivo(value);
        document.getElementById(id).onblur = () => calculosFaltantes(id);
        break;
      }
      case 'cheque': {
        setValorCheque(value);
        document.getElementById(id).onblur = () => calculosFaltantes(id);
        break;
      }
      case 'debito': {
        setValorDebito(value);
        document.getElementById(id).onblur = () => calculosFaltantes(id);
        break;
      }
      default:
        break;
    };
  };


  const validarAdicion = (id, saldoFavor, adicion) => {

    let elemenComprometido = document.getElementById(`${id}`);

    if (adicion > saldoFavor) {
      alert("La Adición no puede ser mayor al Saldo a Favor")
      elemenComprometido.classList.remove('text-coomeva_color-azulClaro');
      elemenComprometido.classList.add('text-coomeva_color-rojo');
      elemenComprometido.setAttribute("title", "La Adición es mayor al Saldo a Favor");
      return false
    } else {
      elemenComprometido.classList.remove('text-coomeva_color-rojo');
      elemenComprometido.classList.add('text-coomeva_color-azulClaro');
      elemenComprometido.removeAttribute("title");
      return true;
    };

  };


  const calculosFaltantes = (id) => {

    let valElemente = document.getElementById(id).value;
    let valor = Number(valElemente.replace(/[^0-9]/g, ""));


    switch (id) {
      case 'RCA': {
        sessionStorage.setItem(id, valor);
        break;
      }
      case 'RIN': {
        sessionStorage.setItem(id, valor);
        break;
      }
      case 'efectivo': {
        sessionStorage.setItem(id, valor);
        break;
      }
      case 'cheque': {
        sessionStorage.setItem(id, valor);
        break;
      }
      case 'debito': {
        sessionStorage.setItem(id, valor);
        break;
      }
      default:
        break;
    };


    let parseRCA = isNaN(parseInt(sessionStorage.getItem('RCA'))) ? 0 : parseInt(sessionStorage.getItem('RCA'));
    let parseRIN = isNaN(parseInt(sessionStorage.getItem('RIN'))) ? 0 : parseInt(sessionStorage.getItem('RIN'));
    let parseEfectivo = isNaN(parseInt(sessionStorage.getItem('efectivo'))) ? 0 : parseInt(sessionStorage.getItem('efectivo'));
    let parseCheque = isNaN(parseInt(sessionStorage.getItem('cheque'))) ? 0 : parseInt(sessionStorage.getItem('cheque'));
    let parseDebito = isNaN(parseInt(sessionStorage.getItem('debito'))) ? 0 : parseInt(sessionStorage.getItem('debito'));

    let montoRCA = isNaN(parseInt(data[0].monto)) ? 0 : parseInt(data[0].monto);
    let montoRIN = isNaN(parseInt(data[1].monto)) ? 0 : parseInt(data[1].monto);

    let totalReinversionFormasPafo = parseRCA + parseRIN + parseEfectivo + parseCheque + parseDebito;

    let montoCDT = montoRCA + montoRIN;
    let totalFaltantes = montoCDT - totalReinversionFormasPafo;

    setFaltantes(totalFaltantes);

  };


  const fnAdicionRCA = (item) => {
    if (adicionRCA === 0) {
      setAdicionRCA(item);
      return adicionRCA;
    } else {
      return adicionRCA;
    };
  };


  const fnAdicionRIN = (item) => {
    if (adicionRIN === 0) {
      setAdicionRIN(item);
      return adicionRIN;
    } else {
      return adicionRIN;
    };
  };


  //efectivo
  const fnEfectivo = (val) => {
    if (valorEfectivo === 0) {
      setValorEfectivo(val);
      return valorEfectivo;
    } else {
      return valorEfectivo;
    };
  };


  //cheque
  const fnCheque = (val) => {
    if (valorCheque === 0) {
      setValorCheque(val);
      return valorCheque;
    } else {
      return valorCheque;
    };
  };


  //debito
  const fnDebito = (val) => {
    if (valorDebito === 0) {
      setValorDebito(val);
      return valorDebito;
    } else {
      return valorDebito;
    };
  };


  return (
    <>
      {
        showModalDetalle ?
          <DynamicModal ocultarLogo={true} ocultarBtnCancelar={true} ocultarBtnContinuar={true} footer={false} encabezado={false} titulo={'Buzon'} iconoAlert={false} w={60} cerrarModal={() => { setModal(false) }} mostrarImagneFondo={true}  >
            <div className="w-full flex justify-between text-gray-700">
              <button onClick={cerrarModalDetalle} className="flex items-center gap-3 cursor-pointer"><TbArrowLeft /> <p>Atras</p></button>
              <button onClick={cerrarModalDetalle} className="cursor-pointer"><p className="text-xl mx-4 ">x</p></button>
            </div>
            <p className="w-full text-sm text-gray-600">Detalle CDT a Cancelar</p>
            <p className="border border-gray-400 w-full "></p>
            <div className="w-full h-[30rem] overflow-y-scroll py-3 border bg-white rounded-lg shadow-sm p-4">
              <div className="flex gap-4">
                <p>Nro. CDT</p>
                <div>
                  <input type="text" defaultValue={itemSeleccionado[0]?.codCDT || ''} readOnly />
                  <hr />
                </div>
              </div>
              <div className='overflow-x-auto mt-8'>
                <table className='table-fixed w-full '>
                  <thead className="bg-coomeva_color-grisPestaña2">
                    <tr className='text-coomeva_color-rojo  h-10 '>
                      <th className='w-28 text-center'>Monto</th>
                      <th className='w-36 '>01: Reinversión</th>
                      <th className='w-36'>Saldo a favor</th>
                      <th className='w-36'>Adición</th>
                      <th className='w-36'>Faltantes</th>
                    </tr>
                  </thead>
                  <tbody key={resetKey}>
                    {
                      data.length > 0 ?
                        data.map((item, i) => (
                          <tr id={i + item.codCDT} key={i + item.codCDT} className=''>
                            <td className='w-28  py-2 px-[20px] ' >
                              <CampoMoneda
                                fontSize="text-sm"
                                textColor="text-coomeva_color-azulClaro"
                                borderColor="border-coomeva_color-azulClaro"
                                valorInput={item?.monto + ''}
                                placeholder=""
                                validacionRequeridoEditable={{ requerido: false }}
                              />
                            </td>
                            <td className='w-36 py-2 px-[20px] text-gray-400'>{item?.reinversion}</td>
                            <td className='w-36 py-2 px-[20px]'>
                              <CampoMoneda
                                textColor="text-coomeva_color-azulClaro"
                                fontSize="text-sm"
                                borderColor="border-coomeva_color-azulClaro"
                                valorInput={item?.saldoFavor + ''}
                                placeholder=""
                                validacionRequeridoEditable={{ requerido: false }}
                              />
                            </td>
                            <td className='w-36  py-2 px-[20px]'>
                              {
                                item?.codReinvercion === 'RCA' ?
                                  <CampoMoneda
                                    textColor="text-coomeva_color-azulClaro"
                                    fontSize="text-sm"
                                    borderColor="border-coomeva_color-azulClaro"
                                    valorInput={fnAdicionRCA(item.adicion) + ''}
                                    placeholder=""
                                    validacionRequeridoEditable={{ requerido: false }}
                                    nameInput={item?.codReinvercion}
                                    onChangeInput={onChangeInput}
                                  />
                                  : null
                              }
                              {
                                item?.codReinvercion === 'RIN' ?
                                  <CampoMoneda
                                    textColor="text-coomeva_color-azulClaro"
                                    fontSize="text-sm"
                                    borderColor="border-coomeva_color-azulClaro"
                                    valorInput={fnAdicionRIN(item.adicion) + ''}
                                    placeholder=""
                                    validacionRequeridoEditable={{ requerido: false }}
                                    nameInput={item?.codReinvercion}
                                    onChangeInput={onChangeInput}
                                  />
                                  : null
                              }

                            </td>
                            <td className='w-36  py-2 px-[20px]'>
                              {
                                item?.codReinvercion !== 'RIN' ?
                                  <CampoMoneda
                                    textColor="text-coomeva_color-azulClaro"
                                    fontSize="text-sm"
                                    borderColor="border-coomeva_color-azulClaro"
                                    valorInput={faltantes + ''}
                                    placeholder=""
                                    validacionRequeridoEditable={{ requerido: false }}
                                    nameInput={`faltantes-${item?.codReinvercion}`}
                                  />
                                  : null
                              }
                            </td>
                          </tr>
                        ))
                        : null
                    }
                  </tbody>
                </table>
              </div>
              <div className='overflow-x-auto mt-14'>
                <table className='table-fixed w-full '>
                  <thead className="bg-coomeva_color-grisPestaña2">
                    <tr className='text-coomeva_color-rojo text-center h-10'>
                      <th className='w-[50%]'>02: Otras Formas de Pago</th>
                      <th className='w-[50%]'>Valor pagado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='text-center'>
                      <td className='px-32 py-2 ' >
                        <CampoTexto
                          textColor="text-coomeva_color-azulClaro"
                          fontSize="text-sm"
                          borderColor="border-coomeva_color-azulClaro"
                          valorInput="Efectivo"
                          placeholder=""
                          validacionRequeridoEditable={{ requerido: false }}
                        />
                      </td>
                      <td className='px-32 py-2'>
                        <CampoMoneda /* 1 */
                          textColor="text-coomeva_color-azulClaro"
                          fontSize="text-sm"
                          borderColor="border-coomeva_color-azulClaro"
                          valorInput={fnEfectivo(formaPagoCdt.efectivo) + ''}
                          placeholder=""
                          validacionRequeridoEditable={{ requerido: false }}
                          nameInput={'efectivo'}
                          onChangeInput={onChangeInput}
                        />
                      </td>
                    </tr>
                    <tr className='text-center'>
                      <td className='px-32 py-2 ' >
                        <CampoTexto
                          textColor="text-coomeva_color-azulClaro"
                          fontSize="text-sm"
                          borderColor="border-coomeva_color-azulClaro"
                          valorInput="Cheque otros bancos"
                          placeholder=""
                          validacionRequeridoEditable={{ requerido: false }}
                        />
                      </td>
                      <td className='px-32 py-2'>
                        <CampoMoneda /* 2 */
                          textColor="text-coomeva_color-azulClaro"
                          fontSize="text-sm"
                          borderColor="border-coomeva_color-azulClaro"
                          valorInput={fnCheque(formaPagoCdt.cheque) + ''}
                          placeholder=""
                          validacionRequeridoEditable={{ requerido: false }}
                          nameInput={'cheque'}
                          onChangeInput={onChangeInput}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-32">
                        <CampoLista
                          fontSize="text-sm"
                          lista={[{ id: 1, descripcion: 'opcion 1' }, { id: 2, descripcion: 'opcion 2' }]}
                          descripcionList="descripcion"
                          idLista="id"
                          validacionRequeridoEditable={{ requerido: false }}
                          placeholder="Débito"
                        />
                      </td>
                      <td className="px-32">
                        <CampoMoneda /* 3 */
                          textColor="text-coomeva_color-azulClaro"
                          fontSize="text-sm"
                          borderColor="border-coomeva_color-azulClaro"
                          valorInput={fnDebito(formaPagoCdt.debito) + ''}
                          placeholder=""
                          validacionRequeridoEditable={{ requerido: false }}
                          nameInput={'debito'}
                          onChangeInput={onChangeInput}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className=" flex justify-end w-full">
              <div className="flex gap-8">
                <button onClick={cerrarModalDetalle} className="py-2 px-16 border border-gray-400 rounded-lg mx-auto text-gray-500 text-xs">Cancelar</button>
                <button onClick={mostrarModalConfirmar} className="py-2 px-8 bg-coomeva_color-rojo rounded-lg mx-auto text-white text-xs">Confirmar cancelación</button>
              </div>
            </div>
          </DynamicModal>
          : undefined
      }
    </>
  )
}

export default DetalleCDT