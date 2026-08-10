//todo ¿DE QUÉ SE ENCAGA UI.JS?
//Este archivo conecta los datos del juego con lo que el usuario ve en la pantalla.
//? Actualiza los marcadores de puntos( SCORE y HIGH)
//? Dibuja los nombres y puntajes en la lista general( <ol id='leaderboardList' >)
//? Muestra y oculta la pantalla superpuesta(gameOverlay) para las pantallas de Pausa, Game Over o Guardar Record.

import{
	currentScoreEl,
	highScoreEl,
	gameOverlay,
	overlayTitle,
	overlaySubtitle,
	nameInputContainer,
	playerNameInput,
	leaderboardList,
} from './config.js';

export class UI{
	showStartOverlay(){
		overlayTitle.textContent = 'SNAKE RETRO';
		overlaySubtitle.textContent = 'PRESIONA ESPACIO PARA INICIAR'
		nameInputContainer.classList.add('hidden');
		gameOverlay.classList.remove('hidden');
	}

	//* Convierte un numero a formato de 4 digitos con ceros a la izquierda (ej. 5 -> "0005")
	formatScore(score){
		return String(score).padStart(4, '0');
	}

	//* Actualiza la puntuacion actual en la pantalla
	updateScore(score){
		currentScoreEl.textContent = this.formatScore(score);
	}

	//* Actualiza el record mas alto en la pantalla
	updateHighScore(score){
		highScoreEl.textContent = this.formatScore(score);
	}

	//* Dibuja la lista del top 20 en el panel laterla
	updateLeaderboard(scores){
		//Limpiamos la lista HTML
		leaderboardList.innerHTML = '';
		//Comenzamos con que la cantidad e score es igual estrictamente a 0, mostrara ese li
		if (scores.length === 0) {
			leaderboardList.innerHTML = '<li class="emptyMsg">Sin récords aún...</li>';
			return;
		}

		//Tomamos unicamente los primeros 10
		const top10 = scores.slice(0,10);

		// Creamos un LI por cada records registrado
		top10.forEach((entry, index) => {
			const li = document.createElement('li');

			//Asignamos clase especial para ORO 0, PLATA 1 y BRONCE 2
			if (index === 0) li.classList.add('gold');
			else if(index === 1) li.classList.add('silver');
			else if(index === 2) li.classList.add('bronze');

			li.innerHTML = `
				<span class="rank">${index + 1}.</span>
				<span class="player-name">${entry.name}</span>
				<span class="separator">-</span>
				<strong class="player-score">${this.formatScore(entry.score)}</strong>
			`;
			/* `
				PRIMERA VERSION DE MOSTRAR LA PUNTUACION Y NOMBRE
				<span>${entry.name}</span>	-	<strong>${this.formatScore(entry.score)}</strong>
			`; */
			leaderboardList.appendChild(li);
		});
	}

	//* Muestra la pantalla de PAUSA
	showPauseOverlay(){
		overlayTitle.textContent = 'PAUSA';
		overlaySubtitle.textContent = 'PRESIONA P O ESPACIO PARA CONTINUAR';
		nameInputContainer.classList.add('hidden'); //Oculta el formulario de nombre.
		gameOverlay.classList.remove('hidden');// Muestra el panel superpuesto.
	}

	//* Muestra la pantalla de GAME OVER sin nuevo record
	showGameOverOverlay(){
		overlayTitle.textContent = 'GAME OVER';
		overlaySubtitle.textContent = 'PRESIONA ESPACIO PARA REINICIAR';
		nameInputContainer.classList.add('hidden');
		gameOverlay.classList.remove('hidden');
	}

	//* Muestra la pantalla de GAME OVER cuando HAY UN RECORD
	showRecordOverlay(isTop3 = false){
		overlayTitle.textContent = 'GAME OVER';
		overlaySubtitle.textContent = 'PRESIONA ESPACIO PARA REINICIAR';

		//Seleccionamos el msg del aviso
		const recordNotice = document.querySelector('.recordNotice');
		if (recordNotice) {
			recordNotice.textContent = isTop3 ? '¡NUEVO RÉCORD!' : '¡ENTRASTE AL TOP 10!';
		}

		playerNameInput.value = ''; //Limpia el input de texto
		nameInputContainer.classList.remove('hidden'); //Muestra el campo para escribir el nombre
		gameOverlay.classList.remove('hidden');

		//Pone el cursor automaticamente en el campo de texto.
		setTimeout(() => playerNameInput.focus(), 100);
	}

	hideOverlay(){
		gameOverlay.classList.add('hidden');
	}
}