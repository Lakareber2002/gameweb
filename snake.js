const board = document.getElementById('game-board');
const startButton = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');

let snake = [{ x: 200, y: 200 }];
let apple = { x: 100, y: 100 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function drawSnake() {
  // Clear old snake
  board.innerHTML = '';

  // Draw new snake
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.left = `${segment.x}px`;
    snakeElement.style.top = `${segment.y}px`;
    snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });

  // Draw apple
  const appleElement = document.createElement('div');
  appleElement.style.left = `${apple.x}px`;
  appleElement.style.top = `${apple.y}px`;
  appleElement.classList.add('apple');
  board.appendChild(appleElement);
}

function moveSnake() {
  // Calculate new head position
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check collisions (with walls or itself)
  if (
    head.x < 0 ||
    head.x >= 400 ||
    head.y < 0 ||
    head.y >= 400 ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert(`Game Over! Your final score is ${score}`);
    return;
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check if the snake eats the apple
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    placeApple();
  } else {
    // Remove last segment of the snake if no apple eaten
    snake.pop();
  }

  drawSnake();
}

function placeApple() {
  apple.x = Math.floor(Math.random() * 20) * 20;
  apple.y = Math.floor(Math.random() * 20) * 20;

  // Ensure apple doesn't spawn inside the snake
  if (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
    placeApple();
  }
}

function startGame() {
  // Reset game state
  snake = [{ x: 200, y: 200 }];
  apple = { x: 100, y: 100 };
  direction = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;

  drawSnake();

  // Start game loop
  clearInterval(gameInterval);
  gameInterval = setInterval(moveSnake, 200);
}

function changeDirection(event) {
  const key = event.key;
  const directions = {
    ArrowUp: { x: 0, y: -20 },
    ArrowDown: { x: 0, y: 20 },
    ArrowLeft: { x: -20, y: 0 },
    ArrowRight: { x: 20, y: 0 },
  };

  if (directions[key]) {
    const newDirection = directions[key];
    // Prevent the snake from reversing
    if (
      !(
        snake.length > 1 &&
        newDirection.x === -direction.x &&
        newDirection.y === -direction.y
      )
    ) {
      direction = newDirection;
    }
  }
}

// Event listeners
document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);
