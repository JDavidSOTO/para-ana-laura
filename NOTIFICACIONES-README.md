# Cómo activar las notificaciones 💛

Ya integré todo el código. Te faltan **4 pasos de configuración** en Firebase y GitHub (10-15 min, se hacen una sola vez).

## 1. Obtener la "VAPID key" (clave pública de notificaciones)

1. Entra a la [Consola de Firebase](https://console.firebase.google.com/) → proyecto **nuestra-historia-f1d9f**.
2. Ve a ⚙️ **Configuración del proyecto** → pestaña **Cloud Messaging**.
3. Baja hasta **"Certificados push web"** → clic en **"Generar par de claves"**.
4. Copia la clave que aparece.
5. Abre `js/notifications.js` y reemplaza:
   ```js
   const VAPID_KEY = 'VAPID_KEY_AQUI';
   ```
   por tu clave real.

## 2. Crear la cuenta de servicio (para que los scripts puedan enviar notificaciones)

1. En Firebase Console → ⚙️ **Configuración del proyecto** → pestaña **Cuentas de servicio**.
2. Clic en **"Generar nueva clave privada"** → se descarga un archivo `.json`.
3. **No subas ese archivo al repositorio.** Lo vas a pegar como secreto de GitHub en el siguiente paso.

## 3. Agregar el secreto en GitHub

1. En tu repositorio de GitHub → **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret**.
3. Nombre: `FIREBASE_SERVICE_ACCOUNT`
4. Valor: pega el **contenido completo** del archivo `.json` que descargaste.
5. Guardar.

## 4. Reglas de seguridad de Firestore

Ana Laura no inicia sesión, así que necesitamos permitir que cualquiera pueda *crear* su token (pero no leer los de otros). En Firebase Console → **Firestore Database** → **Reglas**, agrega esto dentro de `match /databases/{database}/documents`:

```
match /fcm_tokens/{token} {
  allow create: if true;
  allow read, update, delete: if false;
}
```

## Listo, ¿cómo funciona ahora?

- **Ana Laura** entra a la página → ve el botón "🔔 Activar notificaciones" (abajo a la derecha) → lo toca una vez → listo, queda suscrita para siempre en ese navegador/celular.
- **Cuando tú (Jesús) subas cambios** al repositorio (`git push` a `main`), automáticamente se le envía un push: *"Actualicé nuestra página 💛"*. Si quieres un mensaje distinto para una actualización puntual, puedes correr manualmente:
  ```
  node scripts/send-notification.js "Tu título" "Tu mensaje"
  ```
- **Recordatorios por fecha**: edita `reminders.json` y agrega objetos como:
  ```json
  { "fecha": "2026-12-24", "titulo": "🎄 Feliz Nochebuena", "mensaje": "Tengo algo para ti", "enviado": false }
  ```
  Todos los días a las 9am (hora Colombia) un GitHub Action revisa el archivo y envía el push si la fecha es hoy.

## Nota importante sobre GitHub Pages

Si tu sitio se publica en una subcarpeta (ej. `usuario.github.io/proyecto/` en vez de un dominio propio), edita esta línea en `js/notifications.js`:
```js
const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
```
por la ruta real, ej. `/proyecto/firebase-messaging-sw.js`, y mueve `firebase-messaging-sw.js` para que quede en esa misma raíz.

## Si algo falla

- El botón no aparece: revisa la consola del navegador (F12) por errores de Firebase.
- No llegan notificaciones: verifica que el secreto `FIREBASE_SERVICE_ACCOUNT` esté bien pegado (JSON completo) y revisa la pestaña **Actions** de GitHub para ver el log del envío.
- Safari/iOS: las notificaciones push web funcionan solo si Ana agrega la página a su pantalla de inicio (ícono compartir → "Agregar a inicio") en iOS 16.4+.
