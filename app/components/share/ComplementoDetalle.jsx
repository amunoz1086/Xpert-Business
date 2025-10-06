import { useState, useEffect, useRef } from 'react';
import { AiOutlineDown } from 'react-icons/ai';



const ComplementoDetalle = ({ dataMode = '1', calcularTotal, index, campo }) => {
  const [isOpen, setIsOpen] = useState(false); // Controla el despliegue de la tabla
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({ descripcion: '', monto: '' });
  const modalRef = useRef(null); // Referencia para detectar clics fuera del modal
  const [total, setTotal] = useState(0.0);

  // Simulación de los datos iniciales
  useEffect(() => {
    if (dataMode === '1') {
      const simulatedData = [
        { descripcion: 'Producto 1', monto: '' },
        { descripcion: 'Producto 2', monto: '' },
      ];
      setRows(simulatedData);
    }
  }, [dataMode]);

  // Función para calcular el total
  const recalculateTotal = (rows, newRow) => {
    const totalRows = rows.reduce((sum, row) => sum + parseFloat(row.monto || 0), 0);
    const totalNewRow = parseFloat(newRow.monto || 0);
    setTotal(totalRows + totalNewRow);
  };

  // Actualizar el total en cada cambio de filas o nueva fila
  useEffect(() => {
    recalculateTotal(rows, newRow);
  }, [rows, newRow]);

  useEffect(() => {
    calcularTotal({ target: { name: campo, value: total + '' } });
  }, [total]);

  // Maneja cambios en las filas existentes
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Maneja cambios en la nueva fila
  const handleNewRowChange = (field, value) => {
    setNewRow((prev) => ({ ...prev, [field]: value }));
  };

  // Agregar una nueva fila al presionar Enter
  const handleAddRow = (e) => {
    if (e.key === 'Enter' && newRow.descripcion && newRow.monto) {
      e.preventDefault();
      setRows((prevRows) => [...prevRows, newRow]);
      setNewRow({ descripcion: '', monto: '' });
    }
  };

  // Maneja el cierre del modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="border rounded-md border-coomeva_color-azulOscuro relative w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-coomeva_color-azulOscuro items-center w-full text-start pl-6 flex justify-between px-2">
          <p>Detalle ingreso no operacionales</p>
          <AiOutlineDown className="w-5 h-4 text-coomeva_color-azulOscuro" />
        </div>
      </div>

      {isOpen && (
        <div
          ref={modalRef}
          className="absolute z-50 bg-white w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <table className="table-fixed w-full border border-coomeva_color-azulOscuro">
            <thead>
              <tr className="border border-coomeva_color-azulOscuro">
                <th className="w-1/2 border font-medium border-coomeva_color-azulOscuro">
                  Descripción
                </th>
                <th className="w-1/2 border font-medium border-coomeva_color-azulOscuro">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="w-1/2 border pl-6 border-coomeva_color-azulOscuro">
                    {dataMode === '2' ? (
                      <input
                        type="text"
                        value={row.descripcion}
                        onChange={(e) =>
                          handleInputChange(index, 'descripcion', e.target.value)
                        }
                      />
                    ) : (
                      row.descripcion
                    )}
                  </td>
                  <td className="w-1/2 border pl-6 border-coomeva_color-azulOscuro">
                    {dataMode === '2' ? (
                      <input
                        type="text"
                        value={row.monto}
                        onChange={(e) =>
                          handleInputChange(index, 'monto', e.target.value)
                        }
                      />
                    ) : (
                      row.monto
                    )}
                  </td>
                </tr>
              ))}
              {dataMode === '2' && (
                <tr>
                  <td className="w-1/2 pl-6 border border-coomeva_color-azulOscuro px-8">
                    <input
                      name={'descripcion' + index}
                      type="text"
                      value={newRow.descripcion}
                      onChange={(e) =>
                        handleNewRowChange('descripcion', e.target.value)
                      }
                      onKeyDown={handleAddRow}
                    />
                  </td>
                  <td className="w-1/2 pl-6 border border-coomeva_color-azulOscuro">
                    <input
                      type="text"
                      name={'monto' + index}
                      value={newRow.monto}
                      onChange={(e) =>
                        handleNewRowChange('monto', e.target.value)
                      }
                      onKeyDown={handleAddRow}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComplementoDetalle;
