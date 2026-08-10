//todo: POR QUE EMPEZAMOS CON CONFIG.JS?
//? El juego necesita reglas claras y constantes centralizadas. Y aca se pregunta como:
/* ¿De que tamaño es cada casilla de la cuadricula? */
/* ¿Donde esta el Canvas en el HTML y cual es su contexto para dibujar 2d? */
/* ¿Que elementos del HTML(comoo el marcador se score, overlays, etc)? vamos a modificar mediante codigo? */

//* CONFIGURACION DEL CANVAS Y GRILLA
export const canvas = document.getElementById('snakeCanvas');
export const ctx = canvas.getContext('2d');

//Tamaño en pixeles de cada casilla del tablero
export const GRID_SIZE = 25;
//Canvas 500x500, 500/25 = 20 casillas por fila y columna
export const TILE_COUNT = canvas.width / GRID_SIZE; // 20 casillas

//Velocidad del juego en milisegundos por frame(menor valor = mas rapido)
export const GAME_SPEED = 100;

//* REFERENCIA A ELEMENTOS DEL DOM (UI)
export const currentScoreEl = document.getElementById('currentScore');
export const highScoreEl = document.getElementById('highScore');

//Modales / Overlays
export const gameOverlay = document.getElementById('gameOverlay');
export const overlayTitle = document.getElementById('overlayTitle');
export const overlaySubtitle = document.getElementById('overlaySubtitle');

//Formulario de Records
export const nameInputContainer = document.getElementById('nameInputContainer');
export const playerNameInput = document.getElementById('playerNameInput');
export const btnSaveScore = document.getElementById('btnSaveScore');

//Lista de leaderboard lateral
export const leaderboardList = document.getElementById('leaderboardList');