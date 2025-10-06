//import EncabezadoMenuPrincipal from "@/app/components/headers/EncabezadoMenuPrincipal";
//import Captacion from "@/app/components/radicacion/cliente/Captacion";
//import Cartera from "@/app/components/radicacion/cliente/Cartera";
//import Cupo from "@/app/components/radicacion/cliente/Cupo";
//import PerfilCliente from "@/app/components/radicacion/cliente/PerfilCliente";
//import TipoConvenio from "@/app/components/radicacion/cliente/TipoConvenio";
import ControlBotonesCliente from "@/app/components/radicacion/cliente/ControlBotonesCliente";
//import { Suspense } from "react";
//import { PerfilCLienteSkeleton } from "@/app/components/skeletons";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import EncabezadoRadicacionClientes from "@/app/components/headers/radicacionClientes/EncabezadoRadicacionClientes";
import { DatosPersonaNatural } from "@/app/components/radicacionCliente/pn/DatosPersonaNatural";
import TabsBarSeleccionado from "@/app/components/radicacionCliente/TabsBarSeleccionado";
import { ProductosAlCorte } from "@/app/components/radicacionCliente/ProductosAlCorte";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
import { ButtomUsuarioProspetcto } from "@/app/components/share/ButtomUsuarioProspetcto";
import { ResidenciaFiscalPn } from "@/app/components/radicacionCliente/pn/ResidenciaFiscalPn";
import { queryListarSiNo, queryListarTipoId } from "@/app/lib/admin/querys/listas";
import { queryListCIIU, queryListCiudades, queryListDepartamentos, queryListDireccion, queryListEstadoCivil, queryListPaises, queryListSexo } from "@/app/lib/menuPrincipal/actions";

