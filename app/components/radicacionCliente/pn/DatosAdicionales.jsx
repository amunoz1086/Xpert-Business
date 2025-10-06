'use client'

import { useState, useEffect } from 'react'
import { loadDraft, saveDraft } from '@/app/lib/utils/draft'
import { CampoLista } from '../../share/CampoLista'
import { CampoTexto } from '../../share/CampoTexto';
import { CampoTelefono } from '../../share/CampoTelefono';
import { CampoMoneda } from '../../share/CampoMoneda';
import { objectoValidarCampoAdministracion } from '@/app/lib/utils';
import { CheckDesplazable } from '../../share/CheckDesplazable';
import { CheckInputRojo } from '../../share/CheckInputRojo';
import { SeccionFondo } from '../../share/SeccionFondoRadicacion';
import { CampoFecha } from '../../share/CampoFecha';
import { CampoNumero } from '../../share/CampoNumero';
import { fn_catalogosParticipantes } from '@/app/lib/apisClientePn/fn_catalogosParticipantes';


export const DatosAdicionalesPn = ({ contextRadClient, dataCamposAdministacion }) => {


    const { referecniaPn, actualizarReferenciaPn, datosAdicionales, actualizarDatosAdicionales, clienteNuevoProspectoActualizar, activadEconomicaPn,
        actualizarActiviadEconomicaPn, detalleActivadEconomicaPn, actualizarDetalleActiviadEconomicaPn, referenciaLaboralAdicionalPn,
        actualizarReferenciaLaboralAdicionalPn,
    } = contextRadClient()

    const DRAFT_KEY = 'referecniaPn';

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
            actualizarReferenciaPn(draft);
        }
        return () => {
            // si quieres limpiar al salir, descomenta:
            // clearDraft(DRAFT_KEY);
        }
    }, []);

    // 2) Cada vez que cambian los contactos, persiste draft
    useEffect(() => {
        saveDraft(DRAFT_KEY, referecniaPn);
    }, [referecniaPn]);

    const [elementoActivo, setElementoActivo] = useState(0);

    const [activarPepReferenciaFamiliar, setActivarPepReferenciaFamiliar] = useState(false)
    const [activarPepReferenciaPersonal, setActivarPepReferenciaPersonal] = useState(false)
    const [activarCamp, setActivarCamp] = useState(false)
    const [activarDireccionNegocio, setActivarDireccionNegocio] = useState(false)



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





    // const onChangeInput = (e) => {



    //     const { name, value } = e.target

    //     if (name == 'pepReferenciaFamiliar') {

    //         setActivarPepReferenciaFamiliar(!activarPepReferenciaFamiliar)

    //     }

    //     if (name == 'pepReferenciaPersonal') {

    //         setActivarPepReferenciaPersonal(!activarPepReferenciaPersonal)

    //     }

    //     if (name == 'existComp') {

    //         setActivarCamp(!activarCamp)

    //     }

    //     if (name == 'direccionNegocio') {
    //         setActivarDireccionNegocio(!activarDireccionNegocio)
    //     }




    //     // const updatedPerfilPn = { ...perfilPn, [name == 'extranjero' || name == 'nacional' ? 'relacionDependencia' : name]: name == 'extranjero' || name == 'nacional' ? name : value };

    //     // actualizarPerfilPn(updatedPerfilPn)

    // }





    const onChangeInput = (e) => {

        const { name, type, checked, value } = e.target;

        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;

        const keys = name.split(".");

        if (keys[1] == 'PEPReferencia') {

            setActivarPepReferenciaFamiliar(!activarPepReferenciaFamiliar)

        }

        if (keys[1] == 'PEPReferencia') {

            setActivarPepReferenciaPersonal(!activarPepReferenciaPersonal)

        }

        if (keys[1] == 'existComp') {

            setActivarCamp(!activarCamp)

        }

        if (keys[1] == 'direccionNegocioIgualDomicilioPersonal') {
            setActivarDireccionNegocio(!activarDireccionNegocio)
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

        const datosAdionalesPn = updateNestedObject(referecniaPn, keys, inputValue);

        actualizarReferenciaPn(datosAdionalesPn);


    }



    // let deshabilitar = clienteNuevoProspectoActualizar != '1' && clienteNuevoProspectoActualizar != '2' && clienteNuevoProspectoActualizar != '3'

    const onChangeInputDatosAdicionaleReferenciaLaboral = (e) => {

        const { name, value, type, checked } = e.target;

        const inputValue = type === 'checkbox' ? (checked ? 'on' : 'off') : value;

        const [nameCampo, index] = name.split('-');

        const posItem = parseInt(index, 10);

        const dataDatosAdicionales = [...referenciaLaboralAdicionalPn];

        dataDatosAdicionales[posItem] = {
            ...dataDatosAdicionales[posItem],
            [nameCampo == 'Extranjero' || nameCampo == 'Nacional' ? 'relacionDependencia' : nameCampo]: nameCampo == 'Extranjero' || nameCampo == 'Nacional' ? nameCampo : inputValue
        };

        actualizarReferenciaLaboralAdicionalPn(dataDatosAdicionales);

    }


    const agregarNuevaReferencia = () => {

        const nuevaReferencia = {
            id: Date.now(),
            nuevo: true
        }

        actualizarReferenciaLaboralAdicionalPn([...referenciaLaboralAdicionalPn, nuevaReferencia]);
    };


    const eliminarReferenciaLaboral = (id) => {

        actualizarReferenciaLaboralAdicionalPn(referenciaLaboralAdicionalPn?.filter(e => e.id !== id));
    };



    return (
        <div className="datosPersonaNatural p-6 container mx-auto">
            <form id='datosAdicionales' className="">

                <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                    <div className="flex justify-between items-center">

                        <div className='flex gap-6'>
                            <h1 className="font-bold py-3">Datos Generales Adicionales </h1>
                        </div>

                    </div>

                    <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                        <div>
                            <CampoLista
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.paisExpedicion}
                                onChangeInput={onChangeInput}
                                nameInput="datosGeneralesAdicionales.paisExpedicion"
                                placeholder="País de expedición"
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
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.departamentoExpedicion}
                                placeholder="Departameto de Expedición"
                                onChangeInput={onChangeInput}
                                nameInput="datosGeneralesAdicionales.departamentoExpedicion"
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

                        <div>

                            <CampoTexto
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.lugarExpedicion}
                                onChangeInput={onChangeInput}
                                nameInput="datosGeneralesAdicionales.lugarExpedicion"
                                placeholder="Lugar de expedición"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>

                        <div>

                            <CampoLista
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.actividadEEconomicaEmpresaDondeTrabaja}
                                onChangeInput={onChangeInput}
                                nameInput="datosGeneralesAdicionales.actividadEEconomicaEmpresaDondeTrabaja"
                                placeholder="Actividad económica de la empresa donde trabaja"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={catalogo.listActividadEconomica}
                                idLista="code"
                                descripcionList="value"

                            />
                        </div>

                        <div>

                            <CampoLista
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.tipoEmpresaDondeTrabaja}
                                onChangeInput={onChangeInput}
                                nameInput="datosGeneralesAdicionales.tipoEmpresaDondeTrabaja"
                                placeholder="Tipo de empresa donde trabaja"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={catalogo.listTiempoEmpleado}
                                idLista="code"
                                descripcionList="value"

                            />
                        </div>
                        <div>

                            <CampoLista
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.grupoEtnico}
                                onChangeInput={onChangeInput}
                                nameInput="datosGeneralesAdicionales.grupoEtnico"
                                placeholder="Grupo étnico"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={catalogo.listGrupoEtnico}
                                idLista="code"
                                descripcionList="value"

                            />
                        </div>

                        <div >
                            <CheckDesplazable
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.LGTBIQ}
                                name={'datosGeneralesAdicionales.LGTBIQ'}
                                titulo={'LGTBIQ'}
                                onclickCheck={onChangeInput}

                            />
                        </div>

                        <div>

                            <CampoLista
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.marcacionCorrespondencia}
                                onChangeInput={onChangeInput}
                                nameInput="datosGeneralesAdicionales.marcacionCorrespondencia"
                                placeholder="Marcación Correspondencia"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={catalogo.listMarcacionCorrespondencia}
                                idLista="code"
                                descripcionList="value"

                            />
                        </div>

                        <div>

                            <CampoFecha
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.fechaCorteEstadoCuenta}
                                onChangeInput={onChangeInput}
                                nameInput="datosGeneralesAdicionales.fechaCorteEstadoCuenta"
                                placeholder="Fecha de corte Estado de Cuenta"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}


                            />
                        </div>

                        <div >
                            <CheckDesplazable
                                titulo={'Recibir información celular'}
                                name={'datosGeneralesAdicionales.recibirInformacionCelular'}
                                onclickCheck={onChangeInput}
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.recibirInformacionCelular}
                            />
                        </div>

                        <div >
                            <CheckDesplazable
                                titulo={'Recibir información correo'}
                                name={'datosGeneralesAdicionales.recibirInformacionCorreo'}
                                onclickCheck={onChangeInput}
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.recibirInformacionCorreo}

                            />
                        </div>

                        <div >
                            <CheckDesplazable
                                titulo={'Datos sensibles'}
                                name={'datosGeneralesAdicionales.datosSensibles'}
                                onclickCheck={onChangeInput}
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.datosSensibles}

                            />
                        </div>


                    </div>

                    <h1 className="font-bold py-3">Productos vinculación </h1>
                    <div className='grid grid-cols-4 gap-y-2'>

                        <CheckInputRojo
                            labelText={'Cuenta de Ahorros'}
                            nameInput={'datosGeneralesAdicionales.cuentaAhorros'}
                            onChangeInput={onChangeInput}
                            valorInput={referecniaPn?.datosGeneralesAdicionales?.cuentaAhorros}

                        />
                        <CheckInputRojo
                            labelText={'Cuenta Corriente'}
                            nameInput={'datosGeneralesAdicionales.cuentaCorriente'}
                            onChangeInput={onChangeInput}
                            valorInput={referecniaPn?.datosGeneralesAdicionales?.cuentaCorriente}
                        />
                        <CheckInputRojo
                            labelText={'Tarjeta de Crédito'}
                            nameInput={'datosGeneralesAdicionales.tarjetaCredito'}
                            onChangeInput={onChangeInput}
                            valorInput={referecniaPn?.datosGeneralesAdicionales?.tarjetaCredito}
                        />
                        <CheckInputRojo
                            labelText={'Crédito Personal'}
                            nameInput={'datosGeneralesAdicionales.creditoPersonal'}
                            onChangeInput={onChangeInput}
                            valorInput={referecniaPn?.datosGeneralesAdicionales?.creditoPersonal}
                        />

                        <CheckInputRojo
                            labelText={'Crédito Hipotecario'}
                            nameInput={'datosGeneralesAdicionales.creditoHipotecario'}
                            onChangeInput={onChangeInput}
                            valorInput={referecniaPn?.datosGeneralesAdicionales?.creditoHipotecario}
                        />
                        <CheckInputRojo
                            labelText={'Seguro de Vida'}
                            nameInput={'datosGeneralesAdicionales.seguroVida'}
                            onChangeInput={onChangeInput}
                            valorInput={referecniaPn?.datosGeneralesAdicionales?.seguroVida}
                        />
                        <CheckInputRojo
                            labelText={'Inversión'}
                            nameInput={'datosGeneralesAdicionales.inversion'}
                            onChangeInput={onChangeInput}
                            valorInput={referecniaPn?.datosGeneralesAdicionales?.inversion}
                        />
                        <CheckInputRojo
                            labelText={'Pensión'}
                            nameInput={'datosGeneralesAdicionales.pension'}
                            onChangeInput={onChangeInput}
                            valorInput={referecniaPn?.datosGeneralesAdicionales?.pension}
                        />
                    </div>

                </div>
                {/* Referencia familiar */}

                <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                    <div className="flex justify-between items-center">

                        <div className='flex gap-6'>
                            <h1 className="font-bold py-3">Referencia Familiar </h1>
                        </div>

                    </div>

                    <div className={`grid grid-cols-3 gap-x-8 gap-y-4  mb-6`}>

                        <div >

                            <CampoTexto
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '219',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={referecniaPn?.referenciaFamiliar?.nombreCompleto}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.nombreCompleto"
                                placeholder="Nombre completo"

                            />
                        </div>

                        <div >

                            <CampoTexto
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '219',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={referecniaPn?.referenciaFamiliar?.primerApellido}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.primerApellido"
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
                                valorInput={referecniaPn?.referenciaFamiliar?.segundoApellido}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.segundoApellido"
                                placeholder="Segundo Apellido"

                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={referecniaPn?.referenciaFamiliar?.parentesco}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.parentesco"
                                placeholder="Parentesco"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '220',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                                lista={catalogo.listTipoParentesco}
                                idLista={'code'}
                                descripcionList={'value'}

                            />
                        </div>

                        <div >
                            <CampoLista
                                valorInput={referecniaPn?.referenciaFamiliar?.tipoIdentificacion}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.tipoIdentificacion"
                                placeholder="Tipo Identificación"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '220',
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

                            <CampoNumero
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                                valorInput={referecniaPn?.referenciaFamiliar?.numeroIdentificacion}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.numeroIdentificacion"
                                placeholder="Número de Identificación"

                            />

                        </div>


                        <div >
                            <CampoLista
                                valorInput={referecniaPn?.referenciaFamiliar?.tipoContacto}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.tipoContacto"
                                placeholder="Tipo de Contacto"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '220',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                                lista={catalogo.listTipoContacto}
                                idLista={'code'}
                                descripcionList={'value'}

                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={referecniaPn?.referenciaFamiliar?.tipoTelefono}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.tipoTelefono"
                                placeholder="Tipo de Teléfono"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '220',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                                lista={catalogo.listTipoTelefono}
                                idLista={'code'}
                                descripcionList={'value'}

                            />
                        </div>
                        <div >

                            <CampoLista
                                valorInput={referecniaPn?.referenciaFamiliar?.prefijo}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.prefijo"
                                placeholder='Prefijo'
                                lista={catalogo.listPrefijos}
                                idLista='code'
                                // descripcionPrefijo={'descripcion'}
                                descripcionList='value'
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '198',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div >
                            <CampoTelefono
                                valorInput={referecniaPn?.referenciaFamiliar?.telefono}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.telefono"
                                placeholder="Teléfono"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}

                            />
                        </div>
                    </div>

                    <SeccionFondo key={1} titulo={'Información PEP (Persona Expuesta Políticamente)'}>
                        <div className='col-span-3'>
                            <CheckDesplazable
                                titulo={'PEP Referencia'}
                                subtitulo={'Indicar si la referencia es una Persona Expuesta Políticamente'}

                                name={'referenciaFamiliar.PEPReferencia'}
                                valorInput={referecniaPn?.referenciaFamiliar?.PEPReferencia}
                                onclickCheck={onChangeInput}
                            />
                        </div>
                        {activarPepReferenciaFamiliar ? <div >

                            <CampoTexto
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '219',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={referecniaPn?.referenciaFamiliar?.funcion}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaFamiliar.funcion"
                                placeholder="Función"

                            />
                        </div> : undefined}

                        {
                            activarPepReferenciaFamiliar ? <div >

                                <CampoTexto
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '219',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={referecniaPn?.referenciaFamiliar?.nombreInstitucion}
                                    onChangeInput={onChangeInput}
                                    nameInput="referenciaFamiliar.nombreInstitucion"
                                    placeholder="Nombre de la institución"

                                />
                            </div> : undefined
                        }
                        {
                            activarPepReferenciaFamiliar ? <div>
                                <CampoTexto
                                    valorInput={referecniaPn?.referenciaFamiliar?.cargo}
                                    onChangeInput={onChangeInput}
                                    nameInput="referenciaFamiliar.cargo"
                                    placeholder="Cargo"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '193',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />
                            </div> : undefined
                        }
                        {
                            activarPepReferenciaFamiliar ? <div className="w-full">
                                <CampoFecha
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '226',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={referecniaPn?.referenciaFamiliar?.fechaInicio}
                                    onChangeInput={onChangeInput}
                                    placeholder="Fecha inicio"
                                    nameInput="referenciaFamiliar.fechaInicio"

                                />
                            </div> : undefined
                        }
                        {
                            activarPepReferenciaFamiliar ? <div className="w-full">
                                <CampoFecha
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '226',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={referecniaPn?.referenciaFamiliar?.fechaFin}
                                    onChangeInput={onChangeInput}
                                    placeholder="referenciaFamiliar.Fecha fin"
                                    nameInput="fechaFin"

                                />
                            </div> : undefined
                        }

                    </SeccionFondo>

                </div>

                {/**Referencia personal */}

                <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                    <div className="flex justify-between items-center">

                        <div className='flex gap-6'>
                            <h1 className="font-bold py-3">Referencia Personal </h1>
                        </div>

                    </div>

                    <div className={`grid grid-cols-3 gap-x-8 gap-y-4  mb-6`}>

                        <div >

                            <CampoTexto
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '219',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={referecniaPn?.referenciaPersonal?.nombreCompleto}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.nombreCompleto"
                                placeholder="Nombre completo"

                            />
                        </div>

                        <div >

                            <CampoTexto
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '219',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                valorInput={referecniaPn?.referenciaPersonal?.primerApellido}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.primerApellido"
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
                                valorInput={referecniaPn?.referenciaPersonal?.segundoApellido}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.segundoApellido"
                                placeholder="Segundo Apellido"

                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={referecniaPn?.referenciaPersonal?.parentesco}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.parentesco"
                                placeholder="Parentesco"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '220',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                                lista={catalogo.listTipoParentesco}
                                idLista={'code'}
                                descripcionList={'value'}

                            />
                        </div>

                        <div >
                            <CampoLista
                                valorInput={referecniaPn?.referenciaPersonal?.tipoIdentificacion}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.tipoIdentificacion"
                                placeholder="Tipo Identificación"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '220',
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

                            <CampoNumero
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                                valorInput={referecniaPn?.referenciaPersonal?.numeroIdentificacion}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.numeroIdentificacion"
                                placeholder="Número de Identificación"
                            />

                        </div>
                        <div >
                            <CampoLista
                                valorInput={referecniaPn?.referenciaPersonal?.tipoContacto}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.tipoContacto"
                                placeholder="Tipo de Contacto"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '220',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                                lista={catalogo.listTipoContacto}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >
                            <CampoLista
                                valorInput={referecniaPn?.referenciaPersonal?.tipoTelefono}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.tipoTelefono"
                                placeholder="Tipo de Teléfono"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '220',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                                lista={catalogo.listTipoTelefono}
                                idLista={'code'}
                                descripcionList={'value'}
                            />
                        </div>
                        <div >

                            <CampoLista
                                valorInput={referecniaPn?.referenciaPersonal?.prefijo}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.prefijo"
                                placeholder='Prefijo'
                                lista={catalogo.listPrefijos}
                                idLista='code'
                                descripcionList='code'
                                // descripcionPrefijo={'codListPrefijoPais'}

                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '198',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>
                        <div >
                            <CampoTelefono
                                valorInput={referecniaPn?.referenciaPersonal?.telefono}
                                onChangeInput={onChangeInput}
                                nameInput="referenciaPersonal.telefono"
                                placeholder="telefono"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '2000',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                                    validacionAdicional: true
                                }))}
                            />
                        </div>
                    </div>

                    <SeccionFondo key={1} titulo={'Información PEP (Persona Expuesta Políticamente)'}>
                        <div className='col-span-3'>
                            <CheckDesplazable
                                titulo={'PEP Referencia'}
                                subtitulo={'Indicar si la referencia es una Persona Expuesta Políticamente'}
                                name={'referenciaPersonal.PEPReferencia'}
                                valorInput={referecniaPn?.referenciaPersonal?.PEPReferencia}


                                onclickCheck={onChangeInput}
                            />
                        </div>
                        {
                            activarPepReferenciaPersonal ? <div >

                                <CampoTexto
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '219',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={referecniaPn?.referenciaPersonal?.funcion}
                                    onChangeInput={onChangeInput}
                                    nameInput="referenciaPersonal.funcion"
                                    placeholder="Función"

                                />
                            </div> : undefined
                        }
                        {
                            activarPepReferenciaPersonal ? <div >

                                <CampoTexto
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '219',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={referecniaPn?.referenciaPersonal?.nombreInstitucion}
                                    onChangeInput={onChangeInput}
                                    nameInput="referenciaPersonal.nombreInstitucion"
                                    placeholder="Nombre de la institución"

                                />
                            </div> : undefined
                        }
                        {
                            activarPepReferenciaPersonal ? <div>
                                <CampoTexto
                                    valorInput={referecniaPn?.referenciaPersonal?.cargo}
                                    onChangeInput={onChangeInput}
                                    nameInput="referenciaPersonal.cargo"
                                    placeholder="Cargo"
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '193',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                />
                            </div> : undefined
                        }
                        {
                            activarPepReferenciaPersonal ? <div className="w-full">
                                <CampoFecha
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '226',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={referecniaPn?.referenciaPersonal?.fechaInicio}
                                    onChangeInput={onChangeInput}
                                    placeholder="Fecha inicio"
                                    nameInput="referenciaPersonal.fechaInicio"

                                />
                            </div> : undefined
                        }
                        {
                            activarPepReferenciaPersonal ? <div className="w-full">
                                <CampoFecha
                                    validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                        id: '226',
                                        listaCamposAdministracion: dataCamposAdministacion,
                                        clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                    }))}
                                    valorInput={referecniaPn?.referenciaPersonal?.fechaFin}
                                    onChangeInput={onChangeInput}
                                    placeholder="Fecha fin"
                                    nameInput="referenciaPersonal.fechaFin"

                                />
                            </div> : undefined
                        }

                    </SeccionFondo>


                </div>

                {/**Referencia laborales */}

                <SeccionFondo nCol={1} titulo={'Referencias Laborales'} onClickButtom={() => { agregarNuevaReferencia() }} textButtom="Agregar referencia laboral">

                    {referenciaLaboralAdicionalPn.length > 0
                        ?
                        referenciaLaboralAdicionalPn?.map((item, i) => (

                            <SeccionFondo key={i + 'reflaboral'} nCol={3} titulo={`Referencia Laboral ${i + 1}`} onClickButtom={() => { eliminarReferenciaLaboral(item.id) }} textEliminar={'Eliminar'}>
                                <div className='relative -top-2'>

                                    <CampoTexto
                                        valorInput={item.profesion}
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}
                                        nameInput={"profesion-" + i}
                                        placeholder="Nombre de la Empresa"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '193',
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
                                        valorInput={item?.fechaIngreso}
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}
                                        placeholder="Fecha Ingreso"
                                        nameInput={"fechaIngreso-" + i}

                                    />
                                </div>
                                <div>
                                    <CampoFecha
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '226',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        valorInput={item?.fechaSalida}
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}
                                        placeholder="Fecha de salida"
                                        nameInput={"fechaSalida-" + i}

                                    />
                                </div>
                                <div>

                                    <CampoLista
                                        valorInput={item?.tipoContrato}
                                        placeholder="Tipo de Contrato"
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}

                                        nameInput={"tipoContrato-" + i}
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '223',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listTipoContrato}
                                        idLista="code"
                                        descripcionList="value"

                                    />
                                </div>
                                <div className='relative -top-2'>

                                    <CampoTexto
                                        valorInput={item.cargoActual}
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}

                                        nameInput={"cargoActual-" + i}
                                        placeholder="Cargo Actual"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '193',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>
                                <div>

                                    <CampoLista
                                        valorInput={item?.rol}
                                        placeholder="Rol"
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}

                                        nameInput={"rol-" + i}
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '223',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listRolEmpresa}
                                        idLista="code"
                                        descripcionList="value"

                                    />
                                </div>
                                <div>

                                    <CampoLista
                                        valorInput={item?.relacionDependenciaLaboral}
                                        placeholder="Relación de Dependencia Laboral"
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}
                                        nameInput={"relacionDependenciaLaboral-" + i}
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '223',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listDependenciaLaboral}
                                        idLista="code"
                                        descripcionList="value"

                                    />
                                </div>
                                <div>

                                    <CampoLista
                                        valorInput={item?.moneda}
                                        placeholder="Moneda"
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}
                                        nameInput={"moneda-" + i}
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '223',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listTipoMoneda}
                                        idLista="code"
                                        descripcionList="value"

                                    />
                                </div>

                                <div >

                                    <CampoMoneda
                                        valorInput={item.saldo}
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}

                                        nameInput={"saldo-" + i}
                                        placeholder="Sueldo"
                                        placeholderAux='Sueldo'
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '193',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>

                                <div >
                                    <CheckDesplazable
                                        titulo={'Existe compañía'}
                                        name={"existComp-" + i}

                                        onclickCheck={onChangeInputDatosAdicionaleReferenciaLaboral}
                                        valorInput={item.existComp}

                                    />
                                </div>
                                {
                                    item?.existComp == 'on' ?
                                        <div >

                                            <CampoTexto
                                                valorInput={item.compania}
                                                onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}
                                                nameInput={"compania-" + i}
                                                placeholder="Compañía"
                                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                                    id: '193',
                                                    listaCamposAdministracion: dataCamposAdministacion,
                                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                                }))}
                                            />
                                        </div>
                                        : undefined
                                }


                                <div >
                                    <CheckDesplazable
                                        titulo={'Empleador Verificado'}

                                        name={'emplverif-' + i}
                                        onclickCheck={onChangeInputDatosAdicionaleReferenciaLaboral}
                                        valorInput={item.emplverif}

                                    />
                                </div>
                                <div>

                                    <CampoLista
                                        valorInput={item?.vinculo}
                                        placeholder="Vínculo"
                                        onChangeInput={onChangeInputDatosAdicionaleReferenciaLaboral}
                                        nameInput={"vinculo-" + i}
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '223',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                        lista={catalogo.listTipoVinculacion}
                                        idLista="code"
                                        descripcionList="value"

                                    />
                                </div>

                            </SeccionFondo>

                        ))
                        :
                        <div className="border border-gray-200 h-32 rounded-md flex flex-col justify-center items-center">

                            <h3>No hay direcciones registradas</h3>

                            <p>{`No hay referencias laborales registradas. Haga clic en "Agregar referencia laboral" para añadir una.`}</p>

                        </div>
                    }

                </SeccionFondo>

                {/**Datos del negocio */}

                <div className="w-full px-4 mb-6 rounded-md py-6 border border-gray-200  ">
                    <div className="flex justify-between items-center">

                        <div className='flex gap-6'>
                            <h1 className="font-bold py-3">Datos del Negocio </h1>
                        </div>

                    </div>

                    <div className={`grid grid-cols-3 gap-x-8 gap-y-4 `}>

                        <div>
                            <CampoTexto
                                valorInput={referecniaPn?.datosDelNegocio?.nombreEstablecimiento}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.nombreEstablecimiento"
                                placeholder="Nombre del establecimiento"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>

                        <div>

                            <CampoLista
                                valorInput={referecniaPn?.datosDelNegocio?.tipoIdentificacionTributaria}
                                placeholder="Tipo de Identificación Tributaria"
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.tipoIdentificacionTributaria"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '223',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={catalogo.listTipoIdFiscal}
                                idLista={'code'}
                                descripcionList="value"

                            />
                        </div>

                        <div>
                            <CampoTexto
                                valorInput={referecniaPn?.datosDelNegocio?.numeroIdentificacionTributaria}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.numeroIdentificacionTributaria"
                                placeholder="Número de Identificación Tributaria"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>

                        <div>
                            <CampoTexto
                                valorInput={referecniaPn?.datosDelNegocio?.queActividad}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.queActividad"
                                placeholder="¿Qué actividad?"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>

                        <div >
                            <CheckDesplazable
                                titulo={'¿La dirección de negocio es igual al domicilio personal?'}
                                name={'datosDelNegocio.direccionNegocioIgualDomicilioPersonal'}
                                valorInput={referecniaPn?.datosDelNegocio?.direccionNegocioIgualDomicilioPersonal}
                                onclickCheck={onChangeInput}
                            />
                        </div>
                        {
                            (!activarDireccionNegocio) ?
                                <div>
                                    <CampoTexto
                                        valorInput={referecniaPn?.datosDelNegocio?.direccionDomicilio}
                                        onChangeInput={onChangeInput}
                                        nameInput="datosDelNegocio.direccionDomicilio"
                                        placeholder="Dirección"
                                        validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                            id: '195',
                                            listaCamposAdministracion: dataCamposAdministacion,
                                            clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                        }))}
                                    />
                                </div>

                                :
                                undefined
                        }


                        <div>
                            <CampoTexto
                                valorInput={referecniaPn?.datosDelNegocio?.tiempoDesempenandoActividad}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.tiempoDesempenandoActividad"
                                placeholder="Tiempo Desempeñando la Actividad (Meses)"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>

                        <div>

                            <CampoLista
                                valorInput={referecniaPn?.datosDelNegocio?.tipoEstablecimiento}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.tipoEstablecimiento"
                                placeholder="Tipo de Establecimiento"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={catalogo.listTipoEstablecimiento}
                                idLista="code"
                                descripcionList="value"

                            />
                        </div>

                        {/* <div>
                            <CampoTexto
                                valorInput={activadEconomicaPn.nombreEstablecimiento}
                                onChangeInput={onChangeInput}
                                nameInput="nombreEstablecimiento"
                                placeholder="Dirección"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div> */}

                        <div className='flex flex-col'>
                            <label className='text-gray-500' htmlFor="datosDelNegocio.horaInicio">Hora inicio</label>
                            <input
                                type="time"
                                placeholder='Hora inicio'
                                value={referecniaPn?.datosDelNegocio?.horaInicio}
                                name='datosDelNegocio.horaInicio'
                                id='datosDelNegocio.horaInicio'
                                onChange={onChangeInput}
                            />
                            {/* <CampoTexto
                                valorInput={referecniaPn?.datosDelNegocio?.horaInicio}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.horaInicio"
                                placeholder="Hora inicio"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            /> */}
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-gray-500' htmlFor="datosDelNegocio.horaInicio">Hora Fin</label>
                            <input
                                type="time"
                                placeholder='Hora inicio'
                                value={referecniaPn?.datosDelNegocio?.horaFin}
                                name='datosDelNegocio.horaFin'
                                id='datosDelNegocio.horaFin'
                                onChange={onChangeInput}
                            />
                            {/* <CampoFecha
                                valorInput={referecniaPn?.datosDelNegocio?.horaFin}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.horaFin"
                                placeholder="Hora Fin"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            /> */}
                        </div>

                        <div>

                            <CampoTexto
                                valorInput={referecniaPn?.datosDelNegocio?.quienAtiendeNegocio}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.quienAtiendeNegocio"
                                placeholder="¿Quién atiende el negocio?"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}


                            />
                        </div>
                        <div>

                            <CampoNumero
                                valorInput={referecniaPn?.datosDelNegocio?.numeroEmpleados}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.numeroEmpleados"
                                placeholder="Número de Empleados"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
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
                                valorInput={referecniaPn?.datosDelNegocio?.inicioActividades}
                                onChangeInput={onChangeInput}
                                placeholder="Inicio de Actividades"
                                nameInput="datosDelNegocio.inicioActividades"

                            />
                        </div>

                        <div>
                            <CampoTexto
                                valorInput={referecniaPn?.datosDelNegocio?.tiempoExperienciaEmpresarial}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.tiempoExperienciaEmpresarial"
                                placeholder="Tiempo de Experiencia Empresarial (Meses)"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>

                        <div>
                            <CampoTexto
                                valorInput={referecniaPn?.datosDelNegocio?.actividadNegocio}
                                onChangeInput={onChangeInput}
                                nameInput="datosDelNegocio.actividadNegocio"
                                placeholder="Actividad del Negocio"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '195',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                            />
                        </div>

                        {/* <div>

                            <CampoLista
                                valorInput={referecniaPn?.datosGeneralesAdicionales?.paisExpedicion}
                                onChangeInput={onChangeInput}
                                nameInput="lugarExpedicion"
                                placeholder="Grupo étnico"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={listCiduades}
                                idLista="codCiudad"
                                descripcionList="descripcion"

                            />
                        </div>

                        <div >
                            <CheckDesplazable titulo={'LGTBIQ'} />
                        </div>

                        <div>

                            <CampoLista
                                valorInput={datosAdicionales?.datosGeneralesAdicionales?.paisExpedicion}
                                onChangeInput={onChangeInput}
                                nameInput="lugarExpedicion"
                                placeholder="Marcación Correspondencia"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={listCiduades}
                                idLista="codCiudad"
                                descripcionList="descripcion"

                            />
                        </div>

                        <div>

                            <CampoLista
                                valorInput={datosAdicionales?.datosGeneralesAdicionales?.paisExpedicion}
                                onChangeInput={onChangeInput}
                                nameInput="lugarExpedicion"
                                placeholder="Fecha de corte Estado de Cuenta"
                                validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                    id: '227',
                                    listaCamposAdministracion: dataCamposAdministacion,
                                    clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                                }))}
                                lista={listCiduades}
                                idLista="codCiudad"
                                descripcionList="descripcion"

                            />
                        </div>

                        <div >
                            <CheckDesplazable titulo={'Recibir información celular'} />
                        </div>

                        <div >
                            <CheckDesplazable titulo={'Recibir información correo'} />
                        </div>

                        <div >
                            <CheckDesplazable titulo={'Datos sensibles'} />
                        </div> */}


                    </div>

                    <h1 className="font-bold py-3">¿Cuáles son los días de atención? </h1>
                    <div className='grid grid-cols-4 gap-y-2'>

                        <CheckInputRojo
                            labelText={'Lunes'}
                            nameInput={'datosDelNegocio.lunes'}
                            valorInput={referecniaPn?.datosDelNegocio?.lunes}
                            onChangeInput={onChangeInput}
                        />
                        <CheckInputRojo
                            labelText={'Martes'}
                            nameInput={'datosDelNegocio.martes'}
                            valorInput={referecniaPn?.datosDelNegocio?.martes}
                            onChangeInput={onChangeInput}
                        />
                        <CheckInputRojo
                            labelText={'Miercoles'}
                            nameInput={'datosDelNegocio.miercoles'}
                            valorInput={referecniaPn?.datosDelNegocio?.miercoles}
                            onChangeInput={onChangeInput}
                        />
                        <CheckInputRojo
                            labelText={'Jueves'}
                            nameInput={'datosDelNegocio.jueves'}
                            valorInput={referecniaPn?.datosDelNegocio?.jueves}
                            onChangeInput={onChangeInput}
                        />

                        <CheckInputRojo
                            labelText={'Viernes'}
                            nameInput={'datosDelNegocio.viernes'}
                            valorInput={referecniaPn?.datosDelNegocio?.viernes}
                            onChangeInput={onChangeInput}
                        />
                        <CheckInputRojo
                            labelText={'Sábado'}
                            nameInput={'datosDelNegocio.sabado'}
                            valorInput={referecniaPn?.datosDelNegocio?.sabado}
                            onChangeInput={onChangeInput}
                        />
                        <CheckInputRojo
                            labelText={'Domingo'}
                            nameInput={'datosDelNegocio.domingo'}
                            valorInput={referecniaPn?.datosDelNegocio?.domingo}
                            onChangeInput={onChangeInput}
                        />
                        {/* <CheckInputRojo labelText={'Pensión'} /> */}
                    </div>





                </div>

                {/**anterior */}

                <hr />
                {/* <h1>Campos sin utilizar diseño viejo </h1> */}
                {/* <div className='grid grid-cols-4 gap-x-5 col-span-4'>
                    <div className='relative -top-2'>

                        <CampoTexto
                            valorInput={activadEconomicaPn.profesion}
                            onChangeInput={onChangeInput}
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
                            onChangeInput={onChangeInput}
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


                    </div>
                </div> */}

                {/* <div className='grid grid-cols-4 gap-x-5 col-span-4'>
                    <div>
                        <CampoLista
                            valorInput={activadEconomicaPn.departamentoEstablecimiento}
                            onChangeInput={onChangeInput}
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
                            onChangeInput={onChangeInput}
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

                        <CampoTelefono
                            valorInput={activadEconomicaPn.telefono}
                            onChangeInput={onChangeInput}
                            placeholder="Teléfono"
                            nameInput="telefono"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '199',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div> */}
                {/* <div className='grid grid-cols-5 gap-x-4 col-span-4'>
                    <div>

                        <div className=''>
                            <CampoLista
                                valorInput={activadEconomicaPn.codDireccion}
                                onChangeInput={onChangeInput}
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
                            onChangeInput={onChangeInput}
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
                            onChangeInput={onChangeInput}
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
                            onChangeInput={onChangeInput}
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
                            onChangeInput={onChangeInput}
                            nameInput="referenciaUbicacion"
                            placeholder="Referencia Ubicación"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '193',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>
                </div> */}
                {/* <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    <div>

                        <div className=''>
                            <CampoLista
                                valorInput={activadEconomicaPn.CIIU}
                                onChangeInput={onChangeInput}
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
                                onChangeInput={onChangeInput}
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
                                onChangeInput={onChangeInput}
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
                                onChangeInput={onChangeInput}
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
                </div> */}
                {/* <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    <div>

                        <CampoMoneda
                            valorInput={activadEconomicaPn.ventasbrutas}
                            onChangeInput={onChangeInput}
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
                            onChangeInput={onChangeInput}
                            nameInput="fuentePrincipalIngreso"
                            placeholder="Fuente Principal de ingresos"
                            validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                                id: '203',
                                listaCamposAdministracion: dataCamposAdministacion,
                                clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                            }))}
                        />
                    </div>


                </div> */}
                {

                    // detalleActivadEconomicaPn.map((item, i) => {

                    //     return i == elementoActivo &&
                    //         < >
                    //             <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    //                 <div className='col-span-2'>

                    //                     <CampoTexto
                    //                         valorInput={item?.claseBalance}
                    //                         onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                         nameInput={"claseBalance-" + i}
                    //                         placeholder="Clase de balance"
                    //                         validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                             id: '206',
                    //                             listaCamposAdministracion: dataCamposAdministacion,
                    //                             clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                         }))}
                    //                     />
                    //                 </div>
                    //                 <div className='col-span-2'>

                    //                     <div>
                    //                         <CampoLista
                    //                             valorInput={item?.tipoBalance}
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"tipoBalance-" + i}

                    //                             lista={listaTipoBalance}
                    //                             idLista='codTipoBalance'
                    //                             descripcionList='descripcion'
                    //                             placeholder='Tipo de balance (depende de lo definido en la planilla)'
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '205',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>

                    //             <div className='grid grid-cols-2 gap-x-4 col-span-4'>
                    //                 <div>

                    //                     <div>
                    //                         <CampoLista
                    //                             placeholder='Fecha de corte (Periodo)'

                    //                             valorInput={item?.FechaCorte}
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"FechaCorte-" + i}

                    //                             lista={listaPeriodos}
                    //                             idLista='idListPeriodos'
                    //                             descripcionList='Periodos'
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '207',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar,
                    //                                 validacionAdicional: false

                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>

                    //             <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    //                 <div>
                    //                     <div>
                    //                         <CampoMoneda
                    //                             valorInput={
                    //                                 item?.ingresoAnual
                    //                             }
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"ingresoAnual-" + i}

                    //                             placeholder='Ingresos Mensuales'
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '193',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //             <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    //                 <div>

                    //                     <div>
                    //                         <CampoMoneda
                    //                             valorInput={item?.ingresoPGJ
                    //                             }
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"ingresoPGJ-" + i}

                    //                             placeholder='PGJ/Ingresos'
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '208',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //             <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    //                 <div>

                    //                     <div>
                    //                         <CampoMoneda
                    //                             valorInput={item?.egresoPGJ
                    //                             }
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"egresoPGJ-" + i}

                    //                             placeholder='PGJ/Egresos'
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '209',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //             <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    //                 <div>

                    //                     <div>
                    //                         <CampoMoneda
                    //                             valorInput={item?.activosBGJ
                    //                             }
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"activosBGJ-" + i}

                    //                             placeholder='BGJ/Activos'
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '212',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //             <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    //                 <div>

                    //                     <div>
                    //                         <CampoMoneda
                    //                             valorInput={item?.activos
                    //                             }
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"activos-" + i}

                    //                             placeholder='Activos'
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '213',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //             <div className='grid grid-cols-4 gap-x-4 col-span-4'>


                    //                 <div>
                    //                     {/* <p className="mb-1"></p> */}
                    //                     <div>
                    //                         <CampoMoneda
                    //                             valorInput={item?.pasivosBGJ
                    //                             }
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"pasivosBGJ-" + i}

                    //                             placeholder='BGJ/Pasivos '
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '214',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>

                    //             <div className='grid grid-cols-4 gap-x-4 col-span-4'>
                    //                 <div>


                    //                     <div>
                    //                         <CampoMoneda
                    //                             valorInput={
                    //                                 item?.PatrimonioBGJ
                    //                             }
                    //                             onChangeInput={onChangeInputActividadEconomicaDetalle}
                    //                             nameInput={"PatrimonioBGJ-" + i}

                    //                             placeholder='BGJ/Patrimonio'
                    //                             validacionRequeridoEditable={(objectoValidarCampoAdministracion({
                    //                                 id: '215',
                    //                                 listaCamposAdministracion: dataCamposAdministacion,
                    //                                 clienteNuevoProspectoActualizar: clienteNuevoProspectoActualizar
                    //                             }))}
                    //                         />
                    //                     </div>
                    //                 </div>
                    //             </div>

                    //         </>
                    // })
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

            {/* <ButtomValidarCcNit /> */}
        </div>
    )
}

