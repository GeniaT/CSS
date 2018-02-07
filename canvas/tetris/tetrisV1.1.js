const canvas = document.querySelector('#fallingForm');
const c = canvas.getContext('2d')
const forms = [
  [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
  ],
  [
    [0,0,0,0],
    [0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
  ],
  [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0],
  ],
  [
    [0,0,1,0],
    [0,0,1,0],
    [0,1,1,0],
    [0,0,0,0],
  ],
  [
    [0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0],
  ],
  [
    [0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0],
  ],
  [
    [0,0,0,0],
    [0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
  ]
]
const colors = ['#fc8df6','#998be5','#47aaed','#29d188','#e8d614','#ed6a3b','#8c9093'];
let gameGrid = [ //the '2s' define the border of the grid in the initial state.
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,2],
  [2,2,2,2,2,2,2,2,2,2,2,2]]

canvas.width = 200;
canvas.height = 440;

let currentForm;
let currentColor;
let currentX;
let currentY;

document.onkeydown = function(e) {
  switch (e.keyCode) {
      case 37:
          console.log('left');
          clearPreviousFromState();
          currentX -= 1;
          renderCurrentForm();
          break;
      case 38:
          console.log('up');
          clearPreviousFromState();
          rotate();
          break;
      case 39:
          console.log('right');
          clearPreviousFromState();
          currentX += 1;
          renderCurrentForm();
          break;
      case 40:
          console.log('down');
          if (checkBottomCollision()) {
            clearPreviousFromState();
            currentY += 1;
            renderCurrentForm();
          } else {
            console.log(gameGrid);
            fixFormToGrid();
            clearInterval(interval);
            init();
          }
          break;
    }
}

function newFormCreation() {
  let randomForm = Math.floor(Math.random() * forms.length);
  let randomFColor = Math.floor(Math.random() * forms.length);
  currentForm = forms[randomForm];
  currentColor = colors[randomFColor];
  currentX = 4;
  currentY = 0;
}

let interval;
function formFalls() {
  interval = setInterval(function() {
    if (checkBottomCollision()) {
      clearPreviousFromState();
      currentY += 1;
      renderCurrentForm();
    } else {
      console.log(gameGrid);
      fixFormToGrid();
      clearInterval(interval);
      init();
    }
  }, 1000);
}

function clearPreviousFromState() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (gameGrid[currentY + row][currentX + col] === 1) {
        gameGrid[currentY + row][currentX + col] = 0;
        c.clearRect((currentX - 1 + col) * 20, (currentY + row) * 20, 20, 20);
      }
    }
  }
}
function rotate() {
  //4x4 grid to rotate: columns become rows starting from bottom of the column.
  let rotatedForm = [[],[],[],[]];
  for (let col = 0; col <= 3; col++) {
    for (let row = 3; row >=0; row--) {
      rotatedForm[col][3-row] = currentForm[row][col];
    }
  }
  currentForm = rotatedForm;
  renderCurrentForm();
}

function checkBottomCollision() {
  //check if all the '1s' in current form state will meet '0s' in the gameGrid
  let toCheckInGrid = [];
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1 && gameGrid[currentY+1 + row][currentX + col] === 2) {
        return false;
      }
    }
  }
  return true;
}


function renderCurrentForm() {
  c.fillStyle = currentColor;
  //we add the currentForm on the grid and render it
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1) {
        gameGrid[currentY + row][currentX + col] = 1;
        c.fillRect((currentX - 1 + col) * 20, (currentY + row) * 20, 20, 20);
      }
    }
  }
  console.log(gameGrid);
}

function fixFormToGrid() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1) {
        gameGrid[currentY + row][currentX + col] = 2;
        c.fillRect((currentX - 1 + col) * 20, (currentY + row) * 20, 20, 20);
      }
    }
  }
}

function init() {
  newFormCreation();
  renderCurrentForm();
  // formFalls();
}

init()
