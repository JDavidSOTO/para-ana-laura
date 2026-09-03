// ══════════════════════════════════════════════════════
// Envía una notificación push a todos los tokens guardados
// en Firestore (colección "fcm_tokens").
// Se ejecuta automáticamente vía GitHub Actions en cada
// actualización del sitio. También puede correrse a mano:
//   node scripts/send-notification.js "Título" "Mensaje"
// ══════════════════════════════════════════════════════
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

async function main() {
  const titulo = process.argv[2] || 'Hay algo nuevo para ti 💛';
  const mensaje = process.argv[3] || 'Actualicé nuestra página, ven a verla.';

  const snapshot = await db.collection('fcm_tokens').get();
  if (snapshot.empty) {
    console.log('No hay dispositivos suscritos todavía. Nada que enviar.');
    return;
  }

  const tokens = snapshot.docs.map(d => d.id);
  const mensajePush = {
    notification: { title: titulo, body: mensaje, icon: '/para-ana-laura/img/celebracion.jpg' },
    data: { url: '/' },
    tokens
  };

  const respuesta = await admin.messaging().sendEachForMulticast(mensajePush);
  console.log(`Enviado: ${respuesta.successCount} éxito(s), ${respuesta.failureCount} fallo(s).`);

  // Limpia tokens inválidos/expirados (p.ej. Ana desinstaló o borró el permiso)
  const tokensInvalidos = [];
  respuesta.responses.forEach((r, i) => {
    if (!r.success) {
      const codigo = r.error && r.error.code;
      if (codigo === 'messaging/registration-token-not-registered' || codigo === 'messaging/invalid-registration-token') {
        tokensInvalidos.push(tokens[i]);
      }
    }
  });
  await Promise.all(tokensInvalidos.map(t => db.collection('fcm_tokens').doc(t).delete()));
  if (tokensInvalidos.length) console.log(`Limpieza: ${tokensInvalidos.length} token(s) inválido(s) eliminado(s).`);
}

main().catch(err => { console.error(err); process.exit(1); });
