'use client'

import { CampoLista } from '../../share/CampoLista'
import { CampoPorcentaje } from '../../share/CampoPorcentaje'
import { CampoNumero } from '../../share/CampoNumero'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useProvider } from '@/app/provider/Providers';
import { useRef } from 'react';
import { BiTrash, BiCloudUpload, BiFile } from 'react-icons/bi';

import { useRouter } from 'next/navigation';

const DynamicModal = dynamic(() => import('../../share/Modals'));

let catalogo = {

    lineaCredito: [{ code: 1, value: 'COE Rotativo' }, { code: 2, value: 'COE ' }, { code: 3, value: 'Sobregiro ' }, { code: 4, value: 'TARJETA EMPRESARIAL ' }],
    tipoTasa: [{ code: 1, value: 'Fija' }, { code: 2, value: 'Variable ' }],
    tasaVariable: [{ code: 1, value: 'IBR Overnight' }, { code: 12, value: 'IBR 1 mes' }, { code: 3, value: 'IBR 3 mes ' }, { code: 4, value: 'IBR 6 mes ' }, { code: 5, value: 'IBR 12 mes ' }, { code: 5, value: 'IPC ' }],
    frecuenciaCapital: [{ code: 1, value: '1' }, { code: 2, value: '2 ' }, { code: 3, value: '3 ' }, { code: 4, value: '6' }, { code: 4, value: '12' }],
    periodoGracia: [{ code: 1, value: 'No aplica' }, { code: 2, value: 'Si aplica ' }],
    frecuenciaInteres: [{ code: 1, value: 'Mensual' }, { code: 2, value: 'Trimestral' }, { code: 3, value: 'Semestral' }, { code: 4, value: 'Anual' }],

}

