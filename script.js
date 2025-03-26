//your JS code here. If required.
// script.js

document.getElementById("submit").addEventListener("click", function () {
    let player1 = document.getElementById("player-1").value;
    let player2 = document.getElementById("player-2").value;

    if (!player1 || !player2) {
        alert("Please enter names for both players!");
        return;
    }

    // Store players and start the game
    startGame(player1, player2);
});

function startGame(player1, player2) {
    document.getElementById("player-input").style.display = "none";
    document.getElementById("game").style.display = "block";

    let currentPlayer = player1;
    let currentSymbol = "X";
    let board = ["", "", "", "", "", "", "", "", ""]; // Empty board
    let messageDiv = document.querySelector(".message");

    messageDiv.textContent = `${currentPlayer}, you're up!`;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
        cell.addEventListener("click", function () {
            if (!cell.textContent) {
                let cellId = parseInt(cell.id) - 1;
                board[cellId] = currentSymbol;
                cell.textContent = currentSymbol;
                cell.classList.add("taken");

                if (checkWinner(board, currentSymbol)) {
                    messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
                    disableBoard();
                    return;
                }

                if (board.every(cell => cell !== "")) {
                    messageDiv.textContent = "It's a tie!";
                    return;
                }

                // Switch Player
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                currentSymbol = currentSymbol === "X" ? "O" : "X";
                messageDiv.textContent = `${currentPlayer}, you're up!`;
            }
        });
    });
}

// Function to check the winner
function checkWinner(board, symbol) {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningPatterns.some(pattern =>
        pattern.every(index => board[index] === symbol)
    );
}

// Disable board after the game is over
function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.add("taken");
    });
}
