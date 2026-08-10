//todo ¿DE QUE SE ENCARGA leaderboard.js?
//? Guardar las 5 mejores puntuaciones en la memoria local del navegador(localStorage) para que no se borren si recargas la pagina
//? Leer esas puntuaciones al abrir el juego.
//? Determinar si el puntaje actual del jugador entra en el top 5
//? Ordenar las marcas de mayor a menor

//* Clave con la que guardaremos los datos en el navegador
const STOREGE_KEY = 'snake_retro_highscores';

export class LeaderBoard{
	constructor(){
		//Carga los records guardados o inicia una lista vacia
		this.scores = this.loadScores();
	}

	//* Lee la memoria dle navegador (localStorage)
	loadScores(){
		const data = localStorage.getItem(STOREGE_KEY);
		//Si existen datos, los covierte de texto JSON a aun Array de objetos JS.
		//Si no existen datos guardados previamente, retorna un Array vacio [].
		return data ? JSON.parse(data) : [];
	}

	//* Guarda la lista actualizada de records en el navegador
	saveScores(){
		//Convertimos el Array de objetos JS a texto plano (JSON) para poder guardarlo
		localStorage.setItem(STOREGE_KEY, JSON.stringify(this.scores));
	}

	//* Evalua si la puntuacion entra en el top 20
	isHighScore(score){
		if(score === 0) return false; //El puntaje 0 no cuenta como record.
		if(this.scores.length < 10) return true; // Si en menor del 4 puesto regresa a un true.
		return score > this.scores[this.scores.length - 1].score;
	}

	//* Metodo para saber si es Top 3
	isTop3(score){
		if(score === 0) return false;
		if(this.scores.length < 3) return true;
		return score > this.scores[2].score;
	}

	//* Agrega un nuevo record, ordena de mayor a menor y conserva solo los mejores 5
	addScore(name, score){
		//Si no agregamos nombre, le asigna ANONIMO
		const cleanName = name.trim().toUpperCase() || 'ANÓNIMO';
		//Añadimos el nuveo registro
		this.scores.push({name: cleanName, score: score});
		//Ordena la lista de mayor a menor puntuacion.
		this.scores.sort((a,b) => b.score - a.score)
		//Nos quedamos unicamente con los primeros 10 puestos.
		this.scores = this.scores.slice(0, 10);
		//Guardamos los cambios en localStorage
		this.saveScores();
	}

	//* Obtiene la puntuacion mas alta registrada de la historia (1er lugar)
	getHighScore(){
		return  this.scores.length > 0 ? this.scores[0].score : 0
	}
}