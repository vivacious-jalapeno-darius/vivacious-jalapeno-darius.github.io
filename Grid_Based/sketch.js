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
const TABLE_SQUARE_SIZE = 135;

let margin = TABLE_SQUARE_SIZE / 2;

let tableRows;
let tableCols;

let xpos;
let ypos;

let mysteryBox;

let titleSize;
let titleText = "";
// ----- COLOURS -----
let casinoRedBackground = "#B30000";
let casinoGoldTable = "#EFBF04";
let textColour = "black";
// ----- GAME STATUS -----
let gameStatus = "gambling";
// ------------------------------------------------------------- \\




// ------------------------- 1 TIME FUNCTIONS ------------------------ \\
function preload(){
  mysteryBox = loadImage('mystery_box.png');
}



function setup() {
  titleSize = (width + height) / 10;
  createCanvas(windowWidth, windowHeight);
  background(casinoRedBackground);
  if (gameStatus === "start") {
    startScreen();
  }
  else if (gameStatus === "make bets") {

  }
  else if (gameStatus === "gambling") {
    makeTable();
  }
}



function startScreen() {
  textAlign(CENTER, CENTER);
  textSize(titleSize);
  fill(textColour);
  text();
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



