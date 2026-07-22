/* ══════════════════════════════════════════════════════
   NUESTRA GALAXIA DEL AMOR — script.js
   Vanilla JavaScript puro. Sin librerías ni frameworks.
   ══════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────
   1) BANCO DE MENSAJES
   365 mensajes únicos, generados a partir de plantillas
   agrupadas por tono + una lista de "rellenos" que se
   combinan entre sí. Así se garantiza variedad real y
   cero repeticiones, sin sonar mecánico: cada plantilla
   fue escrita a mano para sonar natural y humana.
   ────────────────────────────────────────────────────── */
const FILLERS = [
  'tu sonrisa','tus ojos','tu risa','tu voz','tus manos','tu abrazo',
  'tu mirada','tu manera de caminar','la forma en que dices mi nombre',
  'tu manera de ver la vida','tu ternura','tu locura','tu forma de amar',
  'tus ganas de vivir','tu autenticidad'
];

const CATEGORIAS = {
  tierno:[
    'Hoy solo quiero recordarte que pensar en {f} es de lo más bonito que tiene mi vida.',
    'Por más pesado que sea el día, pensar en {f} me hace sonreír solo.',
    'Eres el lugar más seguro que he encontrado, y no hablo de un sitio, hablo de ti.',
    'Contigo aprendí que el amor también se siente en la calma, no solo en la intensidad.',
    'No necesito grandes gestos: me basta con {f} para sentirme en casa.',
    'Si algún día dudas de cuánto te quiero, vuelve a leer esta estrella.',
    'Gracias por hacerme sentir que está bien ser vulnerable contigo.',
    'Contigo hasta los silencios se sienten cómodos, y eso también es amor.',
    'Quiero ser ese lugar cálido al que siempre quieras volver.',
    'Me encanta cuidarte, aunque sea con las cosas más pequeñas.'
  ],
  romantico:[
    'Sin que lo planeara, pensar en {f} se convirtió en mi cosa favorita del mundo.',
    'Quiero escribir contigo una historia que no se parezca a ninguna otra.',
    'Hay algo en ti que hace que hasta lo simple se sienta como una escena de película.',
    'Nunca creí en el amor a primera vista, hasta que lo sentí contigo.',
    'Cada vez que estoy a tu lado entiendo mejor qué significa la palabra "hogar".',
    'Pensar en {f} me recuerda por qué elegirte, una y otra vez, es tan fácil.',
    'Quiero seguir descubriéndote, aunque crea que ya te conozco entera.',
    'Contigo el tiempo se siente distinto: más lento cuando quiero que dure, más rápido cuando no quiero que se acabe.',
    'Pensar en {f} tiene ese poder de desarmarme por completo.',
    'Amarte se siente natural, como si llevara toda la vida practicando para esto.'
  ],
  dulce:[
    'Pensar en {f} es mi postre favorito, aunque no se pueda comer.',
    'Quiero llenarte de detalles pequeños que te recuerden lo mucho que pienso en ti.',
    'Eres de esas personas que endulzan hasta el peor de los días.',
    'Pensar en {f} me da ganas de escribirte cosas cursis a las tres de la mañana.',
    'Contigo todo sabe un poquito mejor, hasta el café más simple.',
    'Quiero seguir sorprendiéndote con cositas chiquitas que digan "pensé en ti".',
    'Me parece tiernísimo pensar en {f}.',
    'Eres mi persona favorita para compartir hasta los silencios más tontos.',
    'Contigo aprendí que el amor también cabe en un mensaje de buenos días.',
    'Pensar en {f} me hace sonreír como bobo cuando nadie me está viendo.'
  ],
  espontaneo:[
    'Se me ocurrió, de la nada, escribirte esto solo para decirte que te quiero.',
    'Pensar en {f} me hizo recordarte justo ahora, sin ningún motivo aparente.',
    'A veces simplemente necesito decirte que eres increíble, sin razón especial.',
    'Estaba haciendo cualquier cosa y de repente pensé: quiero contarle esto a ella.',
    'Acordarme de {f} me tomó por sorpresa hoy, como casi todo lo que haces.',
    'No tengo un motivo elaborado, solo quería recordarte que existes y eso me alegra el día.',
    'Se me fue la tarde pensando en ti, y no me arrepiento ni un poco.',
    'El recuerdo de {f} apareció en mi cabeza de la nada y no pude evitar sonreír.',
    'A veces el amor es solo eso: pensar en alguien sin que nadie te lo pida.',
    'Te escribo esto sin pensarlo mucho, solo porque me nació hacerlo.'
  ],
  divertido:[
    'Pensar en {f} debería estar prohibido, porque no sé cómo concentrarme después.',
    'Contigo hasta las cosas más tontas se vuelven mis recuerdos favoritos.',
    'Eres la única persona con la que puedo hacer el ridículo y sentirme cómodo.',
    'Pensar en {f} me da risa nerviosa cada vez, como si fuera la primera vez.',
    'Contigo aprendí que reírnos de nosotros mismos también es una forma de amor.',
    'Si el amor tuviera un soundtrack, el nuestro tendría muchas risas de fondo.',
    'Pensar en {f} es mi cosa favorita para recordar cuando quiero reírme solo.',
    'Contigo hasta discutir por qué película ver es de mis momentos favoritos.',
    'Eres mi persona favorita para hacer planes ridículos a las 2am.',
    'Pensar en {f} me hace reír incluso cuando se supone que debería estar serio.'
  ],
  coqueto:[
    'Pensar en {f} no es justo, la verdad, porque me deja distraído todo el día.',
    'Sabes exactamente qué hacer para ponerme nervioso, y te encanta.',
    'Cada vez que me miras así, se me olvida lo que iba a decir.',
    'Pensar en {f} tiene un efecto en mí que todavía no logro explicar del todo.',
    'Me encanta cuando coqueteas conmigo como si no supieras el efecto que tienes.',
    'Contigo cerca, se me complica actuar como si no me importaras tanto.',
    'Pensar en {f} es mi debilidad, y creo que ya lo sabes.',
    'Sigues siendo la persona que más me pone nervioso, de la buena manera.',
    'Cada mensaje tuyo se siente como un pequeño juego que amo perder.',
    'Pensar en {f} me hace olvidar completamente lo que estaba haciendo.'
  ],
  apasionado:[
    'Te quiero con esa intensidad que solo se siente una vez en la vida.',
    'Pensar en {f} despierta en mí algo que no sabía que podía sentir tan fuerte.',
    'No te quiero a medias, te quiero con todo lo que tengo.',
    'Contigo el amor no es tibio, es de esos que se sienten en el pecho.',
    'Pensar en {f} me recuerda por qué esto que siento no es cualquier cosa.',
    'Quiero amarte sin medias tintas, sin miedo a que se note cuánto.',
    'Contigo entendí que el amor también puede ser urgente y tranquilo al mismo tiempo.',
    'Pensar en {f} me hace sentir cosas que antes de ti no sabía nombrar.',
    'No hay nada tibio en lo que siento por ti, todo es intenso, todo es real.',
    'Quiero seguir sintiendo esto contigo, con la misma fuerza del primer día.'
  ],
  intenso:[
    'Lo que siento por ti no me cabe en palabras, y eso que llevo intentándolo un rato.',
    'Pensar en {f} me deja horas enteras distraído, como si no hubiera nada más importante.',
    'Contigo entendí que el amor también puede sentirse enorme, casi difícil de cargar.',
    'No sé explicarte cuánto te quiero, solo sé que es demasiado.',
    'Pensar en {f} me recuerda que esto que siento no tiene techo.',
    'Te quiero de una forma que a veces hasta a mí me sorprende.',
    'Contigo el amor se siente enorme, como si no cupiera en un solo pecho.',
    'Pensar en {f} es la prueba de que lo nuestro no es poca cosa.',
    'No quiero un amor tranquilo si no es contigo; prefiero este, el intenso, el real.',
    'Te quiero tanto que a veces me asusta un poco, y aun así no quiero que pare.'
  ],
  atrevido:[
    'Hay cosas de ti que prefiero decirte en persona, con la luz baja y el volumen bajito.',
    'Pensar en {f} tiene un efecto que no pienso confesarte por escrito.',
    'Sabes que hay pensamientos míos sobre ti que guardo solo para nosotros.',
    'Contigo cerca, me cuesta mantener la compostura, y no me molesta admitirlo.',
    'Pensar en {f} me lleva a imaginar cosas que prefiero contarte al oído.',
    'Hay una versión mía que solo tú conoces, y me gusta que sea así.',
    'Contigo aprendí que la elegancia y el deseo pueden convivir perfecto.',
    'Pensar en {f} me hace imaginar cosas que no pienso escribir aquí.',
    'Guardo para ti los pensamientos que no comparto con nadie más.',
    'Contigo el límite entre lo tierno y lo intenso se vuelve deliciosamente difuso.'
  ],
  recuerdos:[
    'Todavía recuerdo la primera vez que te vi, y sigue siendo uno de mis recuerdos favoritos.',
    'Aquella noche que nos quedamos hablando hasta tarde sigue viva en mi memoria.',
    'No olvido la primera vez que me hiciste reír de verdad, sin esfuerzo.',
    'Guardo con cariño cada pequeño momento que hemos construido juntos.',
    'Recuerdo perfecto la primera vez que te tomé de la mano sin pensarlo dos veces.',
    'Hay recuerdos contigo que reviso en mi cabeza cuando necesito sonreír.',
    'Cada recuerdo contigo se siente como una fotografía que no necesito imprimir para no olvidar.',
    'Todavía pienso en esa vez que nos reímos tanto que dolía el estómago.',
    'Guardo con cuidado cada momento pequeño que hemos vivido, aunque parezca insignificante.',
    'No hay recuerdo contigo que no valga la pena repetir.'
  ],
  futuro:[
    'Quiero seguir construyendo un futuro contigo, paso a paso, sin apuro.',
    'Pensar en {f} me hace ilusionarme con todo lo que todavía nos falta por vivir.',
    'Prometo seguir eligiéndote, incluso en los días en que no sea fácil.',
    'Quiero envejecer contigo y seguir sorprendiéndome de lo mucho que te quiero.',
    'Pensar en {f} me recuerda que quiero un futuro donde sigas estando tú.',
    'Prometo seguir aprendiendo a amarte mejor, cada día un poco más.',
    'Quiero que sigamos escribiendo juntos esta historia, sin saltarnos capítulos.',
    'Detenerme a pensar en {f} me llena de ilusión por todo lo bueno que todavía nos espera.',
    'No sé qué nos depare el futuro, pero quiero recorrerlo contigo, sin soltarte.',
    'Prometo estar, aunque el día no sea perfecto, aunque me equivoque a veces.'
  ],
  besos:[
    'Tus besos se sienten como el lugar al que siempre quiero volver.',
    'Pensar en {f} me recuerda por qué un abrazo tuyo lo arregla casi todo.',
    'No hay abrazo que se sienta tan bien como el tuyo, y no es exagerado decirlo.',
    'Quiero coleccionar todos tus besos como si fueran mi tesoro más importante.',
    'Recordar {f} me hace pensar en lo mucho que extraño abrazarte cuando no estás.',
    'Un abrazo tuyo tiene el poder de arreglarme el peor de los días.',
    'Tus besos son de esas cosas que nunca se sienten suficientes.',
    'Pensar en {f} me deja con ganas de abrazarte más fuerte y más seguido.',
    'Quiero seguir aprendiendo cada rincón de tus abrazos.',
    'No hay lugar más cómodo que tus brazos, ya perdí la cuenta de las veces que lo comprobé.'
  ],
  rasgos:[
    'Tu sonrisa tiene el poder de arreglarme el día entero sin que hagas nada más.',
    'Tus ojos dicen cosas que tú a veces prefieres callar, y me encanta descifrarlos.',
    'Podría quedarme viendo tu sonrisa un buen rato sin cansarme jamás.',
    'Hay algo en tu mirada que me desarma cada vez, sin falta.',
    'Tus labios tienen esa forma perfecta que me distrae más de lo que debería admitir.',
    'Amo la forma en que tus ojos se achican un poco cuando ríes de verdad.',
    'Tu sonrisa es, sin duda, mi parte favorita de tu cara, aunque me cueste elegir solo una.',
    'Cuando me miras así, se me olvida completamente lo que estaba diciendo.',
    'Tus labios tienen la culpa de que me distraiga tanto cuando hablas.',
    'Tu sonrisa es de las pocas cosas que sé que siempre me van a gustar.'
  ],
  admiracion:[
    'Admiro muchísimo la fuerza con la que enfrentas los días difíciles.',
    'Pensar en {f} me hace admirarte todavía más de lo que ya lo hacía.',
    'Gracias por dejarme ser parte de tu vida, no lo doy por sentado.',
    'Estoy orgulloso de la persona en la que te has convertido, y de la que sigues siendo cada día.',
    'Pensar en {f} es una de las tantas razones por las que te admiro tanto.',
    'Gracias por acompañarme incluso en mis días menos brillantes.',
    'Me encanta ver lo lejos que llegas cuando te lo propones.',
    'Pensar en {f} me hace sentir muy afortunado de tenerte cerca.',
    'Admiro tu manera de enfrentar la vida, siempre con más valentía de la que crees tener.',
    'Gracias por ser exactamente como eres, sin pedir disculpas por ello.'
  ],
  inspiracion:[
    'Te extraño incluso en los días en que estamos juntos; ya extraño el momento en que te vayas.',
    'Pensar en {f} me hace desear tenerte cerca en este instante.',
    'Me inspiras a ser una mejor versión de mí mismo, sin que tú lo intentes siquiera.',
    'Te extraño de una forma que no siempre sé explicar bien.',
    'Pensar en {f} me recuerda cuánto te quiero, aunque no siempre lo diga en voz alta.',
    'Contigo aprendí que se puede extrañar a alguien incluso estando a su lado.',
    'Me inspira ver cómo enfrentas la vida con tantas ganas.',
    'Pensar en {f} me hace contar los minutos para volver a verte.',
    'Te quiero de esa forma tranquila que no necesita prisa para sentirse real.',
    'Eres, sin que lo sepas, una de mis mayores fuentes de inspiración.'
  ]
};

