'use client'

import { useState } from "react";
import dynamic from 'next/dynamic';

const DynamicModal = dynamic(() => import('../../share/Modals'))
import ListaSelect from "../../share/ListaSelect"


const listLinkPagos = [
    { codLista: '1', descripcion: 'Redeban' },
    { codLista: '0', descripcion: 'Credibanco' }
]

export default function InformacionComercio({ listSiNo, habilitarInput, updateConfiguracion, configuracion }) {

    const infoComercioContext = configuracion['adquirencia']['infoComercio']

    const [showModal, setShowModal] = useState(false);

    const [messageAlert, setMessageAlert] = useState("");

    const handleInputChange = (e) => {

        let { name, value } = e.target


        if (name == 'codListanovedadCuenta' && value == 'Seleccionar') {

            infoComercioContext['codigoUnico'] = ''
            infoComercioContext['codigoUnico1'] = ''
            infoComercioContext['codigoUnico2'] = ''
            infoComercioContext['codigoUnico3'] = ''
            infoComercioContext['codigoUnico4'] = ''
            infoComercioContext['codigoUnico5'] = ''
            infoComercioContext['codigoUnico6'] = ''
            infoComercioContext['codigoUnico7'] = ''
            infoComercioContext['codigoUnico8'] = ''
            infoComercioContext['codigoUnico9'] = ''
            infoComercioContext['codLista.vinculacion'] = ''

        }

        if (name.includes('codigoUnico') && value.length == 11) {

            return

        }

        if (name == 'codListanovedadCuenta' && value == 0) {

            infoComercioContext['codigoUnico'] = ''
            infoComercioContext['codigoUnico1'] = ''
            infoComercioContext['codigoUnico2'] = ''
            infoComercioContext['codigoUnico3'] = ''
            infoComercioContext['codigoUnico4'] = ''
            infoComercioContext['codigoUnico5'] = ''
            infoComercioContext['codigoUnico6'] = ''
            infoComercioContext['codigoUnico7'] = ''
            infoComercioContext['codigoUnico8'] = ''
            infoComercioContext['codigoUnico9'] = ''


        }

        if (name == 'codListanovedadCuenta' && value == 1) {

            infoComercioContext['codLista.vinculacion'] = ''

        }

        infoComercioContext[e.target.id] = e.target.value

        updateConfiguracion('adquirencia', 'infoComercio', infoComercioContext)

    }

    const handleOnBlur = (e) => {

        let { name, value } = e.target

        if (name.includes('codigoUnico') && (value.length != 10 && value.length > 0)) {

            setMessageAlert('El código ingresado debe contener exactamente 10 dígitos. Por favor, verifica e ingresa un valor válido.')
            
            setShowModal(true)

            document.getElementById(name).focus();

        }



    }

    const endModal = () => {
        setShowModal(false);
      };


    return (
        <main className="p-1 w-full  h-full   text-coomeva_color-grisLetras text-sm ">


            <form id="frmComercio">
                <fieldset className=' border bg-white shadow-md rounded-md px-2 pb-2'>
                    <legend className='bg-coomeva_color-grisPestaña2 ml-8 pt-2 py-1 px-2 rounded-t-lg'>
                        <h1 className='text-coomeva_color-rojo text-sm font-bold'>Información del comercio</h1>
                    </legend>
                    {/* <div className='h-8 flex justify-between bg-coomeva_color-grisPestaña2 px-12 items-center'>
                        <p>Horario de servicio</p>
                        <input name='horario' id='horario' className='w-40' type="time"
                            defaultValue={infoComercioContext['horario']}
                            onChange={handleInputChange}
                            disabled={habilitarInput}
                            autoComplete="off"
                        />
                    </div> */}
                    <ListaSelect
                        descripcion={"Horario de servicio"}
                        id={"codLista"}
                        name={"horario"}
                        lista={[, { 'codLista': 1, descripcion: 'Diurno' }, { 'codLista': 2, descripcion: 'Nocturno' }, { 'codLista': 3, descripcion: 'Mixto' }]}
                        color={1}
                        valor={'descripcion'}
                        mostrarLista={true}
                        onchangeSelect={handleInputChange}
                        defaultValue={infoComercioContext['codLista.horario']}
                        inhabilitarSelect={habilitarInput}

                    />
                    <ListaSelect
                        descripcion={"VNP"}
                        id={"codLista"}
                        name={"vnp"}
                        lista={listSiNo}
                        color={1}
                        valor={'descripcion'}
                        mostrarLista={true}
                        onchangeSelect={handleInputChange}
                        defaultValue={infoComercioContext['codLista.vnp']}
                        inhabilitarSelect={habilitarInput}

                    />
                    <ListaSelect
                        descripcion={"VP"}
                        id={"codLista"}
                        name={"vp"}
                        lista={listSiNo}
                        valor={'descripcion'}
                        mostrarLista={true}
                        onchangeSelect={handleInputChange}
                        defaultValue={infoComercioContext['codLista.vp']}
                        inhabilitarSelect={habilitarInput}
                    />
                    <ListaSelect
                        descripcion={"link de Pagos"}
                        id={"codLista"}
                        name={"linkPago"}
                        lista={listLinkPagos}
                        valor={'descripcion'}
                        color={1}
                        mostrarLista={true}
                        onchangeSelect={handleInputChange}
                        defaultValue={infoComercioContext['codLista.linkPago']}
                        inhabilitarSelect={habilitarInput}
                    />
                    <ListaSelect
                        descripcion={"Comercio Pignorado"}
                        id={"codLista"}
                        name={"comercioPignorado"}
                        lista={listSiNo}
                        valor={'descripcion'}
                        mostrarLista={true}
                        onchangeSelect={handleInputChange}
                        defaultValue={infoComercioContext['codLista.comercioPignorado']}
                        inhabilitarSelect={habilitarInput}
                    />
                    <ListaSelect
                        descripcion={"Novedad de cuenta"}
                        id={"codLista"}
                        name={"novedadCuenta"}
                        lista={listSiNo}
                        color={1}
                        valor={'descripcion'}
                        mostrarLista={true}
                        onchangeSelect={handleInputChange}
                        defaultValue={infoComercioContext['codLista.novedadCuenta']}
                        inhabilitarSelect={habilitarInput}
                    />
                    {/* <div className=' flex justify-between bg-coomeva_color-grisPestaña2 px-12 h-8 items-center'>
                        <p className='w-40'>Vinculación</p>


                        <input
                            name='vinculacion'
                            id='vinculacion'
                            className='w-40 outline-none bg-transparent  rounded-md border border-coomeva_color-azulOscuro border-opacity-25   text-center  h-8 text-coomeva_color-azulOscuro'
                            type="text"
                            value={infoComercioContext['vinculacion']}
                            onChange={handleInputChange}
                            disabled={habilitarInput|| infoComercioContext['codLista.novedadCuenta']!=0}
                            autoComplete="off"
                        />
                    </div> */}
                    <ListaSelect
                        descripcion={"Vinculación"}
                        id={"codLista"}
                        name={"vinculacion"}
                        lista={listSiNo}
                        color={1}
                        valor={'descripcion'}
                        mostrarLista={true}
                        onchangeSelect={handleInputChange}
                        defaultValue={infoComercioContext['codLista.vinculacion']}
                        inhabilitarSelect={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 0}
                    />

                    <div className="px-12">
                        <div className="w-full"> <p className='w-40'>Código Único</p></div>

                        <div className='w-full  space-y-2'>

                            <div className="flex w-full">
                                <input
                                    name='codigoUnico'
                                    id='codigoUnico'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                                <input
                                    name='codigoUnico1'
                                    id='codigoUnico1'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico1']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                                <input
                                    name='codigoUnico2'
                                    id='codigoUnico2'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico2']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                                <input
                                    name='codigoUnico3'
                                    id='codigoUnico3'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico3']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                                <input
                                    name='codigoUnico4'
                                    id='codigoUnico4'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico4']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex w-full">
                                <input
                                    name='codigoUnico5'
                                    id='codigoUnico5'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico5']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                                <input
                                    name='codigoUnico6'
                                    id='codigoUnico6'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico6']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                                <input
                                    name='codigoUnico7'
                                    id='codigoUnico7'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico7']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                                <input
                                    name='codigoUnico8'
                                    id='codigoUnico8'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico8']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                                <input
                                    name='codigoUnico9'
                                    id='codigoUnico9'
                                    className='w-40 outline-none  bg-white  rounded-md border border-coomeva_color-azulOscuro border-opacity-25  text-center  h-8 text-coomeva_color-azulOscuro'
                                    type="text"
                                    value={infoComercioContext['codigoUnico9']}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur}
                                    disabled={habilitarInput || infoComercioContext['codLista.novedadCuenta'] != 1}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>

                </fieldset>
            </form>

            {
                (showModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            }
        </main>
    )
}


