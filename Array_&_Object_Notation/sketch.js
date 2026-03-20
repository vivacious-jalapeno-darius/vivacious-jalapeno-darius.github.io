// --------------------------------------------------------------------------------
// Array & Object Notation
// Vivaan Jalla-Dhar
// March 13, 2026
// Extra for experts:
//      Adding an user input for players to adjust the gravity scale from 1-10
//      (the game will translate their input by multiplying it by 0.1 (to make it into a gravity easy to play with)).
//      I will also be adding a score for every time the bird passes a hole/gap/space between the pipes/whatever it's called,
//      this will be in form of a text at the top middle
// --------------------------------------------------------------------------------

// -------------------- VARIABLES -------------------- \\
let playerImg;
let bkgImage;
let birdStartingPoint;

// ----- GRAVITY VARIABLES ----- \\
let gravityInput;
let gravityScale = 0.5;
let gravityInputTextBoxWidth = 300;
let gravityInputTextBoxHeight = 50;
let gravityScaleConfirmed = false;
let gravityOutOfBounds;
let textboxInstructionText;

// --- GAME STATUS VARIABLES --- \\
let beginGame = false;
let gameOverText;
let dead = false;
let gameOverTextSize = 200;

// --- PIPE VARIABLES --- \\
let pipesWidth = 200;
let pipesSpeed = 5;
let pipes = [];
let bottomPipeHeight;
let birdXCoords;
let pipeGap;
let minTopHeight;
let maxTopHeight;
// - array variables -
let pipeColour = "lime";
let randTopHeight;
let bottomPipeStartingPoint;




// - SCORE - \\
let score = 0;


// -------------------- OBJECT NOTATION -------------------- \\
let bird = {
  ypos: 500,    // starting y position (changes throughout the game)
  xpos: 3/8,   // CONSTANT variable
  thick: 70,  // bird width
  tall: 50,  // bird height
  dy: 0,    // bird acceleration (y-axis)
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
  gravityInput.size(gravityInputTextBoxWidth, gravityInputTextBoxHeight);
  gravityInput.position(windowWidth/2 - gravityInputTextBoxWidth/2, windowHeight/2 - gravityInputTextBoxHeight); 
}



// -------------------- LOOPING FUNCTIONS -------------------- \\
function draw() {
  if (!dead) {
    background(bkgImage);
    jumpAction();
    createPlayer();
    textBoxCreation();
    pipeGenerator();
  }
}


// ---------- KEY INPUTS ---------- \\
function keyPressed() {
  // when the 'spacebar' is pressed, then the bird jumps
  if (keyCode === 32) { // 'spacebar'
    bird.dy = -10;
    if (!beginGame && gravityScaleConfirmed){
      beginGame = !beginGame;
    }
  }

  if (keyCode === 13 && !beginGame) {
    gravityValueChecker();
    if (!gravityOutOfBounds){
      gravityInput.hide();
      gravityScale = gravityInput.value() * 0.1;
      if (!gravityScaleConfirmed) {
        gravityScaleConfirmed = !gravityScaleConfirmed;
      }
    }
  }
}


// --------------- GRAVITY --------------- \\
// ----- GRAVITY INPUT TEXTBOX ----- \\
function textBoxCreation() {
  if (!gravityScaleConfirmed) {
    fill("white");
    textboxInstructionText = "Input a number between 1-10 to set gravity (hint. more = eaiser)";
    textSize(30);
    textAlign(CENTER);
    text(textboxInstructionText, windowWidth/2, windowHeight/2 - gravityInputTextBoxHeight * 2);
  }
}


// makes sure that the number the player inputs is only between 1 and 10. 
// Inputing a number out of the range won't allow the game move on.
// This is to make sure the player has a stable gameplay experience
function gravityValueChecker() {
  if (gravityInput.value() <= 0 || gravityInput.value() > 10) {
    gravityOutOfBounds = true;
  }
  else {
    gravityOutOfBounds = false;
  }
}


// ---------- BIRD ---------- \\
function createPlayer() {
  image(playerImg, windowWidth*bird.xpos, bird.ypos, bird.thick, bird.tall);
}


// ----- BIRD JUMP PHYSICS ----- \\
function jumpAction() {
  if (beginGame) { // if the player has pressed 'space' for the first time, then only the game can begin
    // ------ GRAVITY ------- \\
    bird.dy += gravityScale;
    bird.ypos += bird.dy;
    // makes sure that the bird doesn't go above the screen
    if (bird.ypos < 0) {
      bird.ypos = 0;
      bird.dy = 0;
    }

    // makes sure that the bird doesn't go below the screen
    // if it does, the bird dies
    if (bird.ypos + bird.tall > height) {
      bird.ypos = height - bird.tall;
      bird.dy = 0;
      dead = true;
      gameOver();
      playerImg.hide();
    }
  }
}



// --------------- PIPES --------------- \\
function pipeGenerator() {
  if (beginGame) {
    pipeGap = height / 4;
    minTopHeight = height / 32;
    maxTopHeight = height - pipeGap - minTopHeight;
    // if there is no pipe on screen or the last pipe is 3x the width's distance to the right end of the screen,
    // then it makes a new pipe
    if (pipes.length === 0 || pipes[pipes.length - 1].x < width - pipesWidth * 3) {
      randTopHeight = random(minTopHeight, maxTopHeight); 
      // array
      pipes.push({
        x: width,
        topHeight: randTopHeight,
        scored: false
      });
    }
    scoreFunction();
    scoreDisplay();
    
  }
}


function scoreFunction() {
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].x -= pipesSpeed; // moves pipe across the screen (from right to left)

    fill(pipeColour);
    rect(pipes[i].x, 0, pipesWidth, pipes[i].topHeight); // pipe's charaterics 

    bottomPipeStartingPoint = pipes[i].topHeight + pipeGap;
    bottomPipeHeight = height - bottomPipeStartingPoint;
    rect(pipes[i].x, bottomPipeStartingPoint, pipesWidth, bottomPipeHeight);

    birdXCoords = windowWidth * bird.xpos;

    // checks when the bird passes the pipe gap
    // when it does then it adds a point
    if (birdXCoords + bird.thick > pipes[i].x && birdXCoords < pipes[i].x + pipesWidth) {
      if (bird.ypos < pipes[i].topHeight || bird.ypos + bird.tall > bottomPipeStartingPoint) {
        dead = true;
        gameOver();
      }
    }
    // birdXCoords is the bird's x coordinate (#px) and bird.xpos is the location of the bird reletive to the screen (3/8 of windowWidth)
    if (!pipes[i].scored && birdXCoords > pipes[i].x + pipesWidth) {
      score++;
      pipes[i].scored = true;
    }

    if (pipes[i].x < -pipesWidth) {
      pipes.splice(i, 1);
    }
  }
}


function scoreDisplay() {
  // game score
  fill("white");
  textSize(50);
  textAlign(CENTER);
  text(score, width / 2, 100);
}



// --------------- GAME OVER --------------- \\
function gameOver() {
  pipes = []; // removes all pipes when dead
  background("silver");
  fill("red");
  gameOverText = "GAME OVER";
  textSize(gameOverTextSize);
  textAlign(CENTER);
  text(gameOverText, windowWidth/2, windowHeight/2 + gameOverTextSize/2);
}
