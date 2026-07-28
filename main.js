// Partículas
const pc=$('ptc');
['❤','💛','✨','🌸','💕'].forEach(s=>{
  for(let i=0;i<4;i++){
    const e=document.createElement('div');e.className='hp';e.textContent=s;
    e.style.cssText='left:'+Math.random()*100+'vw;animation-duration:'+(10+Math.random()*14)+'s;animation-delay:'+(Math.random()*18)+'s;font-size:'+(0.7+Math.random()*0.9)+'rem';
    pc.appendChild(e);
  }
});

// Contador
function tick(){
  const d=new Date()-new Date('2025-09-07T00:00:00');
  if(d<0)return;
  $('cd').textContent=Math.floor(d/86400000);
  $('ch').textContent=String(Math.floor((d%86400000)/3600000)).padStart(2,'0');
  $('cm').textContent=String(Math.floor((d%3600000)/60000)).padStart(2,'0');
  $('cs').textContent=String(Math.floor((d%60000)/1000)).padStart(2,'0');
}
tick();setInterval(tick,1000);

// RECUERDOS
const rt={};
function guardarRec(id,gid){
  clearTimeout(rt[id]);
  rt[id]=setTimeout(()=>{
    localStorage.setItem('r_'+id,$(id).value);
    const g=$(gid);g.classList.add('show');
    setTimeout(()=>g.classList.remove('show'),2000);
  },600);
}
['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15','r16'].forEach(id=>{
  const v=localStorage.getItem('r_'+id);if(v)$(id).value=v;
});

// ENVIAR
function enviar(){
  const preg=[
    '🛍️ ¿Qué recuerdas de nuestra primera cita?',
    '💌 ¿Cómo te sentiste cuando leíste mi carta?',
    '⭐ ¿Cuál es tu momento favorito?',
    '🌸 ¿Qué fue lo primero que pensaste de mí?',
    '❤️ ¿En qué momento supiste que te gustaba?',
    '✨ ¿Qué es lo que más amas de nosotros?',
    '🌙 ¿Cuál es ese pensamiento que tienes de mí y nunca me has dicho?',
    '💭 ¿Qué es lo que más miedo te da de lo que sentimos?',
    '🌸 ¿Cómo te imaginas nuestra vida en unos años?',
    '🔥 ¿Hay algo que quisieras que yo hiciera más seguido?',
    '💔 ¿Ha habido algún momento en que te haya fallado sin darme cuenta?',
    '🌟 ¿Qué fue lo que te hizo confiar en mí?',
    '🤍 ¿Qué parte de ti sientes que solo yo conozco?',
    '🎯 ¿Qué es lo que más valoras de lo que tenemos?',
    '🌊 ¿Cómo te sientes cuando estamos en silencio juntos?',
    '💛 Si pudieras decirme algo que nunca te has atrevido, ¿qué sería?',
  ];
  let hay=false,body='💌 Ana Laura respondió sus recuerdos:\n\n';
  ['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15','r16'].forEach((id,i)=>{
    const v=$(id).value.trim();
    if(v)hay=true;
    body+=(i+1)+'. '+preg[i]+'\n'+(v||'(sin respuesta)')+'\n\n';
  });
  if(!hay){showS('✦ Escribe al menos una respuesta primero 🌸');return;}
  const btn=$('sbtn');
  btn.textContent='Enviando… 💫';btn.disabled=true;
  emailjs.send('service_anajesus','template_anajesus',{to_email:'leanisgaspar@gmail.com',subject:'💌 Ana Laura te respondió',message:body,from_name:'Ana Laura'})
    .then(()=>{btn.textContent='¡Enviado con amor! 💛';showS('Jesús David ya puede leer lo que sientes ❤️');})
    .catch(()=>{btn.textContent='Enviar mis recuerdos 💌';btn.disabled=false;showS('Algo salió mal… intenta de nuevo 🌸');});
}
function showS(msg){const s=$('sstatus');s.textContent=msg;s.style.opacity='1';}

