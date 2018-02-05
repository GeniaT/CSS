// tetris infos https://fr.wikipedia.org/wiki/Tetris
// to do:
// Create an Form function with all 7 fonctions for each form in it.
// create an update function in Form function and when pushing each key (up,down,left,right),
//      run the update function in animate after having modified variables.
// check if x after rotation is < or > the limits, if yet - stop rotation
// create other forms functions
// define impact logics
// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Original Tetris format is 10 x 22 squares, I keep this ratio.
canvas.width = 200; //smallest square = 20 x 20
canvas.height = 440;
let keyCode;
let currentBloc = []; //created to for clear
let currentLocation = [60,0];
let currentRotation = 0;
//different forms definition
let o = [currentLocation[0], currentLocation[1], 40, 40];
let i = [[currentLocation[0], currentLocation[1], 80, 20], [currentLocation[0], currentLocation[1], 20, 80]];
let allForms = [o, i];
let randomNr;
//forms definition
function Bloc(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  //Make the params from the current form available in outter scope for clear
  currentBloc[0] = this.x;
  currentBloc[1] = this.y;
  currentBloc[2] = this.width;
  currentBloc[3] = this.height;
  this.draw = function() {
    c.fillStyle = 'rgba(255,0,0,0.5)';
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  this.draw();
}

function Long (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  //Make the params from the current form available in outter scope
  currentBloc[0] = this.x;
  currentBloc[1] = this.y;
  currentBloc[2] = this.width;
  currentBloc[3] = this.height;

  this.draw = function() {
    c.fillStyle = 'rgba(255,0,0,0.5)';
    c.fillRect(this.x, this.y, this.width, this.height);
  }
  this.draw();
}

function randomFormCreate() { //to run only on init or new form, not at move or rotations
  randomNr = Math.floor(Math.random() * allForms.length);
  console.log(randomNr);

  switch (randomNr) {
    case 0:
      new Bloc(60, 0, 40, 40);
      break;
    case 1:
      new Long(60, 0, 80, 20);
      break;
    // case 2:
    // case 3:
    // case 4:
    // case 5:
    // case 6:
  }
}
function moveForm() { //move by recreation on other position
  switch (randomNr) {
    case 0:
      new Bloc(currentBloc[0],currentBloc[1], 40, 40);
      break;
    case 1:
      new Long(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3]);
      break;
  }
}
function clear() {
  c.clearRect(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3]);
}
function formFalls() {
    setInterval(function(){
      clear();
      currentBloc[1] += 20;
      moveForm();
      currentLocation = [currentLocation[0],currentLocation[1] + 20];
    }, 1000);
}
//events
document.onkeydown = function(e) {
  i = [[currentLocation[0], currentLocation[1], 80, 20], [currentLocation[0], currentLocation[1], 20, 80]];
  i[currentRotation] = [currentLocation[0], currentLocation[1], 80, 20];

  switch (e.keyCode) {
      case 37:
          console.log('left');
          if (currentBloc[0] >= 20) {
            clear();
            currentBloc[0] -= 20;
            moveForm();
            currentLocation = [currentLocation[0] - 20,currentLocation[1]];
          }
          break;
      case 38:
          console.log('up');

          if (currentRotation < allForms[randomNr].length - 1) {currentRotation++} else {currentRotation = 0}

          switch (randomNr) {
            case 1:
              clear();
              new Long(i[currentRotation][0],i[currentRotation][1],i[currentRotation][2],i[currentRotation][3]);
              break;
            case 2:
              break;
            case 3:
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              break;
          }
          break;
      case 39:
          console.log('right');
          if (currentBloc[0] + currentBloc[2] <= 180) {
            clear();
            currentBloc[0] += 20;
            moveForm();
            currentLocation = [currentLocation[0] + 20,currentLocation[1]];
          }
          break;
      case 40:
          console.log('down');
          if (currentBloc[1] + currentBloc[3] <= 420) {
            clear();
            currentBloc[1] += 20;
            moveForm();
            currentLocation = [currentLocation[0],currentLocation[1] + 20]; //update of var for next move
          }
          break;
    }
};


function init() {
  randomFormCreate();
}
function animate() {
  requestAnimationFrame(animate);
  if (currentBloc[1] + currentBloc[3] >= 440) {
    currentLocation = [60,0]; //current loc reset
    // If we touch the bottom, generate new figure
    randomFormCreate();
  }
}

init()
animate()
formFalls()
