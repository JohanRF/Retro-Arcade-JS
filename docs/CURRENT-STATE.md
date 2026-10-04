# Estado actual: Retro Arcade JS

## Hub (index.html + script.js)
- Reloj: initClock() define updateClock(), que lee la hora con new Date(), la formatea como HH:MM y la escribe en #systemClock. Se ejecuta al cargar y luego cada 1000 ms con setInterval.
- Carrusel: activeIndex guarda el juego seleccionado. renderCarousel() centra la tarjeta activa con translateX y asigna las clases active, near, far o hiddenTile según la distancia. Cambia con clic, flechas del teclado y al redimensionar. La barra inferior lee data-title y data-controls de la tarjeta.
- Selección de juego: script.js no navega. START es un enlace en el HTML que lleva a la página del juego (por confirmar mirando index.html).
- Records / Hall of Fame: script.js solo abre y cierra el modal (clase hidden). El contenido es texto fijo en index.html y por ahora no lee datos guardados. Pendiente: ver si Snake guarda scores en localStorage.

## Juegos
- Snake: Guardado y acomododado en una carpeta "games-retro". Para que el usuario pueda seleccionarlo y jugarlo, era darle clic al button START en la casilla del juego. Que te enviaba a la carpeta games-retro y contiene otras carpeta, pero la correcta seria por guiarse por el nombre mismo. Que este caso es la carpeta snake-retro. Que contiene los archivos que muestran los visual y funciones del juego SNAKE RETRO.
- Tres en Raya: Es la misma accion que te explique en Snake, pero aunque halla carpeta no tiene nada aun, porque estaba en progreso.
- Y asi iba ser con cada juego seleccionado por el usuario.

## Problemas conocidos
- Mas que problemas son faltantes que mejorar por que no tiene nada o tiene un desorden notorio en la organización de carpetas y código.
- Un bug visual que no se centre el carrusel de los juegos.
- Y un tema de falta de juegos para ser una galeria de games arcade.
- El botón START de Tres en Raya lleva a una página que no existe (la carpeta está vacía y Git no la sube).
- El botón REPO del hub apunta a un enlace de ejemplo (tu-usuario/retro-arcade-js), no a tu repositorio real.
- tileWidth = 260 y gap = 24 están escritos a mano en script.js y repetidos en el CSS; posible causa del carrusel descentrado (por confirmar).