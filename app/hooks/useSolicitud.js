import {useRef, useState } from "react"
import { useProvider } from "../provider/Providers"

export const useSolicitud = (rolActivo) => {

    const context =useProvider()

    const { solicitud,estadoSolicitud } = context
    
    const habilitarInput = (rolActivo !== '' && rolActivo !== 2) || (rolActivo !== '' && rolActivo === 2) && (estadoSolicitud !== '' && estadoSolicitud !== 3)

    const valid = (solicitud.tipoProducto?.credito && solicitud.tipoOperacion?.nuevo) || (solicitud.tipoProducto?.convenio && solicitud.tipoOperacion?.nuevo)


    const [convenio, setConvenio] = useState(
        valid ? solicitud : { tipoConvenio: { convenioPago: false, convenioRecaudo: false } }
    )

    const [enableButton, setEnableButton] = useState(valid)


    const frmForm = useRef(null)

    const onChangeSave = (e) => {

        const chekck = document.getElementById(`${e.target.id}`)

        chekck.checked ? chekck.classList.add('bg-coomeva_color-azulClaro') : chekck.classList.remove('bg-coomeva_color-azulClaro')

        const formData = new FormData(frmForm.current)

        const checkCampo = Array.from(formData.entries())
            .filter(([name, value]) => {
                const field = frmForm.current.elements.namedItem(name);
                return field && field.type === 'checkbox' && field.checked;
            })
            .reduce((acc, [name, value]) => {
                acc[name] = value;
                return acc;
            }, {});

        if (checkCampo.Convenio && checkCampo.Nuevo || checkCampo.Crédito && checkCampo.Nuevo) {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }

        const dataContext = {
            tipoProducto: {
                'credito': checkCampo['Crédito'],
                'convenio': checkCampo['Convenio']
            }
            , tipoOperacion: {
                'nuevo': checkCampo['Nuevo']
            }
            , tipoConvenio: {
                'convenioPago': checkCampo['convenioPago'],
                'convenioRecaudo': checkCampo['convenioRecaudo'],
                'servicioFinanciero': '3'
            }
        }

        setConvenio(dataContext)

    }

  return{
    context,
    habilitarInput,
    convenio,
    enableButton,
    frmForm,
    solicitud,
    onChangeSave

  }
}

