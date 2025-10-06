// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { USER_SMS_STATUS } from "../../../config/contentHeader";


function EncAdministrador({ tituloActual, stateBtn, presionarBtn }) {

  const [stateOpcion, setStateOpcion] = useState("");
  const [titulo, setTitulo] = useState();
  const [actualizacion, setActualizacion] = useState();
  //const [fnGuardar, setFnGuardar] = useState(false);

  useEffect(() => {
    document.getElementById("btnGuardar").setAttribute("disabled", true)
    setStateOpcion(tituloActual);
    if (stateOpcion === "convenioPago") {
      setTitulo(USER_SMS_STATUS.TITULOCONVENIODEPAGO);
    }
    if (stateOpcion === "convenioRecaudo") {
      setTitulo(USER_SMS_STATUS.TITULOCONVENIODERECAUDO);
    }
    if (stateOpcion === "serviciosFinancieros") {
      setTitulo(USER_SMS_STATUS.TITULOSERVICIOSFINANCIEROS);
    }
    if (stateOpcion === "depositoAlaVista") {
      setTitulo(USER_SMS_STATUS.TITULODEPOSITOSALAVISTA);
    }

    setActualizacion(stateBtn);
    if (actualizacion === true) {
      activarBtnGuardar();
    }
    if (actualizacion === false) {
      inicializarGuardar()
    }
  });

  const inicializarGuardar = () => {
    let guardarBtn = document.getElementById("btnGuardar")
    guardarBtn.setAttribute("disabled", true)
    guardarBtn.classList.add("disabled_btn-user");
    guardarBtn.style.background = "#0000003D";
  }

  const activarBtnGuardar = () => {
    let guardarBtn = document.getElementById("btnGuardar")
    guardarBtn.style.background = "#B71C1C";
    guardarBtn.classList.remove("disabled_btn-user");
    guardarBtn.removeAttribute("disabled")
  }


  return (

    <div className="flex flex-col justify-center items-center h-[80%] w-[100%]">
      <div id="contentCabecera" className="flex h-[100%] w-[80%]">
        <div
          id="logo"
          className="md:flex md:items-start md:justify-start sm:flex sm:items-center sm:justify-center h-[100%] w-[30%]"
        >
          <div className="relative flex items-start text-center ">
            <img
              className="mx-auto w-11 h-11"
              width={50}
              height={50}
              src="/img/logo192.png"
              alt="logo bancoomeva"
            ></img>
            <h1
              /* style={{ color: "#077341" }} */
              className="absolute left-6 top-5 font-bold text-2xl hidden sm:block h1LogoAministracion"
            >
              Bancoomeva
            </h1>
            <h3
              /* style={{ color: "#349784" }} */
              className="absolute left-16 top-12 font-bold text-xs hidden sm:block whitespace-nowrap h3LogoAministracion"
            >
              Nos facilita la vida
            </h3>
          </div>
        </div>
        <div
          id="titulo"
          className="sm:justify-center sm:items-end sm:text-sm md:text-lg md:flex justify-center md:items-end h-[100%] w-[40%]"
        >
          <h1 className=" semi-bold tituloAdministracion" /* style={{ color: "#B71C1C" }} */ >
            {titulo}
          </h1>
        </div>
        <div
          id="boton"
          className=" p-4 flex justify-end items-center h-[100%] w-[20%]"
        >
          <button onClick={guardar} id="btnGuardar" className={`disabled_btn-user flex justify-center items-center w-[80%] h-8 text-[#f9f9f9] rounded-md shadow hover:shadow-lg px-4 py-2`}>
            Guardar
          </button>
        </div>
        <div
          id="icono"
          className="space-x-6 flex justify-center items-center h-[100%] w-[10%]"
        >
          <div className=" flex justify-center items-center h-[30%] w-50%">
            {/* <Image
              className="cursor-pointer mx-auto w-full h-full"
              width={25}
              height={25}
              src="/icon/houseIcon.svg"
              alt="Icono Home"
            ></Image> */}
            <img
              className="cursor-pointer mx-auto w-full h-full"
              width={25}
              height={25}
              src="/icon/houseIcon.svg"
              alt="Icono Home"
            ></img>
          </div>
          <div className="flex justify-center items-center h-[30%] w-50%">
            {/* <Image
              className="mx-auto w-full h-full"
              width={25}
              height={25}
              src="/icon/retrocederIcon.svg"
              alt="Icono Regresar"

            ></Image> */}
            <img
              className="mx-auto w-full h-full"
              width={25}
              height={25}
              src="/icon/retrocederIcon.svg"
              alt="Icono Regresar"

            ></img>
          </div>
        </div>
      </div>


    </div>


  );
}
export default EncAdministrador;
