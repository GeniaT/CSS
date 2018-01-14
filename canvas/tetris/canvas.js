// tetris infos https://fr.wikipedia.org/wiki/Tetris

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
// let o = new Bloc(currentLocation[0], currentLocation[1], 40, 40);
let i = [[currentLocation[0], currentLocation[1], 80, 20], [currentLocation[0], currentLocation[1], 20, 80]];

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

//events
document.onkeydown = function(e) {
  i = [[currentLocation[0], currentLocation[1], 80, 20], [currentLocation[0], currentLocation[1], 20, 80]];
  i[currentRotation] = [currentLocation[0], currentLocation[1], 80, 20];

  function createForm() {
    new Long(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3]);
  }
  function clear() {
    c.clearRect(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3]);
  }
  keyCode = e.keyCode;
  switch (e.keyCode) {
      case 37:
          console.log('left');
          if (currentBloc[0] >= 20) {
            clear();
            currentBloc[0] -= 20;
            createForm();
            currentLocation = [currentLocation[0] - 20,currentLocation[1]];
          }
          break;
      case 38:
          console.log('up');
          clear();
          if (currentRotation === 0) {currentRotation++} else {currentRotation--}
          new Long(i[currentRotation][0],i[currentRotation][1],i[currentRotation][2],i[currentRotation][3]);
          break;
      case 39:
          console.log('right');
          if (currentBloc[0] + currentBloc[2] <= 180) {
            clear();
            currentBloc[0] += 20;
            createForm();
            currentLocation = [currentLocation[0] + 20,currentLocation[1]];
          }
          break;
      case 40:
          console.log('down');
          if (currentBloc[1] + currentBloc[3] <= 420) {
            clear();
            currentBloc[1] += 20;
            createForm();
            currentLocation = [currentLocation[0],currentLocation[1] + 20]; //update of var for next move
          }
          break;
    }
};


function init() {
  //trigger a random figure & random rotation
  // new Bloc(80,0,40,40);
  new Long(i[currentRotation][0],i[currentRotation][1],i[currentRotation][2],i[currentRotation][3]);

}
function animate() {
  requestAnimationFrame(animate);
  if (currentBloc[1] + currentBloc[3] === 440) {
    currentLocation = [60,0]; //current loc reset
    // If we touch the bottom, generate new figure
    new Long(60,0,80,20);
  }
}

init()
animate()
