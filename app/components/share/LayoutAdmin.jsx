'use client'

import React from 'react';
import Navbar from '../headers/Navbar';
import { usePathname } from 'next/navigation';
import MenuLateral from '../headers/MenuLaterial';
import Image from 'next/image';

export const LayoutAdmin = ({ children }) => {

    const router = usePathname();

    const noMostrarNavegacion = [
        '/administracion/usuarios',
        '/administracion/ahorro',
        '/administracion/catalogos',
        '/administracion/parametrosCuenta',
        '/administracion/camposClientes',
        '/administracion/camposClientes/pj/perfil',
        '/administracion/camposClientes/pj/representanteLegal',
        '/administracion/camposClientes/pj/contactoAutorizado',
        '/administracion/camposClientes/pj/juntaDirectiva',
        '/administracion/camposClientes/pj/accionistas',
        '/administracion/camposClientes/pj/controlantes',
        '/administracion/camposClientes/pj/beneficiarios',
        '/administracion/camposClientes/pj/informacionFinanciera',
        '/administracion/camposClientes/pj/documentos',
        '/administracion/camposClientes/pn/perfil',
        '/administracion/camposClientes/pn/actividadEconomica',
        '/administracion/camposClientes/pn/referencias',
        '/administracion/plan'
    ];

    const mostrarNavbar = !noMostrarNavegacion.includes(router);

    return (
        <>
            {
                mostrarNavbar ?
                    <>
                        <Navbar />
                        <div className="w-full bg-coomeva_color-grisPestaña p-1 text-center text-white ">
                            <span>Parametrización</span>
                        </div>
                        <div className='px-8'>
                            {children}
                        </div>
                    </> :
                    <>
                        <div className="w-full lg:h-[100%] sm:h-12 md:h-14 fixed bg-coomeva_color-rojo flex-none md:w-14">
                            <MenuLateral usuario={''} session={''} />
                        </div>
                        <div className="flex-grow ml-12 h-full md:p-8 ">
                            {children}
                            <footer className='flex mt-4 items-end  justify-center  '>
                                <Image src="/logos/logogris.svg" alt="Logo" width={30} height={30} className="w-10 h-12 " />
                            </footer>
                        </div>
                    </>
            }
        </>
    )
}