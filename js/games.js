// JUEGOS — tabs
function showJ(id,btn){
  document.querySelectorAll('.jpanel').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.jtab').forEach(t=>t.classList.remove('on'));
  $('j-'+id).classList.add('on');
  btn.classList.add('on');
  if(id==='ruleta')drawR();
  if(id==='memoria'){if(!mDone)mInit();}
}

// QUIZ
const Qs=[
  {p:'¿Cuál es mi color favorito?',o:['Azul','Negro','Rojo oscuro','Verde'],c:1,f:'¡Exacto! El negro tiene algo misterioso que me encanta.'},
  {p:'¿Qué prefiero hacer un domingo?',o:['Salir con amigos','Quedarme contigo','Ir al gimnasio','Dormir todo el día'],c:1,f:'Siempre prefiero estar contigo… no hay mejor plan.'},
  {p:'¿Cuál fue mi primer pensamiento cuando te vi?',o:['"Qué linda"','"La quiero conocer"','"Me pone nervioso"','"Todas las anteriores"'],c:3,f:'Fue todo eso junto y más… ❤️'},
  {p:'¿Qué me recuerda a ti?',o:['Una canción alegre','El color rosado','Los girasoles','Todo lo bonito'],c:0,f:'Cualquier canción alegre me hace pensar en ti de inmediato.'},
  {p:'¿Cuál es mi mayor miedo?',o:['La oscuridad','Perderte a ti','Las alturas','Los bichos'],c:1,f:'Perderte sería lo peor que me podría pasar.'},
  {p:'¿Qué es lo que más me gusta de ti?',o:['Tu sonrisa','Tus ojos','Tu forma de ser','Todo'],c:3,f:'¡Todo! Pero especialmente cómo me haces sentir.'},
  {p:'¿Cuál es mi comida favorita?',o:['Pizza','Lo que cocines tú','Sushi','Hamburguesa'],c:1,f:'Lo que cocines tú siempre sabe mejor, lo juro.'},
  {p:'¿Cómo me siento cuando estás cerca?',o:['Nervioso','En casa','Feliz','Todo lo anterior'],c:3,f:'Contigo siento todo eso al mismo tiempo… y más. 💛'},
];
let qi=0,qs=0;
function qInit(){
  qi=0;qs=0;
  $('qres').style.display='none';
  $('qcon').style.display='block';
  qShow();
}
function qShow(){
  const q=Qs[qi];
  $('qprog').textContent='Pregunta '+(qi+1)+' de '+Qs.length;
  $('qpreg').textContent=q.p;
  $('qfb').textContent='';
  $('qnxt').style.display='none';
  const c=$('qopts');c.innerHTML='';
  q.o.forEach((op,i)=>{
    const b=document.createElement('button');
    b.className='qopt';b.textContent=op;
    b.onclick=()=>qAns(i);c.appendChild(b);
  });
}
function qAns(i){
  const q=Qs[qi];
  document.querySelectorAll('.qopt').forEach(b=>b.disabled=true);
  document.querySelectorAll('.qopt')[q.c].classList.add('sh');
  if(i===q.c){document.querySelectorAll('.qopt')[i].classList.add('ok');qs++;$('qfb').textContent='✅ '+q.f;}
  else{document.querySelectorAll('.qopt')[i].classList.add('no');$('qfb').textContent='❌ '+q.f;}
  $('qnxt').style.display='block';
}
function qNext(){qi++;if(qi<Qs.length)qShow();else qEnd();}
function qEnd(){
  $('qcon').style.display='none';
  $('qres').style.display='block';
  const p=qs/Qs.length;
  let e,t,d;
  if(p>=.875){e='🏆';t='¡Me conoces perfectamente!';d='Sabías todo de mí… eso significa que me prestas atención, y eso me enamora más. 💛';}
  else if(p>=.625){e='💛';t='¡Me conoces muy bien!';d='Tienes muy claro cómo soy. Aún hay cositas por descubrir… ❤️';}
  else if(p>=.375){e='🌸';t='¡Vamos aprendiendo juntos!';d='Todavía hay mucho por conocernos, y eso me emociona. ✨';}
  else{e='😄';t='¡Hay mucho que contarte!';d='No importa el puntaje… lo que importa es que aquí estás leyendo esto. 🌹';}
  $('qemo').textContent=e;
  $('qtit').textContent=t;
  $('qdesc').textContent=d+' ('+qs+'/'+Qs.length+' correctas)';
}
qInit();

