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
// --------------- CONSTANTS --------------- \\
// ----- TOTAL CASH DISPLAY ----- \\
const CASH_DISPLAY_TEXT_SIZE = 60;

// ----- BETTING SLIDER ----- \\
const BET_SLIDER_INCREMENT = 1;
const MINIMUM_BET = 1;

// ----- MONEY MULTIPLIER ----- \\
const MONEY_MULTIPLIER = 1.25;
const MULTIPLIER_DISPLAY_TEXT_SIZE = 40;

// ----- TABLE GENERATION ----- \\
const TABLE_SQUARE_SIZE = 135;

// ----- LOSS AND REWARD FROM GAMBLING ----- \\
const MONEY_LOSS = 0;
const REWARD = 1;


//  -   -   -   -   -   -   -   -   -   -   -   - 


// ----- GAME STATUS ----- \\
let gameStatus = "start";


// ----- MOUSE ----- \\
let mouseXpos;
let mouseYpos;


// ----- SCREEN CENTERS ----- \\
let screenCenterx;
let screenCentery;


// ----- COLOURS ----- \\
let casinoRedBackground = "#B30000";
let casinoGoldTable = "#EFBF04";
let textColour = "black";


// ----- TITLE SCREEN ----- \\
let titleSize;
let subTitleSize;
let titleText = "BIG VON'S CASINO";
let subTitleText = "All $$$ goes straight to Vivaan Jalla-Dhar (no refunds)";
let font;


// ----- MAKE BETS SCREEN ----- \\
let cash = 100;
let cashDisplay;

// minimum and maximum betting amount
let maximumBet = cash;

// slider
let betSlider;
let betText;
let betSliderSize;
let betSliderxpos;

// button
let betPlaced;


// ----- GAMBLING ----- \\
// table generation
let tableRows;
let tableCols;
let grid;
let tableXpos;
let tableYpos;

// multiplier
let moneyMultiplierValue = MONEY_MULTIPLIER;
let multiplierDisplay;

// prize
let mysteryBox;
let prize;
let prizeCollectedSound;



// ---------- OBJECT NOTATION ---------- \\

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

// -------------------------------------------------------------------



// ------------------------- 1 TIME FUNCTIONS ------------------------ \\
function preload(){
  mysteryBox = loadImage('mystery_box.png');
  font = loadFont("AmericanCaptain-MdEY.otf");
  prize = loadImage("money(prize).jpg");
  prizeCollectedSound = loadSound("YAHOO SOUND EFFECT (MARIO).mp3");
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
  // for vertical screens
  if (width < height) {
    titleSize = width/6;
  }
  subTitleSize = (width + height) / 350;

  // screen centers
  screenCenterx = width/2;
  screenCentery = height/2;

  // ----- START SCREEN BUTTON ----- \\
  // dimensions
  startScreenButton.width = width/8;
  startScreenButton.height = 30;

  // position
  startScreenButton.xpos = screenCenterx - startScreenButton.width/2;
  startScreenButton.ypos = height * (4/5);
  // -   -   -   -   -   -   -   -   -   -

  // bet slider
  betSliderSize = width / 3;
  betSliderxpos = screenCenterx-betSliderSize/2;
  
  // ----- BEGIN GAMBLING BUTTON ----- \\
  // dimension
  beginGambling.width = width/6;
  beginGambling.height = 60;
  
  // position
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
    showMultiplier();
  }
}
// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   - \\



// ---------- "start" Game Status ----------\\
function startScreen(){
  textAlign(CENTER, CENTER);
  textSize(titleSize);
  fill(textColour);
  textFont(font);
  text(titleText, width/2, height * (2/5));
  textSize(subTitleSize);
  text(subTitleText, width/2, height * (3/5));
}


// ----- "start" >>> "make bets" Transition ----- \\
function makeBetsTransition(){
  gameStatus = "make bets";
  startScreenButton.button.hide();
  betSlider.show();
  beginGambling.button.show();
}

 

// ---------- "make bets" Game Status ---------- \\
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



// ----- "make bets" >>> "gambling" Transition ----- \\
function summonGamblingTable() {
  gameStatus = "gambling";
  betSlider.hide();
  beginGambling.button.hide();
}



// ---------- "gambling" Game Status ---------- \\
function makeTable() {
  mathFlooringTable();

  let totalGridWidth = tableCols * TABLE_SQUARE_SIZE;
  let totalGridHeight = tableRows * TABLE_SQUARE_SIZE;

  // 2. Find the starting point to center it
  let offsetX = (width - totalGridWidth) / 2;
  let offsetY = (height - totalGridHeight) / 2;

  for (let i = 0; i < tableRows; i++) {
    for (let j = 0; j < tableCols; j++) { 
      fill(casinoGoldTable);

      
      tableXpos = offsetX + j * TABLE_SQUARE_SIZE;
      tableYpos = offsetY + i * TABLE_SQUARE_SIZE;

      square(tableXpos, tableYpos, TABLE_SQUARE_SIZE);
      image(mysteryBox, tableXpos, tableYpos, TABLE_SQUARE_SIZE, TABLE_SQUARE_SIZE);
    }
  }
}



function showMultiplier() {
  multiplierDisplay = `x${moneyMultiplierValue}`;
  textSize(MULTIPLIER_DISPLAY_TEXT_SIZE);
  fill("black");
  text(multiplierDisplay, width - MULTIPLIER_DISPLAY_TEXT_SIZE, height - MULTIPLIER_DISPLAY_TEXT_SIZE);
}



function mathFlooringTable() {
  tableCols = Math.floor((width - margin * 2) / TABLE_SQUARE_SIZE);
  tableRows = Math.floor((height - margin * 2) / TABLE_SQUARE_SIZE);
}


function mathFlooringMouse() {
  mouseXpos = Math.floor(mouseX/TABLE_SQUARE_SIZE);
  mouseYpos = Math.floor(mouseY/TABLE_SQUARE_SIZE);
}



function mousePressed() {
  mathFlooringMouse();
  revealMysteryBox(mouseXpos, mouseYpos);
}



function revealMysteryBox(mouseXpos, mouseYpos) {
  if (mouseXpos >= 0 && mouseXpos < tableCols && mouseYpos >= 0 && mouseYpos < tableRows) {
    if (grid[y][x] === REWARD) {

      moneyMultiplierValue *= MONEY_MULTIPLIER;
    }
    else if (grid[y][x] === MONEY_LOSS) {
      moneyMultiplierValue *= MONEY_MULTIPLIER;
      gameOverJumpScare();
    }
  }


}



// ----- When Player Clicks Wrong Box ----- \\
function gameOverJumpScare() {
  
}




