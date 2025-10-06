import { queryFrecuenciaNomina, queryPromedioNomina } from "@/app/lib/administracion/querys"
import FrecuenciaNomina from "./FrecuenciaNomina"
import PromedioNomina from "./PromedioNomina"

export default async function PromedioFrecuenciaNominaServer({ searchParams, filaAffectada }) {

    const listaPromedioNomina = await queryPromedioNomina()
    const listaFrecuenciaNomina = await queryFrecuenciaNomina()

    return (
        <div className="space-y-4">
            <PromedioNomina
                listaPromedioNomina={JSON.parse(listaPromedioNomina)}
                searchParams={searchParams}
            />
            <FrecuenciaNomina
                listaFrecuenciaNomina={JSON.parse(listaFrecuenciaNomina)}
                searchParams={searchParams}
                filaAffectada={filaAffectada} />
        </div>
    )
}

