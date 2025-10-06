'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { loadDraft, saveDraft, clearDraft } from '@/app/lib/utils/draft'
import { CampoLista } from '../../share/CampoLista'
import { useForm } from "@/app/hooks/useForm";
import { CampoTexto } from '../../share/CampoTexto';
import { objectoValidarCampoAdministracion } from '@/app/lib/utils';
import { CampoNumero } from '../../share/CampoNumero';
import { CheckNuevo } from '../../share/CheckNuevo';
import { CampoFecha } from '../../share/CampoFecha';
// import { ButtomValidarCcNit } from '../ButtomValidarCcNit';
import { fn_catalogosParticipantes } from '@/app/lib/apisClientePn/fn_catalogosParticipantes';


export const ResidenciaFiscalPnN = ({ listSituacionImpositiva, listTipoIdFiscal, contextRadClient, listSiNo, listPaises, dataCamposAdministacion, listTipoDocumento, listCiduades, listDepartamentos, listSexo }) => {

    const [activarDatosConyuge, setActivarDatosConyuge] = useState(false)

    const { perfilPn, actualizarPerfilPn, clienteNuevoProspectoActualizar } = contextRadClient();
    const DRAFT_KEY = 'perfilPn';
    const [catalogo, setCatalogo] = useState({});


    //INICIALIZANDO CATALOGOS
    useEffect(() => {

        if (Object.keys(catalogo).length === 0) {
            try {
                const timeoutCatalogo = setTimeout(async () => {
                    const cat = JSON.parse(await fn_catalogosParticipantes());
                    setCatalogo(cat);
                }, 100);

                return () => clearTimeout(timeoutCatalogo);

            } catch (error) {
                console.log(error);
            };
        }

    }, []);


    // 1) Al montar carga draft
    useEffect(() => {
        const draft = loadDraft(DRAFT_KEY);
        if (draft && Array.isArray(draft)) {
            actualizarPerfilPn(draft);
        }
        return () => {
            // si quieres limpiar al salir, descomenta:
            // clearDraft(DRAFT_KEY);
        }
    }, []);


    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        saveDraft(DRAFT_KEY, perfilPn);
    }, [perfilPn]);

    const onChangeInput = (e) => {

        const { name, type, checked, value } = e.target;

        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;

        const keys = name.split(".");

        if (keys[1] == 'datoConyuge') {

            setActivarDatosConyuge(!activarDatosConyuge)
        }


        const updateNestedObject = (obj, keys, value) => {
            const newObj = { ...obj };

            let current = newObj;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }


            current[keys[keys.length - 1]] = value;
            return newObj;
        };

        const updatedPerfilPn = updateNestedObject(perfilPn, keys, inputValue);

        actualizarPerfilPn(updatedPerfilPn);


    }

    return (
        <div className="datosPersonaNatural p-6 container mx-auto">

            <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="font-bold py-3">Información Fiscal </h1>




                    </div>

                </div>

                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                    <div>

                        <CheckNuevo
                            titulo={'¿Declara renta en Colombia?'}
                            subtitulo={'Indique si es declarante de renta en Colombia'}
                            valorInput={perfilPn?.informacionFiscal?.declaraRentaColombia}
                            nameInput={'informacionFiscal.declaraRentaColombia'}
                            onChangeInput={onChangeInput}

                        />

                    </div>  <div>

                        <CheckNuevo
                            titulo={'FATCA'}
                            subtitulo={'Foreign Account Tax Compliance Act'}
                            valorInput={perfilPn?.informacionFiscal?.FATCA}
                            nameInput={'informacionFiscal.FATCA'}
                            onChangeInput={onChangeInput}
                        />

                    </div>  <div>

                        <CheckNuevo
                            titulo={'CRS'}
                            subtitulo={'Common Reporting Standard'}
                            valorInput={perfilPn?.informacionFiscal?.CRS}
                            nameInput={'informacionFiscal.CRS'}
                            onChangeInput={onChangeInput}
                        />

                    </div>
                    <div>
                        <CampoLista
                            valorInput={perfilPn?.informacionFiscal?.situacionImpositiva}
                            onChangeInput={onChangeInput}
                            nameInput="informacionFiscal.situacionImpositiva"
                            placeholder="Situacion Impositiva"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '223',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listSituacionImpositiva}
                            idLista="code"
                            descripcionList="value"

                        />
                    </div>
                </div>

                <h3 className="font-bold py-3 mt-2">País de Residencia Fiscal</h3>
                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `} >
                    <div >


                        <CampoLista
                            placeholder='País de la residencia fiscal'
                            valorInput={perfilPn?.informacionFiscal?.paisResidenciaFiscal}
                            onChangeInput={onChangeInput}
                            nameInput="informacionFiscal.paisResidenciaFiscal"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '243',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listPaises}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div >

                        <CampoLista
                            placeholder='Tipo de Identificación Tributaria'
                            valorInput={perfilPn?.informacionFiscal?.tipoIdentificacionTributaria}
                            onChangeInput={onChangeInput}
                            nameInput="informacionFiscal.tipoIdentificacionTributaria"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '244',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={catalogo.listTipoIdFiscal}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>
                    <div>

                        <CampoNumero
                            valorInput={perfilPn?.informacionFiscal?.numeroIdentificacionTributaria}
                            onChangeInput={onChangeInput}
                            nameInput="informacionFiscal.numeroIdentificacionTributaria"
                            placeholder="Número de Identificación Tributaria"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '245',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>

                        <CheckNuevo
                            titulo={'Es ciudadano'}
                            subtitulo={'¿Es ciudadano del país de residencia fiscal?'}
                            valorInput={perfilPn?.informacionFiscal?.esCiudadano}
                            nameInput={'informacionFiscal.esCiudadano'}
                            onChangeInput={onChangeInput}

                        />

                    </div>  <div>

                        <CheckNuevo
                            titulo={'Es residente'}
                            subtitulo={'¿Es residente fiscal en el país seleccionado?'}
                            valorInput={perfilPn?.informacionFiscal?.esResidente}
                            nameInput={'informacionFiscal.esResidente'}
                            onChangeInput={onChangeInput}
                        />

                    </div>
                </div>

            </div>

            <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                <div className="flex justify-between items-center">

                    <div className='flex items-center gap-6'>
                        <h1 className="font-bold py-3">Datos del Cónyuge </h1>

                        {/* <div className=" rounded-md flex gap-4 py-2  items-center px-4">
                            <input className="w-4 h-4 " type="checkbox" />
                            <div>
                                <label className="font-bold text-sm">¿Tiene cónyuge?</label>

                            </div>

                        </div> */}

                        <div>

                            <CheckNuevo
                                titulo={'¿Tiene cónyuge?'}
                                // subtitulo={'¿Tiene cónyuge?'}
                                name={'informacionFiscal.datoConyuge'}


                                border={false}
                                valorInput={perfilPn?.informacionFiscal?.datoConyuge}
                                nameInput={'informacionFiscal.datoConyuge'}
                                onChangeInput={onChangeInput}
                            />

                        </div>

                    </div>



                </div>
                {
                    activarDatosConyuge ?
                        <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>
                            <div >
                                <CampoLista
                                    valorInput={perfilPn?.datosConyuge?.tipoidentificacion}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.tipoidentificacion"
                                    placeholder="Tipo Documento"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '223',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                        validacionAdicional: true
                                    }))}
                                    lista={catalogo.listTipoDocumento}
                                    idLista={'code'}
                                    descripcionList={'value'}
                                />
                            </div>
                            <div  >

                                <CampoTexto
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '224',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                        validacionAdicional: true
                                    }))}
                                    valorInput={perfilPn?.datosConyuge?.numeroIdentificacion}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.numeroIdentificacion"
                                    placeholder="Número de Identificación"

                                />

                            </div>
                            <div >

                                <CampoTexto
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '217',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={perfilPn?.datosConyuge?.primerNombre}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.primerNombre"
                                    placeholder="Primer Nombre"

                                />
                            </div>

                            <div >
                                <CampoTexto
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '218',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={perfilPn?.datosConyuge?.segundoNombre}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.segundoNombre"
                                    placeholder="Segundo Nombre"

                                />
                            </div>

                            <div >

                                <CampoTexto
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '219',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={perfilPn?.datosConyuge?.primerApellido}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.primerApellido"
                                    placeholder="Primer Apellido"

                                />
                            </div>

                            <div >

                                <CampoTexto
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '220',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={perfilPn?.datosConyuge?.primerApellido}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.primerApellido"
                                    placeholder="Segundo Apellido"

                                />
                            </div>


                            <div >
                                <div className="">
                                    <CampoFecha
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '226',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={perfilPn?.datosConyuge?.fechaExpedicionDocumento}
                                        onChangeInput={onChangeInput}
                                        nameInput="datosConyuge.fechaExpedicionDocumento"
                                        placeholder="Fecha de expedición documento"


                                    />
                                </div>
                            </div>

                            <div>
                                <CampoLista
                                    valorInput={perfilPn?.datosConyuge?.paisNacimiento}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.paisNacimiento"
                                    placeholder=" Pais de Nacimiento"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '221',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listPaises}
                                    idLista="code"
                                    descripcionList="value"

                                />
                            </div>

                            <div>

                                <CampoLista
                                    valorInput={perfilPn?.datosConyuge?.ciudadNacimiento}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.ciudadNacimiento"
                                    placeholder=" Ciudad de Nacimiento"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '222',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listCiduades}
                                    idLista="code"
                                    descripcionList="value"

                                />
                            </div>
                            <div>

                                <CampoLista
                                    valorInput={perfilPn?.datosConyuge?.provinciaNacimiento}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.provinciaNacimiento"
                                    placeholder="Departameto de Expedición"

                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '223',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listDepartemento}
                                    idLista="code"
                                    descripcionList="value"

                                />
                            </div>


                            <div className="">
                                <CampoFecha
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '225',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}

                                    placeholder="Fecha de Nacimiento"
                                    valorInput={perfilPn?.datosConyuge?.fechaNacimiento}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.fechaNacimiento"

                                />
                            </div>

                            <div >
                                <CampoLista
                                    valorInput={perfilPn?.datosConyuge?.sexo}
                                    onChangeInput={onChangeInput}
                                    nameInput="datosConyuge.sexo"
                                    placeholder="Sexo"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '232',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    lista={catalogo.listSexo}
                                    idLista="code"
                                    descripcionList="value"
                                />
                            </div>
                        </div>
                        :
                        undefined
                }

            </div>


            {/* <form className="grid grid-cols-4 gap-x-6 gap-y-4 ">
                <div className='grid grid-cols-2 gap-x-4 col-span-4'>
                    <div className='relative -top-2'>

                        <CampoLista
                            placeholder='¿Tiene residencia fiscal en Colombia?'
                            valorInput={residenciaFiscalPn.residenciaFiscalColombia}
                            onChangeInput={onChangeInput}
                            nameInput="residenciaFiscalColombia"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '240',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={listSiNo}
                            idLista="codLista"
                            descripcionList="descripcion"
                        />
                    </div>
                    <div className='relative -top-2'>

                        <CampoLista
                            placeholder='¿Tiene residencia fiscal en Estados Unidos?'
                            valorInput={residenciaFiscalPn.residenciaFiscalEEUU}
                            onChangeInput={onChangeInput}
                            nameInput="residenciaFiscalEEUU"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '241',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={listSiNo}
                            idLista="codLista"
                            descripcionList="descripcion"
                        />
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    <div className='col-span-2'>

                        <CampoLista
                            placeholder='¿Tiene residencia fiscal en algún país diferente a Colombia, Estados Unidos y/o paises asociados?'
                            valorInput={residenciaFiscalPn.residenciFiscalOtroPais}
                            onChangeInput={onChangeInput}
                            nameInput="residenciFiscalOtroPais"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '242',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={listSiNo}
                            idLista="codLista"
                            descripcionList="descripcion"
                        />
                    </div>

                </div>
                <div className='grid grid-cols-2 gap-x-4 col-span-4'>

                </div>
            </form> */

                //   <ButtomValidarCcNit/>
            }
        </div>
    )
}