// SECRETO
function chkS(){
  const v=$('sinput').value.trim().toLowerCase();
  const err=$('serr'),msg=$('smsg');
  if(v==='amor'){err.classList.remove('show');msg.style.display='block';setTimeout(()=>msg.scrollIntoView({behavior:'smooth',block:'center'}),100);}
  else{err.classList.add('show');msg.style.display='none';}
}
$('sinput').addEventListener('keydown',e=>{if(e.key==='Enter')chkS();});


// BIENVENIDA
(function(){
  // Pétalos
  const cont = $('bvPetals');
  const syms = ['🌸','💕','✨','🌷','💛','❤️'];
  for(let i=0;i<18;i++){
    const e=document.createElement('div');e.className='petal';
    e.textContent=syms[Math.floor(Math.random()*syms.length)];
    e.style.cssText='left:'+Math.random()*100+'vw;animation-duration:'+(6+Math.random()*8)+'s;animation-delay:'+(Math.random()*6)+'s;font-size:'+(0.9+Math.random()*1)+'rem';
    cont.appendChild(e);
  }
})();

function abrirPagina(){
  const bv=$('bienvenida');
  bv.classList.add('hide');
  setTimeout(()=>{
    bv.style.display='none';
    const p=$('portada');
    if(p){p.classList.add('visible');p.querySelectorAll('.rv').forEach(r=>r.classList.add('vis'));}
  },850);
}

// CARTAS SORPRESA
const cartas=[
  {m:'Cuando el día se siente largo…',t:'Quiero que sepas que en medio de cualquier día difícil, pienso en ti. En tu sonrisa. En cómo me hace sentir saber que existes. Y de repente el día ya no se siente tan pesado.'},
  {m:'Cuando sientas que no te ven…',t:'Yo te veo. Te veo cuando sonríes sin querer, cuando te ríes de algo tuyo, cuando miras sin decir nada. Te veo más de lo que crees, y lo que veo me enamora cada vez más.'},
  {m:'Cuando me extrañes…',t:'Cierra los ojos un momento. Eso que sientes en el pecho cuando piensas en mí… yo lo siento también. Siempre. No importa dónde esté, una parte de mí siempre está pensando en ti.'},
  {m:'Cuando dudes de ti misma…',t:'Eres más de lo que crees. Más bonita, más fuerte, más especial. Y si algún día no puedes verte así, recuerda que yo lo hago por los dos. Siempre.'},
  {m:'Cuando quieras saber cuánto te amo…',t:'Tanto que me cuesta explicarlo. Tanto que a veces me quedo sin palabras. Tanto que incluso escribiéndote esto, siento que ninguna frase alcanza para decirte lo real que es lo que siento.'},
  {m:'Cuando necesites un abrazo…',t:'Ojalá pudiera mandártelo. Pero mientras tanto, quiero que sepas que tengo guardado uno enorme para cuando nos veamos. Uno de esos que duran un poco más de lo normal, porque te lo mereces.'},
  {m:'Cuando estés feliz…',t:'Quiero que en ese momento pienses en mí. Porque tu felicidad también es mía. Cuando tú estás bien, yo estoy bien. Así de conectados estamos, aunque a veces no lo digamos.'},
  {m:'Cuando sea de noche y no puedas dormir…',t:'Aquí estoy. En estas palabras, en esta página que hice solo para ti. Porque quería que supieras que incluso en los momentos más quietos, no estás sola. Siempre tendrás algo mío cerca.'},
  {m:'Cuando todo parezca complicado…',t:'Recuerda que hay una cosa simple y cierta: te amo. Sin condiciones, sin pausas, sin fechas de vencimiento. Eso no cambia, pase lo que pase.'},
  {m:'Cuando quieras saber qué pienso de ti…',t:'Pienso que eres de esas personas que aparecen pocas veces en la vida. De las que te cambian algo por dentro sin que te des cuenta. Y yo tuve la suerte de que aparecieras en la mía.'},
];

