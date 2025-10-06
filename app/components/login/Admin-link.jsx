'use client'

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DynamicModal = dynamic(() => import('../share/Modals'));

const opciones = [
    {
        btnCod: "btn1",
        value: "Usuarios",
        label: "Usuarios y roles en la plataforma",
        url: "/administracion/usuarios",
    },
    {
        btnCod: "btn2",
        value: "Productos",
        label: "Líneas de captación y crédito",
        url: "",
    },
    {
        btnCod: "btn3",
        value: "Ahorro",
        label: "Tasas y planes para cuentas de ahorro",
        url: "", //"/administracion/ahorro",
    },
    {
        btnCod: "btn4",
        value: "CDT",
        label: "Configuración y condiciones para ahorro a término",
        url: "",
    },
    {
        btnCod: "btn5",
        value: "Convenio Recaudo",
        label: "Configuración y condiciones para convenio de recaudo",
        url: "" //"/administracion/convenioRecaudo",
    },
    {
        btnCod: "btn6",
        value: "Convenio Pago",
        label: "Configuración y condiciones para convenio de pago",
        url: "" //"/administracion/convenioPago",
    },
    {
        btnCod: "btn7",
        value: "Serv. Financieros",
        label: "Configuración y condiciones para servicios financieros",
        url: "" //"/administracion/servicioFinanciero",
    },
    {
        btnCod: "btn8",
        value: "Deposito a la Vista",
        label: "Configuración y condiciones para servicios financieros",
        url: "" //"/administracion/depositoVista",
    },
    {
        btnCod: "btn9",
        value: "Config. IBR",
        label: "Configurar las tasas de IBR",
        url: "" //"/administracion/modalidad_IBR",
    },
    {
        btnCod: "btn10",
        value: "Crédito",
        label: "Configurar condiciones de crédito",
        url: "" //"/administracion/credito",
    },
    {
        btnCod: "btn11",
        value: "Campos Clientes",
        label: "Definir campos en creación y modificación",
        url: "/administracion/camposClientes/pj/perfil",
    },
    {
        btnCod: "btn12",
        value: "Catálogos",
        label: "Actualizar los catalagos",
        url: "/administracion/catalogos",
    },
    {
        btnCod: "btn13",
        value: "Cuentas",
        label: "Asignación Parámetros de Cuenta",
        url: "/administracion/parametrosCuenta",
    }
];


export default function AdminLinks() {

    const [showModal] = useState(false);
    const [messageAlert] = useState('');
    const router = useRouter();


    const navegar = async (link) => {
        if (link !== '') {
            router.push(link)
        };
    };


    const endModal = async () => {
        // try {
        //    await logout();
        //    limpiarProviderContext()
        //     router.push('/login')
        //     setShowModal(false);
        // } catch (error) {
        //     console.log(error)
        // }
    };


    return <>
        <div className="">
            <div className="w-full flex mb-4 ">
                <h2 className="mx-auto py-13 font-semibold text-center text-sm">Seleccione la Opción a Configurar</h2>
            </div>
            <div className=" mx-auto ">
                {opciones.map((opcion, i) => {
                    return (
                        <button
                            key={opcion.btnCod}
                            onClick={() => { navegar(opcion.url) }}
                            className={`peq:max-md:flex peq:max-md:flex-col-reverse w-full h-14 justify-center`}
                        >
                            <div className='flex items-center space-x-6 '>
                                <p className={`w-[140px] ${opcion.url === '' ? 'bg-coomeva_color-grisPestaña' : 'bg-coomeva_color-rojo '} text-xs rounded-md text-center py-2 text-white`}>{opcion.value}</p>
                                <p className='text-sm'>{opcion.label}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
        {
            (showModal)
            &&
            <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
            </DynamicModal>
        }
    </>
}