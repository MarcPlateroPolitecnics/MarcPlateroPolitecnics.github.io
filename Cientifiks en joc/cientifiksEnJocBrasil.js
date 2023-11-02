document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("window");
  const player = document.getElementById("player");
  const fruit = document.getElementById("fruit");
  const scoreValue = document.getElementById("scoreValue");
  const livesValue = document.getElementById("livesValue");

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
  const fruitSpeed = 3;
  let playerPos = [...initialPlayerPos];
  let fruitPos = [...initialFruitPos];
  let score = 0;
  let lives = 5;
  let doubleFruits = false; // Nova variable per controlar les dues fruites.
  const doubleFruitThreshold = 10; // Puntuació per activar les dues fruites.

  function draw() {
    player.style.left = `${playerPos[0]}px`;
    player.style.top = `${playerPos[1]}px`;

    fruit.style.left = `${fruitPos[0]}px`;
    fruit.style.top = `${fruitPos[1]}px`;

    scoreValue.textContent = score;
    livesValue.textContent = lives;

    // Moure fruita.
    fruitPos[1] += fruitSpeed;

    // Verificar col·lisió.
    if (
      playerPos[0] < fruitPos[0] + fruitSize &&
      playerPos[0] + playerSize > fruitPos[0] &&
      playerPos[1] < fruitPos[1] + fruitSize &&
      playerPos[1] + playerSize > fruitPos[1]
    ) {
      score++;

      if (score === doubleFruitThreshold && !doubleFruits) {
        // Activa les dues fruites quan s'arriba a 10 punts.
        doubleFruits = true;
        spawnDoubleFruits();
        changeBackground();
      } else {
        fruitPos = [
          Math.random() * (gameContainer.clientWidth - fruitSize),
          0,
        ];
      }
    }

    // Verificar caiguda de fruita al terra.
    if (fruitPos[1] > gameContainer.clientHeight) {
      if (fruitPos[1] + fruitSize > gameContainer.clientHeight) {
        // Restar vida només si la part inferior de la fruta toca el marc.
        lives--;
        fruitPos = [
          Math.random() * (gameContainer.clientWidth - fruitSize),
          0,
        ];
      }
    }

    requestAnimationFrame(draw);
  }

  function spawnDoubleFruits() {
    // Genera dues posicions aleatòries per a les dues fruites
    const secondFruitPos = [
      Math.random() * (gameContainer.clientWidth - fruitSize),
      0,
    ];

    // Crea una segona fuita
    const secondFruit = document.createElement("img");
    secondFruit.src = "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/banana.png";
    secondFruit.style.position = "absolute";
    secondFruit.style.width = `${fruitSize}px`;
    secondFruit.style.height = `${fruitSize}px`;
    gameContainer.appendChild(secondFruit);

    function drawSecondFruit() {
      secondFruit.style.left = `${secondFruitPos[0]}px`;
      secondFruit.style.top = `${secondFruitPos[1]}px`;
      secondFruitPos[1] += fruitSpeed * 1.5; // Ajusta la velocitat de la segona fuita.

      if (
        playerPos[0] < secondFruitPos[0] + fruitSize &&
        playerPos[0] + playerSize > secondFruitPos[0] &&
        playerPos[1] < secondFruitPos[1] + fruitSize &&
        playerPos[1] + playerSize > secondFruitPos[1]
      ) {
        // Incrementa la puntuació quan es recull la segona fuita.
        score++;
        secondFruitPos = [
          Math.random() * (gameContainer.clientWidth - fruitSize),
          0,
        ];
      }

      // Verifica si la segona fuita ha caigut al terra.
      if (secondFruitPos[1] > gameContainer.clientHeight) {
        gameContainer.removeChild(secondFruit);
      } else {
        requestAnimationFrame(drawSecondFruit);
      }
    }

    drawSecondFruit();
  }

  function changeBackground() {
    // Canvia el fons després d'aconseguir els 10 punts.
    document.getElementById("background1").src = "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/brasilFondo2.jpg";
  }

  function restartGame() {
    playerPos = [...initialPlayerPos];
    fruitPos = [...initialFruitPos];
    score = 0;
    lives = 5;
  }

  document.addEventListener("keydown", function (e) {
    const movementSpeed = 50; // Augmentar aquest valor per així augmentar la velocitat del jugador.

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
