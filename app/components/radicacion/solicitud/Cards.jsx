'use client'


import { useSolicitud } from "@/app/hooks/useSolicitud"
import BtnControl from "../cliente/BtnControl"
import TipoConvenioServicio from "./TipoConvenioServicio"
import TipoOperacion from "./TipoOperacion"
import TipoProducto from "./TipoProducto"
import { TipoProductoSubtitulo } from "./TipoProductoSubtitulo"
import { useEffect, useState } from "react"


export default function Cards({ listRiesgo, listProducto, listTypeConvenios, rolActivo }) {

    const { context, convenio, enableButton, habilitarInput, onChangeSave, frmForm, solicitud } = useSolicitud(rolActivo)


    const [riesgo, setRiesgo] = useState(listRiesgo);
    const [producto, setProducto] = useState(listProducto);
    const [convenios, setConvenios] = useState(listTypeConvenios);
    const [habilitarBton, setHabilitarBton] = useState(false)

    useEffect(() => {

        const riesgoValido = riesgo.some(item => item.ISCHECKED);
        const productoValido = producto.some(item => item.ISCHECKED);
        const conveniosValido = convenios.some(item => item.ISCHECKED);

        setHabilitarBton (riesgoValido && productoValido && conveniosValido);

    }, [riesgo,producto,convenios])






    return (
        <>
            <form ref={frmForm} className="w-full " >
                <div className="flex">
                    <div className=' h-auto px-2 py-1  '>
                        <TipoProductoSubtitulo
                            titulo="Evaluación de riesgo "
                            subtitulo="Seleccione el nivel de riesgo según la consulta en la herramienta externa Taylor"

                            listTypeProducts={riesgo}
                            solicitud={solicitud}
                            deshabilitar={habilitarInput}
                            setListTypeProducts={setRiesgo}
                        />
                    </div>

                    <div className='  px-2 py-1'>
                        <TipoProductoSubtitulo
                            titulo="Tipo de operación "
                            subtitulo="."

                            listTypeProducts={producto}
                            solicitud={solicitud}
                            deshabilitarInput={habilitarInput}
                            setListTypeProducts={setProducto}
                            width={2}

                        />
                    </div>
                </div>

                <div className='  px-2 py-1 w-64'>
                    <TipoProductoSubtitulo
                        titulo="Selección de producto "
                        subtitulo="Seleccione los productos que desea crear"

                        listTypeProducts={convenios}
                        solicitud={solicitud}
                        deshabilitarInput={habilitarInput}
                        setListTypeProducts={setConvenios}
                        seccionSubtitulo={true}


                    />

                </div>


                <div className="px-2 py-1">
                    <div>
                        <h2 className="font-bold">Mensaje</h2>
                        <p>Agregar observaciones adicionales sobre la operación (máximo 300 caracteres) </p>
                    </div>
                    <textarea

                        defaultValue={''}
                        cols={10}
                        rows={5}
                        // onInvalid={(e) => e.target.setCustomValidity('Campo obligatorio.')}

                        maxLength={300}
                        className='rounded-md font-semibold mt-4 w-full bg-white outline-none border shadow-sm p-2 text-sm text-coomeva_color-azulOscuro '
                    // onChange={onChangeTextArea}

                    // required

                    >
                    </textarea>
                </div>

            </form>
            <section className='w-full flex flex-row justify-end'>
                <BtnControl
                    // name={'Configurar'}
                    name={'Menú producto'}
                    url=
                    {
                        '/radicacion/convenioServicios/creditoNuevo'
                        // convenio.tipoProducto?.credito
                        //     ? '/radicacion/convenioServicios/creditoNuevo'
                        //     : convenio.tipoConvenio['convenioPago']
                        //         ? '/radicacion/convenioServicios'
                        //         : convenio.tipoConvenio['convenioRecaudo']
                        //             ? '/radicacion/convenioServicios/convenioRecaudo'
                        //             : '/radicacion/convenioServicios/servicioFinanciero'

                    }
                    enableButton={habilitarBton }
                    data={convenio}
                    nameFuctionContext={'updateDataSolciitud'}
                    context={context}
                    opcion={'navegarActualizarContext'}
                />

            </section>
        </>
    )
}
