// ══════════════════════════════════
// UTILIDADES COMPARTIDAS
// (se cargan primero para estar disponibles en todos los módulos)
// ══════════════════════════════════
/** Atajo para document.getElementById, usado en todo el proyecto */
function $(id){ return document.getElementById(id); }

/** Vibración táctil segura (no rompe si el navegador no la soporta) */
function vibrar(patron){ if(navigator.vibrate) navigator.vibrate(patron); }

/**
 * Cierra un modal de forma accesible: primero quita el foco de
 * cualquier botón/elemento que esté enfocado DENTRO del modal
 * (ej. el botón de cerrar que se acaba de tocar), y solo después
 * le pone aria-hidden="true". Evita la advertencia del navegador
 * "Blocked aria-hidden on an element because its descendant
 * retained focus" y hace que los lectores de pantalla funcionen bien.
 */
function cerrarModalAccesible(idModal, elementoDisparador){
  const modal = $(idModal);
  if(!modal) return;
  if(document.activeElement && modal.contains(document.activeElement)){
    document.activeElement.blur();
  }
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  if(elementoDisparador) elementoDisparador.focus();
}

// ══════════════════════════════════
// MODO NOCHE 🌙
// ══════════════════════════════════
let nocheActivo=false;

function toggleNoche(){
  nocheActivo=!nocheActivo;
  document.body.classList.toggle('noche',nocheActivo);
  $('btnNoche').textContent=nocheActivo?'☀️':'🌙';
  if(nocheActivo){
    crearEstrellas();
    $('estrellas').style.opacity='1';
  } else {
    $('estrellas').style.opacity='0';
  }
  // Actualizar meta theme-color
  document.querySelector('meta[name=theme-color]').content=nocheActivo?'#0d0812':'#f7c5c5';
}

function crearEstrellas(){
  const cont=$('estrellas');
  if(cont.children.length>0)return; // ya creadas
  for(let i=0;i<120;i++){
    const s=document.createElement('div');
    s.className='estrella';
    const sz=Math.random()*2.5+.5;
    s.style.cssText=`
      width:${sz}px;height:${sz}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation-duration:${1.5+Math.random()*3}s;
      animation-delay:${Math.random()*4}s;
      opacity:${.1+Math.random()*.5};
    `;
    cont.appendChild(s);
  }
}

// ══════════════════════════════════════════════════════
// EXPERIENCIA INTEGRADA (galaxia / mapa de la historia)
// Abre esas experiencias dentro de la misma página, a pantalla
// completa, sin saltar a otra pestaña. El botón "Volver" y el
// botón físico/gesto "atrás" del celular o de la computadora
// hacen lo mismo: cerrar y regresar a donde estaba.
// ══════════════════════════════════════════════════════
function abrirExperiencia(url, titulo){
  const overlay = $('experienciaOverlay');
  const iframe = $('experienciaIframe');
  if(!overlay || !iframe) return;

  iframe.src = url;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');

  // Empuja un estado al historial: así el botón/gesto "atrás"
  // del navegador cierra la experiencia en vez de salir de la página.
  history.pushState({experiencia: true}, '', '#' + encodeURIComponent(titulo || 'experiencia'));
}

function cerrarExperiencia(vieneDelHistorial){
  const overlay = $('experienciaOverlay');
  const iframe = $('experienciaIframe');
  if(!overlay) return;

  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  if(iframe) iframe.src = ''; // libera memoria y detiene animaciones/audio de adentro

  // Si cerramos por el botón (no por el back del navegador),
  // deshacemos el estado que empujamos al abrir.
  if(!vieneDelHistorial && history.state && history.state.experiencia){
    history.back();
  }
}

const experienciaVolver = $('experienciaVolver');
if(experienciaVolver){
  experienciaVolver.addEventListener('click', () => cerrarExperiencia(false));
}

window.addEventListener('popstate', (e) => {
  const overlay = $('experienciaOverlay');
  if(overlay && overlay.classList.contains('open') && !(e.state && e.state.experiencia)){
    cerrarExperiencia(true);
  }
});

// Esc en computador también cierra
window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    const overlay = $('experienciaOverlay');
    if(overlay && overlay.classList.contains('open')) cerrarExperiencia(false);
  }
});
