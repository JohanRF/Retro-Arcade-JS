//todo ¿DE QUÉ SE ENCARGA MAIN.JS?
//? Importa todos los modulos que creamos(Snake, Foof, Leaderboard, UI y config)
//? Manjea el Game Loop (el bicle de tiempo que hace que el juego corra a 100ms por paso)
//? Escucha las teclas del usuario (FLECHAS, WASD, Pausa P, Reinicio Espacio)
//? Conecta las colisiones con el marcador y con la tabla de records.

import { GAME_SPEED, btnSaveScore, playerNameInput } from "./config.js";
import { Snake } from "./snake.js";
import { Food } from "./food.js";
import { LeaderBoard } from "./leaderboard.js";
import { UI } from "./ui.js";

class Game{
	constructor(){
		//Instanciamos los modulos que daran vida al juego
		this.snake = new Snake();
		this.food = new Food();
		this.leaderboard = new LeaderBoard();
		this.ui = new UI();

		//Variables de estado interno
		this.score = 0;
		this.isPaused = false;
		this.isGameOver = false;
		this.gameInterval = null; // Guardara el temporizador del Game Loop

		this.init();
	}

	//* Inicializacion general
	init(){
		//Escuchamos las teclas presionadas en el teclado
		document.addEventListener('keydown', this.handleKeyPress.bind(this));
		//Escuchamos el clic en el boton de guardar record.
		btnSaveScore.addEventListener('click', ()=> this.savePlayerScore());

		//Cargamos los marcadores iniciales en pantalla
		this.ui.updateHighScore(this.leaderboard.getHighScore());
		this.ui.updateLeaderboard(this.leaderboard.scores);

		//Preparamos la primera posicion de la comida y arrancamos el bucle
		this.food.generateNewPosition(this.snake.body);

		//Estado inicial: Esperando a que el jugador presione Espacio
		this.isGameStarted = false;
		this.isGameOver = false;
		this.ui.showStartOverlay();
		this.draw();
	}

	//*Arranca o reinicia el bucle principal
	startGame(){
		this.score = 0;
		this.isPaused = false;
		this.isGameOver = false;
		this.isGameStarted = true;

		this.snake.reset();
		this.food.generateNewPosition(this.snake.body);

		this.ui.updateScore(this.score);
		this.ui.hideOverlay();

		//Limpiamos cualquier temporizador previo si existia
		if(this.gameInterval) clearInterval(this.gameInterval);
		//Ejecutamos la funcion step() repetidamente cada 100ms (GAME_SPEED)
		this.gameInterval = setInterval(() => this.step(), GAME_SPEED);
	}

	//*El "latido de corazon" del juego (se ejecuta cada 100ms)
	step(){
		if(this.isPaused || this.isGameOver) return;

		//1. Calculamos la posicion futura de la cabeza
		const futureHead = {
			x: this.snake.body[0].x + this.snake.nextDx,
			y: this.snake.body[0].y + this.snake.nextDy,
		};

		//2. Evaluamos si la serpiente comera la manzana en este paso
		const willEatFood = (futureHead.x === this.food.x && futureHead.y === this.food.y);

		//3. Movemos la serpiente
		this.snake.move(willEatFood);

		//4. Si comio la manzana, sumamos puntos y generamos otra
		if (willEatFood) {
			this.score += 10;
			this.ui.updateScore(this.score);
			this.food.generateNewPosition(this.snake.body);
		}

		//5. Verificamos si choco (GAME OVER)
		if (this.snake.checkCollision()) {
			this.triggerGameOver();
			return;
		}

		//6. Limpiamos el lienzo y redibujamos todo en su nueva posicion
		this.draw();
	}

	//* Limpia el canvas y vuelve a pintar la manzana y la serpiente
	draw(){
		//Limpia el cuadro anterior
		const {ctx, canvas} = this.snake;
		// 0 simplemente importamos de config
		import('./config.js').then(({ctx, canvas}) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			this.food.draw();
			this.snake.draw();
		});
	}

	//* Gestor de teclas presionadas
	handleKeyPress(e){
		const key = e.key;

		//Si estamos escribiendo el nombre en el input de record, ignoramos los controles del juego
		if (document.activeElement === playerNameInput) {
			if(key === 'Enter') this.savePlayerScore();
			return;
		}

		//Teclado P: Alternar Pausa
		if((key === 'p' || key === 'P')&& !this.isGameOver){
			this.togglePause();
			return;
		}

		//Teclado Espacio: Reiniciar juego si termino
		if (key === ' ') {
			if (!this.isGameStarted || this.isGameOver) {
				this.startGame();
				return;
			}
		}

		//Si el juego esta pausado o termino, no procesamos flechas
		if(this.isPaused || this.isGameOver) return;

		//Movimiento: Flechas o WASD
		switch (key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.snake.changeDirection(0, -1);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                this.snake.changeDirection(0, 1);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.snake.changeDirection(-1, 0);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.snake.changeDirection(1, 0);
                break;
        };
	}

	//*Alternar el estado de pausa
	togglePause(){
		this.isPaused = !this.isPaused;
		if (this.isPaused) {
			this.ui.showPauseOverlay();
		}else{
			this.ui.hideOverlay();
		}
	}

	//*Procesa la derrota
	triggerGameOver(){
		this.isGameOver = true;
		clearInterval(this.gameInterval);

		//Verificamos si la puntuacion alcanzada califica para el top 5
		if(this.leaderboard.isHighScore(this.score)){
			const reachesTop3 = this.leaderboard.isTop3(this.score);
			this.ui.showRecordOverlay(reachesTop3); //Muestra la caja para escribit su nombre
		}else{
			//Si saco 0 puntos o no supero la posicion 20.
			this.ui.showGameOverOverlay();
		}
	}

	//*Guarda el nuevo record desde el formulario
	savePlayerScore(){
		const name = playerNameInput.value;
		this.leaderboard.addScore(name, this.score);

		//Actualiza las vistas
		this.ui.updateHighScore(this.leaderboard.getHighScore());
		this.ui.updateLeaderboard(this.leaderboard.scores);
		this.ui.showPauseOverlay(); //Vuelve al menu regular de GameOver
	}
}

//? INICIALIZAMOS EL JUEGO AL CARGAR EL ARCHIVO
new Game();