'use strict';

// Define the variables
let secretNumber = calculateSecretNumber();
let score = 20;
let highscore;
let previousGuesses = [];
let guess;
let highguess;
let lowguess;
const modal = document.querySelectorAll('.modal');
const modalwin = document.querySelector('.modal-win');
const modalloss = document.querySelector('.modal-loss');
const modalinfo = document.querySelector('.modal-info');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.close-modal');

// Checking for highScore and setting the value - If it does not exist, set it to zero
if (localStorage.getItem('Highscore') === null) {
  localStorage.setItem('Highscore', 0);
  highscore = 0;
  document.querySelector('.highscore').textContent = highscore;
} else {
  highscore = localStorage.getItem('Highscore');
  document.querySelector('.highscore').textContent = highscore;
}

// Functionlist
// Main game logic functions
// Calculate the secret number
function calculateSecretNumber() {
  return Math.trunc(Math.random() * 50) + 1;
}

// Adjust the score after a guess
function setScore() {
  score--;
  document.querySelector('.score').textContent = score;
}

// Adjust the score after a not valid guess
function penaltyScore(reason) {
  score = score - 2;
  if (score <= 0) {
    gameOver();
  } else {
    document.querySelector('.score').textContent = score;
    displayMessage(reason);
  }
}

// Add the guess to the guess list
function addGuess(guess) {
  previousGuesses.push(guess);
  document.querySelector('.prevguess').textContent = previousGuesses;
}

// Setting a new highscore and store it in the localstorage
function setHighscore(highscore) {
  document.querySelectorAll('.highscore').forEach(div => {
    div.textContent = highscore;
  });
  localStorage.setItem('Highscore', highscore);
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Game over
function gameOver() {
  displayMessage('☢️ Game over');
  score = 0;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').style.backgroundImage =
    'linear-gradient(to top, #8b1212 0%, #da1414 100%)';
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('.secretnumber').textContent = secretNumber;
}

// Restarting the game
function restartGame() {
  score = 20;
  previousGuesses = [];
  highguess = 'reset';
  lowguess = 'reset';
  document.querySelector('.score').textContent = 20;
  document.querySelector('.secretnumber').textContent = '?';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.prevguess').textContent = '';
  document.querySelector('.lowguess').textContent = '';
  document.querySelector('.highguess').textContent = '';
  document.querySelector('.message').textContent =
    'Game Restart! Start guessing! 🤔';
  document.querySelector('.guess').value = '';
  secretNumber = calculateSecretNumber();
  document.querySelector('.number').style.backgroundImage =
    'linear-gradient(to top, rgb(58, 41, 70) 0%, #a6c1ee 100%)';
}

// Side Functions
// Open the popup modal
function popupModal(modaltype) {
  modaltype.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// Close the popup modal
function closeModal() {
  for (let i = 0; i < modal.length; i++) {
    if (!modal[i].classList.contains('hidden')) {
      modal[i].classList.add('hidden');
    }
  }
  overlay.classList.add('hidden');
}

// Main game logic
document.querySelector('.check').addEventListener('click', function () {
  guess = Number(document.querySelector('.guess').value);

  // Score is zero - restart the game first
  if (score === 0) {
    displayMessage('First restart the game');
    return;
  }
  if (1 <= guess && guess <= 50) {
    // Player has guessed the secret number
    if (guess === secretNumber) {
      displayMessage('🥳 Victory!');
      if (score > highscore) {
        highscore = score;
        setHighscore(highscore);
      } else {
        document.querySelectorAll('.highscore').forEach(div => {
          div.textContent = highscore;
        });
      }
      popupModal(modalwin);
      document.querySelectorAll('.score').forEach(div => {
        div.textContent = score;
      });
      document.querySelector('.secretnumber').textContent = secretNumber;
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.number').style.backgroundImage =
        'linear-gradient(to top, #068031 0%, #0df15d 100%)';
    }
    // Wrong guess
    else if (score > 1) {
      if (guess !== secretNumber) {
        // Repeated guess
        if (previousGuesses.includes(guess)) {
          penaltyScore('🚨 You already gave that number! -2 points!');
          addGuess(guess);
          if (score <= 0) gameOver();
        } else {
          // valid guess
          displayMessage(guess > secretNumber ? '⏬ Lower!' : '⏫ Higher!');
          setScore();
          addGuess(guess);
          // Lowest guess
          if (
            guess < lowguess ||
            typeof lowguess === 'undefined' ||
            lowguess === 'reset'
          ) {
            lowguess = guess;
            document.querySelector('.lowguess').textContent = lowguess;
          }
          // highest guess
          if (
            guess > highguess ||
            typeof highguess === 'undefined' ||
            highguess === 'reset'
          ) {
            highguess = guess;
            document.querySelector('.highguess').textContent = highguess;
          }
        }
      }
    }
    // Game over
    else {
      gameOver();
    }
  }
  // Not a valid number guess
  else {
    penaltyScore('🚨 Not a valid number! -2 points!');
  }
});

/* Exiting the modals */

btnCloseModal.forEach(modal => {
  modal.addEventListener('click', closeModal);
});
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  for (let i = 0; i < modal.length; i++) {
    if (e.key === 'Escape' && !modal[i].classList.contains('hidden')) {
      closeModal();
    }
  }
});

// Opening info modal
document.querySelector('.info').addEventListener('click', function () {
  popupModal(modalinfo);
});

// Restart the game
document.querySelector('.restart').addEventListener('click', function () {
  restartGame();
});
