//todo: ¿DE QUE SE ENCARGA SNAKE.JS?
/* GESTION TODO LO RELACIONADO CON LA SERPIENTE */
//? En que posicion nace
//? Hacia donde se esta moviendo
//? Como avanza el cuerpo(añadir una cabeza nueva en la direccion correcta y quitar la cosa)
//? Como crece al comer
//? Si choca contra las paredes o contra si misma
//? Como se dibuja en el canvas(ctx)

//* IMPORTAMOS LO QUE NECESITAMOS DE CONFIG.JS
import { ctx, GRID_SIZE, TILE_COUNT } from "./config.js";

export class Snake{
	constructor(){
		this.reset();
	}

	//*Inicializa o reinicia el estado de la serpiente
	reset(){
		//El cuerpo de una lista (Array) de posiciones {x, y} en la grilla (0 a 19)
		//Nace en el centro de la pantalla con 3 bloques de largo
		this.body = [
			{x: 10, y: 10}, //	CABEZA
			{x: 10, y: 11}, // CUERPO
			{x: 10, y: 12}, // COLA
		];

		//Direccion inicial hacia arriba
		this.dx = 0; //Movimiento horizontal (x)
		this.dy = -1; //Movimiento vertical (y)

		//Almacena la direccion planificada para evitar giros de 180° instantaneos
		this.nextDx = 0;
		this.nextDy = -1;
	}

	//*Dibuja cada segmento del cuerpo en el Canvas
	draw(){
		this.body.forEach((segment, index) =>{
			//La cabeza se pinta verde neon brillante (#00ff66).
			ctx.fillStyle = (index === 0) ? '#00ff66' : '#00b347';

			//Dibujamos el bloque multiplicando la casilla por GRID_SIZE(25px)
			//Agregamos un border pequeñito (1px) para que los bloques del cuerpo se diferencien.
			ctx.fillRect(
				segment.x * GRID_SIZE,
				segment.y * GRID_SIZE,
				GRID_SIZE - 1,
				GRID_SIZE - 1,
			)
		});
	}

	//* Cambia la direccion segundo las teclas presionadas
	changeDirection(newDx, newDy){
		//Regla de oro: No se puede girar 180° directamente sobre su propio sentido.
		// Por ejm, si vas a derecha(dx = 1), no puedes ir a la izquierda (newD = -1)
		if (newDx !== -this.dx && newDy !== -this.dy) {
			this.nextDx = newDx;
			this.nextDy = newDy;
		}
	}

	//* Mueve la serpiente un paso hacia adelante
	move(willEatFoof = false){
		//Confirmamos la direccion acumulada
		this.dx = this.nextDx;
		this.dy = this.nextDy;

		//Calculamos donde estara la nueva cabeza
		const newHead = {
			x: this.body[0].x + this.dx,
			y: this.body[0].y + this.dy,
		};

		//Insertamos la nueva cabeza al inicio del Array
		this.body.unshift(newHead)

		//SI NO COMIO, comida en este turno, eliminamos el ultimo bloque(la cola).
		//SI SI COMIO, no eliminamos la cola, provocando que la serpiente crezca 1 bloque.
		if (!willEatFoof) {
			this.body.pop();
		}
	}

	//* Verifica si la nueva cabeza choco con la pared o con su propio cuerpo
	checkCollision(){
		const head = this.body[0];

		//1. Colision con paredes (bordes del canvas 0 a 19)
		const hitWall = head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT;
		//2. Colision con su propio cuerpo
		//Revisa si la posicion de la cabeza coincide con alguna de sus partes posteriores
		const hitSelf = this.body.slice(1).some(segment => {
			return segment.x === head.x && segment.y === head.y;
		});

		return hitWall || hitSelf;
	}
}