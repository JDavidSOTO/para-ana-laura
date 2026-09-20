// ══════════════════════════════════════════════════════
// Service Worker de notificaciones push (Firebase Cloud Messaging)
// Este archivo DEBE vivir en la raíz del sitio (mismo nivel que index.html)
// para que su alcance (scope) cubra todas las páginas.
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

// Notificación mostrada cuando la pestaña está cerrada o en segundo plano
messaging.onBackgroundMessage((payload) => {
  const titulo = (payload.notification && payload.notification.title) || 'Para Ana Laura 💛';
  const opciones = {
    body: (payload.notification && payload.notification.body) || 'Tienes algo nuevo esperándote.',
    icon: (payload.notification && payload.notification.icon) || '/img/celebracion.jpg',
    badge: '/img/celebracion.jpg',
    data: { url: (payload.data && payload.data.url) || '/' },
    vibrate: [200, 100, 200]
  };
  self.registration.showNotification(titulo, opciones);
});

// Al hacer clic en la notificación, abre (o enfoca) la página
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
