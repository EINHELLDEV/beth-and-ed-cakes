/* =========================================================
   Beth & Ed Cake's — interacciones del sitio
   Sin dependencias externas.
   ========================================================= */

(function () {
  'use strict';

  var WHATSAPP = '584123650270';
  var CORREO = 'bethandedcakes@gmail.com';
  var NAVEGADOR_REDUCIDO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* Red de seguridad: si algo falla, el contenido se muestra igual de una vez
     en lugar de quedarse invisible por la animación de entrada. */
  window.addEventListener('error', function () {
    document.documentElement.classList.remove('js');
  });

  /* ---------------------------------------------------------
     1. Encabezado: sombra al hacer scroll
     --------------------------------------------------------- */
  var encabezado = $('#encabezado');

  function sombraEncabezado() {
    if (!encabezado) return;
    encabezado.classList.toggle('con-sombra', window.scrollY > 8);
  }
  window.addEventListener('scroll', sombraEncabezado, { passive: true });
  sombraEncabezado();

  /* ---------------------------------------------------------
     2. Menú móvil
     --------------------------------------------------------- */
  var botonMenu = $('#boton-menu');
  var menuMovil = $('#menu-movil');
  var iconoMenu = $('#icono-menu');
  var iconoCerrar = $('#icono-cerrar');

  function abrirMenu(abrir) {
    if (!botonMenu || !menuMovil) return;
    menuMovil.hidden = !abrir;
    botonMenu.setAttribute('aria-expanded', String(abrir));
    botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    iconoMenu.classList.toggle('hidden', abrir);
    iconoCerrar.classList.toggle('hidden', !abrir);
  }

  if (botonMenu && menuMovil) {
    botonMenu.addEventListener('click', function () {
      abrirMenu(botonMenu.getAttribute('aria-expanded') !== 'true');
    });

    $$('#menu-movil a').forEach(function (enlace) {
      enlace.addEventListener('click', function () { abrirMenu(false); });
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && botonMenu.getAttribute('aria-expanded') === 'true') {
        abrirMenu(false);
        botonMenu.focus();
      }
    });

    document.addEventListener('click', function (evento) {
      if (botonMenu.getAttribute('aria-expanded') !== 'true') return;
      if (!menuMovil.contains(evento.target) && !botonMenu.contains(evento.target)) {
        abrirMenu(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) abrirMenu(false);
    });
  }

  /* ---------------------------------------------------------
     3. Sección activa en el menú
     --------------------------------------------------------- */
  var enlacesNav = $$('.enlace-nav, .enlace-nav-movil');
  var secciones = ['inicio', 'tortas', 'testimonios', 'contacto']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function marcarActivo(id) {
    enlacesNav.forEach(function (enlace) {
      // Los enlaces de escritorio usan data-seccion; los móviles, el href
      var activo = enlace.getAttribute('data-seccion') === id ||
        (enlace.getAttribute('href') || '').indexOf('#' + id) !== -1;
      enlace.classList.toggle('activo', activo);
    });
  }

  if (secciones.length && 'IntersectionObserver' in window) {
    var observadorSecciones = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) marcarActivo(entrada.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    secciones.forEach(function (seccion) { observadorSecciones.observe(seccion); });
  }

  /* ---------------------------------------------------------
     4. Animación de entrada al hacer scroll
     --------------------------------------------------------- */
  var animables = $$('.reveal');

  if (animables.length) {
    if (!('IntersectionObserver' in window) || NAVEGADOR_REDUCIDO) {
      animables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observadorRevelado = new IntersectionObserver(function (entradas, observador) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('is-visible');
            observador.unobserve(entrada.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      animables.forEach(function (el) { observadorRevelado.observe(el); });
    }
  }

  /* Todo lo anterior quedó montado: si un error ocurre más abajo, la página
     sigue siendo utilizable y el temporizador del <head> no oculta el contenido. */
  window.revealListo = true;

  /* ---------------------------------------------------------
     5. Filtros de la pasarela
     --------------------------------------------------------- */
  var botonesFiltro = $$('.chip');
  var productos = $$('#galeria-tortas > li');
  var galeriaVacia = $('#galeria-vacia');

  botonesFiltro.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var filtro = boton.getAttribute('data-filtro');
      var visibles = 0;

      botonesFiltro.forEach(function (otro) {
        var activo = otro === boton;
        otro.classList.toggle('chip-activo', activo);
        otro.setAttribute('aria-pressed', String(activo));
      });

      productos.forEach(function (producto) {
        var coincide = filtro === 'todos' || producto.getAttribute('data-categoria') === filtro;
        producto.classList.toggle('oculto-filtro', !coincide);
        if (coincide) visibles++;
      });

      if (galeriaVacia) galeriaVacia.classList.toggle('hidden', visibles > 0);
    });
  });

  /* ---------------------------------------------------------
     6. Vista ampliada (lightbox) de la pasarela
     --------------------------------------------------------- */
  var lupa = $('#lupa');
  var lupaImagen = $('#lupa-imagen');
  var lupaTitulo = $('#lupa-titulo');
  var lupaDetalle = $('#lupa-detalle');
  var elementoPrevio = null;

  function abrirLupa(boton) {
    if (!lupa) return;
    elementoPrevio = document.activeElement;
    lupaImagen.src = boton.getAttribute('data-lupa');
    lupaImagen.alt = boton.getAttribute('data-alt') || '';
    lupaTitulo.textContent = boton.getAttribute('data-nombre') || '';
    lupaDetalle.textContent = boton.getAttribute('data-detalle') || '';
    lupa.hidden = false;
    document.body.style.overflow = 'hidden';
    var cerrar = $('[data-cerrar-lupa].lupa-cerrar');
    if (cerrar) cerrar.focus();
  }

  function cerrarLupa() {
    if (!lupa || lupa.hidden) return;
    lupa.hidden = true;
    lupaImagen.removeAttribute('src');
    document.body.style.overflow = '';
    if (elementoPrevio && typeof elementoPrevio.focus === 'function') elementoPrevio.focus();
  }

  $$('[data-lupa]').forEach(function (boton) {
    boton.addEventListener('click', function () { abrirLupa(boton); });
  });

  $$('[data-cerrar-lupa]').forEach(function (elemento) {
    elemento.addEventListener('click', cerrarLupa);
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') cerrarLupa();
    // Mantiene el foco dentro del diálogo mientras está abierto
    if (evento.key === 'Tab' && lupa && !lupa.hidden) {
      var cerrables = $$('a[href], button:not([disabled])', lupa);
      if (!cerrables.length) return;
      var primero = cerrables[0];
      var ultimo = cerrables[cerrables.length - 1];
      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    }
  });

  /* ---------------------------------------------------------
     7. Carrusel de testimonios
     --------------------------------------------------------- */
  var pista = $('#pista-testimonios');
  var puntosContenedor = $('#puntos-testimonios');
  var botonAnterior = $('#testimonio-anterior');
  var botonSiguiente = $('#testimonio-siguiente');
  var tarjetas = pista ? $$(':scope > li', pista) : [];

  function anchoSalto() {
    if (!tarjetas.length) return 300;
    var primera = tarjetas[0];
    var ancho = primera.getBoundingClientRect().width;
    var estilo = window.getComputedStyle(pista);
    var separacion = parseFloat(estilo.columnGap || estilo.gap || '0') || 0;
    return ancho + separacion;
  }

  function crearPuntos() {
    if (!puntosContenedor) return;
    puntosContenedor.innerHTML = '';
    tarjetas.forEach(function (tarjeta, indice) {
      var punto = document.createElement('button');
      punto.type = 'button';
      punto.className = 'punto-testimonio' + (indice === 0 ? ' activo' : '');
      punto.setAttribute('aria-label', 'Ver testimonio ' + (indice + 1));
      punto.addEventListener('click', function () {
        tarjeta.scrollIntoView({ behavior: NAVEGADOR_REDUCIDO ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
      });
      puntosContenedor.appendChild(punto);
    });
  }

  function indiceActual() {
    if (!pista || !tarjetas.length) return 0;
    // Todo se mide respecto a la pista, no a la página
    var rectPista = pista.getBoundingClientRect();
    var centroPista = pista.clientWidth / 2;
    var mejor = 0;
    var mejorDistancia = Infinity;
    tarjetas.forEach(function (tarjeta, indice) {
      var rect = tarjeta.getBoundingClientRect();
      var centroTarjeta = (rect.left - rectPista.left) + rect.width / 2;
      var distancia = Math.abs(centroTarjeta - centroPista);
      if (distancia < mejorDistancia) {
        mejorDistancia = distancia;
        mejor = indice;
      }
    });
    return mejor;
  }

  function marcarPunto(indice) {
    if (!puntosContenedor) return;
    $$('.punto-testimonio', puntosContenedor).forEach(function (punto, i) {
      punto.classList.toggle('activo', i === indice);
    });
  }

  function moverTestimonios(paso) {
    if (!pista) return;
    pista.scrollBy({ left: paso * anchoSalto(), behavior: NAVEGADOR_REDUCIDO ? 'auto' : 'smooth' });
  }

  if (pista) {
    crearPuntos();

    if (botonAnterior) botonAnterior.addEventListener('click', function () { moverTestimonios(-1); });
    if (botonSiguiente) botonSiguiente.addEventListener('click', function () { moverTestimonios(1); });

    var temporizadorPuntos;
    pista.addEventListener('scroll', function () {
      clearTimeout(temporizadorPuntos);
      temporizadorPuntos = setTimeout(function () { marcarPunto(indiceActual()); }, 80);
    });

    window.addEventListener('resize', function () { marcarPunto(indiceActual()); });
  }

  /* ---------------------------------------------------------
     8. Formulario de pedido -> WhatsApp
     --------------------------------------------------------- */
  var formulario = $('#formulario-pedido');
  var campoFecha = $('#fecha');

  if (campoFecha) {
    var hoy = new Date();
    var mes = String(hoy.getMonth() + 1).padStart(2, '0');
    var dia = String(hoy.getDate()).padStart(2, '0');
    campoFecha.min = hoy.getFullYear() + '-' + mes + '-' + dia;
  }

  function mostrarError(campo, mensaje, idError) {
    var entrada = $('#' + campo);
    var error = $('#' + idError);
    if (entrada) entrada.setAttribute('aria-invalid', 'true');
    if (error) {
      error.textContent = mensaje;
      error.hidden = false;
    }
  }

  function limpiarErrores() {
    $$('.error-campo').forEach(function (error) { error.hidden = true; });
    $$('.campo input, .campo select').forEach(function (entrada) { entrada.removeAttribute('aria-invalid'); });
  }

  function valorCampo(id) {
    var campo = $('#' + id);
    return campo ? campo.value.trim() : '';
  }

  function formatoFecha(iso) {
    var partes = iso.split('-');
    if (partes.length !== 3) return iso;
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  function fechaEnElPasado(iso) {
    // Ambas fechas están en formato AAAA-MM-DD, así que comparan como texto
    return !!(campoFecha && campoFecha.min && iso && iso < campoFecha.min);
  }

  if (formulario) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      limpiarErrores();

      var nombre = valorCampo('nombre');
      var telefono = valorCampo('telefono');
      var fecha = valorCampo('fecha');
      var tipo = valorCampo('tipo');
      var mensaje = valorCampo('mensaje');
      var primeroInvalido = null;

      if (!nombre) {
        mostrarError('nombre', 'Escribe tu nombre.', 'error-nombre');
        primeroInvalido = primeroInvalido || $('#nombre');
      }
      if (!fecha) {
        mostrarError('fecha', 'Elige la fecha en que lo necesitas.', 'error-fecha');
        primeroInvalido = primeroInvalido || $('#fecha');
      } else if (fechaEnElPasado(fecha)) {
        mostrarError('fecha', 'Elige una fecha a partir de hoy.', 'error-fecha');
        primeroInvalido = primeroInvalido || $('#fecha');
      }
      if (!tipo) {
        mostrarError('tipo', 'Elige un tipo de postre.', 'error-tipo');
        primeroInvalido = primeroInvalido || $('#tipo');
      }

      if (primeroInvalido) {
        primeroInvalido.focus();
        return;
      }

      var lineas = [
        "Hola Beth & Ed Cake's, quiero hacer un pedido.",
        '',
        'Nombre: ' + nombre
      ];
      if (telefono) lineas.push('Teléfono: ' + telefono);
      lineas.push('Fecha: ' + formatoFecha(fecha));
      lineas.push('Tipo de postre: ' + tipo);
      if (mensaje) {
        lineas.push('');
        lineas.push('Mensaje: ' + mensaje);
      }

      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lineas.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------------------------------------------------------
     9. Copiar correo + aviso flotante
     --------------------------------------------------------- */
  var aviso = $('#aviso');
  var temporizadorAviso;

  function mostrarAviso(mensaje) {
    if (!aviso) return;
    aviso.textContent = mensaje;
    aviso.classList.add('visible');
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(function () {
      aviso.classList.remove('visible');
    }, 2600);
  }

  var botonCopiar = $('#copiar-correo');

  if (botonCopiar) {
    botonCopiar.addEventListener('click', function () {
      var exito = function () {
        mostrarAviso('Correo copiado: ' + CORREO);
        botonCopiar.textContent = '¡Copiado!';
        setTimeout(function () { botonCopiar.textContent = 'Copiar'; }, 2200);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CORREO).then(exito).catch(function () {
          mostrarAviso('No se pudo copiar. Escríbenos a ' + CORREO);
        });
      } else {
        var auxiliar = document.createElement('textarea');
        auxiliar.value = CORREO;
        auxiliar.setAttribute('readonly', '');
        auxiliar.style.position = 'absolute';
        auxiliar.style.left = '-9999px';
        document.body.appendChild(auxiliar);
        auxiliar.select();
        try {
          document.execCommand('copy');
          exito();
        } catch (error) {
          mostrarAviso('No se pudo copiar. Escríbenos a ' + CORREO);
        }
        document.body.removeChild(auxiliar);
      }
    });
  }

  /* ---------------------------------------------------------
     10. Año del pie de página
     --------------------------------------------------------- */
  var anio = $('#anio');
  if (anio) anio.textContent = String(new Date().getFullYear());
})();
