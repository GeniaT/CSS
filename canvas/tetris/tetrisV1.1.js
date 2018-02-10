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
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]],
  [[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2]],
  [[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2]]]
let score = 0;
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
          if (checkLeftCollision()) {
            clearPreviousFormState();
            currentX -= 1;
            renderCurrentForm();
          }
          break;
      case 38:
          console.log('up');// need to check if rotation is permitted (if 1s in next state wont meet 2s on the grid)
          rotate();
          break;
      case 39:
          console.log('right');
          if (checkRightCollision()) {
            clearPreviousFormState();
            currentX += 1;
            renderCurrentForm();
          }
          break;
      case 40:
          console.log('down');
          if (checkBottomCollision()) {
            clearPreviousFormState();
            currentY += 1;
            renderCurrentForm();

            score += 5;
            console.log(score);
          } else {
            fixFormToGrid();
            checkFullLines();
            clearInterval(interval);
            init();
          }
          break;
    }
}

let randomNr;
function newFormCreation() {
  randomNr = Math.floor(Math.random() * forms.length);
  // let randomForm = 4;

  currentForm = forms[randomNr];
  currentColor = colors[randomNr];
  currentX = 5;
  currentY = 0;

  score += 5;
  console.log(score);
}

let interval;
let speed = 1000;
function formFalls() {
  console.log('speed', speed);
  interval = setInterval(function() {
    if (checkBottomCollision()) {
      clearPreviousFormState();
      currentY += 1;
      renderCurrentForm();

      score += 1;
      console.log(score);
    } else {
      fixFormToGrid();
      checkFullLines();
      clearInterval(interval);
      init();
    }
  }, speed);
}

function clearPreviousFormState() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (gameGrid[currentY + row][currentX + col] === 1) {
        gameGrid[currentY + row][currentX + col] = 0;
        c.clearRect((currentX - 2 + col) * 20, (currentY + row) * 20, 20, 20);
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
  let tempCurrentForm = rotatedForm; //temporali saving the 4x4 grid of the rotated form

  for (let row = 0; row <= 3; row++) { //check if this new rotation can fit the grid, if not return.
    for (let col = 0; col <= 3; col++) {
      if (tempCurrentForm[row][col] === 1 && gameGrid[currentY + row][currentX + col][0] === 2) {
        // rotation not permitted
        return;
      } else if (row === 3 && col === 3) {
        // rotation is permitted
        clearPreviousFormState();
        currentForm = rotatedForm;
        renderCurrentForm();
      }
    }
  }
}

function checkLeftCollision() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1 && gameGrid[currentY + row][currentX - 1 + col][0] === 2) {
        return false;//go left not permitted
      }
    }
  }
  return true; //permitted
}

function checkRightCollision() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1 && gameGrid[currentY + row][currentX + 1 + col][0] === 2) {
        return false;//go left not permitted
      }
    }
  }
  return true; //permitted
}

function checkBottomCollision() {
  //check if all the '1s' in current form state will meet '0s' in the gameGrid
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1 && gameGrid[currentY + 1 + row][currentX + col][0] === 2) {
        return false;
      }
    }
  }
  return true;
}

let numberOfLines = 0;
function checkFullLines() {
  let fullLines = false;
  for (let i = 0; i < 22; i++) {
    if (gameGrid[i].indexOf(0) === -1) { //if full line
      fullLines = true
      gameGrid.splice(i, 1);
      gameGrid.unshift([[2],[2],0,0,0,0,0,0,0,0,0,0,[2],[2]]);

      numberOfLines++;
      score = Number((score + 50/(1000/speed)).toFixed()); //each line bonus gets bigger as the speed increases.
      console.log(score);
      if (numberOfLines % 10 === 9) {
        speed = 0.9 * speed;
      }
    }
  }
  if (fullLines) {
    rerenderCanvas();
  }
}

function rerenderCanvas() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < 22; row ++) {
    for (let col = 1; col < 12; col++) {
      if (gameGrid[row][col][0] === 2) {
        c.fillStyle = colors[gameGrid[row][col][1]];
        c.fillRect((col - 2) * 20, row* 20, 20, 20);
      }
    }
  }
}

function renderCurrentForm() {
  c.fillStyle = currentColor;
  //we add the currentForm on the grid and render it
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1) {
        gameGrid[currentY + row][currentX + col] = 1;
        c.fillRect((currentX - 2 + col) * 20, (currentY + row) * 20, 20, 20);
      }
    }
  }
}

function fixFormToGrid() {
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      if (currentForm[row][col] === 1) {
        gameGrid[currentY + row][currentX + col] = [2, randomNr];
        c.fillRect((currentX - 2 + col) * 20, (currentY + row) * 20, 20, 20);
      }
    }
  }
}

function init() {
  newFormCreation();
  renderCurrentForm();
  formFalls();
}

init()
