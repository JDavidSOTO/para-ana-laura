/* ══════════════════════════════════════════════════════
   NUESTRA HISTORIA — script.js
   Vanilla JavaScript puro. Sin librerías ni frameworks.
   ══════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────
   1) LOS MOMENTOS DE SU HISTORIA
   Posiciones aproximadas en el mundo, calculadas a partir de
   coordenadas reales (Montería, Cereté/Rabolargo, Planeta Rica,
   Coveñas), para que la disposición del mapa respete la
   geografía real de Córdoba y Sucre.
   ────────────────────────────────────────────────────── */
const MOMENTOS = [
  {
    id:1, x:-25, y:15, foto:null,
    lugar:'C.C. Buenavista, Montería',
    fecha:'Donde todo empezó',
    titulo:'Nuestro primer encuentro',
    msg:'Después de conocernos por Facebook y de tantos días hablando y conociéndonos poco a poco, por fin nos vimos en persona en el Buenavista. Jugamos varios juegos, nos reímos como si ya lleváramos tiempo, y al despedirnos nos dimos nuestro primer beso. Todavía recuerdo ese día como si fuera ayer.'
  },
  {
    id:2, x:25, y:-15, foto:null,
    lugar:'C.C. Buenavista, Montería',
    fecha:'7 de septiembre de 2025',
    titulo:'El día que fuiste mi novia',
    msg:'Volvimos al mismo centro comercial donde nos conocimos, y ese día te pregunté si querías ser mi novia. Fue un momento que llevo grabado en la memoria: los nervios, tu respuesta, y la certeza de que quería empezar contigo algo serio. Desde ese 7 de septiembre, todo cambió para bien.'
  },
  {
    id:3, x:190, y:-279, foto:null,
    lugar:'Rabolargo, Cereté, Córdoba',
    fecha:'Las fiestas de tu pueblo',
    titulo:'Conociendo tu mundo',
    msg:'Fuiste a las fiestas de tu pueblo y me llevaste contigo, a conocer un pedazo de tu vida que hasta entonces solo conocía por lo que me contabas. Ahí nacieron momentos muy bonitos entre nosotros, de esos que se sienten distintos, más nuestros. Fue la primera vez que sentí que empezaba a formar parte de tu mundo.'
  },
  {
    id:4, x:474, y:616, foto:null,
    lugar:'Planeta Rica, Córdoba',
    fecha:'Nuestra primera noche juntos',
    titulo:'Una noche que no olvidaremos',
    msg:'Viniste a mi casa en Planeta Rica, y esa noche dormimos juntos por primera vez. No fue solo una noche cualquiera: fue de esos momentos que se quedan grabados para siempre, tranquilos, cómodos, como si lleváramos toda la vida haciendo eso. Todavía pienso en esa noche con una sonrisa.'
  },
  {
    id:5, x:504, y:646, foto:null,
    lugar:'Planeta Rica, Córdoba',
    fecha:'24 de diciembre de 2025',
    titulo:'Nuestra primera Nochebuena',
    msg:'Pasaste el 24 de diciembre conmigo, en mi casa, celebrando en familia y compartiendo una fecha tan especial como esta. Fue la primera Nochebuena que vivimos juntos, y quiero que sea la primera de muchas más por venir.'
  },
  {
    id:6, x:220, y:-249, foto:null,
    lugar:'Rabolargo, Cereté, Córdoba',
    fecha:'31 de diciembre de 2025',
    titulo:'Cerrando el año juntos',
    msg:'Para recibir el año nuevo, fui yo quien llegó a tu casa, en Rabolargo. Cerramos ese año como lo empezamos: juntos, con la certeza de que todo lo que veníamos construyendo valía la pena. Recibir el año a tu lado se sintió como la mejor forma posible de despedir los meses que habíamos vivido.'
  },
  {
    id:7, x:290, y:-999, foto:null,
    lugar:'Coveñas, Sucre',
    fecha:'Nuestro paseo a la playa',
    titulo:'El mar también nos vio felices',
    msg:'Nos escapamos juntos a la playa, a Coveñas, para celebrar nuestros meses juntos frente al mar. Entre olas, atardeceres y risas, ese viaje se convirtió en uno de los recuerdos más bonitos que tenemos hasta ahora. Ojalá vengan muchos viajes más como ese.'
  },
  {
    id:8, x:350, y:-1219, especial:true, foto:null, esUnAno:true,
    lugar:'Aquí y ahora',
    fecha:'7 de septiembre de 2026',
    titulo:'Nuestro primer año 💍',
    msg:'Hoy se cumple un año exacto desde aquel día en el Buenavista en que te pregunté si querías ser mi novia. Un año completo desde que decidimos construir esto juntos.\n\nHan pasado tantas cosas en estos doce meses: aquel primer encuentro y nuestro primer beso al despedirnos, las fiestas de tu pueblo donde empecé a conocer tu mundo, nuestra primera noche juntos en Planeta Rica, la Nochebuena y el año nuevo que celebramos cada uno en la casa del otro, y ese viaje a Coveñas frente al mar que no voy a olvidar jamás.\n\nCada uno de esos lugares, de esos días, se quedó grabado en este mapa porque se quedó grabado primero en mí. Contigo aprendí que el amor también se construye en los detalles pequeños: un mensaje, una llamada, un viaje, una noche cualquiera que termina siendo inolvidable.\n\nGracias por este primer año. Gracias por elegirme también a mí, una y otra vez, en cada uno de esos momentos. Este mapa apenas está empezando: todavía nos faltan muchísimos lugares por marcar juntos, muchos recuerdos por vivir, muchos años más por celebrar.\n\nTe amo, feliz aniversario.\n\n— Jesús David'
  }
];

