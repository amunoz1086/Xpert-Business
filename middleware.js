import { buildCSP, createResponseWithCSP } from "@/app/lib/middleware/csp";
import { verifyAuth } from "@/app/lib/middleware/auth";

export async function middleware(req) {
    const url = req.nextUrl.clone();

    // 1. CSP base
    const { nonce, csp } = buildCSP();
    const baseResponse = createResponseWithCSP(req, nonce, csp);

    // 2. Auth solo en rutas privadas
    if (url.pathname.startsWith("/login/perfil")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    if (url.pathname.startsWith("/login/opciones")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    if (url.pathname.startsWith("/login/depositoVista")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    if (url.pathname.startsWith("/login/administracion")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    if (url.pathname.startsWith("/administracion/usuarios")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    if (url.pathname.startsWith("/radicacion/depositoPlazo")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    if (url.pathname.startsWith("/radicacion/aperturaCuenta")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    if (url.pathname.startsWith("/radicacion/asignarCupo")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    if (url.pathname.startsWith("/radicacionCliente/radicacionPj/datosPersonaJuridicaPj")) {
        const authResult = await verifyAuth(req, csp);
        if (authResult) return authResult;
    };

    // 3. Retornar respuesta con CSP
    return baseResponse;
}

export const config = {
    matcher: ["/login/:path*", "/administracion/:path*", "/radicacion/:path*", "/radicacionCliente/:path*", "/(.*)"],
};
