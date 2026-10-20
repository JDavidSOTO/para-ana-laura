// ══════════════════════════════════════════════════════
// Service Worker de la app (PWA) + notificaciones push (Firebase Cloud Messaging)
// Este archivo DEBE vivir en la raíz del sitio (mismo nivel que index.html)
// para que su alcance (scope) cubra todas las páginas.
//
// Hace dos cosas:
//  1) Recibe las notificaciones push aunque la página esté cerrada.
//  2) Guarda copias de lo que ya visitaste para que la app abra aunque
//     no haya internet. Siempre intenta primero la versión más nueva.
// ══════════════════════════════════════════════════════

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Debe coincidir EXACTAMENTE con la config de index.html
firebase.initializeApp({
  apiKey: "AIzaSyDkFct75bCDSmQwjTP77AkIPSL0xACt39g",
  authDomain: "nuestra-historia-f1d9f.firebaseapp.com",
  projectId: "nuestra-historia-f1d9f",
  storageBucket: "nuestra-historia-f1d9f.firebasestorage.app",
  messagingSenderId: "334753780496",
  appId: "1:334753780496:web:3cf7eb66430f8966d68b95"
});

const messaging = firebase.messaging();

// Ruta base real donde vive la app (ej. https://usuario.github.io/para-ana-laura/)
// así no dependemos de rutas fijas que cambian si la página se mueve.
const BASE = self.registration.scope;
const ICONO = BASE + 'img/icons/icon-192.png';

// Convierte la URL que manda el servidor ('/' o relativa) en una dirección
// válida dentro de la app. Si viene vacía o es '/', abre la página principal.
function resolverUrl(u) {
  if (!u || u === '/') return BASE;
  try { return new URL(u, BASE).href; } catch (e) { return BASE; }
}

// Notificación mostrada cuando la pestaña está cerrada o en segundo plano
messaging.onBackgroundMessage((payload) => {
  const titulo = (payload.notification && payload.notification.title) || 'Para Ana Laura 💛';
  const opciones = {
    body: (payload.notification && payload.notification.body) || 'Tienes algo nuevo esperándote.',
    icon: ICONO,
    badge: ICONO,
    data: { url: resolverUrl(payload.data && payload.data.url) },
    vibrate: [200, 100, 200]
  };
  self.registration.showNotification(titulo, opciones);
});

// Al hacer clic en la notificación, abre (o enfoca) la página
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = resolverUrl(event.notification.data && event.notification.data.url);
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.startsWith(BASE) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ── Modo app: copia local para abrir sin internet ──
const CACHE = 'para-ana-laura-v1';

self.addEventListener('install', () => { self.skipWaiting(); });

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((nombres) => Promise.all(nombres.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// "Primero la red": siempre intenta traer lo más nuevo y, si no hay internet,
// usa la última copia guardada. Así nunca te quedas viendo una versión vieja.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // Firebase, fuentes, etc.: no se tocan
  if (!req.url.startsWith(BASE)) return;

  event.respondWith(
    fetch(req)
      .then((resp) => {
        if (resp && resp.ok) {
          const copia = resp.clone();
          caches.open(CACHE).then((c) => c.put(req, copia));
        }
        return resp;
      })
      .catch(() =>
        caches.match(req).then((guardada) => {
          if (guardada) return guardada;
          if (req.mode === 'navigate') return caches.match(BASE).then((r) => r || caches.match(BASE + 'index.html'));
          return Response.error();
        })
      )
  );
});
