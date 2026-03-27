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

let screenCenterx;
let screenCentery;


let tableRows;
let tableCols;


let xpos;
let ypos;


let mysteryBox;


let titleSize;
let titleText = "BIG DON'S CASINO";
let subTitleText = "All $$$ goes straight to Vivaan Jalla-Dhar (no refunds)";
let font;


let startScreenButton;
let startScreenButtonText = "BEGIN";
let startScreenButtonWidth;
let startScreenButtonHeight;
let startScreenButtonxpos;
let startScreenButtonypos;

let makeBetsButton;


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
  createCanvas(windowWidth, windowHeight);
  restateVariables();
  startButton();
}



function restateVariables() {
  titleSize = (width + height) /10;
  subTitleSize = (width + height) / 300;

  screenCenterx = width/2;
  screenCentery = height/2;

  startScreenButtonWidth = width/8;
  startScreenButtonHeight = 30;

  startScreenButtonxpos = screenCenterx - startScreenButtonWidth/2;
  startScreenButtonypos = height * (4/5);
}

function startButton() {
  startScreenButton = createButton(startScreenButtonText);
  startScreenButton.size(startScreenButtonWidth, startScreenButtonHeight);
  startScreenButton.position(startScreenButtonxpos, startScreenButtonypos);
  startScreenButton.style('background-color', casinoGoldTable);
  startScreenButton.mousePressed(makeBetsTransition);
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
  titleScreen();
}



function titleScreen(){
  textAlign(CENTER, CENTER);
  textSize(titleSize);
  fill(textColour);
  textFont(font);
  text(titleText, width/2, height * (2/5));
  textSize(subTitleSize);
  text(subTitleText, width/2, height * (3/5));
}




function makeBetsTransition(){
  gameStatus = "gambling"; // temperary
  startScreenButton.hide();
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




