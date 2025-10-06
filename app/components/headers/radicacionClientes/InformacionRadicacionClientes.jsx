'use client'
import Image from "next/image";
import LinkHomeAtras from "./LinkHomeAtrasRadicacionClientes"
import { useConvenioServicio } from "@/app/hooks/useConvenioServicio";
import LinkHomeAtrasRadicacionClientes from "./LinkHomeAtrasRadicacionClientes";



export default function InformacionRadicacionClientes({ title, subtitle, paragraph, perfilActivo }) {


    return (
        <div id="contenedorSeccion" className="w-[100%] h-[40%] flex">
            <div id="informacionPricipal" className=" flex w-[100%] h-[100%] ">
                <div
                    id="logo"
                    className="hidden md:w-[8%] lg:w-[6%]"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <Image width={30} height={20} src="/logos/logoblanco.svg" priority className='w-full h-full' alt="logo Bancoomeva"></Image>
                </div>
                <div
                    id="contLogo"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                    }}
                    className="hidden md:w-[6%] lg:w-[10%] "
                >
                    <h1 className="w-auto h-auto text-[#FFFFFF] font-bold text-sm">{title} </h1>
                    <p className="w-auto h-auto text-[#FFFFFF] text-sm">{subtitle} </p>
                </div>

                {
                    paragraph ?
                        <div
                            id="parrafo"
                            className="hidden sm:block md:w-[70%] lg:w-[60%] "
                        >
                            <p className="hidden sm:block text-xs text-justify text-[#FFFFFF] w-[90%]  h-auto font-roboto">
                                {paragraph}
                            </p>
                        </div>
                        : null
                }
            </div>
            <LinkHomeAtrasRadicacionClientes perfilActivo={perfilActivo} />
        </div>
    )
}
