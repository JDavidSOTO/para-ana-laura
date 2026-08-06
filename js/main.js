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
const ORDEN=['portada','cuenta','playa','carta','fotos','galaxia','jardin','juegos','promesas','razones','momentos','cartas-sorpresa','carta-viva','recuerdos','secreto','carta-futuro','playlist','adviento','suenos','album','sentimientos'];
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

// ══════════════════════════════════
// CARTA PARA EL FUTURO
// Se guarda en Firebase (Firestore), así que se sincroniza en
// tiempo real entre el navegador de ella y el tuyo.
// ══════════════════════════════════
const cfDocRef = db.collection('cartaFuturo').doc('actual');

function cfMostrarEstado(datos){
  if(datos && datos.texto && datos.texto.trim()){
    $('cfEscribir').style.display='none';
    $('cfSellada').style.display='block';
    $('cfFechaGuardada').textContent='Escrita el ' + datos.fecha;
    $('cfTextoGuardado').textContent = datos.texto;
  } else {
    $('cfEscribir').style.display='block';
    $('cfSellada').style.display='none';
  }
}

function cfFechaHoy(){
  const d = new Date();
  const meses=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

// Escuchamos cambios en tiempo real: si ella escribe desde su celular,
// esto se actualiza solo en cualquier otro navegador que tenga la página abierta.
if($('carta-futuro')){
  cfDocRef.onSnapshot(doc=>{
    cfMostrarEstado(doc.exists ? doc.data() : null);
  }, err=>{
    console.warn('No se pudo conectar con la carta compartida:', err);
  });
}

const cfBtnGuardar = $('cfGuardar');
if(cfBtnGuardar){
  cfBtnGuardar.addEventListener('click', ()=>{
    const texto = $('cfTexto').value.trim();
    if(!texto) return;
    const fecha = cfFechaHoy();

    cfBtnGuardar.textContent='Enviando… 💫';
    cfBtnGuardar.disabled=true;

    cfDocRef.set({ texto, fecha })
      .then(()=> emailjs.send('service_anajesus','template_anajesus',{
        to_email:'leanisgaspar@gmail.com',
        subject:'💌 Ana Laura te escribió una carta para el futuro',
        message:'Fecha: '+fecha+'\n\n'+texto,
        from_name:'Ana Laura'
      }))
      .then(()=>{
        cfBtnGuardar.textContent='Sellar carta 💌'; cfBtnGuardar.disabled=false;
        const estado=$('cfEstado');
        if(estado){ estado.textContent='¡Enviada! Jesús David ya la va a recibir 💛'; estado.classList.add('show'); }
      })
      .catch(()=>{
        cfBtnGuardar.textContent='Sellar carta 💌'; cfBtnGuardar.disabled=false;
        const estado=$('cfEstado');
        if(estado){ estado.textContent='No se pudo enviar, revisa tu conexión e intenta de nuevo.'; estado.classList.add('show'); }
      });
  });
}
const cfBtnEditar = $('cfEditar');
if(cfBtnEditar){
  cfBtnEditar.addEventListener('click', ()=>{
    cfDocRef.get().then(doc=>{
      $('cfTexto').value = doc.exists ? doc.data().texto : '';
      $('cfSellada').style.display='none';
      $('cfEscribir').style.display='block';
    });
  });
}
const cfBtnCopiar = $('cfCopiar');
if(cfBtnCopiar){
  cfBtnCopiar.addEventListener('click', async ()=>{
    const doc = await cfDocRef.get();
    if(!doc.exists) return;
    const texto = doc.data().texto;
    try{
      if(navigator.share){
        await navigator.share({ text: texto, title: 'Una carta para ti' });
      } else if(navigator.clipboard){
        await navigator.clipboard.writeText(texto);
        cfBtnCopiar.textContent = '¡Copiada! ✅';
        setTimeout(()=>{ cfBtnCopiar.textContent='📋 Copiar para enviarla'; }, 2200);
      }
    }catch(err){ /* el usuario canceló el compartir, o el navegador no lo soporta: no pasa nada */ }
  });
}

// ══════════════════════════════════
// PLAYLIST CON RAZONES
// Se edita directo en la página y se sincroniza en tiempo real
// entre tu navegador y el de ella, usando Firebase.
// ══════════════════════════════════
const plColeccion = db.collection('playlist').orderBy('creado','asc');

function plRenderizar(docs){
  const cont = $('playlistLista');
  if(!cont) return;

  if(docs.length===0){
    cont.innerHTML = '<p class="pl-vacio">Todavía no hay canciones. ¡Agrega la primera abajo! 🎵</p>';
    return;
  }

  cont.innerHTML = docs.map((doc,i)=>{
    const c = doc.data();
    return `<div class="pl-card">
      <div class="pl-num">${i+1}</div>
      <div class="pl-info">
        <p class="pl-titulo">${c.titulo}</p>
        <p class="pl-artista">${c.artista}</p>
        <p class="pl-razon">${c.razon}</p>
      </div>
      ${c.url ? `<a class="pl-link" href="${c.url}" target="_blank" rel="noopener" aria-label="Escuchar ${c.titulo}">▶</a>` : ''}
      <button class="pl-borrar" data-id="${doc.id}" aria-label="Borrar esta canción">🗑</button>
    </div>`;
  }).join('');

  cont.querySelectorAll('[data-id]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      db.collection('playlist').doc(btn.dataset.id).delete();
    });
  });
}

