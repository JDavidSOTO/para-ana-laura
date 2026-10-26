// ══════════════════════════════════════════════════════
// ACCESO — "palabra secreta"
//
// La página y sus datos (cartas, sueños, sentimientos, playlist…) solo se
// abren con la palabra secreta. Se pide UNA vez por dispositivo: después
// Firebase recuerda la sesión y el candado ya no vuelve a aparecer.
//
// Para quien lo maneja (Firebase → Authentication):
//   1. Activar el método de acceso "Correo electrónico/contraseña".
//   2. Crear UN usuario con el correo de EMAIL_ACCESO (abajo) y, como
//      contraseña, la palabra secreta.
//   3. Las reglas de Firestore (ver GUIA-SEGURIDAD-Y-RESPALDOS.md) solo
//      dejan pasar a ese correo.
// Si cambias el correo aquí, cámbialo también en Firebase y en las reglas.
// ══════════════════════════════════════════════════════
(function(){
  'use strict';

  const EMAIL_ACCESO = 'nosotros@nuestra-historia.app';

  const caja    = document.getElementById('candado');
  if(!caja) return;
  const form    = document.getElementById('candadoForm');
  const clave   = document.getElementById('candadoClave');
  const btn     = document.getElementById('candadoBtn');
  const error   = document.getElementById('candadoError');
  const ojo     = document.getElementById('candadoOjo');
  const usuario = document.getElementById('candadoUsuario');
  if(usuario) usuario.value = EMAIL_ACCESO;

  function estado(nombre){                       // 'cargando' | 'pedir'
    caja.classList.remove('cargando', 'pedir');
    caja.classList.add(nombre);
  }
  function mostrarError(texto){
    error.textContent = texto || '';
    if(texto){ form.classList.remove('sacudir'); void form.offsetWidth; form.classList.add('sacudir'); }
  }
  function desbloquear(){
    document.body.classList.remove('bloqueado');
    caja.classList.add('oculto');
    caja.setAttribute('aria-hidden', 'true');
    setTimeout(function(){ caja.style.display = 'none'; }, 800);
  }
  function pedirClave(){
    estado('pedir');
    caja.classList.remove('oculto');
    setTimeout(function(){ try{ clave.focus({ preventScroll: true }); }catch(_){} }, 350);
  }

  // Mensajes amables para Ana Laura; el detalle técnico queda en la consola para quien administra.
  function mensajeDe(err){
    const code = (err && err.code) || '';
    if(code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/invalid-login-credentials'){
      return 'Esa no es nuestra palabra… intenta de nuevo 🌸';
    }
    if(code === 'auth/too-many-requests') return 'Demasiados intentos. Espera unos minutos y vuelve a probar 💛';
    if(code === 'auth/network-request-failed') return 'Parece que no hay internet. Revisa tu conexión 🌸';
    console.error('[acceso] Algo no está configurado en Firebase:', code, err);
    if(code === 'auth/user-not-found') console.error('[acceso] No existe el usuario ' + EMAIL_ACCESO + ' en Firebase → Authentication → Users.');
    if(code === 'auth/operation-not-allowed') console.error('[acceso] Falta activar "Correo electrónico/contraseña" en Firebase → Authentication → Sign-in method.');
    if(code === 'auth/unauthorized-domain') console.error('[acceso] Agrega este dominio en Firebase → Authentication → Settings → Authorized domains.');
    return 'Algo no está listo todavía. Avísale a Jesús 💛';
  }

  // Ver / ocultar lo que se escribe
  ojo.addEventListener('click', function(){
    const ver = clave.type === 'password';
    clave.type = ver ? 'text' : 'password';
    ojo.textContent = ver ? '🙈' : '👁';
    ojo.setAttribute('aria-pressed', ver ? 'true' : 'false');
  });

  let auth = null;
  try{ auth = firebase.auth(); }catch(e){ console.error('[acceso] Firebase Auth no cargó:', e); }

  // Sin Firebase (sin internet la primera vez): se avisa y se ofrece reintentar
  if(!auth){
    estado('pedir');
    clave.disabled = true;
    mostrarError('No se pudo cargar. Revisa tu conexión y vuelve a intentar 🌸');
    btn.textContent = 'Reintentar';
    form.addEventListener('submit', function(e){ e.preventDefault(); location.reload(); });
    return;
  }

  let ingresoManual = false;     // true solo cuando acaba de escribir la palabra
  let resuelto = false;

  auth.onAuthStateChanged(function(user){
    resuelto = true;
    if(user && user.email === EMAIL_ACCESO){
      // Recién ingresado: se recarga una vez para que toda la página
      // (cartas, sueños, etc.) empiece a leer los datos ya con la sesión.
      if(ingresoManual){ location.reload(); return; }
      desbloquear();
    } else {
      if(user){ auth.signOut().catch(function(){}); }   // sesión de otro usuario: no vale
      pedirClave();
    }
  });
  // Por si Firebase tarda demasiado en responder, igual se muestra el formulario
  setTimeout(function(){ if(!resuelto) pedirClave(); }, 6000);

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const palabra = clave.value.trim();
    if(!palabra){ mostrarError('Escribe la palabra secreta 💛'); return; }
    mostrarError('');
    btn.disabled = true;
    btn.textContent = 'Entrando…';
    ingresoManual = true;
    try{
      await auth.signInWithEmailAndPassword(EMAIL_ACCESO, palabra);
      // el resto lo hace onAuthStateChanged (recarga y desbloqueo)
    }catch(err){
      ingresoManual = false;
      btn.disabled = false;
      btn.textContent = 'Entrar 💛';
      mostrarError(mensajeDe(err));
      clave.select();
    }
  });

  // Bloquear este dispositivo (botón al final del menú "Más")
  window.cerrarSesion = function(){
    try{
      auth.signOut().then(function(){ location.reload(); }, function(){ location.reload(); });
    }catch(_){ location.reload(); }
  };
})();
