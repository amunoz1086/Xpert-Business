'use client'

import { FaSignOutAlt } from 'react-icons/fa';
import MenuLateral_links from './MenuLateral_links';
import InfoUser from './InfoUser';
import { logout } from '@/app/lib/auth/auth';
import { useRouter } from 'next/navigation';
import { useDatosFuncionProvider } from '@/app/hooks/useDatosFuncionProvider';
import { useEffect, useState } from 'react';
import Loading from '../share/Loading';


export default function MenuLateral({ usuario }) {

    const [loading, setLoading] = useState(false);
    const { limpiarProviderContext, } = useDatosFuncionProvider();
    const { push } = useRouter();
    const [cerrarSession, setCerrarSession] = useState(false);


    useEffect(() => {
        if (cerrarSession) {
            push('/login');
        };
    }, [cerrarSession]);


    const handleCerrarSession = async (e) => {

        try {
            setLoading(true)
            await logout()

            limpiarProviderContext();
            localStorage.clear();
            setLoading(false);

            // if (worker) {
            //     worker.terminate();
            //     setWorker(null);  // Opcional: limpia la referencia al worker
            // }

            setCerrarSession(true)

        } catch (error) {
            console.log(error);
            setLoading(false)
            setCerrarSession(false)
        }

    }

    return (

        <div className='w-14  mt-2  px-1 lg:w-full h-auto '>


            <div className="flex  grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <InfoUser usuario={usuario} />
                <MenuLateral_links />
                <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
                <button onClick={handleCerrarSession} title='salir' id='btnLogout' aria-label='boton cerrar sesion' className=" ml-4  justify-center items-center flex ">
                    <FaSignOutAlt className="w-6 h-6 text-white  hover:text-gray-400 classFaSignOutAlt" /* style={{ pointerEvents: 'none' }} */ />
                </button>
            </div>


            {
                loading && <Loading />
            }


        </div>


    );


}