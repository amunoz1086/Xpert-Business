'use server'

/**
 * ORQUESTADOR – versión robusta
 * – 1 petición por grupo (menos latencia)  
 * – Ejecución paralela con Promise.all  
 * – Sin JSON.parse innecesarios y sin reventar cuando el backend devuelve
 *    undefined, string vacío o un error estructurado.
 */

import { fn_crearModificarParticipantes } from '@/app/lib/apisClientePj/fn_crearModificarParticipantes'
import { fn_restCrearModificarClientePj } from '@/app/lib/services/cobis/fn_restCrearModificarClientePj'

/* ───────────────────────── utils ───────────────────────── */
/**
 * Intenta parsear sólo si recibe texto JSON; nunca lanza excepción.
 *  - string JSON válido   → objeto
 *  - string no‑JSON       → string original
 *  - null/undefined       → null
 *  - objeto               → objeto original
 */
function safeParse(val) {
  if (val == null) return null
  if (typeof val === 'string') {
    try { return JSON.parse(val) } catch { return val }
  }
  return val
}

/* ============================================================================
 *                               ORQUESTADOR
 * ==========================================================================*/
export const fn_orquestadorCrearModificar = async (data) => {
  const { datosBasicos, informacionFinanciera, participantes = {} } = JSON.parse(data)

  /* ---------- normalizadores por grupo ----------------------------------- */
  const normalizers = {
    representanLegal: (p) => ({ ...p, tipoPersona: 'CC', participante: '2' }),
    contactosAutorizados: (p) => ({ ...p, tipoPersona: 'CC', participante: '7' }),
    juntaDirectiva: (p) => p,
    accionistas: (p) => p.tipoPersona === 'NIT'
      ? { ...p, identificacion: p.numeroIdentificacion }
      : p,
    controlantes: (p) => ({ ...p, participante: '4' }),
    beneficiariosFinales: (p) => {
      const base = { ...p, participante: '1' }
      return p.tipoPersona === 'NIT'
        ? { ...base, identificacion: p.numeroIdentificacion }
        : base
    }
  }

  const grupos = Object.keys(normalizers)   // ['representanLegal', …]

  /* ---------- envía cada grupo en paralelo (máx. 1 request por grupo) ---- */
  async function sendGroup(key) {
    // 1) Saca la lista de participantes de esa categoría
    const list = Array.isArray(participantes[key]) ? participantes[key] : []
    if (list.length === 0) return []

    // 2) Aplica tu normalizador (tipoPersona, participante, identificación…)
    const payload = list.map(normalizers[key])

    // 3) Llama al API con el batch completo
    const raw = await fn_crearModificarParticipantes(JSON.stringify(payload))

    // 4) Parseo seguro: si raw es string, JSON.parse; si ya es objeto, lo dejas
    const res = typeof raw === 'string' ? JSON.parse(raw) : raw

    // 5) Si viene error controlado, aborta con mensaje
    if (res.status && res.status !== 200) {
      throw new Error(`Backend ${res.status}: ${res.message}`)
    }

    // 6) == Acá está la clave: DEVUELVES **TODOS** los objetos que vienen en res.data
    //    y **éstos incluyen** el CustomerRightSide que inyecta el backend.
    return Array.isArray(res.data) ? res.data : []
  }

  let participantesEnriquecidos = []
  try {
    participantesEnriquecidos = (await Promise.all(grupos.map(sendGroup))).flat()
  } catch (err) {
    console.error('[orquestador] Error creando/modificando participantes:', err)
    return JSON.stringify({ status: 'ERROR', message: err.message })
  }

  /* ---------- llamada final a COBIS -------------------------------------- */
  try {
    const dataCrear = await fnDatosBasicos(
      datosBasicos,
      informacionFinanciera,
      participantesEnriquecidos
    )

    if (!dataCrear.ok) {
      throw new Error(dataCrear.message || 'Fallo en COBIS')
    }

    return JSON.stringify({
      status: dataCrear.data?.status,
      message: dataCrear.data?.message ?? dataCrear.data?.operationData
    })
  } catch (err) {
    console.error('[orquestador] Error en fnDatosBasicos:', err)
    return JSON.stringify({
      status: 'ERROR',
      message: err.message || 'Fallo al registrar datos básicos'
    })
  }
}

/* ============================================================================
 *                           fnDatosBasicos
 * ==========================================================================*/
async function fnDatosBasicos(
  pDatosBasicos,
  pInformacionFinanciera,
  pParticipantes
) {
  const REL_ATTR_RULES = {
    '1': () => [{ Code: 1, Value: '14' }],
    '2': () => [{ Code: 1, Value: 'T' }],
    '3': (p) => [{ Code: 2, Value: parseFloat(p.Porcentaje || 0).toFixed(2) }],
    '4': () => [{ Code: 1, Value: 'A3' }],
    '5': () => [{ Code: 1, Value: 'T' }],
    '7': () => []
  }

  // 1️⃣  Filtrar y alertar si falta RelationShip o CustomerRightSide
  const saneados = pParticipantes.map((p, idx) => {
    if (!p?.RelationShip?.Code) {
      console.warn(`[fnDatosBasicos] participante #${idx} sin RelationShip.Code`, p)
      return null
    }
    if (!p?.CustomerRightSide?.Code) {
      console.warn(`[fnDatosBasicos] participante #${idx} sin CustomerRightSide.Code`, p)
      return null          // o asigna un valor por defecto si el backend lo permite
    }
    return p
  }).filter(Boolean)        // elimina los null

  if (!saneados.length) {
    return { ok: false, status: 400, data: null, message: 'Participantes inválidos' }
  }

  // 2️⃣  Construir payload con seguridad
  const payloadParticipantes = saneados.map((p) => {
    const base = {
      RelationShip: { Code: `${p.RelationShip.Code}` },
      CustomerRightSide: { Code: `${p.CustomerRightSide.Code}` },
      Side: `${p.Side}`,
    }
    const relAttr = (REL_ATTR_RULES[p.RelationShip.Code] || (() => []))(p)
    return relAttr.length ? { ...base, RelationshipAttribute: relAttr } : base
  })

  // 3️⃣  Llamada al servicio COBIS
  const raw = await fn_restCrearModificarClientePj(
    pDatosBasicos,
    pInformacionFinanciera,
    payloadParticipantes
  )
  const resp = safeParse(raw)

  if (!resp) return { ok: false, status: 500, data: null, message: 'Respuesta vacía de COBIS' }
  if (resp.status && resp.status !== 200)
    return { ok: false, status: resp.status, data: null, message: resp.message }

  return { ok: true, status: 200, data: resp, message: resp.message }
}

