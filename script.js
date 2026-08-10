//* 1. DECLARACION DE VARIABLES Y ELEMENTOS DOM
//? Reloj en vivo 
const clockElement = document.getElementById('systemClock'); 
//? Elementos del Carrusel 
// Padre que contiene los gameTile o los cards
const carouselContainer = document.querySelector('.gameCarousel');
// Hijos del contenedor o contiene todos los hijos del container
const tiles = Array.from(document.querySelectorAll('.gameTile'));
//? Elementos de la Barra inferior
const gameNameDisplay = document.getElementById('selectedGameName');
const gameControlsDisplay = document.getElementById('selectedGameControls')
//? Elementos de Modal
const btnRecords = document.getElementById('btnHallOfFame');
const recordsModal = document.getElementById('hallOfFameModal');
const btnCloseModal = document.getElementById('btnCloseModal');
//? Metricas de UI y estado
const tileWidth = 260;  // Ancho del tile en ps
const gap = 24;         // Separacion entre Tile (1.5rem)
let activeIndex = 0;    //Indice del juego selecionado actualmente

//* 2. INICIALIZACION DE LA APLICACION
document.addEventListener('DOMContentLoaded', ()=>{
    initClock();
    initCarousel();
    initModals();
})

//* 3. SISTEMA DE RELOJ EN TIEMPO REAL
function initClock(){
    if(!clockElement)return;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

//* 4. SISTEMA DE NAVEGACION DEL CARRUSEL
function initCarousel() {
    if (tiles.length === 0 || !carouselContainer) return;

    function renderCarousel(){
        const totalStep = tileWidth + gap;

        //Calculo exacto para desplazar el riel y centrar la tarjeta activa
        const offsetTranslation = -(activeIndex * totalStep) - (tileWidth / 2);
        carouselContainer.style.transform = `translateX(${offsetTranslation}px)`;

        tiles.forEach((tile, index) =>{
            tile.style.order = '';
            tile.classList.remove('active', 'near', 'far', 'hiddenTile');

            const distance = Math.abs(index - activeIndex);

            if (distance === 0) {
                tile.classList.add('active');
                updateInfoBar(tile);
            }else if(distance === 1){
                tile.classList.add('near');
            }else if(distance === 2){
                tile.classList.add('far');
            }else{
                tile.classList.add('hiddenTile');
            }
        })
    }

    function updateInfoBar(activeTile) {
        if (!gameNameDisplay || !gameControlsDisplay) return;

        const title = activeTile.dataset.title || 'MODULO BLOQUEADO';
        const controls = activeTile.dataset.controls || 'N/A';

        gameNameDisplay.innerHTML = `<i class="fa-solid fa-gamepad"></i> ${title}`;
        gameControlsDisplay.innerHTML = `<i class="fa-solid fa-keyboard"></i> Controles: ${controls}`;
    }

    //Eventos de seleccion con el mouse
    tiles.forEach((tile,index) =>{
        tile.addEventListener('click', ()=>{
            if (activeIndex !== index) {
                activeIndex = index;
                renderCarousel();
            }
        })
    })

    //Eventos de navegacion por teclado
    document.addEventListener('keydown', (event) =>{
        if (event.key === 'ArrowLeft') {
            if (activeIndex > 0) {
                activeIndex--;
                renderCarousel();
            }
        }else if(event.key === 'ArrowRight'){
            if (activeIndex < tiles.length - 1) {
                activeIndex++;
                renderCarousel();
            }
        }
    })

    //Carga Inicial
    renderCarousel();
}

//* 5. SISTEMA DE MODALES (HALL OF FAME)
function initModals() {
    if (!btnRecords || !recordsModal) return;

    btnRecords.addEventListener('click', ()=>{
        recordsModal.classList.remove('hidden');
    });

    if(btnCloseModal){
        btnCloseModal.addEventListener('click', ()=>{
            recordsModal.classList.add('hidden');
        });
    }

    recordsModal.addEventListener('click', (event)=>{
        if (event.target === recordsModal) {
            recordsModal.classList.add('hidden');
        }
    })
}