'use client'

import { descripcionTipoCliente, paginasCliente } from '@/app/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdInfo } from 'react-icons/md';
import dynamic from "next/dynamic";


const DynamicModal = dynamic(() => import('./Modals'));


export const ButtomUsuarioProspetcto = ({ contextRadClient, campoValidarAdministracion }) => {


    // console.log(campoValidarAdministracion)

    const pathNname = usePathname();
    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const { perfilPj, perfilPn, cambioTipoCliente, actualizarBtnSolicitud, actualizarCambioTipoCliente,
        actualizarTipoPersona, actualizarPerfilPj, crearClienteNuevoProspectoActualizar, tipoPersona,
        clienteNuevoProspectoActualizar, paginasPendientePorValidar, actualizarpaginasPendientePorValidar
    } = contextRadClient();


    const [listaSinValidar, setListaSinValidar] = useState([]);

    const valiacionFormulario = (formId) => {

        if (formId) {

            if ((!formId.checkValidity())) {

                // formId.reportValidity()
                //   formId2.reportValidity()

                return false
            }
        }

        return true
    };


    useEffect(() => {
        if (clienteNuevoProspectoActualizar == 4) {

            const paginaActual = pathNname.split('/')[3]

            const formId = document.getElementById(paginaActual)


            if (valiacionFormulario(formId)) {

                const paginaValida = listaSinValidar.filter(
                    pagina => pagina == paginasCliente[paginaActual]
                );


                actualizarpaginasPendientePorValidar([...paginasPendientePorValidar, paginaValida])


                if ((paginasPendientePorValidar.filter(item => item !== paginasCliente[paginaActual])).length > 0) {


                    // setMessageAlert(`La página actual es válida, pero faltan por validar: ${paginasPendientePorValidar.filter(item => item !==  paginasCliente[paginaActual]).join(', ')}`)

                    // setShowModal(true)
                } else {
                    actualizarBtnSolicitud(true)
                }


            }

        }

    }, [perfilPj, perfilPn]);


    useEffect(() => {

        const paginasObligatorias = [
            ...new Set(
                campoValidarAdministracion?.filter(campo => campo.nCliObligatorio === 1)
                    .map(campo => campo.nombre)
            )
        ]

        const campoObligatoriosParaSerCliente = [
            campoValidarAdministracion?.filter(campo => campo.creaObligatorio === 1 && campo.TIPOCLI == "Pj")
        ]




        // console.log('esta pagian validar con el botom')
        // console.log(campoObligatoriosParaSerCliente)



        const paginasSinValidar = paginasObligatorias?.filter(
            pagina => !paginasPendientePorValidar.includes(pagina)
        );

        // console.log(paginasObligatorias)


        setListaSinValidar(paginasSinValidar);

    }, [])




    // console.log('perfil')

    // console.log(perfilPj)

    const endModal = () => {

        setShowModal(false)

    };

    const continaur = () => {

        crearClienteNuevoProspectoActualizar(1)

        actualizarPerfilPj({ ...perfilPj, tipopersona: '10' })

        actualizarTipoPersona(10)

        actualizarCambioTipoCliente(true)


        setShowModal(false)


    };

    const onClickButtonProspecto = (e) => {
        e.preventDefault()
        //console.log('####', 'click suspendido');
        /* setMessageAlert('¿Desea crearlo como cliente?')
        setShowModal(true)
        actualizarCambioTipoCliente(false) */
    };


    //console.log(perfilPj)

    return (
        <>
            {
                (tipoPersona == '20' ||
                    tipoPersona == '10' ||
                    tipoPersona == '30' ||
                    clienteNuevoProspectoActualizar == '2' ||
                    clienteNuevoProspectoActualizar == '1' ||
                    clienteNuevoProspectoActualizar == '4' ||
                    perfilPj?.reference?.codStatusCliente == 'P' || perfilPj?.reference?.codStatusCliente == 'A'
                ) ?
                    <button
                        onClick={(e) => onClickButtonProspecto(e)}
                        //onClick={tipoPersona == 20 || tipoPersona == 30 ? onClickButtonProspecto : (e) => {  }}
                        title={`${tipoPersona == 20 || tipoPersona == 30 ? `Pulsa para convertir ${descripcionTipoCliente[tipoPersona || clienteNuevoProspectoActualizar]} a Cliente` : ''}`}
                        className={`border w-72 ${tipoPersona == 20 || tipoPersona == 30 ? 'bg-coomeva_color-rojo  text-white' : 'cursor-default'} border-coomeva_color-rojo  text-coomeva_color-rojo py-1 px-4 rounded-xl flex items-center space-x-4`}>
                        <div className="flex items-center justify-center bg-coomeva_color-rojo text-white h-12 w-12 rounded-full" >
                            <MdInfo className="h-12 w-12" />
                        </div>
                        <h1 className="font-bold">{(perfilPj?.reference?.statusCliente != '' && perfilPj?.reference?.statusCliente != undefined) ? perfilPj?.reference?.statusCliente : descripcionTipoCliente[clienteNuevoProspectoActualizar || tipoPersona]}</h1>

                    </button>
                    :
                    undefined

            }
            {
                (showModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={continaur} cerrarModal={endModal} textBtnContinuar="Aceptar" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            }

        </>

    )
}
