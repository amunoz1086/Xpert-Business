import React from 'react'

export const ModalDocumento = ({ children }) => {
  return (
    <div
      // style={{ backgroundImage:"url('/BackgroundModal.png')" , backgroundSize: "cover" }} 
      className="fixed  z-[99] inset-0  flex justify-center items-center transition-all fondoModal bg-cover ">
      {children}
    </div>
  )
}
