"use strict";

// Define the variables
let secretNumber = calculateSecretNumber();
let score = 20;
let highscore;
let previousGuesses = [];
let guess;

function calculateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

// Main game logic
document.querySelector(".check").addEventListener("click", function () {
  guess = Number(document.querySelector(".guess").value);
  console.log(guess);
  if (guess === 1) {
    console.log("not a number");
  }
});
