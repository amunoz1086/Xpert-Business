'use client'
import CheckInput from "@/app/components/share/CheckInput";
import CheckInputEntes from "@/app/components/share/CheckInputEntes";
import { useState } from "react";


const ResumenSolicitudEntes = ({ titulo, estilo = { class: '' }, entes = { gerencia: false, vprecidencia: false, presidencia: false, junta: false } }) => {

    const [checkBoxState, setCheckBoxState] = useState(entes)
    const onChangeInput = (e) => {
        setCheckBoxState(
            {
                gerencia: false,
                vprecidencia: false,
                presidencia: false,
                junta: false,
                [e.target.name]: true
            }
        )
    }

    return (
        <div className="container w-full  mx-6 my-8 ">

            <h2 className={`mx-6 ${estilo.class}`}>{titulo}</h2>
            <div className="flex justify-evenly items-center  w-[100%] mt-6">
                <CheckInputEntes
                    id={'gerencia'}
                    onChangeInput={onChangeInput}
                    stateCheck={entes.gerencia || checkBoxState.gerencia}
                    labelText={'Gerencia regional'}
                    style={"font-normal text-sm text-coomeva_color-azulClaro"}
                    bgCheck={"bg-coomeva_color-azulClaro"}
                    enable={true}
                />
                <CheckInputEntes
                    id={'vprecidencia'}
                    onChangeInput={onChangeInput}
                    stateCheck={entes.vprecidencia || checkBoxState.vprecidencia}
                    labelText={'Vicepresidencia'}
                    style={"font-normal text-sm text-coomeva_color-azulClaro"}
                    bgCheck={'bg-coomeva_color-azulClaro'}
                    enable={true}

                />

                <CheckInputEntes
                    id={'presidencia'}
                    onChangeInput={onChangeInput}
                    stateCheck={entes.presidencia || checkBoxState.presidencia}
                    labelText={'Presidencia'}
                    style={"font-normal text-sm text-coomeva_color-azulClaro"}
                    bgCheck={'bg-coomeva_color-azulClaro'}
                    enable={true}
                />

                <CheckInputEntes
                    id={'junta'}
                    onChangeInput={onChangeInput}
                    stateCheck={entes.junta || checkBoxState.junta}
                    labelText={'Junta Directiva'}
                    style={"font-normal text-sm text-coomeva_color-azulClaro"}
                    bgCheck={'bg-coomeva_color-azulClaro'}
                    enable={true}
                />
            </div>
        </div>
    )
}

export default ResumenSolicitudEntes

