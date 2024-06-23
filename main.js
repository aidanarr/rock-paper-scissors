"use strict";

// VARIABLES
const btnSelect = document.querySelector(".js_select");
const btnPlay = document.querySelector(".js_play");
const btnReset = document.querySelector(".js_restart");
const message = document.querySelector(".js_message");
const moveCPU = document.querySelector(".js_score_cpu");
const pointsCPU = document.querySelector(".js_cpu_points");
const pointsPlayer = document.querySelector(".js_player_points");
const messageBox = document.querySelector(".message");

// CPU MOVE

// Random num
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

// Get move
function getComputerMove() {
  let number = getRandomNumber(9);
  let cpuMove = "";

  if (number <= 3) {
    cpuMove = "rock";
  } else if (number >= 7) {
    cpuMove = "paper";
  } else {
    cpuMove = "scissors";
  }
  return cpuMove;
}

// COMPARE MOVES

// player and CPU score and number of moves
let accPlayer = 0;
let accCPU = 0;
let moves = 0;

// render winner msg
function renderWinner() {
  if (accPlayer === accCPU) {
    messageBox.classList.add("message_win");
    message.innerHTML = "It's a tie! 😌";
  } else if (accPlayer > accCPU) {
    messageBox.classList.add("message_win");
    message.innerHTML = "YOU WON 🥳";
  } else if (accPlayer < accCPU) {
    messageBox.classList.add("message_win");
    message.innerHTML = "YOU LOST 😁";
  }
}

// Avoid placeholder move
function forceSelect() {
  let player = btnSelect.value;

  if (player === "empty") {
    cpu = null;
    moves = 0;
  }
}

// Compare player and CPU moves
function compareMoves(event) {
  event.preventDefault();
  let player = btnSelect.value;
  let cpu = getComputerMove();

  forceSelect();

  if (player === cpu) {
    message.innerHTML = "Tie";
  } else if (
    (player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper")
  ) {
    message.innerHTML = "You won!";
    accPlayer++;
  } else {
    message.innerHTML = "You lost!";
    accCPU++;
  }
  // score and moves account
  moves++;
  pointsPlayer.innerHTML = accPlayer;
  pointsCPU.innerHTML = accCPU;

  // render CPU move
  moveCPU.classList.remove("hidden");
  moveCPU.innerHTML = "CPU drew " + cpu;

  // end game when reaching 10 moves, hide play button and show restart button
  if (moves === 10) {
    btnPlay.classList.add("hidden");
    btnReset.classList.remove("hidden");
    renderWinner();
  }
}

// reset btn
function handleReset(event) {
  event.preventDefault();
  btnReset.classList.add("hidden");
  moves = 0;
  accPlayer = 0;
  accCPU = 0;
  btnPlay.classList.remove("hidden");
  pointsPlayer.innerHTML = accPlayer;
  pointsCPU.innerHTML = accCPU;
  message.innerHTML = "Let's play!";
  messageBox.classList.remove("message_win");
  moveCPU.classList.add("hidden");
}


btnPlay.addEventListener("click", compareMoves);

btnReset.addEventListener("click", handleReset);
