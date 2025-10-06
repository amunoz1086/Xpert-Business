import { HiSearch } from "react-icons/hi";
import { queryListarTipoId } from "@/app/lib/admin/querys/listas";
import FormSearchAdministracion from "./FormSearchAdministracion";
import InformacionMenuPrincipalAdministracion from "./InformacionMenuPrincipalAdministracion";


export default async function EncabezadoMenuAdministracion({
  urlImage, title, subtitle, paragraph, paragraph2, enableInput = { input1: false, input2: false, input3: false },
  btnNuevo, btnDatosGeneralesPJ, btnGuardar, btnConsultar, btnEditar, btnCancelar, iconSearch, enableListDoc, perfilActivo

}) {
  const listTipoDocumentId = enableListDoc ? await queryListarTipoId() : []
  const backgroundImage = `url(/headers/${urlImage ? urlImage : 'cabecera1'}.webp )`

  return (
    <div className="flex w-full h-48 justify-center items-center mb-6">
      <header
        className="flex justify-center items-center w-[100%] h-[100%] rounded-lg"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section className="flex flex-col w-[96%] h-[90%]">
          <InformacionMenuPrincipalAdministracion title={title} subtitle={subtitle} paragraph={paragraph} perfilActivo={perfilActivo} />
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
            <FormSearchAdministracion
              btnConsultar={btnConsultar}
              btnEditar={btnEditar}
              btnGuardar={btnGuardar}
              btnDatosGeneralesPJ={btnDatosGeneralesPJ}
              btnCancelar={btnCancelar}
              enableInput={enableInput}
              iconSearch={iconSearch}
              paragraph2={paragraph2}
              btnNuevo={btnNuevo}
            />
          </div>
        </section>
      </header>
    </div>

  )
}


