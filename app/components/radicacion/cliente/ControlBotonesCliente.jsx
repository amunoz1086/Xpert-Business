'use client'
import { DataContext } from "@/app/provider/Providers";
import { useContext, useState } from "react";
import BtnControl from "./BtnControl";
import { useProviderRadClient } from "@/app/provider/ProviderRadicacionCliente";
//import { usePathname } from "next/navigation";
//import { paginasCliente } from "@/app/lib/utils";


const ControlBotonesCliente = ({ mostrarBtnRadCliente = false, perfilCliente, campoValidarAdministracion }) => {

    const [desactivarSolitid, setDesactivarSolitid] = useState(true);
    const contextRadCliente = useProviderRadClient;
    const { perfilPj, perfilPn, activarBtnSolicitud } = contextRadCliente();
    const { cliente } = useContext(DataContext);
    //const pathNname = usePathname();


    const desactivarBotonSolicitud = () => {
        setDesactivarSolitid(false)
    };


    return (
        <div className="w-full flex">
            <div className="w-full">
                <BtnControl
                    bgBoton="bg-coomeva_color-azulOscuro"
                    name={"Tenencia"}
                    url={''}
                    enableButton={false}
                    opcion={'productoAlCorte'}
                />
                <BtnControl
                    name={"Iniciar Solicitud"}
                    url={'/radicacion/solicitud'}
                    /* enableButton={
                        (perfilPj?.state != '' && perfilPj?.state != undefined && activarBtnSolicitud) || (perfilPn?.state != '' && perfilPn?.state != undefined && activarBtnSolicitud)
                         ||   (perfilPj?.reference?.codStatusCliente=='P') ||( perfilPj?.reference?.codStatusCliente=='c')
                    } */
                    enableButton={false}
                    opcion={'solicitudCliente'}
                    perfilCliente={perfilCliente}
                    referencia={perfilPj?.reference?.codStatusCliente}
                    state={perfilPj?.state || perfilPn?.state}
                    desactivarBotonSolicitud={desactivarBotonSolicitud}
                />
                <BtnControl
                    name={"Consultar Solicitudes"}
                    url={'/radicacion/bandejaSolicitudes'}
                    enableButton={false}
                    opcion={'navegar'}
                />
            </div>
            <div className="w-full flex justify-end">
                {/* <BtnControl
                    btnDefault={false}
                    bgBoton="bg-transparent"
                    name={"ACTUALIZAR INFO"}
                    url={''}
                    enableButton={false}
                    opcion={'navegar'}
                    cliente={cliente}
                /> */}
            </div>
        </div>
    )
};

export default ControlBotonesCliente;