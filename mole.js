const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startButton = document.getElementById('start-btn');

let score = 0;
let timeLeft = 30;
let timerId;
let moleTimeouts = [];

function randomHole() {
  // Clear previous mole classes
  holes.forEach(hole => hole.querySelector('.mole').classList.remove('active'));

  // Select a random hole and show the mole
  const randomIndex = Math.floor(Math.random() * holes.length);
  const randomMole = holes[randomIndex].querySelector('.mole');
  randomMole.classList.add('active');

  // Set a timeout to remove the mole after a random time
  const randomDuration = Math.random() * 800 + 200; // Between 200ms and 1000ms
  const timeoutId = setTimeout(() => {
    randomMole.classList.remove('active');
  }, randomDuration);

  // Store the timeout ID so we can clear it later if needed
  moleTimeouts.push(timeoutId);
}

function startGame() {
  // Reset score and time
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;

  // Start the game timer
  timerId = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerId);
      clearAllMoleTimers();
      alert(`Game Over! Your final score is ${score}`);
    }
  }, 1000);

  // Start the mole popping logic
  clearAllMoleTimers(); // Ensure no timers are running
  moleLoop();
}

function moleLoop() {
  randomHole();

  // Schedule the next mole appearance at a random interval
  const randomInterval = Math.random() * 1000 + 500; // Between 500ms and 1500ms
  const nextMoleTimer = setTimeout(moleLoop, randomInterval);
  moleTimeouts.push(nextMoleTimer);
}

function clearAllMoleTimers() {
  moleTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
  moleTimeouts = [];
  moles.forEach(mole => mole.classList.remove('active')); // Clear all moles
}

// Event listener for moles
moles.forEach(mole => {
  mole.addEventListener('click', () => {
    if (mole.classList.contains('active')) {
      score++;
      scoreDisplay.textContent = score;
      mole.classList.remove('active');
    }
  });
});

// Start button listener
startButton.addEventListener('click', startGame);
