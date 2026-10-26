// ══════════════════════════════════════════════════════
// Conversión Firestore ↔ JSON sin perder los tipos especiales
// (fechas, ubicaciones, referencias y bytes se guardan con una etiqueta
// "__tipo" para poder reconstruirlos exactamente al restaurar).
// ══════════════════════════════════════════════════════
'use strict';
const path = require('path');

const nombreDeClase = (v) => (v && v.constructor && v.constructor.name) || '';
const esTimestamp  = (v) => !!v && typeof v === 'object' && typeof v.toDate === 'function'
                              && typeof v.seconds === 'number' && typeof v.nanoseconds === 'number';
const esGeoPoint   = (v) => !!v && typeof v === 'object' && nombreDeClase(v) === 'GeoPoint';
const esReferencia = (v) => !!v && typeof v === 'object' && nombreDeClase(v) === 'DocumentReference'
                              && typeof v.path === 'string';

/** Firestore → JSON (claves ordenadas para que el archivo sea estable entre respaldos) */
function aJson(v) {
  if (v === undefined) return null;
  if (v === null || typeof v !== 'object') return v;
  if (Array.isArray(v)) return v.map(aJson);
  if (esTimestamp(v))  return { __tipo: 'fecha', segundos: v.seconds, nanosegundos: v.nanoseconds };
  if (esGeoPoint(v))   return { __tipo: 'ubicacion', latitud: v.latitude, longitud: v.longitude };
  if (esReferencia(v)) return { __tipo: 'referencia', ruta: v.path };
  if (Buffer.isBuffer(v) || v instanceof Uint8Array) return { __tipo: 'bytes', base64: Buffer.from(v).toString('base64') };
  const salida = {};
  for (const k of Object.keys(v).sort()) salida[k] = aJson(v[k]);
  return salida;
}

/** JSON → Firestore */
function deJson(v, admin, db) {
  if (v === null || typeof v !== 'object') return v;
  if (Array.isArray(v)) return v.map((x) => deJson(x, admin, db));
  switch (v.__tipo) {
    case 'fecha':      return new admin.firestore.Timestamp(v.segundos, v.nanosegundos);
    case 'ubicacion':  return new admin.firestore.GeoPoint(v.latitud, v.longitud);
    case 'referencia': return db.doc(v.ruta);
    case 'bytes':      return Buffer.from(v.base64, 'base64');
  }
  const salida = {};
  for (const k of Object.keys(v)) salida[k] = deJson(v[k], admin, db);
  return salida;
}

/** Lee todos los documentos de una colección (y sus subcolecciones) */
async function exportarColeccion(col) {
  const snap = await col.get();
  const docs = [];
  for (const d of snap.docs) {
    const item = { id: d.id, datos: aJson(d.data()) };
    const sub = {};
    for (const sc of await d.ref.listCollections()) sub[sc.id] = await exportarColeccion(sc);
    if (Object.keys(sub).length) item.subcolecciones = sub;
    docs.push(item);
  }
  docs.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return docs;
}

/** Escribe documentos en una colección. Con escribir=false solo cuenta (simulacro). */
async function importarColeccion(col, docs, ctx) {
  let n = 0;
  for (const item of docs) {
    const ref = col.doc(item.id);
    if (ctx.escribir) await ref.set(deJson(item.datos, ctx.admin, ctx.db));
    n++;
    for (const [nombre, subdocs] of Object.entries(item.subcolecciones || {})) {
      n += await importarColeccion(ref.collection(nombre), subdocs, ctx);
    }
  }
  return n;
}

/** Inicia firebase-admin con la cuenta de servicio (variable de entorno o archivo) */
function iniciarAdmin() {
  const admin = require('firebase-admin');
  let credencial;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    credencial = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_FILE) {
    credencial = admin.credential.cert(require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_FILE)));
  } else {
    throw new Error('Falta la cuenta de servicio: define FIREBASE_SERVICE_ACCOUNT (el contenido del .json) o FIREBASE_SERVICE_ACCOUNT_FILE (la ruta del archivo).');
  }
  admin.initializeApp({ credential: credencial });
  return admin;
}

module.exports = { aJson, deJson, exportarColeccion, importarColeccion, iniciarAdmin };
