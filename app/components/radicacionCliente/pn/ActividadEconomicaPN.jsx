'use client'
import React, { useEffect } from 'react'
import { loadDraft, saveDraft, clearDraft } from '@/app/lib/utils/draft'
import { useState } from 'react'
import { CampoLista } from '../../share/CampoLista'
//import { useForm } from "@/app/hooks/useForm";
import { CampoTexto } from '../../share/CampoTexto';
import { CampoTelefono } from '../../share/CampoTelefono';
import { CampoNumeroParseoMil } from '../../share/CampoNumeroParseoMil';
import { CampoMoneda } from '../../share/CampoMoneda';
import { objectoValidarCampoAdministracion } from '@/app/lib/utils';

export const ActividadEconomicaPn = ({ listIniAA, listaPeriodos, listaTipoBalance, listIniMes, contextRadClient, listDepartamentos, listCiduades, listDirecciones, listaCIIU, listPrefijos, dataCamposAdministacion }) => {

    const { clienteNuevoProspectoActualizar, activadEconomicaPn, actualizarActiviadEconomicaPn, detalleActivadEconomicaPn, actualizarDetalleActiviadEconomicaPn } = contextRadClient()

    const DRAFT_KEY = 'activadEconomicaPn';
    
        // 1) Al montar carga draft
        useEffect(() => {
            const draft = loadDraft(DRAFT_KEY);
            if (draft && Array.isArray(draft)) {
                actualizarActiviadEconomicaPn(draft);
            }
            return () => {
                // si quieres limpiar al salir, descomenta:
                // clearDraft(DRAFT_KEY);
            }
        }, []);
    
        // 2) Cada vez que cambian los contactos, persiste draft
        useEffect(() => {
            saveDraft(DRAFT_KEY, activadEconomicaPn);
        }, [activadEconomicaPn]);

    const [elementoActivo, setElementoActivo] = useState(0);

    const onChangeInputActividadEconomica = (e) => {

        let { name, value } = e.target

        if (name == 'campoFechadeCorte' && detalleActivadEconomicaPn.length > 0) {
            value = detalleActivadEconomicaPn?.findIndex((a) => a.FechaCorte == value)
        }

        const actividadEconomica = { ...activadEconomicaPn, [name]: value };

        actualizarActiviadEconomicaPn(actividadEconomica)

    }

    const onChangeInputActividadEconomicaDetalle = (e) => {

        const { value, name } = e.target


        const [nameCampo, index] = name.split('-');


        if (nameCampo === "FechaCorte" && clienteNuevoProspectoActualizar != '1' && clienteNuevoProspectoActualizar != '2') {

            const pos = detalleActivadEconomicaPn.findIndex(item => item.FechaCorte === value);

            setElementoActivo(Number(pos));
            return
        }



        const detalleEconomico = [...detalleActivadEconomicaPn];

        detalleEconomico[index] = {
            ...detalleEconomico[index],
            [nameCampo]: value,
        };

        actualizarDetalleActiviadEconomicaPn(detalleEconomico)

    }
    

    return (
        <div className="datosPersonaNatural p-6 container mx-auto">
            <form id='actividadEconomicaPn' className="grid grid-cols-4 gap-x-6 gap-y-4">
                <div className='grid grid-cols-4 gap-x-5 col-span-4'>
                    <div className='relative -top-2'>

                        <CampoTexto
                            valorInput={activadEconomicaPn.profesion}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="profesion"
                            placeholder="Profesión"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '193',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div className='relative -top-2'>

                        <CampoTexto
                            valorInput={activadEconomicaPn.ocupacion}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="ocupacion"
                            placeholder="Ocupación"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '194',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div className='relative -top-2 col-span-2'>

                        <CampoTexto
                            valorInput={activadEconomicaPn.nombreEstablecimiento}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="nombreEstablecimiento"
                            placeholder="Nombre del establecimiento"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '195',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-x-5 col-span-4'>
                    <div>
                        <CampoLista
                            valorInput={activadEconomicaPn.departamentoEstablecimiento}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="departamentoEstablecimiento"
                            placeholder='Departamento Establecimiento'
                            lista={listDepartamentos}
                            idLista='codDepto'
                            descripcionList='descripcion'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '193',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div >

                        <CampoLista
                            valorInput={activadEconomicaPn.ciudadEstablecimiento}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="ciudadEstablecimiento"
                            placeholder='Ciudad Establecimiento'
                            lista={listCiduades}
                            idLista='codCiudad'
                            descripcionList='descripcion'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '197',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div >

                        <CampoLista
                            valorInput={activadEconomicaPn.codPrefijoTelefonico}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="codPrefijoTelefonico"
                            placeholder='Prefijo'
                            lista={listPrefijos}
                            idLista='codListPrefijoPais'
                            descripcionList='codListPrefijoPais'


                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '198',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div >

                        <CampoTelefono
                            valorInput={activadEconomicaPn.telefono}
                            onChangeInput={onChangeInputActividadEconomica}
                            placeholder="Teléfono"
                            nameInput="telefono"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '199',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-5 gap-x-4 col-span-4'>
                    <div>

                        <div className=''>
                            <CampoLista
                                valorInput={activadEconomicaPn.codDireccion}
                                onChangeInput={onChangeInputActividadEconomica}
                                nameInput="codDireccion"
                                placeholder='Direccón Establecimiento'

                                lista={listDirecciones}
                                idLista="codListDirecc"
                                descripcionList="descripcion"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '196',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                    <div>

                        <CampoTexto
                            valorInput={activadEconomicaPn.viaPrincipal}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="viaPrincipal"
                            placeholder="Vía Principal"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '193',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>

                        <CampoTexto
                            valorInput={activadEconomicaPn.viaSecundaria}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="viaSecundaria"
                            placeholder="Vía Secundaria"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '193',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoNumeroParseoMil
                            valorInput={activadEconomicaPn.numeroInmueble}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="numeroInmueble"
                            placeholder='Número'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '193',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoTexto
                            valorInput={activadEconomicaPn.referenciaUbicacion}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="referenciaUbicacion"
                            placeholder="Referencia Ubicación"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '193',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    <div>

                        <div className=''>
                            <CampoLista
                                valorInput={activadEconomicaPn.CIIU}
                                onChangeInput={onChangeInputActividadEconomica}
                                nameInput="CIIU"
                                placeholder='Código CIIU'

                                lista={listaCIIU}
                                idLista='CIIU'
                                descripcionList='CIIUDescripcion'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '200',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                    <div>

                        <div className=''>
                            <CampoLista
                                valorInput={activadEconomicaPn.inicioActividadAño}
                                onChangeInput={onChangeInputActividadEconomica}
                                nameInput="inicioActividadAño"
                                placeholder='Fecha Inicio Actividad'

                                lista={listIniAA}
                                idLista='codIniActAño'
                                descripcionList='descripcion'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '201',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                    <div>

                        <div className=''>
                            <CampoLista
                                valorInput={activadEconomicaPn.inicioActividadMes}
                                onChangeInput={onChangeInputActividadEconomica}
                                nameInput="inicioActividadMes"
                                placeholder='Fecha Inicio Actividad Mes'

                                lista={listIniMes}
                                idLista='codIniActMes'
                                descripcionList='descripcion'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '193',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                    <div>

                        <div>
                            <CampoTexto
                                valorInput={activadEconomicaPn.cargoActual}
                                onChangeInput={onChangeInputActividadEconomica}
                                nameInput="cargoActual"
                                placeholder="Cargo Actual"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '193',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    <div>

                        <CampoMoneda
                            valorInput={activadEconomicaPn.ventasbrutas}
                            onChangeInput={onChangeInputActividadEconomica}
                            placeholder="Ventas Brutas"
                            nameInput="ventasbrutas"
                            placeholderAux='Ventas Brutas'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '202',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}

                        />
                    </div>
                    <div>

                        <CampoTexto
                            valorInput={activadEconomicaPn.fuentePrincipalIngreso}
                            onChangeInput={onChangeInputActividadEconomica}
                            nameInput="fuentePrincipalIngreso"
                            placeholder="Fuente Principal de ingresos"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '203',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>


                </div>
                {

                    detalleActivadEconomicaPn.map((item, i) => {

                        return i == elementoActivo &&
                            < >
                                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                                    <div className='col-span-2'>

                                        <CampoTexto
                                            valorInput={item?.claseBalance}
                                            onChangeInput={onChangeInputActividadEconomicaDetalle}
                                            nameInput={"claseBalance-" + i}
                                            placeholder="Clase de balance"
                                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                id: '206',
                                                listaCamposAdministracion: dataCamposAdministacion,
                                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                            }))}
                                        />
                                    </div>
                                    <div className='col-span-2'>

                                        <div>
                                            <CampoLista
                                                valorInput={item?.tipoBalance}
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"tipoBalance-" + i}

                                                lista={listaTipoBalance}
                                                idLista='codTipoBalance'
                                                descripcionList='descripcion'
                                                placeholder='Tipo de balance (depende de lo definido en la planilla)'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '205',
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
                                                placeholder='Fecha de corte (Periodo)'

                                                valorInput={item?.FechaCorte}
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"FechaCorte-" + i}

                                                lista={listaPeriodos}
                                                idLista='idListPeriodos'
                                                descripcionList='Periodos'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '207',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                                    validacionAdicional: false

                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                                    <div>
                                        <div>
                                            <CampoMoneda
                                                valorInput={
                                                    item?.ingresoAnual
                                                }
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"ingresoAnual-" + i}

                                                placeholder='Ingresos Mensuales'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '193',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                                    <div>

                                        <div>
                                            <CampoMoneda
                                                valorInput={item?.ingresoPGJ
                                                }
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"ingresoPGJ-" + i}

                                                placeholder='PGJ/Ingresos'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '208',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                                    <div>

                                        <div>
                                            <CampoMoneda
                                                valorInput={item?.egresoPGJ
                                                }
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"egresoPGJ-" + i}

                                                placeholder='PGJ/Egresos'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '209',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                                    <div>

                                        <div>
                                            <CampoMoneda
                                                valorInput={item?.activosBGJ
                                                }
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"activosBGJ-" + i}

                                                placeholder='BGJ/Activos'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '212',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                                    <div>

                                        <div>
                                            <CampoMoneda
                                                valorInput={item?.activos
                                                }
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"activos-" + i}

                                                placeholder='Activos'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '213',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 gap-x-4 col-span-4'>


                                    <div>
                                        {/* <p className="mb-1"></p> */}
                                        <div>
                                            <CampoMoneda
                                                valorInput={item?.pasivosBGJ
                                                }
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"pasivosBGJ-" + i}

                                                placeholder='BGJ/Pasivos '
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '214',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                                    <div>


                                        <div>
                                            <CampoMoneda
                                                valorInput={
                                                    item?.PatrimonioBGJ
                                                }
                                                onChangeInput={onChangeInputActividadEconomicaDetalle}
                                                nameInput={"PatrimonioBGJ-" + i}

                                                placeholder='BGJ/Patrimonio'
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '215',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </>
                    })
                }



                {/*
                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    <div>
                        <p className="mb-1">Ingresos no operacionales mensuales</p>
                        <div>
                            <CampoMoneda
                                valorInput={activadEconomicaPn.campoIngresosNoOperacionales}
                                onChangeInput={onInputChange}
                                nameInput="campoIngresosNoOperacionales2"

                                placeholder='$'
                            />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    <div>
                        <p className="mb-1">Detalle ingresos no operacionales</p>
                        <div>
                            <CampoMoneda
                                valorInput={activadEconomicaPn.campoDetalleIngresosNoOperacionales}
                                onChangeInput={onInputChange}
                                nameInput="campoBgjPasivosyPatrimonio2"

                                placeholder='$'
                                 validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '193',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                            />
                        </div>
                    </div>
                </div> */}
            </form>
        </div>
    )
}

