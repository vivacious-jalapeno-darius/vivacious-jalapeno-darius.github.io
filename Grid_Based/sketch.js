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
let titleText = "BIG DON'S CASINO";
let subTitleText = "All $$$ goes straight to Vivaan Jalla-Dhar (no refunds)";
let font;

// ----- COLOURS -----
let casinoRedBackground = "#B30000";
let casinoGoldTable = "#EFBF04";
let textColour = "black";
// ----- GAME STATUS -----
let gameStatus = "start";
// ------------------------------------------------------------- \\




// ------------------------- 1 TIME FUNCTIONS ------------------------ \\
function preload(){
  mysteryBox = loadImage('mystery_box.png');
  font = loadFont("AmericanCaptain-MdEY.otf");
}



function setup() {
  titleSize = (width + height)* 2/3;
  subTitleSize = (width + height) / 20;
  createCanvas(windowWidth, windowHeight);
}




// ------------------------- LOOPING FUNCTIONS -------------------------\\
function draw() {
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
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \\



function startScreen() {
  textAlign(CENTER, CENTER);
  textSize(titleSize);
  fill(textColour);
  textFont(font);
  text(titleText, width/2, height * (2/5));
  textSize(subTitleSize);
  text(subTitleText, width/2, height * (3/5));
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




