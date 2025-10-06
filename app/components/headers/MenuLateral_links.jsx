'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaRegSun } from 'react-icons/fa';

const opcionesNavegacion = [
    {
        arialLabel: 'Navegar a home',
        href: '/login/perfil',
        icono: FaHome,
        title: 'Inicio'
    },
    {
        arialLabel: 'Navegar a configuración',
        href: '/radicacion/configuracion',
        icono: FaRegSun,
        title: 'configuracion'
    }
]

export default function MenuLateral_links() {

    const pathname = usePathname();

    const cleanStorage = (e) => {
        if (e !== 'Inicio') {
            return;
        }

        localStorage.clear();
    };

    return (
        <>
            {
                opcionesNavegacion.map(link => {
                    const LinkIcon = link.icono

                    return (
                        <Link
                            key={link.icono}
                            href={link.href}
                            title={link.title}
                            className={`${link.href === pathname ? 'text-white ' : 'text-gray-400'} justify-center items-center flex  h-[48px]`}
                        >
                            <LinkIcon
                                className="w-6 h-6 text-white hover:text-gray-400"
                                onClick={(e) => (cleanStorage(link.title))}
                            />
                        </Link>
                    )
                })
            }
        </>
    )
}
