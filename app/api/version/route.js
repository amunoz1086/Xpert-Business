import { NextResponse } from 'next/server';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('../../../package.json');

/**
 * API route handler que devuelve la versión actual de la aplicación.
 *
 * @function GET
 * @returns {Promise<NextResponse<{version: string}>>} Respuesta JSON con la versión de la app.
 *
 * @example
 * // Respuesta JSON:
 * {
 *   "version": "1.2.3"
 * }
 */
export const GET = () => {
    try {
        return NextResponse.json({ version: pkg.version });
    } catch (err) {
        console.log('###', err)
        return NextResponse.json({ error: 'Error interno: ' + err.message }, { status: 500 });
    };
};