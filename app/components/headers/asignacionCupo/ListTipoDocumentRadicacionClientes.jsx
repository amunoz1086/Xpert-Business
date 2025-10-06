'use client'

export default function ListTipoDocumentRadicacionClientes({ tipoPersona, listTipoDocumentId }) {

    return (
        <div className="flex flex-col w-[80%]">
            <label htmlFor="tipoDocumento" className="text-white mb-1  text-xs">
                Tipo Documento
            </label>
            <select
                name="tipoDocumento"
                id="tipoDocumento"
                className="bg-[#4b6a7d] text-slate-200 outline-none text-sm border-b border-white rounded-none "
                required
                defaultValue={tipoPersona || ''}
            >
                <option value="">Seleccionar</option>
                {!Array.isArray(listTipoDocumentId) ? (
                    <option disabled>Cargando...</option>
                ) : (
                    listTipoDocumentId.map((v) => (
                        <option
                            className="text-white"
                            key={v.code}
                            value={v.code}
                        >
                            {v.value}
                        </option>
                    ))
                )}
            </select>
        </div>
    )
};