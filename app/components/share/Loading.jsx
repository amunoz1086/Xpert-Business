
const Loading = () => {
    return (

        <div className="w-full h-full bg-modal fixed z-[99999] flex inset-0 bg-transparent">
            <div className="flex justify-center items-center flex-col    m-auto ">
                <img id="vectorLoading" src='/logos/logogris.svg' width={30} height={30} alt='loading' className='w-32 h-32' priority={"false"} />
            </div>
        </div>

    )
}

export default Loading