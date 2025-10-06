import Image from 'next/image'

export default function Loading() {
  return (
    <div className="w-full h-full bg-modal fixed z-50 flex inset-0 bg-transparent">
      <div className="flex justify-center items-center flex-col m-auto">
        <Image
          id="vectorLoading"
          src="/logos/logogris.svg"
          width={128}
          height={128}
          alt="loading"
          priority               // sólo cuando es true
          className="w-32 h-32"
        />
      </div>
    </div>
  )
}
