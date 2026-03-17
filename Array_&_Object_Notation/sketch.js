// --------------------------------------------------------------------------------
// Array & Object Notation
// Vivaan Jalla-Dhar
// March 13, 2026
// Extra for experts:
//      Adding an user input for players to adjust the gravity scale from 1-10
//      (the game will translate their input by multiplying it by 0.1(to make it into a gravity easy to play with)).
//      I will also be adding a score for every time the bird passes a hole/gap/space between the pipes/whatever it's called,
//      this will be in form of a text at the top middle
// --------------------------------------------------------------------------------

// -------------------- VARIABLES -------------------- \\
let playerImg;
let bkgImage;
let beginGame = false;
let birdStartingPoint;
let gravityInput;
let gravityScale = 0.5;
let gameOverText;
let dead = false;
let gameOverTextSize = 200;

let pipes = [];
let pipesWidth = 200;
let pipesSpeed = 10;

// -------------------- OBJECT NOTATION -------------------- \\
let bird = {
  ypos: 500,
  xpos: 3/8,
  thick: 70,
  tall: 50,
  dy: 0,
};


// -------------------- 1 TIME FUNCTIONS -------------------- \\
function preload() {
  playerImg = loadImage('flappy_bird.png');
  bkgImage = loadImage('flappy_bird_bkg.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  startingPosition();
  inputControl();
}


function startingPosition() {
  birdStartingPoint = windowHeight*(3/4);
  // starts player at 3/4 of the window height
  if (!beginGame) {
    image(playerImg, windowWidth*bird.xpos, birdStartingPoint, bird.thick, bird.tall);
    // sets the bird.ypos the VALUE of birdStartingPoint
    bird.ypos = birdStartingPoint;
  }
}


function inputControl() {
  gravityInput = createInput();
  gravityInput.position(windowHeight * (1/32), 10);
  
}



// -------------------- LOOPING FUNCTIONS -------------------- \\
function draw() {
  if (!dead) {
    background(bkgImage);
    jumpAction();
    createPlayer();
  }
}


function createPlayer() {
  image(playerImg, windowWidth*bird.xpos, bird.ypos, bird.thick, bird.tall);
}


function keyPressed() {
  // when the 'spacebar' is pressed, then the bird jumps
  if (keyCode === 32) { // 'spacebar'
    bird.dy = -10;
    if (!beginGame) {
      beginGame = !beginGame;
    }
  }

  if (keyCode === 13 && !beginGame) {
    gravityInput.hide()
    gravityScale = (gravityInput.value()) * 0.1;
  }
}


function jumpAction() {
  if (beginGame) { // if the player has pressed 'space' for the first time, then only the game can begin
    // ------ GRAVITY ------- \\
    bird.dy += gravityScale;
    bird.ypos += bird.dy;
    // makes sure that the bird doesn't go above the screen
    if (bird.ypos < 0) {
      bird.ypos = 0;
      bird.dy = 0;
      gravityScale = 0;
      dead = true;
      gameOver();
      playerImg.hide();
    }
    // makes sure that the bird doesn't go below the screen
    if (bird.ypos + bird.tall > height) {
      bird.ypos = height - bird.tall;
      bird.dy = 0;
      dead = true;
      gameOver();
      playerImg.hide();
    }
  }
}


function gameOver() {
  background("silver");
  fill("red");
  gameOverText = "GAME OVER";
  textSize(gameOverTextSize);
  text(gameOverText, windowWidth/4 - gameOverTextSize/2, windowHeight/2 + gameOverTextSize/2);
}
