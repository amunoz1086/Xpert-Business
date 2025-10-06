// lib/middleware/auth.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const encoder = new TextEncoder();
const key = encoder.encode(process.env.KEY_SECRET);

export async function verifyAuth(req, cspValue) {
    try {
        const accessToken = req.cookies.get("session")?.value;
        if (!accessToken) throw new Error("Token ausente o invalido");

        await jwtVerify(accessToken, key, { algorithms: ["HS256"] });

        return null; // null significa OK (no hay error)
    } catch (err) {
        console.log("❌ invalid token", err);
        const html = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                  <meta charset="UTF-8">
                  <title>401 - Acceso denegado</title>
                  <style>
                    img{width: 35%;}
                    body { display:flex; justify-content:center; align-items:center; height:100vh; background:#f9fafb; }
                    .card { padding:2rem; border-radius:1rem; background:#fff; box-shadow:0 2px 6px rgba(0,0,0,0.1); text-align:center; }
                    h2 { color:#d62429; }
                    a { display:inline-block; margin-top:1rem; padding:.5rem 1rem; background:#d62429; color:#fff; border-radius:.5rem; text-decoration:none; }
                  </style>
                </head>
                <body>
                  <div class="card">
                    <img src="/login/LOGO_XPERT BUSIMESS_LIENZO_CORTO.png" alt="">
                    <h2>401 - Acceso denegado</h2>
                    <p>No tienes permisos para acceder a esta sección.</p>
                    <a href="/login">Ir al login</a>
                  </div>
                </body>
                </html>
        `;
        const unauthorized = new NextResponse(html, {
            status: 401,
            headers: { "Content-Type": "text/html" },
        });
        unauthorized.headers.set("Content-Security-Policy", cspValue);
        return unauthorized;
    }
}
