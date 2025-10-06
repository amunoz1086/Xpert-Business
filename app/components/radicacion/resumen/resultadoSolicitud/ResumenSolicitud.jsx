import { conversionPesos } from "@/app/lib/utils";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// import { DataContext } from "@/app/provider/Providers"
// import { useContext } from "react"

const DynamicModal = dynamic(() => import("../../../share/Modals"), { ssr: false });
const tablaEncabezado = ['', '', '', '']

const ResumenSolicitud = ({ resultadoKnime, reciprocidadResumen }) => {

    const [messageAlert, setMessageAlert] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        activarModal();
    }, []);

    const endModal = () => {
        showModal && setShowModal(false);
    };

    const activarModal = () => {
        if (resultadoKnime.STATUS === 99) {
            setMessageAlert("Operación excede parámetros financieros");
            setShowModal(true);
        };
    };

    // const { reciprocidadResumen } = useContext(DataContext)
    const dataMotor = reciprocidadResumen?.resultadoResumenMotor
    const costoIntMax = resultadoKnime?.POR_COSTO_INTEGRAL_Max || dataMotor?.POR_COSTO_INTEGRAL_Max || 0
    const costoIntEa = resultadoKnime?.PORC_COSTO_INTEGRAL || dataMotor?.PORC_COSTO_INTEGRAL || 0

    const bodyTable = [
        {
            id: 1,
            desc1: "Costo Int Max EA %",
            porcentajea: conversionPesos({ valor: costoIntMax < 0 ? 0 : costoIntMax, nDecimales: 2, style: "percent" }),
            desc2: "Costo Int EA %",
            porcentajeb: conversionPesos({ valor: costoIntEa < 0 ? 0 : costoIntEa, nDecimales: 2, style: "percent" }),
        },
        {
            id: 2,
            desc1: "Rentabilidad Min",
            porcentajea: conversionPesos({ valor: dataMotor?.PORC_ROA_MINIMO || resultadoKnime?.PORC_ROA_MINIMO || 0, nDecimales: 2, style: "percent" }),
            desc2: "Rentabilidad Real %",
            porcentajeb: conversionPesos({ valor: resultadoKnime?.PORC_ROA_EA || dataMotor?.PORC_ROA_EA || 0, nDecimales: 2, style: "percent" })
        }
    ];


    return (
        <>

            {showModal && (
                <DynamicModal
                    titulo={"Notificación"}
                    mostrarModal={endModal}
                    ocultarBtnCancelar={true}
                    textBtnContinuar="Ok"
                    mostrarImagneFondo={true}
                >
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">
                        {messageAlert}
                    </p>
                </DynamicModal>
            )}

            <div className="container w-full">
                <fieldset className="border bg-white shadow-md rounded-md w-full">
                    <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
                        <h4 className="text-coomeva_color-rojo mt-4 text-sm font-semibold  text-center">RESULTADO DE LA SOLICITUD</h4>
                    </legend>
                    <div>
                        <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                            <thead className="bg-coomeva_color-grisPestaña2">
                                <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                    {tablaEncabezado?.map((head, i) => (
                                        <th className={`align-bottom text-start px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} key={i} ></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bodyTable?.map((servicio, i) => (
                                        <tr key={servicio.id} id={servicio.id} className={`text-[#002E49] text-left font-semibold ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`}>
                                            <td className="text-coomeva_color-rojo">
                                                {servicio.desc1}
                                            </td>
                                            <td>
                                                {servicio.porcentajea}
                                            </td>
                                            <td className="text-coomeva_color-rojo">
                                                {servicio.desc2}
                                            </td>
                                            <td>
                                                {servicio.porcentajeb}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default ResumenSolicitud