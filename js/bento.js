// ══════════════════════════════════════════════════════
// TABLERO DE LA PORTADA — datos que cambian solos cada día
//  · Días (y años/meses) juntos
//  · Próximo mesiversario (cada día 7)
//  · Recuerdo del día (rota entre las fotos de la galería)
//  · Mensaje del día (rota entre los mensajes de abajo)
//
// ✏️ Los MENSAJES se editan en el archivo mensajes-del-dia.txt (una línea = un mensaje).
//    Las FOTOS se editan aquí abajo. Cada día se elige una distinta, en orden,
//    y al llegar al final vuelve a empezar.
// ══════════════════════════════════════════════════════
(function(){
  const INICIO = new Date('2025-09-07T00:00:00');   // mismo inicio que el contador de "Tiempo"
  const DIA_MES = 7;                                 // los mesiversarios son cada día 7

  // Los mensajes viven en mensajes-del-dia.txt (un mensaje por línea). Mientras se descargan,
  // o si no se pudieran leer, se muestra este.
  const MENSAJE_RESPALDO = 'Hoy, como siempre, pienso en ti 💛';
  let MENSAJES = [];

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

  // Número de día estable (para rotar mensajes/fotos de a uno por día).
  // Se calcula con la fecha de COLOMBIA, no la del dispositivo: así la tarjeta de la portada
  // y la notificación de la mañana (que se arma en un servidor) siempre eligen el mismo mensaje.
  function indiceDelDia(){
    const hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    const p = hoy.split('-').map(Number);                      // [año, mes, día]
    return Math.floor((Date.UTC(p[0], p[1] - 1, p[2]) - Date.UTC(2025, 0, 1)) / 86400000);
  }

  // Lee mensajes-del-dia.txt: una línea = un mensaje; se ignoran líneas vacías y las que empiezan con #
  function leerMensajes(texto){
    return String(texto).split(/\r?\n/).map(function(l){ return l.trim(); })
      .filter(function(l){ return l && l.charAt(0) !== '#'; });
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

  function pintarMensaje(){
    const msg = $b('btMsg');
    if(!msg) return;
    const n = MENSAJES.length;
    msg.textContent = n ? MENSAJES[((indiceDelDia() % n) + n) % n] : MENSAJE_RESPALDO;
  }

  function cargarMensajes(){
    fetch('mensajes-del-dia.txt', { cache: 'no-cache' })
      .then(function(r){ return r.ok ? r.text() : Promise.reject(r.status); })
      .then(function(texto){
        const lista = leerMensajes(texto);
        if(lista.length){ MENSAJES = lista; pintarMensaje(); }
      })
      .catch(function(e){ console.warn('No se pudo leer mensajes-del-dia.txt:', e); });
  }

  function pintarDelDia(){
    const i = indiceDelDia();
    pintarMensaje();

    const foto = FOTOS[i % FOTOS.length];
    const img = $b('btFotoImg'), cap = $b('btFotoCap');
    if(img){ img.src = 'img/optimizadas/' + foto[0] + '.jpg'; img.alt = foto[1]; }
    if(cap) cap.textContent = foto[1];
  }

  function pintarTodo(){ pintarDias(); pintarMesiversario(); pintarDelDia(); }

  pintarTodo();
  cargarMensajes();
  // se actualiza solo si la app queda abierta de un día para otro
  setInterval(pintarTodo, 60 * 1000);
  document.addEventListener('visibilitychange', function(){ if(!document.hidden) pintarTodo(); });
})();
