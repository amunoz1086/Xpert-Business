'use server'

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from "jose";
import { pool } from '../../../config/conectPRICINGDB';
import { val_fn_profile } from '@/app/lib/auth/fn_profile';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { NextResponse } from "next/server";

const encoder = new TextEncoder();
const key = encoder.encode(process.env.KEY_SECRET);

export const getUser = async ({ usuario: foco_user, password: foco_pass }) => {

    let USUARIO = {};

    const dataProfile = await val_fn_profile(foco_user, foco_pass);
    const resDataProfile = JSON.parse(dataProfile);

    //resDataProfile.codeState = 200;

    if (resDataProfile.codeState === 200) {
        const sqlString = `CALL queryLoginUsuario(?)`;

        try {
            const [rows] = await pool.query(sqlString, [foco_user])

            let rowsAffected = rows[0].length

            if (rowsAffected === 2) {
                const perfil1 = rows[0][0]['COD_PERFIL'];
                const perfil2 = rows[0][1]['COD_PERFIL'];
                const usuario = rows[0][0]['USUARIO'];

                const array = [perfil1, perfil2];
                USUARIO.ID_USUARIO = usuario;
                USUARIO.PERFIL = array;
                USUARIO.IP = resDataProfile.ipTransaccion;
            };

            if (rowsAffected === 1) {
                const perfil1 = rows[0][0]['COD_PERFIL'];
                const usuario = rows[0][0]['USUARIO'];

                const array = [perfil1];
                USUARIO.ID_USUARIO = usuario;
                USUARIO.PERFIL = array;
                USUARIO.IP = resDataProfile.ipTransaccion;
            };

            if (rowsAffected !== 0) {
                USUARIO.status = true;
                USUARIO.message = 'ok';
                console.log(`Database Responses: ${JSON.stringify(USUARIO)}`);
                return JSON.stringify(USUARIO);

            } else {
                USUARIO.status = false;
                USUARIO.message = 'Usuario sin perfil, contacte a su supervisor';
                return JSON.stringify(USUARIO);
            };

        } catch (err) {
            USUARIO.status = false;
            USUARIO.message = err.code;
            console.log(`Login error:`, err);
            return JSON.stringify(USUARIO);
        };

    } else {
        USUARIO.status = false;
        USUARIO.message = resDataProfile.message;
        return JSON.stringify(USUARIO);
    };
};


export async function encrypt(payload) {
    const lOGIN_TIMEDOUT = process.env.TIMEDOUT_lOGIN;

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        // .setExpirationTime("8h")
        //.setExpirationTime(lOGIN_TIMEDOUT + 'm')
        .sign(key);
};


export async function decrypt(input) {

    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });

        return payload;

    } catch (error) {
        // console.log(error)
        return undefined;
    };
};


//adminLogin
export async function adminLogin(prevState, formData) {
    try {
        let path = ''
        const { foco_user, foco_pass } = Object.fromEntries(formData);
        const usuario = JSON.parse(await getUser({ usuario: foco_user, password: foco_pass }));

        if (!usuario.status) {
            return {
                status: false,
                message: usuario.message
            };
        };

        const validarSession = await crearSessionUsuario(usuario.ID_USUARIO, usuario.IP);

        if (validarSession.sessionActiva === 1) {
            return {
                status: false,
                sessionActiva: true,
                message: `Este usuario ya tiene una session activa en ${validarSession.ip}`,
                token: validarSession.token
            };
        } else {
            path = await generarSesion(usuario.ID_USUARIO, usuario.PERFIL, validarSession.token);
        };

        return { path: path };

    } catch (error) {
        console.log(error);
    };
};


export const generarSesion = async (user, rol, sesion) => {

    const userBACK = { user, rol, sesion };
    const lOGIN_TIMEDOUT = process.env.TIMEDOUT_lOGIN;
    const oneDay = lOGIN_TIMEDOUT * 60 * 10000;
    const oneDayToken = 24 * 60 * 60;
    const session = await encrypt({ userBACK, oneDay });

    cookies().set("session", "", { expires: new Date(0) });

    cookies().set("session", session,
        {
            maxAge: oneDay,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });
    cookies().set('staux', sesion,
        {
            maxAge: oneDayToken,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        })

    return DEFAULT_LOGIN_REDIRECT;
};


const hasCookie = () => {
    return cookies().has('session');
};


export const crearSessionUsuario = async (usuarioId, usuarioIP) => {
    try {
        await pool.query('CALL crear_o_recuperar_sesion(?, ?, @p_token, @p_mensaje, @p_ip, @p_sessionActiva)', [usuarioId, usuarioIP]);
        const [results] = await pool.query('SELECT @p_token as token, @p_mensaje as mensaje, @p_ip as ip, @p_sessionActiva as sessionActiva');
        const { token, mensaje, ip, sessionActiva } = results[0];

        return { token, mensaje, ip, sessionActiva };

    } catch (error) {
        console.error('Error al llamar al procedimiento almacenado:', error);
    };
};


export async function logout() {
    try {

        const token = await obtenerTokenSession()

        if (token?.value) {

            try {
                const row = await eliminarSession(token?.value);

                if (row) {
                    cookies().set("rol", "", { expires: new Date(0) });
                    cookies().set("session", "", { expires: new Date(0) });
                    cookies().set("staux", "", { expires: new Date(0) });
                    return true
                }

            } catch (error) {
                console.log(error)
            }
        }

    } catch (error) {
        console.log(error);
    };
};


export const eliminarSession = async (token) => {

    try {
        const [rows] = await pool.query('DELETE FROM sessions WHERE token=?', [token]);

        return rows.affectedRows > 0;

    } catch (error) {
        console.error('Error al eliminar la session:', error);
    };
};


export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;

    try {
        return await decrypt(session);

    } catch (error) {
        console.log(error)
        return null
    }
};


export async function updateSession(request) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();

    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
};


export const crearCookiPerfilTemporal = ({ rol }) => {
    const oneDayToken = 24 * 60 * 60;
    cookies().set("rol", rol, {
        maxAge: oneDayToken,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    })
};


export const obtenerCookiePerfil = async () => {
    const rol = cookies().get('rol');
    return rol
};


export const obtenerTokenSession = async () => {
    const tokenSesion = cookies().get('staux');
    return tokenSesion
};


export const obtenerPerfilProducto = async (req) => {

    const { pUsuario } = JSON.parse(req);
    const sqlString = `CALL queryPerfilProducto(?)`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString, [pUsuario]);
        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Usuario sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0][0].COD_PERF_PRODUCTO;
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log(error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const authValidate = async (req) => {
    console.log(req);
    const stauxVal = await obtenerTokenSession();
    const { rol, id } = JSON.parse(req);

    const authPerfil = {};
    const sqlString = `CALL querySesion(?, ?)`;

    try {
        const [rows] = await pool.query(sqlString, [stauxVal.value, rol]);
        if (rows[0][0].result === 1) {
            authPerfil.state = 200;
            return JSON.stringify(authPerfil);
        };

        throw new Error('Acceso no autorizado');

    } catch (e) {
        console.log(e);
        authPerfil.state = 500;
        authPerfil.message = 'Acceso no autorizado';
        return JSON.stringify(authPerfil);
    };
};