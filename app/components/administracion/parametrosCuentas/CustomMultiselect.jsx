'use client'

import { useEffect, useRef, useState } from "react";


export const CustomMultiSelect = ({ options, selectedValues, onSelectChange, isDisabled, rowId, keys = { code: 'code', value: 'value' } }) => {

    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleToggleOpen = () => {
        if (!isDisabled) {
            setIsOpen(prev => !prev);
        }
    };


    const handleOptionClick = (optionCode) => {
        const newSelectedValues = selectedValues.includes(parseInt(optionCode))
            ? selectedValues.filter((item) => item != optionCode) // Deseleccionar
            : [...selectedValues, parseInt(optionCode)]; // Seleccionar
        onSelectChange(rowId, newSelectedValues);
    };


    return (
        <div className="flex flex-col gap-2 w-[95%]" ref={selectRef}>
            <div
                onClick={handleToggleOpen}
                className={`px-2 py-1 border w-full  border-gray-300 rounded-md cursor-pointer flex justify-between items-center bg-white ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            >
                <span className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                    {selectedValues && selectedValues.length > 0
                        ? (() => {
                            const match = options.find(e => parseInt(e[keys.code]) == parseInt(selectedValues[selectedValues.length - 1]));
                            return match ? match[keys.value] : 'Selecciona';
                        })()
                        : 'Selecciona'}
                </span>

                <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="mt-1 border border-gray-300 rounded-md bg-white shadow-lg max-h-40 overflow-y-auto transition-all duration-300">
                    {options.map((option, i) => (
                        <div
                            key={i}
                            onClick={() => handleOptionClick(option[keys.code])}
                            className={`p-2 cursor-pointer ${selectedValues.includes(parseInt(option[keys.code]))
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-100'
                                }`}
                        >
                            {option[keys.value]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};