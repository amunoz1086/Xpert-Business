'use client'
import { fnQueryAgrupacionTitularidad } from "@/app/lib/admin/cuentas/queryAgrupacionTitularidad";
import { queryListTitularidad } from "@/app/lib/menuPrincipal/actions";
import { useEffect, useState } from "react";

export const TableTitularidadAgrupacion = ({ isEditing, onDataChange,onChangeLoading }) => {
  const [listTitularidad, setListTitularidad] = useState([]);
  const [agrupacionTitularidad, setAgrupacionTitularidad] = useState([]);
  const [selectedTitularidad, setSelectedTitularidad] = useState({});

  useEffect(() => {
    cargarDatosApi();
  }, []);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(selectedTitularidad);
    }
  }, [selectedTitularidad, onDataChange]);

  const cargarDatosApi = async () => {
    try {
      onChangeLoading(true)
      const response = JSON.parse(await fnQueryAgrupacionTitularidad());
      const resAgrupacion = response?.DATA || [];
      setAgrupacionTitularidad(resAgrupacion);

      const resTitular = JSON.parse(await queryListTitularidad());
      setListTitularidad(resTitular?.DATA || []);

      const initialSelections = {};
      resAgrupacion.forEach(agr => {
        initialSelections[agr.codAgrupador] = agr.titularidadSeleccionada || '';
      });
      setSelectedTitularidad(initialSelections);

      onChangeLoading(false)

    } catch (error) {
      console.error("Error cargando datos de la API:", error);
      onChangeLoading(false)
    }
  };


  const handleTitularidadChange = (e, codAgrupador) => {
    const { value } = e.target;
    setSelectedTitularidad(prev => ({
      ...prev,
      [codAgrupador]: value,
    }));

  };


  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-coomeva_color-azulOscuro text-white">
          <th className="p-2.5 border-b border-gray-300 text-left">Código</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Agrupador</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Titularidad</th>
        </tr>
      </thead>
      <tbody>
        {agrupacionTitularidad.map((agr, i) => (
          <tr key={i}>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{agr.codAgrupador}</td>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{agr.agrupacionDescripcion}</td>
            <td className="p-2.5 border-b border-gray-200">
              <select
                disabled={!isEditing}
                className="w-full bg-transparent"
                value={selectedTitularidad[agr.codAgrupador] || agr.codTitularidad}
                onChange={(e) => handleTitularidadChange(e, agr.codAgrupador)}
              >
                <option value="">Seleccione...</option>
                {listTitularidad.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.value}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};