let csIdx = -1;
const csUsados = [];

function nuevaCarta(){
  let disponibles = cartas.map((_,i)=>i).filter(i=>!csUsados.includes(i));
  if(disponibles.length===0){csUsados.length=0;disponibles=cartas.map((_,i)=>i);}
  const idx=disponibles[Math.floor(Math.random()*disponibles.length)];
  csUsados.push(idx);csIdx=idx;
  const c=cartas[idx];
  const textoEl=$('cs-texto');
  textoEl.style.animation='none';
  textoEl.offsetHeight;
  textoEl.style.animation='csAppear .6s ease both';
  $('cs-momento').textContent=c.m;
  textoEl.textContent=c.t;
  $('cs-contador').textContent='Carta '+(csUsados.length)+' de '+cartas.length;
}
nuevaCarta();


// CARTA QUE SE ESCRIBE SOLA
const cvP=["Hay algo que quiero que sepas, algo que a veces se me queda atascado en la garganta cuando estás cerca…","Desde que llegaste, el mundo se ve de otra manera. Como si alguien hubiera encendido una luz que no sabía que faltaba.","Pienso en ti en los momentos más inesperados. En medio del silencio, en medio del ruido, en cualquier lugar donde de repente tu nombre aparece solo en mi mente.","Y lo más bonito no es solo quererte… es que contigo aprendí a querer de verdad. Sin miedo, sin esconder nada, sin calcular.","Eres de esas personas que te cambian por dentro sin pedirte permiso. Y yo no cambiaría nada de lo que me has cambiado.","Así que gracias. Gracias por aparecer, por quedarte, por elegirme también tú a mí.","Te amo hoy, mañana y en todos los días que vengan después. ❤️"];
let cvI=0,cvC=0,cvT=null,cvDone=false;
function cvEscribir(){
  const el=$('cvTexto');
  const firma=$('cvFirma');
  const btn=$('cvBtn');
  btn.style.display='none';firma.classList.remove('show');
  el.innerHTML='<span class="cv-cursor"></span>';
  cvI=0;cvC=0;cvDone=false;
  function go(){
    if(cvI>=cvP.length){firma.classList.add('show');btn.style.display='block';cvDone=true;return;}
    const p=cvP[cvI];
    if(cvC<p.length){
      const txt=cvP.slice(0,cvI).join('\n\n')+(cvI>0?'\n\n':'')+p.slice(0,cvC+1);
      el.innerHTML=txt.replace(/\n/g,'<br/>')+'<span class="cv-cursor"></span>';
      cvC++;cvT=setTimeout(go,cvC===p.length?600:30);
    }else{cvI++;cvC=0;cvT=setTimeout(go,300);}
  }
  go();
}
function cvReiniciar(){clearTimeout(cvT);cvDone=false;cvEscribir();}
const cvObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!cvDone){cvEscribir();cvObs.unobserve(e.target);}})  ,{threshold:.3});
const cvEl=$('carta-viva');if(cvEl)cvObs.observe(cvEl);

// ══════════════════════════════════
// PLAYA — 10 MESES JS
// ══════════════════════════════════

// Cuenta regresiva hacia el 7 de julio 2026
function playaCountdown(){
  const meta=new Date('2026-07-07T00:00:00');
  function tick(){
    const ahora=new Date();
    const diff=meta-ahora;
    if(diff<=0){
      $('pld').textContent='0';
      $('plh').textContent='00';
      $('plm').textContent='00';
      $('pls').textContent='00';
      desbloquearCarta10();
      return;
    }
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff%86400000)/3600000);
    const m=Math.floor((diff%3600000)/60000);
    const s=Math.floor((diff%60000)/1000);
    $('pld').textContent=d;
    $('plh').textContent=String(h).padStart(2,'0');
    $('plm').textContent=String(m).padStart(2,'0');
    $('pls').textContent=String(s).padStart(2,'0');
    // Texto cuenta carta
    const cc=$('carta10Cuenta');
    if(cc) cc.textContent=`Faltan ${d} días, ${h}h ${m}m ${s}s para abrirla ⏳`;
  }
  tick();
  setInterval(tick,1000);
}
playaCountdown();