/** Mezcla determinista (misma semilla = mismo orden siempre, para que
 *  el día 125 sea siempre el mismo mensaje al recargar la página) */
function mezclarDeterminista(arr,semillaInicial){
  let seed=semillaInicial;
  function rnd(){ seed=(seed*9301+49297)%233280; return seed/233280; }
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(rnd()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

/** Construye el arreglo final de 365 mensajes únicos combinando
 *  plantillas de cada categoría con la lista de rellenos. */
function construirMensajes(){
  const pool=[];
  Object.values(CATEGORIAS).forEach(lista=>{
    lista.forEach(plantilla=>{
      if(plantilla.includes('{f}')){
        FILLERS.forEach(f=>pool.push(plantilla.replace('{f}',f)));
      } else {
        pool.push(plantilla);
      }
    });
  });
  const unicos=Array.from(new Set(pool));
  return mezclarDeterminista(unicos,20260209).slice(0,365);
}

const MENSAJES=construirMensajes(); // 365 mensajes únicos, uno por día

/* ──────────────────────────────────────────────────────
   2) CANVAS Y ESTADO GLOBAL
   ────────────────────────────────────────────────────── */
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);

function resize(){
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener('resize', resize);
resize();

/** Cámara: posición del "ojo" en coordenadas de mundo + zoom.
 *  target* son los valores hacia los que se anima suavemente cada frame. */
const camera = {
  x: 0, y: 0, scale: 1,
  targetX: 0, targetY: 0, targetScale: 1,
  vx: 0, vy: 0 // velocidad para la inercia del arrastre
};
const ZOOM_MIN = .12, ZOOM_MAX = 6;

/* ──────────────────────────────────────────────────────
   3) GENERACIÓN DE LA GALAXIA
   ────────────────────────────────────────────────────── */
const N_PRINCIPALES = 365;
const N_DECORATIVAS = 2600;
const BRAZOS = 4;
const RADIO_MAX = 2200;

let estrellasPrincipales = [];
let estrellasDecorativas = [];
let nebulosas = [];

/** Genera la disposición en espiral (como una galaxia real) para las
 *  365 estrellas principales, cada una vinculada a un mensaje. */
function generarEstrellasPrincipales(){
  const estrellas = [];
  for(let i=0;i<N_PRINCIPALES;i++){
    const t = i / N_PRINCIPALES;
    const brazo = i % BRAZOS;
    const giro = t * Math.PI * 6.2; // cuántas vueltas da la espiral
    const angulo = giro + brazo * (Math.PI * 2 / BRAZOS) + (Math.sin(i*12.9898)*0.25);
    const radio = 90 + t * RADIO_MAX;
    const jitter = (Math.sin(i*78.233)*0.5) * 40;
    const x = Math.cos(angulo) * radio + jitter;
    const y = Math.sin(angulo) * radio * 0.55 + jitter * 0.5; // disco achatado
    const z = (Math.sin(i*3.1)+1)/2; // profundidad 0..1 propia de cada estrella
    estrellas.push({
      dia: i+1,
      msg: MENSAJES[i],
      x, y, z,
      radioBase: 3.4 + z*2.2,
      hue: 320 + Math.sin(i*1.7)*40, // rosados/violetas/dorados suaves
      fase: Math.random()*Math.PI*2,
      velFase: 0.015 + Math.random()*0.02,
      seleccionada: false,
      // posición proyectada en pantalla (se actualiza cada frame para hit-test)
      px: 0, py: 0, pr: 0
    });
  }
  return estrellas;
}

/** Genera estrellas decorativas sin mensaje, solo para dar sensación
 *  de inmensidad. Se agrupan en capas de profundidad para el parallax. */
function generarEstrellasDecorativas(){
  const estrellas = [];
  for(let i=0;i<N_DECORATIVAS;i++){
    const angulo = Math.random()*Math.PI*2;
    const radio = Math.pow(Math.random(),0.5) * RADIO_MAX * 1.6;
    const z = Math.random(); // 0 = muy lejana, 1 = muy cercana
    estrellas.push({
      x: Math.cos(angulo)*radio + (Math.random()-.5)*300,
      y: Math.sin(angulo)*radio*0.55 + (Math.random()-.5)*300,
      z,
      r: 0.4 + z*1.1,
      a: 0.25 + Math.random()*0.6,
      fase: Math.random()*Math.PI*2
    });
  }
  return estrellas;
}

/** Un puñado de nebulosas de color, estáticas, para dar atmósfera. */
function generarNebulosas(){
  const colores = ['rgba(125,91,214,.16)','rgba(255,111,174,.12)','rgba(143,214,255,.10)'];
  const nebs = [];
  for(let i=0;i<6;i++){
    nebs.push({
      x:(Math.random()-.5)*RADIO_MAX*2,
      y:(Math.random()-.5)*RADIO_MAX*1.2,
      r: 400+Math.random()*700,
      color: colores[i%colores.length]
    });
  }
  return nebs;
}

estrellasPrincipales = generarEstrellasPrincipales();
estrellasDecorativas = generarEstrellasDecorativas();
nebulosas = generarNebulosas();

/* ──────────────────────────────────────────────────────
   4) PARTÍCULAS DE SELECCIÓN (explosión de luz al tocar una estrella)
   ────────────────────────────────────────────────────── */
let particulas = [];
function emitirParticulas(x,y,hue){
  for(let i=0;i<26;i++){
    const ang = Math.random()*Math.PI*2;
    const vel = 1.2 + Math.random()*2.6;
    particulas.push({
      x, y,
      vx: Math.cos(ang)*vel, vy: Math.sin(ang)*vel,
      vida: 1, hue: hue + (Math.random()-.5)*30
    });
  }
}
function actualizarParticulas(){
  particulas = particulas.filter(p=>p.vida>0.02);
  particulas.forEach(p=>{
    p.x += p.vx; p.y += p.vy;
    p.vx *= 0.96; p.vy *= 0.96;
    p.vida *= 0.94;
  });
}

/* ──────────────────────────────────────────────────────
   5) PROYECCIÓN MUNDO → PANTALLA
   ────────────────────────────────────────────────────── */
/** Convierte coordenadas de mundo a coordenadas de pantalla según la cámara.
 *  `capaZ` permite aplicar parallax: 1 = se mueve igual que la cámara
 *  (estrellas principales), <1 = se mueve menos (fondo lejano). */
function mundoAPantalla(x,y,capaZ=1){
  const dx = (x - camera.x*capaZ);
  const dy = (y - camera.y*capaZ);
  return {
    sx: W/2 + dx*camera.scale,
    sy: H/2 + dy*camera.scale
  };
}

let tiempo = 0;

function dibujarFondo(){
  const grad = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.8);
  grad.addColorStop(0,'#130830');
  grad.addColorStop(1,'#03010a');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,W,H);
}

