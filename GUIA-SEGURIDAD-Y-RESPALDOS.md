# Guía: candado, respaldos y mensaje del día 🔒💾💛

Para quien administra Firebase y GitHub (Jesús). **Ana Laura no tiene que hacer nada técnico:**
solo escribe la palabra secreta una vez en cada dispositivo y el dispositivo la recuerda.

Esta guía no hace falta subirla a GitHub; guárdala tú.

---

## Qué protege y qué no

**Protege:** todo lo que ustedes escriben y se guarda en Firestore (carta al futuro, playlist,
sueños, "cómo nos sentimos"). Con las reglas nuevas, nadie puede leerlo ni escribirlo sin la palabra secreta,
aunque conozca la dirección de la página o vea la configuración de Firebase en el código.

**No protege:** las fotos y los textos fijos que están escritos en los archivos de la página
(`index.html`, `img/`…). Como el repositorio es público, esos archivos son públicos. El candado
evita que alguien curioso entre a la página, pero no impide que una persona técnica que
encuentre el repositorio vea esos archivos. Si algún día quieres cerrarlos también, hay que
pasar el repositorio a privado (GitHub Pages en repositorio privado requiere un plan de pago).

---

## PARTE 1 — El candado (palabra secreta)

> ⚠️ **Haz los pasos en este orden.** Si publicas las reglas nuevas antes de que el candado
> funcione, la página queda sin poder leer datos.

### 1. Activar el acceso con contraseña en Firebase
1. [console.firebase.google.com](https://console.firebase.google.com) → tu proyecto → **Authentication**
   (si es la primera vez, toca **Comenzar / Get started**).
2. Pestaña **Método de acceso / Sign-in method** → **Correo electrónico/contraseña** → activa solo la
   primera opción (*no* "Vínculo de correo electrónico") → **Guardar**.

### 2. Crear el usuario del candado
1. Pestaña **Usuarios / Users** → **Agregar usuario / Add user**.
2. Correo: `nosotros@nuestra-historia.app` (no necesita existir de verdad; debe ser idéntico al de `js/acceso.js`).
3. Contraseña: **la palabra secreta**. Mínimo 6 caracteres; te recomiendo 12 o más: dos o tres
   palabras que solo ustedes sepan. **No uses fechas** (aniversario, cumpleaños): son lo primero que se prueba.
4. (Opcional) **Ajustes → Acciones del usuario**: si ves **"Habilitar creación (registro)"**, desactívalo.

### 3. Subir los archivos nuevos a GitHub
Sube el contenido del zip de actualización (`index.html`, `css/acceso.css`, `js/acceso.js`, `js/gestos.js`).

### 4. Probar el candado
1. Abre la página en una **ventana de incógnito**. Debe aparecer *"Solo para dos"*.
2. Escribe una palabra incorrecta → *"Esa no es nuestra palabra…"*.
3. Escribe la correcta → la página se recarga y aparece el regalo. Entra a "Cartas/Sueños/Playlist" y comprueba que cargan.
4. En un dispositivo ya desbloqueado, cierra y abre la página: **no** debe pedir la palabra otra vez.

### 5. Publicar las reglas nuevas (solo cuando el paso 4 salió bien)
Firebase → **Firestore Database → Reglas** → borra todo, pega esto y **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Solo pasa quien entró con la palabra secreta (el usuario creado en Authentication)
    function esNuestro() {
      return request.auth != null
          && request.auth.token.email == 'nosotros@nuestra-historia.app';
    }

    match /cartaFuturo/{docId}  { allow read, write: if esNuestro(); }
    match /playlist/{docId}     { allow read, write: if esNuestro(); }
    match /suenos/{docId}       { allow read, write: if esNuestro(); }
    match /suenosEstado/{docId} { allow read, write: if esNuestro(); }
    match /sentimientos/{docId} { allow read, write: if esNuestro(); }

    // Tokens de notificaciones: se pueden crear desde la página, pero nadie los puede leer
    match /fcm_tokens/{token} {
      allow create: if esNuestro();
      allow read, update, delete: if false;
    }

    // Todo lo demás: cerrado
    match /{document=**} { allow read, write: if false; }
  }
}
```

Si cambias el correo en `js/acceso.js`, cámbialo también aquí.

### 6. Comprobar que quedó cerrado
En **Reglas → Simulador de reglas (Rules Playground)**: tipo *get*, ruta `/playlist/prueba`,
**sin** marcar "Authenticated" → debe decir **Denegado**.

### Si algo sale mal: volver a las reglas anteriores
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /fcm_tokens/{token} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /cartaFuturo/{docId}  { allow read, write: if true; }
    match /playlist/{docId}     { allow read, write: if true; }
    match /suenos/{docId}       { allow read, write: if true; }
    match /suenosEstado/{docId} { allow read, write: if true; }
    match /sentimientos/{docId} { allow read, write: if true; }
    match /{document=**} { allow read, write: if false; }
  }
}
```

