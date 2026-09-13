/** ══════════════════════════════════════════════════════
 * NAVEGACIÓN ENTRE SECCIONES — transición de barrido
 * En vez de solo desvanecer, una cortina de color cruza toda
 * la pantalla, cambia el contenido mientras está cubierto, y
 * sigue cruzando para revelar la sección nueva del otro lado.
 * Dirección: hacia la derecha (ltr) si avanza en el ORDEN,
 * hacia la izquierda (rtl) si retrocede.
 * ══════════════════════════════════════════════════════ */
const BARRIDO_DURACION = 640; // ms — debe coincidir con la animación en CSS

/** Inicializa el contenido especial de cada sección al entrar (canvases, mapas, etc.) */
function inicializarContenidoSeccion(id){
  if(id==='galaxia')setTimeout(gxInit,120);
  if(id==='jardin')setTimeout(jdInit,120);
  if(id==='juegos')setTimeout(()=>{mInit();},120);
  if(id==='playa')setTimeout(()=>{initMapaPlaya();initPlayaExtras();},200);
}

function irA(id,desde){
  if(transicionando||id===tabActual)return;
  transicionando=true;

  const secActual=$(tabActual);
  const secNueva=$(id);
  if(!secNueva){transicionando=false;return;}

  const iActual=ORDEN.indexOf(tabActual);
  const iNueva=ORDEN.indexOf(id);
  const avanzando=iNueva>iActual;

  const barrido=$('barridoTransicion');
  if(barrido){
    barrido.classList.remove('ltr','rtl');
    void barrido.offsetWidth; // fuerza a reiniciar la animación si se encadenan transiciones rápido
    barrido.classList.add(avanzando?'ltr':'rtl');
  }

  // A mitad del barrido, la pantalla está 100% cubierta: cambiamos
  // de sección justo ahí, sin que se note el cambio.
  setTimeout(()=>{
    if(secActual)secActual.classList.remove('visible');
    secNueva.classList.add('visible');
    secNueva.style.transform='';
    secNueva.style.opacity='';
    secNueva.scrollTop=0;
    tabActual=id;
    actualizarTabs();
  },BARRIDO_DURACION/2);

  // Al terminar el barrido completo, liberamos la navegación
  setTimeout(()=>{
    if(barrido)barrido.classList.remove('ltr','rtl');
    transicionando=false;
    secNueva.querySelectorAll('.rv:not(.vis)').forEach(r=>r.classList.add('vis'));
    inicializarContenidoSeccion(id);
  },BARRIDO_DURACION+20);
}

function actualizarTabs(){
  document.querySelectorAll('.ntab').forEach(b=>{
    b.classList.remove('activo');
    if(b.dataset.tab===tabActual)b.classList.add('activo');
  });
}

function toggleMas(){
  const d=$('masDrawer');
  d.classList.toggle('open');
}
function cerrarMas(){
  $('masDrawer').classList.remove('open');
}

// Mostrar portada al inicio
window.addEventListener('DOMContentLoaded',()=>{
  // Ocultar todas las secciones excepto portada
  document.querySelectorAll('section').forEach(s=>{
    if(s.id!=='portada')s.classList.remove('visible');
    else s.classList.add('visible');
  });
  tabActual='portada';
  // Reveal portada
  document.querySelectorAll('#portada .rv').forEach(r=>r.classList.add('vis'));

  // Init quiz y ruleta en background
  setTimeout(()=>{qInit();mInit();},600);
});

// REVEAL para elementos dentro de secciones activas
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target);}})  ,{threshold:.1});
document.querySelectorAll('.rv').forEach(r=>obs.observe(r));