function dibujarNebulosas(){
  nebulosas.forEach(n=>{
    const capaZ = 0.15; // las nebulosas casi no se mueven: sensación de fondo lejanísimo
    const p = mundoAPantalla(n.x,n.y,capaZ);
    const r = n.r*camera.scale*0.6;
    if(p.sx < -r || p.sx > W+r || p.sy < -r || p.sy > H+r) return;
    const g = ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,r);
    g.addColorStop(0,n.color);
    g.addColorStop(1,'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();ctx.arc(p.sx,p.sy,r,0,Math.PI*2);ctx.fill();
  });
}

function dibujarDecorativas(){
  ctx.save();
  estrellasDecorativas.forEach(s=>{
    // capa de profundidad: mientras más "cercana" (z alto), más rápido se mueve con la cámara
    const capaZ = 0.2 + s.z*0.7;
    const p = mundoAPantalla(s.x,s.y,capaZ);
    if(p.sx < -10 || p.sx > W+10 || p.sy < -10 || p.sy > H+10) return;
    const parpadeo = 0.5 + 0.5*Math.sin(tiempo*0.03 + s.fase);
    ctx.globalAlpha = s.a * parpadeo;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(p.sx,p.sy, Math.max(.4,s.r*Math.min(camera.scale,1.4)), 0, Math.PI*2);
    ctx.fill();
  });
  ctx.restore();
}

