'use client'
export const CheckDesplazable = ({titulo,subtitulo,name,onclickCheck,valorInput}) => {

    const isChecked = valorInput=='on'?true:false;


    return (
        <div className='border border-gray-300 rounded-md  my-2  flex justify-between items-center px-2 py-3'>
            <div>  <span className="   ">{titulo}</span>
            <p>{subtitulo}</p>
             </div>
            <label className="relative flex items-center my-1 cursor-pointer ">
                <input id={name} name={name} onChange={onclickCheck}  checked={isChecked} type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 hover:bg-gray-200 peer-focus:outline-0  rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-transparent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-coomeva_color-rojo hover:peer-checked:bg-coomeva_color-rojo "></div>

            </label>
        </div>
    )
}
