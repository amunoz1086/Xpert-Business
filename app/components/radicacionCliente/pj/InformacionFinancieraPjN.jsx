'use client'
import React, { useState, useEffect } from 'react';
import { loadDraft, saveDraft, clearDraft } from '@/app/lib/utils/draft'
import { CampoLista } from '../../share/CampoLista';
import { formatearPesosColombianos, objectoValidarCampoAdministracion } from '@/app/lib/utils';
//import ComplementoDetalle from '../../share/ComplementoDetalle';
//import { CampoMonedaDecimalInfoFinan } from '../../share/CampoMonedaDecimalInfoFinan';
//import { ButtomAgregarItem } from '../../share/ButtomAgregarItem';
import { ButtomGuardarRadicacionCleinte } from '../../share/ButtomGuardarRadicacionCleinte';
//import { insertAccionistasPj, insertAccionistasPn, insertBeneficiariosPJ, insertBeneficiariosPn, insertClienteJuridico, insertContactosAutorizados, insertControlantes, insertDatosImpositivos, insertDirecciones, insertInformacionFinanciera, insertJuntaDirectivaPj, insertJuntaDirectivaPn, insertRecidenciaFiscal, insertRepresentanteLegal } from '@/app/lib/apisClientePj/actionsInsert';
//import { updateAccionistasPj, updateAccionistasPn, updateBeneficiariosPJ, updateBeneficiariosPn, updateClienteJuridico, updateContactosAutorizados, updateControlantes, updateDatosImpositivos, updateDirecciones, updateInformacionFinanciera, updateJuntaDirectivaPj, updateJuntaDirectivaPn, updateRecidenciaFiscal, updateRepresentanteLegal } from '@/app/lib/apisClientePj/actionsUpdate';
import { usePerfil } from '@/app/hooks/usePerfil';
import Loading from '../../share/Loading';
import dynamic from 'next/dynamic'
import { CampoMoneda } from '../../share/CampoMoneda';
import { SeccionFondo } from '../../share/SeccionFondoRadicacion';
import { CampoFecha } from '../../share/CampoFecha';
//import { CheckDesplazable } from '../../share/CheckDesplazable';
//import { CampoTexto } from '../../share/CampoTexto';
import { fn_orquestadorCrearModificar } from '@/app/lib/apisClientePj/fn_orquestadorCrearModificar';
import { useRouter } from 'next/navigation';


const DynamicModal = dynamic(() => import('../../share/Modals'));


