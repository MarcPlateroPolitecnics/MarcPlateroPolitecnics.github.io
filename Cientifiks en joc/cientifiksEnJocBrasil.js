document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("window");
  const player = document.getElementById("player");
  const fruit = document.getElementById("fruit");
  const scoreValue = document.getElementById("scoreValue");
  const livesValue = document.getElementById("livesValue");
  const background = document.getElementById("background");

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
  const initialBackground = "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/brasilFondo1.jpg";
  const fruitSpeeds = [3, 5, 6];
  let playerPos = [...initialPlayerPos];
  let fruitPos = [...initialFruitPos];
  let score = 0;
  let lives = 5;
  let currentLevel = 1;
  const levelThresholds = [0, 10, 25, 50];
  const fruits = [
    "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/fruits/papaya.png",
    "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/fruits/banana.png",
    "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/fruits/mango.png"
  ];

  function draw() {
    player.style.left = `${playerPos[0]}px`;
    player.style.top = `${playerPos[1]}px`;

    fruit.style.left = `${fruitPos[0]}px`;
    fruit.style.top = `${fruitPos[1]}px`;

    scoreValue.textContent = score;
    livesValue.textContent = lives;

    fruitPos[1] += fruitSpeeds[currentLevel - 1];

    if (
      playerPos[0] < fruitPos[0] + fruitSize &&
      playerPos[0] + playerSize > fruitPos[0] &&
      playerPos[1] < fruitPos[1] + fruitSize &&
      playerPos[1] + playerSize > fruitPos[1]
    ) {
      score++;

      if (score === levelThresholds[currentLevel]) {
        if (currentLevel < levelThresholds.length - 1) {
          currentLevel++;
          changeBackground();
          changeFruit();
        }
      }

      fruitPos = [
        Math.random() * (gameContainer.clientWidth - fruitSize),
        0,
      ];
    }

    if (fruitPos[1] > gameContainer.clientHeight) {
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

    if (score >= levelThresholds[levelThresholds.length - 1]) {
      // Finalizar el juego
      endGame();
      return;
    }

    requestAnimationFrame(draw);
  }

  function changeBackground() {
    background.src = `C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/brasilFondo${currentLevel + 1}.jpg`;
  }

  function changeFruit() {
    fruit.src = fruits[currentLevel - 1];
  }

  function restartGame() {
    playerPos = [...initialPlayerPos];
    fruitPos = [...initialFruitPos];
    score = 0;
    lives = 5;
    currentLevel = 1;
    background.src = initialBackground;
    fruit.src = fruits[0];
  }

  function endGame() {
    // Implementar lógica de finalización del juego
    background.src = "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/brasilFondoFinal.jpg";
    alert("¡Has alcanzado 50 puntos! ¡Fin del juego!");
  }

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

  restartGame();
  draw();
});

