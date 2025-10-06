
export default function EstructuraTabla({ children,titulo,hidden }) {

    return (
        <div className="p-1  h-full w-full relative ">
            <div className="container w-full">
                <fieldset className="border bg-white shadow-md rounded-md w-full">
                    <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
                        <h2 className={`${hidden ?'text-transparent':'text-coomeva_color-rojo'} text-sm font-semibold mt-4 w-60 text-center`}>{titulo}</h2>
                    </legend>
                    {
                        children
                    }
                </fieldset>
            </div>
        </div>
    )
}