/** Fecha del primer aniversario: el recuerdo especial permanece
 *  bloqueado hasta este día. */
const FECHA_ANIVERSARIO = new Date(2026, 8, 7); // mes 8 = septiembre (0-indexado)

function estaBloqueado(m){
  if(!m.esUnAno) return false;
  return new Date() < FECHA_ANIVERSARIO;
}

function diasParaAniversario(){
  const ahora = new Date();
  const ms = FECHA_ANIVERSARIO - ahora;
  return Math.max(0, Math.ceil(ms/86400000));
}

/* ──────────────────────────────────────────────────────
   2) CANVAS Y CÁMARA
   ────────────────────────────────────────────────────── */
const canvas = document.getElementById('mapaCanvas');
const ctx = canvas.getContext('2d');
let W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);

function resize(){
  W=window.innerWidth;H=window.innerHeight;
  canvas.width=W*DPR;canvas.height=H*DPR;
  canvas.style.width=W+'px';canvas.style.height=H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
}
window.addEventListener('resize',resize);
resize();

const camera={x:130,y:-350,scale:.55,targetX:130,targetY:-350,targetScale:.55,vx:0,vy:0};
const ZOOM_MIN=.25, ZOOM_MAX=3.2;

function mundoAPantalla(x,y){
  return { sx: W/2 + (x-camera.x)*camera.scale, sy: H/2 + (y-camera.y)*camera.scale };
}

/* ──────────────────────────────────────────────────────
   3) DECORACIÓN DEL TERRENO (generada una sola vez)
   ────────────────────────────────────────────────────── */
function semilla(n){ return (Math.sin(n*12.9898)*43758.5453)%1; }

// Textura del terreno: parches orgánicos de vegetación (visto desde arriba)
const parches=[];
for(let i=0;i<90;i++){
  const t=i/90;
  const baseX=-150+t*650, baseY=750-t*2250;
  parches.push({
    x: baseX+(semilla(i*3.1)-0.5)*600,
    y: baseY+(semilla(i*5.7)-0.5)*600,
    r: 40+semilla(i*7.3)*90,
    tono: semilla(i*2.2)>0.5 ? '#5f7a3f' : '#4d6b38'
  });
}

