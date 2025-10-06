import { pool } from "@/config/conectPRICINGDB";
import { unstable_noStore as noStore } from 'next/cache';

// in-memory cache for “static” procs
const _cache = new Map();

/**
 * call any stored proc with no args
 * auto-caches results for `ttlMs` (default: 5m)
 */
async function callProc(name, { ttlMs = 300_000 } = {}) {
    noStore();
    // if cached and not expired
    const entry = _cache.get(name);
    if (entry && Date.now() < entry.expires) {
        return entry.value;
    }

    let resp = { STATUS: 500, DATA: null, MESSAGE: '' };
    const sql = `CALL ${name}()`;
    try {
        const [rows] = await pool.query(sql);
        const data = rows[0] || [];
        if (data.length === 0) {
            resp.STATUS = 202;
            resp.MESSAGE = `${name} returned no rows`;
        } else {
            resp.STATUS = 200;
            resp.DATA = data;
        }
    } catch (err) {
        console.error(`${name} error`, err);
        resp.STATUS = 500;
        resp.CODE = err.code;
        resp.MESSAGE = err.sqlMessage;
    }

    // cache only successful lookups
    if (resp.STATUS === 200) {
        _cache.set(name, {
            expires: Date.now() + ttlMs,
            value: resp
        });
    }
    return resp;
}

const procs = [
    'queryDataCampos',
    'queryAdquirencia',
    'queryCorresponsales',
    'queryGastosDirectosOficina',
    'queryGastosDirectosPse',
    'queryJustificacionOficina',
    'queryJustificacionPse',
    'queryParametrosEfecty',
    'queryRecaudoOficina',
    'queryRecaudoPse',
    'queryFrecuenciaNomina',
    'queryPagoTerseros',
    'queryNegociarNomina',
    'querypermitirNegociar',
    'queryPromedioNomina',
    'queryPlanRemuneracion',
    'queryServiciosFinancieros',
    'queryListarReciprocidadMinima'
];

// exporta cada proc como una función que llama a callProc(name) y convierte el resultado a string
export const {
    queryDataCampos,
    queryAdquirencia,
    queryCorresponsales,
    queryGastosDirectosOficina,
    queryGastosDirectosPse,
    queryJustificacionOficina,
    queryJustificacionPse,
    queryParametrosEfecty,
    queryRecaudoOficina,
    queryRecaudoPse,
    queryFrecuenciaNomina,
    queryPagoTerseros,
    queryNegociarNomina,
    querypermitirNegociar,
    queryPromedioNomina,
    queryPlanRemuneracion,
    queryServiciosFinancieros,
    queryListarReciprocidadMinima
} = procs.reduce((all, name) => {
    // para cada nombre de proc, produce una función que llama a callProc(name) y convierte el resultado a string
    // y lo exporta como una función con el mismo nombre
    all[name] = async () => JSON.stringify(await callProc(name));
    return all;
}, {});

// Se pueden exportat con un TTL diferente:
// export async function queryAdquirencia() {
//     return JSON.stringify(await callProc('queryAdquirencia', { ttlMs: 30_000 }));
// }

// Se usa igual que antes:
// import { queryDataCampos, queryAdquirencia, … } from './querys';
// Y cada uno retorna un JSON string igual que antes, pero bajo el capó comparten una función + caché.