// RULETA
const planes=[
  {i:'🎬',t:'Noche de película juntos con palomitas y abrazos'},
  {i:'🌮',t:'Salir a comer algo rico, solo nosotros dos'},
  {i:'🌅',t:'Ver el atardecer juntos en algún lugar bonito'},
  {i:'💆',t:'Tarde de relax: música, calma y tus manos en las mías'},
  {i:'🎮',t:'Noche de juegos y risas sin parar'},
  {i:'🌹',t:'Sorprenderte con algo especial sin ningún motivo'},
  {i:'📸',t:'Salir a sacar fotos bonitas de nosotros'},
  {i:'🍦',t:'Salir por helado y caminar de la mano sin rumbo'},
];
const cols=['#f7c5c5','#e8818a','#f0d080','#c9a84c','#fce4ec','#fff0d0','#f9b8be','#deb887'];
let rAng=0,rSpin=false;
function drawR(a){
  a=a||0;
  const cv=$('ruletaCanvas');
  if(!cv)return;
  const ctx=cv.getContext('2d'),cx=150,cy=150,r=140,sl=(2*Math.PI)/planes.length;
  ctx.clearRect(0,0,300,300);
  planes.forEach((p,i)=>{
    const s=a+i*sl,e2=s+sl;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,s,e2);ctx.closePath();
    ctx.fillStyle=cols[i];ctx.fill();ctx.strokeStyle='white';ctx.lineWidth=2;ctx.stroke();
    ctx.save();ctx.translate(cx,cy);ctx.rotate(s+sl/2);
    ctx.textAlign='right';ctx.font='bold 22px serif';ctx.fillText(p.i,r-10,8);ctx.restore();
  });
  ctx.beginPath();ctx.arc(cx,cy,18,0,2*Math.PI);
  ctx.fillStyle='white';ctx.fill();ctx.strokeStyle=cols[0];ctx.lineWidth=3;ctx.stroke();
  ctx.font='bold 16px serif';ctx.fillStyle='#e8818a';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('❤',cx,cy);
}
function spinR(){
  if(rSpin)return;rSpin=true;
  $('rbtn').disabled=true;
  const ex=2*Math.PI*(5+Math.random()*5),dst=rAng+ex,dur=4000,t0=performance.now(),a0=rAng;
  function step(now){
    const t=Math.min((now-t0)/dur,1),e=1-Math.pow(1-t,4);
    rAng=a0+ex*e;drawR(rAng);
    if(t<1){requestAnimationFrame(step);return;}
    rAng=dst%(2*Math.PI);rSpin=false;$('rbtn').disabled=false;
    const sl=(2*Math.PI)/planes.length,ag=3*Math.PI/2;
    const nm=((ag-rAng)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);
    const idx=Math.floor(nm/sl)%planes.length,pl=planes[idx];
    $('rres').innerHTML='<div class="rres-ico">'+pl.i+'</div><p class="rres-txt">'+pl.t+'</p>';
  }
  requestAnimationFrame(step);
}
drawR(0);

// MEMORIA
const mS=["img/optimizadas/memoria-01.jpg", "img/optimizadas/memoria-02.jpg", "img/optimizadas/memoria-03.jpg", "img/optimizadas/memoria-04.jpg"];
let mDone=false,mFlip=[],mMat=0,mInt=0,mLock=false;
function mInit(){
  mFlip=[];mMat=0;mInt=0;mLock=false;mDone=true;
  $('mint').textContent=0;
  $('mpar').textContent=0;
  $('mwin').style.display='none';
  const pairs=[0,1,2,3,0,1,2,3].sort(()=>Math.random()-.5);
  const g=$('mgrid');g.innerHTML='';
  pairs.forEach((idx,i)=>{
    const c=document.createElement('div');c.className='mcard';c.dataset.i=idx;
    c.innerHTML='<div class="mfront">💛</div><div class="mback"><img src="'+mS[idx]+'" loading="lazy" alt="Foto de un recuerdo juntos"/></div>';
    c.onclick=()=>mFlp(c);g.appendChild(c);
  });
}
function mFlp(c){
  if(mLock||c.classList.contains('flip')||c.classList.contains('match'))return;
  c.classList.add('flip');mFlip.push(c);
  if(mFlip.length===2){
    mLock=true;mInt++;$('mint').textContent=mInt;
    const [a,b]=mFlip;
    if(a.dataset.i===b.dataset.i){
      a.classList.add('match');b.classList.add('match');mMat++;
      $('mpar').textContent=mMat;
      mFlip=[];mLock=false;
      if(mMat===4)setTimeout(()=>$('mwin').style.display='block',600);
    }else{
      setTimeout(()=>{a.classList.remove('flip');b.classList.remove('flip');mFlip=[];mLock=false;},900);
    }
  }
}

