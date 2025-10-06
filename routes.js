/**
 * array de rutas publcas
 */

export const publicRoutes = [
    
    "/login",
    "/loginPrueba",
    "/radicacion"
]

export const authRoutes = [
    "/",
    "/login/perfil",
   
    "/radicacion/solicitud",
    "/radicacion/convenioServicios",
    "/radicacion/convenioServicios/convenioRecaudo",
    "/radicacion/convenioServicios/servicioFinanciero",
    "/radicacion/depositoVista",
    "/radicacion/resumen",
    "/radicacion/configuracion",
    "/creditoNuevo"
    // "/login/perfil"
]

/**
 * ruta que se redireciona despues de login
 */

export const DEFAULT_LOGIN_REDIRECT = '/login/perfil'