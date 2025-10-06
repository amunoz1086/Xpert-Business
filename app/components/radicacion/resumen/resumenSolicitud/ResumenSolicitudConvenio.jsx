
import { useEffect, useRef } from "react";
import CheckInput from "../../layout/botonesElementos/CheckInput";


const ResumenSolicitudConvenio = ({ updateContexts = false }) => {

  const formRef = useRef(null)

  useEffect(() => {

    updateContexts && updateContextForm()

  }, [updateContexts])

  const updateContextForm = () => {

    const formData = new FormData(formRef.current);

    const formValues = {};

    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    // TODO falta actualizar el context


  };

  return (
    <main className="w-full h-full overflow-auto ">
      <div className=' px-3 py-5  bg-white shadow-md rounded-md my-2'>
        <h2 className='w-[98%] m-auto mb-6 text-red-700  font-roboto'>Convenio</h2>
        <form ref={formRef} className='grid grid-cols-12  divide-x  text-sm text-slate-900'>
          <div className='w-full col-span-3 px-4 '>
            <CheckInput
              labelText={"Convenio de pago"}
              id={'convenioPago'}
              value={"1"}
              enable={false}
            />
            <div className='ml-10 mt-4'>
              <div className='space-y-2'>
                <CheckInput
                  labelText={"Pago nómina"}
                  id={"pagoNomina"}
                  value={"2"}
                  enable={false}
                />
                <CheckInput
                  labelText={"Pago terceros"}
                  id={"pagoTerceros"}
                  value={"3"}
                  enable={false}
                />
              </div>
            </div>
          </div>
          <div className='w-full col-span-6 px-4'>
            <CheckInput
              labelText={"Convenio de recaudo"}
              id={"convenioRecaudo"}
              value={"4"}
              enable={false}
            />
            <div className='flex ml-10 mt-4 gap-x-4'>
              <div className='space-y-2'>
                <CheckInput
                  labelText={"Código de barras"}
                  id={"codigoBarras"}
                  value={"5"}
                  enable={false}
                />
                <CheckInput
                  labelText={"Manual - referencia"}
                  id={"manualReferencia"}
                  value={"6"}
                  enable={false}
                />
                <CheckInput
                  labelText={"Financiamiento"}
                  id={"financiamiento"}
                  value={"7"}
                  enable={false}
                />
              </div>
              <div className='space-y-2'>
                <CheckInput
                  labelText={"PSE recaudo"}
                  id={"pseRecaudo"}
                  value={"8"}
                  enable={false}
                />
                <CheckInput
                  labelText={"Portal del pagos"}
                  id={"portalPago"}
                  value={"9"}
                  enable={false}
                />

              </div>
              <div className='space-y-2'>
                <CheckInput
                  labelText={"Corresponsal"}
                  id={"corresponsal"}
                  value={"10"}
                  enable={false}
                />
                <CheckInput
                  labelText={"Adquirencia"}
                  id={"adquirencia"}
                  value={"11"}
                  enable={false}
                />

              </div>
            </div>
          </div>
          <div className='w-full col-span-3 px-4'>
            <CheckInput
              labelText={"Servicio financiero"}
              id={"servicioFinanciero"}
              value={"12"}
              enable={false}
            />
          </div>

        </form>
      </div>
    </main>
  );
};

export default ResumenSolicitudConvenio;
