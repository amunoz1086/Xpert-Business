
import { HiSearch } from "react-icons/hi";
import { queryListarTipoId } from "@/app/lib/admin/querys/listas";
import InformacionRadicacionClientes from "./InformacionRadicacionClientes";
import FormSearchRadicacionClientes from "./FormSearchRadicacionClientes";
import { cookies } from "next/headers";


export default async function EncabezadoRadicacionClientes({ listaModalProspecto, urlImage, title, subtitle, paragraph, paragraph2,
  enableInput = { input1: false, input2: false, input3: false }, btnNuevo, btnConsultar, iconSearch, convenioNegociar,
  tipoConv, enableListDoc, enableInputActividad, tipoConsulta, placeholderBuscarDocumento, perfilActivo, searchParams
}) {


  const perfilCliente = cookies().get('perfilCliente')?.value;
  const listTipoDocumentId = enableListDoc ? await queryListarTipoId() : [];
  const backgroundImage = `url(/headers/${urlImage ? urlImage : 'cabecera1'}.webp )`;


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
          <InformacionRadicacionClientes title={title} subtitle={subtitle} paragraph={paragraph} perfilActivo={perfilActivo} />
          <div className="flex justify-start  items-center  w-[100%] h-[60%]">
            {
              iconSearch ?
                <div id="search" className="flex items-end w-[6%]">
                  <HiSearch
                    className="w-8 h-8 "
                    style={{ cursor: "pointer", color: "#FFFFFF" }}
                    title="Search"
                  />
                </div> : null
            }
            <FormSearchRadicacionClientes
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
              perfilCliente={parseInt(perfilCliente)}
              searchParams={searchParams}
              listaModalProspecto={listaModalProspecto}
            />
          </div>
        </section>
      </header>
    </div>
  )
}