'use client'
import Loading from '@/app/loading';
import React, { useState } from 'react';
import { FaPlay, FaPencilAlt, FaSave } from 'react-icons/fa';

export const CollapsibleTableSection = ({ title, children, defaultOpen = false, showEditSaveButtons = true, onSave }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false)

  
  const toggleSection = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsEditing(false);
    }
  };


  const handleEdit = () => {
    setIsEditing(true);
  };


  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(title);
    }
  };


  const onChangeLoading = (estado) => {
    setLoading(estado);
  };


  return (
    <div className="mb-4">
      <div
        onClick={toggleSection}
        className="flex items-center cursor-pointer py-1.5"
      >
        <FaPlay
          className={`text-coomeva_color-azulOscuro mr-2.5 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'
            } text-lg`}
        />
        <span className="text-coomeva_color-azulOscuro font-bold text-lg">
          {title}
        </span>
      </div>
      {isOpen && (
        <div className="flex justify-around items-center">
          <div className="w-full mt-3.5 border border-gray-300 rounded-md overflow-x-auto">
            {/* Clone children and pass isEditing prop */}
            {React.Children.map(children, child =>
              React.cloneElement(child, { isEditing: isEditing, onChangeLoading: onChangeLoading })
            )}
          </div>
          {showEditSaveButtons && (
            <div className="p-2.5 flex flex-col ml-4">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="p-2.5 cursor-pointer flex items-center mb-2"
                >
                  <FaPencilAlt className="mr-1.5 text-coomeva_color-rojo h-10 w-10" />
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="p-2.5 cursor-pointer flex items-center mb-2"
                >
                  <FaSave className="mr-1.5 text-coomeva_color-rojo h-10 w-10" />
                </button>
              )}
              {
                loading ? <Loading /> : undefined
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};