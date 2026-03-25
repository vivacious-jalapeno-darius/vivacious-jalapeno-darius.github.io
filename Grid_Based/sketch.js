// --------------------------------------------------------------------------------
// Grid Based Assignment
// Gambling
// Vivaan Jalla-Dhar
// April 12, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// --------------------------------------------------------------------------------


// -------------------- VARIABLES -------------------- \\
const TABLE_SQUARE_SIZE = 67;

let tableLeftMargin;
let tableRightMargin;
let tableTopMargin;
let tableBottomMargin;

let tableRows;
let tableCols;
let casinoRed = "#B30000";




function setup() {
  createCanvas(windowWidth, windowHeight);
  background(casinoRed);
  tableRows = Math.floor(width/TABLE_SQUARE_SIZE);
  tableCols = Math.floor(height/TABLE_SQUARE_SIZE);
  makeTable(tableRows, tableCols);
}


function makeTable(tableRows, tableCols) {
  tableLeftMargin = width/10;
  tableTopMargin = height/10;
  tableRightMargin = width-tableLeftMargin;
  tableBottomMargin = height-tableTopMargin


  for (let y = tableTopMargin; y < tableBottomMargin; y++){
    
  }
}


function draw() {
  
  
}




