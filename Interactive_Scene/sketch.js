// ------------------------------------------------------------------------------------------
// Interactive Scene
// Vivaan Jalla-Dhar
// Feb 24, 2026
// ------------------------------------------------------------------------------------------


// ------------------------- VARIABLES -------------------------
// ----- Ball variables -----
// Physics
let dx = 7;
let dy = 7;

// Size
let ballX;
let ballY;
let circleDiameter = 30;
let circleRadius = circleDiameter/2;

// Colour
let r = 255;
let g = 255;  
let b = 255;

// ----- Player variables -----
// Player size
let playerWidth = 10;
let playerHeight = 100;

// Player speed
let speed = 20;

// P1 variables
let p1x = 0;
let p1y = 0;

// P2 variable
let p2y = 0;

// ----- UI -----
let pause = false;


// ------------------------- 1 TIME FUNCTION -------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ballX = width/2;
  ballY = height/2;
  let options = createButton("Bob")
  let buttonWidth = windowWidth/8
  options.size(buttonWidth, 20)
  options.position(windowWidth/2 - (buttonWidth/2), 10)
}


// ------------------------- LOOPING FUNCTIONS -------------------------
function draw() {
  // --------- Background ---------
  background("black");
  // ------------------------------
  ballMovement();
  createPlayers();
  playerMovement();
  
}


function createPlayers() {
  // --------------------- P1 ---------------------
  rect(p1x, p1y, playerWidth, playerHeight);

  // --------------------- P2 ---------------------
  let p2x = width-playerWidth;
  rect(p2x, p2y, playerWidth, playerHeight);
}


function playerMovement() {
  if (pause === false) {
    // --------------------- P1 ---------------------
    if (keyIsDown(87)) {  //w 
      p1y -= speed;
      if (p1y <= 0) {
        p1y = 0;
      }
    }
    if (keyIsDown(83)) { //s 
      p1y += speed;
      if (p1y + playerHeight >= height) {
        p1y = height - playerHeight;
      }
    }
    
    // --------------------- P2 ---------------------
    if (keyIsDown(38)) { // UP_ARROW
      p2y -= speed;
      if (p2y <= 0) {
        p2y = 0;
      }
    }
    if (keyIsDown(40)){ // DOWN_ARROW
      p2y += speed;
      if (p2y + playerHeight >= height) {
        p2y = height - playerHeight;
      }
    }
  }
}


function ballMovement() {
  ballX += dx;
  ballY += dy;
  fill("white");
  circle(ballX, ballY, circleDiameter);
  
  let p1End = p1y + playerHeight;
  let p2End = p2y + playerHeight;

  if (ballY > height-circleRadius || ballY < circleRadius) {
    dy *= -1;
  }
 if ((ballX > width - circleRadius || ballX < circleRadius) && (ballY >= p1y && ballY <= p1End || ballY >= p2y && ballY <= p2End)) {
    dx *= -1;
  }
  else if (ballX > width - circleRadius || ballX < circleRadius) {
    ballX = width / 2;
    ballY = height / 2;
  }
  
}
