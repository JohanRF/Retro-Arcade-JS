# Estado actual: Retro Arcade JS

## Hub (index.html + script.js)
- Reloj: (Mostrar la hora real mediante un guardado real en una variable que cambia constantemente para verse en vivo.)
- Carrusel: (Un seleccionador de juegos que se desliza, se mueve con variables que guardan los botones que les agregue. Botones de un teclado norma, por ejemplo <- y ->)
- Selección de juego: (Al elegir uno de los juegos te manda a otra pagina por sus propias funciones del mismo.)
- Records / Hall of Fame: (En la pagina principal esta esa opcion que te manda un modal mostrando los records de primer puesto de cada uno de los juegos. Los datos se guardan en localStorage, en el navegador de cada persona. Pendiente: anotar el nombre de la clave que usa script.js.)

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