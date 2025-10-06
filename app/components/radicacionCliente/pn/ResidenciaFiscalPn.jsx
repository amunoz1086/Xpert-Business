'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { loadDraft, saveDraft } from '@/app/lib/utils/draft'
import { CampoLista } from '../../share/CampoLista'
import { useForm } from "@/app/hooks/useForm";
import { CampoTexto } from '../../share/CampoTexto';
import { objectoValidarCampoAdministracion } from '@/app/lib/utils';
import { CampoNumero } from '../../share/CampoNumero';


export const ResidenciaFiscalPn = ({ contextRadClient, listSiNo, listPaises, dataCamposAdministacion }) => {

    const { residenciaFiscalPn, actualizarResidenciaFiscalPn, clienteNuevoProspectoActualizar } = contextRadClient()

    const DRAFT_KEY = 'residenciaFiscalPn';

    // 1) Al montar carga draft
    useEffect(() => {
        const draft = loadDraft(DRAFT_KEY);
        if (draft && Array.isArray(draft)) {
            actualizarResidenciaFiscalPn(draft);
        }
        return () => {
            // si quieres limpiar al salir, descomenta:
            // clearDraft(DRAFT_KEY);
        }
    }, []);

    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        saveDraft(DRAFT_KEY, residenciaFiscalPn);
    }, [residenciaFiscalPn]);

    // let deshabilitar = clienteNuevoProspectoActualizar!='1'&&clienteNuevoProspectoActualizar!='2'&&clienteNuevoProspectoActualizar!='3'

    const onChangeInput = (e) => {

        const { name, value } = e.target

        const updatedResidenciaFiscal = { ...residenciaFiscalPn, [name]: value };

        actualizarResidenciaFiscalPn(updatedResidenciaFiscal)

    }


    return (
        <div className="datosPersonaNatural p-6 container mx-auto">
            <form className="grid grid-cols-4 gap-x-6 gap-y-4 ">
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
                    <div >

                        <CampoLista
                            placeholder='País de la residencia fiscal'
                            valorInput={residenciaFiscalPn.paisResidenciaFiscal}
                            onChangeInput={onChangeInput}
                            nameInput="paisResidenciaFiscal"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '243',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={listPaises}
                            idLista="codPais"
                            descripcionList="descripcion"
                        />
                    </div>
                    <div >

                        <CampoLista
                            placeholder='Tipo de Identificación tributaria'
                            valorInput={residenciaFiscalPn.tipoIdentificacionTributaria}
                            onChangeInput={onChangeInput}
                            nameInput="tipoIdentificacionTributaria"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '244',
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
                    <div>

                        <CampoNumero
                            valorInput={residenciaFiscalPn.numeroIdentificacionTributaria}
                            onChangeInput={onChangeInput}
                            nameInput="numeroIdentificacionTributaria"
                            placeholder="Número de Identificación tributaria"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '245',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}