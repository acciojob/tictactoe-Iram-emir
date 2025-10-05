const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const gameArea = document.getElementById("game");
const playerForm = document.getElementById("player-form");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let players = {};
let currentPlayer;
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Start game
submitBtn.addEventListener("click", () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (p1 === "" || p2 === "") {
    alert("Please enter names for both players!");
    return;
  }

  players = {
    X: p1,
    O: p2
  };

  currentPlayer = "X";
  playerForm.style.display = "none";
  gameArea.style.display = "block";
  message.textContent = `${players[currentPlayer]}, you're up!`;
});

// Handle cell clicks
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin(currentPlayer)) {
      message.textContent = `${players[currentPlayer]}, congratulations you won!`;
      endGame();
    } else if (board.every(cell => cell !== "")) {
      message.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `${players[currentPlayer]}, you're up!`;
    }
  });
});

// Check win
function checkWin(player) {
  return winCombos.some(combo => {
    return combo.every(i => board[i] === player);
  });
}

// End game
function endGame() {
  cells.forEach(cell => cell.classList.add("taken"));
}