### Dar la palabra a Ana Laura
Se la dices tú. La escribe **una vez por dispositivo** (celular, computador…). Si guarda la contraseña en el
navegador, ni siquiera tiene que recordarla. En el menú **Más → "Bloquear en este dispositivo"** se vuelve a pedir.

### Cambiar la palabra secreta
En **Authentication → Usuarios**, borra el usuario y créalo de nuevo con la palabra nueva. Los dispositivos
con sesión iniciada volverán a pedirla en un rato.
(No sirve "restablecer contraseña": el correo no es real y nunca llegaría.)

---

## PARTE 2 — Respaldos automáticos

Cada domingo (3:00 a. m. hora de Colombia) se copian todos los datos de Firestore a un
**repositorio privado**. Nunca se guardan en el repositorio de la página porque ese es público.
Queda el historial completo: puedes volver a cualquier semana.

No se respaldan los `fcm_tokens` (tokens de notificaciones): se regeneran solos.
Si más adelante agregas una colección nueva, se respalda automáticamente.

### Configuración (una sola vez)

**1. Crear el repositorio privado**
GitHub → **New repository** → nombre **`para-ana-laura-respaldos`** → **Private** →
marca **"Add a README file"** → Create. (El nombre debe ser exactamente ese.)

**2. Crear un token de acceso**
GitHub → tu foto → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**
- Nombre: `respaldos`
- Expiration: la más larga que permita (máx. 1 año; ver la nota de abajo)
- Repository access: **Only select repositories** → `para-ana-laura-respaldos`
- Permissions → Repository permissions → **Contents: Read and write**
- Generate token y **copia el código** (empieza por `github_pat_…`; solo se muestra una vez).

**3. Guardar el token como secreto**
Repositorio `para-ana-laura` → **Settings → Secrets and variables → Actions → New repository secret**
- Nombre: `RESPALDOS_TOKEN`
- Valor: el token.

(El secreto `FIREBASE_SERVICE_ACCOUNT` ya lo tienes de las notificaciones.)

**4. Subir los scripts**
Sube la carpeta `scripts/` del zip (`lib-json.js`, `respaldo.js`, `restaurar.js`). Los archivos que ya
tenías ahí (`send-notification.js`, `send-reminders.js`, `package.json`) se quedan como están.

**5. Crear los dos flujos de GitHub Actions**
Como la carpeta `.github` está oculta, créalos desde la web: **Add file → Create new file** y en el nombre escribe la ruta
completa (GitHub crea las carpetas solo). Pega el contenido y **Commit changes**.

*Archivo 1:* `.github/workflows/respaldo-semanal.yml`
```yaml
name: Respaldo semanal

# Copia todos los datos de Firestore (cartas, sueños, sentimientos, playlist…)
# a un repositorio PRIVADO. Nunca se guardan en este repositorio porque es público.
on:
  schedule:
    - cron: '0 8 * * 0'   # domingos 03:00 hora de Colombia
  workflow_dispatch: {}

permissions:
  contents: read

jobs:
  respaldo:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Instalar dependencias
        run: npm install
        working-directory: scripts

      - name: Exportar los datos de Firestore
        env:
          FIREBASE_SERVICE_ACCOUNT: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
        run: node scripts/respaldo.js respaldo-out

      - name: Traer el repositorio privado de respaldos
        uses: actions/checkout@v4
        with:
          repository: ${{ github.repository_owner }}/para-ana-laura-respaldos
          token: ${{ secrets.RESPALDOS_TOKEN }}
          path: privado

      - name: Guardar el respaldo (solo si algo cambió)
        run: |
          rm -rf privado/datos
          mkdir -p privado/datos
          cp respaldo-out/*.json privado/datos/
          cd privado
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add -A
          if git diff --cached --quiet; then
            echo "Sin cambios desde el último respaldo."
          else
            git commit -m "Respaldo $(date -u +%Y-%m-%d)"
            git push
          fi
```

