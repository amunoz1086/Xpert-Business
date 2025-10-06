'use client'

import LinkHomeAtras from "./LinkHomeAtras"



export default function InformacionMenuPrincipal({ title, subtitle, paragraph, perfilActivo }) {



    return (
        <div id="contenedorSeccion" className="w-[100%] h-[40%] flex">
            <div id="informacionPricipal" className=" flex w-[100%] h-[100%] ">
                <div
                    id="logo"
                    className="flex items-center md:w-[8%] lg:w-[6%]" /* hidden */
                    /* style={{ display: "flex", alignItems: "center" }} */
                >
                    <img width={30} height={20} src="/logos/logoblanco.svg" className='w-full h-full' alt="logo Bancoomeva"/>
                </div>
                <div
                    id="contLogo"
                    /* style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                    }} */
                    className="flex items-start flex-col md:w-[6%] lg:w-[10%] " /* hidden */
                >
                    <h1 className="w-auto h-auto text-[#FFFFFF] font-bold text-sm">{title} </h1>
                    <p className="w-auto h-auto text-[#FFFFFF] text-sm">{subtitle} </p>
                </div>

                {
                    paragraph ?
                        <div
                            id="parrafo"
                            className="sm:block md:w-[70%] lg:w-[37%] " /* hidden */
                        >
                            <p className="sm:block text-xs text-justify text-[#FFFFFF] w-[90%]  h-auto font-roboto"> {/* hidden */}
                                {paragraph}
                            </p>
                        </div>
                        : null
                }
            </div>
            <LinkHomeAtras perfilActivo={perfilActivo} />
        </div>
    )
}
