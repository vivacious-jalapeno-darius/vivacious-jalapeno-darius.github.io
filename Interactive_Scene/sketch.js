// ------------------------------------------------------------------------------------------
// Interactive Scene
// Vivaan Jalla-Dhar
// Feb 24, 2026
// ------------------------------------------------------------------------------------------


// ------------------------- VARIABLES -------------------------
// ----- Ball variables -----
// Physics
let dx = 10;
let dy = 9;
// Size
let ballX;
let ballY;
let circleDiameter = 30;
let circleRadius = circleDiameter/2;
// Colour
let r = 255;
let g = 255;
let b = 255;

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


// ------------------------- 1 TIME FUNCTION -------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ballX = width/2;
  ballY = height/2;
}



// ------------------------- LOOPING FUNCTIONS -------------------------
function draw() {
  // --------- Background ---------
  background("black");
  
  // ----------------- Ball -----------------
  ballX += dx;
  ballY += dy;
  fill("white");
  circle(ballX, ballY, circleDiameter);
  
  if (ballX > width-circleRadius || ballX < circleRadius) {
    dx *= -1;
  }
  if (ballY > height-circleRadius || ballY < circleRadius) {
    dy *= -1;
  }
  
  // --------------------- P1 ---------------------
  rect(p1x, p1y, playerWidth, playerHeight);
  
  // --------------------- P2 ---------------------
  let p2x = width-playerWidth;
  rect(p2x, p2y, playerWidth, playerHeight);
  // ----------------------------------------------
  playerMovement();
  
}


function playerMovement() {
  // --------------------- P1 ---------------------
  if (keyIsDown(87)) {  //w 
    p1y -= speed;
    if (p1y <= 0) {
      p1y = 0
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


