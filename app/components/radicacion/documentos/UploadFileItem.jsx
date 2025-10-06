import { FaCheckCircle, FaFileAlt, FaFileUpload, FaFileDownload } from 'react-icons/fa'

const UploadFileItem = ({ isUploadFile, onChangeFile, description, campo, deshabilitar, nameFile, estadoArchivo = false, textoLabel = true, descargarImage, requerido, idSolicitudDb }) => {
    return (
        <div className='flex  gap-x-8 mb-5'>
            <div className='flex-1'>
                <div className='flex items-center lg:gap-x-4'>
                    <FaFileAlt className='text-coomeva_color-azulOscuro w-5 h-5 rounded-sm' />
                    <div className={`flex space-x-1 items-center ${campo !== "cedula" && campo !== "rut" ? "lg:w-[45%]" : ""} `}>
                        <label className='text-coomeva_color-rojo' htmlFor={campo}>{`${requerido ? '*' : ''}`}</label>
                        <p className='lg:font-roboto lg:text-sm text-xs'>{description} </p>
                    </div>
                    <p className={`border-b-2 border-b-coomeva_color-grisPestaña ${campo != "cedula" && campo != "rut" ? "lg:w-[100%] w-[50%]" : "w-full"} border-opacity-40`}></p>
                </div>
            </div>
            <div className='flex items-center lg:gap-x-8 gap-x-4'>
                <div className='flex space-x-2'>
                    <p>{nameFile}</p>
                    <FaCheckCircle className={`w-5 h-5 text-emerald-400 ${isUploadFile ? '' : 'hidden'}`} />
                </div>
                <div className="">
                    <input id={campo} disabled={deshabilitar} type="file" name={campo} onChange={onChangeFile} className="hidden" />
                    {
                        textoLabel ?
                            <label htmlFor={campo} className={`${deshabilitar ? 'hidden' : undefined} lg:px-4 px-1 py-2 lg:py-2 border border-coomeva_color-azulClaro text-xs lg:text-sm text-coomeva_color-azulClaro rounded-lg cursor-pointer`}>
                                Adjuntar documento
                            </label> :
                            <div className='flex space-x-4'>
                                <label className='bg-white h-7 w-7 p-[0.43rem] rounded-md border flex items-center shadow-xl justify-center' htmlFor={campo}><FaFileUpload className='size-5 text-coomeva_color-azulOscuro cursor-pointer' /></label>
                                {
                                    <label className='bg-white h-7 w-7 p-[0.43rem] rounded-md border flex items-center shadow-xl justify-center' onClick={() => { idSolicitudDb && estadoArchivo && descargarImage(campo) }}>
                                        <FaFileDownload className='size-5 text-coomeva_color-azulOscuro cursor-pointer' />
                                    </label>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UploadFileItem