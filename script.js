// Basic Tic-Tac-Toe logic
document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  let board = Array(9).fill(null); // null, 'X' or 'O'
  let currentPlayer = 'X';
  let running = true;

  const winLines = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  function updateStatus() {
    if (!running) return;
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }

  function handleClick(e) {
    const idx = Number(e.currentTarget.dataset.index);
    if (!running || board[idx]) return;
    makeMove(idx, currentPlayer);
    if (checkWin(currentPlayer)) {
      endGame(`${currentPlayer} wins!`);
    } else if (board.every(cell => cell !== null)) {
      endGame("It's a draw.");
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }
  }

  function makeMove(index, player) {
    board[index] = player;
    const el = cells[index];
    el.textContent = player;
    el.classList.add(player.toLowerCase());
    el.disabled = true;
  }

  function checkWin(player) {
    for (const [a,b,c] of winLines) {
      if (board[a] === player && board[b] === player && board[c] === player) {
        // highlight winning cells
        cells[a].classList.add('winner');
        cells[b].classList.add('winner');
        cells[c].classList.add('winner');
        return true;
      }
    }
    return false;
  }

  function endGame(message) {
    running = false;
    statusEl.textContent = message;
    // disable remaining cells
    cells.forEach(cell => cell.disabled = true);
  }

  function restart() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    running = true;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.className = 'cell';
      cell.disabled = false;
    });
    updateStatus();
  }

  // wire up listeners
  cells.forEach(cell => cell.addEventListener('click', handleClick));
  restartBtn.addEventListener('click', restart);

  // initial status
  updateStatus();
});