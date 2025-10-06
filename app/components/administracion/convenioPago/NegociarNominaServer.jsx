import { queryNegociarNomina, querypermitirNegociar } from "@/app/lib/administracion/querys"
import NegociarNomina from "./NegociarNomina"

export default async function NegociarNominaServer({ searchParams, filaAffectada }) {

    const listaNegociarNomina = await queryNegociarNomina()

    const listaPermitirNegociar = await querypermitirNegociar()

    return (

        <div>

            <NegociarNomina
                searchParams={searchParams}
                listaNegociarNominam={JSON.parse(listaNegociarNomina)}
                listaPermitirNegociar={JSON.parse(listaPermitirNegociar)}
                filaAffectada={filaAffectada}

            />
        </div>

    )
}

