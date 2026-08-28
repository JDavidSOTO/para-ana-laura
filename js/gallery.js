// Fotos
function toggleFrase(el){
  document.querySelectorAll('.foto-card.active').forEach(c=>{if(c!==el)c.classList.remove('active');});
  el.classList.toggle('active');
}

// GALAXIA
const gxData=[{"img": "img/optimizadas/galaxia-01.jpg", "label": "Nuestro primer encuentro \ud83d\udecd\ufe0f", "txt": "El d\u00eda que te vi por primera vez y algo dentro de m\u00ed cambi\u00f3 para siempre."}, {"img": "img/optimizadas/galaxia-02.jpg", "label": "Noches que no olvidar\u00e9 \ud83c\udf19", "txt": "Esas noches contigo que quisiera poder guardar en un frasco y abrir cuando te extra\u00f1e."}, {"img": "img/optimizadas/galaxia-03.jpg", "label": "Tu arte me enamor\u00f3 \ud83c\udfa8", "txt": "Pintaste dos cuadritos y sin querer te pintaste en mi coraz\u00f3n para siempre."}, {"img": "img/optimizadas/galaxia-04.jpg", "label": "Caras y besitos \ud83d\udc8b", "txt": "Ese besito tuyo vale m\u00e1s que cualquier cosa en este mundo."}, {"img": "img/optimizadas/galaxia-05.jpg", "label": "Tan cerca\u2026 siempre \ud83d\udcab", "txt": "Podr\u00eda quedarme mir\u00e1ndote as\u00ed toda la vida\u2026 y no me cansar\u00eda jam\u00e1s."}, {"img": "img/optimizadas/galaxia-06.jpg", "label": "Mi beso favorito \ud83c\udf38", "txt": "Te beso la frente porque ah\u00ed guardo todos mis te quiero."}, {"img": "img/optimizadas/galaxia-07.jpg", "label": "Juntos en la noche \u2728", "txt": "Donde sea que estemos juntos, ese lugar se convierte en mi sitio favorito."}, {"img": "img/optimizadas/galaxia-08.jpg", "label": "Flores para ti \ud83c\udf3b", "txt": "Te di flores, pero eres t\u00fa la que m\u00e1s luz le da a mi vida."}];
let gxStars=[],gxReady=false;
// Frases personales (estrellas sin foto, solo mensaje)
const gxPhrases=[
  {label:'Mi lugar favorito 🏡',txt:'Mi lugar favorito no es un sitio, eres tú, sin importar dónde estemos.'},
  {label:'Cada día contigo 📅',txt:'Cada día contigo se siente como el primero, y eso es lo más bonito que me ha pasado.'},
  {label:'Tu risa 😄',txt:'Tu risa es mi sonido favorito en el mundo entero, podría escucharla para siempre.'},
  {label:'Gracias por existir 💛',txt:'Gracias por existir y por dejarme ser parte de tu historia.'},
  {label:'Mi calma 🌙',txt:'Cuando el mundo se pone difícil, pensar en ti es lo que me devuelve la calma.'},
  {label:'Nuestro futuro ✨',txt:'No sé qué nos espera, pero sé que quiero recorrerlo tomado de tu mano.'},
  {label:'Eres mi persona 💫',txt:'De todas las personas que pude encontrar en este mundo, te encontré a ti. Y no cambiaría eso por nada.'},
  {label:'Pequeños momentos 🍃',txt:'Amo los momentos pequeños contigo: un mensaje, una llamada, un "buenos días" que me alegra todo.'},
  {label:'Mi mejor decisión 💖',txt:'Elegirte cada día ha sido, sin duda, la mejor decisión que he tomado.'},
  {label:'Para siempre 🌌',txt:'Quiero que sepas que esto que siento por ti no tiene fecha de caducidad. Es para siempre.'}
];
function gxInit(){
  if(gxReady)return;gxReady=true;
  const cv=$('galaxyCanvas');if(!cv)return;
  const W=cv.offsetWidth,H=cv.offsetHeight;cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d');
  const bgS=[];for(let i=0;i<120;i++)bgS.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*.9+.2,a:Math.random()});

  // Estrellas combinadas: fotos (con imagen) + frases (solo texto), cada una con su propia profundidad (z)
  const gxAll=[
    ...gxData.map(d=>({data:d,tipo:'foto'})),
    ...gxPhrases.map(d=>({data:d,tipo:'frase'}))
  ];
  const cx=W/2,cy=H/2,baseR=Math.min(W,H)*.34;
  gxStars=gxAll.map((item,i)=>{
    const ang=(i/gxAll.length)*2*Math.PI;
    const z=Math.sin(i*2.4)*.5+.5; // profundidad pseudoaleatoria 0..1, distinta por estrella
    return {
      ang, z,
      r:item.tipo==='foto'?7:4.5,
      p:Math.random()*Math.PI*2,
      px:cx, py:cy, // posición proyectada (se actualiza cada frame)
      data:item.data
    };
  });

  let t=0,rot=0;
  function proyectar(s){
    // Rotación lenta de todo el disco + inclinación para dar sensación de profundidad
    const a=s.ang+rot;
    const depthScale=.55+.45*s.z; // estrellas "cercanas" (z alto) más grandes y rápidas
    const rr=baseR*(0.7+0.3*s.z)+((s.z-.5)*baseR*.4);
    const x=cx+Math.cos(a)*rr;
    const y=cy+Math.sin(a)*rr*0.55; // achatado en Y = efecto de disco visto en perspectiva
    return {x,y,scale:depthScale};
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*.7);
    bg.addColorStop(0,'#1a0535');bg.addColorStop(1,'#040010');
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    bgS.forEach(s=>{s.a=.3+.7*Math.abs(Math.sin(t*.02+s.x));ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,2*Math.PI);ctx.fillStyle='rgba(255,240,255,'+s.a+')';ctx.fill();});

    rot=t*.0025;
    // Ordenamos por profundidad para que las "lejanas" se dibujen primero (efecto 3D real)
    const orden=[...gxStars].sort((a,b)=>a.z-b.z);
    orden.forEach(s=>{
      const pos=proyectar(s);
      s.px=pos.x;s.py=pos.y;s.scale=pos.scale;
      const pulse=(.7+.3*Math.sin(t*.05+s.p))*pos.scale;
      const radio=s.r*pulse;
      const grd=ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,radio*3);
      grd.addColorStop(0,'rgba(255,200,220,'+ (0.6+0.4*pos.scale) +')');
      grd.addColorStop(.4,'rgba(255,150,180,'+(0.35+0.25*pos.scale)+')');
      grd.addColorStop(1,'transparent');
      ctx.beginPath();ctx.arc(pos.x,pos.y,radio*3,0,2*Math.PI);ctx.fillStyle=grd;ctx.fill();
      ctx.beginPath();ctx.arc(pos.x,pos.y,radio*.8,0,2*Math.PI);ctx.fillStyle='white';ctx.fill();
    });
    t++;requestAnimationFrame(draw);
  }
  draw();
  function onTap(e){
    const rect=cv.getBoundingClientRect(),sx=cv.width/rect.width,sy=cv.height/rect.height;
    const cx2=((e.touches?e.touches[0].clientX:e.clientX)-rect.left)*sx;
    const cy2=((e.touches?e.touches[0].clientY:e.clientY)-rect.top)*sy;
    // Buscamos primero entre las estrellas más cercanas (mayor escala) para que sean más fáciles de tocar
    const candidatas=[...gxStars].sort((a,b)=>b.scale-a.scale);
    for(const s of candidatas){
      const radioToque=Math.max(18,26*s.scale);
      if(Math.hypot(cx2-s.px,cy2-s.py)<radioToque){
        mostrarEstrellaGalaxia(s.data);
        break;
      }
    }
  }
  cv.addEventListener('click',onTap);
  cv.addEventListener('touchstart',e=>{e.preventDefault();onTap(e);},{passive:false});
}

