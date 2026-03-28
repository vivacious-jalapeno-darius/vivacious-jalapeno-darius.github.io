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

let margin = TABLE_SQUARE_SIZE / 2;

let screenCenterx;
let screenCentery;


// ----- COLOURS -----
let casinoRedBackground = "#B30000";
let casinoGoldTable = "#EFBF04";
let textColour = "black";
// ----- GAME STATUS -----
let gameStatus = "start";



let cash = 100;
let cashDisplay;
const CASH_DISPLAY_TEXT_SIZE = 60;
const MINIMUM_BET = 1;
let maximumBet = cash;
const BET_SLIDER_INCREMENT = 1;
let betSlider;
let betText;
let betSliderSize;
let betSliderxpos;

let betPlaced;



let tableRows;
let tableCols;


let tableXpos;
let tableYpos;


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


let beginGambling = {
  button: undefined,
  text: "BET",
  width: undefined,
  height: undefined,
  xpos: undefined,
  ypos: undefined,
};









// ------------------------- 1 TIME FUNCTIONS ------------------------ \\
function preload(){
  mysteryBox = loadImage('mystery_box.png');
  font = loadFont("AmericanCaptain-MdEY.otf");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  restateVariables();
  startButton();
  selectingBetSlider();
  letsGoGambling();
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

  betSliderSize = width / 10;
  betSliderxpos = screenCenterx-betSliderSize/2;

  beginGambling.width = width/6;
  beginGambling.height = 60;

  beginGambling.xpos = screenCenterx - beginGambling.width/2;
  beginGambling.ypos = height * (4/5);
}



function startButton() {
  startScreenButton.button = createButton(startScreenButton.text);
  startScreenButton.button.size(startScreenButton.width, startScreenButton.height);
  startScreenButton.button.position(startScreenButton.xpos, startScreenButton.ypos);
  startScreenButton.button.style('background-color', casinoGoldTable);
  startScreenButton.button.mousePressed(makeBetsTransition);
}



function selectingBetSlider() {
  betSlider = createSlider(MINIMUM_BET, maximumBet, MINIMUM_BET, BET_SLIDER_INCREMENT);
  betSlider.size(betSliderSize);
  betSlider.position(betSliderxpos, height * (1/2));
  betSlider.hide();
}



function letsGoGambling() {
  beginGambling.button = createButton(beginGambling.text);
  beginGambling.button.size(beginGambling.width, beginGambling.height);
  beginGambling.button.position(beginGambling.xpos, beginGambling.ypos);
  beginGambling.button.style('background-color', casinoGoldTable);
  beginGambling.button.mousePressed(summonGamblingTable);
  beginGambling.button.hide();
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
// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   - \\
function startScreen(){
  textAlign(CENTER, CENTER);
  textSize(titleSize);
  fill(textColour);
  textFont(font);
  text(titleText, width/2, height * (2/5));
  textSize(subTitleSize);
  text(subTitleText, width/2, height * (3/5));
}



function makeBetsTransition(){
  gameStatus = "make bets";
  startScreenButton.button.hide();
  betSlider.show();
  beginGambling.button.show();
}

 

function makeBetsScreen() {
  cashDisplay = `$${cash}`;
  textSize(CASH_DISPLAY_TEXT_SIZE);
  fill("black");
  text(cashDisplay, screenCenterx, CASH_DISPLAY_TEXT_SIZE);

  if (MINIMUM_BET >= maximumBet) {
    maximumBet = MINIMUM_BET;
  }
  betPlaced = betSlider.value();
  text(`Bet: $${betPlaced}`, screenCenterx, height * (2/5));
}



function summonGamblingTable() {
  gameStatus = "gambling";
  betSlider.hide();
  beginGambling.button.hide();
}

function makeTable() {
  mathFlooring();

  for (let i = 0; i < tableRows; i++) {
    for (let j = 0; j < tableCols; j++) { 
      fill(casinoGoldTable);

      tableXpos = margin + j * TABLE_SQUARE_SIZE;
      tableYpos = margin + i * TABLE_SQUARE_SIZE;

      square(tableXpos, tableYpos, TABLE_SQUARE_SIZE);

      image(mysteryBox, tableXpos, tableYpos, TABLE_SQUARE_SIZE, TABLE_SQUARE_SIZE);
    }
  }
}



function mathFlooring() {
  tableCols = Math.floor((width - margin * 2) / TABLE_SQUARE_SIZE);
  tableRows = Math.floor((height - margin * 2) / TABLE_SQUARE_SIZE);
}




