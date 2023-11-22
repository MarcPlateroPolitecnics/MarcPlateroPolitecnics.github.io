// Espera a que el DOM (la part de html) estigui carregat.
document.addEventListener("DOMContentLoaded", function () {
  // Obté elements del DOM.
  const gameContainer = document.getElementById("window");
  const player = document.getElementById("player");
  const fruit = document.getElementById("fruit");
  const scoreValue = document.getElementById("scoreValue");
  const livesValue = document.getElementById("livesValue");
  const background = document.getElementById("background");

  // Diferents constants del joc.
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
  const fruitSpeeds = [3, 5, 6];
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

  // Funció principal que actualitza el dibuix del joc.
  function draw() {
    // Actualitza la posició del jugador i la fruita.
    player.style.left = `${playerPos[0]}px`;
    player.style.top = `${playerPos[1]}px`;

    fruit.style.left = `${fruitPos[0]}px`;
    fruit.style.top = `${fruitPos[1]}px`;

    // Actualitza la puntuació i les vides.
    scoreValue.textContent = score;
    livesValue.textContent = lives;

    // Mou la fruita cap avall.
    fruitPos[1] += fruitSpeeds[currentLevel - 1];

    // Comprova col·lisions amb el jugador.
    if (
      playerPos[0] < fruitPos[0] + fruitSize &&
      playerPos[0] + playerSize > fruitPos[0] &&
      playerPos[1] < fruitPos[1] + fruitSize &&
      playerPos[1] + playerSize > fruitPos[1]
    ) {
      // Incrementa la puntuació i verifica si es passa al següent nivell.
      score++;
      if (score === levelThresholds[currentLevel]) {
        if (currentLevel < levelThresholds.length - 1) {
          currentLevel++;
          changeBackground();
          changeFruit();
        }
      }

      // Reinicia la posició de la fruita.
      fruitPos = [
        Math.random() * (gameContainer.clientWidth - fruitSize),
        0,
      ];
    }

    // Comprova si la fruita ha arribat a la part inferior del marc.
    if (fruitPos[1] > gameContainer.clientHeight) {
      // Redueix les vides i reinicia la posició de la fruita si encara hi ha vides.
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

    // Comprova si s'ha assolit la puntuació màxima.
    if (score >= levelThresholds[levelThresholds.length - 1]) {
      // Finalitza el joc.
      endGame();
      return;
    }

    // Continua actualitzant el dibuix del joc.
    requestAnimationFrame(draw);
  }

  // Canvia la imatge de fons segons el nivell actual.
  function changeBackground() {
    background.src = `./img/backgrounds/brasilFondo${currentLevel + 1}.jpg`;
  }

  // Canvia la imatge de la fruita segons el nivell actual.
  function changeFruit() {
    fruit.src = fruits[currentLevel - 1];
  }

  // Reinicia els valors del joc.
  function restartGame() {
    playerPos = [...initialPlayerPos];
    fruitPos = [...initialFruitPos];
    score = 0;
    lives = 5;
    currentLevel = 1;
    background.src = initialBackground;
    fruit.src = fruits[0];
  }

  // Finalitza el joc i mostra un missatge final.
  function endGame() {
    background.src = "./img/backgrounds/brasilFondoFinal.jpg";
    const endMessage = document.getElementById("endMessage");
    endMessage.textContent = "Meninas da aldeia: Obrigado por colher as frutas, agora podemos distribuí-las às crianças pobres. Pelo grande favor que você nos fez, nós lhe daremos uma recompensa.";
  }

  // Event Listener per les tecles de moviment.
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

  // Event Listener per al botó "Sortir".
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", function () {
    // Redirigeix l'usuari cap a la pàgina d'inici (modifica la URL segons sigui necessari).
    window.location.href = "ruta-de-la-landing-page.html";
  });

  // Inicialitza el joc.
  restartGame();
  // Comença el bucle de dibuix.
  draw();
});
