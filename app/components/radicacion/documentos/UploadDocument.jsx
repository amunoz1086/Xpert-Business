'use client'

import { useContext, useEffect, useState } from 'react';
import UploadFileItem from './UploadFileItem';
import { uploadBucketS3, downloadBucketS3 } from '@/app/lib/documentos/bucketS3Pool';
import dynamic from 'next/dynamic'
import { DataContext } from '@/app/provider/Providers';
import { queryFileSave } from '@/app/lib/solicitudes/queryFileSave';
import { queryFileUp } from '@/app/lib/solicitudes/queryFileUp';
import Loading from "../../share/Loading";
import { queryEstadoSolicitud } from '@/app/lib/solicitudes/queryEstadoSolicitud';
import { deletePublicDoc } from '@/app/lib/documentos/deletePublicDoc';
import { compression } from '@/app/lib/documentos/compression';
import { deleteDocZip } from '@/app/lib/documentos/deleteDocZip';


const DynamicModal = dynamic(() => import('../../share/Modals'))

const UploadDocument = ({ rolActivo }) => {

    const [showLoading, setShowLoading] = useState(false);
    const { idSolicitudDb, updateBufferDocumentos, updateIsDocumentos } = useContext(DataContext);
    const [deshabilitaCampo, setdeshabilitaCampo] = useState(rolActivo !== 'Radicación');
    const [nombreDocumentos, setNombreDocumentos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [habilitarCampo, setHabilitarCampo] = useState(rolActivo !== 'Radicación');

    const deshabilitar = rolActivo !== 2

    const [isUploadFile, setIsUpLoadFile] = useState({
        cedula: false,
        rut: false,
        certificado: false,
        formato: false,
        contrato: false,
        Buzon6: false,
        Buzon7: false,
        Buzon8: false,
        Buzon9: false,
        Buzon10: false,
        Buzon11: false,
        Buzon12: false,
        Buzon13: false,
        Buzon14: false,
        Buzon15: false,
        Buzon16: false,
        Buzon17: false,
        Buzon18: false,
        Buzon19: false,
        Buzon20: false,
        Buzon21: false,
        Buzon22: false,
        Buzon23: false,
    });

    const [nameFile, setNameFile] = useState({
        cedula: '',
        rut: '',
        certificado: '',
        formato: '',
        contrato: '',
        Buzon6: '',
        Buzon7: '',
        Buzon8: '',
        Buzon9: '',
        Buzon10: '',
        Buzon11: '',
        Buzon12: '',
        Buzon13: '',
        Buzon14: '',
        Buzon15: '',
        Buzon16: '',
        Buzon17: '',
        Buzon18: '',
        Buzon19: '',
        Buzon20: '',
        Buzon21: '',
        Buzon22: '',
        Buzon23: '',
    });


    useEffect(() => {

        getEstadoDocumentos()
        getEstadoSolicitud()
    }, []);


    const getEstadoDocumentos = async () => {

        if (idSolicitudDb !== '' && idSolicitudDb !== undefined) {
            const resultDocuments = JSON.parse(await queryFileUp(JSON.stringify({ codSolicitud: idSolicitudDb })));

            if (resultDocuments?.state === 200) {
                setIsUpLoadFile({
                    cedula: resultDocuments.statusFile.docCedula,
                    rut: resultDocuments.statusFile.docRut,
                    certificado: resultDocuments.statusFile.docCertificado,
                    formato: resultDocuments.statusFile.docFormato,
                    contrato: resultDocuments.statusFile.docContrato,
                    Buzon6: resultDocuments.statusFile.docBuzon6,
                    Buzon7: resultDocuments.statusFile.docBuzon7,
                    Buzon8: resultDocuments.statusFile.docBuzon8,
                    Buzon9: resultDocuments.statusFile.docBuzon9,
                    Buzon10: resultDocuments.statusFile.docBuzon10,
                    Buzon11: resultDocuments.statusFile.docBuzon11,
                    Buzon12: resultDocuments.statusFile.docBuzon12,
                    Buzon13: resultDocuments.statusFile.docBuzon13,
                    Buzon14: resultDocuments.statusFile.docBuzon14,
                    Buzon15: resultDocuments.statusFile.docBuzon15,
                    Buzon16: resultDocuments.statusFile.docBuzon16,
                    Buzon17: resultDocuments.statusFile.docBuzon17,
                    Buzon18: resultDocuments.statusFile.docBuzon18,
                    Buzon19: resultDocuments.statusFile.docBuzon19,
                    Buzon20: resultDocuments.statusFile.docBuzon20,
                    Buzon21: resultDocuments.statusFile.docBuzon21,
                    Buzon22: resultDocuments.statusFile.docBuzon22,
                    Buzon23: resultDocuments.statusFile.docBuzon23,
                })

                updateIsDocumentos({
                    cedula: resultDocuments.statusFile.docCedula,
                    rut: resultDocuments.statusFile.docRut,
                    certificado: resultDocuments.statusFile.docCertificado,
                    formato: resultDocuments.statusFile.docFormato,
                    contrato: resultDocuments.statusFile.docContrato,
                    Buzon6: resultDocuments.statusFile.docBuzon6,
                    Buzon7: resultDocuments.statusFile.docBuzon7,
                    Buzon8: resultDocuments.statusFile.docBuzon8,
                    Buzon9: resultDocuments.statusFile.docBuzon9,
                    Buzon10: resultDocuments.statusFile.docBuzon10,
                    Buzon11: resultDocuments.statusFile.docBuzon11,
                    Buzon12: resultDocuments.statusFile.docBuzon12,
                    Buzon13: resultDocuments.statusFile.docBuzon13,
                    Buzon14: resultDocuments.statusFile.docBuzon14,
                    Buzon15: resultDocuments.statusFile.docBuzon15,
                    Buzon16: resultDocuments.statusFile.docBuzon16,
                    Buzon17: resultDocuments.statusFile.docBuzon17,
                    Buzon18: resultDocuments.statusFile.docBuzon18,
                    Buzon19: resultDocuments.statusFile.docBuzon19,
                    Buzon20: resultDocuments.statusFile.docBuzon20,
                    Buzon21: resultDocuments.statusFile.docBuzon21,
                    Buzon22: resultDocuments.statusFile.docBuzon22,
                    Buzon23: resultDocuments.statusFile.docBuzon23,
                })

                setNameFile({
                    cedula: resultDocuments.data.docCedula,
                    rut: resultDocuments.data.docRut,
                    certificado: resultDocuments.data.docCertificado,
                    formato: resultDocuments.data.docFormato,
                    contrato: resultDocuments.data.docContrato,
                    Buzon6: resultDocuments.data.docBuzon6,
                    Buzon7: resultDocuments.data.docBuzon7,
                    Buzon8: resultDocuments.data.docBuzon8,
                    Buzon9: resultDocuments.data.docBuzon9,
                    Buzon10: resultDocuments.data.docBuzon10,
                    Buzon11: resultDocuments.data.docBuzon11,
                    Buzon12: resultDocuments.data.docBuzon12,
                    Buzon13: resultDocuments.data.docBuzon13,
                    Buzon14: resultDocuments.data.docBuzon14,
                    Buzon15: resultDocuments.data.docBuzon15,
                    Buzon16: resultDocuments.data.docBuzon16,
                    Buzon17: resultDocuments.data.docBuzon17,
                    Buzon18: resultDocuments.data.docBuzon18,
                    Buzon19: resultDocuments.data.docBuzon19,
                    Buzon20: resultDocuments.data.docBuzon20,
                    Buzon21: resultDocuments.data.docBuzon21,
                    Buzon22: resultDocuments.data.docBuzon22,
                    Buzon23: resultDocuments.data.docBuzon23,
                })

                setNombreDocumentos((Object.values(resultDocuments.data)).filter((nombre, i) => (i !== 0) && (nombre !== null)))
            };
        };
    };


    const getEstadoSolicitud = async () => {
        try {
            if (idSolicitudDb) {
                let reponse = JSON.parse(await queryEstadoSolicitud({ cod_solicitud: idSolicitudDb }))
                if (reponse.state === 200) {
                    setHabilitarCampo(reponse.data[0].estadoParametrizacion !== null && reponse.data[0].estadoParametrizacion !== undefined ? true : habilitarCampo)
                }
            }
        } catch (error) {
            console.log(error)
        }
    };


    const onChangeFile = async (e) => {

        if (e.target.files.length !== 0) {
            if (e.target.files[0].type !== "application/pdf") {
                setMessageAlert("Tipo de archivo no valido. solo admite pdf")
                setShowModal(true)
                return
            };

            const maxSize = 2 * 1024 * 1024;
            if (e.target.files[0].size > maxSize) {
                setMessageAlert("El archivo supera el tamaño máximo permitido de 2 MB.");
                setShowModal(true);
                return;
            }

            setIsUpLoadFile({ ...isUploadFile, [e.target.name]: true });
            setNameFile({ ...nameFile, [e.target.name]: e.target.files[0].name });

            if (!idSolicitudDb) {
                const campo = document.getElementById(e.target.name);
                updateBufferDocumentos(e.target.name, campo.files[0])
            };
        };
    };


    const downloadClientZip = async (idSolicitud) => {
        try {
            const resp = await fetch("/api/downloadClientZip", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idSolicitud })
            });

            if (resp.status === 200) {
                const blob = await resp.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `caso_${idSolicitud}.zip`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                return resp.status;

            } else {
                return resp.status;
            };

        } catch (error) {
            console.error(error);
        };
    };


    const notoficacionDescarga = async (notificacion, idSolicitud) => {
        setShowLoading(false);
        setMessageAlert(`${notificacion.message}`);
        setShowModal(true);

        if (notificacion.code === 200) {
            await deletePublicDoc(idSolicitud);
            await deleteDocZip(idSolicitud);
        };
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        if (deshabilitar) {

            let message = {};
            setShowLoading(true);

            try {

                const responseDownloadBucket = JSON.parse(await downloadBucketS3(idSolicitudDb, nombreDocumentos));

                if (responseDownloadBucket.status === 200) {
                    const compressionDocs = JSON.parse(await compression(idSolicitudDb));

                    if (compressionDocs.status === 200) {
                        const responseDownload = await downloadClientZip(idSolicitudDb);

                        if (responseDownload === 200) {
                            message.message = `¡Descarga de documentos completa, caso ${idSolicitudDb} completada!`;
                            message.code = responseDownload;
                            await notoficacionDescarga(message, idSolicitudDb);
                        } else {
                            message.message = `¡Descarga de documentos, caso ${idSolicitudDb} al cliente fallida`;
                            message.code = responseDownload;
                            await notoficacionDescarga(message, idSolicitudDb);
                        };

                    } else {
                        message.message = `Compresión de documentos caso ${idSolicitudDb} fallida`;
                        message.code = compressionDocs.status;
                        await notoficacionDescarga(message, idSolicitudDb);
                    };

                } else {
                    message.message = `¡Descarga de documentos caso ${idSolicitudDb} desde el contenedor fallida!`;
                    message.code = responseDownloadBucket.status;
                    await notoficacionDescarga(message, idSolicitudDb);
                };

            } catch (error) {
                console.log(error);
            };

            return;
        };

        const cedula = document.getElementById("cedula");
        const rut = document.getElementById("rut");
        const certificado = document.getElementById("certificado");
        const formato = document.getElementById("formato");
        const contrato = document.getElementById("contrato");

        const Buzon6 = document.getElementById("Buzon6");
        const Buzon7 = document.getElementById("Buzon7");
        const Buzon8 = document.getElementById("Buzon8");
        const Buzon9 = document.getElementById("Buzon9");
        const Buzon10 = document.getElementById("Buzon10");

        const Buzon11 = document.getElementById("Buzon11");
        const Buzon12 = document.getElementById("Buzon12");
        const Buzon13 = document.getElementById("Buzon13");
        const Buzon14 = document.getElementById("Buzon14");
        const Buzon15 = document.getElementById("Buzon15");

        const Buzon16 = document.getElementById("Buzon16");
        const Buzon17 = document.getElementById("Buzon17");
        const Buzon18 = document.getElementById("Buzon18");

        const Buzon19 = document.getElementById("Buzon19");
        const Buzon20 = document.getElementById("Buzon20");
        const Buzon21 = document.getElementById("Buzon21");

        const Buzon22 = document.getElementById("Buzon22");
        const Buzon23 = document.getElementById("Buzon23");


        if ((
            cedula.files[0] == undefined && rut.files[0] == undefined && certificado.files[0] == undefined &&
            formato.files[0] == undefined && contrato.files[0] == undefined && Buzon6.files[0] == undefined && Buzon7.files[0] == undefined && Buzon8.files[0] == undefined
            && Buzon9.files[0] == undefined && Buzon10.files[0] == undefined && Buzon11.files[0] == undefined && Buzon12.files[0] == undefined
            && Buzon13.files[0] == undefined && Buzon14.files[0] == undefined && Buzon15.files[0] == undefined && Buzon16.files[0] == undefined && Buzon17.files[0] == undefined
            && Buzon18.files[0] == undefined && Buzon19.files[0] == undefined && Buzon20.files[0] == undefined && Buzon21.files[0] == undefined && Buzon22.files[0] == undefined
            && Buzon23.files[0] == undefined
        )) {
            setMessageAlert("No hay documentos por cargar")
            setShowModal(true)
            return
        }

        if ((cedula.value == '' && nameFile.cedula == '') || (rut.value == '' && nameFile.rut == '') || (certificado.value == '' && nameFile.certificado == '') || (formato.value == '' && nameFile.formato == '') || (contrato.value == '' && nameFile.contrato == '')) {

            setMessageAlert(" Cargar documentos obligatorios *")
            setShowModal(true)
            return

        }

        const nombreArchivos = {};
        const formData = new FormData();


        if (nameFile.cedula) {

            cedula.files[0] && formData.append("cedula", cedula.files[0], `${idSolicitudDb}_cedula.pdf`);

            nombreArchivos.cedula = `${idSolicitudDb}_cedula.pdf`;
        }

        if (nameFile.rut) {

            rut.files[0] && formData.append("rut", rut.files[0], `${idSolicitudDb}_rut.pdf`);

            nombreArchivos.rut = `${idSolicitudDb}_rut.pdf`;
        }

        if (nameFile.certificado) {

            certificado.files[0] && formData.append("certificado", certificado.files[0], `${idSolicitudDb}_certificado.pdf`);

            nombreArchivos.certificado = `${idSolicitudDb}_certificado.pdf`;
        }

        if (nameFile.formato) {

            formato.files[0] && formData.append("formato", formato.files[0], `${idSolicitudDb}_formato.pdf`);

            nombreArchivos.formato = `${idSolicitudDb}_formato.pdf`;
        }

        if (nameFile.contrato) {

            contrato.files[0] && formData.append("contrato", contrato.files[0], `${idSolicitudDb}_contrato.pdf`);

            nombreArchivos.contrato = `${idSolicitudDb}_contrato.pdf`;
        }

        if (nameFile.Buzon6) {
            Buzon6.files[0] && formData.append("Buzon6", Buzon6.files[0], `${idSolicitudDb}_Buzon6.pdf`);
            nombreArchivos.Buzon6 = `${idSolicitudDb}_Buzon6.pdf`;
        };

        if (nameFile.Buzon7) {
            Buzon7.files[0] && formData.append("Buzon7", Buzon7.files[0], `${idSolicitudDb}_Buzon7.pdf`);
            nombreArchivos.Buzon7 = `${idSolicitudDb}_Buzon7.pdf`;
        };

        if (nameFile.Buzon8) {
            Buzon8.files[0] && formData.append("Buzon8", Buzon8.files[0], `${idSolicitudDb}_Buzon8.pdf`);
            nombreArchivos.Buzon8 = `${idSolicitudDb}_Buzon8.pdf`;
        };

        if (nameFile.Buzon9) {
            Buzon9.files[0] && formData.append("Buzon9", Buzon9.files[0], `${idSolicitudDb}_Buzon9.pdf`);
            nombreArchivos.Buzon9 = `${idSolicitudDb}_Buzon9.pdf`;
        };

        if (nameFile.Buzon10) {
            Buzon10.files[0] && formData.append("Buzon10", Buzon10.files[0], `${idSolicitudDb}_Buzon10.pdf`);
            nombreArchivos.Buzon10 = `${idSolicitudDb}_Buzon10.pdf`;
        };
        if (nameFile.Buzon11) {
            Buzon11.files[0] && formData.append("Buzon11", Buzon11.files[0], `${idSolicitudDb}_Buzon11.pdf`);
            nombreArchivos.Buzon11 = `${idSolicitudDb}_Buzon11.pdf`;
        };
        if (nameFile.Buzon12) {
            Buzon12.files[0] && formData.append("Buzon12", Buzon12.files[0], `${idSolicitudDb}_Buzon12.pdf`);
            nombreArchivos.Buzon12 = `${idSolicitudDb}_Buzon12.pdf`;
        };
        if (nameFile.Buzon13) {
            Buzon13.files[0] && formData.append("Buzon13", Buzon13.files[0], `${idSolicitudDb}_Buzon13.pdf`);
            nombreArchivos.Buzon13 = `${idSolicitudDb}_Buzon13.pdf`;
        };
        if (nameFile.Buzon14) {
            Buzon14.files[0] && formData.append("Buzon14", Buzon14.files[0], `${idSolicitudDb}_Buzon14.pdf`);
            nombreArchivos.Buzon14 = `${idSolicitudDb}_Buzon14.pdf`;
        };
        if (nameFile.Buzon15) {
            Buzon15.files[0] && formData.append("Buzon15", Buzon15.files[0], `${idSolicitudDb}_Buzon15.pdf`);
            nombreArchivos.Buzon15 = `${idSolicitudDb}_Buzon15.pdf`;
        };
        if (nameFile.Buzon16) {
            Buzon16.files[0] && formData.append("Buzon16", Buzon16.files[0], `${idSolicitudDb}_Buzon16.pdf`);
            nombreArchivos.Buzon16 = `${idSolicitudDb}_Buzon16.pdf`;
        };
        if (nameFile.Buzon17) {
            Buzon17.files[0] && formData.append("Buzon17", Buzon17.files[0], `${idSolicitudDb}_Buzon17.pdf`);
            nombreArchivos.Buzon17 = `${idSolicitudDb}_Buzon17.pdf`;
        };
        if (nameFile.Buzon18) {
            Buzon18.files[0] && formData.append("Buzon18", Buzon18.files[0], `${idSolicitudDb}_Buzon18.pdf`);
            nombreArchivos.Buzon18 = `${idSolicitudDb}_Buzon18.pdf`;
        };
        if (nameFile.Buzon19) {
            Buzon19.files[0] && formData.append("Buzon19", Buzon19.files[0], `${idSolicitudDb}_Buzon19.pdf`);
            nombreArchivos.Buzon19 = `${idSolicitudDb}_Buzon19.pdf`;
        };
        if (nameFile.Buzon20) {
            Buzon20.files[0] && formData.append("Buzon20", Buzon20.files[0], `${idSolicitudDb}_Buzon20.pdf`);
            nombreArchivos.Buzon20 = `${idSolicitudDb}_Buzon20.pdf`
        };
        if (nameFile.Buzon21) {
            Buzon21.files[0] && formData.append("Buzon21", Buzon21.files[0], `${idSolicitudDb}_Buzon21.pdf`);
            nombreArchivos.Buzon21 = `${idSolicitudDb}_Buzon21.pdf`;
        };
        if (nameFile.Buzon22) {
            Buzon22.files[0] && formData.append("Buzon22", Buzon22.files[0], `${idSolicitudDb}_Buzon22.pdf`);
            nombreArchivos.Buzon22 = `${idSolicitudDb}_Buzon22.pdf`;
        };
        if (nameFile.Buzon23) {
            Buzon23.files[0] && formData.append("Buzon23", Buzon23.files[0], `${idSolicitudDb}_Buzon23.pdf`);
            nombreArchivos.Buzon23 = `${idSolicitudDb}_Buzon23.pdf`;
        };

        setShowLoading(true);
        let responseFiles = JSON.parse(await uploadBucketS3(formData, idSolicitudDb));
        if (responseFiles.status !== 200) {
            setShowLoading(false);
            setMessageAlert("No se pudieron subir los documentos, intente nuevamente")
            setShowModal(true)

            return
        };

        nombreArchivos.codSolicitud = idSolicitudDb;

        const response = JSON.parse(await queryFileSave(JSON.stringify(nombreArchivos)));
        if (response.state !== 200) {
            await getEstadoDocumentos()
            setShowLoading(false);
            setMessageAlert("Los datos de los archivos no fueron guardados, intente nuevamente")
            setShowModal(true)

            return
        };

        setShowLoading(false);
        setMessageAlert("Archivos cargados correctamente")
        setShowModal(true)

        /* return */
    };

    const endModal = () => {
        setShowModal(false);
    };


    return (
        <>
            {
                showLoading && <Loading />
            }

            {
                (showModal)
                &&
                <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
                    <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
                </DynamicModal>
            }

            <form onSubmit={onSubmitForm}>

                <div className="content-around  h-96 overflow-y-scroll px-2 border lg:p-8 lg:mx-auto my-6 py-4 border-coomeva_color-grisClaroBordes border-opacity-50  rounded-md">

                    <UploadFileItem
                        isUploadFile={isUploadFile.cedula}
                        nameFile={nameFile.cedula}
                        onChangeFile={onChangeFile}
                        description={"Cédula"}
                        campo={"cedula"}
                        deshabilitar={habilitarCampo || (nameFile?.Buzon6 != '' && idSolicitudDb != '')}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.rut}
                        nameFile={nameFile.rut}
                        onChangeFile={onChangeFile}
                        description={"Rut"}
                        campo={"rut"}
                        deshabilitar={habilitarCampo || (nameFile?.Buzon6 != '' && idSolicitudDb != '')}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.certificado}
                        nameFile={nameFile.certificado}
                        onChangeFile={onChangeFile}
                        description={"Certificado Cámara de Comercio"}
                        campo={"certificado"}
                        deshabilitar={habilitarCampo || (nameFile?.Buzon6 != '' && idSolicitudDb != '')}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.formato}
                        nameFile={nameFile.formato}
                        onChangeFile={onChangeFile}
                        description={"Formato firmado"}
                        campo={"formato"}
                        deshabilitar={habilitarCampo || (nameFile?.Buzon6 != '' && idSolicitudDb != '')}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.contrato}
                        nameFile={nameFile.contrato}
                        onChangeFile={onChangeFile}
                        description={"Contrato"}
                        campo={"contrato"}
                        deshabilitar={habilitarCampo || (nameFile?.Buzon6 != '' && idSolicitudDb != '')}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon6}
                        nameFile={nameFile.Buzon6}
                        onChangeFile={onChangeFile}
                        description={"Buzon 6"}
                        campo={"Buzon6"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon7}
                        nameFile={nameFile.Buzon7}
                        onChangeFile={onChangeFile}
                        description={"Buzon 7"}
                        campo={"Buzon7"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon8}
                        nameFile={nameFile.Buzon8}
                        onChangeFile={onChangeFile}
                        description={"Buzon 8"}
                        campo={"Buzon8"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon9}
                        nameFile={nameFile.Buzon9}
                        onChangeFile={onChangeFile}
                        description={"Buzon 9"}
                        campo={"Buzon9"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon10}
                        nameFile={nameFile.Buzon10}
                        onChangeFile={onChangeFile}
                        description={"Buzon 10"}
                        campo={"Buzon10"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon11}
                        nameFile={nameFile.Buzon11}
                        onChangeFile={onChangeFile}
                        description={"Buzon 11"}
                        campo={"Buzon11"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon12}
                        nameFile={nameFile.Buzon12}
                        onChangeFile={onChangeFile}
                        description={"Buzon 12"}
                        campo={"Buzon12"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon13}
                        nameFile={nameFile.Buzon13}
                        onChangeFile={onChangeFile}
                        description={"Buzon 13"}
                        campo={"Buzon13"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon14}
                        nameFile={nameFile.Buzon14}
                        onChangeFile={onChangeFile}
                        description={"Buzon 14"}
                        campo={"Buzon14"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon15}
                        nameFile={nameFile.Buzon15}
                        onChangeFile={onChangeFile}
                        description={"Buzon 15"}
                        campo={"Buzon15"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon16}
                        nameFile={nameFile.Buzon16}
                        onChangeFile={onChangeFile}
                        description={"Buzon 16"}
                        campo={"Buzon16"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon17}
                        nameFile={nameFile.Buzon17}
                        onChangeFile={onChangeFile}
                        description={"Buzon 17"}
                        campo={"Buzon17"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon18}
                        nameFile={nameFile.Buzon18}
                        onChangeFile={onChangeFile}
                        description={"Buzon 18"}
                        campo={"Buzon18"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon19}
                        nameFile={nameFile.Buzon19}
                        onChangeFile={onChangeFile}
                        description={"Buzon 19"}
                        campo={"Buzon19"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon20}
                        nameFile={nameFile.Buzon20}
                        onChangeFile={onChangeFile}
                        description={"Buzon 20"}
                        campo={"Buzon20"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon21}
                        nameFile={nameFile.Buzon21}
                        onChangeFile={onChangeFile}
                        description={"Buzon 21"}
                        campo={"Buzon21"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon22}
                        nameFile={nameFile.Buzon22}
                        onChangeFile={onChangeFile}
                        description={"Buzon 22"}
                        campo={"Buzon22"}
                        deshabilitar={habilitarCampo}
                    />
                    <UploadFileItem
                        isUploadFile={isUploadFile.Buzon23}
                        nameFile={nameFile.Buzon23}
                        onChangeFile={onChangeFile}
                        description={"Buzon 23"}
                        campo={"Buzon23"}
                        deshabilitar={habilitarCampo}
                    />

                </div>
                <p className='text-xs'>Los documentos marcados con * son obligatorios</p>
                <div className='flex justify-end'>
                    <button disabled={!!((idSolicitudDb === '' || idSolicitudDb === undefined))} type='submit' className={`${(idSolicitudDb === '' || idSolicitudDb === undefined) ? 'bg-coomeva_color-grisPestaña' : 'bg-coomeva_color-rojo'}  text-white w-48 text-xs py-3 mt-2 mx-2  rounded-md`}> {deshabilitar ? 'Descargar documentos' : 'Cargar documentos firmados'} </button>
                </div>
            </form>
        </>

    )
}

export default UploadDocument