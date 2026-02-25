// Scope Demo
// Feb 25, 2026

let number = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  stroke("white");
  noLoop();
}

function draw() {
  let number = 50;
  line(number, 0, number, height);

  for (let number = 120; number < 1000  - 20; number += 20 ) {
    line(number, 0, number, height);
  }
}