// ══════════════════════════════════
// PUZZLE 🧩
// ══════════════════════════════════
const PZ_GRID=3;// 3x3 = 8 piezas + 1 vacía
let pzPiezas=[];
let pzVacia={r:2,c:2};
let pzMovs=0;
let pzImgActual=0;
let pzResuelto=false;
let pzImg=null;
const PZ_SIZE=300;
const PZ_PIECE=Math.floor((PZ_SIZE-4*(PZ_GRID-1))/PZ_GRID);

// Imágenes del puzzle — se dibujan con canvas con gradientes y flores
// (si el usuario tiene fotos reales las puede reemplazar)
const PZ_IMAGENES=[
  {label:'🌹 Foto 1', draw:(ctx,w,h)=>{
    const g=ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'#ff8a9b');g.addColorStop(.5,'#ffd1a3');g.addColorStop(1,'#ff6b9d');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    ctx.font=`${w*.35}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('🌹',w/2,h*.38);
    ctx.font=`bold ${w*.1}px 'Dancing Script',cursive`;
    ctx.fillStyle='rgba(255,255,255,.9)';
    ctx.fillText('Ana Laura',w/2,h*.72);
    ctx.font=`${w*.08}px serif`;
    ctx.fillText('& Jesús David',w/2,h*.85);
    ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=3;
    ctx.strokeRect(8,8,w-16,h-16);
  }},
  {label:'💛 Foto 2', draw:(ctx,w,h)=>{
    const g=ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'#ffe066');g.addColorStop(.5,'#ffb347');g.addColorStop(1,'#ff8c69');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    ctx.font=`${w*.32}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('🌻',w/2,h*.38);
    ctx.font=`bold ${w*.1}px serif`;ctx.fillStyle='rgba(255,255,255,.9)';
    ctx.fillText('9 Meses',w/2,h*.72);
    ctx.font=`${w*.08}px serif`;ctx.fillText('juntos 💛',w/2,h*.85);
    ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=3;ctx.strokeRect(8,8,w-16,h-16);
  }},
  {label:'✨ Foto 3', draw:(ctx,w,h)=>{
    const g=ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'#ce93d8');g.addColorStop(.5,'#f48fb1');g.addColorStop(1,'#80cbc4');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    ctx.font=`${w*.32}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('🌸',w/2,h*.38);
    ctx.font=`bold ${w*.1}px serif`;ctx.fillStyle='rgba(255,255,255,.9)';
    ctx.fillText('Te amo',w/2,h*.72);
    ctx.font=`${w*.08}px serif`;ctx.fillText('infinito ✨',w/2,h*.85);
    ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=3;ctx.strokeRect(8,8,w-16,h-16);
  }}
];

function pzDibujarImagen(img,size){
  const cv=document.createElement('canvas');
  cv.width=size;cv.height=size;
  const ctx=cv.getContext('2d');
  img.draw(ctx,size,size);
  return cv;
}

function selPuzzle(idx,el){
  document.querySelectorAll('.pz-opcion').forEach(o=>o.classList.remove('activa'));
  el.classList.add('activa');
  pzImgActual=idx;
  pzInit();
}

function pzInit(){
  pzMovs=0;pzResuelto=false;
  $('pzMovs').textContent='Movimientos: 0';
  $('pzWin').classList.remove('show');
  const img=PZ_IMAGENES[pzImgActual];
  const fullCanvas=pzDibujarImagen(img,PZ_SIZE);
  pzImg=fullCanvas;

  const n=PZ_GRID*PZ_GRID;
  pzPiezas=[];
  for(let i=0;i<n-1;i++)pzPiezas.push(i);
  pzPiezas.push(null);// vacía al final

  // Mezclar (solo mezclas válidas)
  for(let i=0;i<200;i++){
    const vi=pzPiezas.indexOf(null);
    const vecinos=pzVecinos(vi);
    const rnd=vecinos[Math.floor(Math.random()*vecinos.length)];
    pzPiezas[vi]=pzPiezas[rnd];
    pzPiezas[rnd]=null;
  }
  pzVacia={r:Math.floor(pzPiezas.indexOf(null)/PZ_GRID),c:pzPiezas.indexOf(null)%PZ_GRID};
  pzRenderizar();
}

function pzVecinos(i){
  const r=Math.floor(i/PZ_GRID),c=i%PZ_GRID,v=[];
  if(r>0)v.push(i-PZ_GRID);
  if(r<PZ_GRID-1)v.push(i+PZ_GRID);
  if(c>0)v.push(i-1);
  if(c<PZ_GRID-1)v.push(i+1);
  return v;
}

function pzEsVecino(i,j){return pzVecinos(i).includes(j);}

function pzRenderizar(){
  const tablero=$('pzTablero');
  tablero.style.gridTemplateColumns=`repeat(${PZ_GRID},1fr)`;
  tablero.innerHTML='';
  const sz=Math.floor((PZ_SIZE-4*(PZ_GRID-1))/PZ_GRID);

  pzPiezas.forEach((val,idx)=>{
    const div=document.createElement('div');
    div.className='pz-pieza'+(val===null?' vacia':'');
    if(val!==null){
      const cv=document.createElement('canvas');
      cv.width=sz;cv.height=sz;
      const ctx=cv.getContext('2d');
      const sr=Math.floor(val/PZ_GRID),sc=val%PZ_GRID;
      ctx.drawImage(pzImg,sc*sz,sr*sz,sz,sz,0,0,sz,sz);
      div.appendChild(cv);
      div.onclick=()=>pzTap(idx);
    }
    tablero.appendChild(div);
  });
}

function pzTap(idx){
  if(pzResuelto)return;
  const vi=pzPiezas.indexOf(null);
  if(!pzEsVecino(idx,vi))return;
  pzPiezas[vi]=pzPiezas[idx];
  pzPiezas[idx]=null;
  pzMovs++;
  $('pzMovs').textContent=`Movimientos: ${pzMovs}`;
  pzRenderizar();
  if(pzComprobar())pzGanar();
}

function pzComprobar(){
  for(let i=0;i<PZ_GRID*PZ_GRID-1;i++)if(pzPiezas[i]!==i)return false;
  return pzPiezas[PZ_GRID*PZ_GRID-1]===null;
}

function pzGanar(){
  pzResuelto=true;
  const win=$('pzWin');
  const wc=$('pzWinCanvas');
  wc.width=200;wc.height=200;
  const img=PZ_IMAGENES[pzImgActual];
  img.draw(wc.getContext('2d'),200,200);
  setTimeout(()=>win.classList.add('show'),400);
}

function pzVer(){
  const prev=$('pzPreview');
  const pc=$('pzPrevCanvas');
  pc.width=240;pc.height=240;
  const img=PZ_IMAGENES[pzImgActual];
  img.draw(pc.getContext('2d'),240,240);
  prev.classList.add('show');
}
function cerrarPrev(){
  $('pzPreview').classList.remove('show');
}

// ══════════════════════════════════
// ¿CUÁNTO ME AMAS? 💛
// ══════════════════════════════════
const CT_PREGUNTAS=[
  {
    p:'¿Cuántas veces al día piensas en mí?',
    opts:['Solo cuando me escribes','A veces, de vez en cuando','Muchas veces, casi siempre','Todo el tiempo, no puedo evitarlo 💛'],
    ok:3,
    fb:['Ay… 😅','¡Ahí vamos!','¡Me alegra! 🥺','¡Eso es lo que quería escuchar! 💛']
  },
  {
    p:'Cuando estamos lejos, ¿qué sientes?',
    opts:['Nada especial','Un poco de nostalgia','Te extraño mucho','Me duele el pecho de extrañarte 💔'],
    ok:3,
    fb:['Mmm… 🤔','¡Eso es algo!','¡Qué bonito! 🥺','¡Eso es amor de verdad! ❤️']
  },
  {
    p:'¿Con qué me compararías?',
    opts:['Con algo normal del día a día','Con un libro favorito','Con el sol en un día nublado','Con el hogar al que siempre quieres volver 🏠💛'],
    ok:3,
    fb:['Hmm…','¡Bonita comparación!','¡Qué dulce! ☀️','¡Eso me derritió el corazón! 💛']
  },
  {
    p:'¿Qué harías si un día me pongo triste sin razón?',
    opts:['Esperar a que se me pase','Preguntarte qué pasó','Abrazarte sin preguntar nada','Quedarme contigo todo el tiempo que necesites 🤗'],
    ok:3,
    fb:['Eh… 😬','¡Bien!','¡Eso es amor! 🥺','¡Perfecto! Eso es exactamente lo que necesito. 💛']
  },
  {
    p:'¿Cómo describirías nuestro amor?',
    opts:['Como algo nuevo que estoy conociendo','Como algo bonito pero con dudas','Como algo especial y hermoso','Como lo más lindo que me ha pasado en la vida 💛'],
    ok:3,
    fb:['Vamos descubriendo…','¡Ya vamos bien!','¡Me encanta! 🌹','¡Eso me llena el corazón de alegría! 💛']
  },
  {
    p:'Cuando me ves, ¿qué es lo primero que sientes?',
    opts:['Normalidad','Alegría','Mariposas en el estómago','Que el mundo se detiene y solo existes tú 🌍💛'],
    ok:3,
    fb:['Ay no…','¡Bien!','¡Qué lindo! 🦋','¡Eso es lo que siento yo también! 💛']
  },
  {
    p:'¿Cuánto me amas?',
    opts:['Un poquito','Bastante','Mucho','Más de lo que las palabras pueden decir 💛'],
    ok:3,
    fb:['😅','¡Algo es algo!','¡Qué bien! 🥺','¡Esa es la respuesta correcta siempre! 💛']
  },
  {
    p:'¿Qué significa para ti que llevemos 9 meses juntos?',
    opts:['Es tiempo que ha pasado','Algo importante que celebro','Nueve meses de aprender a amarte','Nueve meses que cambiarían todo si pudiera vivirlos de nuevo contigo 💛'],
    ok:3,
    fb:['…','¡Muy bien!','¡Hermoso! 🌹','¡Eso me llegó al alma! 💛']
  },
  {
    p:'¿Cómo te imaginas el futuro?',
    opts:['No pienso tan lejos','Con incertidumbre','Con esperanza y contigo','Construyendo cada día algo hermoso a tu lado 💛'],
    ok:3,
    fb:['Tomemos las cosas con calma 😊','¡Ya veremos!','¡Qué bonito! 🥺','¡Ese es nuestro futuro! 💛']
  },
  {
    p:'¿Cuánto tiempo quieres seguir a mi lado?',
    opts:['Lo que sea necesario','Mucho tiempo más','Para siempre si tú quieres','El resto de mi vida, y si hay más, también 💛'],
    ok:3,
    fb:['Hmm…','¡Bien!','¡Me derrites! 🥺','¡Esa respuesta me hace el ser más feliz del mundo! 💛']
  }
];

let ctIdx=0,ctPuntos=0,ctRespondida=false;

function ctInit(){
  ctIdx=0;ctPuntos=0;ctRespondida=false;
  $('ctjuego').style.display='block';
  $('ctRes').style.display='none';
  ctMostrarPregunta();
}

function ctMostrarPregunta(){
  ctRespondida=false;
  const q=CT_PREGUNTAS[ctIdx];
  const total=CT_PREGUNTAS.length;
  $('ctProg').textContent=`Pregunta ${ctIdx+1} de ${total}`;
  $('ctBarra').style.width=`${(ctIdx/total)*100}%`;
  $('ctPreg').textContent=q.p;
  $('ctFb').textContent='';
  $('ctNxt').style.display='none';

  // Animación corazón
  const cor=$('ctCorazon');
  cor.style.transform='scale(1.3)';
  setTimeout(()=>cor.style.transform='scale(1)',300);

  const opts=$('ctOpts');
  opts.innerHTML='';
  q.opts.forEach((o,i)=>{
    const btn=document.createElement('button');
    btn.className='ct-opt';btn.textContent=o;
    btn.onclick=()=>ctResponder(i,btn);
    opts.appendChild(btn);
  });
}

function ctResponder(i,btn){
  if(ctRespondida)return;
  ctRespondida=true;
  const q=CT_PREGUNTAS[ctIdx];
  const todos=document.querySelectorAll('.ct-opt');

  todos.forEach((b,j)=>{
    b.disabled=true;
    if(j===q.ok)b.classList.add('correcta');
    else if(j===i&&i!==q.ok)b.classList.add('incorrecta');
  });

  const puntos=q.ok-i;// más cerca de ok = más puntos
  if(i===q.ok)ctPuntos+=10;
  else if(i===q.ok-1)ctPuntos+=6;
  else if(i===q.ok-2)ctPuntos+=3;

  $('ctFb').textContent=q.fb[i]||'';
  $('ctNxt').style.display='block';
  $('ctNxt').textContent=ctIdx<CT_PREGUNTAS.length-1?'Siguiente 💛':'Ver resultado 💛';
}

function ctNext(){
  ctIdx++;
  if(ctIdx<CT_PREGUNTAS.length){
    ctMostrarPregunta();
  } else {
    ctMostrarResultado();
  }
}

function ctMostrarResultado(){
  $('ctjuego').style.display='none';
  const res=$('ctRes');
  res.style.display='block';
  const max=CT_PREGUNTAS.length*10;
  const pct=Math.round((ctPuntos/max)*100);

  let ico,tit,desc;
  if(pct>=90){ico='💛💛💛';tit='¡Amor infinito!';desc='Lo sabía… me amas con todo tu corazón. Este resultado me hace la persona más feliz del mundo. 💛';}
  else if(pct>=70){ico='❤️💛';tit='¡Me amas muchísimo!';desc='Casi perfecto… y ese "casi" también es precioso porque lo seguiremos construyendo juntos. 🌹';}
  else if(pct>=50){ico='💕';tit='¡Me amas de verdad!';desc='Nuestro amor está creciendo cada día y eso es lo más bonito que podría pedirle a la vida. 🌸';}
  else{ico='🌱';tit='Nuestro amor crece';desc='Estamos aprendiendo a amarnos y eso también es hermoso. Lo mejor está por venir. ✨';}

  $('ctResCorazon').textContent=ico;
  $('ctResTit').textContent=tit;
  $('ctResDesc').textContent=desc;
  $('ctPuntos').textContent=`${ctPuntos} / ${max} puntos (${pct}%)`;
  $('ctBarra').style.width='100%';
}

// Init juegos nuevos al cargar
ctInit();
pzInit();

// ══ JUEGO: ENCUENTRA LOS CORAZONES ══
const HH_ITEMS=[
  {emoji:'🐚',sx:8,sy:62},{emoji:'🐚',sx:22,sy:70},{emoji:'🐚',sx:65,sy:68},
  {emoji:'🐚',sx:80,sy:72},{emoji:'🐚',sx:45,sy:66},{emoji:'🐚',sx:90,sy:60},
  {emoji:'⭐',sx:15,sy:74},{emoji:'⭐',sx:55,sy:72},{emoji:'⭐',sx:75,sy:78},
  {emoji:'🦀',sx:35,sy:65},{emoji:'🦀',sx:85,sy:68},
  {emoji:'🌊',sx:10,sy:20},{emoji:'🌊',sx:50,sy:15},{emoji:'🌊',sx:85,sy:22},
  {emoji:'☀️',sx:50,sy:8},
  {emoji:'⛵',sx:25,sy:28},{emoji:'⛵',sx:72,sy:32},
  {emoji:'🐦',sx:15,sy:12},{emoji:'🐦',sx:80,sy:10},
];
const HH_CORAZONES_POS=[
  {x:12,y:55},{x:38,y:70},{x:60,y:60},{x:82,y:52},{x:55,y:30}
];
let hhFound=0;

function hhInit(){
  hhFound=0;
  $('hhCount').textContent='0';
  $('hhWin').classList.remove('show');
  const escena=$('hhEscena');
  escena.innerHTML='';

  // Elementos decorativos
  HH_ITEMS.forEach(it=>{
    const el=document.createElement('span');
    el.className='hh-item';
    el.textContent=it.emoji;
    el.style.left=it.sx+'%';
    el.style.top=it.sy+'%';
    escena.appendChild(el);
  });

  // Corazones ocultos
  HH_CORAZONES_POS.forEach((pos,i)=>{
    const el=document.createElement('span');
    el.className='hh-corazon';
    el.textContent='💛';
    el.style.left=pos.x+'%';
    el.style.top=pos.y+'%';
    el.onclick=()=>{
      if(el.classList.contains('found'))return;
      el.classList.add('found');
      hhFound++;
      $('hhCount').textContent=hhFound;
      vibrar(40);
      if(hhFound===HH_CORAZONES_POS.length){
        setTimeout(()=>$('hhWin').classList.add('show'),600);
      }
    };
    escena.appendChild(el);
  });
}
hhInit();

