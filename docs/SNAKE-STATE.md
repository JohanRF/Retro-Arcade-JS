# Estado actual: Snake Retro (JS)

## Módulos
- config.js: Configurando y dando un molde base para el juego. Porque crea la zona en donde se ejecuta el juego. Como son por pixel le creamos una base en cuadros, formando asi un tablero que tanto snake y food se muevan. Tambien dando otras caracteristicas iniciales como la velocidad a milisegundos. También guarda las referencias a elementos del HTML (marcadores, overlay, formulario y lista de records). Todo esto en Canvas.

- snake.js: Contiene toda las caracteristicas y funcionalidades para la serpiente protagonista. Con lleva en mostrar el (modelo aun no visual), la direccion que configuramos(darle varias reacciones por teclado), el movimiento (no puede girar 180° sobre sí misma),tambien sus limitaciones cuando hace una colision propia o estructura de la zona y al final su renderizado de aparecer.

- food.js: Aparte de darle logica a la serpiente tambien le dariamos un rol a la comida. La comida no se mueve: aparece en una casilla al azar al iniciar y cada vez que la serpiente la come, nunca encima de su cuerpo. También se encarga de dibujarse con un brillo neón.

- leaderboard.js (clave de localStorage y forma de los datos): Tiene su propio conjunto de guardado de datos, localstorage. Para que se pueda ver los records de las personas que lo probaron. Clave: snake_retro_highscores. Guarda un array de objetos {name, score}, ordenado de mayor a menor, máximo 10. Al perder, si el puntaje entra al top 10 (y no es 0), el jugador escribe su alias y lo guarda; no es automático.

- ui.js: Para darle un orden de que mostrar en orden mis modals o enseñar visualmente los cambios de la pagina snake, ui.js ayuda a mostrar los datos del juego en vivo. En este caso los Marcadores, Lista de Records y pantallas inicio, pausa y game over.

- main.js: Aqui es donde se orquesta toda la funcionalidad del juego. Llama a todos para darle una direccion correcta, cuando se debe de mostrar, limites, que pasaria si esto o lo otro, etc. El cerebro que organica para que el juego cobre sentido.

## Flujo de una partida
1. Al cargar: new Game() → init() (Se ejecuta una sola vez al cargar la página. new Game() crea Snake, Food, LeaderBoard y UI; init() registra las teclas, muestra el high score y la lista de records guardados, coloca la primera comida, deja el juego en espera y muestra el overlay de inicio.)
2. Espacio → startGame() (Cada vez que empieza una partida: pone el score en 0, reinicia la serpiente, coloca comida nueva, oculta el overlay y arranca el bucle con setInterval, que ejecuta step() cada GAME_SPEED = 100 ms.)
3. Cada 100 ms → step() (Si está en pausa o terminó, no hace nada. Si no: calcula si la cabeza llegará a la comida, mueve la serpiente, revisa si chocó y vuelve a dibujar el tablero.)
4. Si come: (La serpiente crece porque ese turno no se elimina la cola. Además suma 10 puntos, actualiza el marcador y genera otra comida fuera de su cuerpo.)
5. Si choca: triggerGameOver() (checkCollision() detecta si la cabeza tocó una pared o su propio cuerpo. triggerGameOver() detiene el bucle y decide la pantalla: si el puntaje entra al top 10 muestra el formulario de nombre; si no, solo GAME OVER.)
6. Si es record: savePlayerScore() (Es el mismo overlay con el campo de nombre; solo cambia el mensaje: "¡NUEVO RÉCORD!" si es top 3, "¡ENTRASTE AL TOP 10!" si no. Al guardar, addScore() ordena la lista y la guarda en localStorage, y la UI actualiza el high score y la lista, donde los tres primeros puestos tienen estilo oro, plata y bronce.)

## Bugs observados
- Si se pulsa P antes de iniciar, aparece el overlay de PAUSA; al pulsar P otra vez desaparece y el juego queda congelado, sin overlay de inicio.
- El overlay de pausa dice "PRESIONA P O ESPACIO PARA CONTINUAR", pero el Espacio no reanuda; solo la P.
- Al guardar un record, el overlay pasa a decir "PAUSA" estando la partida terminada (savePlayerScore() llama a showPauseOverlay() en vez de showGameOverOverlay()).