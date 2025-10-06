import React from 'react'

const CheckInputEntes = ({ onChangeInput, stateCheck, id, labelText, bgCheck, style, enable,onBlur }) => {

    return (
        <div className="container w-full flex items-center gap-4">

            <input
                onChange={onChangeInput}
                // esta defualCheck
                checked={stateCheck}
                disabled={enable}
                className={`w-7 h-7  appearance-none checked:bg-coomeva_color-azulClaro  border-coomeva_color-azulClaro border rounded-md`}
                type="checkbox"
                name={id}
                id={id}
                onBlur={onBlur}
                
            />
            <label className={style} htmlFor={id}>{labelText}</label>
        </div>
    )
}


export default CheckInputEntes