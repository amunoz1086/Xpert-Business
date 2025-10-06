import { formatearValor } from "@/app/lib/utils";


export default function InputClientPerfil({ activarFocus,inputRef, onBlur, valContext, descripcion, id, name, bgFila, value, inhabilitarInput, nuevoCliente, onChangeInput, onChangeValidacion }) {

    return (
        <div className={`${bgFila == 1 ? "bg-coomeva_color-grisPestaña2" : "bg-white"} h-8 w-full flex justify-between items-center py-1 px-1`}>
            <label className='mx-4 text-coomeva_color-rojo text-start  text-sm font-bold' htmlFor={`${id}.${name}`}>{descripcion}</label>

            <input
                id={`${id}.${name}`}
                name={`${id}.${name}`}
                value={value}
                onChange={onChangeInput}
                className={`outline-none bg-transparent w-[10rem] h-[1.8rem] text-center
                ${inhabilitarInput ? ' border border-coomeva_color-azulOscuro border-opacity-30 rounded-md' : null}
                ${nuevoCliente ? ' border border-coomeva_color-azulOscuro border-opacity-30 rounded-md' : null}
                
                px-2 text-coomeva_color-azulOscuro text-sm`}
                type={"currency"}
                disabled={inhabilitarInput}
                onBlur={onChangeInput}
                
                autoComplete="off"
                ref={inputRef}

                onFocus={
                    activarFocus ?
                        (e) => {
                            e.target.value = formatearValor({ valor: valContext }) || ''
                            e.target.type = "currency";
                        } :
                        (e) => {
                            e.target.value = value || ''
                        }
                }

                onInput={(e) => {
                    const value = e.target.value;

                    const filteredValue = value.replace(/[^\d]/g, '');

                    if (name === "cliente") {
                        e.target.value = value;
                    } else {
                        e.target.value = value.length>0? filteredValue:'';
                  
                    }
                  }}     

            />

        </div>


    )
}

