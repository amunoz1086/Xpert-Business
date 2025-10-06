'use client'

import Modals from "@/app/components/share/Modals";
import UploadFileItem from "../../documentos/UploadFileItem";
import { useEffect, useRef, useState } from "react";
import { ImPlus } from "react-icons/im";
import dynamic from "next/dynamic";
import { uploadBucketS3, downloadBucketS3 } from "@/app/lib/documentos/bucketS3Pool";
import { idbDatabaseLocal, insertBuzon, queryBuzon } from "@/app/lib/services/localBd/indexedDB";
import { queryInsertBuzo } from "@/app/lib/solicitudes/queryInsertBuzo";
import { deletePublicDoc } from '@/app/lib/documentos/deletePublicDoc';
import { queryDataBuzon } from "@/app/lib/solicitudes/queryDataBuzon";

const DynamicModal = dynamic(() => import('@/app/components/share/Modals'));

const TipoConvenio = ({ rolUsuario, context, id, titulo, descripcion, dimensionTextArea = { columna: 36, fila: 4, maxCaractere: 200 } }) => {

  const { updateServicioFinanciero, servicioFinanciero, estadoSolicitud, idSolicitudDb } = context;
  const habilitarInputRol = (rolUsuario !== '' && rolUsuario !== 2) || (rolUsuario !== '' && rolUsuario === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3);
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [archivoNoValido, setArchivoNoValido] = useState(false);
  const scrollRef = useRef(null);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  }, [items]);


  useEffect(() => {
    createDBLocal();
    contenBuzon();
  }, []);


  const createDBLocal = async () => {
    if (idSolicitudDb === '') {
      await idbDatabaseLocal();
    };
  };


  const contenBuzon = async () => {

    try {
      const contenItem = [];
      let nItems = 0;
      const dataBuzon = await queryDataBuzon(idSolicitudDb);

      if (dataBuzon.STATUS === 200) {
        const dBuzon = JSON.parse(dataBuzon.DATA);
        for (let dconten of dBuzon) {
          nItems++
          const dItem = {
            id: nItems,
            nameFile: dconten.descripcion,
            descripcion: `buzon ${nItems}`
          };
          contenItem.push(dItem);
        };
      };

      if (idSolicitudDb === '') {
        const dataBozonLocal = JSON.parse(JSON.stringify(await queryBuzon()));
        if (dataBozonLocal.status === 200) {
          const dBuzonLocal = dataBozonLocal.contains;
          for (let dcontenLocal of dBuzonLocal) {
            nItems++
            const dItemLocal = {
              id: nItems,
              nameFile: dcontenLocal.fileName,
              descripcion: `buzon ${nItems}`
            };
            contenItem.push(dItemLocal);
          };
        };
      };

      setItems(contenItem);

    } catch (error) {
      console.log(error);
    };
  };


  const agregarBuzon = () => {
    if (items.length > 0) {
      const ultimoItem = items[items.length - 1];
      if (!ultimoItem.nameFile || !ultimoItem.descripcion) {
        return;
      }
    }
    const numItem = items.length + 1
    const nuevoItem = {
      id: items.length + 1, nameFile: ``, descripcion: `buzon ${numItem}`, campo: `buzon${numItem}`, nuevo: true
    }
    setItems(prevItems => [...prevItems, nuevoItem]);
  };


  const actualizarContext = (e) => {
    if (e.target.value !== '') {
      updateServicioFinanciero('tipoConvenio', e.target.value)
    }
  };


  const validarInputObligarorio = (e) => {
    const formId = document.getElementById('servicioFinanciero')
    if (!formId.checkValidity()) {
      formId.reportValidity()
    }
  };


  const onChangeFile = async (e) => {
    try {
      if (e.target.files[0].type !== "application/pdf") {
        setMessageAlert("Tipo archivo no valido. Solo admite pdf");
        setShowModal(true);
        setArchivoNoValido(true);
        return;
      };

      const nuevoItem = {
        nameFile: e.target.files[0].name,
        existArchiv: true
      };

      setItems(prevItems =>
        prevItems.map(item =>
          item.campo === e.target.name ? { ...item, ...nuevoItem } : item
        )
      );

    } catch (error) {
      if (e.target.files[0] !== undefined) {
        console.error(error);
      } else {
        setMessageAlert("No selecciono ningún archivo");
        setShowModal(true);
      };
    };
  };


  const onSubmitForm = async () => {
    const frmData = new FormData();

    try {

      items.forEach(async (item, i) => {
        if (item.nuevo) {
          const fileInput = document.getElementById(`${item.campo}`);
          if (fileInput.value !== '') {
            frmData.append(`${item.campo}`, fileInput.files[0]);
          }
        }
      });

      if (idSolicitudDb !== '') {
        const directoryName = `Buzon_${idSolicitudDb}`
        const respBucket = JSON.parse(await uploadBucketS3(frmData, directoryName));

        if (respBucket.status === 200) {
          const respInsertBuzon = JSON.parse(await insertFileBuzon(frmData));

          if (respInsertBuzon.state === 200) {
            setMessageAlert("Archivos cargados correctamente");
            setShowModal(true);
            contenBuzon();
          } else {
            setMessageAlert("No se logró actualizar los datos de los archivos cargados");
            setShowModal(true);
          };

        } else {
          setMessageAlert("Carga de archivos fallida, intente nuevamente");
          setShowModal(true);
        };

      } else {
        await diferirCarga(frmData);
      };

    } catch (error) {
      console.error(error)
    };

  };


  const insertFileBuzon = async (frmDt) => {
    let resInsertBuzon;
    for (const keys of frmDt.entries()) {
      const file = frmDt.get(`${keys[0]}`);
      let dataDoc = {};

      dataDoc.name = keys[0]
      dataDoc.file = file.name;
      dataDoc.idSolicitud = idSolicitudDb;
      resInsertBuzon = await queryInsertBuzo(JSON.stringify(dataDoc));
    };
    return resInsertBuzon;
  };


  const diferirCarga = async (frmDt) => {

    try {
      const responseOpen = JSON.parse(await idbDatabaseLocal());

      if (responseOpen.status === 200) {
        for (const keys of frmDt.entries()) {
          const file = frmDt.get(`${keys[0]}`);
          const fileByte = await file.arrayBuffer();
          const fileBuffer = Buffer.from(fileByte);

          let dataDoc = {};
          dataDoc.name = keys[0]
          dataDoc.file = file.name;
          dataDoc.buffer = fileBuffer;

          await insertLocalDBBuzon(dataDoc);
        };

      };
    } catch (error) {
      console.error(error);
    };
  };


  async function insertLocalDBBuzon(containsBuzon) {
    try {
      const responseQuery = JSON.parse(await insertBuzon(containsBuzon));
      if (responseQuery.status === 200) {
        setMessageAlert("Carga de Archivos diferida hasta la Solicitud de Aprobación");
        setShowModal(true);
        contenBuzon();
      } else {
        throw new Error('No fue posible almacenar temporalmente los archivos')
      };

    } catch (error) {
      console.error(error);
    };
  };


  const descargarImage = async (nombreArchivo) => {

    const fileName = nombreArchivo;
    const idSolicitud = `Buzon_${idSolicitudDb}`;
    let message = {};

    try {
      const responseDownloadBucket = JSON.parse(await downloadBucketS3(idSolicitud, fileName));

      if (responseDownloadBucket.status === 200) {
        const responseDownload = await downloadClient(idSolicitud, fileName);

        if (responseDownload.status === 200) {
          message.message = `¡Descarga de documento ${fileName} completada!`;
          message.code = responseDownload.status;
          await notoficacionDescarga(message, idSolicitud);
        } else {
          message.message = `¡Descarga de documento ${fileName} al cliente fallida`;
          message.code = responseDownload.status;
          await notoficacionDescarga(message, idSolicitud);
        };

      } else {
        message.message = `¡Descarga de documento ${fileName} desde el contenedor fallida!`;
        message.code = responseDownloadBucket.status;
        await notoficacionDescarga(message, idSolicitud);
      };

    } catch (error) {
      console.log(error);
    };

  };


  const downloadClient = async (idSolicitud, fileName) => {
    let resStatus = {};

    try {
      const resp = await fetch("/api/downloadClient", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idSolicitud, fileName })
      });

      if (resp.status === 200) {
        const blob = await resp.blob();

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        resStatus.status = 200;
        return resStatus;

      } else {
        resStatus.status = 204;
        return resStatus;
      };

    } catch (error) {
      console.error(error);
      resStatus.status = 204;
      return resStatus;
    };
  };


  const notoficacionDescarga = async (notificacion, idSolicitud) => {
    setMessageAlert(`${notificacion.message}`);
    setShowModal(true);

    if (notificacion.code === 200) {
      setTimeout(() => {
        deletePublicDoc(idSolicitud);
      }, 3000);
    };
  };


  const endModal = () => {
    if (archivoNoValido) {
      setShowModal(false)
      setModal(true)
      return
    }
    setShowModal(false)
    setModal(false)
  };


  const cerrarModal = () => {
    setModal(false);

    for (let i = 0; i < items.length; i++) {
      if (items[i].nameFile === '') {
        items.splice(i, 1);
      };
    };

    let deleteItemsNoGuardados = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i].hasOwnProperty('nuevo')) {
        items.splice(i, 1);
        i--;
        deleteItemsNoGuardados++;
      };
    };

    if (deleteItemsNoGuardados > 0) {
      setMessageAlert(`Se han eliminado ${deleteItemsNoGuardados} buzones no guardados.`);
      setShowModal(true);
    };
  };


  return (
    <div className=' bg-white  rounded-md border border-gray-100 shadow-md px-4 py-3 mt-5'>
      <div className="flex justify-between items-center ">

        <h3 className='text-coomeva_color-rojo font-semibold text-sm '>{titulo}</h3>
        <button onClick={() => { setModal(true) }} className="w-20 shadow-md h-7 text-coomeva_color-rojo rounded-md hover:bg-coomeva_color-rojo  hover:text-white transition text-xs font-medium border border-coomeva_color-rojo">Buzon</button>

      </div>

      <p className='mt-2 text-coomeva_color-grisLetras text-sm'>{descripcion}</p>

      <form id="formTipoConvenio" onSubmit={validarInputObligarorio}>
        <textarea
          id={id}
          name={id}
          defaultValue={servicioFinanciero?.tipoConvenio || ''}
          cols={dimensionTextArea.columna}
          rows={dimensionTextArea.fila}
          // onInvalid={(e) => e.target.setCustomValidity('Campo obligatorio.')}
          onInput={(e) => e.target.setCustomValidity('')}
          maxLength={200}
          className='rounded-md font-semibold mt-4 w-full bg-coomeva_color-grisFondo outline-none border shadow-sm p-2 text-sm text-coomeva_color-azulOscuro '
          // onChange={onChangeTextArea}
          onBlur={actualizarContext}
          // required
          disabled={habilitarInputRol}
        >
        </textarea>
      </form>

      {
        modal ?
          <Modals titulo={'Buzon'} habilitarBotomContinuar={items.length > 0 && items[0]?.nameFile != '' && items[0]?.nuevo != false} iconoAlert={false} w={50} cerrarModal={() => { cerrarModal() }} mostrarImagneFondo={true} mostrarModal={onSubmitForm} >
            <div className="w-full flex justify-end"> <button onClick={agregarBuzon} className="bg-white text-coomeva_color-rojo hover:text-white rounded-sm w-6 h-6 flex justify-center items-center shadow-lg border hover:bg-coomeva_color-rojo  transition border-coomeva_color-rojo "><ImPlus size={12} /></button></div>
            <div className="w-full h-48 overflow-y-scroll py-3 border bg-white rounded-md shadow-sm p-4">
              {
                items.map((item, i) => (
                  <UploadFileItem key={i}
                    isUploadFile={item.existArchiv}
                    nameFile={item.nameFile}
                    onChangeFile={onChangeFile}
                    description={item.descripcion}
                    campo={item.campo}
                    textoLabel={false}
                    descargarImage={(e) => descargarImage(item.nameFile)}
                    idSolicitudDb={idSolicitudDb}
                    estadoArchivo={!item.nuevo}
                  // deshabilitar={deshabilitar}
                  />
                ))
              }
              <div ref={scrollRef} />
            </div>
          </Modals>
          : undefined
      }

      {
        (showModal)
        &&
        <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={true}>
          <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageAlert}</p>
        </DynamicModal>
      }

    </div>
  )
}

export default TipoConvenio