function plMostrarEstado(texto){
  const el = $('plEstado');
  if(!el) return;
  el.textContent = texto;
  el.classList.add('show');
}

if($('playlist')){
  plColeccion.onSnapshot(snapshot=>{
    plRenderizar(snapshot.docs);
  }, err=>{
    console.warn('No se pudo conectar con la playlist compartida:', err);
  });
}

const plBtnAgregar = $('plAgregar');
if(plBtnAgregar){
  plBtnAgregar.addEventListener('click', ()=>{
    const titulo = $('plTitulo').value.trim();
    const artista = $('plArtista').value.trim();
    const razon = $('plRazon').value.trim();
    const url = $('plUrl').value.trim();
    if(!titulo || !razon) return; // el título y la razón son obligatorios

    plBtnAgregar.textContent='Enviando… 💫';
    plBtnAgregar.disabled=true;

    db.collection('playlist').add({
      titulo, artista, razon, url,
      creado: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(()=>{
        $('plTitulo').value=''; $('plArtista').value=''; $('plRazon').value=''; $('plUrl').value='';
        const cuerpo = `Canción: ${titulo}\nArtista: ${artista||'(sin especificar)'}\nRazón: ${razon}` + (url?`\nLink: ${url}`:'');
        return emailjs.send('service_anajesus','template_anajesus',{
          to_email:'leanisgaspar@gmail.com',
          subject:'🎵 Ana Laura agregó una canción a la playlist',
          message:cuerpo,
          from_name:'Ana Laura'
        });
      })
      .then(()=>{
        plBtnAgregar.textContent='Agregar canción ✨'; plBtnAgregar.disabled=false;
        plMostrarEstado('¡Enviada! Jesús David ya la va a recibir 💛');
      })
      .catch(()=>{
        plBtnAgregar.textContent='Agregar canción ✨'; plBtnAgregar.disabled=false;
        plMostrarEstado('No se pudo guardar, revisa tu conexión e intenta de nuevo.');
      });
  });
}

// ══════════════════════════════════
// CUENTA REGRESIVA TIPO ADVIENTO
// Un mensaje se desbloquea automáticamente cada semana,
// hasta el 7 de septiembre. No requiere que nadie haga nada:
// se abre solo cuando llega la fecha, según el reloj del dispositivo.
// ══════════════════════════════════
const ADVIENTO = [
  {
    fecha:'2026-08-03',
    mensaje:'Empieza la cuenta regresiva. En poco más de un mes cumplimos nuestro primer año, y quería ir dejándote un mensaje cada semana hasta que llegue el día. El primero es simple: gracias por este año, apenas estamos empezando. 💛'
  },
  {
    fecha:'2026-08-10',
    mensaje:'¿Te acuerdas del Buenavista? De los juegos, de los nervios, de ese primer beso al despedirnos. Han pasado tantas cosas desde ese día, y sigo pensando en él como si hubiera sido ayer.'
  },
  {
    fecha:'2026-08-17',
    mensaje:'Pienso mucho en las fiestas de tu pueblo, en conocer un pedazo de tu mundo por primera vez. Fue de los momentos en que sentí que esto iba en serio.'
  },
  {
    fecha:'2026-08-24',
    mensaje:'Coveñas todavía me saca una sonrisa cuando lo recuerdo: el mar, las risas, tú a mi lado. Ojalá vengan muchos viajes más como ese.'
  },
  {
    fecha:'2026-08-31',
    mensaje:'Ya casi. Una semana más y cumplimos un año juntos. Estoy repasando cada recuerdo que tenemos, y todos, sin excepción, tienen algo que agradecerte.'
  },
  {
    fecha:'2026-09-07',
    mensaje:'Hoy es el día: nuestro primer año. 💍 Ve a revisar el mapa de nuestra historia, tengo algo especial esperándote justo ahí. Te amo, feliz aniversario.'
  }
];

function adEstaDesbloqueado(fechaStr){
  const [y,m,d] = fechaStr.split('-').map(Number);
  const fecha = new Date(y, m-1, d);
  return new Date() >= fecha;
}
function adDiasFaltantes(fechaStr){
  const [y,m,d] = fechaStr.split('-').map(Number);
  const fecha = new Date(y, m-1, d);
  return Math.max(0, Math.ceil((fecha-new Date())/86400000));
}
function adFormatoFecha(fechaStr){
  const [y,m,d] = fechaStr.split('-').map(Number);
  const meses=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${d} de ${meses[m-1]}`;
}

function adRenderizar(){
  const cont = $('advientoLista');
  if(!cont) return;
  cont.innerHTML = ADVIENTO.map(item=>{
    const desbloqueado = adEstaDesbloqueado(item.fecha);
    if(desbloqueado){
      return `<div class="ad-card">
        <p class="ad-fecha">${adFormatoFecha(item.fecha)}</p>
        <p class="ad-msg">${item.mensaje}</p>
      </div>`;
    }
    const dias = adDiasFaltantes(item.fecha);
    return `<div class="ad-card bloqueada">
      <p class="ad-fecha">${adFormatoFecha(item.fecha)}</p>
      <div class="ad-lock">
        <span class="ad-lock-icono">🔒</span>
        <span>Se abre en ${dias} día${dias===1?'':'s'}</span>
      </div>
    </div>`;
  }).join('');
}
adRenderizar();

// ══════════════════════════════════
// LISTA DE SUEÑOS JUNTOS
// Sueños de base (los escribes tú, editando este arreglo) +
// sueños que cualquiera agregue desde la página. Todo se
// sincroniza en tiempo real entre los dos, con Firebase.
// ══════════════════════════════════
const SUENOS_BASE = [
  'Viajar juntos a un lugar que ninguno de los dos conozca',
  'Vivir juntos algún día',
  'Tener una mascota juntos',
  'Conocer el mar en otro país',
  'Hacer un viaje solo los dos, sin nadie más',
  'Celebrar en grande un aniversario redondo (5, 10 años...)',
  'Aprender algo nuevo juntos: un idioma, un baile, lo que sea',
  'Tener nuestros propios domingos, solo para nosotros',
  'Tener nuestra propia casa, decorada a nuestro gusto',
  'Ver un atardecer en un lugar que recordemos siempre'
];

const snEstadoBaseRef = db.collection('suenosEstado').doc('base'); // { completados: {b0:true,...} }
const snExtrasColeccion = db.collection('suenos').orderBy('creado','asc');

let snCompletadosBase = {};
let snExtrasActuales = [];

function snRenderizar(){
  const cont = $('snLista');
  if(!cont) return;
  const base = SUENOS_BASE.map((texto,i)=>({ id:'b'+i, texto, esExtra:false, cumplido:!!snCompletadosBase['b'+i] }));
  const extras = snExtrasActuales.map(doc=>({ id:doc.id, texto:doc.data().texto, esExtra:true, cumplido:!!doc.data().cumplido }));
  const items = [...base, ...extras];

  cont.innerHTML = items.map(item=>`
    <div class="sn-item ${item.cumplido?'cumplido':''}">
      <button class="sn-check" data-toggle="${item.id}" data-esextra="${item.esExtra}" aria-label="Marcar como cumplido">${item.cumplido?'✓':''}</button>
      <span class="sn-texto">${item.texto}</span>
      ${item.esExtra ? `<button class="sn-borrar" data-borrar="${item.id}" aria-label="Borrar este sueño">🗑</button>` : ''}
    </div>
  `).join('');

  cont.querySelectorAll('[data-toggle]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.toggle;
      if(btn.dataset.esextra==='true'){
        const doc = snExtrasActuales.find(d=>d.id===id);
        db.collection('suenos').doc(id).update({ cumplido: !(doc && doc.data().cumplido) });
      } else {
        const nuevo = { ...snCompletadosBase, [id]: !snCompletadosBase[id] };
        snEstadoBaseRef.set({ completados: nuevo });
      }
    });
  });
  cont.querySelectorAll('[data-borrar]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      db.collection('suenos').doc(btn.dataset.borrar).delete();
    });
  });
}

function snMostrarEstado(texto){
  const el = $('snEstado');
  if(!el) return;
  el.textContent = texto;
  el.classList.add('show');
}

if($('suenos')){
  snEstadoBaseRef.onSnapshot(doc=>{
    snCompletadosBase = doc.exists ? (doc.data().completados||{}) : {};
    snRenderizar();
  }, err=>console.warn('No se pudo conectar el estado de sueños base:', err));

  snExtrasColeccion.onSnapshot(snapshot=>{
    snExtrasActuales = snapshot.docs;
    snRenderizar();
  }, err=>console.warn('No se pudo conectar los sueños agregados:', err));
}

const snBtnAgregar = $('snAgregar');
if(snBtnAgregar){
  snBtnAgregar.addEventListener('click', ()=>{
    const input = $('snInput');
    const texto = input.value.trim();
    if(!texto) return;

    snBtnAgregar.textContent='Enviando… 💫';
    snBtnAgregar.disabled=true;

    db.collection('suenos').add({
      texto, cumplido:false,
      creado: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(()=>{
        input.value='';
        return emailjs.send('service_anajesus','template_anajesus',{
          to_email:'leanisgaspar@gmail.com',
          subject:'⭐ Ana Laura agregó un sueño a la lista',
          message:texto,
          from_name:'Ana Laura'
        });
      })
      .then(()=>{
        snBtnAgregar.textContent='Agregar ✨'; snBtnAgregar.disabled=false;
        snMostrarEstado('¡Enviado! Jesús David ya lo va a recibir 💛');
      })
      .catch(()=>{
        snBtnAgregar.textContent='Agregar ✨'; snBtnAgregar.disabled=false;
        snMostrarEstado('No se pudo guardar, revisa tu conexión e intenta de nuevo.');
      });
  });
  $('snInput').addEventListener('keydown', e=>{
    if(e.key==='Enter') snBtnAgregar.click();
  });
}

// ══════════════════════════════════
// ÁLBUM / SCRAPBOOK
// Mismos momentos reales de siempre, pero contados distinto:
// como páginas de un diario. Para poner una foto real, solo
// reemplaza "foto:null" por la ruta de la imagen (ej. 'img/foto1.jpg').
// ══════════════════════════════════
const ALBUM = [
  {
    fecha:'Nuestro primer encuentro',
    titulo:'El día del Buenavista',
    foto:null,
    texto:'Después de tanto hablar por Facebook, por fin nos vimos en persona. Jugamos, nos reímos, y al despedirnos pasó algo que no planeé pero que no me arrepiento ni un poco: nuestro primer beso.',
    nota:'todavía me pongo nervioso al recordarlo'
  },
  {
    fecha:'7 de septiembre',
    titulo:'El día que te pregunté',
    foto:null,
    texto:'Volvimos al mismo lugar donde nos conocimos, y ahí te pregunté si querías ser mi novia. No recuerdo bien qué dije exactamente, solo recuerdo que dijiste que sí.',
    nota:'el mejor "sí" que me han dado'
  },
  {
    fecha:'Las fiestas de tu pueblo',
    titulo:'Conociendo Rabolargo',
    foto:null,
    texto:'Me llevaste a las fiestas de tu pueblo, a conocer un pedazo de tu vida que antes solo imaginaba por lo que me contabas. Ahí empecé a sentir que ya no era solo tu novio: era parte de tu mundo.',
    nota:'me gustó mucho conocer de dónde vienes'
  },
  {
    fecha:'Nuestra primera noche juntos',
    titulo:'En Planeta Rica',
    foto:null,
    texto:'Viniste a mi casa, y dormimos juntos por primera vez. No hubo nada especial que "pasara": simplemente estar ahí, contigo, ya era suficiente. Todavía pienso en esa noche con una sonrisa.',
    nota:'tranquilidad pura'
  },
  {
    fecha:'24 de diciembre',
    titulo:'Nuestra primera Nochebuena',
    foto:null,
    texto:'Pasaste esa noche conmigo, en familia, celebrando algo tan especial como la Navidad por primera vez juntos.',
    nota:'quiero que sea la primera de muchas'
  },
  {
    fecha:'31 de diciembre',
    titulo:'Recibiendo el año en tu casa',
    foto:null,
    texto:'Esta vez fui yo el que llegó a Rabolargo. Cerramos el año como lo empezamos: juntos, seguros de que valía la pena seguir construyendo esto.',
    nota:'mejor forma de despedir el año'
  },
  {
    fecha:'Nuestro paseo a la playa',
    titulo:'Coveñas',
    foto:'img/covenas1.jpg',
    texto:'Nos escapamos al mar. Entre olas, atardeceres y risas, ese viaje se volvió uno de mis recuerdos favoritos de todos.',
    nota:'ojalá vengan muchos viajes más'
  },
  {
    fecha:'7 de septiembre de 2026',
    titulo:'Nuestro primer año',
    foto:null,
    texto:'Y aquí estamos: un año completo. Este álbum apenas tiene ocho páginas, pero espero que con el tiempo se llene de muchísimas más, contigo, siempre.',
    nota:'te amo, feliz aniversario 💛'
  }
];

let alIndice = 0;

function alRenderizar(){
  const item = ALBUM[alIndice];
  if(!item) return;

  const foto = $('alFoto');
  const placeholder = $('alFotoPlaceholder');
  if(item.foto){ foto.src=item.foto; foto.style.display='block'; placeholder.style.display='none'; }
  else{ foto.style.display='none'; placeholder.style.display='flex'; }

  $('alFecha').textContent = item.fecha;
  $('alTitulo').textContent = item.titulo;
  $('alTexto').textContent = item.texto;
  $('alNota').textContent = '✎ ' + item.nota;
  $('alContador').textContent = (alIndice+1) + ' / ' + ALBUM.length;

  $('alAnterior').disabled = alIndice===0;
  $('alSiguiente').disabled = alIndice===ALBUM.length-1;
}

function alCambiarPagina(nuevoIndice){
  if(nuevoIndice<0 || nuevoIndice>=ALBUM.length) return;
  const pagina = $('alPagina');
  pagina.classList.add('cambiando');
  setTimeout(()=>{
    alIndice = nuevoIndice;
    alRenderizar();
    pagina.classList.remove('cambiando');
  },260);
}

const alBtnAnterior = $('alAnterior');
const alBtnSiguiente = $('alSiguiente');
if(alBtnAnterior) alBtnAnterior.addEventListener('click', ()=>alCambiarPagina(alIndice-1));
if(alBtnSiguiente) alBtnSiguiente.addEventListener('click', ()=>alCambiarPagina(alIndice+1));

if($('alPagina')) alRenderizar();

// ══════════════════════════════════
// CÓMO NOS SENTIMOS
// Espacio compartido (Firebase) con formato "Me siento / Cuando /
// Necesito", visible para los dos, con marca de "ya lo hablamos".
// ══════════════════════════════════
let stAutorActual = 'Jesús David';
let stFiltroActual = 'todas';
let stEntradasActuales = [];

const stQuienBtns = document.querySelectorAll('.st-quien-btn');
stQuienBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    stQuienBtns.forEach(b=>b.classList.remove('activo'));
    btn.classList.add('activo');
    stAutorActual = btn.dataset.autor;
  });
});

const stFiltroBtns = document.querySelectorAll('.st-filtro');
stFiltroBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    stFiltroBtns.forEach(b=>b.classList.remove('activo'));
    btn.classList.add('activo');
    stFiltroActual = btn.dataset.filtro;
    stRenderizar();
  });
});

function stFechaCorta(timestamp){
  if(!timestamp || !timestamp.toDate) return '';
  const d = timestamp.toDate();
  const meses=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${d.getDate()} ${meses[d.getMonth()]}`;
}

function stRenderizar(){
  const cont = $('stLista');
  if(!cont) return;

  let items = stEntradasActuales;
  if(stFiltroActual==='pendientes') items = items.filter(doc=>!doc.data().resuelto);
  if(stFiltroActual==='habladas') items = items.filter(doc=>doc.data().resuelto);

  if(items.length===0){
    cont.innerHTML = '<p class="st-vacio">No hay nada por aquí todavía. Un espacio en calma es también una buena señal 🤍</p>';
    return;
  }

  cont.innerHTML = items.map(doc=>{
    const d = doc.data();
    return `<div class="st-card ${d.resuelto?'resuelta':''}">
      <p class="st-card-autor">${d.autor||'—'}</p>
      <p class="st-card-linea"><b>Me siento</b> ${d.emocion}</p>
      <p class="st-card-linea"><b>Cuando</b> ${d.cuando}</p>
      <p class="st-card-linea"><b>Necesito</b> ${d.necesito}</p>
      <div class="st-card-footer">
        <span class="st-card-fecha">${stFechaCorta(d.creado)}</span>
        <button class="st-resolver" data-id="${doc.id}" data-resuelto="${!!d.resuelto}">
          ${d.resuelto ? '✓ Ya lo hablamos' : 'Marcar como hablado'}
        </button>
      </div>
    </div>`;
  }).join('');

  cont.querySelectorAll('[data-id]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const yaResuelto = btn.dataset.resuelto === 'true';
      db.collection('sentimientos').doc(btn.dataset.id).update({ resuelto: !yaResuelto });
    });
  });
}

