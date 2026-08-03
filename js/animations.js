// ══════════════════════════════════
// LLUVIA DE PÉTALOS 🌸
// ══════════════════════════════════
const petalCanvas=$('petals-canvas');
const petalCtx=petalCanvas.getContext('2d');
let petalos=[];
let petalRAF=null;
let petalActivo=false;

function initPetalCanvas(){
  petalCanvas.width=window.innerWidth;
  petalCanvas.height=window.innerHeight;
}
window.addEventListener('resize',initPetalCanvas);
initPetalCanvas();

// Formas de pétalos
const PETAL_COLORS=[
  '#f7a8b8','#f4c2cc','#e8818a','#fce4ec',
  '#ffb3c1','#ff8fab','#f48fb1','#ffd6e0',
  '#ffccd5','#e8b4bc','#d4a0a8','#c9a84c'
];

function crearPetalo(){
  const x=Math.random()*petalCanvas.width;
  return {
    x,y:-20,
    vx:(Math.random()-.5)*1.5,
    vy:1.2+Math.random()*2.2,
    rot:Math.random()*Math.PI*2,
    vrot:(Math.random()-.5)*.06,
    w:8+Math.random()*14,
    h:5+Math.random()*8,
    color:PETAL_COLORS[Math.floor(Math.random()*PETAL_COLORS.length)],
    alpha:0,
    fadeIn:true,
    swing:Math.random()*Math.PI*2,
    swingSpeed:.02+Math.random()*.02,
    swingAmp:1+Math.random()*1.5,
  };
}

function dibujarPetalo(p){
  petalCtx.save();
  petalCtx.globalAlpha=p.alpha;
  petalCtx.translate(p.x,p.y);
  petalCtx.rotate(p.rot);
  petalCtx.beginPath();
  // Forma de pétalo con bezier
  petalCtx.moveTo(0,-p.h/2);
  petalCtx.bezierCurveTo(p.w/2,-p.h/2,p.w/2,p.h/2,0,p.h/2);
  petalCtx.bezierCurveTo(-p.w/2,p.h/2,-p.w/2,-p.h/2,0,-p.h/2);
  petalCtx.fillStyle=p.color;
  petalCtx.fill();
  // Brillo suave
  petalCtx.beginPath();
  petalCtx.moveTo(0,-p.h/2);
  petalCtx.bezierCurveTo(p.w*.15,-p.h*.3,p.w*.1,0,0,p.h*.1);
  petalCtx.strokeStyle='rgba(255,255,255,.35)';
  petalCtx.lineWidth=1;
  petalCtx.stroke();
  petalCtx.restore();
}

function animarPetalos(){
  petalCtx.clearRect(0,0,petalCanvas.width,petalCanvas.height);

  // Añadir nuevos pétalos gradualmente
  if(petalActivo && petalos.length<80 && Math.random()<.3){
    petalos.push(crearPetalo());
  }

  petalos=petalos.filter(p=>{
    // Movimiento
    p.swing+=p.swingSpeed;
    p.x+=p.vx+Math.sin(p.swing)*p.swingAmp;
    p.y+=p.vy;
    p.rot+=p.vrot;

    // Fade in
    if(p.fadeIn){p.alpha=Math.min(p.alpha+.04,.85);if(p.alpha>=.85)p.fadeIn=false;}

    // Fade out al salir
    if(p.y>petalCanvas.height-60){p.alpha=Math.max(p.alpha-.04,0);}

    dibujarPetalo(p);
    return p.y<petalCanvas.height+30&&p.alpha>0;
  });

  // Si se apagó pero aún hay pétalos, seguir hasta limpiar
  if(petalos.length>0||petalActivo){
    petalRAF=requestAnimationFrame(animarPetalos);
  } else {
    petalCanvas.classList.remove('activo');
    cancelAnimationFrame(petalRAF);
    petalRAF=null;
  }
}