// Pueblos/ciudades reales: cada una con su propia cuadrícula de calles y techos
const CIUDADES=[
  { nombre:'Montería',     cx:0,   cy:0,    radio:130 },
  { nombre:'Rabolargo',    cx:205, cy:-264, radio:95  },
  { nombre:'Planeta Rica', cx:489, cy:631,  radio:105 },
  { nombre:'Coveñas',      cx:290, cy:-999, radio:115 }
];

const ESPACIO_CALLE=26; // separación entre calles, en unidades de mundo
const casas=[];
CIUDADES.forEach((ciudad,ci)=>{
  const n=Math.ceil(ciudad.radio/ESPACIO_CALLE);
  for(let gx=-n;gx<=n;gx++){
    for(let gy=-n;gy<=n;gy++){
      const x=ciudad.cx+gx*ESPACIO_CALLE, y=ciudad.cy+gy*ESPACIO_CALLE;
      if(Math.hypot(x-ciudad.cx,y-ciudad.cy) > ciudad.radio) continue;
      const s=semilla(ci*211+gx*17.3+gy*29.1);
      if(s<0.4) continue; // deja algunos lotes vacíos (calles/plazas)
      const paleta=['#8a8a82','#7a6250','#8a4a42','#5a6b7a','#6b5842'];
      casas.push({
        x: x+(semilla(gx*3.7+gy*1.9+ci)-0.5)*8,
        y: y+(semilla(gy*4.1+gx*2.3+ci)-0.5)*8,
        w: 9+semilla(gx*5+gy*7+ci)*7,
        h: 9+semilla(gy*6+gx*8+ci)*7,
        rot:(semilla(gx*2+gy*3+ci)-0.5)*0.5,
        color: paleta[Math.floor(semilla(gx*9+gy*11+ci)*paleta.length)]
      });
    }
  }
});

/* ──────────────────────────────────────────────────────
   4) DIBUJO — estilo vista satelital
   ────────────────────────────────────────────────────── */
let tiempo=0;

function dibujarFondo(){
  ctx.fillStyle='#0d1408';
  ctx.fillRect(0,0,W,H);
}

