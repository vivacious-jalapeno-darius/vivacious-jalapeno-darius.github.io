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
let playerSpeed = 20;

// P1 variables
let p1x = 0;
let p1y = 0;
let p1Score = 0;
let p1ScoreBoard;

// P2 variables
let p2y = 0;
let p2Score = 0;
let p2ScoreBoard;

// ----- UI -----
let pause = false;
let options;


// ------------------------- 1 TIME FUNCTION -------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ballX = width/2;
  ballY = height/2;
  
  // ---------- Button ----------
  options = createButton("Pause")
  let buttonWidth = windowWidth/8
  options.size(buttonWidth, 20)
  options.position(windowWidth/2 - (buttonWidth/2), 10)
  options.mousePressed(togglePause);
}


// ------------------------- LOOPING FUNCTIONS -------------------------
function draw() {
  // --------- Background ---------
  background("black");
  // ------------------------------
  ballMovement();
  createPlayers();
  playerMovement();
  scoreUpdate();
}


function createPlayers() {
  // --------------------- P1 ---------------------
  rect(p1x, p1y, playerWidth, playerHeight);

  // --------------------- P2 ---------------------
  let p2x = width-playerWidth;
  rect(p2x, p2y, playerWidth, playerHeight);
}


function playerMovement() {
  if (!pause) {
    // --------------------- P1 ---------------------
    if (keyIsDown(87)) {  //w 
      p1y -= playerSpeed;
      if (p1y <= 0) {
        p1y = 0;
      }
    }
    if (keyIsDown(83)) { //s 
      p1y += playerSpeed;
      if (p1y + playerHeight >= height) {
        p1y = height - playerHeight;
      }
    }
    
    // --------------------- P2 ---------------------
    if (keyIsDown(38)) { // UP_ARROW
      p2y -= playerSpeed;
      if (p2y <= 0) {
        p2y = 0;
      }
    }
    if (keyIsDown(40)){ // DOWN_ARROW
      p2y += playerSpeed;
      if (p2y + playerHeight >= height) {
        p2y = height - playerHeight;
      }
    }
  }
}


function ballMovement() {
  fill("white");
  circle(ballX, ballY, circleDiameter);
  if (!pause) {
    ballX += dx;
    ballY += dy;
    
    let p1End = p1y + playerHeight;
    let p2End = p2y + playerHeight;

    if (ballY > height-circleRadius || ballY < circleRadius) {
      dy *= -1.0001;
    }

    // ------------- r ------------- // ------------ r (p2) ------------- // --------- l --------- // ------------ l (p1) ----------- 
    if ((ballX > width - circleRadius && (ballY >= p2y && ballY <= p2End)) || (ballX < circleRadius && (ballY >= p1y && ballY <= p1End))) {
      dx *= -1.0001;
    }

    // r
    else if (ballX > width - circleRadius) {
      ballX = width / 2;
      ballY = height / 2;
      p1Score++;
    }

    // l
    else if (ballX < circleRadius) {
      ballX = width / 2;
      ballY = height / 2;
      p2Score++;
    }
  }
}


function togglePause() {
  pause = !pause;

  if (pause) {
    options.html("Paused")
  }
  else {
    options.html("Pause")
  }
}


function scoreUpdate() {
  p1ScoreBoard = `Score: ${p1Score}`
  p2ScoreBoard = `Score: ${p2Score}`

  textSize(20)
  text(p1ScoreBoard, (windowWidth * (1/4)), 40)
  text(p2ScoreBoard, (windowWidth * (3/4)), 40)
}

