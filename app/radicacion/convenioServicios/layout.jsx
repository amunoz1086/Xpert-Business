import TabsBar from '@/app/components/share/TabsBar';
import { useProvider } from '@/app/provider/Providers';
import { Tabs } from "@/app/lib/utils"
import EncabezadoMenuPrincipal from '@/app/components/headers/EncabezadoMenuPrincipal';
import { cookies } from 'next/headers';

export default function RootLayout({ children }) {

  const rolActivo = cookies().get('rol')?.value;
  const context = useProvider;

  return (
    <>
       <EncabezadoMenuPrincipal
            
            title={'Menú'}
            subtitle={'Productos'}
            enableInput={{ "input3": true, "input1": true, "input2": true }}
            convenioNegociar={""}
            tipoConv={'Nuevo'}
            perfilActivo={rolActivo}
        />
      <TabsBar Tabs={Tabs} context={context} />
      {children}
    </>
  )
};