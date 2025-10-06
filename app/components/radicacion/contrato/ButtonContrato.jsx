'use client'

// import { PDFViewer } from "@react-pdf/renderer"
import EspecificacionContrato from "./EspecificacionContrato"
import { useState, useContext } from "react"
import { DataContext } from '@/app/provider/Providers';
import ContratoConvenios from "./ContratoConvenios";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const ButtonContrato = () => {
  const context = useContext(DataContext)
  const [pdf, setPdf] = useState(true)

  return (

    <div style={{ minHeight: "100vh" }}>

      {pdf && <PDFViewer className="w-[100%] h-[100rem]"> <EspecificacionContrato dataContext={context} /></PDFViewer>}
      {pdf && <PDFViewer className="w-[100%] h-[100rem]"> <ContratoConvenios dataContext={context} /></PDFViewer>}

    </div>
  )
}

export default ButtonContrato