/** Terreno base: verde de vegetación con parches de textura, visto desde arriba */
function dibujarTerreno(){
  const centro=mundoAPantalla(180,-350);
  const r=1500*camera.scale;
  ctx.beginPath();
  ctx.ellipse(centro.sx,centro.sy,r*1.05,r*1.4,0,0,Math.PI*2);
  ctx.fillStyle='#3c5a2a';
  ctx.fill();

  parches.forEach(p=>{
    const pp=mundoAPantalla(p.x,p.y);
    const rr=p.r*camera.scale;
    if(rr<1||pp.sx<-rr||pp.sx>W+rr||pp.sy<-rr||pp.sy>H+rr) return;
    ctx.fillStyle=p.tono;
    ctx.globalAlpha=.55;
    ctx.beginPath();ctx.arc(pp.sx,pp.sy,rr,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
  });

  // Agua cerca de Coveñas (costa real de Sucre), con textura de olas
  const agua=mundoAPantalla(330,-1080);
  const rAgua=480*camera.scale;
  ctx.beginPath();ctx.ellipse(agua.sx,agua.sy,rAgua,rAgua*0.65,0,0,Math.PI*2);
  ctx.fillStyle='#1f5f78';ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.strokeStyle='rgba(255,255,255,.12)';
  ctx.lineWidth=Math.max(1,1.5*camera.scale);
  for(let i=-6;i<6;i++){
    ctx.beginPath();
    ctx.moveTo(agua.sx-rAgua, agua.sy+i*10*camera.scale);
    ctx.lineTo(agua.sx+rAgua, agua.sy+i*10*camera.scale+6*camera.scale);
    ctx.stroke();
  }
  ctx.restore();
}

/** Calles: cuadrícula dentro de cada pueblo + carretera principal entre pueblos */
function dibujarCalles(){
  ctx.save();
  ctx.strokeStyle='rgba(214,209,196,.55)';
  ctx.lineWidth=Math.max(.8,3*camera.scale);
  CIUDADES.forEach(ciudad=>{
    const n=Math.ceil(ciudad.radio/ESPACIO_CALLE);
    for(let g=-n;g<=n;g++){
      const y0=ciudad.cy+g*ESPACIO_CALLE;
      const mediaAncho=Math.sqrt(Math.max(0,ciudad.radio*ciudad.radio-(g*ESPACIO_CALLE)*(g*ESPACIO_CALLE)));
      if(mediaAncho<=0) continue;
      const p1=mundoAPantalla(ciudad.cx-mediaAncho,y0), p2=mundoAPantalla(ciudad.cx+mediaAncho,y0);
      ctx.beginPath();ctx.moveTo(p1.sx,p1.sy);ctx.lineTo(p2.sx,p2.sy);ctx.stroke();
      const x0=ciudad.cx+g*ESPACIO_CALLE;
      const p3=mundoAPantalla(x0,ciudad.cy-mediaAncho), p4=mundoAPantalla(x0,ciudad.cy+mediaAncho);
      ctx.beginPath();ctx.moveTo(p3.sx,p3.sy);ctx.lineTo(p4.sx,p4.sy);ctx.stroke();
    }
  });
  ctx.restore();
}

/** Techos de las casas dentro de cada pueblo, vistos desde arriba */
function dibujarCiudades(){
  casas.forEach(c=>{
    const p=mundoAPantalla(c.x,c.y);
    const w=c.w*camera.scale, h=c.h*camera.scale;
    if(w<1||p.sx<-20||p.sx>W+20||p.sy<-20||p.sy>H+20) return;
    ctx.save();
    ctx.translate(p.sx,p.sy);
    ctx.rotate(c.rot);
    ctx.fillStyle=c.color;
    ctx.fillRect(-w/2,-h/2,w,h);
    ctx.restore();
  });
  if(camera.scale>0.35){
    CIUDADES.forEach(ciudad=>{
      const p=mundoAPantalla(ciudad.cx,ciudad.cy-ciudad.radio*1.15);
      if(p.sx<-50||p.sx>W+50||p.sy<-50||p.sy>H+50) return;
      ctx.font=`600 ${Math.max(9,11*camera.scale)}px 'Cinzel', serif`;
      ctx.fillStyle='rgba(255,255,255,.75)';
      ctx.textAlign='center';
      ctx.fillText(ciudad.nombre.toUpperCase(), p.sx, p.sy);
    });
  }
}

/** La carretera principal: conecta los momentos en orden cronológico,
 *  con estilo de asfalto real (gris con línea central discontinua). */
function dibujarCamino(){
  ctx.save();
  ctx.strokeStyle='#2b2b2b';
  ctx.lineWidth=Math.max(2,7*camera.scale);
  ctx.lineCap='round';
  ctx.beginPath();
  MOMENTOS.forEach((m,i)=>{
    const p=mundoAPantalla(m.x,m.y);
    if(i===0) ctx.moveTo(p.sx,p.sy); else ctx.lineTo(p.sx,p.sy);
  });
  ctx.stroke();

  ctx.strokeStyle='rgba(255,214,90,.85)';
  ctx.lineWidth=Math.max(.6,1.6*camera.scale);
  ctx.setLineDash([Math.max(3,8*camera.scale),Math.max(3,8*camera.scale)]);
  ctx.beginPath();
  MOMENTOS.forEach((m,i)=>{
    const p=mundoAPantalla(m.x,m.y);
    if(i===0) ctx.moveTo(p.sx,p.sy); else ctx.lineTo(p.sx,p.sy);
  });
  ctx.stroke();
  ctx.restore();
}


function dibujarMarcadores(){
  MOMENTOS.forEach((m,i)=>{
    const p=mundoAPantalla(m.x,m.y);
    m.px=p.sx;m.py=p.sy;
    if(p.sx<-60||p.sx>W+60||p.sy<-60||p.sy>H+60){ m.pr=0; return; }

    const bloqueado = estaBloqueado(m);
    const pulso = 0.85+0.15*Math.sin(tiempo*0.04+i);
    const base = (m.especial?13:9) * camera.scale * pulso;
    m.pr = base;

    // Halo
    const halo=ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,base*3.2);
    const colorHalo = bloqueado ? '120,110,95' : (m.especial ? '201,162,39' : '192,89,107');
    halo.addColorStop(0,`rgba(${colorHalo},${m.seleccionado?0.55:(bloqueado?0.18:0.32)})`);
    halo.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=halo;
    ctx.beginPath();ctx.arc(p.sx,p.sy,base*3.2,0,Math.PI*2);ctx.fill();

    // Pin
    ctx.fillStyle = bloqueado ? '#8a8070' : (m.especial ? '#c9a227' : '#c0596b');
    ctx.beginPath();ctx.arc(p.sx,p.sy,Math.max(2,base*0.6),0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#f2e4c4';
    ctx.lineWidth=Math.max(.6,1.4*camera.scale);
    ctx.stroke();

    // Número o candado dentro del pin
    if(base>4){
      ctx.fillStyle='#f2e4c4';
      ctx.font=`600 ${Math.max(8,base*0.7)}px 'Space Grotesk', sans-serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(bloqueado?'🔒':m.id, p.sx, p.sy+base*0.02);
    }

    // Indicador de foto disponible (solo si no está bloqueado)
    if(m.foto && base>3 && !bloqueado){
      ctx.font=`${Math.max(8,base*0.6)}px sans-serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText('📷', p.sx + base*0.75, p.sy - base*0.75);
    }

    // Etiqueta del lugar (solo si hay suficiente zoom, para no saturar)
    if(camera.scale>0.55){
      ctx.font=`italic ${Math.max(10,12*camera.scale)}px 'Cormorant Garamond', serif`;
      ctx.fillStyle='rgba(242,228,196,.9)';
      ctx.textAlign='center';
      ctx.fillText(m.lugar, p.sx, p.sy - base*1.8 - 6);
    }
  });
}

/* ──────────────────────────────────────────────────────
   5) PARTÍCULAS AL SELECCIONAR UN MOMENTO
   ────────────────────────────────────────────────────── */
let particulas=[];
function emitirParticulas(x,y,colorRGB){
  for(let i=0;i<20;i++){
    const ang=Math.random()*Math.PI*2, vel=1+Math.random()*2.2;
    particulas.push({x,y,vx:Math.cos(ang)*vel,vy:Math.sin(ang)*vel,vida:1,colorRGB});
  }
}
function actualizarParticulas(){
  particulas=particulas.filter(p=>p.vida>0.02);
  particulas.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vx*=.95;p.vy*=.95;p.vida*=.93;});
}
function dibujarParticulas(){
  particulas.forEach(p=>{
    ctx.fillStyle=`rgba(${p.colorRGB},${p.vida})`;
    ctx.beginPath();ctx.arc(p.x,p.y,2.2*p.vida+0.6,0,Math.PI*2);ctx.fill();
  });
}

