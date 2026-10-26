// ══════════════════════════════════════════════════════
// MENSAJE DEL DÍA — notificación de cada mañana.
//   node scripts/send-mensaje-diario.js
//
// · Toma el mensaje de hoy de mensajes-del-dia.txt (el mismo que muestra la
//   tarjeta "Mensaje de hoy" de la portada) y lo envía a todos los dispositivos
//   suscritos (colección fcm_tokens).
// · Si hoy hay un recordatorio especial en reminders.json, NO envía el mensaje
//   del día (ese día manda el recordatorio y no llegan dos avisos seguidos).
//   Para probar igual: FORZAR=true.
// · Se envía como mensaje "solo datos": el service worker (firebase-messaging-sw.js)
//   arma la notificación. Así el texto y el toque en la notificación los controla la
//   página y no puede salir duplicada.
// ══════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');
const { fechaBogota, leerMensajes, mensajeDelDia, hayRecordatorioEn } = require('./lib-mensajes');

const TITULO = 'Buenos días 💛';
const RAIZ = path.join(__dirname, '..');

/**
 * Arma y envía el mensaje. Recibe todo lo que necesita (para poder probarlo sin Firebase):
 *   db, messaging (firebase-admin) · ahora (Date) · textoMensajes · recordatorios · forzar
 */
async function enviarMensajeDiario({ db, messaging, ahora = new Date(), textoMensajes, recordatorios = [], forzar = false, log = console.log }) {
  const hoy = fechaBogota(ahora);
  const mensajes = leerMensajes(textoMensajes);
  if (!mensajes.length) throw new Error('mensajes-del-dia.txt no tiene ningún mensaje (las líneas que empiezan con # no cuentan).');

  if (!forzar && hayRecordatorioEn(recordatorios, hoy)) {
    log(`Hoy (${hoy}) hay un recordatorio especial: no se envía el mensaje del día.`);
    return { enviado: false, motivo: 'recordatorio' };
  }

  const snapshot = await db.collection('fcm_tokens').get();
  if (snapshot.empty) {
    log('No hay dispositivos suscritos todavía. Nada que enviar.');
    return { enviado: false, motivo: 'sin-dispositivos' };
  }
  const tokens = snapshot.docs.map((d) => d.id);
  const mensaje = mensajeDelDia(mensajes, hoy);

  const respuesta = await messaging.sendEachForMulticast({
    data: { titulo: TITULO, mensaje, url: '/', tag: 'mensaje-del-dia' },
    // Si el celular está apagado o sin internet, el mensaje caduca a las 12 h
    // (un "buenos días" no debe llegar al día siguiente).
    webpush: { headers: { TTL: '43200', Urgency: 'normal' } },
    tokens,
  });
  log(`Mensaje del día enviado: ${respuesta.successCount} éxito(s), ${respuesta.failureCount} fallo(s).`);

  // Limpia tokens inválidos (p. ej. alguien quitó el permiso o desinstaló la app)
  const invalidos = [];
  respuesta.responses.forEach((r, i) => {
    const codigo = r.error && r.error.code;
    if (!r.success && (codigo === 'messaging/registration-token-not-registered' || codigo === 'messaging/invalid-registration-token')) {
      invalidos.push(tokens[i]);
    }
  });
  await Promise.all(invalidos.map((t) => db.collection('fcm_tokens').doc(t).delete()));
  if (invalidos.length) log(`Limpieza: ${invalidos.length} token(s) inválido(s) eliminado(s).`);

  return { enviado: true, exitos: respuesta.successCount, fallos: respuesta.failureCount, mensaje, hoy };
}

module.exports = { enviarMensajeDiario, TITULO };

if (require.main === module) {
  const { iniciarAdmin } = require('./lib-json');
  const admin = iniciarAdmin();
  let recordatorios = [];
  try { recordatorios = JSON.parse(fs.readFileSync(path.join(RAIZ, 'reminders.json'), 'utf8')); }
  catch (e) { console.warn('No se pudo leer reminders.json (se envía el mensaje del día igual):', e.message); }

  enviarMensajeDiario({
    db: admin.firestore(),
    messaging: admin.messaging(),
    textoMensajes: fs.readFileSync(path.join(RAIZ, 'mensajes-del-dia.txt'), 'utf8'),
    recordatorios,
    forzar: process.env.FORZAR === 'true',
  }).catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
}