// Desbloquear carta el 7 de julio
function desbloquearCarta10(){
  const btn=$('carta10Btn');
  const icon=$('carta10Icon');
  const sub=$('carta10Sub');
  const cc=$('carta10Cuenta');
  if(btn){
    btn.disabled=false;
    btn.textContent='¡Abrir mi carta especial! 🌅';
    btn.classList.add('desbloqueada');
  }
  if(icon) icon.textContent='💌';
  if(sub) sub.textContent='¡Hoy es el día! Ya puedes abrir tu carta especial de 10 meses. 🌅';
  if(cc) cc.textContent='';
}

function intentarAbrirCarta10(){
  const hoy=new Date();
  const meta=new Date('2026-07-07T00:00:00');
  // Verificar si ya llegó el día
  if(hoy>=meta){
    const card=$('carta10Card');
    const perg=$('carta10Pergamino');
    card.style.display='none';
    perg.classList.add('show');
    iniciarPetalos();
  }
}

function mostrarFinal(){
  const final=$('sorpFinal');
  final.style.display='block';
  iniciarPetalos();
  // Mini fuegos artificiales en canvas
  const canvas=$('sorpFireworks');
  const cont=canvas.parentElement;
  canvas.width=cont.offsetWidth||300;
  canvas.height=cont.offsetHeight||100;
  const ctx=canvas.getContext('2d');
  const particulas=[];
  const colores=['#fff','#ffd700','#ff8a65','#4dd0e1','#f48fb1','#fff9c4'];
  for(let i=0;i<60;i++){
    particulas.push({
      x:canvas.width*(.2+Math.random()*.6),
      y:canvas.height*(.2+Math.random()*.6),
      vx:(Math.random()-.5)*4,
      vy:(Math.random()-.5)*4,
      alpha:1,
      color:colores[Math.floor(Math.random()*colores.length)],
      r:1.5+Math.random()*2.5,
    });
  }
  let frames=0;
  function drawFW(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particulas.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.alpha-=.012;
      ctx.globalAlpha=Math.max(0,p.alpha);
      ctx.fillStyle=p.color;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
    frames++;
    if(frames<140)requestAnimationFrame(drawFW);
  }
  drawFW();
}

// Init olas cuando se entra a la sección playa
function initPlayaExtras(){
  initSorpOlas();
}


// Mostrar mapa de Coveñas
function initMapaPlaya(){
  const div=$('mapaPlaya');
  if(!div||div.dataset.init)return;
  div.dataset.init='1';
  div.innerHTML=`
    <div style="width:100%;text-align:center;padding:1.5rem 1rem;">
      <p style="font-size:2rem;margin-bottom:.5rem;">📍</p>
      <p style="font-family:'Dancing Script',cursive;font-size:1.3rem;color:var(--turq-d);margin-bottom:.3rem;">Hotel Playa Dorada</p>
      <p style="font-size:.8rem;color:var(--txt);opacity:.7;margin-bottom:.8rem;">Segunda Ensenada · Coveñas, Sucre, Colombia</p>
      <a href="https://maps.google.com/?q=9.4402215,-75.6254714"
         target="_blank"
         style="background:linear-gradient(135deg,var(--turq-d),var(--coral));color:white;text-decoration:none;border-radius:50px;padding:.6rem 1.3rem;font-size:.85rem;display:inline-block;box-shadow:0 4px 14px rgba(77,208,225,.3);">
         Ver en Google Maps 🗺️
      </a>
      <p style="margin-top:.9rem;font-size:.75rem;color:var(--turq-d);opacity:.7;">🏖️ 7 - 8 de julio, 2026</p>
    </div>`;
}

