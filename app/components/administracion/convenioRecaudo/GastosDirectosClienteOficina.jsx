'use client'

import { useState, useEffect } from 'react';
import { ImPlus } from "react-icons/im";
import { TbTrashXFilled } from "react-icons/tb";
import { deleteGastosDirectosOficina } from '@/app/lib/administracion/delete';
import { insertGastosDirectosOficina } from '@/app/lib/administracion/inserts';
import { queryGastosDirectosOficina } from '@/app/lib/administracion/querys';

const GastosDirectosClienteOficina = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    queryGastosDirectosOficina().then((res) => {
      setData(JSON.parse(res)?.DATA || [])
    });
  }, [loading]);

  const insertCelda = () => {
    if (data.length > 0) {
      let gasto = document.getElementById(`gasto${data.length - 1}`);
      if (gasto.value === '') return;
    }

    setData([...data, {
      idgastosDirectosOficina: '',
      tipoGastosDirectosOficina: '',
      nuevo: true
    }]);
  };

  const guardarData = async (e) => {
    try {
      if (e.target.value === '') return;
      const response = JSON.parse(await insertGastosDirectosOficina({ data: e.target.value }));
      setLoading(!loading);
    } catch (error) {
      console.log(error);
    };
  };

  const EliminarGastosDirectosClientOficianDB = async (index, idGasto) => {
    const response = JSON.parse(await deleteGastosDirectosOficina({ rowsDelete: idGasto }));
    setLoading(!loading);
  };

  const handleChangeInput = (e, index) => {
    const newData = [...data];
    newData[index].tipoGastosDirectosOficina = e.target.value;
    setData(newData);
  };

  return (
    <>
      <form id="frmGastosDirectosClientOficina" className="w-full h-full flex text-sm">
        <table className="w-full h-full">
          <thead>
            <tr>
              <th className=" border-l text-coomeva_color-rojo border-gray-300 pl-2 flex justify-between">
                Gastos Directos Cliente
                <i
                  className="displa text-coomeva_color-rojo text-xl cursor-pointer"
                  onClick={insertCelda}
                >
                  <ImPlus className='hidden' />
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
                        autoFocus
                        placeholder=""
                        value={content.tipoGastosDirectosOficina}
                        onChange={(e) => { handleChangeInput(e, index) }}
                        onBlur={guardarData}
                        disabled={!content?.nuevo}
                        autoComplete='off'
                      />
                      <i className="text-xl text-coomeva_color-rojo cursor-pointer" onClick={() => { EliminarGastosDirectosClientOficianDB(index, content.idgastosDirectosOficina) }}><TbTrashXFilled className='hidden' /></i>
                    </div>
                  )
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default GastosDirectosClienteOficina