/* ──────────────────────────────────────────────────────
   6) CÁMARA (arrastre con inercia + zoom) — igual filosofía
   que en la galaxia, adaptado a este mapa.
   ────────────────────────────────────────────────────── */
const estado={arrastrando:false,ultimoX:0,ultimoY:0,distanciaMovida:0,pinchInicial:0,pinchEscalaInicial:1};

function actualizarCamara(){
  camera.x += (camera.targetX-camera.x)*0.1;
  camera.y += (camera.targetY-camera.y)*0.1;
  camera.scale += (camera.targetScale-camera.scale)*0.12;
  if(!estado.arrastrando){
    camera.targetX+=camera.vx; camera.targetY+=camera.vy;
    camera.vx*=0.9; camera.vy*=0.9;
  }
}

function distanciaEntreToques(t1,t2){ return Math.hypot(t2.clientX-t1.clientX,t2.clientY-t1.clientY); }

canvas.addEventListener('mousedown',e=>{
  estado.arrastrando=true;estado.distanciaMovida=0;
  estado.ultimoX=e.clientX;estado.ultimoY=e.clientY;
  camera.vx=0;camera.vy=0;
});
window.addEventListener('mousemove',e=>{
  if(!estado.arrastrando) return;
  const dx=e.clientX-estado.ultimoX, dy=e.clientY-estado.ultimoY;
  estado.distanciaMovida+=Math.hypot(dx,dy);
  camera.targetX-=dx/camera.scale; camera.targetY-=dy/camera.scale;
  camera.x-=dx/camera.scale;
  camera.vx=-dx/camera.scale*0.4; camera.vy=-dy/camera.scale*0.4;
  estado.ultimoX=e.clientX; estado.ultimoY=e.clientY;
});
window.addEventListener('mouseup',e=>{
  if(!estado.arrastrando) return;
  estado.arrastrando=false;
  if(estado.distanciaMovida<6) manejarTap(e.clientX,e.clientY);
});
canvas.addEventListener('wheel',e=>{
  e.preventDefault();
  const factor=e.deltaY<0?1.12:0.89;
  camera.targetScale=Math.min(ZOOM_MAX,Math.max(ZOOM_MIN,camera.targetScale*factor));
},{passive:false});
canvas.addEventListener('touchstart',e=>{
  if(e.touches.length===1){
    estado.arrastrando=true;estado.distanciaMovida=0;
    estado.ultimoX=e.touches[0].clientX;estado.ultimoY=e.touches[0].clientY;
    camera.vx=0;camera.vy=0;
  } else if(e.touches.length===2){
    estado.arrastrando=false;
    estado.pinchInicial=distanciaEntreToques(e.touches[0],e.touches[1]);
    estado.pinchEscalaInicial=camera.targetScale;
  }
},{passive:true});
canvas.addEventListener('touchmove',e=>{
  if(e.touches.length===1 && estado.arrastrando){
    const t=e.touches[0];
    const dx=t.clientX-estado.ultimoX, dy=t.clientY-estado.ultimoY;
    estado.distanciaMovida+=Math.hypot(dx,dy);
    camera.targetX-=dx/camera.scale; camera.targetY-=dy/camera.scale;
    camera.x-=dx/camera.scale;
    camera.vx=-dx/camera.scale*0.4; camera.vy=-dy/camera.scale*0.4;
    estado.ultimoX=t.clientX; estado.ultimoY=t.clientY;
  } else if(e.touches.length===2){
    e.preventDefault();
    const dist=distanciaEntreToques(e.touches[0],e.touches[1]);
    const factor=dist/estado.pinchInicial;
    camera.targetScale=Math.min(ZOOM_MAX,Math.max(ZOOM_MIN,estado.pinchEscalaInicial*factor));
  }
},{passive:false});
canvas.addEventListener('touchend',e=>{
  if(e.touches.length===0 && estado.arrastrando){
    estado.arrastrando=false;
    if(estado.distanciaMovida<8) manejarTap(estado.ultimoX,estado.ultimoY);
  }
});

