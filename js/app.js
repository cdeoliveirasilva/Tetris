document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(grid.querySelectorAll("div"));
  const width = 10;
  const height = 20;
  let currentPosition = 4;

  // assign functions to keycodes
  // 37 = left, 38 = up, 39 = right, 40 = down
  function control(e) {
    if (e.KeyCode === 39) {
      moveRight();
    } else if (e.KeyCode === 38) {
      rotate();
    } else if (e.KeyCode === 37) {
      moveLeft();
    } else if (e.KeyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keyup", control);

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

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  // Select random tetromino
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let currentRotation = 0;
  let current = theTetrominoes[random][currentRotation];

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
        squares[currentPosition + index].classList.contains("block2")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  // Move left and prevent collisions from shapes moving left
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("block2")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  // Rotate tetromino
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentPosition];
    draw();
  }

  draw();
});