function dibujarEstrellasPrincipales(cameraSettling){
  // Ordenamos de más lejana a más cercana para el orden de dibujo correcto
  const orden = [...estrellasPrincipales].sort((a,b)=>a.z-b.z);
  orden.forEach(s=>{
    const p = mundoAPantalla(s.x,s.y,1);
    s.px = p.sx; s.py = p.sy;
    if(p.sx < -40 || p.sx > W+40 || p.sy < -40 || p.sy > H+40){ s.pr=0; return; }

    s.fase += s.velFase;
    const respiracion = 0.75 + 0.25*Math.sin(s.fase);
    const extra = s.seleccionada ? 2.2 : 1;
    const radioPantalla = s.radioBase * camera.scale * respiracion * extra;
    s.pr = radioPantalla;

    // Halo
    const halo = ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,radioPantalla*4.5);
    halo.addColorStop(0, `hsla(${s.hue},85%,80%,${s.seleccionada?0.55:0.32})`);
    halo.addColorStop(1,'transparent');
    ctx.fillStyle = halo;
    ctx.beginPath();ctx.arc(p.sx,p.sy,radioPantalla*4.5,0,Math.PI*2);ctx.fill();

    // Núcleo
    ctx.fillStyle = s.seleccionada ? '#fff' : `hsla(${s.hue},90%,90%,0.95)`;
    ctx.beginPath();ctx.arc(p.sx,p.sy,Math.max(.8,radioPantalla*0.55),0,Math.PI*2);ctx.fill();

    // Pequeñas partículas orbitando la estrella (solo si está razonablemente cerca en pantalla)
    if(radioPantalla > 1.2){
      for(let k=0;k<3;k++){
        const ang = tiempo*0.02 + k*(Math.PI*2/3) + s.fase;
        const orbitR = radioPantalla*2.4;
        const ox = p.sx + Math.cos(ang)*orbitR;
        const oy = p.sy + Math.sin(ang)*orbitR*0.6;
        ctx.fillStyle = `hsla(${s.hue},90%,88%,.5)`;
        ctx.beginPath();ctx.arc(ox,oy,Math.max(.5,radioPantalla*0.12),0,Math.PI*2);ctx.fill();
      }
    }
  });
}

