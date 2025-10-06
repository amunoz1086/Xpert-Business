'use client'

import TipoOperacion from "../../solicitud/TipoOperacion";
import TipoProducto from "../../solicitud/TipoProducto";



export default function CardResumen({ listTypeProducts,solicitud,validarAccionCuenta,validarAccionCDT }) {


    return (
        <>

            <TipoProducto listTypeProducts={listTypeProducts.DATA} solicitud={solicitud}
             validarAccionCuenta={validarAccionCuenta}
             validarAccionCDT={validarAccionCDT}
             />
            {/* <TipoOperacion listTipoOperations={listTipeOperactions.DATA} solicitud={solicitud} /> */}

        </>
    )
}