document.addEventListener("DOMContentLoaded", function () {
  // Ejecutar startGame al cargar la página.
  startGame();

  // Event Listener para el botón "Home".
  const homeButton = document.getElementById("home");
  homeButton.addEventListener("click", function () {
    // Cierra el popup antes de redirigir al usuario a la página de inicio.
    closePopup();
    // Redirige al usuario a la página de inicio (ajusta la URL según sea necesario).
    window.location.href = "../../LandingPage/LandingPage.html#juegos";
  }); 
});

function openPopup() {
  console.log("Opening popup");
  document.getElementById('infoPopup').style.display = 'block';

  // Oculta elementos del juego al abrir el popup
  document.getElementById('window').style.display = 'none';
  document.getElementById('scoreContainer').style.display = 'none';

  // Reinicia automáticamente el juego al abrir el popup
  restartGame();
}

function closePopup() {
  console.log("Closing popup");
  document.getElementById('infoPopup').style.display = 'none';

  // Restaura la visibilidad de los elementos del juego al cerrar el popup
  document.getElementById('window').style.display = 'block';
  document.getElementById('scoreContainer').style.display = 'flex';

  // Reinicia el juego
  restartGame();
}

function startGame() {
  // Obtén elementos del DOM.
  const gameContainer = document.getElementById("window");
  const player = document.getElementById("player");
  const fruit = document.getElementById("fruit");
  const scoreValue = document.getElementById("scoreValue");
  const livesValue = document.getElementById("livesValue");
  const background = document.getElementById("background");

  // Variable para controlar si el juego está en marcha o no.
  let gameRunning = true;

  // Diferentes constantes del juego.
  const playerSize = 50;
  const fruitSize = 30;
  const initialPlayerPos = [
    gameContainer.clientWidth / 2 - playerSize / 2,
    gameContainer.clientHeight - playerSize - 10,
  ];
  const initialFruitPos = [
    Math.random() * (gameContainer.clientWidth - fruitSize),
    0,
  ];
  const initialBackground = "./img/backgrounds/brasilFondo1.jpg";
  const fruitSpeeds = [3.5, 4.5, 5];
  let playerPos = [...initialPlayerPos];
  let fruitPos = [...initialFruitPos];
  let score = 0;
  let lives = 5;
  let currentLevel = 1;
  const levelThresholds = [0, 10, 25, 50];
  const fruits = [
    "./img/fruits/papaya.png",
    "./img/fruits/banana.png",
    "./img/fruits/mango.png"
  ];

  // Función principal que actualiza el dibujo del juego.
  function draw() {
    // Solo actualiza la posición si el juego está en marcha.
    if (gameRunning) {
      // Actualiza la posición del jugador y la fruta.
      player.style.left = `${playerPos[0]}px`;
      player.style.top = `${playerPos[1]}px`;

      fruit.style.left = `${fruitPos[0]}px`;
      fruit.style.top = `${fruitPos[1]}px`;

      // Actualiza la puntuación y las vidas.
      scoreValue.textContent = score;
      livesValue.textContent = lives;

      // Mueve la fruta hacia abajo.
      fruitPos[1] += fruitSpeeds[currentLevel - 1];

      // Comprueba colisiones con el jugador.
      if (
        playerPos[0] < fruitPos[0] + fruitSize &&
        playerPos[0] + playerSize > fruitPos[0] &&
        playerPos[1] < fruitPos[1] + fruitSize &&
        playerPos[1] + playerSize > fruitPos[1]
      ) {
        // Incrementa la puntuación y verifica si se pasa al siguiente nivel.
        score++;
        if (score === levelThresholds[currentLevel]) {
          if (currentLevel < levelThresholds.length - 1) {
            currentLevel++;
            changeBackground();
            changeFruit();
          }
        }

        // Reinicia la posición de la fruta y agrega una clase de animación.
        fruitPos = [
          Math.random() * (gameContainer.clientWidth - fruitSize),
          0,
        ];
        fruit.classList.add('collected');
        }

      // Comprueba si la fruta ha llegado a la parte inferior del marco.
      if (fruitPos[1] > gameContainer.clientHeight) {
        // Reduce las vidas y reinicia la posición de la fruta si aún hay vidas.
        lives--;
        if (lives <= 0) {
          restartGame();
        } else {
          fruitPos = [
            Math.random() * (gameContainer.clientWidth - fruitSize),
            0,
          ];
        }
      }

      // Comprueba si se ha alcanzado la puntuación máxima.
      if (score >= levelThresholds[levelThresholds.length - 1]) {
        // Finaliza el juego.
        endGame();
        return;
      }

      // Continúa actualizando el dibujo del juego.
      requestAnimationFrame(draw);
    }
  }

  // Cambia la imagen de fondo según el nivel actual.
  function changeBackground() {
    background.src = `./img/backgrounds/brasilFondo${currentLevel + 1}.jpg`;
  }

  // Cambia la imagen de la fruta según el nivel actual.
  function changeFruit() {
    fruit.src = fruits[currentLevel - 1];
  }

  // Reinicia los valores del juego.
  function restartGame() {
    playerPos = [...initialPlayerPos];
    fruitPos = [...initialFruitPos];
    score = 0;
    lives = 5;
    currentLevel = 1;
    background.src = initialBackground;
    fruit.src = fruits[0];
  }

  // Finaliza el juego y muestra un mensaje final.
  function endGame() {
    background.src = "./img/backgrounds/brasilFondoFinal.jpg";
    const endMessage = document.getElementById("endMessage");
    // endMessage.textContent = "Meninas da aldeia: Obrigado por colher as frutas, agora podemos distribuí-las às crianças pobres. Pelo grande favor que você nos fez, nós lhe daremos uma recompensa.";
  }

  // Event Listener para las teclas de movimiento.
  document.addEventListener("keydown", function (e) {
    const movementSpeed = 50;

    if (e.key === "ArrowLeft" && playerPos[0] > 0) {
      playerPos[0] -= movementSpeed;
    } else if (
      e.key === "ArrowRight" &&
      playerPos[0] < gameContainer.clientWidth - playerSize
    ) {
      playerPos[0] += movementSpeed;
    }
  });

  // Event Listener para el botón "Home".
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", function () {
    // Redirige al usuario a la página de inicio (ajusta la URL según sea necesario).
    window.location.href = "../../LandingPage/LandingPage.html#juegos";
  });

  // Inicializa el juego.
  restartGame();
  // Comienza el bucle de dibujo.
  draw();
};
