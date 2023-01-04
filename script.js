'use strict';

// Define the variables
let secretNumber = calculateSecretNumber();
let score = 20;
let highscore = 0;
let previousGuesses = [];
let guess;

function calculateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function setHighscore(highscore) {
  document.querySelector('.highscore').textContent = highscore;
}

function setScore() {
  score--;
  document.querySelector('.score').textContent = score;
}

function penaltyScore(reason) {
  score = score - 2;
  document.querySelector('.score').textContent = score;
  displayMessage(reason);
}

function addGuess(guess) {
  previousGuesses.push(guess);
  document.querySelector('.prevguess').textContent = previousGuesses;
}

// Main game logic
document.querySelector('.check').addEventListener('click', function () {
  guess = Number(document.querySelector('.guess').value);

  if (1 <= guess && guess <= 20) {
    if (guess === secretNumber) {
      displayMessage('Victory!');
      if (score > highscore) {
        highscore = score;
        setHighscore(highscore);
      }
    } else if (score > 0) {
      if (guess !== secretNumber) {
        if (previousGuesses.includes(guess)) {
          penaltyScore('🚨 You already gave that number! 🚨');
          addGuess(guess);
        } else {
          displayMessage(guess > secretNumber ? 'Lower!' : 'Higher!');
          setScore();
          addGuess(guess);
        }
      }
    }
  } else {
    penaltyScore('🚨 Not a valid number! 🚨');
  }
});
