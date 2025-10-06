'use client'

export default function InfoUser({ usuario }) {


  return (
    <>
      <div className=" rounded-full overflow-hidden  border-2 bg-emerald-700  border-gray-600  ">
        <img
          src="/headers/perfil.svg" alt="Foto Perfil" width={50} height={50} className=' object-cover'
        />
      </div>
      <p className='text-center text-[11px] text-[#fff] font-normal' /* style={{fontSize:'11px',color:'#fff',fontWeight:400}} */>{usuario}</p>

      <hr className="md:my-4 hr-white" />
    </>
  )
}
