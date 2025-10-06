'use client'

export default function ListTipoDocument({ tipoPersona,listTipoDocumentId }) {

    return (

        <>

            <label htmlFor='tipoDocumento' className='text-transparent'>t</label>
            <select
                name="tipoDocumento"
                id="tipoDocumento"
                className="bg-[#4b6a7d] text-slate-200 outline-none text-sm w-[80%] border-2 rounded-lg text-center shadow-md"
                required
                defaultValue={tipoPersona || ''}
            >
                <option disabled value="">Seleccionar</option>
                {
                    JSON.parse(listTipoDocumentId)?.DATA?.map(v => (
                        <option
                            className='text-white'
                            defaultValue={v.codLista}
                            key={v.codLista}
                            value={v.codLista}>{v.descripcion}
                        </option>
                    ))

                }

            </select>

        </>
    )
}