// Inicializar mapa al entrar a la sección playa
const ORDEN=['portada','cuenta','playa','carta','fotos','galaxia','jardin','juegos','promesas','razones','momentos','cartas-sorpresa','carta-viva','recuerdos','secreto'];
let tabActual='portada';
let transicionando=false;

// ══ CARTA CON FLORES ══
function abrirCarta(){
  const sobre=$('sobreWrap');
  const pergamino=$('cartaPergamino');
  const btn=$('sobreBtn');
  const solapa=$('sobreSolapa');

  // Animar apertura del sobre
  if(solapa){
    solapa.style.transition='transform .5s ease, opacity .4s ease';
    solapa.style.transformOrigin='50% 0%';
    solapa.style.transform='rotateX(180deg) scaleY(-1)';
    solapa.style.opacity='0';
  }

  setTimeout(()=>{
    sobre.style.transition='opacity .4s ease, transform .4s ease';
    sobre.style.opacity='0';
    sobre.style.transform='scale(.85) translateY(-10px)';
    setTimeout(()=>{
      sobre.style.display='none';
      pergamino.style.display='block';
      pergamino.classList.add('vis');
      btn.style.display='block';
      // Lanzar flores flotantes
      lanzarFloresCarta();
    },400);
  },350);
}

function cerrarCarta(){
  const sobre=$('sobreWrap');
  const pergamino=$('cartaPergamino');
  const btn=$('sobreBtn');
  const solapa=$('sobreSolapa');
  pergamino.style.display='none';
  btn.style.display='none';
  sobre.style.display='flex';
  sobre.style.opacity='1';
  sobre.style.transform='none';
  if(solapa){solapa.style.transform='none';solapa.style.opacity='1';}
  $('cartaFloresBg').innerHTML='';
}

// ══ SEGUNDA CARTA ══
function abrirCarta2(){
  const sobre=$('sobreWrap2');
  const pergamino=$('cartaPergamino2');
  const btn=$('sobreBtn2');
  const solapa=$('sobreSolapa2');
  if(solapa){
    solapa.style.transition='transform .5s ease, opacity .4s ease';
    solapa.style.transformOrigin='50% 0%';
    solapa.style.transform='rotateX(180deg) scaleY(-1)';
    solapa.style.opacity='0';
  }
  setTimeout(()=>{
    sobre.style.transition='opacity .4s ease, transform .4s ease';
    sobre.style.opacity='0';
    sobre.style.transform='scale(.85) translateY(-10px)';
    setTimeout(()=>{
      sobre.style.display='none';
      pergamino.style.display='block';
      pergamino.classList.add('vis');
      btn.style.display='block';
      lanzarFloresCarta();
    },400);
  },350);
}

function cerrarCarta2(){
  const sobre=$('sobreWrap2');
  const pergamino=$('cartaPergamino2');
  const btn=$('sobreBtn2');
  const solapa=$('sobreSolapa2');
  pergamino.style.display='none';
  btn.style.display='none';
  sobre.style.display='flex';
  sobre.style.opacity='1';
  sobre.style.transform='none';
  if(solapa){solapa.style.transform='none';solapa.style.opacity='1';}
  $('cartaFloresBg').innerHTML='';
}

function lanzarFloresCarta(){
  const contenedor=$('cartaFloresBg');
  if(!contenedor)return;
  contenedor.innerHTML='';
  const flores=['🌹','🌸','🌻','🌷','🌺','🪷','💮','🌼','🌹','🌸','🌻'];
  for(let i=0;i<18;i++){
    const el=document.createElement('div');
    el.className='flor-bg';
    el.textContent=flores[Math.floor(Math.random()*flores.length)];
    const tam=14+Math.random()*14;
    const dur=7+Math.random()*9;
    const delay=Math.random()*6;
    const left=Math.random()*100;
    el.style.cssText=`font-size:${tam}px;left:${left}%;bottom:-40px;animation-duration:${dur}s;animation-delay:${delay}s;`;
    contenedor.appendChild(el);
  }
}