function dibujarParticulas(){
  particulas.forEach(p=>{
    const pr = mundoAPantalla(p.x,p.y,1);
    ctx.fillStyle = `hsla(${p.hue},90%,85%,${p.vida})`;
    ctx.beginPath();ctx.arc(pr.sx,pr.sy,2.4*camera.scale*p.vida+0.6,0,Math.PI*2);ctx.fill();
  });
}

/* ──────────────────────────────────────────────────────
   6) BUCLE PRINCIPAL
   ────────────────────────────────────────────────────── */
function actualizarCamara(){
  // Suavizado hacia el objetivo (fricción tipo "cámara de videojuego")
  camera.x += (camera.targetX - camera.x) * 0.09;
  camera.y += (camera.targetY - camera.y) * 0.09;
  camera.scale += (camera.targetScale - camera.scale) * 0.12;

  // Inercia del arrastre: mientras no se esté arrastrando, la velocidad
  // remanente sigue empujando la cámara y se va frenando poco a poco.
  if(!estado.arrastrando){
    camera.targetX += camera.vx;
    camera.targetY += camera.vy;
    camera.vx *= 0.90;
    camera.vy *= 0.90;
  }
}

function loop(){
  tiempo++;
  actualizarCamara();
  actualizarParticulas();
  dibujarFondo();
  dibujarNebulosas();
  dibujarDecorativas();
  dibujarEstrellasPrincipales();
  dibujarConstelaciones();
  dibujarParticulas();
  requestAnimationFrame(loop);
}

/* ──────────────────────────────────────────────────────
   7) ENTRADA: mouse, touch, rueda, pellizco
   ────────────────────────────────────────────────────── */
const estado = {
  arrastrando:false,
  ultimoX:0, ultimoY:0,
  distanciaMovida:0,
  pinchInicial:0,
  pinchEscalaInicial:1
};

function distanciaEntreToques(t1,t2){
  return Math.hypot(t2.clientX-t1.clientX, t2.clientY-t1.clientY);
}

canvas.addEventListener('mousedown',e=>{
  estado.arrastrando=true; estado.distanciaMovida=0;
  estado.ultimoX=e.clientX; estado.ultimoY=e.clientY;
  camera.vx=0; camera.vy=0;
});
window.addEventListener('mousemove',e=>{
  if(!estado.arrastrando) return;
  const dx=e.clientX-estado.ultimoX, dy=e.clientY-estado.ultimoY;
  estado.distanciaMovida += Math.hypot(dx,dy);
  camera.targetX -= dx/camera.scale;
  camera.targetY -= dy/camera.scale;
  camera.x -= dx/camera.scale; // mover también la posición real para que se sienta 1:1 con el dedo/mouse
  camera.vx = -dx/camera.scale*0.4;
  camera.vy = -dy/camera.scale*0.4;
  estado.ultimoX=e.clientX; estado.ultimoY=e.clientY;
});
window.addEventListener('mouseup',e=>{
  if(!estado.arrastrando) return;
  estado.arrastrando=false;
  if(estado.distanciaMovida < 6){ // fue un tap, no un arrastre
    manejarTap(e.clientX,e.clientY);
  }
});

