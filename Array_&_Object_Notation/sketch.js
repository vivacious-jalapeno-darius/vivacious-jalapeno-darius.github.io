// --------------------------------------------------------------------------------
// Array & Object Notation
// Vivaan Jalla-Dhar
// March 13, 2026
// Extra for experts:
//      Adding an user input for players to adjust the gravity scale from 1-10
//      (the game will translate their input by multiplying it by 0.1(to make it into a gravity easy to lay with)).
//      I will also be adding a score for every time the bird passes a hole/gap/space between the pipes/whatever it's called,
//      this will be in form of a text at the top middle
// --------------------------------------------------------------------------------

// -------------------- VARIABLES -------------------- \\
let playerImg;
let bkgImage;
let beginGame = false;

// -------------------- OBJECT NOTATION -------------------- \\
let bird = {
  ypos: 500,
  xpos: 3/8,
  thick: 70,
  tall: 50,
  dy: 0,
  gravityScale: 0.3,
};


// -------------------- 1 TIME FUNCTIONS -------------------- \\
function preload() {
  playerImg = loadImage('flappy_bird.png');
  bkgImage = loadImage('flappy_bird_bkg.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}


// -------------------- LOOPING FUNCTIONS -------------------- \\
function draw() {
  background(bkgImage);
  image(playerImg, windowWidth*bird.xpos, bird.ypos, bird.thick, bird.tall);
  jumpAction();
}


function keyPressed() {
  if (keyCode === 32) { // 'spacebar'
    bird.dy = -10;
    if (!beginGame) {
      beginGame = !beginGame;
    }
  }
}


function jumpAction() {
if (beginGame) { // if the player has pressed 'space' for the first time, then only the game can begin
    bird.dy += bird.gravityScale
    bird.ypos += bird.dy;
    if (bird.ypos < 0) {
      bird.ypos = 0;
      bird.dy = 0;
    }
    if (bird.ypos + bird.tall > height) {
      bird.ypos = height - bird.tall;
      bird.dy = 0;
    }
  }
}