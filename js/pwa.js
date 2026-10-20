// ══════════════════════════════════════════════════════
// APP INSTALABLE (PWA)
//  - Registra el service worker apenas abre la página (antes solo se
//    registraba al activar notificaciones).
//  - Muestra el botón "Instalar como app" en el menú flotante:
//      · Android / computador (Chrome, Edge): abre el cuadro de instalación.
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

  const btn = document.getElementById('btnInstalar');
  if(!btn) return;

  const yaInstalada = window.matchMedia('(display-mode: standalone)').matches
                      || window.navigator.standalone === true;
  if(yaInstalada) return;   // ya se abre como app: no hace falta el botón

  const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
                || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
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

  if(esIOS) mostrarBoton();

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
    }
  });
})();
