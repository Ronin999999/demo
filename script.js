const gameContainer = document.getElementById("game");
const endGameBtn = document.getElementById("endGame");
const rows = 5, cols = 5;
let cells = [];
let clicked = new Set();
let minePositions = [];

// Генерация мин (например 5 мин)
function generateMines(count = 5) {
  minePositions = [];
  const total = rows * cols;
  while (minePositions.length < count) {
    const idx = Math.floor(Math.random() * total);
    if (!minePositions.includes(idx)) minePositions.push(idx);
  }
}

// Создание поля
generateMines();
for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement("div");
  cell.className = 'cell';
  cell.dataset.index = i;
  cell.innerText = '☆'; // пустая звезда
  cell.addEventListener("click", () => {
    if (clicked.has(i)) return;
    clicked.add(i);
    cell.innerText = '★';
    cell.classList.add('clicked');
  });
  gameContainer.appendChild(cell);
  cells.push(cell);
}

// Завершение игры — показать мины
endGameBtn.addEventListener("click", () => {
  cells.forEach((cell, idx) => {
    if (!clicked.has(idx) && minePositions.includes(idx)) {
      cell.classList.add('mine');
      cell.innerText = '💣';
    }
  });
});