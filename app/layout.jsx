//import { Suspense } from 'react';
//import { EventosSession } from './components/EventosSession';
import './globals.css'
import { ProviderRadicacionCliente } from './provider/ProviderRadicacionCliente';
import Providers from './provider/Providers'
import { headers } from "next/headers";

export const metadata = {
  title: 'Xpert Business',
  description: 'App para el control de precios preferenciales bancoomeva generado por Wantn Get',
  icons: {
    icon: "/favicon.ico",
    sizes: "any"
  }
};

export default function RootLayout({ children }) {
  const nonce = headers().get("x-nonce");
  
  return (
    <html lang="es">
      <body>
            <ProviderRadicacionCliente>
            <Providers>{children}</Providers>
            </ProviderRadicacionCliente>
      </body>
    </html>
  )
};