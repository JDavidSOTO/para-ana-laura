// ══════════════════════════════════════════════════════
// NOTIFICACIONES PUSH
// Pide permiso, obtiene el token FCM y lo guarda en Firestore
// para poder enviarle notificaciones a Ana Laura después.
//
// IMPORTANTE: reemplaza VAPID_KEY_AQUI por la "clave pública"
// que generas en Firebase Console → Configuración del proyecto
// → Cloud Messaging → Certificados push web → Generar par de claves.
// ══════════════════════════════════════════════════════
const VAPID_KEY = 'BHtaaPR5UIDjkTKEYFa9rQ0PDdZHM_6c4AgUFy_-y5vNRV1kVrTFzOtqqOlYQuFe2QAs_qV5EodoEowcuSY9fUABHtaaPR5UIDjkTKEYFa9rQ0PDdZHM_6c4AgUFy_-y5vNRV1kVrTFzOtqqOlYQuFe2QAs_qV5EodoEowcuSY9fUA';

let messaging = null;
try {
  if ('serviceWorker' in navigator && firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
} catch (e) {
  console.warn('Notificaciones no soportadas en este navegador:', e);
}

function notifSetEstado(texto, tipo) {
  const el = document.getElementById('notifEstado');
  if (!el) return;
  el.textContent = texto;
  el.className = 'notif-estado' + (tipo ? ' ' + tipo : '');
}

async function activarNotificaciones() {
  if (!messaging) {
    notifSetEstado('Tu navegador no soporta notificaciones push 💛', 'notif-info');
    return;
  }
  const btn = document.getElementById('btnNotif');
  if (btn) { btn.disabled = true; btn.textContent = 'Activando… 💫'; }

  try {
   const registration = await navigator.serviceWorker.register('/para-ana-laura/firebase-messaging-sw.js');
    const permiso = await Notification.requestPermission();

    if (permiso !== 'granted') {
      notifSetEstado('No se activaron las notificaciones. Puedes intentarlo de nuevo cuando quieras 🌸', 'notif-info');
      if (btn) { btn.disabled = false; btn.textContent = '🔔 Activar notificaciones'; }
      return;
    }

    const token = await messaging.getToken({ vapidKey: VAPID_KEY, serviceWorkerRegistration: registration });
    if (!token) throw new Error('No se pudo generar el token');

    await db.collection('fcm_tokens').doc(token).set({
      token,
      creado: firebase.firestore.FieldValue.serverTimestamp(),
      dispositivo: navigator.userAgent
    });

    localStorage.setItem('notif_activadas', '1');
    notifSetEstado('¡Notificaciones activadas! Te avisaré de cada novedad 💛', 'notif-ok');
    if (btn) { btn.style.display = 'none'; }
  } catch (err) {
    console.error('Error activando notificaciones:', err);
    notifSetEstado('Algo salió mal activando las notificaciones. Intenta de nuevo 🌸', 'notif-info');
    if (btn) { btn.disabled = false; btn.textContent = '🔔 Activar notificaciones'; }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnNotif');
  if (!btn) return;
  if (localStorage.getItem('notif_activadas') === '1') {
    btn.style.display = 'none';
  } else {
    btn.addEventListener('click', activarNotificaciones);
  }
});

// Notificación en primer plano (pestaña abierta): muestra un aviso suave en vez del pop-up del sistema
if (messaging) {
  messaging.onMessage((payload) => {
    const titulo = (payload.notification && payload.notification.title) || 'Para Ana Laura 💛';
    const cuerpo = (payload.notification && payload.notification.body) || '';
    notifSetEstado('✨ ' + titulo + (cuerpo ? ' — ' + cuerpo : ''), 'notif-ok');
  });
}
