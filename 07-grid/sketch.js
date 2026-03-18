// 2D Grid Demo (2D arrays)
// 2026 - 03 - 18


let theGrid = [[1,0,0,0],
               [1,0,1,0],
               [0,1,0,0],
               [0,0,1,1]];

const SQUARE_DIMENSION = theGrid.length();
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = height/SQUARE_DIMENSION;
  if (width >height) {
    cellSize = height/SQUARE_DIMENSION;
  }
}

function draw() {
  background(220);
  showGrid();
}


function showGrid() {
  for (let y = 0; y<4; y++) {
    for (let x = 0; x<4; x++) {
      if (theGrid[y][x] === 1) {
        fill("black");
      }
      else if (theGrid[y][x] === 0) {
        fill("white");
      }

    }
  }
}