export const Credito = ({ idCliente = "800201340" }) => {

    const [documentos, setDocumentos] = useState([
        {
            id: 1,
            codigo: '0048',
            nombreCorto: 'Financieros',
            nombreCompleto: 'Estados Financieros',
            obligatorio: true,
            archivos: [],
        },
        {
            id: 2,
            codigo: '0032',
            nombreCorto: 'CamaraComercio',
            nombreCompleto: 'Certificado de Cámara y Comercio',
            obligatorio: true,
            archivos: [],
        },
        {
            id: 3,
            codigo: '1001',
            nombreCorto: 'RUT',
            nombreCompleto: 'Registro Único Tributario (RUT)',
            obligatorio: false,
            archivos: [],
        },
    ]);

    const [error, setError] = useState('');
    const [loadingBuzonId, setLoadingBuzonId] = useState(null);
    const inputRef = useRef(null);
    const [buzonIndexActual, setBuzonIndexActual] = useState(null);
    const [activarBtnGuardar, setActivarBtnGuardar] = useState(false)
    const {push}=useRouter()

    useEffect(() => {
        const todosObligatoriosCargados = documentos
            .filter(d => d.obligatorio)
            .every(d => d.archivos.length > 0);

        if (todosObligatoriosCargados) {
            setActivarBtnGuardar(true)

        } else { setActivarBtnGuardar(false) }
    }, [documentos])



    const handleUploadClick = (index) => {
        setBuzonIndexActual(index);
        if (inputRef.current) {
            inputRef.current.click();
        } else {
            console.error("La referencia al input de archivo no está disponible.");
        }
    };

    const pdfEncriptado = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const buffer = new Uint8Array(reader.result);
                const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
                const isEncrypted = /\/Encrypt|\/Filter\s*\/Standard/.test(text);
                resolve(isEncrypted);
            };

            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });


    const handleFileSelected = async (event) => {

        const file = event.target.files[0];

        if (!file || buzonIndexActual === null) return;

        const buzon = documentos[buzonIndexActual];
        setError('');
        setLoadingBuzonId(buzon.id);

        if (buzon.archivos.length >= 5) {
            setError(`No se pueden adjuntar más de 5 documentos al buzón "${buzon.nombreCompleto}".`);
            setLoadingBuzonId(null);
            return;
        }

        if (file.type !== 'application/pdf') {
            setError('Solo se admiten documentos de tipo PDF.');
            setLoadingBuzonId(null);
            return;
        }

        const maxSizeInBytes = 2 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            setError('El documento no puede ser cargado al superar el máximo de 2 megas.');
            setLoadingBuzonId(null);
            return;
        }

        try {
            const pdfProtegido = await pdfEncriptado(file);
            if (pdfProtegido) {
                setError("Documento no puede ser cargado al contener una contraseña.");
                setLoadingBuzonId(null);
                return;
            }
        } catch (e) {
            setError("No se pudo verificar si el PDF tiene contraseña.");
            setLoadingBuzonId(null);
            return;
        }


        // --- Proceso de carga y validación en Backend (Simulado) ---
        await cargarDocumentoS3Temporal({ file: file, buzon: buzon })

    };

    const cargarDocumentoS3Temporal = async ({ file, buzon }) => {

        try {

            const consecutivo = buzon.archivos.length + 1;
            const nombreEstandarizado = `${buzon.codigo}_${buzon.nombreCorto}${idCliente}D${consecutivo}`;

            const frmData = new FormData();

             frmData.append(`${nombreEstandarizado}`, file);

        //    const res =await  uploadDocumentoBucketS3({formData:frmData,name:nombreEstandarizado})

           

            const nuevoArchivo = {
                nombreOriginal: file.name,
                nombreEstandarizado: nombreEstandarizado,
                urlTemporal: 'https://s3',
            };


            const documentosActualizados = documentos.map((doc, index) => {
                if (index === buzonIndexActual) {
                    return { ...doc, archivos: [...doc.archivos, nuevoArchivo] };
                }
                return doc;
            });
            setDocumentos(documentosActualizados);




        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingBuzonId(null); // Desactivamos el loader
        }

    }



    const handleDeleteFile = (buzonIndex, fileIndexToDelete) => {
        // Aquí también deberías llamar a tu API para eliminar el archivo de S3.
        console.log(`Eliminando archivo del buzón ${buzonIndex}, archivo ${fileIndexToDelete}`);

        const documentosActualizados = documentos.map((doc, index) => {
            if (index === buzonIndex) {
                const archivosActualizados = doc.archivos.filter((_, fileIndex) => fileIndex !== fileIndexToDelete);
                return { ...doc, archivos: archivosActualizados };
            }
            return doc;
        });
        setDocumentos(documentosActualizados);
    };


    const handleGuardarEnAPI = () => {

        
   cerrarModal();
        
        push('/radicacion/resumen')

        // Si todo es correcto, envías los datos a tu API final.
        console.log("Guardando en la API y redirigiendo...", documentos);
        // Aquí iría la lógica de fetch a tu API y el posterior enrutamiento
        // ej: history.push('/resumen-solicitud');
     
    };

    // logica

    const [mostrarModal, setmostrarModal] = useState(false)

    const { credito, updateCredito } = useProvider();

    const onChangeInput = (e) => {



        const { name, type, checked, value } = e.target;

        const inputValue = type === 'checkbox' ? (checked ? true : false) : value;

        const dataCredito = { ...credito }

        dataCredito[name] = inputValue

        console.log(dataCredito)

        updateCredito(dataCredito);



    }

    console.log('credito')

    console.log(credito)

    const cerrarModal = () => {

        setmostrarModal(false)

    }

    const abrirModal = () => {

        setmostrarModal(true)

    }



    return (
        <div className='px-2 py-2'>
            <h2 className='font-bold mx-2'>Sección de Crédito</h2>
            <p className='mt-4 mx-2'>Configure los parámetros para la solicitud de crédito.</p>

            <div className='mx-2 my-4'>

                <div className={`grid grid-cols-2 gap-x-8 gap-y-4 `}>

                    <div className=''>
                        <CampoLista

                            valorInput={credito.lineaCredito}
                            onChangeInput={onChangeInput}
                            nameInput="lineaCredito"
                            placeholder='Línea de crédito'
                            lista={catalogo.lineaCredito}
                            idLista="code"
                            descripcionList="value"
                            validacionRequeridoEditable={{ requerido: false, estado: false }}
                        />
                    </div>
                    <div className=''>
                        <CampoLista
                            valorInput={credito.tipoTasa}
                            onChangeInput={onChangeInput}
                            nameInput="tipoTasa"
                            placeholder='Tipo de tasa'
                            lista={catalogo.tipoTasa}
                            idLista="code"
                            descripcionList="value"
                            validacionRequeridoEditable={{ requerido: false, estado: credito.lineaCredito == '' || credito.lineaCredito == undefined }}
                        />
                    </div>

                    {
                        credito.lineaCredito != '' && credito.tipoTasa != '' && credito.tipoTasa == 2 ?
                            <>
                                <div className=''>
                                    <CampoPorcentaje
                                        valorInput={credito.tasaMin}
                                        onChangeInput={onChangeInput}
                                        nameInput="tasaMin"
                                        placeholder=' Tasa Min (%)'
                                        lista={catalogo.lineaCredito}
                                        idLista="code"
                                        descripcionList="value"
                                        validacionRequeridoEditable={{ requerido: false, estado: credito.lineaCredito == '' || credito.lineaCredito == undefined }}
                                    />
                                </div>
                                <div className=''>
                                    <CampoPorcentaje
                                        valorInput={credito.tasaMax}
                                        onChangeInput={onChangeInput}
                                        nameInput="tasaMax"
                                        placeholder='Tasa Max (%)'
                                        lista={catalogo.lineaCredito}
                                        idLista="code"
                                        descripcionList="value"
                                        validacionRequeridoEditable={{ requerido: false, estado: credito.lineaCredito == '' || credito.lineaCredito == undefined }}
                                    />
                                </div>
                            </> : undefined}



                    {credito.tipoTasa == 1 ? undefined :
                        <>
                            {credito.lineaCredito != '' && credito.tipoTasa != '' ? <div className=''>
                                <CampoLista
                                    valorInput={credito.tasaVariable}
                                    onChangeInput={onChangeInput}
                                    nameInput="tasaVariable"
                                    placeholder='Tasa variable'
                                    lista={catalogo.tasaVariable}
                                    idLista="code"
                                    descripcionList="value"
                                    validacionRequeridoEditable={{ requerido: false, estado: credito.lineaCredito == '' || credito.lineaCredito == undefined }}
                                />
                            </div> : undefined}

                            <div className=''>
                                <CampoPorcentaje
                                    valorInput={credito.spreadMin}
                                    onChangeInput={onChangeInput}
                                    nameInput="spreadMin"
                                    placeholder=' Spread Min (%)'
                                    lista={catalogo.lineaCredito}
                                    idLista="code"
                                    descripcionList="value"
                                    validacionRequeridoEditable={{
                                        requerido: false,
                                        estado: credito.lineaCredito == '' || credito.lineaCredito == undefined
                                            || credito.lineaCredito == 1 || credito.lineaCredito == 2 || credito.lineaCredito == 3 || credito.lineaCredito == 4
                                    }}
                                />
                            </div>
                            <div className=''>
                                <CampoPorcentaje
                                    valorInput={credito.spreadMax}
                                    onChangeInput={onChangeInput}
                                    nameInput="spreadMax"
                                    placeholder='Spread Max (%)'
                                    lista={catalogo.lineaCredito}
                                    idLista="code"
                                    descripcionList="value"
                                    validacionRequeridoEditable={{
                                        requerido: false,
                                        estado: credito.lineaCredito == '' || credito.lineaCredito == undefined
                                            || credito.lineaCredito == 1 || credito.lineaCredito == 2 || credito.lineaCredito == 3 || credito.lineaCredito == 4
                                    }}
                                />
                            </div></>
                    }
                    <div className=''>
                        <CampoNumero
                            valorInput={credito.plazoMin}
                            onChangeInput={onChangeInput}
                            nameInput="plazoMin"
                            placeholder='Plazo Min (meses)'
                            lista={catalogo.lineaCredito}
                            idLista="code"
                            descripcionList="value"
                            validacionRequeridoEditable={{ requerido: false, estado: credito.lineaCredito == '' || credito.lineaCredito == undefined }}
                        />
                    </div>
                    <div className=''>
                        <CampoNumero
                            valorInput={credito.plazoMax}
                            onChangeInput={onChangeInput}
                            nameInput="plazoMaxn"
                            placeholder='Plazo Max (meses)'
                            lista={catalogo.lineaCredito}
                            idLista="code"
                            descripcionList="value"
                            validacionRequeridoEditable={{ requerido: false, estado: credito.lineaCredito == '' || credito.lineaCredito == undefined }}
                        />
                    </div>

                    <div className=''>
                        <CampoLista
                            valorInput={credito.frecuenciaCapital}
                            onChangeInput={onChangeInput}
                            nameInput="frecuenciaCapital"
                            placeholder='Frecuencia Capital'
                            lista={catalogo.frecuenciaCapital}
                            idLista="code"
                            descripcionList="value"
                            validacionRequeridoEditable={{ requerido: false, estado: credito.lineaCredito == '' || credito.lineaCredito == undefined }}
                        />
                    </div>
                    <div className=''>
                        <CampoLista
                            valorInput={credito.periodoGracia}
                            onChangeInput={onChangeInput}
                            nameInput="periodoGracia"
                            placeholder='Periodo de gracia'
                            lista={catalogo.periodoGracia}
                            idLista="code"
                            descripcionList="value"
                            validacionRequeridoEditable={{
                                requerido: false,
                                estado:
                                    credito.lineaCredito == '' ||
                                    credito.lineaCredito == undefined ||
                                    credito.lineaCredito == 4
                            }}
                        />
                    </div>
                    <div className=''>
                        <CampoLista
                            valorInput={credito.frecuenciaInteres}
                            onChangeInput={onChangeInput}
                            nameInput="frecuenciaInteres"
                            placeholder='Frecuencia interés'
                            lista={catalogo.frecuenciaInteres}
                            idLista="code"
                            descripcionList="value"
                            validacionRequeridoEditable={{ requerido: false, estado: credito.lineaCredito == '' || credito.lineaCredito == undefined }}
                        />
                    </div>


                </div>

                <button type='buttom'
                    onClick={abrirModal}
                    className={`py-2 px-8 bg-coomeva_color-rojo  rounded-lg mx-auto text-white text-xs`}
                >Guardar</button>
            </div>

            {
                mostrarModal ?
                    <DynamicModal w={48} fondoAzul={true} bg="bg-white" iconoAlert={false} ocultarLogo={true} ocultarBtnCancelar={true} ocultarBtnContinuar={true}>

                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleFileSelected}
                            className="hidden"
                            accept="application/pdf"
                        />



                        <div className="w-full px-4 mb-6 rounded-md  overflow-y-auto">
                            <div onClick={cerrarModal} className="cursor-pointer flex justify-end">
                                <p className="text-lg text-end font-bold">x</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <div className='w-full flex justify-between p-3 border rounded-lg shadow-sm'>
                                    <div className='w-full'>
                                        <h1 className="font-bold text-gray-600">Menu</h1>
                                        <p className="text-xs mb-3 text-gray-500">Documentos</p>
                                    </div>
                                    <div className='w-full'>
                                        <h1 className="font-bold text-gray-600">ID</h1>
                                        <p className="text-xs mb-3 text-gray-500">Cliente</p>
                                    </div>

                                </div>

                            </div>

                            {/* Zona de Errores */}
                            {error && <div className="my-3 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

                            {/* --- Lista dinámica de Buzones --- */}
                            <div className="space-y-3 p-3 border rounded-lg shadow-sm ">
                                {documentos.map((buzon, buzonIndex) => (
                                    <div key={buzon.id} className="p-3 border rounded-lg shadow-sm">
                                        <div className="flex items-center w-full gap-4 text-gray-700">
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <BiFile className="text-gray-500" />
                                                <h1 className="font-semibold">
                                                    {buzon.nombreCompleto}
                                                    {buzon.obligatorio && <span className="text-red-500 ml-1">*</span>}
                                                </h1>
                                            </div>
                                            <div className="flex-grow border-t border-gray-300"></div>


                                            <div className="flex items-center gap-4 flex-shrink-0">
                                                {loadingBuzonId == buzon.id ? (
                                                    <p className="text-sm text-blue-600">Cargando...</p>
                                                ) : (
                                                    <div onClick={() => handleUploadClick(buzonIndex)}>
                                                        <BiCloudUpload className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                                                    </div>

                                                )}
                                            </div>
                                        </div>

                                        {/* Lista de archivos ya cargados en este buzón */}

                                        <div className="mt-2 pl-8 space-y-1">
                                            {buzon.archivos.map((archivo, fileIndex) => (
                                                <div key={fileIndex} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                                                    <div className=''>
                                                        <a href={archivo.urlTemporal} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline" title={archivo.nombreOriginal}>
                                                            {archivo.nombreEstandarizado}.pdf
                                                        </a>
                                                    </div>
                                                    <div className='' onClick={() => handleDeleteFile(buzonIndex, fileIndex)}>
                                                        <BiTrash className="text-red-600 hover:text-red-800 cursor-pointer w-4 h-4" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end w-full mt-6">
                                <div className="space-x-3">
                                    {/* <button type='button' onClick={cerrarModal} className="py-2 px-8 bg-[#979797ff] rounded-lg text-white text-xs">Cancelar</button> */}
                                    <button
                                        type='button'
                                        disabled={!activarBtnGuardar}
                                        onClick={activarBtnGuardar ? handleGuardarEnAPI : () => { }}
                                        className={`py-2 px-8 ${activarBtnGuardar ? 'bg-coomeva_color-rojo' : 'bg-slate-300 cursor-none'}  rounded-lg mx-auto text-white text-xs`}
                                    >Continuar</button>
                                </div>
                            </div>
                        </div>
                    </DynamicModal>
                    : undefined
            }
        </div>
    )
}
