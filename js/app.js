document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(grid.querySelectorAll("div"));
  const width = 10;
  const height = 20;

  // currentPosition = 4 is in div 5
  let currentPosition = 4;

  // Tetrominoes (and their four rotations)

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width * 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width + 1, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const tetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];
});

// Select random tetromino

let random = math.Floor(Math.random() * tetrominoes.length);
let currentRotation = 0;
let current = tetrominoes[random][currentRotation];

// Draw the shape
function draw() {
  current.forEach((index) =>
    squares[currentPosition + index].classList.add("block")
  );
}

// Undraw the shape, get rid of class "block"
function undraw() {
  current.forEach((index) =>
    squares[currentPosition + index].classList.remove("block")
  );
}

// Move shape down
function moveDown() {
  undraw();
  currentPosition = currentPosition += width;
  draw();
  freeze();
}

// Move right and prevent collisions from shapes moving left
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isAtRightEdge) currentPosition += 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("block")
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}
