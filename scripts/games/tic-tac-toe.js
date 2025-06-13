export function initTicTacToe(container) {
    const board = container.querySelector(".ttt-board");
    const cells = board.querySelectorAll(".ttt-cell");
    const statusDiv = container.querySelector(".ttt-status");
    const restartBtn = container.querySelector(".ttt-restart");
    const scoreX = container.querySelector(".ttt-score-x");
    const scoreO = container.querySelector(".ttt-score-o");
    let currentPlayer = "X";
    let gameState = Array(9).fill(null);
    let gameActive = true;
    let score = { X: 0, O: 0 };
    let rounds = 0;
    let bo3Winner = null;
  
    function updateScoreboard() {
      scoreX.textContent = `X: ${score.X}`;
      scoreO.textContent = `O: ${score.O}`;
    }
  
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
          return { winner: gameState[a], pattern };
        }
      }
      return gameState.includes(null) ? null : { winner: "draw" };
    }
  
    function highlightWin(pattern, winner) {
      if (winner === "draw") {
        cells.forEach((cell) => cell.classList.add("draw"));
      } else {
        pattern.forEach((idx) => {
          cells[idx].classList.add(winner === "X" ? "win-x" : "win-o");
        });
      }
    }
  
    function clearHighlights() {
      cells.forEach((cell) => {
        cell.classList.remove("win-x", "win-o", "draw");
      });
    }
  
    function handleCellClick(e) {
      const idx = +e.target.dataset.cell;
      if (!gameActive || gameState[idx]) return;
      gameState[idx] = currentPlayer;
      e.target.textContent = currentPlayer;
      const result = checkWinner();
      if (result) {
        gameActive = false;
        if (result.winner === "draw") {
          statusDiv.textContent = "It's a draw!";
          highlightWin([], "draw");
          restartBtn.textContent = "Next Round";
        } else {
          score[result.winner]++;
          updateScoreboard();
          highlightWin(result.pattern, result.winner);
          rounds++;
          if (score[result.winner] === 2) {
            bo3Winner = result.winner;
            cells.forEach((cell) => {
              bo3Winner === "X" ? cell.classList.add("win-x") : cell.classList.add("win-o");
            });
            statusDiv.textContent = `${result.winner} wins the game!`;
            restartBtn.textContent = "New Game";
          } else {
            statusDiv.textContent = `${result.winner} wins!`;
            restartBtn.textContent = "Next Round";
          }
        }
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDiv.textContent = `Turn: ${currentPlayer}`;
      }
    }
  
    function restartGame() {
      if (restartBtn.textContent === "Restart Game") {
        score = { X: 0, O: 0 };
        rounds = 0;
        bo3Winner = null;
        updateScoreboard();
        restartBtn.textContent = "Restart";
      }
      statusDiv.textContent = `Turn: ${currentPlayer}`;
      cells.forEach((cell) => (cell.textContent = ""));
      gameState.fill(null);
      gameActive = true;
      clearHighlights();
    }
  
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
    statusDiv.textContent = `Turn: ${currentPlayer}`;
    updateScoreboard();
  }