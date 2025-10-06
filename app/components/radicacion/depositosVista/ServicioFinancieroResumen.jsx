import { queryPlanRemuneracion } from "@/app/lib/admin/deposito/actions"
import { queryListarPlanRem } from "@/app/lib/admin/querys/listas"
import BodyTable from "./BodyTable"


export default async function ServicioFinancieroResumen({ habilitarInput, rolActivo,context }) {

    const listPlanRem = await queryListarPlanRem()

    const listPlanRemunaracion = await queryPlanRemuneracion()
    return (

        <div className="w-[80%]">
            <div className="flex  gap-x-2 w-[60%]">
                <BodyTable
                    listSelect={JSON.parse(listPlanRem).DATA}
                    habilitarInput={habilitarInput}
                    listTaableBody={JSON.parse(listPlanRemunaracion).DATA}
                    rolActivo={rolActivo}
                    context={context}
                    />
            </div>


        </div>
    )



}


