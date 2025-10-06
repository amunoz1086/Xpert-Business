import { queryListarTipoConvenio, queryListarTipoOperacion, queryListarTipoProducto } from "@/app/lib/admin/querys/listas"
import Cards from "./Cards"


export default async function FormSolicitud({ rolActivo }) {

    // const listTypeProducts = await queryListarTipoProducto()

    // const listTipeOperactions = await queryListarTipoOperacion()

    // const listTypeConvenios = await queryListarTipoConvenio()


    let listRiesgo = [{ COD_PRODUCTO: 1, NOMBRE: 'Alto',ISCHECKED:false }, { COD_PRODUCTO: 2, NOMBRE: 'Bajo',ISCHECKED:false }]
    let listProducto = [{ COD_PRODUCTO: 1, NOMBRE: 'Nuevo',ISCHECKED:false }, { COD_PRODUCTO: 2, NOMBRE: 'Existente',DESHABILITAR:true,ISCHECKED:false }]
    let listTipoConvenios = [
        { COD_PRODUCTO: 1, NOMBRE: 'Crédito',ISCHECKED:false },
        { COD_PRODUCTO: 2, NOMBRE: 'Solicitud cuenta',DESHABILITAR:true,ISCHECKED:false },
        { COD_PRODUCTO: 3, NOMBRE: 'Solicitud CDT',DESHABILITAR:true,ISCHECKED:false },
        { COD_PRODUCTO: 4, NOMBRE: 'Convenio',DESHABILITAR:true,ISCHECKED:false },
        { COD_PRODUCTO: 5, NOMBRE: 'Tasa preferencial crédito ',DESHABILITAR:false,ISCHECKED:false }
    ]




    return (
        <div >
            <Cards

                listRiesgo={listRiesgo}
                listProducto={listProducto}
                listTypeConvenios={listTipoConvenios}
                //  listTypeProducts={listTypeProducts}

                //    listTipeOperactions={JSON.parse(listTipeOperactions)}

                //    listTypeConvenios={JSON.parse(listTypeConvenios)}

                rolActivo={rolActivo}

            />
        </div>
    )
}