function stMostrarEstado(texto){
  const el = $('stEstado');
  if(!el) return;
  el.textContent = texto;
  el.classList.add('show');
}

if($('sentimientos')){
  db.collection('sentimientos').orderBy('creado','desc').onSnapshot(snapshot=>{
    stEntradasActuales = snapshot.docs;
    stRenderizar();
  }, err=>console.warn('No se pudo conectar el espacio de sentimientos:', err));
}

const stBtnEnviar = $('stEnviar');
if(stBtnEnviar){
  stBtnEnviar.addEventListener('click', ()=>{
    const emocion = $('stEmocion').value.trim();
    const cuando = $('stCuando').value.trim();
    const necesito = $('stNecesito').value.trim();
    if(!emocion || !cuando || !necesito) return;

    stBtnEnviar.textContent='Compartiendo… 💫';
    stBtnEnviar.disabled=true;

    db.collection('sentimientos').add({
      autor: stAutorActual, emocion, cuando, necesito, resuelto:false,
      creado: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(()=>{
        $('stEmocion').value=''; $('stCuando').value=''; $('stNecesito').value='';
        // Solo notificamos por correo cuando escribe Ana Laura (para que
        // Jesús David se entere aunque no tenga la página abierta en ese momento).
        if(stAutorActual==='Ana Laura'){
          return emailjs.send('service_anajesus','template_anajesus',{
            to_email:'leanisgaspar@gmail.com',
            subject:'💭 Ana Laura compartió cómo se siente',
            message:`Me siento: ${emocion}\nCuando: ${cuando}\nNecesito: ${necesito}`,
            from_name:'Ana Laura'
          });
        }
      })
      .then(()=>{
        stBtnEnviar.textContent='Compartir cómo me siento'; stBtnEnviar.disabled=false;
        stMostrarEstado('Compartido. Hablen con calma cuando ambos puedan 🤍');
      })
      .catch(()=>{
        stBtnEnviar.textContent='Compartir cómo me siento'; stBtnEnviar.disabled=false;
        stMostrarEstado('No se pudo guardar, revisa tu conexión e intenta de nuevo.');
      });
  });
}

// ══════════════════════════════════
// SORPRESA 11 MESES (7 de agosto)
// El botón de regalo permanece oculto hasta esa fecha. Ese día,
// la portada se ve distinta y el botón aparece con un brillo,
// como si "algo nuevo" hubiera llegado sin avisar.
// ══════════════════════════════════
const FECHA_11_MESES = new Date(2026, 7, 7); // mes 7 = agosto (0-indexado)

const CARTA_11_MESES = `Once meses. Parece poco tiempo en un calendario, pero para mí ha sido suficiente para aprender lo que se siente que alguien te elija de verdad, todos los días.

Desde el Buenavista hasta hoy hemos vivido de todo: risas, viajes, noches largas, silencios cómodos, y hasta las peleas que después de todo también nos han enseñado a querernos mejor.

Ya casi cumplimos un año, y no dejo de pensar en lo rápido que se sintió el tiempo contigo, y en lo mucho que quiero que siga pasando así, a tu lado.

Gracias por estos once meses. Prepárate, porque lo que viene en un mes va a ser todavía más especial.

Te amo, Ana Laura. 💛
— Jesús David`;

function esOnceMeses(){
  return new Date() >= FECHA_11_MESES;
}

if(esOnceMeses() && $('btnRegalo11')){
  $('btnRegalo11').style.display = 'inline-flex';
  const portadaEl = $('portada');
  if(portadaEl) portadaEl.classList.add('especial-11');
}

/* ── Confeti (canvas simple) ── */
let or11ConfetiParticulas = [];
let or11ConfetiAnimando = false;
function or11LanzarConfeti(){
  const canvas = $('or11Confeti');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colores = ['#e8818a','#c9a84c','#f0d080','#ff8a65','#fff'];
  or11ConfetiParticulas = [];
  for(let i=0;i<140;i++){
    or11ConfetiParticulas.push({
      x: canvas.width/2 + (Math.random()-.5)*80,
      y: canvas.height/2 + (Math.random()-.5)*80,
      vx: (Math.random()-.5)*14,
      vy: -Math.random()*14-4,
      g: 0.35+Math.random()*0.2,
      color: colores[Math.floor(Math.random()*colores.length)],
      tam: 4+Math.random()*5,
      rot: Math.random()*Math.PI*2,
      velRot: (Math.random()-.5)*0.3,
      vida: 1
    });
  }

  if(or11ConfetiAnimando) return;
  or11ConfetiAnimando = true;
  function loopConfeti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let algunaViva = false;
    or11ConfetiParticulas.forEach(p=>{
      if(p.vida<=0) return;
      algunaViva = true;
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += p.velRot;
      if(p.y > canvas.height+20) p.vida = 0;
      ctx.save();
      ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.tam/2,-p.tam/2,p.tam,p.tam*0.6);
      ctx.restore();
    });
    if(algunaViva){ requestAnimationFrame(loopConfeti); }
    else { or11ConfetiAnimando = false; ctx.clearRect(0,0,canvas.width,canvas.height); }
  }
  requestAnimationFrame(loopConfeti);
}

