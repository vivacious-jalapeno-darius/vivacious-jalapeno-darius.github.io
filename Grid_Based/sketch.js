// --------------------------------------------------------------------------------
// Grid Based Assignment
// Gambling
// Vivaan Jalla-Dhar
// April 12, 2026
//
// Extra for Experts:
// - ...
// --------------------------------------------------------------------------------


// ------------------------- VARIABLES ------------------------- \\
const TABLE_SQUARE_SIZE = 61;

let margin = TABLE_SQUARE_SIZE / 2;

let tableRows;
let tableCols;

let xpos;
let ypos;

let mysteryBox;
// ----- COLOURS -----
let casinoRedBackground = "#B30000";
let casinoGoldTable = "#EFBF04";
// ------------------------------------------------------------- \\




// ------------------------- 1 TIME FUNCTIONS ------------------------ \\
function preload(){
  mysteryBox = loadImage('mystery_box.png');
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(casinoRedBackground);
  makeTable();
}



function makeTable() {
  mathFlooring();

  for (let i = 0; i < tableRows; i++) {
    for (let j = 0; j < tableCols; j++) { 
      fill(casinoGoldTable);

      xpos = margin + j * TABLE_SQUARE_SIZE;
      ypos = margin + i * TABLE_SQUARE_SIZE;

      square(xpos, ypos, TABLE_SQUARE_SIZE);

      image(mysteryBox, xpos, ypos, TABLE_SQUARE_SIZE, TABLE_SQUARE_SIZE);
    }
  }
}



function mathFlooring() {
  tableCols = Math.floor((width - margin * 2) / TABLE_SQUARE_SIZE);
  tableRows = Math.floor((height - margin * 2) / TABLE_SQUARE_SIZE);
}

// ------------------------- LOOPING FUNCTIONS -------------------------\\
function draw() {
  
}



