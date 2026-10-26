// ══════════════════════════════════════════════════════
// GESTOS TÁCTILES (sensación de app nativa)
//
//  · Deslizar a los lados  → pasa entre las secciones principales
//                            (Inicio · Tiempo · Cartas · Fotos · Juegos).
//  · Deslizar a la derecha → en una sección abierta desde "Más",
//                            vuelve a donde estabas.
//  · Deslizar hacia abajo  → cierra popups y el menú "Más".
//  · Flechas ← → del teclado (en computador) hacen lo mismo que deslizar.
//
// Los gestos NUNCA se activan sobre: canvas (galaxia, jardín, rascar),
// campos de texto, ni a menos de 24px de los bordes de la pantalla
// (para no pelear con el gesto "atrás" del sistema).
// ══════════════════════════════════════════════════════
(function(){
  const PAGINAS = ['portada', 'cuenta', 'carta', 'fotos', 'juegos'];

  // Dónde NO se debe interpretar un deslizamiento como cambio de sección
  const IGNORAR = 'canvas, input, textarea, select, iframe, [contenteditable="true"], [data-no-swipe], .pz-tablero, .st-quien';

  // Popups/menús que se cierran deslizando hacia abajo
  // (no incluye las sorpresas con ceremonia, para no arruinarlas por accidente)
  const CERRABLES = [
    { raiz: '#modalDestellos.open', cerrar: () => document.getElementById('cerrarDestellos').click() },
    { raiz: '#overlayFlores.open',  cerrar: () => document.getElementById('faCerrar').click() },
    { raiz: '#gxPopup.open',        cerrar: () => document.querySelector('#gxPopup .gx-popup-close').click() },
    { raiz: '#jdPopup.open',        cerrar: () => document.querySelector('#jdPopup .jd-popup-close').click() },
    { raiz: '#masDrawer.open',      cerrar: () => cerrarMas() }
  ];

  const CAPAS_ABIERTAS = '.experiencia-overlay.open, #masDrawer.open, #gxPopup.open, #jdPopup.open, ' +
    '#modalDestellos.open, #overlayRegalo11.open, #overlayCumple.open, #overlayPrimerAno.open, #overlayFlores.open';

  let inicio = null;

  function buscarCierre(el){
    for(const c of CERRABLES){
      const raiz = el.closest(c.raiz);
      if(raiz) return { raiz, cerrar: c.cerrar };
    }
    return null;
  }

  // ¿Hay algo scrolleado hacia abajo dentro del popup? Entonces deslizar hacia abajo
  // es para volver a subir el contenido, no para cerrar.
  function hayScrollArriba(el, raiz){
    for(let n = el; n; n = n.parentElement){
      if(n.scrollTop > 0) return true;
      if(n === raiz) break;
    }
    return false;
  }

  // ¿Está dentro de algo que se desplaza horizontalmente?
  function enScrollHorizontal(el){
    for(let n = el; n && n.tagName !== 'SECTION' && n !== document.body; n = n.parentElement){   // solo elementos DENTRO de la sección
      const ox = getComputedStyle(n).overflowX;
      if((ox === 'auto' || ox === 'scroll') && n.scrollWidth > n.clientWidth + 2) return true;
    }
    return false;
  }

  function bienvenidaVisible(){
    const bv = document.getElementById('bienvenida');
    return !!bv && getComputedStyle(bv).display !== 'none';
  }

  function cambiarPorGesto(dir){            // dir: 'izq' (dedo hacia la izquierda) o 'der'
    if(typeof tabActual === 'undefined') return;
    const i = PAGINAS.indexOf(tabActual);
    if(i >= 0){
      const j = dir === 'izq' ? i + 1 : i - 1;
      if(j < 0 || j >= PAGINAS.length) return;          // ya está en un extremo
      irA(PAGINAS[j], dir === 'izq' ? 'swipe-izq' : 'swipe-der');
      return;
    }
    // Sección abierta desde "Más": deslizar a la derecha = volver
    if(dir === 'der'){
      const destino = (typeof seccionAnterior !== 'undefined' && seccionAnterior && seccionAnterior !== tabActual)
        ? seccionAnterior : 'portada';
      irA(destino, 'swipe-der');
    }
  }

  document.addEventListener('touchstart', function(e){
    inicio = null;
    if(e.touches.length !== 1) return;
    const el = e.target;
    if(!(el instanceof Element)) return;
    const t = e.touches[0];
    const base = { x: t.clientX, y: t.clientY, t: e.timeStamp };   // marca del navegador: no se infla si la página va lenta

    // 1) ¿Toca un popup o menú abierto? → posible "deslizar hacia abajo para cerrar"
    const cierre = buscarCierre(el);
    if(cierre){
      if(!hayScrollArriba(el, cierre.raiz)) inicio = Object.assign(base, { modo: 'cerrar', cierre });
      return;
    }

    // 2) ¿Está sobre una sección? → posible cambio de sección
    if(!el.closest('section')) return;
    if(el.closest(IGNORAR)) return;
    if(base.x < 24 || base.x > window.innerWidth - 24) return;
    if(enScrollHorizontal(el)) return;
    inicio = Object.assign(base, { modo: 'seccion' });
  }, { passive: true });

  document.addEventListener('touchend', function(e){
    const i = inicio;
    inicio = null;
    if(!i) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - i.x, dy = t.clientY - i.y, dt = e.timeStamp - i.t;
    if(dt > 800) return;                                  // arrastre lento = no es un gesto

    if(i.modo === 'cerrar'){
      if(dy > 110 && dy > Math.abs(dx) * 1.5) i.cierre.cerrar();
      return;
    }

    if(Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6) return;   // poco movimiento o muy diagonal
    if(String(window.getSelection && window.getSelection()).length > 0) return; // está seleccionando texto
    if(typeof transicionando !== 'undefined' && transicionando) return;
    cambiarPorGesto(dx < 0 ? 'izq' : 'der');
  }, { passive: true });

  document.addEventListener('touchcancel', function(){ inicio = null; }, { passive: true });

  // Teclado (computador): ← → cambian de sección
  document.addEventListener('keydown', function(e){
    if(e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const el = document.activeElement;
    if(el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
    if(el && el.isContentEditable) return;
    if(document.querySelector(CAPAS_ABIERTAS)) return;
    if(bienvenidaVisible()) return;
    if(document.body.classList.contains('bloqueado')) return;   // el candado sigue puesto
    if(typeof transicionando !== 'undefined' && transicionando) return;
    cambiarPorGesto(e.key === 'ArrowRight' ? 'izq' : 'der');
  });

  // ── Pista de gestos: aparece una sola vez, en celular ──
  let timerToast = null;
  function mostrarAviso(texto, ms){
    const toast = document.getElementById('toastGestos');
    if(!toast) return;
    toast.textContent = texto;
    toast.classList.add('visible');
    clearTimeout(timerToast);
    timerToast = setTimeout(function(){ toast.classList.remove('visible'); }, ms || 4200);
  }

  window.mostrarPistaGestos = function(idSeccion){
    if(idSeccion === 'portada' || PAGINAS.indexOf(idSeccion) < 0) return;
    if(!window.matchMedia('(pointer: coarse)').matches) return;     // solo pantallas táctiles
    try{
      if(localStorage.getItem('gestos_pista') === '1') return;
      localStorage.setItem('gestos_pista', '1');
    }catch(_){ return; }
    mostrarAviso('👉 Desliza hacia los lados para cambiar de sección', 4800);
  };
})();