/* ── Carta escribiéndose sola ── */
function or11EscribirCarta(){
  const el = $('or11Texto');
  el.textContent = '';
  let i = 0;
  const texto = CARTA_11_MESES;
  const intervalo = setInterval(()=>{
    el.textContent = texto.slice(0, i);
    i += 2; // dos caracteres por tick, para que no sea desesperantemente lento
    if(i > texto.length){
      el.textContent = texto;
      clearInterval(intervalo);
    }
  }, 22);
}

/* ── Flujo completo ── */
const btnRegalo11 = $('btnRegalo11');
if(btnRegalo11){
  btnRegalo11.addEventListener('click', ()=>{
    $('overlayRegalo11').classList.add('open');
    $('overlayRegalo11').setAttribute('aria-hidden','false');
    $('or11Caja').classList.remove('oculta','abriendo');
    $('or11Carta').classList.remove('visible');
  });
}

const or11Caja = $('or11Caja');
if(or11Caja){
  or11Caja.addEventListener('click', ()=>{
    or11Caja.classList.add('abriendo');
    setTimeout(()=>{
      or11Caja.classList.add('oculta');
      or11LanzarConfeti();
      setTimeout(()=>{
        $('or11Carta').classList.add('visible');
        or11EscribirCarta();
      }, 400);
    }, 500);
  });
}

const or11Cerrar = $('or11Cerrar');
if(or11Cerrar){
  or11Cerrar.addEventListener('click', ()=>{
    $('overlayRegalo11').classList.remove('open');
    $('overlayRegalo11').setAttribute('aria-hidden','true');
  });
}
