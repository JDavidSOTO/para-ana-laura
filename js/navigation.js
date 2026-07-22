/** Anima la salida de la sección que se está dejando */
function salirSeccionActual(secActual,subiendo){
  if(!secActual)return;
  secActual.classList.remove('visible');
  secActual.classList.add(subiendo?'salida-up':'salida-down');
  setTimeout(()=>{
    secActual.classList.remove('salida-up','salida-down');
  },260);
}

/** Prepara el estado inicial (oculto) de la sección que va a entrar */
function prepararSeccionNueva(secNueva,subiendo){
  secNueva.style.transform=subiendo?'translateY(28px) scale(.985)':'translateY(-28px) scale(.985)';
  secNueva.style.opacity='0';
}

/** Inicializa el contenido especial de cada sección al entrar (canvases, mapas, etc.) */
function inicializarContenidoSeccion(id){
  if(id==='galaxia')setTimeout(gxInit,120);
  if(id==='jardin')setTimeout(jdInit,120);
  if(id==='juegos')setTimeout(()=>{mInit();},120);
  if(id==='playa')setTimeout(()=>{initMapaPlaya();initPlayaExtras();},200);
}

/** Completa la animación de entrada y actualiza el estado de navegación */
function entrarSeccionNueva(secNueva,id){
  secNueva.classList.add('visible');
  secNueva.style.transform='';
  secNueva.style.opacity='';
  secNueva.scrollTop=0;
  tabActual=id;
  actualizarTabs();
  transicionando=false;
  secNueva.querySelectorAll('.rv:not(.vis)').forEach(r=>r.classList.add('vis'));
  inicializarContenidoSeccion(id);
}

function irA(id,desde){
  if(transicionando||id===tabActual)return;
  transicionando=true;

  const secActual=$(tabActual);
  const secNueva=$(id);
  if(!secNueva){transicionando=false;return;}

  const iActual=ORDEN.indexOf(tabActual);
  const iNueva=ORDEN.indexOf(id);
  const subiendo=iNueva>iActual;

  salirSeccionActual(secActual,subiendo);
  prepararSeccionNueva(secNueva,subiendo);

  setTimeout(()=>entrarSeccionNueva(secNueva,id),120);
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

