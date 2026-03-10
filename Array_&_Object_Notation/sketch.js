// --------------------------------------------------------------------------------
// Array & Object Notation
// Vivaan Jalla-Dhar
// March 13, 2026
// --------------------------------------------------------------------------------


let img;


let bird = {
  thick: 70,
  tall: 50,
  dy: 0,
  gravityScale: 0,
};


function preload() {
  img = loadImage('flappy_bird.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  image(img, windowWidth*(3/8), windowHeight*(5/8) , bird.thick, bird.tall); 
}
