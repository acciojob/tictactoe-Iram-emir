//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    const playerForm = document.getElementById("player-form");
    const gameSection = document.getElementById("game");
    const messageDiv = document.querySelector(".message");
    const submitBtn = document.getElementById("submit");
    const resetBtn = document.getElementById("reset");
    const cells = document.querySelectorAll(".cell");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "X";
    let currentName = "";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = false;

    // Winning Combinations
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    // Start the game
    submitBtn.addEventListener("click", () => {
        player1 = document.getElementById("player-1").value.trim();
        player2 = document.getElementById("player-2").value.trim();

        if (player1 === "" || player2 === "") {
            alert("Please enter names for both players.");
            return;
        }

        currentName = player1;
        gameActive = true;

        playerForm.classList.add("hidden");
        gameSection.classList.remove("hidden");
        updateMessage();
    });

    // Click event for cells
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (!gameActive) return;
            const cellIndex = parseInt(cell.id) - 1;

            if (board[cellIndex] !== "") return;

            board[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWin()) {
                messageDiv.textContent = `${currentName}, congratulations! You won! 🎉`;
                gameActive = false;
                resetBtn.style.display = "block";
                return;
            }

            if (board.every(cell => cell !== "")) {
                messageDiv.textContent = "It's a draw!";
                gameActive = false;
                resetBtn.style.display = "block";
                return;
            }

            switchTurn();
        });
    });

    // Reset Game
    resetBtn.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        currentName = player1;
        updateMessage();

        cells.forEach(cell => (cell.textContent = ""));
        resetBtn.style.display = "none";
    });

    // Switch Turn
    function switchTurn() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentName = currentPlayer === "X" ? player1 : player2;
        updateMessage();
    }

    // Update message
    function updateMessage() {
        messageDiv.textContent = `${currentName}, you're up!`;
    }

    // Check Win
    function checkWin() {
        return winConditions.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }
});

