const carrusel = document.querySelector('.top-carrusel');

let isDown = false;
let startX;
let scrollLeft;
let velocity = 0;
let momentumId;

carrusel.addEventListener('pointerdown', (e) => {
  cancelMomentumTracking(); // Detiene cualquier inercia anterior
  isDown = true;
  startX = e.clientX;
  scrollLeft = carrusel.scrollLeft;
});

window.addEventListener('pointerup', () => {
  isDown = false;
  beginMomentumTracking(); // Comienza la inercia al soltar
});

window.addEventListener('pointermove', (e) => {
  if (!isDown) return;
  const x = e.clientX;
  const dx = x - startX;
  velocity = dx; // Guardamos la velocidad
  carrusel.scrollLeft = scrollLeft - dx;
});

function beginMomentumTracking() {
  momentumId = requestAnimationFrame(momentumLoop);
}

function cancelMomentumTracking() {
  cancelAnimationFrame(momentumId);
}

function momentumLoop() {
  carrusel.scrollLeft -= velocity;
  velocity *= 0.95; // fricción

  if (Math.abs(velocity) > 0.5) {
    momentumId = requestAnimationFrame(momentumLoop);
  }
}
