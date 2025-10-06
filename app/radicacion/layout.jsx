
import MenuLaterial from '@/app/components/headers/MenuLaterial'
import { getSession } from '../lib/auth/auth';

export default async function Layout({ children }) {

  const usuario = await getSession()

  return (
    <div className="flex h-screen   flex-col md:flex-row md:overflow-hidden ">
      <div className="w-full lg:h-[100%] sm:h-12 md:h-14 fixed z-40  bg-coomeva_color-rojo flex-none md:w-14">
        <MenuLaterial usuario={usuario?.userBACK?.user} session={usuario?.userBACK?.sesion} />
      </div>
      <div className="flex-grow ml-12 md:overflow-y-auto   md:p-8 bg-coomeva_color-grisFondo">
        {children}
        <footer className='flex mt-4 items-end  justify-center  '>
          <img src="/logos/logogris.svg" priority={'true'} alt="Logo" width={30} height={30} className="w-10 h-12 " />
        </footer>
      </div>
    </div>
  );
};