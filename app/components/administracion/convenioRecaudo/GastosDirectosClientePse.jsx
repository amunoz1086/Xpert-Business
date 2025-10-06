'use client'

import { deleteGastosDirectosPse } from "@/app/lib/administracion/delete";
import { insertGastosDirectosPse } from "@/app/lib/administracion/inserts";
import { queryGastosDirectosPse } from "@/app/lib/administracion/querys";
import { useState, useEffect, useRef } from "react";
import { ImPlus } from "react-icons/im";
import { TbTrashXFilled } from "react-icons/tb";

const GastosDirectosClientePse = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    queryGastosDirectosPse().then((res) => {
      setData(JSON.parse(res)?.DATA || [])
    });
  }, [loading]);

  const insertCelda = () => {
    if (data.length > 0) {
      let gasto = document.getElementById(`gasto${data.length - 1}`);
      if (gasto.value === '') return
    };

    setData([...data, {
      idgastosDirectosPse: '',
      nuevo: true
    }]);
  };

  const guardarDataBD = async (e) => {
    if (e.target.value === '') return
    const response = JSON.parse(await insertGastosDirectosPse({ data: e.target.value }));
    setLoading(!loading);
  };

  const deleteCleda = async (idGasto) => {
    const response = JSON.parse(await deleteGastosDirectosPse({ rowsDelete: idGasto }));
    setLoading(!loading);
  };

  const handleChangeInput = (e, index) => {
    const newData = [...data];
    newData[index].tipoGastosDirectosPse = e.target.value;
    setData(newData);
  };

  return (
    <>
      <form id="frmGastosDirectosClientPse" className="w-full h-full flex text-sm">
        <table className="w-full h-full">
          <thead>
            <tr>
              <th className="border-l text-coomeva_color-rojo border-gray-300 pl-2 flex justify-between">
                Gastos Directos Cliente
                <i
                  className="text-coomeva_color-rojo text-xl cursor-pointer"
                  onClick={insertCelda}
                >
                  <ImPlus className="hidden" />
                </i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="relative">
              <td className="">
                <div className="h-16 overflow-y-auto">
                  {data.map((content, index) => (
                    <div
                      key={index}
                      className="flex"
                    >
                      <input
                        id={`gasto${index}`}
                        name={content.nuevo ? `gasto${index}` : undefined}
                        type="text"
                        className="w-full pl-1 mx-auto border border-gray-300 outline-none"
                        placeholder=""
                        value={content.tipoGastosDirectosPse}
                        onChange={(e) => { handleChangeInput(e, index) }}
                        onBlur={guardarDataBD}
                        disabled={!content?.nuevo}
                        autoComplete="off"
                      />
                      <i className="text-xl cursor-pointer text-coomeva_color-rojo" onClick={() => { deleteCleda(content.idgastosDirectosPse) }}><TbTrashXFilled className="hidden" /></i>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default GastosDirectosClientePse