// Perlin Noise
// 2026-03-17

let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill("black");
  let x = noise(time) * width; 
  let y = noise(time + 500) * height;
  circle(x, y, 75);

  time += 0.01;
}