/** Muestra el popup de una estrella; oculta la imagen si es una estrella de solo frase */
function mostrarEstrellaGalaxia(data){
  const img=$('gxImg');
  if(data.img){
    img.src=data.img;
    img.style.display='';
  } else {
    img.style.display='none';
  }
  $('gxLabel').textContent=data.label;
  $('gxTxt').textContent=data.txt;
  $('gxPopup').classList.add('open');
}
const gxObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){gxInit();gxObs.unobserve(e.target);}})  ,{threshold:.2});
const gxEl=$('galaxyCanvas');if(gxEl)gxObs.observe(gxEl);

// JARDÍN
const jdFl=[
  {e:'🌸',n:'Gerbera rosada',c:'#ff9eb5',t:'Como una gerbera, tu alegría ilumina todo lo que te rodea. Eres la flor más bonita de mi jardín.'},
  {e:'🌻',n:'Girasol',c:'#ffd700',t:'Como el girasol que siempre busca el sol, yo siempre te busco a ti. Eres mi luz, Ana Laura.'},
  {e:'🌹',n:'Rosa roja',c:'#e8818a',t:'Clásica y perfecta como una rosa. Elegí darte mi corazón porque sabía que lo cuidarías bien.'},
  {e:'🌸',n:'Gerbera blanca',c:'#ffe0ec',t:'Pura y hermosa. Así es tu alma, así es tu sonrisa. Así eres tú para mí.'},
  {e:'🌺',n:'Flor tropical',c:'#ff7043',t:'Vibrante y única, como tú. No hay nadie igual en este mundo, y eso me enamora cada día.'},
  {e:'🌷',n:'Tulipán',c:'#f48fb1',t:'Te mereces flores todos los días. Yo quiero ser quien te las dé siempre.'},
  {e:'🌼',n:'Margarita',c:'#fff176',t:'Simple y perfecta. Como los momentos pequeños contigo que se vuelven mis favoritos sin que lo planee.'},
  {e:'💐',n:'Ramo para ti',c:'#ce93d8',t:'Si pudiera, te traería flores cada vez que te veo. Pero mientras tanto, este jardín es tuyo. Siempre.'},
];
let jdFlores=[],jdReady=false;
function jdInit(){
  if(jdReady)return;jdReady=true;
  const cv=$('jardinCanvas');if(!cv)return;
  const W=cv.offsetWidth,H=cv.offsetHeight;cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d');
  const cols=4;
  jdFlores=jdFl.map((f,i)=>{
    const col=i%cols,row=Math.floor(i/cols);
    return {x:(col+.5)*(W/cols)+(Math.random()-.5)*18,y:H*.38+row*(H*.32)+(Math.random()-.5)*12,size:0,target:26+Math.random()*10,delay:i*200,sway:Math.random()*Math.PI*2,ready:false,data:f};
  });
  const t0=performance.now();
  function draw(now){
    ctx.clearRect(0,0,W,H);
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#ffe4f0');sky.addColorStop(.6,'#fff8e1');sky.addColorStop(1,'#e8f5e9');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    const grd=ctx.createLinearGradient(0,H*.75,0,H);
    grd.addColorStop(0,'#a5d6a7');grd.addColorStop(1,'#66bb6a');
    ctx.fillStyle=grd;
    ctx.beginPath();ctx.moveTo(0,H*.78);
    for(let x=0;x<=W;x+=20)ctx.lineTo(x,H*.78+Math.sin(x*.08+now*.001)*4);
    ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
    [{'x':0.2,'y':0.25},{'x':0.75,'y':0.3}].forEach((b,i)=>{
      ctx.font=(18+Math.sin(now*.004)*3)+'px serif';
      ctx.fillText('🦋',W*b.x+Math.sin(now*.002+i)*30,H*b.y+Math.cos(now*.003+i)*15);
    });
    jdFlores.forEach(f=>{
      const el=now-t0-f.delay;
      if(el>0&&f.size<f.target)f.size=Math.min(f.target,f.size+f.target/40);
      if(f.size<=0)return;
      f.ready=f.size>=f.target*.9;
      const sw=Math.sin(now*.002+f.sway)*3;
      ctx.strokeStyle='#4caf50';ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(f.x+sw,f.y+f.size);
      ctx.quadraticCurveTo(f.x+sw*2,f.y+f.size*.5,f.x+sw,f.y-f.size*.3);ctx.stroke();
      ctx.fillStyle='#66bb6a';ctx.beginPath();
      ctx.ellipse(f.x+sw-8,f.y+f.size*.4,8,4,-.5,0,2*Math.PI);ctx.fill();
      ctx.font=f.size+'px serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(f.data.e,f.x+sw,f.y);
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  function onTap(e){
    const rect=cv.getBoundingClientRect(),sx=cv.width/rect.width,sy=cv.height/rect.height;
    const cx=((e.touches?e.touches[0].clientX:e.clientX)-rect.left)*sx;
    const cy=((e.touches?e.touches[0].clientY:e.clientY)-rect.top)*sy;
    for(const f of jdFlores){if(f.ready&&Math.hypot(cx-f.x,cy-f.y)<f.target+5){
      $('jdFlor').textContent=f.data.e;
      $('jdNombre').textContent=f.data.n;
      $('jdTxt').textContent=f.data.t;
      $('jdPopup').classList.add('open');break;
    }}
  }
  cv.addEventListener('click',onTap);
  cv.addEventListener('touchstart',e=>{e.preventDefault();onTap(e);},{passive:false});
}
const jdObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){jdInit();jdObs.unobserve(e.target);}})  ,{threshold:.15});
const jdEl=$('jardinCanvas');if(jdEl)jdObs.observe(jdEl);

