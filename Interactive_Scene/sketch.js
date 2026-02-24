// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Ball variables
let ballX;
let ballY;
let dx = 5;
let dy = 4;

let circleDiameter = 30;
let circleRadius = circleDiameter/2
let r = 255;
let g = 255;
let b = 255;

let playerWidth = 10;
let playerHeight = 80;

// P1 variables
let p1x = 0;
let p1y = 0;

// P2 variable
let p2y = 0;

let speed = 10;

function setup() {
  createCanvas(400, 400);
  noStroke();
  ballX = width/2;
  ballY = height/2;
  
  
  
}





function draw() {
  // --------- Background ---------
  background("black");
  
  
  // ----------------- Ball -----------------
  ballX += dx;
  ballY += dy;

  fill("white");
  circle(ballX, ballY, circleDiameter);
  
  if (ballX > (width-circleRadius) || ballX < circleRadius) {
    dx *= -1;
  }
  
  if (ballY > (height-circleRadius) || ballY < circleRadius) {
    dy *= -1;
  }
  
  // P2 variable
  let p2x = width-playerWidth;
  
  // --------------------- P1 ---------------------
  
  rect(p1x, p1y, playerWidth, playerHeight);
  
  // --------------------- P2 ---------------------
  rect(p2x, p2y, playerWidth, playerHeight);
 
  
  
  playerMovement()
  
}

function playerMovement() {
  // --------------------- P1 ---------------------
  if (keyIsDown(87)) {  //w 
    p1y -= speed;
  }
  if (keyIsDown(83)) {//s 
    p1y += speed;
  }
  
  // --------------------- P2 ---------------------
  
  if (keyIsDown(38)) {
    p2y -= speed;
  }
  if (keyIsDown(40)){
    p2y += speed;
  }
  
  
  
}


