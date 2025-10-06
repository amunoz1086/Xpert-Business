import React from 'react'

export const CheckInputRojo = ({labelText,nameInput,onChangeInput,valorInput}) => {

  const isChecked = valorInput=='on'?true:false;

  return (
    <div className='flex gap-x-2'>
       
        <input type="checkbox" name={nameInput} onChange={onChangeInput} checked={isChecked}  id={nameInput}  />
        <label htmlFor={nameInput}>{labelText}</label>
    </div>
  )
}
