'use client'

import { useEffect, useState } from "react";
import { fnQueryAgrupacionTipoCompania } from "@/app/lib/admin/cuentas/queryAgrupacionTipoCompania";
import { queryListTipoSociedad } from "@/app/lib/menuPrincipal/actions";
import { CustomMultiSelect } from "./CustomMultiselect";


export const TableAgrupadores = ({ isEditing, onDataChange, onChangeLoading }) => {
  const [tableData, setTableData] = useState([]);
  const [listaTipoSociedad, setListaTipoSociedad] = useState([]);

  useEffect(() => {
    cargarDatosApi();
  }, []);


  useEffect(() => {
    if (onDataChange) {
      onDataChange(tableData);
    }
  }, [tableData, onDataChange]);

  const cargarDatosApi = async () => {
    try {
      onChangeLoading(true)
      const responCompania = JSON.parse(await fnQueryAgrupacionTipoCompania());
      const responTipoSociedad = JSON.parse(await queryListTipoSociedad());

      const resAgrupacion = responCompania?.DATA || [];
      setTableData(resAgrupacion);

      const resObligacion = responTipoSociedad?.DATA || [];
      setListaTipoSociedad(resObligacion);
      onChangeLoading(false)

    } catch (error) {
      console.error("Error cargando datos de la API:", error);
      onChangeLoading(false)
    }
  };

  const handleTableCompanyTypeChange = (rowId, newSelectedCompanyTypes) => {
    setTableData(prevData => {
      const updatedData = prevData.map(row =>
        row.id === rowId
          ? { ...row, codCompania: newSelectedCompanyTypes }
          : row
      );
      return updatedData;
    });
  };

  return (

    <table className="w-full h-auto">
      <thead>
        <tr className="bg-coomeva_color-azulOscuro text-white">
          <th className="p-2.5 border-b border-gray-300 text-left">Código</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Agrupador</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Tipo de Persona</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Tipo de compañía</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.id}>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{row.codAgrupador}</td>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{row.agrupacionDescripcion}</td>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{row.TIPOCLI}</td>
            <td className="p-2.5 border-b border-gray-200 relative">
              {(row.TIPOCLI).toLowerCase() === 'pj' ? (
                <CustomMultiSelect
                  options={listaTipoSociedad}
                  selectedValues={row.codCompania}
                  onSelectChange={handleTableCompanyTypeChange}
                  isDisabled={!isEditing}
                  rowId={row.id}
                />
              ) : (
                <span>N/A</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};
