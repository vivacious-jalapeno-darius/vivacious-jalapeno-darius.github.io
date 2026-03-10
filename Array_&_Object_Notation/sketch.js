// --------------------------------------------------------------------------------
// Array & Object Notation
// Vivaan Jalla-Dhar
// March 13, 2026
// --------------------------------------------------------------------------------


let playerImg;
let bkgImage

let bird = {
  xpos: 3/8,
  ypos: 5/8,
  thick: 70,
  tall: 50,
  dy: 0,
  gravityScale: 5,
  jumpForce: 30,
};


function preload() {
  playerImg = loadImage('flappy_bird.png');
  bkgImage = loadImage('flappy_bird_bkg.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(bkgImage)
  image(playerImg, windowWidth*bird.xpos, windowHeight*bird.ypos, bird.thick, bird.tall); 
  jumpAction()
}


function jumpAction() {
  if(keyIsDown(32)) {
    bird.dy -= bird.jumpForce;

  }
}