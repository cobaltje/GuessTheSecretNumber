'use strict';

// Define the variables
let secretNumber = calculateSecretNumber();
let score = 5;
let highscore = 0;
let previousGuesses = [];
let guess;
const modal = document.querySelector('.modal');
const modalwin = document.querySelector('.modal-win');
const modalloss = document.querySelector('.modal-loss');
const modalinfo = document.querySelector('.modal-info');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

function popupModal(modaltype) {
  modaltype.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

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

  if (score === 0) {
    displayMessage('First restart the game');
    return;
  }
  if (1 <= guess && guess <= 20) {
    if (guess === secretNumber) {
      displayMessage('🥳 Victory!');
      if (score > highscore) {
        highscore = score;
        setHighscore(highscore);
      }
      popupModal(modalwin);
      overlay.classList.remove('hidden');
    } else if (score > 1) {
      if (guess !== secretNumber) {
        if (previousGuesses.includes(guess)) {
          penaltyScore('🚨 You already gave that number! -2 points!');
          addGuess(guess);
          if (score <= 0) displayMessage('Game over');
        } else {
          displayMessage(guess > secretNumber ? 'Lower!' : 'Higher!');
          setScore();
          addGuess(guess);
        }
      }
    } else {
      displayMessage('Game over');
      setScore();
    }
  } else {
    penaltyScore('🚨 Not a valid number! -2 points!');
  }
});

/* Exiting the modals */
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
