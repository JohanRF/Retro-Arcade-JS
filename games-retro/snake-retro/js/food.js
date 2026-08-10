//todo ¿DE QUE SE ENCARGA FOOD.JS?
//? Mantener la posicion {x, y} de la manzana brillandte en la cuadricula.
//? Generar una nueva posicion aleatorio (de 0 a 19 en X e Y)
//? Regla clave: La manzana NUNCA debe aparecer dentro del cuerpo de la serpiente.
//? Dibujar la comida en el canvas con efeto de brillo neón.

import { ctx, GRID_SIZE, TILE_COUNT } from "./config.js";

export class Food{
	constructor(){
		this.x = 0;
		this.y = 0;
	}

	//Genera una posicion aleatoria asegurando que no caiga sobre la serpiente
	generateNewPosition(snakeBody){
		let newX, newY;
		let isOnSnake;

		do{
			newX = Math.floor(Math.random()*TILE_COUNT);
			newY = Math.floor(Math.random()* TILE_COUNT);

			isOnSnake = snakeBody.some(segment => segment.x === newX && segment.y === newY);
		}while(isOnSnake);
		this.x = newX;
		this.y = newY
	}

	draw(){
		ctx.fillStyle = '#ff0055';
		ctx.shadowColor = '#ff0055';
		ctx.shadowBlur = 10; //Efecto de resplandor

		ctx.fillRect(
			this.x * GRID_SIZE,
			this.y * GRID_SIZE,
			GRID_SIZE - 1,
			GRID_SIZE -1,
		);

		//Limpiamos la sobre para no afectar el renderizado de otros elementos
		ctx.shadowBlur = 0;
	}
}