/* ──────────────────────────────────────────────────────
   7) SELECCIÓN DE MOMENTOS Y TARJETA
   ────────────────────────────────────────────────────── */
let indiceActual=0;

function manejarTap(clientX,clientY){
  let mejor=null,mejorDist=Infinity;
  MOMENTOS.forEach((m,i)=>{
    if(!m.pr) return;
    const d=Math.hypot(clientX-m.px,clientY-m.py);
    const radioToque=Math.max(24,m.pr*3.2);
    if(d<radioToque && d<mejorDist){mejor=i;mejorDist=d;}
  });
  if(mejor!==null) seleccionarMomento(mejor);
}

function seleccionarMomento(indice){
  MOMENTOS.forEach(m=>m.seleccionado=false);
  const m=MOMENTOS[indice];
  m.seleccionado=true;
  indiceActual=indice;
  camera.targetX=m.x; camera.targetY=m.y;
  camera.targetScale=Math.min(ZOOM_MAX,Math.max(1.1,camera.scale));
  camera.vx=0;camera.vy=0;
  emitirParticulas(m.px||W/2, m.py||H/2, m.especial?'201,162,39':'192,89,107');
  setTimeout(()=>mostrarTarjeta(m),350);
}

function mostrarTarjeta(m){
  const foto=document.getElementById('cardFoto');
  const bloqueado = estaBloqueado(m);

  if(bloqueado){
    foto.style.display='none'; foto.src='';
    document.getElementById('cardLugar').textContent='🔒 Todavía no';
    document.getElementById('cardFecha').textContent='Se abre el 7 de septiembre de 2026';
    document.getElementById('cardTitulo').textContent='Este recuerdo está esperando su fecha';
    const dias = diasParaAniversario();
    document.getElementById('cardMsg').textContent =
      `Faltan ${dias} día${dias===1?'':'s'} para nuestro primer año. Este mensaje se va a abrir solo, justo ese día. Hasta entonces, sigue guardado con cariño en este mapa.`;
  } else {
    if(m.foto){ foto.src=m.foto; foto.alt=m.titulo; foto.style.display='block'; }
    else{ foto.style.display='none'; foto.src=''; }
    document.getElementById('cardLugar').textContent=m.lugar;
    document.getElementById('cardFecha').textContent=m.fecha;
    document.getElementById('cardTitulo').textContent=m.titulo;
    document.getElementById('cardMsg').textContent=m.msg;
  }
  document.getElementById('card').classList.add('open');
  document.getElementById('card').setAttribute('aria-hidden','false');
}
function cerrarTarjeta(){
  document.getElementById('card').classList.remove('open');
  document.getElementById('card').setAttribute('aria-hidden','true');
  MOMENTOS.forEach(m=>m.seleccionado=false);
}
document.getElementById('cardClose').addEventListener('click',cerrarTarjeta);
document.getElementById('card').addEventListener('click',e=>{ if(e.target.id==='card') cerrarTarjeta(); });
document.getElementById('cardNext').addEventListener('click',()=>{
  seleccionarMomento((indiceActual+1)%MOMENTOS.length);
});
document.getElementById('cardPrev').addEventListener('click',()=>{
  seleccionarMomento((indiceActual-1+MOMENTOS.length)%MOMENTOS.length);
});