canvas.addEventListener('wheel',e=>{
  e.preventDefault();
  const factor = e.deltaY < 0 ? 1.12 : 0.89;
  camera.targetScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, camera.targetScale*factor));
},{passive:false});

canvas.addEventListener('touchstart',e=>{
  if(e.touches.length===1){
    estado.arrastrando=true; estado.distanciaMovida=0;
    estado.ultimoX=e.touches[0].clientX; estado.ultimoY=e.touches[0].clientY;
    camera.vx=0; camera.vy=0;
  } else if(e.touches.length===2){
    estado.arrastrando=false;
    estado.pinchInicial = distanciaEntreToques(e.touches[0],e.touches[1]);
    estado.pinchEscalaInicial = camera.targetScale;
  }
},{passive:true});

canvas.addEventListener('touchmove',e=>{
  if(e.touches.length===1 && estado.arrastrando){
    const t=e.touches[0];
    const dx=t.clientX-estado.ultimoX, dy=t.clientY-estado.ultimoY;
    estado.distanciaMovida += Math.hypot(dx,dy);
    camera.targetX -= dx/camera.scale;
    camera.targetY -= dy/camera.scale;
    camera.x -= dx/camera.scale;
    camera.vx = -dx/camera.scale*0.4;
    camera.vy = -dy/camera.scale*0.4;
    estado.ultimoX=t.clientX; estado.ultimoY=t.clientY;
  } else if(e.touches.length===2){
    e.preventDefault();
    const dist = distanciaEntreToques(e.touches[0],e.touches[1]);
    const factor = dist/estado.pinchInicial;
    camera.targetScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, estado.pinchEscalaInicial*factor));
  }
},{passive:false});

canvas.addEventListener('touchend',e=>{
  if(e.touches.length===0 && estado.arrastrando){
    estado.arrastrando=false;
    if(estado.distanciaMovida < 8){
      manejarTap(estado.ultimoX,estado.ultimoY);
    }
  }
});

/* ──────────────────────────────────────────────────────
   8) SELECCIÓN DE ESTRELLAS Y TARJETA DE MENSAJE
   ────────────────────────────────────────────────────── */
let indiceActual = 0; // índice de la última estrella seleccionada (para Siguiente/Anterior)

function manejarTap(clientX,clientY){
  // Buscamos la estrella principal más cercana al punto tocado, con radio
  // de toque generoso para que sea fácil acertar incluso en celular.
  let mejor=null, mejorDist=Infinity;
  estrellasPrincipales.forEach((s,i)=>{
    if(s.pr<=0) return;
    const d = Math.hypot(clientX-s.px, clientY-s.py);
    const radioToque = Math.max(22, s.pr*3);
    if(d<radioToque && d<mejorDist){ mejor=i; mejorDist=d; }
  });
  if(mejor===null) return;
  if(modoConstelacion){ agregarPuntoConstelacion(mejor); }
  else { seleccionarEstrella(mejor); }
}

function seleccionarEstrella(indice){
  estrellasPrincipales.forEach(s=>s.seleccionada=false);
  const s = estrellasPrincipales[indice];
  s.seleccionada = true;
  indiceActual = indice;

  // La cámara se acerca suavemente a la estrella elegida
  camera.targetX = s.x;
  camera.targetY = s.y;
  camera.targetScale = Math.min(ZOOM_MAX, Math.max(2.2, camera.scale));
  camera.vx = 0; camera.vy = 0;

  emitirParticulas(s.px||W/2, s.py||H/2, s.hue);

  setTimeout(()=>mostrarTarjeta(s), 380);
}

function mostrarTarjeta(s){
  document.getElementById('cardDay').textContent = 'Día ' + s.dia;
  document.getElementById('cardMsg').textContent = s.msg;
  document.getElementById('card').classList.add('open');
  document.getElementById('card').setAttribute('aria-hidden','false');
}

function cerrarTarjeta(){
  document.getElementById('card').classList.remove('open');
  document.getElementById('card').setAttribute('aria-hidden','true');
  estrellasPrincipales.forEach(s=>s.seleccionada=false);
}

/* ──────────────────────────────────────────────────────
   9) BOTONES DEL HUD
   ────────────────────────────────────────────────────── */
document.getElementById('cardClose').addEventListener('click', cerrarTarjeta);
document.getElementById('cardNext').addEventListener('click', ()=>{
  seleccionarEstrella((indiceActual+1) % estrellasPrincipales.length);
});
document.getElementById('cardPrev').addEventListener('click', ()=>{
  seleccionarEstrella((indiceActual-1+estrellasPrincipales.length) % estrellasPrincipales.length);
});

document.getElementById('btnHome').addEventListener('click', ()=>{
  cerrarTarjeta();
  camera.targetX = 0; camera.targetY = 0; camera.targetScale = 1;
});
document.getElementById('btnCenter').addEventListener('click', ()=>{
  camera.targetX = 0; camera.targetY = 0;
});
document.getElementById('btnZoomIn').addEventListener('click', ()=>{
  camera.targetScale = Math.min(ZOOM_MAX, camera.targetScale*1.35);
});
document.getElementById('btnZoomOut').addEventListener('click', ()=>{
  camera.targetScale = Math.max(ZOOM_MIN, camera.targetScale*0.72);
});
document.getElementById('btnRandom').addEventListener('click', ()=>{
  seleccionarEstrella(Math.floor(Math.random()*estrellasPrincipales.length));
});
document.getElementById('btnFullscreen').addEventListener('click', ()=>{
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen?.().catch(()=>{});
  } else {
    document.exitFullscreen?.();
  }
});

