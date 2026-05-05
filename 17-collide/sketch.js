// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  rect(width/4, height/4, width/2, height/2);
  circle(mouseX, mouseY, 100);

  hit = collideRectCircle(width/4, height/4, width/2, height/2, mouseX, mouseY, 100);

  if (hit) {
    fill("red");
  }
  else {
    fill("blue");
  }

}
