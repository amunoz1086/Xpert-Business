import { conversionPesos } from '@/app/lib/utils'
import React, { useState } from 'react';


const RangosDescripcion = ({ rango = [], titulo, opcion, handleAddRow, handleInputChange, deshabilitar = false,removeCurrencyFormat,onBurInput }) => {

    console.log(rango)

    return (
        <>

            <div className='shadow-md rounded-md mt-3'>
                {
                    titulo ?
                        <div className='text-coomeva_color-rojo flex justify-evenly'>
                            <div className='bg-coomeva_color-grisPestaña2 w-full flex justify-center '><h6>{titulo}</h6></div>
                            <div className='w-full text-center text-transparent'><h6>Rango Superior</h6></div>
                            <div className='w-full text-center text-transparent'><h6>Rango Superior</h6></div>
                        </div>
                        : undefined
                }

                <div className='text-coomeva_color-rojo flex justify-evenly bg-coomeva_color-grisPestaña2 rounded-t-md'>
                    <div className='w-full flex justify-center'><h6>Rango Inferior</h6></div>
                    <div className='w-full'><h6>Rango Superior</h6></div>
                    <div className='w-full'><h6>Tasa Máxima EA</h6></div>
                </div>
                {
                    rango.map((r, index) => (
                        <div key={'rango'+index} className={`${index%2!=0?'bg-coomeva_color-grisPestaña2':'bg-transparent'} `}>
                            <div className='flex justify-evenly'>
                                <div>
                                    <input
                                        id={`rangoMin${index}`}
                                        className='bg-transparent'
                                        type="text"
                                        value={conversionPesos({ valor: r.rangoMin, nDecimales: '' }) }
                                        onChange={(e) => handleInputChange(index, 'rangoMin', e.target.value)}
                                        disabled={deshabilitar}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^\d.]/g, '');
                                        }}
                                        onFocus={(e) => { e.target.value = removeCurrencyFormat(e.target.value); }}
                                        onBlur={onBurInput}
                                    />
                                </div>
                                <div>
                                    <input
                                        id={`rangoMax${index}`}
                                        className='bg-transparent'
                                        type="text"

                                        value={conversionPesos({ valor: r.rangoMax, nDecimales: '' })}
                                        onChange={(e) => handleInputChange(index, 'rangoMax', e.target.value)}
                                        disabled={deshabilitar}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^\d.]/g, '');
                                        }}
                                        onFocus={(e) => { e.target.value = removeCurrencyFormat(e.target.value); }}
                                        onBlur={onBurInput}
                                    />
                                </div>
                                <div>
                                    <input className='bg-transparent'
                                        id={`tasaEA${index}`}
                                        type="text"
                                        onChange={(e) => handleInputChange(index, 'tasaEA', e.target.value)}
                                        value={conversionPesos({ valor: r.tasaEA, nDecimales: 2,style:'percent' })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddRow(index);
                                            }
                                        }}
                                        disabled={deshabilitar}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^\d.]/g, '');
                                        }}
                                        onFocus={(e) => { e.target.value = removeCurrencyFormat(e.target.value); }}
                                        onBlur={onBurInput}
                                    />
                                </div>
                            </div>

                        </div>
                    ))
                }


            </div>
        </>


    );
};



// return (
{/* <div className='shadow-md rounded-md mt-3'>
    {
        titulo ?
            <div className='text-coomeva_color-rojo flex justify-evenly'>
                <div className='bg-coomeva_color-grisPestaña2 w-full flex justify-center '><h6>{titulo}</h6></div>
                <div className='w-full text-center text-transparent'><h6>Rango Superior</h6></div>
                <div className='w-full text-center text-transparent'><h6>Rango Superior</h6></div>
            </div>
            : undefined
    }

    <div className='text-coomeva_color-rojo flex justify-evenly bg-coomeva_color-grisPestaña2 rounded-t-md'>
        <div className='w-full flex justify-center'><h6>Rango Inferior</h6></div>
        <div className='w-full'><h6>Rango Superior</h6></div>
        <div className='w-full'><h6>Tasa Máxima EA</h6></div>
    </div>
    {
        rango.map((r) => (
            <div key={r.codPlan}>
                <div className='flex justify-evenly'>
                    <div>
                        <input className='bg-transparent' type="text" defaultValue={conversionPesos({ valor: r.rangoMin })} />
                    </div>
                    <div>
                        <input className='bg-transparent' type="text" defaultValue={conversionPesos({ valor: r.rangoMax })} />
                    </div>
                    <div>
                        <input className='bg-transparent' type="text" defaultValue={conversionPesos({ valor: r.tasaEA, nDecimales: 2, style: 'percent' })} />
                    </div>
                </div>

            </div>
        ))
    }


</div> */}
//)


export default RangosDescripcion
