'use client'

export default function ModalsForForm({ bg = 'bg-[#f4f6f7d1]', fondoAzul = false, w, p, z, children, mostrarImagneFondo = false }) {

    let fondoImagen = mostrarImagneFondo ? "fondoModal" : "";

    return (

        <div className={`fixed bg-cover  z-${z} inset-0  flex justify-center items-center transition-all ${fondoAzul ? 'bg-[#245269be]' : ''}` + fondoImagen}   >
            <div className={`${bg} py-${p} px-5 w-${w} rounded-md flex flex-col justify-center items-center gap-5`}>
                {children}
                <div className="flex justify-between w-full">
                </div>
            </div>
        </div>
    )
};