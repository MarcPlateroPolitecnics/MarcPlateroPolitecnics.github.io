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
  let doubleFruits = false;
  const doubleFruitThreshold = 10;

  function draw() {
    player.style.left = `${playerPos[0]}px`;
    player.style.top = `${playerPos[1]}px`;

    fruit.style.left = `${fruitPos[0]}px`;
    fruit.style.top = `${fruitPos[1]}px`;

    scoreValue.textContent = score;
    livesValue.textContent = lives;

    fruitPos[1] += fruitSpeed;

    if (
      playerPos[0] < fruitPos[0] + fruitSize &&
      playerPos[0] + playerSize > fruitPos[0] &&
      playerPos[1] < fruitPos[1] + fruitSize &&
      playerPos[1] + playerSize > fruitPos[1]
    ) {
      score++;

      if (score === doubleFruitThreshold && !doubleFruits) {
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

    // Verificar si es perden totes les vides
    if (fruitPos[1] > gameContainer.clientHeight) {
      if (fruitPos[1] + fruitSize > gameContainer.clientHeight) {
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
    }

    requestAnimationFrame(draw);
  }

  function spawnDoubleFruits() {
    const secondFruitPos = [
      Math.random() * (gameContainer.clientWidth - fruitSize),
      0,
    ];

    const secondFruit = document.createElement("img");
    secondFruit.src =
      "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/banana.png";
    secondFruit.style.position = "absolute";
    secondFruit.style.width = `${fruitSize}px`;
    secondFruit.style.height = `${fruitSize}px`;
    gameContainer.appendChild(secondFruit);

    function drawSecondFruit() {
      secondFruit.style.left = `${secondFruitPos[0]}px`;
      secondFruit.style.top = `${secondFruitPos[1]}px`;
      secondFruitPos[1] += fruitSpeed * 1.5;

      // Comprovem si la segona fruita és recollida
      if (
        playerPos[0] < secondFruitPos[0] + fruitSize &&
        playerPos[0] + playerSize > secondFruitPos[0] &&
        playerPos[1] < secondFruitPos[1] + fruitSize &&
        playerPos[1] + playerSize > secondFruitPos[1]
      ) {
        score++;
        // Eliminem la segona fruita
        gameContainer.removeChild(secondFruit);
        // Creem una nova segona fruita
        spawnDoubleFruits();
      }

      if (secondFruitPos[1] > gameContainer.clientHeight) {
        // Resta una vida quan la banana toca el terra
        lives--;
        // Eliminem la segona fruita
        gameContainer.removeChild(secondFruit);
      } else {
        requestAnimationFrame(drawSecondFruit);
      }
    }

    drawSecondFruit();
  }

  function changeBackground() {
    document.getElementById("background1").src =
      "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/brasilFondo2.jpg";
  }

  function restartGame() {
    const secondFruit = document.querySelector(
      "#window img[src$='banana.png']"
    );
    if (secondFruit) {
      gameContainer.removeChild(secondFruit);
    }

    document.getElementById("background1").src =
      "C:/Users/cep.ID21090261/Desktop/Descargar Xampp/xampp/htdocs/M12/img/brasilFondo1.jpg";

    playerPos = [...initialPlayerPos];
    fruitPos = [...initialFruitPos];
    score = 0;
    lives = 5;
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

