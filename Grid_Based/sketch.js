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
const REVEALED = 2;

//  -   -   -   -   -   -   -   -   -   -   -   - 


// ----- GAME STATUS ----- \\
let gameStatus = "start";


// ----- MOUSE ----- \\
let mouseXpos;
let mouseYpos;


// ----- SCREEN CENTERS / MARGIN ----- \\
let screenCenterx;
let screenCentery;
let margin = TABLE_SQUARE_SIZE/4;


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
let moneyMultiplierValue = 1;
let multiplierDisplay;

// prize
let mysteryBox;
let prize;
let prizeCollectedSound;

// dead
let deviousLaugh;



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
  deviousLaugh = loadSound("death_sfx 1.wav");
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
  else if (gameStatus === "lose") {
    flashBang();
  }
}
// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   - \\



// ---------- "start" Game Status ----------\\
function startScreen(){
  textAlign(CENTER, CENTER);
  textSize(titleSize);
  fill(textColour);
  textFont(font);
  text(titleText, screenCenterx, height * (2/5));
  textSize(subTitleSize);
  text(subTitleText, screenCenterx, height * (3/5));
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
  let roundCashValue = Math.round(cash * 100) / 100;
  cashDisplay = `$${roundCashValue}`;
  textSize(CASH_DISPLAY_TEXT_SIZE);
  fill("black");
  text(cashDisplay, screenCenterx, CASH_DISPLAY_TEXT_SIZE);

  // bet slider
  if (cash <= 1) {
    maximumBet = 1; 
  } 
  else {
    maximumBet = cash;
  }
  betPlaced = betSlider.value();
  text(`Bet: $${betPlaced}`, screenCenterx, height * (2/5));
}



// ----- "make bets" >>> "gambling" Transition ----- \\
function summonGamblingTable() {
  mathFlooringTable(); 
  grid = generateGamblingGrid(tableCols, tableRows);
  setTimeout(() => {
    gameStatus = "gambling";
    betSlider.hide();
    beginGambling.button.hide();
  }, 100); 
}



// ---------- "gambling" Game Status ---------- \\
function makeTable() {
  if (gameStatus === "gambling") {
    let totalGridWidth = tableCols * TABLE_SQUARE_SIZE;
    let totalGridHeight = tableRows * TABLE_SQUARE_SIZE;

    let offsetX = (width - totalGridWidth) / 2;
    let offsetY = (height - totalGridHeight) / 2;

    for (let i = 0; i < tableRows; i++) {
      for (let j = 0; j < tableCols; j++) { 
        fill(casinoGoldTable);
        
        let xPos = offsetX + j * TABLE_SQUARE_SIZE;
        let yPos = offsetY + i * TABLE_SQUARE_SIZE;

        square(xPos, yPos, TABLE_SQUARE_SIZE);

        if (grid[i][j] === REVEALED) {
          image(prize, xPos, yPos, TABLE_SQUARE_SIZE, TABLE_SQUARE_SIZE);
        } 
        else {
          image(mysteryBox, xPos, yPos, TABLE_SQUARE_SIZE, TABLE_SQUARE_SIZE);
        }
      }
    }
  }
}



function generateGamblingGrid(tableCols, tableRows) {
  let newGrid = [];
  for (let y = 0; y < tableRows; y++) {
    newGrid.push([]);
    for (let x = 0; x < tableCols; x++) {
      if (random(100) < 10) {
        newGrid[y].push(MONEY_LOSS); 
      } 
      else {
        newGrid[y].push(REWARD); 
      }
    }
  }
  return newGrid;
}



function showMultiplier() {
  let roundMultiplierValue = Math.round(moneyMultiplierValue * 100) / 100;
  multiplierDisplay = `x${roundMultiplierValue}`;
  textSize(MULTIPLIER_DISPLAY_TEXT_SIZE);
  fill("black");
  text(multiplierDisplay, width - MULTIPLIER_DISPLAY_TEXT_SIZE, height - MULTIPLIER_DISPLAY_TEXT_SIZE);
}



function mathFlooringTable() {
  tableCols = Math.floor((width - margin * 2) / TABLE_SQUARE_SIZE);
  tableRows = Math.floor((height - margin * 2) / TABLE_SQUARE_SIZE);
}



function mousePressed() {
  if (gameStatus === "gambling") {
    let totalGridWidth = tableCols * TABLE_SQUARE_SIZE;
    let totalGridHeight = tableRows * TABLE_SQUARE_SIZE;
    let offsetX = (width - totalGridWidth) / 2;
    let offsetY = (height - totalGridHeight) / 2;

    let clickedCol = Math.floor((mouseX - offsetX) / TABLE_SQUARE_SIZE);
    let clickedRow = Math.floor((mouseY - offsetY) / TABLE_SQUARE_SIZE);

    revealMysteryBox(clickedCol, clickedRow);
  }
}



function revealMysteryBox(mouseXpos, mouseYpos) {
  if (mouseXpos >= 0 && mouseXpos < tableCols && mouseYpos >= 0 && mouseYpos < tableRows) {
    let gridValue = grid[mouseYpos][mouseXpos];

    // math
    if (gridValue === REWARD) {
      grid[mouseYpos][mouseXpos] = REVEALED;
      
      let winnings = Math.abs(cash) * moneyMultiplierValue;
      cash += winnings;
      
      moneyMultiplierValue *= MONEY_MULTIPLIER;
      prizeCollectedSound.play();
    } 
    else if (gridValue === MONEY_LOSS) {
      let lossAmount = Math.abs(cash) * moneyMultiplierValue;
      cash -= lossAmount;
      
      gameStatus = "lose";
      lossStartTime = millis();
      deviousLaugh.play();
    }
  }
}




function flashBang() {
  background("white");
  if (millis() - lossStartTime > 3000) {
    gameStatus = "make bets";
    moneyMultiplierValue = MONEY_MULTIPLIER; 
    betSlider.show();
    beginGambling.button.show();
  }
}


