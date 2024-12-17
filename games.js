// List of images and their correct names
const images = [
    { src: 'images/Designer.jpeg', correct: 'cat', options: ['cat', 'pig', 'rat'] },
    { src: 'images/Designer (1).jpeg', correct: 'dog', options: ['cat', 'dog', 'rat'] },
    { src: 'images/Designer (2).jpeg', correct: 'duck', options: ['cat', 'dog', 'duck'] },
    { src: 'images/Designer (8).jpeg', correct: 'fish', options: ['cat', 'elephant', 'fish'] },
    { src: 'images/Designer (10).jpeg', correct: 'bird', options: ['cat', 'monkey', 'bird'] },
    { src: 'images/Designer (11).jpeg', correct: 'banana', options: ['banana', 'dog', 'apple'] },
    { src: 'images/Designer (12).jpeg', correct: 'mango', options: ['apple', 'mango', 'orange'] },
    { src: 'images/Designer (9).jpeg', correct: 'monkey', options: ['cat', 'potato', 'monkey'] },
    { src: 'images/Designer (13).jpeg', correct: 'apple', options: ['ball', 'apple','potato'] }
];

let currentIndex = 0;
let score = 0;  

const imageElement = document.getElementById('image');
const optionButtons = document.querySelectorAll('.option');
const celebrationDiv = document.getElementById('celebration');
const bravoMessage = document.getElementById('bravo');
const incorrectMessage = document.getElementById('incorrect');
const scoreDisplay = document.getElementById('score');  


function startRound() {
    
    celebrationDiv.innerHTML = '';
    celebrationDiv.style.display = 'none';
    bravoMessage.style.display = 'none';
    incorrectMessage.style.display = 'none';

    // Get current image and options
    const currentImage = images[currentIndex];

    // Set image source
    imageElement.src = currentImage.src;

    // Set option buttons text
    optionButtons.forEach((button, index) => {
        button.textContent = currentImage.options[index];
        button.setAttribute('data-name', currentImage.options[index]);  // Ensure data-name attribute matches the option
        button.onclick = () => checkAnswer(button, currentImage.correct);
    });
}

// Function to check if the clicked answer is correct
function checkAnswer(button, correctAnswer) {
    const clickedAnswer = button.getAttribute('data-name');

    if (clickedAnswer === correctAnswer) {
        score++;  // Increase score for correct answer
        showCelebration();
    } else {
        showIncorrect();
    }

    // Update score display
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to show celebration effects (with mixed color glitters)
function showCelebration() {
    // Show celebration and bravo message
    celebrationDiv.style.display = 'block';
    bravoMessage.style.display = 'block';

    // Create mixed color glitter effects
    for (let i = 0; i < 30; i++) {
        const glitter = document.createElement('div');
        glitter.classList.add('glitter');
        glitter.style.left = `${Math.random() * 100}%`;
        glitter.style.backgroundColor = getRandomColor();  // Mixed colors for glitter
        glitter.style.animationDelay = `${Math.random() * 1}s`;
        celebrationDiv.appendChild(glitter);
    }

    // Proceed to next round after 2 seconds
    setTimeout(nextRound, 2000);
}

// Function to show incorrect message with a red "X"
function showIncorrect() {
    incorrectMessage.style.display = 'block';

    // Proceed to next round after 2 seconds
    setTimeout(nextRound, 2000);
}

// Function to get random color for glitter explosion
function getRandomColor() {
    const colors = ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#DA70D6'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to proceed to the next round
function nextRound() {
    // Hide the celebration and incorrect messages
    celebrationDiv.innerHTML = '';
    incorrectMessage.style.display = 'none';

    // Check if we have completed all rounds
    if (currentIndex + 1 < images.length) {
        currentIndex++;
        startRound();
    } else {
        endGame();
    }
}

// Function to end the game
function endGame() {
    // Display end message
    alert(`Game Over! Your final score is ${score} out of ${images.length}`);
    // Reset for a new game or redirect to another page
    score = 0;  // Reset score
    currentIndex = 0;  // Reset index
    scoreDisplay.textContent = `Score: ${score}`;  // Reset score display
    startRound();  // Restart game
}

// Start the first round
startRound();

