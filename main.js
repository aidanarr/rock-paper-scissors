"use strict";

// VARIABLES
const btnSelect = document.querySelector(".js_select");
const btnPlay = document.querySelector(".js_play");
const btnReset = document.querySelector(".js_reiniciar");
const message = document.querySelector(".js_message");
const moveCPU = document.querySelector(".js_puntos_cpu");
const pointsCPU = document.querySelector(".js_cpu_points");
const pointsPlayer = document.querySelector(".js_player_points");
const messageBox = document.querySelector(".message");

// JUGADA CPU

// Random num
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

// Obtener jugada
function getComputerMove() {
  let number = getRandomNumber(9);
  let cpuMove = "";

  if (number <= 3) {
    cpuMove = "piedra";
  } else if (number >= 7) {
    cpuMove = "papel";
  } else {
    cpuMove = "tijeras";
  }
  return cpuMove;
}

// COMPARAR JUGADAS

//esto es para llevar la cuenta de los puntos y las jugadas
let accPlayer = 0;
let accCPU = 0;
let jugadas = 0;

//Función para que aparezca el ganador en el mensaje
function ganador() {
  if (accPlayer === accCPU) {
    messageBox.classList.add("message_win");
    message.innerHTML = "Habéis empatado 😌";
  } else if (accPlayer > accCPU) {
    messageBox.classList.add("message_win");
    message.innerHTML = "HAS GANADO 🥳";
  } else if (accPlayer < accCPU) {
    messageBox.classList.add("message_win");
    message.innerHTML = "HAS PERDIDO 😁";
  }
}

// Evitar que se pueda seleccionar la opción placeholder
function forceSelect() {
  let player = btnSelect.value;

  if (player === "nada") {
    cpu = null;
    jugadas = 0;
  }
}

// Comparar jugadas con condicionales
function compareMoves(event) {
  event.preventDefault();
  let player = btnSelect.value;
  let cpu = getComputerMove();

  forceSelect();

  if (player === cpu) {
    message.innerHTML = "Empate";
  } else if (
    (player === "piedra" && cpu === "tijeras") ||
    (player === "papel" && cpu === "piedra") ||
    (player === "tijeras" && cpu === "papel")
  ) {
    message.innerHTML = "¡Has ganado!";
    accPlayer++;
  } else {
    message.innerHTML = "¡Has perdido!";
    accCPU++;
  }

  //esto es para llevar la cuenta de los puntos y las jugadas
  jugadas++;
  pointsPlayer.innerHTML = accPlayer;
  pointsCPU.innerHTML = accCPU;

  //esto es para que me muestre la jugada de la máquina
  moveCPU.classList.remove("hidden");
  moveCPU.innerHTML = "La máquina ha sacado " + cpu;
  // console.log("jugador " + player);
  // console.log("cpu " + cpu);

  //esto hace que termine la partida al llegar a 10 jugadas, como oculta el botón de Jugar y lo sustituye por Reiniciar, al no tener este botón preventDefault ni nada, al hacerle click se nos va a recargar la página y se reiniciará todo
  if (jugadas === 10) {
    btnPlay.classList.add("hidden");
    btnReset.classList.remove("hidden");
    ganador();
  }
}

// botón de reset
function handleReset(event) {
  event.preventDefault();
  btnReset.classList.add("hidden");
  jugadas = 0;
  accPlayer = 0;
  accCPU = 0;
  btnPlay.classList.remove("hidden");
  pointsPlayer.innerHTML = accPlayer;
  pointsCPU.innerHTML = accCPU;
  message.innerHTML = "¡Vamos a jugar!";
  messageBox.classList.remove("message_win");
  moveCPU.classList.add("hidden");
}


btnPlay.addEventListener("click", compareMoves);

btnReset.addEventListener("click", handleReset);
