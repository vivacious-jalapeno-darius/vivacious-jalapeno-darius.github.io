// OOP Walker
// 2026 - 04 - 14

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.color = "red";
    this.speed = 5;
  }

  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      //right 
      this.x += this.speed;
    }
  }
}



let theWalkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for (let someWalker of theWalkers) {
    someWalker.move();
    someWalker.display();
  }
}

function mousePressed() {
  let theGuy = new Walker(mouseX, mouseY);
  theGuy.color = color(random(255), random(255), random(255));
  theWalkers.push(theGuy);
}



// let kingVon;
// let eric;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   kingVon = new Walker(width * (2/5), height/2);
//   eric = new Walker(width * (3/5), height/2);
// }

// function draw() {
//   kingVon.display();
//   kingVon.move();
//   eric.colour = "blue";
//   eric.display();
//   eric.move();
  
// }

