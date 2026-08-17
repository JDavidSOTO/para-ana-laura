// ══════════════════════════════════
// UTILIDADES COMPARTIDAS
// (se cargan primero para estar disponibles en todos los módulos)
// ══════════════════════════════════
/** Atajo para document.getElementById, usado en todo el proyecto */
function $(id){ return document.getElementById(id); }

/** Vibración táctil segura (no rompe si el navegador no la soporta) */
function vibrar(patron){ if(navigator.vibrate) navigator.vibrate(patron); }

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

