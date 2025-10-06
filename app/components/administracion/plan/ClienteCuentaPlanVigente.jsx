import React from 'react'

export const ClienteCuentaPlanVigente = ({ listaCuentasPlan = [] }) => {

    console.log(listaCuentasPlan)
    return (
        <div className='shadow-md rounded-md '>
            <div className='bg-neutral-400'><h4 className='text-center text-coomeva_color-rojo font-semibold'>Clientes y cuentas con plan vigente</h4></div>
            <div className='text-coomeva_color-rojo flex justify-evenly bg-coomeva_color-grisPestaña2 rounded-t-md'>
                <div><h6 className='text-coomeva_color-azulOscuro'>ID</h6></div>
                <div><h6 className='text-coomeva_color-azulOscuro'>Cliente</h6></div>
                <div><h6 className='text-coomeva_color-azulOscuro'>Cuenta</h6></div>
                {/* <div><h6></h6></div> */}
            </div>
            {

                listaCuentasPlan.map((c, i) => (
                    <div className='flex justify-evenly py-1' key={i+'cuentaplan'}>
                        <div className='flex gap-4 justify-center items-center'>

                            <input className='bg-transparent' type="text" defaultValue={c?.idCliente||''} />
                        </div>
                        <div className='flex gap-4 justify-center items-center'>
                            <input className='bg-transparent' type="text" defaultValue={c?.razonSocial||''} />

                        </div>
                        <div className='flex gap-4 justify-center items-center'>
                            <input className='bg-transparent' type="text" defaultValue={c?.cuenta||''} />

                        </div>

                    </div>
                ))
            }

            {/* <div className='flex justify-evenly bg-coomeva_color-grisPestaña2 py-1'>
                <div className='flex gap-4 justify-center items-center'>

                    <input className='bg-transparent' type="text" defaultValue={'800501201'} />
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <input className='bg-transparent' type="text" defaultValue={'Coop 2'} />

                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <input className='bg-transparent' type="text" defaultValue={'****9879'} />

                </div>
            </div>
            <div className='flex justify-evenly py-1'>
                <div className='flex gap-4 justify-center items-center'>

                    <input className='bg-transparent' type="text" defaultValue={'800501201'} />
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <input className='bg-transparent' type="text" defaultValue={'Coop 2'} />

                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <input className='bg-transparent' type="text" defaultValue={'****9879'} />

                </div>
            </div> */}

        </div>
    )
}