*Archivo 2:* `.github/workflows/restaurar-respaldo.yml`
```yaml
name: Restaurar respaldo

# Vuelve a escribir en Firestore los datos de un respaldo.
# Solo se ejecuta a mano: Actions → "Restaurar respaldo" → Run workflow.
# Antes de tocar nada, guarda una foto del estado ACTUAL en el repositorio
# privado, por si hay que deshacer la restauración.
on:
  workflow_dispatch:
    inputs:
      confirmacion:
        description: 'Escribe RESTAURAR (en mayúsculas) para confirmar'
        required: true
      referencia:
        description: 'Respaldo a usar: vacío = el último respaldo; o el código (commit) de uno anterior'
        required: false
        default: ''

permissions:
  contents: read

jobs:
  restaurar:
    runs-on: ubuntu-latest
    steps:
      - name: Confirmar
        env:
          CONFIRMACION: ${{ inputs.confirmacion }}
        run: |
          if [ "$CONFIRMACION" != "RESTAURAR" ]; then
            echo "No se restauró nada: hay que escribir RESTAURAR (en mayúsculas) en la confirmación."
            exit 1
          fi

      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Instalar dependencias
        run: npm install
        working-directory: scripts

      - name: Traer el repositorio privado de respaldos
        uses: actions/checkout@v4
        with:
          repository: ${{ github.repository_owner }}/para-ana-laura-respaldos
          token: ${{ secrets.RESPALDOS_TOKEN }}
          path: privado
          fetch-depth: 0

      - name: Recordar cuál es el último respaldo (antes de la foto de seguridad)
        id: ultimo
        run: echo "sha=$(git -C privado rev-parse HEAD)" >> "$GITHUB_OUTPUT"

      - name: Foto de seguridad del estado actual
        env:
          FIREBASE_SERVICE_ACCOUNT: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
        run: |
          node scripts/respaldo.js respaldo-out
          rm -rf privado/datos
          mkdir -p privado/datos
          cp respaldo-out/*.json privado/datos/
          cd privado
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add -A
          if git diff --cached --quiet; then
            echo "El estado actual ya coincide con el último respaldo."
          else
            git commit -m "Estado justo antes de restaurar ($(date -u +%Y-%m-%d))"
            git push
          fi

      - name: Elegir el respaldo a restaurar
        env:
          REFERENCIA: ${{ inputs.referencia }}
          ULTIMO: ${{ steps.ultimo.outputs.sha }}
        run: |
          DESTINO="${REFERENCIA:-$ULTIMO}"
          echo "Restaurando desde: $DESTINO"
          git -C privado checkout --quiet "$DESTINO"

      - name: Restaurar los datos en Firestore
        env:
          FIREBASE_SERVICE_ACCOUNT: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
        run: node scripts/restaurar.js privado/datos --confirmar
```

**6. Probar el primer respaldo**
Pestaña **Actions → Respaldo semanal → Run workflow**. Debe terminar en verde ✓.
Luego abre el repositorio privado: debe aparecer la carpeta **`datos/`** con un archivo por colección.
Abre `cartaFuturo.json` y comprueba que ves el contenido.

### Restaurar un respaldo
**Actions → Restaurar respaldo → Run workflow**
- *Confirmación:* escribe `RESTAURAR` (en mayúsculas; si no, no hace nada).
- *Respaldo a usar:* déjalo vacío para usar el último, o pega el código (commit) de uno anterior,
  que lo ves en el historial del repositorio privado.

Qué hace, en orden: (1) guarda una **foto del estado actual** en el repositorio privado, por si hay que deshacer;
(2) restaura los documentos del respaldo elegido. Los documentos se escriben con su mismo id, reemplazando
al que haya; **no se borra** lo que exista en Firestore y no esté en el respaldo.

### Cosas que conviene saber
- **El token vence.** Cuando pase la fecha que elegiste, los respaldos empezarán a fallar. GitHub te avisa por
  correo antes de que venza: crea uno nuevo y reemplaza el secreto `RESPALDOS_TOKEN`.
- Si un respaldo falla, GitHub te escribe por correo ("workflow run failed"). Un respaldo que sale **vacío** también
  falla a propósito: así nunca se pisa un buen respaldo con nada.
- GitHub **pausa los flujos programados** si el repositorio público pasa 60 días sin actividad. Cuando actualices
  la página cuenta como actividad. Si llega el aviso, entra a **Actions** y vuelve a activar el flujo.
- En los registros (logs) de Actions solo aparecen **cantidades** de documentos, nunca el contenido.


---

## PARTE 3 — Mensaje del día (notificación cada mañana) 💛

