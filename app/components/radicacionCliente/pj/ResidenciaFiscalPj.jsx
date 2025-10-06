'use client'
import React, { useEffect } from 'react'
import { loadDraft, saveDraft, clearDraft } from '@/app/lib/utils/draftStorage'
import { useState } from 'react'
import { CampoLista } from '../../share/CampoLista'
import { useForm } from "@/app/hooks/useForm";
import { CampoTexto } from '../../share/CampoTexto';
import { CampoNumero } from '../../share/CampoNumero';
import { objectoValidarCampoAdministracion } from '@/app/lib/utils';


export const ResidenciaFiscalPj = ({ contextRadClient, listPaises, listSiNo, dataCamposAdministacion }) => {

    const { residenciaFiscalPj, clienteNuevoProspectoActualizar,actualizarResidenciaFiscalPj } = contextRadClient()

    const DRAFT_KEY = 'residenciaFiscalPj';

    // 1) Al montar carga draft
    useEffect(() => {
        const draft = loadDraft(DRAFT_KEY);
        if (draft && Array.isArray(draft)) {
            actualizarResidenciaFiscalPj(draft);
        }
        return () => {
            // si quieres limpiar al salir, descomenta:
            // clearDraft(DRAFT_KEY);
        }
    }, []);

    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        saveDraft(DRAFT_KEY, residenciaFiscalPj);
    }, [residenciaFiscalPj]);

    let deshabilitar = clienteNuevoProspectoActualizar != '1' && clienteNuevoProspectoActualizar != '2' && clienteNuevoProspectoActualizar != '3'

    const [isResidenciaFiscalEnabled, setIsResidenciaFiscalEnabled] = useState(false);

    const { formState, onInputChange, onResetForm, setFormState } = useForm({

        codClienteJuridico: '',
        personaEEUU: '',
        personaEspecíficaEEUU: '',
        idTributarioEEUU: '',
        opcionesLista: '',
        clasificacionFATCA: '',
        numeroGIIN: '',
        tieneRecidenciaFiscal: '',
        paisRecidenciaFiscal: '',
        tipoIdentificaciónTributaria: '',
        numeroIdentificacionTributaria: ''

    });

    useEffect(() => {
        setFormState(residenciaFiscalPj)
    }, [residenciaFiscalPj]);

    const handleResidenciaFiscalChange = (event) => {

        const { value } = event.target;

        onInputChange(event);

        setIsResidenciaFiscalEnabled(value === 'SIresifiscalotropais');

    }

    const onChangeInput = (e) => {

        const { name, value } = e.target

        const dataResidenciaFiscalPj = { ...residenciaFiscalPj, [name]: value };

        actualizarResidenciaFiscalPj(dataResidenciaFiscalPj)

    }


    return (
        <div className="datosPersonaNatural  container mx-auto">
            <form className="grid grid-cols-4 gap-x-6 gap-y-4 ">
                <div className='grid grid-cols-2 gap-x-4 col-span-4'>
                    <div className=''>

                        <CampoLista
                            valorInput={residenciaFiscalPj.personaEEUU}
                            onChangeInput={onChangeInput}
                            nameInput="personaEEUU"
                            requerido={true}
                            lista={listSiNo}
                            idLista="codLista"
                            descripcionList="descripcion"
                            placeholder='1.¿Es su Entidad una Persona de EE.UU.?'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '1',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}

                        />
                    </div>
                    <div className=''>

                        <CampoLista
                            valorInput={residenciaFiscalPj.personaEspecíficaEEUU}
                            onChangeInput={onChangeInput}
                            nameInput="personaEspecíficaEEUU"
                            requerido={true}
                            lista={listSiNo}
                            idLista="codLista"
                            descripcionList="descripcion"
                            placeholder='2.¿Es la Entidad una Persona Específica de EE.UU.?'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '1',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-x-4 col-span-4'>
                    <div>

                        <CampoNumero
                            valorInput={residenciaFiscalPj.idTributarioEEUU}
                            onChangeInput={onChangeInput}
                            nameInput="idTributarioEEUU"
                            placeholder='3.Indique su Número TIN/EIN (No. de ID Tributario en EE.UU)'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '1',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>

                        <div className=''>
                            <CampoLista
                                valorInput={residenciaFiscalPj.opcionesLista}
                                onChangeInput={onChangeInput}
                                nameInput="opcionesLista"
                                requerido={true}
                                lista={[{ id: 'SITENGO', descripcion: 'Opcion 1' }, { id: 'NOTENGO', descripcion: 'Opcion 2' }, { id: 'Prueba', descripcion: 'Opcion 3' }]}
                                idLista="id"
                                descripcionList="descripcion"
                                placeholder='4.Seleccione Una de las Siguientes Opciones Que se Listan a Continuación'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '1',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-x-4 col-span-4'>
                    <div>

                        <div>
                            <CampoLista
                                valorInput={residenciaFiscalPj.clasificacionFATCA}
                                onChangeInput={onChangeInput}
                                nameInput="clasificacionFATCA"
                                requerido={true}
                                lista={[{ id: 'Prueba', descripcion: 'Clasificacion 1' }, { id: 'CLASI2', descripcion: 'Clasificacion 2' }, { id: 'CLASI3', descripcion: 'Clasificacion 3' }]}
                                idLista="id"
                                descripcionList="descripcion"
                                placeholder='5.Seleccione Una de las Opciones de la Clasificación de Entidades Según FATCA'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '1',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                    <div>

                        <div>
                            <CampoLista
                                valorInput={residenciaFiscalPj.numeroGIIN}
                                onChangeInput={onChangeInput}
                                nameInput="numeroGIIN"
                                requerido={true}
                                lista={listSiNo}
                                idLista="codLista"
                                descripcionList="descripcion"
                                placeholder='6.La Entidad como Institución Financiera Tiene un Número GIIN'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '1',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                            {/* <CampoNumero
                                valorInput={residenciaFiscalPj.numeroGIIN}
                                onChangeInput={onChangeInput}
                                nameInput="numeroGIIN"
                                placeholder='6.La Entidad como Institución Financiera Tiene un Número GIIN'
                               validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '1',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-x-4 col-span-4  justify-center items-center'>
                    <div className='mt-6'>

                        <div>
                            <CampoLista
                                valorInput={residenciaFiscalPj.tieneRecidenciaFiscal}
                                onChangeInput={onChangeInput}
                                nameInput="tieneRecidenciaFiscal"
                                requerido={true}
                                lista={listSiNo}
                                idLista="codLista"
                                descripcionList="descripcion"
                                placeholder='7.¿Tiene residencia fiscal en algún país?'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '1',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                    <div className='mt-6'>

                        <div>
                            <CampoLista
                                valorInput={residenciaFiscalPj.paisRecidenciaFiscal}
                                onChangeInput={onChangeInput}
                                nameInput="paisRecidenciaFiscal"
                                placeholder='País de la residencia fiscal'
                                requerido={true}
                                lista={listPaises}
                                idLista="codPais"
                                descripcionList="descripcion"

                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '1',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: residenciaFiscalPj.tieneRecidenciaFiscal!='1'
                                }))}

                            />
                        </div>
                    </div>
                    <div>
                        <p className="mb-1">*Si la respuesta es afirmativa</p>
                        <div className=''>
                            <CampoTexto
                                valorInput={residenciaFiscalPj.tipoIdentificacionTributaria}
                                onChangeInput={onChangeInput}
                                nameInput="tipoIdentificacionTributaria"
                                placeholder='-Tipo de identificación tributaria'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '1',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: residenciaFiscalPj.tieneRecidenciaFiscal!='1'
                                }))}

                            />
                        </div>
                    </div>
                    <div className='mt-6'>

                        <div className=''>
                            <CampoNumero
                                valorInput={residenciaFiscalPj.numeroIdentificacionTributaria}
                                onChangeInput={onChangeInput}
                                nameInput="numeroIdentificacionTributaria"
                                placeholder='-Número de Identificación tributaria'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '1',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: residenciaFiscalPj.tieneRecidenciaFiscal!='1'
                                }))}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}