export default async function Radicacion() {


    const perfilCliente = cookies().get('perfilCliente')?.value;
    const headersList = headers();
    const referer = headersList.get('referer');
    if (referer == null) { redirect('/login/perfil') };

    const rolActivo = cookies().get('rol')?.value;

    if (rolActivo !== 2) return redirect('/login/perfil')
    if ((rolActivo) === undefined || (rolActivo) === '') redirect('/login/perfil')

    const contextRadClient = useProviderRadClient;
    const listTipoDocumento = JSON.parse(await queryListarTipoId());
    const listPais = JSON.parse(await queryListPaises());
    const listDepartemento = JSON.parse(await queryListDepartamentos());
    const listCiudades = JSON.parse(await queryListCiudades());
    const listDireccion = JSON.parse(await queryListDireccion());
    const listSiNo = JSON.parse(await queryListarSiNo());
    const listEstadoCivil = JSON.parse(await queryListEstadoCivil());
    const listSexo = JSON.parse(await queryListSexo());
    const listCIIU = JSON.parse(await queryListCIIU());


    return <section className=" w-full  sm:inline  md:w-[95%]  lg:w-[100%]">

        <EncabezadoRadicacionClientes
            urlImage={'cabecera3'}
            title={'MENÚ'}
            subtitle={'Principal'}
            paragraph={'Digite el ID del cliente para consultar su información. Puede registrar un nuevo cliente, actualizar los datos de uno existente o iniciar una solicitud de precio preferencial'}
            enableInput={{ "input1": true, "input2": true }}
            enableListDoc={true}
            btnConsultar={true}
            btnNuevo={true}
            iconSearch={true}
            perfilActivo={rolActivo}
            perfilCliente={perfilCliente}
        />

        <main className="flex-grow">
            <TabsBarSeleccionado contextRadClient={contextRadClient} />
            <div className={`border-2 w-full py-4 bg-white border-coomeva_color-grisPestaña2 rounded-lg`}>

                <div className="flex justify-between items-start mb-6 px-8 mt-2">
                    <h1 className="text-xl  text-coomeva_color-grisClaroBordes">Datos Generales Persona Natural</h1>
                    <ButtomUsuarioProspetcto contextRadClient={contextRadClient} />
                </div>
                <section className="flex flex-row">
                    <div className=" w-full px-2 py-1">
                        <DatosPersonaNatural
                            contextRadClient={contextRadClient}

                            listTipoDocumento={listTipoDocumento.STATUS == 200 ? listTipoDocumento.DATA : []}
                            listPaises={listPais.STATUS == 200 ? listPais.DATA : []}
                            listDepartamentos={listDepartemento.STATUS == 200 ? listDepartemento.DATA : []}
                            listCiduades={listCiudades.STATUS == 200 ? listCiudades.DATA : []}
                            listDirecciones={listDireccion.STATUS == 200 ? listDireccion.DATA : []}
                            listSiNo={listSiNo.STATUS == 200 ? listSiNo.DATA : []}
                            listEstadoCivil={listEstadoCivil.STATUS == 200 ? listEstadoCivil.DATA : []}
                            listSexo={listSexo.STATUS == 200 ? listSexo.DATA : []}

                        />

                    </div>


                </section>

                <div className="flex justify-between items-start mb-6 px-8">
                    <h1 className="text-xl font-bold text-coomeva_color-grisClaroBordes">Residencia fiscal</h1>
                </div>

                <div className="mb-6">
                    <ResidenciaFiscalPn contextRadClient={contextRadClient} />
                </div>

            </div>

            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>
                <ControlBotonesCliente mostrarBtnRadCliente={true} />
            </section>

            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>

                <ProductosAlCorte
                    marginTop="12"
                    titulo={'Créditos'}
                    keyObjectBodyId={'cod_body'}
                    keyObjectoHead={
                        {
                            id: 'id',
                            descripcion: 'descripcion'
                        }
                    }
                    keyObjectoBody={[
                        'descripcion1',
                        'descripcion2',
                        'descripcion3',
                        'descripcion4',
                        'descripcion5',
                        'descripcion6',
                        'descripcion7',
                        'descripcion8',
                        'descripcion9',
                    ]
                    }
                    headTable={
                        [
                            {
                                id: 1,
                                descripcion: 'Linea'
                            },
                            {
                                id: 2,
                                descripcion: 'Monto'
                            },
                            {
                                id: 3,
                                descripcion: 'Saldo'
                            },
                            {
                                id: 4,
                                descripcion: 'Tipo Tasa'
                            },
                            {
                                id: 5,
                                descripcion: 'Spread'
                            }, {
                                id: 6,
                                descripcion: 'Fecha inicial'
                            }, {
                                id: 7,
                                descripcion: 'Plazo'
                            }, {
                                id: 8,
                                descripcion: 'Calificación'
                            }, {
                                id: 9,
                                descripcion: 'Garantía'
                            },


                        ]
                    }
                    bodyTable={
                        [
                            {
                                cod_body: 1,
                                descripcion1: 'Cupo',
                                descripcion2: '0',
                                descripcion3: '0',
                                descripcion4: 'IBR',
                                descripcion5: '0',
                                descripcion6: '',
                                descripcion7: '0',
                                descripcion8: 'A',
                                descripcion9: 'FNG',

                            },
                            {
                                cod_body: 2,
                                descripcion1: 'Utilización 1',
                                descripcion2: '0',
                                descripcion3: '0',
                                descripcion4: 'IBR',
                                descripcion5: '0',
                                descripcion6: '',
                                descripcion7: '0',
                                descripcion8: 'A',
                                descripcion9: 'FNG',

                            },
                            {
                                cod_body: 3,
                                descripcion1: 'Utilización 2',
                                descripcion2: '0',
                                descripcion3: '0',
                                descripcion4: 'IBR',
                                descripcion5: '0',
                                descripcion6: '',
                                descripcion7: '0',
                                descripcion8: 'A',
                                descripcion9: 'FNG',

                            },
                            {
                                cod_body: 4,
                                descripcion1: 'Utilización 3',
                                descripcion2: '0',
                                descripcion3: '0',
                                descripcion4: 'IBR',
                                descripcion5: '0',
                                descripcion6: '',
                                descripcion7: '0',
                                descripcion8: 'A',
                                descripcion9: 'FNG',

                            },
                            {
                                cod_body: 5,
                                descripcion1: 'Tesoreria',
                                descripcion2: '0',
                                descripcion3: '0',
                                descripcion4: 'IBR',
                                descripcion5: '0',
                                descripcion6: '',
                                descripcion7: '0',
                                descripcion8: 'A',
                                descripcion9: 'FNG',

                            },



                        ]
                    }
                />
            </section>

            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>

                <ProductosAlCorte
                    marginTop="12"
                    titulo={'Créditos'}
                    keyObjectBodyId={'cod_body'}
                    keyObjectoHead={
                        {
                            id: 'id',
                            descripcion: 'descripcion'
                        }
                    }
                    keyObjectoBody={[
                        'descripcion1',
                        'descripcion2',
                        'descripcion3',
                        'descripcion4',
                        'descripcion5',

                    ]
                    }
                    headTable={
                        [
                            {
                                id: 1,
                                descripcion: 'Cuenta'
                            },
                            {
                                id: 2,
                                descripcion: 'Tipo'
                            },
                            {
                                id: 3,
                                descripcion: 'Fecha Inicial'
                            },
                            {
                                id: 4,
                                descripcion: 'Tipo EA'
                            },
                            {
                                id: 5,
                                descripcion: 'Saldo'
                            }


                        ]
                    }
                    bodyTable={
                        [
                            {
                                cod_body: 1,
                                descripcion1: '',
                                descripcion2: 'Ahorro',
                                descripcion3: '',
                                descripcion4: '%',
                                descripcion5: '$',


                            },
                            {
                                cod_body: 2,
                                descripcion1: '',
                                descripcion2: 'Ahorro',
                                descripcion3: '',
                                descripcion4: '%',
                                descripcion5: '$',


                            },
                            {
                                cod_body: 3,
                                descripcion1: '',
                                descripcion2: 'Ahorro',
                                descripcion3: '',
                                descripcion4: '%',
                                descripcion5: '$',


                            },




                        ]
                    }
                />

            </section>


            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>
                <ProductosAlCorte
                    marginTop="12"
                    titulo={'CDT'}
                    keyObjectBodyId={'cod_body'}
                    keyObjectoHead={
                        {
                            id: 'id',
                            descripcion: 'descripcion'
                        }
                    }
                    keyObjectoBody={[
                        'descripcion1',
                        'descripcion2',
                        'descripcion3',
                        'descripcion4',
                        'descripcion5',
                        'descripcion6',

                    ]
                    }
                    headTable={
                        [
                            {
                                id: 1,
                                descripcion: 'Titulo'
                            },
                            {
                                id: 2,
                                descripcion: 'Monto'
                            },
                            {
                                id: 3,
                                descripcion: 'Fecha Inicial'
                            },
                            {
                                id: 4,
                                descripcion: 'Fecha fin'
                            },
                            {
                                id: 5,
                                descripcion: 'Tasa EA'
                            }, {
                                id: 6,
                                descripcion: 'Rango'
                            }


                        ]
                    }
                    bodyTable={
                        [
                            {
                                cod_body: 1,
                                descripcion1: '1234',
                                descripcion2: '$0',
                                descripcion3: '',
                                descripcion4: '',
                                descripcion5: '%',
                                descripcion6: '0'


                            },
                            {
                                cod_body: 2,
                                descripcion1: '1234',
                                descripcion2: '$0',
                                descripcion3: '',
                                descripcion4: '',
                                descripcion5: '%',
                                descripcion6: '0'


                            },
                            {
                                cod_body: 3,
                                descripcion1: '1234',
                                descripcion2: '$0',
                                descripcion3: '',
                                descripcion4: '',
                                descripcion5: '%',
                                descripcion6: '0'


                            },




                        ]
                    }
                />
            </section>


            <section className=' w-full my-4 flex flex-row  pr-2 mt-8'>
                <ProductosAlCorte
                    marginTop="12"
                    titulo={'Convenio Actual'}
                    keyObjectBodyId={'cod_body'}
                    keyObjectoHead={
                        {
                            id: 'id',
                            descripcion: 'descripcion'
                        }
                    }
                    keyObjectoBody={[
                        'descripcion1',
                        'descripcion2',
                        'descripcion3',
                        'descripcion4',


                    ]
                    }
                    headTable={
                        [
                            {
                                id: 1,
                                descripcion: 'Servicio'
                            },
                            {
                                id: 2,
                                descripcion: 'Unidad'
                            },
                            {
                                id: 3,
                                descripcion: 'Cantidad'
                            },
                            {
                                id: 4,
                                descripcion: 'Tarifa'
                            },


                        ]
                    }
                    bodyTable={
                        [
                            {
                                cod_body: 1,
                                descripcion1: 'Retiro Cajero Red 1',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',
                            },
                            {
                                cod_body: 2,
                                descripcion1: 'Retiro Cajero Red 2',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',


                            },
                            {
                                cod_body: 3,
                                descripcion1: 'Consignación Cajero Red 1',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            },
                            {
                                cod_body: 4,
                                descripcion1: 'Consignación Cajero Red 2',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            },
                            {
                                cod_body: 5,
                                descripcion1: 'Transferencia interna',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            },
                            {
                                cod_body: 6,
                                descripcion1: 'ACH',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            },
                            {
                                cod_body: 7,
                                descripcion1: 'Sebra',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            },
                            {
                                cod_body: 8,
                                descripcion1: 'Transfiya',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            },
                            {
                                cod_body: 9,
                                descripcion1: 'Oficinas Coop.',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            },
                            {
                                cod_body: 10,
                                descripcion1: 'Portal de pago',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            },
                            {
                                cod_body: 11,
                                descripcion1: 'Web service',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            }
                            ,
                            {
                                cod_body: 13,
                                descripcion1: 'Corresponsales',
                                descripcion2: 'Por empleado / mes',
                                descripcion3: 'Ilimitado',
                                descripcion4: '$0',

                            }




                        ]
                    }
                />
            </section>



        </main>
    </section>
}