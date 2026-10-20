// ══════════════════════════════════════════════════════
// TABLERO DE LA PORTADA — datos que cambian solos cada día
//  · Días (y años/meses) juntos
//  · Próximo mesiversario (cada día 7)
//  · Recuerdo del día (rota entre las fotos de la galería)
//  · Mensaje del día (rota entre los mensajes de abajo)
//
// ✏️ Puedes editar libremente los MENSAJES y las FOTOS:
//    cada día se elige uno distinto, en orden, y al llegar
//    al final vuelve a empezar.
// ══════════════════════════════════════════════════════
(function(){
  const INICIO = new Date('2025-09-07T00:00:00');   // mismo inicio que el contador de "Tiempo"
  const DIA_MES = 7;                                 // los mesiversarios son cada día 7

  const MENSAJES = [
    'Hoy me acordé de ti en lo más pequeño, y sonreí solo.',
    'Eres mi lugar favorito, esté donde esté.',
    'Gracias por quedarte en los días buenos y también en los difíciles.',
    'Si hoy fue pesado, recuerda que mañana también estoy aquí.',
    'Contigo hasta lo más sencillo se vuelve especial.',
    'No te lo digo siempre, pero pienso en ti más de lo que imaginas.',
    'Tu risa es mi sonido favorito.',
    'Lo mejor de mi día siempre tiene tu nombre.',
    'Gracias por ser tan tú. Así fue como me enamoré.',
    'Que hoy te trate tan bien como tú me tratas a mí.',
    'Un día más eligiéndote, y lo volvería a hacer.',
    'Eres mi calma y mi aventura al mismo tiempo.',
    'Ojalá pudieras verte como te veo yo.',
    'Cada día contigo es un día que no cambiaría por nada.',
    'Estoy orgulloso de la mujer que eres y de todo lo que construyes.',
    'Abrázate fuerte de mi parte hoy 🤍',
    'Lo nuestro se escribe despacio, y me encanta cada página.',
    'Si el mundo se complica, ven aquí: aquí siempre hay paz.',
    'Te quiero hoy, mañana y todos los días que vengan después.',
    'Gracias por existir en mi vida, mi princesa.',
    'No hay distancia que le gane a lo que siento por ti.'
  ];

  const FOTOS = [
    ['galeria-01','Nuestro primer encuentro 🛍️'],
    ['galeria-02','Noches que no olvidaré 🌙'],
    ['galeria-03','Tu arte me enamoró también 🎨'],
    ['galeria-04','Caras y besitos 💋'],
    ['galeria-05','Tan cerca… siempre 💫'],
    ['galeria-06','Mi beso favorito 🌸'],
    ['galeria-07','Juntos en la noche ✨'],
    ['galeria-08','Esa carita tuya 💕'],
    ['galeria-09','Flores para ti 🌻'],
    ['galeria-10','Brindando por nosotros 🍊'],
    ['galeria-11','Nuestra primera Navidad 🎄']
  ];

  const $b = (id) => document.getElementById(id);
  const plural = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);
  const inicioDeDia = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  // Número de día estable (para rotar mensajes/fotos de a uno por día)
  function indiceDelDia(){
    const hoy = inicioDeDia(new Date());
    return Math.floor((hoy - new Date(2025, 0, 1)) / 86400000);
  }

  // "1 año, 2 meses y 5 días" (con calendario real, no con aproximaciones)
  function tiempoJuntos(ahora){
    let a = ahora.getFullYear() - INICIO.getFullYear();
    let m = ahora.getMonth() - INICIO.getMonth();
    let d = ahora.getDate() - INICIO.getDate();
    if(d < 0){ m--; d += new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate(); }
    if(m < 0){ a--; m += 12; }
    const partes = [];
    if(a > 0) partes.push(plural(a, 'año', 'años'));
    if(m > 0) partes.push(plural(m, 'mes', 'meses'));
    if(d > 0 || partes.length === 0) partes.push(plural(d, 'día', 'días'));
    return partes.length > 1
      ? partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1]
      : partes[0];
  }

  function pintarDias(){
    const ahora = new Date();
    const dias = Math.floor((ahora - INICIO) / 86400000);
    if($b('btDias')) $b('btDias').textContent = dias.toLocaleString('es');
    if($b('btDiasSub')) $b('btDiasSub').textContent = '= ' + tiempoJuntos(ahora) + ' 💛';
  }

  function pintarMesiversario(){
    const hoy = inicioDeDia(new Date());
    let prox = new Date(hoy.getFullYear(), hoy.getMonth(), DIA_MES);
    if(prox < hoy) prox = new Date(hoy.getFullYear(), hoy.getMonth() + 1, DIA_MES);
    const faltan = Math.round((prox - hoy) / 86400000);
    // mes número N desde el 7 de septiembre de 2025
    const nMes = (prox.getFullYear() - 2025) * 12 + (prox.getMonth() - 8);
    const esAniversario = nMes % 12 === 0;
    const nombre = esAniversario ? (nMes / 12 === 1 ? 'primer aniversario' : 'aniversario ' + (nMes / 12)) : 'mes ' + nMes;

    if($b('btMesLbl')) $b('btMesLbl').textContent = esAniversario ? 'Próximo aniversario' : 'Próximo mesiversario';
    if(faltan === 0){
      if($b('btMesNum')) $b('btMesNum').textContent = '¡Hoy!';
      if($b('btMesSub')) $b('btMesSub').textContent = 'Feliz ' + nombre + ' 🎉';
    } else {
      if($b('btMesNum')) $b('btMesNum').textContent = faltan;
      if($b('btMesSub')) $b('btMesSub').textContent = (faltan === 1 ? 'día' : 'días') + ' para el ' + nombre + ' 💛';
    }
  }

  function pintarDelDia(){
    const i = indiceDelDia();
    const msg = $b('btMsg');
    if(msg) msg.textContent = MENSAJES[i % MENSAJES.length];

    const foto = FOTOS[i % FOTOS.length];
    const img = $b('btFotoImg'), cap = $b('btFotoCap');
    if(img){ img.src = 'img/optimizadas/' + foto[0] + '.jpg'; img.alt = foto[1]; }
    if(cap) cap.textContent = foto[1];
  }

  function pintarTodo(){ pintarDias(); pintarMesiversario(); pintarDelDia(); }

  pintarTodo();
  // se actualiza solo si la app queda abierta de un día para otro
  setInterval(pintarTodo, 60 * 1000);
  document.addEventListener('visibilitychange', function(){ if(!document.hidden) pintarTodo(); });
})();
