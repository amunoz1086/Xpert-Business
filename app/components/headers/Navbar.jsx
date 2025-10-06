'use client'

import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { insertarParametroUrl } from '@/app/lib/utils';
import { FaHome } from 'react-icons/fa';
import { TiArrowBack } from "react-icons/ti";

export default function Navbar() {


    const pathName = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter();

    const administracionPantalla = pathName.split('/')[2]

    const pantallaGuardar = {
        convenioPago: () => insertarParametroUrl({ searchParams, nombreParametro: 'convenioPago', valorParametro: 1, replace, pathName }),
        convenioRecaudo: () => insertarParametroUrl({ searchParams, nombreParametro: 'convenioRecaudo', valorParametro: 1, replace, pathName }),
        servicioFinanciero: () => {
        },
        depositoVista: () => { }
    }

    const btnGuardar = () => pantallaGuardar[administracionPantalla]()

    return (
        <div className="flex justify-between   w-[90%] items-center mx-auto  my-6 mb-10">
            <div className=" w-full md:flex md:items-start md:justify-start sm:flex sm:items-center sm:justify-center">
                <div className="relative flex items-start text-center ">
                    <img
                        className="mx-auto w-10 h-10"
                        width={50}
                        height={50}
                        src="/headers/navbar/logo192.svg"
                        alt="logo bancoomeva"
                    ></img>
                    <h1
                        style={{ color: "#077341" }}
                        className="absolute left-6 top-5 font-bold text-xl hidden sm:block"
                    >
                        Bancoomeva
                    </h1>
                    <h3
                        style={{ color: "#349784" }}
                        className="absolute left-14 top-10 font-bold text-xs hidden sm:block whitespace-nowrap"
                    >
                        Nos facilita la vida
                    </h3>
                </div>
            </div>
            <div
                id="titulo"
                className=" w-full  sm:justify-center sm:items-end sm:text-sm md:text-lg md:flex justify-center md:items-end "
            >
                <h1 className="text-coomeva_color-rojo text-base font-semibold">
                    {
                        administracionPantalla === 'convenioPago' && 'CONVENIO PAGO' ||
                        administracionPantalla === 'convenioRecaudo' && 'CONVENIO RECAUDO' ||
                        administracionPantalla === 'servicioFinanciero' && 'SERVICIO FINANCIERO' ||
                        administracionPantalla === 'depositoVista' && 'DEPÓSITOS A LA VISTA'
                    }
                </h1>
            </div>

            <div className="w-full space-x-6 flex justify-center items-center" >
                {/* dispara el evento submit del formulario de la page actual */}
                <button
                    form={`${administracionPantalla}form`}
                    onClick={btnGuardar}
                    id="btnGuardar"
                    className={` bg-coomeva_color-rojo text-sm  flex justify-center items-center w-32  h-8 text-[#f9f9f9] rounded-md shadow hover:shadow-lg px-4 py-2`}>
                    Guardar
                </button>

                <div className=" flex justify-center items-center h-[30%] w-50%">
                    <Link href={'/login/administracion'}>
                        <FaHome className="cursor-pointer mx-auto w-8 h-8" style={{ width: 35, height: 35, color: 'rgb(183 28 28)' }} />
                    </Link>
                </div>
                <div className="flex justify-center items-center h-[30%] w-50%">
                    <TiArrowBack className="mx-auto w-8 h-8" style={{ width: 40, height: 40, color: 'rgb(159 159 159)' }} />
                </div>
            </div>
        </div>
    )
}

