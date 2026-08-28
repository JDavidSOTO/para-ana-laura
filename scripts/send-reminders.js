// ══════════════════════════════════════════════════════
// Revisa reminders.json y envía una notificación push por
// cada recordatorio cuya fecha sea HOY y no se haya enviado.
// GitHub Actions lo ejecuta una vez al día.
// ══════════════════════════════════════════════════════
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

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

async function enviarATodos(titulo, mensaje) {
  const snapshot = await db.collection('fcm_tokens').get();
  if (snapshot.empty) return { successCount: 0, failureCount: 0 };
  const tokens = snapshot.docs.map(d => d.id);
  return admin.messaging().sendEachForMulticast({
    notification: { title: titulo, body: mensaje, icon: '/img/celebracion.jpg' },
    data: { url: '/' },
    tokens
  });
}

async function main() {
  const recordatorios = JSON.parse(fs.readFileSync(RUTA_RECORDATORIOS, 'utf8'));
  const hoy = hoyISO();
  let huboEnvios = false;

  for (const r of recordatorios) {
    if (r.fecha === hoy && !r.enviado) {
      console.log(`Enviando recordatorio: ${r.titulo}`);
      const resultado = await enviarATodos(r.titulo, r.mensaje);
      console.log(`  -> ${resultado.successCount} éxito(s), ${resultado.failureCount} fallo(s)`);
      r.enviado = true;
      huboEnvios = true;
    }
  }

  if (huboEnvios) {
    fs.writeFileSync(RUTA_RECORDATORIOS, JSON.stringify(recordatorios, null, 2) + '\n');
    console.log('reminders.json actualizado (marcado como enviado).');
  } else {
    console.log('No hay recordatorios para hoy.');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
