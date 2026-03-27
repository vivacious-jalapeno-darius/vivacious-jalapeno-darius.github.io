// --------------------------------------------------------------------------------
// Grid Based Assignment
// Gambling
// Vivaan Jalla-Dhar
// April 12, 2026
//
// Extra for Experts:
// - Adding touchscreen
// --------------------------------------------------------------------------------


// ------------------------- VARIABLES ------------------------- \\
const TABLE_SQUARE_SIZE = 135;

let cash = 100;
let cashDisplay;
let minimumBet = 1;
let betSliderIncrements = 1;
let betSlider;
let betText;



let margin = TABLE_SQUARE_SIZE / 2;

let screenCenterx;
let screenCentery;


let tableRows;
let tableCols;


let xpos;
let ypos;


let mysteryBox;


let titleSize;
let subTitleSize;
let titleText = "BIG VON'S CASINO";
let subTitleText = "All $$$ goes straight to Vivaan Jalla-Dhar (no refunds)";
let font;


let startScreenButton = {
  button: undefined,
  text: "BEGIN",
  width: undefined,
  height: undefined,
  xpos: undefined,
  ypos: undefined,

};


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
  subTitleSize = (width + height) / 350;

  screenCenterx = width/2;
  screenCentery = height/2;

  startScreenButton.width = width/8;
  startScreenButton.height = 30;

  startScreenButton.xpos = screenCenterx - startScreenButton.width/2;
  startScreenButton.ypos = height * (4/5);
}



function startButton() {
  startScreenButton.button = createButton(startScreenButton.text);
  startScreenButton.button.size(startScreenButton.width, startScreenButton.height);
  startScreenButton.button.position(startScreenButton.xpos, startScreenButton.ypos);
  startScreenButton.button.style('background-color', casinoGoldTable);
  startScreenButton.button.mousePressed(makeBetsTransition);
}



// ------------------------- LOOPING FUNCTIONS -------------------------\\
function draw() {
  background(casinoRedBackground);
  if (gameStatus === "start") {
    startScreen();
  }
  else if (gameStatus === "make bets") {
    makeBetsScreen();
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
  gameStatus = "make bets"; // temperary
  startScreenButton.button.hide();
}

 

function makeBetsScreen() {
  cashDisplay = `$ ${cash}`;

  textSize(40);
  fill("black");
  text(cashDisplay, screenCenterx, height *(1/5));
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




