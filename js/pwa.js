// ══════════════════════════════════════════════════════
// APP INSTALABLE (PWA)
//  - Registra el service worker apenas abre la página (antes solo se
//    registraba al activar notificaciones).
//  - Muestra el botón "Instalar como app" en el menú flotante:
//      · Android / computador (Chrome, Edge): abre el cuadro de instalación.
//        En celulares Android el botón se muestra SIEMPRE: si Chrome no
//        ofrece el cuadro (a veces se lo guarda, p. ej. si antes se descartó
//        un aviso de instalar), el botón explica cómo instalar desde el menú ⋮.
//      · iPhone / iPad: Apple no permite un botón directo, así que
//        muestra los pasos para "Agregar a inicio".
// ══════════════════════════════════════════════════════
(function(){
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      // Ruta relativa: se resuelve sola a /para-ana-laura/firebase-messaging-sw.js
      navigator.serviceWorker.register('firebase-messaging-sw.js').catch(function(e){
        console.warn('No se pudo registrar el service worker:', e);
      });
    });
  }

  // ── Aviso cuando llega una notificación con la app ABIERTA ──
  // (con la app cerrada o en segundo plano la muestra el service worker).
  // Entiende tanto las notificaciones normales como los mensajes "solo datos"
  // (el mensaje del día). Reemplaza al aviso básico de notifications.js.
  if(typeof messaging !== 'undefined' && messaging && typeof messaging.onMessage === 'function'){
    messaging.onMessage(function(payload){
      const n = (payload && payload.notification) || {};
      const d = (payload && payload.data) || {};
      const titulo = n.title || d.titulo || 'Para Ana Laura 💛';
      const cuerpo = n.body || d.mensaje || '';
      if(typeof notifSetEstado === 'function'){
        notifSetEstado('✨ ' + titulo + (cuerpo ? ' — ' + cuerpo : ''), 'notif-ok');
        setTimeout(function(){ notifSetEstado('', ''); }, 15000);
      }
    });
  }

  const btn = document.getElementById('btnInstalar');
  if(!btn) return;

  const yaInstalada = window.matchMedia('(display-mode: standalone)').matches
                      || window.navigator.standalone === true;
  if(yaInstalada) return;   // ya se abre como app: no hace falta el botón

  const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
                || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const esAndroid = /android/i.test(navigator.userAgent);
  let eventoInstalar = null;

  function mostrarBoton(){
    btn.style.display = 'inline-flex';
    if(typeof actualizarAccionesFlotantes === 'function') actualizarAccionesFlotantes();
  }
  function ocultarBoton(){
    btn.style.display = 'none';
    if(typeof actualizarAccionesFlotantes === 'function') actualizarAccionesFlotantes();
  }
  function aviso(texto, tipo, ms){
    if(typeof notifSetEstado !== 'function') return;
    notifSetEstado(texto, tipo);
    if(ms) setTimeout(function(){ notifSetEstado('', ''); }, ms);
  }

  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();          // guardamos el evento para usarlo cuando toque el botón
    eventoInstalar = e;
    mostrarBoton();
  });

  window.addEventListener('appinstalled', function(){
    eventoInstalar = null;
    ocultarBoton();
    aviso('¡Listo! Ya está en tu pantalla de inicio 💛', 'notif-ok', 6000);
  });

  if(esIOS || esAndroid) mostrarBoton();   // en celulares el botón siempre está disponible

  btn.addEventListener('click', async function(){
    if(eventoInstalar){
      eventoInstalar.prompt();
      try{ await eventoInstalar.userChoice; }catch(_){}
      eventoInstalar = null;
      ocultarBoton();
      return;
    }
    if(esIOS){
      aviso('En iPhone: toca el botón Compartir ⬆️ de Safari y elige "Agregar a inicio" 💛', 'notif-info', 12000);
    } else {
      // Android sin cuadro automático: la instalación se hace desde el menú del navegador
      aviso('Toca el menú ⋮ de Chrome (arriba a la derecha) y elige "Instalar app" o "Agregar a la pantalla de inicio" 💛', 'notif-info', 14000);
    }
  });
})();
