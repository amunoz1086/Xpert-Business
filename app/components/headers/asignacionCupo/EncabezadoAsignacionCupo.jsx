import TituloSubtituloBotonesDesplasamiento from "./TituloSubtituloBotonesDesplasamiento";
import FormSearch from "./FormSearch";
//import { cookies } from "next/headers";


export default function EncabezadoAsignacionCupo({ urlImage, title, subtitle, paragraph, enableInput = { input1: false },
  btnConsultar, perfilActivo, onBuscar }) {

  const backgroundImage = `url(/headers/${urlImage || 'cabecera1'}.webp )`;

  return (
    <div className="flex w-full h-48 justify-center items-center mb-6">
      <header
        className="flex bg-coomeva_color-azulOscuro justify-center items-center w-[100%] h-[100%] rounded-lg"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section className="flex flex-col w-[96%] h-[90%]">
          <TituloSubtituloBotonesDesplasamiento title={title} subtitle={subtitle} paragraph={paragraph} perfilActivo={perfilActivo} />
          <div className="flex justify-start  items-center  w-[100%] h-[60%]">

            <FormSearch
              btnConsultar={btnConsultar}
              enableInput={enableInput}
              //listTipoDocumentId={listTipoDocumentId}
              //enableListDoc={enableListDoc}
              onBuscar={onBuscar}
            />

          </div>
        </section>
      </header>
    </div>
  )
}