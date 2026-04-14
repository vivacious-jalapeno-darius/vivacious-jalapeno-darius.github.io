// OOP Walker
// 2026 - 04 - 14

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.speed = 5;
    this.colour = "red";
  }

  display() {
    fill(this.colour);
    stroke(this.colour);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // right
      this.x += this.speed;
    }

    else if (choice < 50) {
      // right
      this.x -= this.speed;
    }

    else if (choice < 75) {
      // right
      this.y += this.speed;
    }

    else if (choice <= 100) {
      // right
      this.y -= this.speed;
    }
  }
}


let kingVon;
let eric;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kingVon = new Walker(width * (2/5), height/2);
  eric = new Walker(width * (3/5), height/2);
}

function draw() {
  kingVon.display();
  kingVon.move();
  eric.colour = "blue";
  eric.display();
  eric.move();
  
}

