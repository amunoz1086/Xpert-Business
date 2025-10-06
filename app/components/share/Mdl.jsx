'use client'

import Image from "next/image";

const Mdl = (props) => {

  const disableButtonOne = { display: props.viewBtnOne, };
  const disableButtonSecond = { display: props.viewBtnSecond, };

  return (
    <div className="bg-black bg-opacity-30 justify-center items-center w-full h-full fixed z-50 inset-0 flex">
      <div style={{
        backgroundColor: "rgb(244, 246, 247)", width: "35%", height: "40%",
        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)", border: 'solid 1px grey'
      }} className="p-3 flex justify-center items-center flex-col rounded-xl shadow-xl"
      >
        <div className="w-[100%] h-[25%] flex justify-center items-center">
          <div style={{
            backgroundImage: "url('/logos/logorojo.svg')",
            backgroundSize: "contain", backgroundRepeat: "no-repeat"
          }} className="flex justify-end items-end w-[35%] h-[100%]"
          >
            <h1 style={{ color: "#012940" }} className="font-bold text-2xl ">Notificación</h1>
          </div>
        </div>
        <div className="justify-center flex items-center flex-col h-[60%]">
          <div className="flex items-end h-[45%]">
            <Image className="w-12 h-12" width={50} height={50} alt="imagen modal" src='/modal/icono.svg'></Image>
          </div>
          <div className="flex items-center h-[55%]">
            <h2 style={{ color: "#012940" }} className="text-base  mx-4 font-semibold text-center">
              {props.modalMenssage}
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-around w-[80%] h-[15%] ">
          <button
            className="bg-[#B71C1C] w-[45%] h-8 text-white rounded-md shadow hover:shadow-lg"
            style={disableButtonOne}
            onClick={props.clickBtnOne}
          >
            {props.valBtnOne}
          </button>
          <button
            className="bg-[#979797ff] w-[45%] h-8 text-white rounded-md shadow hover:shadow-lg "
            style={disableButtonSecond}
            onClick={props.clickBtnSecond}
          >
            {props.valBtnSecond}
          </button>
        </div>
      </div>
    </div >
  );
};

export default Mdl;