const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Increase snake size
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

// Array for snake parts
const snakeParts = [];
let tailLength = 2;

// Initialize the speed of snake
let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

// Scores
let score = 0;

// Create game loop to continuously update screen
function drawGame() {
  changeSnakePosition();
  // Game over logic
  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();
  drawSnake();
  drawApple();

  checkCollision();
  drawScore();
  setTimeout(drawGame, 1000 / speed); // Update screen 7 times a second
}

// Game Over function
function isGameOver() {
  let gameOver = false;
  // Check whether the game has started
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }
  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    // If snake hits the walls
    gameOver = true;
  }

  // Stop the game when the snake crashes into its own body
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      // Check whether any part of the snake is occupying the same space
      gameOver = true;
      break; // Break out of the loop
    }
  }

  // Display "Game Over" text
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px verdana";
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2); // Position the text in the center
  }

  return gameOver; // This will stop the execution of the drawGame method
}

// Score function
function drawScore() {
  ctx.fillStyle = "white"; // Set the text color to white
  ctx.font = "10px verdana"; // Set the font size to 10px of the font family verdana
  ctx.fillText("Score: " + score, canvas.width - 50, 10); // Position the score at the top-right corner
}

// Clear the screen
function clearScreen() {
  ctx.fillStyle = 'black'; // Make the screen black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with black color
}

function drawSnake() {
  ctx.fillStyle = "green";
  // Loop through the snakeParts array
  for (let i = 0; i < snakeParts.length; i++) {
    // Draw snake parts
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  // Add parts to snake through push
  snakeParts.push(new SnakePart(headX, headY)); // Put an item at the end of the list next to the head
  if (snakeParts.length > tailLength) {
    snakeParts.shift(); // Remove the furthest item from the snake part if we have more than our tail size
  }
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX += xVelocity;
  headY += yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// Check for collision and change apple position
function checkCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++; // Increase the score value
  }
}

// Add event listener to the document body
document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  // Up
  if (event.keyCode === 38 && yVelocity !== 1) {
    // Prevent snake from moving in the opposite direction
    yVelocity = -1;
    xVelocity = 0;
  }
  // Down
  if (event.keyCode === 40 && yVelocity !== -1) {
    yVelocity = 1;
    xVelocity = 0;
  }
  // Left
  if (event.keyCode === 37 && xVelocity !== 1) {
    yVelocity = 0;
    xVelocity = -1;
  }
  // Right
  if (event.keyCode === 39 && xVelocity !== -1) {
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
