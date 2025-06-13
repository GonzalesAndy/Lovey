export function initTicTacToe(container) {
    const board = container.querySelector(".ttt-board");
    const cells = board.querySelectorAll(".ttt-cell");
    const statusDiv = container.querySelector(".ttt-status");
    const restartBtn = container.querySelector(".ttt-restart");
    let currentPlayer = "X";
    let gameState = Array(9).fill(null);
    let gameActive = true;
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          return gameState[a];
        }
      }
      return gameState.includes(null) ? null : "draw";
    }
  
    function handleCellClick(e) {
      const idx = +e.target.dataset.cell;
      if (!gameActive || gameState[idx]) return;
      gameState[idx] = currentPlayer;
      e.target.textContent = currentPlayer;
      const winner = checkWinner();
      if (winner) {
        gameActive = false;
        statusDiv.textContent =
          winner === "draw" ? "It's a draw!" : `${winner} wins!`;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDiv.textContent = `Turn: ${currentPlayer}`;
      }
    }
  
    function restartGame() {
      gameState = Array(9).fill(null);
      currentPlayer = "X";
      gameActive = true;
      cells.forEach((cell) => (cell.textContent = ""));
      statusDiv.textContent = `Turn: ${currentPlayer}`;
    }
  
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
    statusDiv.textContent = `Turn: ${currentPlayer}`;
  }