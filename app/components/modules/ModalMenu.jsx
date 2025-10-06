import React from "react";

const ModalMenu = (props) => {

  const disableButtonOne = {
    display: props.viewBtnOne
  }
  const disableButtonSecond = {
    display: props.viewBtnSecond
  }

  const alignImagen = {
    width: '100%',
    height: '7rem',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const alignContent = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '7rem',
  }

  return (
    <div className="w-full h-full bg-modal fixed z-50 inset-0 flex">
      <div className="flex justify-center items-center flex-col w-72 rounded-lg shadow-xl p-2 bg-white m-auto">
        <div style={alignImagen}>
          <img src='/logos/Trophy.jpg' width={165} alt="logo rojo j" />
        </div>
        <div style={alignContent}>
          <h2 className="text-base mt-2 mx-4 text-gray-800 font-semibold text-center">
            {props.modalMenssage}
          </h2>
        </div>
        <div className="flex justify-between">
          <button
            className="my-5 w-auto px-8 h-10 bg-green-600 text-white rounded-md shadow hover:shadow-lg font-semibold m-2"
            style={disableButtonOne}
            onClick={props.clickBtnOne}
          >
            {props.valBtnOne}
          </button>
          <button
            className="my-5 w-auto px-8 h-10 bg-red-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
            style={disableButtonSecond}
            onClick={props.clickBtnSecond}
          >
            {props.valBtnSecond}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMenu;