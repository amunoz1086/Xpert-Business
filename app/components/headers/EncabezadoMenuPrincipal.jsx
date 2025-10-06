import { HiSearch } from "react-icons/hi";
import FormSearch from "./FormSearch";
import InformacionMenuPrincipal from "./InformacionMenuPrincipal";
import { queryListarTipoId } from "@/app/lib/admin/querys/listas";
import React from "react";

export default async function EncabezadoMenuPrincipal({
  urlImage, title, subtitle, paragraph, paragraph2, enableInput = { input1: false, input2: false, input3: false },
  btnNuevo, btnConsultar, iconSearch, convenioNegociar, tipoConv, enableListDoc, enableInputActividad, tipoConsulta,
  placeholderBuscarDocumento, perfilActivo

}) {

  const listTipoDocumentId = enableListDoc ? await queryListarTipoId() : []
  const backgroundImage = urlImage || 'cabecera1'

  return (
    <div className="flex w-full h-48 justify-center items-center mb-6">
      <header
        className={`flex justify-center items-center  w-[100%] h-[100%] rounded-lg  bg-cover bg-center `+ backgroundImage}
      >
        <section className="flex flex-col w-[96%] h-[90%]">
          <InformacionMenuPrincipal title={title} subtitle={subtitle} paragraph={paragraph} perfilActivo={perfilActivo} />
          <div className="flex justify-start  items-center  w-[100%] h-[60%]">
            {
              iconSearch ?
                <div id="search" className="flex items-end w-[6%]">
                  <HiSearch
                    className="w-8 h-8 cursor-pointer text-white"
                    /* style={{ cursor: "pointer", color: "#FFFFFF" }} */
                    title="Search"
                  />
                </div> : null
            }
            <FormSearch
              btnConsultar={btnConsultar}
              convenioNegociar={convenioNegociar}
              enableInput={enableInput}
              iconSearch={iconSearch}
              paragraph2={paragraph2}
              tipoConv={tipoConv}
              listTipoDocumentId={listTipoDocumentId}
              enableListDoc={enableListDoc}
              enableInputActividad={enableInputActividad}
              btnNuevo={btnNuevo}
              tipoConsulta={tipoConsulta}
              placeholderBuscarDocumento={placeholderBuscarDocumento}
            />
          </div>
        </section>
      </header>
    </div>

  )
}