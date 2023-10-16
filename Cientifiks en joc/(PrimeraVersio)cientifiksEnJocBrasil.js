document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
  
    const playerSize = 50;
    const fruitSize = 30;
    const initialPlayerPos = [canvas.width / 2 - playerSize / 2, canvas.height - playerSize - 10];
    const initialFruitPos = [Math.random() * (canvas.width - fruitSize), 0];
    const fruitSpeed = 5;
    let playerPos = [...initialPlayerPos];
    let fruitPos = [...initialFruitPos];
    let score = 0;
    let lives = 5;
    let startTime = Date.now();
    const gameDuration = 180000; // 3 mins en mil·lisegons.
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Dibuxar jugador.
      ctx.fillStyle = "#000000";
      ctx.fillRect(playerPos[0], playerPos[1], playerSize, playerSize);
  
      // Dibuxar fruita.
      ctx.fillStyle = "#f00";
      ctx.fillRect(fruitPos[0], fruitPos[1], fruitSize, fruitSize);
  
      // Dibuxar text.
      ctx.fillStyle = "#000000";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score} | Lives: ${lives}`, 10, 30);
  
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
        fruitPos = [Math.random() * (canvas.width - fruitSize), 0];
      }
  
      // Verificar caiguda de fruita al terra.
      if (fruitPos[1] > canvas.height) {
        fruitPos = [Math.random() * (canvas.width - fruitSize), 0];
        lives--;
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
    
    document.addEventListener("keydown", function(e) {
        const movementSpeed = 50; // Augmentar aquest valor per així augmentar la velocitat.
        
        if (e.key === "ArrowLeft" && playerPos[0] > 0) {
          playerPos[0] -= movementSpeed;
        } else if (e.key === "ArrowRight" && playerPos[0] < canvas.width - playerSize) {
          playerPos[0] += movementSpeed;
        }
    });

    restartGame();
    draw();
  });
