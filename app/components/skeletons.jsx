const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function MenuPrincipalSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-2 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex space-x-20 overflow-hidden rounded-xl bgra p-2 shadow-sm`}
    >
      <div className="w-60 h-60 flex-col  truncate rounded-xl bg-white px-4 py-8">
        <div className="h-6 w-[90%] rounded-md bg-gray-100" />
        <div className="h-6 w-[90%] mt-4 rounded-md bg-gray-100" />
        <div className="h-6 w-[90%] mt-4 rounded-md bg-gray-100" />
      </div>
      <div className="w-60 h-60 flex-col  truncate rounded-xl bg-white px-4 py-8">
        <div className="h-6 w-[90%] rounded-md bg-gray-100" />
        <div className="h-6 w-[90%] mt-4 rounded-md bg-gray-100" />
        <div className="h-6 w-[90%] mt-4 rounded-md bg-gray-100" />
      </div>
      <div className="w-60 h-60 flex-col  truncate rounded-xl bg-white px-4 py-8">
        <div className="h-6 w-[90%] rounded-md bg-gray-100" />
        <div className="h-6 w-[90%] mt-4 rounded-md bg-gray-100" />
        <div className="h-6 w-[90%] mt-4 rounded-md bg-gray-100" />
      </div>
    </div>
  );
}

export function PerfilCLienteSkeleton() {
  return (
    <div
      className={`${shimmer} mb-4 overflow-hidden rounded-xl bg-white animate-pulse mt-11  shadow-md`}
    >

      <div className=" bg-white" />
      <div className="h-8  mt-4  bg-coomeva_color-grisPestaña2" />
      <div className="h-4 " />
      <div className="h-8  mt-4  bg-coomeva_color-grisPestaña2" />
      <div className="h-4 bg-white" />
      <div className="h-8  mt-4  bg-coomeva_color-grisPestaña2" />
      <div className="h-4 bg-white" />
      <div className="h-8  mt-4  bg-coomeva_color-grisPestaña2" />
      <div className="h-4 bg-white" />
      <div className="h-8  mt-1  bg-white" />

    </div>
  );
}

export function RecaudoOficinaSkeleton() {
  return (
    <div className="bg-white rounded-md px-2 py-2 mb-3 shadow-md">
      <div
        className={`${shimmer}  overflow-hidden rounded-md bg-white animate-pulse   shadow-md`}
      >

        <div className=" bg-white" />
        <div className="h-8  mt-4  bg-coomeva_color-grisPestaña2" />
        <div className="h-4 " />
        <div className="h-8  mt-4  bg-coomeva_color-grisPestaña2" />
        {/* <div className="h-4 bg-white" />
      <div className="h-8  mt-4  bg-coomeva_color-grisPestaña2" />
      */}

      </div>
    </div>
  );

}