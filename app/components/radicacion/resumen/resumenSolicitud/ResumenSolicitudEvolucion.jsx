'use client'
import CheckInput from "@/app/components/share/CheckInput";
import { useState } from "react";

const ResumenSolicitudEvolucion = ({ titulo, estilo = { class: '' },
    EvolucionParam = { cvPago: false, cvRecaudo: false, svFinanciero: false } }) => {

    const [checkBoxState, setCheckBoxState] = useState(EvolucionParam);
    const onChangeInput = (e) => {
        setCheckBoxState(
            {
                cvPago: false,
                cvRecaudo: false,
                svFinanciero: false,
                [e.target.name]: true
            }
        )
    };

    return (
        <div className="container w-full   mx-6 my-8">
            <h2 className={`mx-6 ${estilo.class}`}>{titulo}</h2>
            <div className="flex justify-evenly items-center  w-[100%] mt-6">
                <CheckInput
                    id={'cvPago'}
                    onChangeInput={onChangeInput}
                    stateCheck={checkBoxState.cvPago}
                    style={"font-normal text-sm text-coomeva_color-azulClaro"}
                    labelText={'Convenio de pago'}
                    bgCheck={'bg-coomeva_color-azulClaro'}
                />
                <CheckInput
                    id={'cvRecaudo'}
                    onChangeInput={onChangeInput}
                    stateCheck={checkBoxState.cvRecaudo}
                    labelText={'Convenio recaudo'}
                    style={" font-normal text-sm text-coomeva_color-azulClaro "}
                    bgCheck={'bg-coomeva_color-azulClaro'}
                    className="pointer-events-none"
                />

                <CheckInput
                    id={'svFinanciero'}
                    onChangeInput={onChangeInput}
                    stateCheck={checkBoxState.svFinanciero}
                    labelText={'Servicios financieros'}
                    style={"font-normal text-sm text-coomeva_color-azulClaro"}
                    bgCheck={''}
                />
            </div>
        </div>
    )
};

export default ResumenSolicitudEvolucion;