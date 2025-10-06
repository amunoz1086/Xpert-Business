'use client'

export default function ListTipoDocumentRadicacionClientes({ tipoPersona, listTipoDocumentId, onChangeList }) {


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
                onChange={onChangeList}
                value={tipoPersona || ''}
            >
                <option value="">Seleccionar</option>
                {JSON.parse(listTipoDocumentId)?.DATA?.map((v) => (
                    <option
                        className="text-white"
                        key={v.code}
                        value={v.code}
                    >
                        {v.value}
                    </option>
                ))}
            </select>
        </div>
    )
};