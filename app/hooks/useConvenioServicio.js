import React from 'react'
import { useProvider } from '../provider/Providers'

export const useConvenioServicio = () => {

    const { updateConvenioPago, convenioPago,estadoSolicitud,creditoNuevo,pathConvenio,updatePathConvenio } = useProvider()

  return {
     updateConvenioPago,
     convenioPago,
     estadoSolicitud,
     creditoNuevo,
     pathConvenio,
     updatePathConvenio
  }
}
