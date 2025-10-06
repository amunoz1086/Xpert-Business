'use client'

import React, { useEffect, useRef, useState } from 'react';
import { GoChevronDown } from "react-icons/go";

export const DropdownList = ({ idLista, descripcion, ListOpciones = [], multiselect = false, setOpcionesSelecionada, opcionesSelecionada, habilitar, index, subOpciones = [] }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  const [subSelected, setSubSelected] = useState([]);
  const [subAnchorRect, setSubAnchorRect] = useState(null);
  const subDropdownRef = useRef(null);
  const dropdownRef = useRef(null);

  const safeArray = Array.isArray(opcionesSelecionada) ? opcionesSelecionada : [];

  const isValidMainSelection = (selectedValue, currentSelections) => {
    if (!multiselect) return true;

    const has6 = currentSelections.includes(6);
    const has2 = currentSelections.includes(2);
    const has4 = currentSelections.includes(4);

    if (currentSelections.length === 0) return true;
    if (currentSelections.length === 1 && currentSelections.includes(selectedValue)) return true;

    if (selectedValue === 6) return currentSelections.length === 1 && currentSelections.includes(2);
    if (selectedValue === 4) return currentSelections.length === 1 && currentSelections.includes(2);
    if (selectedValue === 2) return currentSelections.length === 1 && (has6 || has4);

    return false;
  };

  const handleChange = (e, optionElement) => {
    e.stopPropagation();
    const selectedValue = parseInt(e.target.value);
    const isSelected = safeArray.includes(selectedValue);

    if (!isSelected && !isValidMainSelection(selectedValue, safeArray)) return;

    if (multiselect) {
      let updatedOptions = [...safeArray];
      const hasSubOptions = selectedValue === 6;

      if (isSelected) {
        if (hasSubOptions && subSelected.length > 0) return;
        updatedOptions = updatedOptions.filter(opt => opt !== selectedValue);
        if (hasSubOptions) {
          setSubDropdownOpen(false);
          setSubSelected([]);
        }
      } else {
        updatedOptions.push(selectedValue);
        if (hasSubOptions && optionElement) {
          const rect = optionElement.getBoundingClientRect();
          setSubAnchorRect(rect);
          setSubDropdownOpen(true);
        }
      }

      const combined = updatedOptions.includes(6)
        ? [...updatedOptions.filter(opt => opt !== 6), ...subSelected, 6]
        : updatedOptions;

      setOpcionesSelecionada(combined, index);
    } else {
      setOpcionesSelecionada(selectedValue, index);
      setIsOpen(false);

      if (selectedValue === 6 && optionElement) {
        const rect = optionElement.getBoundingClientRect();
        setSubAnchorRect(rect);
        setSubDropdownOpen(true);
      } else {
        setSubDropdownOpen(false);
        setSubSelected([]);
      }
    }
  };

  const handleSubOptionChange = (e) => {
    e.stopPropagation();
    const val = parseInt(e.target.value);
    const selected = subSelected.includes(val);
    const updated = selected
      ? subSelected.filter(opt => opt !== val)
      : [...subSelected, val];

    setSubSelected(updated);

    const mainSelected = safeArray.filter(o => o !== 6 && !subSelected.includes(o));
    setOpcionesSelecionada([...mainSelected, 6, ...updated], index);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!habilitar) setIsOpen(!isOpen);
  };

  const encontrarPrimero = (ListOpciones, opcionesSeleccionadas) => {
    for (let item of ListOpciones) {
      if (opcionesSeleccionadas?.includes(item[idLista])) {
        return item[descripcion];
      }
    }
    return 'Seleccionar';
  };

  const getOpcion2 = () => {
    let perfil = multiselect && encontrarPrimero(ListOpciones, safeArray);
    let perfilCliente = !multiselect && ListOpciones.filter(op => op[idLista] == opcionesSelecionada);
    let opcion = perfilCliente.length > 0 ? perfilCliente[0][descripcion] : 'seleccionar';
    return multiselect ? perfil : opcion;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (subDropdownRef.current && !subDropdownRef.current.contains(event.target)) {
        setSubDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSubDropdownStyle = () => {
    if (!subAnchorRect) return {};
    return {
      position: 'fixed',
      top: `${subAnchorRect.top}px`,
      left: `${subAnchorRect.right + 8}px`,
      zIndex: 9999
    };
  };

  useEffect(() => {
    if (Array.isArray(opcionesSelecionada)) {
      const subSelectedFromDB = subOpciones
        .filter(sub => opcionesSelecionada.includes(sub.codeOpcionProducto))
        .map(sub => sub.codeOpcionProducto);
      setSubSelected(subSelectedFromDB);
    }
  }, [opcionesSelecionada, subOpciones]);


  return (
    <div className="w-40 relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full bg-white border border-coomeva_color-azulOscuro rounded-md shadow-md py-2 px-3 flex justify-between text-gray-700"
      >
        {getOpcion2()}
        <GoChevronDown />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 z-50 w-max rounded-md shadow-lg border bg-white">
          {ListOpciones.map((option, index) => {
            const isOption6 = option[idLista] === 6;
            const isOption6Active = safeArray.includes(6) || subSelected.length > 0;

            return (
              <div
                key={option[idLista]}
                className="flex items-center justify-between h-8 px-3 hover:bg-gray-100 border border-coomeva_color-azulOscuro rounded-md relative"
                onClick={(e) => {
                  if (isOption6 && (isOption6Active || isValidMainSelection(6, safeArray))) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setSubAnchorRect(rect);
                    setSubDropdownOpen(true);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <input
                    className="appearance-none w-4 h-4 border border-coomeva_color-azulOscuro rounded-full checked:bg-coomeva_color-azulOscuro focus:outline-none"
                    type="checkbox"
                    value={option[idLista]}
                    checked={
                      isOption6
                        ? isOption6Active
                        : safeArray.includes(option[idLista])
                    }
                    onChange={(e) => handleChange(e, e.currentTarget.closest('div'))}
                    id={`opcion${index}`}
                    disabled={habilitar}
                  />
                  <label htmlFor={`opcion${index}`} className="text-gray-700 text-xs w-max">
                    {option[descripcion]}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {subDropdownOpen && (
        <div
          ref={subDropdownRef}
          className="bg-white shadow-lg rounded-md border p-2 z-50"
          style={getSubDropdownStyle()}
        >
          <ul className="text-xs text-gray-800 space-y-1">
            {subOpciones.map((sub, idx) => (
              <li key={sub.codeOpcionProducto} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={sub.codeOpcionProducto}
                  checked={subSelected.includes(sub.codeOpcionProducto)}
                  onChange={handleSubOptionChange}
                  className="w-4 h-4 border rounded text-coomeva_color-azulOscuro focus:outline-none"
                />
                <label className="text-xs">{sub.descripcion}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};