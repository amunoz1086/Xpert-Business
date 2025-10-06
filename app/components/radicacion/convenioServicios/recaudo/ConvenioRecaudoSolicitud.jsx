import { queryAdquirencia } from "@/app/lib/convenios/actions"
import EstructuraTabla from "@/app/components/share/EstructuraTabla"
import TablaSolicitud from "./TablaSolicitud"


export default async function ConvenioRecaudoSolicitud({  rolUsuario }) {

    const listAdquirencia = await queryAdquirencia()

    return (
        <div className="p-1  h-full w-full relative ">
            <EstructuraTabla titulo={'Solicitud'}>
                <TablaSolicitud listRecaudoSolicitud={JSON.parse(listAdquirencia)} rolUsuario={rolUsuario} />
            </EstructuraTabla>
        </div>
    )
}
