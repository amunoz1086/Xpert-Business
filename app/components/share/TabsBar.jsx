'use client'

import { validarNavegacionAtras } from '@/app/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

const DynamicModal = dynamic(() => import('./Modals'))

const TabsBar = ({ Tabs, activeTab, context }) => {


    const { solicitud, creditoNuevo, evaluar, updateHistorialPath, convenioRecaudo } = context()

    const [mostrarModal, setMostrarModal] = useState(false)

    const [messageModal, setMessageModal] = useState('')

    const { tipoConvenio, tipoProducto, } = solicitud

    const { redes } = convenioRecaudo

    const router = useRouter()

    useEffect(() => validarNavegacionAtras({ evaluar, updateHistorialPath }), [])





    const {
        cupoMonto,
        cupoIBR,
        cupoPlazo,
        cupoRedescuento,
        cupoCobertura,
        codCupoTipoTasa,
        tesoMont,
        tesoIBR,
        tesoPlazo,
        tesoRedescuento,
        tesoCobertura,
        codTesoTipoTasa,
        promedio,
        tasaNAMV
    } = creditoNuevo


    // const navegarNuevoCredito =
    //     ((cupoMonto !== '' && cupoIBR !== '' && cupoPlazo !== '' && cupoRedescuento !== '' && cupoCobertura !== '' && codCupoTipoTasa !== '') && (cupoMonto !== undefined && cupoIBR !== undefined && cupoPlazo !== undefined && cupoRedescuento !== undefined && cupoCobertura !== undefined && codCupoTipoTasa !== undefined)) ||
    //     ((tesoMont !== '' && tesoIBR !== '' && tesoPlazo !== '' && tesoRedescuento !== '' && tesoCobertura !== '' && codTesoTipoTasa !== '') && (tesoMont !== undefined && tesoIBR !== undefined && tesoPlazo !== undefined && tesoRedescuento !== undefined && tesoCobertura !== undefined && codTesoTipoTasa !== undefined))


    const navegarNuevoCredito  =   creditoNuevo.some(obj => {
        return Object.keys(obj).every(clave => {
            if (clave === 'codCupo' || clave === 'comercial' || clave === 'tipoTasa') {
                return true; // Excluir estas claves de la validación
            }
            const valor = obj[clave];
            return valor !== "" && valor !== null && valor !== undefined; // Validar que no estén vacíos
        });
    });



    // const navegarNuevoCredito = (i) => {

    //     const filasIncompletas = creditoNuevo.some((fila) => {

    //         const clavesValidas = Object.keys(fila).filter(
    //             (clave) => clave !== 'codCupo' && clave !== 'comercial' && clave !== 'tipoTasa'
    //         );

    //         const valoresValidos = clavesValidas.map((clave) => fila[clave]);


    //         const tieneCamposLlenos = valoresValidos.some(
    //             (valor) => valor !== '' && valor !== null && valor !== undefined
    //         );


    //         const todosCamposCompletos = valoresValidos.every(
    //             (valor) => valor !== '' && valor !== null && valor !== undefined
    //         );

    //         console.log(tieneCamposLlenos)

    //         console.log(valoresValidos)


    //         return tieneCamposLlenos && !todosCamposCompletos;
    //     });


    //     return (!filasIncompletas && creditoNuevo.length > 0);
    // };





    const pathname = usePathname()

    const navegarRuta = (tab) => {

        if(tab.inactiva){
            return
        }

        

        if (tab.tab == 'servicioFinanciero' && tipoConvenio?.convenioRecaudo !== undefined) {

            let validarCompletos = redes?.credibanVp !== '0' || redes?.redebanVp !== '0' || redes?.credibancoVnp !== '0' ||
                redes?.redebanVnp !== '0' || redes?.redebanMicropagos !== '0' || redes?.credibancoVendig !== '0' ||
                redes?.credibancoTrMasivo !== '0'

            if (validarCompletos && redes?.total !== 100 && redes !== undefined) {


                setMessageModal("Debes ajustar la configuración de redes para alcanzar el 100%")
                setMostrarModal(true)
                return

            }


        }

        const rut = tab.href
            


        router.push(rut)


    }

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
    }


    return (
        <div className="flex" >
            {
                Tabs.map(tab => (

                    <button

                        key={tab.name}
                        onClick={() => navegarRuta(tab)}
                        aria-label="navegar a convenio pago"
                        className={`w-[20%] py-2 px-4 text-center text-[15px] text-coomeva_color-grisLetras  mx-2 ${pathname === tab.href || activeTab == tab.href ?  'bg-white border-2 border-b-0' :(tab.tab!='resumen')? 'bg-coomeva_color-grisPestaña2':'bg-coomeva_color-rojo text-white'}  rounded-tr-lg rounded-tl-lg`}
                    >
                        {tab.name}
                    </button>

                ))

            }


            {

                (mostrarModal)
                    ?


                    <DynamicModal titulo={'Notificación'} textBtnContinuar="Ok" ocultarBtnCancelar={true} mostrarImagneFondo={true} mostrarModal={cerrarModal}>
                        <p className="w-full text-sm text-center  text-[#002e49f3] font-semibold">{messageModal}</p>
                    </DynamicModal>
                    :
                    undefined


            }

        </div>
    )
}

export default TabsBar