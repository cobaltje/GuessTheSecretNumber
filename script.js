'use strict';

// Define the variables
let secretNumber = calculateSecretNumber();
let score = 20;
let highscore;
let previousGuesses = [];
let guess;
const modal = document.querySelector('.modal');
const modalwin = document.querySelector('.modal-win');
const modalloss = document.querySelector('.modal-loss');
const modalinfo = document.querySelector('.modal-info');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// Checking for highScore and setting the value - If it does not exist, set it to zero
if (localStorage.getItem('Highscore') === null) {
  localStorage.setItem('Highscore', 0);
  highscore = 0;
  document.querySelector('highscore').textContent = highscore;
} else {
  highscore = localStorage.getItem('Highscore');
  document.querySelector('.highscore').textContent = highscore;
}

// Functionlist
// Main game logic functions
// Calculate the secret number
function calculateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

// Adjust the score after a guess
function setScore() {
  score--;
  document.querySelector('.score').textContent = score;
}

// Adjust the score after a not valid guess
function penaltyScore(reason) {
  score = score - 2;
  document.querySelector('.score').textContent = score;
  displayMessage(reason);
}

// Add the guess to the guess list
function addGuess(guess) {
  previousGuesses.push(guess);
  document.querySelector('.prevguess').textContent = previousGuesses;
}

// Setting a new highscore and store it in the localstorage
function setHighscore(highscore) {
  document.querySelector('.highscore').textContent = highscore;
  localStorage.setItem('Highscore', highscore);
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Side Functions
// Open the popup modal
function popupModal(modaltype) {
  modaltype.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// Close the popup modal
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
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
      //popupModal(modalwin);
      //overlay.classList.remove('hidden');
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