/* Cerrar la tarjeta tocando fuera de ella */
document.getElementById('card').addEventListener('click',e=>{
  if(e.target.id==='card') cerrarTarjeta();
});

/* ──────────────────────────────────────────────────────
   10) MÚSICA AMBIENTAL (generativa, con Web Audio API)
   No se incluye ningún archivo externo: se sintetiza un pad
   suave e instrumental directamente en el navegador.
   ────────────────────────────────────────────────────── */
let audioCtx=null, nodosMusica=[], musicaActiva=false;

function crearPadSuave(){
  audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
  const maestro = audioCtx.createGain();
  maestro.gain.value = 0;
  maestro.connect(audioCtx.destination);
  // Un acorde suave y abierto (tipo add9), con osciladores muy suaves
  const frecuencias = [130.81,164.81,196.00,246.94,329.63]; // C3,E3,G3,B3,E4 aprox
  frecuencias.forEach((freq,i)=>{
    const osc = audioCtx.createOscillator();
    osc.type='sine';
    osc.frequency.value=freq;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.05 - i*0.006;
    // Un leve vibrato/respiración para que no suene estático
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.06 + i*0.015;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(maestro);
    osc.start(); lfo.start();
    nodosMusica.push(osc,lfo);
  });
  // Suave fade-in
  maestro.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime+2.5);
  nodosMusica.push(maestro);
  return maestro;
}

let ganMaestro=null;
function toggleMusica(){
  const btn=document.getElementById('btnMusic');
  if(!musicaActiva){
    try{
      ganMaestro = crearPadSuave();
      musicaActiva=true;
      btn.classList.add('active');
    }catch(err){ /* Web Audio no disponible: fallamos en silencio */ }
  } else {
    if(ganMaestro){
      ganMaestro.gain.linearRampToValueAtTime(0, (audioCtx?.currentTime||0)+1);
      setTimeout(()=>{
        nodosMusica.forEach(n=>{ try{n.stop&&n.stop();}catch(e){} });
        nodosMusica=[];
      },1100);
    }
    musicaActiva=false;
    btn.classList.remove('active');
  }
}
document.getElementById('btnMusic').addEventListener('click', toggleMusica);

/* ──────────────────────────────────────────────────────
   11) INTRO
   ────────────────────────────────────────────────────── */
document.getElementById('introBtn').addEventListener('click', ()=>{
  document.getElementById('intro').classList.add('hidden');
});
// Si no interactúa, la intro se retira sola después de un momento
setTimeout(()=>{
  document.getElementById('intro').classList.add('hidden');
}, 9000);

/* ──────────────────────────────────────────────────────
   12) ARRANQUE
   ────────────────────────────────────────────────────── */
loop();

/* ──────────────────────────────────────────────────────
   13) MODO CONSTELACIÓN PERSONALIZADA
   Permite tocar estrellas en orden para dibujar una figura
   propia y guardarla con un nombre (se guarda en este
   navegador con localStorage, para volver a verla después).
   ────────────────────────────────────────────────────── */
const LS_KEY = 'nuestra_galaxia_constelaciones';
let modoConstelacion = false;
let puntosConstelacion = []; // índices (en estrellasPrincipales) elegidos en orden
let constelacionVisible = null; // {nombre, dias:[...]} que se está mostrando, o null

function cargarConstelacionesGuardadas(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(err){ return []; }
}
function guardarConstelacionesEnStorage(lista){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(lista)); }
  catch(err){ /* almacenamiento no disponible: no rompemos la experiencia */ }
}

function indicePorDia(dia){
  return estrellasPrincipales.findIndex(s=>s.dia===dia);
}

/** Dibuja las líneas de la constelación en construcción (modo activo)
 *  y la constelación guardada que se esté visualizando, si hay una. */
function dibujarConstelaciones(){
  // En construcción (mientras el modo está activo)
  if(puntosConstelacion.length>1){
    ctx.save();
    ctx.strokeStyle = 'rgba(255,217,138,.85)';
    ctx.lineWidth = Math.max(1, 1.6*camera.scale);
    ctx.shadowColor = 'rgba(255,217,138,.6)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    puntosConstelacion.forEach((idx,i)=>{
      const s = estrellasPrincipales[idx];
      const p = mundoAPantalla(s.x,s.y,1);
      if(i===0) ctx.moveTo(p.sx,p.sy); else ctx.lineTo(p.sx,p.sy);
    });
    ctx.stroke();
    ctx.restore();
  }
  // Constelación guardada que se está viendo
  if(constelacionVisible){
    const indices = constelacionVisible.dias.map(indicePorDia).filter(i=>i>=0);
    if(indices.length>1){
      ctx.save();
      ctx.strokeStyle = 'rgba(255,150,180,.85)';
      ctx.lineWidth = Math.max(1, 1.6*camera.scale);
      ctx.shadowColor = 'rgba(255,150,180,.55)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      indices.forEach((idx,i)=>{
        const s = estrellasPrincipales[idx];
        const p = mundoAPantalla(s.x,s.y,1);
        if(i===0) ctx.moveTo(p.sx,p.sy); else ctx.lineTo(p.sx,p.sy);
      });
      ctx.stroke();
      // Etiqueta con el nombre, centrada en el punto medio de la figura
      const medio = indices[Math.floor(indices.length/2)];
      const sMedio = estrellasPrincipales[medio];
      const pMedio = mundoAPantalla(sMedio.x, sMedio.y - 40/camera.scale, 1);
      ctx.font = `italic ${Math.max(12,14*camera.scale)}px 'Cormorant Garamond', serif`;
      ctx.fillStyle = 'rgba(255,180,205,.95)';
      ctx.textAlign = 'center';
      ctx.fillText(constelacionVisible.nombre, pMedio.sx, pMedio.sy);
      ctx.restore();
    }
  }
}

