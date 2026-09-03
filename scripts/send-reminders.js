// ══════════════════════════════════════════════════════
// Revisa reminders.json y envía una notificación push por
// cada recordatorio cuya fecha sea HOY, cuya hora coincida
// con esta ejecución, y que no se haya enviado.
// GitHub Actions lo ejecuta a las 9am y a las 5am (hora Colombia);
// cada recordatorio decide en cuál de las dos le toca sonar.
// ══════════════════════════════════════════════════════
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Hora de esta ejecución: '05:00' o '09:00'. Si no se especifica
// (ej. al correrlo a mano), se asume el horario normal de 9am.
const HORA_EJECUTAR = process.env.HORA_EJECUTAR || '09:00';

const RUTA_RECORDATORIOS = path.join(__dirname, '..', 'reminders.json');

function hoyISO() {
  // Fecha de hoy en zona horaria de Colombia (UTC-5), formato YYYY-MM-DD
  const ahora = new Date();
  const bogota = new Date(ahora.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  const y = bogota.getFullYear();
  const m = String(bogota.getMonth() + 1).padStart(2, '0');
  const d = String(bogota.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

async function enviarATodos(titulo, mensaje, vibrar) {
  const snapshot = await db.collection('fcm_tokens').get();
  if (snapshot.empty) return { successCount: 0, failureCount: 0 };
  const tokens = snapshot.docs.map(d => d.id);
  return admin.messaging().sendEachForMulticast({
    notification: { title: titulo, body: mensaje, icon: '/para-ana-laura/img/celebracion.jpg' },
    data: { url: '/', vibrar: vibrar ? '1' : '0' },
    webpush: vibrar ? { fcmOptions: {}, notification: { vibrate: [300, 100, 300, 100, 300, 100, 500] } } : undefined,
    tokens
  });
}

async function main() {
  const recordatorios = JSON.parse(fs.readFileSync(RUTA_RECORDATORIOS, 'utf8'));
  const hoy = hoyISO();
  let huboEnvios = false;

  for (const r of recordatorios) {
    const horaDeEste = r.hora || '09:00';
    if (r.fecha === hoy && !r.enviado && horaDeEste === HORA_EJECUTAR) {
      console.log(`Enviando recordatorio (${horaDeEste}): ${r.titulo}`);
      const resultado = await enviarATodos(r.titulo, r.mensaje, r.especial === true);
      console.log(`  -> ${resultado.successCount} éxito(s), ${resultado.failureCount} fallo(s)`);
      r.enviado = true;
      huboEnvios = true;
    }
  }

  if (huboEnvios) {
    fs.writeFileSync(RUTA_RECORDATORIOS, JSON.stringify(recordatorios, null, 2) + '\n');
    console.log('reminders.json actualizado (marcado como enviado).');
  } else {
    console.log(`No hay recordatorios para hoy a las ${HORA_EJECUTAR}.`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