// ══════════════════════════════════
// SORPRESAS CINEMATOGRÁFICAS
// ══════════════════════════════════

// — Olas animadas en el mar —
function initSorpOlas(){
  const canvas=$('sorpOlasCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let t=0;
  function resize(){canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;}
  resize();
  window.addEventListener('resize',resize);
  function drawOlas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const h=canvas.height,w=canvas.width;
    // Ola 1
    ctx.beginPath();
    ctx.moveTo(0,h*.55);
    for(let x=0;x<=w;x+=4){
      const y=h*.55+Math.sin((x/w)*Math.PI*4+t)*12+Math.sin((x/w)*Math.PI*6+t*1.3)*6;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();
    ctx.fillStyle='rgba(0,151,167,.35)';ctx.fill();
    // Ola 2
    ctx.beginPath();
    ctx.moveTo(0,h*.65);
    for(let x=0;x<=w;x+=4){
      const y=h*.65+Math.sin((x/w)*Math.PI*3+t*1.2)*10+Math.sin((x/w)*Math.PI*5+t*.9)*5;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();
    ctx.fillStyle='rgba(0,131,143,.45)';ctx.fill();
    // Ola 3
    ctx.beginPath();
    ctx.moveTo(0,h*.78);
    for(let x=0;x<=w;x+=4){
      const y=h*.78+Math.sin((x/w)*Math.PI*5+t*1.5)*7;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();
    ctx.fillStyle='rgba(0,97,120,.55)';ctx.fill();
    t+=.025;
    requestAnimationFrame(drawOlas);
  }
  drawOlas();
}

// — Abrir botella: transición a pergamino —
function abrirBotella(){
  const fase1=$('sorpFase1');
  const fase2=$('sorpFase2');
  // Efecto: botella se agita y sube
  const botella=$('sorpBotella');
  botella.style.transition='transform .6s cubic-bezier(.34,1.56,.64,1),opacity .4s';
  botella.style.transform='translateY(-80px) scale(1.2) rotate(10deg)';
  botella.style.opacity='0';
  vibrar([30,20,60,20,30]);
  setTimeout(()=>{
    fase1.style.transition='opacity .4s';
    fase1.style.opacity='0';
    setTimeout(()=>{
      fase1.style.display='none';
      fase2.style.display='block';
      // Inicializar scratch cards
      setTimeout(()=>{
        initScratch(0);
      },400);
    },400);
  },500);
}

// — Scratch cards reales con canvas —
const scratchDone=[false,false,false];
let scratchCount=0;

function initScratch(idx){
  const canvas=$('scratch'+idx);
  if(!canvas)return;
  const caja=$('sorpCaja'+idx);
  const w=caja.offsetWidth||300;
  const h=caja.offsetHeight||90;
  canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext('2d');

  // Fondo de la capa de raspar
  const grad=ctx.createLinearGradient(0,0,w,h);
  grad.addColorStop(0,'#e8818a');
  grad.addColorStop(.5,'#c9a84c');
  grad.addColorStop(1,'#e8818a');
  ctx.fillStyle=grad;
  ctx.fillRect(0,0,w,h);

  // Texto "Raspa para revelar"
  ctx.fillStyle='rgba(255,255,255,.85)';
  ctx.font=`bold ${Math.min(w*.045,14)}px Lato,sans-serif`;
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.fillText('✨ Raspa para revelar tu sorpresa ✨',w/2,h/2);
  ctx.globalCompositeOperation='destination-out';

  let isDrawing=false;
  let revealed=0;
  const totalPixels=w*h;

  function getPos(e,canvas){
    const rect=canvas.getBoundingClientRect();
    const scaleX=canvas.width/rect.width;
    const scaleY=canvas.height/rect.height;
    const src=e.touches?e.touches[0]:e;
    return{x:(src.clientX-rect.left)*scaleX,y:(src.clientY-rect.top)*scaleY};
  }

  function scratch(e){
    if(!isDrawing)return;
    e.preventDefault();
    const pos=getPos(e,canvas);
    ctx.beginPath();
    ctx.arc(pos.x,pos.y,22,0,Math.PI*2);
    ctx.fill();
    // Comprobar % raspado
    if(Math.random()<.08){
      const data=ctx.getImageData(0,0,w,h).data;
      let cleared=0;
      for(let i=3;i<data.length;i+=4)if(data[i]===0)cleared++;
      if(cleared/totalPixels>.45&&!scratchDone[idx]){
        terminarScratch(idx,canvas,caja);
      }
    }
  }

  canvas.addEventListener('mousedown',e=>{isDrawing=true;scratch(e);});
  canvas.addEventListener('mousemove',scratch);
  canvas.addEventListener('mouseup',()=>isDrawing=false);
  canvas.addEventListener('touchstart',e=>{isDrawing=true;scratch(e);},{passive:false});
  canvas.addEventListener('touchmove',scratch,{passive:false});
  canvas.addEventListener('touchend',()=>isDrawing=false);
}

function terminarScratch(idx,canvas,caja){
  if(scratchDone[idx])return;
  scratchDone[idx]=true;
  scratchCount++;
  // Desvanece el canvas
  canvas.style.transition='opacity .6s';
  canvas.style.opacity='0';
  caja.classList.add('done');
  vibrar([50,30,80]);
  // Animación de entrada del contenido
  const contenido=$('sorpContenido'+idx);
  contenido.style.animation='sorpContenidoIn .5s cubic-bezier(.16,1,.3,1) both';
  // Desbloquear siguiente caja
  setTimeout(()=>{
    if(idx<2){
      const next=$('sorpCaja'+(idx+1));
      next.style.transition='opacity .5s,transform .5s';
      next.style.opacity='1';
      next.style.pointerEvents='auto';
      next.style.transform='scale(1.02)';
      setTimeout(()=>next.style.transform='scale(1)',300);
      initScratch(idx+1);
    }
    if(scratchCount===3){
      setTimeout(mostrarFinal,700);
    }
  },600);
}