/* ──────────────────────────────────────────────────────
   8) BOTONES DEL HUD
   ────────────────────────────────────────────────────── */
document.getElementById('btnHome').addEventListener('click',()=>{
  cerrarTarjeta();
  camera.targetX=130; camera.targetY=-350; camera.targetScale=.55;
});
document.getElementById('btnZoomIn').addEventListener('click',()=>{
  camera.targetScale=Math.min(ZOOM_MAX,camera.targetScale*1.3);
});
document.getElementById('btnZoomOut').addEventListener('click',()=>{
  camera.targetScale=Math.max(ZOOM_MIN,camera.targetScale*0.75);
});
document.getElementById('btnPrimero').addEventListener('click',()=>{ seleccionarMomento(0); });
document.getElementById('btnUltimo').addEventListener('click',()=>{ seleccionarMomento(MOMENTOS.length-1); });
document.getElementById('btnFullscreen').addEventListener('click',()=>{
  if(!document.fullscreenElement){ document.documentElement.requestFullscreen?.().catch(()=>{}); }
  else { document.exitFullscreen?.(); }
});

/* ──────────────────────────────────────────────────────
   9) INTRO
   ────────────────────────────────────────────────────── */
document.getElementById('introBtn').addEventListener('click',()=>{
  document.getElementById('intro').classList.add('hidden');
});
setTimeout(()=>{ document.getElementById('intro').classList.add('hidden'); },9000);

/* ──────────────────────────────────────────────────────
   10) BUCLE PRINCIPAL
   ────────────────────────────────────────────────────── */
function loop(){
  tiempo++;
  actualizarCamara();
  actualizarParticulas();
  dibujarFondo();
  dibujarTerreno();
  dibujarCalles();
  dibujarCiudades();
  dibujarCamino();
  dibujarMarcadores();
  dibujarParticulas();
  requestAnimationFrame(loop);
}

/* ──────────────────────────────────────────────────────
   11) ARRANQUE — se llama al final, ya con todo declarado,
   para evitar el error de orden que tuvimos en la galaxia.
   ────────────────────────────────────────────────────── */
loop();