Cada mañana a las **8:00 a. m. (hora de Colombia)** llega a los dispositivos suscritos el **mismo mensaje**
que muestra la tarjeta "Mensaje de hoy" de la portada. Los dos leen un solo archivo: **`mensajes-del-dia.txt`**.

### Cómo se editan los mensajes
En GitHub abre `mensajes-del-dia.txt` → lápiz ✏️ → una línea = un mensaje → **Commit changes**.
Las líneas que empiezan con `#` no cuentan. Cada día toca uno distinto, en orden; al terminar la lista vuelve a empezar.
(Si agregas o quitas mensajes, cambia cuál le toca a cada día.) Hoy son 21; entre más haya, más tarda en repetirse.

### Cómo se activa (una sola vez)
1. Sube los archivos nuevos: `mensajes-del-dia.txt`, `js/bento.js`, `js/pwa.js`, `firebase-messaging-sw.js`,
   `scripts/lib-mensajes.js` y `scripts/send-mensaje-diario.js`.
2. Crea el flujo desde la web: **Add file → Create new file**, nombre `.github/workflows/mensaje-del-dia.yml`,
   pega esto y **Commit changes**:

```yaml
name: Mensaje del día

# Cada mañana envía a los dispositivos suscritos el mismo mensaje que muestra la
# tarjeta "Mensaje de hoy" de la portada (sale de mensajes-del-dia.txt).
# Para pausarlo: Actions → "Mensaje del día" → ··· → Disable workflow.
on:
  schedule:
    - cron: '0 13 * * *'   # 8:00 a. m. hora de Colombia (GitHub puede demorarse unos minutos)
  workflow_dispatch:
    inputs:
      forzar:
        description: 'Enviar aunque hoy haya un recordatorio especial (para probar)'
        type: boolean
        default: false

permissions:
  contents: read

jobs:
  enviar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Instalar dependencias
        run: npm install
        working-directory: scripts

      - name: Enviar el mensaje de hoy
        env:
          FIREBASE_SERVICE_ACCOUNT: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          FORZAR: ${{ inputs.forzar }}
        run: node scripts/send-mensaje-diario.js
```

3. Pruébalo: **Actions → Mensaje del día → Run workflow** (marca *forzar* si hoy hay un recordatorio especial).
   Debe terminar en verde ✓ y, si ya activaste las notificaciones en tu celular, te llega el mensaje.

### Cosas que conviene saber
- **Los días con recordatorio especial** (los que están en `reminders.json`), el mensaje del día **no se envía**,
  para que no lleguen dos avisos seguidos.
- **Pausarlo:** Actions → Mensaje del día → los tres puntos ··· → **Disable workflow**. Para volver: **Enable workflow**.
- **Cambiar la hora:** edita la línea `cron` del flujo. Está en hora UTC (Colombia = UTC − 5): 8:00 a. m. = `0 13 * * *`.
  GitHub puede demorarse unos minutos en ejecutar los flujos programados.
- Si el celular está apagado o sin internet, el mensaje **caduca a las 12 horas** (un "buenos días" no llega al día siguiente).
- **Va a todos los dispositivos suscritos**, incluido el tuyo.
- **En iPhone** las notificaciones solo funcionan si la página está instalada con "Agregar a inicio" (iOS 16.4 o superior).
- Si `mensajes-del-dia.txt` se queda sin mensajes, el flujo falla a propósito y GitHub te avisa por correo.

---

## Problemas comunes

| Qué pasa | Qué revisar |
|---|---|
| Ana ve *"Algo no está listo todavía. Avísale a Jesús"* | Falta activar "Correo electrónico/contraseña" o crear el usuario (paso 1 y 2). Abre la consola del navegador (F12): ahí dice exactamente qué falta. |
| Dice *"Esa no es nuestra palabra"* y es correcta | La contraseña del usuario en Firebase no coincide. Bórralo y créalo de nuevo (paso 2). |
| Después de publicar las reglas las listas salen vacías | El correo de las reglas no coincide con el de `js/acceso.js`, o no se desbloqueó con la palabra. Mientras investigas, pega las reglas anteriores. |
| *"Demasiados intentos"* | Firebase bloquea unos minutos tras varios errores. Esperar. |
| El respaldo falla con `Resource not accessible` / `404` | El nombre del repositorio privado no es exactamente `para-ana-laura-respaldos`, no tiene README, o el token no tiene permiso *Contents: Read and write* sobre ese repositorio. |
| El respaldo falla con *"salió vacío"* | La cuenta de servicio (`FIREBASE_SERVICE_ACCOUNT`) es de otro proyecto o está mal pegada. |
