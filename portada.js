(function () {
  // La dirección de Comporta en la App Store, cuando exista. Es la misma
  // constante que invitar.html: mientras esté vacía, los botones dicen que
  // llega pronto y no llevan a ninguna parte.
  var TIENDA = "";

  if (TIENDA) {
    document.querySelectorAll("[data-tienda]").forEach(function (boton) {
      boton.href = TIENDA;
      boton.removeAttribute("aria-disabled");
      boton.classList.add("lista");
      boton.querySelector("[data-tienda-arriba]").textContent = "Descárgala en la";
    });
    var nota = document.querySelector("[data-final-nota]");
    if (nota) nota.textContent = "Es gratis y es para iPhone.";
  }

  // Con «Reducir movimiento» o sin observador, cada demo queda directo en su
  // estado final.
  var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var anima = !quieto && "IntersectionObserver" in window;

  // Llama a `fn` una sola vez, cuando `el` se ve casi entero.
  function cuandoSeVea(el, fn) {
    var observador = new IntersectionObserver(function (entradas) {
      if (entradas[0].isIntersecting) {
        observador.disconnect();
        fn();
      }
    }, { threshold: 0.6 });
    observador.observe(el);
  }

  // El entrenamiento de Registro: se confirma la tercera serie de press banca,
  // el volumen pasa al de la vez pasada y «Hace 7 días» cambia a «Superado».
  var entreno = document.querySelector("[data-entreno]");
  if (entreno) {
    if (anima) {
      cuandoSeVea(entreno, function () {
        setTimeout(function () { entreno.classList.add("superado"); }, 700);
      });
    } else {
      entreno.classList.add("superado");
    }
  }

  // El teléfono del héroe: publicar la foto de hoy. Se presiona el botón, se
  // marca el palote del viernes, la racha pasa de 4 a 5 y llega el aplauso.
  // Corre una vez, cuando el teléfono se ve; en el celular está bajo el texto.
  var telefono = document.querySelector("[data-demo]");
  if (!telefono) return;

  if (!anima) {
    telefono.classList.add("cumplido", "avisado");
    return;
  }

  // Con mouse, el teléfono se inclina un poco hacia el puntero.
  var heroe = document.querySelector(".heroe");
  if (heroe && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    heroe.addEventListener("pointermove", function (e) {
      var r = heroe.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      telefono.style.setProperty("--rx", (-y * 6).toFixed(2) + "deg");
      telefono.style.setProperty("--ry", (x * 9).toFixed(2) + "deg");
    });
    heroe.addEventListener("pointerleave", function () {
      telefono.style.setProperty("--rx", "0deg");
      telefono.style.setProperty("--ry", "0deg");
    });
  }

  function cumplir() {
    setTimeout(function () { telefono.classList.add("presiona"); }, 500);
    setTimeout(function () {
      telefono.classList.remove("presiona");
      telefono.classList.add("cumplido");
    }, 760);
    setTimeout(function () { telefono.classList.add("avisado"); }, 2100);
  }

  cuandoSeVea(telefono, cumplir);
})();