export const InformacionFinancieraPjN = ({ contextRadClient, listaPeriodos, listDepartamentos, dataCamposAdministacion, perfilCliente,
    listTipoBalance, tipoBalance
}) => {

    const { push } = useRouter()
    const { inputDocument } = usePerfil();
    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    //const [agregarObligacion, setAgregarObligacion] = useState(false);

    const [nuevoDato, setNuevoDato] = useState({
        entidadFinanciera: '',
        tipoCredito: '',
        ValorInicial: '',
        saldoActual: '',
        fechaInicio: '',
        fechaVencimiento: '',
        //fechaInicio: ''
    });

    let {
        //tipoPersona,
        //perfilPn,
        //residenciaFiscalPn,
        //activadEconomicaPn,
        //detalleActivadEconomicaPn,
        //referecniaPn,
        //tabBarSeleccionado,
        //activarConsulta,
        perfilPj,
        //actualizarCambioTipoCliente,
        representanteLegalPj,
        //residenciaFiscalPj,
        //juntaDirectivaPj,
        //accionistaPj,
        beneficiarioPj,
        controlantesPj,
        administradorFiduciario,
        titularConsorcio,
        administradorConsorcio,
        informacionFinancieraPj,
        contactoAutorizadoPj,
        juntaDirectivaPn,
        accionistasPn,
        //beneficiariosPn,
        actualizarInformacionFinancieraPj,
        clienteNuevoProspectoActualizar,
        //cambioTipoCliente
    } = contextRadClient()


    const DRAFT_KEY = 'informacionFinancieraPj';

    // 1) Al montar carga draft
    useEffect(() => {
        const draft = loadDraft(DRAFT_KEY);
        if (
            (!informacionFinancieraPj || Object.keys(informacionFinancieraPj).length === 0) &&
            draft && typeof draft === 'object'
        ) {
            actualizarInformacionFinancieraPj(draft);
        }
        return () => {

            clearDraft(DRAFT_KEY);
        }
    }, []);

    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        if (informacionFinancieraPj) {
            saveDraft(DRAFT_KEY, informacionFinancieraPj);
        }
    }, [informacionFinancieraPj]);

    //console.log(informacionFinancieraPj);

    // const onChangeInput = (e) => {

    //     const { name, value } = e.target;

    //     const [nameCampo, index] = name.split('-');

    //     const posItem = parseInt(index, 10);

    //     const dataInfoFinanciera = [...informacionFinancieraPj];

    //     dataInfoFinanciera[posItem] = {
    //         ...dataInfoFinanciera[posItem],
    //         [nameCampo]: value
    //     };

    //     actualizarInformacionFinancieraPj(dataInfoFinanciera);

    // }



    const agregarNuevaInfoFinanciera = (e) => {

        e.preventDefault()
        const nuevaInfoFinanciera = {
            periodo: '',
            ventasAnualesMM: '',
            gastosAnualesMM: '',
            activosMM: '',
            pasivosMM: '',
            capitalSocial: '',
            patrimonioMM: '',
            ingresosMensualesMM: '',
            egresosMensulesMM: '',
            ingresosNoOperacionalesMM: '',
            ventasAnuales: '',
            gastosAnuales: '',
            ingresosBrutosOrdinarias: '',
            nuevo: true
        }

        actualizarInformacionFinancieraPj([...informacionFinancieraPj, nuevaInfoFinanciera]);
    };


    const mostrarModalMensaje = ({ mensaje = '' }) => {
        setShowLoading(false);
        setMessageAlert(mensaje);
        setShowModal(true);
        return
    }


    const limpiarListas = (data) => {
        const keysExcluir = [
            'ltTipoDocPn', 'ltOficiales', 'ltpasisNac', 'ltCiudadesNac', 'ltSexo',
            'ltOficina', 'ltProvinciaNacimiento', 'ltEstadoCivil', 'ltPaisRecidencia',
            'ltTipoIdFiscal', 'ltTipoPEP', 'ltTipoDireccion', 'ltPaisPn',
            'ltDepartamentoPn', 'ltCiudadPn', 'ltTipoVia', 'ltTipoLetraVia',
            'ltTipoSectorVia', 'ltTipoEdificio', 'ltTipoVivienda', 'ltTipoPropiedad',
            'ltReferenciaTiempo', 'ltTipoTelefono', 'ltTipoContacto', 'ltPrefijos',
            'ltTipoOperador', 'ltTipoContrato', 'ltTipoMensajeria', 'ltTipoDireccionVirtual',
            'ltTipoAccionista', 'ltCategoriaCompania', 'ltTipoDocPj'
        ];

        return data.map(item => {
            const nuevo = { ...item };
            keysExcluir.forEach(k => delete nuevo[k]);
            return nuevo;
        });
    };


    const guardarDataRadicacionClientePj = async (e) => {
        //push('/radicacionCliente/radicacionPj/datosPersonaJuridicaPj')
        setShowLoading(true);

        const dataRegistro = {
            'datosBasicos': perfilPj,
            'participantes': {
                'representanLegal': limpiarListas(representanteLegalPj),
                'contactosAutorizados': limpiarListas(contactoAutorizadoPj),
                'administradorFiduciario': limpiarListas(administradorFiduciario),
                'titularConsorcio': limpiarListas(titularConsorcio),
                'administradorConsorcio': limpiarListas(administradorConsorcio),
                'juntaDirectiva': limpiarListas(juntaDirectivaPn),
                'accionistas': limpiarListas(accionistasPn),
                'controlantes': limpiarListas(controlantesPj),
                'beneficiariosFinales': limpiarListas(beneficiarioPj),
            },
            'informacionFinanciera': informacionFinancieraPj
        };

        //console.log(dataRegistro);

        try {
            const resGuardar = JSON.parse(await fn_orquestadorCrearModificar(JSON.stringify(dataRegistro)));
            //console.log(resGuardar);
            if (resGuardar.status === '200') {
                setShowLoading(false);
                setMessageAlert(`${resGuardar.message}`);
                setShowModal(true)
            } else {
                setShowLoading(false);
                setMessageAlert(`${resGuardar.message === undefined ? 'Fallo la carga del cliente' : resGuardar.message}`);
                setShowModal(true)
            };

        } catch (error) {
            setShowLoading(false);
            setMessageAlert(`${error}`);
            setShowModal(true)
        };
    };


    /* const actualizarDataRadicacionClientePj = async (e) => {

        e.preventDefault()

        try {

            setShowLoading(true)

            const result = JSON.parse(await updateClienteJuridico(perfilPj))

            if (result.STATUS == 200) {
                const resultDir = JSON.parse(await updateDirecciones(perfilPj, inputDocument || perfilPj.NIT))
                const resultResidenciaFiscal = JSON.parse(await updateRecidenciaFiscal(residenciaFiscalPj, inputDocument || perfilPj.NIT))
            }

            for (const item of representanteLegalPj) {

                const re = item.nuevo == true ?
                    JSON.parse(await insertRepresentanteLegal(item, inputDocument || perfilPj.NIT)) :
                    JSON.parse(await updateRepresentanteLegal(item, inputDocument || perfilPj.NIT))




                const reDirecion = item.nuevo == true ?
                    JSON.parse(await insertDirecciones(item, item.numeroIdentificacion)) :
                    JSON.parse(await updateDirecciones(item, item.numeroIdentificacion))


                const reDatosImpositivos = item.nuevo == true ?
                    JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))
                    : JSON.parse(await updateDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))



            }

            // contacto autorizado


            for (const item of contactoAutorizadoPj) {



                const re = item.nuevo == true ? JSON.parse(await insertContactosAutorizados(item, inputDocument || perfilPj.NIT))

                    :
                    JSON.parse(await updateContactosAutorizados(item, inputDocument || perfilPj.NIT))


                const reDirecion = item.nuevo == true ? JSON.parse(await insertDirecciones(item, item.numeroIdentificacion))
                    : JSON.parse(await updateDirecciones(item, item.numeroIdentificacion))





                const reDatosImpositivos = item.nuevo == true ? JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))
                    : JSON.parse(await updateDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))




            }


            // juntaDirectiva PJ

            for (const item of juntaDirectivaPj) {

                const re = item.nuevo == true ? JSON.parse(await insertJuntaDirectivaPj(item, inputDocument || perfilPj.NIT)) :
                    JSON.parse(await updateJuntaDirectivaPj(item, inputDocument || perfilPj.NIT))


            }

            //juntan directiva PN
            for (const item of juntaDirectivaPn) {

                const re = item.nuevo == true ? JSON.parse(await insertJuntaDirectivaPn(item, inputDocument || perfilPj.NIT))
                    : JSON.parse(await updateJuntaDirectivaPn(item, inputDocument || perfilPj.NIT))

                const reDatosImpositivos = item.nuevo == true ? JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))
                    : JSON.parse(await updateDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))


            }


            //accionistas pj

            for (const item of accionistaPj) {

                const re = item.nuevo == true ? JSON.parse(await insertAccionistasPj(item, inputDocument || perfilPj.NIT))
                    : JSON.parse(await updateAccionistasPj(item, inputDocument || perfilPj.NIT))

                const reDirecion = item.nuevo == true ? JSON.parse(await insertDirecciones(item, item.numeroIdentificacion))
                    : JSON.parse(await updateDirecciones(item, item.numeroIdentificacion))



            }

            //accionista pn

            for (const item of accionistasPn) {

                const re = item.nuevo == true ? JSON.parse(await insertAccionistasPn(item, inputDocument || perfilPj.NIT))
                    : JSON.parse(await updateAccionistasPn(item, inputDocument || perfilPj.NIT))


                const reDirecion = item.nuevo == true ? JSON.parse(await insertDirecciones(item, item.numeroIdentificacion))
                    : JSON.parse(await updateDirecciones(item, item.numeroIdentificacion))




                const reDatosImpositivos = item.nuevo == true ? JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))
                    : JSON.parse(await updateDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))


            }



            //controlantes

            for (const item of controlantesPj) {

                const re = item.nuevo == true ? JSON.parse(await insertControlantes(item, inputDocument || perfilPj.NIT))
                    : JSON.parse(await updateControlantes(item, inputDocument || perfilPj.NIT));

                const reDirecion = item.nuevo == true ? JSON.parse(await insertDirecciones(item, item.numeroIdentificacion)) :
                    JSON.parse(await updateDirecciones(item, item.numeroIdentificacion)
                    );

                const reDatosImpositivos = item.nuevo == true ? JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion)) :
                    JSON.parse(await updateDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))



            }




            //Beneficiario PJ

            for (const item of beneficiarioPj) {

                const re = item.nuevo == true ? JSON.parse(await insertBeneficiariosPJ(item, inputDocument || perfilPj.NIT)) :
                    JSON.parse(await updateBeneficiariosPJ(item, inputDocument || perfilPj.NIT))

                const reDirecion = item.nuevo == true ? JSON.parse(await insertDirecciones(item, item.numeroIdentificacion)) :
                    JSON.parse(await updateDirecciones(item, item.numeroIdentificacion))


            }




            //Beneficiario PN


            for (const item of beneficiariosPn) {

                const re = item.nuevo == true ? JSON.parse(await insertBeneficiariosPn(item, inputDocument || perfilPj.NIT)) :
                    JSON.parse(await updateBeneficiariosPn(item, inputDocument || perfilPj.NIT))


                const reDirecion = item.nuevo == true ? JSON.parse(await insertDirecciones(item, item.numeroIdentificacion)) :
                    JSON.parse(await updateDirecciones(item, item.numeroIdentificacion))


                const reDatosImpositivos = item.nuevo == true ? JSON.parse(await insertDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))
                    : JSON.parse(await updateDatosImpositivos(item, inputDocument || perfilPj.NIT, item.numeroIdentificacion))



            }


            //Informacion financiera

            for (const item of informacionFinancieraPj) {

                const re = item.nuevo == true ? JSON.parse(await insertInformacionFinanciera(item, inputDocument || perfilPj.NIT))
                    : JSON.parse(await updateInformacionFinanciera(item, inputDocument || perfilPj.NIT))

            }


            setShowLoading(false)
            setMessageAlert('tu información se actualizo correctamente.')
            setShowModal(true)




        } catch (error) {
            console.error(error);



        } finally {

            setShowLoading(false)

            actualizarCambioTipoCliente(false)
        }

    }; */

    const endModal = () => setShowModal(false);
    const [datos, setDatos] = useState([]);


    const eliminarElemento = (id) => {
        setDatos((prevDatos) => prevDatos.filter((item) => item.id !== id));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoDato((prevDato) => ({
            ...prevDato,
            [name]: value,
        }));
    };


    const agregarElemento = () => {
        // if (
        //     !nuevoDato.entidad ||
        //     !nuevoDato.tipo ||
        //     !nuevoDato.valorInicial ||
        //     !nuevoDato.saldoActual ||
        //     !nuevoDato.fechaVencimiento
        // ) {
        //     alert('Por favor, completa todos los campos.');
        //     return;
        // }

        const nuevoElemento = {
            id: datos.length + 1,
            entidadFinanciera: nuevoDato.entidadFinanciera,
            tipoCredito: nuevoDato.tipoCredito,
            ValorInicial: parseFloat(nuevoDato.ValorInicial),
            saldoActual: parseFloat(nuevoDato.saldoActual),
            fechaVencimiento: nuevoDato.fechaVencimiento,
            fechaInicio: nuevoDato.fechaInicio,
            nuevo: true
        };

        setDatos((prevDatos) => [...prevDatos, nuevoElemento]);

        setNuevoDato({
            entidadFinanciera: '',
            tipoCredito: '',

            ValorInicial: '',
            saldoActual: '',
            fechaVencimiento: '',
            fechaInicio: ''
        });
    };


    const onChangeInput = (e) => {

        const { name, type, checked, value } = e.target
        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;
        const keys = name.split(".");

        const itemActalizar = (obj, keys, value) => {
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

        // Actualiza el estado

        const informacionFinancieraPjn = itemActalizar(informacionFinancieraPj, keys, inputValue);
        actualizarInformacionFinancieraPj(informacionFinancieraPjn);
    };

    const { entidadFinanciera, ValorInicial, fechaInicio, fechaVencimiento, saldoActual, tipoCredito } = nuevoDato;

    return (
        <form id='informacionFinancieraPj'>


            <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                <div className="flex justify-between items-center">

                    <div className='flex gap-6'>
                        <h1 className="font-bold py-3">Situación Económica</h1>
                    </div>

                </div>

                <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                    <div>
                        <CampoLista
                            valorInput={informacionFinancieraPj?.situacionEconomica?.tipoBalance}
                            placeholder="Tipo de balance"
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.tipoBalance"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '223',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={listTipoBalance}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>

                    <div>
                        <CampoLista
                            valorInput={informacionFinancieraPj?.situacionEconomica?.claseBalance}
                            placeholder="Clase de balance"
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.claseBalance"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '223',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            lista={tipoBalance}
                            idLista="code"
                            descripcionList="value"
                        />
                    </div>

                    <div>
                        <CampoFecha
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '226',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={informacionFinancieraPj?.situacionEconomica?.fechaCorte}
                            onChangeInput={onChangeInput}
                            placeholder="Fecha de corte"
                            nameInput="situacionEconomica.fechaCorte"
                        />
                    </div>

                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.situacionEconomica?.ventasAnuales}
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.ventasAnuales"

                            placeholderAux='Ventas Anuales'
                            placeholder='Ventas Anuales'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.situacionEconomica?.ingresosMensuales}
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.ingresosMensuales"

                            placeholderAux='Ingresos Mensuales'
                            placeholder='Ingresos Mensuales'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.situacionEconomica?.PGJ}
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.PGJ"

                            placeholderAux='PGJ/Egresos'
                            placeholder='PGJ/Egresos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.situacionEconomica?.ingresosNoOperacionales}
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.ingresosNoOperacionales"

                            placeholderAux='Ingresos No Operacionales'
                            placeholder='Ingresos No Operacionales'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.situacionEconomica?.gastosAnuales}
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.gastosAnuales"

                            placeholderAux='Gastos Anuales'
                            placeholder='Gastos Anuales'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.situacionEconomica?.egresosMensuales}
                            onChangeInput={onChangeInput}
                            nameInput="situacionEconomica.egresosMensuales"

                            placeholderAux='Egresos Mensuales'
                            placeholder='Egresos Mensuales'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
            </div>

            <SeccionFondo titulo={'Situación Patrimonial'}>
                <div>
                    <CampoLista
                        valorInput={informacionFinancieraPj?.situacionPatrimonial?.tipoBalance}
                        placeholder="Tipo de balance"
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.tipoBalance"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '223',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={listTipoBalance}
                        idLista="code"
                        descripcionList="value"
                    />
                </div>
                <div>
                    <CampoLista
                        valorInput={informacionFinancieraPj?.situacionPatrimonial?.claseBalance}
                        placeholder="Clase de balance"
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.claseBalance"
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '223',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        lista={tipoBalance}
                        idLista="code"
                        descripcionList="value"

                    />
                </div>
                <div>
                    <CampoFecha
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '226',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                        valorInput={informacionFinancieraPj?.situacionPatrimonial?.fechaCorte}
                        onChangeInput={onChangeInput}
                        placeholder="Fecha de corte"

                        nameInput="situacionPatrimonial.fechaCorte"

                    />
                </div>
                <div>
                    <CampoMoneda
                        valorInput={informacionFinancieraPj?.situacionPatrimonial?.activos}
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.activos"
                        placeholderAux='Activos'
                        placeholder='Activos'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>
                <div>
                    <CampoMoneda
                        valorInput={informacionFinancieraPj?.situacionPatrimonial?.BGJ}
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.BGJ"

                        placeholderAux='BGJ/Pasivos y Patrimonio'
                        placeholder='BGJ/Pasivos y Patrimonio'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>
                <div>
                    <CampoMoneda
                        valorInput={informacionFinancieraPj?.situacionPatrimonial?.pasivos}
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.pasivos"

                        placeholderAux='Pasivos'
                        placeholder='Pasivos'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>
                <div>
                    <CampoMoneda
                        valorInput={informacionFinancieraPj?.situacionPatrimonial?.patrimonio}
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.patrimonio"

                        placeholderAux='Patrimonio'
                        placeholder='Patrimonio'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>
                <div>
                    <CampoMoneda
                        valorInput={informacionFinancieraPj?.situacionPatrimonial?.capitalSocial}
                        onChangeInput={onChangeInput}
                        nameInput="situacionPatrimonial.capitalSocial"

                        placeholderAux='Capital Social'
                        placeholder='Capital Social'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>


            </SeccionFondo>


            {/* <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                <div className="flex justify-between items-center">

                    <div className='flex gap-6'>
                        <h1 className="font-bold py-3">Balance General</h1>
                    </div>

                </div>
                <div className={`grid grid-cols-1 gap-x-8 gap-y-4 `}>


                    <div>
                        <CampoFecha
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '226',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                            valorInput={informacionFinancieraPj?.balanceGeneral?.fechaCorte}
                            onChangeInput={onChangeInput}
                            placeholder="Fecha de corte"
                            nameInput="balanceGeneral.fechaCorte"

                        />
                    </div>



                </div>
                <h3 className="font-bold py-3 my-2">Activos</h3>
                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>

                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.balanceGeneral?.activosCorrientes}
                            onChangeInput={onChangeInput}
                            nameInput="balanceGeneral.activosCorrientes"

                            placeholderAux='Activos Corrientes'
                            placeholder='Activos Corrientes'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.balanceGeneral?.activosFijos}
                            onChangeInput={onChangeInput}
                            nameInput="balanceGeneral.activosFijos"

                            placeholderAux='Activos Fijos'
                            placeholder='Activos Fijos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.balanceGeneral?.otrosActivos}
                            onChangeInput={onChangeInput}
                            nameInput="balanceGeneral.otrosActivos"

                            placeholderAux='Otros Activos'
                            placeholder='Otros Activos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.balanceGeneral?.totalActivos}
                            onChangeInput={onChangeInput}
                            nameInput="balanceGeneral.totalActivos"

                            placeholderAux='Total Activos'
                            placeholder='Total Activos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>

                </div>
                <h3 className="font-bold py-3 my-2">Pasivos</h3>
                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>

                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.balanceGeneral?.pasivosCorrientes}
                            onChangeInput={onChangeInput}
                            nameInput="balanceGeneral.pasivosCorrientes"

                            placeholderAux='Pasivos Corrientes'
                            placeholder='Pasivos Corrientes'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.balanceGeneral?.pasivosLargoPlazo}
                            onChangeInput={onChangeInput}
                            nameInput="balanceGeneral.pasivosLargoPlazo"

                            placeholderAux='Pasivos a Largo Plazo'
                            placeholder='Pasivos a Largo Plazo'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.balanceGeneral?.otrosPasivos}
                            onChangeInput={onChangeInput}
                            nameInput="balanceGeneral.otrosPasivos"

                            placeholderAux='Otros Pasivos'
                            placeholder='Otros Pasivos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.balanceGeneral?.totalPasivos}
                            onChangeInput={onChangeInput}
                            nameInput="balanceGeneral.totalPasivos"

                            placeholderAux='Total Pasivos'
                            placeholder='Total Pasivos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>

                </div>

                <h3 className="font-bold py-3 my-2">Pasivos</h3>
                <div>
                    <CampoMoneda
                        valorInput={informacionFinancieraPj?.situacionEconomica?.patrimonioNeto}
                        onChangeInput={onChangeInput}
                        nameInput="situacionEconomica.patrimonioNeto"

                        placeholderAux='Patrimonio Neto'
                        placeholder='Patrimonio Neto'
                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                            id: '208',
                            listaCamposAdministracion: dataCamposAdministacion,
                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                        }))}
                    />
                </div>


            </div> */}

            {/* 
            <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                <div className="flex justify-between items-center">

                    <div className='flex gap-6'>
                        <h1 className="font-bold py-3">Estado de Resultados</h1>
                    </div>

                </div>

                <hr className='my-3' />

                <h3 className="font-bold py-3 my-2">Ingresos y Costos</h3>
                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>

                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.ingresosOperacionales}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.ingresosOperacionales"

                            placeholderAux='Ingresos Operacionales'
                            placeholder='Ingresos Operacionales'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.costoVentas}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.costoVentas"
                            placeholder='Costo de Ventas'
                            placeholderAux='Costo de Ventas'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.utilidadBruta}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.utilidadBruta"

                            placeholderAux='Utilidad Bruta'
                            placeholder='Utilidad Bruta'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
                <h3 className="font-bold py-3 my-2">Gastos Operacionales</h3>
                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>

                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.gastosAdministrativos}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.gastosAdministrativos"

                            placeholderAux='Gastos Administrativos'
                            placeholder='Gastos Administrativos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.gastosVentas}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.gastosVentas"

                            placeholderAux='Gastos de Ventas'
                            placeholder='Gastos de Ventas'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.utilidadOperacional}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.utilidadOperacional"

                            placeholderAux='Utilidad Operacional'
                            placeholder='Utilidad Operacional'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>

                <h3 className="font-bold py-3 my-2">Otros Ingresos y Gastos</h3>
                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>

                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.ingresosNoOperacionales}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.ingresosNoOperacionales"

                            placeholderAux='Ingresos No Operacionales'
                            placeholder='Ingresos No Operacionales'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.gastosNoOperacionales}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.gastosNoOperacionales"

                            placeholderAux='Gastos No Operacionales'
                            placeholder='Gastos No Operacionales'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>

                <h3 className="font-bold py-3 my-2">Resultados Finales</h3>
                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>

                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.utilidadAntesImpuestos}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.utilidadAntesImpuestos"

                            placeholderAux='Utilidad Antes de Impuestos'
                            placeholder='Utilidad Antes de Impuestos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.Impuestos}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.Impuestos"

                            placeholderAux='Impuestos'
                            placeholder='Impuestos'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>

                    <div>
                        <CampoMoneda
                            valorInput={informacionFinancieraPj?.estadoResultados?.utilidadNeta}
                            onChangeInput={onChangeInput}
                            nameInput="estadoResultados.utilidadNeta"

                            placeholderAux='Utilidad Neta'
                            placeholder='Utilidad Neta'
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '208',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div>
            </div> */}


            {/* <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                <div className="flex justify-between items-center">

                    <div className='flex gap-6'>
                        <h1 className="font-bold py-3">Información Tributaria y Obligaciones</h1>
                    </div>

                </div>

                <hr className='my-3' />


                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                    <div>
                        <CheckDesplazable
                            titulo={'Declaración de Renta'}
                            name={'informaciónTributaria.declaracionRenta'}
                            onclickCheck={onChangeInput}
                            valorInput={informacionFinancieraPj?.informaciónTributaria?.declaracionRenta}

                        />
                    </div>
                    <div>
                        <CheckDesplazable
                            titulo={'Declaración de IVA'}
                            name={'informaciónTributaria.declaracionIVA'}
                            onclickCheck={onChangeInput}
                            valorInput={informacionFinancieraPj?.informaciónTributaria?.declaracionIVA}
                        />
                    </div>
                    <div>
                        <CheckDesplazable
                            titulo={'Retención en la Fuente'}
                            name={'informaciónTributaria.retencionFuente'}
                            onclickCheck={onChangeInput}
                            valorInput={informacionFinancieraPj?.informaciónTributaria?.retencionFuente}
                        />
                    </div>
                    <div>
                        <CheckDesplazable
                            titulo={'Información Exógena'}
                            name={'informaciónTributaria.informacionExogena'}
                            onclickCheck={onChangeInput}
                            valorInput={informacionFinancieraPj?.informaciónTributaria?.informacionExogena}
                        />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <h3 className="font-bold py-3 my-2">Obligaciones Financieras</h3>
                    <button onClick={() => { setAgregarObligacion(!agregarObligacion) }} type='button' className='bg-coomeva_color-rojo text-white px-8 rounded-md py-1'>{`${agregarObligacion ? 'Cancelar' : 'Agregar obligación'}`}</button>
                </div>

                {
                    agregarObligacion ? <SeccionFondo nCol={2} titulo={'Nueva Obligación Financiera'}>

                        <div>
                            <CampoTexto
                                valorInput={nuevoDato.entidadFinanciera}
                                onChangeInput={handleChange}
                                nameInput={"entidadFinanciera"}

                                placeholder='Entidad Financiera'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '208',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div>
                            <CampoLista
                                valorInput={nuevoDato.tipoCredito}
                                placeholder="Tipo de Crédito"
                                onChangeInput={handleChange}
                                nameInput="tipoCredito"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '223',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={[{ codLista: 1, descripcion: 'Sin Catálogo' }]}
                                idLista="codDepto"
                                descripcionList="descripcion"

                            />
                        </div>
                        <div>
                            <CampoMoneda
                                valorInput={nuevoDato.ValorInicial}
                                onChangeInput={handleChange}
                                nameInput={"ValorInicial"}

                                placeholderAux='Valor Inicial'
                                placeholder='Valor Inicial'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '208',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div>
                            <CampoMoneda
                                valorInput={nuevoDato.saldoActual}
                                onChangeInput={handleChange}
                                nameInput={"saldoActual"}

                                placeholderAux='Saldo Actual'
                                placeholder='Saldo Actual'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '208',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div>
                            <CampoFecha
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '226',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={nuevoDato.fechaInicio}
                                onChangeInput={handleChange}
                                placeholder="Fecha de Inicio"
                                nameInput="fechaInicio"

                            />
                        </div>
                        <div>
                            <CampoFecha
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '226',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={nuevoDato.fechaVencimiento}
                                onChangeInput={handleChange}
                                placeholder="Fecha de Vencimiento"
                                nameInput="fechaVencimiento"

                            />
                        </div>
                        <div className='flex justify-end items-center col-span-2'>
                            <button
                                type='button'
                                onClick={entidadFinanciera != '' && tipoCredito != '' &&
                                    ValorInicial != '' &&
                                    saldoActual != '' &&
                                    fechaVencimiento != ''
                                    ? agregarElemento
                                    : () => { }}
                                className={`${entidadFinanciera != '' && tipoCredito != '' &&
                                    ValorInicial != '' &&
                                    saldoActual != '' &&
                                    fechaVencimiento != ''
                                    ? 'bg-coomeva_color-rojo  text-white'
                                    : 'bg-zinc-300 text-black'
                                    } px-8 rounded-md py-1`}
                            >agregar</button>
                        </div>
                    </SeccionFondo> : undefined
                }

               

                <div className="">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b">Entidad</th>
                                    <th className="py-2 px-4 border-b">Tipo</th>
                                    <th className="py-2 px-4 border-b">Valor Inicial</th>
                                    <th className="py-2 px-4 border-b">Saldo Actual</th>
                                    <th className="py-2 px-4 border-b">Fecha Vencimiento</th>
                                    <th className="py-2 px-4 border-b">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b text-center">{item.entidadFinanciera}</td>
                                        <td className="py-2 px-4 border-b text-center">{item.tipoCredito}</td>
                                        <td className="py-2 px-4 border-b text-center">${item.ValorInicial.toLocaleString()}</td>
                                        <td className="py-2 px-4 border-b text-center">${item.saldoActual.toLocaleString()}</td>
                                        <td className="py-2 px-4 border-b text-center">{item.fechaVencimiento}</td>
                                        <td className="py-2 px-4 border-b text-center">
                                            <button
                                                onClick={() => eliminarElemento(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}

            {/* {
                informacionFinancieraPj?.map((item, i) => (
                    <div className='grid  w-full' key={i}>

                        <div className="grid grid-cols-4 gap-4 text-start justify-start">
                            <div className="col-span-1 w-48">
                                <CampoLista
                                    valorInput={item.periodo}
                                    onChangeInput={onChangeInput}
                                    nameInput={"periodo-" + i}
                                    lista={listaPeriodos}
                                    idLista='idListPeriodos'
                                    descripcionList='Periodos'
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '138',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    placeholder='Periodo'
                                />
                            </div>
                        </div>
                        <div className='mt-4 flex  justify-around w-full'>
                            <div className='w-full'>
                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.ventasAnualesMM?.length ? formatearPesosColombianos(item.ventasAnualesMM + '') : ''}
                                    nameInput={"ventasAnualesMM-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"ventasAnualesMM"}
                                    bgFila={1}
                                    descripcion={"*Ventas Anuales ($MM)"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold text-start"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '132',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />

                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.gastosAnualesMM?.length ? formatearPesosColombianos(item.gastosAnualesMM + '') : ''}
                                    nameInput={"gastosAnualesMM-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"ventasAnualesMM"}
                                    bgFila={0}
                                    descripcion={"*Gastos Anuales ($MM)"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '133',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />

                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.activosMM?.length ? formatearPesosColombianos(item.activosMM) : ''}
                                    nameInput={"activosMM-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"activosMM"}
                                    bgFila={1}
                                    descripcion={"*Activos ($MM)"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '134',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />


                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.pasivosMM?.length ? formatearPesosColombianos(item.pasivosMM + '') : ''}
                                    nameInput={"pasivosMM-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"pasivosMM"}
                                    bgFila={0}
                                    descripcion={"*Pasivos ($MM)"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '135',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />

                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.capitalSocial?.length ? formatearPesosColombianos(item.capitalSocial + '') : ''}
                                    nameInput={"capitalSocial-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"capitalSocial"}
                                    bgFila={1}
                                    descripcion={"*Capital Social"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '139',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />

                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.patrimonioMM?.length ? formatearPesosColombianos(item.patrimonioMM + '') : ''}
                                    nameInput={"patrimonioMM-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"patrimonioMM"}
                                    bgFila={0}
                                    descripcion={"*Patrimonio ($MM) (Activos - Pasivos)"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '140',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />

                            </div>

                            <div className='w-full'>

                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.ingresosMensualesMM?.length ? formatearPesosColombianos(item.ingresosMensualesMM) : ''}
                                    nameInput={"ingresosMensualesMM-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"ingresosMensualesMM"}
                                    bgFila={1}
                                    descripcion={"*Ingresos Mensuales($MM)"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '136',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />

                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.egresosMensulesMM?.length ? formatearPesosColombianos(item.egresosMensulesMM + '') : ''}
                                    nameInput={"egresosMensulesMM-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"egresosMensulesMM"}
                                    bgFila={0}
                                    descripcion={"*Egresos Mensuales($MM)"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '137',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />


                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.ingresosNoOperacionalesMM?.length ? formatearPesosColombianos(item.ingresosNoOperacionalesMM + '') : ''}
                                    nameInput={"ingresosNoOperacionalesMM-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"ingresosNoOperacionalesMM"}
                                    bgFila={1}
                                    descripcion={"*Ingresos No Operacionales Mensuales($MM)"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '141',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                        validacionAdicional: true
                                    }))}
                                />

                                <div className='h-8'>
                                    <ComplementoDetalle dataMode={perfilCliente} calcularTotal={onChangeInput} index={i} campo={"ingresosNoOperacionalesMM-" + i} />
                                </div>

                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.ventasAnuales != '' ? formatearPesosColombianos(item.ventasAnuales + '') : ''}
                                    nameInput={"ventasAnuales-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"ventasAnuales"}
                                    bgFila={1}
                                    descripcion={"*Ventas Anuales"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '132',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />

                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.gastosAnuales != '' ? formatearPesosColombianos(item.gastosAnuales + '') : ''}
                                    nameInput={"gastosAnuales-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"gastosAnuales"}
                                    bgFila={0}
                                    descripcion={"*Gastos Anuales"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '133',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />


                                <CampoMonedaDecimalInfoFinan
                                    valorInput={item.ingresosBrutosOrdinarias != '' ? formatearPesosColombianos(item.ingresosBrutosOrdinarias + '') : ''}
                                    nameInput={"ingresosBrutosOrdinarias-" + i}
                                    onChangeInput={onChangeInput}
                                    id={"ingresosBrutosOrdinarias"}
                                    bgFila={1}
                                    descripcion={"*Ingresos brutos de actividades ordinarias"}
                                    classTitle={"text-coomeva_color-rojo ml-4  w-[25%] text-sm font-bold"}
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '146',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />


                            </div>
                        </div>
                        {
                            (i > 0 || informacionFinancieraPj.length > 0) && informacionFinancieraPj.length - 1 !== i ? (

                                <h3 className="font-semibold  mb-6">Datos Financieros</h3>
                            ) : null
                        }
                    </div>))
            } */}

            <div className='flex justify-between mt-4 items-center'>
                {/* <ButtomAgregarItem titulo={'Agregar periodo'}
                    onClick={agregarNuevaInfoFinanciera}
                    clienteNuevoProspectoActualizar={clienteNuevoProspectoActualizar}
                    contextRadClient={contextRadClient}
                /> */}
                {/* <ButtomGuardarRadicacionCleinte
                    clienteNuevoProspectoActualizar={clienteNuevoProspectoActualizar}
                    onClick={
                        cambioTipoCliente == true ? actualizarDataRadicacionClientePj : clienteNuevoProspectoActualizar == '1' || clienteNuevoProspectoActualizar == '2' ? guardarDataRadicacionClientePj
                            : clienteNuevoProspectoActualizar == '3' ? actualizarDataRadicacionClientePj : () => { }}
                /> */}

                <ButtomGuardarRadicacionCleinte
                    onClick={guardarDataRadicacionClientePj}
                    clienteNuevoProspectoActualizar={localStorage.getItem('btnGuardar')}
                />

                {/* <button onClick={actualizarDataRadicacionClientePj}>Actualizar</button> */}
            </div>

            {
                showLoading && <Loading />
            }

            {
                (showModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            }

        </form>
    );
};