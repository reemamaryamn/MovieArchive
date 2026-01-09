let score = 0;
let timeLeft = 30;
let box;
let gameInterval;
let countdownInterval;

function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = timeLeft;
  spawnBox();
  gameInterval = setInterval(spawnBox, 800);
  countdownInterval = setInterval(updateTime, 1000);
}

function spawnBox() {
  const gameArea = document.getElementById("game-area");
  if (box) gameArea.removeChild(box);

  box = document.createElement("div");
  box.classList.add("box");

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  box.onclick = () => {
    score++;
    document.getElementById("score").textContent = score;
    gameArea.removeChild(box);
  };

  gameArea.appendChild(box);
}

function updateTime() {
  timeLeft--;
  document.getElementById("time").textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(gameInterval);
    clearInterval(countdownInterval);
    if (box) box.remove();
    alert(`⏰ Time's up! Your score: ${score}`);
  }
}