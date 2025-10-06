'use client'
import { fnQueryAgrupacionRol } from "@/app/lib/admin/cuentas/queryAgrupacionRol";
import { queryListarObligacion } from "@/app/lib/admin/querys/listas";
import { useEffect, useState } from "react";

export const TableRolAgrupacion = ({ isEditing,onDataChange,onChangeLoading }) => {
  const [listaObligacion, setListaObligacion] = useState([]);
  const [agrupacionRol, setAgrupacionRol] = useState([]);


  const [rolData, setRolData] = useState({});

  useEffect(() => {
    cargarDatosApi();
  }, []);

    useEffect(() => {
    if (onDataChange) {
      onDataChange(rolData);
    }
  }, [rolData, onDataChange]);

  const cargarDatosApi = async () => {
    try {
      onChangeLoading(true)
      const response = JSON.parse(await fnQueryAgrupacionRol());
      const resAgrupacion = response?.DATA || [];
      setAgrupacionRol(resAgrupacion);

      const resObligacion = JSON.parse(await queryListarObligacion());
      setListaObligacion(resObligacion?.DATA || []);

      const initialRolData = {};
      resAgrupacion.forEach(agr => {
        initialRolData[agr.codAgrupador] = {
          titular: agr.rolTitular || '',
          firmante: agr.rolFirmante || '',
          secundario: agr.rolSecundario || '',
          cotitular: agr.rolCotitular || '',
          mensaje: agr.mensaje || '',
        };
      });
      setRolData(initialRolData);

      onChangeLoading(false)

    } catch (error) {
      console.error("Error cargando datos de la API:", error);
      onChangeLoading(false)
    }
  };


  const handleRolSelectChange = (e, codAgrupador, campo) => {
    const { value } = e.target;
    setRolData(prevData => ({
      ...prevData,
      [codAgrupador]: {
        ...prevData[codAgrupador],
        [campo]: value,
      },
    }));
  };


  const handleMessageChange = (e, codAgrupador) => {
    const { value } = e.target;
    setRolData(prevData => ({
      ...prevData,
      [codAgrupador]: {
        ...prevData[codAgrupador],
        mensaje: value,
      },
    }));
  };


  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-coomeva_color-azulOscuro text-white">
          <th className="p-2.5 border-b border-gray-300 text-left">Código</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Agrupador</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Titular</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Firmante</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Secundario</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Cotitular</th>
          <th className="p-2.5 border-b border-gray-300 text-left">Mensaje</th>
        </tr>
      </thead>
      <tbody>
        {agrupacionRol.map((rol) => (
          <tr key={rol.codAgrupador}>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{rol.codAgrupador}</td>
            <td className="p-2.5 border-b border-gray-200 bg-coomeva_color-grisSombra">{rol.agrupacionDescripcion}</td>
            <td className="p-2.5 border-b border-gray-200">
              <select
                disabled={!isEditing}
                className="mr-1 w-full bg-transparent"
                value={rolData[rol.codAgrupador]?.titular || rol.titular}
                onChange={(e) => handleRolSelectChange(e, rol.codAgrupador, 'titular')}
              >
                <option value="">Seleccione...</option>
                {listaObligacion.map((item) => (
                  <option key={item.codLista} value={item.codLista}>{item.descripcion}</option>
                ))}
              </select>
            </td>
            <td className="p-2.5 border-b border-gray-200">
              <select
                disabled={!isEditing}
                className="mr-1 w-full bg-transparent"
                value={rolData[rol.codAgrupador]?.firmante || rol.firmante}
                onChange={(e) => handleRolSelectChange(e, rol.codAgrupador, 'firmante')}
              >
                <option value="">Seleccione...</option>
                {listaObligacion.map((item) => (
                  <option key={item.codLista} value={item.codLista}>{item.descripcion}</option>
                ))}
              </select>
            </td>
            <td className="p-2.5 border-b border-gray-200">
              <select
                disabled={!isEditing}
                className="mr-1 w-full bg-transparent"
                value={rolData[rol.codAgrupador]?.secundario || rol.secundario}
                onChange={(e) => handleRolSelectChange(e, rol.codAgrupador, 'secundario')}
              >
                <option value="">Seleccione...</option>
                {listaObligacion.map((item) => (
                  <option key={item.codLista} value={item.codLista}>{item.descripcion}</option>
                ))}
              </select>
            </td>
            <td className="p-2.5 border-b border-gray-200">
              <select
                disabled={!isEditing}
                className="mr-1 w-full bg-transparent"
                value={rolData[rol.codAgrupador]?.cotitular || rol.cotitular}
                onChange={(e) => handleRolSelectChange(e, rol.codAgrupador, 'cotitular')}
              >
                <option value="">Seleccione...</option>
                {listaObligacion.map((item) => (
                  <option key={item.codLista} value={item.codLista}>{item.descripcion}</option>
                ))}
              </select>
            </td>
            <td className="p-2.5 border-b border-gray-200">
              <textarea
                value={rolData[rol.codAgrupador]?.mensaje || ''}
                onChange={(e) => handleMessageChange(e, rol.codAgrupador)}
                disabled={!isEditing}
                className="w-full bg-transparent border border-r-coomeva_color-grisPestaña resize-y h-16 py-1 px-1"
                rows="2"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};