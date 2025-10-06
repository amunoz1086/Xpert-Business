'use client'

import { useEffect, useState } from "react";
import { CustomMultiSelect } from "./CustomMultiselect";
import { fnQueryAgrupacionProducto } from "@/app/lib/admin/cuentas/queryAgrupacionProducto";
import { queryListProductoAhorro, queryListProductoCorriente } from "@/app/lib/menuPrincipal/actions";
import { queryListarProductosBancarios } from "@/app/lib/admin/querys/listas";


export const TableProductosAgrupacion = ({ isEditing, onDataChange, onChangeLoading }) => {

  const [tableData, setTableData] = useState([]);
  const [listaCorriente, setListaCorriente] = useState([]);
  const [listaAhorros, setListaAhorros] = useState([]);
  const [listProductoBancario, setListProductoBancario] = useState([]);


  useEffect(() => {
    cargarDatosApi();
  }, []);


  useEffect(() => {
    if (onDataChange) {
      const timeout = setTimeout(() => {
        onDataChange(tableData);
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [tableData, onDataChange]);


  const cargarDatosApi = async () => {
    try {

      onChangeLoading(true);

      const responCompania = JSON.parse(await fnQueryAgrupacionProducto());
      const responCorriente = JSON.parse(await queryListProductoCorriente());
      const responAhorro = JSON.parse(await queryListProductoAhorro());
      const responBancario = JSON.parse(await queryListarProductosBancarios());

      setTableData(responCompania?.DATA || []);
      setListaCorriente(responCorriente?.DATA || []);
      setListaAhorros(responAhorro?.DATA || []);
      setListProductoBancario(responBancario?.DATA || []);

      onChangeLoading(false)

    } catch (error) {
      console.error("Error cargando datos de la API:", error);
      onChangeLoading(false)
    }
  };


  const handleTableCompanyTypeChange = (rowId, newSelectedCompanyTypes) => {
    setTableData(prevData =>
      prevData.map(row =>
        row.id === rowId
          ? { ...row, SubProducto: newSelectedCompanyTypes }
          : row
      )
    );
  };


  return (
    <table className="w-full ">
      <thead>
        <tr className="bg-coomeva_color-azulOscuro text-white">
          <th className="p-2.5 border-b border-gray-300 text-left w-[10%]">Código</th>
          <th className="p-2.5 border-b border-gray-300 text-left w-[25%]">Agrupador</th>
          <th className="p-2.5 border-b border-gray-300 text-left w-[25%]">Producto</th>
          <th className="p-2.5 border-b border-gray-300 text-left w-[40%]">Producto Bancario</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map((row, i) => (
          <tr key={i + 'ss'} >
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{row.codAgrupador}</td>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{row.agrupacionDescripcion}</td>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{row.Producto}</td>
            <td className="p-2.5 border-b border-gray-200 relative ">
              <CustomMultiSelect
                options={row.codAgrupador === 'A1' ? listProductoBancario : row.codProducto === 3 ? listaCorriente : listaAhorros}
                selectedValues={row.SubProducto}
                onSelectChange={handleTableCompanyTypeChange}
                isDisabled={!isEditing}
                rowId={row.id}
                keys={
                  row.agrupacionDescripcion.substring(0, 2) == 'PN' ?
                    {
                      code: 'codProducto', value: 'descripcion'
                    }
                    :
                    {
                      code: 'code', value: 'value'
                    }
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}