// --------------------------------------------------------------------------------
// Array & Object Notation
// Vivaan Jalla-Dhar
// March 13, 2026
// --------------------------------------------------------------------------------


let playerImg;
let bkgImage;


let bird = {
  ypos: 700,
  xpos: 3/8,
  thick: 70,
  tall: 50,
  dy: 30,
  gravityScale: 5,
};


function preload() {
  playerImg = loadImage('flappy_bird.png');
  bkgImage = loadImage('flappy_bird_bkg.png');
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
}



function draw() {
  

  background(bkgImage);
   
  jumpAction();
  image(playerImg, windowWidth*bird.xpos, bird.ypos, bird.thick, bird.tall);
}


function jumpAction() {
  if(keyIsDown(32)) {
    bird.ypos -= bird.dy;
    //for(let fall = 0, fall >= 0, fall--) {

    //}
  }


}