function agregarPuntoConstelacion(indice){
  // Evita agregar la misma estrella dos veces seguidas
  if(puntosConstelacion[puntosConstelacion.length-1]===indice) return;
  puntosConstelacion.push(indice);
  emitirParticulas(estrellasPrincipales[indice].px, estrellasPrincipales[indice].py, 45);
}

function actualizarBarraConstelacion(){
  document.getElementById('barraConstelacion').classList.toggle('activa', modoConstelacion);
  document.getElementById('btnConstelacion').classList.toggle('active', modoConstelacion);
}

document.getElementById('btnConstelacion').addEventListener('click', ()=>{
  modoConstelacion = !modoConstelacion;
  if(modoConstelacion){
    constelacionVisible = null; // si estaba viendo una guardada, la ocultamos al empezar a dibujar
    cerrarTarjeta();
  } else {
    puntosConstelacion = [];
  }
  actualizarBarraConstelacion();
});

document.getElementById('bcDeshacer').addEventListener('click', ()=>{
  puntosConstelacion.pop();
});
document.getElementById('bcBorrar').addEventListener('click', ()=>{
  puntosConstelacion = [];
});
document.getElementById('bcSalir').addEventListener('click', ()=>{
  modoConstelacion = false;
  puntosConstelacion = [];
  actualizarBarraConstelacion();
});

/* ── Guardar constelación ── */
document.getElementById('bcGuardar').addEventListener('click', ()=>{
  if(puntosConstelacion.length<2) return; // necesita al menos 2 puntos para ser una figura
  document.getElementById('modalGuardar').classList.add('open');document.getElementById('modalGuardar').setAttribute('aria-hidden','false');
  document.getElementById('nombreConstelacion').value='';
  setTimeout(()=>document.getElementById('nombreConstelacion').focus(),300);
});
document.getElementById('cerrarModalGuardar').addEventListener('click', ()=>{
  document.getElementById('modalGuardar').classList.remove('open');document.getElementById('modalGuardar').setAttribute('aria-hidden','true');
});
document.getElementById('confirmarGuardar').addEventListener('click', ()=>{
  const nombre = document.getElementById('nombreConstelacion').value.trim() || 'Sin nombre';
  const lista = cargarConstelacionesGuardadas();
  lista.push({ nombre, dias: puntosConstelacion.map(i=>estrellasPrincipales[i].dia) });
  guardarConstelacionesEnStorage(lista);
  document.getElementById('modalGuardar').classList.remove('open');document.getElementById('modalGuardar').setAttribute('aria-hidden','true');
  modoConstelacion = false;
  puntosConstelacion = [];
  actualizarBarraConstelacion();
});

/* ── Ver / borrar constelaciones guardadas ── */
function renderizarListaConstelaciones(){
  const cont = document.getElementById('listaConstelaciones');
  const lista = cargarConstelacionesGuardadas();
  cont.innerHTML = '';
  if(lista.length===0){
    cont.innerHTML = '<p class="lc-vacio">Todavía no has guardado ninguna constelación.</p>';
    return;
  }
  lista.forEach((c,i)=>{
    const fila = document.createElement('div');
    fila.className = 'lc-item';
    fila.innerHTML = `<span class="lc-nombre">${c.nombre}</span>
      <span class="lc-acciones">
        <button class="lc-ver" data-ver="${i}">Ver ✨</button>
        <button class="lc-borrar" data-borrar="${i}">🗑</button>
      </span>`;
    cont.appendChild(fila);
  });
  cont.querySelectorAll('[data-ver]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const c = cargarConstelacionesGuardadas()[Number(btn.dataset.ver)];
      verConstelacionGuardada(c);
    });
  });
  cont.querySelectorAll('[data-borrar]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = Number(btn.dataset.borrar);
      const lista2 = cargarConstelacionesGuardadas();
      lista2.splice(idx,1);
      guardarConstelacionesEnStorage(lista2);
      renderizarListaConstelaciones();
    });
  });
}

function verConstelacionGuardada(c){
  constelacionVisible = c;
  document.getElementById('modalLista').classList.remove('open');document.getElementById('modalLista').setAttribute('aria-hidden','true');
  // Centramos la cámara para que la figura completa quepa en pantalla
  const indices = c.dias.map(indicePorDia).filter(i=>i>=0);
  if(indices.length){
    const xs = indices.map(i=>estrellasPrincipales[i].x);
    const ys = indices.map(i=>estrellasPrincipales[i].y);
    const cx = (Math.min(...xs)+Math.max(...xs))/2;
    const cy = (Math.min(...ys)+Math.max(...ys))/2;
    const ancho = Math.max(...xs)-Math.min(...xs) || 200;
    const alto = Math.max(...ys)-Math.min(...ys) || 200;
    camera.targetX = cx; camera.targetY = cy;
    camera.targetScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.min(W/(ancho+300), H/(alto+300))));
  }
}

document.getElementById('btnMisConstelaciones').addEventListener('click', ()=>{
  renderizarListaConstelaciones();
  document.getElementById('modalLista').classList.add('open');document.getElementById('modalLista').setAttribute('aria-hidden','false');
});
document.getElementById('cerrarModalLista').addEventListener('click', ()=>{
  document.getElementById('modalLista').classList.remove('open');document.getElementById('modalLista').setAttribute('aria-hidden','true');
});
