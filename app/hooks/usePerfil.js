import { limpiarContext, limpiarContextRadicacionCliente } from "../lib/utils"
import { useProviderRadClient } from "../provider/ProviderRadicacionCliente"
import { useProvider } from "../provider/Providers"

export const usePerfil = () => {

    const context = useProvider()
    const contextRadiciacionCliente = useProviderRadClient()
    const { cliente, editar, estadoSolicitud, updateDataCliente, pathConvenio, updateDocumentoCliente, inputDocument } = context

    
    const limpiarProvider = (resetInputDocument) => {
        limpiarContext({ context: context, resetDocuemnt: resetInputDocument })
    }


    const limpiarProviderRadicacionCliente = () => {
        limpiarContextRadicacionCliente({ context: contextRadiciacionCliente })
    }


    return {
        cliente,
        editar,
        estadoSolicitud,
        updateDataCliente,
        pathConvenio,
        inputDocument,
        updateDocumentoCliente,
        limpiarProvider, limpiarProviderRadicacionCliente
    }
}