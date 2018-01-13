// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Original Tetris format is 10 x 22 squares, I keep this ratio.
canvas.width = 200; //smallest square = 20 x 20
canvas.height = 440;
let keyCode;
let currentBloc = [];

//forms definition
function Bloc(x, y, width, height) {
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
  this.update = function(keyCode) {
    // c.clearRect(0,0, 200, 440);
    // if (keyCode === 37) {
    //   this.x = this.x - 20;
    // } else if (keyCode === 39) {
    //   this.x = this.x - 20;
    // } else if (keyCode === 40) {
    //   this.y = this.y + 20;
    // }
    // new Bloc(this.x, this.y, 40, 40);
    //
    // this.draw();
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
    keyCode = e.keyCode;
    switch (e.keyCode) {
        case 37:
            console.log('left');
            if (currentBloc[0] >= 20) {
              c.clearRect(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3]);
              currentBloc[0] -= 20;
              new Bloc(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3])
            }
            break;
        case 38:
            console.log('up');
            c.clearRect(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3]);
        case 39:
            console.log('right');
            if (currentBloc[0] + currentBloc[2] <= 180) {
              c.clearRect(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3]);
              currentBloc[0] += 20;
              new Bloc(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3])
            }
            break;
        case 40:
            console.log('down');
            if (currentBloc[1] + currentBloc[3] <= 420) {
              c.clearRect(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3]);
              currentBloc[1] += 20;
              new Bloc(currentBloc[0],currentBloc[1],currentBloc[2],currentBloc[3])
            }
            break;
    }
    console.log('keycode now:', keyCode);
};


function init() {
  // new Bloc(80,0,40,40);
  new Long(60,0,80,20);
  console.log('currentBloc :' , currentBloc);
}
function animate() {
  requestAnimationFrame(animate);
  if (currentBloc[1] + currentBloc[3] === 440) {
    new Long(60,0,80,20);
  }
}

init()
animate()
