'use client'

/* bibliotecas */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
/* servicios */
import { crearCookiPerfilTemporal, getSession, authValidate } from '@/app/lib/auth/auth';
import { fnQueryTipoAprobador } from '@/app/lib/auth/actions';
/* hooks */
import { usePerfil } from '@/app/hooks/usePerfil';
/* utilities */
import { rawParsedData } from '@/app/lib/utils';
import Loading from '@/app/loading';
import { useDatosFuncionProvider } from '@/app/hooks/useDatosFuncionProvider';


const DynamicModal = dynamic(() => import('@/app/components/share/Modals'), { ssr: false });


export default function PerfilLink({ roles, perfil, perfilProducto }) {

  const [showModal, setShowModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const endModal = () => setShowModal(false);


  const rolesActivos = () => {
    if (roles?.includes(2)) {
      return 2
    }

    if (roles?.includes(6)) {
      return 6
    }
  };


  const tipoRedireccionAprobador = async () => {
    try {
      setShowLoading(true);
      const rawData = await fnQueryTipoAprobador();
      const rawTipoAprobador = await rawParsedData(rawData);

      if (rawTipoAprobador) {
        const tipoAprobador = JSON.parse(rawData);

        if (!Array.isArray(tipoAprobador.data)) {
          throw `Elemento data no se cargo correctamente, intentelo nuevamente`;
        };

        if (tipoAprobador.data[0].cod_aprobador === 23) {
          return "/radicacion/asignarCupo";
        };

        throw `El tipo de aprobador: ${tipoAprobador.data[0].tipo_aprobador}, no tiene funciones habilitadas. Comuníquese con el administrador.`;

      } else {
        throw `No fue posible leer el tipo de aprobador, intentelo nuevamente`;
      };

    } catch (error) {
      setShowLoading(false);
      setMessageModal(`${error}`);
      setShowModal(true);
      return "";

    } finally {
      setShowLoading(false);
    };

  };


  const { limpiarProviderContext } = useDatosFuncionProvider();
  const { limpiarProviderRadicacionCliente } = usePerfil();
  const router = useRouter();


  const menuSeleccionPerfil = [
    {
      id: 1,
      name: "Radicación",
      subName: "",
      rol: rolesActivos(),
      redirect: '/login/opciones',
      img: {
        url: "radicacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(roles?.some(e => e === 2) || roles?.some(e => e === 6)) // Radicación, sin Perfil
    },
    {
      id: 2,
      name: "Aprobación",
      subName: "",
      rol: 3,
      redirect: tipoRedireccionAprobador,
      img: {
        url: "aprobacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(roles?.some(e => e === 3)) // Aprobación
    },
    {
      id: 3,
      name: "Parametrización",
      subName: "",
      rol: 4,
      redirect: "/radicacion/bandejaSolicitudes",
      img: {
        url: "parametrizacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(roles?.some(e => e === 4)) // Parametrización
    },
    {
      id: 4,
      name: "Administrador",
      subName: "",
      rol: 1,
      redirect: "/login/administracion",
      img: {
        url: "administracion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(roles?.some(e => e === 1)) // Administración
    },
    {
      id: 5,
      name: "Consulta",
      subName: "",
      rol: 5,
      redirect: "/radicacion/bandejaSolicitudes",
      img: {
        url: "parametrizacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(roles?.some(e => e === 5)) // Consulta
    },
  ];


  const menuSeleccionOpcion = [
    {
      id: 6,
      name: "Clientes",
      subName: "Crear, Consultar y Actualizar Cliente PJ",
      rol: 2,
      redirect: "/radicacionCliente/radicacionPj/datosPersonaJuridicaPj",
      img: {
        url: "radicacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(roles?.some(e => e === 2))
    },
    {
      id: 7,
      name: "Productos del Pasivo",
      subName: "Apertura Productos Cuentas, CDT y Sobregiro",
      rol: 6,
      redirect: "/login/depositoVista",
      img: {
        url: "aprobacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(roles?.some(e => e === 6))
    }
  ];


  const menuDespositoVista = [
    {
      id: 8,
      name: "Depositos a la Vista",
      subName: "Apertura de Cuentas, Maestras y PAP",
      rol: 601,
      redirect: "/radicacion/aperturaCuenta",
      img: {
        url: "radicacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(perfilProducto?.some(e => e === 601))
    },
    {
      id: 9,
      name: "Registrar Cupo Sobregiro",
      subName: "Crear Cupo Sobregiro cta Corriente",
      rol: 602,
      redirect: "/radicacion/asignarCupo",
      img: {
        url: "parametrizacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(perfilProducto?.some(e => e === 602))
    },
    {
      id: 10,
      name: "Depositos a Plazo",
      subName: "Consultar, Simular y Crear CDT's",
      rol: 608,
      redirect: "/radicacion/depositoPlazo",
      img: {
        url: "aprobacion.webp",
        alt: "",
        opacity: 0,
      },
      disabled: !(perfilProducto?.some(e => e === 608))
    }
  ];


  const fnMenu = (pPerfil) => {
    switch (pPerfil) {
      case 1: {
        return menuSeleccionPerfil;
      }
      case 2: {
        return menuSeleccionOpcion;
      }
      case 3: {
        return menuDespositoVista;
      }
      default:
        return menuSeleccionPerfil;
    }
  };


  const [rolPerfil] = useState(fnMenu(perfil));


  useEffect(() => {
    limpiarProviderContext(true)
    limpiarProviderRadicacionCliente()
  }, []);


  const crearCookie = async (rol, pId, link) => {
    setShowLoading(true);
    const resDataRol = {
      "rol": rol,
      "id": pId
    };
    try {

      const rawAuhValidacion = JSON.parse(await authValidate(JSON.stringify(resDataRol)));
      if (rawAuhValidacion.state === 200) {
        crearCookiPerfilTemporal({ rol: rol });
        const rols = await getSession();
        if (rols) {
          router.push(link);
        };
        setShowLoading(false);
        return;
      };

      throw new Error('Acceso no autorizado');

    } catch (error) {
      console.log(error);
      setShowLoading(false);
      router.push('/login');
    };

  };


  return <>
    {rolPerfil.map((perfil) => (
      <button
        onClick={async () => {
          const redirect = typeof perfil.redirect === "function"
            ? await perfil.redirect()
            : perfil.redirect;
          crearCookie(perfil.rol, perfil.id, redirect)
        }}
        key={perfil.id}
        className=''
        disabled={perfil.disabled}
      >
        <section
          className={`relative w-full h-[6.5rem] flex flex-col justify-end rounded-md  p-3 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/15 after:rounded-xl   ${perfil.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          style={{
            backgroundImage: ` url(/perfiles/${perfil.img.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-white z-50 text-start">
            <h1 className="text-2xl">{perfil.name}</h1>
            <h2 className="text-xl font-light">{perfil.subName === "" ? perfil.name.toLocaleLowerCase() : perfil.subName.toLocaleLowerCase()}</h2>
          </div>
        </section>
      </button>
    ))}
    {
      showLoading && <Loading />
    }
    {
      (showModal)
      &&
      <DynamicModal titulo={'Notificación'} mostrarModal={endModal} ocultarBtnCancelar={true} textBtnContinuar="Ok" mostrarImagneFondo={false}>
        <p className="w-full text-sm text-center text-[#002e49f3] font-semibold">{messageModal}</p>
      </DynamicModal>
    }
  </>
};