function iniciarPetalos(){
  petalActivo=true;
  petalCanvas.classList.add('activo');
  if(!petalRAF)petalRAF=requestAnimationFrame(animarPetalos);
  // Parar de crear pétalos nuevos después de 8s, dejar caer los existentes
  setTimeout(()=>{petalActivo=false;},8000);
}

// Lanzar pétalos al abrir la página
window.addEventListener('DOMContentLoaded',()=>{
  setTimeout(iniciarPetalos, 1200);
});

// ══════════════════════════════════
// TE AMO MUCHO — ANIMACIÓN
// ══════════════════════════════════
let taRAF=null;
let taParticulas=[];
let taCorazonesInterval=null;

const TA_FRASES=['Te amo','mucho,','Ana Laura 💛'];
const TA_CORAZONES=['💛','❤️','💕','✨','💗'];

function mostrarTeAmo(){
  const overlay=$('teAmoOverlay');
  overlay.classList.add('show');
  vibrar([30,40,30,40,60]);

  initTaParticulas();
  escribirTaTexto();
  taCorazonesInterval=setInterval(lanzarCorazonTA,260);

  // Detener corazones después de un rato (pero overlay sigue abierto)
  setTimeout(()=>{
    if(taCorazonesInterval){clearInterval(taCorazonesInterval);taCorazonesInterval=null;}
  },6000);
}

function cerrarTeAmo(){
  const overlay=$('teAmoOverlay');
  overlay.classList.remove('show');
  if(taCorazonesInterval){clearInterval(taCorazonesInterval);taCorazonesInterval=null;}
  if(taRAF){cancelAnimationFrame(taRAF);taRAF=null;}
  $('teAmoCorazones').innerHTML='';
  $('taTexto').innerHTML='';
}

function escribirTaTexto(){
  const el=$('taTexto');
  el.innerHTML='';
  let delayGlobal=0;
  TA_FRASES.forEach((frase,fi)=>{
    const span=document.createElement('span');
    span.style.display='block';
    [...frase].forEach((ch)=>{
      const c=document.createElement('span');
      c.className='tac';
      c.textContent=ch===' '?'\u00A0':ch;
      c.style.animationDelay=delayGlobal+'s';
      span.appendChild(c);
      delayGlobal+=0.045;
    });
    delayGlobal+=0.25;
    el.appendChild(span);
  });
}

function lanzarCorazonTA(){
  const cont=$('teAmoCorazones');
  if(!cont)return;
  const el=document.createElement('div');
  el.className='ta-corazon-fly';
  el.textContent=TA_CORAZONES[Math.floor(Math.random()*TA_CORAZONES.length)];
  const left=Math.random()*100;
  const dur=4+Math.random()*3;
  const sz=1+Math.random()*1.3;
  el.style.cssText=`left:${left}%;bottom:-30px;font-size:${sz}rem;animation-duration:${dur}s;`;
  cont.appendChild(el);
  setTimeout(()=>el.remove(),dur*1000+200);
}

function initTaParticulas(){
  const canvas=$('teAmoCanvas');
  const ctx=canvas.getContext('2d');
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();
  window.addEventListener('resize',resize);

  taParticulas=[];
  for(let i=0;i<70;i++){
    taParticulas.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:.5+Math.random()*1.8,
      vx:(Math.random()-.5)*.25,
      vy:(Math.random()-.5)*.25,
      tw:Math.random()*Math.PI*2,
      tws:.02+Math.random()*.03,
    });
  }

  function draw(){
    if(!$('teAmoOverlay').classList.contains('show')){
      taRAF=null;return;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    taParticulas.forEach(p=>{
      p.tw+=p.tws;
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;
      const alpha=.3+Math.sin(p.tw)*.3;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,200,220,${Math.max(0,alpha)})`;
      ctx.fill();
    });
    taRAF=requestAnimationFrame(draw);
  }
  draw();
}


