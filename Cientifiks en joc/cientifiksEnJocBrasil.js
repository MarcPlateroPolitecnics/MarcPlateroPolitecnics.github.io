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
  let startTime = Date.now();
  const gameDuration = 180000; // 3 mins en mil·lisegons.

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
      fruitPos = [
        Math.random() * (gameContainer.clientWidth - fruitSize),
        0,
      ];
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

    // Verificar temps i vides.
    const elapsed = Date.now() - startTime;
    if (elapsed >= gameDuration || lives <= 0) {
      restartGame();
    }

    requestAnimationFrame(draw);
  }

  function restartGame() {
    playerPos = [...initialPlayerPos];
    fruitPos = [...initialFruitPos];
    score = 0;
    lives = 5;
    startTime = Date.now();
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
